import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drivermodel } from '../models/drivermodel';
import { Responsemodel } from '../models/responsemodel';
import { Constants } from '../common/constants';
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
}
