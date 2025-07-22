import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { bankreceiptentrylistmodel  } from 'src/app/models/bankreceiptentrylistmodel';
import { bankreceiptentrymodel } from 'src/app/models/bankreceiptentrymodel';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Cashbankfiltermodel } from 'src/app/models/cashbankfiltermodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-bankreceiptentrylist',
  templateUrl: './bankreceiptentrylist.component.html',
  styleUrls: ['./bankreceiptentrylist.component.css']
})
export class BankreceiptentrylistComponent {
  
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string =""; 

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allBankReceiptEntry: bankreceiptentrylistmodel = new bankreceiptentrylistmodel();
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
    yearId:"",
  }

  finRefTypes: Dropdownmodel[] = [];
  
  formFilter!: FormGroup;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';

  constructor(private cashReceiptEntryService: CashReceiptEntryService, 
    private toastrService:ToastrService,
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
      .find((aa: { menuName: string; }) => aa.menuName === "Bank Receipts & Payments Voucher Entry");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
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
    this.getFinRefTypes();

    this.cashReceiptEntryService.clearCashReceiptEntryDetails();

    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      receiptOrPayment: new FormControl('BP',[Validators.required]),  
      docSeriesNo: new FormControl('',),  
      refType: new FormControl('',),  
    });
    
    this.sharedService.loading=true;    
    this.filter.receiptOrPayment = 'BP';
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.branch = this.branch;
    this.filter.yearId = this.year;
    this.filter.refType = "";

    this.bankReceiptEntry();
    this.sharedService.loading=false;

  }

  getFinRefTypes(): void {    
    this.cashReceiptEntryService.getFinRefTypes().subscribe((res) => {
      this.finRefTypes = res;
    });
  }

  bankReceiptEntry(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching:false, 
      language: {
          zeroRecords: ''
        }, 
      ajax: (dataTablesParameters: any, callback) => {
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.cashReceiptEntryService.getCashReceiptEntryList(this.filter).subscribe(resp => {
             this.allBankReceiptEntry = resp;
              callback({
                recordsTotal: resp.pageMetaData.totalCount,
                recordsFiltered: resp.pageMetaData.totalCount,
                data: []
              });
          });
      },
      columns: [ 
        {
          title: 'Action',
          data: 'ftmID',
        },
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
      ],
    };
  }
  
  //Open new driver master add screen
  bankreceiptentryAdd(): void {
    this.route.navigate(['/addbankreceiptentry']);
  }
  
  getBankReceiptEntryDetails(Docrenewal: bankreceiptentrymodel): void {
    this.cashReceiptEntryService.setCashReceiptEntryDetails(Docrenewal);
    this.route.navigate(['/bankreceiptentryedit']);
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
    this.filter.branch = this.branch === '0' ? '' : this.branch;
    this.filter.search = selectedDataVal.docSeriesNo;
    this.filter.yearId = this.year;
    this.filter.receiptOrPayment = selectedDataVal.receiptOrPayment == '' ? "BP" :selectedDataVal.receiptOrPayment ;
    this.filter.refType = selectedDataVal.refType;

    this.sharedService.loading=true;
    this.bankReceiptEntry();
    this.sharedService.loading=false;
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  
  downloadSumm(){    
    var selectedData = this.formFilter.getRawValue();
    this.filter.fromDate = selectedData.fromDate;
    this.filter.toDate = selectedData.toDate;
    this.filter.branch = this.branch;
    this.filter.search = selectedData.docSeriesNo;
    this.filter.yearId = this.year;
    this.filter.receiptOrPayment = selectedData.receiptOrPayment == '' ? "BP" :selectedData.receiptOrPayment ;
    this.filter.refType = selectedData.refType;


    this.cashReceiptEntryService.getCashReceiptEntryExcel(this.filter).subscribe(resp => {
      if(resp.status){      
        let link = document.createElement("a");
        link.download = "BankReport" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }
}





