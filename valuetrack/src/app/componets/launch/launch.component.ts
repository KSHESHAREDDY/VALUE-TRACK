import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../store/auth/store/auth.actions';

@Component({
  selector: 'app-launch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [AuthService],
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.scss'
})
export class LaunchComponent {
  isLogin = true;

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

  toggleMode(): void {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.authService.login(this.loginData).subscribe({
        next: res => {
          this.store.dispatch(loginSuccess({ user: res.data }));
          this.router.navigate(['/dashboard']);
        },
        error: err => {
          if (err.error?.message) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = "An unexpected error occurred.";
          }
        }
      });
    }
  }

  constructor(private authService: AuthService, private router: Router, private store: Store) {

  }
}
