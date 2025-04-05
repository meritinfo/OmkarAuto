import { Component } from '@angular/core';
import { Responsemodel } from 'src/app/models/responsemodel';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Passwordmodel } from 'src/app/models/passwordmodel';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  selectedUserDetails = new Usermodel();
  selectedUserPwdDetails = new Passwordmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private pwdModel: Passwordmodel, private userService: UserService, 
    private commonService: CommonService, private toastrService: ToastrService) {
    this.pwdModel = new Passwordmodel();
  }

  ngOnInit(): void {
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

    this.selectedUserPwdDetails = this.userService.getUserPwdDetails();
    this.formUser = this.formBuilder.group({
      userName: new FormControl('', ),
      userPassword: new FormControl('', Validators.required),
      oldPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });

    if (this.selectedUserDetails.userId != '') {
      this.formUser.patchValue(this.selectedUserDetails);
    }
  }
  get f() { return this.formUser.controls; }

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

  checkPassword() {
    this.pwdModel.userId= this.loggedInUserID;
    this.pwdModel.oldPassword = this.formUser.value.oldPassword;
    this.commonService.checkPassword(this.pwdModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (!this.responseDetails.status) {
        this.toastrService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          oldPassword: ''
        });
      }
    });  
  }
  
  checkCnfPassword() {
    this.pwdModel.userPassword = this.formUser.value.userPassword;
    this.pwdModel.confirmPassword = this.formUser.value.confirmPassword;
    if( this.pwdModel.userPassword != this.pwdModel.confirmPassword){
      this.toastrService.warning("password does not match to confirm password");
      this.formUser.patchValue({
        confirmPassword: ''
      });
    }  
  }

  exit(): void {
    this.route.navigate(['/userlist']);
  }
  
  submitUserPwdForm(): void {
    this.formSubmitted = true;
    if (this.formUser.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields ");
     return;
    }
    this.pwdModel.userId= this.loggedInUserID
    this.pwdModel.userPassword= this.formUser.value.userPassword;
    // this.pwdModel.roleDesc = this.formRoleType.value.roleDesc;
    // this.roletypemodel.loggedInUser = this.formRoleType.value.loggedInUser; 
  
    this.userService.userPasswordSubmitted(this.pwdModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.toastrService.success(this.responseDetails.message);
      this.formUser.reset();
      window.location.reload();
    });
  
  }
  
}

