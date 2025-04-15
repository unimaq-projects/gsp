import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'budget-date-component',
  imports: [],
  templateUrl: './budget-date.component.html',
  standalone: true,
  styleUrl: './budget-date.component.css'
})
export class BudgetDateComponent {
  @Input() budgetDateForm !: FormGroup;
}
