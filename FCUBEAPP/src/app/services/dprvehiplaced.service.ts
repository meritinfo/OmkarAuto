import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dprvehiplacedmodel } from 'src/app/models/dprvehiplacedmodel';
import { Dprvehiplacedlistmodel } from 'src/app/models/dprvehiplacedlistmodel';

@Injectable({
  providedIn: 'root'
})
export class DprvehiplacedService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  constructor(private httpClient: HttpClient) { }

  
  selectedDprvehi = new Dprvehiplacedmodel();

  setDprVehiDetails(dpr: Dprvehiplacedmodel) { 
      this.selectedDprvehi = dpr;   
  }
  
  getDprVehiDetails() {
    return this.selectedDprvehi;
  }

  clearDprVehiDetails() {
    this.selectedDprvehi = new Dprvehiplacedmodel();
  }
  
  getDprVehiPlacedList(filter: Reportmodel): Observable<Dprvehiplacedlistmodel> {
    return this.httpClient.post<Dprvehiplacedlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetDprVehiPlacedList', filter, this.httpOptions);
  }  
  getDprVehiPlacedDetails(filter: Requestmodel): Observable<Dprvehiplacedmodel> {
    return this.httpClient.post<Dprvehiplacedmodel>(Constants.API_ENDPOINT + 'Consignment/GetDprVehiPlacedDetails', filter, this.httpOptions);
  }  
  getDprVehiInnerGridList(filter: Requestmodel): Observable<Dprvehiplacedmodel> {
    return this.httpClient.post<Dprvehiplacedmodel>(Constants.API_ENDPOINT + 'Consignment/GetDprVehiInnerGridList', filter, this.httpOptions);
  }    
  dprVehiPlacedSubmitted(dpr: Dprvehiplacedmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DprVehiPlacedSave', dpr, this.httpOptions);
  }    
  dprVehiUpdateAdvance(dpr: Dprvehiplacedmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DprVehiUpdateAdvance', dpr, this.httpOptions);
  }  
  dprVehiPlacedAddLr(dpr: Dprvehiplacedmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DprVehiPlacedAddLr', dpr, this.httpOptions);
  }
  dprVehiPlacedDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DprVehiPlacedDelete', req, this.httpOptions);
  }
  dprVehiPlacedAdvUpd(req: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DprVehiPlacedAdvUpd', req, this.httpOptions);
  }
  getVehicleDetails(req: Requestmodel): Observable<Dprvehiplacedmodel> {
    return this.httpClient.post<Dprvehiplacedmodel>(Constants.API_ENDPOINT + 'Consignment/GetVehicleDetails', req, this.httpOptions);
  }
}
