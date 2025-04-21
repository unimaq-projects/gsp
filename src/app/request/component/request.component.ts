import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from '../../navbar/navbar.component';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {NocodeapiService} from '../../nocodeapi/nocodeapi.service';
import {Select} from 'primeng/select';
import {Subscription} from 'rxjs';
import {SupervisorEntity} from '../entities/supervisor.entity';
import {TechnicianEntity} from '../entities/technician.entity';
import {BranchEnum} from '../enums/branch.enum';
import {AttentionTypeEnum} from '../enums/attention-type.enum';
import {StateEnum} from '../enums/state.enum';
import {BayEnum} from '../enums/bay.enum';
import {DateFormatterEntity} from '../../shared/entities/date-formatter.entity';
import {BrandEnum} from '../enums/brand.enum';
import {DatePicker} from 'primeng/datepicker';
import {BudgetStateEnum} from '../enums/budget-state.enum';
import { ComplianceMotiveEnum } from '../enums/compliance-motive.enum';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {Button} from 'primeng/button';
import { WorkorderDataSharingService } from '../services/workorder-data-sharing.service';
import { WorkorderEntity } from '../entities/workorder.entity';

@Component({
  selector: 'app-request',
  imports: [
    ReactiveFormsModule,
    NavbarComponent,
    FloatLabel,
    InputText,
    Select,
    DatePicker,
    ToggleSwitch,
    Button
  ],
  templateUrl: './request.component.html',
  standalone: true,
  styleUrl: './request.component.css'
})
export class RequestComponent implements OnInit, OnDestroy {
  requestForm!: FormGroup;
  noCodeApiService: NocodeapiService = new NocodeapiService();
  response: string = "";

  // Detailed Information
  branchOptions: { label: string; value: string }[] = [];
  supervisorOptions: { label: string; value: string }[] = [];
  technicianOptions: { label: string; value: string }[] = [];
  attentionTypeOptions: { label: string; value: string }[] = [];
  requestStateOptions: { label: string; value: string }[] = [];
  bayOptions: { label: string; value: string }[] = [];
  private branchSubscription?: Subscription;
  private technicianSubscription?: Subscription;
  private workOrderSubscription?: Subscription; // Nueva suscripción

  private supervisorEntity: SupervisorEntity = new SupervisorEntity();
  private technicianEntity: TechnicianEntity = new TechnicianEntity();

  // Equipment Information
  brandOptions: { label: string; value: string }[] = [];

  // Budget Dates
  defaultStateOptions: { label: string; value: string }[] = [];

  // Compliance
  complianceMotiveOptions: { label: string; value: string }[] = [];

  constructor(private fb: FormBuilder, private workorderDataSharingService: WorkorderDataSharingService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownOptions();
    this.subscribeToBranchChanges();
    this.subscribeToWorkOrderData();
  }

  ngOnDestroy(): void {
    if (this.branchSubscription) this.branchSubscription.unsubscribe();
    if (this.technicianSubscription) this.technicianSubscription.unsubscribe();
    if (this.workOrderSubscription) this.workOrderSubscription.unsubscribe(); // Desuscribirse
  }

  initForm(): void {
    this.requestForm = this.fb.group({
      // Basic Information
      request: new FormControl(),
      wo: new FormControl(),
      io: new FormControl(),
      quote: new FormControl(),
      bp: new FormControl(''),
      client: new FormControl(''),
      description: new FormControl(''),
      // Detailed Information
      branch: new FormControl(null),
      supervisor: new FormControl(null),
      technician: new FormControl(null),
      attentionType: new FormControl(null),
      state: new FormControl(null),
      bay: new FormControl(null),
      comment: new FormControl(''),
      // Equipment Information
      equipment: new FormControl(''),
      model: new FormControl(''),
      brand: new FormControl(null),
      fabricSeries: new FormControl(''),
      sapCode: new FormControl(''),
      // Start Dates
      requirement: new FormControl(null),
      arrival: new FormControl(null),
      woCreation: new FormControl(null),
      firstLabor: new FormControl(null),
      // Evaluation Dates
      evaluationPlanStart: new FormControl(null),
      evaluationRealStart: new FormControl(null),
      evaluationPlanEnd: new FormControl(null),
      evaluationRealEnd: new FormControl(null),
      // Budget Dates
      sendingDate: new FormControl(null),
      receptionDate: new FormControl(null),
      budgetState: new FormControl(null),
      // Provider Dates
      providerPlanStart: new FormControl(null),
      providerRealStart: new FormControl(null),
      providerPlanEnd: new FormControl(null),
      providerRealEnd: new FormControl(null),
      providerState: new FormControl(null),
      // Part Dates
      partState: new FormControl(null),
      orderDate: new FormControl(null),
      partPlanArrival: new FormControl(null),
      partRealArrival: new FormControl(null),
      // Repair Dates
      repairPlanStart: new FormControl(null),
      repairRealStart: new FormControl(null),
      repairPlanEnd: new FormControl(null),
      repairRealEnd: new FormControl(null),
      // End Dates
      lastLabor: new FormControl(null),
      realEndDate: new FormControl(null),
      closingDate: new FormControl(null),
      billingDate: new FormControl(null),
      reportSendingDate: new FormControl(null),
      nbd: new FormControl(null),
      nbdChangingDateReason: new FormControl(''),
      // Compliance
      compliance: new FormControl(''),
      complianceMotive: new FormControl(null),
      motiveDetails: new FormControl(''),
      // Other
      emergency: new FormControl('')
    });
  }

