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

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

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
          console.log(token);

          // Store the token in localStorage
          localStorage.setItem('token', token);

          this.loginService.getUserData(token).subscribe(
            (data: any) => {
              console.log('Endpoint response:', data[data.length - 1].email);
              if (data[data.length - 1].email === 'admin@gmail.com') {
                this.router.navigateByUrl('/authorization/admin');
              } else {
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

  private handleLoginError() {
    alert('Error occurred during login. Please try again later.');
  }
}
