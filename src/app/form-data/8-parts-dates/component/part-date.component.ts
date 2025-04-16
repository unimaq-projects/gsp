import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {DefaultCompletionStateEnum} from '../../../shared/enums/default-completion-state.enum';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'part-date-component',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    Select,
    DatePicker
  ],
  templateUrl: './part-date.component.html',
  standalone: true,
  styleUrl: './part-date.component.css'
})
export class PartDateComponent implements OnInit{
  @Input() partDateForm !: FormGroup;
  partStateOptions: { label: string, value: string }[] = [];
  ngOnInit(): void {
    this.partStateOptions = Object.values(DefaultCompletionStateEnum).map((partState) => ({
      label: partState,
      value: partState
    }));
  }
}
