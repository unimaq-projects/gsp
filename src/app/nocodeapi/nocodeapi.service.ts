import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WorkorderEntity} from '../request/entities/workorder.entity';
import {firstValueFrom, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NocodeapiService {
  private baseUrl = 'https://v1.nocodeapi.com/snmarcelo/google_sheets/xEhRBKSjzPsOJPRv';
  private tabId = 'tabId=gsp';
  private http = inject(HttpClient);
  constructor() {}

  async getData() {
    return this.http.get(`${this.baseUrl}?tabId=gsp`);
  }

  async addData(data: any) {
    return this.http.post(`${this.baseUrl}?${this.tabId}`, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  async updateRow(rowNumber: number, data: any) {
    return this.http.put(`${this.baseUrl}/${rowNumber}?${this.tabId}`, [data]);
  }

  async getRequestById(requestId: number): Promise<WorkorderEntity | undefined> {
    /*
    try {
      const response: any = await firstValueFrom(
        this.http.get(`${this.baseUrl}/search?${this.tabId}&searchKey=Request&searchValue=${requestId}`, {
          headers: { 'Content-Type': 'application/json' }
        })
      );

      if (response) {
        if (Array.isArray(response) && response.length > 0) {
        return new WorkorderEntity(response[0]);
        }
      }
      return undefined;
    } catch (error) {
      console.error('Error fetching work order:', error);
      return undefined;
    }
     */
    return new WorkorderEntity();
  }

}
