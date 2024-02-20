import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminRoutes } from './admin/admin.routes';
import { AppRoutes } from './app.routes';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token') ?? sessionStorage.getItem('token') ?? '';
  const requestedRoute = state.url;
  const router = inject(Router);
  const resetPasswordRoutePattern = /\/reset-password/i;
  if (token) {
    if (requestedRoute === '/signin' || requestedRoute === '/' || requestedRoute === ''
      || requestedRoute === '/forgot-password' || requestedRoute === '/reset-password') {
      router.navigate([AppRoutes.Admin, AdminRoutes.Dashboard]);
      return false;
    }
    return true;
  } else {
    if (requestedRoute !== '/signin' && requestedRoute !== '/' && requestedRoute !== ''
      && requestedRoute !== '/forgot-password' && !resetPasswordRoutePattern.test(requestedRoute)) {
      router.navigate([AppRoutes.SignIn]);
      return false;
    }
    return true;
  }
};