import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cnorcneegstmodel } from '../models/cnorcneegstmodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Cnorcneegstlistmodel } from 'src/app/models/cnorcneegstlismodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
//import { Cnorcneegstmodel } from '../models/cnorcneegstmodel';
import { Drivermasterlistrequestmodel } from '../models/drivermasterlistrequestmodel.model';

@Injectable({
  providedIn: 'root'
})
export class CnorCneeGstService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedCnorCneeGst = new Cnorcneegstmodel();
  
  constructor(private httpClient: HttpClient) { }

  setCnorcneeGstModelDetails(driverMaster: Cnorcneegstmodel) {
      this.selectedCnorCneeGst = driverMaster;
  }
  getCnorcneeGstModelDetails() {
    return this.selectedCnorCneeGst;
  }
  clearCnorcneeMasterModelDetails() {
    this.selectedCnorCneeGst = new Cnorcneegstmodel();
  }
  
  cnorcneeGstModelSubmitted(user: Cnorcneegstmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/CnorCneeGstSave', user, this.httpOptions);
  }
  getCnorCneeDtlList(req: Requestmodel): Observable<Cnorcneegstmodel> {
    return this.httpClient.post<Cnorcneegstmodel>(Constants.API_ENDPOINT + 'FinanceMasters/getCnorCneeDtlList', req, this.httpOptions);
  }
  getCnorCneeGstList(filter: Filtermodel): Observable<Cnorcneegstlistmodel> {
    return this.httpClient.post<Cnorcneegstlistmodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetCnorCneeGstList', filter, this.httpOptions);
  }

  cnorCneeGstDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/CnorCneeGstDelete', req, this.httpOptions);
  }
}
