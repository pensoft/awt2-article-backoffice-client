import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferenceItemsListComponent } from './containers/reference-items-list/reference-items-list.component';


const routes: Routes = [
  {
    path: 'list',
    component: ReferenceItemsListComponent,
    resolve: {

    }
  },
  /*{
    path: 'create',
    component: ReferenceDefinitionCreateComponent
  },
  {
    path: 'update/:id',
    component: ReferenceDefinitionUpdateComponent,
    resolve: {
      item: ReferenceDefinitionResolver
    }
  },*/
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
export class ReferenceItemsRoutingModule {}
