import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {Select} from 'primeng/select';
import {StateEnum} from '../../2-detailed-information/enums/state.enum';
import {DefaultCompletionStateEnum} from '../../../shared/enums/default-completion-state.enum';
import {DatePicker} from 'primeng/datepicker';

@Component({
  selector: 'provider-date-component',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    Select,
    DatePicker
  ],
  templateUrl: './provider-date.component.html',
  standalone: true,
  styleUrl: './provider-date.component.css'
})
export class ProviderDateComponent implements OnInit{
  @Input() providerDateForm !: FormGroup;
  providerStateOptions: { label: string, value: string }[] = [];

  ngOnInit(): void {
    this.providerStateOptions = Object.values(DefaultCompletionStateEnum).map((providerState) => ({
      label: providerState,
      value: providerState
    }));
  }
}
