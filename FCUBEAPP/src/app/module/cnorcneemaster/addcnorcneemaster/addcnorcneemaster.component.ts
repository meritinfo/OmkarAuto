
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Docrenewalmastermodel } from 'src/app/models/docrenewalmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { DocRenewalMasterService } from 'src/app/services/docrenewalmaster.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-addcnorcneemaster',
  templateUrl: './addcnorcneemaster.component.html',
  styleUrls: ['./addcnorcneemaster.component.css']
})
export class AddcnorcneemasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  debitAcList: Dropdownmodel[] = [];
  
  selectedDocRenewalMasterDetails = new Docrenewalmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private docRenewalMasterModel: Docrenewalmastermodel, 
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private docrenewalmasterService: DocRenewalMasterService, private sharedService: SharedService,
    private commonService: CommonService) {
    this.docRenewalMasterModel = new Docrenewalmastermodel();

}
ngOnInit(): void {
    
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Document Renewals Master");
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
  
  this.sharedService.loading=true;
  //this.getdebitAc();

  this.selectedDocRenewalMasterDetails = this.docrenewalmasterService.getDocrenewalMasterDetails();
  this.formUser = this.formBuilder.group({
   // docCode: new FormControl('',[Validators.required]),
   cnorCneeID: new FormControl('',), 
   cnorCneeName: new FormControl('',), 
   printName:new FormControl('',), 
   cnorCneeFlag: new FormControl('',), 
   branchCode: new FormControl('',), 
   globalYN: new FormControl('',), 
   address1: new FormControl('',), 
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
  

  if (this.selectedDocRenewalMasterDetails.docRenewalID != '') {
    this.formUser.patchValue(this.selectedDocRenewalMasterDetails);      
    this.editMode = true;
  }
  

  this.sharedService.loading=false;
}
deleteDocRenewalMasterForm(): void {
  if(this.selectedDocRenewalMasterDetails.docRenewalID != '' ){      
    this.sharedService.loading=true;
    this.requestmodel.strRequest =this.selectedDocRenewalMasterDetails.docRenewalID 
    if (confirm("Are you sure, you want to delete this?")) {
        this.docrenewalmasterService.DocrenewalmasterDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if(this.responseDetails.status){
          this.toasterService.success(this.responseDetails.message);
          this.formUser.reset();
          this.route.navigate(['/docrenewalmasterlist']);
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
  this.route.navigate(['/docrenewalmasterlist']);
}

//Submit user form details //
submitDocRenewalMasterForm(): void {
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
  this.docRenewalMasterModel.docRenewalID = this.selectedDocRenewalMasterDetails.docRenewalID != '' ? this.selectedDocRenewalMasterDetails.docRenewalID : '';
  this.docRenewalMasterModel.docCode = selectedDataVal.docCode.toUpperCase();
  this.docRenewalMasterModel.docDescription = selectedDataVal.docDescription.toUpperCase();
  this.docRenewalMasterModel.reminderDays = selectedDataVal.reminderDays;
  this.docRenewalMasterModel.debitAc = selectedDataVal.debitAc;
  this.docRenewalMasterModel.debitType = selectedDataVal.debitType;
  this.docRenewalMasterModel.isActive = selectedDataVal.isActive;
  this.docRenewalMasterModel.recurring_Onetime = selectedDataVal.recurring_Onetime;  
  this.docRenewalMasterModel.loggedInUser = this.loggedInUserID;  

  this.docrenewalmasterService.docrenewalMasterDetailsSubmitted(this.docRenewalMasterModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if(this.responseDetails.status){
      this.toasterService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/docrenewalmasterlist']);
    }
    else{
      this.toasterService.warning(this.responseDetails.message);        
    }   
  });
  this.sharedService.loading=false;
}
}




