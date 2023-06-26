import { Component, OnInit } from '@angular/core';
import { AuthService } from '.././service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  isSubMenuOpen: boolean = false;
  isAdminVisible: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkAdminVisibility();
  }

  checkAdminVisibility() {
    this.isAdminVisible = true;
    console.log(this.isAdminVisible)
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isSubMenuOpen = false;
  }

  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
