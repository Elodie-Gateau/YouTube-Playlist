import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VideoService } from '../../Services/video-service';
import { Video } from '../../Types/video';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {
  private fb = inject(FormBuilder);

  videoService = inject(VideoService);

  results = signal<Video[]>([]);

  searchForm = this.fb.group({
    searchQuery: ['', Validators.required],
  });

  onSubmit() {
    const query: string = this.searchForm.value.searchQuery!;
    this.videoService.searchVideos(query).subscribe((data) => {
      console.log(data);
      this.results.set(data.items);
    });
  }
}
