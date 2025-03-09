import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Token } from '../../interfaces/token';
import { Credential } from '../../interfaces/credential';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string | null = null;
  API_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credential: Credential): Observable<Token> {
    return this.http.post<Token>(`${this.API_URL}/api_login_check`, credential);
  }

  setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  clearToken(): void {
    this.token = null;
    sessionStorage.removeItem('token');
  }
}
