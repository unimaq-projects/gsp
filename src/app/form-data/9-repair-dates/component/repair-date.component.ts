import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DatePicker} from 'primeng/datepicker';
import {FloatLabel} from 'primeng/floatlabel';

@Component({
  selector: 'repair-date-component',
  imports: [
    ReactiveFormsModule,
    DatePicker,
    FloatLabel
  ],
  templateUrl: './repair-date.component.html',
  standalone: true,
  styleUrl: './repair-date.component.css'
})
export class RepairDateComponent {
  @Input() repairDateForm !: FormGroup;
}
