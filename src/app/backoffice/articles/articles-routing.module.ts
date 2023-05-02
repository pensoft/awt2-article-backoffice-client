import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'items',
    loadChildren: () =>
      import('./article-items/article-items.module').then((m) => m.ArticleItemsModule),
  },
  {
    path: 'sections',
    loadChildren: () =>
      import('./article-sections/article-sections.module').then((m) => m.ArticleSectionsModule),
  },
  {
    path: 'templates',
    loadChildren: () =>
      import('./article-templates/article-templates.module').then((m) => m.ArticleTemplatesModule),
  },
  {
    path: 'layouts',
    loadChildren: () =>
      import('./article-layouts/article-layouts.module').then((m) => m.ArticleLayoutsModule),
  },
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
