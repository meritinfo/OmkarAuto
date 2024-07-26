import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Tyreregrouprecdmastermodel } from '../models/tyreregrouprecdmastermodel';
import { Tyreregrouprecdmasterlistmodel } from '../models/tyreregrouprecdmasterlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class TyreregrouprecdService {

  httpOptions = {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  
  httpformOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }


  selectedTyreregrouprecdMaster = new Tyreregrouprecdmastermodel();
  constructor(private httpClient: HttpClient) { }

  setTyreregrouprecdMasterDetails(tyremaster:Tyreregrouprecdmastermodel) {
      this.selectedTyreregrouprecdMaster = tyremaster;      
  }
  getTyreregrouprecdMasterDetails() {
    return this.selectedTyreregrouprecdMaster;
  }
  clearTyreregrouprecdMasterDetails() {
    this.selectedTyreregrouprecdMaster = new Tyreregrouprecdmastermodel();
  }
  getTyreregrouprecdMasterList(filter: Filtermodel): Observable<Tyreregrouprecdmasterlistmodel> {
    return this.httpClient.post<Tyreregrouprecdmasterlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreRegroupRecdMasterList', filter, this.httpOptions);
  }    
  getTyreregrouprecdMasterInnerGridList(request: Requestmodel): Observable<Tyreregrouprecdmastermodel> {
    return this.httpClient.post<Tyreregrouprecdmastermodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreRegroupRecdMasterInnerGridList', request, this.httpOptions);
  }
  getTyreregrouprecdMasterSearchList(request: Requestmodel): Observable<Tyreregrouprecdmastermodel> {
    return this.httpClient.post<Tyreregrouprecdmastermodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreRegroupRecdMasterSearchList', request, this.httpOptions);
  }
  tyreregrouprecdMasterSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyreRegroupRecdMasterSave',  user, this.httpformOptions);
  }  
  tyreregrouprecdMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyreRegroupRecdMasterDelete', req, this.httpOptions);
  }
  getIssuedTyreNoList(req:Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetIssuedTyreNoList', req, this.httpOptions);
  }
}
