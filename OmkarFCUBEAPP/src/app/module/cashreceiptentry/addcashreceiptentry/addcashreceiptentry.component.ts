import { Component } from '@angular/core';

import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Cashreceiptentrymodel } from 'src/app/models/cashreceiptentrymodel';
import { CommonService } from 'src/app/services/common.service';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addcashreceiptentry',
  templateUrl: './addcashreceiptentry.component.html',
  styleUrls: ['./addcashreceiptentry.component.css']
})
export class AddcashreceiptentryComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  branchname: string = '';
  year: string = '';
  locationList: Dropdownmodel[] = [];
  responseDetails = new Responsemodel();
  creditacList: Dropdownmodel[] = [];


  selectedCashReceiptEntryDetails = new Cashreceiptentrymodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private cashreceiptentryModel: Cashreceiptentrymodel, private cashreceiptentryService: CashReceiptEntryService, private commonService: CommonService) {
    this.cashreceiptentryModel = new Cashreceiptentrymodel();

  

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
  this.selectedCashReceiptEntryDetails = this.cashreceiptentryService.getCashReceiptEntryDetails();
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

  if (this.selectedCashReceiptEntryDetails.ftmId != '') {
   
    this.formUser.patchValue(this.selectedCashReceiptEntryDetails);

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
submitCashReceiptPaymentsForm(): void {
this.userSubmitted = true;
if (this.formUser.invalid) {
  return;
}

this.cashreceiptentryModel.ftmId = this.selectedCashReceiptEntryDetails.ftmId != '' ? this.selectedCashReceiptEntryDetails.ftmId : '';
this.cashreceiptentryModel.ftmDate= this.formUser.value.ftmDate;
this.cashreceiptentryModel.docType = this.formUser.value.docType;
this.cashreceiptentryModel.docSeries = this.formUser.value.docSeries;
this.cashreceiptentryModel.docNo = this.formUser.value.docNo;
this.cashreceiptentryModel.seriesDoc = this.formUser.value.docSeries + this.formUser.value.docNo;;
this.cashreceiptentryModel.remarks = this.formUser.value.remarks;
this.cashreceiptentryModel.refType = this.formUser.value.refType;
this.cashreceiptentryModel.refNo = this.formUser.value.refNo;
this.cashreceiptentryModel.docAmount = this.formUser.value.docAmount;
this.cashreceiptentryModel.linkedYN   = this.formUser.value.linkedYN  ;
this.cashreceiptentryModel.yearID     = this.year   ;
this.cashreceiptentryModel.branchCode      =    this.branchname  ;
this.cashreceiptentryModel.modifyRemarks      = this.formUser.value.modifyRemarks     ;
if (this.formCashArray.value != undefined) {
  for (var i = 0; i < this.formCashArray.value.length; i++) {
    this.cashreceiptentryModel.detailList.push({
      'ftdID': this.formCashArray.value[i].ftdID,
      'ftmID': this.formCashArray.value[i].ftmID,
      'ftmDate': this.formCashArray.value[i].ftmDate,
      'slNo': this.formCashArray.value[i].slNo ,
      'typeSign': this.formCashArray.value[i].typeSign,
      'amount': this.formCashArray.value[i].amount,
      'narration': this.formCashArray.value[i].narration,
      'accountId': this.formCashArray.value[i].accountId ,
      'costRefNo': this.formCashArray.value[i].costRefNo,
      'reference': this.formCashArray.value[i].reference,
      'branchCode': this.formCashArray.value[i].branchCode,
    })
  }
}


this.cashreceiptentryService.cashReceiptEntryDetailsSubmitted(this.cashreceiptentryModel).subscribe((res: Responsemodel) => {
  this.responseDetails = res;
  console.log(this.responseDetails.message);
  this.formUser.reset();
  window.location.reload();
});
}
}



