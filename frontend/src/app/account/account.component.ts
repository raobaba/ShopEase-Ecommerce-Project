import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '.././service/login.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  isDropdownOpen = false;
  loggedIn = false;
  userEmail: string = '';

  constructor(
     private loginService: LoginService,
     private router: Router,
     private sharedService: SharedService
  ) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID'); // Get the userID from localStorage

    if (token && userID) {
      this.loggedIn = true;
      this.loginService.getUserDataById(token, userID).subscribe(
        (data: any) => {
          if (data.isAdmin) {
            this.userEmail = data.email;
            this.sharedService.setAdminStatus(true);
            this.sharedService.setLoggedInStatus(true);
          } else {
            this.userEmail = data.email;
            console.log('User is not an admin.');
            this.sharedService.setLoggedInStatus(true);
          }
        },
        (error: any) => {
          console.error('Endpoint error:', error);
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    this.loggedIn = false;
    this.sharedService.setAdminStatus(false);
    this.sharedService.setLoggedInStatus(false);
    this.userEmail = '';
    this.router.navigate(['/authentication/login']);
  }
}
