import { Routes } from '@angular/router';
import {WorkorderComponent} from './form-data/workorder/component/workorder.component';
import {MainPageComponent} from './main-page/main-page.component';

export const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'work-order', component: WorkorderComponent}
];
