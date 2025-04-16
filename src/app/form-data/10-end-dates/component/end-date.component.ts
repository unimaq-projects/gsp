import {Component, Input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePicker} from "primeng/datepicker";
import {FloatLabel} from "primeng/floatlabel";
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'end-date-component',
  imports: [
    DatePicker,
    FloatLabel,
    FormsModule,
    ReactiveFormsModule,
    InputText
  ],
  templateUrl: './end-date.component.html',
  standalone: true,
  styleUrl: './end-date.component.css'
})
export class EndDateComponent {
  @Input() endDateForm !: FormGroup;
}
