import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Fleetgroupmastermodel } from '../models/fleetgroupmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Fleetgroupmasterlist } from '../models/fleetgroupmasterlist';

@Injectable({
  providedIn: 'root'
})
export class FleetgroupmasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
   constructor(private httpClient: HttpClient) { }

     selectedFleetgroupmastermodel = new Fleetgroupmastermodel();

    clearFleetGroupMaster() {
    this.selectedFleetgroupmastermodel = new Fleetgroupmastermodel();
    }

    getFleetGroupMasterList(filter: Filtermodel): Observable<Fleetgroupmasterlist> {
      return this.httpClient.post<Fleetgroupmasterlist>(Constants.API_ENDPOINT + 'FleetMasters/GetFleetGroupMasterList', filter, this.httpOptions);
    }
    fleetGroupMasterSave(user: Fleetgroupmastermodel): Observable<Responsemodel> {
     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/FleetGroupMasterSave', user, this.httpOptions);
    }

  fleetGroupMasterDelete(request: Requestmodel ):  Observable<Responsemodel> {
   return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/FleetGroupMasterDelete', request, this.httpOptions);
  }

  chkDesGroup(request: Requestmodel ): Observable<Responsemodel> {
   return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/chkDesGroup', request, this.httpOptions);
  }
  
  

  fleetGroupmasterDetails(fleetgroupmastermodel: Fleetgroupmastermodel) { 
   this.selectedFleetgroupmastermodel = fleetgroupmastermodel;   
  }

  getFinsaccountsDetails() {
   return this.selectedFleetgroupmastermodel;
  }
}
