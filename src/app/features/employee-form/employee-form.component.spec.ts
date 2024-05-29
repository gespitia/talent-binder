import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeFormComponent } from './employee-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EmployeeService } from 'app/core/services/employee.service';
import { PositonService } from 'app/core/services/positon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MaterialModule } from 'app/shared/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Employee } from '../../core/models/employee.model';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let employeeServiceMock: any;
  let positionServiceMock: any;
  let snackBarMock: any;
  let routeMock: any;

  beforeEach(async () => {
    employeeServiceMock = jasmine.createSpyObj('EmployeeService', ['getEmployee', 'addEmployee', 'updateEmployee']);
    positionServiceMock = jasmine.createSpyObj('PositonService', ['getPositions']);
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open', 'dismiss']);
    routeMock = { params: of({ id: '123' }) };

    await TestBed.configureTestingModule({
      declarations: [EmployeeFormComponent],
      imports: [ReactiveFormsModule, FormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: EmployeeService, useValue: employeeServiceMock },
        { provide: PositonService, useValue: positionServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and fetch positions on init', () => {
    const positions = { positions: ['Manager', 'Developer'] };
    positionServiceMock.getPositions.and.returnValue(of(positions));
    employeeServiceMock.getEmployee.and.returnValue(of({ id: '123', firstName: 'John' }));

    component.ngOnInit();

    expect(component.positions).toEqual(positions.positions);
    expect(employeeServiceMock.getEmployee).toHaveBeenCalledWith('123');
    expect(component.employeeForm.value).toEqual(jasmine.objectContaining({ firstName: 'John' }));
  });

  it('should add a new employee', () => {
    const mockEmployee:Employee = {
      id: '',
      firstName: 'John',
      lastName: 'Doe',
      position: 'Developer',
      dateOfBirth: new Date('1990-01-01'),
      hireOfDate: new Date('2020-01-01'),
      salary: '60000',
      department: 'IT',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      address: '123 Main St',
      identificationType: 'CC',
      identificationNumber: '1234567890',
      civilStatus: 'S',
      children: false,
      numberOfChildren: '0',
      sex: 'Masculino'
    }
    component.employeeForm.patchValue(mockEmployee);
    employeeServiceMock.addEmployee.and.returnValue(of(mockEmployee));

    component.onSubmit();

    expect(employeeServiceMock.addEmployee).toHaveBeenCalledWith(mockEmployee);
  });

  it('should update an existing employee', () => {
    const existingEmployee = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        position: 'Developer',
        dateOfBirth: new Date('1990-01-01'),
        hireOfDate: new Date('2020-01-01'),
        salary: '60000',
        department: 'IT',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        address: '123 Main St',
        identificationType: 'CC',
        identificationNumber: '1234567890',
        civilStatus: 'S',
        children: false,
        numberOfChildren: '0',
        sex: 'Masculino'
     };
    component.employeeForm.patchValue(existingEmployee);
    employeeServiceMock.updateEmployee.and.returnValue(of(existingEmployee));

    component.onSubmit();

    expect(employeeServiceMock.updateEmployee).toHaveBeenCalledWith(existingEmployee);
    expect(snackBarMock.open).toHaveBeenCalledWith('Employee updated', 'Close');
  });

  it('should validate form fields', () => {
    const positions = { positions: ['Manager', 'Developer'] };
    positionServiceMock.getPositions.and.returnValue(of(positions));
    employeeServiceMock.getEmployee.and.returnValue(of({ id: '123', firstName: 'John' }));
    component.ngOnInit();
    const firstNameControl:any = component.employeeForm.get('firstName');
    firstNameControl.setValue('');
    expect(firstNameControl.valid).toBeFalsy();
    firstNameControl.setValue('John');
    expect(firstNameControl.valid).toBeTruthy();
  });

  it('should reset the form on destroy', () => {
    const resetSpy = spyOn(component.employeeForm, 'reset');

    component.ngOnDestroy();

    expect(resetSpy).toHaveBeenCalled();
    expect(component['_snackBar'].dismiss).toHaveBeenCalled();
  });
});
