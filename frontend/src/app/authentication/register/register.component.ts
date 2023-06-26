import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formSubmitted = false;
  fullName: string = '';
  userName: string = '';
  email: string = '';
  password: string = '';
  router: any;

  constructor(private registerService: RegisterService) { }

  submitForm() {
    this.formSubmitted = true;

    this.registerService.registerUser(this.fullName, this.userName, this.email, this.password)
      .subscribe(
        (response: any) => {
          if (response && response.success) {
            alert('SIGNUP SUCCESSFUL');
            console.log('API request successful', response);
            this.router.navigate(['/authentication/login']); // Redirect to login page
          } else {
            this.handleRegistrationError();
            console.error('API request error', response);
          }
        },
        (error: any) => {
          if (error instanceof SyntaxError) {
            this.handleRegistrationError();
            console.error('JSON parsing error', error);
          } else {
            console.error('API request error', error);
            this.handleRegistrationError();
          }
        }
      );
  }

  private handleRegistrationError() {
    alert('Error occurred during signup. Please try again later.');
  }
}
