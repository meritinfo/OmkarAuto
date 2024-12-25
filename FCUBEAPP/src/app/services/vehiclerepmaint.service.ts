import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { VehiclerepmaintMaster } from '../models/vehiclerepmaintmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Vehiclerepmaintlistmodel } from '../models/vehiclerepmaintlistmodel';

@Injectable({
  providedIn: 'root'
})
export class VehiclerepmaintMasterService {

  httpOptions = {
    headers: new HttpHeaders({
       'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  httpformOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }


  selectedVehiclerepmaintMaster = new VehiclerepmaintMaster();
  constructor(private httpClient: HttpClient) { }


  setVehiclerepmaintDetails(tyremaster:VehiclerepmaintMaster) {
      this.selectedVehiclerepmaintMaster = tyremaster;      
  }

  getVehiclerepmaintMasterDetails() {
    return this.selectedVehiclerepmaintMaster;
  }
  clearVehiclerepmaintMasterDetails() {
    this.selectedVehiclerepmaintMaster = new VehiclerepmaintMaster();
  }
  vehiclerepmaintMasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VehicleRepMaintMasterDelete', req, this.httpOptions);
  }
  chkSparesNoDuplicate(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ChkTyreNoDuplicate', req, this.httpOptions);
  }
  getVehiclerepmaintMasterInnerGridList(request: Requestmodel): Observable<VehiclerepmaintMaster> {
    return this.httpClient.post<VehiclerepmaintMaster>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleRepMaintMasterInnerGridList', request, this.httpOptions);
  }
  vehiclerepmaintMasterSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VehicleRepMaintMasterSave', user, this.httpformOptions);
  }
  getVehiclerepmaintMasterList(filter: Filtermodel): Observable<Vehiclerepmaintlistmodel> {
    return this.httpClient.post<Vehiclerepmaintlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleRepMaintMasterList', filter, this.httpOptions);
  }  
  getSpareStockAvailable(user: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/GetSpareStockAvailable', user, this.httpformOptions);
  }
}
