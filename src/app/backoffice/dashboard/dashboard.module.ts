import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardWrapperComponent } from './containers/dashboard-wrapper/dashboard-wrapper.component';
import { WidgetsModule } from '@metronic/partials';



@NgModule({
  declarations: [
    DashboardWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardWrapperComponent,
      },
    ]),
    WidgetsModule
  ]
})
export class DashboardModule { }

