import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EmployeesListComponent } from './employees-list.component';
import { EmployeeService } from '@core/services/employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Employee } from '@core/models/employee.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/shared/shared.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

class MatDialogMock {
  open() {
    return {
      afterClosed: () => of(true),
    };
  }
}

fdescribe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;
  let employeeService: EmployeeService;
  let httpMock: HttpTestingController;
  let dialog: MatDialog;

  const mockEmployees: Employee[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      position: 'Developer',
      dateOfBirth: new Date('1990-01-01'),
      hireOfDate: new Date('2020-01-01'),
      salary: '50000',
      department: 'IT',
      email: 'john.doe@example.com',
      phoneNumber: '1234567890',
      address: '123 Main St',
      identificationType: 'CC',
      identificationNumber: '123456789',
      civilStatus: 'S',
      children: false,
      numberOfChildren: '0',
      sex: 'Male',
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeesListComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: MatDialog, useClass: MatDialogMock },
        EmployeeService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should load employees on init', fakeAsync(() => {
    spyOn(employeeService, 'getEmployees').and.returnValue(of(mockEmployees));
    component.ngAfterViewInit();
    tick();
    expect(component.dataSource.data).toEqual(mockEmployees);
  }));

  // ... otras pruebas ...
});
