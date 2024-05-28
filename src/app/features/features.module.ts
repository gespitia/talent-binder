import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from './home/home.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeFormComponent } from './employee-form/employee-form.component';


@NgModule({
  declarations: [
    HomeComponent,
    EmployeesListComponent,
    EmployeeFormComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class FeaturesModule { }
