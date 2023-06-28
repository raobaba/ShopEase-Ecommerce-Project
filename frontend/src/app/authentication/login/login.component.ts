// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  formSubmitted = false;
  userName: string = '';
  email: string = '';
  password: string = '';
  loggedIn = false; // New property to track login status
  userEmail: string = ''; // New property to store logged-in user email

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  submitForm() {
    this.formSubmitted = true;
    const formData = {
      userName: this.userName,
      email: this.email,
      password: this.password
    };

    this.loginService.loginUser(formData).subscribe(
      (response: any) => {
        if (response && response.success) {
          alert('LOGIN SUCCESSFUL');
          console.log('API request successful', response);
          const token = response.token;
          const userID = response.userID;

          // Store the token in localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('userID', userID);

          this.loginService.getUserDataById(token, userID).subscribe(
            (data: any) => {
              console.log('Endpoint response:', response.isAdmin);
              if (data.isAdmin) {
                this.router.navigateByUrl('/authentication/admin');
              } else {
                this.loggedIn = true; // Update login status
                this.userEmail = data[data.length - 1].email; // Store logged-in user email
                this.router.navigateByUrl('/');
              }
            },
            (error: any) => {
              console.error('Endpoint error:', error);
              this.router.navigateByUrl('/');
            }
          );
        } else {
          this.handleLoginError();
          console.error('API request error', response);
        }
      },
      (error: any) => {
        if (error instanceof SyntaxError) {
          this.handleLoginError();
          console.error('JSON parsing error', error);
        } else {
          console.error('API request error', error);
          this.handleLoginError();
        }
      }
    );
  }

  logout() {
    localStorage.removeItem('token'); // Clear the stored token
    this.loggedIn = false; // Update login status
    this.userEmail = ''; // Clear logged-in user email
  }

  private handleLoginError() {
    alert('Error occurred during login. Please try again later.');
  }
}
