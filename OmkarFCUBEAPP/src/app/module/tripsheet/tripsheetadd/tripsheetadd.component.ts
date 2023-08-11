import { Component } from '@angular/core';



import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Tripsheetmodel } from 'src/app/models/tripsheetmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Tripsheetlistmodel } from 'src/app/models/tripsheetlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { TripSheetService } from 'src/app/services/tripsheet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tripsheetadd',
  templateUrl: './tripsheetadd.component.html',
  styleUrls: ['./tripsheetadd.component.css']
})
export class TripsheetaddComponent {
  loggedInUserID: string = '';
  formUser2!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];


  selectedTripSheetDetails = new Tripsheetmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private tripsheetmodel: Tripsheetmodel, private tripSheetService: TripSheetService, private commonService: CommonService) {
    this.tripsheetmodel = new Tripsheetmodel();

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
  this.getVehicleList();
  this.selectedTripSheetDetails = this.tripSheetService.getTripSheetDetails();
  this.formUser2 = this.formBuilder.group({
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
    compNonCompStatus: new FormControl('',),
    challanNo: new FormControl('',),
    loadingFrom: new FormControl('',),
    destination: new FormControl('',),
    destination2: new FormControl('',),
    destination3: new FormControl('',),
    distanceTripKM_1: new FormControl('',),
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
 


  });
  if (this.selectedTripSheetDetails.tripId != '') {
    this.formUser2.patchValue(this.selectedTripSheetDetails);
    this.formUser2.patchValue({
    

     
      
    })
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser2.controls; }

getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  }); 
}
getVehicleList(): void {
  this.commonService.getVehicleList().subscribe((res) => {
    this.vehicleList = res;
  }); 
}

