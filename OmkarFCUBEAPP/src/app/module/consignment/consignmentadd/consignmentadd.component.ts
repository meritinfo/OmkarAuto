import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Getkmsmodel } from 'src/app/models/getkmsmodel';

import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Consignmentlistmodel } from 'src/app/models/consignmentlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { UserService } from 'src/app/services/user.service';
import { Ewaybillmodel } from 'src/app/models/ewaybillmodel';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { kmsmodel } from 'src/app/models/kmsmodel';
import { Dslmodel } from 'src/app/models/dslmodel';
import { Adbluetobemodel } from 'src/app/models/adbluetobemodel';
import { GetDslmodel } from 'src/app/models/getdslmodel';
import { Datemodel } from 'src/app/models/datemodel';
import { Gcmodel } from 'src/app/models/gcmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Tripkmsmodel } from 'src/app/models/tripkmsmodel';

@Component({
  selector: 'app-consignmentadd',
  templateUrl: './consignmentadd.component.html',
  styleUrls: ['./consignmentadd.component.css']
})
export class ConsignmentaddComponent implements OnInit {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  transDate: string = '';
  ltsDslToBe: string = '';
  tripOpenBy: string = '';
  adBlueToBe: string = '';
  fromLocation: string = '';
  toLocation: string = '';
  tripKms: string = '';
  kms: string = '';
  gcno: string = '';
  branchid: string = '';
  loginDate: string = '';
  ExpectedReportingDays: number = 0;
  ExpectedReportingDt: string = '';
  DistanceTripKM_1: number = 0;
  

  formConsignment!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  tripkmsDetails = new Tripkmsmodel();
  kmsDetails = new kmsmodel();
  dslDetails = new Dslmodel();
  adBlueDetails = new Adbluetobemodel();
  getdslDetails = new GetDslmodel();
  gcDetails = new Gcmodel();


  dateDetails = new Datemodel();
  maxDate: string = '';
  newDate: string = '';
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  rateList: Dropdownmodel[] = [];
  cnorList: Dropdownmodel[] = [];
  cneeList: Dropdownmodel[] = [];
  lrSeries: Dropdownmodel[] = [];

  vehicleList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  contentList: Dropdownmodel[] = [];
  selectedConsignmentDetails = new Consignmentmodel();
  eWayBillDetails = new Ewaybillmodel();
  keywordLocation = 'dataName';
  ivVehicleNo = '';
  billstation = '';
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  ivFromPlace = '';
  ivToPlace = '';

