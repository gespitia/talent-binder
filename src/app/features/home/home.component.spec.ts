import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { EmployeesListComponent } from '../employees-list/employees-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/shared/shared.module';
import { EmployeeService } from 'app/core/services/employee.service';
import { PositonService } from 'app/core/services/positon.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let employeServices = jasmine.createSpyObj('EmployeeService', [
    'getEmployees',
  ]);
  let positionServices = jasmine.createSpyObj('PositonService', [
    'getPositions',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [SharedModule, BrowserAnimationsModule],
      providers: [
        { provide: EmployeeService, useValue: employeServices },
        { provide: PositonService, useValue: positionServices },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
