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
import { ToastrService } from 'ngx-toastr';

debugger
@Component({
  selector: 'app-intermediatescreen',
  templateUrl: './intermediatescreen.component.html',
  styleUrls: ['./intermediatescreen.component.css']

})

export class IntermediatescreenComponent {
  formLogin!: FormGroup;
  intermediateScreenSubmitted = false;
  year: string = '';
  logindate: string = '';
  currentServerTime: string = '';

  branch: string = '';
  branchList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  responseDetails = new Responsemodel();
  selectedScreenDetails = new Intermediatescreenmodel();


  constructor(private formBuilder: FormBuilder, private intermediateScreenModel: Intermediatescreenmodel, private commonService: CommonService, private sharedService: SharedService, private route: Router, private toastrService: ToastrService) {
    this.intermediateScreenModel = new Intermediatescreenmodel();
  }

  //On initial load

  ngOnInit(): void {
    

    this.formLogin = this.formBuilder.group({
      yearID: new FormControl(''),
     // loginDate: new FormControl(''),
      userBranch: new FormControl(''),
      loginDate: new FormControl((new Date()).toISOString().substring(0,10))
    });
    this.sharedService.getCurrentServerTime().subscribe((data: any) => {
      this.currentServerTime = data.currentServerTime;
    });
    this.sharedService.loggedInStatus = false;
    this.getBranchList();
    this.getYearList();

  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formLogin.controls; }

  // Send partner details //

  submitIntermediateForm(): void {
    this.intermediateScreenSubmitted = true;
    if (this.formLogin.invalid) {
      return;
    }
    this.selectedScreenDetails.yearID = this.formLogin.value.yearID;
    this.selectedScreenDetails.loginDate = this.formLogin.value.loginDate;
    this.selectedScreenDetails.userBranch = this.formLogin.value.userBranch;
    this.sharedService.intermediateScreenSubmitted(this.selectedScreenDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
     
     
      this.selectedScreenDetails.yearID = this.formLogin.value.yearID;
      this.selectedScreenDetails.loginDate = this.formLogin.value.loginDate;
      this.selectedScreenDetails.userBranch = this.formLogin.value.userBranch;

      if (this.responseDetails.status) {
        localStorage.setItem("yearID", this.selectedScreenDetails.yearID);
        localStorage.setItem("loginDate", this.selectedScreenDetails.loginDate);
        localStorage.setItem("userBranch", this.selectedScreenDetails.userBranch);
        this.sharedService.loggedInStatus = true;
        this.route.navigate(['/dashboard']);
       
      }
      else{
        this.toastrService.warning(this.responseDetails.message);
      }
    });

  }
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  getYearList(): void {
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
    });
  }

}
