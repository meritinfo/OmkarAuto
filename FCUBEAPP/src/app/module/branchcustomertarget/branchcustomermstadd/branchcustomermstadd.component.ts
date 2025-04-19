
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import {BranchCustomerTargetService } from 'src/app/services/branchcustomertargetmst.service';
import {Branchcustomertargetmodel } from 'src/app//models/branchcustomertargetmstmodel';
import {Branchcustomertargetmstlistmodel } from 'src/app//models/branchcustomermstlist';
import { Responsemodel } from 'src/app/models/responsemodel';

import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-branchcustomermstadd',
  templateUrl: './branchcustomermstadd.component.html',
  styleUrls: ['./branchcustomermstadd.component.css']
})
export class BranchcustomermstaddComponent {
   loggedInUserID: string = '';
    year: string = '';
    locationList: Dropdownmodel[] = [];
    ledgerAcList: Dropdownmodel[] = [];
    yearList: Dropdownmodel[] = [];
    branchList: Dropdownmodel[] = [];
    vehicleGrpList: Dropdownmodel[] = [];
    formRatesMaster!: FormGroup;
    selectedBranchCustomer = new Branchcustomertargetmodel();
    branchcustomermstmodel = new Branchcustomertargetmodel();
    keywordLocation = 'dataName';
    formSubmitted = false;
    editMode = false;
    createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false;
    responseDetails = new Responsemodel();
    fromDate: string = '';
    maxDate: string = '';
    minDate: string = '';
    loginDate: string = '';
  
    constructor(private branchcustomertargetmodel: Branchcustomertargetmodel, private sharedService: SharedService,
      private requestmodel: Requestmodel, private route: Router, private formBuilder: FormBuilder,
      private commonService: CommonService, private branchCustomerTargetService: BranchCustomerTargetService,
      private toasterService: ToastrService) {
      this.branchcustomertargetmodel = new Branchcustomertargetmodel();

}
ngOnInit(): void {

  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Branch/Customer Targets");      
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  var yearIDData = sessionStorage.getItem('yearID')?.toString();
  if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
    this.year = yearIDData;
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
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }

    
  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
  
  this.fromDate = this.minDate ;



  this.formRatesMaster = this.formBuilder.group({
    yearId: new FormControl('', [Validators.required]),
    branchCode: new FormControl('', [Validators.required]),


    arrayList: this.formBuilder.array([this.createInitialArray()])          

  });

  //this.formArray.controls[0].get("destState")?.disable();
 // this.formRatesMaster.controls['rateMethod'].disable();
  

  this.sharedService.loading=true;
//  this.getLocationList();
  this.getBranchList();
  this.getBankAcList();
  this.getYearList();
 // this.getRateList();
 // this.getVehicleGrpList();
 // this.getCreditAcList();
  this.selectedBranchCustomer = this.branchCustomerTargetService.getBranchCustomerDetails();

  // if (this.selectedBranchCustomer.id != '') {   
  //   this.formRatesMaster.controls['accountid'].disable();
  //   this.formRatesMaster.controls['fromPlace'].disable();
  //   this.formRatesMaster.controls['rateForStateOrToPlace'].disable();
  // }

  setTimeout(() => {
    if (this.selectedBranchCustomer.id!= '') {    
      
      this.formRatesMaster.patchValue({
      //  validFrom: this.commonService.formatDate(this.selectedBranchCustomer.validFrom),
      //  validUpto: this.commonService.formatDate(this.selectedBranchCustomer.validUpto), 
      //  accountid: this.creditacList.find(e => e.dataId == this.selectedRatesMaster.accountid),
     //   fromPlace: this.locationList.find(e => e.dataId == this.selectedRatesMaster.fromPlace),

      });
      this.editMode = true;
    //  this.formRatesMaster.controls['rateTypeId'].disable();
    //  this.formRatesMaster.controls['vehicleTypeGroupId'].disable();
     // this.getFreightRateInnerGridList();
    }
  }, 2000);
  this.sharedService.loading=false;
}

