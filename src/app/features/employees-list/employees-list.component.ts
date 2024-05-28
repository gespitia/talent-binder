import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

// employee.model.ts
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  dateOfBirth: string;
}

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})

export class EmployeesListComponent {
  displayedColumns: string[] = ['firstName', 'lastName', 'position', 'actions'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {
    // Crear 50 empleados falsos
    const employees = Array.from({length: 50}, (_, k) => createFakeEmployee(k + 1));

    // Asignar los datos a la fuente de datos para que la tabla los renderice
    this.dataSource = new MatTableDataSource(employees);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editEmployee(employee: Employee) {
    // Lógica para editar el empleado
  }

  deleteEmployee(employee: Employee) {
    // Lógica para eliminar el empleado
  }

  createEmployee() {
    // Lógica para crear un empleado
    this.router.navigate(['/employees/create']);
  }

}

// Función para crear un empleado falso
function createFakeEmployee(id: number): Employee {
  return {
    id: id,
    firstName: `Nombre${id}`,
    lastName: `Apellido${id}`,
    position: `Puesto${id % 10}`, // Suponiendo 10 puestos diferentes
    dateOfBirth: `1990-01-0${id}`, // Suponiendo 10 días diferentes
  };
}
