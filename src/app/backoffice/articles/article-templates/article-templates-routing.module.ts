import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleTemplatesListComponent } from './containers/article-templates-list/article-templates-list.component';
import {
  ArticleTemplatesCreateComponent
} from './containers/article-templates-create/article-templates-create.component';
import {
  ArticleTemplatesUpdateComponent
} from './containers/article-templates-update/article-templates-update.component';
import { ArticleTemplateResolver } from './resolvers/article-template.resolver';


const routes: Routes = [
  {
    path: 'list',
    component: ArticleTemplatesListComponent,
    resolve: {

    }
  },
  {
    path: 'create',
    component: ArticleTemplatesCreateComponent,
    resolve: {

    }
  },
  {
    path: 'update/:id',
    component: ArticleTemplatesUpdateComponent,
    resolve: {
      template: ArticleTemplateResolver
    }
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleTemplatesRoutingModule {}
