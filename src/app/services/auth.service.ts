import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface AuthResponse {
  accessToken: string;
  user: { id: string; name: string; email: string; roles: string[] };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dev-challenge-80777230809.southamerica-east1.run.app/api/dev-challenge/auth/login';
  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  private userRoles: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.authStatus.next(true);
        this.userRoles = response.user.roles;
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getUserRoles(): string[] {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.roles || [];
  }
}