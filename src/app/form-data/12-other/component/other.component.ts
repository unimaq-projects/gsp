import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'other-component',
  imports: [],
  templateUrl: './other.component.html',
  standalone: true,
  styleUrl: './other.component.css'
})
export class OtherComponent {
  @Input() otherForm !: FormGroup;
}
