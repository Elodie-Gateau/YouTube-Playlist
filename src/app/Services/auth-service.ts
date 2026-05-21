import { Injectable, signal, computed, inject } from '@angular/core';
import { Registered, User } from '../Types/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly currentUserSignal = signal<Partial<User> | null>(null);

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
        console.error("Erreur lors du parsing de l'utilisateur stocké:", error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  login(email: string, password: string): void {
    if (!this.validateCredentials(email, password)) {
      return;
    }
    const storedUser = this.getStoredUsers().find((u) => u.email === email);

    const user: Partial<User> = {
      username: storedUser?.username,
      email,
      token: 'fake-jwt-token',
    };

    // Sauvegarde en sessionStorage
    localStorage.setItem('currentUser', JSON.stringify(user));

    // Remplacement avec le User courant
    this.currentUserSignal.set(user);
  }

  logout(): void {
    // Suppression de la session
    localStorage.removeItem('currentUser');

    // Mise à jour du signal
    this.currentUserSignal.set(null);

    this.router.navigate(['/auth', 'signIn']);
  }

  register(userData: Registered): boolean {
    const users = this.getStoredUsers();
    users.push({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  private getStoredUsers(): Registered[] {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  }

  validateCredentials(email: string, password: string): boolean {
    const users = this.getStoredUsers();
    return users.some((user) => user.email === email && user.password === password);
  }
}
