import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Billsmastersearchlistmodel} from '../models/billsmastersearchlistmodel';
import { Pagerequestwithdatesmodel } from '../models/pagerequestwithdatesmodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
import { Responsemodel } from '../models/responsemodel';
import { Billsmasterlistmodel } from '../models/billsmasterlistmodel';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Billsmastermodel } from '../models/billsmastermodel';
import { Reportmodel } from 'src/app/models/reportmodel';

@Injectable({
    providedIn: 'root'
})

export class BillsMasterService {  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }
  selectedBillsMasterDetails = new Billsmastermodel();

  setBillsMasterDetails(docrenewalmaster: Billsmastermodel) {  
    this.selectedBillsMasterDetails = docrenewalmaster;
  }

  getBillsMasterDetails() {
    return this.selectedBillsMasterDetails;
  }
  clearBillsMasterDetails() {
    this.selectedBillsMasterDetails= new Billsmastermodel();
  }    
  getBillsMasterSearchList(request: Requestmodel): Observable<Billsmastersearchlistmodel> {
    return this.httpClient.post<Billsmastersearchlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsMasterSearchList', request, this.httpOptions);
  }  
  getBillsMasterList(filter: Pagerequestwithdatesmodel): Observable<Billsmasterlistmodel> {
    return this.httpClient.post<Billsmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsMasterList', filter, this.httpOptions);
  }  
  getBillsSuppliList(filter: Pagerequestwithdatesmodel): Observable<Billsmasterlistmodel> {
    return this.httpClient.post<Billsmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsMasterList', filter, this.httpOptions);
  }  
  getBillsStmtCreditAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetBillsStmtCreditAcList', null, this.httpOptions);
  }
  getPartyGstLocationList(req: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetBillPartyGstLocationList', req, this.httpOptions);
  }
  billsMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BillsMasterDelete', req, this.httpOptions);
  }
  saveBillsMasterDetails(request: Billsmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BillsMasterSave', request, this.httpOptions);
  }
  getBillsMasterInnerGridList(request: Requestmodel): Observable<Billsmastersearchlistmodel> {
    return this.httpClient.post<Billsmastersearchlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsInnerGridList', request, this.httpOptions);
  }
  checkDuplicateBillsNo(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateBillsNo', request, this.httpOptions);
  }  
  getBillTypeSacHsn(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillTypeSacHsn', request, this.httpOptions);
  }  
  getBillPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillPdf', filter, this.httpOptions);
  }
  getBillEnqDetails(filter: Requestmodel): Observable<Billsmastermodel> {
    return this.httpClient.post<Billsmastermodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillEnqDetails', filter, this.httpOptions);
  }
  getBillEnqInnerGridList(req: Requestmodel): Observable<Billsmastermodel> {
    return this.httpClient.post<Billsmastermodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillEnqInnerGridList', req, this.httpOptions);
  }
}