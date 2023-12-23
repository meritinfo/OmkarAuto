import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { Requestmodel } from 'src/app/models/requestmodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Distancemastertriplistmodel } from 'src/app/models/distancemastertriplistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Distancemastertripmodel } from 'src/app/models/distancemastertripmodel';
import { DistancemastertripService } from 'src/app/services/distancemastertrip.service';
import { Typesheetfiltermodel } from 'src/app/models/typesheetfiltermodel.model';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-distancemastertriplist',
  templateUrl: './distancemastertriplist.component.html',
  styleUrls: ['./distancemastertriplist.component.css']
})
export class DistancemastertriplistComponent {
  dtOptions: DataTables.Settings = {};
  allDistanceTripMaster: Distancemastertriplistmodel = new Distancemastertriplistmodel();
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
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

  constructor(private formBuilder: FormBuilder,private distanceMastertripService: DistancemastertripService,private commonService: CommonService, private route: Router) {
  }

  ngOnInit(): void {
    //Privilege check
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.find((item: { menuList: any; }) => item.menuList).menuList.find((aa: { menuName: string; }) => aa.menuName === "Distance Master - TRIP");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    this.distanceMastertripService.clearDistanceMasterTripDetails();
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 1);
    this.fromDate = today.toLocaleDateString('en-CA').toString();
  
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    this.distanceMastertripService.clearDistanceMasterTripDetails();
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
        this.distanceMastertripService.getDistanceMasterTripList(this.filter)
          .subscribe(resp => {
            this.allDistanceTripMaster = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Location Name',
          data: 'locationName',
        },
        {
          title: 'Valid From',
          data: 'validFrom',
        },
        {
          title: 'Valid Upto',
          data: 'validUpto',
        },
        {
          title: '',
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
    this.distanceMastertripService.getDistanceMasterTripList(this.filter)
      .subscribe(resp => {
        this.allDistanceTripMaster = resp;
      });
  }
  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
  selectEvent(item: any) {
    // do something with selected item
  }
  
  //Open new destination add screen



  //Open user details screen

  //Open user details screen
  getDistanceMasterTripDetails(Docrenewal: Distancemastertripmodel): void {
    this.distanceMastertripService.setDistancemastertripDetails(Docrenewal);
    this.route.navigate(['/distancemastertripedit']);
  }
  //Open new driver master add screen
  distanceMasterTripAdd(): void {
    this.route.navigate(['/distancemastertripadd']);
  }
}



