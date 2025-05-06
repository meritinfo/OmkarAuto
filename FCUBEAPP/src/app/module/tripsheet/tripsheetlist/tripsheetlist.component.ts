import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Tripsheetlistmodel } from 'src/app/models/tripsheetlistmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Tripsheetmodel } from 'src/app/models/tripsheetmodel';
import { TripSheetService } from 'src/app/services/tripsheet.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tripsheetlist',
  templateUrl: './tripsheetlist.component.html',
  styleUrls: ['./tripsheetlist.component.css']
})

export class TripsheetlistComponent {
  dtOptions: DataTables.Settings = {};
  allTripSheetTypes: Tripsheetlistmodel = new Tripsheetlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr: '',
    filterStr1: '',
    filterStr2:'',
    filterStr3:''
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
  request= new Requestmodel();

  tsfromDate: string = '';
  tstoDate: string = '';
  tsbranch: string = '';
  tsvehicle: string = '';
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  

  constructor(private formBuilder: FormBuilder, private tripSheetService: TripSheetService, 
    private route: Router, private sharedService: SharedService, 
    private toasterService: ToastrService,private commonService: CommonService) {

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
      
      
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;




    this.tripSheetService.clearTripSheetDetails();

    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      branch: new FormControl(''),
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
    this.filter.filterStr1 ="";
    setTimeout(() => {
    if(this.tsvehicle!=""){
      this.formFilter.patchValue({
        vehicle: this.vehicleList.find(e => e.dataId == this.tsvehicle),
      });
      this.filter.filterStr1 =this.tsvehicle;
    }
    this.search();
    
  }, 2000);
  
  var selectData =  this.formFilter.getRawValue();
  this.filter.fromDate = selectData.fromDate;
  this.filter.toDate = selectData.toDate;
  this.getTripMaster();
}

getTripMaster(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
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
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.tripSheetService.getTripSheetList(this.filter).subscribe(resp => {
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
          title: 'Action',
          data: 'tripId',
        },
        {
          title: 'Trip Print',
          data: 'tripId',
        },
        {
          title: 'Trip Branch',
          data: 'tripBr',
        },
        {
          title: 'Vehicle No',
          data: 'vehicleNo',
        },

        {
          title: 'Stmt Date',
          data: 'stmtDate',
        },
        {
          title: 'Trip No',
          data: 'tripNo',
        },
        {
          title: 'Dept Date',
          data: 'deptDate',
        },
        {
          title: 'End Date',
          data: 'endDate',
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
          title: 'Link YN',
          data: 'tripLinkYN',
        },
       
       
      ],
    };
    this.sharedService.loading = false;
  }
  
  tripsheetAdd(): void {
    this.route.navigate(['/tripsheetjetadd']);
  }
  
  gettripSheetDetails(tripsheet: Tripsheetmodel): void {
    this.tripSheetService.setTripSheetDetails(tripsheet);

    var selectData =  this.formFilter.getRawValue();
    this.filter.fromDate = selectData.fromDate;
    this.filter.toDate = selectData.toDate;
    this.filter.filterStr = selectData.branch;
    this.filter.filterStr1 = selectData.vehicle? selectData.vehicle.dataId:'';
 
    sessionStorage.setItem("tsfromDate", this.filter.fromDate);
    sessionStorage.setItem("tstoDate",  this.filter.toDate);
    sessionStorage.setItem("tsbranch", this.filter.filterStr);
    sessionStorage.setItem("tsvehicle", this.filter.filterStr1);
    this.route.navigate(['/tripsheetjetedit']);
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
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
    var selectData =  this.formFilter.getRawValue();
    this.filter.fromDate = selectData.fromDate;
    this.filter.toDate = selectData.toDate;
    this.filter.filterStr = selectData.branch;
    this.filter.filterStr1 = selectData.vehicle? selectData.vehicle.dataId:'';
    this.getTripMaster();

     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload(); 
    });
  }

  download(tripsheet: Tripsheetmodel){
    this.request.strRequest = tripsheet.tripId;
    this.tripSheetService.getTripJetPrintPdf(this.request).subscribe(resp => {
      if(resp.status){    
        let link = document.createElement("a");
        link.download = "TripPrint_" + new Date().getTime() + '.pdf';
        link.href = "assets/reports/tripprint/" + resp.message;
        link.click();
        window.open(link.href, "_blank");
      }
      else{        
        this.toasterService.warning(resp.message);   
      }
    });
  }

}
