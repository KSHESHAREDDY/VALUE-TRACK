import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-launch',
  imports: [],
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.scss'
})
export class LaunchComponent {

  user$: Observable<any>;

  constructor(private store: Store<{ auth: any }>, private router: Router) {
    this.user$ = this.store.select(state => state.auth.user);
  }

  ngOnInit(): void {

  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/register']);
  }
}
