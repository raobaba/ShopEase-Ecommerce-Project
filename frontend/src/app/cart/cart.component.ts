import { Component } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent {
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
