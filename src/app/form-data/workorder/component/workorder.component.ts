import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from '../../../navbar/navbar.component';
import {BasicInformationComponent} from '../../1-basic-information/component/basic-information.component';
import {DetailedInformationComponent} from '../../2-detailed-information/component/detailed-information.component';
import {EquipmentInformationComponent} from '../../3-equipment-information/component/equipment-information.component';
import {StartDateComponent} from '../../4-start-dates/component/start-date.component';
import {EvaluationDateComponent} from '../../5-evaluation-dates/component/evaluation-date.component';
import {BudgetDateComponent} from '../../6-budget-dates/component/budget-date.component';
import {ProviderDateComponent} from '../../7-provider-dates/component/provider-date.component';
import {PartDateComponent} from '../../8-parts-dates/component/part-date.component';
import {RepairDateComponent} from '../../9-repair-dates/component/repair-date.component';
import {EndDateComponent} from '../../10-end-dates/component/end-date.component';
import {ComplianceComponent} from '../../11-compliance/component/compliance.component';
import {OtherComponent} from '../../12-other/component/other.component';
import {NocodeapiService} from '../../../nocodeapi/nocodeapi.service';
import {BranchEnum} from '../../2-detailed-information/enums/branch.enum';
import {SupervisorEntity} from '../../2-detailed-information/entities/supervisor.entity';
import {TechnicianEntity} from '../../2-detailed-information/entities/technician.entity';
import {AttentionTypeEnum} from '../../2-detailed-information/enums/attention-type.enum';
import {StateEnum} from '../../2-detailed-information/enums/state.enum';
import {BrandEnum} from '../../3-equipment-information/enums/brand.enum';
import {BudgetStateEnum} from '../../6-budget-dates/enums/budget-state.enum';
import {DefaultCompletionStateEnum} from '../../../shared/enums/default-completion-state.enum';
import {ComplianceMotiveEnum} from '../../11-compliance/enums/compliance-motive.enum';
import {Button} from 'primeng/button';
import {DateFormatterEntity} from '../../../shared/entities/date-formatter.entity';
@Component({
  selector: 'app-workorder',
  imports: [
    FormsModule,
    NavbarComponent,
    BasicInformationComponent,
    DetailedInformationComponent,
    EquipmentInformationComponent,
    StartDateComponent,
    EvaluationDateComponent,
    BudgetDateComponent,
    ProviderDateComponent,
    PartDateComponent,
    RepairDateComponent,
    EndDateComponent,
    ComplianceComponent,
    OtherComponent,
    ReactiveFormsModule,
    Button
  ],
  templateUrl: './workorder.component.html',
  standalone: true,
  styleUrl: './workorder.component.css'
})
export class WorkorderComponent implements OnInit{
  completeForm!: FormGroup;
  noCodeApiService :NocodeapiService = new NocodeapiService();
  response: string = "";
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.completeForm = this.fb.group({
      basicInformation: this.fb.group({
        request: new FormControl(),
        wo: new FormControl(),
        io: new FormControl(),
        quote: new FormControl(),
        bp: new FormControl(''),
        client: new FormControl(''),
        description: new FormControl('')
      }),
      detailedInformation: this.fb.group({
        branch: new FormControl(null),
        supervisor: new FormControl(null),
        technician: new FormControl(null),
        attentionType: new FormControl(null),
        state: new FormControl(null),
        bay: new FormControl(null),
        comment: new FormControl('')
      }),
      equipmentInformation: this.fb.group({
        equipment: new FormControl(''),
        model: new FormControl(''),
        brand: new FormControl(null),
        fabricSeries: new FormControl(''),
        sapCode: new FormControl('')
      }),
      startDates: this.fb.group({
        requirement: new FormControl(null),
        arrival: new FormControl(null),
        woCreation: new FormControl(null),
        firstLabor: new FormControl(null)
      }),
      evaluationDates: this.fb.group({
        evaluationPlanStart: new FormControl(null),
        evaluationRealStart: new FormControl(null),
        evaluationPlanEnd: new FormControl(null),
        evaluationRealEnd: new FormControl(null)
      }),
      budgetDates: this.fb.group({
        sendingDate: new FormControl(null),
        receptionDate: new FormControl(null),
        budgetState: new FormControl(null)
      }),
      providerDates: this.fb.group({
        providerPlanStart: new FormControl(null),
        providerRealStart: new FormControl(null),
        providerPlanEnd: new FormControl(null),
        providerRealEnd: new FormControl(null),
        providerState: new FormControl(null)
      }),
      partDates: this.fb.group({
        partState: new FormControl(null),
        orderDate: new FormControl(null),
        partPlanArrival: new FormControl(null),
        partRealArrival: new FormControl(null)
      }),
      repairDates: this.fb.group({
        repairPlanStart: new FormControl(null),
        repairRealStart: new FormControl(null),
        repairPlanEnd: new FormControl(null),
        repairRealEnd: new FormControl(null)
      }),
      endDates: this.fb.group({
        lastLabor: new FormControl(null),
        realEndDate: new FormControl(null),
        closingDate: new FormControl(null),
        billingDate: new FormControl(null),
        reportSendingDate: new FormControl(null),
        nbd: new FormControl(null),
        nbdChangingDateReason: new FormControl('')
      }),
      compliance: this.fb.group({
        compliance: new FormControl(''),
        motive: new FormControl(null),
        motiveDetails: new FormControl('')
      }),
      other: this.fb.group({
        emergency: new FormControl('')
      })
    });
  }

  getBasicInformation() : FormGroup { return this.completeForm.controls['basicInformation'] as FormGroup; }
  getDetailedInformation(): FormGroup { return this.completeForm.controls['detailedInformation'] as FormGroup; }
  getEquipmentInformation(): FormGroup { return this.completeForm.controls['equipmentInformation'] as FormGroup; }

  getStartDates(): FormGroup { return this.completeForm.controls['startDates'] as FormGroup; }
  getEvaluationDates(): FormGroup { return this.completeForm.controls['evaluationDates'] as FormGroup; }
  getBudgetDates(): FormGroup { return this.completeForm.controls['budgetDates'] as FormGroup; }
  getProviderDates(): FormGroup { return this.completeForm.controls['providerDates'] as FormGroup; }
  getPartDates(): FormGroup { return this.completeForm.controls['partDates'] as FormGroup; }
  getRepairDates(): FormGroup { return this.completeForm.controls['repairDates'] as FormGroup; }
  getEndDates(): FormGroup { return this.completeForm.controls['endDates'] as FormGroup; }
  getCompliance(): FormGroup { return this.completeForm.controls['compliance'] as FormGroup; }
  getOther(): FormGroup { return this.completeForm.controls['other'] as FormGroup; }

  async addWorkOrder() {
    const formData = this.completeForm.value;
    const dataToSend = [
      formData.basicInformation.request,
      formData.basicInformation.wo,
      formData.basicInformation.io,
      formData.basicInformation.quote,
      formData.detailedInformation.branch,
      formData.detailedInformation.supervisor,
      formData.detailedInformation.attentionType,
      formData.basicInformation.description,
      formData.basicInformation.bp,
      formData.basicInformation.client,
      formData.equipmentInformation.equipment,
      formData.equipmentInformation.model,
      formData.equipmentInformation.brand,
      formData.equipmentInformation.fabricSeries,
      formData.equipmentInformation.sapCode,
      formData.detailedInformation.state,
      formData.detailedInformation.comment,
      DateFormatterEntity(formData.startDates.requirement),
      DateFormatterEntity(formData.startDates.arrival),
      DateFormatterEntity(formData.startDates.woCreation),
      DateFormatterEntity(formData.startDates.firstLabor),
      DateFormatterEntity(formData.evaluationDates.evaluationPlanStart),
      DateFormatterEntity(formData.evaluationDates.evaluationRealStart),
      DateFormatterEntity(formData.evaluationDates.evaluationPlanEnd),
      DateFormatterEntity(formData.evaluationDates.evaluationRealEnd),
      DateFormatterEntity(formData.budgetDates.sendingDate),
      DateFormatterEntity(formData.budgetDates.receptionDate),
      formData.budgetDates.budgetState,
      DateFormatterEntity(formData.providerDates.providerPlanStart),
      DateFormatterEntity(formData.providerDates.providerRealStart),
      DateFormatterEntity(formData.providerDates.providerPlanEnd),
      DateFormatterEntity(formData.providerDates.providerRealEnd),
      formData.providerDates.providerState,
      formData.partDates.partState,
      DateFormatterEntity(formData.partDates.orderDate),
      DateFormatterEntity(formData.partDates.partPlanArrival),
      DateFormatterEntity(formData.partDates.partRealArrival),
      DateFormatterEntity(formData.repairDates.repairPlanStart),
      DateFormatterEntity(formData.repairDates.repairRealStart),
      DateFormatterEntity(formData.repairDates.repairPlanEnd),
      DateFormatterEntity(formData.repairDates.repairRealEnd),
      DateFormatterEntity(formData.endDates.nbd),
      formData.endDates.nbdChangingDateReason,
      DateFormatterEntity(formData.endDates.lastLabor),
      DateFormatterEntity(formData.endDates.realEndDate),
      formData.compliance.compliance,
      formData.compliance.motive,
      formData.compliance.motiveDetails,
      DateFormatterEntity(formData.endDates.reportSendingDate),
      DateFormatterEntity(formData.endDates.closingDate),
      DateFormatterEntity(formData.endDates.billingDate),
      formData.other.emergency,
      formData.detailedInformation.technician,
      formData.detailedInformation.bay
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
