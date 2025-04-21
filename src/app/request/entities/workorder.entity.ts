export class WorkorderEntity {
  request: number | null = null;
  wo: number | null = null;
  io: number | null = null;
  quote: number | null = null;
  bp: number | null = null;
  client: string | null = null;
  description: string | null = null;
  branch: any | null = null;
  supervisor: any | null = null;
  technician: any | null = null;
  attentionType: any | null = null;
  state: any | null = null;
  bay: any | null = null;
  comment: string | null = null;
  equipment: string | null = null;
  model: string | null = null;
  fabricSeries: string | null = null;
  sapCode: string | null = null;
  brand: string | null = null;
  requirement: string | null = null;
  arrival: string | null = null;
  woCreation: string | null = null;
  firstLabor: string | null = null;
  evaluationPlanStart: string | null = null;
  evaluationRealStart: string | null = null;
  evaluationPlanEnd: string | null = null;
  evaluationRealEnd: string | null = null;
  sendingDate: string | null = null;
  receptionDate: string | null = null;
  budgetState: any | null = null;
  providerPlanStart: string | null = null;
  providerRealStart: string | null = null;
  providerPlanEnd: string | null = null;
  providerRealEnd: string | null = null;
  providerState: any | null = null;
  partState: any | null = null;
  orderDate: string | null = null;
  partPlanArrival: string | null = null;
  partRealArrival: string | null = null;
  repairPlanStart: string | null = null;
  repairRealStart: string | null = null;
  repairPlanEnd: string | null = null;
  repairRealEnd: string | null = null;
  lastLabor: string | null = null;
  realEndDate: string | null = null;
  closingDate: string | null = null;
  billingDate: string | null = null;
  reportSendingDate: string | null = null;
  nbd: string | null = null;
  nbdChangingDateReason: string | null = null;
  compliance: string | null = null;
  complianceMotive: any | null = null;
  motiveDetails: string | null = null;
  emergency: string | null = null;

  constructor(data?: Partial<WorkorderEntity>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
