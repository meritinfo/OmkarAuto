import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branchmodel } from '../models/branchmodel';
import { Destinationmodel } from '../models/destinationmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }

  getBranchList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetBranchList', null, this.httpOptions);
  }

  getModuleList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Admin/GetModuleList', null, this.httpOptions);
  }
    
  getStateList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetStateList', null, this.httpOptions);
  }
  getProductList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetProductGroupList', null, this.httpOptions);
  }
  billDetails(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Admin/GetEWayBillDetails', payload, this.httpOptions);
  }
}
