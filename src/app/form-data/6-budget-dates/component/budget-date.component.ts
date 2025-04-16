import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {BudgetStateEnum} from '../enums/budget-state.enum';

@Component({
  selector: 'budget-date-component',
  imports: [
    ReactiveFormsModule,
    DatePicker,
    FloatLabel,
    Select
  ],
  templateUrl: './budget-date.component.html',
  standalone: true,
  styleUrl: './budget-date.component.css'
})
export class BudgetDateComponent implements OnInit{
  @Input() budgetDateForm !: FormGroup;
  budgetStateOptions: { label: string; value: string }[] = [];

  ngOnInit(): void {
    this.budgetStateOptions = Object.values(BudgetStateEnum).map((budgetState) => ({
      label: budgetState,
      value: budgetState
    }));
  }
}
