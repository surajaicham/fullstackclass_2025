import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export interface Token {
  access_token: string;
  username: string;
  token_type: string;
  expires_in: number;
}

export interface Profile {
  id: number;
  username: string;
  email: string;
}

export interface LoginContext {
  grant_type: string;
  username: string;
  password: string;
}

export interface TokenInfo extends JwtPayload {
  username: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {

  loginStateSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(loginInfo: LoginContext): Observable<Token> {
    return this.http.post<Token>(environment.apiUrl + '/api/accounts/login', loginInfo);
  }

  getProfile(): Observable<Profile> {
    let user = localStorage.getItem('access_token');
    let userObj = user ? JSON.parse(user) : null;
    if (!userObj || !userObj.access_token) {
      throw new Error('No access token found, please login first.');
    }
    return this.http.get<Profile>(environment.apiUrl + '/profile', {
      headers: { Authorization: `Bearer ${userObj.access_token}` },
    });
  }

  getCurrentUser(): TokenInfo | null {
    let user = localStorage.getItem('access_token');
    let userObj = user ? JSON.parse(user) : null;
    let tokenInfo: TokenInfo | null = null;
    if(userObj != null) {
      tokenInfo = jwtDecode(userObj.access_token);
    }
    return tokenInfo;
  }

  setCurrentUser(token: Token): void {
    this.loginStateSubject.next(true);
    localStorage.setItem('access_token', JSON.stringify(token));
  }

  logout(): void {
    this.loginStateSubject.next(false);
    localStorage.removeItem('access_token');
  }
}
