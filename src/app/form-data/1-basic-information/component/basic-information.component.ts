import { Component } from '@angular/core';
import {NocodeapiService} from '../../../nocodeapi/nocodeapi.service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'basic-information-component',
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './basic-information.component.html',
  standalone: true,
  styleUrl: './basic-information.component.css'
})
export class BasicInformationComponent {
  request = '';
  quote = '';
  wo = '';
  io = '';
  response = '';
  private noCodeApiService = new NocodeapiService();

  constructor() {}

  async addRow() {
    const json = [[this.request, this.quote, this.wo, this.io]];
    (await this.noCodeApiService.addData(json)).subscribe({
      next: () => {
        this.response = 'Fila agregada correctamente.';
        this.request = '';
        this.quote = '';
        this.wo = '';
        this.io = '';
      },
      error: (err) => {
        this.response = 'Error al agregar la fila.';
        console.error(err);
      }
    });
  }
}
