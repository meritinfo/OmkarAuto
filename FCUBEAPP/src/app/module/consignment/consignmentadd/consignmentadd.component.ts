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
import { Requestmodel } from 'src/app/models/requestmodel';
import { Tripkmsmodel } from 'src/app/models/tripkmsmodel';
import { Usertriprightsmodel } from 'src/app/models/usertriprightsmodel';

@Component({
  selector: 'app-consignmentadd',
  templateUrl: './consignmentadd.component.html',
  styleUrls: ['./consignmentadd.component.css']
})
export class ConsignmentaddComponent implements OnInit {

  formUser!: FormGroup;
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  maxDate: string = '';
  newDate: string = '';
  ewayBillExpDate:string = '';
  noPackages:string = '';

  formSubmitted = false;

  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  rateList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  packingList: Dropdownmodel[] = [];
  vehicalType: Dropdownmodel[] = [];
  contentList: Dropdownmodel[] = [];
  delTypeList: Dropdownmodel[] = [];
  businessByList: Dropdownmodel[] = [];

  responseDetails = new Responsemodel();
  // jobDetails = new Jobmodel();
  eWayBillDetails = new Ewaybillmodel();
  selectedLrDetails = new Consignmentmodel();
  keywordLocation = 'dataName';

  step1Active = true;
  step2Active = false;
  step3Active = false;

  constructor(private route: Router, private formBuilder: FormBuilder,
    private lrmodel: Consignmentmodel, private lrentryService: ConsignmentService,
    private commonService: CommonService,
    private sharedService: SharedService,
    private toastrService: ToastrService,
    private requestmodel: Requestmodel) {
    this.lrmodel = new Consignmentmodel();
  }

