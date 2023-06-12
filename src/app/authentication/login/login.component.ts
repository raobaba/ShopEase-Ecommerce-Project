import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitForm() {
    // Logic to handle form submission
    console.log('Form submitted!');
  }
}
