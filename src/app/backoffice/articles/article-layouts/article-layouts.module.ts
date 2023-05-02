import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleLayoutsListComponent } from './containers/article-layouts-list/article-layouts-list.component';
import { ArticleLayoutsTableComponent } from './components/article-layouts-table/article-layouts-table.component';
import { ArticleLayoutsRoutingModule } from './article-layouts-routing.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleSharedModule } from '../shared/article-shared.module';
import { ArticleLayoutsCreateComponent } from './containers/article-layouts-create/article-layouts-create.component';
import { ArticleLayoutFormComponent } from './components/article-layout-form/article-layout-form.component';
import { MatSelectModule } from '@angular/material/select';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { ArticleLayoutsUpdateComponent } from './containers/article-layouts-update/article-layouts-update.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    ArticleLayoutsListComponent,
    ArticleLayoutsTableComponent,
    ArticleLayoutsCreateComponent,
    ArticleLayoutFormComponent,
    ArticleLayoutsUpdateComponent
  ],
  imports: [
    CommonModule,
    ArticleLayoutsRoutingModule,
    InlineSVGModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TranslateModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
    MatIconModule,
    ReactiveFormsModule,
    ArticleSharedModule,
    MatSelectModule,
    CodemirrorModule,
    FormsModule,
    MatAutocompleteModule,
  ]
})
export class ArticleLayoutsModule { }
