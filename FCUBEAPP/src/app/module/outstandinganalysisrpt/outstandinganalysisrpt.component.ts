import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FreightreportsService } from 'src/app/services/freightreports.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Outstandinganalrptlistmodel } from 'src/app/models/outstandinganalrptlistmodel';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-outstandinganalysisrpt',
  templateUrl: './outstandinganalysisrpt.component.html',
  styleUrls: ['./outstandinganalysisrpt.component.css']
})
export class OutstandinganalysisrptComponent {
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  vehicleList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  formFilter!: FormGroup;
  formSubmitted = false;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';
  responseDetails = new Responsemodel();
  
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  rptType = false;

  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'ExpectedReportingDt',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:'',
  }
 
  allOutstandinganalrptlist: Outstandinganalrptlistmodel = new Outstandinganalrptlistmodel();

  constructor(private billoutstandingrptService: FreightreportsService,private toastrService:ToastrService,
    private formBuilder: FormBuilder,  private sharedService: SharedService,
    private commonService: CommonService, private route: Router) {
  }

  ngOnInit(): void {   

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Outstanding Analysis");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
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
      toDate: new FormControl(this.loginDate,[Validators.required]),
      asOnDate: new FormControl(this.loginDate,[Validators.required]),
      rptType: new FormControl('S',),
      party: new FormControl('',),
    });

    this.filter.fromDate =  "";
    this.filter.toDate = this.loginDate;
    this.filter.filterStr   = this.loginDate;
    this.filter.filterStr1  = "S";
    this.filter.filterStr2  = "";

    this.sharedService.loading=true;
    this.getPartyList();     
    this.getBranchList();
    this.outstandingList();
    this.sharedService.loading=false;
  }
  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getPartyList(): void {
    this.commonService.getPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }
  onrptchange(e:any){
    var rpt = e.target.value;
    if(rpt=="S"){
      this.rptType = false;
    }
    else{
      this.rptType = true;
    }
  }
    
  get f() { return this.formFilter.controls; }

  selectEvent(item: any) {
    // do something with selected item
   // this.GetOpeningBal();
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
  
  outstandingList(){
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
        this.billoutstandingrptService.getOutstandingAnalysisRptList(this.filter).subscribe(resp => {
          this.allOutstandinganalrptlist = resp; 
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      }, 
      columns: [ 
        {
          title: 'Party',
          data: 'party',
        }, 
        {
          title: 'Billed Due Amt',
          data: 'billedDueAmt',
        }, 
        {
          title: 'Adhoc Recd',
          data: 'adhocRecd',
        },         
        {
          title: 'Actual Bill Due',
          data: 'actualBillDue',
        },  
        {
          title: 'Ledger Amt',
          data: 'ledgerAmt',
        },   
        {
          title: 'Total Unbilled Amt',
          data: 'totalUnbilledAmt',
        },          
      ],
    };
  }

  exportExcel(): void {
    var selectedDataVal=this.formFilter.getRawValue();
    this.filter.toDate        = selectedDataVal.toDate;
    this.filter.filterStr = selectedDataVal.asOnDate;
    this.filter.filterStr1 = selectedDataVal.rptType;
    this.filter.filterStr2 = "";
    if(selectedDataVal.rptType=="D"){
      this.filter.filterStr2 = selectedDataVal.party?selectedDataVal.party.dataId:"";
    }

    this.billoutstandingrptService.getOutstandingAnalysisRptExcel(this.filter).subscribe((resp: any) => {
      let link = document.createElement("a");
      link.download = "OutstandingAnalysisReport" + "_" + new Date().getTime() + '.xlsx';
      link.href = "assets\\reports\\Download\\" + resp.message;
      link.click();
    });
  }

  search(): void {
    this.formSubmitted = true;
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
    this.filter.toDate      = selectedDataVal.toDate;
    this.filter.filterStr   = selectedDataVal.asOnDate;
    
    this.sharedService.loading=true;
    this.outstandingList();
    this.sharedService.loading=false;
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}

