import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  Istoggle: boolean = true; // Tracks whether sidenav is open or closed
  @Output() menuButtonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService) { }

  logout() {
    this.authService.setLoggedIn(false);

    // Success Message
    this.toastr.success('Logout Successfully.', 'Success', {
      timeOut: 2000,
    });

    // Redirect the user to the home page ("/")
    this.router.navigate(['/']);
  }
}
