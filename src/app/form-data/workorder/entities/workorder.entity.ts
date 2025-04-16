import {BranchEnum} from '../../2-detailed-information/enums/branch.enum';
import {SupervisorEntity} from '../../2-detailed-information/entities/supervisor.entity';
import {TechnicianEntity} from '../../2-detailed-information/entities/technician.entity';
import {AttentionTypeEnum} from '../../2-detailed-information/enums/attention-type.enum';
import {StateEnum} from '../../2-detailed-information/enums/state.enum';
import {BayEnum} from '../../2-detailed-information/enums/bay.enum';

export class WorkorderEntity {
  request: number;
  wo: number;
  io: number;
  quote: number;
  bp: number;
  client: string;
  description: string;
  branch: BranchEnum;
  supervisor: SupervisorEntity;
  technician: TechnicianEntity;
  attentionType: AttentionTypeEnum;
  state: StateEnum;
  bay: BayEnum;

}
