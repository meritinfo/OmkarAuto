
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Cnorcneemastermodel } from 'src/app/models/cnorcneemastermodel';
import { CnorCneeMasterService } from 'src/app/services/cnorcneemaster.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-cnorcneemasteradd',
  templateUrl: './cnorcneemasteradd.component.html',
  styleUrls: ['./cnorcneemasteradd.component.css']
})
export class CnorcneemasteraddComponent {
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
dashboard: string ="";
  responseDetails = new Responsemodel();
  debitAcList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  
  
  selectedCnorCneeMasterDetails = new Cnorcneemastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private cnorcneemastermodel: Cnorcneemastermodel, 
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private cnorCneeMasterService: CnorCneeMasterService, private sharedService: SharedService,
    private commonService: CommonService) {
    this.cnorcneemastermodel = new Cnorcneemastermodel();

}
ngOnInit(): void {
    
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Consignor/Consignee Master");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  
      this.sharedService.loggedInStatus = true;
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

  this.selectedCnorCneeMasterDetails = this.cnorCneeMasterService.getCnorcneeMasterModelDetails();
  this.formUser = this.formBuilder.group({
   // docCode: new FormControl('',[Validators.required]),
   cnorCneeID: new FormControl('',), 
   cnorCneeName: new FormControl('',[Validators.required, Validators.minLength(2)]),
   printName:new FormControl('',[Validators.required, Validators.minLength(2)]),
   cnorCneeFlag: new FormControl('',[Validators.required]), 
   branchCode: new FormControl('',[Validators.required]), 
   globalYN: new FormControl('',[Validators.required]), 
   address1: new FormControl('',[Validators.required, Validators.minLength(2)]),
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
   isActive: new FormControl('Y',), 
   inActiveDate: new FormControl('',), 
   olD_CnorCnee_ID: new FormControl('',), 
  });
  this.getBranchList();
  this.getStateList();
  this.formUser.controls['isActive'].disable(); 
  this.formUser.controls['inActiveDate'].disable(); 
  if (this.selectedCnorCneeMasterDetails.cnorCneeID != '') {
    this.formUser.patchValue(this.selectedCnorCneeMasterDetails);      
    this.editMode = true;
  
    this.formUser.patchValue({
      inActiveDate: this.commonService.formatDate(this.selectedCnorCneeMasterDetails.inActiveDate)
     
    })   
    this.formUser.controls['isActive'].enable(); 
    this.formUser.controls['inActiveDate'].enable();    
  }

  

  this.sharedService.loading=false;
}
get f() { return this.formUser.controls; }
deleteCnorCneeMasterForm(): void {
  if(this.selectedCnorCneeMasterDetails.cnorCneeID != '' ){      
    this.sharedService.loading=true;
    this.requestmodel.strRequest =this.selectedCnorCneeMasterDetails.cnorCneeID 
    if (confirm("Are you sure, you want to delete this?")) {
        this.cnorCneeMasterService.cnorCneeMasterDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
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

onNameChange(){
  var selectedDataVal =this.formUser.getRawValue();
  this.formUser.patchValue({
    printName: selectedDataVal.cnorCneeName.toString().toUpperCase()
   
  })   
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
submitCnorCneeMasterForm(): void {
if (this.formUser.invalid) {
  this.toasterService.warning("Please enter mandatory fields");

  const controls = this.formUser.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      // Convert camelCase key to readable format
      const readableName = name.replace(/([A-Z])/g, ' $1');
      const titleCaseName = readableName.charAt(0).toUpperCase() + readableName.slice(1);

      this.toasterService.warning(titleCaseName + " field is invalid");
    }
  }

  return;
}
  this.sharedService.loading=true;
  var selectedDataVal =this.formUser.getRawValue();
  this.formSubmitted = true;
  this.cnorcneemastermodel.cnorCneeID = this.selectedCnorCneeMasterDetails.cnorCneeID != '' ? this.selectedCnorCneeMasterDetails.cnorCneeID : '';
 // this.docRenewalMasterModel.docCode = selectedDataVal.docCode.toUpperCase();
 this.cnorcneemastermodel.cnorCneeName = selectedDataVal.cnorCneeName.toString().toUpperCase();
  this.cnorcneemastermodel.printName = selectedDataVal.printName.toString().toUpperCase();
  this.cnorcneemastermodel.cnorCneeFlag = selectedDataVal.cnorCneeFlag
  this.cnorcneemastermodel.branchCode = selectedDataVal.branchCode
  this.cnorcneemastermodel.globalYN = selectedDataVal.globalYN
  this.cnorcneemastermodel.address1 = selectedDataVal.address1.toString().toUpperCase();
  this.cnorcneemastermodel.address2 = selectedDataVal.address2.toString().toUpperCase();
  this.cnorcneemastermodel.address3 = selectedDataVal.address3.toString().toUpperCase();
  this.cnorcneemastermodel.stateCode = selectedDataVal.stateCode
  this.cnorcneemastermodel.pinCode = selectedDataVal.pinCode
  this.cnorcneemastermodel.phone = selectedDataVal.phone
  this.cnorcneemastermodel.email = selectedDataVal.email;
  this.cnorcneemastermodel.contactPerson1 = selectedDataVal.contactPerson1.toString().toUpperCase();
  this.cnorcneemastermodel.mobile1 = selectedDataVal.mobile1;
  this.cnorcneemastermodel.contactPerson2 = selectedDataVal.contactPerson2.toString().toUpperCase();
  this.cnorcneemastermodel.mobile2 = selectedDataVal.mobile2;
  this.cnorcneemastermodel.contactPerson3 = selectedDataVal.contactPerson3.toString().toUpperCase();
  this.cnorcneemastermodel.mobile3 = selectedDataVal.mobile3;
  this.cnorcneemastermodel.gstNo = selectedDataVal.gstNo;
  this.cnorcneemastermodel.isActive = selectedDataVal.isActive;
  this.cnorcneemastermodel.inActiveDate = selectedDataVal.inActiveDate;
 // this.cnorcneemastermodel.olD_CnorCnee_ID = selectedDataVal.olD_CnorCnee_ID;
  this.cnorcneemastermodel.loggedInUser = this.loggedInUserID;  

  this.cnorCneeMasterService.cnorcneeMasterModelSubmitted(this.cnorcneemastermodel).subscribe((res: Responsemodel) => {
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





