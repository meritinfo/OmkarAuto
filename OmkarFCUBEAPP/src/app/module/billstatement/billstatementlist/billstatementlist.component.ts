import { Component,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Billstatementlistmodel } from 'src/app/models/billstatementlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { billstatementmodel } from 'src/app/models/billstatementmodel';
import { BillstatementService } from 'src/app/services/billstatement.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-billstatementlist',
  templateUrl: './billstatementlist.component.html',
  styleUrls: ['./billstatementlist.component.css']
})
export class BillstatementlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allBillStatement: Billstatementlistmodel = new Billstatementlistmodel();
  filter: Pagerequestwithdatesmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'vendor',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    strRequest: ''
  }
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  formFilter!: FormGroup;
  keywordLocation = 'dataName'; 
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  constructor(private billStatementService: BillstatementService, 
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService, private route: Router) {
  }
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Bill Entry (MAIN)"));
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
    today.setMonth(month - 1);
    this.fromDate = today.toLocaleDateString('en-CA').toString();

    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();

    this.billStatementService.clearBillStatementDetails();
    this.formFilter = this.formBuilder.group({
      bill_StmtNo: new FormControl(''),
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),
    });     

    this.sharedService.loading=true;     
    this.filter.search = '';
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.billstateList();
    this.sharedService.loading=false;
  }

  billstateList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching:false,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.billStatementService.getBillStatementList(this.filter)
          .subscribe(resp => {
            this.allBillStatement = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [ 
        {
          title: 'Bill Station ',
          data: 'fPlace',
        },
        {
          title: 'Series Code ',
          data: 'seriesCode',
        },
        {
          title: 'Bill Stmt No ',
          data: 'bill_StmtNo',
        },
        {
          title: 'Bill Date ',
          data: 'billDate'
        },
        {
          title: 'Total Bill Amt ',
          data: 'totalBillAmt'
        },
        {
          title: 'Action',
          data: 'masterId',
        },  
      ],
    };
  }

  billStatementAdd(): void {
    this.route.navigate(['/billstatementadd']);
  }
  
  //Open user details screen
  getBillStatementDetails(Docrenewal: billstatementmodel): void {
    this.billStatementService.setBillStatementDetails(Docrenewal);
    this.route.navigate(['/billstatementedit']);
  }

  
  search(): void {
    this.filter.search = this.formFilter.value.bill_StmtNo;
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.sharedService.loading=true;
    this.billstateList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}