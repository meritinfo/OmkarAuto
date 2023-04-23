import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Usermodel } from 'src/app/models/usermodel';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  moduleList: Dropdownmodel[] = [];

  constructor(private route: Router, private formBuilder: FormBuilder, private userModel: Usermodel, private userService: UserService, private commonService: CommonService) {
    this.userModel = new Usermodel();
  }

  ngOnInit(): void {
    var userData = localStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }

    this.formUser = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      mobile: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required]),
      scope: new FormControl('BO', Validators.required),
      role: new FormControl({ value: '', disabled: true }),
      employee: new FormControl({ value: '', disabled: true }),
      branch: new FormControl({ value: '', disabled: true }),
      active: new FormControl('Y', [Validators.required]),
      userBranch: new FormControl('', [Validators.required]),
      userModule: new FormControl('', [Validators.required]),
    });
    this.getBranchList();
    this.getModuleList();
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  //Get Branch List details //
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  //Get Module List details //
  getModuleList(): void {
    this.commonService.getModuleList().subscribe((res) => {
      this.moduleList = res;
    });
  }

  //Submit user form details //
  submitUserForm(): void {
    this.userSubmitted = true;
    if (this.formUser.invalid) {
      return;
    }
    this.userModel.userName = this.formUser.value.username;
    this.userModel.userPassword = this.formUser.value.password;
    this.userModel.userDescription = this.formUser.value.description;
    this.userModel.userMobile = this.formUser.value.mobile;
    this.userModel.userEmail = this.formUser.value.email;
    this.userModel.userScope = this.formUser.value.scope;
    this.userModel.activeYN = this.formUser.value.active;
    this.userModel.loggedInUser = this.loggedInUserID;
    this.userModel.branchList = this.formUser.value.userBranch.toString();
    this.userModel.moduleList = this.formUser.value.userModule.toString();

    this.userService.userDetailsSubmitted(this.userModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formUser.reset(); 
      window.location.reload();
    });
  }
}
