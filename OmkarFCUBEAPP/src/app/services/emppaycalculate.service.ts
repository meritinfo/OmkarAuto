import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Emppaycalcmodel } from '../models/emppaycalcmodel';
import { Empsalarymstmodel } from '../models/empsalarymstmodel';
import { Emppaycallistmodel } from '../models/emppaycallistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';
import { Empleavemodel } from 'src/app/models/empleavemodel';

@Injectable({
  providedIn: 'root'
})
export class EmppaycalculateService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedEmpPay = new Emppaycalcmodel();
  constructor(private httpClient: HttpClient) { }

  setEmpPayCalDetails(Employee: Emppaycalcmodel) { 
      this.selectedEmpPay = Employee;   
  }
  getEmpPayCalDetails() {
    return this.selectedEmpPay;
  }
  clearEmpPayCalDetails() {
    this.selectedEmpPay = new Emppaycalcmodel();
  }
  
  getEmpPayCalMstList(filter: Filtermodel): Observable<Emppaycallistmodel> {
    return this.httpClient.post<Emppaycallistmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpPayCalList', filter, this.httpOptions);
  }   
  getEmpLeaveList(req:Empleavemodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpLeaveDetails', req, this.httpOptions);
  } 
  getEmpLoanList(req:Requestmodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpLoanDetails', req, this.httpOptions);
  } 
  getEmpSalaryEarnList(req: Empsalarymstmodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpSalEarnList', req, this.httpOptions);
  } 
  getEmpSalaryDedList(req: Empsalarymstmodel): Observable<Emppaycalcmodel> {
    return this.httpClient.post<Emppaycalcmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpSalDedList', req, this.httpOptions);
  } 
  empPayCalSubmitted(user: Emppaycalcmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpPayCalSave', user, this.httpOptions);
  }


  empSalaryDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpSalaryMasterDelete', req, this.httpOptions);
  } 
  getSalaryEarningList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'HRMaster/GetSalaryEarningList', null, this.httpOptions);
  } 
  getSalaryDeductionList(): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'HRMaster/GetSalaryDeductionList', null, this.httpOptions);
  } 

  getBranchEmpList(req: Requestmodel): Observable<Dropdownmodel[]> {
    return this.httpClient.post<Dropdownmodel[]>(Constants.API_ENDPOINT + 'HRMaster/GetBranchEmpList', req, this.httpOptions);
  }

}
  