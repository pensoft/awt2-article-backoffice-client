import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleItemsListComponent } from './containers/article-items-list/article-items-list.component';


const routes: Routes = [
  {
    path: '',
    component: ArticleItemsListComponent,
    resolve: {

    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleItemsRoutingModule {}
