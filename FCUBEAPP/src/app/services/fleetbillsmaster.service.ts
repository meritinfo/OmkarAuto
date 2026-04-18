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

export class FleetBillsMasterService {  
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
    return this.httpClient.post<Billsmastersearchlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetFleetBillsMasterSearchList', request, this.httpOptions);
  }  
  getBillsMasterList(filter: Reportmodel): Observable<Billsmasterlistmodel> {
    return this.httpClient.post<Billsmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetFleetBillsMasterList', filter, this.httpOptions);
  }  
  getBillsSuppliList(filter: Reportmodel): Observable<Billsmasterlistmodel> {
    return this.httpClient.post<Billsmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetFleetBillsMasterList', filter, this.httpOptions);
  }  
  getBillsStmtCreditAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetFleetBillsStmtCreditAcList', null, this.httpOptions);
  }
  getPartyGstLocationList(req: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetFleetBillPartyGstLocationList', req, this.httpOptions);
  }
  billsMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/FleetBillsMasterDelete', req, this.httpOptions);
  }
  saveBillsMasterDetails(request: Billsmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/FleetBillsMasterSave', request, this.httpOptions);
  }
  getBillsMasterInnerGridList(request: Requestmodel): Observable<Billsmastersearchlistmodel> {
    return this.httpClient.post<Billsmastersearchlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/FleetGetBillsInnerGridList', request, this.httpOptions);
  }
  checkDuplicateBillsNo(request: Billsmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/FleetCheckDuplicateBillsNo', request, this.httpOptions);
  }  
  getBillTypeSacHsn(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetFleetBillTypeSacHsn', request, this.httpOptions);
  }  
  getBillPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/FleetGetBillPdf', filter, this.httpOptions);
  }
  getBillGsrPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/FleetGetBillGsrPdf', filter, this.httpOptions);
  }
  getBillEnqDetails(filter: Requestmodel): Observable<Billsmastermodel> {
    return this.httpClient.post<Billsmastermodel>(Constants.API_ENDPOINT + 'FreightMasters/FleetGetBillEnqDetails', filter, this.httpOptions);
  }
  getBillEnqInnerGridList(req: Requestmodel): Observable<Billsmastermodel> {
    return this.httpClient.post<Billsmastermodel>(Constants.API_ENDPOINT + 'FreightMasters/FleetGetBillEnqInnerGridList', req, this.httpOptions);
  }
}