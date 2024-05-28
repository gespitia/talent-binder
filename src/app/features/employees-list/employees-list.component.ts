import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '@core/models/employee.model';
import { EmployeeService } from '@core/services/employee.service';

// employee.model.ts
@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
})
export class EmployeesListComponent implements AfterViewInit{
  displayedColumns: string[] = ['firstName', 'lastName', 'position', 'actions'];
  dataSource!: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeeService: EmployeeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.getEmployeesTable();
  }

  getEmployeesTable() {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      this.dataSource = new MatTableDataSource(employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.changeDetectorRef.detectChanges(); // Forzar la detección de cambios
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id:string) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.getEmployeesTable();
    });
  }
}
