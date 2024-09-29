// import { Component, OnInit } from '@angular/core';
// import { AuthService } from './services/auth.service';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })

// export class AppComponent implements OnInit {
//   Istoggle: boolean = true;
//   isLoggedIn: boolean = false;

//   constructor(private authService: AuthService) { }

//   ngOnInit(): void {
//     this.authService.isLoggedIn$.subscribe((isLoggedIn: any) => {
//       this.isLoggedIn = isLoggedIn;
//       // Set Istoggle based on the authentication status
//       this.Istoggle = isLoggedIn;
//     });
//   }

//   toggle() {
//     this.Istoggle = !this.Istoggle;
//   }
// }


import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatDrawer } from '@angular/material/sidenav'; // Import MatDrawer

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;  // Reference to the mat-drawer
  Istoggle: boolean = true;
  isLoggedIn: boolean = false;
  isDrawerOpened: boolean = true;  // New property to track drawer state

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn: any) => {
      this.isLoggedIn = isLoggedIn;
      // Set drawer state based on authentication status
      this.Istoggle = isLoggedIn;
      this.isDrawerOpened = isLoggedIn;
    });
  }

  toggle() {
    this.Istoggle = !this.Istoggle;
    this.isDrawerOpened = !this.isDrawerOpened;  // Track drawer open/close state
  }
}
