
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Brandmastermodel } from '../models/brandmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Vehicleflttypemstlist  } from '../models/vehicleflttypemstlist';
import { Vehicleflttypemstmodel } from "../models/vehicleflttypemstmodel";

@Injectable({
  providedIn: 'root'
})
export class VehicleFltTypeMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedFltTypemaster = new Vehicleflttypemstmodel();
  constructor(private httpClient: HttpClient) { }
  setVehicleFltTypeMasterDetails(brandmaster: Vehicleflttypemstmodel) {
 
      this.selectedFltTypemaster = brandmaster;
    
  
  }
  getVehicleFltTypeMasterDetails() {
    return this.selectedFltTypemaster;
  }
  vehicleFltMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleFltTypeGroupDelete', req, this.httpOptions);
  }
  clearFltTypeMasterDetails() {
    this.selectedFltTypemaster = new Vehicleflttypemstmodel();
  }
  fltTypeMasterDetailsSubmitted(user: Vehicleflttypemstmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleFltTypeMstSave', user, this.httpOptions);
  }
  checkDuplicateName(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/CheckDuplicateVehTypeName', req, this.httpOptions);
  }
    checkDuplicateCode(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/CheckDuplicateVehTypeCode', req, this.httpOptions);
  }
  getVehicleTypeFltMasterList(filter: Filtermodel): Observable<Vehicleflttypemstlist> {
    return this.httpClient.post<Vehicleflttypemstlist>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicleFltGroupMstList', filter, this.httpOptions);
  }
}
