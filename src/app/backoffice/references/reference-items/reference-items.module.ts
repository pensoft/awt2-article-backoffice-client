import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenceItemsListComponent } from './containers/reference-items-list/reference-items-list.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { RouterModule } from '@angular/router';
import { ReferenceItemsRoutingModule } from './reference-items-routing.module';
import { ReferenceItemsTableComponent } from './components/reference-items-table/reference-items-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    ReferenceItemsListComponent,
    ReferenceItemsTableComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    ReferenceItemsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class ReferenceItemsModule { }
