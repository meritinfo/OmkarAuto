import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Tyredeactivatemastermodel } from '../models/tyredeactivatemastermodel';
import { Tyredeactivatemasterlistmodel } from '../models/tyredeactivatemasterlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class TyredeactivateService {

  httpOptions = {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedTyredeactivateMaster = new Tyredeactivatemastermodel();
  constructor(private httpClient: HttpClient) { }

  setTyredeactivateMasterDetails(tyremaster:Tyredeactivatemastermodel) {
      this.selectedTyredeactivateMaster = tyremaster;      
  }
  getTyredeactivateMasterDetails() {
    return this.selectedTyredeactivateMaster;
  }
  clearTyredeactivateMasterDetails() {
    this.selectedTyredeactivateMaster = new Tyredeactivatemastermodel();
  }
  TyredeactivateMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyreDeActivateMasterDelete', req, this.httpOptions);
  }
  getTyredeactivateMasterInnerGridList(request: Requestmodel): Observable<Tyredeactivatemastermodel> {
    return this.httpClient.post<Tyredeactivatemastermodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreDeActivateMasterInnerGridList', request, this.httpOptions);
  }
  tyredeactivateMasterSubmitted(user: Tyredeactivatemastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TyreDeActivateMasterSave', user, this.httpOptions);
  }
  getTyredeactivateMasterList(filter: Filtermodel): Observable<Tyredeactivatemasterlistmodel> {
    return this.httpClient.post<Tyredeactivatemasterlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyreDeActivateMasterList', filter, this.httpOptions);
  }    
  getBrandActTyreNoList(req:Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetBrandTyreNoList', req, this.httpOptions);
  }
  getTyredeactivateVehicleTyreList(request: Requestmodel): Observable<Tyredeactivatemastermodel> {
    return this.httpClient.post<Tyredeactivatemastermodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTyredeactivateVehicleTyreList', request, this.httpOptions);
  }
}