  loadDropdownOptions(): void {
    this.branchOptions = Object.values(BranchEnum).map((branch) => ({ label: branch, value: branch }));
    this.attentionTypeOptions = Object.values(AttentionTypeEnum).map((attentionType) => ({ label: attentionType, value: attentionType }));
    this.requestStateOptions = Object.values(StateEnum).map((state) => ({ label: state, value: state }));
    this.bayOptions = Object.values(BayEnum).map((bay) => ({ label: bay, value: bay }));
    this.brandOptions = Object.values(BrandEnum).map((brand) => ({ label: brand, value: brand }));
    this.defaultStateOptions = Object.values(BudgetStateEnum).map((budgetState) => ({ label: budgetState, value: budgetState }));
    this.complianceMotiveOptions = Object.values(ComplianceMotiveEnum).map((complianceMotive) => ({ label: complianceMotive, value: complianceMotive }));
  }

  subscribeToBranchChanges(): void {
    this.branchSubscription = this.requestForm
      .get('branch')
      ?.valueChanges.subscribe((selectedBranch: BranchEnum | null) => {
        this.updateSupervisors(selectedBranch);
        this.requestForm.patchValue({ supervisor: null });
        this.updateTechnicians(selectedBranch);
        this.requestForm.patchValue({ technician: null });
      });

    this.technicianSubscription = this.requestForm
      .get('branch')
      ?.valueChanges.subscribe((selectedBranch: BranchEnum | null) => {
        this.updateTechnicians(selectedBranch);
        this.requestForm.patchValue({ technician: null });
      });

    const initialBranch = this.requestForm.get('branch')?.value;
    if (initialBranch) {
      this.updateSupervisors(initialBranch);
      this.updateTechnicians(initialBranch);
    }
  }

  subscribeToWorkOrderData(): void {
    this.workOrderSubscription = this.workorderDataSharingService.currentWorkOrderData.subscribe(data => {
      if (data) {
        this.populateForm(data);
        this.workorderDataSharingService.clearData();
      }
    });
  }

