import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isMenuOpen: boolean = false;
  isSubMenuOpen: boolean = false;
  isAdminVisible: boolean = false;

  checkAdminVisibility() {
    this.isAdminVisible = true;
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.isSubMenuOpen = false;
  }
  toggleSubMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

}
