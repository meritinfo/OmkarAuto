import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Fleetcardmastermodel } from '../models/fleetcardmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Fleetcardmasterlistmodel } from '../models/fleetcardmasterlistmodel';
import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class FleetCardMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedFleetcardmaster = new Fleetcardmastermodel();
  constructor(private httpClient: HttpClient) { }
  setFleetCardMasterDetails(fleetcardmaster: Fleetcardmastermodel) {
 
      this.selectedFleetcardmaster = fleetcardmaster;
    
  
  }
  getFleetCardMasterDetails() {
    return this.selectedFleetcardmaster;
  }
  clearFleetCardMasterDetails() {
    this.selectedFleetcardmaster = new Fleetcardmastermodel();
  }
  fleetCardMasterDetailsSubmitted(user: Fleetcardmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/FleetcardMasterSave', user, this.httpOptions);
  }
  getFleetCardMasterList(filter: Filtermodel): Observable<Fleetcardmasterlistmodel> {
    return this.httpClient.post<Fleetcardmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetFleetCardMasterList', filter, this.httpOptions);
  }
  fleetCardMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/FleetCardMasterDelete', req, this.httpOptions);
  }
}
