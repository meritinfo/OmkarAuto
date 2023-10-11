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
import { ToastrService } from 'ngx-toastr';

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
  loginDate: string = '';
  locationList: Dropdownmodel[] = [];
  selectedBankReceiptEntryDetails = new bankreceiptentrymodel();
  responseDetails = new Responsemodel();
  creditacList: Dropdownmodel[] = [];


 

  constructor(private route: Router, private formBuilder: FormBuilder, private bankreceiptentryModel: bankreceiptentrymodel, private bankreceiptentryService: BankReceiptEntryService, private toasterService: ToastrService, private commonService: CommonService) {
    this.bankreceiptentryModel = new bankreceiptentrymodel();

  

}
ngOnInit(): void {
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
      //vehicleMasterID: this.locationList.find(e => e.dataId ==  this.formUser.value.),
    }
  else {
    this.route.navigate(['/']);
  }
  this.getCreditAcList();
 this.selectedBankReceiptEntryDetails = this.bankreceiptentryService.getBankReceiptEntryDetails();

  this.formUser = this.formBuilder.group({
    ftmDate: new FormControl(this.loginDate,),
    docType: new FormControl('BP',),
    docSeries: new FormControl('BP',),
    docNo: new FormControl('',),
    remarks: new FormControl('',),
    refType: new FormControl('',),
    refNo: new FormControl('',),
    amount: new FormControl('',),
   
    utrNo: new FormControl('',),
    neftPmt: new FormControl('',),
    
   
    linkedYN: new FormControl('',),
    
   
    modifyRemarks: new FormControl('',),
    yearID: new FormControl('',),
   
   
   
    accountid2: new FormControl('',),
    docAmount :new FormControl('',),

    cashDetailsList: this.formBuilder.array([this.createMiscArray()]),
  

  });
  if (this.selectedBankReceiptEntryDetails.ftmId != '') {
    var selectedDataValue = this.formUser.getRawValue();
   
    this.formUser.patchValue(this.selectedBankReceiptEntryDetails);
  
    ftmDate: this.commonService.formatDate(this.selectedBankReceiptEntryDetails.ftmDate)
    remarks: this.selectedBankReceiptEntryDetails.remarks
    docSeries: this.selectedBankReceiptEntryDetails.docSeries
    docNo: this.selectedBankReceiptEntryDetails.docNo
    refType: this.selectedBankReceiptEntryDetails.refType
    accountid2: this.creditacList.find(e => e.dataId == selectedDataValue.accountid2)

  }
  //this.formUser.controls['ftmDate'].disable();
  this.formUser.controls['docSeries'].disable();

}
updateAmount(index: number, event: any, comingFrom: string) {
  var selectedDataValue = this.formUser.getRawValue();
  if (comingFrom === 'amount') {
    selectedDataValue.cashDetailsList[index].amount = event.target.value;
  }
  var totalAmount = 0;

  var amt = 0;
  for (var i = 0; i < selectedDataValue.cashDetailsList.length; i++) {
   // if (selectedDataValue.cashDetailsList[i].typeSign == 'C') {
      totalAmount = totalAmount + (selectedDataValue.cashDetailsList[i].amount == "" ? 0 : parseFloat(selectedDataValue.cashDetailsList[i].amount));
  //  }
   
  }

  this.formUser.patchValue({
    docAmount: totalAmount.toFixed(2),
 //   credit: totalCreditAmount.toFixed(2)
  });
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

addMiscItem(index: number): void {

  if (this.formCashArray.value[index].accountId != "" && this.formCashArray.value[index].amount != "" ) {
    this.formCashArray.push(this.createMiscArray());
  } else{
    this.toasterService.warning("Please select one account name, amount ");
  }
}
changePType(selectedValue: string) {
  var selectedDataValue = this.formUser.getRawValue();

    this.formUser.patchValue({

      docSeries: selectedValue
  
    });


  
  

  
}

removeMiscItem(index: number) {
  this.formCashArray.removeAt(index);
  this.updateAmount(index, undefined, "");
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
    chequeDate: [''],
    chequeNo: [''],
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
if (this.formUser.value.docType =="BP") {
if (this.formCashArray.value != undefined) {
  for (var i = 0; i < this.formCashArray.value.length; i++) {
    this.bankreceiptentryModel.detailList.push({
      'ftdID': this.formCashArray.value[i].ftdID,
      'ftmID': this.formCashArray.value[i].ftmID,
      'ftmDate': this.formCashArray.value[i].ftmDate,
      'slNo': this.formCashArray.value[i].slNo ,
      'typeSign':'D',
      'amount': this.formCashArray.value[i].amount,
      'narration': this.formCashArray.value[i].narration,
      'chequeDate': this.formCashArray.value[i].chequeDate,
      'chequeNo': this.formCashArray.value[i].chequeNo,
      'accountId': this.formCashArray.value[i].accountId ,
      'costRefNo': this.formCashArray.value[i].costRefNo,
      'reference': this.formCashArray.value[i].reference,
      'branchCode':  this.branchname ,
    })
    
 
  }
}
}else{
  if (this.formCashArray.value != undefined) {
    for (var i = 0; i < this.formCashArray.value.length; i++) {
      this.bankreceiptentryModel.detailList.push({
        'ftdID': this.formCashArray.value[i].ftdID,
        'ftmID': this.formCashArray.value[i].ftmID,
        'ftmDate': this.formCashArray.value[i].ftmDate,
        'slNo': this.formCashArray.value[i].slNo ,
        'typeSign': 'C',
        'amount': this.formCashArray.value[i].amount,
        'narration': this.formCashArray.value[i].narration,
        'chequeDate': this.formCashArray.value[i].chequeDate,
        'chequeNo': this.formCashArray.value[i].chequeNo,
        'accountId': this.formCashArray.value[i].accountId ,
        'costRefNo': this.formCashArray.value[i].costRefNo,
        'reference': this.formCashArray.value[i].reference,
        'branchCode': this.branchname,
      })
      
   
    }
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






