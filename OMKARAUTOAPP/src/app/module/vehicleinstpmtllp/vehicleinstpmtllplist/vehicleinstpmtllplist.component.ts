import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Vehicleinstpmtlistmodel } from 'src/app/models/vehicleinstpmtlistmodel';
import { Vehicleinstpmtmodel } from 'src/app/models/vehicleinstpmtmodel';
import { VehicleInstPmtService } from 'src/app/services/vehicleinstpmt.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vehicleinstpmtllplist',
  templateUrl: './vehicleinstpmtllplist.component.html',
  styleUrls: ['./vehicleinstpmtllplist.component.css']
})
export class VehicleinstpmtllplistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allInstPmtMaster: Vehicleinstpmtlistmodel = new Vehicleinstpmtlistmodel();

  filter: Pagerequestwithdatesmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: '',
    fromDate:'',
    toDate:'',
    strRequest:''
  }
  
  keywordLocation = 'dataName';
  vehicleList : Dropdownmodel[] = [];
  formFilter!: FormGroup;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  year: string = '';
   constructor(private vehicleInstaService: VehicleInstPmtService, private toastrService:ToastrService,
    private commonService: CommonService,private formBuilder: FormBuilder,
    private route: Router) {
  }
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Vehicle EMI Payment"));
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
    
    
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
      
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;

    this.vehicleInstaService.clearVehicleInstPmtDetails();
    
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),
      vehicleMasterId:new FormControl(''),
    });     

    this.getVehicleIdList()
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.search = '';
    this.vehicleInstaService.clearVehicleInstPmtDetails();

    this.vehicleInstList();
  }

  getVehicleIdList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  vehicleInstList(){
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
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        
        this.vehicleInstaService.getVehicleInstPmtList(this.filter).subscribe(resp => {
          this.allInstPmtMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
      },
      columns: [
        {
          title: 'Action',
          data: 'pmtId',
        },     
        {
          title: 'Branch',
          data: 'branch',
        },      
        {
          title: 'Pmt Date',
          data: 'pmtDate',
        },
        {
          title: 'Vehicle No',
          data: 'vehicleNo',
        },
        {
          title: 'Total Amt',
          data: 'totAmt',
        }, 
        {
          title: 'Remarks',
          data: 'remarks',
        }, 
      ],
    };
  }

//Open new user add screen
  AddVehicleInstmaster(): void {
    this.route.navigate(['/emipmtllpadd']);
  }

  //Open user details screen
  vehicleInstDetails(Branch: Vehicleinstpmtmodel): void {
    this.vehicleInstaService.setVehicleInstPmtDetails(Branch);
    this.route.navigate(['/emipmtllpedit']);
  }
  
  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().includes(query.toLowerCase()));
  };

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    
    let frmdt = new Date(selecteddata.fromDate);
    let todt = new Date(selecteddata.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toastrService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;    
    this.filter.search = selecteddata.vehicleMasterId?selecteddata.vehicleMasterId:"";
    this.vehicleInstList();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}


