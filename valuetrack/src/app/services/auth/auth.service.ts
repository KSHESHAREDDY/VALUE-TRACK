import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export const baseUrl = 'http://localhost:8000/api/auth/';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {

  }

  login(creds: { usernameOrEmail: string, password: string }): Observable<any> {
    return this.httpClient.post(baseUrl + "login", creds).pipe(catchError(err => throwError(() => err)));
  }

  register(registerData: { username: string, email: string, password: string }): Observable<any> {
    return this.httpClient.post(baseUrl + "register", registerData).pipe(catchError(err => throwError(() => err)));
  }

  verifyOtp(email: string, otpCode: string): Observable<any> {
    return this.httpClient.post(baseUrl + 'verify-otp', { email, otpCode });
  }

  resendOtp(email: string): Observable<any> {
    return this.httpClient.post('resend-otp', { email });
  }
}
