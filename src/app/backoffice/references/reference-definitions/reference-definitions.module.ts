import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenceDefinitionsListComponent } from './containers/reference-definitions-list/reference-definitions-list.component';
import { ReferenceDefinitionsRoutingModule } from './reference-definitions-routing.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { ReferenceDefinitionsTableComponent } from './components/reference-definitions-table/reference-definitions-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReferenceDefinitionCreateComponent } from './containers/reference-definition-create/reference-definition-create.component';
import { SharedModule } from '@shared/shared.module';
import { ReferenceDefinitionFormComponent } from './components/reference-definition-form/reference-definition-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ArticleSectionsModule } from '../../articles/article-sections/article-sections.module';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { TranslateModule } from '@ngx-translate/core';
import { ReferenceDefinitionUpdateComponent } from './containers/reference-definition-update/reference-definition-update.component';



@NgModule({
  declarations: [
    ReferenceDefinitionsListComponent,
    ReferenceDefinitionsTableComponent,
    ReferenceDefinitionCreateComponent,
    ReferenceDefinitionFormComponent,
    ReferenceDefinitionUpdateComponent
  ],
  imports: [
    CommonModule,
    ReferenceDefinitionsRoutingModule,
    InlineSVGModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    SharedModule,
    MatInputModule,
    MatTabsModule,
    ArticleSectionsModule,
    CodemirrorModule,
    TranslateModule,
  ]
})
export class ReferenceDefinitionsModule { }
