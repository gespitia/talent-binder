// employee-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TYPE_IDENTIFICATION, CIVIL_STATUS } from '@core/constants/options';
import { Employee, Positions } from 'app/core/models/employee.model';
import { EmployeeService } from 'app/core/services/employee.service';
import { PositonService } from 'app/core/services/positon.service';
import { get } from 'http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;

  civilStatusOptions = CIVIL_STATUS;
  typeIdentificationOptions = TYPE_IDENTIFICATION;

  private route = inject(ActivatedRoute);
  private employeeService = inject(EmployeeService);
  private positionService = inject(PositonService);

  positions: string[] = [];

  ngOnInit(): void {
    this.initEmployeeForm();
    this.route.params.subscribe(({ id }) => {
      this.setPositions();
      if (id) {
        this.getEmployeeServiceValue(id).subscribe((employee) => {
          this.employeeForm.patchValue(employee as any);
          console.log(employee);
        });
      }
    });
  }

  setPositions(): void {
    this.positionService.getPositions().subscribe((positions) => {
      this.positions = positions.positions;
    });
  }

  getEmployeeServiceValue(id: string = ''): Observable<Employee> {
    return this.employeeService.getEmployee(id);
  }

  initEmployeeForm(): void {
    this.employeeForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      hireOfDate: new FormControl('', Validators.required),
      salary: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      identificationType: new FormControl('', Validators.required),
      identificationNumber: new FormControl('', Validators.required),
      civilStatus: new FormControl('', Validators.required),
      children: new FormControl('', Validators.required),
      numberOfChildren: new FormControl('', Validators.required),
      sex: new FormControl('', Validators.required),
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm.valid);
    console.log(this.employeeForm.value);
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      if (this.employeeForm.value.id) {
        this.employeeService
          .updateEmployee(this.employeeForm.value)
          .subscribe((employee) => {
            console.log(employee);
          });
      } else {
        this.employeeService
          .addEmployee(this.employeeForm.value)
          .subscribe((employee) => {
            console.log(employee);
          });
      }
    }
  }
}
