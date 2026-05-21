import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { VideoService } from '../../Services/video-service';
import { SearchResult } from '../../Types/video';

@Component({
  selector: 'app-search-page',
  imports: [ReactiveFormsModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage {
  private fb = inject(FormBuilder);

  videoService = inject(VideoService);

  results = signal<SearchResult[]>([]);

  searchForm = this.fb.group({
    searchQuery: ['', Validators.required],
  });

  private readonly http: HttpClient = inject(HttpClient);

  onSubmit() {
    const query: string = this.searchForm.value.searchQuery!;
    this.videoService.searchVideos(query).subscribe((data) => {
      console.log(data);
      this.results.set(data.items);
    });
  }
}
