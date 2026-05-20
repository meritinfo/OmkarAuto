import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehicleinstschedulemodel } from '../models/vehicleinstschedulemodel';
import { Vehicleinstschedulelistmodel } from '../models/vehicleinstschedulelistmodel';

@Injectable({
  providedIn: 'root'
})
export class VehicleinstscheduleService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedVehicleinstschedulemst = new Vehicleinstschedulemodel();
  constructor(private httpClient: HttpClient) { }

  setVehicleinstschedulemstDetails(ratetypes: Vehicleinstschedulemodel) { 
    this.selectedVehicleinstschedulemst = ratetypes;      
  }
  getvehicletypemasterDetails() {
    return this.selectedVehicleinstschedulemst;
  }
  clearVehicleTypemasterDetails() {
    this.selectedVehicleinstschedulemst= new Vehicleinstschedulemodel();
  }
  vehicleinstschedulemstSubmitted(user: Vehicleinstschedulemodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VehicleInstScheduleMstSave', user, this.httpOptions);
  } 
  vehicleinstschedulemstDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VehicleInstScheduleDelete', req, this.httpOptions);
  }
  getVehicleinstschedulemstList(filter: Filtermodel): Observable<Vehicleinstschedulelistmodel> {
    return this.httpClient.post<Vehicleinstschedulelistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleInstScheduleList', filter, this.httpOptions);
  }
  getVehicleinstscheduleInnerGrid(user: Requestmodel): Observable<Vehicleinstschedulemodel> {
    return this.httpClient.post<Vehicleinstschedulemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleInstScheduleInnerGridList', user, this.httpOptions);
  } 
}
