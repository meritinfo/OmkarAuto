
import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Fastagdslrechargeentrymodel } from 'src/app/models/fastagdslrechargeentrymodel';
import { FastagdslrechargeentryService } from 'src/app/services/fastagdslrechargeentry.service';
import { FingroupService } from 'src/app/services/fingroup.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-fastagdslrechargeentryadd',
  templateUrl: './fastagdslrechargeentryadd.component.html',
  styleUrls: ['./fastagdslrechargeentryadd.component.css']
})
export class FastagdslrechargeentryaddComponent {
  loggedInUserID: string = '';
  userlogindate:string="";
  formFasttagDsl!: FormGroup;
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
  branch: string = '';
  minDate: string = '';
  fromDate: string = '';

  responseDetails = new Responsemodel();
  accountTypeList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  rechargeList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  subAccountTypeList: Dropdownmodel[] = []; 
   vehicleList: Dropdownmodel[] = [];
  ledgerList: Dropdownmodel[] = [];
  statelist: Dropdownmodel[] = [];

  selectedFastagdslrechargeentryDetails = new Fastagdslrechargeentrymodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
     private fastagdslrechargeentrymodel: Fastagdslrechargeentrymodel, private sharedService: SharedService,
     private fastagdslrechargeentryService: FastagdslrechargeentryService,
     private commonService: CommonService, private requestmodel:Requestmodel,
     private fingroupService :FingroupService, private toasterService: ToastrService) {
    this.fastagdslrechargeentrymodel = new Fastagdslrechargeentrymodel();
  }

  ngOnInit(): void {    

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
        var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
        var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Card Recharge Entry");
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
    
    
    this.formFasttagDsl = this.formBuilder.group({    
      transBranch: new FormControl(this.branch,[Validators.required]),
      rechargeDate: new FormControl(this.loginDate,[Validators.required]),
      rechargeType: new FormControl('',[Validators.required]),
      rechargeAmt: new FormControl('',[Validators.required]),
      vehicleID: new FormControl('',[Validators.required]),
      remarks: new FormControl('',),
      transType: new FormControl('',[Validators.required]),
      paymentType: new FormControl('',[Validators.required]),
      creditAc: new FormControl('',[Validators.required]),    
    });   
    
    this.sharedService.loading = true;

    this.selectedFastagdslrechargeentryDetails = this.fastagdslrechargeentryService.getFastagdslrechargeentrymodelDetails(); 
    this.getVehicleIdList();
    this.getBranchList();  
    this.getRechargeTypeList(); 
    this.formFasttagDsl.controls["transBranch"].disable();
  //  this.formFasttagDsl.controls["rechargeDate"].disable();

    if (this.selectedFastagdslrechargeentryDetails.transId != '') {
      this.getCreditAcList(this.selectedFastagdslrechargeentryDetails.paymentType);  
    }

    setTimeout(() => {
      if (this.selectedFastagdslrechargeentryDetails.transId != '') {
        this.formFasttagDsl.patchValue(this.selectedFastagdslrechargeentryDetails);   
        this.editMode=true;    
        this.formFasttagDsl.controls["transType"].disable();
        this.formFasttagDsl.controls["paymentType"].disable();
        this.formFasttagDsl.controls["creditAc"].disable();
        this.formFasttagDsl.controls["rechargeType"].disable();
        this.formFasttagDsl.controls["vehicleID"].disable();
        this.formFasttagDsl.patchValue({
          transBranch: this.selectedFastagdslrechargeentryDetails.transBranch,
          rechargeDate : this.commonService.formatDate(this.selectedFastagdslrechargeentryDetails.rechargeDate),
          vehicleID: this.vehicleList.find(e => e.dataId == this.selectedFastagdslrechargeentryDetails.vehicleID),
        }); 
      }
    }, 2000);
  
    this.sharedService.loading = false;
  }
  
  // convenience getter for easy access to contact form fields
  get f() { return this.formFasttagDsl.controls; }
  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
    
  getaccounttypes(): void {
    this.fingroupService.getaccounttypes().subscribe((res) => {
      this.accountTypeList = res;
    });
  }

  getCreditAcList(pmttp:string): void {
    this.requestmodel.strRequest= pmttp;
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditAcList = res;
    });    
  }

  getRechargeTypeList(): void {
    this.fastagdslrechargeentryService.getRechargeTypeList().subscribe((res) => {
      this.rechargeList = res;
    });
  }

  getsubaccounttypes(request:Requestmodel): void {
    this.fingroupService.getsubaccounttypes(request).subscribe((res) => {
      this.subAccountTypeList = res;
    });
  }

  getstatelist(): void {
      this.commonService.getStateList().subscribe((res) => {
      this.statelist = res;
    });
  }

  
  getVehicleIdList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
 
  changePmtType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;  
    this.getCreditAcList(selectedValue);
  }

  selectEvent(item: any) {
    // do something with selected item
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


  deleteFastagdslrechargeentryForm(): void {
    if(this.selectedFastagdslrechargeentryDetails.transId != '' ){
      this.sharedService.loading = true;
    this.requestmodel.strRequest =this.selectedFastagdslrechargeentryDetails.transId
      if (confirm("Are you sure, you want to delete this?")) {
            this.fastagdslrechargeentryService.fastagdslrechargeentryDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status){              
              console.log(this.responseDetails.message);
              this.formFasttagDsl.reset();
              this.route.navigate(['/rechargeentry']);
            } 
            else{
              console.log(this.responseDetails.message);  
              this.toasterService.warning(this.responseDetails.message);  
              return; 
            }   
        });
      }
      this.sharedService.loading = false;
    }
  }

  exit(): void {
    this.route.navigate(['/rechargeentry']);
  }


  submitFastagdslrechargeentryForm(): void {
    if (this.formFasttagDsl.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formFasttagDsl.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }          
      return;
    }
    var selectedDataValue = this.formFasttagDsl.getRawValue();
  
    this.sharedService.loading = true;
    this.formSubmitted = true;
    
    this.fastagdslrechargeentrymodel.transId  = this.selectedFastagdslrechargeentryDetails.transId;
    this.fastagdslrechargeentrymodel.transBranch  = selectedDataValue.transBranch.toString();
    this.fastagdslrechargeentrymodel.rechargeDate = selectedDataValue.rechargeDate;
    this.fastagdslrechargeentrymodel.rechargeType = selectedDataValue.rechargeType.toString().toUpperCase();
    this.fastagdslrechargeentrymodel.rechargeAmt = selectedDataValue.rechargeAmt.toString();
    this.fastagdslrechargeentrymodel.vehicleID = selectedDataValue.vehicleID.dataId;
    this.fastagdslrechargeentrymodel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.fastagdslrechargeentrymodel.transType = selectedDataValue.transType.toString().toUpperCase();
    this.fastagdslrechargeentrymodel.paymentType = selectedDataValue.paymentType.toString().toUpperCase();
    this.fastagdslrechargeentrymodel.creditAc = selectedDataValue.creditAc.toString();  
    this.fastagdslrechargeentrymodel.loggedInUser = this.loggedInUserID;

    this.fastagdslrechargeentryService.fastagdslrechargeentrySubmitted(this.fastagdslrechargeentrymodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formFasttagDsl.reset();
        this.route.navigate(['/rechargeentry']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    this.sharedService.loading = false;
  }
  
}



