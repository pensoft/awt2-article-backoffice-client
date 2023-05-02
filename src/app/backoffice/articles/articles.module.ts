import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesRoutingModule } from './articles-routing.module';
import { InlineSVGModule } from 'ng-inline-svg';
import { ArticlesComponent } from './articles.component';


@NgModule({
  declarations: [
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    InlineSVGModule
  ],
  bootstrap: [ArticlesComponent]
})
export class ArticlesModule { }
