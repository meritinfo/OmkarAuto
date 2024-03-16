import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tripsheetlistmodel } from 'src/app/models/tripsheetlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { SharedService } from 'src/app/services/shared.service';
import { Tripsheetmodel } from 'src/app/models/tripsheetmodel';
import { TripSheetService } from 'src/app/services/tripsheet.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Typesheetfiltermodel } from 'src/app/models/typesheetfiltermodel.model';


@Component({
  selector: 'app-tripsheetlist',
  templateUrl: './tripsheetlist.component.html',
  styleUrls: ['./tripsheetlist.component.css']
})

export class TripsheetlistComponent {
  dtOptions: DataTables.Settings = {};
  allTripSheetTypes: Tripsheetlistmodel = new Tripsheetlistmodel();
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
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  formFilter!: FormGroup;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  tsfromDate: string = '';
  tstoDate: string = '';
  tsbranch: string = '';
  tsvehicle: string = '';
  

  constructor(private formBuilder: FormBuilder, private tripSheetService: TripSheetService, private route: Router, private sharedService: SharedService, private commonService: CommonService) {

  }

  ngOnInit(): void {
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var fromdatedata = sessionStorage.getItem('tsfromDate')?.toString();
    if (typeof fromdatedata !== 'undefined' && fromdatedata !== null && fromdatedata !== '') {
      this.tsfromDate = fromdatedata;
    }
    var todatedata = sessionStorage.getItem('tstoDate')?.toString();
    if (typeof todatedata !== 'undefined' && todatedata !== null && todatedata !== '') {
      this.tstoDate = todatedata;
    }
    var branchdata = sessionStorage.getItem('tsbranch')?.toString();
    if (typeof branchdata !== 'undefined' && branchdata !== null && branchdata !== '') {
      this.tsbranch = branchdata;
    }
    var vehicledata = sessionStorage.getItem('tsvehicle')?.toString();
    if (typeof vehicledata !== 'undefined' && vehicledata !== null && vehicledata !== '') {
      this.tsvehicle = vehicledata;
    }
      
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 1);
    this.fromDate = today.toLocaleDateString('en-CA').toString();

    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();

    this.tripSheetService.clearTripSheetDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      branch: new FormControl('0',),
      vehicle: new FormControl('',)
    });

    this.getBranchList();
    this.getVehicleNoList();

    if(this.tsfromDate!=""){
      this.formFilter.patchValue({
        fromDate:  this.tsfromDate
      });
    }
    if(this.tstoDate!=""){
      this.formFilter.patchValue({
        toDate:  this.tstoDate
      });
    }
    if(this.tsbranch!=""){
      this.formFilter.patchValue({
        branch:  this.tsbranch
      });
    }
    this.filter.vehicle ="";
    setTimeout(() => {
    if(this.tsvehicle!=""){
      this.formFilter.patchValue({
        vehicle: this.vehicleList.find(e => e.dataId == this.tsvehicle),
      });
      this.filter.vehicle =this.tsvehicle;
    }
    this.search();
    
  }, 2000);
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.filter.branch = this.formFilter.value.branch=== '0' ? '' : this.formFilter.value.branch;
   
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
        this.filter.search = dataTablesParameters.search.value;
        this.tripSheetService.getTripSheetList(this.filter)
          .subscribe(resp => {
            this.allTripSheetTypes = resp;
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
          title: 'Vehicle No',
          data: 'vehicleNo',
        },

        {
          title: 'Trip Date',
          data: 'newTripDate',
        },
        {
          title: 'Trip No',
          data: 'tripNo',
        },
        {
          title: 'From',
          data: 'frPlace',
        },

        {
          title: 'To',
          data: 'tPlace',
        },
        {
          title: 'Expected UL. Dt.',
          data: 'expectedReportingDt',
        },
        {
          title: 'Driver',
          data: 'drName',
        },
        {
          title: 'Trip Close Date',
          data: 'tripCloseDt',
        },
        {
          title: 'LinkYN',
          data: 'tripLinkYN',
        },
        {
          title: 'Action',
          data: 'tripId',
        },
      ],
    };
    this.sharedService.loading = false;
  }
  //Open new gst purchase add screen
  tripsheetAdd(): void {
    this.route.navigate(['/tripsheetadd']);
  }

  //Open user details screen
  gettripSheetDetails(tripsheet: Tripsheetmodel): void {
    this.tripSheetService.setTripSheetDetails(tripsheet);
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.filter.branch = this.formFilter.value.branch === '0' ? '' : this.formFilter.value.branch;
    this.filter.vehicle = this.formFilter.value.vehicle === "" ? '' : this.formFilter.value.vehicle.dataId;
 
    sessionStorage.setItem("tsfromDate", this.filter.fromDate);
    sessionStorage.setItem("tstoDate",  this.filter.toDate);
    sessionStorage.setItem("tsbranch", this.formFilter.value.branch);
    sessionStorage.setItem("tsvehicle", this.filter.vehicle);
    this.route.navigate(['/tripsheetedit']);
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleNoList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  selectEvent(item: any) {
    // do something with selected item
  }

  onFocused(e: any) {
    // do something
  }

  onChangeSearch(search: string) {
  }

  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  search(): void {

    
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.filter.branch = this.formFilter.value.branch === '0' ? '' : this.formFilter.value.branch;
    this.filter.vehicle = this.formFilter.value.vehicle === "" ? '' : this.formFilter.value.vehicle.dataId;
    this.tripSheetService.getTripSheetList(this.filter)
      .subscribe(resp => {
        this.allTripSheetTypes = resp;
      });
  }

  getCurrentFiscalYear(date: string) {
    var dates = {
      'sDate': new Date(),
      'eDate': new Date()
    };
    var docDate = new Date(date);
    var month = docDate.getMonth();
    if (month > 3) {
      dates.sDate = new Date(docDate.getFullYear(), 3, 1);
      dates.eDate = new Date(dates.sDate.getFullYear() + 1, dates.sDate.getMonth() - 1, 31);
    }
    else {
      dates.sDate = new Date(docDate.getFullYear() - 1, 3, 1);
      dates.eDate = new Date(docDate.getFullYear(), dates.sDate.getMonth() - 1, 31);
    }
    return dates;
  }

}
