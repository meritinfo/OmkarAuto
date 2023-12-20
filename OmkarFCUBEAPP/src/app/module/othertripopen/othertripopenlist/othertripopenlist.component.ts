import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Tripsheetlistmodel } from 'src/app/models/tripsheetlistmodel';
import { Tripsheetmodel } from 'src/app/models/tripsheetmodel';
import { TripSheetService } from 'src/app/services/tripsheet.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Typesheetfiltermodel } from 'src/app/models/typesheetfiltermodel.model';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-othertripopenlist',
  templateUrl: './othertripopenlist.component.html',
  styleUrls: ['./othertripopenlist.component.css']
})
export class OthertripopenlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  allOtherTripOpenList: Tripsheetlistmodel = new Tripsheetlistmodel();
  filter: Typesheetfiltermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'tripNo',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    branch: '',
    vehicle: ''
  }
  branchList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  formFilter!: FormGroup;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  constructor(private formBuilder: FormBuilder, private tripSheetService: TripSheetService, 
    private route: Router, private sharedService: SharedService,
    private commonService: CommonService) {

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

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = 'tripNo';
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.filter.search = dataTablesParameters.search.value;
        this.filter.fromDate = this.formFilter.value.fromDate;
        this.filter.toDate = this.formFilter.value.toDate;
        this.filter.branch = "";
        this.filter.vehicle = "";
        this.tripSheetService.getOtherTripOpenList(this.filter)
          .subscribe(resp => {
            this.allOtherTripOpenList = resp;
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
          title: 'Branch',
          data: 'tripBrName',
        },
        {
          title: 'Trip Date',
          data: 'newTripDate',
        },
        {
          title: 'Vehicle No',
          data: 'vehicleNo',
        },
        {
          title: 'Trip No',
          data: 'tripNo',
        },
        {
          title: 'Action',
          data: 'tripId',
        },
      ],
    };

  }

  //Open new gst purchase add screen
  othertripopenAdd(): void {
    this.route.navigate(['/othertripopenadd']);
  }

  //Open user details screen
  getothertripopenDetails(tripsheet: Tripsheetmodel): void {
    this.tripSheetService.setTripSheetDetails(tripsheet);
    this.route.navigate(['/othertripopenedit']);
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  search(): void {
    debugger;
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.filter.branch = this.formFilter.value.branch === '0' ? '' : this.formFilter.value.branch;
    this.filter.vehicle = '';
    this.tripSheetService.getOtherTripOpenList(this.filter)
      .subscribe(resp => {
        this.allOtherTripOpenList = resp;
      });
  }


}
