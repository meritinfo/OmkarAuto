import { Component } from '@angular/core';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Roletypelistmodel  } from 'src/app/models/roletypelistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Roletypemodel } from 'src/app/models/roletypemodel';
import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Ptslabmastermodel } from 'src/app/models/ptslabmastermodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';

import { Ptslabmasterlistmodel } from 'src/app/models/ptslabmasterlistmodel';

import { PtSlabMasterService } from 'src/app/services/ptslabmaster.service';


@Component({
  selector: 'app-addptslabmaster',
  templateUrl: './addptslabmaster.component.html',
  styleUrls: ['./addptslabmaster.component.css']
})
export class AddptslabmasterComponent {
  loggedInUserID: string = '';
  formRoleType!: FormGroup;
  userSubmitted = false;
  stateList: Dropdownmodel[] = [];
  responseDetails = new Responsemodel();
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;


  selectedPtSlabMasterDetails = new Ptslabmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private ptslabmastermodel: Ptslabmastermodel, private ptSlabMasterService: PtSlabMasterService, private commonService: CommonService) {
    this.ptslabmastermodel = new Ptslabmastermodel();


}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
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
  this.getStateList();
  this.selectedPtSlabMasterDetails = this.ptSlabMasterService.getPtSlabmasterDetails();
  this.formRoleType = this.formBuilder.group({
    stateCode: new FormControl('',),
    rangeFrom: new FormControl('',),
    rangeTo: new FormControl('',),
    ptDedAmt: new FormControl('',),

  

  });
  if (this.selectedPtSlabMasterDetails.ptId != '') {
    this.formRoleType.patchValue(this.selectedPtSlabMasterDetails);
    this.formRoleType.patchValue({
     // rateMethod: this.selectedRoleTypesDetails.rateMethod,

     
      
    })
  }
 

}
exit(): void {
  this.route.navigate(['/roletypelist']);
}
getStateList(): void {
  this.commonService.getStateList().subscribe((res) => {
    this.stateList = res;
  });
}
// convenience getter for easy access to contact form fields
get f() { return this.formRoleType.controls; }

 

//Submit user form details //
ptSlabMasterSubmitted(): void {
  this.userSubmitted = true;
  if (this.formRoleType.invalid) {
    return;
  }
  this.ptslabmastermodel.ptId = this.ptslabmastermodel.ptId != '' ? this.ptslabmastermodel.ptId : '';
  this.ptslabmastermodel.stateCode= this.formRoleType.value.stateCode;
  this.ptslabmastermodel.rangeFrom = this.formRoleType.value.rangeFrom;
  this.ptslabmastermodel.rangeTo = this.formRoleType.value.rangeTo;
  this.ptslabmastermodel.ptDedAmt = this.formRoleType.value.ptDedAmt;
  this.ptslabmastermodel.loggedInUser = this.formRoleType.value.loggedInUser;


  this.ptSlabMasterService.ptSlabMasterSubmitted(this.ptslabmastermodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formRoleType.reset();
    window.location.reload();
  });
}
}




