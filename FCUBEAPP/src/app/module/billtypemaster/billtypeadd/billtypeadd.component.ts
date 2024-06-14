import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Billstypelistmodel } from 'src/app/models/billstypemasterlistmodel';
import { Billstypemodel } from 'src/app/models/billstypemastermodel';
import { BillsTypeService } from 'src/app/services/billstypemaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';

import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-billtypeadd',
  templateUrl: './billtypeadd.component.html',
  styleUrls: ['./billtypeadd.component.css']
})
export class BilltypeaddComponent {
  loggedInUserID: string = '';
  formBillTypeMaster!: FormGroup;
  userSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  classificationList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];

  List: Dropdownmodel[] = [];
  selectedBillsTypeMasterDetails = new Billstypemodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private billstypemodel: Billstypemodel, 
    private billsTypeService: BillsTypeService, 
    private commonService: CommonService,private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.billstypemodel = new Billstypemodel();

}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Bill Types Master");
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

  this.sharedService.loading = true;   

  this.selectedBillsTypeMasterDetails = this.billsTypeService.getBillsTypeDetails();
  this.formBillTypeMaster = this.formBuilder.group({   
    billTypeDesc: new FormControl('',[Validators.required]),
    mainAc: new FormControl('',[Validators.required]),
    otherAc: new FormControl('',),
    otherAc2: new FormControl('',),
    otherAc3: new FormControl('',),
    sacCode: new FormControl('',),
  });

  if (this.selectedBillsTypeMasterDetails.billTypeId != '') {
    this.formBillTypeMaster.patchValue(this.selectedBillsTypeMasterDetails);    
    this.editMode = true;
  }
  this.getGetFinAcList();
  this.sharedService.loading = false;

}
get f() { return this.formBillTypeMaster.controls; }
exit(): void {
  this.route.navigate(['/billtypeslist']);
}
getGetFinAcList(){
  this.commonService.GetFinAcList().subscribe((res) => {
    this.creditacList = res;    
  }); 
}
chkBillTypeDuplicate(){
  var selectedData = this.formBillTypeMaster.getRawValue();
  

    this.requestmodel.strRequest = selectedData.billTypeDesc;
  //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
    this.billsTypeService.checkDuplicateBillType(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formBillTypeMaster.patchValue({
          billTypeDesc: ''
  
        });
        
      }
    });
    
}

deleteBillTypeMasterForm(): void {
  if(this.selectedBillsTypeMasterDetails.billTypeId != '' ){
   this.requestmodel.strRequest =this.selectedBillsTypeMasterDetails.billTypeId
    if (confirm("Are you sure, you want to delete this?")) {
          this.billsTypeService.billsTypeDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formBillTypeMaster.reset();
            this.route.navigate(['/billtypeslist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
      });
    }
  }
}


//Submit user form details //
submitBillTypeMasterForm(): void {  
  if (this.formBillTypeMaster.invalid) {
    this.toasterService.warning("Please Enter Mandatory Fields ");
    const controls = this.formBillTypeMaster.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");   
      }
    } 
    return;
  }
    
  this.sharedService.loading = true;

  var selectedDataVal = this.formBillTypeMaster.getRawValue();
  this.userSubmitted = true;
  this.billstypemodel.billTypeId = this.selectedBillsTypeMasterDetails.billTypeId != '' ? this.selectedBillsTypeMasterDetails.billTypeId : '';
  this.billstypemodel.billTypeDesc  = selectedDataVal.billTypeDesc.toString().toUpperCase();
  this.billstypemodel.mainAc = selectedDataVal.mainAc;
  this.billstypemodel.otherAc = selectedDataVal.otherAc;
  this.billstypemodel.otherAc2 = selectedDataVal.otherAc2;
  this.billstypemodel.otherAc3 = selectedDataVal.otherAc3;
  this.billstypemodel.sacCode = selectedDataVal.sacCode;
  this.billstypemodel.loggedInUserID   = this.loggedInUserID;

  this.billsTypeService.billsTypeDetailsSubmitted(this.billstypemodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formBillTypeMaster.reset();
      this.route.navigate(['/billtypeslist']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }      
  });
  this.sharedService.loading = false;
}
}


