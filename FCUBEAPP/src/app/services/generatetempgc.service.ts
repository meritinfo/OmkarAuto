import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Tempgclistmodel } from 'src/app/models/tempgclistmodel';
import { Tempgcmodel } from 'src/app/models/tempgcmodel';

@Injectable({
  providedIn: 'root'
})
export class GeneratetempgcService {
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
    
  selectedtempgcmodel = new Tempgcmodel();
  constructor(private httpClient: HttpClient) { }

  setTempgcDetails(tempgcmodel: Tempgcmodel) {
    this.selectedtempgcmodel = tempgcmodel;
  }
  getTempgcDetails() {
    return this.selectedtempgcmodel;
  }
  
  clearTempgcDetails() {
    this.selectedtempgcmodel = new Tempgcmodel();
  }
  
  getTempgcList(filter: Reportmodel): Observable<Tempgclistmodel> {
    return this.httpClient.post<Tempgclistmodel>(Constants.API_ENDPOINT + 'Consignment/GetTempgcList', filter, this.httpOptions);
  }
  
  getLrPdf(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetLRPdf', filter, this.httpOptions);
  }

  sendLrMail(filter: Reportmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/SendLRMail', filter, this.httpOptions);
  }
  
  getTempgcInnerGridList(req: Requestmodel): Observable<Tempgcmodel> {
    return this.httpClient.post<Tempgcmodel>(Constants.API_ENDPOINT + 'Consignment/GetTempgcInnerGridList', req, this.httpOptions);
  }

  tempgcSubmitted(tempgc: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/TempgcSave', tempgc, this.httpOptions);
  }
    
  tempgcDelete(request: Requestmodel ):  Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/TempgcDelete', request, this.httpOptions);
  }

}