  ngOnInit(): void {
    this.sharedService.loading = true;

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

    this.getBranchList();
    this.getRateList();
    this.getContentList();
    this.getStateList();
    this.getLocationList();
    this.getDelTypes();
    this.getBusiByList();
    this.getVehicleNoList();
    this.getBillingPartyList();
    this.getPackingList();
    this.getVehTypes();

    this.formUser = this.formBuilder.group({
      gcNoteNo: new FormControl('', [Validators.required]),
      bookingDate: new FormControl(this.loginDate, [Validators.required]),
      bookingStatus: new FormControl('TBB', [Validators.required]),
      divType: new FormControl('', [Validators.required]),
      delType: new FormControl('', [Validators.required]),
      businessBy: new FormControl('', [Validators.required]),
      ewayBillEntryType: new FormControl('A',),
      ewayBillNo: new FormControl('', [Validators.required]),
      ewayBillDate: new FormControl('',),
      fromPlace: new FormControl('', [Validators.required]),
      toPlace: new FormControl('', [Validators.required]),
      kms: new FormControl('0',),
      truckNo: new FormControl('', [Validators.required]),
      clientType: new FormControl('NR', [Validators.required]),
      jobNo: new FormControl('', [Validators.required]),
      packingType:new FormControl('', [Validators.required]),
      vehType:new FormControl('', [Validators.required]),
      billingParty:new FormControl('', [Validators.required]),
      billingStn:new FormControl(this.branch, [Validators.required]),
      cnorName: new FormControl('', [Validators.required]),
      cnorAdr: new FormControl('',),
      cnorAdr1: new FormControl('',),
      cnorStateCode: new FormControl('', [Validators.required]),
      cnorPincode: new FormControl('',),
      cnorEmail: new FormControl('',),
      cnorMobile: new FormControl('', [Validators.required]),
      cnorGstNo: new FormControl('', [Validators.required]),
      cnorInvNo: new FormControl('',),
      cnorInvDate: new FormControl('',),
      declaredValue: new FormControl('',),
      cneeName: new FormControl('', [Validators.required]),
      cneeAdr: new FormControl('',),
      cneeAdr1: new FormControl('',),
      cneeStateCode: new FormControl('',[Validators.required]),
      cneePincode: new FormControl('',),
      cneeEmail: new FormControl('',),
      cneeMobile: new FormControl('', [Validators.required]),
      cneeGstNo: new FormControl('', [Validators.required]),
      contents: new FormControl('',),
      shipmentNo: new FormControl('',),
      loadLength: new FormControl('',),
      loadWidth: new FormControl('',),
      loadHeight: new FormControl('',),
      productId: new FormControl('', [Validators.required]),
      noPackages: new FormControl('', [Validators.required]),
      actualWt: new FormControl('', [Validators.required]),
      chargewt: new FormControl('', [Validators.required]),
      rateType: new FormControl('', [Validators.required]),
      rateRs: new FormControl('0',),
      freightRs: new FormControl('0',),
      statisticalRs: new FormControl('0',),
      subTotalRs: new FormControl('0',),
      gtotalRs: new FormControl('0',),
      generalRemarks: new FormControl('',),
      yearId: new FormControl('',),
    });

    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    this.changeEWay('A');
    this.getLrNo();
    this.getDivType();
    this.sharedService.loading = false;
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  getBranchList(): void {
    // this.sharedService.getBranchList().subscribe((res) => {
    //   this.branchList = res;
    // });
  }

  getRateList(): void {
    // this.lrentryService.getRateList().subscribe((res) => {
    //   this.rateList = res;
    // });
  }

  getLocationList(): void {
    // this.lrentryService.getLocationList().subscribe((res) => {
    //   this.locationList = res;
    // });
  }


  getDelTypes(): void {
    // this.lrentryService.getDeliveryTypes().subscribe((res) => {
    //   this.delTypeList = res;
    // });
  }

  getBusiByList(): void {
    // this.lrentryService.getEmployeeList().subscribe((res) => {
    //   this.businessByList = res;
    // });
  }

  getVehicleNoList(): void {
    // this.lrentryService.getVehicleNoList().subscribe((res) => {
    //   this.vehicleList = res;
    // });
  }

  getStateList(): void {
    // this.lrentryService.getStateList().subscribe((res) => {
    //   this.stateList = res;
    // });
  }

  getContentList(): void {
    // this.lrentryService.getContentList().subscribe((res) => {
    //   this.contentList = res;
    // });
  }

  getBillingPartyList(): void {
    // this.lrentryService.getBillingPartyList().subscribe((res) => {
    //   this.partyList = res;
    // });
  }

  getPackingList(): void {
    // this.lrentryService.getPackingList().subscribe((res) => {
    //   this.packingList = res;
    // });
  }

  getVehTypes(): void {
    // this.lrentryService.getVehTypes().subscribe((res) => {
    //   this.vehicalType = res;
    // });
  }

  onLrManualChange(e: any) {
    if (e.target.checked) {
      this.formUser.controls["gcNoteNo"].enable();
      this.formUser.patchValue({
        gcNoteNo: ""
      });
    }
    else {
      this.getLrNo();
    }
  }

  onLrChange() {
    this.requestmodel.strRequest = this.branch;
    // this.requestmodel.strRequest1 = this.formUser.value.gcNoteNo;
    // this.lrentryService.checkDuplicateLr(this.requestmodel).subscribe((res: Responsemodel) => {
    //   this.responseDetails = res;
    //   if (!this.responseDetails.status) {
    //     this.toastrService.warning(this.responseDetails.message)
    //     this.formUser.patchValue({
    //       gcNoteNo: ""
    //     });
    //   }
    // });
  }

  getLrNo() {
    this.requestmodel.strRequest = this.branch;
    // this.lrentryService.getLrNo(this.requestmodel).subscribe((res: Responsemodel) => {
    //   this.responseDetails = res;
    //   if (this.responseDetails.status) {
    //     this.formUser.patchValue({
    //       gcNoteNo: this.responseDetails.message
    //     });
    //   }
    //  else{
    //     this.toastrService.warning(this.responseDetails.message);
    //   }
    // });
    // this.formUser.controls["gcNoteNo"].disable();
  }

  getDivType() {
    this.requestmodel.strRequest = this.branch;
    // this.lrentryService.getDivType(this.requestmodel).subscribe((res: Responsemodel) => {
    //   this.responseDetails = res;
    //   if (this.responseDetails.status) {
    //     if(this.responseDetails.message=="P"){          
    //       this.formUser.patchValue({
    //         divType: "P"
    //       });
    //       this.formUser.controls["divType"].disable();
    //       this.formUser.controls['jobNo'].enable();
    //       this.getJobDetails();
    //       this.formUser.controls['jobNo'].setValidators([Validators.required]);
    //     }
    //     else{          
    //       this.formUser.controls["divType"].enable();
    //       this.formUser.controls['jobNo'].disable();
    //       this.formUser.patchValue({
    //         jobNo: "",
    //       }); 
    //       this.formUser.controls['jobNo'].clearValidators();
    //     }        
    //     this.formUser.controls['jobNo'].updateValueAndValidity();
    //   }
    //   else{
    //     this.toastrService.warning(this.responseDetails.message);
    //   }
    // });
  }

   getJobDetails() {
  //   var selecteddata = this.formUser.getRawValue();
  //   this.requestmodel.strRequest = selecteddata.gcNoteNo;
  //   this.lrentryService.getJobDetails(this.requestmodel).subscribe((res: Jobmodel) => {
  //     this.jobDetails = res;
  //     this.formUser.patchValue({
  //       jobNo: this.jobDetails.jobNo,
  //     });         
  //   });
   }

  searchGSTDetails(): void {
    this.sharedService.loading = true;
    this.requestmodel.strRequest = this.branch;
    //this.requestmodel.strRequest1 = this.formUser.value.ewayBillNo;

    // this.lrentryService.billDetails(this.requestmodel).subscribe((res: any) => {
      // var response = res.result;
      // this.eWayBillDetails.result = response;
      // //if (this.eWayBillDetails.result.ewbNo == 0) {
      //   this.sharedService.loading = false;
      //   this.toastrService.warning("Please Enter Valid EwayBill No ");
      //   this.formUser.patchValue({
      //     ewayBillNo:""
      //   })
      //   return;
     // }
      //this.ewayBillExpDate=this.commonService.formatDate(this.eWayBillDetails.result.validUpto);
      //this.noPackages=this.eWayBillDetails.result.itemList[0].quantity.toString();
      if(parseFloat(this.noPackages.substring(0,this.noPackages.indexOf('.')))>0){
        this.noPackages=this.noPackages.substring(0,this.noPackages.indexOf('.')); 
      } 
      else{
        this.noPackages='';
      }  

      this.formUser.patchValue({
        // ewayBillDate: this.commonService.formatDate(this.eWayBillDetails.result.ewayBillDate),
        // cnorName: this.eWayBillDetails.result.fromTrdName,
        // cnorAdr: this.eWayBillDetails.result.fromAddr1,
        // cnorAdr1: this.eWayBillDetails.result.fromAddr2 + this.eWayBillDetails.result.fromPlace,
        // cnorStateCode: this.eWayBillDetails.result.fromStateCode.toString(),
        // cnorPincode: this.eWayBillDetails.result.fromPincode,
        // cnorGstNo: this.eWayBillDetails.result.fromGstin,
        // cneeName: this.eWayBillDetails.result.toTrdName,
        // cneeAdr: this.eWayBillDetails.result.toAddr1,
        // cneeAdr1: this.eWayBillDetails.result.toAddr2 + this.eWayBillDetails.result.toPlace,
        // cneeStateCode: this.eWayBillDetails.result.toStateCode.toString(),
        // cneePincode: this.eWayBillDetails.result.toPincode,
        // cneeGstNo: this.eWayBillDetails.result.toGstin,
        // cnorInvDate: this.commonService.formatDate(this.eWayBillDetails.result.docDate),
        // cnorInvNo: this.eWayBillDetails.result.docNo,
        // kms: this.eWayBillDetails.result.actualDist.toString(),
        // productId: this.eWayBillDetails.result.itemList[0].productId.toString(),
        // noPackages: this.noPackages,
        // truckNo: this.eWayBillDetails.result.vehiclListDetails[0].vehicleNo.toString(),
        // declaredValue: this.eWayBillDetails.result.totInvValue.toString(),
      });
           
    // });
   
    this.sharedService.loading = false;
  }

  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // do something with selected item
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (partyList: Dropdownmodel[], query: string): any[] {
    if(query.length>2){
      return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
    }
    else{
      return partyList;
    }
  };



  changeEWay(selectedValue: string) {
    if (selectedValue === "A") {
      //Remove field validation
      this.formUser.controls['fromPlace'].clearValidators();
      this.formUser.controls['toPlace'].clearValidators();
      this.formUser.controls['cnorName'].clearValidators();
      this.formUser.controls['cneeName'].clearValidators();
      this.formUser.controls['productId'].clearValidators();
      this.formUser.controls['rateType'].clearValidators();
      this.formUser.controls['declaredValue'].clearValidators();
      this.formUser.controls['cnorInvDate'].clearValidators();

      //required
      this.formUser.controls['billingParty'].setValidators([Validators.required]);
      this.formUser.controls['truckNo'].setValidators([Validators.required]);
      this.formUser.controls['fromPlace'].setValidators([Validators.required]);
      this.formUser.controls['toPlace'].setValidators([Validators.required]);
      this.formUser.controls['productId'].setValidators([Validators.required]);
      this.formUser.controls['rateType'].setValidators([Validators.required]);

      //Disable field
      this.formUser.controls['cnorName'].disable();
      this.formUser.controls['cnorAdr'].disable();
      this.formUser.controls['cnorAdr1'].disable();
      this.formUser.controls['cnorStateCode'].disable();
      this.formUser.controls['cnorPincode'].disable();
      this.formUser.controls['cnorGstNo'].disable();
      this.formUser.controls['cneeName'].disable();
      this.formUser.controls['cneeAdr'].disable();
      this.formUser.controls['cneeAdr1'].disable();
      this.formUser.controls['cneeStateCode'].disable();
      this.formUser.controls['cneePincode'].disable();
      this.formUser.controls['cneeGstNo'].disable();
      this.formUser.controls['kms'].disable();
      this.formUser.controls['ewayBillDate'].disable();
      this.formUser.controls['declaredValue'].disable();
      this.formUser.controls['cnorInvDate'].disable();
      //this.formUser.controls['noPackages'].disable();
    }
    if (selectedValue === "M" || selectedValue === "E") {
      //Add field validation
      this.formUser.controls['fromPlace'].setValidators([Validators.required]);
      this.formUser.controls['toPlace'].setValidators([Validators.required]);
      this.formUser.controls['ewayBillNo'].setValidators([Validators.required]);
      this.formUser.controls['cnorName'].setValidators([Validators.required]);
      this.formUser.controls['cnorGstNo'].setValidators([Validators.required]);
      this.formUser.controls['cneeName'].setValidators([Validators.required]);
      this.formUser.controls['cneeGstNo'].setValidators([Validators.required]);
      this.formUser.controls['cnorInvNo'].setValidators([Validators.required]);
      this.formUser.controls['declaredValue'].setValidators([Validators.required]);
      this.formUser.controls['productId'].setValidators([Validators.required]);
      this.formUser.controls['rateType'].setValidators([Validators.required]);
      this.formUser.controls['billingParty'].setValidators([Validators.required]);
      this.formUser.controls['ewayBillNo'].setValidators([Validators.required]);
      this.formUser.controls['truckNo'].setValidators([Validators.required]);
      this.formUser.controls['noPackages'].setValidators([Validators.required]);

      //Enable fieldcnorName']
      this.formUser.controls['fromPlace'].enable();
      this.formUser.controls['toPlace'].enable();
      this.formUser.controls['cnorName'].enable();
      this.formUser.controls['cnorAdr'].enable();
      this.formUser.controls['cnorAdr1'].enable();
      this.formUser.controls['cnorStateCode'].enable();
      this.formUser.controls['cnorPincode'].enable();
      this.formUser.controls['cnorGstNo'].enable();
      this.formUser.controls['cneeName'].enable();
      this.formUser.controls['cneeAdr'].enable();
      this.formUser.controls['cneeAdr1'].enable();
      this.formUser.controls['cneeStateCode'].enable();
      this.formUser.controls['cneePincode'].enable();
      this.formUser.controls['cneeGstNo'].enable();
      this.formUser.controls['kms'].enable();
      this.formUser.controls['ewayBillDate'].enable();
      this.formUser.controls['ewayBillNo'].enable();
      this.formUser.controls['truckNo'].enable();
      this.formUser.controls['declaredValue'].enable();
      this.formUser.controls['cnorInvDate'].enable();
      this.formUser.controls['noPackages'].enable();

    }

    this.formUser.controls['fromPlace'].updateValueAndValidity();
    this.formUser.controls['toPlace'].updateValueAndValidity();
    this.formUser.controls['cnorName'].updateValueAndValidity();
    this.formUser.controls['cneeName'].updateValueAndValidity();
    this.formUser.controls['productId'].updateValueAndValidity();
    this.formUser.controls['rateType'].updateValueAndValidity();
    this.formUser.controls['billingParty'].updateValueAndValidity();
    this.formUser.controls['cnorInvDate'].updateValueAndValidity();
    this.formUser.controls['cnorInvNo'].updateValueAndValidity();
    this.formUser.controls['declaredValue'].updateValueAndValidity();
    this.formUser.controls['truckNo'].updateValueAndValidity();
    this.formUser.controls['cneeGstNo'].updateValueAndValidity();
    this.formUser.controls['cnorGstNo'].updateValueAndValidity();
    this.formUser.controls['ewayBillNo'].updateValueAndValidity();

  }


  calculateTotalAmount() {
    let total = 0;
    var selectedData = this.formUser.getRawValue();
    var freightRs = selectedData.freightRs ? parseFloat(selectedData.freightRs) : 0;
    var statisticalRs = selectedData.statisticalRs ? parseFloat(selectedData.statisticalRs) : 0;

    total = freightRs + statisticalRs;
    this.formUser.patchValue({
      subTotalRs: total,
      gtotalRs: total,
    })
  }

  submitLrDetailsForm(): void {
    this.formSubmitted = true;
    if (this.formUser.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields ");
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }

    var selectedDataValue = this.formUser.getRawValue();

    if (selectedDataValue.fromPlace.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" From Place is Invalid");
      return;
    }

    if (selectedDataValue.toPlace.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" To Place is Invalid");
      return;
    }

