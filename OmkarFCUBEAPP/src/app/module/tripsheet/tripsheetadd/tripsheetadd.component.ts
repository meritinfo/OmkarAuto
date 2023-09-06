import { Component } from '@angular/core';



import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Tripsheetmodel } from 'src/app/models/tripsheetmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Tripsheetlistmodel } from 'src/app/models/tripsheetlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { TripSheetService } from 'src/app/services/tripsheet.service';
import { UserService } from 'src/app/services/user.service';
import { kmsmodel } from 'src/app/models/kmsmodel';
import { Tripsheetinnergridmodel } from 'src/app/models/tripsheetinnergridmodel';
import { Tripsheetinnergridrequest } from 'src/app/models/tripsheetinnergridrequest';

@Component({
  selector: 'app-tripsheetadd',
  templateUrl: './tripsheetadd.component.html',
  styleUrls: ['./tripsheetadd.component.css']
})
export class TripsheetaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  loginDate: string = '';
  distanceTripKM_1: string = '';
  formTripsheet!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  driverList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  tripsheetinnergridmodel = new Tripsheetinnergridmodel();
  kmsDetails = new kmsmodel();
  keywordLocation = 'dataName';
  ivVehicleNo = '';
  billstation = '';
  ivFromPlace = '';
  ivToPlace = '';
  tripsheetinnergridrequest = new Tripsheetinnergridrequest();


  selectedTripSheetDetails = new Tripsheetmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private tripsheetmodel: Tripsheetmodel, private tripSheetService: TripSheetService, private commonService: CommonService) {
    this.tripsheetmodel = new Tripsheetmodel();

  }
  ngOnInit(): void {
    var userData = localStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    var yearIDData = localStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    var loginDate = localStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    else {
      this.route.navigate(['/']);
    }
    this.formTripsheet = this.formBuilder.group({
      tripBranch: new FormControl('',),
      yearId: new FormControl('',),
      vehicleMasterID: new FormControl('',),
      tripNo: new FormControl('',),
      lastTripCloseDate: new FormControl('',),
      newTripDate: new FormControl('',),
      openThrough: new FormControl('',),
      tripOpenBy: new FormControl('',),
      tripOpenDate: new FormControl('',),
      tripStatus: new FormControl('',),
      tripBalance: new FormControl('',),
      driverMasterID: new FormControl('',),
      consignorPayParty: new FormControl('',),
      compNonCompStatus: new FormControl('C',),
      challanNo: new FormControl('',),
      loadingFrom: new FormControl('',),
      destination: new FormControl('',),
      destination2: new FormControl('',),
      destination3: new FormControl('',),
      distanceTripKM_1: new FormControl(this.distanceTripKM_1,),
      contents: new FormControl('',),
      loadEmptyType: new FormControl('',),
      expectedReportingDays: new FormControl('',),
      ltsDslToBe_1: new FormControl('',),
      ltsAdblueToBe_1: new FormControl('',),
      advPayable_1: new FormControl('',),
      reportingDt_1: new FormControl('',),
      advanceDays_1: new FormControl('',),
      delayedDays_1: new FormControl('',),
      graceDays_1: new FormControl('',),
      deliveryDate: new FormControl('',),
      detentionDays: new FormControl('',),
      nextReportingBranch: new FormControl('',),
      distanceTripKM_2: new FormControl('',),
      nextExpectedReportingDt: new FormControl('',),
      nextExpectedReportingDays: new FormControl('',),
      ltsDslToBe_2: new FormControl('',),
      ltsAdblueToBe_2: new FormControl('',),
      advPayable_2: new FormControl('',),
      reportingDt_2: new FormControl('',),
      advanceDays_2: new FormControl('',),
      delayedDays_2: new FormControl('',),
      graceDays_2: new FormControl('',),
      opBalDriver: new FormControl('',),
      opBalDsl: new FormControl('',),
      opBalAdblue: new FormControl('',),
      paidDriverAdvance: new FormControl('',),
      freightCollByDriver: new FormControl('',),
      issuedDslLtrs: new FormControl('',),
      issuedAdblueLtrs: new FormControl('',),
      repairsByDriver: new FormControl('',),
      challanByDriver: new FormControl('',),
      parkingByDriver: new FormControl('',),
      accidentByDriver: new FormControl('',),
      weighmentByDriver: new FormControl('',),
      otherExpByDriver: new FormControl('',),
      tollExpByDriver: new FormControl('',),
      cashDslPlace: new FormControl('',),
      cashDslLtrs: new FormControl('',),
      cashDslAmt: new FormControl('',),
      bhattaRate: new FormControl('',),
      allowedBhatta: new FormControl('',),
      onTimeIncentiveAmt: new FormControl('',),
      multiDelIncentiveAmt: new FormControl('',),
      penaltyChargedToDr: new FormControl('',),
      poolAcAmt: new FormControl('',),
      totalDriverAc: new FormControl('',),
      recdFromDriver: new FormControl('',),
      netTripBalance: new FormControl('',),
      clBalDsl: new FormControl('',),
      clBalAdBlue: new FormControl('',),
      ticlStatus: new FormControl('',),
      ticlRemarks: new FormControl('',),
      tripCloseBy: new FormControl('',),
      tripCloseDt: new FormControl('',),
      tripCloseUpdateDt: new FormControl('',),
      tripLinkYN: new FormControl('',),
      tripSalDoneYN: new FormControl('',),
      findocid: new FormControl('',),
      expectedReportingDt: new FormControl('',),
      loadType: new FormControl('',),

      miscDetailsList: this.formBuilder.array([this.createMiscArray()]),
      adblueDetailsList: this.formBuilder.array([this.createAdblueArray()])

    });
    this.getValidation();
    this.getDriverList();
    this.getBranchList();
    this.getVehicleNoList();
    this.getLocationList();
  
    this.selectedTripSheetDetails = this.tripSheetService.getTripSheetDetails();

    if (this.selectedTripSheetDetails.tripId != '') {
      this.formTripsheet.patchValue(this.selectedTripSheetDetails);
      this.formTripsheet.patchValue({
        newTripDate: this.loginDate
      });

      this.tripsheetinnergridrequest.tripId = parseInt(this.selectedTripSheetDetails.tripId);
      this.tripsheetinnergridrequest.vehicleMasterId = parseInt(this.selectedTripSheetDetails.vehicleMasterID);
    } else{
      this.tripsheetinnergridrequest.tripId = 0;
      this.tripsheetinnergridrequest.vehicleMasterId = 0;
    }
    
    this.getTripSheetInnerGridList();
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formTripsheet.controls; }
  // get formLRArray() {
  //   return this.formTripsheet.get("lrDetailsList") as FormArray;
  // }

  // get formDieselArray() {
  //   return this.formTripsheet.get("dieselDetailsList") as FormArray;
  // }
  get formMiscArray() {
    return this.formTripsheet.get("miscDetailsList") as FormArray;
  }
  // get formDriverArray() {
  //   return this.formTripsheet.get("driverDetailsList") as FormArray;
  // }
  get formAdblueArray() {
    return this.formTripsheet.get("adblueDetailsList") as FormArray;
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleNoList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  getTripSheetInnerGridList(): void {
    this.tripSheetService.getTripSheetInnerGridList(this.tripsheetinnergridrequest).subscribe((res) => {
      this.tripsheetinnergridmodel = res;
    });
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  getDriverList(): void {
    this.commonService.getDriverList().subscribe((res) => {
      this.driverList = res;
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

  startWithFilter = function (vehicleList: Dropdownmodel[], query: string): any[] {
    return vehicleList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  //Submit user form details //
  submitTripSheetForm(): void {
    this.userSubmitted = true;
    if (this.formTripsheet.invalid) {
      return;
    }
    this.tripsheetmodel.tripId = this.selectedTripSheetDetails.tripId != '' ? this.selectedTripSheetDetails.tripId : '';
    this.tripsheetmodel.tripBranch = this.formTripsheet.value.tripBranch;
    this.tripsheetmodel.yearId = this.year;

    this.tripsheetmodel.tripNo = this.formTripsheet.value.tripNo;
    this.tripsheetmodel.vehicleMasterID = this.formTripsheet.value.vehicleMasterID.dataId;
    this.tripsheetmodel.lastTripCloseDate = this.formTripsheet.value.lastTripCloseDate;

    this.tripsheetmodel.newTripDate = this.formTripsheet.value.newTripDate;
    this.tripsheetmodel.openThrough = this.formTripsheet.value.openThrough;
    this.tripsheetmodel.tripOpenBy = this.formTripsheet.value.tripOpenBy;
    this.tripsheetmodel.tripOpenDate = this.formTripsheet.value.tripOpenDate;
    this.tripsheetmodel.tripStatus = this.formTripsheet.value.tripStatus;
    this.tripsheetmodel.driverMasterID = this.formTripsheet.value.driverMasterID.dataId;
    this.tripsheetmodel.consignorPayParty = this.formTripsheet.value.consignorPayParty;
    this.tripsheetmodel.compNonCompStatus = this.formTripsheet.value.compNonCompStatus;
    this.tripsheetmodel.findocid = this.formTripsheet.value.findocid;
    this.tripsheetmodel.challanNo = this.formTripsheet.value.challanNo;
    this.tripsheetmodel.loadingFrom = this.formTripsheet.value.loadingFrom;
    this.tripsheetmodel.destination = this.formTripsheet.value.destination;
    this.tripsheetmodel.destination2 = this.formTripsheet.value.destination2;
    this.tripsheetmodel.destination3 = this.formTripsheet.value.destination3;
    this.tripsheetmodel.distanceTripKM_1 = this.formTripsheet.value.distanceTripKM_1;
    this.tripsheetmodel.contents = this.formTripsheet.value.contents;
    this.tripsheetmodel.loadEmptyType = this.formTripsheet.value.loadEmptyType;
    this.tripsheetmodel.expectedReportingDt = this.formTripsheet.value.expectedReportingDt;
    this.tripsheetmodel.expectedReportingDays = this.formTripsheet.value.expectedReportingDays;
    this.tripsheetmodel.ltsDslToBe_2 = this.formTripsheet.value.ltsDslToBe_2;
    this.tripsheetmodel.ltsAdblueToBe_2 = this.formTripsheet.value.ltsAdblueToBe_2;
    this.tripsheetmodel.advPayable_2 = this.formTripsheet.value.advPayable_2;
    this.tripsheetmodel.reportingDt_2 = this.formTripsheet.value.reportingDt_2;
    this.tripsheetmodel.advanceDays_2 = this.formTripsheet.value.advanceDays_2;
    this.tripsheetmodel.delayedDays_2 = this.formTripsheet.value.delayedDays_2;
    this.tripsheetmodel.graceDays_2 = this.formTripsheet.value.graceDays_2;
    this.tripsheetmodel.opBalDriver = this.formTripsheet.value.opBalDriver;
    this.tripsheetmodel.opBalDsl = this.formTripsheet.value.opBalDsl;
    this.tripsheetmodel.opBalAdblue = this.formTripsheet.value.opBalAdblue;
    this.tripsheetmodel.paidDriverAdvance = this.formTripsheet.value.paidDriverAdvance;
    this.tripsheetmodel.freightCollByDriver = this.formTripsheet.value.freightCollByDriver;
    this.tripsheetmodel.issuedDslLtrs = this.formTripsheet.value.issuedDslLtrs;
    this.tripsheetmodel.issuedAdblueLtrs = this.formTripsheet.value.issuedAdblueLtrs;
    this.tripsheetmodel.challanByDriver = this.formTripsheet.value.challanByDriver;
    this.tripsheetmodel.repairsByDriver = this.formTripsheet.value.repairsByDriver;
    this.tripsheetmodel.parkingByDriver = this.formTripsheet.value.parkingByDriver;
    this.tripsheetmodel.accidentByDriver = this.formTripsheet.value.accidentByDriver;
    this.tripsheetmodel.weighmentByDriver = this.formTripsheet.value.weighmentByDriver;
    this.tripsheetmodel.cashDslPlace = this.formTripsheet.value.cashDslPlace;
    this.tripsheetmodel.cashDslLtrs = this.formTripsheet.value.cashDslLtrs;
    this.tripsheetmodel.cashDslAmt = this.formTripsheet.value.cashDslAmt;
    this.tripsheetmodel.totalBhattaDays = this.formTripsheet.value.totalBhattaDays;
    this.tripsheetmodel.bhattaRate = this.formTripsheet.value.bhattaRate;
    this.tripsheetmodel.allowedBhatta = this.formTripsheet.value.allowedBhatta;
    this.tripsheetmodel.onTimeIncentiveAmt = this.formTripsheet.value.onTimeIncentiveAmt;
    this.tripsheetmodel.multiDelIncentiveAmt = this.formTripsheet.value.multiDelIncentiveAmt;
    this.tripsheetmodel.penaltyChargedToDr = this.formTripsheet.value.penaltyChargedToDr;
    this.tripsheetmodel.poolAcAmt = this.formTripsheet.value.poolAcAmt;
    this.tripsheetmodel.totalDriverAc = this.formTripsheet.value.totalDriverAc;
    this.tripsheetmodel.tripBalance = this.formTripsheet.value.tripBalance;
    this.tripsheetmodel.recdFromDriver = this.formTripsheet.value.recdFromDriver;
    this.tripsheetmodel.netTripBalance = this.formTripsheet.value.netTripBalance;
    this.tripsheetmodel.clBalDsl = this.formTripsheet.value.clBalDsl;
    this.tripsheetmodel.clBalAdBlue = this.formTripsheet.value.clBalAdBlue;
    this.tripsheetmodel.ticlRemarks = this.formTripsheet.value.ticlRemarks;
    this.tripsheetmodel.tripCloseBy = this.formTripsheet.value.tripCloseBy;
    this.tripsheetmodel.tripCloseUpdateDt = this.formTripsheet.value.tripCloseUpdateDt;
    this.tripsheetmodel.tripLinkYN = this.formTripsheet.value.tripLinkYN;
    this.tripsheetmodel.findocid = this.formTripsheet.value.findocid;
    this.tripsheetmodel.tripCloseDt = this.formTripsheet.value.tripCloseDt;

    this.tripsheetmodel.tripSheetInnerGridList = this.tripsheetinnergridmodel;

    if (this.formMiscArray.value != undefined) {
      for (var i = 0; i < this.formMiscArray.value.length; i++) {
        this.tripsheetmodel.miscList.push({
          'expType': this.formMiscArray.value[i].expType,
          'miscAmount': this.formMiscArray.value[i].miscAmount,
          'narration': this.formMiscArray.value[i].narration
        })
      }
    }

    if (this.formAdblueArray.value != undefined) {
      for (var i = 0; i < this.formAdblueArray.value.length; i++) {
        this.tripsheetmodel.adblueList.push({
          'adbluefillingStation': this.formAdblueArray.value[i].adbluefillingStation,
          'adbluedieselLiter': this.formAdblueArray.value[i].adbluedieselLiter,
          'adbluedieselAmount': this.formAdblueArray.value[i].adbluedieselAmount
        })
      }
    }

    this.tripSheetService.tripSheetDetailsSubmitted(this.tripsheetmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formTripsheet.reset();
      window.location.reload();
    });
  }

  // addLRItem(): void {
  //   this.formLRArray.push(this.createLRArray());
  // }

  // removeLRItem(index: number) {
  //   this.formLRArray.removeAt(index);
  // }
  getValidation(): void {
    this.formTripsheet.controls['tripBranch'].disable();
    //this.formTripsheet.controls['vehicleMasterID'].disable();
    this.formTripsheet.controls['tripNo'].disable();
    //  this.formTripsheet.controls['newTripDate'].disable();
    //this.formTripsheet.controls['driverMasterID'].disable();
    this.formTripsheet.controls['advPayable_2'].disable();
    this.formTripsheet.controls['reportingDt_2'].disable();
    this.formTripsheet.controls['tripStatus'].disable();
    this.formTripsheet.controls['ltsDslToBe_2'].disable();
    this.formTripsheet.controls['ltsAdblueToBe_2'].disable();
    this.formTripsheet.controls['advPayable_2'].disable();
    this.formTripsheet.controls['reportingDt_2'].disable();
    this.formTripsheet.controls['advanceDays_2'].disable();
    this.formTripsheet.controls['delayedDays_2'].disable();
    this.formTripsheet.controls['graceDays_2'].disable();
    this.formTripsheet.controls['opBalDriver'].disable();
    this.formTripsheet.controls['opBalDsl'].disable();
    this.formTripsheet.controls['opBalAdblue'].disable();
    this.formTripsheet.controls['paidDriverAdvance'].disable();
    this.formTripsheet.controls['freightCollByDriver'].disable();
    this.formTripsheet.controls['issuedDslLtrs'].disable();
    this.formTripsheet.controls['opBalDriver'].disable();
    this.formTripsheet.controls['opBalDsl'].disable();
    this.formTripsheet.controls['opBalDsl'].disable();
    this.formTripsheet.controls['opBalAdblue'].disable();
    this.formTripsheet.controls['freightCollByDriver'].disable();
    this.formTripsheet.controls['totalDriverAc'].disable();
    this.formTripsheet.controls['tripBalance'].disable();
    this.formTripsheet.controls['recdFromDriver'].disable();
    this.formTripsheet.controls['clBalDsl'].disable();
    this.formTripsheet.controls['clBalAdBlue'].disable();
    this.formTripsheet.controls['clBalAdBlue'].disable();
  }

  // createLRArray() {
  //   return this.formBuilder.group({
  //     lrSeries: [''],
  //     lrNo: [''],
  //     consignee: [''],
  //     invoiceNo: [''],
  //     eWayBillNo: [''],
  //     eWayBillDate: [''],
  //     eWayBillExpDate: [''],
  //     ticlStatus: [''],

  //     grnNo: [''],
  //     delayDays: ['']
  //   });
  // }

  // addDieselItem(): void {
  //   this.formDieselArray.push(this.createDieselArray());
  // }

  // removeDieselItem(index: number) {
  //   this.formDieselArray.removeAt(index);
  // }
  changeFromPlace(e: any) {
    this.ivFromPlace = e.dataId;
    this.checkMs();
  }
  changeToPlace(e: any) {
    this.ivToPlace = e.dataId;
    this.checkMs();
  }
  checkMs() {
    if (this.ivFromPlace != "" && this.ivToPlace != "") {
      this.kmsDetails.fromLocation = this.ivFromPlace;
      this.kmsDetails.toLocation = this.ivToPlace;
      this.kmsDetails.transDate = this.formTripsheet.value.newTripDate;
      this.commonService.getKms(this.kmsDetails).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.formTripsheet.patchValue({
            distanceTripKM_1: this.responseDetails.message
          });
        } else {
          this.formTripsheet.patchValue({
            distanceTripKM_1: ''
          });
        }
      });
    }
    else {
      this.formTripsheet.patchValue({
        distanceTripKM_1: ''
      });
    }
  }
  // createDieselArray() {
  //   return this.formBuilder.group({
  //     fillingStation: [''],
  //     dieselLiter: [''],
  //     dieselAmount: ['']
  //   });
  // }

  addMiscItem(): void {
    this.formMiscArray.push(this.createMiscArray());
  }

  removeMiscItem(index: number) {
    this.formMiscArray.removeAt(index);
  }

  createMiscArray() {
    return this.formBuilder.group({
      expType: [''],
      miscAmount: [''],
      narration: ['']
    });
  }

  // addDriverItem(): void {
  //   this.formDriverArray.push(this.createDriverArray());
  // }

  // removeDriverItem(index: number) {
  //   this.formDriverArray.removeAt(index);
  // }

  // createDriverArray() {
  //   return this.formBuilder.group({
  //     pmtType: [''],
  //     pmtDate: [''],
  //     pmtAmount: ['']
  //   });
  // }

  addAdblueItem(): void {
    this.formAdblueArray.push(this.createAdblueArray());
  }

  removeAdblueItem(index: number) {
    this.formAdblueArray.removeAt(index);
  }

  createAdblueArray() {
    return this.formBuilder.group({
      adbluefillingStation: [''],
      adbluedieselLiter: [''],
      adbluedieselAmount: ['']
    });
  }
}

