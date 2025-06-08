import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = {
    usernameOrEmail: '',
    password: '',
  };

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router : Router, private store : Store) {

  }

  onSubmit(form: any) {
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
}
