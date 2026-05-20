
import { Component,ViewChild } from '@angular/core';//createdby aashishware
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Ledgerrptlistmodel  } from 'src/app/models/ledgerrptlistmodel';
import { FinreportsService } from 'src/app/services/finreports.service';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brsreport',
  templateUrl: './brsreport.component.html',
  styleUrls: ['./brsreport.component.css']
})
export class BrsreportComponent {
   loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string =""; 

  accountList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  allLedgerrptlist: Ledgerrptlistmodel = new Ledgerrptlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'fromPlace',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:'',
  }

  formFilter!: FormGroup;
  formSubmitted = false;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';
  responseDetails = new Responsemodel();
  requestmodel = new Requestmodel();

  constructor(private bankbookrptService: FinreportsService, 
    private excelService: ExcelService,private toastrService:ToastrService,
    private formBuilder: FormBuilder,  private sharedService: SharedService,
    private cashReceiptEntryService:CashReceiptEntryService,
    private commonService: CommonService, 
    private route: Router) {
  }

  ngOnInit(): void {     
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Bank Reconciliation Report");
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
  
    this.formFilter = this.formBuilder.group({
      clearDate: new FormControl(this.loginDate,[Validators.required]),
      accountID: new FormControl('',[Validators.required]),
      branch: new FormControl('',[Validators.required]),
    });

    this.sharedService.loading=true;
    this.getBranchList();
    this.getAccountList();  

    this.filter.toDate      = this.loginDate;
    this.filter.filterStr   = "";
    this.filter.filterStr1  = this.year;
    this.filter.filterStr2  = "";      
    this.brsList();
    this.sharedService.loading=false;
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getAccountList(): void {
    this.requestmodel.strRequest="B"
    this.cashReceiptEntryService.getAccountList(this.requestmodel).subscribe((res) => {
      this.accountList = res;
    });
  }
  
  get f() { return this.formFilter.controls; }
 
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

  brsList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching:false,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = 'Branch';
        this.filter.sortOrder = 'asc';
        this.filter.search = '';
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        
        this.bankbookrptService.getBankBookrptList(this.filter).subscribe(resp => {
           this.allLedgerrptlist = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      }, 
      columns: [ 
        
        {
          title: 'Doc No',
          data: 'docNo',
        }, 
        {
          title: 'Narration',
          data: 'narration',
        },  
       
      ],
    };
  }
    


  
 exportExcel(): void {      
    //this.userSubmitted = true;
    if (this.formFilter.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields");   
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      }     
      return;
    }
    var selectedDataVal=this.formFilter.getRawValue();
     this.filter.toDate        = selectedDataVal.clearDate;
    this.filter.filterStr     = selectedDataVal.branch;
    this.filter.filterStr1    = this.year;
    this.filter.filterStr2    = selectedDataVal.accountID;
    this.bankbookrptService.getBRSrptExcel(this.filter).subscribe(resp => {
      if(resp.status){      
        let link = document.createElement("a");
        link.download = "BRSReport" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }

  search(): void {
    if (this.formFilter.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields ");
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }
    var selectedDataVal=this.formFilter.getRawValue();

    // let frmdt = new Date(selectedDataVal.fromDate);
    // let todt = new Date(selectedDataVal.toDate);
    // let maxdt = new Date(this.loginDate);
    // let mindt = new Date(this.minDate);

    // if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
    //   this.toastrService.warning("From Date and To Date should be with in Fin Year");
    //   return;
    // }
    

    this.filter.toDate        = selectedDataVal.clearDate;
    this.filter.filterStr     = selectedDataVal.branch==""?"0":selectedDataVal.branch;
    this.filter.filterStr1    = this.year;
    this.filter.filterStr2    = selectedDataVal.accountID;
    this.filter.search = '';

    this.bankbookrptService.getBRSrptExcel(this.filter).subscribe((resp: any) => {
      let link = document.createElement("a");
 
        link.download = "BRSReport_" + new Date().getTime() + '.xls';
        link.href = "assets/reports/BRS/" + resp.message;
        link.click();
    
    });
  }
}



