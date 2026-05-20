import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdditionalcostrecmasterModel } from '../models/additionalcostrecmastermodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Additionalcostrecmasterlistmodel } from 'src/app/models/additionalcostrecmasterlist';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
//import { Cnorcneegstmodel } from '../models/cnorcneegstmodel';
import { Drivermasterlistrequestmodel } from '../models/drivermasterlistrequestmodel.model';

@Injectable({
  providedIn: 'root'
})
export class AdditionalcostrecService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedAdditionalcostrecmaster = new AdditionalcostrecmasterModel();
  
  constructor(private httpClient: HttpClient) { }

  setAdditionalcostrecmasterDetails(driverMaster: AdditionalcostrecmasterModel) {
      this.selectedAdditionalcostrecmaster = driverMaster;
  }
  getAdditionalcostrecmasterModelDetails() {
    return this.selectedAdditionalcostrecmaster;
  }
  clearAdditionalcostrecmasterDetails() {
    this.selectedAdditionalcostrecmaster = new AdditionalcostrecmasterModel();
  }
  
  additionalcostrecmasterSubmitted(user: AdditionalcostrecmasterModel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/AdditionalCostRecMasterSave', user, this.httpOptions);
  }
  getadditionalcostrecmasterList(filter: Filtermodel): Observable<Additionalcostrecmasterlistmodel> {
    return this.httpClient.post<Additionalcostrecmasterlistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAdditionalCostRecMasterList', filter, this.httpOptions);
  }
  checkDuplicateAddCostCode(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateAddCostCode', req, this.httpOptions);
  }
  checkDuplicateAddCostDescription(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateAddCostDescription', req, this.httpOptions);
  }

  additionalcostrecmasterDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/GetAdditionalCostRecDelete', req, this.httpOptions);
  }
}
