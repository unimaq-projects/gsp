import {DefaultCompletionStateEnum} from '../../../shared/enums/default-completion-state.enum';

export class PartDateEntity {
  state: DefaultCompletionStateEnum;
  orderDate: Date;
  planArrival: Date;
  realArrival: Date;
}
