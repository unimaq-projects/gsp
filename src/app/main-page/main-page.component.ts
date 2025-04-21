import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NocodeapiService} from '../nocodeapi/nocodeapi.service';
import {WorkorderEntity} from '../request/entities/workorder.entity';

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
  request: number = 0;
  nocodeapiService: NocodeapiService = new NocodeapiService();
  constructor(private router: Router) {}
  async goToWorkOrder(search?:boolean):Promise<WorkorderEntity | undefined> {
    if(!search) this.router.navigate(['work-order']);
    return await this.nocodeapiService.getRequestById(this.request);
  }
}
