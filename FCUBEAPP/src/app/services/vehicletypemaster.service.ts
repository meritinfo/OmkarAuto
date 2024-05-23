import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Vehicletypemastermodel } from '../models/vehicletypemastermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';

import { Constants } from '../common/constants';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehicletypemasterlistmodel } from '../models/vehicletypemasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedVehicleTypeMaster = new Vehicletypemastermodel();
  constructor(private httpClient: HttpClient) { }
  setVehicleTypeMasterDetails(ratetypes: Vehicletypemastermodel) {
 
      this.selectedVehicleTypeMaster = ratetypes;
    
  
  }
  getvehicletypemasterDetails() {
    return this.selectedVehicleTypeMaster;
  }
  clearVehicleTypemasterDetails() {
    this.selectedVehicleTypeMaster= new Vehicletypemastermodel();
  }
  vehicletypemasterDetailsSubmitted(user: Vehicletypemastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleTypeMasterSave', user, this.httpOptions);
  }
  vehicleTypeMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleTypeMasterDelete', req, this.httpOptions);
  }
  getVehicleTypeMasterList(filter: Filtermodel): Observable<Vehicletypemasterlistmodel> {
    return this.httpClient.post<Vehicletypemasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicleTypeMasterList', filter, this.httpOptions);
  }
}
