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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { FooterComponent } from "../../footer/footer.component";
import {ShowOnlyEnum} from '../enums/show-only.enum';

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
    ToastModule,
    Button,
    InputNumberModule,
    FooterComponent
  ],
  templateUrl: './request.component.html',
  standalone: true,
  styleUrl: './request.component.css',
  providers: [MessageService, NavbarComponent]
})
export class RequestComponent implements OnInit, OnDestroy {
  requestForm!: FormGroup;
  noCodeApiService: NocodeapiService = new NocodeapiService();
  rowId: number | null = null;
  //Entities
  private supervisorEntity: SupervisorEntity = new SupervisorEntity();
  private technicianEntity: TechnicianEntity = new TechnicianEntity();
  //Options
  showOnlyOptions: { label: string; value: string }[] = [];
  branchOptions: { label: string; value: string }[] = [];
  supervisorOptions: { label: string; value: string }[] = [];
  technicianOptions: { label: string; value: string }[] = [];
  attentionTypeOptions: { label: string; value: string }[] = [];
  requestStateOptions: { label: string; value: string }[] = [];
  bayOptions: { label: string; value: string }[] = [];
  brandOptions: { label: string; value: string }[] = [];
  defaultStateOptions: { label: string; value: string }[] = [];
  complianceMotiveOptions: { label: string; value: string }[] = [];
  //Subscription
  private branchSubscription?: Subscription;
  private technicianSubscription?: Subscription;
  private complianceSubscription?: Subscription;
  private workOrderSubscription?: Subscription;
  private showOnlySubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private workorderDataSharingService: WorkorderDataSharingService,
    private messageService: MessageService,
    private navbarComponent: NavbarComponent
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDropdownOptions();
    this.subscribeToBranchChanges();
    this.subscribeToWorkOrderData();
    this.subscribeToDateChanges();
    this.subscribeToShowOnlyChanges();
  }

  ngOnDestroy(): void {
    if (this.branchSubscription) this.branchSubscription.unsubscribe();
    if (this.technicianSubscription) this.technicianSubscription.unsubscribe();
    if (this.workOrderSubscription) this.workOrderSubscription.unsubscribe();
    if (this.complianceSubscription) this.complianceSubscription.unsubscribe();
    this.showOnlySubscription.unsubscribe();
  }

  initForm(): void {
    this.requestForm = this.fb.group({
      // Basic Information
      request: new FormControl({value: null, disabled: false}),
      wo: new FormControl({value: null, disabled: false}),
      io: new FormControl({value: null, disabled: false}),
      quote: new FormControl({value: null, disabled: false}),
      bp: new FormControl(),
      client: new FormControl(),
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
      compliance: new FormControl({value: null, disabled: true}),
      complianceMotive: new FormControl(null),
      motiveDetails: new FormControl(''),
      // Other
      emergency: new FormControl('')
    });
  }

  loadDropdownOptions(): void {
    this.showOnlyOptions = Object.values(ShowOnlyEnum).map((show) => ({label: show, value: show}));
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

  subscribeToDateChanges(): void {
    this.requestForm.get('nbd')?.valueChanges.subscribe(_ => {
      this.checkCompliance();
    });
    this.requestForm.get('realEndDate')?.valueChanges.subscribe(_ => {
      this.checkCompliance();
    });
  }

  subscribeToShowOnlyChanges(): void {
    this.showOnlySubscription = this.navbarComponent.showOnlyChanged.subscribe(selectedRole => {
      this.updateFormControls(selectedRole);
    });
  }

  updateFormControls(role: ShowOnlyEnum): void {
    this.enableAllFormControls();
    this.disableDefaultFields();
    switch (role) {
      case ShowOnlyEnum.PLANNER:
        this.disablePlannerSpecificFields();
        break;
      case ShowOnlyEnum.PROGRAMADOR:
        this.disableProgrammerSpecificFields();
        break;
      case ShowOnlyEnum.ASISTENTE:
        this.disableAssistantSpecificFields();
        break;
      case ShowOnlyEnum.JEFE_REGIONAL:
        this.disableJefeRegionalSpecificFields();
        break;
      default:
        break;
    }
  }

  enableAllFormControls(): void {
    Object.keys(this.requestForm.controls).forEach(controlName => {
      this.requestForm.get(controlName)?.enable();
    });
  }

  disableDefaultFields(): void {
    if(this.rowId != null) {
      this.requestForm.get('request')?.disable();
      this.requestForm.get('wo')?.disable();
      this.requestForm.get('io')?.disable();
      this.requestForm.get('quote')?.disable();
    }
  }

  disablePlannerSpecificFields(): void {
    this.requestForm.get('wo')?.disable();
    this.requestForm.get('io')?.disable();
  }

  disableProgrammerSpecificFields(): void {
    this.requestForm.get('evaluationPlanStart')?.disable();
    this.requestForm.get('evaluationRealStart')?.disable();
    this.requestForm.get('evaluationPlanEnd')?.disable();
    this.requestForm.get('evaluationRealEnd')?.disable();
  }

  disableAssistantSpecificFields(): void {
    this.requestForm.get('billingDate')?.disable();
    this.requestForm.get('reportSendingDate')?.disable();
  }

  disableJefeRegionalSpecificFields(): void {
    this.requestForm.get('budgetState')?.disable();
    this.requestForm.get('providerState')?.disable();
    this.requestForm.get('partState')?.disable();
  }

  populateForm(workOrder: WorkorderEntity): void {
    this.rowId = workOrder.rowId;
    this.disableDefaultFields();
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

  checkCompliance(): void {
    const nbdDate = this.requestForm.get('nbd')?.value as Date;
    const realEndDate = this.requestForm.get('realEndDate')?.value as Date;
    if (nbdDate && realEndDate) {
      if (nbdDate > realEndDate) {
        this.requestForm.get('compliance')?.setValue('CUMPLE');
      } else {
        this.requestForm.get('compliance')?.setValue('NO CUMPLE');
      }
    } else {
      this.requestForm.get('compliance')?.setValue('');
    }
  }

  async addWorkOrder() {
    const formData = this.requestForm.value;
    let dataToSend: any = {};
    if (this.rowId != null) {
      dataToSend.row_id = this.rowId;
    }
    dataToSend.Request = formData.request;
    dataToSend.WO = formData.wo;
    dataToSend.IO = formData.io;
    dataToSend.Quote = formData.quote;
    dataToSend.Sucursal = formData.branch;
    dataToSend.Supervisor = formData.supervisor;
    dataToSend.Tipo_De_Atencion = formData.attentionType;
    dataToSend.Descripcion = formData.description;
    dataToSend.BP = formData.bp;
    dataToSend.Cliente = formData.client;
    dataToSend.Equipo = formData.equipment;
    dataToSend.Modelo = formData.model;
    dataToSend.Marca = formData.brand;
    dataToSend.Serie_Fabrica = formData.fabricSeries;
    dataToSend.Codigo_SAP = formData.sapCode;
    dataToSend.Estado = formData.state;
    dataToSend.Comentarios = formData.comment;
    dataToSend.F_Requerimiento = formData.requirement ? DateFormatterEntity(formData.requirement) : null;
    dataToSend.F_Llegada = formData.arrival ? DateFormatterEntity(formData.arrival) : null;
    dataToSend.F_Creacion_WO = formData.woCreation ? DateFormatterEntity(formData.woCreation) : null;
    dataToSend.First_Labor = formData.firstLabor ? DateFormatterEntity(formData.firstLabor) : null;
    dataToSend.F_Inicio_Plan_Evaluacion = formData.evaluationPlanStart ? DateFormatterEntity(formData.evaluationPlanStart) : null;
    dataToSend.F_Inicio_Real_Evaluacion = formData.evaluationRealStart ? DateFormatterEntity(formData.evaluationRealStart) : null;
    dataToSend.F_Fin_Plan_Evaluacion = formData.evaluationPlanEnd ? DateFormatterEntity(formData.evaluationPlanEnd) : null;
    dataToSend.F_Fin_Real_Evaluacion = formData.evaluationRealEnd ? DateFormatterEntity(formData.evaluationRealEnd) : null;
    dataToSend.F_Envio_Ppto = formData.sendingDate ? DateFormatterEntity(formData.sendingDate) : null;
    dataToSend.F_Aprobacion_Rechazo_Ppto = formData.receptionDate ? DateFormatterEntity(formData.receptionDate) : null;
    dataToSend.Estado_Ppto = formData.budgetState;
    dataToSend.F_Inicio_Plan_Prov = formData.providerPlanStart ? DateFormatterEntity(formData.providerPlanStart) : null;
    dataToSend.F_Inicio_Real_Prov = formData.providerRealStart ? DateFormatterEntity(formData.providerRealStart) : null;
    dataToSend.F_Fin_Plan_Prov = formData.providerPlanEnd ? DateFormatterEntity(formData.providerPlanEnd) : null;
    dataToSend.F_Fin_Real_Prov = formData.providerRealEnd ? DateFormatterEntity(formData.providerRealEnd) : null;
    dataToSend.Estado_Rpts = formData.partState;
    dataToSend.F_Pedido_Rpts = formData.orderDate ? DateFormatterEntity(formData.orderDate) : null;
    dataToSend.F_Plan_Llegada_Rpts = formData.partPlanArrival ? DateFormatterEntity(formData.partPlanArrival) : null;
    dataToSend.F_Real_Llegada_De_Rpts = formData.partRealArrival ? DateFormatterEntity(formData.partRealArrival) : null;
    dataToSend.F_Inicio_Plan_Reparacion = formData.repairPlanStart ? DateFormatterEntity(formData.repairPlanStart) : null;
    dataToSend.F_Inicio_Real_Reparacion = formData.repairRealStart ? DateFormatterEntity(formData.repairRealStart) : null;
    dataToSend.F_Fin_Plan_Reparacion = formData.repairPlanEnd ? DateFormatterEntity(formData.repairPlanEnd) : null;
    dataToSend.F_Fin_Real_Reparacion = formData.repairRealEnd ? DateFormatterEntity(formData.repairRealEnd) : null;
    dataToSend.NBD = formData.nbd ? DateFormatterEntity(formData.nbd) : null;
    dataToSend.Motivo_Cambio_Por_Cliente = formData.nbdChangingDateReason;
    dataToSend.Last_Labor = formData.lastLabor ? DateFormatterEntity(formData.lastLabor) : null;
    dataToSend.F_Real_De_Termino = formData.realEndDate ? DateFormatterEntity(formData.realEndDate) : null;
    dataToSend.Cumplimiento = formData.compliance;
    dataToSend.Motivo = formData.complianceMotive;
    dataToSend.Detalle_De_Motivo = formData.motiveDetails;
    dataToSend.F_Envio_Informe = formData.reportSendingDate ? DateFormatterEntity(formData.reportSendingDate) : null;
    dataToSend.F_Cierre = formData.closingDate ? DateFormatterEntity(formData.closingDate) : null;
    dataToSend.F_Facturacion = formData.billingDate ? DateFormatterEntity(formData.billingDate) : null;
    dataToSend.Emergencia = formData.emergency;
    dataToSend.Tecnico = formData.technician;
    dataToSend.Bahia = formData.bay;
    if (this.rowId != null) {
      try {
        await this.noCodeApiService.updateRow(dataToSend);
        this.messageService.add({ severity: 'success', summary: 'Info', detail: 'Fila actualizada satisfactoriamente', life: 3000 });
      } catch (err) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al actualizar fila', life: 3000 });
        console.error(err);
      }
    } else {
      try {
        (await this.noCodeApiService.addData([dataToSend])).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Info', detail: 'Fila agregada satisfactoriamente', life: 3000 });
          },
          error: (err) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar fila', life: 3000 });
            console.error(err);
          }
        });
      } catch (err) {
        console.error("Error al llamar a addData:", err);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al agregar fila', life: 3000 });
      }
    }
  }
}
