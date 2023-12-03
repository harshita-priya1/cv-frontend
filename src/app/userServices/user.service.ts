import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://cv-backend-4cdl9.ondigitalocean.app';
  constructor(private http: HttpClient) {}

  signIn(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/user/signin`;
    // const accessToken: string | null = localStorage.getItem('accessToken');
    // const refreshToken: string | null = localStorage.getItem('refreshToken');
    // const user: string | null = localStorage.getItem('user');

    const body = {
      email: email,
      password: password,
      // accessToken: accessToken,
      // refreshToken: refreshToken,
      // user: user,
    };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(url, body, { headers: headers });
  }
  signUp(
    name: string,
    phone: string,
    email: string,
    password: string
  ): Observable<any> {
    const body = {
      name: name,
      phone: phone,
      email: email,
      password: password,
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(`${this.apiUrl}/user/signup`, body, {
      headers: headers,
    });
  }
}
