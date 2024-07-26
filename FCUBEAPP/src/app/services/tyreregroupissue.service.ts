import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Tyreregroupissuemastermodel } from '../models/tyreregroupissuemastermodel';
import { Tyreregroupissuemasterlistmodel } from '../models/tyreregroupissuemasterlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class TyreregroupissueService {

  httpOptions = {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedTyreregroupissueMaster = new Tyreregroupissuemastermodel();
  constructor(private httpClient: HttpClient) { }

  setTyreregroupissueMasterDetails(tyremaster:Tyreregroupissuemastermodel) {
      this.selectedTyreregroupissueMaster = tyremaster;      
  }
  getTyreregroupissueMasterDetails() {
    return this.selectedTyreregroupissueMaster;
  }
  clearTyreregroupissueMasterDetails() {
    this.selectedTyreregroupissueMaster = new Tyreregroupissuemastermodel();
  }
  getTyreregroupissueMasterList(filter: Filtermodel): Observable<Tyreregroupissuemasterlistmodel> {
    return this.httpClient.post<Tyreregroupissuemasterlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreRegroupIssueMasterList', filter, this.httpOptions);
  }    
  getTyreregroupissueMasterInnerGridList(request: Requestmodel): Observable<Tyreregroupissuemastermodel> {
    return this.httpClient.post<Tyreregroupissuemastermodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreRegroupIssueMasterInnerGridList', request, this.httpOptions);
  }
  tyreregroupissueMasterSubmitted(user: Tyreregroupissuemastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyreRegroupIssueMasterSave', user, this.httpOptions);
  }  
  tyreregroupissueMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyreRegroupIssueMasterDelete', req, this.httpOptions);
  }
  getBrandTyreNoList(req:Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetBrandTyreNoList', req, this.httpOptions);
  }
}
