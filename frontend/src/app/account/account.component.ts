import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CombinedService } from '.././service/combine.service';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  isDropdownOpen = false;
  loggedIn = false;
  userEmail: string = '';

  constructor(
    private combinedService: CombinedService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() {
    this.loadUserData();
    this.checkLoginStatus();
    this.sharedService.loggedIn$.subscribe((loggedIn: boolean) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.loadUserEmail();
      } else {
        this.userEmail = '';
      }
    });
  }

  checkLoginStatus() {
    this.loggedIn = this.sharedService.getLoggedInStatus();
  }

  loadUserData() {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID'); // Get the userID from localStorage

    if (token && userID) {
      this.combinedService.getUserDataById(token, userID).subscribe(
        (data: any) => {
          if (data.isAdmin) {
            this.sharedService.setAdminStatus(true);
          }
          this.sharedService.setLoggedInStatus(true);
          this.loggedIn = true;
        },
        (error: any) => {
          console.error('Endpoint error:', error);
        }
      );
    }
  }

  loadUserEmail() {

    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID'); // Get the userID from localStorage

    if (token && userID) {
      this.combinedService.getUserDataById(token, userID).subscribe(
        (data: any) => {
          this.userEmail = data.email;
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
