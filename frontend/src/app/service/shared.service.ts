import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdminSubject.asObservable();
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  setAdminStatus(isAdmin: boolean) {
    this.isAdminSubject.next(isAdmin);
  }
  
  setLoggedInStatus(loggedIn: boolean) {
    this.loggedInSubject.next(loggedIn);
  }

  getLoggedInStatus() {
    return this.loggedInSubject.getValue();
  }

  constructor() { }
}