get f() { return this.formRatesMaster.controls; }
get formArray() {
  return this.formRatesMaster.get("arrayList") as FormArray;
}

onChangeSearch(search: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e: any) {
  // do something
}
createInitialArray() {
  return this.formBuilder.group({
    dtlId : ['', []],
  //  id : ['', []],
    yearId : ['', []],
    branchCode  : ['', []],
    accountId   : ['', []],
    targetAmt    : ['', []],
  });
}

startWithFilter = function (locationList: Dropdownmodel[], query: string): any[] {
  return locationList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
};

addItem(index: number): void {
  var selectedDataVal= this.formRatesMaster.getRawValue()
  // if ((this.formArray.value[index].destState != "" || this.formArray.value[index].toPlace != "") 
  // && this.formArray.value[index].rate) {
  //   if (selectedDataVal.rateForStateOrToPlace == "P" && this.formArray.value[index].toPlace.dataId==selectedDataVal.fromPlace.dataId){
  //     this.toasterService.warning("From Point cannot be same as To Place in details grid");
  //     return;
  //   }
  //   else if (selectedDataVal.rateForStateOrToPlace == "S" && this.formArray.value[index].destState.dataId==selectedDataVal.fromPlace.dataId){
  //     this.toasterService.warning("From Point cannot be same as State in details grid");
  //     return;
  //   }
  //   else {
      this.formArray.push(this.createInitialArray()); 
  //     this.formRatesMaster.controls['rateForStateOrToPlace'].disable();
  //   }    
  // }
  // else {
  //   this.toasterService.warning("Please select Required Fields ");
  //   return;
  // }
  
  // var i=0;
  // var selectedDataVal=this.formRatesMaster.getRawValue();
 
  // for (i=0; i<this.formArray.controls.length;i++){
  //   if (selectedDataVal.rateForStateOrToPlace == "P"){
  //     this.formArray.controls[i].get("destState")?.disable();
  //   }
  //   else{
  //     this.formArray.controls[i].get("toPlace")?.disable();
  //   }
  // }

}
getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}
getBankAcList(): void {
  this.commonService.getSubledgerAcList().subscribe((res) => {
    this.ledgerAcList = res;
  });
}

getYearList():void{
  this.commonService.getYearList().subscribe((res) => {
    this.yearList = res;
  });
}   



removeItem(index: number){ 
  if (confirm("Are you sure, you want to delete this?")) {
  this.formArray.removeAt(index);
  if (this.formArray.length==1){
    this.formRatesMaster.controls['rateForStateOrToPlace'].enable();
  }
}
}


deleteBranchCustomerForm(): void {
  if (this.selectedBranchCustomer.id != '') {
    this.sharedService.loading=true;
    this.requestmodel.strRequest = this.selectedBranchCustomer.id;
    if (confirm("Are you sure, you want to delete this?")) {
      this.branchCustomerTargetService.branchCustomerTargetDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.toasterService.success(this.responseDetails.message);
          this.formRatesMaster.reset();
          this.route.navigate(['/branchcusttarget']);
        }
        else {
          this.toasterService.warning(this.responseDetails.message);
        }    
      });
    }
    this.sharedService.loading=false;
  }
}
exit(): void {
  this.route.navigate(['/branchcusttarget']);
}

