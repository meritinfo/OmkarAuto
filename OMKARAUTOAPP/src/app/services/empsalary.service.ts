import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Observable } from 'rxjs';
import { Filtermodel } from '../models/filtermodel';
import { Constants } from '../common/constants';
import { Empsalarymstmodel } from '../models/empsalarymstmodel';
import { Empsalarymstlistmodel } from '../models/empsalarymstlistmodel';
import { Dropdownmodel } from '../models/dropdownmodel';

@Injectable({
  providedIn: 'root'
})
export class EmpsalaryService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedEmpSalary = new Empsalarymstmodel();
  constructor(private httpClient: HttpClient) { }

  setEmpSalaryDetails(Employee: Empsalarymstmodel) { 
      this.selectedEmpSalary = Employee;   
  }
  getEmpSalaryDetails() {
    return this.selectedEmpSalary;
  }
  clearEmpSalaryDetails() {
    this.selectedEmpSalary = new Empsalarymstmodel();
  }
  
  getEmpSalaryMstList(filter: Filtermodel): Observable<Empsalarymstlistmodel> {
    return this.httpClient.post<Empsalarymstlistmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpSalaryMstList', filter, this.httpOptions);
  }   
  getEmpSalaryEarnList(req: Requestmodel): Observable<Empsalarymstmodel> {
    return this.httpClient.post<Empsalarymstmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpSalaryEarnList', req, this.httpOptions);
  } 
  getEmpSalaryDedList(req: Requestmodel): Observable<Empsalarymstmodel> {
    return this.httpClient.post<Empsalarymstmodel>(Constants.API_ENDPOINT + 'HRMaster/GetEmpSalaryDedList', req, this.httpOptions);
  } 

  empSalarySubmitted(user: Empsalarymstmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'HRMaster/EmpSalaryMasterSave', user, this.httpOptions);
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

}
