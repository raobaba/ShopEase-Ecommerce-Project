import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loginUser(formData: any) {
    return this.http.post<any>('http://localhost:8080/login', formData);
  }

  getUserData(token: string) {
    return this.http.get('http://localhost:8080/getUser', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
