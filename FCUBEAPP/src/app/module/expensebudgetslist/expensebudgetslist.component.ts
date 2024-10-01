import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Expensebudgetlistmodel  } from 'src/app/models/expensebudgetlistmodel';
import { Expensebudgetmodel } from 'src/app/models/expensebudgetmodel';
import { ExpenseBudgetService } from 'src/app/services/expensebudgets.service';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
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
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  year: string = '';

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

  constructor(private expenseBudgetService: ExpenseBudgetService,private commonService: CommonService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
    private route: Router) {
    }

      ngOnInit(): void {
        var menuData = sessionStorage.getItem('menulist')?.toString();
        if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
          var privilegeData = JSON.parse(menuData);
          var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
          var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
            .find(((aa: { menuName: string; }) => aa.menuName === "Define Expenses Budgets"));
          if (privilegeStatus) {
            this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
            this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
            this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
            this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
          }
        }
        var yearIDData = sessionStorage.getItem('yearID')?.toString();
        if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
          this.year = yearIDData;
        }
        var loginDate = sessionStorage.getItem('loginDate')?.toString();
        if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
          this.loginDate = loginDate;
        }
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        today.setMonth(month - 12);
        
        this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
        this.maxDate = new Date().toLocaleDateString('en-CA').toString();
        
        if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
          this.fromDate = this.minDate ;
        }
        else{
          this.fromDate = today.toLocaleDateString('en-CA').toString();
        }   
    
        this.expenseBudgetService.clearExpensebudgetDetails();
        this.formFilter = this.formBuilder.group({
          fromDate: new FormControl(this.fromDate),
          toDate: new FormControl(this.loginDate),
        });     
    
        this.sharedService.loading=true;   
       // this.filter.fromDate = this.fromDate;
       // this.filter.toDate = this.loginDate;
        this.expBudgetList();
        this.sharedService.loading=false;
      }
      
      expBudgetList() {
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 50,
          serverSide: true,
          processing: true,
          searching :false,
          ajax: (dataTablesParameters: any, callback) => {
            // Filter setting
            this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
            this.filter.pageSize = dataTablesParameters.length;
            this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
            this.filter.sortOrder = dataTablesParameters.order[0].dir;
            this.filter.search = dataTablesParameters.search.value;
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
            this.expenseBudgetService.getExpensebudgetList(this.filter).subscribe(resp => {
              this.allExpensebudgets = resp;
                callback({
                  recordsTotal: resp.pageMetaData.totalCount,
                  recordsFiltered: resp.pageMetaData.totalCount,
                  data: []
                });
              });
          },
          columns: [   
            {
              title: 'Branch Code',
              data: 'branchCode',
            },
           
            {
              title: 'Action',
              data: 'branchCode',
            },
          ],
        };
      }
    
      addExpensebudgetMaster(): void {
        this.route.navigate(['/expensebudgetsadd']);
      } 
      
      //Open user details screen
      getExpensebudgetDetails(tyre: Expensebudgetmodel): void {
        this.expenseBudgetService.setExpensebudgetDetails(tyre);
        this.route.navigate(['/expensebudgetedit']);
      }
    
      search(): void {
        var selecteddata = this.formFilter.getRawValue();
       // this.filter.fromDate = selecteddata.fromDate;
       // this.filter.toDate = selecteddata.toDate;
        this.sharedService.loading=true;
        this.expBudgetList();
        this.sharedService.loading=false;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload();
        });
      }
    }