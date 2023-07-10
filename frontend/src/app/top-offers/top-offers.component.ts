import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { OfferService } from '../service/offer.service';

@Component({
  selector: 'app-top-offers',
  templateUrl: './top-offers.component.html',
  styleUrls: ['./top-offers.component.css']
})
export class TopOffersComponent implements OnInit {
  @ViewChild('slider') slider!: ElementRef<HTMLDivElement>;
  intervalId: any;
  offers: any[] = []; // Array to store the offers

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.startAutoSlide();
    this.getOffers();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.slideRight();
    }, 3000); // Change the interval time as desired (in milliseconds)
  }

  stopAutoSlide() {
    clearInterval(this.intervalId);
  }

  slideLeft() {
    if (this.slider.nativeElement) {
      this.slider.nativeElement.scrollLeft -= this.getSlideDistance();
    }
  }

  slideRight() {
    if (this.slider.nativeElement) {
      this.slider.nativeElement.scrollLeft += this.getSlideDistance();
      if (this.slider.nativeElement.scrollLeft >= (this.slider.nativeElement.scrollWidth - this.slider.nativeElement.offsetWidth)) {
        // Reached the end, reset to the beginning
        this.slider.nativeElement.scrollLeft = 0;
      }
    }
  }

  getSlideDistance(): number {
    const containerWidth = this.slider.nativeElement.offsetWidth;
    const numBoxes = this.slider.nativeElement.childElementCount;
    const boxWidth = containerWidth / numBoxes;
    return boxWidth;
  }

  getOffers() {
    this.offerService.getOffers().subscribe(
      (data: any) => {
        console.log(data); // Display the fetched data in the console log
        this.offers = data.map((item: any) => {
          return {
            url: item.url,
            title: item.title.shortTitle,
            discount: item.discount
          };
        });
      },
      (error: any) => {
        console.error(error); // Handle any error that occurs during the API request
      }
    );
  }
}
