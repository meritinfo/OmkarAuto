import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Vehiclerepairsrptlistmodel  } from 'src/app/models/vehiclerepairsrptlistmodel';
import { Vehiclerepairsrptmodel } from 'src/app/models/vehiclerepairsrptmodel';

@Injectable({
  providedIn: 'root'
})
export class VehiclerepairsrptService {

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getVehiclerepairsrptList(filter: Reportmodel): Observable<Vehiclerepairsrptlistmodel> {
    return this.httpClient.post<Vehiclerepairsrptlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehiclerepairsRptList', filter, this.httpOptions);
  }  
  getVehiclerepairsrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehiclerepairsRptExcel', filter, this.httpOptions);
  }    

}