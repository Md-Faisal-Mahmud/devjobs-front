import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../app.routes';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  constructor(private router: Router) { }

  autoLogout(): void {
    const storageKeys = [
      'token',
      'name',
      'username',
      'email',
      'role',
      'image'
    ];

    storageKeys.forEach(key => {
      localStorage.removeItem(`${key}`);
      sessionStorage.removeItem(`${key}`);
    });
    this.router.navigate([AppRoutes.SignIn]);
  }
}