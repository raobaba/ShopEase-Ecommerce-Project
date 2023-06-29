import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

interface User {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  editMode?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CombinedService {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  registerUser(
    fullName: string,
    userName: string,
    email: string,
    password: string,
    isAdmin: boolean
  ): Observable<any> {
    const formData = {
      fullName: fullName,
      userName: userName,
      email: email,
      password: password,
      isAdmin: isAdmin,
    };

    return this.http.post('http://localhost:8080/register', formData);
  }

  loginUser(formData: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/login', formData);
  }

  getUserData(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get('http://localhost:8080/getUser', { headers });
  }

  getUserDataById(token: string, userID: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(`http://localhost:8080/${userID}`, { headers });
  }

  getUserDetails(token: string): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<User[]>('http://localhost:8080/getUser', { headers });
  }

  updateUser(token: string, user: User): Promise<void> {
    const { _id, fullName, userName, email, password } = user;
    const updatedUser = {
      fullName,
      userName,
      email,
      password,
    };

    const headers = new HttpHeaders().set('Authorization', token);
    return this.http
      .put<void>(`http://localhost:8080/${_id}`, updatedUser, { headers })
      .toPromise();
  }

  deleteUser(token: string, user: User): Promise<void> {
    const { _id } = user;
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http
      .delete<void>(`http://localhost:8080/${_id}`, { headers })
      .toPromise();
  }
}
