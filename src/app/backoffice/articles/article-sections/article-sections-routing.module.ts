import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleSectionsListComponent } from './containers/article-sections-list/article-sections-list.component';
import { ArticleSectionCreateComponent } from './containers/article-section-create/article-section-create.component';
import { ArticleSectionUpdateComponent } from './containers/article-section-update/article-section-update.component';
import { ArticleSectionResolver } from './resolvers/article-section.resolver';


const routes: Routes = [
  {
    path: 'list',
    component: ArticleSectionsListComponent,
    resolve: {

    }
  },
  {
    path: 'create',
    component: ArticleSectionCreateComponent,
    resolve: {

    }
  },
  {
    path: 'update/:id',
    component: ArticleSectionUpdateComponent,
    resolve: {
      section: ArticleSectionResolver
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
export class ArticlesRoutingModule {}
