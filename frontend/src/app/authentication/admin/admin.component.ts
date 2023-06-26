import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface User {
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  editMode: boolean; // New property to track edit mode
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loading: boolean = false;
  users: User[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.loading = true;

    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    this.http.get<User[]>('http://localhost:8080/getUser', { headers }).subscribe(
      (response: User[]) => {
        this.loading = false;
        this.users = response.map(user => ({ ...user, editMode: false }));
        console.log(this.users);
      },
      (error: any) => {
        this.loading = false;
        console.error('API request error', error);
      }
    );
  }

  editUser(user: User) {
    user.editMode = true;
  }

  async updateUser(user: User) {
    try {
      const { fullName, userName, email, password } = user;
      const updatedUser = {
        fullName,
        userName,
        email,
        password
      };

      const token = localStorage.getItem('token') || '';
      const headers = new HttpHeaders().set('Authorization', token);
      await this.http.put(`http://localhost:8080/${user._id}`, updatedUser, { headers }).toPromise();
      user.editMode = false;
      console.log('User updated successfully');
    } catch (error) {
      console.error('Failed to update user', error);
    }
  }

  async deleteUser(user: User) {
    try {
      const token = localStorage.getItem('token') || '';
      const headers = new HttpHeaders().set('Authorization', token);
      await this.http.delete(`http://localhost:8080/${user._id}`, { headers }).toPromise();
      this.users = this.users.filter(u => u._id !== user._id);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  }
}
