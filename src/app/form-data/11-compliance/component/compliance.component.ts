import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {ComplianceMotiveEnum} from '../enums/compliance-motive.enum';

@Component({
  selector: 'compliance-component',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    Select
  ],
  templateUrl: './compliance.component.html',
  standalone: true,
  styleUrl: './compliance.component.css'
})
export class ComplianceComponent implements OnInit{
  @Input() complianceForm !: FormGroup;
  complianceMotiveOptions: { label: string, value: string }[] = [];
  ngOnInit(): void {
    this.complianceMotiveOptions = Object.values(ComplianceMotiveEnum).map((motive) => ({
      label: motive,
      value: motive
    }));
  }
}
