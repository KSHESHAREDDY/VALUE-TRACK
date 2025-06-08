import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../../auth/store/auth.actions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  user$: Observable<any>;

  constructor(private store: Store<{ auth: any }>, private router: Router) {
    this.user$ = this.store.select(state => state.auth.user);
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['/']);
  }

}
