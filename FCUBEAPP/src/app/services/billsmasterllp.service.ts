import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillsmastersearchlistmodelLLP} from '../models/billsmastersearchlistmodelllp';
import { Pagerequestwithdatesmodel } from '../models/pagerequestwithdatesmodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
import { Responsemodel } from '../models/responsemodel';
import { BillsmasterlistmodelLLP } from '../models/billsmasterlistmodelllp';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { BillsmastermodelllP } from '../models/billsmastermodelllp';
import { Reportmodel } from 'src/app/models/reportmodel';

@Injectable({
    providedIn: 'root'
})

export class BillsMasterServiceLLP {  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  constructor(private httpClient: HttpClient) { }
  selectedBillsMasterDetails = new BillsmastermodelllP();

  setBillsMasterDetails(docrenewalmaster: BillsmastermodelllP) {  
    this.selectedBillsMasterDetails = docrenewalmaster;
  }

  getBillsMasterDetails() {
    return this.selectedBillsMasterDetails;
  }
  clearBillsMasterDetails() {
    this.selectedBillsMasterDetails= new BillsmastermodelllP();
  }    
  getBillsMasterSearchList(request: Requestmodel): Observable<BillsmastersearchlistmodelLLP> {
    return this.httpClient.post<BillsmastersearchlistmodelLLP>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsMasterSearchListLLP', request, this.httpOptions);
  }  
  getBillsMasterList(filter: Reportmodel): Observable<BillsmasterlistmodelLLP> {
    return this.httpClient.post<BillsmasterlistmodelLLP>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsMasterListLLP', filter, this.httpOptions);
  }  
  getBillsSuppliList(filter: Reportmodel): Observable<BillsmasterlistmodelLLP> {
    return this.httpClient.post<BillsmasterlistmodelLLP>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsMasterListLLP', filter, this.httpOptions);
  }  
  getBillsStmtCreditAcList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetBillsStmtCreditAcList', null, this.httpOptions);
  }
  getPartyGstLocationList(req: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FreightMasters/GetBillPartyGstLocationListLLP', req, this.httpOptions);
  }
  billsMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BillsMasterDeleteLLP', req, this.httpOptions);
  }
  saveBillsMasterDetails(request: BillsmastermodelllP): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/BillsMasterSaveLLP', request, this.httpOptions);
  }
  getBillsMasterInnerGridList(request: Requestmodel): Observable<BillsmastersearchlistmodelLLP> {
    return this.httpClient.post<BillsmastersearchlistmodelLLP>(Constants.API_ENDPOINT + 'FreightMasters/GetBillsInnerGridListLLP', request, this.httpOptions);
  }
  checkDuplicateBillsNo(request: BillsmastermodelllP): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateBillsNoLLP', request, this.httpOptions);
  } 
  checkDuplicateBillLLP(req: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateBillsNoLLP', req, this.httpOptions);
  }
  getBillNoLLP(req: Requestmodel): Observable<Responsemodel> {
      return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillNoLLP', req, this.httpOptions);
    } 
  getBillTypeSacHsn(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillTypeSacHsnLLP', request, this.httpOptions);
  }  
  getBillllpPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetBillPdfLlp', filter, this.httpOptions);
  }
  getBillEnqDetails(filter: Requestmodel): Observable<BillsmastermodelllP> {
    return this.httpClient.post<BillsmastermodelllP>(Constants.API_ENDPOINT + 'FreightMasters/GetBillEnqDetailsLLP', filter, this.httpOptions);
  }
  getBillEnqInnerGridList(req: Requestmodel): Observable<BillsmastermodelllP> {
    return this.httpClient.post<BillsmastermodelllP>(Constants.API_ENDPOINT + 'FreightMasters/GetBillEnqInnerGridListLLP', req, this.httpOptions);
  }
}