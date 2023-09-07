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
import { SharedService } from 'src/app/services/shared.service';

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

  constructor(private route: Router, private formBuilder: FormBuilder, private tripsheetmodel: Tripsheetmodel, private tripSheetService: TripSheetService, private commonService: CommonService, private sharedService: SharedService) {
    this.tripsheetmodel = new Tripsheetmodel();

  }
  ngOnInit(): void {
    this.sharedService.loading = true;
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
      lastTripCloseDate: new FormControl('', [Validators.required]),
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
      totaldsl: new FormControl('',),
      totaladblue: new FormControl('',),
      totalpayable: new FormControl('',),

      miscDetailsList: this.formBuilder.array([this.createMiscArray()]),
      adblueDetailsList: this.formBuilder.array([this.createAdblueArray()])

    });
    this.getValidation();
    this.getDriverList();
    this.getBranchList();
    this.getVehicleNoList();
    this.getLocationList();

    this.selectedTripSheetDetails = this.tripSheetService.getTripSheetDetails();
    setTimeout(() => {
      if (this.selectedTripSheetDetails.tripId != '') {
        this.formTripsheet.patchValue(this.selectedTripSheetDetails);
        this.formTripsheet.patchValue({
          newTripDate: this.loginDate,
          lastTripCloseDate:  this.commonService.formatDate(this.selectedTripSheetDetails.lastTripCloseDate),
          tripCloseDt:  this.commonService.formatDate(this.selectedTripSheetDetails.tripCloseDt),
          loadingFrom: this.locationList.find(e => e.dataId == this.selectedTripSheetDetails.loadingFrom),
          destination: this.locationList.find(e => e.dataId == this.selectedTripSheetDetails.destination),
          destination2: this.locationList.find(e => e.dataId == this.selectedTripSheetDetails.destination2),
          destination3: this.locationList.find(e => e.dataId == this.selectedTripSheetDetails.destination3),
          vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedTripSheetDetails.vehicleMasterID),
          driverMasterID:this.driverList.find(e => e.dataId == this.selectedTripSheetDetails.driverMasterID),
        });

        this.tripsheetinnergridrequest.tripId = parseInt(this.selectedTripSheetDetails.tripId);
        this.tripsheetinnergridrequest.vehicleMasterId = parseInt(this.selectedTripSheetDetails.vehicleMasterID);
      } else {
        this.tripsheetinnergridrequest.tripId = 0;
        this.tripsheetinnergridrequest.vehicleMasterId = 0;
      }
      this.getTripSheetInnerGridList();
    }, 2000);
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
      for (let misc = 1; misc < this.tripsheetinnergridmodel.miscList.length; misc++) {
        this.addMiscItem();
      }
      for (let misc = 1; misc < this.tripsheetinnergridmodel.adblueList.length; misc++) {
        this.addAdblueItem();
      }
      this.formTripsheet.patchValue({
        miscDetailsList: this.tripsheetinnergridmodel.miscList,
        adblueDetailsList: this.tripsheetinnergridmodel.adblueList
      });

      this.calculateTotal();
    });
  }

  updateMisc(index: number, event: any){
    this.tripsheetinnergridmodel.miscList[index].miscAmount = event.target.value;
    this.calculateTotal();
  }

  updateAdBlue(index: number, event: any){
    this.tripsheetinnergridmodel.adblueList[index].adbluedieselLiter = event.target.value;
    this.calculateTotal();
  }

  calculateTotal(): void{
    var totalDslLtr = 0;
    var totalAdBlueLtr = 0;
    var totalAdvAmount = 0;
    var totalRepairs = 0;
    var totalParking = 0;
    var totalAccident = 0;
    var totalWeighment= 0;
    var totalMchallan = 0;
    for(let i=0; i< this.tripsheetinnergridmodel.dieselDetailsList.length; i++){
      totalDslLtr = totalDslLtr + parseFloat(this.tripsheetinnergridmodel.dieselDetailsList[i].qtyLtrs);
    }
    for(let i=0; i< this.tripsheetinnergridmodel.adblueList.length; i++){
      totalAdBlueLtr = totalAdBlueLtr + parseFloat(this.tripsheetinnergridmodel.adblueList[i].adbluedieselLiter);
    }
    for(let i=0; i< this.tripsheetinnergridmodel.driverAdvanceList.length; i++){
      totalAdvAmount = totalAdvAmount + parseFloat(this.tripsheetinnergridmodel.driverAdvanceList[i].amountPaid);
    }

    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "r");
    for(let i=0; i< dataList.length; i++){
      totalRepairs = totalRepairs + parseFloat(dataList[i].miscAmount);
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "p");
    for(let i=0; i< dataList.length; i++){
      totalParking = totalParking + parseFloat(dataList[i].miscAmount);
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "a");
    for(let i=0; i< dataList.length; i++){
      totalAccident = totalAccident + parseFloat(dataList[i].miscAmount);
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "w");
    for(let i=0; i< dataList.length; i++){
      totalWeighment = totalWeighment + parseFloat(dataList[i].miscAmount);
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "m");
    for(let i=0; i< dataList.length; i++){
      totalMchallan = totalMchallan + parseFloat(dataList[i].miscAmount);
    }

    this.formTripsheet.patchValue({
      issuedDslLtrs: totalDslLtr.toFixed(2),
      issuedAdblueLtrs: totalAdBlueLtr.toFixed(2),
      paidDriverAdvance: totalAdvAmount.toFixed(2),
      repairsByDriver: totalRepairs.toFixed(2),
      parkingByDriver: totalParking.toFixed(2),
      accidentByDriver: totalAccident.toFixed(2),
      weighmentByDriver: totalWeighment.toFixed(2),
      challanByDriver: totalMchallan.toFixed(2)
    });
    this.sharedService.loading = false;
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
    var selectedDataValue = this.formTripsheet.getRawValue();
    this.tripsheetmodel.tripId = this.selectedTripSheetDetails.tripId != '' ? this.selectedTripSheetDetails.tripId : '';
    this.tripsheetmodel.tripBranch = selectedDataValue.tripBranch;
    this.tripsheetmodel.yearId = this.year;
    this.tripsheetmodel.tripNo = selectedDataValue.tripNo;
    this.tripsheetmodel.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
    this.tripsheetmodel.lastTripCloseDate = selectedDataValue.lastTripCloseDate;
    this.tripsheetmodel.newTripDate = selectedDataValue.newTripDate;
    this.tripsheetmodel.openThrough = selectedDataValue.openThrough;
    this.tripsheetmodel.tripOpenBy = selectedDataValue.tripOpenBy;
    this.tripsheetmodel.tripOpenDate = selectedDataValue.tripOpenDate;
    this.tripsheetmodel.tripStatus = selectedDataValue.tripStatus;
    this.tripsheetmodel.driverMasterID = selectedDataValue.driverMasterID.dataId;
    this.tripsheetmodel.consignorPayParty = selectedDataValue.consignorPayParty;
    this.tripsheetmodel.compNonCompStatus = selectedDataValue.compNonCompStatus;
    this.tripsheetmodel.findocid = selectedDataValue.findocid;
    this.tripsheetmodel.challanNo = selectedDataValue.challanNo;
    this.tripsheetmodel.loadingFrom = selectedDataValue.loadingFrom.dataId;
    this.tripsheetmodel.destination = selectedDataValue.destination.dataId;
    this.tripsheetmodel.destination2 = selectedDataValue.destination2;
    this.tripsheetmodel.destination3 = selectedDataValue.destination3;
    this.tripsheetmodel.distanceTripKM_1 = selectedDataValue.distanceTripKM_1;
    this.tripsheetmodel.contents = selectedDataValue.contents;
    this.tripsheetmodel.loadEmptyType = selectedDataValue.loadEmptyType;
    this.tripsheetmodel.expectedReportingDt = selectedDataValue.expectedReportingDt;
    this.tripsheetmodel.expectedReportingDays = selectedDataValue.expectedReportingDays;
    this.tripsheetmodel.ltsDslToBe_2 = selectedDataValue.ltsDslToBe_2;
    this.tripsheetmodel.ltsAdblueToBe_2 = selectedDataValue.ltsAdblueToBe_2;
    this.tripsheetmodel.advPayable_2 = selectedDataValue.advPayable_2;
    this.tripsheetmodel.reportingDt_2 = selectedDataValue.reportingDt_2;
    this.tripsheetmodel.advanceDays_2 = selectedDataValue.advanceDays_2;
    this.tripsheetmodel.delayedDays_2 = selectedDataValue.delayedDays_2;
    this.tripsheetmodel.graceDays_2 = selectedDataValue.graceDays_2;
    this.tripsheetmodel.opBalDriver = selectedDataValue.opBalDriver;
    this.tripsheetmodel.opBalDsl = selectedDataValue.opBalDsl;
    this.tripsheetmodel.opBalAdblue = selectedDataValue.opBalAdblue;
    this.tripsheetmodel.paidDriverAdvance = selectedDataValue.paidDriverAdvance.toString();
    this.tripsheetmodel.freightCollByDriver = selectedDataValue.freightCollByDriver;
    this.tripsheetmodel.issuedDslLtrs = selectedDataValue.issuedDslLtrs.toString();
    this.tripsheetmodel.issuedAdblueLtrs = selectedDataValue.issuedAdblueLtrs.toString();
    this.tripsheetmodel.challanByDriver = selectedDataValue.challanByDriver.toString();
    this.tripsheetmodel.repairsByDriver = selectedDataValue.repairsByDriver.toString();
    this.tripsheetmodel.parkingByDriver = selectedDataValue.parkingByDriver.toString();
    this.tripsheetmodel.accidentByDriver = selectedDataValue.accidentByDriver.toString();
    this.tripsheetmodel.weighmentByDriver = selectedDataValue.weighmentByDriver.toString();
    this.tripsheetmodel.cashDslPlace = selectedDataValue.cashDslPlace;
    this.tripsheetmodel.cashDslLtrs = selectedDataValue.cashDslLtrs;
    this.tripsheetmodel.cashDslAmt = selectedDataValue.cashDslAmt;
    this.tripsheetmodel.totalBhattaDays = selectedDataValue.totalBhattaDays;
    this.tripsheetmodel.bhattaRate = selectedDataValue.bhattaRate;
    this.tripsheetmodel.allowedBhatta = selectedDataValue.allowedBhatta;
    this.tripsheetmodel.onTimeIncentiveAmt = selectedDataValue.onTimeIncentiveAmt;
    this.tripsheetmodel.multiDelIncentiveAmt = selectedDataValue.multiDelIncentiveAmt;
    this.tripsheetmodel.penaltyChargedToDr = selectedDataValue.penaltyChargedToDr;
    this.tripsheetmodel.poolAcAmt = selectedDataValue.poolAcAmt;
    this.tripsheetmodel.totalDriverAc = selectedDataValue.totalDriverAc;
    this.tripsheetmodel.tripBalance = selectedDataValue.tripBalance;
    this.tripsheetmodel.recdFromDriver = selectedDataValue.recdFromDriver;
    this.tripsheetmodel.netTripBalance = selectedDataValue.netTripBalance;
    this.tripsheetmodel.clBalDsl = selectedDataValue.clBalDsl;
    this.tripsheetmodel.clBalAdBlue = selectedDataValue.clBalAdBlue;
    this.tripsheetmodel.ticlRemarks = selectedDataValue.ticlRemarks;
    this.tripsheetmodel.tripCloseBy = selectedDataValue.tripCloseBy;
    this.tripsheetmodel.tripCloseUpdateDt = selectedDataValue.tripCloseUpdateDt;
    this.tripsheetmodel.tripLinkYN = selectedDataValue.tripLinkYN;
    this.tripsheetmodel.findocid = selectedDataValue.findocid;
    this.tripsheetmodel.tripCloseDt = selectedDataValue.tripCloseDt;
    this.tripsheetmodel.ticlStatus = selectedDataValue.ticlStatus;
    this.tripsheetmodel.tripSheetInnerGridList = this.tripsheetinnergridmodel;
    this.tripsheetmodel.loggedInUser = this.loggedInUserID;
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
      this.formTripsheet.reset();
      this.route.navigate(['/tripsheetlist']);
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
   // this.formTripsheet.controls['reportingDt_2'].disable();
    this.formTripsheet.controls['tripStatus'].disable();
    this.formTripsheet.controls['ltsDslToBe_2'].disable();
    this.formTripsheet.controls['ltsDslToBe_1'].disable();
    this.formTripsheet.controls['ltsAdblueToBe_2'].disable();
    this.formTripsheet.controls['ltsAdblueToBe_1'].disable();
    this.formTripsheet.controls['advPayable_2'].disable();
    this.formTripsheet.controls['advPayable_1'].disable();
    this.formTripsheet.controls['advPayable_2'].disable();
  //  this.formTripsheet.controls['reportingDt_2'].disable();
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
    this.formTripsheet.controls['expectedReportingDt'].disable();
    this.formTripsheet.controls['expectedReportingDays'].disable();
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

