import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dieselstatementmodel } from 'src/app/models/dieselstatementmodel';
import { Dieselstatementlistmodel } from 'src/app/models/dieselstatementlistmodel';
import { DieselstmtService } from 'src/app/services/dieselstmt.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dieselstmtbpcllist',
  templateUrl: './dieselstmtbpcllist.component.html',
  styleUrls: ['./dieselstmtbpcllist.component.css']
})
export class DieselstmtbpcllistComponent {
  formSubmitted = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  accountList: Dropdownmodel[] = [];
  requestmodel = new Requestmodel();
  formFilter!: FormGroup;
  keywordLocation = 'dataName'; 
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allDieselStatement: Dieselstatementlistmodel = new Dieselstatementlistmodel();
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

  constructor(private formBuilder: FormBuilder, private dieselStatementService: DieselstmtService, 
    private cashreceiptentryService: CashReceiptEntryService, private toasterService: ToastrService,
    private commonService: CommonService, private sharedService: SharedService,     
    private route: Router) {
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Diesel Data Import - BPCL"));
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
    
    

    this.dieselStatementService.clearDieselImportDetails();
    this.formFilter = this.formBuilder.group({
      dfAccount: new FormControl(''),
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
    });     

    this.sharedService.loading=true;    
    this.getAcountList();

    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;

    this.dieselstateList();
    this.sharedService.loading=false;
  }

  dieselstateList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
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
        this.dieselStatementService.getDieselImportList(this.filter)
          .subscribe(resp => {
            this.allDieselStatement = resp;
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
          data: 'masterID',
        },
        {
          title: 'Voucher Print',
          data: 'masterID',
        },
        {
          title: 'Account ',
          data: 'vendor',
        },
        {
          title: 'Stmt Date ',
          data: 'billStmtDate',
        },
        {
          title: 'From Date ',
          data: 'fromDate'
        },
        {
          title: 'To Date ',
          data: 'toDate'
        },
      ],
    };
  }

  getAcountList(): void {    
    this.requestmodel.strRequest="D"
    this.cashreceiptentryService.getAccountList(this.requestmodel).subscribe((res) => {
      this.accountList = res;
    });
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

  dieselStatementAdd(): void {
    this.route.navigate(['/dieselbpcladd']);
  }

  //Open user details screen
  getDieselStatementDetails(dieselstmt: Dieselstatementmodel): void {
    this.dieselStatementService.setDieselImportDetails(dieselstmt);
    this.route.navigate(['/dieselbpcledit']);
  }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    let frmdt = new Date(selecteddata.fromDate);
    let todt = new Date(selecteddata.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);
    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toasterService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.search = selecteddata.dfVendor?selecteddata.dfVendor.dataId:"";
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    
    this.sharedService.loading=true;
    this.dieselstateList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  getVoucherPrint(dieselimpadd: Dieselstatementmodel): void {
    this.requestmodel.strRequest = "D";
    this.requestmodel.strRequest1 = dieselimpadd.masterID;

    this.commonService.getVoucherPrint(this.requestmodel).subscribe(resp => {
      if(resp.status){    
        let link = document.createElement("a");
        link.download = "Voucher_" + new Date().getTime() + '.pdf';
        link.href = "assets/reports/voucher/" + resp.message;
        link.click();
        window.open(link.href, "_blank");
      }
      else{        
        this.toasterService.warning(resp.message);   
      }
    });
  }
  
}