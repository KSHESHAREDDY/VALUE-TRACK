import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HeaderComponent } from './componets/shared/header/header.component';
import { FooterComponent } from './componets/shared/footer/footer.component';
import { AuthService } from './services/auth/auth.service';
import { select, Store } from '@ngrx/store';
import { AuthState } from './store/auth/store/auth.state';
import { AsyncPipe } from '@angular/common';
import { LaunchComponent } from './componets/launch/launch.component';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'Value Track';
  isLoggedIn$!: Observable<boolean>;
  private sub = new Subscription();

  constructor(private store: Store<{ auth: AuthState }>) {
    this.isLoggedIn$ = this.store.pipe(select(state => state.auth.isLoggedIn));
  }

  ngOnInit(): void {
    this.sub.add();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
