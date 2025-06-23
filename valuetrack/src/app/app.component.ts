import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy{
  
  title = 'Value Track';
  private sub = new Subscription();

  ngOnInit(): void {
    this.sub.add();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