//Submit form details //
submitBranchCustomerForm(): void {
  if (this.formRatesMaster.invalid) {
    this.toasterService.warning("Please Enter Mandatory Fields "); 
    const controls = this.formRatesMaster.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");   
      }
    } 
    return;
  }
            
  // if (this.formRatesMaster.controls['arrayList'].invalid) {
  //   this.toasterService.warning("Details fields are mandatory");
  //   return;
  // }
  
  var selectedDataVal=this.formRatesMaster.getRawValue();
  
  // if (selectedDataVal.fromPlace.dataId) {
  //   //ignore
  // }
  // else{
  //   this.toasterService.warning(" From Point is Invalid");
  //   return;
  // }
  
  this.branchcustomertargetmodel.id = this.selectedBranchCustomer.id ;
  this.branchcustomertargetmodel.yearId = selectedDataVal.yearId;
  this.branchcustomertargetmodel.branchCode  = selectedDataVal.branchCode?selectedDataVal.branchCode.dataId:0;


  this.branchcustomertargetmodel.loggedInUser = this.loggedInUserID; 

  this.branchcustomertargetmodel.branchCustomerTargetDtlList = [];
  if(selectedDataVal.arrayList.length==0){
    this.toasterService.warning("Provide atleast one detail record");
    this.sharedService.loading=false;
    return;
  }

  for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
    if(selectedDataVal.arrayList[i].accountId!='' || selectedDataVal.arrayList[i].targetAmt !=''){
      this.branchcustomertargetmodel.branchCustomerTargetDtlList.push({
        'dtlId': '',
       // 'id': '',
        'yearId': selectedDataVal.yearId,
        'branchCode': selectedDataVal.branchCode,
        'accountId': selectedDataVal.arrayList[i].accountId,
        'targetAmt': selectedDataVal.arrayList[i].TargetAmt ,
        
      });
    }
  }

  //Start date end date validation
  // if (Date.parse(this.branchcustomertargetmodel.validUpto) < Date.parse(this.ratesmastermodel.validFrom)) {
  //   this.toasterService.warning("End date should be greater than start date");
  //   this.sharedService.loading=false;
  //   return;
  // }

  // const found = this.branchcustomertargetmodel.branchCustomerTargetDtlList.some(el => el.rate === '');
  //   if (found) {
  //     this.toasterService.warning("Rate cannot be Empty in details grid");
  //     this.sharedService.loading=false;
  //     return;
  //   }

  // if (this.branchcustomertargetmodel.rateForStateOrToPlace == "P") {     
  //   const found = this.branchcustomertargetmodel.freightRatesDetailsList.some(el => el.toPlace === this.ratesmastermodel.fromPlace);
  //   if (found) {
  //     this.toasterService.warning("From Point cannot be same as To Place in details grid");
  //     this.sharedService.loading=false;
  //     return;
  //   }
  //   //Duplicate destination check
  //   const foundDuplicateName = this.ratesmastermodel.freightRatesDetailsList.find((data, index) => {
  //     return this.ratesmastermodel.freightRatesDetailsList.find((x, ind) => x.toPlace === data.toPlace && index !== ind);
  //   });
  //   if (foundDuplicateName) {
  //     this.toasterService.warning(" To place in details grid not allowed");
  //     this.sharedService.loading=false;
  //     return;
  //   }
  // }
  // else {
  //   const found = this.ratesmastermodel.freightRatesDetailsList.some(el => el.destState === this.ratesmastermodel.fromPlace);
  //   if (found) {
  //     this.toasterService.warning("From Point cannot be same as State in details grid");
  //     this.sharedService.loading=false;
  //     return;
  //   }

    //Duplicate destination check
  //   const foundDuplicateName = this.ratesmastermodel.freightRatesDetailsList.find((data, index) => {
  //     return this.ratesmastermodel.freightRatesDetailsList.find((x, ind) => x.destState === data.destState && index !== ind);
  //   });
  //   if (foundDuplicateName) {
  //     this.toasterService.warning(" State in details grid not allowed");
  //     this.sharedService.loading=false;
  //     return;
  //   }
  // }

  this.formSubmitted = true;
  this.sharedService.loading=true;
  this.branchCustomerTargetService.branchCustomerTargetSubmitted(this.branchcustomertargetmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formRatesMaster.reset();
      this.route.navigate(['/branchcusttarget']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }    
  });
      
  this.sharedService.loading=false;
}



}


