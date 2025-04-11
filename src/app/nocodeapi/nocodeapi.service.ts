import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NocodeapiService {
  private baseUrl = 'https://v1.nocodeapi.com/snmarcelo/google_sheets/xEhRBKSjzPsOJPRv';
  private http = inject(HttpClient);
  constructor() {}

  async getData() {
    return this.http.get(`${this.baseUrl}?tabId=gsp`);
  }

  async addData(data: any) {
    return this.http.post(`${this.baseUrl}?tabId=gsp`, data, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text'
    });
  }

  async deleteRow(rowNumber: number) {
    return this.http.delete(`${this.baseUrl}/${rowNumber}?tabId=gsp`);
  }

  async updateRow(rowNumber: number, data: any) {
    return this.http.put(`${this.baseUrl}/${rowNumber}?tabId=gsp`, [data]);
  }
}
