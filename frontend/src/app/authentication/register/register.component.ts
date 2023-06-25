import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) { }

  submitForm() {
    this.formSubmitted = true;
    const formData = {
      fullName: this.fullName,
      userName: this.userName,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:8080/register', formData).subscribe(
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
