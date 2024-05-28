import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'create-employee',
    component:EmployeeFormComponent
  },
  {
    path:'edit-employee/:id',
    component:EmployeeFormComponent
  },
  {
    path:'**',
    pathMatch:'full',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
