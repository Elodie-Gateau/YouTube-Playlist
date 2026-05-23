import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth-service';
import { Registered } from '../../Types/user';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-page',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
})
export class AuthPage {
  mode: string = 'signIn';
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  isSignIn = signal<boolean>(true);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.toggleMode(params['mode']);
    });
  }

  toggleMode(mode: string) {
    if (mode === 'signIn') {
      this.isSignIn.set(true);
    } else {
      this.isSignIn.set(false);
    }
  }

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  private fb = inject(FormBuilder);
  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
      ],
    ],
  });

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string | null {
    const field = this.registerForm.get(fieldName);

    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} est requis`;
      }
      if (field.errors['email']) {
        return "Format d'email invalide";
      }
      if (field.errors['minlength']) {
        return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
      }
      if (field.errors['pattern']) {
        return 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre';
      }
    }

    return null;
  }

  onSubmit(isSignIn: boolean) {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username!;
      const email = this.registerForm.value.email!;
      const password = this.registerForm.value.password!;
      if (isSignIn) {
        this.authService.login(email, password);
        this.router.navigate(['/']);
        return;
      }
      this.authService.register({ email, password, username });
      this.router.navigate(['/auth', 'signIn']);
    } else {
      this.markFormGroupTouched();
    }
  }
}
