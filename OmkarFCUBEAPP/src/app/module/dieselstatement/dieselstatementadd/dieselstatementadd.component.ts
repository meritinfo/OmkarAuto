import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dieselstatementmodel } from 'src/app/models/dieselstatementmodel';
import { Dieselstatementsaverequest } from 'src/app/models/dieselstatementsaverequest';
import { Dieselstatementsearchlistmodel } from 'src/app/models/dieselstatementsearchlistmodel';
import { Dieselstatementsearchlistrequestmodel } from 'src/app/models/dieselstatementsearchlistrequestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { DieselstatementService } from 'src/app/services/dieselstatement.service';

@Component({
  selector: 'app-dieselstatementadd',
  templateUrl: './dieselstatementadd.component.html',
  styleUrls: ['./dieselstatementadd.component.css']
})
export class DieselstatementaddComponent implements OnInit {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  branchList: Dropdownmodel[] = [];
  formDieselStatement!: FormGroup;
  Dieselstatementsearchlistmodel = new Dieselstatementsearchlistmodel();
  keywordLocation = 'dataName';
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  formSubmitted = false;
  responseDetails = new Responsemodel();
  saveData = new Dieselstatementsaverequest();
 
  constructor(private dieselstatementsearchlistrequestmodel: Dieselstatementsearchlistrequestmodel, private route: Router, private formBuilder: FormBuilder, private commonService: CommonService, private dieselstatementService: DieselstatementService, private toasterService: ToastrService) {
    this.dieselstatementsearchlistrequestmodel = new Dieselstatementsearchlistrequestmodel();
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
    this.getBranchList();
    //this.dieselstatementmodel = this.dieselstatementService.getDieselstatementDetails();
    this.formDieselStatement = this.formBuilder.group({
      statementBranch: new FormControl('', [Validators.required]),
      statementDate: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      vendor: new FormControl('', [Validators.required]),
      totalDieselAmount: new FormControl(''),
      totalDriverAdvAmount: new FormControl(''),
      totalStatementAmount: new FormControl(''),
      remarks: new FormControl(''),
    });
    // if (this.selectedDistancemasterfreightDetails.masterID != '') {
    //   this.formDieselStatement.patchValue(this.selectedDistancemasterfreightDetails);

    //   this.formDieselStatement.patchValue({
    //     fromLocation: this.selectedDistancemasterfreightDetails.fromLocation,
    //     validFrom: this.selectedDistancemasterfreightDetails.validFrom,
    //     validUpto: this.selectedDistancemasterfreightDetails.validUpto,
    //   })
    // }
  }

  get f() { return this.formDieselStatement.controls; }
  get formArray() {
    return this.formDieselStatement.get("arrayList") as FormArray;
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

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
    this.dieselstatementService.getDieselStatementSearchList(this.dieselstatementsearchlistrequestmodel).subscribe((res: Dieselstatementsearchlistmodel) => {
      this.Dieselstatementsearchlistmodel = res;
    });
  }

  selectedData(index: number, event: any) {
    this.Dieselstatementsearchlistmodel.dieselStatementSearchList[index].selected = event.target.checked;
    this.calculateTotal();
  }
  

  calculateTotal() {
    var totalDslAmount = 0;
    var totalDriverAdvAmount = 0;
    var totalStatementAmount = 0;
    for (var i = 0; i < this.Dieselstatementsearchlistmodel.dieselStatementSearchList.length; i++) {
      if (this.Dieselstatementsearchlistmodel.dieselStatementSearchList[i].selected) {
        if (this.Dieselstatementsearchlistmodel.dieselStatementSearchList[i].hsdAdvType === "D") {
          totalDslAmount = totalDslAmount + parseFloat(this.Dieselstatementsearchlistmodel.dieselStatementSearchList[i].amountPaid);
        }
        if (this.Dieselstatementsearchlistmodel.dieselStatementSearchList[i].hsdAdvType === "A") {
          totalDriverAdvAmount = totalDriverAdvAmount + parseFloat(this.Dieselstatementsearchlistmodel.dieselStatementSearchList[i].amountPaid);
        }
        totalStatementAmount = totalStatementAmount + parseFloat(this.Dieselstatementsearchlistmodel.dieselStatementSearchList[i].amountPaid);
      }
    }

    this.formDieselStatement.patchValue({
      totalDieselAmount: totalDslAmount.toFixed(2),
      totalDriverAdvAmount: totalDriverAdvAmount.toFixed(2),
      totalStatementAmount: totalStatementAmount.toFixed(2)
    });
  }
  exit(): void {
    this.route.navigate(['/dieselstatementlist']);
  }
  deleteDieselStatementForm(): void {
    if (confirm("Are you sure, you want to delete this?")) {
  
    }
  }

  saveStatementDetails(): void {
    this.saveData.statementBranch = this.formDieselStatement.value.statementBranch.dataId;
    this.saveData.statementDate = this.formDieselStatement.value.statementDate;
    this.saveData.fromDate = this.formDieselStatement.value.fromDate;
    this.saveData.toDate = this.formDieselStatement.value.toDate;
    this.saveData.vendor = this.formDieselStatement.value.vendor.dataId;
    this.saveData.remarks = this.formDieselStatement.value.remarks;
    this.saveData.totalDslLtrs = this.formDieselStatement.value.totalDieselAmount;
    this.saveData.totalCashAdv = this.formDieselStatement.value.totalDriverAdvAmount;
    this.saveData.totalNetAmount = this.formDieselStatement.value.totalStatementAmount;
    this.saveData.branchCode = this.branch;
    this.saveData.yearId = this.year;
    this.saveData.loggedInUser = this.loggedInUserID;
    this.saveData.dieselStatementListData = this.Dieselstatementsearchlistmodel.dieselStatementSearchList;
    this.dieselstatementService.saveDieselStatementDetails(this.saveData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.toasterService.success(this.responseDetails.message);
      this.formDieselStatement.reset();
      window.location.reload();
    });
  }
}
