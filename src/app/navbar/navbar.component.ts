import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Select} from 'primeng/select';
import {FormControl} from '@angular/forms';
import {ShowOnlyEnum} from '../request/enums/show-only.enum';

@Component({
  selector: 'navbar-component',
  imports: [Select],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  showOnlyControl = new FormControl(ShowOnlyEnum.TODOS);
  showOnlyOptions: { label: string; value: string }[] = [];
  @Output() showOnlyChanged = new EventEmitter<ShowOnlyEnum>();

  ngOnInit() {
    this.showOnlyOptions = Object.values(ShowOnlyEnum).map(key => ({ label: key, value: key }));

    this.showOnlyControl.valueChanges.subscribe(value => {
      if (value !== null) {
        this.showOnlyChanged.emit(value);
      }
    });
  }
}
