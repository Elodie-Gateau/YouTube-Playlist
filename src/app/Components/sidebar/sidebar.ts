import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth-service';
import { Router } from '@angular/router';
import { VideoDetail } from '../../Types/video';
import { PlaylistService } from '../../Services/playlist-service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  authService = inject(AuthService);
  playlistService = inject(PlaylistService);
  router = inject(Router);

  videos = this.playlistService.playlist;

  navigateToVideo(video: VideoDetail) {
    this.router.navigate(['/video', video.id]);
  }

  isAuthenticated = this.authService.isAuthenticated;

  currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout();
  }
}
