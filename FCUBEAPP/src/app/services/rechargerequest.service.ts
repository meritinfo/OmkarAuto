import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../common/constants';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Rechargerequestlist } from 'src/app/models/rechargerequestlist';
import { Rechargerequestmodel } from 'src/app/models/rechargerequestmodel';
import { Filtermodel } from '../models/filtermodel';


@Injectable({
  providedIn: 'root'
})
export class RechargerequestService {

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
      })
    }

  httpformOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  

  constructor(private httpClient: HttpClient) { }

  rechargerequestlist = new Rechargerequestlist();
  selectRechargerequestmodel = new Rechargerequestmodel();

  
  clearRechargeRequestDetails() {
    this.selectRechargerequestmodel = new Rechargerequestmodel();
  }

  getRechargeRequestDetails(rechargerequestmodel:Rechargerequestmodel) {
      this.selectRechargerequestmodel = rechargerequestmodel;
  }
  
  setRechargeRequestDetails() {
    return this.selectRechargerequestmodel;
  }

  getFleetCardList(): Observable<Dropdownmodel[]> {
      return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetMasters/GetFleetCardList', null, this.httpOptions);
  }

  rechargeRequestSave(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/RechargeRequestSave', user, this.httpformOptions);
  }


  getRechargeRequestList(filter: Filtermodel): Observable<Rechargerequestlist> {
    return this.httpClient.post<Rechargerequestlist>(Constants.API_ENDPOINT + 'FleetMasters/GetRechargeRequestList', filter, this.httpOptions);
  }

 
  getRechargeRequestApproveList(request: Reportmodel): Observable<Rechargerequestlist> {
    return this.httpClient.post<Rechargerequestlist>(Constants.API_ENDPOINT + 'FleetMasters/GetRechargeRequestApproveList', request, this.httpOptions);
  }

  rechargeRequestAppSave(user: Rechargerequestlist): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/RechargeRequestApproveSave', user, this.httpOptions);
  }

  RechargeRequestDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/RechargeRequestDelete', req, this.httpOptions);
  }
}
