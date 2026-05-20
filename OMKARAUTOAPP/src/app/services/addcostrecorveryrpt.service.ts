import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Addcostrecorveryrptlistmodel  } from 'src/app/models/addcostrecorveryrptlistmodel';
import { Addcostrecmstmodel } from 'src/app/models/addcostrecmstmodel';
import { Addcostreclistmodel } from 'src/app/models/addcostreclistmodel';


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
  
  httpformOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }
  selectedAddcostrecmst = new Addcostrecmstmodel();

  setAddcostrecmstDetails(docrenewalmaster: Addcostrecmstmodel) {  
    this.selectedAddcostrecmst = docrenewalmaster;
  }

  getAddcostrecmstDetails() {
    return this.selectedAddcostrecmst;
  }
  clearAddcostrecmstDetails() {
    this.selectedAddcostrecmst= new Addcostrecmstmodel();
  }    
  
  getAddcostrecmstList(filter: Reportmodel): Observable<Addcostreclistmodel> {
    return this.httpClient.post<Addcostreclistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAddCostRecMstList', filter, this.httpOptions);
  }  
  addcostrecmstDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/AddCostRecDelete', req, this.httpOptions);
  }
  saveAddcostrecmstDetails(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/AddCostRecSave', user, this.httpformOptions);
  }
  getAddcostrecInnerGridList(request: Requestmodel): Observable<Addcostrecmstmodel> {
    return this.httpClient.post<Addcostrecmstmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAddCostRecInnerGridList', request, this.httpOptions);
  }  
  getAddCostRecEntryTranNo(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAddCostRecEntryTranNo', request, this.httpOptions);
  }
  getAddCostRecEntryDocDetails(request: Reportmodel): Observable<Addcostrecmstmodel> {
    return this.httpClient.post<Addcostrecmstmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAddCostRecEntryDocDetails', request, this.httpOptions);
  }
  getAddCostRecEntrySearchList(request: Reportmodel): Observable<Addcostrecmstmodel> {
    return this.httpClient.post<Addcostrecmstmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAddCostRecEntrySearchList', request, this.httpOptions);
  }
  getAddcostrecorveryrptList(filter: Reportmodel): Observable<Addcostrecorveryrptlistmodel> {
    return this.httpClient.post<Addcostrecorveryrptlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAddCostRecorveryRptList', filter, this.httpOptions);
  }  
  getAddcostrecorveryrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAddCostRecorveryRptExcel', filter, this.httpOptions);
  }    

}


