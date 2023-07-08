import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CombinedService } from '../../service/combine.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formSubmitted = false;
  formSubmitting = false;
  fullName: string = '';
  userName: string = '';
  email: string = '';
  password: string = '';
  isAdmin: boolean = false;
  responseMessage: string = '';

  constructor(private combinedService: CombinedService, private router: Router) {}

  submitForm() {
    this.formSubmitted = true;
    this.formSubmitting = true;

    this.combinedService.registerUser(this.fullName, this.userName, this.email, this.password, this.isAdmin)
      .subscribe(
        (response: any) => {
          if (response && response.success) {
            this.responseMessage = 'SIGNUP SUCCESSFUL';
            console.log('API request successful', response);
            this.router.navigate(['/authentication/login']);
          } else {
            this.responseMessage = 'Error: ' + response.message;
            console.error('API request error', response);
          }
          this.formSubmitting = false;
          alert(this.responseMessage);
        },
        (error: any) => {
          if (error instanceof SyntaxError) {
            this.responseMessage = 'Error occurred during signup. Please try again later.';
            console.error('JSON parsing error', error);
          } else if (error.status === 400) {
            this.responseMessage = 'This email is already in use. Try to register with another email.';
            console.error('Bad Request error', error);
          } else {
            this.responseMessage = 'Error: ' + error.message;
            console.error('API request error', error);
          }
          this.formSubmitting = false;
          alert(this.responseMessage);
        }
      );
  }
}
