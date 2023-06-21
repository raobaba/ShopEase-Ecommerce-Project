import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isHomeVisit: boolean = false;

  ngOnInit(): void {
    this.something.events.subscribe((value: any) => {
      if (value.url) {
        if (value.url === '/') {
          this.isHomeVisit = true;
        } else {
          this.isHomeVisit = false;
        }
      }
    });
  }
  constructor(private something:Router){
    
  }
  
}
