import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Vehiclefrtoutstandingrptlistmodel  } from 'src/app/models/vehiclefrtoutstandingrptlistmodel';
import { Vehiclefrtoutstandingrptmodel } from 'src/app/models/vehiclefrtoutstandingrptmodel';


@Injectable({
  providedIn: 'root'
})
export class VehiclefrtoutstandingrptService {

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getVehiclefrtoutstandingrptList(filter: Reportmodel): Observable<Vehiclefrtoutstandingrptlistmodel> {
    return this.httpClient.post<Vehiclefrtoutstandingrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehiclefrtoutstandingRptList', filter, this.httpOptions);
  }  
  getVehiclefrtoutstandingrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehiclefrtoutstandingRptExcel', filter, this.httpOptions);
  }    

}