import { Component } from '@angular/core';


import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Journalentrymodel } from 'src/app/models/journalentrymodel';
import { CommonService } from 'src/app/services/common.service';
import { JournalEntryService } from 'src/app/services/journalentry.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addjournalentry',
  templateUrl: './addjournalentry.component.html',
  styleUrls: ['./addjournalentry.component.css']
})
export class AddjournalentryComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  branchname: string = '';
  loginDate: string = '';
  year: string = '';
  locationList: Dropdownmodel[] = [];
  responseDetails = new Responsemodel();
  creditacList: Dropdownmodel[] = [];


  selectedJournalEntryDetails = new Journalentrymodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private journalentryModel: Journalentrymodel, private journalentryService: JournalEntryService, private toasterService: ToastrService, private commonService: CommonService) {
    this.journalentryModel = new Journalentrymodel();



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
    if (typeof userData2 !== 'undefined' && userData2 !== null && userData2 !== '') {
      this.year = userData2;
    }
    var userData5 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData5 !== 'undefined' && userData5 !== null && userData5 !== '') {
      this.branchname = userData5;
      //vehicleMasterID: this.locationList.find(e => e.dataId ==  this.formUser.value.),
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    else {
      this.route.navigate(['/']);
    }
    this.getCreditAcList();
    this.selectedJournalEntryDetails = this.journalentryService.getJournalEntryDetails();
    this.formUser = this.formBuilder.group({
      ftmDate: new FormControl(this.loginDate,),
      docType: new FormControl('CP',),
      docSeries: new FormControl('',),
      docNo: new FormControl('',),
      remarks: new FormControl('',),
      refType: new FormControl('',),
      refNo: new FormControl('',),
      docAmount: new FormControl('',),

      utrNo: new FormControl('',),


      linkedYN: new FormControl('',),
      debit: new FormControl('',),
      credit: new FormControl('',),


      modifyRemarks: new FormControl('',),
      yearID: new FormControl('',),



      accountid2: new FormControl('',),

      cashDetailsList: this.formBuilder.array([this.createMiscArray()]),


    });

    if (this.selectedJournalEntryDetails.ftmId != '') {

      this.formUser.patchValue(this.selectedJournalEntryDetails);

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
  changePmtType2(index: number) {
    //console.log(e.target.value);
    // var selectedValue = e.target.value;
    var selectedDataValue = this.formUser.getRawValue();
    if (selectedDataValue.cashDetailsList[index].typeSign == 'D') {
      this.formUser.patchValue({

        debit: selectedDataValue.cashDetailsList[index].amount
        // debit: '100'

      });
    } else {
      this.formUser.patchValue({

        credit: selectedDataValue.cashDetailsList[index].amount

      });

    }


  }
  addMiscItem(index: number): void {
    if (this.formCashArray.value[index].accountId != "" && this.formCashArray.value[index].amount != "" && this.formCashArray.value[index].typeSign != "") {
      this.formCashArray.push(this.createMiscArray());
    } else {
      this.toasterService.warning("Please select one account name, amount and type");
    }
  }

  removeMiscItem(index: number) {
    this.formCashArray.removeAt(index);
    this.updateAmount(index, undefined, "");
  }
  changePmtType(index: number) {
    var totalCreditAmount = 0;
    var totalDebitAmount = 0;
    var totalStatementAmount = 0;
    var amt = 0;
    for (var i = 0; i < this.formCashArray.value.length; i++) {
      var selectedDataValue = this.formUser.getRawValue();
      amt = selectedDataValue.cashDetailsList[index].amount
      // if (selectedDataValue.cashDetailsList[index].selected) {
      if (selectedDataValue.cashDetailsList[index].typeSign == 'C') {
        totalCreditAmount = totalCreditAmount + parseFloat(selectedDataValue.cashDetailsList[index].amount);
      }
      if (selectedDataValue.cashDetailsList[index].typeSign == 'D') {
        totalDebitAmount = totalDebitAmount + parseFloat(selectedDataValue.cashDetailsList[index].amount);
        //   }
        // totalStatementAmount = totalStatementAmount + parseFloat(this.Dieselstatementsearchlistmodel.dieselStatementSearchList[i].amountPaid);
      }
    }

    //  this.formUser.patchValue({

    // debit: totalDslAmount.toFixed(2),
    //  credit: totalDriverAdvAmount.toFixed(2)
    //   });
    if (selectedDataValue.cashDetailsList[index].typeSign == 'C') {
      this.formUser.patchValue({
        credit: totalCreditAmount.toFixed(2),

        // debit: '100'

      });
    } else {
      this.formUser.patchValue({

        debit: totalDebitAmount.toFixed(2)

      });

    }
  }
  updateAmount(index: number, event: any, comingFrom: string) {
    var selectedDataValue = this.formUser.getRawValue();
    if (comingFrom === 'amount') {
      selectedDataValue.cashDetailsList[index].amount = event.target.value;
    }
    var totalCreditAmount = 0;
    var totalDebitAmount = 0;
    var amt = 0;
    for (var i = 0; i < selectedDataValue.cashDetailsList.length; i++) {
      if (selectedDataValue.cashDetailsList[i].typeSign == 'C') {
        totalCreditAmount = totalCreditAmount + (selectedDataValue.cashDetailsList[i].amount == "" ? 0 : parseFloat(selectedDataValue.cashDetailsList[i].amount));
      }
      if (selectedDataValue.cashDetailsList[i].typeSign == 'D') {
        totalDebitAmount = totalDebitAmount + (selectedDataValue.cashDetailsList[i].amount == "" ? 0 : parseFloat(selectedDataValue.cashDetailsList[i].amount));
      }
    }

    this.formUser.patchValue({
      debit: totalDebitAmount.toFixed(2),
      credit: totalCreditAmount.toFixed(2)
    });

    // if (selectedDataValue.cashDetailsList[index].typeSign == 'C') {
    //   this.formUser.patchValue({
    //     credit: totalCreditAmount.toFixed(2),

    //     // debit: '100'

    //   });
    // } else {
    //   this.formUser.patchValue({

    //     debit: totalDebitAmount.toFixed(2)

    //   });

    // }
    // //this.calculateTotal();
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
  submitJournalEntryForm(): void {
    this.userSubmitted = true;
    if (this.formUser.invalid) {
      return;
    }
    var selectedDataValue = this.formUser.getRawValue();
    if (selectedDataValue.debit !== selectedDataValue.credit) {
      this.toasterService.warning("total credit and debit should be equal");
      return;
    }
    this.journalentryModel.ftmId = this.selectedJournalEntryDetails.ftmId != '' ? this.selectedJournalEntryDetails.ftmId : '';
    this.journalentryModel.ftmDate = this.formUser.value.ftmDate;
    // this.journalentryModel.docType = this.formUser.value.docType;
    this.journalentryModel.docSeries = this.formUser.value.docSeries;
    this.journalentryModel.docNo = this.formUser.value.docNo;
    this.journalentryModel.seriesDoc = this.formUser.value.docSeries + this.formUser.value.docNo;;
    this.journalentryModel.remarks = this.formUser.value.remarks;
    this.journalentryModel.refType = this.formUser.value.refType;
    this.journalentryModel.refNo = this.formUser.value.refNo;
    this.journalentryModel.docAmount = this.formUser.value.docAmount;
    this.journalentryModel.linkedYN = this.formUser.value.linkedYN;
    this.journalentryModel.yearID = this.year;
    this.journalentryModel.branchCode = this.branchname;
    this.journalentryModel.modifyRemarks = this.formUser.value.modifyRemarks;

    if (this.formCashArray.value != undefined) {
      for (var i = 0; i < this.formCashArray.value.length; i++) {
        this.journalentryModel.detailList.push({
          'ftdID': this.formCashArray.value[i].ftdID,
          'ftmID': this.formCashArray.value[i].ftmID,
          'ftmDate': this.formCashArray.value[i].ftmDate,
          'slNo': this.formCashArray.value[i].slNo,
          'typeSign': 'D',
          'amount': this.formCashArray.value[i].amount,
          'narration': this.formCashArray.value[i].narration,
          'accountId': this.formCashArray.value[i].accountId,
          'costRefNo': this.formCashArray.value[i].costRefNo,
          'reference': this.formCashArray.value[i].reference,
          'branchCode': this.branchname,
        })
      }




    }


    this.journalentryService.journalEntryDetailsSubmitted(this.journalentryModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formUser.reset();
      window.location.reload();
    });
  }
}






