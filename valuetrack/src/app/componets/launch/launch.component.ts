import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../store/auth/store/auth.actions';
import { NgxOtpInputComponent, NgxOtpInputComponentOptions } from 'ngx-otp-input';

@Component({
  selector: 'app-launch',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxOtpInputComponent],
  providers: [AuthService],
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.scss'
})
export class LaunchComponent {
  isLogin = true;
  showOtpInput = false;
  otpValue = '';
  registeredEmail = '';

  otpConfig: NgxOtpInputComponentOptions = {
    otpLength: 6,                     // Number of input boxes
    autoFocus: true,                  // Automatically focus the first box
    autoBlur: false,                  // Prevent blurring after full OTP
    hideInputValues: false,           // Show typed values (false = visible)
    regexp: /^[0-9]$/,                // Only allow numbers
    showBlinkingCursor: true,        // Optional: Show blinking cursor
    inputMode: 'numeric',            // Brings up numeric keyboard on mobile
    ariaLabels: ['Digit 1', 'Digit 2', 'Digit 3', 'Digit 4', 'Digit 5', 'Digit 6'] // Accessibility
  };


  loginData = {
    usernameOrEmail: '',
    password: ''
  };

  registerData = {
    username: '',
    email: '',
    password: ''
  };

  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router, private store: Store) { }

  toggleMode(isLogin: boolean, form: NgForm): void {
    this.isLogin = isLogin;
    this.errorMessage = '';
    this.successMessage = '';
    form.reset();
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) return;

    if (this.isLogin) {
      this.authService.login(this.loginData).subscribe({
        next: res => {
          this.store.dispatch(loginSuccess({ user: res.data }));
          this.router.navigate(['/marriage']);
        },
        error: err => {
          this.errorMessage = err.error?.message || "Login failed. Please try again.";
        }
      });
    } else {
      this.authService.register(this.registerData).subscribe({
        next: () => {
          this.registeredEmail = this.registerData.email;
          this.showOtpInput = true;
          this.errorMessage = '';
        },
        error: (err) => {
          this.errorMessage = err.error?.message || "Registration failed. Please try again.";
        }
      });
    }
  }

  onOtpChange(event: any): void {
    this.otpValue = event.otp || '';
  }

  onOtpComplete(otp: string) {
    this.otpValue = otp;
    this.verifyOtp();
  }

  verifyOtp(): void {
    if (this.otpValue.length !== 6) {
      this.errorMessage = "Please enter the full OTP code.";
      return;
    }

    this.authService.verifyOtp(this.registeredEmail, this.otpValue).subscribe({
      next: () => {
        this.successMessage = 'Email verified successfully!';
        setTimeout(() => {
          this.isLogin = true;
          this.showOtpInput = false;
          this.successMessage = '';
        }, 1500);
      },
      error: () => {
        this.errorMessage = 'Invalid or expired OTP. Please try again.';
      }
    });
  }
}

