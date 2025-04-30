

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Fleetloadentrylistmodel } from 'src/app/models/fleetloadentrylistmodel';
import { Fleetloadentrymodel } from 'src/app/models/fleetloadentrymodel';
import { FleetLoadEntryService } from 'src/app/services/fleetloadentry.service';
import { SharedService } from 'src/app/services/shared.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { CommonService } from 'src/app/services/common.service';
import { Reportmodel } from 'src/app/models/reportmodel';

@Component({
  selector: 'app-fleetloadentrylist',
  templateUrl: './fleetloadentrylist.component.html',
  styleUrls: ['./fleetloadentrylist.component.css']
})
export class FleetloadentrylistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  year: string = '';
  creditAcList : Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allFleetLoadMaster: Fleetloadentrylistmodel = new Fleetloadentrylistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Code',
    sortOrder: 'asc',
    search: '',
    fromDate:'',
    toDate:'',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:'',
  }

  formFilter!: FormGroup;
  constructor(private fleetLoadEntryService: FleetLoadEntryService,private commonService: CommonService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
    private route: Router) {
  }
  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Fleet Load Entry");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
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
        fromDate: new FormControl(this.minDate,[Validators.required]),
        toDate: new FormControl(this.loginDate,[Validators.required]),
        loadFor: new FormControl('',),
        vehicleMasterId: new FormControl('',),  
      }); 
      this.filter.fromDate = this.minDate;
      this.filter.toDate = this.loginDate;
      this.filter.filterStr   = "";
      this.filter.filterStr1  = "";
      this.filter.filterStr2  = "";
      this.filter.filterStr3  = "";
  
    }
  
    this.fleetLoadEntryService.clearFleetLoadEntryDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.minDate,[Validators.required]),
      toDate: new FormControl(this.loginDate,[Validators.required]),
      loadFor: new FormControl(''),
      vehicleMasterId: new FormControl(''),
    }); 
  
    this.sharedService.loading = true;
    this.getCreditAcList();
    this.getVehicleNoList();
    this.fleetLoadEntryList();
    this.sharedService.loading=false;   
  }

      
  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

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


  fleetLoadEntryList(){
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
        this.fleetLoadEntryService.getFleetLoadEntryList(this.filter).subscribe(resp => {
            this.allFleetLoadMaster = resp;
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
          title: 'Branch',
          data: 'tripBrName',
        },
        {
          title: 'Date',
          data: 'loadDate',
        },
        {
          title: 'Type',
          data: 'loadType',
        },
        {
          title: 'Vehicle No',
          data: 'vehicleNo',
        },
        {
          title: 'Party (Load for)',
          data: 'ldFor',
        },       
        {
          title: 'Memo No',
          data: 'loadMemoNo',
        },
        {
          title: 'From',
          data: 'loadingFrom',
        },
        {
          title: 'To',
          data: 'loadingTo',
        },
        {
          title: 'Hire Amt',
          data: 'hireAmt',
        },       
        {
          title: 'Action',
          data: 'loadId',
        },
      ],
    };
  }
   //Open new user add screen
  AddFleetLoadEntry(): void {
    this.route.navigate(['/fleetloadentryadd']);
  }
     
      
      //Open user details screen
  fleetLoadEntryDetails(Classification: Fleetloadentrymodel): void {
    this.fleetLoadEntryService.setFleetLoadEntryDetails(Classification);
    this.route.navigate(['/fleetloadentryedit']);
  }
      
  getCreditAcList(): void {
    this.commonService.getCreditAcList().subscribe((res) => {
      this.creditAcList = res;
    });   
  }
      
  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.filterStr =  selecteddata.loadFor;
    this.filter.filterStr1 =  selecteddata.vehicleMasterId?selecteddata.vehicleMasterId.dataId:"";
    this.sharedService.loading=true;
    this.fleetLoadEntryList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
      
      
      