import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Godownstockmodel } from 'src/app/models/godownstockmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Responsemodel } from '../models/responsemodel';


@Injectable({
  providedIn: 'root'
})
export class GodownstockentryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  constructor(private httpClient: HttpClient) { }

  getFltGodownList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetFltGodownList', null, this.httpOptions);
  }

  godownStockSave(user:Godownstockmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/GodownStockSave', user, this.httpOptions);
  }

  getSparesLubesStockInnergrid(request: Requestmodel): Observable<Godownstockmodel> {
    return this.httpClient.post<Godownstockmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetSparesLubesStockInnergrid', request, this.httpOptions);
  }
}
