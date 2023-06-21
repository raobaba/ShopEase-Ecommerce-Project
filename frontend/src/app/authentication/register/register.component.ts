import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  submitForm() {
    // Logic to handle form submission
    console.log('Form submitted!');
  }
}
