
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  keywordLocation = 'dataName';
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  
  responseDetails = new Responsemodel();
  debitAcList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  ccList: Dropdownmodel[] = [];
  
  
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
    else {
      this.route.navigate(['/']);
    }
    
     this.formUser = this.formBuilder.group({    
      cnorCneeID: new FormControl('',[Validators.required]),      
      arrayList: this.formBuilder.array([this.createInitialArray()]),     
    });    
  
  this.sharedService.loading=true;
  //this.getdebitAc();

  this.selectedCnorCneeGstDetails = this.cnorCneeGstService.getCnorcneeGstModelDetails();
  // this.formUser = this.formBuilder.group({
  //  // docCode: new FormControl('',[Validators.required]),
  //  cnorCneeID: new FormControl('',), 
  
   
  //  location: new FormControl('',[Validators.required]), 
  
  //  address1: new FormControl('',[Validators.required]), 
  //  address2: new FormControl('',), 
  //  address3: new FormControl('',), 
  //  stateCode: new FormControl('',), 
  //  pinCode: new FormControl('',), 
  //  phone: new FormControl('',), 
  //  email: new FormControl('',), 
  //  contactPerson: new FormControl('',), 
  //  mobileNo: new FormControl('',), 

  //  gstNo: new FormControl('',), 
 
 
  // });
  this.getBranchList();
  this.getStateList();
  this.getCneeCnorList();

  // if (this.selectedCnorCneeGstDetails.cnorCneeDetID != '') {
  //   this.formUser.controls['location'].disable(); 
  //   this.formUser.patchValue(this.selectedCnorCneeGstDetails);      
  //   this.editMode = true;
  // }
  

  this.sharedService.loading=false;
}
get f() { return this.formUser.controls; }
deleteCnorCneeMasterForm(): void {
  if(this.selectedCnorCneeGstDetails.cnorCneeID != '' ){      
    this.sharedService.loading=true;
    this.requestmodel.strRequest =this.selectedCnorCneeGstDetails.cnorCneeID 
    if (confirm("Are you sure, you want to delete this?")) {
        this.cnorCneeGstService.cnorCneeGstDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if(this.responseDetails.status){
          this.toasterService.success(this.responseDetails.message);
          this.formUser.reset();
          this.route.navigate(['/cnorcneegst']);
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
  this.route.navigate(['/cnorcneegst']);
}
getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}
startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
  return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
};
  
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
getCneeCnorList(): void {
  this.commonService.GetCneeCnorList().subscribe((res) => {
    this.ccList = res;
  });
}
createInitialArray() {
  return this.formBuilder.group({
    cnorCneeID:  [''],
    location:  [''],
    gstNo:  [''],
    address1:  [''],
    address2:  [''],
    address3:  [''],
    stateCode:  [''],
    pinCode:  [''],
    mobileNo :  [''],
    contactPerson:  [''],
    email:  [''],
  });
}
get formArray() {
  return this.formUser.get("arrayList") as FormArray;
}
selectEvent(item: any) {
  this.requestmodel.strRequest = item.dataId;    
  this.formArray.clear();
  this.formArray.push(this.createInitialArray());
  this.cnorCneeGstService.getCnorCneeDtlList(this.requestmodel).subscribe((res) => {
    this.cnorcneegstmodel = res;
    if(res.cnorCneeGstDetail.length>0){
      this.formArray.clear();
      for (var i = 0; i < res.cnorCneeGstDetail.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("location")?.setValue(res.cnorCneeGstDetail[i].location);
        this.formArray.controls[i].get("gstNo")?.setValue(res.cnorCneeGstDetail[i].gstNo);
     
        this.formArray.controls[i].get("address1")?.setValue(res.cnorCneeGstDetail[i].address1);
        this.formArray.controls[i].get("address2")?.setValue(res.cnorCneeGstDetail[i].address2);
        this.formArray.controls[i].get("address3")?.setValue(res.cnorCneeGstDetail[i].address3);
  
        this.formArray.controls[i].get("stateCode")?.setValue(res.cnorCneeGstDetail[i].stateCode);
        this.formArray.controls[i].get("pinCode")?.setValue(res.cnorCneeGstDetail[i].pinCode);
        this.formArray.controls[i].get("mobileNo")?.setValue(res.cnorCneeGstDetail[i].mobileNo);
        this.formArray.controls[i].get("contactPerson")?.setValue(res.cnorCneeGstDetail[i].contactPerson);
        this.formArray.controls[i].get("email")?.setValue(res.cnorCneeGstDetail[i].email);
      }
    }  
  });
}
addItem(index: number): void { 
  var selectedData = this.formUser.getRawValue()
  if (selectedData.arrayList[index].location != "" && selectedData.arrayList[index].gstNo != "") {
    this.formArray.push(this.createInitialArray());
  } 
  else {
    this.toasterService.warning("Please select Required Fields");
  }
}

removeItem(index: number) {
  this.formArray.removeAt(index);
}
onChangeSearch(e: any) {
  // do something
}

onFocused(e: any) {
  // do something
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
  var selectedDataValue =this.formUser.getRawValue();
  this.formSubmitted = true;
  //this.cnorcneegstmodel.cnorCneeDetID = this.selectedCnorCneeGstDetails.cnorCneeDetID != '' ? this.selectedCnorCneeGstDetails.cnorCneeDetID : '';
 // this.docRenewalMasterModel.docCode = selectedDataVal.docCode.toUpperCase();
 //this.cnorcneemastermodel.cnorCneeName = selectedDataVal.cnorCneeName.toString().toUpperCase();
  //this.cnorcneemastermodel.printName = selectedDataVal.printName.toString().toUpperCase();
 // cnorcneegstmodel.cnorCneeDetID = selectedDataVal.
  this.cnorcneegstmodel.cnorCneeID = selectedDataValue.cnorCneeID
  this.cnorcneegstmodel.cnorCneeGstDetail = [];

    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if(selectedDataValue.arrayList[i].location!='' && selectedDataValue.arrayList[i].gstNo !=''){
        this.cnorcneegstmodel.cnorCneeGstDetail.push({
          'cnorCneeDetID':'',
          'cnorCneeID': selectedDataValue.accountId? selectedDataValue.accountId.dataId : '',
          'location': selectedDataValue.arrayList[i].location,
          'gstNo': selectedDataValue.arrayList[i].gstNo.toString(),
         // 'address1':  selectedDataValue.arrayList[i].address1.toString().toUpperCase(),
        'address1':  selectedDataValue.arrayList[i].address1,
          'address2':  selectedDataValue.arrayList[i].address2,
          'address3': selectedDataValue.arrayList[i].address3,
          'contactPerson': selectedDataValue.arrayList[i].contactPerson,
          'stateCode':  selectedDataValue.arrayList[i].stateCode,
          'pinCode':  selectedDataValue.arrayList[i].pinCode,
          'mobileNo' :  selectedDataValue.arrayList[i].mobileNo,
          'email':  selectedDataValue.arrayList[i].email,
          //'centrename':  selectedDataValue.arrayList[i].email.toString(),
        });
      }
    }
 //cnorcneegstmodel. olD_CnorCnee_ID: string

  this.cnorCneeGstService.cnorcneeGstModelSubmitted(this.cnorcneegstmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if(this.responseDetails.status){
      this.toasterService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/cnorcneegst']);
    }
    else{
      this.toasterService.warning(this.responseDetails.message);        
    }   
  });
  this.sharedService.loading=false;
}
}





