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
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
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
  getContentList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetContentList', null, this.httpOptions);
  }
 
  
  getLocationList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetLocationList', null, this.httpOptions);
  }
  getVehicleNoList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetVehicleNoList', null, this.httpOptions);
  }
  getlrSeriesList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetLRSeries', null, this.httpOptions);
  }
  getBillingPartyList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetBillingPartyList', null, this.httpOptions);
  }
  getVehicleList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicleList', null, this.httpOptions);
  }
  getDriverList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetDriverList', null, this.httpOptions);
  }
  getCreditAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetCreditAcList', null, this.httpOptions);
  }
  getProductList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetProductGroupList', null, this.httpOptions);
  }
  billDetails(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Admin/GetEWayBillDetails', payload, this.httpOptions);
  }
  getKms(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/getKms', payload, this.httpOptions);
  }
  getOpeningBal(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetOpeningBal', payload, this.httpOptions);
  }
  getIncentiveRate(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetIncentiveRate', payload, this.httpOptions);
  }
  getPenaltyRate(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetPenaltyRate', payload, this.httpOptions);
  }
  getBhattaRate(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetBhattaRate', payload, this.httpOptions);
  }
  getTripKms(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/getTripKms', payload, this.httpOptions);
  }
  getCreditAcList2(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetCreditAcList2', payload, this.httpOptions);
  }

  getTripKms2(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetTripKms2', payload, this.httpOptions);
  }
  getTripDetails(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetTripDetail', payload, this.httpOptions);
  }
  getDslToBe(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetDslToBe', payload, this.httpOptions);
  }
  

  getGcSeries(payload: any):  Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetGcSeries', payload, this.httpOptions);
  }
  getAdBlueToBe(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetAdBlueToBe', payload, this.httpOptions);
  }
  checkDuplicateLr(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/CheckDuplicateLr', payload, this.httpOptions);
  }

  formatDate(date: string) {
    if(date == ''){
      return '';
    }
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
