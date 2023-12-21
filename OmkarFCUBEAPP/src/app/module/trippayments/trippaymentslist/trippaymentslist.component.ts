import { Component } from '@angular/core';
import { Router } from '@angular/router';



import { Filtermodel } from 'src/app/models/filtermodel';
import { Trippaymentslistmodel  } from 'src/app/models/trippaymentslistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Trippaymentsmodel } from 'src/app/models/trippaymentsmodel';
import { TripPaymentsService } from 'src/app/services/trippayments.service';
import { CommonService } from 'src/app/services/common.service';
import { Typesheetfiltermodel } from 'src/app/models/typesheetfiltermodel.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-trippaymentslist',
  templateUrl: './trippaymentslist.component.html',
  styleUrls: ['./trippaymentslist.component.css']
})
export class TrippaymentslistComponent {
  dtOptions: DataTables.Settings = {};
  allTripPaymentsTypes: Trippaymentslistmodel = new Trippaymentslistmodel();
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
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  constructor(private formBuilder: FormBuilder,private trippaymentService: TripPaymentsService, private commonService: CommonService, private route: Router) {
  }
  

  ngOnInit(): void {
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
    this.trippaymentService.clearTripPaymentsDetails();
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
      this.trippaymentService.getTripPaymentsList(this.filter)
        .subscribe(resp => {
         this.allTripPaymentsTypes = resp;
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
          title: 'PmtBranch',
          data: 'bName',
        },
        {
          title: 'Date',
          data: 'pmtDate',
        },


       {
        title: 'Vehicle No',
        data: 'vehicleNo',
      },
      {
        title: 'tripNo',
        data: 'tripNo',
      },
      {
        title: 'Trans Type',
        data: 'transType',
      },
      {
        title: 'Amount',
        data: 'amtPaid',
      },



     
    
    
      {
        title: 'Action',
        data: 'pmtId',
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

onChangeSearch(search: string) {
}

  
  //Open new driver master add screen
  trippaymentsAdd(): void {
    this.route.navigate(['/addtrippayments']);
  }
  search(): void {
    debugger;
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.filter.branch = this.formFilter.value.branch === '0' ? '' : this.formFilter.value.branch;
    this.filter.vehicle = this.formFilter.value.vehicle === "" ? '' : this.formFilter.value.vehicle.dataId;
    this.trippaymentService.getTripPaymentsList(this.filter)
      .subscribe(resp => {
        this.allTripPaymentsTypes = resp;
      });
  }
  //Open user details screen
gettrippaymentsDetails(trippayments: Trippaymentsmodel): void {
  this.trippaymentService.setTripPaymentsDetails(trippayments);
  this.route.navigate(['/trippaymentsedit']);
}

}