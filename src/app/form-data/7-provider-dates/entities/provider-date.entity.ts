import {DefaultDateAttributesEntity} from '../../../shared/entities/default-date-attributes.entity';
import {DefaultCompletionStateEnum} from '../../../shared/enums/default-completion-state.enum';

export class ProviderDateEntity extends DefaultDateAttributesEntity {
  state: DefaultCompletionStateEnum;
}
