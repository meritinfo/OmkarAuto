import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Tyreactivatemastermodel } from '../models/tyreactivatemastermodel';
import { Tyreactivatemasterlistmodel } from '../models/tyreactivatemasterlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class TyreactivateService {

  httpOptions = {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedTyreactivateMaster = new Tyreactivatemastermodel();
  constructor(private httpClient: HttpClient) { }


  setTyreactivateMasterDetails(tyremaster:Tyreactivatemastermodel) {
      this.selectedTyreactivateMaster = tyremaster;      
  }
  getTyreactivateMasterDetails() {
    return this.selectedTyreactivateMaster;
  }
  clearTyreactivateMasterDetails() {
    this.selectedTyreactivateMaster = new Tyreactivatemastermodel();
  }
  TyreactivateMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyreActivateMasterDelete', req, this.httpOptions);
  }
  getTyreactivateMasterInnerGridList(request: Requestmodel): Observable<Tyreactivatemastermodel> {
    return this.httpClient.post<Tyreactivatemastermodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreActivateMasterInnerGridList', request, this.httpOptions);
  }
  tyreactivateMasterSubmitted(user: Tyreactivatemastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyreActivateMasterSave', user, this.httpOptions);
  }
  getTyreactivateMasterList(filter: Filtermodel): Observable<Tyreactivatemasterlistmodel> {
    return this.httpClient.post<Tyreactivatemasterlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreActivateMasterList', filter, this.httpOptions);
  }    
  getBrandTyreNoList(req:Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetBrandTyreNoList', req, this.httpOptions);
  }     
  getTyreNoCostAmt(req:Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreNoCostAmt', req, this.httpOptions);
  }
  
  getVehicleTyrePositionList(req:Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleTyrePositionList', req, this.httpOptions);
  }  
  getVehicleNoOfTyres(req:Requestmodel): Observable<Dropdownmodel> {
    return this.httpClient.post<Dropdownmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleNoOfTyres', req, this.httpOptions);
  }
  
}
