import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Benificiarymastermodel } from '../models/benificiarymastermodel';
import { Responsemodel } from '../models/responsemodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Reportmodel } from '../models/reportmodel';
import { Constants } from '../common/constants';
import { Benificiarymasterlistmodel } from '../models/./benificiarymasterlistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Requestmodel } from 'src/app/models/requestmodel';

@Injectable({
  providedIn: 'root'
})
export class BenificiaryMasterService {

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

  selectedBenificiaryMaster = new Benificiarymastermodel();
  constructor(private httpClient: HttpClient) { }

  setBenificiaryMasterDetails(benificiarymaster: Benificiarymastermodel) { 
      this.selectedBenificiaryMaster = benificiarymaster; 
  }

  getBenificiaryMasterDetails() {
    return this.selectedBenificiaryMaster;
  }

  clearBenificiarymasterEntryDetails() {
    this.selectedBenificiaryMaster = new Benificiarymastermodel();
  }

  chkDocrenewalValidity(user: Benificiarymastermodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FleetTrans/ChkDocrenewalValidity', user, this.httpOptions);
  }

  benificiarymasterDetailsSubmitted(user: FormData): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/BeneficiaryMasterSave', user, this.httpformOptions);
  }

  getBenificiaryMasterList(filter: Reportmodel): Observable<Benificiarymasterlistmodel> {
    return this.httpClient.post<Benificiarymasterlistmodel>(Constants.API_ENDPOINT + 'FinanceMasters/GetBeneficiaryMasterList', filter, this.httpOptions);
  }

  BenificiaryMasterDelete(request: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/BeneficiaryMasterDelete', request, this.httpOptions);
  }

//   getDocRenewalList(): Observable<Dropdownmodel[]> {
//     return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FinanceMaster/GetDocRenewalList', null, this.httpOptions);
//   }

//   getPaymentCreditAcList(request: Requestmodel): Observable<Dropdownmodel[]> {
//     return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'FleetTrans/GetPaymentCreditAcList', request, this.httpOptions);
//   }
}
