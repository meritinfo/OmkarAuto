import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { Filtermodel } from 'src/app/models/filtermodel';
import { Distancemasterfreightlistmodel  } from 'src/app/models/distancemasterfreightlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Distancemasterfreightmodel } from 'src/app/models/distancemasterfreightmodel';
import{ DistancemasterfreightmasterService } from 'src/app/services/distancemasterfreightmaster.service';
import { Typesheetfiltermodel } from 'src/app/models/typesheetfiltermodel.model';

@Component({
  selector: 'app-distancemasterfreightlist',
  templateUrl: './distancemasterfreightlist.component.html',
  styleUrls: ['./distancemasterfreightlist.component.css']
})
export class DistancemasterfreightlistComponent {
  dtOptions: DataTables.Settings = {};
  allDistanceFreightMaster: Distancemasterfreightlistmodel = new Distancemasterfreightlistmodel();
  filter: Typesheetfiltermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    branch: '',
    vehicle: ''
  }
  formFilter!: FormGroup;
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  allLocationList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
constructor(private formBuilder: FormBuilder,private distancemasterfreightmasterService: DistancemasterfreightmasterService, private commonService: CommonService,private route: Router)  {
  }
  
ngOnInit(): void {
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }
  this.distancemasterfreightmasterService.clearDistanceMasterFreightDetails();
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  today.setMonth(month - 1);
  this.fromDate = today.toLocaleDateString('en-CA').toString();

  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = new Date().toLocaleDateString('en-CA').toString();


  this.formFilter = this.formBuilder.group({
    fromDate: new FormControl(this.fromDate,),
    toDate: new FormControl(this.loginDate,),
    branch: new FormControl('0',),
   // vehicle: new FormControl('',)
  });
  this. getLocationList();
  this.getBranchList();
  
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      this.filter.search = dataTablesParameters.search.value;
      this.filter.fromDate = this.formFilter.value.fromDate;
      this.filter.toDate = this.formFilter.value.toDate;
      this.filter.branch = "";
      //this.filter.vehicle = "";

      this.distancemasterfreightmasterService.getDistanceMasterFreightList(this.filter)
        .subscribe(resp => {
         this.allDistanceFreightMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [
      

      {
        title: 'ValidFrom ',
        data: 'validFrom',
      },

     {
      title: 'ValidUpto ',
      data: 'validUpto',
    },
    {
      title: 'FromPoint ',
      data: 'fromPoint',
    },
   
   
  
  
    {
      title: 'Action',
      data: 'MasterID',
    },
   
  ],
};
}
getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}
onChangeSearch(search: string) {
}
getLocationList(): void {
  this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
    this.locationList = res;
    this.allLocationList = res;
  });
}
search(): void {
  debugger;
  this.filter.fromDate = this.formFilter.value.fromDate;
  this.filter.toDate = this.formFilter.value.toDate;
  this.filter.branch = this.formFilter.value.branch === '0' ? '' : this.formFilter.value.branch.dataId;
 // this.filter.vehicle = this.formFilter.value.vehicle === "" ? '' : this.formFilter.value.vehicle.dataId;
  this.distancemasterfreightmasterService.getDistanceMasterFreightList(this.filter)
    .subscribe(resp => {
      this.allDistanceFreightMaster = resp;
    });
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



//Open user details screen
getDistanceMasterFreightDetails(Docrenewal: Distancemasterfreightmodel): void {
this.distancemasterfreightmasterService.setDistancemasterfreightDetails(Docrenewal);
this.route.navigate(['/distancemasterfreightedit']);
}
getVehicleNoList(): void {
  this.commonService.getVehicleNoList().subscribe((res) => {
    this.vehicleList = res;
  });
}



  
  //Open new driver master add screen
  distanceMasterFreightAdd(): void {
    this.route.navigate(['/distancemasterfreightadd']);
  }
}
