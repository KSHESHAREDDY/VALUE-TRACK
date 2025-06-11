import { CommonModule } from "@angular/common";
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../services/auth/auth.service";
import { ActivatedRoute, Router } from "@angular/router";

// email-otp.component.ts
@Component({
  selector: 'app-email-otp',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-otp.component.html',
  styleUrls: ['./email-otp.component.scss']
})
export class EmailOtpComponent implements OnInit {
  otp: string[] = ['', '', '', '', '', ''];
  email!: string;
  errorMessage = '';
  successMessage = '';
  isSubmitting = false;

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') ?? '';
  }

  ngAfterViewInit() {
    this.otpInputs.first.nativeElement.focus();
  }

  onKeyUp(event: any, index: number) {
    const key = event.key;

    if (key && key.length === 1 && index < 5) {
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }

    if (key === 'Backspace' && index > 0) {
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  verifyOtp() {
    this.isSubmitting = true;
    const code = this.otp.join('');
    this.authService.verifyOtp(this.email, code).subscribe({
      next: () => {
        this.successMessage = 'Email verified! You can now login.';
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: () => {
        this.errorMessage = 'Invalid or expired OTP. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  resendOtp() {
    this.authService.resendOtp(this.email).subscribe({
      next: () => this.successMessage = 'OTP resent successfully!',
      error: () => this.errorMessage = 'Failed to resend OTP.'
    });
  }
}
