import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drivermodel } from '../models/drivermodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Cnorcneemasterlistmodel } from '../models/cnorcneemasterlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
import { Cnorcneemastermodel } from '../models/cnorcneemastermodel';
import { Drivermasterlistrequestmodel } from '../models/drivermasterlistrequestmodel.model';

@Injectable({
  providedIn: 'root'
})
export class CnorCneeMasterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedCnorCneeMaster = new Cnorcneemastermodel();
  
  constructor(private httpClient: HttpClient) { }

  setCnorcneeMasterModelDetails(driverMaster: Cnorcneemastermodel) {
      this.selectedCnorCneeMaster = driverMaster;
  }
  getCnorcneeMasterModelDetails() {
    return this.selectedCnorCneeMaster;
  }
  clearCnorcneeMasterModelDetails() {
    this.selectedCnorCneeMaster = new Cnorcneemastermodel();
  }
  
  cnorcneeMasterModelSubmitted(user: Cnorcneemastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ConsigneeMasterSave', user, this.httpOptions);
  }
  getCnorCneeMasterList(filter: Filtermodel): Observable<Cnorcneemasterlistmodel> {
    return this.httpClient.post<Cnorcneemasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetConsigneeCnorList', filter, this.httpOptions);
  }

  cnorCneeMasterDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ConsigneeCnorMasterDelete', req, this.httpOptions);
  }
}
