import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private baseUrl = 'http://localhost:8080/offers';

  constructor(private http: HttpClient) { }

  getOffers() {
    return this.http.get(this.baseUrl);
  }
}
