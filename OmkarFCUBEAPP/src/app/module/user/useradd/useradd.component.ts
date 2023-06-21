import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Usermodel } from 'src/app/models/usermodel';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css']
})
export class UseraddComponent implements OnInit {

  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  moduleList: Dropdownmodel[] = [];
  roleTypeList: Dropdownmodel[] = [];
  selectedUserDetails = new Usermodel();
  imageData: [] = [];
  imagePreview: [] = [];
  imageName: string = '';

  constructor(private route: Router, private formBuilder: FormBuilder, private userModel: Usermodel, private userService: UserService, private commonService: CommonService, private toastrService: ToastrService) {
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

    this.getBranchList();
    this.getModuleList();
    this.getRoleTypeList();

    this.selectedUserDetails = this.userService.getUserDetails();
    this.formUser = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', Validators.required),
      userDescription: new FormControl('', [Validators.required]),
      userMobile: new FormControl('', Validators.required),
      userEmail: new FormControl('', [Validators.required]),
      userScope: new FormControl('BO', Validators.required),
      role: new FormControl('', [Validators.required]),
      employee: new FormControl({ value: '', disabled: true }),
      branch: new FormControl({ value: '', disabled: true }),
      activeYN: new FormControl('Y', [Validators.required]),
      userBranch: new FormControl([], [Validators.required]),
      userModule: new FormControl([], [Validators.required]),
    });

    if (this.selectedUserDetails.userId != '') {
      this.formUser.patchValue(this.selectedUserDetails);
      this.formUser.patchValue({
        userBranch: this.selectedUserDetails.branchList.split(','),
        userModule: this.selectedUserDetails.moduleList.split(',')
      })
    }
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

  //Get RoleType List details //
  getRoleTypeList(): void {
    this.commonService.getRoleTypeList().subscribe((res) => {
      this.roleTypeList = res;
    });
  }

  // alphanumericOnly
  alphaNumberOnly(e: any) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("[a-zA-Z0-9]");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }

  /* Set County as Required based on Country Selected */
  onScopeChange() {
    let scopeSelected = this.formUser.value.userScope;
    if (scopeSelected.toLowerCase() === 'bo') {
      this.f['userBranch'].setValidators([Validators.required]);
      this.f['userBranch'].updateValueAndValidity();
    } else {
      this.f['userBranch'].clearValidators();
      this.f['userBranch'].updateValueAndValidity();
    }
  }

  //On file select
  onSelectFile(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          this.imagePreview = e.target.result;
          this.imageData = e.target.result.split('base64,')[1];
          this.imageName = fileInput.target.files[0].name;
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  //Submit user form details //
  submitUserForm(): void {
    this.userSubmitted = true;
    if (this.formUser.invalid) {
      return;
    }
    this.userModel.userId = this.selectedUserDetails.userId != '' ? this.selectedUserDetails.userId : '';
    this.userModel.userName = this.formUser.value.userName;
    this.userModel.userPassword = this.formUser.value.userPassword;
    this.userModel.userDescription = this.formUser.value.userDescription;
    this.userModel.userMobile = this.formUser.value.userMobile;
    this.userModel.userEmail = this.formUser.value.userEmail;
    this.userModel.userScope = this.formUser.value.userScope;
    this.userModel.activeYN = this.formUser.value.activeYN;
    this.userModel.loggedInUser = this.loggedInUserID;
    this.userModel.branchList = this.formUser.value.userBranch.toString();
    this.userModel.moduleList = this.formUser.value.userModule.toString();
    this.userModel.imageName = this.imageName;
    this.userModel.imageData = this.imageData;

    if (this.userModel.userId === "") {
      this.userService.usernameValidation(this.userModel).subscribe((resname: Responsemodel) => {
        if (resname.status) {
          this.userService.userDetailsSubmitted(this.userModel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toastrService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/userlist']);
            } else {
              this.toastrService.warning(this.responseDetails.message);
            }
          });
        }
        else {
          this.toastrService.warning(resname.message);
        }
      });
    }
    else {
      this.userService.userDetailsSubmitted(this.userModel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.toastrService.success(this.responseDetails.message);
          this.formUser.reset();
          this.route.navigate(['/userlist']);
        } else {
          this.toastrService.warning(this.responseDetails.message);
        }
      });
    }
  }
}
