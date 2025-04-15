import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'part-date-component',
  imports: [],
  templateUrl: './part-date.component.html',
  standalone: true,
  styleUrl: './part-date.component.css'
})
export class PartDateComponent {
  @Input() partDateForm !: FormGroup;
}
