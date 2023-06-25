import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loading: boolean = false;
  user: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.loading = true;
    this.http.get('http://localhost:8080/getUser').subscribe(
      (response: any) => {
        this.loading = false;
        this.user = response;
      },
      (error: any) => {
        this.loading = false;
        console.error('API request error', error);
      }
    );
  }
}
