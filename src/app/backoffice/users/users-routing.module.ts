import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './containers/users-list/users-list.component';
import { RolesResolver } from './resolvers/roles.resolver';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    resolve: {
      roles: RolesResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
