import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  constructor(private router: Router) {}

  redirectToLogin() {
    this.router.navigate(['/another-page']);
  }
  redirectToRegister(){
    this.router.navigate(['/another-page'])
  }
}
