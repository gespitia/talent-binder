import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Positions } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class PositonService {

  urlPostions = environment.apiPostitonsUrl;

  private _http = inject(HttpClient);

  getPositions():Observable<Positions> {
    return this._http.get<Positions>(this.urlPostions);
  }
}
