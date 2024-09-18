import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Tyresalesmastermodel } from '../models/tyresalesmastermodel';
import { Tyresalesmasterlistmodel } from '../models/tyresalesmasterlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';


@Injectable({
  providedIn: 'root'
})
export class TyresalesService {

  httpOptions = {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  selectedTyresalesMaster = new Tyresalesmastermodel();
  constructor(private httpClient: HttpClient) { }

  setTyresalesMasterDetails(tyremaster:Tyresalesmastermodel) {
      this.selectedTyresalesMaster = tyremaster;      
  }
  getTyresalesMasterDetails() {
    return this.selectedTyresalesMaster;
  }
  clearTyresalesMasterDetails() {
    this.selectedTyresalesMaster = new Tyresalesmastermodel();
  }
  getTyresalesMasterList(filter: Filtermodel): Observable<Tyresalesmasterlistmodel> {
    return this.httpClient.post<Tyresalesmasterlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreSalesMasterList', filter, this.httpOptions);
  }    
  getTyresalesMasterInnerGridList(request: Requestmodel): Observable<Tyresalesmastermodel> {
    return this.httpClient.post<Tyresalesmastermodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreSalesMasterInnerGridList', request, this.httpOptions);
  }
  tyresalesMasterSubmitted(user: Tyresalesmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyreSalesMasterSave',  user, this.httpOptions);
  }  
  tyresalesMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyreSalesMasterDelete', req, this.httpOptions);
  }
  getScrapTyreNoList(req:Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetBrandTyreNoList', req, this.httpOptions);
  }
}
