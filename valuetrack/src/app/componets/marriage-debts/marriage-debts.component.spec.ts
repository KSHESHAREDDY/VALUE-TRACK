import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarriageDebtsComponent } from './marriage-debts.component';

describe('MarriageDebtsComponent', () => {
  let component: MarriageDebtsComponent;
  let fixture: ComponentFixture<MarriageDebtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarriageDebtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarriageDebtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
