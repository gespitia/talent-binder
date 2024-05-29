import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { of } from 'rxjs';
import { EmployeesListComponent } from './employees-list.component';
import { EmployeeService } from '@core/services/employee.service';
import { ConfirmDialogComponent } from 'app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'app/shared/modules/material.module';
import { Employee } from 'app/core/models/employee.model';

describe('EmployeesListComponent', () => {
  let component: EmployeesListComponent;
  let fixture: ComponentFixture<EmployeesListComponent>;
  let employeeServiceMock: any;

  beforeEach(async () => {
    employeeServiceMock = {
      getEmployees: jasmine.createSpy('getEmployees').and.returnValue(of([])),
      deleteEmployee: jasmine.createSpy('deleteEmployee').and.returnValue(of({})),
    };

    await TestBed.configureTestingModule({
      declarations: [EmployeesListComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: EmployeeService, useValue: employeeServiceMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get employees on init', () => {
    component.ngAfterViewInit();
    expect(employeeServiceMock.getEmployees).toHaveBeenCalled();
  });

  it('should apply filter to dataSource', () => {

    component.dataSource = new MatTableDataSource<Employee>([{
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
    }]);
    const event = { target: { value: 'john' } } as any;
    component.applyFilter(event);
    expect(component.dataSource.filter).toBe('john');
  });

  it('should delete employee and refresh table', () => {
    spyOn(component, 'getEmployeesTable');
    component.deleteEmployee('123');
    expect(employeeServiceMock.deleteEmployee).toHaveBeenCalledWith('123');
    expect(component.getEmployeesTable).toHaveBeenCalled();
  });

  it('should open dialog and delete employee if confirmed', () => {
    spyOn(component, 'deleteEmployee');
    const dialogSpy = spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(true),
    } as any);

    component.openDialog('250ms', '250ms', '123');
    expect(dialogSpy).toHaveBeenCalledWith(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title: 'Delete employee',
        message: 'Are you sure you want to delete this employee?',
      },
    });
    expect(component.deleteEmployee).toHaveBeenCalledWith('123');
  });
});
