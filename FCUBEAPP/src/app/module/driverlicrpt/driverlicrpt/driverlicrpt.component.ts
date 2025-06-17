
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Driverlicrptlistmodel  } from 'src/app/models/driverlicrptlistmodel';
import { FreightreportsService } from 'src/app/services/freightreports.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-driverlicrpt',
  templateUrl: './driverlicrpt.component.html',
  styleUrls: ['./driverlicrpt.component.css']
})
export class DriverlicrptComponent {
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string =""; 
  docRenewalList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  driverList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  allDriverLicRptlist: Driverlicrptlistmodel = new Driverlicrptlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'driverName',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:'',

}
formFilter!: FormGroup;
  formSubmitted = false;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';
  responseDetails = new Responsemodel();

  constructor(private driverLicRptService: FreightreportsService, 
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
        .find((aa: { menuName: string; }) => aa.menuName === "Driver License Expiry");
        if (privilegeStatus) {
          this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
          this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
          this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
          this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
        }
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
      
    
      this.formFilter = this.formBuilder.group({
        fromDate: new FormControl(this.loginDate,[Validators.required]),
        toDate: new FormControl(this.loginDate,[Validators.required]),
        tripBranch: new FormControl('',),  
        vehicleMasterID: new FormControl('',),  
        expiryLic: new FormControl('M',),  
        active: new FormControl('',),  
        driverName: new FormControl('',),  
      });
      this.filter.fromDate = this.loginDate;
      this.filter.toDate = this.loginDate;
      this.filter.filterStr   = "";
      this.filter.filterStr1  = "";
  
      this.sharedService.loading=true;
      this.getBranchList();
      this.getDriverList();
      this.getVehicleNoList(); 
      this.getDocRefNoList();   
      this.expDriverLic();
      this.sharedService.loading=false;
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
    getDocRefNoList(): void {
      this.commonService.getDocRefNoList().subscribe((res) => {
        this.docRenewalList = res;
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
    expDriverLic(){
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
            this.filter.sortColumn = 'driverName';
            this.filter.sortOrder = 'asc';
            this.filter.search = '';
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
            this.driverLicRptService.getDriverLicRptList(this.filter).subscribe(resp => {
               this.allDriverLicRptlist = resp;
                callback({
                  recordsTotal: resp.pageMetaData.totalCount,
                  recordsFiltered: resp.pageMetaData.totalCount,
                  data: []
                });
              });
          }, 
          columns: [ 
          {
            title: 'DriverName ',
            data: 'driverName',
          },  
          {
            title: 'FatherName ',
            data: 'fatherName',
          },    
          {
            title: 'DateOfBirth',
            data: 'dateOfBirth',
          },
          {
            title: 'IntroBy ',
            data: 'introBy',
          },       
          {
            title: 'IntroByMobileNo',
            data: 'introByMobileNo',
          },
          {
            title: 'DateOfAppoint',
            data: 'dateOfAppoint',
          },
          {
            title: 'LicenseNo ',
            data: 'licenseNo',
          },
          {
            title: 'LicenseIssuAuth ',
            data: 'licenseIssuAuth',
          },
          {
            title: 'LicValidUpto ',
            data: 'licValidUpto',
          },
       /*    {
             title: 'BloodGroup ',
            data: 'bloodGroup',
          },
          {
            title: 'DriverMobile1 ',
            data: 'driverMobile1',
          },
          {
            title: 'DriverMobile2 ',
            data: 'driverMobile2',
          },
          {
            title: 'TempAddPhone ',
            data: 'tempAddPhone',
          },
          {
            title: 'PermanentAddr ',
            data: 'permanentAddr',
          },
          {
            title: 'PermAddPhone ',
            data: 'permAddPhone',
          },
          {
            title: 'DriverAadharNo ',
            data: 'driverAadharNo',
          },
          {
            title: 'IsActive ',
            data: 'isActive',
          },
        {
            title: 'GroupName ',
            data: 'groupName',
          },
          {
            title: 'DrBankAccountName ',
            data: 'drBankAccountName',
          },
          {
            title: 'BankName ',
            data: 'bankName',
          },
          {
            title: 'BankAcNo ',
            data: 'bankAcNo',
          },
          {
            title: 'BankIfsCode ',
            data: 'bankIfsCode',
          },*/
      
      
      
        ],
      };
    }
    getDriverList(): void {
      this.commonService.getDriverList().subscribe((res) => {
        this.driverList = res;
      });
    }
      
    //Open user details screen
    exportExcel(): void {
      this.formSubmitted = true;
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
      this.driverLicRptService.getDriverLicRptListExcel(this.filter).subscribe(resp => {
        if(resp.status){     
          let link = document.createElement("a");
          link.download = "DriverLic" + "_" + new Date().getTime() + '.xlsx';
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
    search(): void {
      this.formSubmitted = true;
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
      this.filter.filterStr   = selectedDataVal.active;
      this.filter.filterStr1  = selectedDataVal.expiryLic?selectedDataVal.expiryLic:"";
      this.filter.filterStr2  = selectedDataVal.driverName?selectedDataVal.driverName.dataName:"";
      this.sharedService.loading=true;
      this.expDriverLic();
      this.sharedService.loading=false;
      
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    }
  } 
  



