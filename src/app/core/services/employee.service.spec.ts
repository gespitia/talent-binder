import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';
import { environment } from 'src/environments/environment.development';
import { Employee } from '@core/models/employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const mockEmployees: Employee[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      position: 'Developer',
      dateOfBirth:new Date('1990-01-01'),
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
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      position: 'Manager',
      dateOfBirth: new Date('1985-05-05'),
      hireOfDate: new Date('2015-05-05'),
      salary: '60000',
      department: 'HR',
      email: 'jane.smith@example.com',
      phoneNumber: '0987654321',
      address: '456 Elm St',
      identificationType: 'CC',
      identificationNumber: '987654321',
      civilStatus: 'C',
      children: true,
      numberOfChildren: '2',
      sex: 'Female',
    },
  ];

  const mockEmployee: Employee = mockEmployees[0];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService],
    });
    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all employees', () => {
    service.getEmployees().subscribe((employees) => {
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne(service.urlEmployees);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should fetch a single employee by ID', () => {
    const employeeId = '1';
    service.getEmployee(employeeId).subscribe((employee) => {
      expect(employee).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne(`${service.urlEmployees}/${employeeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployee);
  });

  it('should add a new employee', () => {
    const newEmployee: Employee = {
      id: '3',
      firstName: 'Alice',
      lastName: 'Johnson',
      position: 'Analyst',
      dateOfBirth: new Date('1992-02-02'),
      hireOfDate: new Date('2021-02-02'),
      salary: '55000',
      department: 'Finance',
      email: 'alice.johnson@example.com',
      phoneNumber: '1112223333',
      address: '789 Maple St',
      identificationType: 'CE',
      identificationNumber: '111222333',
      civilStatus: 'S',
      children: false,
      numberOfChildren: '0',
      sex: 'Female',
    };

    service.addEmployee(newEmployee).subscribe((employee) => {
      expect(employee).toEqual(newEmployee);
    });

    const req = httpMock.expectOne(service.urlEmployees);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmployee);
    req.flush(newEmployee);
  });

  it('should update an existing employee', () => {
    const updatedEmployee: Employee = { ...mockEmployee, lastName: 'Updated' };

    service.updateEmployee(updatedEmployee).subscribe((employee) => {
      expect(employee).toEqual(updatedEmployee);
    });

    const req = httpMock.expectOne(
      `${service.urlEmployees}/${updatedEmployee.id}`
    );
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedEmployee);
    req.flush(updatedEmployee);
  });

  it('should delete an employee by ID', () => {
    const employeeId = '1';

    service.deleteEmployee(employeeId).subscribe((employee) => {
      expect(employee.id).toBe(employeeId);
    });

    const req = httpMock.expectOne(`${service.urlEmployees}/${employeeId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockEmployee);
  });

  it('should handle error when fetching employees', () => {
    const mockError = new ErrorEvent('Network error');

    service.getEmployees().subscribe(
      () => fail('Expected an error, not employees'),
      (error) => {
        expect(error.error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne(service.urlEmployees);
    req.error(mockError);
  });

  it('should handle error when fetching a single employee by ID', () => {
    const mockError = new ErrorEvent('Network error');
    const employeeId = '1';

    service.getEmployee(employeeId).subscribe(
      () => fail('Expected an error, not employee'),
      (error) => {
        expect(error.error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne(`${service.urlEmployees}/${employeeId}`);
    req.error(mockError);
  });

  it('should handle error when adding an employee', () => {
    const mockError = new ErrorEvent('Network error');
    const newEmployee: Employee = { ...mockEmployee, id: '3' };

    service.addEmployee(newEmployee).subscribe(
      () => fail('Expected an error, not employee'),
      (error) => {
        expect(error.error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne(service.urlEmployees);
    req.error(mockError);
  });

  it('should handle error when updating an employee', () => {
    const mockError = new ErrorEvent('Network error');
    const updatedEmployee: Employee = { ...mockEmployee, lastName: 'Updated' };

    service.updateEmployee(updatedEmployee).subscribe(
      () => fail('Expected an error, not employee'),
      (error) => {
        expect(error.error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne(
      `${service.urlEmployees}/${updatedEmployee.id}`
    );
    req.error(mockError);
  });

  it('should handle error when deleting an employee', () => {
    const mockError = new ErrorEvent('Network error');
    const employeeId = '1';

    service.deleteEmployee(employeeId).subscribe(
      () => fail('Expected an error, not employee'),
      (error) => {
        expect(error.error).toEqual(mockError);
      }
    );

    const req = httpMock.expectOne(`${service.urlEmployees}/${employeeId}`);
    req.error(mockError);
  });
});
