import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Branchmodel } from '../models/branchmodel';
import { Destinationmodel } from '../models/destinationmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Tripvehiclemodel } from 'src/app/models/tripvehiclemodel';
import { Tripdsldetail } from 'src/app/models/tripdsldetail';
import { Requestmodel } from 'src/app/models/requestmodel';

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
  getHrTypeList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Admin/GetHrTypeList', null, this.httpOptions);
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
  getEmpList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMasters/GetEmpList', null, this.httpOptions);
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
  getlrSeriesForBillList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'Consignment/GetLRSeriesForBill', null, this.httpOptions);
  }
  getDocRefNoList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetDocRenewalList', null, this.httpOptions);
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
  getCardledgerAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetCardledgerAcList', null, this.httpOptions);
  }
  getBankAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetBankAcList2', null, this.httpOptions);
  }
  getBankDebitAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetBankDebitAcList', null, this.httpOptions);
  }
  getCreditAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetCreditAcList', null, this.httpOptions);
  }
  getProductList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetProductGroupList', null, this.httpOptions);
  }
  billDetails(req: Requestmodel): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Admin/GetEWayBillDetails', req, this.httpOptions);
  }
  checkEwaybillExits(req: Requestmodel): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Admin/CheckEwaybillExits', req, this.httpOptions);
  }
  getKms(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/getKms', payload, this.httpOptions);
  }
  getOpeningBal(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetOpeningBal', payload, this.httpOptions);
  }
  getDslOpeningBal(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetDslOpeningBal', payload, this.httpOptions);
  }
  getAdblueOpeningBal(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetAdblueOpeningBal', payload, this.httpOptions);
  }
  getDriverDetail(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetDriverDetail', payload, this.httpOptions);
  }
  getIncentiveRate(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetIncentiveRate', payload, this.httpOptions);
  }
  getPenaltyRate(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetPenaltyRate', payload, this.httpOptions);
  }
  getPenaltyRateNew(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetTrans/GetPenaltyRateNew', payload, this.httpOptions);
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
  getTripDslDetails(payload: Tripvehiclemodel): Observable<Tripdsldetail> {
    return this.httpClient.post<Tripdsldetail>(Constants.API_ENDPOINT + 'FleetTrans/GetTripDslDetail', payload, this.httpOptions);
  }
  getDslToBe(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetDslToBe', payload, this.httpOptions);
  }
  
  getGcSeries(req: Requestmodel):  Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetGcSeries', req, this.httpOptions);
  }
  getBillSeries(req: Requestmodel):  Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetBillSeries', req, this.httpOptions);
  }
  getAdBlueToBe(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/GetAdBlueToBe', payload, this.httpOptions);
  }
  checkDuplicateLr(req: Requestmodel): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Consignment/CheckDuplicateLr', req, this.httpOptions);
  }
  checkDuplicateCardNo(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetMasters/CheckDuplicateCardNo', payload, this.httpOptions);
  }
  checkPassword(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'Admin/CheckPassword', payload, this.httpOptions);
  }
  checkDuplicateCardCode(payload: any): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetMasters/CheckDuplicateCardCode', payload, this.httpOptions);
  }

  formatDate(date: string) {
    if(date == ''){
      return '';
    }
    var dateParts =[''];
    if(date.includes("/")){   
     dateParts = date.split(" ")[0].split("/");
    }
    else{  
     dateParts = date.split(" ")[0].split("-");
    }
    var dateObject = new Date(dateParts[2] + '/' + dateParts[1] + '/' + dateParts[0]);
    const d = new Date(dateObject);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  getCurrentFiscalYear(date: string) {
    var dates = {
      'sDate': new Date(),
      'eDate': new Date()
    };
    var docDate = new Date(date);
    var month = docDate.getMonth();
    if (month > 3) {
      dates.sDate = new Date(docDate.getFullYear(), 3, 1);
      dates.eDate = new Date(dates.sDate.getFullYear() + 1, dates.sDate.getMonth() - 1, 31);
    }
    else {
      dates.sDate = new Date(docDate.getFullYear() - 1, 3, 1);
      dates.eDate = new Date(docDate.getFullYear(), dates.sDate.getMonth() - 1, 31);
    }
    return dates;
  }
}
