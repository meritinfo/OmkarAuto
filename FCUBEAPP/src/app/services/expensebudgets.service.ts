import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Drivermodel } from '../models/drivermodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Expensebudgetlistmodel } from '../models/expensebudgetlistmodel';
import { Responsemodel } from '../models/responsemodel';
import { Requestmodel } from '../models/requestmodel';
import { Constants } from '../common/constants';
import { Observable } from 'rxjs';
import { Expensebudgetmodel } from '../models/expensebudgetmodel';
import { Drivermasterlistrequestmodel } from '../models/drivermasterlistrequestmodel.model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseBudgetService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')?.toString()}`
    })
  }
  selectedExpensebudget = new Expensebudgetmodel();
  
  constructor(private httpClient: HttpClient) { }

  setExpensebudgetDetails(driverMaster: Expensebudgetmodel) {
      this.selectedExpensebudget = driverMaster;
  }
  getExpensebudgetDetails() {
    return this.selectedExpensebudget;
  }
  clearExpensebudgetDetails() {
    this.selectedExpensebudget = new Expensebudgetmodel();
  }
  
  ExpensebudgetSubmitted(user: Expensebudgetmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/ExpenseBudgetsSave', user, this.httpOptions);
  }
  getExpensebudgetList(filter: Filtermodel): Observable<Expensebudgetlistmodel> {
    return this.httpClient.post<Expensebudgetlistmodel>(Constants.API_ENDPOINT + 'FinanceMasters/GeExpenseBudgetsList', filter, this.httpOptions);
  }

  cnorExpensebudgetDetailsDelete(req: Requestmodel): Observable<Responsemodel> {
    return this.httpClient.post<Responsemodel>(Constants.API_ENDPOINT + 'FinanceMasters/ExpenseBudgetsDelete', req, this.httpOptions);
  }
}
