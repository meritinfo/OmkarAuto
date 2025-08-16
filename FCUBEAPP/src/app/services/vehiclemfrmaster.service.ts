import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {Vehiclemfrmastermodel } from '../models/vehiclemfrmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Vehiclefincompmasterlist } from '../models/vehiclefincompmasterlist';

import { Vehiclemfrmasterlist } from '../models/vehiclemfrmasterlist';

@Injectable({
  providedIn: 'root'
})
export class VehiclemfrmasterService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
   constructor(private httpClient: HttpClient) { }

     selectedVehicleMfrMasterModel = new Vehiclemfrmastermodel();

    clearVehicleMfrMaster() {
    this.selectedVehicleMfrMasterModel = new Vehiclemfrmastermodel();
    }

     getVehicleMfrMasterList(filter: Filtermodel): Observable<Vehiclemfrmasterlist> {
      return this.httpClient.post<Vehiclemfrmasterlist>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicleMfrMasterList', filter, this.httpOptions);
    }
    submitVehicleMfrMasterForm(user: Vehiclemfrmastermodel): Observable<Responsemodel> {
     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleMfrMasterSave', user, this.httpOptions);
    }

  vehicleMfrMasterDelete(request: Requestmodel ):  Observable<Responsemodel> {
   return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleMfrMasterDelete', request, this.httpOptions);
  }

  vehicleMfrMasterChkActName(request: Requestmodel ): Observable<Responsemodel> {
   return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicleMfrMasterChkActName', request, this.httpOptions);
  }
  

 vehicleMfrMasterDetails(vehiclefincompmastermodel: Vehiclemfrmastermodel) { 
   this.selectedVehicleMfrMasterModel = vehiclefincompmastermodel;   
  }

  getVehicleMfrMasterDetails() {
   return this.selectedVehicleMfrMasterModel;
  }
}


