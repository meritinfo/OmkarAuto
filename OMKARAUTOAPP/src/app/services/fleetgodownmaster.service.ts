import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Fleetgodownmastermodel } from '../models/fleetgodownmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from '../common/constants';
import { fleetgodownmasterlistmodel } from '../models/fleetgodownmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class FleetgodownmasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selecteFleetgodownmastermodel = new Fleetgodownmastermodel();
  constructor(private httpClient: HttpClient) { }

  setGoDownMasterDetails(godown: Fleetgodownmastermodel) {
    this.selecteFleetgodownmastermodel = godown;
  }

  clearFleetgodownmasterDetails() {
    this.selecteFleetgodownmastermodel = new Fleetgodownmastermodel();
  }

  getFleetGodownMaserList(filter: Filtermodel): Observable<fleetgodownmasterlistmodel> {
    return this.httpClient.post<fleetgodownmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetFleetGodownMaserList', filter, this.httpOptions);
  }

  getGoDownMasterDetails() {
   return this.selecteFleetgodownmastermodel;
  }

  fleetGodownMaserSave(user: Fleetgodownmastermodel): Observable<Responsemodel> {
     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/FleetGodownMaserSave', user, this.httpOptions);
  }

  fleetGodownMasterDelete(request: Requestmodel ):  Observable<Responsemodel> {
   return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/FleetGodownMasterDelete', request, this.httpOptions);
  }

  
  checkDuplicateGodownShortCode(req: Requestmodel): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetMasters/CheckDuplicateGodownShortCode', req, this.httpOptions);
  }

  
  checkDuplicateGodownDesc(req: Requestmodel): Observable<any> {
    return this.httpClient.post<any>(Constants.API_ENDPOINT + 'FleetMasters/CheckDuplicateGodownDesc', req, this.httpOptions);
  }
}
