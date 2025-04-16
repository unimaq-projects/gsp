export enum StateEnum {
  EVALUATION_QUEUE = "En cola de evaluación",
  EVALUATING = "En evaluación",
  WAITING_FOR_QUOTE_SENT = "En espera de envío de presupuesto",
  WAITING_FOR_QUOTE_APPROVAL = "En espera de aprobación de presupuesto",
  WAITING_FOR_SUPPLIER = "En espera del proveedor",
  QUOTE_APPROVED = "Presupuesto aprobado",
  WAITING_FOR_PART = "En espera de repuesto",
  WAITING_FOR_SERVICE = "En espera de servicio",
  REPAIR_PROCESS = "En proceso de evaluación",
  SERVICE_PROCESS = "En proceso de servicio",
  FINISHED = "Finalizado",
  BILLED = "Facturado"
}
