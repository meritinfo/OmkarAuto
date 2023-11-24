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
import { Tripkmsmodel } from 'src/app/models/tripkmsmodel';
import { Dslmodel } from 'src/app/models/dslmodel';
import { BhattaRateModel } from 'src/app/models/bhattaratemodel';
import { Opbalmodel } from 'src/app/models/opbalmodel';
import { IncentiveRateModel } from 'src/app/models/incentiveratemodel';
import { Adbluetobemodel } from 'src/app/models/adbluetobemodel';
import { ToastrService } from 'ngx-toastr';
import { PenaltyRateModel } from 'src/app/models/penaltyratemodel';

@Component({
  selector: 'app-tripsheetadd',
  templateUrl: './tripsheetadd.component.html',
  styleUrls: ['./tripsheetadd.component.css']
})
export class TripsheetaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  loginDate: string = '';
  day1: string = '';
  clBalDsl:string = '';
  advancePay: string = '';
  incentiveRate: string = '';
  penaltyRate: string = '';
  bhattaRate: string = '';
  advancePay2: string = '';
  day2: string = '';
  adblue: string = '';
  dsl2: number = 0;
  driverid: string = '';
  ltsdsl: string = '';
  adblue1: string = '';
  ltsdsl1: string = '';
  bDays: number = 0;
  totalAdblue: number = 0;
  totaldsl: number = 0;
  totalpayable: number = 0;
  distanceTripKM_1: string = '';
  dTripKM_1: number = 0;
  tripkms: string = '';
  nexttripkms: string = '';

  ExpReportingDays: number = 0;
  ExpReportingDt: string = '';
  dslDetails = new Dslmodel();
  incentiveDetails = new IncentiveRateModel();
  penaltyDetails = new PenaltyRateModel();
  OpbalDetails = new Opbalmodel();
  bhattaDetails = new BhattaRateModel();
  adBlueDetails = new Adbluetobemodel();

  formTripsheet!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  driverList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  tripkmsDetails = new Tripkmsmodel();
  tripsheetinnergridmodel = new Tripsheetinnergridmodel();
  kmsDetails = new kmsmodel();
  editMode = false;
  keywordLocation = 'dataName';
  ivVehicleNo = '';
  billstation = '';
  ivFromPlace = '';
  destinationid2='';
  destinationid3='';
  ivNewFromPlace = '';
  ivToPlace = '';
  tripsheetinnergridrequest = new Tripsheetinnergridrequest();

  selectedToPlace: boolean = false;
  selectedDestination2: boolean = false;
  selectedDestination3: boolean = false;


  selectedTripSheetDetails = new Tripsheetmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private tripsheetmodel: Tripsheetmodel, private tripSheetService: TripSheetService, private commonService: CommonService, private sharedService: SharedService, private toastrService: ToastrService) {
    this.tripsheetmodel = new Tripsheetmodel();

  }
  ngOnInit(): void {
    this.sharedService.loading = true;
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
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
      ltsDslToBe_2: new FormControl('0',),
      ltsAdblueToBe_2: new FormControl('',),
      advPayable_2: new FormControl('',),
      reportingDt_2: new FormControl('',),
      advanceDays_2: new FormControl('',),
      delayedDays_2: new FormControl('',),
      graceDays_2: new FormControl('',),
      opBalDriver: new FormControl('0',),
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
      actualDays_1: new FormControl('0',),
      actualDays_2: new FormControl('0',),
      totalAdblue: new FormControl('',),
      totalpayable: new FormControl('',),
      totalBhattaDays: new FormControl('',),
      tripTime: new FormControl('',),


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
        //this.getTripSheetInnerGridList();
        this.formTripsheet.patchValue({
          // newTripDate: this.loginDate,
          newTripDate: this.commonService.formatDate(this.selectedTripSheetDetails.newTripDate),
          reportingDt_1: this.commonService.formatDate(this.selectedTripSheetDetails.reportingDt_1),
          reportingDt_2: this.commonService.formatDate(this.selectedTripSheetDetails.reportingDt_2),
          nextExpectedReportingDt:this.commonService.formatDate(this.selectedTripSheetDetails.nextExpectedReportingDt),
          expectedReportingDt:this.commonService.formatDate(this.selectedTripSheetDetails.expectedReportingDt),
          deliveryDate:this.commonService.formatDate(this.selectedTripSheetDetails.deliveryDate),
          // deliveryDate:this.selectedTripSheetDetails.deliveryDate,
          ticlStatus: this.selectedTripSheetDetails.ticlStatus,
          tripLinkYN: this.selectedTripSheetDetails.tripLinkYN,
          compNonCompStatus: this.selectedTripSheetDetails.compNonCompStatus,
          tripTime: this.selectedTripSheetDetails.tripTime,
          //  compNonCompStatus:  "C",
          loadType: this.selectedTripSheetDetails.loadEmptyType,
          lastTripCloseDate: this.commonService.formatDate(this.selectedTripSheetDetails.lastTripCloseDate),
          tripCloseDt: this.commonService.formatDate(this.selectedTripSheetDetails.tripCloseDt),
          loadingFrom: this.locationList.find(e => e.dataId == this.selectedTripSheetDetails.loadingFrom),
          destination: this.locationList.find(e => e.dataId == this.selectedTripSheetDetails.destination),
          destination2: this.locationList.find(e => e.dataId == this.selectedTripSheetDetails.destination2),
          destination3: this.locationList.find(e => e.dataId == this.selectedTripSheetDetails.destination3),
          vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedTripSheetDetails.vehicleMasterID),
          driverMasterID: this.driverList.find(e => e.dataId == this.selectedTripSheetDetails.driverMasterID),
          nextReportingBranch: this.locationList.find(e => e.dataId == this.selectedTripSheetDetails.nextReportingBranch),
          tripStatus: this.selectedTripSheetDetails.tripStatus == "O" ? false : true,
         // totaldsl: this.selectedTripSheetDetails.ltsDslToBe_1 ?this.selectedTripSheetDetails.ltsDslToBe_1 :0+ this.selectedTripSheetDetails.ltsDslToBe_2? this.selectedTripSheetDetails.ltsDslToBe_2:0,
          totaldsl: parseInt(this.selectedTripSheetDetails.ltsDslToBe_1 )+ parseInt(this.selectedTripSheetDetails.ltsDslToBe_2),
          totalAdblue: parseInt(this.selectedTripSheetDetails.ltsAdblueToBe_1)+ parseInt(this.selectedTripSheetDetails.ltsAdblueToBe_2 ),
         // totalpayable:  this.selectedTripSheetDetails.advPayable_1 ?this.selectedTripSheetDetails.advPayable_1:0 + this.selectedTripSheetDetails.advPayable_2 ?this.selectedTripSheetDetails.advPayable_2:0,
         totalpayable:  parseInt(this.selectedTripSheetDetails.advPayable_1)+parseInt(this.selectedTripSheetDetails.advPayable_2),
           yearid: this.year
        });

        this.ivFromPlace = this.selectedTripSheetDetails.loadingFrom;
        this.ivToPlace = this.selectedTripSheetDetails.destination;
        this.ivNewFromPlace= this.selectedTripSheetDetails.nextReportingBranch;
      //  this.destinationid2= this.selectedTripSheetDetails.destination2;
      //  this.destinationid3= this.selectedTripSheetDetails.destination3;
       // this.ivNewFromPlace= this.selectedTripSheetDetails.nextReportingBranch;

        this.tripsheetinnergridrequest.tripId = parseInt(this.selectedTripSheetDetails.tripId);
        this.tripsheetinnergridrequest.vehicleMasterId = parseInt(this.selectedTripSheetDetails.vehicleMasterID);
        this.getTripSheetInnerGridList();
        this.GetOpeningBal();
        this.getBhattaRate();
      } else {
        this.tripsheetinnergridrequest.tripId = 0;
        this.tripsheetinnergridrequest.vehicleMasterId = 0;
      }

      this.checkDestinationControlStatus();

     // this.getTripSheetInnerGridList();
     this.editMode = true;
     // this.GetOpeningBal();
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
  exit(): void {
    this.route.navigate(['/tripsheetlist']);
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



  changeMisc(index: number, event: any) {
    this.tripsheetinnergridmodel.miscList = this.formMiscArray.value;
    this.calculateTotal();
  }

  changeAdBlue(index: number, event: any) {
    this.tripsheetinnergridmodel.adblueList = this.formAdblueArray.value;
    this.calculateTotal();
  }

  updateMisc(index: number, event: any) {
    var data = this.tripsheetmodel.miscList;
    if(index == 0 && this.tripsheetinnergridmodel.miscList.length == 0){
      if (this.formMiscArray.value != undefined) {
        for (var i = 0; i < this.formMiscArray.value.length; i++) {
          this.tripsheetmodel.miscList.push({
            'expType': this.formMiscArray.value[i].expType,
            'miscAmount': this.formMiscArray.value[i].miscAmount,
            'narration': this.formMiscArray.value[i].narration
          })
        }
      }
    }
    this.tripsheetinnergridmodel.miscList[index].miscAmount = event.target.value;
    this.calculateTotal();
  }

  updateAdBlue(index: number, event: any) {
    if(index == 0 && this.tripsheetinnergridmodel.adblueList.length == 0){
      this.tripsheetinnergridmodel.adblueList.push({
        'adbluefillingStation': '',
        'adbluedieselLiter': '',
        'adbluedieselAmount': ''
      })
    }
    this.tripsheetinnergridmodel.adblueList[index].adbluedieselLiter = event.target.value;
    this.calculateTotal();
  }
  calTotalnew(): void {
    var selectedDataValue = this.formTripsheet.getRawValue();
    let clBalDsl= 0;
    let clBalAdBlue =0;
    let netTripBalance =0;
    clBalDsl =  parseInt(selectedDataValue.opBalDsl) + parseFloat(selectedDataValue.issuedDslLtrs)- parseInt(selectedDataValue.cashDslLtrs)-parseInt(selectedDataValue.totaldsl)
    clBalAdBlue =  parseInt(selectedDataValue.opBalAdblue) + parseFloat(selectedDataValue.issuedAdblueLtrs)+parseFloat(selectedDataValue.cashAdblueLtrs)-parseInt(selectedDataValue.totalAdblue)
    netTripBalance = parseInt(selectedDataValue.opBalDsl) + parseInt(selectedDataValue.paidDriverAdvance)-   parseInt(selectedDataValue.totalpayable)-parseInt(selectedDataValue.totalpayable)-parseInt(selectedDataValue.repairsByDriver)-parseInt(selectedDataValue.parkingByDriver)-parseInt(selectedDataValue.accidentByDriver)-parseInt(selectedDataValue.weighmentByDriver)-parseInt(selectedDataValue.otherExpByDriver)-parseInt(selectedDataValue.allowedBhatta)-parseInt(selectedDataValue.onTimeIncentiveAmt)-parseInt(selectedDataValue.multiDelIncentiveAmt)-parseInt(selectedDataValue.penaltyChargedToDr)-parseInt(selectedDataValue.poolAcAmt)
    if(clBalDsl!= undefined && clBalAdBlue != undefined && netTripBalance != undefined){
    this.formTripsheet.patchValue({
      clBalDsl: clBalDsl,
      clBalAdBlue: clBalAdBlue,
      netTripBalance: netTripBalance
    });
    

  }
  else{
    this.formTripsheet.patchValue({
      clBalDsl: '',
      clBalAdBlue: '',
      netTripBalance: '',
    });

  }
}

  calculateTotal(): void {
    var totalDslLtr = 0;
    var totalAdBlueLtr = 0;
    var totalAdvAmount = 0;
    var totalRepairs = 0;
    var totalParking = 0;
    var totalAccident = 0;
    var totalWeighment = 0;
    var totalMchallan = 0;
        var totalotherExpByDriver = 0;
    for (let i = 0; i < this.tripsheetinnergridmodel.dieselDetailsList.length; i++) {
      totalDslLtr = totalDslLtr + parseFloat(this.tripsheetinnergridmodel.dieselDetailsList[i].qtyLtrs);
    }
    for (let i = 0; i < this.tripsheetinnergridmodel.adblueList.length; i++) {
      totalAdBlueLtr = totalAdBlueLtr +(this.tripsheetinnergridmodel.adblueList[i].adbluedieselLiter === '' ? 0 : parseFloat(this.tripsheetinnergridmodel.adblueList[i].adbluedieselLiter));
    }
    for (let i = 0; i < this.tripsheetinnergridmodel.driverAdvanceList.length; i++) {
      totalAdvAmount = totalAdvAmount + parseFloat(this.tripsheetinnergridmodel.driverAdvanceList[i].amountPaid);
    }

    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "r");
    for (let i = 0; i < dataList.length; i++) {
      totalRepairs = totalRepairs + (dataList[i].miscAmount === '' ? 0 : parseFloat(dataList[i].miscAmount));
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "p");
   
    for (let i = 0; i < dataList.length; i++) {
      totalParking = totalParking + (dataList[i].miscAmount === '' ? 0 : parseFloat(dataList[i].miscAmount));
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "a");
    for (let i = 0; i < dataList.length; i++) {
      totalAccident = totalAccident + (dataList[i].miscAmount === '' ? 0 : parseFloat(dataList[i].miscAmount));
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "w");
    for (let i = 0; i < dataList.length; i++) {
      totalWeighment = totalWeighment + (dataList[i].miscAmount === '' ? 0 : parseFloat(dataList[i].miscAmount));
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "m");
    for (let i = 0; i < dataList.length; i++) {
      totalMchallan = totalMchallan + (dataList[i].miscAmount === '' ? 0 : parseFloat(dataList[i].miscAmount));
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "o");
    for (let i = 0; i < dataList.length; i++) {
      totalotherExpByDriver  = totalotherExpByDriver + (dataList[i].miscAmount === '' ? 0 : parseFloat(dataList[i].miscAmount));
    }
    

    this.formTripsheet.patchValue({
      issuedDslLtrs: totalDslLtr.toFixed(2),
      issuedAdblueLtrs: totalAdBlueLtr.toFixed(2),
      paidDriverAdvance: totalAdvAmount.toFixed(2),
      repairsByDriver: totalRepairs.toFixed(2),
      parkingByDriver: totalParking.toFixed(2),
      accidentByDriver: totalAccident.toFixed(2),
      weighmentByDriver: totalWeighment.toFixed(2),
      challanByDriver: totalMchallan.toFixed(2),
      otherExpByDriver :totalotherExpByDriver.toFixed(2),
    });
    this.sharedService.loading = false;
  }
  calculateTotal2(): void {
    var totalDslLtr = 0;
    var totalAdBlueLtr = 0;
    var totalAdvAmount = 0;
    var totalRepairs = 0;
    var totalParking = 0;
    var totalAccident = 0;
    var totalWeighment = 0;
    var totalMchallan = 0;
        var totalotherExpByDriver = 0;
    for (let i = 0; i < this.tripsheetinnergridmodel.dieselDetailsList.length; i++) {
      totalDslLtr = totalDslLtr + parseFloat(this.tripsheetinnergridmodel.dieselDetailsList[i].qtyLtrs);
    }
    for (let i = 0; i < this.tripsheetinnergridmodel.adblueList.length; i++) {
      totalAdBlueLtr = totalAdBlueLtr + parseFloat(this.tripsheetinnergridmodel.adblueList[i].adbluedieselLiter);
    }
    for (let i = 0; i < this.tripsheetinnergridmodel.driverAdvanceList.length; i++) {
      totalAdvAmount = totalAdvAmount + parseFloat(this.tripsheetinnergridmodel.driverAdvanceList[i].amountPaid);
    }

    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "r");
    for (let i = 0; i < dataList.length; i++) {
      totalRepairs = totalRepairs + parseFloat(dataList[i].miscAmount);
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "p");
    for (let i = 0; i < dataList.length; i++) {
      totalParking = totalParking - parseFloat(dataList[i].miscAmount);
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "a");
    for (let i = 0; i < dataList.length; i++) {
      totalAccident = totalAccident + parseFloat(dataList[i].miscAmount);
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "w");
    for (let i = 0; i < dataList.length; i++) {
      totalWeighment = totalWeighment + parseFloat(dataList[i].miscAmount);
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "m");
    for (let i = 0; i < dataList.length; i++) {
      totalMchallan = totalMchallan + parseFloat(dataList[i].miscAmount);
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "o");
    for (let i = 0; i < dataList.length; i++) {
      totalotherExpByDriver  = totalotherExpByDriver + parseFloat(dataList[i].miscAmount);
    }
    

    this.formTripsheet.patchValue({
      issuedDslLtrs: totalDslLtr.toFixed(2),
      issuedAdblueLtrs: totalAdBlueLtr.toFixed(2),
      paidDriverAdvance: totalAdvAmount.toFixed(2),
      repairsByDriver: totalRepairs.toFixed(2),
      parkingByDriver: totalParking.toFixed(2),
      accidentByDriver: totalAccident.toFixed(2),
      weighmentByDriver: totalWeighment.toFixed(2),
      challanByDriver: totalMchallan.toFixed(2),
      otherExpByDriver :totalotherExpByDriver.toFixed(2),
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
  selectNewEvent(item: any) {
    this.driverid= item.dataId;
    // do something with selected item
    this.GetOpeningBal();
  }
  selectEvent(item: any) {
    // do something with selected item
   // this.GetOpeningBal();
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
   this.tripsheetmodel.lastTripCloseDate = selectedDataValue.lastTripCloseDate ? selectedDataValue.lastTripCloseDate:'';
     //this.tripsheetmodel.lastTripCloseDate = '';
    this.tripsheetmodel.newTripDate = selectedDataValue.newTripDate;
    this.tripsheetmodel.openThrough = selectedDataValue.openThrough;
    this.tripsheetmodel.compNonCompStatus = selectedDataValue.compNonCompStatus;
    this.tripsheetmodel.tripOpenBy = selectedDataValue.tripOpenBy;
   this.tripsheetmodel.tripOpenDate = this.commonService.formatDate( this.loginDate);
     // this.tripsheetmodel.tripOpenDate = selectedDataValue.tripOpenDate;
    this.tripsheetmodel.tripStatus = selectedDataValue.tripStatus ? 'C' : 'O';
    this.tripsheetmodel.driverMasterID = selectedDataValue.driverMasterID? selectedDataValue.driverMasterID.dataId :'';
    this.tripsheetmodel.consignorPayParty = selectedDataValue.consignorPayParty;
    this.tripsheetmodel.compNonCompStatus = selectedDataValue.compNonCompStatus;
    this.tripsheetmodel.findocid = selectedDataValue.findocid;
    this.tripsheetmodel.challanNo = selectedDataValue.challanNo;
    this.tripsheetmodel.loadingFrom = selectedDataValue.loadingFrom ?selectedDataValue.loadingFrom.dataId:'';
    this.tripsheetmodel.destination = selectedDataValue.destination ?  selectedDataValue.destination.dataId:'';
    this.tripsheetmodel.destination2 = selectedDataValue.destination2 ? selectedDataValue.destination2.dataId : '';
    this.tripsheetmodel.destination3 = selectedDataValue.destination3 ? selectedDataValue.destination3.dataId : '';
    this.tripsheetmodel.distanceTripKM_1 = selectedDataValue.distanceTripKM_1.toString();
    this.tripsheetmodel.distanceTripKM_2 = selectedDataValue.distanceTripKM_2.toString();
    this.tripsheetmodel.contents = selectedDataValue.contents;
    this.tripsheetmodel.loadEmptyType = selectedDataValue.loadEmptyType;
    this.tripsheetmodel.expectedReportingDt = this.commonService.formatDate(selectedDataValue.expectedReportingDt);
    this.tripsheetmodel.expectedReportingDays = selectedDataValue.expectedReportingDays;
    this.tripsheetmodel.ltsDslToBe_2 = selectedDataValue.ltsDslToBe_2.toString();;
    this.tripsheetmodel.ltsDslToBe_1 = selectedDataValue.ltsDslToBe_1.toString();;
    this.tripsheetmodel.ltsAdblueToBe_2 = selectedDataValue.ltsAdblueToBe_2.toString();;
    this.tripsheetmodel.ltsAdblueToBe_1 = selectedDataValue.ltsAdblueToBe_1.toString();;
    this.tripsheetmodel.advPayable_2 = selectedDataValue.advPayable_2;
    this.tripsheetmodel.advPayable_1 = selectedDataValue.advPayable_1;
    this.tripsheetmodel.reportingDt_2 = selectedDataValue.reportingDt_2;
    this.tripsheetmodel.reportingDt_1 = selectedDataValue.reportingDt_1;
    this.tripsheetmodel.advanceDays_2 = selectedDataValue.advanceDays_2 ? selectedDataValue.advanceDays_2 : '';
    this.tripsheetmodel.advanceDays_1 = selectedDataValue.advanceDays_1;
    this.tripsheetmodel.delayedDays_2 = selectedDataValue.delayedDays_2 ? selectedDataValue.delayedDays_2 : '';
    this.tripsheetmodel.delayedDays_1 = selectedDataValue.delayedDays_1;
    this.tripsheetmodel.deliveryDate = selectedDataValue.deliveryDate;
    this.tripsheetmodel.graceDays_2 = selectedDataValue.graceDays_2;
    this.tripsheetmodel.detentionDays = selectedDataValue.detentionDays;
    this.tripsheetmodel.nextExpectedReportingDt = selectedDataValue.nextExpectedReportingDt;
    this.tripsheetmodel.nextExpectedReportingDays = selectedDataValue.nextExpectedReportingDays;
    
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
    this.tripsheetmodel.nextReportingBranch = selectedDataValue.nextReportingBranch ? selectedDataValue.nextReportingBranch.dataId:'';
    this.tripsheetmodel.nextExpectedReportingDt = selectedDataValue.nextExpectedReportingDt;
    this.tripsheetmodel.cashDslPlace = selectedDataValue.cashDslPlace;
    this.tripsheetmodel.cashDslLtrs = selectedDataValue.cashDslLtrs;
    this.tripsheetmodel.cashDslAmt = selectedDataValue.cashDslAmt;
    this.tripsheetmodel.totalBhattaDays = selectedDataValue.totalBhattaDays.toString();
    this.tripsheetmodel.bhattaRate = selectedDataValue.bhattaRate;
    this.tripsheetmodel.allowedBhatta = selectedDataValue.allowedBhatta.toString();;
    this.tripsheetmodel.onTimeIncentiveAmt = selectedDataValue.onTimeIncentiveAmt.toString();;
    this.tripsheetmodel.multiDelIncentiveAmt = selectedDataValue.multiDelIncentiveAmt.toString();;
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
    this.tripsheetmodel.tripCloseUpdateDt = selectedDataValue.tripCloseUpdateDt ?  selectedDataValue.tripCloseUpdateDt :'';
    this.tripsheetmodel.tripLinkYN = selectedDataValue.tripLinkYN ? "1" : "0";
    this.tripsheetmodel.findocid = selectedDataValue.findocid;
   // this.tripsheetmodel.tripCloseDt = "";
   this.tripsheetmodel.tripCloseDt = selectedDataValue.loggedInUserID;
    this.tripsheetmodel.ticlStatus = selectedDataValue.ticlStatus;
    this.tripsheetmodel.actualDays_1 = selectedDataValue.actualDays_1.toString();
    this.tripsheetmodel.actualDays_2 = selectedDataValue.actualDays_2.toString();
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
    this.formTripsheet.controls['vehicleMasterID'].disable();
    this.formTripsheet.controls['tripNo'].disable();
    this.formTripsheet.controls['newTripDate'].disable();
    this.formTripsheet.controls['nextExpectedReportingDt'].disable();
    this.formTripsheet.controls['compNonCompStatus'].disable();
    this.formTripsheet.controls['advPayable_2'].disable();
     this.formTripsheet.controls['multiDelIncentiveAmt'].disable();
    this.formTripsheet.controls['onTimeIncentiveAmt'].disable();
    this.formTripsheet.controls['detentionDays'].disable();
    this.formTripsheet.controls['ltsDslToBe_2'].disable();
    this.formTripsheet.controls['ltsDslToBe_1'].disable();
    this.formTripsheet.controls['ltsAdblueToBe_2'].disable();
    this.formTripsheet.controls['ltsAdblueToBe_1'].disable();
    this.formTripsheet.controls['advPayable_2'].disable();
    this.formTripsheet.controls['advPayable_1'].disable();
    this.formTripsheet.controls['advPayable_2'].disable();
     this.formTripsheet.controls['totalBhattaDays'].disable();
     this.formTripsheet.controls['allowedBhatta'].disable();
     this.formTripsheet.controls['allowedBhatta'].disable();
     this.formTripsheet.controls['allowedBhatta'].disable();
    this.formTripsheet.controls['advanceDays_2'].disable();
    this.formTripsheet.controls['delayedDays_2'].disable();
    this.formTripsheet.controls['graceDays_2'].disable();
    this.formTripsheet.controls['opBalDriver'].disable();
    this.formTripsheet.controls['opBalDsl'].disable();
    this.formTripsheet.controls['opBalDsl'].disable();
    this.formTripsheet.controls['opBalAdblue'].disable();
    this.formTripsheet.controls['paidDriverAdvance'].disable();
    this.formTripsheet.controls['freightCollByDriver'].disable();
    this.formTripsheet.controls['issuedDslLtrs'].disable();
    this.formTripsheet.controls['opBalDriver'].disable();
    this.formTripsheet.controls['opBalDsl'].disable();
    this.formTripsheet.controls['distanceTripKM_1'].disable();
    this.formTripsheet.controls['distanceTripKM_2'].disable();
    this.formTripsheet.controls['expectedReportingDt'].disable();
    this.formTripsheet.controls['expectedReportingDays'].disable();
    this.formTripsheet.controls['ltsDslToBe_1'].disable();
    this.formTripsheet.controls['ltsDslToBe_2'].disable();
    this.formTripsheet.controls['ltsAdblueToBe_1'].disable();
    this.formTripsheet.controls['ltsAdblueToBe_2'].disable();
    this.formTripsheet.controls['opBalAdblue'].disable();
    ////////////////
    this.formTripsheet.controls['actualDays_1'].disable();
    this.formTripsheet.controls['actualDays_2'].disable();
    this.formTripsheet.controls['advanceDays_1'].disable();
    this.formTripsheet.controls['advanceDays_2'].disable();
    this.formTripsheet.controls['delayedDays_1'].disable();
    this.formTripsheet.controls['delayedDays_2'].disable();
    this.formTripsheet.controls['weighmentByDriver'].disable();

    this.formTripsheet.controls['challanByDriver'].disable();
    this.formTripsheet.controls['otherExpByDriver'].disable();
    this.formTripsheet.controls['netTripBalance'].disable();
    
    this.formTripsheet.controls['graceDays_2'].disable();
    this.formTripsheet.controls['graceDays_1'].disable();
    this.formTripsheet.controls['nextExpectedReportingDt'].disable();
    this.formTripsheet.controls['issuedAdblueLtrs'].disable();
    this.formTripsheet.controls['loadType'].disable();
  
    /////////////////////
     this.formTripsheet.controls['repairsByDriver'].disable();
     this.formTripsheet.controls['parkingByDriver'].disable();
     this.formTripsheet.controls['accidentByDriver'].disable();
     this.formTripsheet.controls['totaldsl'].disable();
     this.formTripsheet.controls['totalAdblue'].disable();
      this.formTripsheet.controls['totalpayable'].disable();
    this.formTripsheet.controls['freightCollByDriver'].disable();
    this.formTripsheet.controls['totalDriverAc'].disable();
    this.formTripsheet.controls['tripBalance'].disable();
    //this.formTripsheet.controls['recdFromDriver'].disable();
    this.formTripsheet.controls['clBalDsl'].disable();
    this.formTripsheet.controls['clBalAdBlue'].disable();
    this.formTripsheet.controls['nextExpectedReportingDays'].disable();
    this.formTripsheet.controls['expectedReportingDt'].disable();
    this.formTripsheet.controls['expectedReportingDays'].disable();
  }
findKMs(){
  
}
  checkTripkMs() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (this.ivFromPlace != "" && this.ivToPlace != ""  && this.destinationid2 == "") {
      this.kmsDetails.fromLocation = this.ivFromPlace;
      this.kmsDetails.toLocation = this.ivToPlace;
      this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms ? this.tripkmsDetails.kms : '';
        this.advancePay = this.tripkmsDetails.enrouteExpTruck ? this.tripkmsDetails.enrouteExpTruck : '';
        this.dTripKM_1 = this.tripkmsDetails.kms ? parseInt(this.tripkmsDetails.kms) : 0;
        this.ExpReportingDays = this.dTripKM_1 / 400;
       // this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1
       this.ExpReportingDays = Math.round(this.ExpReportingDays) 
        let date: Date = new Date(selectedDataValue.newTripDate);


        date.setDate(date.getDate() + this.ExpReportingDays)
        let date2 = (date).toISOString()
        ////date2 =this.commonService.formatDate(date2)
        ////const myFormattedDate = this.commonService.formatDate(date2);

        this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          expectedReportingDt: date2.split("T")[0],
          distanceTripKM_1: (this.dTripKM_1).toString(),
          expectedReportingDays: (this.ExpReportingDays).toString(),
          advPayable_1: (this.advancePay).toString(),
        });
        this.checkTripkMsNext();
        this.getDslToBe1();
        this.getDslToBe();
        this.getAdBlueToBe1();
        this.getAdBlueToBe();
      // this.getIncentiveRate();
        this.getMultiIncentiveRate();


      });
    }
    else if (this.ivFromPlace != "" && this.destinationid2 != "" && this.destinationid3 == "") {
      this.kmsDetails.fromLocation = this.ivFromPlace;
      this.kmsDetails.toLocation = this.destinationid2;
      this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms ? this.tripkmsDetails.kms : '';
        this.advancePay = this.tripkmsDetails.enrouteExpTruck ? this.tripkmsDetails.enrouteExpTruck : '';
        this.dTripKM_1 = this.tripkmsDetails.kms ? parseInt(this.tripkmsDetails.kms) : 0;
        this.ExpReportingDays = this.dTripKM_1 / 400;
       // this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1
       this.ExpReportingDays = Math.round(this.ExpReportingDays) 
        let date: Date = new Date(selectedDataValue.newTripDate);


        date.setDate(date.getDate() + this.ExpReportingDays)
        let date2 = (date).toISOString()
        ////date2 =this.commonService.formatDate(date2)
        ////const myFormattedDate = this.commonService.formatDate(date2);

        this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          expectedReportingDt: date2.split("T")[0],
          distanceTripKM_1: (this.dTripKM_1).toString(),
          expectedReportingDays: (this.ExpReportingDays).toString(),
          advPayable_1: (this.advancePay).toString(),
        });

        this.getDslToBe1();
        this.getDslToBe();
        this.getAdBlueToBe1();
        this.getAdBlueToBe();
        // this.getIncentiveRate();
        this.getMultiIncentiveRate();


      });

    }
    else if (this.ivFromPlace != "" && this.destinationid3 != "") {
      this.kmsDetails.fromLocation = this.ivFromPlace;
      this.kmsDetails.toLocation = this.destinationid3;
      this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms ? this.tripkmsDetails.kms : '';
        this.advancePay = this.tripkmsDetails.enrouteExpTruck ? this.tripkmsDetails.enrouteExpTruck : '';
        this.dTripKM_1 = this.tripkmsDetails.kms ? parseInt(this.tripkmsDetails.kms) : 0;
        this.ExpReportingDays = this.dTripKM_1 / 400;
      //  this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1
      this.ExpReportingDays = Math.round(this.ExpReportingDays) 
        let date: Date = new Date(selectedDataValue.newTripDate);


        date.setDate(date.getDate() + this.ExpReportingDays)
        let date2 = (date).toISOString()
        ////date2 =this.commonService.formatDate(date2)
        ////const myFormattedDate = this.commonService.formatDate(date2);

        this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          expectedReportingDt: date2.split("T")[0],
          distanceTripKM_1: (this.dTripKM_1).toString(),
          expectedReportingDays: (this.ExpReportingDays).toString(),
          advPayable_1: (this.advancePay).toString(),
        });

        this.getDslToBe1();
        this.getDslToBe();
        this.getAdBlueToBe1();
        this.getAdBlueToBe();
        // this.getIncentiveRate();
        this.getMultiIncentiveRate();


      });

    }
    else {
      this.formTripsheet.patchValue({
        //   kms: ''
      });
    }
  }
  GetOpeningBal() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    this.OpbalDetails.tripdate = selectedDataValue.newTripDate;
    this.OpbalDetails.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
  //  this.OpbalDetails.driverMasterID = selectedDataValue.driverMasterID.dataId;
  this.OpbalDetails.driverMasterID = this.driverid?this.driverid:'0' ;
    // this.OpbalDetails.driverMasterID = this.formTripsheet.value.driverMasterID.dataId;
    // this.OpbalDetails.driverMasterID='1';
    this.OpbalDetails.yearid = this.year;
    this.OpbalDetails.tripNo = selectedDataValue.tripNo;
    this.commonService.getOpeningBal(this.OpbalDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      // if (this.responseDetails.status) {
      if (this.responseDetails.message != undefined || this.responseDetails.message != '') {
        this.formTripsheet.patchValue({
          opBalDriver: this.responseDetails.message? this.responseDetails.message:'0'
        });
        //  }
        //else
      } else {
        this.formTripsheet.patchValue({
          opBalDriver: '0'
        });
      }
    });




  }
  
  checkTripkMsSecond() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (this.ivToPlace != "" && this.ivNewFromPlace != "") {
      this.kmsDetails.fromLocation = this.ivToPlace;
      this.kmsDetails.toLocation = this.ivNewFromPlace;
      this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        //  // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms;
        this.dTripKM_1 = parseInt(this.tripkmsDetails.kms);
        this.advancePay2 = this.tripkmsDetails.enrouteExpTruck;
        this.ExpReportingDays
          = this.dTripKM_1 / 400
      //  this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1
      this.ExpReportingDays = Math.round(this.ExpReportingDays) 
        let date: Date = new Date(selectedDataValue.newTripDate);


        date.setDate(date.getDate() + this.ExpReportingDays)
        let date2 = (date).toISOString()
        ////date2 =this.commonService.formatDate(date2)
        ////const myFormattedDate = this.commonService.formatDate(date2);

        this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          nextExpectedReportingDt: date2.split("T")[0],
          distanceTripKM_2: this.dTripKM_1,
          nextExpectedReportingDays: (this.ExpReportingDays).toString(),
          advPayable_2: this.advancePay2
        });

      });
    }
    else {
      this.formTripsheet.patchValue({
        //   kms: ''
      });
    }
  }
  checkTripkMsNext() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (this.ivToPlace != "" && this.ivNewFromPlace != "" && this.destinationid2== "" &&  this.destinationid3 == "") {
      this.kmsDetails.fromLocation = this.ivToPlace;
      this.kmsDetails.toLocation = this.ivNewFromPlace;
      this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        //  // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms?  this.tripkmsDetails.kms:'';
        this.dTripKM_1 = this.tripkmsDetails.kms? parseInt(this.tripkmsDetails.kms) : 0;
        this.advancePay2 = this.tripkmsDetails.enrouteExpTruck ? this.tripkmsDetails.enrouteExpTruck : '0';
        this.ExpReportingDays
          = this.dTripKM_1 / 400
       // this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1;
       this.ExpReportingDays = Math.round(this.ExpReportingDays) 

        var date: Date = new Date();
        var date2 = "";

        if (selectedDataValue.newTripDate != undefined && selectedDataValue.newTripDate != "") {
          let date: Date = new Date(selectedDataValue.deliveryDate);
          date.setDate(date.getDate() + this.ExpReportingDays)
          date2 = (date).toISOString();
        }
        // if (selectedDataValue.deliveryDate != undefined && selectedDataValue.deliveryDate != "") {
        // let date3: Date = new Date(selectedDataValue.deliveryDate);
        //   date.setDate(date3.getDate() + this.ExpReportingDays)
        //  }


        // date.setDate(date.getDate() + this.ExpReportingDays+ date3.getDate())

        ////date2 =this.commonService.formatDate(date2)



        this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          nextExpectedReportingDt: date2.split("T")[0],
          distanceTripKM_2: (this.dTripKM_1).toString(),
          nextExpectedReportingDays: (this.ExpReportingDays).toString(),
          advPayable_2: (this.advancePay2).toString(),
        });
   
