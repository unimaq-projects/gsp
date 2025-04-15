import {Component, Input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FloatLabel} from "primeng/floatlabel";
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'evaluation-date-component',
  imports: [
    FloatLabel,
    FormsModule,
    ReactiveFormsModule,
    DatePicker
  ],
  templateUrl: './evaluation-date.component.html',
  standalone: true,
  styleUrl: './evaluation-date.component.css'
})
export class EvaluationDateComponent {
  @Input() evaluationDateForm!: FormGroup;
}
