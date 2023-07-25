import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Loginmodel } from 'src/app/models/loginmodel';
import { LoggedinUsermodel } from 'src/app/models/loggedinusermodel';
import { Intermediatescreenmodel } from 'src/app/models/intermediatescreenmodel';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';

debugger
@Component({
  selector: 'app-intermediatescreen',
  templateUrl: './intermediatescreen.component.html',
  styleUrls: ['./intermediatescreen.component.css']
  
})

export class IntermediatescreenComponent {
  formLogin!: FormGroup;
  loginSubmitted = false;
  year: string = '';
  logindate: string = '';
  branch: string = '';
  branchList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  selectedUserDetails = new LoggedinUsermodel();
  selectedScreenDetails = new Intermediatescreenmodel();
  

  constructor(private formBuilder: FormBuilder, private loginModel: Loginmodel,private commonService: CommonService, private sharedService: SharedService, private route: Router) {
    this.loginModel = new Loginmodel();
  }

  //On initial load
 
  ngOnInit(): void {
    var userData = localStorage.getItem('yearid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.year = userData;
    }
    var userData2 = localStorage.getItem('loginDate')?.toString();
    if (typeof userData2 !== 'undefined' && userData2 !== null && userData2 !== '') {
      this.logindate = userData2;
    }
    var userData3 = localStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;
    }
    
    this.formLogin = this.formBuilder.group({
      selectYear: new FormControl(''),
      loginDate: new FormControl(''),
      userBranch: new FormControl('')
    });
    
    this.sharedService.loggedInStatus = false;
    this.getBranchList();
    this.getYearList();
   
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formLogin.controls; }

  // Send partner details //

  submitIntermediateForm(): void {
    this.sharedService.loggedInStatus = true;
    this.route.navigate(['/dashboard']);
    
    //if (this.selectedScreenDetails.status) {
      localStorage.setItem("yearid", this.selectedScreenDetails.selectYear);
      localStorage.setItem("loginDate", this.selectedScreenDetails.loginDate);
      localStorage.setItem("userBranch", this.selectedScreenDetails.userBranch);
    //  localStorage.setItem("user", this.selectedUserDetails.userName);
    localStorage.setItem("year", '2012');
      
  

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
