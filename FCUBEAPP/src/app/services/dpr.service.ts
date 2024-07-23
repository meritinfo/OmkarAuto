import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Constants } from '../common/constants';
import { Dprmodel } from '../models/dprmodel';
import { Dprlistmodel } from '../models/dprlistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class DprService {
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selecteddpr = new Dprmodel();

  constructor(private httpClient: HttpClient) { }

  setDprDetails(dpr: Dprmodel) { 
      this.selecteddpr = dpr;   
  }
  
  getDprDetails() {
    return this.selecteddpr;
  }

  clearDprDetails() {
    this.selecteddpr = new Dprmodel();
  }

  dprSubmitted(dpr: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DprMasterSave', dpr, this.httpOptions);
  }

  getDprList(filter: Reportmodel): Observable<Dprlistmodel> {
    return this.httpClient.post<Dprlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetDprMasterList', filter, this.httpOptions);
  } 

  dprDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DprMasterDelete', req, this.httpOptions);
  }  
  getDprInnerGridList(req : Requestmodel): Observable<Dprmodel> {
    return this.httpClient.post<Dprmodel>(Constants.API_ENDPOINT + 'Consignment/GetDprInnerGridList', req, this.httpOptions);
  } 

  
}


