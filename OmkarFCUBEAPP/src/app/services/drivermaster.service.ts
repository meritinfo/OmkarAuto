import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drivermodel } from '../models/drivermodel';
import { Drivermasterlistmodel } from '../models/drivermasterlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Constants } from '../common/constants';
import { Filtermodel } from '../models/filtermodel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrivermasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDriverMaster = new Drivermodel();
  constructor(private httpClient: HttpClient) { }
  setDriverMasterDetails(driverMaster: Drivermodel) {
      this.selectedDriverMaster = driverMaster;
  }
  getDriverMasterDetails() {
    return this.selectedDriverMaster;
  }
  clearDriverMasterDetails() {
    this.selectedDriverMaster = new Drivermodel();
  }
  driverMasterDetailsSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/DriverMasterSave', user, this.httpOptions);
  }
  getDriverMasterList(filter: Filtermodel): Observable<Drivermasterlistmodel> {
    return this.httpClient.post<Drivermasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetDriverMasterList', filter, this.httpOptions);
  }

  driverMasterDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/DriverMasterDetailsDelete', req, this.httpOptions);
  }
}
