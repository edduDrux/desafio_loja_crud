import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isAuthenticated()) {
      localStorage.setItem('redirectUrl', state.url);
      this.router.navigate(['/login']);
      return false;
    }
  
    if (state.url.includes('/product/edit') || state.url.includes('/product/add')) {
      if (!this.authService.hasRole('GERENTE')) {
        this.router.navigate(['/']);
        return false;
      }
    }
  
    return true;
  }
}