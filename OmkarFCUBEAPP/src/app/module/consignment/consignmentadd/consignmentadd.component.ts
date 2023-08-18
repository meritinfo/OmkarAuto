import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Consignmentlistmodel } from 'src/app/models/consignmentlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { UserService } from 'src/app/services/user.service';
import { Ewaybillmodel } from 'src/app/models/ewaybillmodel';
import { formatDate } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consignmentadd',
  templateUrl: './consignmentadd.component.html',
  styleUrls: ['./consignmentadd.component.css']
})
export class ConsignmentaddComponent implements OnInit {
  loggedInUserID: string = '';
  year: string = '';
  formConsignment!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
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
  

  constructor(private route: Router, private formBuilder: FormBuilder, private consignmentmodel: Consignmentmodel, private consignmentService: ConsignmentService, private commonService: CommonService, private toasterService: ToastrService) {
    this.consignmentmodel = new Consignmentmodel();
  }
  ngOnInit(): void {
    var yearIDData = localStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
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
    this.ivVehicleNo ="Hyderabad";
    this.getBranchList();
    this.getRateList();
    this.getContentList();
    this.getLocationList();
    this.getlrSeriesList();
    this.getVehicleNoList();
    this.getBillingPartyList();
    this.selectedConsignmentDetails = this.consignmentService.getConsignmentDetails();
    this.formConsignment = this.formBuilder.group({
      bookingPlace: new FormControl('', [Validators.required]),
      gcSeries: new FormControl('', [Validators.required]),
      gcAlpha: new FormControl('',),
      gcNoteNo: new FormControl('',),
      gcSlNo: new FormControl('', [Validators.required]),
      bookingDate: new FormControl('', [Validators.required]),
      bookingStatus: new FormControl('', [Validators.required]),
      ewayBillEntryType: new FormControl('A',),
      ewayBillNo: new FormControl('',),
      ewayBillDate: new FormControl('',),
      ewayBillExpDate: new FormControl('',),
      ewayBillExpExtDate: new FormControl('',),
      fromPlace: new FormControl('',),
      toPlace: new FormControl('',),
      toPin: new FormControl('',),
      fromPin: new FormControl('',),
      kms: new FormControl('',),
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
      userBranch: new FormControl('',),
      userBranch2: new FormControl('',),
      userBranch3: new FormControl('',),
    });
    if (this.selectedConsignmentDetails.consignmentID != '') {
      this.formConsignment.patchValue(this.selectedConsignmentDetails);
   this.formConsignment.controls['bookingPlace'].disable();
   this.formConsignment.controls['gcSeries'].disable();
   this.formConsignment.controls['truckId'].disable();
      this.formConsignment.patchValue({
        userBranch: this.selectedConsignmentDetails.bookingPlace,
        fromPlace: this.selectedConsignmentDetails.fromPlace,
        toPlace: this.selectedConsignmentDetails.toPlace,
        gcSeries: this.selectedConsignmentDetails.gcSeries,
     
      })
    }

    //this.ivVehicleNo = 'TS07UF3495';

  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formConsignment.controls; }
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
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


