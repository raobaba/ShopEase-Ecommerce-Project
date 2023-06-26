import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = {};
  isAdminVisible: boolean = false;

  updateUser(user: any) {
    this.user = user;
    this.isAdminVisible = this.user.email === 'admin@gmail.com';
  }
}
