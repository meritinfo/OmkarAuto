import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loginmodel } from 'src/app/models/loginmodel';
import { LoggedinUsermodel } from 'src/app/models/loggedinusermodel';
import { Intermediatescreenmodel } from 'src/app/models/intermediatescreenmodel';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-intermediatescreen',
  templateUrl: './intermediatescreen.component.html',
  styleUrls: ['./intermediatescreen.component.css']

})

export class IntermediatescreenComponent {
  formLogin!: FormGroup;
  intermediateScreenSubmitted = false;
  year: string = '';
  branchname: string = '';
  logindate: string = '';
  currentServerTime: string = '';
  formSubmitted = false;
  userscope: string = '';
  loggedInUserID: string = '';
  branch: string = '';
  branchList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  responseDetails = new Responsemodel();
  selectedScreenDetails = new Intermediatescreenmodel();
  maxDate: string = '';
  companyname: string = '';
  dashboard: string = '';

  constructor(private formBuilder: FormBuilder, private intermediateScreenModel: Intermediatescreenmodel, 
    private commonService: CommonService, private sharedService: SharedService, private route: Router, 
    private toasterService: ToastrService, private requestmodel :Requestmodel) {
    this.intermediateScreenModel = new Intermediatescreenmodel();
  }

  //On initial load

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      yearID: new FormControl('22', [Validators.required]),
      userBranch: new FormControl('', [Validators.required]),
      loginDate: new FormControl((new Date()).toISOString().substring(0, 10), [Validators.required])
    });

    this.sharedService.getCurrentServerTime().subscribe((data: any) => {
      this.currentServerTime = data.currentServerTime;
    });

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

    var usercompanyname = sessionStorage.getItem('companyname')?.toString();
    if (typeof usercompanyname !== 'undefined' && usercompanyname !== null && usercompanyname !== '') {
      this.companyname = usercompanyname;
    }

    var userData = sessionStorage.getItem('scope')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.userscope = userData;
    }

    this.sharedService.loggedInStatus = false;
    //this.getCompanyDetails();
    this.getDropdownList();         
    this.getDashboard(); 
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    console.log(this.maxDate);    
    this.sharedService.loading = false;
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formLogin.controls; }

  submitIntermediateForm(): void {
    //this.sharedService.loading = true;
    this.intermediateScreenSubmitted = true;
    if (this.formLogin.invalid) {
      this.toasterService.warning("Mandatory fields is required");
      this.sharedService.loading = false;
      return;
    }

    this.selectedScreenDetails.yearID = this.formLogin.value.yearID;
    this.selectedScreenDetails.loginDate = this.formLogin.value.loginDate;
    this.selectedScreenDetails.userBranch = this.formLogin.value.userBranch.dataId;
    this.branchname = this.formLogin.value.userBranch.dataName;
    this.sharedService.intermediateScreenSubmitted(this.selectedScreenDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.selectedScreenDetails.yearID = this.formLogin.value.yearID;
      this.selectedScreenDetails.loginDate = this.formLogin.value.loginDate;
      this.selectedScreenDetails.userBranch = this.formLogin.value.userBranch.dataId;

      if (this.responseDetails.status) {  
        sessionStorage.setItem("yearID", this.selectedScreenDetails.yearID);
        sessionStorage.setItem("loginDate", this.selectedScreenDetails.loginDate);
        sessionStorage.setItem("userBranch", this.formLogin.value.userBranch.dataId);
        sessionStorage.setItem("branchname", this.formLogin.value.userBranch.dataName);
        var yr = this.yearList.find(e=> e.dataId== this.selectedScreenDetails.yearID)       
        sessionStorage.setItem("yeardesc", yr?yr.dataName:"");

        this.sharedService.loading = false;
        this.sharedService.loggedInStatus = true;
        this.sharedService.loading = false;       
          this.route.navigate([this.dashboard]);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
      this.sharedService.loading = false;
    });

  }

  getCompanyDetails(){
    this.sharedService.getCompanyDetail().subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status){        
        this.companyname = this.responseDetails.message;
        this.responseDetails.message = "";
      }
      else{
        this.companyname = "FCUBE"
      }
      sessionStorage.setItem("companyname", this.companyname );
    });
     
  }

  getDashboard(){
    this.requestmodel.strRequest = this.loggedInUserID;
    this.sharedService.getDashboardDetail(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status){        
        this.dashboard = this.responseDetails.message;
        this.responseDetails.message ="";
      }
      else{
        this.dashboard = "/dashboard"
      }     
    });
  }
  
  getDropdownList() {
    //this.sharedService.loading = true;
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
      this.formLogin.patchValue({
        yearID:this.yearList[0].dataId,
      })   
    }); 

    if (this.userscope =="HO"){      
      this.requestmodel.strRequest = 'HO';     
    }
    else{
      this.requestmodel.strRequest = this.loggedInUserID;
    }

    this.commonService.getScopeBranchList(this.requestmodel).subscribe((res) => {
      this.branchList = res;
      this.sharedService.loading = false;
    });
  }
}
