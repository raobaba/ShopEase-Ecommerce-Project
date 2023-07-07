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

  constructor(private combinedService: CombinedService, private router: Router) {}

  submitForm() {
    this.formSubmitted = true;
    this.formSubmitting = true;

    this.combinedService.registerUser(this.fullName, this.userName, this.email, this.password, this.isAdmin)
      .subscribe(
        (response: any) => {
          if (response && response.success) {
            alert('SIGNUP SUCCESSFUL');
            console.log('API request successful', response);
            this.router.navigate(['/authentication/login']);
          } else {
            this.handleRegistrationError();
            console.error('API request error', response);
          }
          this.formSubmitting = false;
        },
        (error: any) => {
          if (error instanceof SyntaxError) {
            this.handleRegistrationError();
            console.error('JSON parsing error', error);
          } else {
            console.error('API request error', error);
            this.handleRegistrationError();
          }
          this.formSubmitting = false;
        }
      );
  }

  private handleRegistrationError() {
    alert('Error occurred during signup. Please try again later.');
  }
}
