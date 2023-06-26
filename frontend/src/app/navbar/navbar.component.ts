import { Component } from '@angular/core';
import { LoginService } from '.././service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMenuOpen: boolean = false;
  isSubMenuOpen: boolean = false;
  isAdminVisible: boolean = false;

  constructor(private loginService: LoginService) {}

  checkAdminVisibility() {
    const token = localStorage.getItem('token');

    if (token) {
      this.loginService.getUserData(token).subscribe(
        (data: any) => {
          if (data && data.email === 'admin@gmail.com') {
            this.isAdminVisible = true;
          }
        },
        (error: any) => {
          console.error('Endpoint error:', error);
        }
      );
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isSubMenuOpen = false;
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
