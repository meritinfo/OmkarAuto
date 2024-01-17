import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Roletypelistmodel  } from 'src/app/models/roletypelistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Hrmastermodel } from 'src/app/models/hrmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { HrMasterService } from 'src/app/services/hrmaster.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';


@Component({
  selector: 'app-addhrmaster',
  templateUrl: './addhrmaster.component.html',
  styleUrls: ['./addhrmaster.component.css']
})
export class AddhrmasterComponent {
  loggedInUserID: string = '';
  formHrMaster!: FormGroup;
  hrList: Dropdownmodel[] = [];
  userSubmitted = false;
  responseDetails = new Responsemodel();
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;


  selectedHrMasterDetails = new Hrmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private hrmastermodel: Hrmastermodel, private hrMasterService: HrMasterService, private commonService: CommonService) {
    this.hrmastermodel = new Hrmastermodel();

}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "HR Master"));
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
  this.getHrTypeList();
  this.selectedHrMasterDetails = this.hrMasterService.getHrmasterDetails();
  this.formHrMaster = this.formBuilder.group({
    hrCode: new FormControl('',),
    description: new FormControl('',),
    hrType: new FormControl('',),

  

  });
  if (this.selectedHrMasterDetails.hrId != '') {
    this.formHrMaster.patchValue(this.selectedHrMasterDetails);
    this.formHrMaster.patchValue({
     // rateMethod: this.selectedRoleTypesDetails.rateMethod,

     
      
    })
  }
 

}
getHrTypeList(): void {
  this.commonService.getHrTypeList().subscribe((res) => {
    this.hrList = res;
  });
}
exit(): void {
  this.route.navigate(['/hrmasterlist']);
}
// convenience getter for easy access to contact form fields
get f() { return this.formHrMaster.controls; }

 

//Submit user form details //
submitHrMasterForm(): void {
  this.userSubmitted = true;
  if (this.formHrMaster.invalid) {
    return;
  }
  this.hrmastermodel.hrId = this.selectedHrMasterDetails.hrId != '' ? this.selectedHrMasterDetails.hrId : '';
  this.hrmastermodel.hrCode= this.formHrMaster.value.hrCode;
  this.hrmastermodel.description = this.formHrMaster.value.description;
  this.hrmastermodel.hrType = this.formHrMaster.value.hrType;
  this.hrmastermodel.loggedInUser = this.formHrMaster.value.loggedInUser;


  this.hrMasterService.hrmasterDetailsSubmitted(this.hrmastermodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formHrMaster.reset();
    window.location.reload();
  });
}
}





