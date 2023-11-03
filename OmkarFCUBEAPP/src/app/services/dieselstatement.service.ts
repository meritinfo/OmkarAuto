import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dieselstatementsearchlistrequestmodel } from '../models/dieselstatementsearchlistrequestmodel';
import { Dieselstatementsearchlistmodel } from '../models/dieselstatementsearchlistmodel';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Filtermodel } from '../models/filtermodel';
import { Dieselstatementsaverequest } from '../models/dieselstatementsaverequest';
import { Responsemodel } from '../models/responsemodel';
import { Dieselstatementlistmodel } from '../models/dieselstatementlistmodel';
import { Dieselstatementmodel } from '../models/dieselstatementmodel';

@Injectable({
  providedIn: 'root'
})
export class DieselstatementService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDieselStatement = new Dieselstatementmodel();

  constructor(private httpClient: HttpClient) { }
  setDieselStatementDetails(docrenewalmaster: Dieselstatementmodel) {
 
    this.selectedDieselStatement = docrenewalmaster;
  

}
  clearDieselStatementDetails() {
    this.selectedDieselStatement= new Dieselstatementmodel();
  }
  getDieselStatementSearchList(request: Dieselstatementsearchlistrequestmodel): Observable<Dieselstatementsearchlistmodel> {
    return this.httpClient.post<Dieselstatementsearchlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStatementSearchList', request, this.httpOptions);
  }
  getDieselStatementList(filter: Filtermodel): Observable<Dieselstatementlistmodel> {
    return this.httpClient.post<Dieselstatementlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDieselStatementList', filter, this.httpOptions);
  }

  saveDieselStatementDetails(request: Dieselstatementsaverequest): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/SaveDieselStatementDetails', request, this.httpOptions);
  }
}
