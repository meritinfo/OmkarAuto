import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Vehicletypegroupmastermodel } from '../models/vehicletypegroupmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Vehicletypegroupmasterlistmodel } from '../models/vehicletypegroupmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeGroupMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`
    })
  }
  selectedVehicletypegroupmaster = new Vehicletypegroupmastermodel();
  constructor(private httpClient: HttpClient) { }
  setVehicleTypeGroupMasterDetails(vehicletypegroupmaster: Vehicletypegroupmastermodel) {
 
      this.selectedVehicletypegroupmaster = vehicletypegroupmaster;
    
  
  }
  getVehicleTypeGroupMasterDetails() {
    return this.selectedVehicletypegroupmaster;
  }
  clearVehicleTypeGroupMasterDetails() {
    this.selectedVehicletypegroupmaster = new Vehicletypegroupmastermodel();
  }
  vehicletypegroupmasterSubmitted(user: Vehicletypegroupmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleTypeGroupMasterSave', user, this.httpOptions);
  }
  getVehicleTypeGroupmasterList(filter: Filtermodel): Observable<Vehicletypegroupmasterlistmodel> {
    return this.httpClient.post<Vehicletypegroupmasterlistmodel>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicleTypeGroupMasterList', filter, this.httpOptions);
  }
}
