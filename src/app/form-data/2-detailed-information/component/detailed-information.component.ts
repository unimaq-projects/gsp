import {Component, Input, OnInit} from '@angular/core';
import {BranchEnum} from '../enums/branch.enum';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import {Subscription} from 'rxjs';
import {SupervisorEntity} from '../entities/supervisor.entity';
import {TechnicianEntity} from '../entities/technician.entity';
import {AttentionTypeEnum} from '../enums/attention-type.enum';
import {StateEnum} from '../enums/state.enum';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {Select} from 'primeng/select';
import {BayEnum} from '../enums/bay.enum';

@Component({
  selector: 'detailed-information-component',
  imports: [
    ReactiveFormsModule,
    DropdownModule,
    FloatLabel,
    InputText,
    Select
  ],
  templateUrl: './detailed-information.component.html',
  standalone: true,
  styleUrl: './detailed-information.component.css'
})
export class DetailedInformationComponent implements OnInit {
  @Input() detailedInformationForm!: FormGroup;

  branchOptions: { label: string; value: string }[] = [];
  supervisorOptions: { label: string; value: string }[] = [];
  technicianOptions: { label: string; value: string }[] = [];
  attentionTypeOptions: { label: string; value: string }[] = [];
  stateOptions: { label: string, value: string }[] = [];
  bayOptions: { label: string, value: string }[] = [];
  private branchSubscription?: Subscription;
  private technicianSubscription?: Subscription;

  private supervisorEntity = new SupervisorEntity();
  private technicianEntity = new TechnicianEntity();

  ngOnInit(): void {
    this.branchOptions = Object.values(BranchEnum).map((branch) => ({
      label: branch,
      value: branch,
    }));

    this.attentionTypeOptions = Object.values(AttentionTypeEnum).map((attentionType) => ({
      label: attentionType,
      value: attentionType
    }));

    this.stateOptions = Object.values(StateEnum).map((state) => ({
      label: state,
      value: state
    }));
    this.bayOptions = Object.values(BayEnum).map((bay) => ({
      label: bay,
      value: bay
    }));

    this.branchSubscription = this.detailedInformationForm
      .get('branch')
      ?.valueChanges.subscribe((selectedBranch: BranchEnum | null) => {
        this.updateSupervisors(selectedBranch);
        // Optionally reset supervisor if branch changes
        this.detailedInformationForm.patchValue({ supervisor: null });
        // Also update technicians based on the new branch
        this.updateTechnicians(selectedBranch);
        // Optionally reset technician if branch changes
        this.detailedInformationForm.patchValue({ technician: null });
      });

    this.technicianSubscription = this.detailedInformationForm
      .get('branch')
      ?.valueChanges.subscribe((selectedBranch: BranchEnum | null) => {
        this.updateTechnicians(selectedBranch);
        // Optionally reset technician if branch changes
        this.detailedInformationForm.patchValue({ technician: null });
      });

    const initialBranch = this.detailedInformationForm.get('branch')?.value;
    if (initialBranch) {
      this.updateSupervisors(initialBranch);
      this.updateTechnicians(initialBranch);
    }
  }
  updateSupervisors(branch: BranchEnum | null): void {
    this.supervisorOptions = [];
    if (branch) {
      const supervisors: string[] = this.supervisorEntity[branch as keyof SupervisorEntity];
      if (supervisors) {
        this.supervisorOptions = supervisors.map((supervisor: string) => ({
          label: supervisor,
          value: supervisor,
        }));
      }
    }
  }

  updateTechnicians(branch: BranchEnum | null): void {
    this.technicianOptions = [];
    if (branch) {
      const technicians: string[] = this.technicianEntity[branch as keyof TechnicianEntity];
      if (technicians) {
        this.technicianOptions = technicians.map((technician: string) => ({
          label: technician,
          value: technician,
        }));
      }
    }
  }
}
