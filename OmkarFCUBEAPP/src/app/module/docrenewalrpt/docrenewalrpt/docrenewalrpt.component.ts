import { Component,ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Docrenewalrptlistmodel  } from 'src/app/models/docrenewalrptlistmodel';
import { Docrenewalrptmodel } from 'src/app/models/docrenewalrptmodel';
import { DocRenewalRptService } from 'src/app/services/docrenewalrpt.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-docrenewalrpt',
  templateUrl: './docrenewalrpt.component.html',
  styleUrls: ['./docrenewalrpt.component.css']
})
export class DocrenewalrptComponent {
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  docRenewalList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  allDocRenewalRptlist: Docrenewalrptlistmodel = new Docrenewalrptlistmodel();
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
formFilter!: FormGroup;
  userSubmitted = false;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';
  responseDetails = new Responsemodel();

  constructor(private docRenewalRptService: DocRenewalRptService, 
    private excelService: ExcelService,private toastrService:ToastrService,
    private formBuilder: FormBuilder,  private sharedService: SharedService,
    private commonService: CommonService, 
    private route: Router) {
    }

    ngOnInit(): void {   
  
      var menuData = sessionStorage.getItem('menulist')?.toString();
      if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
        var privilegeData = JSON.parse(menuData);
        var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Doc Renewal Report");
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
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      today.setMonth(month - 1);
      this.fromDate = today.toLocaleDateString('en-CA').toString();
  
      this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
      this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
      this.formFilter = this.formBuilder.group({
        fromDate: new FormControl(this.loginDate,[Validators.required]),
        toDate: new FormControl(this.loginDate,[Validators.required]),
        tripBranch: new FormControl('',),  
        vehicleMasterID: new FormControl('',),  
        docRenewalID: new FormControl('',),  
      });
      this.filter.fromDate = this.loginDate;
      this.filter.toDate = this.loginDate;
      this.filter.filterStr   = "";
      this.filter.filterStr1  = "";
      this.filter.filterStr3  = "0";
  
      this.sharedService.loading=true;
      this.getBranchList();
      this.getVehicleNoList(); 
      this.getDocRefNoList();   
      this.expDocRenewal();
      this.sharedService.loading=false;
    }
    getBranchList(): void {
      this.commonService.getBranchList().subscribe((res) => {
        this.branchList = res;
      });
    }
    getVehicleNoList(): void {
      this.commonService.getVehicleNoList().subscribe((res) => {
        this.vehicleList = res;
      });
    }
    getDocRefNoList(): void {
      this.commonService.getDocRefNoList().subscribe((res) => {
        this.docRenewalList = res;
      });
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
    expDocRenewal(){
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
            this.filter.sortColumn = 'RenewalDocName';
            this.filter.sortOrder = 'asc';
            this.filter.search = '';
            this.docRenewalRptService.getDocRenewalRptList(this.filter).subscribe(resp => {
               this.allDocRenewalRptlist = resp;
                callback({
                  recordsTotal: resp.pageMetaData.totalCount,
                  recordsFiltered: resp.pageMetaData.totalCount,
                  data: []
                });
              });
          }, 
          columns: [ 
          {
            title: 'Renewal DocName',
            data: 'renewalDocName',
          },  
          {
            title: 'vehicle No',
            data: 'vehicleNo',
          },    
          {
            title: 'Trans Date',
            data: 'transDate',
          },
          {
            title: 'Valid FromDt',
            data: 'validFromDt',
          },       
          {
            title: 'Valid ToDt',
            data: 'validToDt',
          },
          {
            title: 'Net Amount',
            data: 'netAmount',
          },
          {
            title: 'Document RefNo',
            data: 'documentRefNo',
          },
      
        ],
      };
    }
      
    //Open user details screen
    exportExcel(): void {
      this.filter.filterStr3 = "1";
      this.docRenewalRptService.getDocRenewalRptListExcel(this.filter).subscribe(resp => {
        if(resp.status){
          //here code for Downloading Excel file          
          let link = document.createElement("a");
          link.download = "Exptruckarrival" + "_" + new Date().getTime() + '.xlsx';
          // link.href = "assets/" + resp.message;
          link.href = "assets/reports/ExpTruckArrRPT/" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
  
  search(): void {
    this.userSubmitted = true;
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
    this.filter.fromDate    = selectedDataVal.fromDate;
    this.filter.toDate      = selectedDataVal.toDate;
    this.filter.search      = this.loggedInUserID;
   // this.filter.filterStr   = selectedDataVal.tripBranch?selectedDataVal.tripBranch.dataId:"";
    this.filter.filterStr1  = selectedDataVal.docRenewalID?selectedDataVal.docRenewalID:"";
    this.filter.filterStr2  = selectedDataVal.vehicleMasterID?selectedDataVal.vehicleMasterID.dataId:"";
    this.filter.filterStr3  = "0";
    this.sharedService.loading=true;
    this.expDocRenewal();
    this.sharedService.loading=false;
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
} 
