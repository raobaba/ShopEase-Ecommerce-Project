import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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
  constructor(private http: HttpClient, private router: Router) { }
  submitForm() {
    this.formSubmitted = true;
    const formData = {
      userName: this.userName,
      email: this.email,
      password: this.password
    };
    this.http.post<any>('http://localhost:8080/login', formData).subscribe(
      (response: any) => {
        if (response && response.success) {
          alert('LOGIN SUCCESSFUL');
          console.log('API request successful', response);
          const token = response.token;
          console.log(token)
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          console.log(headers)
          this.http.get('http://localhost:8080/getUser', { headers }).subscribe(
            (data: any) => {
              console.log('Endpoint response:', data);
              this.router.navigateByUrl('/');
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
