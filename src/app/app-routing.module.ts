import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { SelectivePreloadingStrategyService } from '@core/services/preload.service';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./_metronic/layout/layout.module').then((m) => m.LayoutModule),
  },
  { path: '**', redirectTo: 'error/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      //useHash: true,
      //scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
      //preloadingStrategy: SelectivePreloadingStrategyService,
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
