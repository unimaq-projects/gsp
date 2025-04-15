import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavbarComponent} from '../../navbar/navbar.component';
import {BasicInformationComponent} from '../1-basic-information/component/basic-information.component';
import {DetailedInformationComponent} from '../2-detailed-information/component/detailed-information.component';
import {EquipmentInformationComponent} from '../3-equipment-information/component/equipment-information.component';
import {StartDateComponent} from '../4-start-dates/component/start-date.component';
import {EvaluationDateComponent} from '../5-evaluation-dates/component/evaluation-date.component';
import {BudgetDateComponent} from '../6-budget-dates/component/budget-date.component';
import {ProviderDateComponent} from '../7-provider-dates/component/provider-date.component';
import {PartDateComponent} from '../8-parts-dates/component/part-date.component';
import {RepairDateComponent} from '../9-repair-dates/component/repair-date.component';
import {EndDateComponent} from '../10-end-dates/component/end-date.component';
import {ComplianceComponent} from '../11-compliance/component/compliance.component';
import {OtherComponent} from '../12-other/component/other.component';
import {NocodeapiService} from '../../nocodeapi/nocodeapi.service';
import {BranchEnum} from '../2-detailed-information/enums/branch.enum';
import {SupervisorEntity} from '../2-detailed-information/entities/supervisor.entity';
import {TechnicianEntity} from '../2-detailed-information/entities/technician.entity';
import {AttentionTypeEnum} from '../2-detailed-information/enums/attention-type.enum';
import {StateEnum} from '../2-detailed-information/enums/state.enum';
import {BrandEnum} from '../3-equipment-information/enums/brand.enum';
import {BudgetStateEnum} from '../6-budget-dates/enums/budget-state.enum';
import {DefaultCompletionStateEnum} from '../../shared/enums/default-completion-state.enum';
import {ComplianceMotiveEnum} from '../11-compliance/enums/compliance-motive.enum';
import {Button} from 'primeng/button';
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
        request: new FormControl(0),
        wo: new FormControl(0),
        io: new FormControl(0),
        quote: new FormControl(0),
        bp: new FormControl(''),
        client: new FormControl(''),
        description: new FormControl('')
      }),
      detailedInformation: this.fb.group({
        branch: new FormControl(BranchEnum),
        supervisor: new FormControl(SupervisorEntity),
        technician: new FormControl(TechnicianEntity),
        attentionType: new FormControl(AttentionTypeEnum),
        state: new FormControl(StateEnum),
        comment: new FormControl('')
      }),
      equipmentInformation: this.fb.group({
        equipment: new FormControl(''),
        model: new FormControl(''),
        brand: new FormControl(BrandEnum),
        fabricSeries: new FormControl(''),
        sapCode: new FormControl('')
      }),
      startDates: this.fb.group({
        requirement: new FormControl(Date),
        arrival: new FormControl(Date),
        woCreation: new FormControl(Date),
        firstLabor: new FormControl(Date)
      }),
      evaluationDates: this.fb.group({
        evaluationPlanStart: new FormControl(Date),
        evaluationRealStart: new FormControl(Date),
        evaluationPlanEnd: new FormControl(Date),
        evaluationRealEnd: new FormControl(Date)
      }),
      budgetDates: this.fb.group({
        sendingDate: new FormControl(Date),
        receptionDate: new FormControl(Date),
        budgetState: new FormControl(BudgetStateEnum)
      }),
      providerDates: this.fb.group({
        providerPlanStart: new FormControl(Date),
        providerRealStart: new FormControl(Date),
        providerPlanEnd: new FormControl(Date),
        providerRealEnd: new FormControl(Date),
        providerState: new FormControl(DefaultCompletionStateEnum)
      }),
      partDates: this.fb.group({
        partState: new FormControl(DefaultCompletionStateEnum),
        orderDate: new FormControl(Date),
        partPlanArrival: new FormControl(Date),
        partRealArrival: new FormControl(Date)
      }),
      repairDates: this.fb.group({
        repairPlanStart: new FormControl(Date),
        repairRealStart: new FormControl(Date),
        repairPlanEnd: new FormControl(Date),
        repairRealEnd: new FormControl(Date)
      }),
      endDates: this.fb.group({
        lastLabor: new FormControl(Date),
        realEndDate: new FormControl(Date),
        closingDate: new FormControl(Date),
        billingDate: new FormControl(Date),
        reportSendingDate: new FormControl(Date),
        nbd: new FormControl(Date)
      }),
      compliance: this.fb.group({
        compliance: new FormControl(Boolean),
        motive: new FormControl(ComplianceMotiveEnum),
        motiveDetails: new FormControl(String)
      }),
      other: this.fb.group({
        emergency: new FormControl(Boolean)
      })
    });
  }

  getBasicInformation() : FormGroup {
    return this.completeForm.controls['basicInformation'] as FormGroup;
  }

  getDetailedInformation(): FormGroup {
    return this.completeForm.controls['detailedInformation'] as FormGroup;
  }

  getEquipmentInformation(): FormGroup {
    return this.completeForm.controls['equipmentInformation'] as FormGroup;
  }

  getStartDates(): FormGroup {
    return this.completeForm.controls['startDates'] as FormGroup;
  }

  getEvaluationDates(): FormGroup {
    return this.completeForm.controls['evaluationDates'] as FormGroup;
  }

  getBudgetDates(): FormGroup {
    return this.completeForm.controls['budgetDates'] as FormGroup;
  }

  getProviderDates(): FormGroup {
    return this.completeForm.controls['providerDates'] as FormGroup;
  }

  getPartDates(): FormGroup {
    return this.completeForm.controls['partDates'] as FormGroup;
  }

  getRepairDates(): FormGroup {
    return this.completeForm.controls['repairDates'] as FormGroup;
  }

  getEndDates(): FormGroup {
    return this.completeForm.controls['endDates'] as FormGroup;
  }

  getCompliance(): FormGroup {
    return this.completeForm.controls['compliance'] as FormGroup;
  }

  getOther(): FormGroup {
    return this.completeForm.controls['other'] as FormGroup;
  }

  async addWorkOrder(){
    const formData = this.completeForm.value;
    const dataToSend = [
      formData.basicInformation.request,
      formData.basicInformation.wo,
      formData.basicInformation.io,
      formData.basicInformation.quote,
      formData.basicInformation.bp,
      formData.basicInformation.client,
      formData.basicInformation.description,
      formData.detailedInformation.branch,
      formData.detailedInformation.supervisor,
      formData.detailedInformation.technician,
      formData.detailedInformation.attentionType,
      /*
      formData.detailedInformation.state,
      formData.detailedInformation.comment,
      formData.equipmentInformation.equipment,
      formData.equipmentInformation.model,
      formData.equipmentInformation.brand,
      formData.equipmentInformation.fabricSeries,
      formData.equipmentInformation.sapCode,
      formData.startDates.requirement ? formData.startDates.requirement.toString() : null,
      formData.startDates.arrival ? formData.startDates.arrival.toString() : null,
      formData.startDates.woCreation ? formData.startDates.woCreation.toString() : null,
      formData.startDates.firstLabor ? formData.startDates.firstLabor.toString() : null,
      formData.evaluationDates.evaluationPlanStart ? formData.evaluationDates.evaluationPlanStart.toString() : null,
      formData.evaluationDates.evaluationRealStart ? formData.evaluationDates.evaluationRealStart.toString() : null,
      formData.evaluationDates.evaluationPlanEnd ? formData.evaluationDates.evaluationPlanEnd.toString() : null,
      formData.evaluationDates.evaluationRealEnd ? formData.evaluationDates.evaluationRealEnd.toString() : null,
      formData.budgetDates.sendingDate ? formData.budgetDates.sendingDate.toString() : null,
      formData.budgetDates.receptionDate ? formData.budgetDates.receptionDate.toString() : null,
      formData.budgetDates.budgetState,
      formData.providerDates.providerPlanStart ? formData.providerDates.providerPlanStart.toString(): null,
      formData.providerDates.providerRealStart ? formData.providerDates.providerRealStart.toString() : null,
      formData.providerDates.providerPlanEnd ? formData.providerDates.providerPlanEnd.toString() : null,
      formData.providerDates.providerRealEnd ? formData.providerDates.providerRealEnd.toString(): null,
      formData.providerDates.providerState,
      formData.partDates.partState,
      formData.partDates.orderDate ? formData.partDates.orderDate.toString() : null,
      formData.partDates.partPlanArrival ? formData.partDates.partPlanArrival.toString() : null,
      formData.partDates.partRealArrival ? formData.partDates.partRealArrival.toString() : null,
      formData.repairDates.repairPlanStart ? formData.repairDates.repairPlanStart.toString(): null,
      formData.repairDates.repairRealStart ? formData.repairDates.repairRealStart.toString() : null,
      formData.repairDates.repairPlanEnd ? formData.repairDates.repairPlanEnd.toString() : null,
      formData.repairDates.repairRealEnd ? formData.repairDates.repairRealEnd.toString() : null,
      formData.endDates.lastLabor ? formData.endDates.lastLabor.toString() : null,
      formData.endDates.realEndDate ? formData.endDates.realEndDate.toString() : null,
      formData.endDates.closingDate ? formData.endDates.closingDate.toString() : null,
      formData.endDates.billingDate ? formData.endDates.billingDate.toString() : null,
      formData.endDates.reportSendingDate ? formData.endDates.reportSendingDate.toString() : null,
      formData.endDates.nbd ? formData.endDates.nbd.toString() : null,
      formData.compliance.compliance,
      formData.compliance.motive,
      formData.compliance.motiveDetails,
      formData.other.emergency,
       */
    ];
    console.log("data: ", dataToSend);
    console.log("data con []: ",[dataToSend]);
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
