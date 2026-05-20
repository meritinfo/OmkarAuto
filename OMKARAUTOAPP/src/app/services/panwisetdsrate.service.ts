import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Panwisetdsratemodel } from '../models/panwisetdsratemodel';
import { Panwisetdsratelistmodel } from '../models/panwisetdsratelistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Reportmodel } from '../models/reportmodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
import { Drivermasterlistrequestmodel } from '../models/drivermasterlistrequestmodel.model';
import { Filtermodel } from '../models/filtermodel';

@Injectable({
  providedIn: 'root'
})
export class PanwisetdsrateService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedPanwisetdsrate = new Panwisetdsratemodel();
  
  constructor(private httpClient: HttpClient) { }

  setPanwisetdsrateDetails(driverMaster: Panwisetdsratemodel) {
      this.selectedPanwisetdsrate = driverMaster;
  }
  getPanwisetdsrateDetails() {
    return this.selectedPanwisetdsrate;
  }
  clearDPanwisetdsrateDetails() {
    this.selectedPanwisetdsrate = new Panwisetdsratemodel();
  }
  
  PanwisetdsrateSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/PanWiseTdsRateSave', user, this.httpOptions);
  }
  getPanwisetdsrateList(filter: Filtermodel): Observable<Panwisetdsratelistmodel> {
    return this.httpClient.post<Panwisetdsratelistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetPanWiseTdsRateList', filter, this.httpOptions);
  }
  chkPanwisetdsrateDupli(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/ChkDriverDuplicate', req, this.httpOptions);
  }
  chkPanDupli(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkPanDuplicate', req, this.httpOptions);
  }

  PanwisetdsrateDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/PanWiseTdsRateDelete', req, this.httpOptions);
  }
}
