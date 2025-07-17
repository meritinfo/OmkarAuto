
import { Component, ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Driversalarypaymentmodel } from 'src/app//models/driversalarypaymentmodel';
import { CommonService } from 'src/app/services/common.service';
import { Driversalaryentrymodel } from 'src/app//models/driversalaryentrymodel';
import { DriverSalaryEntryService } from 'src/app/services/driversalaryentry.service';
import { Driversalaryentrylistmodel } from 'src/app/models/driversalaryentrylist';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-driversalaryentryadd',
  templateUrl: './driversalaryentryadd.component.html',
  styleUrls: ['./driversalaryentryadd.component.css']
})
export class DriversalaryentryaddComponent {
   loggedInUserID: string = '';
    userlogindate:string="";
    formSalary!: FormGroup;
    formSubmitted = false;
    keywordLocation = 'dataName';
    editMode = false;
    createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false; 
  dashboard: string ="";
    maxDate: string = '';
    loginDate: string = '';
    year: string = '';
    branch: string = '';
    minDate: string = '';
    fromDate: string = '';
  
    responseDetails = new Responsemodel();
    accountTypeList: Dropdownmodel[] = [];
    branchList: Dropdownmodel[] = [];
    driverList: Dropdownmodel[] = [];
    rechargeList: Dropdownmodel[] = [];
    creditAcList: Dropdownmodel[] = [];
    subAccountTypeList: Dropdownmodel[] = []; 
    vehicleList: Dropdownmodel[] = [];
    
    createdBy : string = "";
      modifiedBy: string = "";
     
    ledgerList: Dropdownmodel[] = [];
    statelist: Dropdownmodel[] = [];
  
    selectedDriversalaryentryDetails = new Driversalaryentrymodel();
  
    constructor(private route: Router, private formBuilder: FormBuilder, 
      private driversalaryentrymodel: Driversalaryentrymodel, private sharedService: SharedService,
      private driverSalaryEntryService: DriverSalaryEntryService,
      private commonService: CommonService, private requestmodel:Requestmodel,
      private toasterService: ToastrService) {
        this.driversalaryentrymodel = new Driversalaryentrymodel();

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

    
      this.sharedService.loggedInStatus = true;
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
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;

    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    
     this.formSalary = this.formBuilder.group({    
      transBranch: new FormControl(this.branch,[Validators.required]),
      transDate: new FormControl(this.loginDate,[Validators.required]),
      driverId: new FormControl('',[Validators.required]),
      salFromDate: new FormControl('',[Validators.required]),
      salToDate: new FormControl('',[Validators.required]),
      noOfDays: new FormControl('',[Validators.required]),
      grossSalary: new FormControl('',[Validators.required]),
      lopDeduction: new FormControl('',[Validators.required]),
      PfDeduction: new FormControl('',[Validators.required]),
      esiDeduction: new FormControl('',[Validators.required]),
      othDeduction: new FormControl('',[Validators.required]),
      netSalary: new FormControl('',[Validators.required]),
      PmtType: new FormControl('',[Validators.required]),
      remarks: new FormControl('',[Validators.required]),
      CreditAc: new FormControl('',[Validators.required]),
      neftYN: new FormControl('',[Validators.required]),
      
       chequeNo: new FormControl('',),
        chequeDt: new FormControl('',),
    });    

    this.selectedDriversalaryentryDetails = this.driverSalaryEntryService.getDriverSalaryEntryDetails(); 
    // this.getVehicleIdList();
     this.getDriverList(); 
     this.getBranchList();  

    // this.formSalary.controls["branchCode"].disable();
    // this.formSalary.controls["totalSalary"].disable(); 
    // this.formSalary.controls["salDays"].disable(); 
     

    if (this.selectedDriversalaryentryDetails.transid != '') {      
      this.getCreditAcList(this.selectedDriversalaryentryDetails.pmtType);  
    }    
     setTimeout(() => {  
      if (this.selectedDriversalaryentryDetails.transid != '') {
        this.formSalary.patchValue(this.selectedDriversalaryentryDetails);   
        this.editMode=true;  
       // this.createdBy = this.selectedDriversalaryentryDetails.createdBy + " " + this.selectedDriversalarypaymentDetails.createdDate;
       // this.modifiedBy = this.selectedDriversalarypaymentDetails.modifiedBy + " " + this.selectedDriversalarypaymentDetails.modifiedDate;   
        // this.formSalary.controls["salaryFromDt"].disable();
        // this.formSalary.controls["creditAc"].disable();
        // this.formSalary.controls["salaryToDt"].disable();
        // this.formSalary.controls["vehicleId"].disable();
        this.formSalary.patchValue({
          transDate : this.commonService.formatDate(this.selectedDriversalaryentryDetails.transDate),
          salFromDate : this.commonService.formatDate(this.selectedDriversalaryentryDetails.salFromDate),
          salToDate : this.commonService.formatDate(this.selectedDriversalaryentryDetails.salToDate),
          //vehicleId: this.vehicleList.find(e => e.dataId == this.selectedDriversalaryentryDetails.vehicleId),
        });  
      }
    }, 2000);
    
    this.sharedService.loading = false;
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formSalary.controls; }
  
