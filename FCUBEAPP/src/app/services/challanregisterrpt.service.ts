import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Challanregisterrptlistmodel  } from 'src/app/models/challanregisterrptlistmodel';
import { Challanregisterrptmodel } from 'src/app/models/challanregisterrptmodel';

@Injectable({
  providedIn: 'root'
})
export class ChallanregisterrptService {

 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getChallanregisterrptList(filter: Reportmodel): Observable<Challanregisterrptlistmodel> {
    return this.httpClient.post<Challanregisterrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetChallanRegisterRptList', filter, this.httpOptions);
  }  
  getChallanregisterrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetChallanRegisterRptExcel', filter, this.httpOptions);
  }    

}