//Submit user form details //
submitTripSheetForm(): void {
  this.userSubmitted = true;
  if (this.formUser2.invalid) {
    return;
  }
  this.tripsheetmodel.tripId = this.selectedTripSheetDetails.tripId!= '' ? this.selectedTripSheetDetails.tripId : '';
  this.tripsheetmodel.tripBranch= this.formUser2.value.tripBranch;
  this.tripsheetmodel.yearId = this.formUser2.value.yearId;
 
  this.tripsheetmodel.tripNo = this.formUser2.value.tripNo;
  this.tripsheetmodel.vehicleMasterID = this.formUser2.value.vehicleMasterID;
  this.tripsheetmodel.lastTripCloseDate = this.formUser2.value.lastTripCloseDate;

  this.tripsheetmodel.newTripDate = this.formUser2.value.newTripDate;
  this.tripsheetmodel.openThrough = this.formUser2.value.openThrough;
  this.tripsheetmodel.tripOpenBy = this.formUser2.value.tripOpenBy;
  this.tripsheetmodel.tripOpenDate = this.formUser2.value.tripOpenDate;
  this.tripsheetmodel.tripStatus = this.formUser2.value.tripStatus;
  this.tripsheetmodel.driverMasterID = this.formUser2.value.driverMasterID;
  this.tripsheetmodel.consignorPayParty = this.formUser2.value.consignorPayParty;
  this.tripsheetmodel.compNonCompStatus = this.formUser2.value.compNonCompStatus;
  this.tripsheetmodel.findocid = this.formUser2.value.findocid;
  this.tripsheetmodel.challanNo = this.formUser2.value.challanNo;
  this.tripsheetmodel.loadingFrom = this.formUser2.value.loadingFrom;
  this.tripsheetmodel.destination = this.formUser2.value.destination;
  this.tripsheetmodel.destination2 = this.formUser2.value.destination2;
  this.tripsheetmodel.destination3 = this.formUser2.value.destination3;
  this.tripsheetmodel.distanceTripKM_1 = this.formUser2.value.distanceTripKM_1;
  this.tripsheetmodel.contents = this.formUser2.value.contents;
  this.tripsheetmodel.loadEmptyType = this.formUser2.value.loadEmptyType;
  this.tripsheetmodel.expectedReportingDt = this.formUser2.value.expectedReportingDt;
  this.tripsheetmodel.expectedReportingDays = this.formUser2.value.expectedReportingDays;
  this.tripsheetmodel.ltsDslToBe_2 = this.formUser2.value.ltsDslToBe_2;
  this.tripsheetmodel.ltsAdblueToBe_2 = this.formUser2.value.ltsAdblueToBe_2;
  this.tripsheetmodel.advPayable_2 = this.formUser2.value.advPayable_2;
  this.tripsheetmodel.reportingDt_2 = this.formUser2.value.reportingDt_2;
  this.tripsheetmodel.advanceDays_2 = this.formUser2.value.advanceDays_2;
  this.tripsheetmodel.delayedDays_2 = this.formUser2.value.delayedDays_2;
  this.tripsheetmodel.graceDays_2 = this.formUser2.value.graceDays_2;
  this.tripsheetmodel.opBalDriver = this.formUser2.value.opBalDriver;
  this.tripsheetmodel.opBalDsl = this.formUser2.value.opBalDsl;
  this.tripsheetmodel.opBalAdblue = this.formUser2.value.opBalAdblue;
  this.tripsheetmodel.paidDriverAdvance = this.formUser2.value.paidDriverAdvance;
  this.tripsheetmodel.freightCollByDriver = this.formUser2.value.freightCollByDriver;
  this.tripsheetmodel.issuedDslLtrs = this.formUser2.value.issuedDslLtrs;
  this.tripsheetmodel.issuedAdblueLtrs = this.formUser2.value.issuedAdblueLtrs;
  this.tripsheetmodel.challanByDriver = this.formUser2.value.challanByDriver;
  this.tripsheetmodel.repairsByDriver = this.formUser2.value.repairsByDriver;
  this.tripsheetmodel.parkingByDriver = this.formUser2.value.parkingByDriver;
  this.tripsheetmodel.accidentByDriver = this.formUser2.value.accidentByDriver;
  this.tripsheetmodel.weighmentByDriver = this.formUser2.value.weighmentByDriver;
  this.tripsheetmodel.cashDslPlace = this.formUser2.value.cashDslPlace;
  this.tripsheetmodel.cashDslLtrs = this.formUser2.value.cashDslLtrs;
  this.tripsheetmodel.cashDslAmt = this.formUser2.value.cashDslAmt;
  this.tripsheetmodel.totalBhattaDays = this.formUser2.value.totalBhattaDays;
  this.tripsheetmodel.bhattaRate = this.formUser2.value.bhattaRate;
  this.tripsheetmodel.allowedBhatta = this.formUser2.value.allowedBhatta;
  this.tripsheetmodel.onTimeIncentiveAmt = this.formUser2.value.onTimeIncentiveAmt;
  this.tripsheetmodel.multiDelIncentiveAmt = this.formUser2.value.multiDelIncentiveAmt;
  this.tripsheetmodel.penaltyChargedToDr = this.formUser2.value.penaltyChargedToDr;
  this.tripsheetmodel.poolAcAmt = this.formUser2.value.poolAcAmt;
  this.tripsheetmodel.totalDriverAc = this.formUser2.value.totalDriverAc;
  this.tripsheetmodel.tripBalance = this.formUser2.value.tripBalance;
  this.tripsheetmodel.recdFromDriver = this.formUser2.value.recdFromDriver;
  this.tripsheetmodel.netTripBalance = this.formUser2.value.netTripBalance;
  this.tripsheetmodel.clBalDsl = this.formUser2.value.clBalDsl;
  this.tripsheetmodel.clBalAdBlue = this.formUser2.value.clBalAdBlue;
  this.tripsheetmodel.ticlRemarks = this.formUser2.value.ticlRemarks;
  this.tripsheetmodel.tripCloseBy = this.formUser2.value.tripCloseBy;
  this.tripsheetmodel.tripCloseUpdateDt = this.formUser2.value.tripCloseUpdateDt;
  this.tripsheetmodel.tripLinkYN = this.formUser2.value.tripLinkYN;
  this.tripsheetmodel.findocid = this.formUser2.value.findocid;
  this.tripsheetmodel.tripCloseDt = this.formUser2.value.tripCloseDt;


  this.tripSheetService.tripSheetDetailsSubmitted(this.tripsheetmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser2.reset();
    window.location.reload();
  });
}
}

