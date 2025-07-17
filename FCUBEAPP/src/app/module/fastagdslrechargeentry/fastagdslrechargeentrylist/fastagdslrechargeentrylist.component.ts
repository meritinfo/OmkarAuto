import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { Fastagdslrechargeentrylistmodel } from 'src/app/models/fastagdslrechargeentrylistmodel';
import { Fastagdslrechargeentrymodel } from 'src/app/models/fastagdslrechargeentrymodel';
import { FastagdslrechargeentryService } from 'src/app/services/fastagdslrechargeentry.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-fastagdslrechargeentrylist',
  templateUrl: './fastagdslrechargeentrylist.component.html',
  styleUrls: ['./fastagdslrechargeentrylist.component.css']
})

export class FastagdslrechargeentrylistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
    
  year: string = '';
  loginDate: string = '';
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  vehicleList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allFasttag: Fastagdslrechargeentrylistmodel = new Fastagdslrechargeentrylistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr: '',
    filterStr1: '',
    filterStr2:'',
    filterStr3:''
  }

  formFilter!: FormGroup;

  constructor(private fastagdslrechargeentryService: FastagdslrechargeentryService, 
    private formBuilder: FormBuilder, private commonService: CommonService,
    private toastrService:ToastrService,
    private sharedService: SharedService, private route: Router) {
  }

  ngOnInit(): void {        
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Card Recharge Entry");
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
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    this.fastagdslrechargeentryService.clearFastagdslrechargeentryDetails();
    this.formFilter = this.formBuilder.group({
      vehicleID: new FormControl(''),
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),

    });

    this.getVehicleIdList();
    this.sharedService.loading=true;
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.filterStr = "";
    this.fastagdslrechargeentrylist();
    this.sharedService.loading=false;
  }

  
  getVehicleIdList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }  
  
  onFocused(e: any) {
    // do something
  }
  
  startWithFilter = function (partyList: Dropdownmodel[], query: string): any[] {
    return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().includes(query.toLowerCase()));
  };
  
  fastagdslrechargeentrylist(){
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
      // this.filter.search = '';      
      callback({
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      });
      this.sharedService.loading = true;
      this.fastagdslrechargeentryService.getFastagdslrechargeentryList(this.filter).subscribe(resp => {
         this.allFasttag = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });  
        this.sharedService.loading = false;
      },
       // Set column title and data field
       columns: [        
        {
          title: 'Action',
          data: 'transId',
        },
        {
          title: 'Trans Branch',
          data: 'branch',
        },
        {
        title: 'Recharge Date',
        data: 'rechargeDate',
        },
        {
          title: 'Recharge Type',
          data: 'rechargeType',
        },
        {
          title: 'Recharge Amount',
          data: 'rechargeAmt',
        }, 
      ],
    };
  }
  
  //Open new driver master add screen
  addfastagdslrechargeentry(): void {
    this.route.navigate(['/rechargeentryadd']);
  }

  //Open user details screen
  getfastagdslrechargeentryDetails(finact: Fastagdslrechargeentrymodel): void {
    this.fastagdslrechargeentryService.setFastagdslrechargeentryDetails(finact);
    this.route.navigate(['/rechargeentryedit']);
  }
 
  search(): void { 
    var selectedDataValue = this.formFilter.getRawValue()
    let frmdt = new Date(selectedDataValue.fromDate);
    let todt = new Date(selectedDataValue.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toastrService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.filterStr = selectedDataValue.vehicleID.dataId;
    this.filter.fromDate = selectedDataValue.fromDate;
    this.filter.toDate = selectedDataValue.toDate;
    this.filter.search = this.branch;
    
    this.sharedService.loading=true;
    this.fastagdslrechargeentrylist();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
