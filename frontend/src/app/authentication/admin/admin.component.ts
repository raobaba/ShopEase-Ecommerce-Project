import { Component, OnInit } from '@angular/core';
import { CombinedService } from '../../service/combine.service';

interface User {
  isAdmin: boolean;
  _id: string;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  editMode: boolean; 
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [CombinedService] 
})
export class AdminComponent implements OnInit {
  loading: boolean = false;
  users: User[] = [];
  adminUser: User | undefined;

  constructor(private combinedService: CombinedService, private CombinedService: CombinedService) {}

  ngOnInit() {
    this.getUserDetails();
    this.getUserDataById();
  }

  getUserDataById() {
    const token = localStorage.getItem('token') || '';
    const userID = localStorage.getItem('userID') || '';

    this.combinedService.getUserDataById(token, userID).subscribe(
      (response: any) => {
        console.log("Admin",response.isAdmin)
        if (response.isAdmin) {
          this.adminUser = response;
        }
      },
      (error: any) => {
        console.error('Failed to get user data by ID', error);
      }
    );
  }

  getUserDetails() {
    this.loading = true;
    const token = localStorage.getItem('token') || '';
    this.combinedService.getUserDetails(token).subscribe(
      (response: any) => {
        console.log(response);
        this.loading = false;
        this.users = response
          .filter((user: User) => !user.isAdmin)
          .map((user: User) => ({ ...user, editMode: false }));
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
      await this.combinedService.updateUser(token, user);
      user.editMode = false;
      console.log('User updated successfully');
    } catch (error) {
      console.error('Failed to update user', error);
    }
  }

  async deleteUser(user: User) {
    try {
      const token = localStorage.getItem('token') || '';
      await this.combinedService.deleteUser(token, user);
      this.users = this.users.filter((u: User) => u._id !== user._id);
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  }
}
