import { Component, Input, OnInit } from '@angular/core';
import { MultiSelectModule } from 'primeng/multiselect';
import {ShowOnlyEnum} from '../request/enums/show-only.enum';

@Component({
  selector: 'navbar-component',
  imports: [MultiSelectModule],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  @Input() showOnly: string = "";
  showOnlyOptions: { label: string; value: string }[] = [];

  ngOnInit(): void {
    this.showOnlyOptions = Object.values(ShowOnlyEnum).map((show) => ({label: show, value: show}));
  }
}
