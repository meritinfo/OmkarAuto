import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drivermodel } from '../models/drivermodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Fleetloadentrylistmodel } from '../models/fleetloadentrylistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
import { Fleetloadentrymodel } from '../models/fleetloadentrymodel';
import { Drivermasterlistrequestmodel } from '../models/drivermasterlistrequestmodel.model';

@Injectable({
  providedIn: 'root'
})
export class FleetLoadEntryService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedFleetLoadEntry = new Fleetloadentrymodel();
  
  constructor(private httpClient: HttpClient) { }

  setFleetLoadEntryDetails(driverMaster: Fleetloadentrymodel) {
      this.selectedFleetLoadEntry = driverMaster;
  }
  getFleetLoadEntryDetails() {
    return this.selectedFleetLoadEntry;
  }
  clearFleetLoadEntryDetails() {
    this.selectedFleetLoadEntry = new Fleetloadentrymodel();
  }
  
  fleetLoadEntrySubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/FleetLoadEntrySave', user, this.httpOptions);
  }
  getFleetLoadEntryList(filter: Filtermodel): Observable<Fleetloadentrylistmodel> {
    return this.httpClient.post<Fleetloadentrylistmodel>(Constants.API_ENDPOINT + 'FleetTrans/FleetLoadEntryList', filter, this.httpOptions);
  }

  fleetLoadEntryDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/FleetLoadEntryDelete', req, this.httpOptions);
  }
}
