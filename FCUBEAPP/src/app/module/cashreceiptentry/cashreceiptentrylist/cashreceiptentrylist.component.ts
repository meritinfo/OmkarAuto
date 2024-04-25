import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { bankreceiptentrylistmodel  } from 'src/app/models/bankreceiptentrylistmodel';
import { bankreceiptentrymodel } from 'src/app/models/bankreceiptentrymodel';
import { Cashbankfiltermodel } from 'src/app/models/cashbankfiltermodel';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-cashreceiptentrylist',
  templateUrl: './cashreceiptentrylist.component.html',
  styleUrls: ['./cashreceiptentrylist.component.css']
})
export class CashreceiptentrylistComponent {
  
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  allCashReceiptEntry: bankreceiptentrylistmodel = new bankreceiptentrylistmodel();
  filter: Cashbankfiltermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'docNo',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    branch:'',
    receiptOrPayment: '',
    refType:'',
  }

  formFilter!: FormGroup;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';

  constructor(private cashReceiptEntryService: CashReceiptEntryService, 
    private formBuilder: FormBuilder,  private sharedService: SharedService,
    private commonService: CommonService, 
    private route: Router) {
  }

  ngOnInit(): void {   

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Cash Receipts & Payments Voucher Entry");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
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
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
    
    this.cashReceiptEntryService.clearCashReceiptEntryDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      receiptOrPayment: new FormControl('CP',[Validators.required]),  
    });
    
    this.sharedService.loading=true;
    this.filter.receiptOrPayment = 'CP';
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.branch = this.branch;
    this.cashReceiptEntry();
    this.sharedService.loading=false;
  }

  cashReceiptEntry(){

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
          this.filter.search = '';
          this.cashReceiptEntryService.getCashReceiptEntryList(this.filter).subscribe(resp => {
             this.allCashReceiptEntry = resp;
              callback({
                recordsTotal: resp.pageMetaData.totalCount,
                recordsFiltered: resp.pageMetaData.totalCount,
                data: []
              });
            });
        },
        columns: [ 
        {
          title: 'Doc Series No ',
          data: 'seriesDoc',
        },    
        {
          title: 'Date',
          data: 'ftmDate',
        },
        {
          title: 'A/c Header',
          data: 'acHeader',
        },       
        {
          title: 'Amount',
          data: 'docAmount',
        },
        {
          title: 'Ref.Type',
          data: 'refType',
        },
        {
          title: 'Ref.No',
          data: 'refNo',
        },
        {
          title: 'On Account Of',
          data: 'accountOf',
        },
        {
          title: 'Remarks',
          data: 'narration',
        },
        {
          title: 'Action',
          data: 'ftmID',
        },
      ],
    };
  }
  
  //Open new driver master add screen
  cashreceiptentryAdd(): void {
    this.route.navigate(['/addcashreceiptentry']);
  }
  
  //Open user details screen
  getCashReceiptEntryDetails(Docrenewal: bankreceiptentrymodel): void {
    this.cashReceiptEntryService.setCashReceiptEntryDetails(Docrenewal);
    this.route.navigate(['/cashreceiptentryedit']);
  }

    
  search(): void {
    var selectedDataVal=this.formFilter.getRawValue();
    this.filter.fromDate = selectedDataVal.fromDate;
    this.filter.toDate = selectedDataVal.toDate;
    this.filter.branch = this.branch === '0' ? '' : this.branch;
    this.filter.search = "" ;
    this.filter.receiptOrPayment = selectedDataVal.receiptOrPayment == '' ? "CP" :selectedDataVal.receiptOrPayment ;
    this.sharedService.loading=true;
    this.cashReceiptEntry();
    this.sharedService.loading=false;
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
