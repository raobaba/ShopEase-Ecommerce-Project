// login.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginUser(formData: any) {
    return this.http.post<any>('http://localhost:8080/login', formData);
  }

  getUserData(token: string) {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get('http://localhost:8080/getUser', { headers });
  }

  getUserDataById(token: string, userID: string) {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`http://localhost:8080/${userID}`, { headers });
  }
}
