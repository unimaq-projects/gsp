import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WorkorderEntity} from '../request/entities/workorder.entity';
import axios from 'axios';
import { DateFormatterEntity } from '../shared/entities/date-formatter.entity';

@Injectable({
  providedIn: 'root'
})
export class NocodeapiService {
  private baseUrl = 'https://v1.nocodeapi.com/snmarcelo/google_sheets/xEhRBKSjzPsOJPRv';
  private tabId = 'tabId=gsp';
  private http = inject(HttpClient);
  private headers = {
    'Content-Type': 'application/json'
  };
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

  async getRequestById(requestId: number) {
    const apiURL = `${this.baseUrl}/search?${this.tabId}&searchKey=Request&searchValue=${requestId}`;
    const response = await axios.get(apiURL, { headers: this.headers });
    const workOrder = response.data.map((workOrder: any) => new WorkorderEntity({
      request: workOrder.Request,
      quote: workOrder.Quote,
      wo: workOrder.WO,
      io: workOrder.IO,
      branch: workOrder.Sucursal,
      supervisor: workOrder.Supervisor,
      attentionType: workOrder.Tipo_De_Atencion,
      description: workOrder.Descripción,
      bp: workOrder.BP,
      client: workOrder.Cliente,
      equipment: workOrder.Equipo,
      model: workOrder.Modelo,
      brand: workOrder.Marca,
      fabricSeries: workOrder.Serie_Fabrica,
      sapCode: workOrder.Codigo_SAP,
      state: workOrder.Estado,
      comment: workOrder.Comentarios,
      requirement: workOrder.F_Requerimiento ? DateFormatterEntity(new Date(workOrder.F_Requerimiento)) : null,
      arrival: workOrder.F_Llegada ? DateFormatterEntity(new Date(workOrder.F_Llegada)) : null,
      woCreation: workOrder.F_Creacion_WO ? DateFormatterEntity(new Date(workOrder.F_Creacion_WO)) : null,
      firstLabor: workOrder.First_Labor ? DateFormatterEntity(new Date(workOrder.First_Labor)) : null,
      evaluationPlanStart: workOrder.F_Inicio_Plan_Evaluacion ? DateFormatterEntity(new Date(workOrder.F_Inicio_Plan_Evaluacion)) : null,
      evaluationRealStart: workOrder.F_Inicio_Real_Evaluacion ? DateFormatterEntity(new Date(workOrder.F_Inicio_Real_Evaluacion)) : null,
      evaluationPlanEnd: workOrder.F_Fin_Plan_Evaluacion ? DateFormatterEntity(new Date(workOrder.F_Fin_Plan_Evaluacion)) : null,
      evaluationRealEnd: workOrder.F_Fin_Real_Evaluacion ? DateFormatterEntity(new Date(workOrder.F_Fin_Real_Evaluacion)) : null,
      sendingDate: workOrder.F_Envio_Ppto ? DateFormatterEntity(new Date(workOrder.F_Envio_Ppto)) : null,
      receptionDate: workOrder.F_Aprobacion_Rechazo_Ppto ? DateFormatterEntity(new Date(workOrder.F_Aprobacion_Rechazo_Ppto)) : null,
      budgetState: workOrder.Estado_Ppto,
      providerPlanStart: workOrder.F_Inicio_Plan_Prov ? DateFormatterEntity(new Date(workOrder.F_Inicio_Plan_Prov)) : null,
      providerRealStart: workOrder.F_Inicio_Real_Prov ? DateFormatterEntity(new Date(workOrder.F_Inicio_Real_Prov)) : null,
      providerPlanEnd: workOrder.F_Fin_Plan_Prov ? DateFormatterEntity(new Date(workOrder.F_Fin_Plan_Prov)) : null,
      providerRealEnd: workOrder.F_Fin_Real_Prov ? DateFormatterEntity(new Date(workOrder.F_Fin_Real_Prov)) : null,
      providerState: workOrder.Estado_Prov,
      partState: workOrder.Estado_Rpts,
      orderDate: workOrder.F_Pedido_Rpts ? DateFormatterEntity(new Date(workOrder.F_Pedido_Rpts)) : null,
      partPlanArrival: workOrder.F_Plan_Llegada_Rpts ? DateFormatterEntity(new Date(workOrder.F_Plan_Llegada_Rpts)) : null,
      partRealArrival: workOrder.F_Real_Llegada_De_Rpts ? DateFormatterEntity(new Date(workOrder.F_Real_Llegada_De_Rpts)) : null,
      repairPlanStart: workOrder.F_Inicio_Plan_Reparacion ? DateFormatterEntity(new Date(workOrder.F_Inicio_Plan_Reparacion)) : null,
      repairRealStart: workOrder.F_Inicio_Real_Reparacion ? DateFormatterEntity(new Date(workOrder.F_Inicio_Real_Reparacion)) : null,
      repairPlanEnd: workOrder.F_Fin_Plan_Reparacion ? DateFormatterEntity(new Date(workOrder.F_Fin_Plan_Reparacion)) : null,
      repairRealEnd: workOrder.F_Fin_Real_Reparacion ? DateFormatterEntity(new Date(workOrder.F_Fin_Real_Reparacion)) : null,
      nbd: workOrder.NBD ? DateFormatterEntity(new Date(workOrder.NBD)) : null,
      nbdChangingDateReason: workOrder.Motivo_Cambio_Por_Cliente,
      lastLabor: workOrder.Last_Labor ? DateFormatterEntity(new Date(workOrder.Last_Labor)) : null,
      realEndDate: workOrder.F_Real_De_Termino ? DateFormatterEntity(new Date(workOrder.F_Real_De_Termino)) : null,
      compliance: workOrder.Cumplimiento,
      motive: workOrder.Motivo,
      motiveDetails: workOrder.Detalle_De_Motivo,
      reportSendingDate: workOrder.F_Envio_Informe ? DateFormatterEntity(new Date(workOrder.F_Envio_Informe)) : null,
      closingDate: workOrder.F_Cierre ? DateFormatterEntity(new Date(workOrder.F_Cierre)) : null,
      billingDate: workOrder.F_Facturacion ? DateFormatterEntity(new Date(workOrder.F_Facturacion)) : null,
      emergency: workOrder.Emergencia,
      technician: workOrder.Tecnico,
      bay: workOrder.Bahia,
    }));
    return workOrder;
  }

}
