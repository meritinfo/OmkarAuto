import { Component,ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Trippaymentsrptlistmodel  } from 'src/app/models/trippaymentsrptlistmodel';
import { FleetreportsService } from 'src/app/services/fleetreports.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trippaymentsrpt',
  templateUrl: './trippaymentsrpt.component.html',
  styleUrls: ['./trippaymentsrpt.component.css']
})
export class TrippaymentsrptComponent {
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string =""; 
  docRenewalList: Dropdownmodel[] = [];
    
  partyList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  transType: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  allTripPaymentsRptlist: Trippaymentsrptlistmodel = new Trippaymentsrptlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'paymentBr',
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

  constructor(private tripPaymentsRptService: FleetreportsService, 
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
        .find((aa: { menuName: string; }) => aa.menuName === "Trip Payments Report");
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



    this.getBranchList();
    
      this.formFilter = this.formBuilder.group({
        fromDate: new FormControl(this.minDate,[Validators.required]),
        toDate: new FormControl(this.loginDate,[Validators.required]),
        branch: new FormControl('',),  
        vehicleMasterID: new FormControl('',),  
        transType: new FormControl('',),  
        pmtType: new FormControl('',),   
        creditAc: new FormControl('',),  
      });

      this.filter.fromDate = this.minDate;
      this.filter.toDate = this.loginDate;
      this.filter.filterStr   = "";
      this.filter.filterStr1  = "";
      this.filter.filterStr2  = "";
      this.filter.filterStr3  = "";
  
      this.sharedService.loading=true;
      this.getBranchList();
      this.getVehicleNoList(); 
      this.getDocRefNoList();       
      this.getTripPaymentsCreditList();

      this.expTripPayments();
      this.sharedService.loading=false;
    }
    getBranchList(): void {
      this.commonService.getBranchList().subscribe((res) => {
        this.branchList = res;
      });
    }
    getVehicleNoList(): void {
      this.commonService.getVehicleIdList().subscribe((res) => {
        this.vehicleList = res;
      });
    }

    getTripPaymentsCreditList(): void {
      this.commonService.getTripPaymentsCreditList().subscribe((res) => {
        this.creditacList = res;
      });
    }
    
    getDocRefNoList(): void {
      this.commonService.getDocRefNoList().subscribe((res) => {
        this.docRenewalList = res;
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


  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().endsWith(query.toLowerCase()));
  };
    expTripPayments(){
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
            // Filter setting
            this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
            this.filter.pageSize = dataTablesParameters.length;
            this.filter.sortColumn = 'paymentBr';
            this.filter.sortOrder = 'asc';
            this.filter.search = '';
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
            this.tripPaymentsRptService.getTripPaymentsRptList(this.filter).subscribe(resp => {
               this.allTripPaymentsRptlist = resp;
                callback({
                  recordsTotal: resp.pageMetaData.totalCount,
                  recordsFiltered: resp.pageMetaData.totalCount,
                  data: []
                });
              });
          }, 
          columns: [ 
          {
            title: 'Payment Br ',
            data: 'paymentBr',
          },  
          {
            title: 'Pmt Date ',
            data: 'pmtDate',
          },    
          {
            title: 'Vehicle No',
            data: 'vehicleNo',
          },
          {
            title: 'Trans Type ',
            data: 'transType',
          },       
          {
            title: 'Qty Ltrs',
            data: 'qtyLtrs',
          },
          {
            title: ' Amount Paid',
            data: 'amountPaid',
          },
          {
            title: 'Pmt Type ',
            data: 'pmtType',
          },
          {
            title: 'Credit Affect ',
            data: 'creditAffect',
          },
          {
            title: 'Trip Adj ',
            data: 'tripAdj',
          },
          {
            title: 'Trip No ',
            data: 'tripNo',
          },
          {
            title: 'Filling Branch',
            data: 'fillingStnName',
          },
      
        ],
      };
    }
      
    //Open user details screen
    exportExcel(): void {      
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
      this.filter.fromDate    = selectedDataVal.fromDate;
      this.filter.toDate      = selectedDataVal.toDate;
      this.filter.filterStr  = selectedDataVal.branch;
      this.filter.filterStr1  = selectedDataVal.vehicleMasterID?selectedDataVal.vehicleMasterID.dataId:"";
      this.filter.filterStr2   = selectedDataVal.transType?selectedDataVal.transType:"";
      this.filter.filterStr3  = selectedDataVal.pmtType?selectedDataVal.pmtType:"";
      // this.filter.filterStr2  = selectedDataVal.vehicleMasterID?selectedDataVal.vehicleMasterID.dataId:"";
      // this.filter.filterStr3  = selectedDataVal.creditAc;

      this.tripPaymentsRptService.getTripPaymentsRptListExcel(this.filter).subscribe(resp => {
        if(resp.status){      
          let link = document.createElement("a");
          link.download = "TripPayments" + "_" + new Date().getTime() + '.xlsx';
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
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
    this.filter.fromDate    = selectedDataVal.fromDate;
    this.filter.toDate      = selectedDataVal.toDate;
    this.filter.filterStr  = selectedDataVal.branch;
    this.filter.filterStr1  = selectedDataVal.vehicleMasterID?selectedDataVal.vehicleMasterID.dataId:"";
    this.filter.filterStr2   = selectedDataVal.transType?selectedDataVal.transType:"";
    this.filter.filterStr3  = selectedDataVal.pmtType?selectedDataVal.pmtType:"";
    // this.filter.filterStr   = selectedDataVal.transType?selectedDataVal.transType:"";
    // this.filter.filterStr1  = selectedDataVal.pmtType?selectedDataVal.pmtType:"";
    // this.filter.filterStr2  = selectedDataVal.vehicleMasterID?selectedDataVal.vehicleMasterID.dataId:"";
    // this.filter.filterStr3  = selectedDataVal.creditAc;
    
    this.sharedService.loading=true;
    this.expTripPayments();
    this.sharedService.loading=false;
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
} 
