
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';

import { AdditionalcostrecmasterModel  } from 'src/app/models/additionalcostrecmastermodel';
import { Additionalcostrecmasterlistmodel } from 'src/app/models/additionalcostrecmasterlist';

import { AdditionalcostrecService } from 'src/app/services/additionalcostrecmaster.service';
import { CommonService } from 'src/app/services/common.service';

import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-additionalcostrecmasteradd',
  templateUrl: './additionalcostrecmasteradd.component.html',
  styleUrls: ['./additionalcostrecmasteradd.component.css']
})
export class AdditionalcostrecmasteraddComponent {
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
  ledgerAcList: Dropdownmodel[] = [];
  
  
  selectedAdditionalcostrecDetails = new AdditionalcostrecmasterModel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private additionalcostrecmasterModel: AdditionalcostrecmasterModel, 
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private additionalcostrecService: AdditionalcostrecService, private sharedService: SharedService,
    private commonService: CommonService) {
    this.additionalcostrecmasterModel = new AdditionalcostrecmasterModel();

}
ngOnInit(): void {
    
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Addtional Cost/Rec Master");
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
  this.getBankAcList();
  

  this.selectedAdditionalcostrecDetails = this.additionalcostrecService.getAdditionalcostrecmasterModelDetails();
  this.formUser = this.formBuilder.group({
   // docCode: new FormControl('',[Validators.required]),
   addCostID: new FormControl('',), 
   addCostCode: new FormControl('',[Validators.required]), 
   addCostType:new FormControl('',[Validators.required]), 
   addCostDescription : new FormControl('',[Validators.required]), 
   accountID : new FormControl('',[Validators.required]), 
   affectCosting: new FormControl('Y',[Validators.required]), 
  // loggedInUser: new FormControl('',[Validators.required]), 
   
  });
 // this.getBranchList();
 // this.getStateList();

  if (this.selectedAdditionalcostrecDetails.addCostID != '') {
    this.formUser.patchValue(this.selectedAdditionalcostrecDetails);      
    this.editMode = true;
  
    this.formUser.patchValue({
      //inActiveDate: this.commonService.formatDate(this.selectedAdditionalcostrecDetails.inActiveDate)
     
    })      
  }
  

  this.sharedService.loading=false;
}
get f() { return this.formUser.controls; }
deleteAdditionalcostrecForm(): void {
  if(this.selectedAdditionalcostrecDetails.addCostID != '' ){      
    this.sharedService.loading=true;
    this.requestmodel.strRequest =this.selectedAdditionalcostrecDetails.addCostID 
    if (confirm("Are you sure, you want to delete this?")) {
        this.additionalcostrecService.additionalcostrecmasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if(this.responseDetails.status){
          this.toasterService.success(this.responseDetails.message);
          this.formUser.reset();
          this.route.navigate(['/addcostrecmst']);
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
  this.route.navigate(['/addcostrecmst']);
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
chkAddCostDescriptionDuplicate(){
  var selectedData = this.formUser.getRawValue();
  
    this.requestmodel.strRequest = selectedData.addCostDescription;
  //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
    this.additionalcostrecService.checkDuplicateAddCostDescription(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          addCostDescription: ''
  
        });
        
      }
    });
    
}
chkAddCostCodeDuplicate(){
  var selectedData = this.formUser.getRawValue();
  

    this.requestmodel.strRequest = selectedData.addCostCode;
  //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
    this.additionalcostrecService.checkDuplicateAddCostCode(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          addCostCode: ''
  
        });
        
      }
    });
  }
getBankAcList(): void {
  this.commonService.getSubledgerAcList().subscribe((res) => {
    this.ledgerAcList = res;
  });
}

//Submit user form details //
submitAdditionalcostrecMasterForm(): void {
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
  this.additionalcostrecmasterModel.addCostID = this.selectedAdditionalcostrecDetails.addCostID != '' ? this.selectedAdditionalcostrecDetails.addCostID : '';
 // this.docRenewalMasterModel.docCode = selectedDataVal.docCode.toUpperCase();
 this.additionalcostrecmasterModel.addCostCode = selectedDataVal.addCostCode.toString().toUpperCase();
  this.additionalcostrecmasterModel.addCostType = selectedDataVal.addCostType.toString().toUpperCase();
  this.additionalcostrecmasterModel.addCostDescription = selectedDataVal.addCostDescription
  this.additionalcostrecmasterModel.accountID = selectedDataVal.accountID
  this.additionalcostrecmasterModel.affectCosting = selectedDataVal.affectCosting
 // this.cnorcneemastermodel.address1 = selectedDataVal.address1.toString().toUpperCase();
 
 // this.cnorcneemastermodel.olD_CnorCnee_ID = selectedDataVal.olD_CnorCnee_ID;
  this.additionalcostrecmasterModel.loggedInUser = this.loggedInUserID;  

  this.additionalcostrecService.additionalcostrecmasterSubmitted(this.additionalcostrecmasterModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if(this.responseDetails.status){
      this.toasterService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/addcostrecmst']);
    }
    else{
      this.toasterService.warning(this.responseDetails.message);        
    }   
  });
  this.sharedService.loading=false;
}
}







