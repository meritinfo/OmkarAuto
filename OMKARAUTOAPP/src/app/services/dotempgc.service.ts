import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Repreqmodel } from '../models/repreqmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dotempgclistmodel } from 'src/app/models/dotempgclistmodel';
import { Dotempgcmodel } from 'src/app/models/dotempgcmodel';

@Injectable({
  providedIn: 'root'
})
export class DotempgcService {
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
    
  selectedtempgcmodel = new Dotempgcmodel();
  constructor(private httpClient: HttpClient) { }

  setTempgcDetails(tempgcmodel: Dotempgcmodel) {
    this.selectedtempgcmodel = tempgcmodel;
  }

  getTempgcDetails() {
    return this.selectedtempgcmodel;
  }
  
  clearTempgcDetails() {
    this.selectedtempgcmodel = new Dotempgcmodel();
  }
  
  getTempgcList(filter: Repreqmodel): Observable<Dotempgclistmodel> {
    return this.httpClient.post<Dotempgclistmodel>(Constants.API_ENDPOINT + 'Consignment/GetDoTempgcList', filter, this.httpOptions);
  }
  
  getTempgcInnerGridList(req: Requestmodel): Observable<Dotempgcmodel> {
    return this.httpClient.post<Dotempgcmodel>(Constants.API_ENDPOINT + 'Consignment/GetDoTempgcInnerGridList', req, this.httpOptions);
  }

  tempgcSubmitted(tempgc: Dotempgcmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DoTempgcSave', tempgc, this.httpOptions);
  }
    
  tempgcDelete(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DoTempGcDelete', request, this.httpOptions);
  }

}
