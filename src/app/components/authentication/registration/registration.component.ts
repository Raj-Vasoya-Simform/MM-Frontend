import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { SharedServices } from 'src/app/services/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  showPassword: boolean = false;
  confirmPasswordErrorVisible = false;
  showConfirmPasswordError = true;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private registrationService: SharedServices,
  ) { }

  ngOnInit(): void { }

  // Registration Form
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    gstNumber: new FormControl('', [Validators.minLength(15),
    Validators.maxLength(15),
    Validators.pattern(/^[A-Z0-9]+$/),]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  // Register Functionality
  onRegister() {
    if (this.registerForm.valid) {
      const { email, gstNumber, password, confirmPassword } = this.registerForm.value;

      if (email && gstNumber && password && confirmPassword) {

        const registrationData = {email, gstNumber, password, confirmPassword};

        this.registrationService.registration(registrationData).subscribe(
          (res) => {
            this.toastr.success(
              'Please contact admin to enable access.',
              'Registered Successfully.'
            );

         // Reset the form after successful registration
         this.registerForm.reset();

            this.router.navigate(['/']);
          },
          (error) => {
            // Handle error, show appropriate message
            console.error('Registration failed:', error);
            this.toastr.error('Registration failed. Please try again later.');
          }
        );
      } else {
        this.toastr.warning('Please enter valid data.');
      }
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }

  // Email error toastr
  emailError() {
    this.toastr.warning(
      'Invalid Email',
      'Required',
      {
        timeOut: 2000,
      }
    );
  }


  // Name error toastr
  gstNumberError() {
    this.toastr.warning('GST Number is required.', 'Required', {
      timeOut: 2000,
    });
  }

  // Password error toastr
  passwordError() {
    this.toastr.warning(
      'Password is required and should have one uppercase letter, one lowercase letter, one special character, one number, and a minimum length of 8 characters.',
      'Required',
      {
        timeOut: 2000,
      }
    );
  }

  checkPasswordMatch() {
    const passwordControl = this.registerForm.get('password');
    const confirmPasswordControl = this.registerForm.get('confirmPassword');

    // Check if controls exist
    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      // Check if passwords match
      if (password !== confirmPassword) {
        // Show the confirmPassword error message
        this.confirmPasswordError();
      }
    }
  }


  confirmPasswordError() {
    this.confirmPasswordErrorVisible = true;
    this.toastr.warning('Password do not match.', 'Required', {
      timeOut: 2000,
    });

    // Set a timeout to hide the error message after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      this.showConfirmPasswordError = false;
    }, 5000);
  }


  // Show password functionality
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}


export interface RegisterFormData {
  email: string;
  gstNumber: string;
  password: string;
  confirmPassword: string;
}
