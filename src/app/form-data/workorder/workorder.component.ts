import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
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
    ReactiveFormsModule
  ],
  templateUrl: './workorder.component.html',
  standalone: true,
  styleUrl: './workorder.component.css'
})
export class WorkorderComponent implements OnInit{
  completeForm!: FormGroup;
  noCodeApiService = new NocodeapiService();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.completeForm = this.fb.group({
      basicInformation: this.fb.group({
        request: [null],
        wo: [null],
        io: [null],
        quote: [null],
        bp: [''],
        client: [''],
        description: ['']
      }),
      detailedInformation: this.fb.group({  }),
      equipmentInformation: this.fb.group({  }),
      startDates: this.fb.group({  }),
      evaluationDates: this.fb.group({  }),
      budgetDates: this.fb.group({  }),
      providerDates: this.fb.group({  }),
      partDates: this.fb.group({  }),
      repairDates: this.fb.group({  }),
      endDates: this.fb.group({  }),
      compliance: this.fb.group({  }),
      other: this.fb.group({  })
    });
  }

  async addWorkOrder(){
    await this.noCodeApiService.addData([[this.completeForm]]);
  }

}
