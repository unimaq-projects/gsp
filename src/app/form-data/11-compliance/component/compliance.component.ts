import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'compliance-component',
  imports: [],
  templateUrl: './compliance.component.html',
  standalone: true,
  styleUrl: './compliance.component.css'
})
export class ComplianceComponent {
  @Input() complianceForm !: FormGroup;
}
