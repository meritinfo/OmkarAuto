import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Vehiclefltmastermodel } from '../models/vehiclefltmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Vehiclefltmasterlistmodel } from '../models/vehiclefltmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class VehicleFltMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }
  selectedVehicleFltMaster = new Vehiclefltmastermodel();
  constructor(private httpClient: HttpClient) { }
  setVehiclefltMasterDetails(vehiclefltmaster: Vehiclefltmastermodel) {
 
      this.selectedVehicleFltMaster = vehiclefltmaster;
    
  
  }
  getvehiclefltmasterDetails() {
    return this.selectedVehicleFltMaster;
  }
  clearVehiclefltmasterDetails() {
    this.selectedVehicleFltMaster= new Vehiclefltmastermodel();
  }
  vehicleFltmasterDetailsSubmitted(user: Vehiclefltmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleFltMasterSave', user, this.httpOptions);
  }
  getVehicleFltMasterList(filter: Filtermodel): Observable<Vehiclefltmasterlistmodel> {
    return this.httpClient.post<Vehiclefltmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicleFltMasterList', filter, this.httpOptions);
  }
}
