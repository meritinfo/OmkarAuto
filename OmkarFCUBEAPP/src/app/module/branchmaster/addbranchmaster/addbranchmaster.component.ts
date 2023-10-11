import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';

import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Usermodel } from 'src/app/models/usermodel';
import { CommonService } from 'src/app/services/common.service';
import { BranchMasterService } from 'src/app/services/branchmaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addbranchmaster',
  templateUrl: './addbranchmaster.component.html',
  styleUrls: ['./addbranchmaster.component.css']
})
export class AddbranchmasterComponent {
  loggedInUserID: string = '';
  formBranchMaster!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];

  List: Dropdownmodel[] = [];
  selectedBranchMasterDetails = new Branchmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private branchModel: Branchmodel, private branchmasterService: BranchMasterService, private commonService: CommonService) {
    this.branchModel = new Branchmodel();
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
    this.getBranchList();

    this.getStateList();

    this.selectedBranchMasterDetails = this.branchmasterService.getBranchMasterDetails();
    this.formBranchMaster = this.formBuilder.group({

      acctBranch: new FormControl('',),
      stateCode: new FormControl('',),

      userBranch: new FormControl('',),
      userBranch2: new FormControl('',),
      userState: new FormControl('',),
      code: new FormControl('',),
      centreName: new FormControl('',),
      zoneCode: new FormControl('',),
      regionId: new FormControl('',),
      branchBusinessType: new FormControl('',),
      acctYN: new FormControl('',),
      address1: new FormControl('',),
      address2: new FormControl('',),
      address3: new FormControl('',),
      city: new FormControl('',),
      pinCode: new FormControl('',),
      offPhone1: new FormControl('',),
      offPhone2: new FormControl('',),
      mobileNo: new FormControl('',),
      branchEmail: new FormControl('',),
      managerName: new FormControl('',),
      managerMobileNo: new FormControl('',),
      managerPhone: new FormControl('',),
      managerEmail: new FormControl('',),
      gstNo: new FormControl('',),
      activeYN: new FormControl('',),
      bankAcLedger: new FormControl('',),
      branchAcLedger: new FormControl('',),
      entryLockDays: new FormControl('',),
      bankName: new FormControl('',),
      bankAdd: new FormControl('',),
      bankAcNo: new FormControl('',),
      bankIfsc: new FormControl('',),
      ewayBillApiYN: new FormControl('',),
      ewayBillApiGstId: new FormControl('',),
      ewayBillApiUid: new FormControl('',),
      ewayBillApiPwd: new FormControl('',),
      panApiCheckYN: new FormControl('',),
      bankApiCheckYN: new FormControl('',),
      truckApiCheckYN: new FormControl('',),
      isHO: new FormControl('',),


    });
    if (this.selectedBranchMasterDetails.centreid != '') {
      this.formBranchMaster.patchValue(this.selectedBranchMasterDetails);
      this.formBranchMaster.patchValue({
        userBranch: this.selectedBranchMasterDetails.acctBranch,
        userBranch2: this.selectedBranchMasterDetails.centreName,
        userState: this.selectedBranchMasterDetails.stateCode,


      })
    }


  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formBranchMaster.controls; }

  //Get Branch List details //
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  //Get Module List details //
  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }

  //Submit user form details //
  submitBranchMasterForm(): void {
    this.userSubmitted = true;
    if (this.formBranchMaster.invalid) {
      return;
    }
    this.branchModel.centreid = this.selectedBranchMasterDetails.centreid != '' ? this.selectedBranchMasterDetails.centreid : '';

    this.branchModel.code = this.formBranchMaster.value.code;
    this.branchModel.centreName = this.formBranchMaster.value.userBranch2;
    this.branchModel.acctBranch = this.formBranchMaster.value.userBranch.toString();
    this.branchModel.stateCode = this.formBranchMaster.value.userState.toString();
    this.branchModel.regionId = this.formBranchMaster.value.regionId;
    this.branchModel.branchBusinessType = this.formBranchMaster.value.branchBusinessType;
    this.branchModel.acctYN = this.formBranchMaster.value.acctYN;
    this.branchModel.acctBranch = this.formBranchMaster.value.acctBranch;
    this.branchModel.address1 = this.formBranchMaster.value.address1;
    this.branchModel.address2 = this.formBranchMaster.value.address2;
    this.branchModel.address3 = this.formBranchMaster.value.address3;
    this.branchModel.city = this.formBranchMaster.value.city;
    this.branchModel.pinCode = this.formBranchMaster.value.pinCode;
    this.branchModel.offPhone1 = this.formBranchMaster.value.offPhone1;
    this.branchModel.offPhone2 = this.formBranchMaster.value.offPhone2;
    this.branchModel.mobileNo = this.formBranchMaster.value.mobileNo;
    this.branchModel.branchEmail = this.formBranchMaster.value.branchEmail;
    this.branchModel.managerMobileNo = this.formBranchMaster.value.managerMobileNo;
    this.branchModel.managerPhone = this.formBranchMaster.value.managerPhone;
    this.branchModel.managerEmail = this.formBranchMaster.value.managerEmail;
    this.branchModel.gstNo = this.formBranchMaster.value.gstNo;
    this.branchModel.activeYN = this.formBranchMaster.value.activeYN;
    this.branchModel.bankAcLedger = this.formBranchMaster.value.bankAcLedger;
    this.branchModel.branchAcLedger = this.formBranchMaster.value.branchAcLedger;
    this.branchModel.entryLockDays = this.formBranchMaster.value.entryLockDays;
    this.branchModel.bankName = this.formBranchMaster.value.bankName;
    this.branchModel.bankAdd = this.formBranchMaster.value.bankAdd;
    this.branchModel.bankAcNo = this.formBranchMaster.value.bankAcNo;
    this.branchModel.bankIfsc = this.formBranchMaster.value.bankIfsc;
    this.branchModel.ewayBillApiYN = this.formBranchMaster.value.ewayBillApiYN;
    this.branchModel.ewayBillApiGstId = this.formBranchMaster.value.ewayBillApiGstId;
    this.branchModel.ewayBillApiUid = this.formBranchMaster.value.ewayBillApiUid;
    this.branchModel.ewayBillApiPwd = this.formBranchMaster.value.ewayBillApiPwd;
    this.branchModel.panApiCheckYN = this.formBranchMaster.value.panApiCheckYN;
    this.branchModel.bankApiCheckYN = this.formBranchMaster.value.bankApiCheckYN;
    this.branchModel.isHO = this.formBranchMaster.value.isHO;
    this.branchmasterService.branchMasterDetailsSubmitted(this.branchModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formBranchMaster.reset();
      window.location.reload();
    });
  }
}


