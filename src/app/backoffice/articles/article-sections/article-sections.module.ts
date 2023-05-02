import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleSectionsListComponent } from './containers/article-sections-list/article-sections-list.component';
import { ArticlesRoutingModule } from './article-sections-routing.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { ArticleSectionCreateComponent } from './containers/article-section-create/article-section-create.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormioModule } from '@formio/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { SharedModule } from '@shared/shared.module';
import { ArticleSectionUpdateComponent } from './containers/article-section-update/article-section-update.component';
import { FormManagerConfig, FormManagerModule, FormManagerRoutes, FormManagerService } from '@formio/angular/manager';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ArticleSectionFormComponent } from './components/article-section-form/article-section-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { ArticleSectionsTableComponent } from './components/article-sections-table/article-sections-table.component';
import { MatMenuModule } from '@angular/material/menu';
import { ArticleSharedModule } from '../shared/article-shared.module';
import {
  ArticleSectionCompatibilityComponent
} from './components/article-section-compatibility/article-section-compatibility.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ArticleSectionFiltersComponent } from './components/article-section-filters/article-section-filters.component';
import { ArticleSectionFiltersDdComponent } from './components/article-section-filters-dd/article-section-filters-dd.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

@NgModule({
  declarations: [
    ArticleSectionsListComponent,
    ArticleSectionCreateComponent,
    FormBuilderComponent,
    ArticleSectionUpdateComponent,
    ArticleSectionFormComponent,
    ArticleSectionsTableComponent,
    ArticleSectionCompatibilityComponent,
    ArticleSectionFiltersComponent,
    ArticleSectionFiltersDdComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    InlineSVGModule,
    ReactiveFormsModule,
    FormioModule,
    MatFormFieldModule,
    TranslateModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    SharedModule,
    FormManagerModule,
    RouterModule.forChild(FormManagerRoutes({
      formCreate: ArticleSectionCreateComponent
    })),
    MatTabsModule,
    FormsModule,
    CodemirrorModule,
    DragDropModule,
    MatIconModule,
    MatMenuModule,
    ArticleSharedModule,
    MatSlideToggleModule,
    DropzoneModule,
  ],
  exports: [
    FormBuilderComponent
  ],
  providers: [
    FormManagerService,
    {
      provide: FormManagerConfig, useValue: {
        tag: 'form'
      }
    }
  ]
})
export class ArticleSectionsModule { }
