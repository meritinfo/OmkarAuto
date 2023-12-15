import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Vehiclefltmastermodel } from '../models/vehiclefltmastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Vehiclefltmasterlistmodel } from '../models/vehiclefltmasterlistmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class VehicleFltMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
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
   
  chkVehicalNoExist(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/ChkVehicalNoExist', req, this.httpOptions);
  }

  vehicalMasterDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/VehicalMasterDetailsDelete', req, this.httpOptions);
  }

  getVehicleList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicalTypeList', null, this.httpOptions);
  }  
  getVehicleMfrList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicalMfrList', null, this.httpOptions);
  }  
  getVehicleLedgerList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicalLedgerAccountList', null, this.httpOptions);
  }  
  getVehicleAssetList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicalAssetAccountList', null, this.httpOptions);
  }  
  
  getVehiclefltMstInnerGridList(request: Requestmodel): Observable<Vehiclefltmastermodel> {
    return this.httpClient.post<Vehiclefltmastermodel>(Constants.API_ENDPOINT + 'FleetMasters/GetVehicleFltInnerGridList', request, this.httpOptions);
  }
}
