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


@Component({
  selector: 'app-consignmentadd',
  templateUrl: './consignmentadd.component.html',
  styleUrls: ['./consignmentadd.component.css']
})
export class ConsignmentaddComponent implements OnInit {
  loggedInUserID: string = '';
  formConsignment!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  selectedConsignmentDetails = new Consignmentmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private consignmentmodel: Consignmentmodel, private consignmentService: ConsignmentService, private commonService: CommonService) {
    this.consignmentmodel = new Consignmentmodel();
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
    this.selectedConsignmentDetails = this.consignmentService.getConsignmentDetails();
    this.formConsignment = this.formBuilder.group({
      bookingPlace: new FormControl('',),
      gcSeries: new FormControl('',),
      gcAlpha: new FormControl('',),
      gcNoteNo: new FormControl('',),
      gcSlNo: new FormControl('',),
      bookingDate: new FormControl('',),
      bookingStatus: new FormControl('',),
      ewayBillEntryType: new FormControl('',),
      ewayBillNo: new FormControl('',),
      ewayBillDate: new FormControl('',),
      ewayBillExpDate: new FormControl('',),
      ewayBillExpExtDate: new FormControl('',),
      fromPlace: new FormControl('',),
      toPlace: new FormControl('',),
      kms: new FormControl('',),
      billingBranch: new FormControl('',),
      cnorCode: new FormControl('',),
      cneeCode: new FormControl('',),
      cnorInvNo: new FormControl('',),
      cnorInvDate: new FormControl('',),
      poNo: new FormControl('',),
      poDate: new FormControl('',),
      woNo: new FormControl('',),
      woDate: new FormControl('',),
      riskBy: new FormControl('',),
      ownTruck: new FormControl('',),
      truckId: new FormControl('',),
      truckNo: new FormControl('',),
      productId: new FormControl('',),
      gstHSN: new FormControl('',),
      noPackages: new FormControl('',),
      weightType: new FormControl('',),
      actualWt: new FormControl('',),
      chargewt: new FormControl('',),
      bulkYN: new FormControl('',),
      loadLength: new FormControl('',),
      loadWidth: new FormControl('',),
      loadHeight: new FormControl('',),
      loadCFT: new FormControl('',),
      delType: new FormControl('',),
      loadType: new FormControl('',),
      rateType: new FormControl('',),
      privateMark: new FormControl('',),
      staxGstBy: new FormControl('',),
      rateRs: new FormControl('',),
      freightRs: new FormControl('',),
      statisticalRs: new FormControl('',),
      aocRs: new FormControl('',),
      fovRs: new FormControl('',),
      handlingRs: new FormControl('',),
      doorCollRs: new FormControl('',),
      doorDeliRs: new FormControl('',),
      withPassRs: new FormControl('',),
      insuranceRs: new FormControl('',),
      packingRs: new FormControl('',),
      dccRs: new FormControl('',),
      loadingDetnRs: new FormControl('',),
      enrouteRs: new FormControl('',),
      miscRs: new FormControl('',),
      extrasRS: new FormControl('',),
      unLoadingRs: new FormControl('',),
      detentionRs: new FormControl('',),
      storageRs: new FormControl('',),
      warehousingRs: new FormControl('',),
      othersRs: new FormControl('',),
      othersRs1: new FormControl('',),
      othersRs2: new FormControl('',),
      othersRs3: new FormControl('',),
      othersRs4: new FormControl('',),
      subTotalRs: new FormControl('',),
      gstType: new FormControl('',),
      gstPct: new FormControl('',),
      sgstAmt: new FormControl('',),
      cgstAmt: new FormControl('',),
      igstAmt: new FormControl('',),
      nonGstAmt1: new FormControl('',),
      nonGstAmt1Desc: new FormControl('',),
      nonGstAmt2: new FormControl('',),
      nonGstAmt2Desc: new FormControl('',),
      gtotalRs: new FormControl('',),
      advanceRs: new FormControl('',),

      generalRemarks: new FormControl('',),

      includeCnYn: new FormControl('',),
      includeCnNo: new FormControl('',),
      attachedfile: new FormControl('',),
      yearId: new FormControl('',),


      userBranch: new FormControl('',),
      userBranch2: new FormControl('',),


    });
    if (this.selectedConsignmentDetails.consignmentID != '') {
      this.formConsignment.patchValue(this.selectedConsignmentDetails);

      this.formConsignment.patchValue({
        userBranch: this.selectedConsignmentDetails.bookingPlace,
        fromPlace: this.selectedConsignmentDetails.fromPlace,
        toPlace: this.selectedConsignmentDetails.toPlace,
        gcSeries: this.selectedConsignmentDetails.gcSeries,


      })
    }


  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formConsignment.controls; }
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }


  //Submit user form details //
  submitConsignmentForm(): void {
    this.userSubmitted = true;
    if (this.formConsignment.invalid) {
      return;
    }
    debugger;
    this.consignmentmodel.consignmentID = this.selectedConsignmentDetails.consignmentID != '' ? this.selectedConsignmentDetails.consignmentID : '';
    this.consignmentmodel.bookingPlace = this.formConsignment.value.userBranch;
    this.consignmentmodel.gcSlNo = this.formConsignment.value.gcSlNo;
    this.consignmentmodel.gcSeries = this.formConsignment.value.gcSeries;
    this.consignmentmodel.gcNoteNo = this.formConsignment.value.gcNoteNo;
    this.consignmentmodel.bookingStatus = this.formConsignment.value.bookingStatus;
    this.consignmentmodel.bookingDate = this.formConsignment.value.bookingDate;
    this.consignmentmodel.ewayBillEntryType = this.formConsignment.value.ewayBillEntryType;
    this.consignmentmodel.ewayBillNo = this.formConsignment.value.ewayBillNo;
    this.consignmentmodel.ewayBillDate = this.formConsignment.value.ewayBillDate;
    this.consignmentmodel.ewayBillExpDate = this.formConsignment.value.ewayBillExpDate;
    this.consignmentmodel.fromPlace = this.formConsignment.value.fromPlace;
    this.consignmentmodel.kms = this.formConsignment.value.kms;
    this.consignmentmodel.billingBranch = this.formConsignment.value.billingBranch;
    this.consignmentmodel.toPlace = this.formConsignment.value.toPlace;
    this.consignmentmodel.cnorCode = this.formConsignment.value.cnorCode;
    this.consignmentmodel.cneeCode = this.formConsignment.value.cneeCode;
    this.consignmentmodel.cnorInvNo = this.formConsignment.value.cnorInvNo;
    this.consignmentmodel.cnorInvDate = this.formConsignment.value.cnorInvDate;
    this.consignmentmodel.poDate = this.formConsignment.value.poDate;
    this.consignmentmodel.woNo = this.formConsignment.value.woNo;
    this.consignmentmodel.woDate = this.formConsignment.value.woDate;
    this.consignmentmodel.riskBy = this.formConsignment.value.riskBy;
    this.consignmentmodel.billingParty = this.formConsignment.value.billingParty;
    this.consignmentmodel.ownTruck = this.formConsignment.value.ownTruck;
    this.consignmentmodel.truckId = this.formConsignment.value.truckId;
    this.consignmentmodel.truckNo = this.formConsignment.value.truckNo;
    this.consignmentmodel.productId = this.formConsignment.value.productId;
    this.consignmentmodel.gstHSN = this.formConsignment.value.gstHSN;

    this.consignmentmodel.weightType = this.formConsignment.value.weightType;
    this.consignmentmodel.actualWt = this.formConsignment.value.actualWt;
    this.consignmentmodel.chargewt = this.formConsignment.value.chargewt;
    this.consignmentmodel.bulkYN = this.formConsignment.value.bulkYN;
    this.consignmentmodel.loadLength = this.formConsignment.value.loadLength;
    this.consignmentmodel.loadWidth = this.formConsignment.value.loadWidth;
    this.consignmentmodel.loadHeight = this.formConsignment.value.loadHeight;
    this.consignmentmodel.loadCFT = this.formConsignment.value.loadCFT;
    this.consignmentmodel.delType = this.formConsignment.value.delType;
    this.consignmentmodel.loadType = this.formConsignment.value.loadType;
    this.consignmentmodel.rateType = this.formConsignment.value.rateType;
    this.consignmentmodel.privateMark = this.formConsignment.value.privateMark;
    this.consignmentmodel.staxGstBy = this.formConsignment.value.staxGstBy;
    this.consignmentmodel.rateRs = this.formConsignment.value.rateRs;
    this.consignmentmodel.freightRs = this.formConsignment.value.freightRs;
    this.consignmentmodel.statisticalRs = this.formConsignment.value.statisticalRs;
    this.consignmentmodel.aocRs = this.formConsignment.value.aocRs;
    this.consignmentmodel.fovRs = this.formConsignment.value.fovRs;
    this.consignmentmodel.handlingRs = this.formConsignment.value.handlingRs;
    this.consignmentmodel.doorCollRs = this.formConsignment.value.doorCollRs;
    this.consignmentmodel.doorDeliRs = this.formConsignment.value.doorDeliRs;
    this.consignmentmodel.withPassRs = this.formConsignment.value.withPassRs;
    this.consignmentmodel.insuranceRs = this.formConsignment.value.insuranceRs;
    this.consignmentmodel.packingRs = this.formConsignment.value.packingRs;
    this.consignmentmodel.dccRs = this.formConsignment.value.dccRs;
    this.consignmentmodel.loadingDetnRs = this.formConsignment.value.loadingDetnRs;
    this.consignmentmodel.enrouteRs = this.formConsignment.value.enrouteRs;
    this.consignmentmodel.miscRs = this.formConsignment.value.miscRs;
    this.consignmentmodel.extrasRS = this.formConsignment.value.extrasRS;
    this.consignmentmodel.unLoadingRs = this.formConsignment.value.unLoadingRs;
    this.consignmentmodel.detentionRs = this.formConsignment.value.detentionRs;
    this.consignmentmodel.storageRs = this.formConsignment.value.storageRs;
    this.consignmentmodel.warehousingRs = this.formConsignment.value.warehousingRs;
    this.consignmentmodel.subTotalRs = this.formConsignment.value.subTotalRs;
    this.consignmentmodel.gstType = this.formConsignment.value.gstType;
    this.consignmentmodel.gstPct = this.formConsignment.value.gstPct;
    this.consignmentmodel.sgstAmt = this.formConsignment.value.sgstAmt;
    this.consignmentmodel.cgstAmt = this.formConsignment.value.cgstAmt;
    this.consignmentmodel.igstAmt = this.formConsignment.value.igstAmt;
    this.consignmentmodel.nonGstAmt1 = this.formConsignment.value.nonGstAmt1;
    this.consignmentmodel.nonGstAmt1Desc = this.formConsignment.value.nonGstAmt1Desc;
    this.consignmentmodel.nonGstAmt2 = this.formConsignment.value.nonGstAmt2;
    this.consignmentmodel.nonGstAmt2Desc = this.formConsignment.value.nonGstAmt2Desc;
    this.consignmentmodel.gtotalRs = this.formConsignment.value.gtotalRs;
    this.consignmentmodel.advanceRs = this.formConsignment.value.advanceRs;
    this.consignmentmodel.includeCnYn = this.formConsignment.value.includeCnYn;
    this.consignmentmodel.includeCnYn = this.formConsignment.value.includeCnYn;
    this.consignmentmodel.includeCnNo = this.formConsignment.value.includeCnNo;
    this.consignmentmodel.attachedfile = this.formConsignment.value.attachedfile;

    this.consignmentmodel.generalRemarks = this.formConsignment.value.generalRemarks;


    this.consignmentService.consignmentDetailsSubmitted(this.consignmentmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formConsignment.reset();
      window.location.reload();
    });
  }
}