import { Injectable, signal, computed, inject } from '@angular/core';
import { Registered, User } from '../Types/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSignal = signal<Partial<User> | null>(null);
  private readonly http = inject(HttpClient);
  public isAuthenticated = computed(() => this.currentUserSignal() !== null);

  public currentUser = computed(() => this.currentUserSignal());

  router: Router = inject(Router);
  constructor() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSignal.set(user);
      } catch (error) {
        localStorage.removeItem('currentUser');
      }
    }
  }

  login(email: string, password: string): void {
    this.http
      .post<{
        message: string;
        token: string;
        user: User;
      }>(`${environment.API_URL}/users/login`, { email, password })
      .subscribe({
        next: (response) => {
          const user: Partial<User> = {
            username: response.user.username,
            email: response.user.email,
            token: response.token,
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSignal.set(user);
          this.router.navigate(['/search']);
        },
        error: (err) => {
          console.error('Erreur login:', err);
        },
      });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSignal.set(null);
    this.router.navigate(['/auth', 'signIn']);
  }

  register(userData: Registered): void {
    console.log('données envoyées :', userData);
    this.http
      .post<{ message: string }>(`${environment.API_URL}/users/register`, userData)
      .subscribe({
        next: () => {
          this.router.navigate(['/auth', 'signIn']);
        },
        error: (err) => {
          console.error('Erreur register:', err);
          console.error('Détail erreur:', err.error); // ← et ça
          console.error('Erreurs validation:', err.error.errors);
        },
      });
  }
}
