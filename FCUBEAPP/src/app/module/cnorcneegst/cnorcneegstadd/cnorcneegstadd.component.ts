
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Cnorcneemasterlistmodel  } from 'src/app/models/cnorcneemasterlistmodel';
import { Cnorcneemastermodel } from 'src/app/models/cnorcneemastermodel';
import { CnorCneeMasterService } from 'src/app/services/cnorcneemaster.service';
import { Cnorcneegstlistmodel  } from 'src/app/models/cnorcneegstlismodel';
import { Cnorcneegstmodel } from 'src/app/models/cnorcneegstmodel';
import { CnorCneeGstService } from 'src/app/services/cnorcneegst.service';
import { CommonService } from 'src/app/services/common.service';

import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-cnorcneegstadd',
  templateUrl: './cnorcneegstadd.component.html',
  styleUrls: ['./cnorcneegstadd.component.css']
})
export class CnorcneegstaddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  branchname: string = '';
  year: string = '';
  loginDate: string = '';
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  debitAcList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  
  
  selectedCnorCneeGstDetails = new Cnorcneegstmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private cnorcneegstmodel: Cnorcneegstmodel, 
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private cnorCneeGstService: CnorCneeGstService, private sharedService: SharedService,
    private commonService: CommonService) {
    this.cnorcneegstmodel = new Cnorcneegstmodel();



}
ngOnInit(): void {
    
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Consignor/Consignee GST");
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
  var userData2 = sessionStorage.getItem('yearID')?.toString();
  if (typeof userData2 !== 'undefined' && userData2!== null && userData2 !== '') {
    this.year = userData2;
  }
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }
  var userData5 = sessionStorage.getItem('userBranch')?.toString();
  if (typeof userData5 !== 'undefined' && userData5 !== null && userData5 !== '') {
    this.branchname = userData5;
  }
  else {
    this.route.navigate(['/']);
  }
  
  this.sharedService.loading=true;
  //this.getdebitAc();

  this.selectedCnorCneeGstDetails = this.cnorCneeGstService.getCnorcneeGstModelDetails();
  this.formUser = this.formBuilder.group({
   // docCode: new FormControl('',[Validators.required]),
   cnorCneeID: new FormControl('',), 
  
   
   location: new FormControl('',[Validators.required]), 
   globalYN: new FormControl('',[Validators.required]), 
   address1: new FormControl('',[Validators.required]), 
   address2: new FormControl('',), 
   address3: new FormControl('',), 
   stateCode: new FormControl('',), 
   pinCode: new FormControl('',), 
   phone: new FormControl('',), 
   email: new FormControl('',), 
   contactPerson1: new FormControl('',), 
   mobile1: new FormControl('',), 
   contactPerson2: new FormControl('',), 
   mobile2: new FormControl('',), 
   contactPerson3: new FormControl('',), 
   mobile3: new FormControl('',), 
   gstNo: new FormControl('',), 
   isActive: new FormControl('',), 
   inActiveDate: new FormControl('',), 
   olD_CnorCnee_ID: new FormControl('',), 
  });
  this.getBranchList();
  this.getStateList();

  if (this.selectedCnorCneeGstDetails.cnorCneeID != '') {
    this.formUser.patchValue(this.selectedCnorCneeGstDetails);      
    this.editMode = true;
  
    this.formUser.patchValue({
     // inActiveDate: this.commonService.formatDate(this.selectedCnorCneeGstDetails.inActiveDate)
     
    })      
  }
  

  this.sharedService.loading=false;
}
get f() { return this.formUser.controls; }
deleteCnorCneeMasterForm(): void {
  if(this.selectedCnorCneeGstDetails.cnorCneeDetID != '' ){      
    this.sharedService.loading=true;
    this.requestmodel.strRequest =this.selectedCnorCneeGstDetails.cnorCneeDetID 
    if (confirm("Are you sure, you want to delete this?")) {
        this.cnorCneeGstService.cnorCneeGstDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if(this.responseDetails.status){
          this.toasterService.success(this.responseDetails.message);
          this.formUser.reset();
          this.route.navigate(['/searchcnorcnee']);
        }
        else{
          this.toasterService.warning(this.responseDetails.message);        
        }   
      });
    }
    
    this.sharedService.loading=false;
  }
}
exit(): void {
  this.route.navigate(['/searchcnorcnee']);
}
getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}
onGlobleChange(e:any){
  if(e='Y'){
  this.formUser.controls['branchCode'].clearValidators(); 
  this.formUser.controls['branchCode'].updateValueAndValidity(); 
  }
  else{
  this.formUser.controls['branchCode'].setValidators([Validators.required]);
  this.formUser.controls['branchCode'].updateValueAndValidity(); 
  }

}

getStateList(): void {
  this.commonService.getStateList().subscribe((res) => {
    this.stateList = res;
  });
}

//Submit user form details //
submitCnorCneeGstForm(): void {
  if (this.formUser.invalid) {
    this.toasterService.warning("Please Enter Mandatory Fields ");   
    const controls = this.formUser.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");   
      }
    }     
    return;
  }
  this.sharedService.loading=true;
  var selectedDataVal =this.formUser.getRawValue();
  this.formSubmitted = true;
  this.cnorcneegstmodel.cnorCneeDetID = this.selectedCnorCneeGstDetails.cnorCneeDetID != '' ? this.selectedCnorCneeGstDetails.cnorCneeDetID : '';
 // this.docRenewalMasterModel.docCode = selectedDataVal.docCode.toUpperCase();
 //this.cnorcneemastermodel.cnorCneeName = selectedDataVal.cnorCneeName.toString().toUpperCase();
  //this.cnorcneemastermodel.printName = selectedDataVal.printName.toString().toUpperCase();
 // cnorcneegstmodel.cnorCneeDetID = selectedDataVal.
 // cnorcneegstmodel.cnorCneeID = selectedDataVal.
 this.cnorcneegstmodel.location = selectedDataVal.location
 this.cnorcneegstmodel.address1 = selectedDataVal.address1
 this.cnorcneegstmodel.address2 = selectedDataVal.address2
 this.cnorcneegstmodel.address3 = selectedDataVal.address3
 this.cnorcneegstmodel.stateCode = selectedDataVal.stateCode
 this.cnorcneegstmodel.pinCode = selectedDataVal.pinCode
 this.cnorcneegstmodel.gstNo = selectedDataVal.gstNo
 this.cnorcneegstmodel.contactPerson = selectedDataVal.contactPerson
 this.cnorcneegstmodel.mobileNo = selectedDataVal.mobileNo
 this.cnorcneegstmodel.email  = selectedDataVal.email 
 //cnorcneegstmodel. olD_CnorCnee_ID: string

  this.cnorCneeGstService.cnorcneeGstModelSubmitted(this.cnorcneegstmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if(this.responseDetails.status){
      this.toasterService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/searchcnorcnee']);
    }
    else{
      this.toasterService.warning(this.responseDetails.message);        
    }   
  });
  this.sharedService.loading=false;
}
}





