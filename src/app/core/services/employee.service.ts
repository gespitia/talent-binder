import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '@core/models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  urlEmployees = environment.apiUrl + '/employees';

  private _http = inject(HttpClient);


  getEmployees():Observable<Employee[]> {
    return this._http.get<Employee[]>(this.urlEmployees);
  }

  getEmployee(id: string):Observable<Employee> {
    return this._http.get<Employee>(this.urlEmployees + '/' + id);
  }

  addEmployee(employee: Employee):Observable<Employee> {
    return this._http.post<Employee>(this.urlEmployees, employee);
  }

  updateEmployee(employee: Employee):Observable<Employee> {
    return this._http.put<Employee>(this.urlEmployees + '/' + employee.id, employee);
  }

  deleteEmployee(id: string):Observable<Employee> {
    return this._http.delete<Employee>(this.urlEmployees + '/' + id);
  }

}
