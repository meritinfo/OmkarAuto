import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

import { VehicleadvbalreceiptModelLLP } from '../models/vehicleadvreceiptmodelllp';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { VehicleadvbalreceiptlistModelLLP } from '../models/vehicleadvbalreceiptlistmodelllp';

@Injectable({
  providedIn: 'root'
})
export class VehicleadvbalreceiptServiceLLP {

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


  selectedVehicleadvbalreceipt = new VehicleadvbalreceiptModelLLP();
  constructor(private httpClient: HttpClient) { }


  setVehicleAdvBalreceiptDetails(tyremaster:VehicleadvbalreceiptModelLLP) {
      this.selectedVehicleadvbalreceipt = tyremaster;      
  }

  getVehiclerepmaintMasterDetails() {
    return this.selectedVehicleadvbalreceipt;
  }
  clearVehicleadvbalreceiptModelDetails() {
    this.selectedVehicleadvbalreceipt = new VehicleadvbalreceiptModelLLP();
  }
  VehicleadvbalreceiptModelDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VehicleAdvBalReceiptMstDeleteLLP', req, this.httpOptions);
  }
  getVehicleadvbalreceiptInnerGridList(request: Requestmodel): Observable<VehicleadvbalreceiptModelLLP> {
    return this.httpClient.post<VehicleadvbalreceiptModelLLP>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleAdvBalReceiptMstInnerGridListLLP', request, this.httpOptions);
  }
  getVehicleAdvBalTripDetails(request: Requestmodel): Observable<VehicleadvbalreceiptModelLLP> {
    return this.httpClient.post<VehicleadvbalreceiptModelLLP>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleAdvBalTripDetailsLLP', request, this.httpOptions);
  }
  VehicleadvbalreceiptSubmitted(Vehicleadv: VehicleadvbalreceiptModelLLP): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/VehicleAdvBalReceiptMstSaveLLP', Vehicleadv, this.httpOptions);
  }
  getVehicleadvbalreceiptMasterList(filter: Filtermodel): Observable<VehicleadvbalreceiptlistModelLLP> {
    return this.httpClient.post<VehicleadvbalreceiptlistModelLLP>(Constants.API_ENDPOINT + 'FleetTrans/GetVehicleAdvBalReceiptMstListLLP', filter, this.httpOptions);
  }  
}