  getDriverList(): void {
    this.commonService.getDriverList().subscribe((res) => {
      this.driverList = res;
    });
  }

  getVehicleIdList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

    
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getCreditAcList(pmttp:string): void {
    this.requestmodel.strRequest= pmttp;
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditAcList = res;
    });    
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

  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().includes(query.toLowerCase()));
  };
  
  changePmtType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;  
    this.getCreditAcList(selectedValue);
  }

  getSalCal() {
    var totalamt = 0;
    var selectedval = this.formSalary.getRawValue();
    var fsp= selectedval.salPerDay  ? parseFloat(selectedval.salPerDay ) : 0
    var fsd = selectedval.salDays  ? parseFloat(selectedval.salDays ) : 0

    totalamt = fsp*fsd;
    this.formSalary.patchValue({  
      totalSalary: totalamt.toFixed(2)     
    });    
  }

  exit(): void {
    this.route.navigate(['/drsalpmt']);
  }

  deleteDriversalaryentryForm(): void {
    if(this.selectedDriversalaryentryDetails.transid  != '' ){
      this.requestmodel.strRequest =this.selectedDriversalaryentryDetails.transid 
        if (confirm("Are you sure, you want to delete this?")) {
          this.driverSalaryEntryService.driverSalaryEntryDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status){              
            console.log(this.responseDetails.message);
            this.formSalary.reset();
            this.route.navigate(['/drsalpmt']);
          } 
          else{
            console.log(this.responseDetails.message);  
            this.toasterService.warning(this.responseDetails.message);  
            return; 
          }   
        });
      }
    }
  }
  submitDriversalaryEntryForm(): void {
    if (this.formSalary.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formSalary.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }          
      return;
    }
    var selectedDataValue = this.formSalary.getRawValue();
    const d3 = this.minDate?Date.parse(this.minDate):0;
    const d2 = this.maxDate?Date.parse(this.maxDate):0;
    const d4 = selectedDataValue.salaryDate?Date.parse(selectedDataValue.salaryDate):0;
    if (d3>d4 || d2<d4 ) {
      this.formSalary.patchValue({
        salaryDate: ''
      });
      this.toasterService.warning("Invalid Salary Date");
      return
    }
  
    this.sharedService.loading = true;
    this.formSubmitted = true;

    this.driversalaryentrymodel.transid  = this.selectedDriversalaryentryDetails.transid;
    this.driversalaryentrymodel.transBranch = selectedDataValue.transBranch;
    this.driversalaryentrymodel.transDate = selectedDataValue.transDate;
    this.driversalaryentrymodel.driverId = selectedDataValue.driverId.toString();    
    this.driversalaryentrymodel.salFromDate = selectedDataValue.salFromDate;
    this.driversalaryentrymodel.salToDate = selectedDataValue.salToDate;
    this.driversalaryentrymodel.noOfDays = selectedDataValue.noOfDays;
    this.driversalaryentrymodel.grossSalary = selectedDataValue.grossSalary.toString();    
    this.driversalaryentrymodel.lopDeduction = selectedDataValue.salPerDay.toString();    
    this.driversalaryentrymodel.pfDeduction  = selectedDataValue.PfDeduction.toString(); 
    this.driversalaryentrymodel.esiDeduction  = selectedDataValue.esiDeduction.toString(); 
    this.driversalaryentrymodel.othDeduction   = selectedDataValue.othDeduction.toString();   
    this.driversalaryentrymodel.netSalary   = selectedDataValue.netSalary.toString();  
    this.driversalaryentrymodel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.driversalaryentrymodel.pmtType = selectedDataValue.pmtType.toString().toUpperCase();
    this.driversalaryentrymodel.creditAc = selectedDataValue.creditAc.toString();  
    this.driversalaryentrymodel.neftYN = selectedDataValue.neftYN.toString();   
    this.driversalaryentrymodel.chequeNo  = selectedDataValue.chequeNo.toString(); 
    this.driversalaryentrymodel.chequeDt  = selectedDataValue.chequeDt;
  
    this.driversalaryentrymodel.loggedInUser   = this.loggedInUserID;

    this.driverSalaryEntryService.driverSalaryEntrySubmitted(this.driversalaryentrymodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formSalary.reset();
        this.route.navigate(['/drsalpmt']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    this.sharedService.loading = false;
  }
  
}
