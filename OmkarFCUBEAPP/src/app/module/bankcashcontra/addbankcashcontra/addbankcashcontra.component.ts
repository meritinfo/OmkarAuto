import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { BankCashContraModel } from 'src/app/models/bankcashcontramodel';
import { Bankcashcontralistmodel } from 'src/app/models/bankcashcontralistmodel';
import { Cashreceiptentrymodel } from 'src/app/models/cashreceiptentrymodel';
import { CommonService } from 'src/app/services/common.service';
import { BankCashContraService } from 'src/app/services/bankcashcontra.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addbankcashcontra',
  templateUrl: './addbankcashcontra.component.html',
  styleUrls: ['./addbankcashcontra.component.css']
})
export class AddbankcashcontraComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  branchname: string = '';
  year: string = '';
  loginDate: string = '';
  locationList: Dropdownmodel[] = [];
  selectedBankCashContraDetails = new BankCashContraModel();
  responseDetails = new Responsemodel();
  creditacList: Dropdownmodel[] = [];


  
  constructor(private route: Router, private formBuilder: FormBuilder, private bankCashcontraModel: BankCashContraModel, private bankCashcontraService: BankCashContraService, private toasterService: ToastrService, private commonService: CommonService) {
    this.bankCashcontraModel = new BankCashContraModel();


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
 this.selectedBankCashContraDetails = this.bankCashcontraService.getBankCashContraDetails();

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
   
   
   
    accountId2: new FormControl('',),
    docAmount :new FormControl('',),

    cashDetailsList: this.formBuilder.array([this.createMiscArray()]),
  

  });
  if (this.selectedBankCashContraDetails.ftmId != '') {
    var selectedDataValue = this.formUser.getRawValue();
   
    this.formUser.patchValue(this.selectedBankCashContraDetails);
  
    ftmDate: this.commonService.formatDate(this.selectedBankCashContraDetails.ftmDate)
    remarks: this.selectedBankCashContraDetails.remarks
    docSeries: this.selectedBankCashContraDetails.docSeries
    docNo: this.selectedBankCashContraDetails.docNo
    refType: this.selectedBankCashContraDetails.refType
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
submitBankCashContraForm(): void {
this.userSubmitted = true;
if (this.formUser.invalid) {
  return;
}


this.bankCashcontraModel.ftmId = this.selectedBankCashContraDetails.ftmId != '' ? this.selectedBankCashContraDetails.ftmId : '';
this.bankCashcontraModel.ftmDate= this.formUser.value.ftmDate;
this.bankCashcontraModel.docType = this.formUser.value.docType;
this.bankCashcontraModel.docSeries = this.formUser.value.docSeries;
this.bankCashcontraModel.docNo = this.formUser.value.docNo;
this.bankCashcontraModel.seriesDoc = this.formUser.value.docSeries + this.formUser.value.docNo;;
this.bankCashcontraModel.remarks = this.formUser.value.remarks;
this.bankCashcontraModel.refType = this.formUser.value.refType;
this.bankCashcontraModel.refNo = this.formUser.value.refNo;
this.bankCashcontraModel.docAmount = this.formUser.value.docAmount;
this.bankCashcontraModel.linkedYN   = this.formUser.value.linkedYN  ;
this.bankCashcontraModel.yearID     = this.year   ;
this.bankCashcontraModel.branchCode      =    this.branchname  ;
this.bankCashcontraModel.modifyRemarks      = this.formUser.value.modifyRemarks     ;
if (this.formUser.value.docType =="BP") {
if (this.formCashArray.value != undefined) {
  for (var i = 0; i < this.formCashArray.value.length; i++) {
    this.bankCashcontraModel.detailList.push({
      'index': '',
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
      this.bankCashcontraModel.detailList.push({
        'index': '',
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

this.bankCashcontraService.bankCashContraDetailsSubmitted(this.bankCashcontraModel).subscribe((res: Responsemodel) => {
  this.responseDetails = res;
  console.log(this.responseDetails.message);
  this.formUser.reset();
  window.location.reload();
});
}
}







