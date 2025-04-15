import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'start-date-component',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    DatePicker
  ],
  templateUrl: './start-date.component.html',
  standalone: true,
  styleUrl: './start-date.component.css'
})
export class StartDateComponent {
  @Input() startDateForm!: FormGroup;
}
