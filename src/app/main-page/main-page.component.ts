import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NocodeapiService} from '../nocodeapi/nocodeapi.service';

@Component({
  selector: 'app-main-page',
  imports: [
    Button,
    RouterLink,
    FloatLabel,
    InputText,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './main-page.component.html',
  standalone: true,
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  request: string = "";
  nocodeapiService: NocodeapiService = new NocodeapiService();
  constructor(private router: Router) {}
  goToWorkOrder(search?:boolean):void {
    if(!search) this.router.navigate(['work-order']);
    this.nocodeapiService.getData();
  }
}
