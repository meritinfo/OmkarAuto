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

  getFleetBillsMasterDetails() {
    return this.selectedBillsMasterDetails;
  }
  clearFleetBillsMasterDetails() {
    this.selectedBillsMasterDetails= new Billsmastermodel();
  }    
  getFleetBillsMasterSearchList(request: Requestmodel): Observable<Billsmastersearchlistmodel> {
    return this.httpClient.post<Billsmastersearchlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetFleetBillsMasterSearchList', request, this.httpOptions);
  }  
  getFleetBillsMasterList(filter: Reportmodel): Observable<Billsmasterlistmodel> {
    return this.httpClient.post<Billsmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetFleetBillsMasterList', filter, this.httpOptions);
  }    
  getFleetBillsMasterInnerGridList(request: Requestmodel): Observable<Billsmastersearchlistmodel> {
    return this.httpClient.post<Billsmastersearchlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/FleetGetBillsInnerGridList', request, this.httpOptions);
  }
  getFleetBillPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/FleetGetBillPdf', filter, this.httpOptions);
  }
  getFleetBillGsrPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/FleetGetBillGsrPdf', filter, this.httpOptions);
  }
}