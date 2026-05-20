import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Dovehicleinmodel } from '../models/dovehicleinmodel';
import { Dovehicleinlistmodel } from '../models/dovehicleinlistmodel';
import { Dovehiplacedmodel } from '../models/dovehiplacedmodel';

@Injectable({
  providedIn: 'root'
})
export class DovehicleinService {
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }

  selecteddoVehi = new Dovehicleinmodel();

  constructor(private httpClient: HttpClient) { }
  
  setDoVehicleInDetails(dpr: Dovehicleinmodel) { 
      this.selecteddoVehi = dpr;   
  }

  getDoVehicleInDetails() {
    return this.selecteddoVehi;
  }

  clearDoVehicleInDetails() {
    this.selecteddoVehi = new Dovehicleinmodel();
  }
  
  getDoVehicleInList(filter: Reportmodel): Observable<Dovehicleinlistmodel> {
    return this.httpClient.post<Dovehicleinlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetDoVehicleInList', filter, this.httpOptions);
  } 
  
  getDoVehiPlacedDetails(filter: Requestmodel): Observable<Dovehicleinmodel> {
    return this.httpClient.post<Dovehicleinmodel>(Constants.API_ENDPOINT + 'Consignment/GetDoVehiPlacedDetails', filter, this.httpOptions);
  } 
  getDoVehiDetailsApi(filter: Requestmodel): Observable<Dovehicleinmodel> {
    return this.httpClient.post<Dovehicleinmodel>(Constants.API_ENDPOINT + 'Consignment/GetDoVehiDetailsApi', filter, this.httpOptions);
  } 
  doVehicleInSubmitted(dos: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DoVehicleInSave', dos, this.httpOptions);
  }
  
  doVehicleInDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/DoVehicleInDelete', req, this.httpOptions);
  }  
}


