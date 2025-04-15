import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'provider-date-component',
  imports: [],
  templateUrl: './provider-date.component.html',
  standalone: true,
  styleUrl: './provider-date.component.css'
})
export class ProviderDateComponent {
  @Input() providerDateForm !: FormGroup;
}