  constructor(private route: Router, private formBuilder: FormBuilder, private consignmentmodel: Consignmentmodel, private consignmentService: ConsignmentService, private commonService: CommonService, private toasterService: ToastrService, private sharedService: SharedService,private toastrService: ToastrService,private requestmodel:Requestmodel) {
    this.consignmentmodel = new Consignmentmodel();
  }
  ngOnInit(): void {
    this.sharedService.loading = true;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.find((item: { menuList: any; }) => item.menuList).menuList.find((aa: { menuName: string; }) => aa.menuName === "Consignment/LR Entry");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;

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
    ////this.ivVehicleNo = "Hyderabad";

    this.getBranchList();
    this.getRateList();
    this.getContentList();
    this.getLocationList();
    this.getlrSeriesList();
    this.getVehicleNoList();
    this.getBillingPartyList();
    this.selectedConsignmentDetails = this.consignmentService.getConsignmentDetails();
    this.formConsignment = this.formBuilder.group({
      bookingPlace: new FormControl(this.branch, [Validators.required]),
      gcSeries: new FormControl('', [Validators.required]),
      gcAlpha: new FormControl('',),
      gcNoteNo: new FormControl('',),
      gcSlNo: new FormControl('', [Validators.required]),
      bookingDate: new FormControl(this.loginDate, [Validators.required]),
      bookingStatus: new FormControl('TBB', [Validators.required]),
      ewayBillEntryType: new FormControl('A',),
      ewayBillNo: new FormControl('', [Validators.required]),
      ewayBillDate: new FormControl('',),
      ewayBillExpDate: new FormControl('',),
      ewayBillExpExtDate: new FormControl('',),
      fromPlace: new FormControl('',[Validators.required]),
      toPlace: new FormControl('',[Validators.required]),
      toPin: new FormControl('',),
      fromPin: new FormControl('',),
      kms: new FormControl(this.kms,),
      ownTruck: new FormControl('',),
      truckId: new FormControl('',),
      truckNo: new FormControl('',),
      billingParty: new FormControl('',),
      billingBranch: new FormControl('',),
      cnorCode: new FormControl('',),
      cnorGst: new FormControl('',),
      cnorPlantCode: new FormControl('',),
      cnorInvNo: new FormControl('',),
      cnorInvDate: new FormControl('',),
      declaredValue: new FormControl('',),
      cneeCode: new FormControl('',),
      cneeAdd1: new FormControl('',),
      cneeAdd2: new FormControl('',),
      cneeAdd3: new FormControl('',),
      cneeGst: new FormControl('',),
      cneeDealrCode: new FormControl('',),
      contents: new FormControl('',),
      shipmentNo: new FormControl('',),
      shipmentDt: new FormControl('',),
      productId: new FormControl('',),
      productDesc: new FormControl('',),
      noPackages: new FormControl('',),
      actualWt: new FormControl('',),
      chargewt: new FormControl('',),
      rateType: new FormControl('',),
      qtypkgs: new FormControl('',),
      rateRs: new FormControl('0',),
      freightRs: new FormControl('0',),
      statisticalRs: new FormControl('0',),
      handlingRs: new FormControl('0',),
      loadingDetnRs: new FormControl('0',),
      miscRs: new FormControl('0',),
      extrasRS: new FormControl('0',),
      unLoadingRs: new FormControl('0',),
      detentionRs: new FormControl('0',),
      othersRs: new FormControl('0',),
      subTotalRs: new FormControl('0',),
      gtotalRs: new FormControl('0',),
      generalRemarks: new FormControl('',),
      attachedfile: new FormControl('',),
      yearId: new FormControl('',),
      ewayBillNo2: new FormControl('',),
      ewayBillDate2: new FormControl('',),
      ewayBillExpDate2: new FormControl('',),
      cnorInvNo2: new FormControl('',),
      cnorInvDate2: new FormControl('',),
      declaredValue2: new FormControl('',),
      userBranch: new FormControl('',),
      userBranch2: new FormControl('',),
      userBranch3: new FormControl('1',),
    });
    setTimeout(() => {
     // this.sharedService.loading = true;
      this.createmode= true;
      if (this.selectedConsignmentDetails.consignmentID != '') {

        this.formConsignment.patchValue(this.selectedConsignmentDetails);
      
        this.formConsignment.controls['ewayBillNo'].disable();
        this.formConsignment.controls['ewayBillNo2'].disable();
       // this.formConsignment.controls.search2.disable();
        this.formConsignment.controls['bookingPlace'].disable();
        this.formConsignment.controls['gcSeries'].disable();
        this.formConsignment.controls['truckId'].disable();
        this.formConsignment.controls['ewayBillEntryType'].disable();
        this.formConsignment.controls['gcSlNo'].disable();

        var bookingConvertatedDate = this.commonService.formatDate(this.selectedConsignmentDetails.bookingDate);
        var ewayBillDateConverted =  this.commonService.formatDate(this.selectedConsignmentDetails.ewayBillDate);
        var shipmentDtConverted =  this.commonService.formatDate(this.selectedConsignmentDetails.shipmentDt);
        var cnorInvDateConverted =  this.commonService.formatDate(this.selectedConsignmentDetails.cnorInvDate);
        var ewayBillExpDateConverted =  this.commonService.formatDate(this.selectedConsignmentDetails.ewayBillExpDate);
        var ewayBillDateConverted2 =  this.commonService.formatDate(this.selectedConsignmentDetails.ewayBillDate2);
      
        var cnorInvDateConverted2 =  this.commonService.formatDate(this.selectedConsignmentDetails.cnorInvDate2);
        var ewayBillExpDateConverted2 =  this.commonService.formatDate(this.selectedConsignmentDetails.ewayBillExpDate2);
        this.formConsignment.patchValue({
          userBranch: this.selectedConsignmentDetails.bookingPlace,
          bookingDate: bookingConvertatedDate,
        //  ewayBillDate: this.commonService.formatDate(this.selectedConsignmentDetails.ewayBillDate),
         // ewayBillExpDate: this.commonService.formatDate(this.selectedConsignmentDetails.ewayBillExpDate),
          ewayBillDate:ewayBillDateConverted,
         ewayBillExpDate: ewayBillExpDateConverted,
         ewayBillDate2:ewayBillDateConverted2,
         ewayBillExpDate2: ewayBillExpDateConverted2,
          //shipmentDt: this.commonService.formatDate(this.selectedConsignmentDetails.shipmentDt),
         // cnorInvDate: this.commonService.formatDate(this.selectedConsignmentDetails.cnorInvDate),
                shipmentDt:shipmentDtConverted,
          cnorInvDate: cnorInvDateConverted,
          cnorInvDate2: cnorInvDateConverted2,

          fromPlace: this.locationList.find(e => e.dataId == this.selectedConsignmentDetails.fromPlace),
          toPlace: this.locationList.find(e => e.dataId == this.selectedConsignmentDetails.toPlace),
          gcSeries: this.selectedConsignmentDetails.gcSeries,
          truckId: this.vehicleList.find(e => e.dataId == this.selectedConsignmentDetails.truckId),
          billingParty: this.partyList.find(e => e.dataId == this.selectedConsignmentDetails.billingParty),
          

        })
        this.editMode = true;
        this.sharedService.loading = false;
      }
      this.sharedService.loading = false;
    }, 2000);
  
    //this.getGcSeries();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    console.log(this.maxDate);
    //this.ivVehicleNo = 'TS07UF3495';

    this.changeEWay('A');
  }
  
