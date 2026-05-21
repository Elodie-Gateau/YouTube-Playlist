import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './Components/header/header';
import { Sidebar } from './Components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [Header, Sidebar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('youtube-playlist');
}
