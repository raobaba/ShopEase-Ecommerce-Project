import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminService } from '../../service/admin.service';

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
  styleUrls: ['./admin.component.css'],
  providers: [AdminService] // Add the service provider
})
export class AdminComponent implements OnInit {
  loading: boolean = false;
  users: User[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.loading = true;

    const token = localStorage.getItem('token') || '';
    this.adminService.getUserDetails(token).subscribe(
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
      const token = localStorage.getItem('token') || '';
      await this.adminService.updateUser(token, user);
      user.editMode = false;
      console.log('User updated successfully');
    } catch (error) {
      console.error('Failed to update user', error);
    }
  }

  async deleteUser(user: User) {
    try {
      const token = localStorage.getItem('token') || '';
      await this.adminService.deleteUser(token, user);
      this.users = this.users.filter(u => u._id !== user._id);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  }
}
