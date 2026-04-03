

import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Lrbillserieslistmodel  } from 'src/app/models/lrbillserieslistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Lrbillseriesmodel } from 'src/app/models/lrbillseriesmodel';
import { LRBillSeriesService } from 'src/app/services/lrbillseries.service';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-lrbillserieslist',
  templateUrl: './lrbillserieslist.component.html',
  styleUrls: ['./lrbillserieslist.component.css']
})
export class LrbillserieslistComponent {
   dtOptions: DataTables.Settings = {};
   allLRBillSeries: Lrbillserieslistmodel = new Lrbillserieslistmodel();
   filter: Reportmodel = {
     pageNumber: 1,
     pageSize: 10,
     sortColumn: 'brandname',
     sortOrder: 'asc',
     search: '',
     fromDate: '',
     toDate: '',
     filterStr : "",
     filterStr1: "",
     filterStr2:  "",
     filterStr3:  "",  
 
 }
 formFilter!: FormGroup;
 branchList: Dropdownmodel[] = [];
 vehicleList: Dropdownmodel[] = [];
  
 keywordLocation = 'dataName';
 year: string = '';
 loginDate: string = '';
 fromDate: string = '';
 maxDate: string = '';
 minDate: string = '';
 editMode = false;
 createStatus = false;
 editStatus = false;
 deleteStatus = false;
  
 viewStatus = false; 
dashboard: string ="";
 createmode = false;
 @ViewChild(DataTableDirective)
 dtElement!: DataTableDirective;
constructor( private formBuilder: FormBuilder,private lrbillseriesService: LRBillSeriesService, private commonService: CommonService, private route: Router) {
}

ngOnInit(): void {
  
      
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((( aa: { menuName: string; }) => aa.menuName === "LR Bill Series Master"));
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



  this.lrbillseriesService.clearLrbillSeriesDetails();
  this.formFilter = this.formBuilder.group({
    fromDate: new FormControl(this.fromDate,),
    toDate: new FormControl(this.loginDate,),
   // branch: new FormControl('',),
   branchCode: new FormControl('',),
   lR_Bill_type: new FormControl('',)
  });
 this.getBranchList();
 // this.getVehicleNoList();

  var selectedData = this.formFilter.getRawValue();
  this.filter.fromDate = selectedData.fromDate;
  this.filter.toDate = selectedData.toDate;
  this.filter.filterStr = "";
  this.filter.filterStr1 =  "";
  this.lrBillSeriesList();
}
lrBillSeriesList(){
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
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      callback({
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      });
      this.lrbillseriesService.getLrbillseriesList(this.filter).subscribe(resp => {
        this.allLRBillSeries = resp;
        callback({
          recordsTotal: resp.pageMetaData.totalCount,
          recordsFiltered: resp.pageMetaData.totalCount,
          data: []
        });
      });
    },

      // Set column title and data field
    columns: [ 
      {
        title: 'Action',
        data: 'seriesId',
      },   
      {
        title: 'Series Code ',
        data: 'seriesCode',
      },

     {
      title: 'Lr Bill Type',
      data: 'type',
    },
    {
      title: 'Branch',
      data: 'branch',
    },
   
  
  
   
    ],
  };
}
startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
  return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
};

selectEvent(item: any) {
  // do something with selected item
}

onFocused(e: any) {
  // do something
}


//Open new destination add screen
addLrBillSeries(): void {
this.route.navigate(['/addlrbillseries']);
}

getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}


//Open user details screen
getLrBillSeriesDetails(Destination: Lrbillseriesmodel): void {
this.lrbillseriesService.setLrBillSeriesDetails(Destination);
this.route.navigate(['/lrbillseriesedit']);
}
search(): void {
  var selectedData = this.formFilter.getRawValue();
 
  this.filter.fromDate = selectedData.fromDate;
  this.filter.toDate = selectedData.toDate;
  this.filter.filterStr1 = selectedData.branchCode;
  this.filter.filterStr =  selectedData.lR_Bill_type;

  this.lrBillSeriesList();
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload(); 
  });
}


}






