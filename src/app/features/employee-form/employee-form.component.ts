// employee-form.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TYPE_IDENTIFICATION, CIVIL_STATUS } from '@core/constants/options'
import { PositonService } from 'app/core/services/positon.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {

  employeeForm!: FormGroup;
  civilStatusOptions= CIVIL_STATUS;
  typeIdentificationOptions = TYPE_IDENTIFICATION;

  positions = this.positionService.getPositions().subscribe(positions => console.log(positions));

  constructor(private fb: FormBuilder, public positionService: PositonService) {
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
      sex: ['', [Validators.required]]
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