this.nexttripkms = (this.dTripKM_1).toString(),
       // this.totalCal();
        this.getBhattaRate();
        this.getDslToBe();
        this.getPenaltyRate();
   

          this.totalCalculation();
      
      
      
        this. checkDaysNew();

      });
    }
    else if (this.ivToPlace != "" && this.ivNewFromPlace != "" && this.destinationid2 !== "" ) {
      this.kmsDetails.fromLocation = this.destinationid2;
      this.kmsDetails.toLocation = this.ivNewFromPlace;
      this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        //  // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms?  this.tripkmsDetails.kms:'';
        this.dTripKM_1 = this.tripkmsDetails.kms? parseInt(this.tripkmsDetails.kms) : 0;
        this.advancePay2 = this.tripkmsDetails.enrouteExpTruck;
        this.ExpReportingDays
          = this.dTripKM_1 / 400
      //  this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1;
      this.ExpReportingDays = Math.round(this.ExpReportingDays) 

        var date: Date = new Date();
        var date2 = "";

        if (selectedDataValue.newTripDate != undefined && selectedDataValue.newTripDate != "") {
          let date: Date = new Date(selectedDataValue.deliveryDate);
          date.setDate(date.getDate() + this.ExpReportingDays)
          date2 = (date).toISOString();
        }
        // if (selectedDataValue.deliveryDate != undefined && selectedDataValue.deliveryDate != "") {
        // let date3: Date = new Date(selectedDataValue.deliveryDate);
        //   date.setDate(date3.getDate() + this.ExpReportingDays)
        //  }


        // date.setDate(date.getDate() + this.ExpReportingDays+ date3.getDate())

        ////date2 =this.commonService.formatDate(date2)
        ////const myFormattedDate = this.commonService.formatDate(date2);

        this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          nextExpectedReportingDt: date2.split("T")[0],
          distanceTripKM_2: (this.dTripKM_1).toString(),
          nextExpectedReportingDays: (this.ExpReportingDays).toString(),
          advPayable_2: (this.advancePay2).toString(),
        });

       // this.totalCal();
       this.getBhattaRate();
       this.getDslToBe();
       this.totalCalculation();
       this. checkDaysNew();

      });
    }
    else if (this.ivToPlace != "" && this.ivNewFromPlace != "" && this.destinationid2 !== "" && this.destinationid3 !== "" ) {
      this.kmsDetails.fromLocation = this.destinationid3;
      this.kmsDetails.toLocation = this.ivNewFromPlace;
      this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        //  // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms?  this.tripkmsDetails.kms:'';
        this.dTripKM_1 = this.tripkmsDetails.kms? parseInt(this.tripkmsDetails.kms) : 0;
        this.advancePay2 = this.tripkmsDetails.enrouteExpTruck;
        this.ExpReportingDays
          = this.dTripKM_1 / 400
       // this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1;
        this.ExpReportingDays = Math.round(this.ExpReportingDays) 

        var date: Date = new Date();
        var date2 = "";

        if (selectedDataValue.newTripDate != undefined && selectedDataValue.newTripDate != "") {
          let date: Date = new Date(selectedDataValue.deliveryDate);
          date.setDate(date.getDate() + this.ExpReportingDays)
          date2 = (date).toISOString();
        }
        // if (selectedDataValue.deliveryDate != undefined && selectedDataValue.deliveryDate != "") {
        // let date3: Date = new Date(selectedDataValue.deliveryDate);
        //   date.setDate(date3.getDate() + this.ExpReportingDays)
        //  }


        // date.setDate(date.getDate() + this.ExpReportingDays+ date3.getDate())

        ////date2 =this.commonService.formatDate(date2)
        ////const myFormattedDate = this.commonService.formatDate(date2);

        this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          nextExpectedReportingDt: date2.split("T")[0],
          distanceTripKM_2: (this.dTripKM_1).toString(),
          nextExpectedReportingDays: (this.ExpReportingDays).toString(),
          advPayable_2: (this.advancePay2).toString(),
        });

       // this.totalCal();
       this.getBhattaRate();
       this.getDslToBe();
       this.totalCalculation();
       this. checkDaysNew();

      });
    }
    else {
      this.formTripsheet.patchValue({
        //   kms: ''
      });
    }
    
  }
  checkDeliveryDate() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    const d1 = Date.parse(selectedDataValue.deliveryDate);
    const d2 = Date.parse(selectedDataValue.reportingDt_1);
    if (d1 > d2) {
      this.formTripsheet.patchValue({
        reportingDt_2: ''
      });
      this.toastrService.warning(" delivery Date should be same or greater than Actual Reported Date ");
      return
    }

  }
  commonDetailUpdate(){
    this.checkDays();
    this.checkTripkMs();
    this.checkTripkMsNext();

    this.checkDaysNew();

  }
  checkDays() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    const d1 = Date.parse(selectedDataValue.newTripDate);
    const d2 = Date.parse(selectedDataValue.reportingDt_1);
    if (d1 > d2) {
      this.formTripsheet.patchValue({
        reportingDt_1: ''
      });
      this.toastrService.warning("Actual Reported Date should be same or greater than New Trip Date");
      return
    }

    //  let date = selectedDataValue.expectedReportingDt;
    // date.setDate(date.getDate() )
    //this.date1 = (date).toISOString();
    // this.date1 = this.date1.split("T")[0];
    // let currentDate = new Date();
    let dt3 = this.commonService.formatDate(selectedDataValue.expectedReportingDt)
    // let dt2 = this.commonService.formatDate(selectedDataValue.reportingDt_2)
    let dt1 = this.commonService.formatDate(selectedDataValue.reportingDt_1)
    let dt2 = this.commonService.formatDate(selectedDataValue.newTripDate)
    //calculation
    var date1 = new Date(dt1);
    var date2 = new Date(dt2);
    var date3 = new Date(dt3);

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var difftime = date3.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    var DiffDays = difftime / (1000 * 3600 * 24);
    Difference_In_Days = Math.abs(Difference_In_Days)
    if(!Number.isNaN(Difference_In_Days)){
    this.formTripsheet.patchValue({
      actualDays_1: (Difference_In_Days).toString()

    });}
    else{
    this.formTripsheet.patchValue({
      actualDays_1: ''

    });
    
  }
    if (DiffDays > 0  ) {
      this.day1 = (DiffDays).toString();
      this.formTripsheet.patchValue({
        advanceDays_1: this.day1,
        delayedDays_1: '',
        actualDays_1: (Difference_In_Days).toString()

      });
    } else {
      //do something with negative values 
      DiffDays = Math.abs(DiffDays)
      this.day2 = (DiffDays).toString();
      if(!Number.isNaN(this.day2)){
      this.formTripsheet.patchValue({
        delayedDays_1: this.day2,
        advanceDays_1: '',
        // actualDays_2:  Difference_In_Days

      });}
      else {
        this.formTripsheet.patchValue({
          delayedDays_1: '',
          advanceDays_1: '',

      });


    


    }}
    this.getBhattaRate();
    this.getDslToBe();
    this.totalCalculation();
    this. checkDaysNew();
    this.getPenaltyRate();
   // this.commonDetailUpdate();


  }
  checkDaysNew() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    const d1 = Date.parse(selectedDataValue.deliveryDate);
    const d2 = Date.parse(selectedDataValue.reportingDt_2);
    if (d1 > d2) {
      this.formTripsheet.patchValue({
        reportingDt_2: ''
      });
      this.toastrService.warning("Actual Reported Date 2 should be same or greater than delivery Date");
      return
    }

    //  let date = selectedDataValue.expectedReportingDt;
    // date.setDate(date.getDate() )
    //this.date1 = (date).toISOString();
    // this.date1 = this.date1.split("T")[0];
    // let currentDate = new Date();
    let dt3 = this.commonService.formatDate(selectedDataValue.nextExpectedReportingDt)
    // let dt2 = this.commonService.formatDate(selectedDataValue.reportingDt_2)
    let dt1 = this.commonService.formatDate(selectedDataValue.reportingDt_2)
    // let dt2 = this.commonService.formatDate(selectedDataValue.newTripDate)
    let dt2 = this.commonService.formatDate(selectedDataValue.deliveryDate)
    //calculation
    var date1 = new Date(dt1);
    var date2 = new Date(dt2);
    var date3 = new Date(dt3);

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var difftime = date3.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    var DiffDays = difftime / (1000 * 3600 * 24);
    Difference_In_Days = Math.abs(Difference_In_Days)
    this.formTripsheet.patchValue({
      actualDays_2: (Difference_In_Days).toString()

    });
    if (DiffDays > 0) {
      this.day1 = (DiffDays).toString();
      this.formTripsheet.patchValue({
        advanceDays_2: this.day1,
        delayedDays_2: '',
        actualDays_2:(Difference_In_Days).toString()


      });
    } else {
      //do something with negative values 
      DiffDays = Math.abs(DiffDays)
      this.day2 = (DiffDays).toString();
      this.formTripsheet.patchValue({
        delayedDays_2: this.day2,
        advanceDays_2: '',
        actualDays_2: (Difference_In_Days).toString()


      });

    }


    if (dt1 == dt2) {
      this.formTripsheet.patchValue({
        //  actualDays_2: selectedDataValue.expectedReportingDays

      });
    }
    else {
      this.formTripsheet.patchValue({
        //   kms: ''
        //  actualDays_2: Difference_In_Days
      });
      this.getBhattaRate();
      //this.commonDetailUpdate();
      this.checkDaysNew();
    }




  }

  totalCal() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    
   let dsl= parseFloat(this.ltsdsl).toFixed(2);

    this.totalAdblue = parseFloat(selectedDataValue.ltsAdblueToBe_2) + parseFloat(selectedDataValue.ltsAdblueToBe_1);
    this.totaldsl = parseFloat(selectedDataValue.ltsDslToBe_2) + parseFloat(selectedDataValue.ltsDslToBe_1);
 // this.totaldsl = this.dsl2 + parseFloat(selectedDataValue.ltsDslToBe_1);
    this.totalpayable = parseFloat(selectedDataValue.advPayable_2) + parseFloat(selectedDataValue.advPayable_1);
    if (this.totalAdblue !== undefined && this.totaldsl !== undefined && this.totalpayable !== undefined) {
      this.formTripsheet.patchValue({
        totaldsl: (this.totaldsl).toString(),
        totalAdblue: (this.totalAdblue).toString(),
        totalpayable: (this.totalpayable).toString(),

      });

    }
    else {
      this.formTripsheet.patchValue({
        totaldsl: '0',
        totalAdblue: '0',
        totalpayable: '0',

      });
    }

  }
  totalCal2(e:any) {
    var selectedDataValue = this.formTripsheet.getRawValue();
    
   let dsl= e

    this.totalAdblue = parseFloat(selectedDataValue.ltsAdblueToBe_2) + parseFloat(selectedDataValue.ltsAdblueToBe_1);
   // this.totaldsl = parseFloat(selectedDataValue.ltsDslToBe_2) + parseFloat(selectedDataValue.ltsDslToBe_1);
  this.totaldsl = + parseFloat(dsl) + parseFloat(selectedDataValue.ltsDslToBe_1);
    this.totalpayable = parseFloat(selectedDataValue.advPayable_2) + parseFloat(selectedDataValue.advPayable_1);
    this.totalCalculation2( this.totaldsl)
    if (this.totalAdblue !== undefined && this.totaldsl !== undefined && this.totalpayable !== undefined) {
      this.formTripsheet.patchValue({
        totaldsl: (this.totaldsl).toString(),
        totalAdblue: (this.totalAdblue).toString(),
        totalpayable: (this.totalpayable).toString(),

      });

    }
    else {
      this.formTripsheet.patchValue({
        totaldsl: '0',
        totalAdblue: '0',
        totalpayable: '0',

      });
    }

  }
  totalCalculation(){
    var selectedDataValue = this.formTripsheet.getRawValue();
    var clBalDsl = 0;
    var clBalAdblue = 0;
    var netTripBalance = 0;
    var tripBalance = 0;
    var totalDriverAc = 0;
    let opbal = selectedDataValue.opBalDsl?parseFloat(selectedDataValue.opBalDsl):0
    let issuedDslLtrs = selectedDataValue.issuedDslLtrs?parseFloat(selectedDataValue.issuedDslLtrs):0 
    let totaldsl= selectedDataValue.totaldsl?parseFloat(selectedDataValue.totaldsl ):0
    let cashDslLtrs = selectedDataValue.cashDslLtrs?parseFloat(selectedDataValue.cashDslLtrs ):0

    clBalDsl = opbal +  issuedDslLtrs + cashDslLtrs -  totaldsl
   //clBalDsl = selectedDataValue.opBalDsl?parseFloat(selectedDataValue.opBalDsl):0 + parseFloat(selectedDataValue.issuedDslLtrs) - parseFloat(selectedDataValue.totaldsl )
   totalDriverAc = selectedDataValue.repairsByDriver?parseFloat(selectedDataValue.repairsByDriver):0+selectedDataValue.parkingByDriver?parseFloat(selectedDataValue.parkingByDriver):0+selectedDataValue.accidentByDriver?parseFloat(selectedDataValue.accidentByDriver):0-selectedDataValue.weighmentByDriver?parseFloat(selectedDataValue.weighmentByDriver):0+selectedDataValue.challanByDriver?parseFloat(selectedDataValue.challanByDriver):0+ selectedDataValue.otherExpByDriver?parseFloat(selectedDataValue.otherExpByDriver):0+selectedDataValue.allowedBhatta?parseFloat(selectedDataValue.allowedBhatta):0+selectedDataValue.onTimeIncentiveAmt?parseFloat(selectedDataValue.onTimeIncentiveAmt):0+selectedDataValue.multiDelIncentiveAmt?parseFloat(selectedDataValue.multiDelIncentiveAmt):0-selectedDataValue.penaltyChargedToDr?parseFloat(selectedDataValue.penaltyChargedToDr):0
    clBalAdblue = selectedDataValue.opBalAdblue?parseFloat(selectedDataValue.opBalAdblue):0+ selectedDataValue.issuedAdblueLtrs?parseFloat(selectedDataValue.issuedAdblueLtrs):0- selectedDataValue.totalAdblue ?parseFloat(selectedDataValue.totalAdblue ):0
   // netTripBalance = selectedDataValue.opBalDriver?parseFloat(selectedDataValue.opBalDriver) :0+ selectedDataValue.paidDriverAdvance?parseFloat(selectedDataValue.paidDriverAdvance):0 - selectedDataValue.totalpayable?parseFloat(selectedDataValue.totalpayable):0-selectedDataValue.repairsByDriver?parseFloat(selectedDataValue.repairsByDriver):0-selectedDataValue.repairsByDriver?parseFloat(selectedDataValue.repairsByDriver):0-selectedDataValue.parkingByDriver?parseFloat(selectedDataValue.parkingByDriver):0- selectedDataValue.accidentByDriver?parseFloat(selectedDataValue.accidentByDriver):0-selectedDataValue.accidentByDriver?parseFloat(selectedDataValue.accidentByDriver):0-selectedDataValue.weighmentByDriver?parseFloat(selectedDataValue.weighmentByDriver):0-selectedDataValue.challanByDriver?parseFloat(selectedDataValue.challanByDriver):0-selectedDataValue.challanByDriver?parseFloat(selectedDataValue.challanByDriver):0- selectedDataValue.otherExpByDriver?parseFloat(selectedDataValue.otherExpByDriver):0- selectedDataValue.allowedBhatta?parseFloat(selectedDataValue.allowedBhatta):0-selectedDataValue.onTimeIncentiveAmt?parseFloat(selectedDataValue.onTimeIncentiveAmt):0-selectedDataValue.penaltyChargedToDr?parseFloat(selectedDataValue.penaltyChargedToDr):0-selectedDataValue.poolAcAmt?parseFloat(selectedDataValue.poolAcAmt):0
    tripBalance = selectedDataValue.opBalDriver?parseFloat(selectedDataValue.opBalDriver) :0+ selectedDataValue.totalDriverAc?parseFloat(selectedDataValue.totalDriverAc):0 + selectedDataValue.paidDriverAdvance?parseFloat(selectedDataValue.paidDriverAdvance):0
    netTripBalance =selectedDataValue.tripBalance?parseFloat(selectedDataValue.tripBalance) :0- selectedDataValue.recdFromDriver?parseFloat(selectedDataValue.recdFromDriver) :0
    if (clBalDsl!== undefined && clBalAdblue !== undefined && netTripBalance !== undefined) {
      this.formTripsheet.patchValue({
        clBalDsl: (clBalDsl).toString(),
        clBalAdBlue: (clBalAdblue).toString(),
        netTripBalance: (netTripBalance).toString(),
        totalDriverAc: (totalDriverAc).toString(),
        tripBalance: (tripBalance).toString(),

      });

    }
    else {
      this.formTripsheet.patchValue({
        clBalDsl: '0',
        clBalAdBlue: '0',
        netTripBalance: '0',

      });
    }


  }
  totalCalculation2(e:any){
    var selectedDataValue = this.formTripsheet.getRawValue();
    var clBalDsl = 0;
    var clBalAdblue = 0;
    var netTripBalance = 0;
    let opbal = selectedDataValue.opBalDsl?parseFloat(selectedDataValue.opBalDsl):0
    let issuedDslLtrs = selectedDataValue.issuedDslLtrs?parseFloat(selectedDataValue.issuedDslLtrs):0 
    let totaldsl= e?parseFloat(e ):0

    clBalDsl = opbal +  issuedDslLtrs -  totaldsl
   //clBalDsl = selectedDataValue.opBalDsl?parseFloat(selectedDataValue.opBalDsl):0 + parseFloat(selectedDataValue.issuedDslLtrs) - parseFloat(selectedDataValue.totaldsl )
    clBalAdblue = selectedDataValue.opBalAdblue?parseFloat(selectedDataValue.opBalAdblue):0+ selectedDataValue.issuedAdblueLtrs?parseFloat(selectedDataValue.issuedAdblueLtrs):0- selectedDataValue.totalAdblue ?parseFloat(selectedDataValue.totalAdblue ):0
    netTripBalance = selectedDataValue.opBalDriver?parseFloat(selectedDataValue.opBalDriver) :0+ selectedDataValue.paidDriverAdvance?parseFloat(selectedDataValue.paidDriverAdvance):0 - selectedDataValue.totalpayable?parseFloat(selectedDataValue.totalpayable):0-selectedDataValue.repairsByDriver?parseFloat(selectedDataValue.repairsByDriver):0-selectedDataValue.repairsByDriver?parseFloat(selectedDataValue.repairsByDriver):0-selectedDataValue.parkingByDriver?parseFloat(selectedDataValue.parkingByDriver):0- selectedDataValue.accidentByDriver?parseFloat(selectedDataValue.accidentByDriver):0-selectedDataValue.accidentByDriver?parseFloat(selectedDataValue.accidentByDriver):0-selectedDataValue.weighmentByDriver?parseFloat(selectedDataValue.weighmentByDriver):0-selectedDataValue.challanByDriver?parseFloat(selectedDataValue.challanByDriver):0-selectedDataValue.challanByDriver?parseFloat(selectedDataValue.challanByDriver):0- selectedDataValue.otherExpByDriver?parseFloat(selectedDataValue.otherExpByDriver):0- selectedDataValue.allowedBhatta?parseFloat(selectedDataValue.allowedBhatta):0-selectedDataValue.onTimeIncentiveAmt?parseFloat(selectedDataValue.onTimeIncentiveAmt):0-selectedDataValue.penaltyChargedToDr?parseFloat(selectedDataValue.penaltyChargedToDr):0-selectedDataValue.poolAcAmt?parseFloat(selectedDataValue.poolAcAmt):0
    if (clBalDsl!== undefined && clBalAdblue !== undefined && netTripBalance !== undefined) {
      this.formTripsheet.patchValue({
        clBalDsl: (clBalDsl).toString(),
        clBalAdBlue: (clBalAdblue).toString(),
        netTripBalance: (netTripBalance).toString(),

      });

    }
    else {
      this.formTripsheet.patchValue({
        clBalDsl: '0',
        clBalAdBlue: '0',
        netTripBalance: '0',

      });
    }


  }
  checkDays2() {
    // this.checkDeliveryDate();
    var selectedDataValue = this.formTripsheet.getRawValue();
    const d3 = Date.parse(selectedDataValue.deliveryDate);
    const d4 = Date.parse(selectedDataValue.reportingDt_1);
    if (d3 < d4) {
      this.formTripsheet.patchValue({
        deliveryDate: ''
      });
      this.toastrService.warning(" delivery Date should be same or greater than Actual Reported Date ");
      return
    }
    var selectedDataValue = this.formTripsheet.getRawValue();
    //  let date = selectedDataValue.expectedReportingDt;
    // date.setDate(date.getDate() )
    //this.date1 = (date).toISOString();
    // this.date1 = this.date1.split("T")[0];
    // let currentDate = new Date();
    //  let dt3= this.commonService.formatDate(selectedDataValue.expectedReportingDt)
    // let dt2 = this.commonService.formatDate(selectedDataValue.reportingDt_2)
    let dt1 = this.commonService.formatDate(selectedDataValue.reportingDt_1)
    let dt2 = this.commonService.formatDate(selectedDataValue.deliveryDate)
    //calculation
    var date1 = new Date(dt1);
    var date2 = new Date(dt2);
    //  var date3 = new Date(dt3);

    // To calculate the time difference of two dates
    var Difference_In_Time = date1.getTime() - date2.getTime();
    //  var difftime = date3.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    // var DiffDays = difftime / (1000 * 3600 * 24);
    Difference_In_Days = Math.abs(Difference_In_Days)
    this.formTripsheet.patchValue({
      // actualDays_2: Difference_In_Days

    });
    if (Difference_In_Days >= 0) {
      this.day1 = (Difference_In_Days).toString();
      this.formTripsheet.patchValue({
        detentionDays: this.day1,


      });
      // this.getIncentiveRate();
      this.getBhattaRate();
      this.checkTripkMsNext();
     //this.commonDetailUpdate();

    }


  }
  checkDaysNext() {
    // this.checkDeliveryDate();
    var selectedDataValue = this.formTripsheet.getRawValue();
    const d3 = Date.parse(selectedDataValue.deliveryDate);
    const d4 = Date.parse(selectedDataValue.reportingDt_1);
    if (d3 < d4) {
      this.formTripsheet.patchValue({
        deliveryDate: ''
      });
      this.toastrService.warning(" delivery Date should be same or greater than Actual Reported Date ");
      return
    }
    var selectedDataValue = this.formTripsheet.getRawValue();
    //  let date = selectedDataValue.expectedReportingDt;
    // date.setDate(date.getDate() )
    //this.date1 = (date).toISOString();
    // this.date1 = this.date1.split("T")[0];
    // let currentDate = new Date();
    //  let dt3= this.commonService.formatDate(selectedDataValue.expectedReportingDt)
    // let dt2 = this.commonService.formatDate(selectedDataValue.reportingDt_2)
    let dt5 = this.commonService.formatDate(selectedDataValue.reportingDt_1)
    let dt6 = this.commonService.formatDate(selectedDataValue.deliveryDate)
    //calculation
    var date1 = new Date(dt5);
    var date2 = new Date(dt6);
    //  var date3 = new Date(dt3);

    // To calculate the time difference of two dates
    var Difference_In_Time2 = date1.getTime() - date2.getTime();
    //  var difftime = date3.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days3 = Difference_In_Time2 / (1000 * 3600 * 24);
    // var DiffDays = difftime / (1000 * 3600 * 24);
    Difference_In_Days3 = Math.abs(Difference_In_Days3)
    this.formTripsheet.patchValue({
      actualDays_1: (Difference_In_Days3).toString()

    });
    if (Difference_In_Days3 > 0) {
      let dy1 = (Difference_In_Days3).toString();
      this.formTripsheet.patchValue({
        detentionDays: dy1,


      });
      // this.getBhattaRate();

    }


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
    //this.checkMs();
    this.checkTripkMs();
    
  
    this.getDslToBe1();
    this.getAdBlueToBe1();
    this.getBhattaRate();
    this.checkTripkMsNext();
    //this.commonDetailUpdate();
  }
  changeFromPlace2(e: any) {
    this.ivNewFromPlace = e.dataId;
    //this.checkMs();
    // this.checkTripkMsSecond();
    this.checkTripkMsNext();
    this.getAdBlueToBe();
    this.getDslToBe();
    this.getBhattaRate();
    this.checkTripkMs();
   // this.commonDetailUpdate();
    // this.totalCal();
  }
  getAdBlueToBe() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (this.ivNewFromPlace != "" && this.ivToPlace != "") {
      this.adBlueDetails.transDate = selectedDataValue.newTripDate;
      this.adBlueDetails.tripKms = (selectedDataValue.distanceTripKM_2).toString();

      this.adBlueDetails.vehicleMasterId = selectedDataValue.vehicleMasterID.dataId;
      this.commonService.getAdBlueToBe(this.adBlueDetails).subscribe((res: Responsemodel) => {
        this.adblue = res.message;
        // if (this.tripkmsDetails.status) {



        //date2 =this.commonService.formatDate(date2)
        //const myFormattedDate = this.commonService.formatDate(date2);
        let adb = parseFloat(this.adblue).toFixed(2);
        if (this.adblue != undefined) {
          this.formTripsheet.patchValue({
            // cneeGst:  (this.ExpectedReportingDays).toString() 
         //  ltsAdblueToBe_2: parseFloat(this.adblue).toFixed(2).toString()
           ltsAdblueToBe_2: (adb).toString()
       //  ltsAdblueToBe_2: "0"


          });
        } else {
          this.formTripsheet.patchValue({
            // cneeGst:  (this.ExpectedReportingDays).toString() 
            ltsAdblueToBe_2: "0"


          });

        }

      });
    }
    else {

      this.formTripsheet.patchValue({
        ltsAdblueToBe_2: ''
      });
    }
  }
  getAdBlueToBe1() {

    var selectedDataValue = this.formTripsheet.getRawValue();
    if (this.ivFromPlace != "" && this.ivToPlace != "") {
      this.adBlueDetails.transDate = selectedDataValue.newTripDate;
      this.adBlueDetails.tripKms = (selectedDataValue.distanceTripKM_1).toString();

      this.adBlueDetails.vehicleMasterId = selectedDataValue.vehicleMasterID.dataId;
      this.commonService.getAdBlueToBe(this.adBlueDetails).subscribe((res: Responsemodel) => {
        this.adblue1 = res.message;
        // if (this.tripkmsDetails.status) {



        //date2 =this.commonService.formatDate(date2)
        //const myFormattedDate = this.commonService.formatDate(date2);
        if (this.adblue1 != undefined) {
          this.formTripsheet.patchValue({
            // cneeGst:  (this.ExpectedReportingDays).toString() 
            ltsAdblueToBe_1: parseFloat(this.adblue1).toFixed(2).toString()


          });
        } else {
          this.formTripsheet.patchValue({
            // cneeGst:  (this.ExpectedReportingDays).toString() 
            ltsAdblueToBe_1: '0'


          });

        }

      });
    }
    else {

      this.formTripsheet.patchValue({
        ltsAdblueToBe_2: ''
      });
    }
  }
  getDslToBe() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (this.ivNewFromPlace != "" && this.ivToPlace != "") {
      this.dslDetails.transDate = selectedDataValue.newTripDate;
   //  this.dslDetails.tripKms = (selectedDataValue.distanceTripKM_2).toString(); this.dTripKM_1 
     this.dslDetails.tripKms = this.nexttripkms 
      this.dslDetails.loadType = "L";
      this.dslDetails.vehicleMasterId = selectedDataValue.vehicleMasterID.dataId;
      this.commonService.getDslToBe(this.dslDetails).subscribe((res: Responsemodel) => {
        this.ltsdsl = res.message;
        let ld= parseFloat(this.ltsdsl).toFixed(2);
        this.dsl2 = parseFloat(ld);
        this.totalCal2( ld );

        // if (this.tripkmsDetails.status) {
        if (this.ltsdsl != undefined ) {
          this.formTripsheet.patchValue({
            // cneeGst:  (this.ExpectedReportingDays).toString() 
         //   ltsDslToBe_2: parseFloat(this.ltsdsl).toFixed(2).toString()
         ltsDslToBe_2: (ld).toString()
        // totaldsl = ld + parseFloat(selectedDataValue.ltsDslToBe_1)
          });

        }
        else  {
          this.formTripsheet.patchValue({
            // cneeGst:  (this.ExpectedReportingDays).toString() 
            ltsDslToBe_2: 0
          });

        }
        //date2 =this.commonService.formatDate(date2)
        //const myFormattedDate = this.commonService.formatDate(date2);



      });
    }
    else {
      this.formTripsheet.patchValue({
        ltsDslToBe_2: '0'
      });
    }
    
    
  }
  getIncentiveRate(e: any) {

    console.log(e.target.value);
    var selectedValue = e.target.value;
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (selectedValue == "OK") {
      this.incentiveDetails.transDate = selectedDataValue.newTripDate;
      this.incentiveDetails.tripKms = (selectedDataValue.distanceTripKM_1).toString();

      this.commonService.getIncentiveRate(this.incentiveDetails).subscribe((res: Responsemodel) => {
        this.incentiveRate = res.message;
        let ir = 0;
        let rptdt = this.commonService.formatDate(selectedDataValue.reportingDt_1)
    let expdt = this.commonService.formatDate(selectedDataValue.expectedReportingDt)
        if(rptdt == expdt &&  this.incentiveRate!=''){
        //ir = parseInt(this.incentiveRate) * selectedDataValue.advanceDays_1;
        ir = parseInt(this.incentiveRate)
      }
     // ir = parseInt(this.incentiveRate)
        // if (this.tripkmsDetails.status) {
        // if (this.ltsdsl != undefined) {
        this.formTripsheet.patchValue({
          // cneeGst:  (this.ExpectedReportingDays).toString() 
          // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
          onTimeIncentiveAmt: ir
        });
        // this.getMultiIncentiveRate();
        // }
        //  else {
        //   this.formTripsheet.patchValue({
        // // cneeGst:  (this.ExpectedReportingDays).toString() 
        //   ltsDslToBe_2: 0
        //   });

        //  }
        //date2 =this.commonService.formatDate(date2)
        //const myFormattedDate = this.commonService.formatDate(date2);



      });
    } else {
      this.formTripsheet.patchValue({
        // cneeGst:  (this.ExpectedReportingDays).toString() 
        // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
        onTimeIncentiveAmt: ""
      });

    }
    this.totalCalculation();

  }
  getPenaltyRate() {

   // console.log(e.target.value);
   // var selectedValue = e.target.value;
    var selectedDataValue = this.formTripsheet.getRawValue();
   // if (selectedValue == "OK") {
      this.penaltyDetails.transDate = selectedDataValue.newTripDate;
    //  this.penaltyDetails.tripKms = (selectedDataValue.distanceTripKM_1).toString();

      this.commonService.getPenaltyRate(this.penaltyDetails).subscribe((res: Responsemodel) => {
        this.penaltyRate = res.message;
        let ir = 0;
        let rptdt = this.commonService.formatDate(selectedDataValue.reportingDt_1)
    let expdt = this.commonService.formatDate(selectedDataValue.expectedReportingDt)
        if( selectedDataValue.delayedDays_1!='0' &&  this.penaltyRate!=''){

        ir = parseInt(this.penaltyRate) * selectedDataValue.delayedDays_1;
        //ir = parseInt(this.penaltyRate)
      }
      else if(selectedDataValue.delayedDays_1='0'){
        ir = 0;
      }
     // ir = parseInt(this.incentiveRate)
        // if (this.tripkmsDetails.status) {
        // if (this.ltsdsl != undefined) {
        this.formTripsheet.patchValue({
          // cneeGst:  (this.ExpectedReportingDays).toString() 
          // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
          penaltyChargedToDr: (ir).toString()
        });
        // this.getMultiIncentiveRate();
        // }
        //  else {
        //   this.formTripsheet.patchValue({
        // // cneeGst:  (this.ExpectedReportingDays).toString() 
        //   ltsDslToBe_2: 0
        //   });

        //  }
        //date2 =this.commonService.formatDate(date2)
        //const myFormattedDate = this.commonService.formatDate(date2);



      });
    //} else {
     // this.formTripsheet.patchValue({
        // cneeGst:  (this.ExpectedReportingDays).toString() 
        // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
     //   onTimeIncentiveAmt: ""
  //    });

 //   }
    this.totalCalculation();

  }
  getBhattaRate() {
    var selectedDataValue = this.formTripsheet.getRawValue();

    this.bhattaDetails.transDate = selectedDataValue.newTripDate;


    this.commonService.getBhattaRate(this.bhattaDetails).subscribe((res: Responsemodel) => {
      this.bhattaRate = res.message;
      let br = 0;
      let bd = 0;
      let ad1= selectedDataValue.actualDays_1?parseInt(selectedDataValue.actualDays_1):0;
      let ad2= selectedDataValue.actualDays_2?parseInt(selectedDataValue.actualDays_2):0;
      let ad3= selectedDataValue.detentionDays?parseInt(selectedDataValue.detentionDays):0;


      // bd =   parseInt(selectedDataValue.actualDays_1)+  parseInt(selectedDataValue.actualDays_2);
      bd = ad1 + ad2 + ad3;
     //bd = ad1 + ad2
      br = parseInt(this.bhattaRate) * bd;
      this.formTripsheet.patchValue({

        allowedBhatta: (br).toString(),
        totalBhattaDays: (bd).toString()
      });

    });
  }
  getMultiIncentiveRate() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (selectedDataValue.destination2 != '') {
      this.formTripsheet.patchValue({
        multiDelIncentiveAmt: 1000
      });
    }
    else if (selectedDataValue.destination3 != '') {
      this.formTripsheet.patchValue({
        multiDelIncentiveAmt: 2000
      });


    }
    else {
      this.formTripsheet.patchValue({
        multiDelIncentiveAmt: 0
      });

    }



  }
  getDslToBe1() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (this.ivFromPlace != "" && this.ivToPlace != "") {
      this.dslDetails.transDate = selectedDataValue.newTripDate;
      this.dslDetails.tripKms = (selectedDataValue.distanceTripKM_1).toString();
      this.dslDetails.loadType = "L";
      this.dslDetails.vehicleMasterId = selectedDataValue.vehicleMasterID.dataId;
      this.commonService.getDslToBe(this.dslDetails).subscribe((res: Responsemodel) => {
        this.ltsdsl1 = res.message;
        // if (this.tripkmsDetails.status) {
        if (this.ltsdsl1 != undefined) {
          this.formTripsheet.patchValue({
            // cneeGst:  (this.ExpectedReportingDays).toString() 
            ltsDslToBe_1: parseFloat(this.ltsdsl1).toFixed(2).toString()
          });

        }
        else {
          this.formTripsheet.patchValue({
            // cneeGst:  (this.ExpectedReportingDays).toString() 
            ltsDslToBe_1: 0
          });

        }
        //date2 =this.commonService.formatDate(date2)
        //const myFormattedDate = this.commonService.formatDate(date2);



      });
    }
    else {
      this.formTripsheet.patchValue({
        ltsDslToBe_2: '0'
      });
    }
  }
  changeToPlace(e: any) {
    this.ivToPlace = e.dataId;
    // this.checkMs();
    this.checkTripkMs();
    this.getBhattaRate();
    this.checkDestinationControlStatus();
    this.checkTripkMsNext();
   // this.commonDetailUpdate();
  }
  changeDestination2(e: any) {
    this.destinationid2=e.dataId;
    this.formTripsheet.patchValue({
      destination2: e,
   
     // destinationid2:'1'
    });
    this.checkTripkMs();
    this.getBhattaRate();
   // this.checkTripkMsNext();
    this.checkDestinationControlStatus();
    this.commonDetailUpdate();
  }
  changeDestination3(e: any) {
    this.destinationid3=e.dataId;
    this.formTripsheet.patchValue({
      destination3: e
    });
    this.checkTripkMs();
   // this.checkTripkMsNext();
    this.checkDestinationControlStatus();
    this.commonDetailUpdate();
  }
  onClearedDestination(e: any) {
    this.formTripsheet.patchValue({
      destination: undefined,
      distanceTripKM_1:'0',
      distanceTripKM_2:'0'
    });
    this.checkDestinationControlStatus();
  }
  onClearedFromPlace(e: any) {
    this.formTripsheet.patchValue({
    distanceTripKM_1:'0'
  });
  }
  
  onClearedDestination2(e: any) {
    this.formTripsheet.patchValue({
      destination2: undefined,
      distanceTripKM_1:'0',
      distanceTripKM_2:'0'

    });
    this.checkDestinationControlStatus();
  }
  onClearedDestination3(e: any) {
    this.formTripsheet.patchValue({
      destination3: undefined,
      distanceTripKM_1:'0',
      distanceTripKM_2:'0'
    });
    this.checkDestinationControlStatus();
  }
  checkDestinationControlStatus() {
    this.formTripsheet.controls['destination'].enable();
    this.formTripsheet.controls['destination2'].disable();
    this.formTripsheet.controls['destination3'].disable();

    var selectedDataValue = this.formTripsheet.getRawValue();
    if (selectedDataValue.destination) {
      this.formTripsheet.controls['destination'].enable();
      this.formTripsheet.controls['destination2'].enable();
      this.formTripsheet.controls['destination3'].disable();
    }
    if (selectedDataValue.destination2) {
      this.formTripsheet.controls['destination'].disable();
      this.formTripsheet.controls['destination2'].enable();
      this.formTripsheet.controls['destination3'].enable();
    }
    if (selectedDataValue.destination3) {
      this.formTripsheet.controls['destination'].disable();
      this.formTripsheet.controls['destination2'].disable();
      this.formTripsheet.controls['destination3'].enable();
    }
  }
  changeDestPlace(e: any) {
    var selectedDataValue = this.formTripsheet.getRawValue();
    this.ivToPlace = e.dataId;
    // this.checkMs();
    if (selectedDataValue.destination! = '') {
      this.checkTripkMs();
    }
    else {
      this.formTripsheet.patchValue({
        destination2: ''
      });

    }

  }

  checkMs() {
    //this.checkTripkMs();

    if (this.ivFromPlace != "" && this.ivToPlace != "") {
      this.kmsDetails.fromLocation = this.ivFromPlace;
      this.kmsDetails.toLocation = this.ivToPlace;
      this.kmsDetails.transDate = this.formTripsheet.value.newTripDate;
      this.commonService.getKms(this.kmsDetails).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.formTripsheet.patchValue({
            distanceTripKM_1: (this.responseDetails.message).toString()
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
    this.tripsheetinnergridmodel.miscList.splice(index, 1);
    this.calculateTotal();
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
    this.tripsheetinnergridmodel.adblueList.splice(index, 1);
    this.calculateTotal();
  }

  createAdblueArray() {
    return this.formBuilder.group({
      adbluefillingStation: [''],
      adbluedieselLiter: [''],
      adbluedieselAmount: ['']
    });
  }
}

