import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SharedServices } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: any;
  showPassword: boolean = false;
  gstNumberErrorMessageShown = false;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private loginService: SharedServices,
    private authService: AuthService,
  ) {
    sessionStorage.clear();
  }

  ngOnInit(): void { }
  // Login Form
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
  });

  
  // Login functionality
  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const loginData = { email, password };
  
      this.loginService.login(loginData).subscribe(
        (res: any) => {
  
          // Assuming that the response contains a token or some indicator of successful login
          if (res && res.token) {

            this.authService.setLoggedIn(true);

            // Customization: You may want to store the token in localStorage for future API requests
            localStorage.setItem('token', res.token);
  
            // Success Message
            this.toastr.success('Login Successfully.', 'Success', {
              timeOut: 2000,
            });
  
            // Customization: Redirect to dashboard or any other desired page upon successful login
            this.router.navigate(['/dashboard']);
          }
        },
        (error) => {
          if (error.status === 401) {
            this.authService.setLoggedIn(false);
            // Handle 401 Unauthorized error
            this.toastr.error('Unauthorized. Check your credentials', 'Error', {
              timeOut: 1500,
            });
          } else {
            // Customization: You may want to provide more specific error messages based on the error response
            this.toastr.error('Invalid Credentials or Server Error', 'Error', {
              timeOut: 1500,
            });
          }
        }
      );
    } else {
      // Warning for validation.
      this.toastr.warning('Please enter valid data.');
    }
  }
  

  gstNumberError() {
    this.toastr.warning(
      'GST Number must be at least 15 characters.',
      'Required',
      {
        timeOut: 2000,
      }
    );

    this.gstNumberErrorMessageShown = true;
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

  passwordError() {
    this.toastr.warning(
      `<ul>
        <li>Password must be 8 characters long.</li>
        <li>Must contain one uppercase character</li>
        <li>Must contain one digit character</li>
        <li>Must contain one special character</li>
      </ul>`,
      'Password Error',
      {
        timeOut: 5000,
        enableHtml: true, // Enable HML content
      }
    );

    this.gstNumberErrorMessageShown = true;
  }


  // Show password functionality
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}

export interface LoginFormData {
  email: string | null | undefined;
  password: string | null | undefined;
}
