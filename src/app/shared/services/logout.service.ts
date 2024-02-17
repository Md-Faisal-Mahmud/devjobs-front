import { Injectable } from '@angular/core';
import { AppRoutes } from '../../app.routes';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  logout(): void {
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
