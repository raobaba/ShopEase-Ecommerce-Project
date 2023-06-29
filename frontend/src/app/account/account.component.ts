import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '.././service/login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  isDropdownOpen = false; 
  loggedIn = false;
  userEmail: string = ''; 

  constructor(private loginService: LoginService, private router: Router) {}

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
          } else {
            console.log('User is not an admin.');
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
    this.userEmail = ''; 
    this.router.navigate(['/']); 
  }
}
