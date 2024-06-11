import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Reportmodel } from '../models/reportmodel';
import { Responsemodel } from '../models/responsemodel';
import { Deliveryackpodmodel } from '../models/deliveryackpodmodel';
import { Deliveryackpodlistmodel } from '../models/deliveryackpodlistmodel';
import { Requestmodel } from '../models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class DeliveryackpodService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedDeliveryackpod = new Deliveryackpodmodel();

  constructor(private httpClient: HttpClient) { }

  setDeliveryackpodDetails(deliveryackpod: Deliveryackpodmodel) { 
    this.selectedDeliveryackpod = deliveryackpod; 
  }

  clearDeliveryackpodDetails() {
    this.selectedDeliveryackpod= new Deliveryackpodmodel();
  }

  getDeliveryackpodDetails() {
    return this.selectedDeliveryackpod;
  }
  
  getDeliveryackpodList(filter: Reportmodel): Observable<Deliveryackpodlistmodel> {
    return this.httpClient.post<Deliveryackpodlistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDeliveryAckPodList', filter, this.httpOptions);
  }

  deliveryackpodDetailsSave(request: Deliveryackpodmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DeliveryAckPodSave', request, this.httpOptions);
  }

  deliveryackpodDelete(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/DeliveryAckPodDelete', request, this.httpOptions);
  }

  getConsignmentDetails(request: Requestmodel):Observable<Deliveryackpodmodel> {
    return this.httpClient.post<Deliveryackpodmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetDeliveryCnDetails', request, this.httpOptions);
  }
}
