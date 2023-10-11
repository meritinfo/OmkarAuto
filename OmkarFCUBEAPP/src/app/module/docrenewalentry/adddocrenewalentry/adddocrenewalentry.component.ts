import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Docrenewalentrymodel } from 'src/app/models/docrenewalentrymodel';
import { CommonService } from 'src/app/services/common.service';
import { DocRenewalEntryService } from 'src/app/services/docrenewalentry.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adddocrenewalentry',
  templateUrl: './adddocrenewalentry.component.html',
  styleUrls: ['./adddocrenewalentry.component.css']
})
export class AdddocrenewalentryComponent {
  loggedInUserID: string = '';
  formDocEntry!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();


  selectedDocRenewalEntryDetails = new Docrenewalentrymodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private docRenewalentryModel: Docrenewalentrymodel, private docrenewalEntryService: DocRenewalEntryService, private commonService: CommonService) {
    this.docRenewalentryModel = new Docrenewalentrymodel();

}
ngOnInit(): void {
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

  this.selectedDocRenewalEntryDetails = this.docrenewalEntryService.getDocrenewalEntryDetails();
  this.formDocEntry = this.formBuilder.group({
    transDate: new FormControl('',),
    docRenewalID: new FormControl('',),
    documentRefNo: new FormControl('',),
    renewalCompany: new FormControl('',),
    vehicleMasterID: new FormControl('',),
    validFromDt: new FormControl('',),
    validToDt: new FormControl('',),
    basicAmt: new FormControl('',),
    sgstPct: new FormControl('',),
    sgstAmt: new FormControl('',),
    cgstPct: new FormControl('',),
    cgstAmt: new FormControl('',),
    igstPct: new FormControl('',),
    igstAmt: new FormControl('',),
    hsnCode1: new FormControl('',),
    basicAmt2: new FormControl('',),
    sgstPct2: new FormControl('',),
    sgstAmt2: new FormControl('',),
    cgstPct2: new FormControl('',),
    cgstAmt2: new FormControl('',),
    igstPct2: new FormControl('',),
    igstAmt2: new FormControl('',),
    hsnCode2: new FormControl('',),
    nonGstAmount: new FormControl('',),
    nonGstAmtDesc: new FormControl('',),
    subTotal: new FormControl('',),
    roundOff: new FormControl('',),
    netAmount: new FormControl('',),
    pmtType: new FormControl('',),
    creditAc: new FormControl('',),
    neftPmt: new FormControl('',),
    chequeNo: new FormControl('',),
    chequeDt: new FormControl('',),
    finDocID: new FormControl('',),
    attach1: new FormControl('',),
    attach2: new FormControl('',),
    remarks: new FormControl('',),
    branchCode: new FormControl('',),
    yearID: new FormControl('',),

  

  });
  if (this.selectedDocRenewalEntryDetails.docRenewalEntryId != '') {
    this.formDocEntry.patchValue(this.selectedDocRenewalEntryDetails);
  
   
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formDocEntry.controls; }

 

//Submit user form details //
submitDocRenewalMasterForm(): void {
  this.userSubmitted = true;
  if (this.formDocEntry.invalid) {
    return;
  }
  this.docRenewalentryModel.docRenewalEntryId = this.docRenewalentryModel.docRenewalEntryId != '' ? this.docRenewalentryModel.docRenewalEntryId : '';
  this.docRenewalentryModel.transDate= this.formDocEntry.value.transDate;
  this.docRenewalentryModel.docRenewalID = this.formDocEntry.value.docRenewalID;
  this.docRenewalentryModel.vehicleMasterID = this.formDocEntry.value.vehicleMasterID;
  this.docRenewalentryModel.documentRefNo = this.formDocEntry.value.documentRefNo;
  this.docRenewalentryModel.renewalCompany = this.formDocEntry.value.renewalCompany;
  this.docRenewalentryModel.validFromDt = this.formDocEntry.value.validFromDt;
  this.docRenewalentryModel.validToDt = this.formDocEntry.value.validToDt;
  this.docRenewalentryModel.basicAmt = this.formDocEntry.value.basicAmt;
  this.docRenewalentryModel.sgstPct = this.formDocEntry.value.sgstPct;
  this.docRenewalentryModel.sgstAmt = this.formDocEntry.value.sgstAmt;
  this.docRenewalentryModel.cgstPct = this.formDocEntry.value.cgstPct;
  this.docRenewalentryModel.cgstAmt = this.formDocEntry.value.cgstAmt;
  this.docRenewalentryModel.igstPct = this.formDocEntry.value.igstPct;
  this.docRenewalentryModel.igstAmt = this.formDocEntry.value.igstAmt;
  this.docRenewalentryModel.hsnCode1 = this.formDocEntry.value.hsnCode1;
  this.docRenewalentryModel.basicAmt2 = this.formDocEntry.value.basicAmt2;
  this.docRenewalentryModel.sgstPct2 = this.formDocEntry.value.sgstPct2;
  this.docRenewalentryModel.sgstAmt2 = this.formDocEntry.value.sgstAmt2;
  this.docRenewalentryModel.cgstPct2 = this.formDocEntry.value.cgstPct2;
  this.docRenewalentryModel.cgstAmt2 = this.formDocEntry.value.cgstAmt2;
  this.docRenewalentryModel.igstPct2 = this.formDocEntry.value.igstPct2;
  this.docRenewalentryModel.igstAmt2 = this.formDocEntry.value.igstAmt2;
  this.docRenewalentryModel.hsnCode2 = this.formDocEntry.value.hsnCode2;
  this.docRenewalentryModel.nonGstAmount = this.formDocEntry.value.nonGstAmount;
  this.docRenewalentryModel.nonGstAmtDesc = this.formDocEntry.value.nonGstAmtDesc;
  this.docRenewalentryModel.subTotal = this.formDocEntry.value.subTotal;
  this.docRenewalentryModel.roundOff = this.formDocEntry.value.roundOff;
  this.docRenewalentryModel.netAmount = this.formDocEntry.value.netAmount;
  this.docRenewalentryModel.pmtType = this.formDocEntry.value.pmtType;
  this.docRenewalentryModel.creditAc = this.formDocEntry.value.creditAc;
  this.docRenewalentryModel.neftPmt = this.formDocEntry.value.neftPmt;
  this.docRenewalentryModel.chequeNo = this.formDocEntry.value.chequeNo;
  this.docRenewalentryModel.chequeDt = this.formDocEntry.value.chequeDt;
  this.docRenewalentryModel.finDocID = this.formDocEntry.value.finDocID;
  this.docRenewalentryModel.attach1 = this.formDocEntry.value.attach1;
  this.docRenewalentryModel.attach2 = this.formDocEntry.value.attach2;
  this.docRenewalentryModel.remarks = this.formDocEntry.value.remarks;
  this.docRenewalentryModel.branchCode = this.formDocEntry.value.branchCode;
  this.docRenewalentryModel.yearID = this.formDocEntry.value.yearID;
  this.docRenewalentryModel.loggedInUser = this.formDocEntry.value.loggedInUser;


  this.docrenewalEntryService.docrenewalEntryDetailsSubmitted(this.docRenewalentryModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formDocEntry.reset();
    window.location.reload();
  });
}
}




