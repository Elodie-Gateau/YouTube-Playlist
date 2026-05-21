import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../Services/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const authService = inject(AuthService);
  const isAuth: boolean = authService.isAuthenticated();

  if (isAuth) {
    return true;
  }

  // Navigation
  router.navigate(['/auth', 'signIn'], {
    queryParams: {
      returnUrl: state.url,
      message: 'Vous devez être connecter pour accéder à cette page',
    },
  });
  return false;
};
