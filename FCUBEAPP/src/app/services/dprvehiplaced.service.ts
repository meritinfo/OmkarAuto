import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dprvehiplacedmodel } from 'src/app/models/dprvehiplacedmodel';

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

  setDprDetails(dpr: Dprvehiplacedmodel) { 
      this.selectedDprvehi = dpr;   
  }
  
  getDprDetails() {
    return this.selectedDprvehi;
  }

  clearDprDetails() {
    this.selectedDprvehi = new Dprvehiplacedmodel();
  }
  
  getDprVehiPlacedDetails(filter: Requestmodel): Observable<Dprvehiplacedmodel> {
    return this.httpClient.post<Dprvehiplacedmodel>(Constants.API_ENDPOINT + 'Consignment/GetDprVehiPlacedDetails', filter, this.httpOptions);
  }  
  getDprVehiInnerGridList(filter: Requestmodel): Observable<Dprvehiplacedmodel> {
    return this.httpClient.post<Dprvehiplacedmodel>(Constants.API_ENDPOINT + 'Consignment/GetDprVehiInnerGridList', filter, this.httpOptions);
  }    

}
