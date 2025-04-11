import {SupervisorEntity} from './supervisor.entity';
import {BranchEnum} from '../enums/branch.enum';
import {AttentionTypeEnum} from '../enums/attention-type.enum';
import {StateEnum} from '../enums/state.enum';
import {TechnicianEntity} from './technician.entity';

export class DetailedInfoEntity {
  branch: BranchEnum;
  supervisor: SupervisorEntity;
  technician: TechnicianEntity;
  attentionType: AttentionTypeEnum;
  state: StateEnum;
  comments: string;
}
