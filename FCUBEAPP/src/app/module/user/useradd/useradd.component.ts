import { Component, OnInit , ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/app/common/constants';

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
  request = new Requestmodel();
  imageData: [] = [];
  imagePreview: [] = [];
  imageName: string = '';
  userPhotoData: [] = [];
  userPhotoPreview: any;
  userPhotoPreview1: any;
  userPhotoName: string = '';
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  @ViewChild('userPhotoInput', {
    static: true
  }) userPhotoInput: any;

  constructor(private route: Router, private formBuilder: FormBuilder, private userModel: Usermodel, private userService: UserService, private commonService: CommonService, private toastrService: ToastrService) {
    this.userModel = new Usermodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Create Users"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
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

    this.getBranchList();
    this.getModuleList();
    this.getRoleTypeList();
    this.userPhotoPreview = Constants.UploadFolderPath + 'user/userphoto/' + this.selectedUserDetails.imageName;

    this.selectedUserDetails = this.userService.getUserDetails();
    this.formUser = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', Validators.required),
      userDescription: new FormControl('', [Validators.required]),
      userMobile: new FormControl('', Validators.required),
      userEmail: new FormControl('', [Validators.required]),
      userScope: new FormControl('BO', Validators.required),
      role: new FormControl('', [Validators.required]),
      empbranch: new FormControl(''),
      activeYN: new FormControl('Y', [Validators.required]),      
      userBranch: new FormControl([], [Validators.required]),
      imageName: new FormControl([], ),
    });

    setTimeout(() => {
      if (this.selectedUserDetails.userId != '') {
        this.userPhotoPreview = Constants.UploadFolderPath + 'user/userphoto/' + this.selectedUserDetails.imageName;
        this.formUser.patchValue(this.selectedUserDetails);
        this.formUser.patchValue({
          userBranch: this.selectedUserDetails.branchList.split(','),
          role: this.selectedUserDetails.roleId,
          imageName:  this.selectedUserDetails.imageName,
        })
        this.formUser.controls["userName"].disable();
        this.editMode=true;
      }
    }, 2000);
  }

  get f() { return this.formUser.controls; }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getModuleList(): void {
    this.commonService.getModuleList().subscribe((res) => {
      this.moduleList = res;
    });
  }

  getRoleTypeList(): void {
    this.commonService.getRoleTypeList().subscribe((res) => {
      this.roleTypeList = res;
    });
  }

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

  chkUsername(e: any) {  
    var usrnm = e.target.value;
    this.request.strRequest = usrnm;
    if (this.selectedUserDetails.userId == '') {
      this.userService.usernameValidation(this.request).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //nothing
        }
        else {
          this.toastrService.warning(this.responseDetails.message);
        }
      });
    }
  }

  onScopeChange() {
    let scopeSelected = this.formUser.value.userScope;
    if (scopeSelected.toLowerCase() === 'bo') {
      this.f['userBranch'].setValidators([Validators.required]);
    } else {
      this.f['userBranch'].clearValidators();
    }
    this.f['userBranch'].updateValueAndValidity();
  }

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
  onSelectUserPhoto(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var maxFileSize = 1024 * 1024;
      var fileSize = fileInput.target.files[0].size;
      if (fileSize > maxFileSize) {
        this.userPhotoInput.nativeElement.value = "";
        this.userPhotoPreview = [];
        this.userPhotoData = [];
        this.userPhotoName = "";
      } else {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            this.userPhotoPreview = e.target.result;
            this.userPhotoData = e.target.result.split('base64,')[1];
            this.userPhotoName = fileInput.target.files[0].name;
          };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
      }
    }
  }
  exit(): void {
    this.route.navigate(['/userlist']);
  }
  

  submitUserForm(): void {
    this.userSubmitted = true;
    if (this.formUser.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    var selecteddata = this.formUser.getRawValue();
    this.userModel.userId = this.selectedUserDetails.userId != '' ? this.selectedUserDetails.userId : '';
    this.userModel.userName = selecteddata.userName;
    this.userModel.userPassword = selecteddata.userPassword;
    this.userModel.userDescription = selecteddata.userDescription.toString().toUpperCase();
    this.userModel.userMobile = selecteddata.userMobile;
    this.userModel.userEmail = selecteddata.userEmail;
    this.userModel.userScope = selecteddata.userScope;
    this.userModel.activeYN = selecteddata.activeYN?selecteddata.activeYN:'Y';
    this.userModel.loggedInUser = this.loggedInUserID;
    this.userModel.empbranch = selecteddata.empbranch;
    this.userModel.branchList = selecteddata.userBranch.toString();
    this.userModel.moduleList = '';
    this.userModel.imageName = this.userPhotoName;   
    this.userModel.roleId = selecteddata.role;

    let formData = new FormData();
    formData.append('userPhoto', this.userPhotoInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.userModel));

    this.userService.userDetailsSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/userlist']);
      } 
      else {
        this.toastrService.warning(this.responseDetails.message);
      }
    });   
  }
}
