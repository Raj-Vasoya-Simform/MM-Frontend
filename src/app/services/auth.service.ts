import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() {
    // Retrieve the authentication status from localStorage on service initialization
    this.isLoggedInSubject.next(localStorage.getItem('isLoggedIn') === 'true');
  }

  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
    // Store the authentication status in localStorage
    localStorage.setItem('isLoggedIn', value.toString());
  }
}