  //Submit user form details //
  submitConsignmentForm(): void {
    this.formSubmitted = true;
    if (this.formConsignment.invalid) {
      this.toasterService.warning("Mandatory fields is required");
      return;
    }
    this.consignmentmodel.consignmentID = this.selectedConsignmentDetails.consignmentID != '' ? this.selectedConsignmentDetails.consignmentID : '';
    this.consignmentmodel.bookingPlace = this.formConsignment.value.bookingPlace;
    this.consignmentmodel.gcSlNo = this.formConsignment.value.gcSlNo;
    this.consignmentmodel.gcSeries = this.formConsignment.value.gcSeries;
    this.consignmentmodel.gcNoteNo = this.formConsignment.value.gcSeries;
    this.consignmentmodel.bookingStatus = this.formConsignment.value.bookingStatus;
    this.consignmentmodel.bookingDate = this.formConsignment.value.bookingDate;
    this.consignmentmodel.ewayBillEntryType = this.formConsignment.value.ewayBillEntryType;
    this.consignmentmodel.ewayBillNo = this.formConsignment.value.ewayBillNo;
    this.consignmentmodel.ewayBillDate = this.formConsignment.value.ewayBillDate;
    this.consignmentmodel.ewayBillExpDate = this.formConsignment.value.ewayBillExpDate;
    this.consignmentmodel.fromPlace = this.formConsignment.value.fromPlace.dataId;
    this.consignmentmodel.kms = this.formConsignment.value.kms;
    this.consignmentmodel.ownTruck = this.formConsignment.value.ownTruck;
    this.consignmentmodel.truckId = this.formConsignment.value.truckId.dataId;
    this.consignmentmodel.truckNo = this.formConsignment.value.truckNo;
    this.consignmentmodel.billingParty = this.formConsignment.value.billingParty.dataId;
    this.consignmentmodel.billingBranch = this.formConsignment.value.billingBranch;
    this.consignmentmodel.cnorCode = this.formConsignment.value.cnorCode;
    this.consignmentmodel.cnorGst = this.formConsignment.value.cnorGst;
    this.consignmentmodel.cnorPlantCode = this.formConsignment.value.cnorPlantCode;
    this.consignmentmodel.cnorInvNo = this.formConsignment.value.cnorInvNo;
    this.consignmentmodel.cnorInvDate = this.formConsignment.value.cnorInvDate;
    this.consignmentmodel.declaredValue = this.formConsignment.value.declaredValue;
    this.consignmentmodel.cneeCode = this.formConsignment.value.cneeCode;
    this.consignmentmodel.cneeAdd1 = this.formConsignment.value.cneeAdd1;
    this.consignmentmodel.cneeAdd2 = this.formConsignment.value.cneeAdd2;
    this.consignmentmodel.cneeAdd3 = this.formConsignment.value.cneeAdd3;
    this.consignmentmodel.cneeGst = this.formConsignment.value.cneeGst;
    this.consignmentmodel.cneeDealrCode = this.formConsignment.value.cneeDealrCode;
    this.consignmentmodel.shipmentNo = this.formConsignment.value.shipmentNo;
    this.consignmentmodel.shipmentDt = this.formConsignment.value.shipmentDt;
    this.consignmentmodel.productId = this.formConsignment.value.productId;
    this.consignmentmodel.productDesc = this.formConsignment.value.productDesc;

    this.consignmentmodel.noPackages = this.formConsignment.value.noPackages;
    this.consignmentmodel.fromPin = this.formConsignment.value.fromPin;
    this.consignmentmodel.toPin = this.formConsignment.value.toPin;
    this.consignmentmodel.actualWt = this.formConsignment.value.actualWt;
    this.consignmentmodel.chargewt = this.formConsignment.value.chargewt;
    this.consignmentmodel.rateRs = this.formConsignment.value.rateRs ? this.formConsignment.value.rateRs : "0";
    this.consignmentmodel.freightRs = this.formConsignment.value.freightRs ? this.formConsignment.value.freightRs : "0";
    this.consignmentmodel.statisticalRs = this.formConsignment.value.statisticalRs ? this.formConsignment.value.statisticalRs : "0";
    this.consignmentmodel.handlingRs = this.formConsignment.value.handlingRs ? this.formConsignment.value.handlingRs : "0";
    this.consignmentmodel.loadingDetnRs = this.formConsignment.value.loadingDetnRs ? this.formConsignment.value.loadingDetnRs : "0";
    this.consignmentmodel.miscRs = this.formConsignment.value.miscRs ? this.formConsignment.value.miscRs : "0";
    this.consignmentmodel.extrasRS = this.formConsignment.value.extrasRS ? this.formConsignment.value.extrasRS : "0";
    this.consignmentmodel.unLoadingRs = this.formConsignment.value.unLoadingRs ? this.formConsignment.value.unLoadingRs : "0";
    this.consignmentmodel.detentionRs = this.formConsignment.value.detentionRs ? this.formConsignment.value.detentionRs : "0";
    this.consignmentmodel.othersRs = this.formConsignment.value.othersRs ? this.formConsignment.value.othersRs : "0";
    this.consignmentmodel.subTotalRs = this.formConsignment.value.rateRs ? this.formConsignment.value.rateRs : "0";
    this.consignmentmodel.subTotalRs = this.formConsignment.value.subTotalRs ? this.formConsignment.value.subTotalRs : "0";
    this.consignmentmodel.generalRemarks = this.formConsignment.value.generalRemarks;
    this.consignmentmodel.attachedfile = this.formConsignment.value.attachedfile;

    this.consignmentmodel.handlingRs = this.formConsignment.value.handlingRs;


    this.consignmentmodel.loadingDetnRs = this.formConsignment.value.loadingDetnRs;

    this.consignmentmodel.miscRs = this.formConsignment.value.miscRs;
    this.consignmentmodel.extrasRS = this.formConsignment.value.extrasRS;
    this.consignmentmodel.unLoadingRs = this.formConsignment.value.unLoadingRs;
    this.consignmentmodel.detentionRs = this.formConsignment.value.detentionRs;


    this.consignmentmodel.subTotalRs = this.formConsignment.value.subTotalRs;


    this.consignmentmodel.gtotalRs = this.formConsignment.value.gtotalRs;
    this.consignmentmodel.generalRemarks = this.formConsignment.value.generalRemarks;
    this.consignmentmodel.yearId = this.year;
    this.consignmentmodel.loggedInUser = this.loggedInUserID;


    this.consignmentService.consignmentDetailsSubmitted(this.consignmentmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formConsignment.reset();
      window.location.reload();
    });
  }

  searchGSTDetails(): void {
    var payload = { 'eWayBillNumber': this.formConsignment.value.ewayBillNo }

    this.commonService.billDetails(payload).subscribe((res: any) => {
      var result = res.result;
      if (result.code === 200) {
        this.eWayBillDetails.result = result;
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
          cneeAdd2: this.eWayBillDetails.result.message.address1_of_consignee,
          cneeAdd3: this.eWayBillDetails.result.message.place_of_consignee,
          invoiceDate: this.eWayBillDetails.result.message.document_date,
          cnorInvDate: this.commonService.formatDate(this.eWayBillDetails.result.message.document_date),
          cnorInvNo: this.eWayBillDetails.result.message.document_number,
          cnorGst: this.eWayBillDetails.result.message.gstin_of_consignor,
          fromPlace: this.eWayBillDetails.result.message.place_of_consignor,
          toPlace: this.eWayBillDetails.result.message.place_of_consignee,
          //vehicleNumber:this.eWayBillDetails.result.VehiclListDetail.vehicle_number,
        


          consigneePinCode: this.eWayBillDetails.result.message.pincode_of_consignee,
          invoiceValue: this.eWayBillDetails.result.message.total_invoice_value,
          vehicleNumber: this.eWayBillDetails.result.message.vehiclListDetails[0].vehicle_number,
        });
        //this.ivVehicleNo = this.eWayBillDetails.result.message.vehiclListDetails[0].vehicle_number;
      }
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

  startWithFilter = function (partyList: Dropdownmodel[], query: string): any[] {
    return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  changeEWay(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    if (selectedValue === "A") {
      //Remove field validation
      this.formConsignment.controls['fromPlace'].clearValidators();
      this.formConsignment.controls['fromPin'].clearValidators();
      this.formConsignment.controls['toPlace'].clearValidators();
      this.formConsignment.controls['toPin'].clearValidators();
      this.formConsignment.controls['cnorCode'].clearValidators();
      this.formConsignment.controls['cneeCode'].clearValidators();
      this.formConsignment.controls['productId'].clearValidators();
      this.formConsignment.controls['rateRs'].clearValidators();
      this.formConsignment.controls['userBranch3'].clearValidators();
      this.formConsignment.controls['billingParty'].clearValidators();
      this.formConsignment.controls['declaredValue'].clearValidators();
      this.formConsignment.controls['cnorInvDate'].clearValidators();
      //Disable field

   
      this.formConsignment.controls['cnorCode'].disable();
      this.formConsignment.controls['cneeCode'].disable();
      this.formConsignment.controls['fromPin'].disable();
      this.formConsignment.controls['toPin'].disable();
      this.formConsignment.controls['kms'].disable();
      this.formConsignment.controls['ewayBillDate'].disable();
      this.formConsignment.controls['ewayBillExpDate'].disable();
     // this.formConsignment.controls['ewayBillNo'].disable();
      this.formConsignment.controls['fromPlace'].disable();
      this.formConsignment.controls['toPlace'].disable();
      this.formConsignment.controls['truckId'].disable();
      this.formConsignment.controls['billingBranch'].disable();
      this.formConsignment.controls['userBranch3'].disable();
      this.formConsignment.controls['billingParty'].disable();
      this.formConsignment.controls['cneeAdd1'].disable();
      this.formConsignment.controls['cneeAdd2'].disable();
      this.formConsignment.controls['cneeAdd3'].disable();
      this.formConsignment.controls['cnorGst'].disable();
      this.formConsignment.controls['cneeGst'].disable();
      this.formConsignment.controls['declaredValue'].disable();
      this.formConsignment.controls['cnorInvDate'].disable();

      this.formConsignment.controls['qtypkgs'].disable();
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
      this.formConsignment.controls['rateRs'].setValidators([Validators.required]);
      this.formConsignment.controls['userBranch3'].setValidators([Validators.required]);
      this.formConsignment.controls['billingParty'].setValidators([Validators.required]);
      this.formConsignment.controls['ewayBillNo'].setValidators([Validators.required]);
      this.formConsignment.controls['truckId'].setValidators([Validators.required]);
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
    

      this.formConsignment.controls['qtypkgs'].enable();
     
    }

    this.formConsignment.controls['fromPlace'].updateValueAndValidity();
    this.formConsignment.controls['fromPin'].updateValueAndValidity();
    this.formConsignment.controls['toPlace'].updateValueAndValidity();
    this.formConsignment.controls['toPin'].updateValueAndValidity();
    this.formConsignment.controls['cnorCode'].updateValueAndValidity();
    this.formConsignment.controls['cneeCode'].updateValueAndValidity();
    this.formConsignment.controls['productId'].updateValueAndValidity();
    this.formConsignment.controls['rateRs'].updateValueAndValidity();
    this.formConsignment.controls['userBranch3'].updateValueAndValidity();
    this.formConsignment.controls['billingParty'].updateValueAndValidity();
    this.formConsignment.controls['cnorInvDate'].updateValueAndValidity();
    this.formConsignment.controls['declaredValue'].updateValueAndValidity();
    this.formConsignment.controls['truckId'].updateValueAndValidity();
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

}