import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ElementRef, ViewChild } from '@angular/core';
import { SharedServices } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() menuButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() isDrawerOpened: boolean = false; 
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private router: Router, private authService: AuthService, private toastr: ToastrService,
    private sharedService: SharedServices) { }

  currentTime: Date = new Date();

  ngOnInit(): void {
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  toggle() {
    // Emit the event
    this.menuButtonClick.emit();
  }

  updateTime(): void {
    this.currentTime = new Date();
  }

  logout() {
    this.authService.setLoggedIn(false);

    // Success Message
    this.toastr.success('Logout Successfully.', 'Success', {
      timeOut: 2000,
    });

    // Redirect the user to the home page ("/")
    this.router.navigate(['/']);
  }

  editProfile() {
    // Trigger click on the hidden file input
    this.fileInput.nativeElement.click();
  }

}
