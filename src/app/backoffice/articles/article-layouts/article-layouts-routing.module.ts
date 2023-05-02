import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleLayoutsListComponent } from './containers/article-layouts-list/article-layouts-list.component';
import { ArticleLayoutsCreateComponent } from './containers/article-layouts-create/article-layouts-create.component';
import { ArticleTemplatesResolver } from '../article-templates/resolvers/article-templates.resolver';
import { ArticleLayoutResolver } from './resolvers/article-layout.resolver';
import { ArticleLayoutsUpdateComponent } from './containers/article-layouts-update/article-layouts-update.component';
import { CitationStylesResolver } from '../shared/resolvers/citation-styles.resolver';


const routes: Routes = [
  {
    path: 'list',
    component: ArticleLayoutsListComponent,
    resolve: {

    }
  },
  {
    path: 'create',
    component: ArticleLayoutsCreateComponent,
    resolve: {
      templates: ArticleTemplatesResolver,
      citationStyles: CitationStylesResolver
    }
  },
  {
    path: 'update/:id',
    component: ArticleLayoutsUpdateComponent,
    resolve: {
      layout: ArticleLayoutResolver,
      templates: ArticleTemplatesResolver,
      citationStyles: CitationStylesResolver
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
export class ArticleLayoutsRoutingModule {}
