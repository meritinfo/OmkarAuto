

import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import {  Vehiclerepmaintlistmodel } from 'src/app/models/vehiclerepmaintlistmodel';
import { VehiclerepmaintMaster } from 'src/app/models/vehiclerepmaintmastermodel';
import { VehiclerepmaintMasterService } from 'src/app/services/vehiclerepmaint.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-vehiclerepmaintlist',
  templateUrl: './vehiclerepmaintlist.component.html',
  styleUrls: ['./vehiclerepmaintlist.component.css']
})
export class VehiclerepmaintlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allVehicleMaster: Vehiclerepmaintlistmodel = new Vehiclerepmaintlistmodel();
  filter: Pagerequestwithdatesmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: '',
    fromDate:'',
    toDate:'',
    strRequest:''
  }
  
  formFilter!: FormGroup;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  year: string = '';

  constructor(private vehiclerepmaintMasterService: VehiclerepmaintMasterService,
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService,  private route: Router) {

}

ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Vehicle Repairs Entry"));
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
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



  this.vehiclerepmaintMasterService.clearVehiclerepmaintMasterDetails();
  this.formFilter = this.formBuilder.group({
    fromDate: new FormControl(this.fromDate),
    toDate: new FormControl(this.loginDate),
  });     

  this.sharedService.loading=true;   
  this.filter.fromDate = this.fromDate;
  this.filter.toDate = this.loginDate;
 this.vehicleMaintList();
  this.sharedService.loading=false;
}
vehicleMaintList() {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,
    searching :false,
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      this.filter.search = dataTablesParameters.search.value;
      callback({
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      });
      this.vehiclerepmaintMasterService.getVehiclerepmaintMasterList(this.filter).subscribe(resp => {
        this.allVehicleMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [   
      {
        title: 'Trans Date',
        data: 'transDate',
      },
      {
        title: 'Stock Type ',
        data: 'stype',
      },
     
      // {
      //   title: 'Maint Type',
      //   data: 'maintType',
      // }, 
      {
        title: 'Km Reading',
        data: 'kmReading',
      }, 
      {
        title: 'Non Vendor',
        data: 'nonVendor',
      },
      // {
      //   title: 'vehicleMasterId',
      //   data: 'vehicleMasterId',
      // }, 
      
      
      {
        title: 'Vendor Inv Date',
        data: 'vendorInvDt',
      }, 
      {
        title: 'Vendor Inv No',
        data: 'vendorInvNo',
      }, 
      {
        title: 'Vendor Name',
        data: 'vendorName',
      }, 
      {
        title: 'Action',
        data: 'spTransId',
      },
    ],
  };
}

addVehicleMaintMaster(): void {
  this.route.navigate(['/vehiclerepmaintadd']);
} 

//Open user details screen
getVehicleMaintMasterDetails(tyre: VehiclerepmaintMaster): void {
  this.vehiclerepmaintMasterService.setVehiclerepmaintDetails(tyre);
  this.route.navigate(['/vehiclerepmaintmasteredit']);
}

search(): void {
  var selecteddata = this.formFilter.getRawValue();
  this.filter.fromDate = selecteddata.fromDate;
  this.filter.toDate = selecteddata.toDate;
  this.sharedService.loading=true;
  this.vehicleMaintList();
  this.sharedService.loading=false;
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}
}


