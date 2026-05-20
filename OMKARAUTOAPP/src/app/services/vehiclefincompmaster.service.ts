import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Vehiclefincompmastermodel } from '../models/vehiclefincompmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Vehiclefincompmasterlist } from '../models/vehiclefincompmasterlist';

@Injectable({
  providedIn: 'root'
})
export class VehiclefincompmasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
   constructor(private httpClient: HttpClient) { }

     selectedVehiclefincompmastermodel = new Vehiclefincompmastermodel();

    clearVehicleFinCompMaster() {
      this.selectedVehiclefincompmastermodel = new Vehiclefincompmastermodel();
    }

  getVehicleFinCompMasterList(filter: Filtermodel): Observable<Vehiclefincompmasterlist> {
    return this.httpClient.post<Vehiclefincompmasterlist>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicleFinCompMasterList', filter, this.httpOptions);
  }
  submitVehicleFinCompMasterForm(user: Vehiclefincompmastermodel): Observable<Responsemodel> {
     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleFinCompMasterSave', user, this.httpOptions);
  }

  vehicleFinCompMasterDelete(request: Requestmodel ):  Observable<Responsemodel> {
   return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleFinCompMasterDelete', request, this.httpOptions);
  }

  vehicleFinCompMasterChkActName(request: Requestmodel ): Observable<Responsemodel> {
   return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleFinCompMasterChkActName', request, this.httpOptions);
  }
  

  vehicleFinCompMasteDetails(vehiclefincompmastermodel: Vehiclefincompmastermodel) { 
   this.selectedVehiclefincompmastermodel = vehiclefincompmastermodel;   
  }

  getvehicleFinCompMasteDetails() {
   return this.selectedVehiclefincompmastermodel;
  }
}

