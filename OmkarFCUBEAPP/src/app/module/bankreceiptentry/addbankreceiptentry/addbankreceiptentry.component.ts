import { Component } from '@angular/core';


import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { bankreceiptentrymodel } from 'src/app/models/bankreceiptentrymodel';
import { bankreceiptentrylistmodel } from 'src/app/models/bankreceiptentrylistmodel';
import { Cashreceiptentrymodel } from 'src/app/models/cashreceiptentrymodel';
import { CommonService } from 'src/app/services/common.service';
import { BankReceiptEntryService } from 'src/app/services/bankreceiptentry.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addbankreceiptentry',
  templateUrl: './addbankreceiptentry.component.html',
  styleUrls: ['./addbankreceiptentry.component.css']
})
export class AddbankreceiptentryComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  branchname: string = '';
  year: string = '';
  locationList: Dropdownmodel[] = [];
  selectedBankReceiptEntryDetails = new bankreceiptentrymodel();
  responseDetails = new Responsemodel();
  creditacList: Dropdownmodel[] = [];


 

  constructor(private route: Router, private formBuilder: FormBuilder, private bankreceiptentryModel: bankreceiptentrymodel, private bankreceiptentryService: BankReceiptEntryService, private commonService: CommonService) {
    this.bankreceiptentryModel = new bankreceiptentrymodel();

  

}
ngOnInit(): void {
  var userData = localStorage.getItem('uid')?.toString();
  if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
    this.loggedInUserID = userData;
  }
  if (this.loggedInUserID) {
    console.log(this.loggedInUserID);
  }
  var userData2 = localStorage.getItem('yearID')?.toString();
  if (typeof userData2 !== 'undefined' && userData2!== null && userData2 !== '') {
    this.year = userData2;
  }
  var userData5 = localStorage.getItem('userBranch')?.toString();
    if (typeof userData5 !== 'undefined' && userData5 !== null && userData5 !== '') {
      this.branchname = userData5;
      //vehicleMasterID: this.locationList.find(e => e.dataId ==  this.formUser.value.),
    }
  else {
    this.route.navigate(['/']);
  }
  this.getCreditAcList();
 this.selectedBankReceiptEntryDetails = this.bankreceiptentryService.getBankReceiptEntryDetails();
  this.formUser = this.formBuilder.group({
    ftmDate: new FormControl('',),
    docType: new FormControl('',),
    docSeries: new FormControl('',),
    docNo: new FormControl('',),
    remarks: new FormControl('',),
    refType: new FormControl('',),
    refNo: new FormControl('',),
    docAmount: new FormControl('',),
   
    utrNo: new FormControl('',),
    
   
    linkedYN: new FormControl('',),
    
   
    modifyRemarks: new FormControl('',),
    yearID: new FormControl('',),
   
   
   
    accountid2: new FormControl('',),

    cashDetailsList: this.formBuilder.array([this.createMiscArray()]),
  

  });
  if (this.selectedBankReceiptEntryDetails.ftmId != '') {
   
    this.formUser.patchValue(this.selectedBankReceiptEntryDetails);

  }
 

}
getCreditAcList(): void {
  this.commonService.getCreditAcList().subscribe((res) => {
    this.creditacList = res;
  });
}
getLocationList(): void {
  this.commonService.getLocationList().subscribe((res) => {
    this.locationList = res;
  });
}
addMiscItem(): void {
  this.formCashArray.push(this.createMiscArray());
}

removeMiscItem(index: number) {
  this.formCashArray.removeAt(index);
}

createMiscArray() {
  return this.formBuilder.group({
    ftdID: [''],
    ftmID: [''],
    ftmDate: [''],

    slNo: [''],
    typeSign: [''],
    amount: [''],
    reference: [''],
    accountId: [''],
    narration: [''],
    costRefNo: [''],

    branchCode: [''],
  });
}


get formCashArray() {
  return this.formUser.get("cashDetailsList") as FormArray;
}


// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }



//Submit user form details //
submitBankReceiptPaymentsForm(): void {
this.userSubmitted = true;
if (this.formUser.invalid) {
  return;
}

this.bankreceiptentryModel.ftmId = this.selectedBankReceiptEntryDetails.ftmId != '' ? this.selectedBankReceiptEntryDetails.ftmId : '';
this.bankreceiptentryModel.ftmDate= this.formUser.value.ftmDate;
this.bankreceiptentryModel.docType = this.formUser.value.docType;
this.bankreceiptentryModel.docSeries = this.formUser.value.docSeries;
this.bankreceiptentryModel.docNo = this.formUser.value.docNo;
this.bankreceiptentryModel.seriesDoc = this.formUser.value.docSeries + this.formUser.value.docNo;;
this.bankreceiptentryModel.remarks = this.formUser.value.remarks;
this.bankreceiptentryModel.refType = this.formUser.value.refType;
this.bankreceiptentryModel.refNo = this.formUser.value.refNo;
this.bankreceiptentryModel.docAmount = this.formUser.value.docAmount;
this.bankreceiptentryModel.linkedYN   = this.formUser.value.linkedYN  ;
this.bankreceiptentryModel.yearID     = this.year   ;
this.bankreceiptentryModel.branchCode      =    this.branchname  ;
this.bankreceiptentryModel.modifyRemarks      = this.formUser.value.modifyRemarks     ;
if (this.formCashArray.value != undefined) {
  for (var i = 0; i < this.formCashArray.value.length; i++) {
 
  }
}


this.bankreceiptentryService.bankReceiptEntryDetailsSubmitted(this.bankreceiptentryModel).subscribe((res: Responsemodel) => {
  this.responseDetails = res;
  console.log(this.responseDetails.message);
  this.formUser.reset();
  window.location.reload();
});
}
}






