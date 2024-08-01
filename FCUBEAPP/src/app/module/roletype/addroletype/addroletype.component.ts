import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Roletypelistmodel  } from 'src/app/models/roletypelistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Roletypemodel } from 'src/app/models/roletypemodel';
import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { RoleTypeService } from 'src/app/services/roletype.service';

@Component({
  selector: 'app-addroletype',
  templateUrl: './addroletype.component.html',
  styleUrls: ['./addroletype.component.css']
})
export class AddroletypeComponent {
  loggedInUserID: string = '';
  formRoleType!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;


  selectedRoleTypesDetails = new Roletypemodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private roletypemodel: Roletypemodel, private roleTypeService: RoleTypeService, private commonService: CommonService) {
    this.roletypemodel = new Roletypemodel();

}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Create Role Types"));
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

  this.selectedRoleTypesDetails = this.roleTypeService.getroletypeDetails();
  this.formRoleType = this.formBuilder.group({
    roleName: new FormControl('',),
    roleDesc: new FormControl('',),
    activeYN: new FormControl('',),

  

  });
  if (this.selectedRoleTypesDetails.roleId != '') {
    this.formRoleType.patchValue(this.selectedRoleTypesDetails);
    this.formRoleType.patchValue({
     // rateMethod: this.selectedRoleTypesDetails.rateMethod,

     
      
    })
  }
 

}
exit(): void {
  this.route.navigate(['/roletypelist']);
}
// convenience getter for easy access to contact form fields
get f() { return this.formRoleType.controls; }

 

//Submit user form details //
submitRoleTypesForm(): void {
  this.userSubmitted = true;
  if (this.formRoleType.invalid) {
    return;
  }
  this.roletypemodel.roleId = this.selectedRoleTypesDetails.roleId;
  this.roletypemodel.roleName= this.formRoleType.value.roleName.toString().toUpperCase();
  this.roletypemodel.roleDesc = this.formRoleType.value.roleDesc.toString().toUpperCase();
  this.roletypemodel.activeYN = this.formRoleType.value.activeYN.toString().toUpperCase();
  this.roletypemodel.loggedInUser = this.formRoleType.value.loggedInUser;


  this.roleTypeService.roletypeDetailsSubmitted(this.roletypemodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formRoleType.reset();
    window.location.reload();
  });
}
}




