import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Billstatementsaverequest } from 'src/app/models/billstatementsaverequest';
import { Billstatementsearchlistmodel } from 'src/app/models/billstatementsearchlistmodel';
import { Billstatementsearchlistrequestmodel } from 'src/app/models/billstatementsearchlistrequestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { BillstatementService } from 'src/app/services/billstatement.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-billstatementadd',
  templateUrl: './billstatementadd.component.html',
  styleUrls: ['./billstatementadd.component.css']
})
export class BillstatementaddComponent implements OnInit {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  branchList: Dropdownmodel[] = [];
  formBillStatement!: FormGroup;
  keywordLocation = 'dataName';
  billstatementsearchlistmodel = new Billstatementsearchlistmodel();
  saveData = new Billstatementsaverequest();

  formSubmitted = false;
  responseDetails = new Responsemodel();

  constructor(private billstatementsearchlistrequestmodel: Billstatementsearchlistrequestmodel, private commonService: CommonService, private billstatementService: BillstatementService, private route: Router, private formBuilder: FormBuilder, private toasterService: ToastrService) {
    this.billstatementsearchlistrequestmodel = new Billstatementsearchlistrequestmodel();
  }

  ngOnInit(): void {
    var yearIDData = localStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var branchData = localStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;

    }
    var userData = localStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }
    this.getBranchList();
    this.formBillStatement = this.formBuilder.group({
      statementBillStation: new FormControl(''),
      billSeries: new FormControl(''),
      billNo: new FormControl(''),
      billDate: new FormControl(''),
      party: new FormControl(''),
      lrFrom: new FormControl(''),
      lrTo: new FormControl(''),
      fromPoint: new FormControl(''),
      toPoint: new FormControl(''),
      totFreight: new FormControl(''),
      totExtraChrg: new FormControl(''),
      totSubTotal: new FormControl(''),
      gstType: new FormControl(''),
      sgstPct: new FormControl(''),
      sgstAmt: new FormControl(''),
      cgstPct: new FormControl(''),
      cgstAmt: new FormControl(''),
      igstPct: new FormControl(''),
      igstAmt: new FormControl(''),
      totalBillAmt: new FormControl('')
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  get f() { return this.formBillStatement.controls; }

  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (branchList: Dropdownmodel[], query: string): any[] {
    return branchList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  searchStatement(): void {
    this.billstatementService.getBillStatementSearchList(this.billstatementsearchlistrequestmodel).subscribe((res: Billstatementsearchlistmodel) => {
      this.billstatementsearchlistmodel = res;
    });
  }

  selectedData(index: number, event: any) {
    this.billstatementsearchlistmodel.billStatementSearchList[index].selected = event.target.checked;
  }

  saveStatementDetails(): void {
    this.saveData.billingParty = this.formBillStatement.value.party.dataId;
    this.saveData.fromPlace = this.formBillStatement.value.fromPlace ? this.formBillStatement.value.fromPlace : '';
    this.saveData.toPlace = this.formBillStatement.value.toPlace ? this.formBillStatement.value.toPlace : '';
    this.saveData.cnorPlantCode = this.formBillStatement.value.cnorPlantCode ? this.formBillStatement.value.cnorPlantCode : '';
    this.saveData.productId = this.formBillStatement.value.productId ? this.formBillStatement.value.productId : '';
    this.saveData.totFreight = this.formBillStatement.value.totFreight;
    this.saveData.totExtraChrg = this.formBillStatement.value.totExtraChrg;
    this.saveData.totSubTotal = this.formBillStatement.value.totSubTotal;
    this.saveData.gstType = this.formBillStatement.value.gstType;
    this.saveData.sgstPct = this.formBillStatement.value.sgstPct;
    this.saveData.sgstAmt = this.formBillStatement.value.sgstAmt;
    this.saveData.cgstPct = this.formBillStatement.value.cgstPct;
    this.saveData.cgstAmt = this.formBillStatement.value.cgstAmt;
    this.saveData.igstPct = this.formBillStatement.value.igstPct;
    this.saveData.igstAmt = this.formBillStatement.value.igstAmt;
    this.saveData.totalBillAmt = this.formBillStatement.value.totalBillAmt;
    this.saveData.loggedInUser = this.loggedInUserID;
    this.saveData.billStatementListData = this.billstatementsearchlistmodel.billStatementSearchList;
    this.billstatementService.saveBillStatementDetails(this.saveData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.toasterService.success(this.responseDetails.message);
      this.formBillStatement.reset();
      window.location.reload();
    });
  }

}
