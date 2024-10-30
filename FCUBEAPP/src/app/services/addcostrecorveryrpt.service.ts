import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Addcostrecorveryrptlistmodel  } from 'src/app/models/addcostrecorveryrptlistmodel';
import { Addcostrecorveryrptmodel } from 'src/app/models/addcostrecorveryrptmodel';

@Injectable({
  providedIn: 'root'
})
export class AddcostrecorveryrptService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  constructor(private httpClient: HttpClient) { }
  
  getAddcostrecorveryrptList(filter: Reportmodel): Observable<Addcostrecorveryrptlistmodel> {
    return this.httpClient.post<Addcostrecorveryrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAddCostRecorveryRptList', filter, this.httpOptions);
  }  
  getAddcostrecorveryrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAddCostRecorveryRptExcel', filter, this.httpOptions);
  }    

}


