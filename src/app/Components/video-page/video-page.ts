import { Component, inject, signal } from '@angular/core';
import { Video } from '../../Types/video';
import { VideoService } from '../../Services/video-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-page',
  imports: [],
  templateUrl: './video-page.html',
  styleUrl: './video-page.css',
})
export class VideoPage {
  private readonly route = inject(ActivatedRoute);

  videoService = inject(VideoService);

  video = signal<Video | null>(null);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.videoService.findVideo(params['id']).subscribe((data) => {
        this.video.set(data.items[0]);
      });
    });
  }
}