  populateForm(workOrder: WorkorderEntity): void {
    this.requestForm.patchValue({
      request: workOrder.request,
      wo: workOrder.wo,
      io: workOrder.io,
      quote: workOrder.quote,
      bp: workOrder.bp,
      client: workOrder.client,
      description: workOrder.description,
      branch: workOrder.branch,
      supervisor: workOrder.supervisor,
      technician: workOrder.technician,
      attentionType: workOrder.attentionType,
      state: workOrder.state,
      bay: workOrder.bay,
      comment: workOrder.comment,
      equipment: workOrder.equipment,
      model: workOrder.model,
      brand: workOrder.brand,
      fabricSeries: workOrder.fabricSeries,
      sapCode: workOrder.sapCode,
      requirement: workOrder.requirement ? new Date(workOrder.requirement) : null,
      arrival: workOrder.arrival ? new Date(workOrder.arrival) : null,
      woCreation: workOrder.woCreation ? new Date(workOrder.woCreation) : null,
      firstLabor: workOrder.firstLabor ? new Date(workOrder.firstLabor) : null,
      evaluationPlanStart: workOrder.evaluationPlanStart ? new Date(workOrder.evaluationPlanStart) : null,
      evaluationRealStart: workOrder.evaluationRealStart ? new Date(workOrder.evaluationRealStart) : null,
      evaluationPlanEnd: workOrder.evaluationPlanEnd ? new Date(workOrder.evaluationPlanEnd) : null,
      evaluationRealEnd: workOrder.evaluationRealEnd ? new Date(workOrder.evaluationRealEnd) : null,
      sendingDate: workOrder.sendingDate ? new Date(workOrder.sendingDate) : null,
      receptionDate: workOrder.receptionDate ? new Date(workOrder.receptionDate) : null,
      budgetState: workOrder.budgetState,
      providerPlanStart: workOrder.providerPlanStart ? new Date(workOrder.providerPlanStart) : null,
      providerRealStart: workOrder.providerRealStart ? new Date(workOrder.providerRealStart) : null,
      providerPlanEnd: workOrder.providerPlanEnd ? new Date(workOrder.providerPlanEnd) : null,
      providerRealEnd: workOrder.providerRealEnd ? new Date(workOrder.providerRealEnd) : null,
      providerState: workOrder.providerState,
      partState: workOrder.partState,
      orderDate: workOrder.orderDate ? new Date(workOrder.orderDate) : null,
      partPlanArrival: workOrder.partPlanArrival ? new Date(workOrder.partPlanArrival) : null,
      partRealArrival: workOrder.partRealArrival ? new Date(workOrder.partRealArrival) : null,
      repairPlanStart: workOrder.repairPlanStart ? new Date(workOrder.repairPlanStart) : null,
      repairRealStart: workOrder.repairRealStart ? new Date(workOrder.repairRealStart) : null,
      repairPlanEnd: workOrder.repairPlanEnd ? new Date(workOrder.repairPlanEnd) : null,
      repairRealEnd: workOrder.repairRealEnd ? new Date(workOrder.repairRealEnd) : null,
      lastLabor: workOrder.lastLabor ? new Date(workOrder.lastLabor) : null,
      realEndDate: workOrder.realEndDate ? new Date(workOrder.realEndDate) : null,
      closingDate: workOrder.closingDate ? new Date(workOrder.closingDate) : null,
      billingDate: workOrder.billingDate ? new Date(workOrder.billingDate) : null,
      reportSendingDate: workOrder.reportSendingDate ? new Date(workOrder.reportSendingDate) : null,
      nbd: workOrder.nbd ? new Date(workOrder.nbd) : null,
      nbdChangingDateReason: workOrder.nbdChangingDateReason,
      compliance: workOrder.compliance,
      complianceMotive: workOrder.complianceMotive,
      motiveDetails: workOrder.motiveDetails,
      emergency: workOrder.emergency === 'TRUE'
    });
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

  async addWorkOrder() {
    const formData = this.requestForm.value;
    const dataToSend = [
      formData.request,
      formData.wo,
      formData.io,
      formData.quote,
      formData.branch,
      formData.supervisor,
      formData.attentionType,
      formData.description,
      formData.bp,
      formData.client,
      formData.equipment,
      formData.model,
      formData.brand,
      formData.fabricSeries,
      formData.sapCode,
      formData.state,
      formData.comment,
      DateFormatterEntity(formData.requirement),
      DateFormatterEntity(formData.arrival),
      DateFormatterEntity(formData.woCreation),
      DateFormatterEntity(formData.firstLabor),
      DateFormatterEntity(formData.evaluationPlanStart),
      DateFormatterEntity(formData.evaluationRealStart),
      DateFormatterEntity(formData.evaluationPlanEnd),
      DateFormatterEntity(formData.evaluationRealEnd),
      DateFormatterEntity(formData.sendingDate),
      DateFormatterEntity(formData.receptionDate),
      formData.budgetState,
      DateFormatterEntity(formData.providerPlanStart),
      DateFormatterEntity(formData.providerRealStart),
      DateFormatterEntity(formData.providerPlanEnd),
      DateFormatterEntity(formData.providerRealEnd),
      formData.providerState,
      formData.partState,
      DateFormatterEntity(formData.orderDate),
      DateFormatterEntity(formData.partPlanArrival),
      DateFormatterEntity(formData.partRealArrival),
      DateFormatterEntity(formData.repairPlanStart),
      DateFormatterEntity(formData.repairRealStart),
      DateFormatterEntity(formData.repairPlanEnd),
      DateFormatterEntity(formData.repairRealEnd),
      DateFormatterEntity(formData.nbd),
      formData.nbdChangingDateReason,
      DateFormatterEntity(formData.lastLabor),
      DateFormatterEntity(formData.realEndDate),
      formData.compliance,
      formData.complianceMotive,
      formData.motiveDetails,
      DateFormatterEntity(formData.reportSendingDate),
      DateFormatterEntity(formData.closingDate),
      DateFormatterEntity(formData.billingDate),
      formData.emergency,
      formData.technician,
      formData.bay
    ];
    (await this.noCodeApiService.addData([dataToSend])).subscribe({
      next: () => {
        this.response = 'Fila agregada correctamente';
        alert(this.response);
      },
      error: (err) => {
        this.response = 'Error al agregar la fila.';
        alert(this.response);
        console.error(err);
      }
    });
  }
}