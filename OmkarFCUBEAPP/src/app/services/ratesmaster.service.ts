import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ratesmastermodel } from '../models/ratesmastermodel';
import { Distancemasterfreightlistmodel } from '../models/distancemasterfreightlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Ratesmasterlistmodel } from '../models/ratesmasterlistmodel';

@Injectable({
  providedIn: 'root'
})
export class RatesMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selectedRatesMasterDetails = new Ratesmastermodel();
  constructor(private httpClient: HttpClient) { }

  setRatesMasterDetails(ratesmastermodel: Ratesmastermodel) {
    this.selectedRatesMasterDetails = ratesmastermodel;
  }
  getRatesMasterDetails() {
    return this.selectedRatesMasterDetails;
  }
  ratesMasterSubmitted(ratesMaster: Ratesmastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/FreightRatesMstSave', ratesMaster, this.httpOptions);
  }
  clearRatesMasterDetails() {
    this.selectedRatesMasterDetails = new Ratesmastermodel();
  }
  getRatesMasterList(filter: Filtermodel): Observable<Ratesmasterlistmodel> {
    return this.httpClient.post<Ratesmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetFreightRatesList', filter, this.httpOptions);
  }
}
