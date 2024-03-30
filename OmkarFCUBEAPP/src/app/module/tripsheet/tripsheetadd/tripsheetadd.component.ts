import { Component } from '@angular/core';
import { Constants } from 'src/app/common/constants';



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
import { PenaltyModel } from 'src/app/models/penaltymodel';
import { Tripsheetinnergridmodel } from 'src/app/models/tripsheetinnergridmodel';
import { Tripsheetinnergridrequest } from 'src/app/models/tripsheetinnergridrequest';
import { SharedService } from 'src/app/services/shared.service';
import { Tripkmsmodel } from 'src/app/models/tripkmsmodel';
import { Dslmodel } from 'src/app/models/dslmodel';
import { BhattaRateModel } from 'src/app/models/bhattaratemodel';
import { Opbalmodel } from 'src/app/models/opbalmodel';
import { Driverdetailmodel } from 'src/app/models/driverdetailmodel';
import { IncentiveRateModel } from 'src/app/models/incentiveratemodel';
import { Adbluetobemodel } from 'src/app/models/adbluetobemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { PenaltyRateModel } from 'src/app/models/penaltyratemodel';
import { Usertriprightsmodel } from 'src/app/models/usertriprightsmodel';

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
  tstatus: string = '';
  bhatta: string = '';
  clBalDsl: string = '';
  advancePay: string = '';
  load : string = '';  
  incentiveRate: string = '';
  penaltyRate: string = '';
  bhattaRate: string = '';
  advancePay2: string = '';
  day2: string = '';
  adblue: string = '0';
  dsl2: number = 0;
  driverid: string = '';
  ltsdsl: string = '';
  ltsadbnew: number = 0;
  ltsadbnew1: number = 0;
  adblue1: string = '';
  ltsdsl1: string = '';
  bDays: number = 0;
  totalAdblue: number = 0;
  totaldsl: number = 0;
  totalpayable: number = 0;
  lrCount: number = 0;
  distanceTripKM_1: string = '';
  dTripKM_1: number = 0;
  tripkms: string = '';
  nexttripkms: string = '';
  vehicleTypeGroupId: string = '';
  driverPhotoPreview: any;
  licenceNo: any;
  validUpto: any;

  ExpReportingDays: number = 0;
  ExpReportingDt: string = '';
  dslDetails = new Dslmodel();
  incentiveDetails = new IncentiveRateModel();
  penaltyDetails = new PenaltyRateModel();
  penaltyNewDetails = new PenaltyModel();
  OpbalDetails = new Opbalmodel();
  DriverDetails = new Driverdetailmodel();
  bhattaDetails = new BhattaRateModel();
  adBlueDetails = new Adbluetobemodel();
  usertriprightsmodel = new Usertriprightsmodel();

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
  companyStatus = '';
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  checkselected = false;
  destinationid2 = '';
  destinationid3 = '';
  ivNewFromPlace = '';
  ivToPlace = '';
  tripsheetinnergridrequest = new Tripsheetinnergridrequest();

  selectedToPlace: boolean = false;
  selectedDestination2: boolean = false;
  selectedDestination3: boolean = false;

  canEditTripAfterClose: boolean = false;
  canLinkTrip: boolean = false;

  selectedTripSheetDetails = new Tripsheetmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tripsheetmodel: Tripsheetmodel, private tripSheetService: TripSheetService, 
    private commonService: CommonService, private sharedService: SharedService, 
    private requestmodel:Requestmodel,
    private toastrService: ToastrService) {
    this.tripsheetmodel = new Tripsheetmodel();

  }
  ngOnInit(): void {
    this.sharedService.loading = true;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Trip Sheet"));      
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
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
      idleDays: new FormControl('',),

      tripOpenDate: new FormControl('',),
      tripStatus: new FormControl('',),
      tripBalance: new FormControl('',),
      driverMasterID: new FormControl('', [Validators.required]),
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
      opBalDsl: new FormControl('0',),
      opBalAdblue: new FormControl('0',),
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
      multiDelIncentiveAmt: new FormControl('0',),
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
      penaltyExtra: new FormControl('',),


      miscDetailsList: this.formBuilder.array([this.createMiscArray()]),
      adblueDetailsList: this.formBuilder.array([this.createAdblueArray()])

    });
    this.getValidation();
    this.getDriverList();
    this.getBranchList();
    this.getVehicleNoList();
    this.getLocationList();
   // this.GetDslOpeningBal();
   // this.GetAdblueOpeningBal();

    this.selectedTripSheetDetails = this.tripSheetService.getTripSheetDetails();
    setTimeout(() => {
      if (this.selectedTripSheetDetails.tripId != '') {
        this.getValidationForOpening(this.selectedTripSheetDetails.tripNo);
        this.formTripsheet.patchValue(this.selectedTripSheetDetails);
        this.companyStatus = this.selectedTripSheetDetails.compNonCompStatus;
        this.load = this.selectedTripSheetDetails.loadEmptyType;
        this.ticlvalidation();
        this.formTripsheet.patchValue({
          newTripDate: this.commonService.formatDate(this.selectedTripSheetDetails.newTripDate),
          reportingDt_1: this.commonService.formatDate(this.selectedTripSheetDetails.reportingDt_1),
          reportingDt_2: this.commonService.formatDate(this.selectedTripSheetDetails.reportingDt_2),
          nextExpectedReportingDt: this.commonService.formatDate(this.selectedTripSheetDetails.nextExpectedReportingDt),
          expectedReportingDt: this.commonService.formatDate(this.selectedTripSheetDetails.expectedReportingDt),
          deliveryDate: this.commonService.formatDate(this.selectedTripSheetDetails.deliveryDate),
          ticlStatus: this.selectedTripSheetDetails.ticlStatus,
          tripLinkYN: this.selectedTripSheetDetails.tripLinkYN,
          compNonCompStatus: this.selectedTripSheetDetails.compNonCompStatus,
          tripTime: this.selectedTripSheetDetails.tripTime,
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
          totaldsl: parseInt(this.selectedTripSheetDetails.ltsDslToBe_1) + parseInt(this.selectedTripSheetDetails.ltsDslToBe_2),
          totalAdblue: parseInt(this.selectedTripSheetDetails.ltsAdblueToBe_1) + parseInt(this.selectedTripSheetDetails.ltsAdblueToBe_2),
          totalpayable: parseInt(this.selectedTripSheetDetails.advPayable_1) + parseInt(this.selectedTripSheetDetails.advPayable_2),
          yearid: this.year
        });
      
        this.vehicleTypeGroupId = this.selectedTripSheetDetails.vehicleTypeGroupId;
        this.ivFromPlace = this.selectedTripSheetDetails.loadingFrom;
        this.ivToPlace = this.selectedTripSheetDetails.destination;
        this.ivNewFromPlace = this.selectedTripSheetDetails.nextReportingBranch;
        this.tstatus = this.selectedTripSheetDetails.ticlStatus;
      
        this.formTripsheet.controls['tripLinkYN'].disable();

        if(this.selectedTripSheetDetails.tripStatus=='C'){
          this.getUserTripRights();          
        }

        this.tripsheetinnergridrequest.tripId = parseInt(this.selectedTripSheetDetails.tripId);
        this.tripsheetinnergridrequest.vehicleMasterId = parseInt(this.selectedTripSheetDetails.vehicleMasterID);
        this.getTripSheetInnerGridList();
        this.GetOpeningBalForEdit(this.selectedTripSheetDetails.driverMasterID);
        this.GetDslOpeningBal();
        this.GetAdblueOpeningBal();
        this.getBhattaRate();
        this.totalCalculation();
        this.getIdleDays();
        this.getDriverDetails2(this.selectedTripSheetDetails.driverMasterID)
      } else {
        this.tripsheetinnergridrequest.tripId = 0;
        this.tripsheetinnergridrequest.vehicleMasterId = 0;
      }

      this.checkDestinationControlStatus();

      // this.getTripSheetInnerGridList();
      this.editMode = true;
      // this.GetOpeningBal();
    }, 2000);
    this.editMode = true;
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
  closeDateChange(): void{
    //this.checkselected=!this.checkselected;
  //  if (this.checkselected){
      this.formTripsheet.controls['tripStatus'].setValidators([Validators.required]);
  
     
  //  }
  
    this.formTripsheet.controls['tripStatus'].updateValueAndValidity();
    
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleNoList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  getTripSheetInnerGridList(): void {
    this.tripSheetService.getTripSheetInnerGridList(this.tripsheetinnergridrequest).subscribe((res) => {
      this.tripsheetinnergridmodel = res;
      /////////// for multi delivery incentive
   
      this.formTripsheet.patchValue({
        multiDelIncentiveAmt:  this.tripsheetinnergridmodel.incentive
       });
    //  if( this.tripsheetinnergridmodel.lrDetailsList.length>1)
    //   {
    //       this.lrCount= this.tripsheetinnergridmodel.lrDetailsList.length
    //       this.lrCount = this.lrCount-1
    //       let incentval= this.lrCount*1000
          
    //       this.formTripsheet.patchValue({
    //        multiDelIncentiveAmt:  incentval
    //       });
    //    }

      for (let misc = 1; misc < this.tripsheetinnergridmodel.miscList.length; misc++) {
        this.formMiscArray.push(this.createMiscArray());
        //this.addMiscItem(misc-1);
      }
      for (let misc = 1; misc < this.tripsheetinnergridmodel.adblueList.length; misc++) {
       // this.addAdblueItem();
        this.formAdblueArray.push(this.createAdblueArray());
      }
      this.formTripsheet.patchValue({
        miscDetailsList: this.tripsheetinnergridmodel.miscList,
        adblueDetailsList: this.tripsheetinnergridmodel.adblueList
      });

      this.calculateTotal();
      this.totalCalculation();
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
    if (index == 0 && this.tripsheetinnergridmodel.miscList.length == 0) {
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
    this.totalCalculation();
  }

  updateAdBlue(index: number, event: any) {
    if (index == 0 && this.tripsheetinnergridmodel.adblueList.length == 0) {
      this.tripsheetinnergridmodel.adblueList.push({
        'adbluefillingStation': '',
        'adbluedieselLiter': '',
       // 'adbluedieselAmount': ''
      })
    }
    this.tripsheetinnergridmodel.adblueList[index].adbluedieselLiter = event.target.value;
    this.calculateTotal();
  }
  calTotalnew(): void {
    var selectedDataValue = this.formTripsheet.getRawValue();
    let clBalDsl = 0;
    let clBalAdBlue = 0;
    let netTripBalance = 0;
    clBalDsl = parseInt(selectedDataValue.opBalDsl) + parseFloat(selectedDataValue.issuedDslLtrs) - parseInt(selectedDataValue.cashDslLtrs) - parseInt(selectedDataValue.totaldsl)
    clBalAdBlue = parseInt(selectedDataValue.opBalAdblue) + parseFloat(selectedDataValue.issuedAdblueLtrs) + parseFloat(selectedDataValue.cashAdblueLtrs) - parseInt(selectedDataValue.totalAdblue)
    netTripBalance = parseInt(selectedDataValue.opBalDsl) + parseInt(selectedDataValue.paidDriverAdvance) - parseInt(selectedDataValue.totalpayable) - parseInt(selectedDataValue.totalpayable) - parseInt(selectedDataValue.repairsByDriver) - parseInt(selectedDataValue.parkingByDriver) - parseInt(selectedDataValue.accidentByDriver) - parseInt(selectedDataValue.weighmentByDriver) - parseInt(selectedDataValue.otherExpByDriver) - parseInt(selectedDataValue.allowedBhatta) - parseInt(selectedDataValue.onTimeIncentiveAmt) - parseInt(selectedDataValue.multiDelIncentiveAmt) - parseInt(selectedDataValue.penaltyChargedToDr) - parseInt(selectedDataValue.poolAcAmt)
    if (clBalDsl != undefined && clBalAdBlue != undefined && netTripBalance != undefined) {
      this.formTripsheet.patchValue({
        clBalDsl: clBalDsl,
        clBalAdBlue: clBalAdBlue,
        netTripBalance: netTripBalance
      });


    }
    else {
      this.formTripsheet.patchValue({
        clBalDsl: '',
        clBalAdBlue: '',
        netTripBalance: '',
      });

    }
  }
  checkLocation() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    let fp =  this.ivFromPlace ? this.ivFromPlace :0;
    let tp = this.ivToPlace ?this.ivToPlace :0;;
    if(fp!='0' && tp!='0' ){
     //let fp = selectedDataValue.fromPlace.dataId ?selectedDataValue.fromPlace.dataId :0;
    // let tp = selectedDataValue.toPlace.dataId ?selectedDataValue.toPlace.dataId :0;;
     if( fp == tp){
          this.toastrService.warning("From and to location should not be the same");
          this.formTripsheet.patchValue({
            fromPlace: '',
            toPlace: ''
          });
        }
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
    var totalToll = 0;
    for (let i = 0; i < this.tripsheetinnergridmodel.dieselDetailsList.length; i++) {
      totalDslLtr = totalDslLtr + parseFloat(this.tripsheetinnergridmodel.dieselDetailsList[i].qtyLtrs);
    }
    for (let i = 0; i < this.tripsheetinnergridmodel.adblueList.length; i++) {
      totalAdBlueLtr = totalAdBlueLtr + (this.tripsheetinnergridmodel.adblueList[i].adbluedieselLiter === '' ? 0 : parseFloat(this.tripsheetinnergridmodel.adblueList[i].adbluedieselLiter));
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
      totalotherExpByDriver = totalotherExpByDriver + (dataList[i].miscAmount === '' ? 0 : parseFloat(dataList[i].miscAmount));
    }
    var dataList = this.tripsheetinnergridmodel.miscList.filter(x => x.expType.toLowerCase() === "t");
    for (let i = 0; i < dataList.length; i++) {
      totalToll = totalToll + (dataList[i].miscAmount === '' ? 0 : parseFloat(dataList[i].miscAmount));
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
      otherExpByDriver: totalotherExpByDriver.toFixed(2),
      tollExpByDriver: totalToll.toFixed(2),
    });
   this.totalCalculation();
    this.sharedService.loading = false;
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }

  getUserTripRights(): void {
    this.requestmodel.strRequest = this.loggedInUserID;
    this.commonService.getUserDetails(this.requestmodel).subscribe((res: Usertriprightsmodel) => {
      this.usertriprightsmodel = res;
      this.canEditTripAfterClose = this.usertriprightsmodel.canEditTripAfterClose;
      this.canLinkTrip = this.usertriprightsmodel.canLinkTrip;
      if(!this.canEditTripAfterClose){
        this.editStatus=false;
      }
      if(this.canLinkTrip){            
        this.formTripsheet.controls['tripLinkYN'].enable();
      }
    });   
  }

  onTripLink(e: any): void {
    // var chk = e.target.checked;
    // if(!chk){
    //   const controls = this.formTripsheet.controls;
    //   for (const name in controls) {
    //     if (name=="tripLinkYN") {
    //       //ignore
    //     }
    //     else{        
    //       controls[name].disable();  
    //     }
    //   } 
    // }
  }
  
  getDriverList(): void {
    this.commonService.getDriverList().subscribe((res) => {
      this.driverList = res;
    });
  }
  deleteTripsheetForm(): void {
    if (confirm("Are you sure, you want to delete this?")) {

    }
  }

  
  selectNewEvent(item: any) {
    this.driverid = item.dataId;
    // do something with selected item
    this.getDriverDetails();
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
      this.toastrService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formTripsheet.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    this.validationForDslPlace();
    var selectedDataValue = this.formTripsheet.getRawValue();
    this.tripsheetmodel.tripId = this.selectedTripSheetDetails.tripId != '' ? this.selectedTripSheetDetails.tripId : '';
    this.tripsheetmodel.tripBranch = selectedDataValue.tripBranch;
    this.tripsheetmodel.yearId = this.year;
    this.tripsheetmodel.tripNo = selectedDataValue.tripNo;
    this.tripsheetmodel.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
    this.tripsheetmodel.lastTripCloseDate = selectedDataValue.lastTripCloseDate ? selectedDataValue.lastTripCloseDate : '';
    //this.tripsheetmodel.lastTripCloseDate = '';
    this.tripsheetmodel.newTripDate = selectedDataValue.newTripDate;
    this.tripsheetmodel.openThrough = selectedDataValue.openThrough;
    this.tripsheetmodel.compNonCompStatus = selectedDataValue.compNonCompStatus;
    this.tripsheetmodel.tripOpenBy = selectedDataValue.tripOpenBy;
   // this.tripsheetmodel.tripOpenDate = this.commonService.formatDate(this.loginDate);
     this.tripsheetmodel.tripOpenDate = selectedDataValue.tripOpenDate;
    this.tripsheetmodel.tripStatus = selectedDataValue.tripStatus ? 'C' : 'O';
    this.tripsheetmodel.driverMasterID = selectedDataValue.driverMasterID ? selectedDataValue.driverMasterID.dataId : '';
    this.tripsheetmodel.consignorPayParty = selectedDataValue.consignorPayParty;
    this.tripsheetmodel.compNonCompStatus = selectedDataValue.compNonCompStatus;
    this.tripsheetmodel.findocid = selectedDataValue.findocid;
    this.tripsheetmodel.challanNo = selectedDataValue.challanNo;
    this.tripsheetmodel.loadingFrom = selectedDataValue.loadingFrom ? selectedDataValue.loadingFrom.dataId : '';
    this.tripsheetmodel.destination = selectedDataValue.destination ? selectedDataValue.destination.dataId : '';
    this.tripsheetmodel.destination2 = selectedDataValue.destination2 ? selectedDataValue.destination2.dataId : '';
    this.tripsheetmodel.destination3 = selectedDataValue.destination3 ? selectedDataValue.destination3.dataId : '';
    this.tripsheetmodel.distanceTripKM_1 = selectedDataValue.distanceTripKM_1.toString();
    this.tripsheetmodel.distanceTripKM_2 = selectedDataValue.distanceTripKM_2.toString();
    this.tripsheetmodel.contents = selectedDataValue.contents;
    this.tripsheetmodel.loadEmptyType = selectedDataValue.loadEmptyType;
   // this.tripsheetmodel.expectedReportingDt = this.commonService.formatDate(selectedDataValue.expectedReportingDt);
   this.tripsheetmodel.expectedReportingDt = selectedDataValue.expectedReportingDt;
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
   // this.tripsheetmodel.delayedDays_2 = selectedDataValue.delayedDays_2 ? selectedDataValue.delayedDays_2 : '';
   this.tripsheetmodel.delayedDays_2 = selectedDataValue.delayedDays_2;
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
    this.tripsheetmodel.nextReportingBranch = selectedDataValue.nextReportingBranch ? selectedDataValue.nextReportingBranch.dataId : '';
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
    this.tripsheetmodel.penaltyExtra = selectedDataValue.penaltyExtra;
    this.tripsheetmodel.poolAcAmt = selectedDataValue.poolAcAmt;
    this.tripsheetmodel.totalDriverAc = selectedDataValue.totalDriverAc;
    this.tripsheetmodel.tripBalance = selectedDataValue.tripBalance;
    this.tripsheetmodel.recdFromDriver = selectedDataValue.recdFromDriver;
    this.tripsheetmodel.netTripBalance = selectedDataValue.netTripBalance;
    this.tripsheetmodel.clBalDsl = selectedDataValue.clBalDsl;
    this.tripsheetmodel.clBalAdBlue = selectedDataValue.clBalAdBlue;
    this.tripsheetmodel.ticlRemarks = selectedDataValue.ticlRemarks;
    this.tripsheetmodel.tripCloseBy = selectedDataValue.tripCloseBy;
    this.tripsheetmodel.tripCloseUpdateDt = selectedDataValue.tripCloseUpdateDt ? selectedDataValue.tripCloseUpdateDt : '';
    this.tripsheetmodel.tripLinkYN = selectedDataValue.tripLinkYN ? "Y" : "";
    this.tripsheetmodel.findocid = selectedDataValue.findocid;
    // this.tripsheetmodel.tripCloseDt = "";
    this.tripsheetmodel.tripCloseDt = selectedDataValue.tripCloseDt;
    this.tripsheetmodel.ticlStatus = selectedDataValue.ticlStatus;
    this.tripsheetmodel.actualDays_1 = selectedDataValue.actualDays_1.toString();
    this.tripsheetmodel.actualDays_2 = selectedDataValue.actualDays_2.toString();
    this.tripsheetmodel.idleDays = selectedDataValue.idleDays.toString();
    this.tripsheetmodel.tripSheetInnerGridList = this.tripsheetinnergridmodel;
    this.tripsheetmodel.loggedInUser = this.loggedInUserID;
    this.tripsheetmodel.tripTime = selectedDataValue.tripTime;
    for (var i = 0; i < this.formMiscArray.value.length; i++) {
      if(this.formMiscArray.value[i].expType!=''||  this.formMiscArray.value[i].miscAmount!=''){
        if(this.formMiscArray.value[i].expType!=''&&  this.formMiscArray.value[i].miscAmount!=''){
          this.tripsheetmodel.miscList.push({
            'expType': this.formMiscArray.value[i].expType,
            'miscAmount': this.formMiscArray.value[i].miscAmount,
            'narration': this.formMiscArray.value[i].narration
          })
        }
        else if(this.formMiscArray.value[i].expType==''){
          this.toastrService.warning( "Exp Type Cannot be Empty");  
          return;
        }
        else if(this.formMiscArray.value[i].miscAmount==''){
          this.toastrService.warning( "Misc Amount Cannot be Empty");  
          return;
        }
      }
    }

    if (this.formAdblueArray.value != undefined) {
      for (var i = 0; i < this.formAdblueArray.value.length; i++) {
        if(this.formAdblueArray.value[i].adbluedieselLiter!=''||  this.formAdblueArray.value[i].adbluefillingStation!=''){
          if(this.formAdblueArray.value[i].adbluedieselLiter!=''&&  this.formAdblueArray.value[i].adbluefillingStation!=''){
        this.tripsheetmodel.adblueList.push({
          'adbluefillingStation': this.formAdblueArray.value[i].adbluefillingStation,
          'adbluedieselLiter': this.formAdblueArray.value[i].adbluedieselLiter
         // 'adbluedieselAmount': this.formAdblueArray.value[i].adbluedieselAmount
        }) 
       }
        else if(this.formAdblueArray.value[i].adbluefillingStation==''){
          this.toastrService.warning( "Fill Station Cannot be Empty");  
          return;
        }
        else if(this.formAdblueArray.value[i].adbluedieselLiter==''){
          this.toastrService.warning( "Ltr Cannot be Empty");  
          return;
        }
      }
    }
  }

    this.tripSheetService.tripSheetDetailsSubmitted(this.tripsheetmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success("Saved succsessfully");
        this.formTripsheet.reset();
        this.route.navigate(['/tripsheetlist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }   
    });
  }

  // addLRItem(): void {
  //   this.formLRArray.push(this.createLRArray());
  // }

  // removeLRItem(index: number) {
  //   this.formLRArray.removeAt(index);
  // }
  getValidationForOpening(e: any): void {
var selectedValue = e;
if(selectedValue > 1){
    this.formTripsheet.controls['opBalDriver'].disable();
    this.formTripsheet.controls['opBalDsl'].disable();
    this.formTripsheet.controls['opBalAdblue'].disable();
  }
  else{
    this.formTripsheet.controls['opBalDriver'].enable();
    this.formTripsheet.controls['opBalDsl'].enable();
    this.formTripsheet.controls['opBalAdblue'].enable();

  }

  }
  getValidation(): void {
    this.formTripsheet.controls['tripBranch'].disable();
    this.formTripsheet.controls['idleDays'].disable();
    this.formTripsheet.controls['vehicleMasterID'].disable();
    this.formTripsheet.controls['tripCloseDt'].disable();
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
    this.formTripsheet.controls['opBalAdblue'].disable();
    this.formTripsheet.controls['distanceTripKM_1'].disable();
    this.formTripsheet.controls['distanceTripKM_2'].disable();
    this.formTripsheet.controls['expectedReportingDt'].disable();
    this.formTripsheet.controls['expectedReportingDays'].disable();
    this.formTripsheet.controls['ltsDslToBe_1'].disable();
    this.formTripsheet.controls['ltsDslToBe_2'].disable();
    this.formTripsheet.controls['ltsAdblueToBe_1'].disable();
    this.formTripsheet.controls['ltsAdblueToBe_2'].disable();
  
    this.formTripsheet.controls['penaltyChargedToDr'].disable();

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
    this.formTripsheet.controls['tollExpByDriver'].disable();
    
  }
  findKMs() {

  }
  getIdleDays(){
    var selectedDataValue = this.formTripsheet.getRawValue();
 
    //calculation
    var date1 = new Date(selectedDataValue.lastTripCloseDate);
    var date2 = new Date(selectedDataValue.newTripDate);
   
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
 
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
   // var DiffDays = difftime / (1000 * 3600 * 24);
   // Difference_In_Days = Math.abs(Difference_In_Days)
    if (!Number.isNaN(Difference_In_Days)) {
      this.formTripsheet.patchValue({
        idleDays: (Difference_In_Days).toString()

      });
    }
    else {
      this.formTripsheet.patchValue({
        idleDays: '0'

      });
    

    }
    this.getBhattaRate();

    
  }
  ticlvalidation(){
   // this.tripsheetmodel.tripId = this.selectedTripSheetDetails.tripId != '' ? this.selectedTripSheetDetails.tripId : '';
    if( this.load == "E" ){
      this.formTripsheet.controls['ticlStatus'].disable();

    }

  }
  
  checkTripkMs() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (this.ivFromPlace != "" && this.ivToPlace != ""  && selectedDataValue.destination2== undefined ||this.ivFromPlace != "" && this.ivToPlace != ""  && selectedDataValue.destination2== "" ) {
      this.kmsDetails.fromLocation = this.ivFromPlace;
      this.kmsDetails.toLocation = this.ivToPlace;
      this.kmsDetails.vehicleTypeGroupId = this.vehicleTypeGroupId;
     // this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
     this.kmsDetails.transDate = selectedDataValue.newTripDate;
     this.kmsDetails.loadOrEmpty = this.selectedTripSheetDetails.loadEmptyType;
  // this.kmsDetails.loadOrEmpty = 'E';
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms ? this.tripkmsDetails.kms : '';
        this.advancePay = this.tripkmsDetails.enrouteExpTruck ? this.tripkmsDetails.enrouteExpTruck : '0';
        this.dTripKM_1 = this.tripkmsDetails.kms ? parseInt(this.tripkmsDetails.kms) : 0;
        this.ExpReportingDays = this.dTripKM_1 / 400;
        // this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1
        //this.ExpReportingDays = Math.round(this.ExpReportingDays)
        this.ExpReportingDays = Math.ceil(this.ExpReportingDays)
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
        /////check load or empty
       // if(this.selectedTripSheetDetails.loadEmptyType =='L'){
        //  this.formTripsheet.patchValue({
          
        //  advPayable_1: (this.advancePay).toString(),
     //   });}
     //   else{
     //     this.formTripsheet.patchValue({
          
      //      advPayable_1: '0'
      //    });
//
     //   }

        //  this.checkTripkMsNext();
        this.checkDays();
        this.getDslToBe1();
        this.getDslToBe();
        this.getAdBlueToBe1();
        this.getAdBlueToBe();
        this.totalCal();
        // this.getIncentiveRate();
        this.getIncentiveRateByDate();
        this.getMultiIncentiveRate();


      });
    }
    else if (this.ivFromPlace != "" && this.destinationid2 != "" && this.destinationid3 == "") {
      this.kmsDetails.fromLocation = this.ivFromPlace;
      this.kmsDetails.toLocation = this.destinationid2;
      this.kmsDetails.vehicleTypeGroupId = this.vehicleTypeGroupId;
    //  this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
    this.kmsDetails.transDate = selectedDataValue.newTripDate;
    this.kmsDetails.loadOrEmpty = this.selectedTripSheetDetails.loadEmptyType;
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms ? this.tripkmsDetails.kms : '';
        this.advancePay = this.tripkmsDetails.enrouteExpTruck ? this.tripkmsDetails.enrouteExpTruck : '0';
        this.dTripKM_1 = this.tripkmsDetails.kms ? parseInt(this.tripkmsDetails.kms) : 0;
        this.ExpReportingDays = this.dTripKM_1 / 400;
        // this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1
       // this.ExpReportingDays = Math.round(this.ExpReportingDays)
       this.ExpReportingDays = Math.ceil(this.ExpReportingDays)
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
        this.totalCal();
        // this.getIncentiveRate();
        this.getMultiIncentiveRate();


      });

    }
    else if (this.ivFromPlace != "" && this.destinationid3 != "") {
      this.kmsDetails.fromLocation = this.ivFromPlace;
      this.kmsDetails.toLocation = this.destinationid3;
    //  this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
    this.kmsDetails.vehicleTypeGroupId = this.vehicleTypeGroupId;
    this.kmsDetails.transDate = selectedDataValue.newTripDate;
    this.kmsDetails.loadOrEmpty = this.selectedTripSheetDetails.loadEmptyType;
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms ? this.tripkmsDetails.kms : '';
        this.advancePay = this.tripkmsDetails.enrouteExpTruck ? this.tripkmsDetails.enrouteExpTruck : '0';
        this.dTripKM_1 = this.tripkmsDetails.kms ? parseInt(this.tripkmsDetails.kms) : 0;
        this.ExpReportingDays = this.dTripKM_1 / 400;
        //  this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1
        this.ExpReportingDays = Math.ceil(this.ExpReportingDays)
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
        this.totalCal();
        // this.getIncentiveRate();
        this.getMultiIncentiveRate();


      });

    }
    else {
      this.formTripsheet.patchValue({
      //  distanceTripKM_1: '0',
      //  expectedReportingDt: '0',
      //  expectedReportingDays: '0',
      //  ltsDslToBe_1: '0',
       // ltsAdblueToBe_1: '0',
      });
    }
  }
  GetOpeningBal() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    this.OpbalDetails.tripdate = selectedDataValue.newTripDate;
    this.OpbalDetails.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
    //  this.OpbalDetails.driverMasterID = selectedDataValue.driverMasterID.dataId;
    this.OpbalDetails.driverMasterID = this.driverid ? this.driverid : '0';
    // this.OpbalDetails.driverMasterID = this.formTripsheet.value.driverMasterID.dataId;
    // this.OpbalDetails.driverMasterID='1';
    this.OpbalDetails.yearid = this.year;
    this.OpbalDetails.tripNo = selectedDataValue.tripNo;
    this.commonService.getOpeningBal(this.OpbalDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
       if (this.responseDetails.status && selectedDataValue.tripNo!= 1 ) {
     // if (this.responseDetails.message != undefined || this.responseDetails.message != '' || this.responseDetails.message != 'Unable to process') {
        this.formTripsheet.patchValue({
          opBalDriver: this.responseDetails.message ? this.responseDetails.message : '0'
        });
        //  }
        //else
      } else {
        this.formTripsheet.patchValue({
          opBalDriver: '0'
        });
      }
    });
 
   // this.getDriverDetails();
   

  }
  GetDslOpeningBal() {
    var selectedDataValue = this.formTripsheet.getRawValue();
if(selectedDataValue.tripNo!=1){
    var selectedDataValue = this.formTripsheet.getRawValue();
    this.OpbalDetails.tripdate = selectedDataValue.newTripDate;
    this.OpbalDetails.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
    //  this.OpbalDetails.driverMasterID = selectedDataValue.driverMasterID.dataId;
  //  this.OpbalDetails.driverMasterID = this.driverid ? this.driverid : '0';
    // this.OpbalDetails.driverMasterID = this.formTripsheet.value.driverMasterID.dataId;
    // this.OpbalDetails.driverMasterID='1';
    this.OpbalDetails.yearid = this.year;
    this.OpbalDetails.tripNo = selectedDataValue.tripNo;
    this.commonService.getDslOpeningBal(this.OpbalDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
       if (this.responseDetails.status) {
     // if (this.responseDetails.message != undefined || this.responseDetails.message != '' || this.responseDetails.message != 'Unable to process') {
        this.formTripsheet.patchValue({
          opBalDsl: this.responseDetails.message ? this.responseDetails.message : '0'
        });
        //  }
        //else
      } else {
        this.formTripsheet.patchValue({
          opBalDsl: '0'
        });
      }
    });
 
   // this.getDriverDetails();
  }

  }
  GetAdblueOpeningBal() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if(selectedDataValue.tripNo!=1){
  
    this.OpbalDetails.tripdate = selectedDataValue.newTripDate;
    this.OpbalDetails.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
    //  this.OpbalDetails.driverMasterID = selectedDataValue.driverMasterID.dataId;
  //  this.OpbalDetails.driverMasterID = this.driverid ? this.driverid : '0';
    // this.OpbalDetails.driverMasterID = this.formTripsheet.value.driverMasterID.dataId;
    // this.OpbalDetails.driverMasterID='1';
    this.OpbalDetails.yearid = this.year;
    this.OpbalDetails.tripNo = selectedDataValue.tripNo;
    this.commonService.getAdblueOpeningBal(this.OpbalDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
       if (this.responseDetails.status) {
     // if (this.responseDetails.message != undefined || this.responseDetails.message != '' || this.responseDetails.message != 'Unable to process') {
        this.formTripsheet.patchValue({
          opBalAdblue: this.responseDetails.message ? this.responseDetails.message : '0'
        });
        //  }
        //else
      } else {
        this.formTripsheet.patchValue({
          opBalAdblue: '0'
        });
      }
    });
 
   // this.getDriverDetails();
 // }
  }
  }
  GetOpeningBalForEdit(e:any) {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if( selectedDataValue.tripNo!=1){

    this.OpbalDetails.tripdate = selectedDataValue.newTripDate;
    this.OpbalDetails.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
    //  this.OpbalDetails.driverMasterID = selectedDataValue.driverMasterID.dataId;
    this.OpbalDetails.driverMasterID = e;
    // this.OpbalDetails.driverMasterID = this.formTripsheet.value.driverMasterID.dataId;
    // this.OpbalDetails.driverMasterID='1';
    this.OpbalDetails.yearid = this.year;
    this.OpbalDetails.tripNo = selectedDataValue.tripNo;
    this.commonService.getOpeningBal(this.OpbalDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
   
       if (this.responseDetails.status) {
     // if (this.responseDetails.message != undefined || this.responseDetails.message != '' || this.responseDetails.message != 'Unable to process') {
        this.formTripsheet.patchValue({
          opBalDriver: this.responseDetails.message ? this.responseDetails.message : '0'
        });
        //  }
        //else
      } else {
        this.formTripsheet.patchValue({
          opBalDriver: '0'
        });
      }
 
    });
 
   // this.getDriverDetails();
   

 }
}
GetLastTripDriver(e:any) {
  var selectedDataValue = this.formTripsheet.getRawValue();
  if( selectedDataValue.tripNo!=1){

  this.OpbalDetails.tripdate = selectedDataValue.newTripDate;
  this.OpbalDetails.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
  //  this.OpbalDetails.driverMasterID = selectedDataValue.driverMasterID.dataId;
  this.OpbalDetails.driverMasterID = e;
  // this.OpbalDetails.driverMasterID = this.formTripsheet.value.driverMasterID.dataId;
  // this.OpbalDetails.driverMasterID='1';
  this.OpbalDetails.yearid = this.year;
  this.OpbalDetails.tripNo = selectedDataValue.tripNo;
  this.commonService.getLastTripDriver(this.OpbalDetails).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
 
     if (this.responseDetails.status) {
   // if (this.responseDetails.message != undefined || this.responseDetails.message != '' || this.responseDetails.message != 'Unable to process') {
      this.formTripsheet.patchValue({
        driverMasterId: this.responseDetails.message ? this.responseDetails.message : '0'
      });
      //  }
      //else
    } else {
      this.formTripsheet.patchValue({
        opBalDriver: '0'
      });
    }

  });

 // this.getDriverDetails();
 

}
}
  validationForDslPlace(){
    var selectedDataValue = this.formTripsheet.getRawValue();
    if(selectedDataValue.cashDslLtrs!=''&& selectedDataValue.cashDslPlace==''){
     
      this.formTripsheet.controls['cashDslPlace'].setValidators([Validators.required]);
    
     

    }
    else{
    //  this.formTripPayment.controls['chequeNo'].setValidators([Validators.required]);
     // this.formTripPayment.controls['chequeDate'].setValidators([Validators.required]);
    }

  }
  getDriverDetails2(e: any) {

    //console.log(e.target.value);
    var selectedValue = e;
    var selectedDataValue = this.formTripsheet.getRawValue();
 

    this.requestmodel.strRequest = selectedValue;

    this.commonService.getDriverDetail(this.requestmodel).subscribe((res: Driverdetailmodel) => {
      this.DriverDetails = res;
     if( this.DriverDetails.drPhoto!=''){
      this.driverPhotoPreview = Constants.UploadFolderPath + 'driver/driverphoto/' + this.DriverDetails.drPhoto;
      }
      this.licenceNo = this.DriverDetails.licenseNo,
      this.validUpto = this.DriverDetails.licValidUpto
    });

  }

  getDriverDetails(){
    var selectedDataValue = this.formTripsheet.getRawValue();
 

    this.requestmodel.strRequest = this.driverid ? this.driverid : '0';

    this.commonService.getDriverDetail(this.requestmodel).subscribe((res: Driverdetailmodel) => {
      this.DriverDetails = res;
      this.driverPhotoPreview = Constants.UploadFolderPath + 'driver/driverphoto/' + this.DriverDetails.drPhoto;
      this.licenceNo = this.DriverDetails.licenseNo,
      this.validUpto = this.DriverDetails.licValidUpto
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

        if(this.dTripKM_1<=100){
          this.formTripsheet.patchValue({
            //  // cneeGst:  (this.ExpectedReportingDays).toString() 
            //   //  cneeGst:  date2.split("T")[0]
            nextExpectedReportingDt: selectedDataValue.deliveryDate,
            distanceTripKM_2: (this.dTripKM_1).toString(),
            nextExpectedReportingDays: '0',
            advPayable_2: (this.advancePay2).toString(),
          });

        }
        else{
             this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          nextExpectedReportingDt: date2.split("T")[0],
          distanceTripKM_2: (this.dTripKM_1).toString(),
          nextExpectedReportingDays: (this.ExpReportingDays).toString(),
          advPayable_2: (this.advancePay2).toString(),
        });
      }
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
    if (this.ivToPlace != "" && this.ivNewFromPlace != "" && this.destinationid2 == "" && this.destinationid3 == "" ||this.ivToPlace != "" && this.ivNewFromPlace != "" && this.destinationid2 == undefined && this.destinationid3 == undefined) {
      this.kmsDetails.fromLocation = this.ivToPlace;
      this.kmsDetails.toLocation = this.ivNewFromPlace;
      this.kmsDetails.vehicleTypeGroupId = this.vehicleTypeGroupId;
     // this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
     this.kmsDetails.transDate = selectedDataValue.newTripDate;
     this.kmsDetails.loadOrEmpty = this.selectedTripSheetDetails.loadEmptyType;
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        //  // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms ? this.tripkmsDetails.kms : '';
        this.dTripKM_1 = this.tripkmsDetails.kms ? parseInt(this.tripkmsDetails.kms) : 0;
        //  this.advancePay2 = this.tripkmsDetails.enrouteExpTruck ? this.tripkmsDetails.enrouteExpTruck : '0';
        this.advancePay2 = this.tripkmsDetails.enrouteExpEmpty ? this.tripkmsDetails.enrouteExpEmpty : '0';
        this.ExpReportingDays
          = this.dTripKM_1 / 400
        // this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1;
       // this.ExpReportingDays = Math.round(this.ExpReportingDays)
       this.ExpReportingDays = Math.ceil(this.ExpReportingDays)

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


        if(this.dTripKM_1<=100){
          this.formTripsheet.patchValue({
            //  // cneeGst:  (this.ExpectedReportingDays).toString() 
            //   //  cneeGst:  date2.split("T")[0]
            nextExpectedReportingDt: selectedDataValue.deliveryDate,
            distanceTripKM_2: (this.dTripKM_1).toString(),
            nextExpectedReportingDays: '0',
            advPayable_2: (this.advancePay2).toString(),
          });

        }
        else{
             this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          nextExpectedReportingDt: date2.split("T")[0],
          distanceTripKM_2: (this.dTripKM_1).toString(),
          nextExpectedReportingDays: (this.ExpReportingDays).toString(),
          advPayable_2: (this.advancePay2).toString(),
        });
      }
        //////test
        if(this.dTripKM_1!=0){
       
        if(this.dTripKM_1<=100){
          this.formTripsheet.patchValue({
            //  // cneeGst:  (this.ExpectedReportingDays).toString() 
            //   //  cneeGst:  date2.split("T")[0]
            nextExpectedReportingDt: selectedDataValue.deliveryDate,
    
          });

        }
        else{
             this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          nextExpectedReportingDt: date2.split("T")[0],
       
        });
      }
    }
      


        ///

        this.nexttripkms = (this.dTripKM_1).toString(),
          // this.totalCal();
          this.getBhattaRate();
        this.getDslToBe();
        this.getAdBlueToBe();
        this.totalCal();
        this.getPenaltyRate();


        this.totalCalculation();



        this.checkDaysNew();

      });
    }
    else if (this.ivToPlace != "" && this.ivNewFromPlace != "" && this.destinationid2 !== "") {
      this.kmsDetails.fromLocation = this.destinationid2;
      this.kmsDetails.toLocation = this.ivNewFromPlace;
      this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
      this.kmsDetails.loadOrEmpty = this.selectedTripSheetDetails.loadEmptyType;
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        //  // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms ? this.tripkmsDetails.kms : '';
        this.dTripKM_1 = this.tripkmsDetails.kms ? parseInt(this.tripkmsDetails.kms) : 0;
        this.advancePay2 = this.tripkmsDetails.enrouteExpTruck;
        this.ExpReportingDays
          = this.dTripKM_1 / 400
        //  this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1;
        this.ExpReportingDays = Math.ceil(this.ExpReportingDays)

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

        if(this.dTripKM_1<=100){
          this.formTripsheet.patchValue({
            //  // cneeGst:  (this.ExpectedReportingDays).toString() 
            //   //  cneeGst:  date2.split("T")[0]
            nextExpectedReportingDt: selectedDataValue.deliveryDate,
            distanceTripKM_2: (this.dTripKM_1).toString(),
            nextExpectedReportingDays: '0',
            advPayable_2: (this.advancePay2).toString(),
          });

        }
        else{
             this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          nextExpectedReportingDt: date2.split("T")[0],
          distanceTripKM_2: (this.dTripKM_1).toString(),
          nextExpectedReportingDays: (this.ExpReportingDays).toString(),
          advPayable_2: (this.advancePay2).toString(),
        });
      }
        // this.totalCal();
        this.getBhattaRate();
        this.getDslToBe();
        this.totalCalculation();
        this.checkDaysNew();

      });
    }
    else if (this.ivToPlace != "" && this.ivNewFromPlace != "" && this.destinationid2 !== "" && this.destinationid3 !== "") {
      this.kmsDetails.fromLocation = this.destinationid3;
      this.kmsDetails.toLocation = this.ivNewFromPlace;
      this.kmsDetails.transDate = this.commonService.formatDate(selectedDataValue.newTripDate);
      this.kmsDetails.loadOrEmpty = this.selectedTripSheetDetails.loadEmptyType;
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        //  // if (this.tripkmsDetails.status) {
        this.tripkms = this.tripkmsDetails.kms ? this.tripkmsDetails.kms : '';
        this.dTripKM_1 = this.tripkmsDetails.kms ? parseInt(this.tripkmsDetails.kms) : 0;
        this.advancePay2 = this.tripkmsDetails.enrouteExpTruck;
        this.ExpReportingDays
          = this.dTripKM_1 / 400
        // this.ExpReportingDays = Math.round(this.ExpReportingDays) + 1;
        this.ExpReportingDays = Math.ceil(this.ExpReportingDays)

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
        if(this.dTripKM_1<=100){
          this.formTripsheet.patchValue({
            //  // cneeGst:  (this.ExpectedReportingDays).toString() 
            //   //  cneeGst:  date2.split("T")[0]
            nextExpectedReportingDt: selectedDataValue.deliveryDate,
            distanceTripKM_2: (this.dTripKM_1).toString(),
            nextExpectedReportingDays: '0',
            advPayable_2: (this.advancePay2).toString(),
          });

        }
        else{
             this.formTripsheet.patchValue({
          //  // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   //  cneeGst:  date2.split("T")[0]
          nextExpectedReportingDt: date2.split("T")[0],
          distanceTripKM_2: (this.dTripKM_1).toString(),
          nextExpectedReportingDays: (this.ExpReportingDays).toString(),
          advPayable_2: (this.advancePay2).toString(),
        });
      }
        // this.totalCal();
        this.getBhattaRate();
        this.getDslToBe();
        this.totalCalculation();
        this.checkDaysNew();

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
    if (d1 > d2 && d1!=0 && d2!=0 ) {
      this.formTripsheet.patchValue({
        reportingDt_2: ''
      });
      this.toastrService.warning(" delivery Date should be same or greater than Actual Reported Date ");
      return
    }

  }
  commonDetailUpdate() {
    this.checkDays();
    this.checkTripkMs();
    this.checkTripkMsNext();
    this.totalCalculation();
    this.checkDaysNew();

  }
  onRptchange(e: any){
    this.formTripsheet.patchValue({
      reportingDt_1: '0',
      deliveryDate:''

     });


  }
  checkDays() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if ( selectedDataValue.reportingDt_1=="") {
      this.formTripsheet.patchValue({
        deliveryDate: '',
        graceDays_1:'0',
        delayedDays_1:'0',
        advanceDays_1:'0',
        actualDays_1:'0',
        detentionDays: '0',
        nextReportingBranch: '0',
        distanceTripKM_2: '0',
        nextExpectedReportingDt: '',
        nextExpectedReportingDays: '0',
        ltsAdblueToBe_2: '0',
        ltsDslToBe_2: '0',
        advPayable_2: '0',
        reportingDt_2: '',
        actualDays_2: '0',
        advanceDays_2: '0',
        delayedDays_2: '0',
        
       
      });}
      else{
    const d1 = selectedDataValue.newTripDate?Date.parse(selectedDataValue.newTripDate):0;
    const d2 = selectedDataValue.reportingDt_1?Date.parse(selectedDataValue.reportingDt_1):0;
   
    if (d1!= 0 && d2!=0 ){
      
      
    
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
    var date1 = new Date(selectedDataValue.reportingDt_1);
    var date2 = new Date(selectedDataValue.newTripDate);
    var date3 = new Date( selectedDataValue.expectedReportingDt);

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var difftime = date3.getTime() - date1.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    var DiffDays = difftime / (1000 * 3600 * 24);
    Difference_In_Days = Math.abs(Difference_In_Days)
    if (!Number.isNaN(Difference_In_Days)) {
      this.formTripsheet.patchValue({
        actualDays_1: (Difference_In_Days).toString()

      });
    }
    else {
      this.formTripsheet.patchValue({
        actualDays_1: '0'

      });

    }
    if (DiffDays > 0) {
      this.day1 = (DiffDays).toString();
      this.formTripsheet.patchValue({
        advanceDays_1: this.day1,
        delayedDays_1: '0',
        actualDays_1: (Difference_In_Days).toString()

      });
    } else {
      //do something with negative values 
      DiffDays = Math.abs(DiffDays)
      this.day2 = (DiffDays).toString();
      if (!Number.isNaN(this.day2)) {
        this.formTripsheet.patchValue({
          delayedDays_1: this.day2,
          advanceDays_1: '0',
          // actualDays_2:  Difference_In_Days

        });
      }
      else {
        this.formTripsheet.patchValue({
          delayedDays_1: '0',
          advanceDays_1: '0',

        });





      }
    }}
      this.checkDays2();
    }
    this.getBhattaRate();
    this.getDslToBe();
    //  this.totalCalculation();
    // this.getIncentiveRate('JD');
    this.checkDaysNew();
    this.getPenaltyRate();

    // this.commonDetailUpdate();


  }
  checkDaysNew() {
    
    var selectedDataValue = this.formTripsheet.getRawValue();
    if ( selectedDataValue.reportingDt_2=="") {
      this.formTripsheet.patchValue({
  
      
        reportingDt_2: '',
        actualDays_2: '0',
        advanceDays_2: '0',
        delayedDays_2: '0',
      });}
  
    const d1 = selectedDataValue.deliveryDate?Date.parse(selectedDataValue.deliveryDate):0;
   const d2 = selectedDataValue.reportingDt_2?Date.parse(selectedDataValue.reportingDt_2):0;
   if (d1 != 0 && d2!= 0   ){
    if (d1 > d2   ) {
      this.formTripsheet.patchValue({
        reportingDt_2: ''
      });
      this.toastrService.warning("Actual Reported Date 2 should be same or greater than delivery Date");
      return
    }
else{
    //  let date = selectedDataValue.expectedReportingDt;
    // date.setDate(date.getDate() )
    //this.date1 = (date).toISOString();
    // this.date1 = this.date1.split("T")[0];
    // let currentDate = new Date();
    let dt3 = selectedDataValue.nextExpectedReportingDt?selectedDataValue.nextExpectedReportingDt:0
    // let dt2 = this.commonService.formatDate(selectedDataValue.reportingDt_2)
    let dt1 = selectedDataValue.reportingDt_2?selectedDataValue.reportingDt_2:0
    // let dt2 = this.commonService.formatDate(selectedDataValue.newTripDate)
    let dt2 = selectedDataValue.deliveryDate?selectedDataValue.deliveryDate:0
        // let dt2 = this.commonService.formatDate(selectedDataValue.deliveryDate)
    
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
    if (!Number.isNaN(Difference_In_Days)) {
      this.formTripsheet.patchValue({
        actualDays_2: (Difference_In_Days).toString()

      });
    }
    else {
      this.formTripsheet.patchValue({
        actualDays_2: '0'

      });

    }
if(selectedDataValue.nextExpectedReportingDt!=''){
    if (DiffDays > 0 ) {
      this.day1 = (DiffDays).toString();
      this.formTripsheet.patchValue({
        advanceDays_2: this.day1,
        delayedDays_2: '0',
        actualDays_2: (Difference_In_Days).toString()


      });
    } else  {
      //do something with negative values 
      DiffDays = Math.abs(DiffDays)
      this.day2 = (DiffDays).toString();
     // if (!Number.isNaN(this.day2)) {
      if (!Number.isNaN(this.day2)) {
        this.formTripsheet.patchValue({
          delayedDays_2: this.day2,
          advanceDays_2: '0',
          // actualDays_2:  Difference_In_Days

        });
      }
      else {
        this.formTripsheet.patchValue({
          delayedDays_2: '0',
          advanceDays_2: '0',

        });


      }}
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

    }
    this.getBhattaRate();
    this.getPenaltyRate();
    //this.commonDetailUpdate();
    //this.checkDaysNew();


    // this.totalCalculation();


  }
}

  }

  totalCal() {
    var selectedDataValue = this.formTripsheet.getRawValue();

    let dsl = parseFloat(this.ltsdsl).toFixed(2);
    var dl1 = selectedDataValue.ltsDslToBe_1 ? parseFloat(selectedDataValue.ltsDslToBe_1) : 0
    var dl2 = selectedDataValue.ltsDslToBe_2 ? parseFloat(selectedDataValue.ltsDslToBe_2) : 0
    var tp1 = selectedDataValue.advPayable_1 ? parseFloat(selectedDataValue.advPayable_1) : 0
    var tp2 = selectedDataValue.advPayable_2 ? parseFloat(selectedDataValue.advPayable_2) : 0
    this.totalAdblue = parseFloat(selectedDataValue.ltsAdblueToBe_2) + parseFloat(selectedDataValue.ltsAdblueToBe_1);
    //   
    this.totaldsl = dl1 + dl2;
    // this.totaldsl = this.dsl2 + parseFloat(selectedDataValue.ltsDslToBe_1);
    this.totalpayable = tp1 + tp2;
    // this.totalpayable = parseFloat(selectedDataValue.advPayable_2) + parseFloat(selectedDataValue.advPayable_1);
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
  totalCal2(e: any) {
    var selectedDataValue = this.formTripsheet.getRawValue();
    var dl1 = selectedDataValue.ltsDslToBe_1 ? parseFloat(selectedDataValue.ltsDslToBe_1) : 0
    var dl2 = selectedDataValue.ltsDslToBe_2 ? parseFloat(selectedDataValue.ltsDslToBe_2) : 0
    var tp1 = selectedDataValue.advPayable_1 ? parseFloat(selectedDataValue.advPayable_1) : 0
    var tp2 = selectedDataValue.advPayable_2 ? parseFloat(selectedDataValue.advPayable_2) : 0
    let dsl = e
    dsl = parseInt(dsl);
    this.totalAdblue = parseFloat(selectedDataValue.ltsAdblueToBe_2) + parseFloat(selectedDataValue.ltsAdblueToBe_1);
    // this.totaldsl = parseFloat(selectedDataValue.ltsDslToBe_2) + parseFloat(selectedDataValue.ltsDslToBe_1);
   // this.totaldsl = dl1 + dl2;
   this.totaldsl = dl1 + dsl;
    this.totalpayable = tp1 + tp2;
    this.totalCalculation2(this.totaldsl)
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
  updateDslOp(){
    var selectedDataValue = this.formTripsheet.getRawValue();
  
 
  
  
  

    var cashDslAmt  = selectedDataValue.cashDslAmt ? parseFloat(selectedDataValue.cashDslAmt) : 0;
    var clBalDsl = 0;
    let opDslbal = selectedDataValue.opBalDsl ? parseFloat(selectedDataValue.opBalDsl) : 0
    let issuedDslLtrs = selectedDataValue.issuedDslLtrs ? parseFloat(selectedDataValue.issuedDslLtrs) : 0
    let totaldsl = selectedDataValue.totaldsl ? parseFloat(selectedDataValue.totaldsl) : 0
    let cashDslLtrs = selectedDataValue.cashDslLtrs ? parseFloat(selectedDataValue.cashDslLtrs) : 0


    clBalDsl = totaldsl - issuedDslLtrs- cashDslLtrs  + opDslbal
    this.formTripsheet.patchValue({
      clBalDsl: (clBalDsl).toString(),
 
    });
  }

  //drivercalaculation
  totalCalculation() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    var repairsByDriver = selectedDataValue.repairsByDriver ? parseFloat(selectedDataValue.repairsByDriver) : 0;
    var parkingByDriver = selectedDataValue.parkingByDriver ? parseFloat(selectedDataValue.parkingByDriver) : 0;
    var accidentByDriver = selectedDataValue.accidentByDriver ? parseFloat(selectedDataValue.accidentByDriver) : 0;
    var weighmentByDriver = selectedDataValue.weighmentByDriver ? parseFloat(selectedDataValue.weighmentByDriver) : 0;
    var challanByDriver = selectedDataValue.challanByDriver ? parseFloat(selectedDataValue.challanByDriver) : 0;
    var otherExpByDriver = selectedDataValue.otherExpByDriver ? parseFloat(selectedDataValue.otherExpByDriver) : 0;
    var allowedBhatta = selectedDataValue.allowedBhatta ? parseFloat(selectedDataValue.allowedBhatta) : 0;
    var onTimeIncentiveAmt = selectedDataValue.onTimeIncentiveAmt ? parseFloat(selectedDataValue.onTimeIncentiveAmt) : 0;
    var multiDelIncentiveAmt = selectedDataValue.multiDelIncentiveAmt ? parseFloat(selectedDataValue.multiDelIncentiveAmt) : 0;
    var penaltyChargedToDr = selectedDataValue.penaltyChargedToDr ? parseFloat(selectedDataValue.penaltyChargedToDr) : 0;
    var penaltyExtra = selectedDataValue.penaltyExtra ? parseFloat(selectedDataValue.penaltyExtra) : 0;
    var recdFromDriver = selectedDataValue.recdFromDriver ? parseFloat(selectedDataValue.recdFromDriver) : 0;
    var issuedAdblueLtrs = selectedDataValue.issuedAdblueLtrs ? parseFloat(selectedDataValue.issuedAdblueLtrs) : 0;
    var totalAdblue = selectedDataValue.totalAdblue ? parseFloat(selectedDataValue.totalAdblue) : 0;
    var opBalAdblue = selectedDataValue.opBalAdblue ? parseFloat(selectedDataValue.opBalAdblue) : 0;
    var opBalDriver = selectedDataValue.opBalDriver ? parseFloat(selectedDataValue.opBalDriver) : 0;
    var paidDriverAdvance = selectedDataValue.paidDriverAdvance ? parseFloat(selectedDataValue.paidDriverAdvance) : 0;
    var recdFromDriver = selectedDataValue.recdFromDriver ? parseFloat(selectedDataValue.recdFromDriver) : 0;
    var tollExpByDriver  = selectedDataValue.tollExpByDriver ? parseFloat(selectedDataValue.tollExpByDriver) : 0;
    var totalpayable  = selectedDataValue.totalpayable ? parseFloat(selectedDataValue.totalpayable) : 0;
    var cashDslAmt  = selectedDataValue.cashDslAmt ? parseFloat(selectedDataValue.cashDslAmt) : 0;
    var clBalDsl = 0;
    var clBalAdblue = 0;
    var netTripBalance = 0;
    var tripBalance = 0;
    var totalDriverAc = 0;
   // let opbal = selectedDataValue.opBalDsl ? parseFloat(selectedDataValue.opBalDsl) : 0
    let opDslbal = selectedDataValue.opBalDsl ? parseFloat(selectedDataValue.opBalDsl) : 0
    let issuedDslLtrs = selectedDataValue.issuedDslLtrs ? parseFloat(selectedDataValue.issuedDslLtrs) : 0
    let totaldsl = selectedDataValue.totaldsl ? parseFloat(selectedDataValue.totaldsl) : 0
    let cashDslLtrs = selectedDataValue.cashDslLtrs ? parseFloat(selectedDataValue.cashDslLtrs) : 0

   // Dls Cl Bal =  Total dsl to be -  Dsl Open Bal -Dsl Ltrs Issued -Cash Dsl Ltrs  
  
  // clBalDsl = totaldsl -opDslbal - issuedDslLtrs - cashDslLtrs 
  clBalDsl = totaldsl - issuedDslLtrs- cashDslLtrs  + opDslbal


    //clBalDsl = selectedDataValue.opBalDsl?parseFloat(selectedDataValue.opBalDsl):0 + parseFloat(selectedDataValue.issuedDslLtrs) - parseFloat(selectedDataValue.totaldsl )
   // totalDriverAc = repairsByDriver + parkingByDriver + accidentByDriver + weighmentByDriver + challanByDriver + otherExpByDriver + allowedBhatta + onTimeIncentiveAmt + multiDelIncentiveAmt +tollExpByDriver + totalpayable + cashDslAmt - penaltyChargedToDr;
     totalDriverAc = repairsByDriver + parkingByDriver + accidentByDriver + weighmentByDriver + challanByDriver + otherExpByDriver + allowedBhatta + onTimeIncentiveAmt + multiDelIncentiveAmt +tollExpByDriver + totalpayable + cashDslAmt - penaltyChargedToDr-penaltyExtra;
   // clBalAdblue = totalAdblue - opBalAdblue - issuedAdblueLtrs;
   clBalAdblue = totalAdblue - issuedAdblueLtrs + opBalAdblue 
   clBalAdblue = Math.ceil(clBalAdblue);
    // netTripBalance = selectedDataValue.opBalDriver?parseFloat(selectedDataValue.opBalDriver) :0+ selectedDataValue.paidDriverAdvance?parseFloat(selectedDataValue.paidDriverAdvance):0 - selectedDataValue.totalpayable?parseFloat(selectedDataValue.totalpayable):0-selectedDataValue.repairsByDriver?parseFloat(selectedDataValue.repairsByDriver):0-selectedDataValue.repairsByDriver?parseFloat(selectedDataValue.repairsByDriver):0-selectedDataValue.parkingByDriver?parseFloat(selectedDataValue.parkingByDriver):0- selectedDataValue.accidentByDriver?parseFloat(selectedDataValue.accidentByDriver):0-selectedDataValue.accidentByDriver?parseFloat(selectedDataValue.accidentByDriver):0-selectedDataValue.weighmentByDriver?parseFloat(selectedDataValue.weighmentByDriver):0-selectedDataValue.challanByDriver?parseFloat(selectedDataValue.challanByDriver):0-selectedDataValue.challanByDriver?parseFloat(selectedDataValue.challanByDriver):0- selectedDataValue.otherExpByDriver?parseFloat(selectedDataValue.otherExpByDriver):0- selectedDataValue.allowedBhatta?parseFloat(selectedDataValue.allowedBhatta):0-selectedDataValue.onTimeIncentiveAmt?parseFloat(selectedDataValue.onTimeIncentiveAmt):0-selectedDataValue.penaltyChargedToDr?parseFloat(selectedDataValue.penaltyChargedToDr):0-selectedDataValue.poolAcAmt?parseFloat(selectedDataValue.poolAcAmt):0
    //tripBalance = opBalDriver + totalDriverAc - paidDriverAdvance;
   // tripBalance = - paidDriverAdvance-opBalDriver - totalDriverAc ;
  // tripBalance =  paidDriverAdvance-opBalDriver - totalDriverAc ;
  tripBalance =  paidDriverAdvance + opBalDriver - totalDriverAc ;


    netTripBalance = tripBalance - recdFromDriver;
    if (clBalDsl !== undefined && clBalAdblue !== undefined && netTripBalance !== undefined) {
      this.formTripsheet.patchValue({
        clBalDsl: (clBalDsl).toString(),
        clBalAdBlue: (clBalAdblue).toFixed(2).toString(),
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
  //drivercalculation
  totalCalculationForTicl(e: any) {
    var incentivechange = e;

    var selectedDataValue = this.formTripsheet.getRawValue();
    var repairsByDriver = selectedDataValue.repairsByDriver ? parseFloat(selectedDataValue.repairsByDriver) : 0;
    var parkingByDriver = selectedDataValue.parkingByDriver ? parseFloat(selectedDataValue.parkingByDriver) : 0;
    var accidentByDriver = selectedDataValue.accidentByDriver ? parseFloat(selectedDataValue.accidentByDriver) : 0;
    var weighmentByDriver = selectedDataValue.weighmentByDriver ? parseFloat(selectedDataValue.weighmentByDriver) : 0;
    var challanByDriver = selectedDataValue.challanByDriver ? parseFloat(selectedDataValue.challanByDriver) : 0;
    var otherExpByDriver = selectedDataValue.otherExpByDriver ? parseFloat(selectedDataValue.otherExpByDriver) : 0;
    var allowedBhatta = selectedDataValue.allowedBhatta ? parseFloat(selectedDataValue.allowedBhatta) : 0;
    //var onTimeIncentiveAmt = selectedDataValue.onTimeIncentiveAmt?parseFloat(selectedDataValue.onTimeIncentiveAmt):0;
    var onTimeIncentiveAmt = incentivechange;
    var multiDelIncentiveAmt = selectedDataValue.multiDelIncentiveAmt ? parseFloat(selectedDataValue.multiDelIncentiveAmt) : 0;
    // var multiDelIncentiveAmt = incentivechange;
    var penaltyChargedToDr = selectedDataValue.penaltyChargedToDr ? parseFloat(selectedDataValue.penaltyChargedToDr) : 0;
    var penaltyExtra = selectedDataValue.penaltyExtra ? parseFloat(selectedDataValue.penaltyExtra) : 0;
    var recdFromDriver = selectedDataValue.recdFromDriver ? parseFloat(selectedDataValue.recdFromDriver) : 0;
    var issuedAdblueLtrs = selectedDataValue.issuedAdblueLtrs ? parseFloat(selectedDataValue.issuedAdblueLtrs) : 0;
    var totalAdblue = selectedDataValue.totalAdblue ? parseFloat(selectedDataValue.totalAdblue) : 0;
    var opBalAdblue = selectedDataValue.opBalAdblue ? parseFloat(selectedDataValue.opBalAdblue) : 0;
    var opBalDriver = selectedDataValue.opBalDriver ? parseFloat(selectedDataValue.opBalDriver) : 0;
    var paidDriverAdvance = selectedDataValue.paidDriverAdvance ? parseFloat(selectedDataValue.paidDriverAdvance) : 0;
    var recdFromDriver = selectedDataValue.recdFromDriver ? parseFloat(selectedDataValue.recdFromDriver) : 0;
    var tollExpByDriver  = selectedDataValue.tollExpByDriver ? parseFloat(selectedDataValue.tollExpByDriver) : 0;
    var cashDslAmt  = selectedDataValue.cashDslAmt ? parseFloat(selectedDataValue.cashDslAmt) : 0;
    var clBalDsl = 0;
    var clBalAdblue = 0;
    var netTripBalance = 0;
    var tripBalance = 0;
    var totalDriverAc = 0;
    let opDslbal = selectedDataValue.opBalDsl ? parseFloat(selectedDataValue.opBalDsl) : 0
    let issuedDslLtrs = selectedDataValue.issuedDslLtrs ? parseFloat(selectedDataValue.issuedDslLtrs) : 0
    let totaldsl = selectedDataValue.totaldsl ? parseFloat(selectedDataValue.totaldsl) : 0
    let cashDslLtrs = selectedDataValue.cashDslLtrs ? parseFloat(selectedDataValue.cashDslLtrs) : 0
    var totalpayable  = selectedDataValue.totalpayable ? parseFloat(selectedDataValue.totalpayable) : 0;


   // clBalDsl = opbal + issuedDslLtrs + cashDslLtrs - totaldsl
  // clBalDsl = totaldsl -opDslbal - issuedDslLtrs - cashDslLtrs 
   clBalDsl = totaldsl - issuedDslLtrs- cashDslLtrs  + opDslbal
    //clBalDsl = selectedDataValue.opBalDsl?parseFloat(selectedDataValue.opBalDsl):0 + parseFloat(selectedDataValue.issuedDslLtrs) - parseFloat(selectedDataValue.totaldsl )
    totalDriverAc = repairsByDriver + parkingByDriver + accidentByDriver + weighmentByDriver + challanByDriver + otherExpByDriver + allowedBhatta + onTimeIncentiveAmt + multiDelIncentiveAmt + tollExpByDriver 
    + totalpayable + cashDslAmt - penaltyChargedToDr - penaltyExtra;
   // clBalAdblue = opBalAdblue + issuedAdblueLtrs - totalAdblue;
   //clBalAdblue = totalAdblue - opBalAdblue - issuedAdblueLtrs;
   clBalAdblue = totalAdblue - issuedAdblueLtrs + opBalAdblue 
   clBalAdblue = Math.ceil(clBalAdblue);
    // netTripBalance = selectedDataValue.opBalDriver?parseFloat(selectedDataValue.opBalDriver) :0+ selectedDataValue.paidDriverAdvance?parseFloat(selectedDataValue.paidDriverAdvance):0 - selectedDataValue.totalpayable?parseFloat(selectedDataValue.totalpayable):0-selectedDataValue.repairsByDriver?parseFloat(selectedDataValue.repairsByDriver):0-selectedDataValue.repairsByDriver?parseFloat(selectedDataValue.repairsByDriver):0-selectedDataValue.parkingByDriver?parseFloat(selectedDataValue.parkingByDriver):0- selectedDataValue.accidentByDriver?parseFloat(selectedDataValue.accidentByDriver):0-selectedDataValue.accidentByDriver?parseFloat(selectedDataValue.accidentByDriver):0-selectedDataValue.weighmentByDriver?parseFloat(selectedDataValue.weighmentByDriver):0-selectedDataValue.challanByDriver?parseFloat(selectedDataValue.challanByDriver):0-selectedDataValue.challanByDriver?parseFloat(selectedDataValue.challanByDriver):0- selectedDataValue.otherExpByDriver?parseFloat(selectedDataValue.otherExpByDriver):0- selectedDataValue.allowedBhatta?parseFloat(selectedDataValue.allowedBhatta):0-selectedDataValue.onTimeIncentiveAmt?parseFloat(selectedDataValue.onTimeIncentiveAmt):0-selectedDataValue.penaltyChargedToDr?parseFloat(selectedDataValue.penaltyChargedToDr):0-selectedDataValue.poolAcAmt?parseFloat(selectedDataValue.poolAcAmt):0
    //tripBalance = opBalDriver + totalDriverAc - paidDriverAdvance;
 // tripBalance = paidDriverAdvance-opBalDriver - totalDriverAc ;
 tripBalance = paidDriverAdvance + opBalDriver - totalDriverAc ;
    netTripBalance = tripBalance - recdFromDriver;
    if (clBalDsl !== undefined && clBalAdblue !== undefined && netTripBalance !== undefined) {
      this.formTripsheet.patchValue({
        clBalDsl: (clBalDsl).toString(),
        clBalAdBlue: (clBalAdblue).toFixed(2).toString(),
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
  


  totalCalculation2(e: any) {
    var selectedDataValue = this.formTripsheet.getRawValue();
    var clBalDsl = 0;
    var clBalAdblue = 0;
    var netTripBalance = 0;
    let opbal = selectedDataValue.opBalDsl ? parseFloat(selectedDataValue.opBalDsl) : 0
    let issuedDslLtrs = selectedDataValue.issuedDslLtrs ? parseFloat(selectedDataValue.issuedDslLtrs) : 0
    let totaldsl = e ? parseFloat(e) : 0

    clBalDsl = opbal + issuedDslLtrs - totaldsl
    //clBalDsl = selectedDataValue.opBalDsl?parseFloat(selectedDataValue.opBalDsl):0 + parseFloat(selectedDataValue.issuedDslLtrs) - parseFloat(selectedDataValue.totaldsl )
    clBalAdblue = selectedDataValue.opBalAdblue ? parseFloat(selectedDataValue.opBalAdblue) : 0 + selectedDataValue.issuedAdblueLtrs ? parseFloat(selectedDataValue.issuedAdblueLtrs) : 0 - selectedDataValue.totalAdblue ? parseFloat(selectedDataValue.totalAdblue) : 0
    netTripBalance = selectedDataValue.opBalDriver ? parseFloat(selectedDataValue.opBalDriver) : 0 + selectedDataValue.paidDriverAdvance ? parseFloat(selectedDataValue.paidDriverAdvance) : 0 - selectedDataValue.totalpayable ? parseFloat(selectedDataValue.totalpayable) : 0 - selectedDataValue.repairsByDriver ? parseFloat(selectedDataValue.repairsByDriver) : 0 - selectedDataValue.repairsByDriver ? parseFloat(selectedDataValue.repairsByDriver) : 0 - selectedDataValue.parkingByDriver ? parseFloat(selectedDataValue.parkingByDriver) : 0 - selectedDataValue.accidentByDriver ? parseFloat(selectedDataValue.accidentByDriver) : 0 - selectedDataValue.accidentByDriver ? parseFloat(selectedDataValue.accidentByDriver) : 0 - selectedDataValue.weighmentByDriver ? parseFloat(selectedDataValue.weighmentByDriver) : 0 - selectedDataValue.challanByDriver ? parseFloat(selectedDataValue.challanByDriver) : 0 - selectedDataValue.challanByDriver ? parseFloat(selectedDataValue.challanByDriver) : 0 - selectedDataValue.otherExpByDriver ? parseFloat(selectedDataValue.otherExpByDriver) : 0 - selectedDataValue.allowedBhatta ? parseFloat(selectedDataValue.allowedBhatta) : 0 - selectedDataValue.onTimeIncentiveAmt ? parseFloat(selectedDataValue.onTimeIncentiveAmt) : 0 - selectedDataValue.penaltyChargedToDr ? parseFloat(selectedDataValue.penaltyChargedToDr) : 0 - selectedDataValue.poolAcAmt ? parseFloat(selectedDataValue.poolAcAmt) : 0
    if (clBalDsl !== undefined && clBalAdblue !== undefined && netTripBalance !== undefined) {
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

    if ( selectedDataValue.deliveryDate=="") {
      this.formTripsheet.patchValue({
        deliveryDate: '',
    
        detentionDays: '0',
        nextReportingBranch: '0',
        distanceTripKM_2: '0',
        nextExpectedReportingDt: '',
        nextExpectedReportingDays: '0',
        ltsAdblueToBe_2: '0',
        ltsDslToBe_2: '0',
        advPayable_2: '0',
        reportingDt_2: '',
        actualDays_2: '0',
        advanceDays_2: '0',
        delayedDays_2: '0',
      });}
      else{
    const d3 = selectedDataValue.deliveryDate?Date.parse(selectedDataValue.deliveryDate):0;
    const d4 = selectedDataValue.reportingDt_1?Date.parse(selectedDataValue.reportingDt_1):0;
    if (d3 < d4 && d3!= 0 && d4!= 0 ) {
      this.formTripsheet.patchValue({
        deliveryDate: ''
      });
      this.toastrService.warning(" delivery Date should be same or greater than Actual Reported Date ");
      return
    }
    var selectedDataValue = this.formTripsheet.getRawValue();

  //  let dt1 = this.commonService.formatDate(selectedDataValue.reportingDt_1)
  //  let dt2 = this.commonService.formatDate(selectedDataValue.deliveryDate)
  let dt1 = selectedDataValue.reportingDt_1
    let dt2 = selectedDataValue.deliveryDate
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


      });}
      // this.getIncentiveRate();
      this.getBhattaRate();
      this.checkTripkMsNext();
      this.getIncentiveRate(this.tstatus);
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
    this.checkLocation();
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
   // this.checkTripkMs();
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
        this.ltsadbnew = parseInt(this.adblue);
        this.ltsadbnew = Math.ceil(this.ltsadbnew)
        let adb = (this.ltsadbnew).toFixed(2);
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
        ltsAdblueToBe_2: '0'
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
      //  this.adblue1 = parseFloat( this.adblue1);
       // this.adblue1 = Math.round(this.adblue1);
        // if (this.tripkmsDetails.status) {

     //  let adbluenew string  = parseFloat(this.adblue1).toFixed(2)
    // ltsadbnew = Math.ceil(ltsadbnew)
     this.ltsadbnew = parseInt(this.adblue1);
    // this.ltsadbnew = Math.ceil(this.ltsadbnew)
    this.ltsadbnew = Math.ceil(this.ltsadbnew)

        //date2 =this.commonService.formatDate(date2)
        //const myFormattedDate = this.commonService.formatDate(date2);
        if (this.adblue1 != undefined) {
          this.formTripsheet.patchValue({
            // cneeGst:  (this.ExpectedReportingDays).toString() 
            ltsAdblueToBe_1: this.ltsadbnew.toFixed(2).toString()


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
        ltsAdblueToBe_2: '0'
      });
    }
  }
  getDslToBe() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (this.ivNewFromPlace != "" && this.ivToPlace != "" &&  this.nexttripkms!= "") {
      this.dslDetails.transDate = selectedDataValue.newTripDate;
      //  this.dslDetails.tripKms = (selectedDataValue.distanceTripKM_2).toString(); this.dTripKM_1 
      this.dslDetails.tripKms = this.nexttripkms
      this.dslDetails.loadType = "E";
  //  this.dslDetails.loadType = this.selectedTripSheetDetails.loadEmptyType;
      this.dslDetails.vehicleMasterId = selectedDataValue.vehicleMasterID.dataId;
      this.commonService.getDslToBe(this.dslDetails).subscribe((res: Responsemodel) => {
        this.ltsdsl = res.message;
        let ld = parseFloat(this.ltsdsl).toFixed(2);
        this.dsl2 = parseFloat(ld);
        this.totalCal2(ld);

        // if (this.tripkmsDetails.status) {
        if (this.ltsdsl != undefined) {
          this.formTripsheet.patchValue({
            // cneeGst:  (this.ExpectedReportingDays).toString() 
            //   ltsDslToBe_2: parseFloat(this.ltsdsl).toFixed(2).toString()
            ltsDslToBe_2: (ld).toString()
            // totaldsl = ld + parseFloat(selectedDataValue.ltsDslToBe_1)
          });

        }
        else {
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
  getIncentiveRateByDate() {


    var selectedDataValue = this.formTripsheet.getRawValue();
    let rptdt = this.commonService.formatDate(selectedDataValue.reportingDt_1)
    let expdt = this.commonService.formatDate(selectedDataValue.expectedReportingDt)
    // this.tstatus =  e.target.value;;
    //if (selectedDataValue.ticlStatus == "OK" && rptdt == expdt || rptdt < expdt) {
    if (selectedDataValue.ticlStatus == "OK" && rptdt <= expdt && this.companyStatus!='R') {
      //if (this.tstatus == "OK") {
      this.incentiveDetails.transDate = selectedDataValue.newTripDate;
      this.incentiveDetails.tripKms = (selectedDataValue.distanceTripKM_1).toString();

      this.commonService.getIncentiveRate(this.incentiveDetails).subscribe((res: Responsemodel) => {
        this.incentiveRate = res.message;
        let ir = 0;

        if (rptdt <= expdt && this.incentiveRate != '') {
          //ir = parseInt(this.incentiveRate) * selectedDataValue.advanceDays_1;
          ir = parseInt(this.incentiveRate)
          this.getDslToBe1();
          this.getAdBlueToBe1();


          this.totalCalculationForTicl(ir);
          //this.totalCalculation();
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
    } 
    else if ( this.companyStatus =='R'&& selectedDataValue.ticlStatus == "OK" ){
      let ir = 0;
      ir = parseInt(this.incentiveRate)
      this.getDslToBe1();
      this.getAdBlueToBe1();
      this.totalCalculationForTicl(ir);
    this.formTripsheet.patchValue({
      // cneeGst:  (this.ExpectedReportingDays).toString() 
      // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
      onTimeIncentiveAmt: "1000"
    });
  }else {
      this.formTripsheet.patchValue({
        // cneeGst:  (this.ExpectedReportingDays).toString() 
        // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
        onTimeIncentiveAmt: "0"
      });
      this.getDslToBe1();
      this.getAdBlueToBe1();
      this.totalCalculationForTicl(0);
      // this.totalCalculation();

    }
    // this.totalCalculation();
    
  }
  getIncentiveRate(e: any) {

    console.log(e.target.value);
    var selectedValue = e.target.value;
    var selectedDataValue = this.formTripsheet.getRawValue();
   // let rptdt = this.commonService.formatDate(selectedDataValue.reportingDt_1)
    //let expdt = this.commonService.formatDate(selectedDataValue.expectedReportingDt)
 let rptdt = selectedDataValue.reportingDt_1?Date.parse(selectedDataValue.reportingDt_1):0;
 let expdt = selectedDataValue.expectedReportingDt?Date.parse(selectedDataValue.expectedReportingDt):0;
    
    // this.tstatus =  e.target.value;;
    // if (selectedValue == "OK"  && rptdt == expdt || rptdt < expdt) {
    if (selectedDataValue.ticlStatus == "OK" && rptdt <= expdt && selectedDataValue.reportingDt_1!=''&& this.companyStatus!='R') {
      //if (this.tstatus == "OK") {
      this.incentiveDetails.transDate = selectedDataValue.newTripDate;
      this.incentiveDetails.tripKms = (selectedDataValue.distanceTripKM_1).toString();

      this.commonService.getIncentiveRate(this.incentiveDetails).subscribe((res: Responsemodel) => {
        this.incentiveRate = res.message;
        let ir = 0;

        if (rptdt <= expdt && this.incentiveRate != '') {
          //ir = parseInt(this.incentiveRate) * selectedDataValue.advanceDays_1;
          ir = parseInt(this.incentiveRate)
          this.totalCalculationForTicl(ir);
          this.tstatus = e.target.value;;
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
    } else if ( this.companyStatus =='R'&& selectedDataValue.ticlStatus == "OK" ){
      this.totalCalculationForTicl(1000);
      this.formTripsheet.patchValue({
        // cneeGst:  (this.ExpectedReportingDays).toString() 
        // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
        onTimeIncentiveAmt: "1000"
      });
    } else {
      this.formTripsheet.patchValue({
        // cneeGst:  (this.ExpectedReportingDays).toString() 
        // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
        onTimeIncentiveAmt: "0"
      });
      this.totalCalculationForTicl(0);
      this.tstatus = e.target.value;;

    }
    // this.totalCalculation();

  }
  getPenaltyRateNew() {

    // console.log(e.target.value);
    // var selectedValue = e.target.value;
    var selectedDataValue = this.formTripsheet.getRawValue();
    // if (selectedValue == "OK") {
    this.penaltyDetails.transDate = selectedDataValue.newTripDate;
    //  this.penaltyDetails.tripKms = (selectedDataValue.distanceTripKM_1).toString();

    this.commonService.getPenaltyRateNew(this.penaltyDetails).subscribe((res: PenaltyModel) => {
      this.penaltyNewDetails = res ;
      let ir = 0;
      let ir2 = 0;
      let dd1 = 0;
      let dd2 = 0;
      var totalval = 0;
      var t1 = 0;
      let multi =0;
      let multi2 =0;
      let rptdt = this.commonService.formatDate(selectedDataValue.reportingDt_1)
      let expdt = this.commonService.formatDate(selectedDataValue.expectedReportingDt)
      if (selectedDataValue.delayedDays_1 != '0' && this.penaltyNewDetails.loadPenalty != '' ||selectedDataValue.delayedDays_2 != '0' && this.penaltyNewDetails.loadPenalty != '') {
       // totalval=  selectedDataValue.delayedDays_1+ selectedDataValue.delayedDays_2
       if(selectedDataValue.loadEmptyType ='L'){
      let totalval=0;

        ir = parseInt(this.penaltyNewDetails.emptyPenalty) 
        ir2 = parseInt(this.penaltyNewDetails.loadPenalty) 
      dd2= parseInt(selectedDataValue.delayedDays_2);
      dd1= parseInt(selectedDataValue.delayedDays_1);
        multi = dd1*ir2;

        multi2 =dd2*ir;
        t1 = multi + multi2;

       }else{
       ir = parseInt(this.penaltyNewDetails.emptyPenalty) 
        ir2 = parseInt(this.penaltyNewDetails.loadPenalty) 
      dd2= parseInt(selectedDataValue.delayedDays_2);
      dd1= parseInt(selectedDataValue.delayedDays_1);
        multi = dd1*ir;

        multi2 =dd2*ir;
        t1 = multi + multi2;
        //ir = parseInt(this.penaltyRate)
       }
      }
      else if (selectedDataValue.delayedDays_1 == '0' && selectedDataValue.delayedDays_2 == '0') {
        totalval = 0;
      }
      // ir = parseInt(this.incentiveRate)
      // if (this.tripkmsDetails.status) {
      // if (this.ltsdsl != undefined) {
      this.formTripsheet.patchValue({
        // cneeGst:  (this.ExpectedReportingDays).toString() 
        // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
        penaltyChargedToDr: (t1).toString()
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


    this.totalCalculation();

    });
    //} else {
    // this.formTripsheet.patchValue({
    // cneeGst:  (this.ExpectedReportingDays).toString() 
    // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
    //   onTimeIncentiveAmt: ""
    //    });

    //   }

  }
  getPenaltyRate() {

     // console.log(e.target.value);
    // var selectedValue = e.target.value;
    var selectedDataValue = this.formTripsheet.getRawValue();
    // if (selectedValue == "OK") {
    this.penaltyDetails.transDate = selectedDataValue.newTripDate;
    //  this.penaltyDetails.tripKms = (selectedDataValue.distanceTripKM_1).toString();

    this.commonService.getPenaltyRateNew(this.penaltyDetails).subscribe((res: PenaltyModel) => {
      this.penaltyNewDetails = res ;
      let ir = 0;
      let ir2 = 0;
      let dd1 = 0;
      let dd2 = 0;
      var totalval = 0;
      var t1 = 0;
      let multi =0;
      let multi2 =0;
      let rptdt = this.commonService.formatDate(selectedDataValue.reportingDt_1)
      let expdt = this.commonService.formatDate(selectedDataValue.expectedReportingDt)
      if (selectedDataValue.delayedDays_1 != '0' && this.penaltyNewDetails.loadPenalty != '' ||selectedDataValue.delayedDays_2 != '0' && this.penaltyNewDetails.loadPenalty != '') {
       // totalval=  selectedDataValue.delayedDays_1+ selectedDataValue.delayedDays_2
       if(selectedDataValue.loadEmptyType =='L'|| selectedDataValue.loadType =='L'){
      let totalval=0;

        ir = parseInt(this.penaltyNewDetails.emptyPenalty) 
        ir2 = parseInt(this.penaltyNewDetails.loadPenalty) 
      dd2= parseInt(selectedDataValue.delayedDays_2);
      dd1= parseInt(selectedDataValue.delayedDays_1);
        multi = dd1*ir2;

        multi2 =dd2*ir;
        t1 = multi + multi2;

       }else{
       ir = parseInt(this.penaltyNewDetails.emptyPenalty) 
        ir2 = parseInt(this.penaltyNewDetails.loadPenalty) 
      dd2= parseInt(selectedDataValue.delayedDays_2);
      dd1= parseInt(selectedDataValue.delayedDays_1);
        multi = dd1*ir;

        multi2 =dd2*ir;
        t1 = multi + multi2;
        //ir = parseInt(this.penaltyRate)
       }
      }
      else if (selectedDataValue.delayedDays_1 == '0' && selectedDataValue.delayedDays_2 == '0') {
        totalval = 0;
      }
      // ir = parseInt(this.incentiveRate)
      // if (this.tripkmsDetails.status) {
      // if (this.ltsdsl != undefined) {
      this.formTripsheet.patchValue({
        // cneeGst:  (this.ExpectedReportingDays).toString() 
        // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
        penaltyChargedToDr: (t1).toString()
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


    this.totalCalculation();

    });
    //} else {
    // this.formTripsheet.patchValue({
    // cneeGst:  (this.ExpectedReportingDays).toString() 
    // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
    //   onTimeIncentiveAmt: ""
    //    });

    //   }
    //} else {
    // this.formTripsheet.patchValue({
    // cneeGst:  (this.ExpectedReportingDays).toString() 
    // onTimeIncentiveAmt: parseFloat(this.incentiveRate).toFixed(2).toString()
    //   onTimeIncentiveAmt: ""
    //    });

    //   }
  }
  getBhattaRate() {
    var selectedDataValue = this.formTripsheet.getRawValue();

    this.bhattaDetails.transDate = selectedDataValue.newTripDate;


    this.commonService.getBhattaRate(this.bhattaDetails).subscribe((res: Responsemodel) => {
      this.bhattaRate = res.message;
      let br = 0;
      let bd = 0;
      let ad1 = selectedDataValue.actualDays_1 ? parseInt(selectedDataValue.actualDays_1) : 0;
      let ad2 = selectedDataValue.actualDays_2 ? parseInt(selectedDataValue.actualDays_2) : 0;
      let ad3 = selectedDataValue.detentionDays ? parseInt(selectedDataValue.detentionDays) : 0;
      let ad4 = selectedDataValue.idleDays ? parseInt(selectedDataValue.idleDays) : 0;


      // bd =   parseInt(selectedDataValue.actualDays_1)+  parseInt(selectedDataValue.actualDays_2);
      bd = ad1 + ad2 + ad3 + ad4;
      //bd = ad1 + ad2
      br = parseInt(this.bhattaRate) * bd;
      this.formTripsheet.patchValue({

        allowedBhatta: (br).toString(),
        totalBhattaDays: (bd).toString()
      });
      this.getIncentiveRateByDate();

    });
  }

  changeTripCloseValue(e: any) {
    console.log(e.target.checked);
    var selectedValue = e.target.checked;
    if (selectedValue) {
      // this.formTripPayment.controls['chequeNo'].clearValidators();
      // this.formTripPayment.controls['chequeDate'].clearValidators();
      this.formTripsheet.controls['tripCloseDt'].enable();
      this.formTripsheet.controls['tripCloseDt'].setValidators([Validators.required]);
      // this.formTripsheet.patchValue({
      // chequeDate:  this.loginDate ,


      //  });

    }
    else {
      this.formTripsheet.controls['tripCloseDt'].clearValidators();
    }
    this.formTripsheet.controls['tripCloseDt'].updateValueAndValidity();

  }
  getMultiIncentiveRate() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (selectedDataValue.destination2 != '') {
      this.formTripsheet.patchValue({
        // multiDelIncentiveAmt: 1000
        multiDelIncentiveAmt: '0'
      });
    }
    else if (selectedDataValue.destination3 != '') {
      this.formTripsheet.patchValue({
        //   multiDelIncentiveAmt: 2000
        multiDelIncentiveAmt: '0'
      });


    }
    else {
      this.formTripsheet.patchValue({
        multiDelIncentiveAmt: 0
      });

    }



  }
  getMultiIncentiveRateByLr() {
    var selectedDataValue = this.formTripsheet.getRawValue();
    if (selectedDataValue.destination2 != '') {
      this.formTripsheet.patchValue({
        // multiDelIncentiveAmt: 1000
        multiDelIncentiveAmt: '0'
      });
    }
    else if (selectedDataValue.destination3 != '') {
      this.formTripsheet.patchValue({
        //   multiDelIncentiveAmt: 2000
        multiDelIncentiveAmt: '0'
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
     // this.dslDetails.loadType = "L";
      this.dslDetails.loadType= this.selectedTripSheetDetails.loadEmptyType;
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
            ltsDslToBe_1: '0'
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
    this.totalCal();
  }
  changeToPlace(e: any) {
    this.ivToPlace = e.dataId;
    // this.checkMs();
    this.checkTripkMs();
    
    this.getBhattaRate();
    this.checkDestinationControlStatus();
    this.checkLocation();

    // this.checkTripkMsNext();
    // this.commonDetailUpdate();
  }
  changeDestination2(e: any) {
    this.destinationid2 = e.dataId;
    this.formTripsheet.patchValue({
      destination2: e,

      // destinationid2:'1'
    });
    this.checkTripkMs();
    this.checkTripkMsNext();
    this.getBhattaRate();
    // this.checkTripkMsNext();
    this.checkDestinationControlStatus();
    this.commonDetailUpdate();
  }
  changeDestination3(e: any) {
    this.destinationid3 = e.dataId;
    this.formTripsheet.patchValue({
      destination3: e
    });
    this.checkTripkMs();
    // this.checkTripkMsNext();
    this.checkDestinationControlStatus();
    this.commonDetailUpdate();
  }
  onClearedDestination(e: any) {
    this.ivToPlace = "0"
    this.formTripsheet.patchValue({
    // destination: undefined,
    destination: "",
      distanceTripKM_1: '0',
      distanceTripKM_2: '0',
      expectedReportingDt: '',
      expectedReportingDays: '0',
      advPayable_1:'0',
      ltsDslToBe_1:'0',
      ltsAdblueToBe_1:'0',
      
    
    });
    this.checkDestinationControlStatus();
    this.totalCal();
    
  }
  onClearedFromPlace(e: any) {
   this.ivFromPlace  = '0';
    this.formTripsheet.patchValue({
      distanceTripKM_1: '0',
      advPayable_1:'0',
      ltsDslToBe_1:'0',
      ltsAdblueToBe_1:'0',
      expectedReportingDt: '',
      expectedReportingDays: '0',
    

    });
    this.totalCal();
  }
  onClearedFromPlace2(e: any) {
    this.ivNewFromPlace="0";
    this.formTripsheet.patchValue({
      distanceTripKM_2: '0',
      nextExpectedReportingDt: '',
      nextExpectedReportingDays: '0',
      ltsAdblueToBe_2: '0',
      ltsDslToBe_2: '0',
      advPayable_2: '0',
      reportingDt_2: '',
      actualDays_2: '0',
      advanceDays_2: '0',
      delayedDays_2: '0',
    

    });
    this.totalCal();
    
  }

  onClearedDestination2(e: any) {
    this.destinationid2="0";
    this.formTripsheet.patchValue({
      destination2: undefined,
      distanceTripKM_1: '0',
      distanceTripKM_2: '0'

    });
    this.checkTripkMs();
    this.checkDestinationControlStatus();
  }
  onClearedDestination3(e: any) {
    this.destinationid3= "0";
    this.formTripsheet.patchValue({
      destination3: undefined,
      distanceTripKM_1: '0',
      distanceTripKM_2: '0'
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

  addMiscItem(index: number): void {
    if (this.formMiscArray.value[index].expType != "" && this.formMiscArray.value[index].miscAmount != "") {
      this.formMiscArray.push(this.createMiscArray());
    } else {
      this.toastrService.warning("Please Enter Current record  ");
    }
  }

  removeMiscItem(index: number) {
    this.formMiscArray.removeAt(index);
    this.tripsheetinnergridmodel.miscList.splice(index, 1);
    this.calculateTotal();
    this.totalCalculation();
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

  addAdblueItem(index: number): void {
   // this.formAdblueArray.push(this.createAdblueArray());

    if (this.formAdblueArray.value[index].adbluefillingStation != "" && this.formAdblueArray.value[index].adbluedieselLiter != "") {
      this.formAdblueArray.push(this.createAdblueArray());
    } else {
      this.toastrService.warning("Please Enter Current record  ");
    }
  }

  removeAdblueItem(index: number) {
    this.formAdblueArray.removeAt(index);
    this.tripsheetinnergridmodel.adblueList.splice(index, 1);
    this.calculateTotal();
    this.totalCalculation();
  }

  createAdblueArray() {
    return this.formBuilder.group({
      adbluefillingStation: [''],
      adbluedieselLiter: [''],
      //adbluedieselAmount: ['']
    });
  }
}

