import { Component, ViewChild } from '@angular/core';
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
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-distancemastertriplist',
  templateUrl: './distancemastertriplist.component.html',
  styleUrls: ['./distancemastertriplist.component.css']
})
export class DistancemastertriplistComponent {
  allDistanceTripMaster: Distancemastertriplistmodel = new Distancemastertriplistmodel();
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  filter: Typesheetfiltermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'fromLocation',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    branch: '',
    vehicle: ''
  }
  formFilter!: FormGroup;
  locationList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  constructor(private formBuilder: FormBuilder,private sharedService: SharedService,
    private distanceMastertripService: DistancemastertripService,
    private commonService: CommonService, private route: Router) {
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Distance Master - TRIP"));
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

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 10);
    this.fromDate = today.toLocaleDateString('en-CA').toString();
  
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();

    this.distanceMastertripService.clearDistanceMasterTripDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      branch: new FormControl('',),
    });
    
    this.sharedService.loading=true;
    this.getLocationList();
    this.filter.search = '';
    this.distanceTripMasterList();    
    this.sharedService.loading=false;
  }

  distanceTripMasterList(){
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
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.filter.fromDate = this.formFilter.value.fromDate;
        this.filter.toDate = this.formFilter.value.toDate;
        this.filter.search = this.formFilter.value.branch.dataId;
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
          title: 'Action',
          data: 'MasterID',
        },
      ],
    };
  }
   
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
      this.locationList = res;
    });
  }
  
  search(): void {
    this.filter.search = this.formFilter.value.branch;
    this.sharedService.loading=true;
    this.distanceTripMasterList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
  
  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
    
  getDistanceMasterTripDetails(Docrenewal: Distancemastertripmodel): void {
    this.distanceMastertripService.setDistancemastertripDetails(Docrenewal);
    this.route.navigate(['/distancemastertripedit']);
  }

  distanceMasterTripAdd(): void {
    this.route.navigate(['/distancemastertripadd']);
  }
}



