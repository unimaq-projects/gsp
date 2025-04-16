import {Component, Input} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ToggleSwitch} from 'primeng/toggleswitch';

@Component({
  selector: 'other-component',
  imports: [
    ReactiveFormsModule,
    ToggleSwitch
  ],
  templateUrl: './other.component.html',
  standalone: true,
  styleUrl: './other.component.css'
})
export class OtherComponent {
  @Input() otherForm !: FormGroup;
}
