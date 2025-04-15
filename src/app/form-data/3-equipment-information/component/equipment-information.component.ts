import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {BrandEnum} from '../enums/brand.enum';
import {DropdownModule} from 'primeng/dropdown';

@Component({
  selector: 'equipment-information-component',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    DropdownModule
  ],
  templateUrl: './equipment-information.component.html',
  standalone: true,
  styleUrl: './equipment-information.component.css'
})
export class EquipmentInformationComponent implements OnInit{
  @Input() equipmentInformationForm!: FormGroup;
  brandOptions: { label: string, value: string }[] = [];

  ngOnInit(): void {
    this.brandOptions = Object.values(BrandEnum).map((brand) => ({
      label: brand,
      value: brand
    }));
  }
}
