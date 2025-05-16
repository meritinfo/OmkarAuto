import { Component, ViewChild  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Driversalarypaymentmodel } from 'src/app//models/driversalarypaymentmodel';
import { CommonService } from 'src/app/services/common.service';
import { DriversalarypaymentService } from 'src/app/services/driversalarypayment.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-driversalarypmtadd',
  templateUrl: './driversalarypmtadd.component.html',
  styleUrls: ['./driversalarypmtadd.component.css']
})
export class DriversalarypmtaddComponent {
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

  selectedDriversalarypaymentDetails = new Driversalarypaymentmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private driversalarypaymentmodel: Driversalarypaymentmodel, private sharedService: SharedService,
    private driversalarypaymentService: DriversalarypaymentService,
    private commonService: CommonService, private requestmodel:Requestmodel,
    private toasterService: ToastrService) {
      this.driversalarypaymentmodel = new Driversalarypaymentmodel();
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
      branchCode: new FormControl(this.branch,[Validators.required]),
      salaryDate: new FormControl(this.loginDate,[Validators.required]),
      driverId: new FormControl('',[Validators.required]),
      vehicleId: new FormControl('',[Validators.required]),
      salaryFromDt: new FormControl('',),
      salaryToDt: new FormControl('',[Validators.required]),
      salDays: new FormControl('',[Validators.required]),
      salPerDay: new FormControl('',[Validators.required]),
      totalSalary: new FormControl('',[Validators.required]),
      remarks: new FormControl('',[Validators.required]),
      pmtType: new FormControl('',[Validators.required]),
      creditAc: new FormControl('',[Validators.required]),
      yearId: new FormControl('',),
    });    

    this.selectedDriversalarypaymentDetails = this.driversalarypaymentService.getDriverSalaryPaymentDetails(); 
    this.getVehicleIdList();
    this.getDriverList(); 
    this.getBranchList();  

    this.formSalary.controls["branchCode"].disable();
    this.formSalary.controls["totalSalary"].disable(); 
    this.formSalary.controls["salDays"].disable(); 
     

    if (this.selectedDriversalarypaymentDetails.masterid != '') {      
      this.getCreditAcList(this.selectedDriversalarypaymentDetails.pmtType);  
    }    
  
    setTimeout(() => {  
      if (this.selectedDriversalarypaymentDetails.masterid != '') {
        this.formSalary.patchValue(this.selectedDriversalarypaymentDetails);   
        this.editMode=true;  
        this.createdBy = this.selectedDriversalarypaymentDetails.createdBy + " " + this.selectedDriversalarypaymentDetails.createdDate;
        this.modifiedBy = this.selectedDriversalarypaymentDetails.modifiedBy + " " + this.selectedDriversalarypaymentDetails.modifiedDate;   
        this.formSalary.controls["salaryFromDt"].disable();
        this.formSalary.controls["creditAc"].disable();
        this.formSalary.controls["salaryToDt"].disable();
        this.formSalary.controls["vehicleId"].disable();
        this.formSalary.patchValue({
          salaryDate : this.commonService.formatDate(this.selectedDriversalarypaymentDetails.salaryDate),
          salaryFromDt : this.commonService.formatDate(this.selectedDriversalarypaymentDetails.salaryFromDt),
          salaryToDt : this.commonService.formatDate(this.selectedDriversalarypaymentDetails.salaryToDt),
          vehicleId: this.vehicleList.find(e => e.dataId == this.selectedDriversalarypaymentDetails.vehicleId),
        });  
      }
    }, 2000);
    
    this.sharedService.loading = false;
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formSalary.controls; }
    
  
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
  getSalDays(){
    var selectedDataValue = this.formSalary.getRawValue();
    var date1 = new Date(selectedDataValue.salaryFromDt);
    var date2 = new Date(selectedDataValue.salaryToDt);
   
  
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
  
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  
    Difference_In_Days = Math.abs(Difference_In_Days)
    if (!Number.isNaN(Difference_In_Days)) {
      Difference_In_Days= Difference_In_Days+1;
      this.formSalary.patchValue({
        salDays: (Difference_In_Days).toString()
  
      });
    }
    else {
      this.formSalary.patchValue({
        salDays: '0'
  
      });
  
    }
    this.getSalCal();
  }
 

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
    return List.filter(x => x.dataName.toLowerCase().endsWith(query.toLowerCase()));
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

  deleteDriversalarypaymentForm(): void {
    if(this.selectedDriversalarypaymentDetails.masterid != '' ){
      this.requestmodel.strRequest =this.selectedDriversalarypaymentDetails.masterid
        if (confirm("Are you sure, you want to delete this?")) {
          this.driversalarypaymentService.driverSalaryPayementDelete(this.requestmodel).subscribe((res: Responsemodel) => {
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
  submitDriversalarypaymentForm(): void {
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

    this.driversalarypaymentmodel.masterid  = this.selectedDriversalarypaymentDetails.masterid;
    this.driversalarypaymentmodel.branchCode = selectedDataValue.branchCode;
    this.driversalarypaymentmodel.salaryDate = selectedDataValue.salaryDate;
    this.driversalarypaymentmodel.driverId = selectedDataValue.driverId.toString();    
    this.driversalarypaymentmodel.vehicleId = selectedDataValue.vehicleId.dataId;
    this.driversalarypaymentmodel.salaryFromDt = selectedDataValue.salaryFromDt;
    this.driversalarypaymentmodel.salaryToDt = selectedDataValue.salaryToDt;
    this.driversalarypaymentmodel.salDays = selectedDataValue.salDays.toString();    
    this.driversalarypaymentmodel.salPerDay = selectedDataValue.salPerDay.toString();    
    this.driversalarypaymentmodel.totalSalary = selectedDataValue.totalSalary.toString();    
    this.driversalarypaymentmodel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.driversalarypaymentmodel.pmtType = selectedDataValue.pmtType.toString().toUpperCase();
    this.driversalarypaymentmodel.creditAc = selectedDataValue.creditAc.toString();    
    this.driversalarypaymentmodel.yearId = this.year;  
    this.driversalarypaymentmodel.loggedInUser     = this.loggedInUserID;

    this.driversalarypaymentService.driverSalaryPayementSubmitted(this.driversalarypaymentmodel).subscribe((res: Responsemodel) => {
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