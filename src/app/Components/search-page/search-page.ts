import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VideoService } from '../../Services/video-service';
import { SearchResult } from '../../Types/video';
import { Router, RouterLink } from '@angular/router';
import { PlaylistService } from '../../Services/playlist-service';

@Component({
  selector: 'app-search-page',
  imports: [ReactiveFormsModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  videoService = inject(VideoService);
  playlistService = inject(PlaylistService);

  results = signal<SearchResult[]>([]);

  searchForm = this.fb.group({
    searchQuery: ['', Validators.required],
  });

  onSubmit() {
    const query: string = this.searchForm.value.searchQuery!;
    this.videoService.searchVideos(query).subscribe((data) => {
      this.results.set(data.items);
    });
  }

  navigateToVideo(result: SearchResult) {
    this.router.navigate(['/video', result.id.videoId]);
  }

  addToPlaylist(result: SearchResult):void {
    this.playlistService.addVideoToPlaylist(result);
  };
}
