import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'repair-date-component',
  imports: [],
  templateUrl: './repair-date.component.html',
  standalone: true,
  styleUrl: './repair-date.component.css'
})
export class RepairDateComponent {
  @Input() repairDateForm !: FormGroup;
}
