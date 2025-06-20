import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
import { Reportmodel } from '../models/reportmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Ledgerrptlistmodel  } from 'src/app/models/ledgerrptlistmodel';
import { Menureportaccessrightsmodel } from 'src/app/models/menureportaccessmodel';
import { Gstsalesrptlistmodel  } from 'src/app/models/gstsalesregisterrptlistmodel';

@Injectable({
  providedIn: 'root'
})

export class FinreportsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }

  getCashBookReport(request: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/CashBookReport', request, this.httpOptions);
  }
  getBankBookPrint(request: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/BankBookPrint', request, this.httpOptions);
  }
  

  getBankBookrptList(filter: Reportmodel): Observable<Ledgerrptlistmodel> {
    return this.httpClient.post<Ledgerrptlistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetBankBookRptList', filter, this.httpOptions);
  }  

  getBankBookrptPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetBankBookRptPdf', filter, this.httpOptions);
  } 
  getBankBookrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetBankBookRptExcel', filter, this.httpOptions);
  } 

  
  getLedgerrptList(filter: Reportmodel): Observable<Ledgerrptlistmodel> {
    return this.httpClient.post<Ledgerrptlistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetLedgerRptList', filter, this.httpOptions);
  }  
  getLedgerrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetLedgerRptExcel', filter, this.httpOptions);
  } 
  getLedgerrptPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetLedgerRptPdf', filter, this.httpOptions);
  } 
  getMultipleLedgerrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetMultipleLedgerRptExcel', filter, this.httpOptions);
  } 
   getMultipleLedgerrptPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetMultipleLedgerRptPdf', filter, this.httpOptions);
  } 
  getAnnexurerrptPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetAnnexureRptPdf', filter, this.httpOptions);
  } 
  getReportMenuList(menuList: Menureportaccessrightsmodel[]): Observable<Menureportaccessrightsmodel[]> {
    return this.httpClient.post<Menureportaccessrightsmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetReportMenuList', menuList,this.httpOptions);
  }
  getLedgerList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans/GetLedgerList', null, this.httpOptions);
  }   
  
  getBrokerLedgerReport(request: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/BrokerLedgerPrint', request, this.httpOptions);
  }
  
  getGstSalesRegisterrptList(filter: Reportmodel): Observable<Gstsalesrptlistmodel> {
    return this.httpClient.post<Gstsalesrptlistmodel>(Constants.API_ENDPOINT + 'FinTrans/GetGstSalesRegisterRptList', filter, this.httpOptions);
  }  
  getGstSalesRegisterrptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetGstSalesRegisterExcel', filter, this.httpOptions);
  } 
  getGstSalesRegisterRptList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinTrans//api/FinTrans/GetGstSalesRegisterRptList', null, this.httpOptions);
  }   
  
  
  getMonthlyBookingRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetMonthlyBookingRptExcel', filter, this.httpOptions);
  }    
  getMonthlyLorryHireRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetMonthlyLorryHireRptExcel', filter, this.httpOptions);
  } 
  getMonthlyAdminExpRptExcel(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinTrans/GetMonthlyAdminExpRptExcel', filter, this.httpOptions);
  } 
}
