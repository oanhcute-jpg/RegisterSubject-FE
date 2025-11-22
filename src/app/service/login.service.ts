import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrla = 'http://localhost:8080'; // API demo

  constructor(private http: HttpClient) {}
  // getAllSubject(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrla}/get/all`);
  // }
  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrla}/api/auth/login`, user);
  }
    getUserRole(): string {
    // Lấy từ localStorage / token decode / API tùy bạn
    return localStorage.getItem('role') || '';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
