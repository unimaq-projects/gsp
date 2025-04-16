import {WorkorderMapEntity} from './workorder-map.entity';
import {DateFormatterEntity} from '../../shared/entities/date-formatter.entity';

export class WorkorderEntity {
  /*
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
  requirement: Date | null = null;
  arrival: Date | null = null;
  woCreation: Date | null = null;
  firstLabor: Date | null = null;
  evaluationPlanStart: Date | null = null;
  evaluationRealStart: Date | null = null;
  evaluationPlanEnd: Date | null = null;
  evaluationRealEnd: Date | null = null;
  sendingDate: Date | null = null;
  receptionDate: Date | null = null;
  budgetState: any | null = null;
  providerPlanStart: Date | null = null;
  providerRealStart: Date | null = null;
  providerPlanEnd: Date | null = null;
  providerRealEnd: Date | null = null;
  providerState: any | null = null;
  partSendingDate: Date | null = null;
  partPlanArrival: Date | null = null;
  partRealArrival: Date | null = null;
  repairPlanStart: Date | null = null;
  repairRealStart: Date | null = null;
  repairPlanEnd: Date | null = null;
  repairRealEnd: Date | null = null;
  lastLabor: Date | null = null;
  realEndDate: Date | null = null;
  closingDate: Date | null = null;
  billingDate: Date | null = null;
  reportSendingDate: Date | null = null;
  nbd: Date | null = null;
  nbdChangingDateReason: string | null = null;
  compliance: string | null = null;
  motive: any | null = null;
  motiveDetails: string | null = null;
  emergency: string | null = null;

  constructor(data: any) {
    for (const apiName in WorkorderMapEntity) {
      if (data.hasOwnProperty(apiName)) {
        const entityPropertyName = WorkorderMapEntity[apiName];
        const value = data[apiName];

        switch (entityPropertyName) {
          case 'request':
          case 'wo':
          case 'io':
          case 'quote':
          case 'bp':
            this[entityPropertyName] = value ? parseInt(value, 10) : null;
            break;
          case 'requirement':
          case 'arrival':
          case 'woCreation':
          case 'firstLabor':
          case 'evaluationPlanStart':
          case 'evaluationRealStart':
          case 'evaluationPlanEnd':
          case 'evaluationRealEnd':
          case 'sendingDate':
          case 'receptionDate':
          case 'providerPlanStart':
          case 'providerRealStart':
          case 'providerPlanEnd':
          case 'providerRealEnd':
          case 'partSendingDate':
          case 'partPlanArrival':
          case 'partRealArrival':
          case 'repairPlanStart':
          case 'repairRealStart':
          case 'repairPlanEnd':
          case 'repairRealEnd':
          case 'lastLabor':
          case 'realEndDate':
          case 'closingDate':
          case 'billingDate':
          case 'reportSendingDate':
          case 'nbd':
            this[entityPropertyName] = DateFormatterEntity(value);
            break;
          default:
            this[entityPropertyName] = value;
            break;
        }
      }
    }
  }
   */
}
