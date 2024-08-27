import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { VehicleadvbalreceiptModel } from '../models/vehicleadvbalreceiptmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { VehicleadvbalreceiptlistModel } from '../models/vehicleadvbalreceiptlistmodel';

@Injectable({
  providedIn: 'root'
})
export class VehicleadvbalreceiptService {

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


  selectedVehicleadvbalreceipt = new VehicleadvbalreceiptModel();
  constructor(private httpClient: HttpClient) { }


  setVehicleAdvBalreceiptDetails(tyremaster:VehicleadvbalreceiptModel) {
      this.selectedVehicleadvbalreceipt = tyremaster;      
  }

  getVehiclerepmaintMasterDetails() {
    return this.selectedVehicleadvbalreceipt;
  }
  clearVehicleadvbalreceiptModelDetails() {
    this.selectedVehicleadvbalreceipt = new VehicleadvbalreceiptModel();
  }
  VehicleadvbalreceiptModelDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VehicleadvbalreceiptModelDelete', req, this.httpOptions);
  }
  chkSparesNoDuplicate(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ChkTyreNoDuplicate', req, this.httpOptions);
  }
  getVehicleadvbalreceiptInnerGridList(request: Requestmodel): Observable<VehicleadvbalreceiptModel> {
    return this.httpClient.post<VehicleadvbalreceiptModel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleAdvBalReceiptMstInnerGridList', request, this.httpOptions);
  }
  VehicleadvbalreceiptSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VehicleAdvBalReceiptMstSave', user, this.httpformOptions);
  }
  getVehicleadvbalreceiptMasterList(filter: Filtermodel): Observable<VehicleadvbalreceiptlistModel> {
    return this.httpClient.post<VehicleadvbalreceiptlistModel>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleAdvBalReceiptMstList', filter, this.httpOptions);
  }  
}