    if (selectedDataValue.billingParty.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning(" Billing Party is Invalid");
      return;
    }

    this.sharedService.loading = true;
    this.lrmodel.bookingPlace = this.branch;
    this.lrmodel.gcNoteNo = selectedDataValue.gcNoteNo;
    this.lrmodel.bookingStatus = selectedDataValue.bookingStatus;
    this.lrmodel.bookingDate = selectedDataValue.bookingDate;
    // this.lrmodel.divType = selectedDataValue.divType;
    // this.lrmodel.delType = selectedDataValue.delType;
    // this.lrmodel.businessBy = selectedDataValue.businessBy.dataId;
    this.lrmodel.ewayBillNo = selectedDataValue.ewayBillNo;
    this.lrmodel.ewayBillDate = selectedDataValue.ewayBillDate;
    this.lrmodel.ewayBillExpDate = this.ewayBillExpDate;
    this.lrmodel.fromPlace = selectedDataValue.fromPlace.dataId;
    this.lrmodel.toPlace = selectedDataValue.toPlace.dataId;
    this.lrmodel.kms = selectedDataValue.kms;
    this.lrmodel.truckNo = selectedDataValue.truckNo;
    // this.lrmodel.clientType = selectedDataValue.clientType;
    // this.lrmodel.jobNo = selectedDataValue.jobNo;
    // this.lrmodel.jobId = selectedDataValue.jobNo==""?"": this.jobDetails.jobId;
    // this.lrmodel.jobBranch = selectedDataValue.jobNo==""?"": this.jobDetails.branch;
    // this.lrmodel.packingType = selectedDataValue.packingType;
    // this.lrmodel.vehType = selectedDataValue.vehType;
    this.lrmodel.billingParty = selectedDataValue.billingParty ? selectedDataValue.billingParty.dataId : "0";
    // this.lrmodel.billingStn = selectedDataValue.billingStn;
    // this.lrmodel.cnorName = selectedDataValue.cnorName;
    // this.lrmodel.cnorAdr = selectedDataValue.cnorAdr;
    // this.lrmodel.cnorAdr1 = selectedDataValue.cnorAdr1;
    // this.lrmodel.cnorStateCode = selectedDataValue.cnorStateCode;
    // this.lrmodel.cnorPincode = selectedDataValue.cnorPincode.toString();
    // this.lrmodel.cnorEmail = selectedDataValue.cnorEmail;
    // this.lrmodel.cnorMobile = selectedDataValue.cnorMobile;
    // this.lrmodel.cnorGstNo = selectedDataValue.cnorGstNo;
    this.lrmodel.cnorInvNo = selectedDataValue.cnorInvNo;
    this.lrmodel.cnorInvDate = selectedDataValue.cnorInvDate;
    this.lrmodel.declaredValue = selectedDataValue.declaredValue;
    // this.lrmodel.cneeName = selectedDataValue.cneeName;
    // this.lrmodel.cneeAdr = selectedDataValue.cneeAdr;
    // this.lrmodel.cneeAdr1 = selectedDataValue.cneeAdr1;
    // this.lrmodel.cneeStateCode = selectedDataValue.cneeStateCode;
    // this.lrmodel.cneePincode = selectedDataValue.cneePincode.toString();
    // this.lrmodel.cneeEmail = selectedDataValue.cneeEmail;
    // this.lrmodel.cneeMobile = selectedDataValue.cneeMobile;
    // this.lrmodel.cneeGstNo = selectedDataValue.cneeGstNo;
    this.lrmodel.shipmentNo = selectedDataValue.shipmentNo;
    // this.lrmodel.loadLength = selectedDataValue.loadLength;
    // this.lrmodel.loadWidth = selectedDataValue.loadWidth;
    // this.lrmodel.loadHeight = selectedDataValue.loadHeight;
    this.lrmodel.productId = selectedDataValue.productId;
    this.lrmodel.noPackages = selectedDataValue.noPackages;
    this.lrmodel.actualWt = selectedDataValue.actualWt;
    this.lrmodel.chargewt = selectedDataValue.chargewt;
    this.lrmodel.rateRs = selectedDataValue.rateRs ? selectedDataValue.rateRs : "0";
    this.lrmodel.freightRs = selectedDataValue.freightRs ? selectedDataValue.freightRs : "0";
    this.lrmodel.statisticalRs = selectedDataValue.statisticalRs ? selectedDataValue.statisticalRs : "0";
    this.lrmodel.generalRemarks = selectedDataValue.generalRemarks;
    this.lrmodel.subTotalRs = selectedDataValue.subTotalRs.toString();
    this.lrmodel.gtotalRs = selectedDataValue.gtotalRs.toString();
    this.lrmodel.rateType = selectedDataValue.rateType;
    this.lrmodel.yearId = this.year;
    this.lrmodel.loggedInUser = this.loggedInUserID;
    // this.lrentryService.LrDetailsSubmitted(this.lrmodel).subscribe((res: Responsemodel) => {
    //   this.responseDetails = res;
    //   if (res.status) {
    //     this.toastrService.success(this.responseDetails.message);
    //     this.formUser.reset();
    //     this.route.navigate(['/lrlistview']);
    //   }
    //   else {
    //     this.toastrService.warning(this.responseDetails.message);
    //   }
    // });

    this.sharedService.loading = false;
  }

  nextStep(index: number): void {
    if (index === 1) {
      this.step1Active = true;
      this.step2Active = false;
      this.step3Active = false;
    }
    if (index === 2) {
      this.step1Active = false;
      this.step2Active = true;
      this.step3Active = false;
    }
    if (index === 3) {
      this.step1Active = false;
      this.step2Active = false;
      this.step3Active = true;
    }
  }

}