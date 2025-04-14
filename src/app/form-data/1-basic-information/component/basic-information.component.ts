import {Component, Input} from '@angular/core';
import {FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'basic-information-component',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './basic-information.component.html',
  standalone: true,
  styleUrl: './basic-information.component.css'
})
export class BasicInformationComponent {
  @Input() basicInformationForm!: FormGroup;
}
