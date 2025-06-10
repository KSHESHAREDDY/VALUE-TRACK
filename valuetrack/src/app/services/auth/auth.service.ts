import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export const loginUrl = 'http://localhost:8000/api/auth/login';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient) {

  }

  login(creds: { usernameOrEmail: string, password: string }) : Observable<any> {
    return this.httpClient.post(loginUrl, creds).pipe(catchError(err => throwError(() => err)));
  }
}
