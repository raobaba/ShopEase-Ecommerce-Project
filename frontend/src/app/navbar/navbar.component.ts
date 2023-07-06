import { Component, OnInit } from '@angular/core';
import { CombinedService } from '.././service/combine.service';
import { SharedService } from '.././service/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  isSubMenuOpen: boolean = false;
  isAdminVisible: boolean = false;
  loggedIn: boolean = false;

  constructor(
    private combinedService: CombinedService,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.checkAdminVisibility();
    this.sharedService.isAdmin$.subscribe((isAdmin: boolean) => {
      this.isAdminVisible = isAdmin;
    });
  }


  checkAdminVisibility() {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID')!; // Add '!' to assert that it won't be null

    if (token) {
      this.combinedService.getUserDataById(token, userID).subscribe(
        (data: any) => {
          console.log(data);
          console.log('Navbar', data.isAdmin);
          if (data.isAdmin) {
            this.isAdminVisible = true;
            this.sharedService.setAdminStatus(true);
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
  cartStatus =
    this.cartItemCount > 0
      ? `There are currently ${this.cartItemCount} items in your cart`
      : `There are currently no items in your cart`;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  updateCartItemCount(newCount: number): void {
    this.cartItemCount = newCount;
  }
}
