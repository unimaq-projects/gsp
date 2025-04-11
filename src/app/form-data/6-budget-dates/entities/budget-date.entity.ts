import {BudgetStateEnum} from '../enums/budget-state.enum';

export class BudgetDateEntity {
  sendingDate: Date;
  receptionDate: Date;
  state: BudgetStateEnum;
}
