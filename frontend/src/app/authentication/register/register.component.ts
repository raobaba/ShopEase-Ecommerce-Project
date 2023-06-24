import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formSubmitted: boolean = false;
  constructor(private http: HttpClient) { }
  submitForm() {
    this.formSubmitted = true;
    // Handle form submission logic here
  }
}
