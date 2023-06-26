import { Component } from '@angular/core';
import { AuthService } from '.././service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMenuOpen: boolean = false;
  isSubMenuOpen: boolean = false;
  isAdminVisible: boolean = false;
  
  constructor(private authService: AuthService) {}

  checkAdminVisibility() {
    this.isAdminVisible = this.authService.isAdminVisible;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isSubMenuOpen = false;
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
