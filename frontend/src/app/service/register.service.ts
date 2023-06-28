import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient, private router: Router) {}

  registerUser(
    fullName: string,
    userName: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) {
    const formData = {
      fullName: fullName,
      userName: userName,
      email: email,
      password: password,
      isAdmin: isAdmin,
    };

    return this.http.post('http://localhost:8080/register', formData);
  }
}
