import { Routes } from '@angular/router';
import { authGuard } from './Guards/auth-guard';
import { AuthPage } from './Components/auth-page/auth-page';
import { SearchPage } from './Components/search-page/search-page';
import { VideoPage } from './Components/video-page/video-page';

export const routes: Routes = [
  { path: 'auth/:mode', component: AuthPage },
  { path: 'search', component: SearchPage, canActivate: [authGuard] },
  { path: 'video/:id', component: VideoPage, canActivate: [authGuard] },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', redirectTo: '/search' },
];
