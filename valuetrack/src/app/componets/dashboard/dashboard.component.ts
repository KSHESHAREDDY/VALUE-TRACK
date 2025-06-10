import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MarriageDebtsComponent } from '../marriage-debts/marriage-debts.component';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, MarriageDebtsComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
