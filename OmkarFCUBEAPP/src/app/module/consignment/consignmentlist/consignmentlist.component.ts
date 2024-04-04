import { Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Consignmentlistmodel  } from 'src/app/models/consignmentlistmodel';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { CommonService } from 'src/app/services/common.service';
import { Typesheetfiltermodel } from 'src/app/models/typesheetfiltermodel.model';
import { DataTableDirective } from 'angular-datatables';

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
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(private formBuilder: FormBuilder,private consignmentService: ConsignmentService,
     private route: Router,private commonService: CommonService,) {
  }

  ngOnInit(): void {
   
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Consignment/LR Entry"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

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

    var selectedDataVal = this.formFilter.getRawValue();
    this.filter.fromDate = selectedDataVal.fromDate;
    this.filter.toDate = selectedDataVal.toDate;
    this.filter.branch = selectedDataVal.branch;
    this.filter.vehicle = selectedDataVal.vehicle?selectedDataVal.vehicle.dataId:"";

    this.getConsignmentList();
  }

  getConsignmentList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,      
      searching:false,
      ajax: (dataTablesParameters: any, callback) => {
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;

        this.consignmentService.getConsignmentList(this.filter).subscribe(resp => {
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
  
  getVehicleNoList(): void {
    this.commonService.getVehicleNoList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  
  onFocused(e: any) {
    // do something
  }
  
  onChangeSearch(search: string) {
  }
  
  selectEvent(item: any) {
    // do something with selected item
  }
  
  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
  
  consignmentAdd(): void {
    this.route.navigate(['/consignmentadd']);
  }

  getConsignmentDetails(Consignment: Consignmentmodel): void {
    this.consignmentService.setConsignmentDetails(Consignment);
    this.route.navigate(['/consignmentedit']);
  }

  search(): void {
    debugger;
    var selectedDataVal = this.formFilter.getRawValue();
    this.filter.fromDate = selectedDataVal.fromDate;
    this.filter.toDate = selectedDataVal.toDate;
    this.filter.branch = selectedDataVal.branch;
    this.filter.vehicle =  selectedDataVal.vehicle?selectedDataVal.vehicle.dataId:"";
     this.getConsignmentList();
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload(); 
     });
  }
  

}
