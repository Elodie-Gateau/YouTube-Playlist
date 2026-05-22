import { Component, inject, signal } from '@angular/core';
import { VideoDetail } from '../../Types/video';
import { VideoService } from '../../Services/video-service';
import { ActivatedRoute } from '@angular/router';
import { SafeUrlPipe } from '../../Pipes/safe-pipe';

@Component({
  selector: 'app-video-page',
  imports: [SafeUrlPipe],
  templateUrl: './video-page.html',
  styleUrl: './video-page.css',
})
export class VideoPage {
  private readonly route = inject(ActivatedRoute);

  private readonly videoService = inject(VideoService);
  video = signal<VideoDetail | null>(null);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const videoId = params['id'];
      console.log('videoId :', videoId);
      this.videoService.findVideo(videoId).subscribe((response) => {
        console.log('response reçue :', response.items[0]);
        this.video.set(response.items[0]);
      });
    });
  }
}
