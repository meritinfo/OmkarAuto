import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { FleetreportsService } from 'src/app/services/fleetreports.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehiclesummmonthlyrpt',
  templateUrl: './vehiclesummmonthlyrpt.component.html',
  styleUrls: ['./vehiclesummmonthlyrpt.component.css']
})
export class VehiclesummmonthlyrptComponent {

  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string =""; 

  vehicleList: Dropdownmodel[] = [];
  sparesList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  vehicleFltGrpList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'fromPlace',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3: "",
  }

  formFilter!: FormGroup;
  userSubmitted = false;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';
  responseDetails = new Responsemodel();
  rptType= false;

  constructor(private fleetreportsService: FleetreportsService, 
    private excelService: ExcelService,private toastrService:ToastrService,
    private formBuilder: FormBuilder,  private sharedService: SharedService,
    private commonService: CommonService, 
    private route: Router) {
  }

  ngOnInit(): void {     
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Vehicle Summary Report");
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
    
      this.sharedService.loggedInStatus = true;
        var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
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


    
     
    this.getVehicleNoList(); 
    this.getBranchList();
    this.getVehicleFltGrpList();
    this.fromDate = this.maxDate.toString().substring(0,7);
    
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl( this.fromDate,[Validators.required]),
      branch: new FormControl('',),
      vehicleTypeGroupId: new FormControl('',),  
      vehicleMasterId: new FormControl('',), 
      rptType: new FormControl('S',), 
    });   
  }
  changerpttype(e:any){
    var rptType = e.target.value;
    if(rptType=="Y"){
      this.formFilter.controls["fromDate"].disable();
    }
    else{
      this.formFilter.controls["fromDate"].enable();
    }
  }
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  getVehicleFltGrpList(): void {
    this.commonService.getVehicleTypeFltGroupList().subscribe((res) => {
      this.vehicleFltGrpList = res;
    });
  }
  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
      
  get f() { return this.formFilter.controls; } 

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().includes(query.toLowerCase()));
  };
  exportExcel(): void {      
    this.userSubmitted = true;
    if (this.formFilter.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields");   
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      }     
      return;
    }
    var selectedDataVal=this.formFilter.getRawValue();
    if(selectedDataVal.rptType=="Y"){
      this.filter.fromDate    = "";
      this.filter.toDate      = ""; 
    }
    else{
      this.filter.fromDate    = selectedDataVal.fromDate;
      this.filter.toDate      = selectedDataVal.fromDate;  
    }
    this.filter.filterStr  = selectedDataVal.branch;
    this.filter.filterStr1  = selectedDataVal.vehicleTypeGroupId;
    this.filter.filterStr2  = selectedDataVal.vehicleMasterId?selectedDataVal.vehicleMasterId.dataId:"";
    var vehtypenm = this.vehicleFltGrpList.find(e => e.dataId == selectedDataVal.vehicleTypeGroupId)
    this.filter.filterStr3  = vehtypenm?vehtypenm.dataName:"";
   
    if(selectedDataVal.rptType=="S"){
      this.fleetreportsService.getVehicleMonthlySummRptExcel(this.filter).subscribe(resp => {      
        if(resp.status){      
          let link = document.createElement("a");
          link.download = "VehicleSummaryReport" + "_" + new Date().getTime() + '.xlsx';
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
    else{
      this.fleetreportsService.getVehicleMonthlyLPRptExcel(this.filter).subscribe(resp => {      
        if(resp.status){      
          let link = document.createElement("a");
          link.download = "VehiclePLReport" + "_" + new Date().getTime() + '.xlsx';
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
  }  
}




