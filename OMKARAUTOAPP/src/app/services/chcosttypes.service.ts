import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ChcosttypesModel } from '../models/chcosttypesmodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from '../common/constants';
import { Chcosttypeslistmodel } from '../models/chcosttypeslistmodel';

@Injectable({
  providedIn: 'root'
})
export class ChCostTypesService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedChcostTypes = new ChcosttypesModel();
  constructor(private httpClient: HttpClient) { }
  setCostTypesDetails(Branch: ChcosttypesModel) {
 
      this.selectedChcostTypes = Branch;
    
  
  }
  getCostTypesDetails() {
    return this.selectedChcostTypes;
  }
  clearCostTypesDetails() {
    this.selectedChcostTypes = new ChcosttypesModel();
  }
  ChCostTypesSubmitted(user: ChcosttypesModel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChCostTypesSave', user, this.httpOptions);
  }
  getCostTypesList(filter: Filtermodel): Observable<Chcosttypeslistmodel> {
    return this.httpClient.post<Chcosttypeslistmodel>(Constants.API_ENDPOINT + 'FreightMasters/GetChCostTypesList', filter, this.httpOptions);
  }
  checkDuplicateDesc(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateCostDesc', req, this.httpOptions);
  }

  chCostTypesDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChCostTypesDelete', req, this.httpOptions);
  }

  chkCodeExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkCodeExits', request, this.httpOptions);
  }
  checkDuplicateBillType(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/CheckDuplicateBillType', req, this.httpOptions);
  }
  chkBranchNameExits(request: Requestmodel ): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FreightMasters/ChkBranchNameExits', request, this.httpOptions);
  }
}
