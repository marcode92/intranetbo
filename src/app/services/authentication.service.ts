import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return sessionStorage.getItem('token')
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token)
  }
}
