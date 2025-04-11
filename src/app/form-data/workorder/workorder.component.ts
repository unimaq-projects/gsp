import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {NavbarComponent} from '../../navbar/navbar.component';
import {BasicInformationComponent} from '../1-basic-information/component/basic-information.component';
@Component({
  selector: 'app-workorder',
  imports: [
    FormsModule,
    NgIf,
    NavbarComponent,
    BasicInformationComponent
  ],
  templateUrl: './workorder.component.html',
  standalone: true,
  styleUrl: './workorder.component.css'
})
export class WorkorderComponent {

}
