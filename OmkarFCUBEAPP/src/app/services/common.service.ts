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
  
  getYearList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Login/GetYearList', null, this.httpOptions);
  }
  getRateList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetRateList', null, this.httpOptions);
  }
  getModuleList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Admin/GetModuleList', null, this.httpOptions);
  }

  getRoleTypeList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Admin/GetRoleTypeList', null, this.httpOptions);
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

  formatDate(date: string) {
    let dateParts = date.split(" ")[0].split("/");
    var dateObject = new Date(dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]);
    const d = new Date(dateObject);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}
