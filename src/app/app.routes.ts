import { Routes } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {RequestComponent} from './request/component/request.component';

export const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'work-order', component: RequestComponent}
];
