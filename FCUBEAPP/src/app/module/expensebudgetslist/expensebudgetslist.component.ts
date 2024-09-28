import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Expensebudgetlistmodel  } from 'src/app/models/expensebudgetlistmodel';
import { Expensebudgetmodel } from 'src/app/models/expensebudgetmodel';
import { ExpenseBudgetService } from 'src/app/services/expensebudgets.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-expensebudgetslist',
  templateUrl: './expensebudgetslist.component.html',
  styleUrls: ['./expensebudgetslist.component.css']
})
export class ExpensebudgetslistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

    allExpensebudgets: Expensebudgetlistmodel = new Expensebudgetlistmodel();
    filter: Filtermodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'doccode',
      sortOrder: 'asc',
      search: ''
  } 
  
  formFilter!: FormGroup;

  constructor(private expenseBudgetService: ExpenseBudgetService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
    private route: Router) {


}
}
