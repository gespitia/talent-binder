// employee-form.component.ts
import { Component, Input, input, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TYPE_IDENTIFICATION, CIVIL_STATUS } from '@core/constants/options';
import { Employee, Positions } from 'app/core/models/employee.model';
import { EmployeeService } from 'app/core/services/employee.service';
import { PositonService } from 'app/core/services/positon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit{

  employeeForm!: FormGroup;
  civilStatusOptions = CIVIL_STATUS;
  typeIdentificationOptions = TYPE_IDENTIFICATION;

  private route = inject(ActivatedRoute);
  private fb= inject(FormBuilder);
  private employeeService = inject(EmployeeService);
  private positionService = inject(PositonService);

  positions$ = this.positionService.getPositions();

  ngOnInit(): void {
    this.initEmployeeForm();
    this.route.params.subscribe(({id}) => {
      if (id) {
        this.getEmployeeServiceValue(id).subscribe((employee) => {
          this.employeeForm.patchValue(employee);
          console.log(employee);
        });
      }
    });
  }

  getEmployeeServiceValue(id: string = ''): Observable<Employee> {
    return this.employeeService.getEmployee(id);
  }

  initEmployeeForm(): void {
    this.employeeForm = this.fb.group({
      id: [null], // Se manejará automáticamente o se ocultará si no es necesario para la creación
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      hireOfDate: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      department: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      identificationType: ['', [Validators.required]],
      identificationNumber: ['', [Validators.required]],
      civilStatus: ['', [Validators.required]],
      children: [false],
      numberOfChildren: [{ value: 0, disabled: true }],
      sex: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      // Aquí iría la lógica para procesar los datos del formulario
    }
  }

  onCancel(): void {
    // Lógica para manejar la cancelación del formulario
  }
}
