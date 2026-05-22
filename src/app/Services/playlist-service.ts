import { Injectable, signal } from '@angular/core';
import { User } from '../Types/user';
import { AuthService } from './auth-service';
import { Playlist, SearchResult, VideoDetail } from '../Types/video';
import { VideoService } from './video-service';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  user: Partial<User> | null = null;

  constructor(private readonly authService: AuthService, private readonly videoService: VideoService) {
    this.user = this.authService.currentUser();
  }

  playlist = signal<Playlist | null>(null);


  addVideoToPlaylist(result: SearchResult) :void{
    const video = this.videoService.convertSearchResultToVideoDetail(result);
    const current = this.playlist();
    const updated: Playlist = {
      name: current?.name ?? 'My Playlist',
      userId: this.user!.email!,
      videos:[...(current?.videos ?? []), video]
    }
    this.playlist.set(updated);
    localStorage.setItem(('playlist'), JSON.stringify(updated))
  }

  deleteVideoFromPlaylist(video: VideoDetail) :void{
    const current = this.playlist();
    const updated: Playlist = {
      name: current?.name ?? 'My Playlist',
      userId: this.user!.email!,
      videos: current!.videos.filter((v) => v !== video),
    };
    this.playlist.set(updated);
    localStorage.setItem('playlist', JSON.stringify(updated));
  }

  getPlaylist() : Playlist | null{
    const playlist = localStorage.getItem('playlist');
    return playlist ? JSON.parse(playlist) : null;
  }

  clearPlaylist() : void{
    this.playlist.set(null);
    localStorage.removeItem('playlist');
  }
}
