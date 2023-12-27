import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';



import { Filtermodel } from 'src/app/models/filtermodel';
import { Consignmentlistmodel  } from 'src/app/models/consignmentlistmodel';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConsignmentService } from 'src/app/services/consignment.service';

import { CommonService } from 'src/app/services/common.service';
import { Typesheetfiltermodel } from 'src/app/models/typesheetfiltermodel.model';

@Component({
  selector: 'app-consignmentlist',
  templateUrl: './consignmentlist.component.html',
  styleUrls: ['./consignmentlist.component.css']
})
export class ConsignmentlistComponent implements OnInit  {

  loggedInUserID: string = '';
  dtOptions: DataTables.Settings = {};
  allConsignment: Consignmentlistmodel = new Consignmentlistmodel();
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
  keywordLocation = 'dataName';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  constructor(private formBuilder: FormBuilder,private consignmentService: ConsignmentService, private route: Router,private commonService: CommonService,) {
  }

  ngOnInit(): void {
    

    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
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


    this.consignmentService.clearConsignmentDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      branch: new FormControl('0',),
      vehicle: new FormControl('',)
    });
    this.getBranchList();
    this.getVehicleNoList();
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
        this.filter.vehicle = "";

       this.consignmentService.getConsignmentList(this.filter)
          .subscribe(resp => {
           this.allConsignment = resp;
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
            title: 'Booked At',
            data: 'bookedAt',
          },
          {
            title: 'Booking Date',
            data: 'bookingDate',
          },
  
         {
          title: 'LR No',
          data: 'gcNoteNo',
        },
       
        {
          title: 'From/Origin',
          data: 'fPlace',
        },
        {
          title: 'To/Dest',
          data: 'tPlace',
        },
        {
          title: 'Vehicle No',
          data: 'vehicleNo',
        },
      
      
      
        {
          title: 'Action',
          data: 'consignmentID',
        },
      ],
    };
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
    this.filter.vehicle = this.formFilter.value.vehicle === "" ? '' : this.formFilter.value.vehicle.dataId;
    this.consignmentService.getConsignmentList(this.filter)
      .subscribe(resp => {
        this.allConsignment = resp;
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
  
  
  getVehicleNoList(): void {
    this.commonService.getVehicleNoList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
  onChangeSearch(search: string) {
  }
  
  //Open new user add screen
  consignmentAdd(): void {
    this.route.navigate(['/consignmentadd']);
  }
  getConsignmentDetails(Consignment: Consignmentmodel): void {
    this.consignmentService.setConsignmentDetails(Consignment);
    this.route.navigate(['/consignmentedit']);
}

}
