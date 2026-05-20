import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { TripenrouteexpbycompanyModel } from '../models/tripenroutebycompanymodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Tripenroutebycompanylistmodel } from '../models/tripenroutebycompanylistmodel';

@Injectable({
  providedIn: 'root'
})
export class TripenroutebycompanyService {

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


  selectedTripenrouteexpbycompanyMaster = new TripenrouteexpbycompanyModel();
  constructor(private httpClient: HttpClient) { }


  setTripenrouteexpbycompanyDetails(tyremaster:TripenrouteexpbycompanyModel) {
      this.selectedTripenrouteexpbycompanyMaster = tyremaster;      
  }

  getTripenrouteexpbycompanyDetails() {
    return this.selectedTripenrouteexpbycompanyMaster;
  }
  clearTripenrouteexpbycompanyDetails() {
    this.selectedTripenrouteexpbycompanyMaster = new TripenrouteexpbycompanyModel();
  }
  TripenrouteexpbycompanyDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripEnrouteExpByCompanyDelete', req, this.httpOptions);
  }
//   chkSparesNoDuplicate(req: Requestmodel): Observable<Responsemodel> {
//     return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ChkTyreNoDuplicate', req, this.httpOptions);
//   }
 
  tripenrouteexpbycompanySubmitted(user: TripenrouteexpbycompanyModel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/TripEnrouteExpByCompanySave', user, this.httpformOptions);
  }
  gettripenrouteexpbycompanyList(filter: Filtermodel): Observable<Tripenroutebycompanylistmodel> {
    return this.httpClient.post<Tripenroutebycompanylistmodel>(Constants.API_ENDPOINT + 'FleetTrans/GetTripEnrouteExpByCompanyList', filter, this.httpOptions);
  }  
}
