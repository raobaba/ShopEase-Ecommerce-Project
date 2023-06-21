import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-top-offers',
  templateUrl: './top-offers.component.html',
  styleUrls: ['./top-offers.component.css']
})
export class TopOffersComponent {
  @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;

  slideLeft() {
    if (this.slider.nativeElement) {
      this.slider.nativeElement.scrollLeft -= this.getSlideDistance();
    }
  }

  slideRight() {
    if (this.slider.nativeElement) {
      this.slider.nativeElement.scrollLeft += this.getSlideDistance();
    }
  }

  getSlideDistance(): number {
    const containerWidth = this.slider.nativeElement.offsetWidth;
    const numBoxes = this.slider.nativeElement.childElementCount;
    const boxWidth = containerWidth / numBoxes;
    return boxWidth;
  }
}
