import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'items',
    loadChildren: () =>
      import('./reference-items/reference-items.module').then((m) => m.ReferenceItemsModule),
  },
  {
    path: 'definitions',
    loadChildren: () =>
      import('./reference-definitions/reference-definitions.module').then((m) => m.ReferenceDefinitionsModule),
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
export class ReferencesRoutingModule {}
