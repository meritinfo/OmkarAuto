import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Driversalarystatementmodel } from 'src/app/models/driversalarystatementmodel';
import { CommonService } from 'src/app/services/common.service';
import { Driversalarydetailmodel } from 'src/app/models/driversalarydetailmodel';
import { Billstatementsearchlistrequestmodel } from 'src/app/models/billstatementsearchlistrequestmodel';

@Component({
  selector: 'app-driversalarystatementadd',
  templateUrl: './driversalarystatementadd.component.html',
  styleUrls: ['./driversalarystatementadd.component.css']
})
export class DriversalarystatementaddComponent implements OnInit {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  formDriverSalaryStatement!: FormGroup;
  keywordLocation = 'dataName';

  formSubmitted = false;
  responseDetails = new Responsemodel();

  constructor(private driversalarystatementmodel: Driversalarystatementmodel, private commonService: CommonService,  private route: Router, private formBuilder: FormBuilder, private toasterService: ToastrService) {
  //  this.driversalarystatementmodel = new driversalarystatementmodel();
  }

  ngOnInit(): void {
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;

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
    this.formDriverSalaryStatement = this.formBuilder.group({
      transDate: new FormControl(''),
      tripFrom: new FormControl(''),
      tripTo: new FormControl(''),
      pmtType: new FormControl(''),
      remarks: new FormControl(''),
      totalSalary: new FormControl(''),
      totalPoolAmt: new FormControl(''),
      netPayable: new FormControl(''),
     // creditAC: new FormControl(''),
    //  cheqNo: new FormControl('')
    });
  }

  get f() { return this.formDriverSalaryStatement.controls; }


//saveStatementDetails(): void {
//  var selectedDataValue = this.formDriverSalaryStatement.getRawValue();
////  this.billsstatementmodel.masterID = this.selectedBillstatementDetails.masterID != '' ? this.selectedBillstatementDetails.masterID : '';
//  this.billsstatementmodel.billStation = selectedDataValue.statementBillStation;
// this.billsstatementmodel.seriesCode = selectedDataValue.billSeries;
 // this.billsstatementmodel.bill_StmtNo = selectedDataValue.billNo;
 // this.billsstatementmodel.billDate = selectedDataValue.billDate;
//  this.billsstatementmodel.partyCode = selectedDataValue.party.dataId;
 // this.billsstatementmodel.fromDate = selectedDataValue.lrFrom;
 // this.billsstatementmodel.toDate = selectedDataValue.lrTo;
//  this.billsstatementmodel.fromPoint = selectedDataValue.fromPoint.dataId;
//  this.billsstatementmodel.toPoint = selectedDataValue.toPoint.dataId;
//  this.saveData.fromPlace = this.formBillStatement.value.fromPlace ? this.formBillStatement.value.fromPlace.dataId : '';
//  this.saveData.toPlace = this.formBillStatement.value.toPlace ? this.formBillStatement.value.toPlace.dataId : '';
//  this.saveData.cnorPlantCode = this.formBillStatement.value.cnorPlantCode ? this.formBillStatement.value.cnorPlantCode : '';
 // this.saveData.productId = this.formBillStatement.value.productId ? this.formBillStatement.value.productId : '';
 // this.billsstatementmodel.totFreight = this.formBillStatement.value.totFreight;
 // this.billsstatementmodel.totFreight =this.formBillStatement.value.totFreight.toString();;
//  this.billsstatementmodel.totExtraChrg = this.formBillStatement.value.totExtraChrg.toString();;
//  this.billsstatementmodel.totSubTotal =  this.formBillStatement.value.totSubTotal.toString();;
////  this.billsstatementmodel.gstType =  this.formBillStatement.value.gstType.toString();
/*  this.billsstatementmodel.sgstPct =  this.formBillStatement.value.sgstPct.toString();;
  this.billsstatementmodel.sgstAmt = this.formBillStatement.value.sgstAmt.toString();;
  this.billsstatementmodel.cgstPct =  this.formBillStatement.value.cgstPct.toString();;
  this.billsstatementmodel.cgstAmt =  this.formBillStatement.value.cgstAmt.toString();;
  this.billsstatementmodel.igstPct = this.formBillStatement.value.igstPct.toString();;
  this.billsstatementmodel.igstAmt =  this.formBillStatement.value.igstAmt.toString();;
  this.billsstatementmodel.totalBillAmt =  this.formBillStatement.value.totalBillAmt.toString();;
  this.billsstatementmodel.yearId = this.year;
  this.billsstatementmodel.loggedInUser = this.loggedInUserID;
  this.billsstatementmodel.billStatementListData = this.billstatementsearchlistmodel.billStatementSearchList;
  this.billstatementService.saveBillStatementDetails(this.billsstatementmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    this.toasterService.success(this.responseDetails.message);
    this.formBillStatement.reset();
    window.location.reload();
  });*/
}