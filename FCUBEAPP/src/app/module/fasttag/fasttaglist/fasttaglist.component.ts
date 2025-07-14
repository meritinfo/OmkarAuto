import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Fasttagmodel } from 'src/app/models/fasttagmodel';
import { Fasttaglistmodel } from 'src/app/models/fasttaglistmodel';
import { FasttagService } from 'src/app/services/fasttag.service';
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
  selector: 'app-fasttaglist',
  templateUrl: './fasttaglist.component.html',
  styleUrls: ['./fasttaglist.component.css']
})
export class FasttaglistComponent {
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
  allFasttag: Fasttaglistmodel = new Fasttaglistmodel();
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

  constructor(private formBuilder: FormBuilder, private fasttagService: FasttagService, 
    private cashreceiptentryService: CashReceiptEntryService,
    private toasterService: ToastrService, 
    private commonService: CommonService, private sharedService: SharedService,     
    private route: Router) {
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Fastag Data Import"));
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

    this.fasttagService.clearFasttagDetails();
    this.formFilter = this.formBuilder.group({
      ftAccount: new FormControl(''),
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
    });     

    this.sharedService.loading=true;    
    this.getAcountList();

    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;

    this.fasttagList();
    this.sharedService.loading=false;
  }

  fasttagList() {
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
        this.fasttagService.getFasttagList(this.filter)
          .subscribe(resp => {
            this.allFasttag = resp;
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
          data: 'ftMasterID',
        },
        {
          title: 'Voucher Print',
          data: 'masterID',
        },
        {
          title: 'Account ',
          data: 'accountName',
        },
        {
          title: 'Stmt Date ',
          data: 'stmtDate',
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
    this.requestmodel.strRequest = "F"
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

  fasttagAdd(): void {
    this.route.navigate(['/fasttagimpadd']);
  }

  //Open user details screen
  getFasttagDetails(fasttag: Fasttagmodel): void {
    this.fasttagService.setFasttagDetails(fasttag);
    this.route.navigate(['/fasttagimpedit']);
  }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.filter.search = selecteddata.ftAccount?selecteddata.ftAccount.dataId:"";
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    
    this.sharedService.loading=true;
    this.fasttagList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
  
  getVoucherPrint(dieselimpadd: Fasttagmodel): void {
    this.requestmodel.strRequest = "F";
    this.requestmodel.strRequest1 = dieselimpadd.ftMasterID;

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