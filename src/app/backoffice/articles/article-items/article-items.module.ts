import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleItemsListComponent } from './containers/article-items-list/article-items-list.component';
import { ArticleItemsRoutingModule } from './article-items-routing.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { ArticlesTableComponent } from './components/articles-table/articles-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    ArticleItemsListComponent,
    ArticlesTableComponent
  ],
  imports: [
    CommonModule,
    ArticleItemsRoutingModule,
    InlineSVGModule,
    MatTableModule,
    MatButtonModule,
    SharedModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class ArticleItemsModule { }
