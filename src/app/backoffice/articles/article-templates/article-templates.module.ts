import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleTemplatesListComponent } from './containers/article-templates-list/article-templates-list.component';
import { ArticleTemplatesRoutingModule } from './article-templates-routing.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { ArticleTemplatesTableComponent } from './components/article-templates-table/article-templates-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SharedModule } from '@shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import {
  ArticleTemplatesCreateComponent
} from './containers/article-templates-create/article-templates-create.component';
import {
  ArticleTemplatesUpdateComponent
} from './containers/article-templates-update/article-templates-update.component';
import { ArticleTemplateFormComponent } from './components/article-template-form/article-template-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleSharedModule } from '../shared/article-shared.module';


@NgModule({
  declarations: [
    ArticleTemplatesListComponent,
    ArticleTemplatesTableComponent,
    ArticleTemplatesCreateComponent,
    ArticleTemplatesUpdateComponent,
    ArticleTemplateFormComponent,
  ],
  imports: [
    CommonModule,
    ArticleTemplatesRoutingModule,
    InlineSVGModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TranslateModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    DragDropModule,
    MatIconModule,
    ReactiveFormsModule,
    ArticleSharedModule,
  ]
})
export class ArticleTemplatesModule { }
