import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';




import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Branchmodel } from 'src/app/models/branchmodel';
import { Vehiclefltmasterlistmodel } from 'src/app/models/vehiclefltmasterlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehiclefltmastermodel } from 'src/app/models/vehiclefltmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { VehicleFltMasterService } from 'src/app/services/vehiclefltmaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-vehiclemasteradd',
  templateUrl: './vehiclemasteradd.component.html',
  styleUrls: ['./vehiclemasteradd.component.css']
})
export class VehiclemasteraddComponent {
  loggedInUserID: string = '';
  formVehicleMaster!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  selectedVehicleMasterDetails = new Vehiclefltmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private vehiclefltmastermodel: Vehiclefltmastermodel, private vehiclefltmasterService: VehicleFltMasterService, private commonService: CommonService) {
    this.vehiclefltmastermodel = new Vehiclefltmastermodel();
  }
  ngOnInit(): void {
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

    this.selectedVehicleMasterDetails = this.vehiclefltmasterService.getvehiclefltmasterDetails();
    this.formVehicleMaster = this.formBuilder.group({
      vehicleNo: new FormControl('',),
      fleetStation: new FormControl('',),
      regnDate: new FormControl('',),
      regdOwner: new FormControl('',),
      chasisNo: new FormControl('',),
      engineNo: new FormControl('',),
      vehicleTypeID: new FormControl('',),
      vehicleTypeGroupId: new FormControl('',),
      vehMfrId: new FormControl('',),
      mfrModelName: new FormControl('',),
      fuelType: new FormControl('',),
      makeYear: new FormControl('',),
      tankCap: new FormControl('',),
      grossWt: new FormControl('',),
      unLadenWT: new FormControl('',),
      noOfTyres: new FormControl('',),
      mileageLt: new FormControl('',),
      vehLength: new FormControl('',),
      vehBreadth: new FormControl('',),
      vehHeight: new FormControl('',),
      vehVolumeCFT: new FormControl('',),
      remarks: new FormControl('',),
      ownershipType: new FormControl('',),
      fastTagYN: new FormControl('',),
      fastTagCo: new FormControl('',),
      fastTagNo: new FormControl('',),
      petroCardYN: new FormControl('',),
      petroCo: new FormControl('',),
      petroCardNo: new FormControl('',),
      petroCardPin: new FormControl('',),
      happayCardYN: new FormControl('',),
      happayCardNo: new FormControl('',),
      happayCardPin: new FormControl('',),
      fipYN: new FormControl('',),
      fipNo: new FormControl('',),
      soldYN: new FormControl('',),
      soldTo: new FormControl('',),
      soldDate: new FormControl('',),
      soldValue: new FormControl('',),
      tfrYN: new FormControl('',),
      tfrDate: new FormControl('',),
      tfrVehicleNo: new FormControl('',),
      tfrVehicleId: new FormControl('',),
      vehicleLedgerAc: new FormControl('',),
      vehicleAssetAc: new FormControl('',),
      attach1Desc: new FormControl('',),
      attach1Link: new FormControl('',),
      attach2Desc: new FormControl('',),
      attach2Link: new FormControl('',),
      attach3Desc: new FormControl('',),
      attach3Link: new FormControl('',),
      userBranch: new FormControl('',),
      userBranch2: new FormControl('',),

      arrayList: this.formBuilder.array([this.createInitialArray()])

    });

    if (this.selectedVehicleMasterDetails.vehicleMasterID != '') {
      this.formVehicleMaster.patchValue(this.selectedVehicleMasterDetails);
      this.formVehicleMaster.patchValue({
      })
    }
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formVehicleMaster.controls; }
  get formArray() {
    return this.formVehicleMaster.get("arrayList") as FormArray;
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  //Submit user form details //
  submitVehicleMasterForm(): void {
    this.userSubmitted = true;
    if (this.formVehicleMaster.invalid) {
      return;
    }
    this.vehiclefltmastermodel.vehicleMasterID = this.selectedVehicleMasterDetails.vehicleMasterID != '' ? this.selectedVehicleMasterDetails.vehicleMasterID : '';
    this.vehiclefltmastermodel.vehicleNo = this.formVehicleMaster.value.vehicleNo;
    this.vehiclefltmastermodel.fleetStation = this.formVehicleMaster.value.fleetStation;
    this.vehiclefltmastermodel.regnDate = this.formVehicleMaster.value.regnDate;
    this.vehiclefltmastermodel.regdOwner = this.formVehicleMaster.value.regdOwner;
    this.vehiclefltmastermodel.chasisNo = this.formVehicleMaster.value.chasisNo;
    this.vehiclefltmastermodel.engineNo = this.formVehicleMaster.value.engineNo;
    this.vehiclefltmastermodel.vehicleTypeID = this.formVehicleMaster.value.vehicleTypeID;
    this.vehiclefltmastermodel.vehicleTypeGroupId = this.formVehicleMaster.value.vehicleTypeGroupId;
    this.vehiclefltmastermodel.vehMfrId = this.formVehicleMaster.value.vehMfrId;
    this.vehiclefltmastermodel.mfrModelName = this.formVehicleMaster.value.mfrModelName;
    this.vehiclefltmastermodel.fuelType = this.formVehicleMaster.value.fuelType;
    this.vehiclefltmastermodel.makeYear = this.formVehicleMaster.value.makeYear;
    this.vehiclefltmastermodel.tankCap = this.formVehicleMaster.value.tankCap;
    this.vehiclefltmastermodel.grossWt = this.formVehicleMaster.value.grossWt;
    this.vehiclefltmastermodel.unLadenWT = this.formVehicleMaster.value.unLadenWT;
    this.vehiclefltmastermodel.noOfTyres = this.formVehicleMaster.value.noOfTyres;
    this.vehiclefltmastermodel.mileageLt = this.formVehicleMaster.value.mileageLt;
    this.vehiclefltmastermodel.vehLength = this.formVehicleMaster.value.vehLength;
    this.vehiclefltmastermodel.vehBreadth = this.formVehicleMaster.value.vehBreadth;
    this.vehiclefltmastermodel.vehHeight = this.formVehicleMaster.value.vehHeight;
    this.vehiclefltmastermodel.vehVolumeCFT = this.formVehicleMaster.value.vehVolumeCFT;
    this.vehiclefltmastermodel.remarks = this.formVehicleMaster.value.remarks;
    this.vehiclefltmastermodel.ownershipType = this.formVehicleMaster.value.ownershipType;
    this.vehiclefltmastermodel.fastTagYN = this.formVehicleMaster.value.fastTagYN;
    this.vehiclefltmastermodel.fastTagCo = this.formVehicleMaster.value.fastTagCo;
    this.vehiclefltmastermodel.fastTagNo = this.formVehicleMaster.value.fastTagNo;
    this.vehiclefltmastermodel.petroCardYN = this.formVehicleMaster.value.petroCardYN;
    this.vehiclefltmastermodel.petroCo = this.formVehicleMaster.value.petroCo;

    this.vehiclefltmastermodel.petroCardNo = this.formVehicleMaster.value.petroCardNo;
    this.vehiclefltmastermodel.petroCardPin = this.formVehicleMaster.value.petroCardPin;
    this.vehiclefltmastermodel.happayCardYN = this.formVehicleMaster.value.happayCardYN;
    this.vehiclefltmastermodel.happayCardNo = this.formVehicleMaster.value.happayCardNo;
    this.vehiclefltmastermodel.happayCardPin = this.formVehicleMaster.value.happayCardPin;
    this.vehiclefltmastermodel.fipYN = this.formVehicleMaster.value.fipYN;
    this.vehiclefltmastermodel.fipNo = this.formVehicleMaster.value.fipNo;
    this.vehiclefltmastermodel.soldYN = this.formVehicleMaster.value.soldYN;
    this.vehiclefltmastermodel.soldTo = this.formVehicleMaster.value.soldTo;
    this.vehiclefltmastermodel.soldDate = this.formVehicleMaster.value.soldDate;
    this.vehiclefltmastermodel.soldValue = this.formVehicleMaster.value.soldValue;
    this.vehiclefltmastermodel.tfrYN = this.formVehicleMaster.value.tfrYN;
    this.vehiclefltmastermodel.tfrDate = this.formVehicleMaster.value.tfrDate;
    this.vehiclefltmastermodel.tfrVehicleNo = this.formVehicleMaster.value.tfrVehicleNo;
    this.vehiclefltmastermodel.tfrVehicleId = this.formVehicleMaster.value.tfrVehicleId;
    this.vehiclefltmastermodel.vehicleLedgerAc = this.formVehicleMaster.value.vehicleLedgerAc;
    this.vehiclefltmastermodel.vehicleAssetAc = this.formVehicleMaster.value.vehicleAssetAc;
    this.vehiclefltmastermodel.attach1Desc = this.formVehicleMaster.value.attach1Desc;
    this.vehiclefltmastermodel.attach1Link = this.formVehicleMaster.value.attach1Link;
    this.vehiclefltmastermodel.attach2Desc = this.formVehicleMaster.value.attach2Desc;
    this.vehiclefltmastermodel.attach2Link = this.formVehicleMaster.value.attach2Link;
    this.vehiclefltmastermodel.attach3Desc = this.formVehicleMaster.value.attach3Desc;
    this.vehiclefltmastermodel.attach3Link = this.formVehicleMaster.value.attach3Link;


    this.vehiclefltmasterService.vehicleFltmasterDetailsSubmitted(this.vehiclefltmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formVehicleMaster.reset();
      window.location.reload();
    });
  }

  addItem(): void {
    // this.gstaccountdetails = new Gstaccountdetailsmodel();
    // this.gstaccountdetails.accountName = this.formGSTPurchase.value.accountName;
    // this.gstaccountdetails.narration = this.formGSTPurchase.value.narration;
    // this.gstaccountdetails.subLedger = this.formGSTPurchase.value.subLedger;
    // this.gstaccountdetails.hSN = this.formGSTPurchase.value.hSN;
    // this.gstaccountdetails.amount = this.formGSTPurchase.value.amount;
    // this.gstaccountdetails.sGSTPercentage = this.formGSTPurchase.value.sGSTPercentage;
    // this.gstaccountdetails.sGSTAmount = this.formGSTPurchase.value.sGSTAmount;

    // this.gstaccountList.push(this.gstaccountdetails);
    // this.createInitialArray();
    this.formArray.push(this.createInitialArray());
  }

  createInitialArray() {
    return this.formBuilder.group({
      validFrom: [''],
      validTo: [''],
      vehicleAgvLoad: [''],
      vehicleAgvEmpty: [''],
      AdAvg: ['']
    });
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
  }
}