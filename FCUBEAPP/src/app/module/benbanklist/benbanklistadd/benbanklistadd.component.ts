
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { Drivermodel } from 'src/app/models/drivermodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { BenBankListService } from 'src/app/services/benbanklist.service';
import { Benbanklistmodel } from 'src/app/models/benbanklistmodel';
import { Benbankmodel } from 'src/app/models/benbankmodel';
import { Panwisetdsratemodel } from 'src/app/models/panwisetdsratemodel';

import { Requestmodel } from 'src/app/models/requestmodel';




@Component({
  selector: 'app-benbanklistadd',
  templateUrl: './benbanklistadd.component.html',
  styleUrls: ['./benbanklistadd.component.css']
})
export class BenbanklistaddComponent {
  loggedInUserID: string = '';
  formBenMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  minDate:string = '';
  mDate:string = '';
  maxDate: string = '';

  fromDate: string = '';
  responseDetails = new Responsemodel();
  selectedBenBankDetails = new Benbankmodel();
  

  constructor(private route: Router, private formBuilder: FormBuilder,
    private benbankModel: Benbankmodel, private benService: BenBankListService,
    private commonService: CommonService,
    private toasterService: ToastrService, private requestmodel: Requestmodel) {
    this.benbankModel = new Benbankmodel();

}
ngOnInit(): void {

  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Banks List Master"));
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }
  var userData = sessionStorage.getItem('userBranch')?.toString();
  if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
    this.branch = userData;
  }
  else {
    this.route.navigate(['/']);
  }
  var yearIDData = sessionStorage.getItem('yearID')?.toString();
  if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
    this.year = yearIDData;
  }
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }
  const today = new Date();
  const today2 = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  today.setMonth(month - 12);
  today2.setMonth(month - 2);
  this.fromDate = today.toLocaleDateString('en-CA').toString();

  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = this.commonService.getCurrentFiscalYear(this.loginDate).eDate.toLocaleDateString('en-CA').toString();
 
 //this.maxDate = today2.toLocaleDateString('en-CA').toString();

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

  this.selectedBenBankDetails = this.benService.getBenBankDetails();
  this.formBenMaster = this.formBuilder.group({
    bankShortCode : new FormControl('',[Validators.required]),
    bankName : new FormControl('', [Validators.required]),
   // validFrom : new FormControl(this.minDate, [Validators.required]),
   activeYN : new FormControl('Y', [Validators.required]),
   verifyAvailYN : new FormControl('', [Validators.required]),

  });
  this.formBenMaster.controls['activeYN'].disable(); 
  if (this.selectedBenBankDetails.bankId != '') {
 

   
 
    this.formBenMaster.patchValue(this.selectedBenBankDetails);
    this.formBenMaster.patchValue({
    //  validFrom: this.commonService.formatDate(this.selectedPanRateDetails.validFrom),
     // validUpto: this.commonService.formatDate(this.selectedPanRateDetails.validUpto),
   
    })
    this.formBenMaster.controls['activeYN'].enable(); 
   
    this.editMode = true;
  }
}
// convenience getter for easy access to contact form fields
get f() { return this.formBenMaster.controls; }
deleteBenBankForm(): void {
  if (this.selectedBenBankDetails.bankId != '') {
    this.requestmodel.strRequest = this.selectedBenBankDetails.bankId
    if (confirm("Are you sure, you want to delete this?")) {
      this.benService.benBankDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if(this.responseDetails.status){
          this.toasterService.success(this.responseDetails.message);
          this.formBenMaster.reset();
          this.route.navigate(['/banklistmst']);
        }
        else{
          this.toasterService.warning(this.responseDetails.message);        
        }   
      });
    }
  }
}
exit(): void {
  this.route.navigate(['/banklistmst']);
}

chkBankDuplicate(e:any){
  var selectedData = this.formBenMaster.getRawValue();
  

   // this.requestmodel.strRequest = e.value;
    this.requestmodel.strRequest = selectedData.bankName;
    this.benService.checkDuplicateBank(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formBenMaster.patchValue({
          bankName: ''
  
        });
        
      }
    });
    
}
chkCodeDuplicate(e:any){
  var selectedData = this.formBenMaster.getRawValue();
  

   // this.requestmodel.strRequest = e.value;
    this.requestmodel.strRequest = selectedData.bankShortCode;
    this.benService.checkDuplicateBank(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formBenMaster.patchValue({
          bankShortCode: ''
  
        });
        
      }
    });
    
}

submitBenBankForm() {
  if (this.formBenMaster.invalid) {
    this.toasterService.warning("Please Enter Mandatory Fields ");
    const controls = this.formBenMaster.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");
      }
    }
    return;
  }
  var selectedDataVal = this.formBenMaster.getRawValue();
 
  // if(selectedDataVal.panNo.length! = 10){
  //   this.toasterService.warning( "Pan No Is invalid !Please Enter Minimum 10 Char. Pan no");
  //   return;
  // }

  this.formSubmitted = true;
  var selectedDataVal = this.formBenMaster.getRawValue()
  this.benbankModel.bankId = this.selectedBenBankDetails.bankId;
  this.benbankModel.bankShortCode = selectedDataVal.bankShortCode.toString().toUpperCase();
  this.benbankModel.bankName = selectedDataVal.bankName.toString().toUpperCase();
  this.benbankModel.activeYN = selectedDataVal.activeYN;
  this.benbankModel.verifyAvailYN = selectedDataVal.verifyAvailYN;
 

  
 // this.benbankModel.isActive = selectedDataVal.isActive;

  //this.driverModel.removedYN = selectedDataVal.removedYN ? selectedDataVal.removedYN : 'N';

  this.benbankModel.loggedInUser = this.loggedInUserID;

  

  this.benService.benBankDetailsSubmitted(this.benbankModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formBenMaster.reset();
      this.route.navigate(['/banklistmst']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }
  });
}


}

