import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Video, YoutubeSearchResponse } from '../Types/video';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private http = inject(HttpClient);
  private apiUrl = environment.URL_YOUTUBE;

  searchVideos(query: string): Observable<YoutubeSearchResponse> {
    return this.http.get<YoutubeSearchResponse>(this.apiUrl + 'search', {
      params: {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults: '10',
        key: environment.API_KEY,
      },
    });
  }

  findVideo(videoId: number): Observable<YoutubeSearchResponse> {
    return this.http.get<YoutubeSearchResponse>(this.apiUrl + 'videos', {
      params: {
        part: 'snippet',
        id: videoId,
        key: environment.API_KEY,
      },
    });
  }
}
