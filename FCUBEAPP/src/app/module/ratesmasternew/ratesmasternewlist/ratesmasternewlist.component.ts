

import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Ratesmasternewlistmodel } from 'src/app/models/ratesmasternewlistmodel';
import { Ratesmasternewmodel } from 'src/app/models/ratesmasternewmodel';
import { RatesMasterNewService } from 'src/app/services/ratesmasternew.services';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-ratesmasternewlist',
  templateUrl: './ratesmasternewlist.component.html',
  styleUrls: ['./ratesmasternewlist.component.css']
})
export class RatesmasternewlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allRatesMaster: Ratesmasternewlistmodel = new Ratesmasternewlistmodel();
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
dashboard: string ="";
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  year: string = '';

  constructor(private ratesMasterNewService: RatesMasterNewService,private toastrService:ToastrService,
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService,  private route: Router) {

}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Define Booking Rates"));
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



  this.ratesMasterNewService.clearRatesMasterNewDetails();
  this.formFilter = this.formBuilder.group({
    fromDate: new FormControl(this.fromDate),
    toDate: new FormControl(this.loginDate),
  });     

  this.sharedService.loading=true;   
  this.filter.fromDate = this.fromDate;
  this.filter.toDate = this.loginDate;
  this.ratesMasterNewList();
  this.sharedService.loading=false;
}
ratesMasterNewList() {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,
    searching :false,   
        language: {
          zeroRecords: ''
        }, 
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
      this.ratesMasterNewService.getRatesMasterNewList(this.filter).subscribe(resp => {
        this.allRatesMaster = resp;
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
        data: 'rateId',
      },  
      {
        title: 'Party',
        data: 'party',
      },
      {
        title: 'Valid From ',
        data: 'validFrom',
      },
     
      {
        title: 'Valid Upto',
        data: 'validUpto',
      }, 
      // {
      //   title: 'Veh Type',
      //   data: 'vehTypeId',
      // }, 
      // {
      //   title: 'Rate Type',
      //   data: 'rateTypeId',
      // }, 
      // {
      //   title: 'From Locatio nType',
      //   data: 'fromLocationType',
      // }, 
      {
        title: 'From Location',
        data: 'location',
      }, 

      
    ],
  };
}

addRatesMasterNew(): void {
  this.route.navigate(['/ratesmasternewadd']);
} 

//Open user details screen
getRatesMasterNewDetails(tyre: Ratesmasternewmodel): void {
  this.ratesMasterNewService.ratesMasterNewDetails(tyre);
  this.route.navigate(['/ratesmasternewedit']);
}

search(): void {
  var selecteddata = this.formFilter.getRawValue();
     var selectedDataVal=this.formFilter.getRawValue();

    let frmdt = new Date(selectedDataVal.fromDate);
    let todt = new Date(selectedDataVal.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toastrService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
  this.filter.fromDate = selecteddata.fromDate;
  this.filter.toDate = selecteddata.toDate;
  this.sharedService.loading=true;
  this.ratesMasterNewList();
  this.sharedService.loading=false;
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}
}


