import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'end-date-component',
  imports: [],
  templateUrl: './end-date.component.html',
  standalone: true,
  styleUrl: './end-date.component.css'
})
export class EndDateComponent {
  @Input() endDateForm !: FormGroup;
}
