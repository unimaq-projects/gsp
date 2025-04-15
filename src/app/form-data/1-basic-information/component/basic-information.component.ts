import {Component, Input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'basic-information-component',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FloatLabel,
    InputText
  ],
  templateUrl: './basic-information.component.html',
  standalone: true,
  styleUrl: './basic-information.component.css'
})
export class BasicInformationComponent {
  @Input() basicInformationForm!: FormGroup;
}
