import { TestBed, ComponentFixture } from '@angular/core/testing';
import { EmployeeFormComponent } from './employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'app/core/services/employee.service';
import { PositonService } from 'app/core/services/positon.service';
import { of } from 'rxjs';
import { CIVIL_STATUS, TYPE_IDENTIFICATION } from '@core/constants/options';
import { SharedModule } from 'app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Employee } from 'app/core/models/employee.model';

xdescribe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;
  let positionServiceSpy: jasmine.SpyObj<PositonService>;

  beforeEach(async () => {
    const employeeServiceSpyObj = jasmine.createSpyObj('EmployeeService', [
      'getEmployee',
      'updateEmployee',
      'addEmployee',
    ]);
    const positionServiceSpyObj = jasmine.createSpyObj('PositionService', [
      'getPositions',
    ]);

    await TestBed.configureTestingModule({
      declarations: [EmployeeFormComponent],
      imports: [ReactiveFormsModule, SharedModule, BrowserAnimationsModule],
      providers: [
        {
          provide: EmployeeService,
          useValue: jasmine.createSpyObj('EmployeeService', [
            'getEmployee',
            'updateEmployee',
            'addEmployee',
          ]),
        },
        {
          provide: PositonService,
          useValue: jasmine.createSpyObj('PositionService', ['getPositions']),
        },
        { provide: ActivatedRoute, useValue: { params: {subscribe: ()=>({id:'1'})} } },
      ],
    }).compileComponents();

    employeeServiceSpy = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
    positionServiceSpy = TestBed.inject(PositonService) as jasmine.SpyObj<PositonService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and load positions on ngOnInit', () => {
    const positions = ['Position1', 'Position2'];
    positionServiceSpy.getPositions.and.returnValue(of({ positions }));
    component.ngOnInit();
    expect(component.positions).toEqual(positions);
    expect(component.employeeForm).toBeDefined();
  });

  it('should set form values when getting employee by id', () => {
    const employee:Employee = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      position: 'Position1',
      dateOfBirth: new Date(),
      hireOfDate: new Date(),
      salary: '1000',
      department: 'Department1',
      email: 'joh@mail.com',
      phoneNumber: '1234567890',
      address: 'Address1',
      identificationType: 'CC',
      identificationNumber: '123456789',
      civilStatus: 'S',
      children: true,
      numberOfChildren: '2',
      sex:'Masculino'
    };
    employeeServiceSpy.getEmployee.and.returnValue(of(employee));
    component.ngOnInit();
    expect(component.employeeForm.value).toEqual(employee);
  });

});
