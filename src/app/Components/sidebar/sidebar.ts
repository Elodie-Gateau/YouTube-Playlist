import { Component, inject } from '@angular/core';
import { AuthService } from '../../Services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  authService = inject(AuthService);

  isAuthenticated = this.authService.isAuthenticated;

  currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout();
  }
}
