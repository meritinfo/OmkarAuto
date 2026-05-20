import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrokeradvancepmtModel } from '../models/brokeradvancepmtmodel';
import { Brokeradvancepmtlistmodel} from '../models/brokeradvancemodellist';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
import { Drivermasterlistrequestmodel } from '../models/drivermasterlistrequestmodel.model';
import { Reportmodel } from '../models/reportmodel';

@Injectable({
  providedIn: 'root'
})
export class BrokerAdvancePmtService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedbrokerAdvancePmt = new BrokeradvancepmtModel();
  
  constructor(private httpClient: HttpClient) { }

  setBrokerAdvanceDetails(driverMaster: BrokeradvancepmtModel) {
      this.selectedbrokerAdvancePmt = driverMaster;
  }
  getBrokerAdvanceDetails() {
    return this.selectedbrokerAdvancePmt;
  }
  clearBrokerAdvanceDetails() {
    this.selectedbrokerAdvancePmt = new BrokeradvancepmtModel();
  }
  
  brokerAdvanceDetailsSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/BrokerAdvancePmtSave', user, this.httpOptions);
  }
  getBrokerAdvanceList(filter: Reportmodel): Observable<Brokeradvancepmtlistmodel> {
    return this.httpClient.post<Brokeradvancepmtlistmodel>(Constants.API_ENDPOINT + 'Consignment/GetBrokerAdvancePmtList', filter, this.httpOptions);
  }
  chkDriverDupli(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetMasters/ChkDriverDuplicate', req, this.httpOptions);
  }
   getPmtNo(req: Requestmodel): Observable<Responsemodel> {
      return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/GetPmtNo', req, this.httpOptions);
    }
 

  brokerAdvanceDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'Consignment/BrokerAdvancePmtDelete', req, this.httpOptions);
  }
}
