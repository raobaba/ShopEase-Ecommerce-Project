import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CombinedService } from '../../service/combine.service';
import { SharedService } from '../../service/shared.service';

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
  loggedIn = false;
  userEmail: string = ''; 

  constructor(
    private combinedService: CombinedService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  submitForm() {
    this.formSubmitted = true;
    const formData = {
      userName: this.userName,
      email: this.email,
      password: this.password
    };
    this.combinedService.loginUser(formData).subscribe(
      (response: any) => {
        if (response && response.success) {
          alert('LOGIN SUCCESSFUL');
          console.log('API request successful', response);
          const token = response.token;
          const userID = response.userID;
          localStorage.setItem('token', token);
          localStorage.setItem('userID', userID);
          this.combinedService.getUserDataById(token, userID).subscribe(
            (data: any) => {
              console.log('Endpoint response:', data.isAdmin);
              if (data.isAdmin) {
                console.log("Login", data.isAdmin);
                this.sharedService.setAdminStatus(true); // Set admin status
              }
              this.sharedService.setLoggedInStatus(true);
              console.log("Login status", this.sharedService.getLoggedInStatus());
              this.router.navigateByUrl(data.isAdmin ? '/authentication/admin' : '/');
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
    localStorage.removeItem('token'); 
    this.sharedService.setLoggedInStatus(false);
    this.router.navigateByUrl('/');
  }

  private handleLoginError() {
    alert('Error occurred during login. Please try again later.');
  }
}
