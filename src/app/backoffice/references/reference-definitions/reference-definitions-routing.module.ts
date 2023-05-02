import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ReferenceDefinitionsListComponent
} from './containers/reference-definitions-list/reference-definitions-list.component';
import {
  ReferenceDefinitionCreateComponent
} from './containers/reference-definition-create/reference-definition-create.component';
import {
  ReferenceDefinitionUpdateComponent
} from './containers/reference-definition-update/reference-definition-update.component';
import { ReferenceDefinitionResolver } from './resolvers/reference-definition.resolver';


const routes: Routes = [
  {
    path: 'list',
    component: ReferenceDefinitionsListComponent,
    resolve: {

    }
  },
  {
    path: 'create',
    component: ReferenceDefinitionCreateComponent
  },
  {
    path: 'update/:id',
    component: ReferenceDefinitionUpdateComponent,
    resolve: {
      item: ReferenceDefinitionResolver
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
export class ReferenceDefinitionsRoutingModule {}
