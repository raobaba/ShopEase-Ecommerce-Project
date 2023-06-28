import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '.././service/login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  isDropdownOpen = false; // Add property to track dropdown state
  loggedIn = false; // New property to track login status
  userEmail: string = ''; // New property to store logged-in user email

  constructor(private loginService: LoginService, private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loggedIn = true;
      this.loginService.getUserData(token).subscribe(
        (data: any) => {
          this.userEmail = data[data.length - 1].email;
        },
        (error: any) => {
          console.error('Endpoint error:', error);
        }
      );
    }
  }

  logout() {
    localStorage.removeItem('token'); // Clear the stored token
    this.loggedIn = false; // Update login status
    this.userEmail = ''; // Clear logged-in user email
    this.router.navigate(['/']); // Navigate to the root route
  }
}
