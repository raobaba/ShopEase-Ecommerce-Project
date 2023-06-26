import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

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
      password
    };

    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.put<void>(`http://localhost:8080/${_id}`, updatedUser, { headers }).toPromise();
  }

  deleteUser(token: string, user: User): Promise<void> {
    const { _id } = user;
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.delete<void>(`http://localhost:8080/${_id}`, { headers }).toPromise();
  }
}

interface User {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  editMode: boolean; // New property to track edit mode
}
