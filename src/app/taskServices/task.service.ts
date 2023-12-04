import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  email: string;
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // private apiUrl = 'https://cv-backend-4cdl9.ondigitalocean.app';
  private apiUrl = 'http://localhost:5001';
  constructor(private http: HttpClient) {}
  getTasks(): Observable<any> {
    const url = `${this.apiUrl}/tasks`;
    const accessToken: string | null = localStorage.getItem('accessToken');
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    let user: string | null = localStorage.getItem('user'); //user has email,name, id
    let newUser: User = JSON.parse(user!);
    const userid: string = newUser.id;
    const params = new HttpParams()
      .set('user', userid)
      .set('refreshToken', refreshToken || '');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + accessToken,
    });
    return this.http.get(url, { headers: headers, params: params });
  }
  createTask(
    title: string,
    description: string,
    completed: boolean,
    endDate: Date
  ): Observable<any> {
    const accessToken: string | null = localStorage.getItem('accessToken');
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    const user: string | null = localStorage.getItem('user');
    const userObj = JSON.parse(user!);
    const userId = userObj.id;
    const params = new HttpParams()
      .set('user', userId)
      .set('refreshToken', refreshToken || '');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    const body = {
      title: title,
      description: description,
      completed: completed,
      endDate: endDate,
    };
    return this.http.post(`${this.apiUrl}/tasks`, body, {
      headers: headers,
      params: params,
    });
  }
  getTask(id: string): Observable<any> {
    const url = `${this.apiUrl}/tasks/${id}`;
    const accessToken: string | null = localStorage.getItem('accessToken');
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    const user: string | null = localStorage.getItem('user');
    const userObj = JSON.parse(user!);
    const userId = userObj.id;
    const params = new HttpParams()
      .set('user', userId)
      .set('refreshToken', refreshToken || '');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.get(url, { headers: headers, params: params });
  }
  deleteTask(id: string): Observable<any> {
    const url = `${this.apiUrl}/tasks/${id}`;
    const accessToken: string | null = localStorage.getItem('accessToken');
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    const user: string | null = localStorage.getItem('user');
    const userObj = JSON.parse(user!);
    const userId = userObj.id;
    const params = new HttpParams()
      .set('user', userId)
      .set('refreshToken', refreshToken || '');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.delete(url, { headers: headers, params: params });
  }
  updateTask(
    id: string,
    title: string,
    description: string,
    endDate: Date
  ): Observable<any> {
    //take initial values and send them to the backend if user doesnt change anything
    const url = `${this.apiUrl}/tasks/${id}`;
    const accessToken: string | null = localStorage.getItem('accessToken');
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    const user: string | null = localStorage.getItem('user');
    const userObj = JSON.parse(user!);
    const userId = userObj.id;
    const params = new HttpParams()
      .set('user', userId)
      .set('refreshToken', refreshToken || '');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    const body = {
      title: title,
      description: description,
      endDate: endDate,
    };
    return this.http.put(url, body, {
      headers: headers,
      params: params,
    });
  }
  changeStatus(id: string): Observable<any> {
    const url = `${this.apiUrl}/tasks/completed/${id}`;
    const accessToken: string | null = localStorage.getItem('accessToken');
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    const user: string | null = localStorage.getItem('user');
    const userObj = JSON.parse(user!);
    const userId = userObj.id;
    const params = new HttpParams()
      .set('user', userId)
      .set('refreshToken', refreshToken || '');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    });
    return this.http.put(
      url,
      {},
      {
        headers: headers,
        params: params,
      }
    );
  }
}
