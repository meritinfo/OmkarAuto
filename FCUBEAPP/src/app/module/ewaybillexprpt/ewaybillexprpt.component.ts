import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Ewaybillextmodel  } from 'src/app/models/ewaybillextmodel';
import { Ewaybillextlistmodel } from 'src/app/models/ewaybillextlistmodel';
import { EwaybillextService } from 'src/app/services/ewaybillext.service';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ewaybillexprpt',
  templateUrl: './ewaybillexprpt.component.html',
  styleUrls: ['./ewaybillexprpt.component.css']
})
export class EwaybillexprptComponent {
  loggedInUserID: string = '';

  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  allEwayBillExtlist: Ewaybillextlistmodel = new Ewaybillextlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'ewayBillExpDate',
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
  toDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';
  partyList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  responseDetails = new Responsemodel();
  keywordLocation = 'dataName';
  
  constructor(private formBuilder: FormBuilder,
    private ewaybillextService: EwaybillextService,
    private excelService: ExcelService,private toastrService:ToastrService,
    private sharedService: SharedService,
    private commonService: CommonService, 
    private route: Router){    }

  ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Ewaybill Expiry Report");
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
    
  
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.minDate,[Validators.required]),
      toDate: new FormControl(this.loginDate,[Validators.required]),
      billingParty: new FormControl('',),  
      branch: new FormControl('',),  
    });

    this.filter.fromDate = this.minDate;
    this.filter.toDate = this.loginDate;
    this.filter.filterStr1  = "";
    this.filter.filterStr2  = "";

    this.sharedService.loading=true;
    this.getBranchList();
    this.getPartyList(); 

    this.ewaybillextlist();       
    this.sharedService.loading = false;
  }

  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

  get f() { return this.formFilter.controls; }

   

  onChangeSearch(search: string) {
    // fetch remote data from here
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  ewaybillextlist(){    
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
        this.filter.search = '';      
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.ewaybillextService.getEWayBillExtRptList(this.filter).subscribe(resp => {
            this.allEwayBillExtlist = resp;  
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
        },
       columns: [  
        {
          title: 'Booked At',
          data: 'bookedAt',
        },
        {
          title: 'Booking Date',
          data: 'bookingDate',
        },
        {
        title: 'GcNote No',
        data: 'gcNoteNo',
        },
        {
        title: 'From Location',
        data: 'fromLocation',
        },
        {
        title: 'Destination',
        data: 'destination',
        },
        {
        title: 'EwayBill No',
        data: 'ewayBillNo',
        },
        {
        title: 'EwayBill Date',
        data: 'ewayBillDate',
        },
        {
        title: 'EwayBill Exp Date',
        data: 'ewayBillExpDate',
        },
      ],
    };
  }
    

  exportExcel(): void {    
    var selectedDataVal = this.formFilter.getRawValue();
    this.filter.fromDate    = selectedDataVal.fromDate;
    this.filter.toDate      = selectedDataVal.toDate;
    this.filter.search      = this.loggedInUserID;
    this.filter.filterStr1  = selectedDataVal.billingParty?selectedDataVal.billingParty.dataId:"";
    this.filter.filterStr2  = selectedDataVal.branch?selectedDataVal.branch.dataId:"";

    this.sharedService.loading=true;
    this.ewaybillextService.getEWayBillExtRptExcel(this.filter).subscribe(resp => {
      if(resp.status){      
        let link = document.createElement("a");
        link.download = "EwayBillExpiryReport" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
    this.sharedService.loading=false;
  }
  
  search(): void {
    var selectedDataVal = this.formFilter.getRawValue();
    this.filter.fromDate    = selectedDataVal.fromDate;
    this.filter.toDate      = selectedDataVal.toDate;
    this.filter.search      = this.loggedInUserID;
    this.filter.filterStr1  = selectedDataVal.billingParty?selectedDataVal.billingParty.dataId:"";
    this.filter.filterStr2  = selectedDataVal.branch?selectedDataVal.branch.dataId:"";

    this.sharedService.loading=true;
    this.ewaybillextlist();       
    this.sharedService.loading=false;
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
  

}

