import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-marriage-debts',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './marriage-debts.component.html',
  styleUrls: ['./marriage-debts.component.scss']
})
export class MarriageDebtsComponent {
  showForm = false;
  debtForm: FormGroup;
  debts: any[] = [];

  constructor(private fb: FormBuilder) {
    this.debtForm = this.fb.group({
      name: ['', Validators.required],
      village: ['', Validators.required],
      nickname: [''],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addDebt() {
    if (this.debtForm.valid) {
      this.debts.push(this.debtForm.value);
      this.debtForm.reset();
    }
  }
}
