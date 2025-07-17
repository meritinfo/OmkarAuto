
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { Driversalarypaymentmodel } from 'src/app//models/driversalarypaymentmodel';
import { DriversalarypaymentService } from 'src/app/services/driversalarypayment.service';
import { Driversalarylistmodel } from 'src/app/models/driversalarypaymentlist';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-driversalarypmtlist',
  templateUrl: './driversalarypmtlist.component.html',
  styleUrls: ['./driversalarypmtlist.component.css']
})
export class DriversalarypmtlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  year: string = '';
  loginDate: string = '';
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  vehicleList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
    
  alldriver: Driversalarylistmodel = new Driversalarylistmodel();
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
  formFilter!: FormGroup;

  constructor(private driversalarypaymentService: DriversalarypaymentService, 
    private formBuilder: FormBuilder, private commonService: CommonService,
      private toasterService: ToastrService,
    private sharedService: SharedService, private route: Router) {
  }

  ngOnInit(): void {  
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Driver Salary Payment");
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
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
        
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
    }
    
    this.driversalarypaymentService.clearDriverSalaryPaymentDetails();
    this.formFilter = this.formBuilder.group({
      vehicleID: new FormControl(''),
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),
    });

    this.getVehicleIdList();
    this.sharedService.loading=true;
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.filterStr = "";
    this.driversalarypmtlist();
    this.sharedService.loading=false;
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }  
  
  onFocused(e: any) {
    // do something
  }
  
  startWithFilter = function (partyList: Dropdownmodel[], query: string): any[] {
    return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
  
  driversalarypmtlist(){
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
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      // this.filter.search = '';      
      callback({
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      });
      this.sharedService.loading = true;
      this.driversalarypaymentService.getDriverSalaryPaymentList(this.filter).subscribe(resp => {
         this.alldriver = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });  
        this.sharedService.loading = false;
      },
       // Set column title and data field
       columns: [  
        {
          title: 'Action',
          data: 'masterid ',
        },   
        {
          title: 'Branch',
          data: 'branch',
        },
        {
          title: 'Salary Date ',
          data: 'salaryDate ',
        },
        {
          title: 'Driver ',
          data: 'driver',
        },
        {
          title: 'Vehicle ',
          data: 'vehicle',
        },       
       
      ],
    };
  }
  
  //Open new driver master add screen
  driversalarypmtadd(): void {
    this.route.navigate(['/drsalpmtadd']);
  }

  getVehicleIdList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  //Open user details screen
  getdriversalarypmtDetails(finact: Driversalarypaymentmodel): void {
    this.driversalarypaymentService.setDriverSalaryDetails(finact);
    this.route.navigate(['/drsalpmtedit']);
  }

 
  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    let frmdt = new Date(selecteddata.fromDate);
    let todt = new Date(selecteddata.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toasterService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.filterStr = selecteddata.vehicleID.dataId;
    this.filter.sortOrder = this.branch;
    
    this.sharedService.loading=true;
    this.driversalarypmtlist();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}

