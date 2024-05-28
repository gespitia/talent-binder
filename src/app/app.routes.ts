import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'employees',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
  },
  {
    path:'**',
    pathMatch: 'full',
    redirectTo: 'employees'
  }
];
