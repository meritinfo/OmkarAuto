
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { FinreportsService } from 'src/app/services/finreports.service';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Trailballist } from 'src/app/models/trailballist';
import { Trailbalmodel } from 'src/app/models/trailbalmodel';
import { Ledgerdetailmodel } from 'src/app/models/ledgerdetailmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Cashbankfiltermodel } from 'src/app/models/cashbankfiltermodel';

@Component({
  selector: 'app-trailballist',
  templateUrl: './trailballist.component.html',
  styleUrls: ['./trailballist.component.css']
})
export class TrailballistComponent {
  formSubmitted = false;
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  cbfromDate:string = '';
  cbtoDate:string = '';
   creditacList: Dropdownmodel[] = [];
  cbaccountID:string = '';
  requestmodel = new Requestmodel();
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  dashboard: string =""; 
  formFilter!: FormGroup;
  accountList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  
  dtOptions: DataTables.Settings = {
   
  };
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
    

  allTrail: Trailballist = new Trailballist();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'vendor',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr: '',
    filterStr1: '',
    filterStr2:'',
    filterStr3:''
  }
  cashFilter: Cashbankfiltermodel = {
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
    yearId:"",
  }
  responseDetails = new Responsemodel();
  
  constructor(private ledgerrptService: FinreportsService, private cashReceiptEntryService: CashReceiptEntryService, 
    private excelService: ExcelService,private toastrService:ToastrService,
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
      .find((aa: { menuName: string; }) => aa.menuName === "Trial Balance Summary");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    
    this.sharedService.loggedInStatus = true;
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
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
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;  

    var cbfromDate = sessionStorage.getItem('cbfromDate')?.toString();
    if (typeof cbfromDate !== 'undefined' && cbfromDate !== null && cbfromDate !== '') {
      this.cbfromDate = cbfromDate;
    }
    else{
      this.cbfromDate = this.fromDate;
    }
    var cbtoDate = sessionStorage.getItem('cbtoDate')?.toString();
    if (typeof cbtoDate !== 'undefined' && cbtoDate !== null && cbtoDate !== '') {
      this.cbtoDate = cbtoDate;
    }
    else{
      this.cbtoDate = this.loginDate;
    } 
    var cbaccountID = sessionStorage.getItem('cbaccountID')?.toString();
    if (typeof cbaccountID !== 'undefined' && cbaccountID !== null && cbaccountID !== '') {
      this.cbaccountID = cbaccountID;
    }

    
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.minDate,[Validators.required]),
      toDate: new FormControl(this.loginDate,[Validators.required]),
    
    });    

    setTimeout(() => {      
      this.formFilter.patchValue({
        fromDate: this.cbfromDate,
        toDate: this.cbtoDate,
        accountID:this.accountList.find(e => e.dataId == this.cbaccountID), 
      })
    }, 2000);

this.filter.fromDate = this.cbfromDate;
    this.filter.toDate = this.cbtoDate;
    this.filter.filterStr = this.branch;
    this.filter.filterStr1 = this.year;

    this.trailBalDetailList();

  }

  
  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  
  get f() { return this.formFilter.controls; }

trailBalDetailList() {
    this.dtOptions = {
      paging: false,
      info: false,
      serverSide: true,
      processing: true,
      searching: false,     
        language: {
          zeroRecords: ''
        }, 
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.ledgerrptService.getTrailBalDetailList(this.filter)
          .subscribe(resp => {
            this.allTrail = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Edit',
          data: 'masterId',
        },
        {
          title: 'Main Group ',
          data: 'mainGroup',
        },
        {
          title: 'Sub Group ',
          data: 'subGroup',
        },
        {
          title: 'Account Name',
          data: 'accountName',
        },
        {
          title: 'DEBIT',
          data: 'debit',
        },
        {
          title: 'CREDIT',
          data: 'credit'
        },
       
        {
          title: 'Balance',
          data: 'balAmt',
        },
      ],
    };
  }

  


  getCashReceiptEntryDetails(finTrans: Trailbalmodel): void {
    // var selecteddata = this.formFilter.getRawValue();
    // sessionStorage.setItem("cbfromDate", selecteddata.fromDate);
    // sessionStorage.setItem("cbtoDate", selecteddata.toDate);
    // sessionStorage.setItem("cbaccountID", selecteddata.accountID?selecte
    // .ddata.accountID.dataId:"");

    // this.cashFilter.fromDate = selecteddata.fromDate;
    // this.cashFilter.toDate = selecteddata.toDate;
    // this.cashFilter.branch = "";
    // this.cashFilter.search = finTrans.docNo;
    // this.cashFilter.yearId = this.year;
    // this.cashFilter.receiptOrPayment = finTrans.docType;

    // this.cashReceiptEntryService.getCashReceiptEntryList(this.cashFilter).subscribe(resp => {
    //   this.cashReceiptEntryService.setCashReceiptEntryDetails(resp.recPaymentsList[0]);
    //   if(finTrans.docType=="CP" || finTrans.docType =="CR")
    //     this.route.navigate(['/cashreceiptentryedit']);
    //   if(finTrans.docType=="BP" || finTrans.docType =="BR")
    //     this.route.navigate(['/bankreceiptentryedit']);
    //   if(finTrans.docType=="JV")
    //     this.route.navigate(['/journalentryedit']);
    // });
  }
    
  search(): void {
    var selectedDataVal=this.formFilter.getRawValue();
    let frmdt = new Date(selectedDataVal.fromDate);
    let todt = new Date(selectedDataVal.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toastrService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.fromDate = selectedDataVal.fromDate;
    this.filter.toDate = selectedDataVal.toDate;
    this.filter.filterStr= this.branch;
    this.filter.filterStr1 = this.year;
    this.sharedService.loading=true;
    this.trailBalDetailList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}