  // convenience getter for easy access to contact form fields
  get f() { return this.formConsignment.controls; }
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  checkBillno() {
    var selectedDataValue = this.formConsignment.getRawValue();
    var d1 = selectedDataValue.ewayBillNo;
    var d2 = selectedDataValue.ewayBillNo2;
    if (d1 > d2) {
      this.formConsignment.patchValue({
        reportingDt_1: ''
      });
      this.toastrService.warning("Eway bill no1 And Eway bill No2  should not be same ");
      return
    }
  }
  consignmentDelete(): void {
    if(this.selectedConsignmentDetails.consignmentID != '' ){
     this.requestmodel.strRequest =this.selectedConsignmentDetails.consignmentID
      if (confirm("Are you sure, you want to delete this?")) {
            this.consignmentService.consignmentDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formConsignment.reset();
            window.location.reload();
        });
      }
    }
  }


  getRateList(): void {
    this.commonService.getRateList().subscribe((res) => {
      this.rateList = res;
    });
  }



  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleNoList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
  getlrSeriesList(): void {
    this.commonService.getlrSeriesList().subscribe((res) => {
      this.lrSeries = res;
    });
  }
  lrSeriesChange(): void {
    var selectedData = this.formConsignment.value.gcSeries;
    this.getGcSeries(selectedData);
  }
  getGcSeries(gcSeries: any): void {
    //this.commonService.getGcSeries().subscribe((res) => {
    // this.gcno = res.dataName;
    // });
    this.gcDetails.gcSlNo = gcSeries;
    this.commonService.getGcSeries(this.gcDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.formConsignment.patchValue({
        gcSlNo: res.message
      });
    });
  }
  getContentList(): void {
    this.commonService.getContentList().subscribe((res) => {
      this.contentList = res;
    });
  }
  getBillingPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
      
    });
  }
  changeFromPlace(e: any) {
    this.ivFromPlace = e.dataId;
    this.checkMs();
    //  this.checkTripkMs();
    //  this.getAdBlueToBe();
    //  this.getDslToBe();
  }
  changeToPlace(e: any) {
    this.ivToPlace = e.dataId;
    this.checkMs();
    //   this.checkTripkMs();
    //  this.getDslToBe();
    //   this.getAdBlueToBe();
  }
  popupClosedToPlace() {
    if (!this.ivToPlace) {
      this.formConsignment.patchValue({
        toPlace: ''
      });
    }
  }
  popupClosedFromPlace() {
    if (!this.ivFromPlace) {
      this.formConsignment.patchValue({
        fromPlace: ''
      });
    }
  }
  popupClosedVehicle() {
    // if(!this.ivVehicleNo){
    //  this.formConsignment.patchValue({
    //     truckId: ''
    //    });
    //  }
    //  this.ivVehicleNo = '';
  }
  popupClosedBilling() {
    if (!this.ivVehicleNo) {
      this.formConsignment.patchValue({
        truckId: ''
      });
    }
    this.ivVehicleNo = '';
  }
  checkDuplicateLr() {


    this.gcDetails.gcSlNo = this.formConsignment.value.gcSlNo;
    this.commonService.checkDuplicateLr(this.gcDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (!this.responseDetails.status) {
        this.toasterService.warning(this.responseDetails.message);
        this.formConsignment.patchValue({
          gcSlNo: ''
        });
      }
    });

  }

  checkMs() {
    if (this.ivFromPlace != "" && this.ivToPlace != "") {
      this.kmsDetails.fromLocation = this.ivFromPlace;
      this.kmsDetails.toLocation = this.ivToPlace;
      this.kmsDetails.transDate = this.formConsignment.value.bookingDate;
      this.commonService.getKms(this.kmsDetails).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.formConsignment.patchValue({
            kms: this.responseDetails.message
          });
        } else {
          this.formConsignment.patchValue({
            kms: ''
          });
        }
      });
    }
    else {
      this.formConsignment.patchValue({
        kms: ''
      });
    }
  }
 
  exit(): void {
    this.route.navigate(['/consignmentlist']);
  }
  checkTripkMs() {
    if (this.ivFromPlace != "" && this.ivToPlace != "") {
      this.kmsDetails.fromLocation = this.ivFromPlace;
      this.kmsDetails.toLocation = this.ivToPlace;
      this.kmsDetails.transDate = this.formConsignment.value.bookingDate;
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        // if (this.tripkmsDetails.status) {
        this.tripKms = this.tripkmsDetails.kms
        this.DistanceTripKM_1 = parseInt(this.tripkmsDetails.kms)
        this.ExpectedReportingDays
          = this.DistanceTripKM_1 / 400
        this.ExpectedReportingDays = Math.round(this.ExpectedReportingDays) + 1
        let date: Date = new Date(this.formConsignment.value.bookingDate);


        date.setDate(date.getDate() + this.ExpectedReportingDays)
        let date2 = (date).toISOString()
        //date2 =this.commonService.formatDate(date2)
        //const myFormattedDate = this.commonService.formatDate(date2);

        this.formConsignment.patchValue({
          // cneeGst:  (this.ExpectedReportingDays).toString() 
          //  cneeGst:  date2.split("T")[0]

        });

      });
    }
    else {
      this.formConsignment.patchValue({
        kms: ''
      });
    }
  }
  getDslToBe() {
    if (this.ivFromPlace != "" && this.ivToPlace != "") {
      this.dslDetails.transDate = this.formConsignment.value.bookingDate;
      this.dslDetails.tripKms = this.tripKms;
      this.dslDetails.loadType = "L";
      this.dslDetails.vehicleMasterId = this.formConsignment.value.truckId.dataId;
      this.commonService.getDslToBe(this.dslDetails).subscribe((res: Responsemodel) => {
        this.ltsDslToBe = res.message;
        // if (this.tripkmsDetails.status) {



        //date2 =this.commonService.formatDate(date2)
        //const myFormattedDate = this.commonService.formatDate(date2);

        this.formConsignment.patchValue({
          // cneeGst:  (this.ExpectedReportingDays).toString() 
          cneeGst: this.ltsDslToBe


        });

      });
    }
    else {
      this.formConsignment.patchValue({
        kms: ''
      });
    }
  }
  getAdBlueToBe() {
    if (this.ivFromPlace != "" && this.ivToPlace != "") {
      this.adBlueDetails.transDate = this.formConsignment.value.bookingDate;
      this.adBlueDetails.tripKms = this.tripKms//this.formConsignment.value.kms;

      this.adBlueDetails.vehicleMasterId = this.formConsignment.value.truckId.dataId;
      this.commonService.getAdBlueToBe(this.adBlueDetails).subscribe((res: Responsemodel) => {
        this.adBlueToBe = res.message;
        // if (this.tripkmsDetails.status) {



        //date2 =this.commonService.formatDate(date2)
        //const myFormattedDate = this.commonService.formatDate(date2);

        this.formConsignment.patchValue({
          // cneeGst:  (this.ExpectedReportingDays).toString() 
          //   cneeGst:   this.adBlueToBe


        });

      });
    }
    else {
      this.formConsignment.patchValue({
        kms: ''
      });
    }
  }
  checkDate() {

    this.dateDetails.bookingDate = this.formConsignment.value.bookingDate;
    this.dateDetails.yearId = this.year;

    this.sharedService.checkBookingdate(this.dateDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {

      }
      else {
        this.toasterService.warning("booking date is invalid");
        return;

      }
    });
  }







  //Submit user form details //
  submitConsignmentForm(): void {

    this.formSubmitted = true;
    if (this.formConsignment.invalid) {
      this.toasterService.warning("Mandatory fields is required");
      return;
    }

    this.dateDetails.bookingDate = this.formConsignment.value.bookingDate;
    this.dateDetails.yearId = this.year;

    this.sharedService.checkBookingdate(this.dateDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {

        var selectedDataValue = this.formConsignment.getRawValue();

        this.consignmentmodel.consignmentID = this.selectedConsignmentDetails.consignmentID != '' ? this.selectedConsignmentDetails.consignmentID : '';
        this.consignmentmodel.bookingPlace = selectedDataValue.bookingPlace;
        this.consignmentmodel.gcSlNo = selectedDataValue.gcSlNo
        this.consignmentmodel.gcSeries = selectedDataValue.gcSeries;
        this.consignmentmodel.gcNoteNo = selectedDataValue.gcSeries + selectedDataValue.gcSlNo;
        this.consignmentmodel.bookingStatus = selectedDataValue.bookingStatus;
        this.consignmentmodel.bookingDate = selectedDataValue.bookingDate;
        this.consignmentmodel.ewayBillEntryType = selectedDataValue.ewayBillEntryType;
        this.consignmentmodel.ewayBillNo = selectedDataValue.ewayBillNo;
        this.consignmentmodel.ewayBillDate = selectedDataValue.ewayBillDate;
        this.consignmentmodel.ewayBillExpDate = selectedDataValue.ewayBillExpDate;
        this.consignmentmodel.fromPlace = selectedDataValue.fromPlace.dataId;
        this.consignmentmodel.toPlace = selectedDataValue.toPlace.dataId;
        this.consignmentmodel.kms = selectedDataValue.kms;
        this.consignmentmodel.ownTruck = selectedDataValue.ownTruck;
        this.consignmentmodel.truckId = selectedDataValue.truckId.dataId;
        this.consignmentmodel.truckNo = selectedDataValue.truckNo;
        this.consignmentmodel.billingParty = selectedDataValue.billingParty.dataId;
        this.consignmentmodel.billingBranch = selectedDataValue.userBranch3;
        this.consignmentmodel.cnorCode = selectedDataValue.cnorCode;
        this.consignmentmodel.cnorGst = selectedDataValue.cnorGst;
        this.consignmentmodel.cnorPlantCode = selectedDataValue.cnorPlantCode;
        this.consignmentmodel.cnorInvNo = selectedDataValue.cnorInvNo;
        this.consignmentmodel.cnorInvDate = selectedDataValue.cnorInvDate;
        this.consignmentmodel.declaredValue = selectedDataValue.declaredValue;
        this.consignmentmodel.cneeCode = selectedDataValue.cneeCode;
        this.consignmentmodel.cneeAdd1 = selectedDataValue.cneeAdd1;
        this.consignmentmodel.cneeAdd2 = selectedDataValue.cneeAdd2;
        this.consignmentmodel.cneeAdd3 = selectedDataValue.cneeAdd3;
        this.consignmentmodel.cneeGst = selectedDataValue.cneeGst;
        this.consignmentmodel.cneeDealrCode = selectedDataValue.cneeDealrCode;
        this.consignmentmodel.shipmentNo = selectedDataValue.shipmentNo;
        this.consignmentmodel.shipmentDt = selectedDataValue.shipmentDt;
        this.consignmentmodel.productId = selectedDataValue.productId;
        this.consignmentmodel.productDesc = selectedDataValue.productDesc;

        this.consignmentmodel.noPackages = selectedDataValue.noPackages;
        this.consignmentmodel.fromPin = selectedDataValue.fromPin;
        this.consignmentmodel.toPin = selectedDataValue.toPin;
        this.consignmentmodel.actualWt = selectedDataValue.actualWt;
        this.consignmentmodel.chargewt = selectedDataValue.chargewt;
        this.consignmentmodel.rateRs = selectedDataValue.rateRs ? selectedDataValue.rateRs : "0";
        this.consignmentmodel.freightRs = selectedDataValue.freightRs ? selectedDataValue.freightRs : "0";
        this.consignmentmodel.statisticalRs = selectedDataValue.statisticalRs ? selectedDataValue.statisticalRs : "0";
        this.consignmentmodel.handlingRs = selectedDataValue.handlingRs ? selectedDataValue.handlingRs : "0";
        this.consignmentmodel.loadingDetnRs = selectedDataValue.loadingDetnRs ? selectedDataValue.loadingDetnRs : "0";
        this.consignmentmodel.miscRs = selectedDataValue.miscRs ? selectedDataValue.miscRs : "0";
        this.consignmentmodel.extrasRS = selectedDataValue.extrasRS ? selectedDataValue.extrasRS : "0";
        this.consignmentmodel.unLoadingRs = selectedDataValue.unLoadingRs ? selectedDataValue.unLoadingRs : "0";
        this.consignmentmodel.detentionRs = selectedDataValue.detentionRs ? selectedDataValue.detentionRs : "0";
        this.consignmentmodel.othersRs = selectedDataValue.othersRs ? selectedDataValue.othersRs : "0";
        this.consignmentmodel.subTotalRs = selectedDataValue.rateRs ? selectedDataValue.rateRs : "0";
        this.consignmentmodel.subTotalRs = selectedDataValue.subTotalRs ? selectedDataValue.subTotalRs : "0";
        this.consignmentmodel.generalRemarks = selectedDataValue.generalRemarks;
        this.consignmentmodel.attachedfile = selectedDataValue.attachedfile;

        this.consignmentmodel.handlingRs = selectedDataValue.handlingRs;


        this.consignmentmodel.loadingDetnRs = selectedDataValue.loadingDetnRs;

        this.consignmentmodel.miscRs = selectedDataValue.miscRs;
        this.consignmentmodel.extrasRS = selectedDataValue.extrasRS;
        this.consignmentmodel.unLoadingRs = selectedDataValue.unLoadingRs;
        this.consignmentmodel.detentionRs = selectedDataValue.detentionRs;


        this.consignmentmodel.subTotalRs = selectedDataValue.subTotalRs.toString();


        this.consignmentmodel.gtotalRs = selectedDataValue.gtotalRs.toString();
        this.consignmentmodel.rateRs = selectedDataValue.rateRs;
        this.consignmentmodel.rateType = selectedDataValue.rateType;
        this.consignmentmodel.generalRemarks = selectedDataValue.generalRemarks;
        this.consignmentmodel.yearId = this.year;
        this.consignmentmodel.ewayBillNo2 = selectedDataValue.ewayBillNo2;
        this.consignmentmodel.ewayBillDate2 = selectedDataValue.ewayBillDate2;
        this.consignmentmodel.ewayBillExpDate2 = selectedDataValue.ewayBillExpDate2;
        this.consignmentmodel.cnorInvNo2 = selectedDataValue.cnorInvNo2;
        this.consignmentmodel.cnorInvDate2 = selectedDataValue.cnorInvDate2;
        this.consignmentmodel.declaredValue2 = selectedDataValue.declaredValue2;

        this.consignmentmodel.loggedInUser = this.loggedInUserID;
        //this.consignmentmodel.tripOpenBy = this.loggedInUserID;


        this.consignmentService.consignmentDetailsSubmitted(this.consignmentmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          this.toasterService.success(this.responseDetails.message);
          this.formConsignment.reset();
          this.route.navigate(['/consignmentlist']);
         // window.location.reload();
        });

      } else {
        this.toasterService.warning("booking date is invalid");
        return;

      }
    });
  }

  searchGSTDetails(): void {
    var payload = { 'eWayBillNumber': this.formConsignment.value.ewayBillNo }

    this.commonService.billDetails(payload).subscribe((res: any) => {
      var result = res.result;
      if (result.code === 200) {
        this.eWayBillDetails.result = result;

        var ewayVNo = this.eWayBillDetails.result.message.vehiclListDetails[0].vehicle_number;
        var selectedVehicleID = this.vehicleList.find(e => e.dataName == ewayVNo);
        if (selectedVehicleID) {
          //this.ivVehicleNo = ewayVNo;
        } else {
          this.ivVehicleNo = "";
        }

        this.formConsignment.patchValue({
          ewayBillDate: this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_date),
          ewayBillExpDate: this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_valid_date),
          fromPin: this.eWayBillDetails.result.message.pincode_of_consignor.toString(),
          toPin: this.eWayBillDetails.result.message.pincode_of_consignee.toString(),
          cnorCode: this.eWayBillDetails.result.message.legal_name_of_consignor,
          cneeCode: this.eWayBillDetails.result.message.legal_name_of_consignee,
          kms: this.eWayBillDetails.result.message.transportation_distance.toString(),
          consigneeAddress: this.eWayBillDetails.result.message.address1_of_consignee + this.eWayBillDetails.result.message.address2_of_consignee,
          cneeAdd1: this.eWayBillDetails.result.message.address1_of_consignee,
          cneeAdd2: this.eWayBillDetails.result.message.address2_of_consignor,
          cneeAdd3: this.eWayBillDetails.result.message.place_of_consignee,
          invoiceDate: this.eWayBillDetails.result.message.document_date,
          cnorInvDate: this.commonService.formatDate(this.eWayBillDetails.result.message.document_date),
          cnorInvNo: this.eWayBillDetails.result.message.document_number,
          cnorGst: this.eWayBillDetails.result.message.gstin_of_consignor,
          cneeGst: this.eWayBillDetails.result.message.gstin_of_consignee,
          noPackages: this.eWayBillDetails.result.message.itemList[0].quantity.toString(),
          //  fromPlace: this.eWayBillDetails.result.message.place_of_consignor,
          // toPlace: this.eWayBillDetails.result.message.place_of_consignee,
          truckId: selectedVehicleID ? selectedVehicleID : "",



          //consigneePinCode: this.eWayBillDetails.result.message.pincode_of_consignee,
          declaredValue: this.eWayBillDetails.result.message.total_invoice_value.toString(),
          //vehicleNumber: this.eWayBillDetails.result.message.vehiclListDetails[0].vehicle_number,
        });
        //this.ivVehicleNo = this.eWayBillDetails.result.message.vehiclListDetails[0].vehicle_number;
      }
    });
  }
  searchGSTDetails2(): void {
    var selectedDataValue = this.formConsignment.getRawValue();
    var d1 = selectedDataValue.ewayBillNo;
    var d2 = selectedDataValue.ewayBillNo2;
    if (d1 == d2) {
      this.formConsignment.patchValue({
        ewayBillNo2: ''
      });
      this.toastrService.warning("Eway bill no1 And Eway bill No2  should not be same ");
      return
    }
    else{
    var payload = { 'eWayBillNumber': this.formConsignment.value.ewayBillNo2 }

    this.commonService.billDetails(payload).subscribe((res: any) => {
      var result = res.result;
      if (result.code === 200) {
        this.eWayBillDetails.result = result;

        var ewayVNo = this.eWayBillDetails.result.message.vehiclListDetails[0].vehicle_number;
        var selectedVehicleID = this.vehicleList.find(e => e.dataName == ewayVNo);
        if (selectedVehicleID) {
          //this.ivVehicleNo = ewayVNo;
        } else {
          this.ivVehicleNo = "";
        }

        this.formConsignment.patchValue({
          ewayBillDate2: this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_date),
          ewayBillExpDate2: this.commonService.formatDate(this.eWayBillDetails.result.message.eway_bill_valid_date),
       

  
        //  invoiceDate: this.eWayBillDetails.result.message.document_date,
          cnorInvDate2: this.commonService.formatDate(this.eWayBillDetails.result.message.document_date),
          cnorInvNo2: this.eWayBillDetails.result.message.document_number,


        


          //consigneePinCode: this.eWayBillDetails.result.message.pincode_of_consignee,
          declaredValue2: this.eWayBillDetails.result.message.total_invoice_value.toString(),
          //vehicleNumber: this.eWayBillDetails.result.message.vehiclListDetails[0].vehicle_number,
        });
        //this.ivVehicleNo = this.eWayBillDetails.result.message.vehiclListDetails[0].vehicle_number;
      }
    });
  }
  }
  checkInvoiceDate() {




  }
  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearchFromPlace(search: string) {
    this.ivFromPlace = '';
  }

  onChangeSearchToPlace(search: string) {
    this.ivToPlace = '';
  }

  onChangeSearch(search: string) {
    this.ivToPlace = '';
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (partyList: Dropdownmodel[], query: string): any[] {
    return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  changeEWay(selectedValue: string) {
    if (selectedValue === "A") {
      //Remove field validation
      this.formConsignment.controls['fromPlace'].clearValidators();
      this.formConsignment.controls['fromPin'].clearValidators();
      this.formConsignment.controls['toPlace'].clearValidators();
      this.formConsignment.controls['toPin'].clearValidators();
      this.formConsignment.controls['cnorCode'].clearValidators();
      this.formConsignment.controls['cneeCode'].clearValidators();
      this.formConsignment.controls['productId'].clearValidators();
      this.formConsignment.controls['rateType'].clearValidators();
      this.formConsignment.controls['userBranch3'].clearValidators();
      this.formConsignment.controls['billingParty'].clearValidators();
      this.formConsignment.controls['declaredValue'].clearValidators();
      this.formConsignment.controls['cnorInvDate'].clearValidators();
      //required

      this.formConsignment.controls['billingParty'].setValidators([Validators.required]);
      this.formConsignment.controls['truckId'].setValidators([Validators.required]);
      this.formConsignment.controls['fromPlace'].setValidators([Validators.required]);
      this.formConsignment.controls['toPlace'].setValidators([Validators.required]);
     // this.formConsignment.controls['fromPin'].setValidators([Validators.required]);
      this.formConsignment.controls['productId'].setValidators([Validators.required]);
      this.formConsignment.controls['rateType'].setValidators([Validators.required]);
      //Disable field


      this.formConsignment.controls['cnorCode'].disable();
      this.formConsignment.controls['cneeCode'].disable();
      this.formConsignment.controls['fromPin'].disable();
      this.formConsignment.controls['toPin'].disable();
      this.formConsignment.controls['kms'].disable();
      this.formConsignment.controls['ewayBillDate'].disable();
      this.formConsignment.controls['ewayBillExpDate'].disable();
      this.formConsignment.controls['ewayBillDate2'].disable();
      this.formConsignment.controls['ewayBillExpDate2'].disable();
      // this.formConsignment.controls['ewayBillNo'].disable();
      //  this.formConsignment.controls['fromPlace'].disable();
      //  this.formConsignment.controls['toPlace'].disable();
      //   this.formConsignment.controls['truckId'].disable();

      this.formConsignment.controls['billingBranch'].disable();
      this.formConsignment.controls['userBranch3'].disable();
      //   this.formConsignment.controls['billingParty'].disable();
      this.formConsignment.controls['cneeAdd1'].disable();
      this.formConsignment.controls['cneeAdd2'].disable();
      this.formConsignment.controls['cneeAdd3'].disable();
      this.formConsignment.controls['cnorGst'].disable();
      this.formConsignment.controls['cneeGst'].disable();
      this.formConsignment.controls['declaredValue'].disable();
      this.formConsignment.controls['cnorInvDate'].disable();
      this.formConsignment.controls['declaredValue2'].disable();
      this.formConsignment.controls['cnorInvDate2'].disable();


      this.formConsignment.controls['noPackages'].disable();
    }
    if (selectedValue === "M" || selectedValue === "E") {
      //Add field validation
      this.formConsignment.controls['fromPlace'].setValidators([Validators.required]);
      this.formConsignment.controls['fromPin'].setValidators([Validators.required]);
      this.formConsignment.controls['toPlace'].setValidators([Validators.required]);
      this.formConsignment.controls['toPin'].setValidators([Validators.required]);
      this.formConsignment.controls['ewayBillNo'].setValidators([Validators.required]);
      this.formConsignment.controls['ewayBillNo'].setValidators([Validators.required]);
      this.formConsignment.controls['cnorCode'].setValidators([Validators.required]);
      this.formConsignment.controls['cneeCode'].setValidators([Validators.required]);
      this.formConsignment.controls['cneeGst'].setValidators([Validators.required]);
      this.formConsignment.controls['cnorGst'].setValidators([Validators.required]);
      this.formConsignment.controls['cnorInvNo'].setValidators([Validators.required]);
      this.formConsignment.controls['declaredValue'].setValidators([Validators.required]);
      this.formConsignment.controls['productId'].setValidators([Validators.required]);
      this.formConsignment.controls['rateType'].setValidators([Validators.required]);
      this.formConsignment.controls['userBranch3'].setValidators([Validators.required]);
      this.formConsignment.controls['billingParty'].setValidators([Validators.required]);
      this.formConsignment.controls['ewayBillNo'].setValidators([Validators.required]);
      this.formConsignment.controls['truckId'].setValidators([Validators.required]);
      this.formConsignment.controls['noPackages'].setValidators([Validators.required]);
      //Enable field

      this.formConsignment.controls['fromPlace'].enable();
      this.formConsignment.controls['toPlace'].enable();
      this.formConsignment.controls['cnorCode'].enable();
      this.formConsignment.controls['cneeCode'].enable();
      this.formConsignment.controls['fromPin'].enable();
      this.formConsignment.controls['toPin'].enable();
      this.formConsignment.controls['kms'].enable();
      this.formConsignment.controls['ewayBillDate'].enable();
      this.formConsignment.controls['ewayBillExpDate'].enable();
      this.formConsignment.controls['ewayBillNo2'].enable();
      this.formConsignment.controls['ewayBillDate2'].enable();
      this.formConsignment.controls['ewayBillExpDate2'].enable();
      this.formConsignment.controls['ewayBillNo'].enable();
      this.formConsignment.controls['cneeAdd1'].enable();
      this.formConsignment.controls['cneeAdd2'].enable();
      this.formConsignment.controls['cneeAdd3'].enable();



      this.formConsignment.controls['truckId'].enable();
      this.formConsignment.controls['billingBranch'].enable();
      this.formConsignment.controls['userBranch3'].enable();
      this.formConsignment.controls['billingParty'].enable();
      this.formConsignment.controls['cneeAdd1'].enable();
      this.formConsignment.controls['cneeAdd2'].enable();
      this.formConsignment.controls['cneeAdd3'].enable();
      this.formConsignment.controls['cnorGst'].enable();
      this.formConsignment.controls['cneeGst'].enable();
      this.formConsignment.controls['declaredValue'].enable();
      this.formConsignment.controls['cnorInvDate'].enable();
      this.formConsignment.controls['declaredValue2'].enable();
      this.formConsignment.controls['cnorInvDate2'].enable();


      this.formConsignment.controls['noPackages'].enable();

    }

    this.formConsignment.controls['fromPlace'].updateValueAndValidity();
    this.formConsignment.controls['fromPin'].updateValueAndValidity();
    this.formConsignment.controls['toPlace'].updateValueAndValidity();
    this.formConsignment.controls['toPin'].updateValueAndValidity();
    this.formConsignment.controls['cnorCode'].updateValueAndValidity();
    this.formConsignment.controls['cneeCode'].updateValueAndValidity();
    this.formConsignment.controls['productId'].updateValueAndValidity();
    this.formConsignment.controls['rateType'].updateValueAndValidity();
    this.formConsignment.controls['userBranch3'].updateValueAndValidity();
    this.formConsignment.controls['billingParty'].updateValueAndValidity();
    this.formConsignment.controls['cnorInvDate'].updateValueAndValidity();
    this.formConsignment.controls['cnorInvNo'].updateValueAndValidity();
    this.formConsignment.controls['declaredValue'].updateValueAndValidity();
    this.formConsignment.controls['truckId'].updateValueAndValidity();
    this.formConsignment.controls['cneeGst'].updateValueAndValidity();
    this.formConsignment.controls['cnorGst'].updateValueAndValidity();
    this.formConsignment.controls['ewayBillNo'].updateValueAndValidity();

  }


  calculateTotalAmount() {
    let total = 0;

    var freightRs = this.formConsignment.value.freightRs ? parseFloat(this.formConsignment.value.freightRs) : 0;
    var statisticalRs = this.formConsignment.value.statisticalRs ? parseFloat(this.formConsignment.value.statisticalRs) : 0;
    var handlingRs = this.formConsignment.value.handlingRs ? parseFloat(this.formConsignment.value.handlingRs) : 0;
    var loadingDetnRs = this.formConsignment.value.loadingDetnRs ? parseFloat(this.formConsignment.value.loadingDetnRs) : 0;
    var extrasRS = this.formConsignment.value.extrasRS ? parseFloat(this.formConsignment.value.extrasRS) : 0;
    var miscRs = this.formConsignment.value.miscRs ? parseFloat(this.formConsignment.value.miscRs) : 0;
    var unLoadingRs = this.formConsignment.value.unLoadingRs ? parseFloat(this.formConsignment.value.unLoadingRs) : 0;
    var detentionRs = this.formConsignment.value.detentionRs ? parseFloat(this.formConsignment.value.detentionRs) : 0;
    var othersRs = this.formConsignment.value.othersRs ? parseFloat(this.formConsignment.value.othersRs) : 0;
    var subTotalRs = this.formConsignment.value.subTotalRs ? parseFloat(this.formConsignment.value.subTotalRs) : 0;
    var gtotalRs = this.formConsignment.value.gtotalRs ? parseFloat(this.formConsignment.value.gtotalRs) : 0;

    total = freightRs + statisticalRs + handlingRs + loadingDetnRs + extrasRS + miscRs + unLoadingRs + detentionRs + othersRs;

    this.formConsignment.patchValue({
      subTotalRs: total,
      gtotalRs: total,
    })
  }

  selectFromPlaceEvent(item: any) {
    console.log(item);
    // do something with selected item
  }

}