import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {FloatLabel} from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NocodeapiService} from '../nocodeapi/nocodeapi.service';
import {WorkorderEntity} from '../request/entities/workorder.entity';
import { MessageService } from 'primeng/api';
import { WorkorderDataSharingService } from '../request/services/workorder-data-sharing.service';

@Component({
  selector: 'app-main-page',
  imports: [
    Button,
    RouterLink,
    FloatLabel,
    ToastModule,
    InputText,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './main-page.component.html',
  standalone: true,
  styleUrl: './main-page.component.css',
  providers: [MessageService]
})
export class MainPageComponent {
  request: number = 0;
  nocodeapiService: NocodeapiService = new NocodeapiService();
  constructor(
    private router: Router,
    private messageService: MessageService,
    private workorderDataSharingService: WorkorderDataSharingService
  ) {}
  async goToWorkOrder(search?:boolean):Promise<WorkorderEntity | any> {
    if(!search) this.router.navigate(['work-order']);
    try {
      const data = await this.nocodeapiService.getRequestById(this.request);
      if(data.length === 0) {
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Request no encontrado', life: 3000 });
        return;
      }
      this.workorderDataSharingService.setData(data[0]);
      this.router.navigate(['work-order']);
      return data;
    } catch (err){
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al buscar request', life: 3000 });
      console.log(err);
    }
  }
}
