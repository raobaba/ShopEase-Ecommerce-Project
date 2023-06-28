import { Component, OnInit } from '@angular/core';
import { LoginService } from '.././service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  isSubMenuOpen: boolean = false;
  isAdminVisible: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.checkAdminVisibility();
  }

  checkAdminVisibility() {
    const token = localStorage.getItem('token');
    if (token) {
      this.loginService.getUserData(token).subscribe(
        (data: any) => {
          console.log(data)
          if (data[data.length-1] && data[data.length-1].email === 'admin@gmail.com') {
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
  isDropdownOpen = false;
  cartItemCount: number = 1;
  cartStatus = this.cartItemCount>0 ? `There are currently ${this.cartItemCount} items in your cart`
  :`There are currently no items in your cart` 
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  updateCartItemCount(newCount: number): void {
    this.cartItemCount = newCount;
  }
}
