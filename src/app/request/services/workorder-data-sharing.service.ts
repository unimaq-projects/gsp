import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WorkorderEntity } from '../entities/workorder.entity';

@Injectable({
  providedIn: 'root'
})
export class WorkorderDataSharingService {
  private workOrderData = new BehaviorSubject<WorkorderEntity | null>(null);
  currentWorkOrderData = this.workOrderData.asObservable();

  setData(data: WorkorderEntity) {
    this.workOrderData.next(data);
  }

  clearData() {
    this.workOrderData.next(null);
  }

  constructor() { }
}
