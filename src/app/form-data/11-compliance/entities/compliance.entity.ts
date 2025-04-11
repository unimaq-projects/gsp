import {ComplianceMotiveEnum} from '../enums/compliance-motive.enum';

export class ComplianceEntity {
  compliance: boolean;
  motive: ComplianceMotiveEnum;
  motiveDetails: string;
}
