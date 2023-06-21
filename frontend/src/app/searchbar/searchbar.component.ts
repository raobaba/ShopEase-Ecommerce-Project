import { Component } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  isSearchDropdownOpen: boolean = false;

  toggleSearchDropdown() {
    this.isSearchDropdownOpen = !this.isSearchDropdownOpen;
  }
}
