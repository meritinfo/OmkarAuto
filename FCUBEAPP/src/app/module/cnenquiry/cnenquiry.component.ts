import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { Ewaybillmodel } from 'src/app/models/ewaybillmodel';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';


@Component({
  selector: 'app-cnenquiry',
  templateUrl: './cnenquiry.component.html',
  styleUrls: ['./cnenquiry.component.css']
})
export class CnenquiryComponent {
  formUser!: FormGroup;
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  newDate: string = '';
  noPackages:string = '';

  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  rateList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  vehicalType: Dropdownmodel[] = [];
  contentList: Dropdownmodel[] = [];
  classList: Dropdownmodel[] = [];
  businessByList: Dropdownmodel[] = [];

  responseDetails = new Responsemodel();
  eWayBillDetails = new Ewaybillmodel();
  selectedLrDetails = new Consignmentmodel();
  keywordLocation = 'dataName';
  attach1: string = "";
  formFilter!: FormGroup;

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
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Consignment Enquiry");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
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

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 12);
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
    
    this.selectedLrDetails = this.lrentryService.getConsignmentDetails();

    this.formFilter = this.formBuilder.group({
      cnno: new FormControl('',),
    });

    this.formUser = this.formBuilder.group({
      bookingPlace  :new FormControl('',),
      gcNoteNo  : new FormControl('',),
      bookingDate : new FormControl('',),
      bookingStatus : new FormControl('',),
      ewayBillEntryType : new FormControl('',),
      ewayBillNo : new FormControl('',),
      ewayBillDate : new FormControl('',),
      ewayBillExpDate: new FormControl(''),
      declaredValue : new FormControl('',),    
      fromPlace : new FormControl('',),    
      toPlace : new FormControl('',),    
      kms : new FormControl('',),
      ownTruck : new FormControl('',),    
      truckNo : new FormControl('',),    
      includeCnYn : new FormControl('',),    
      includeCnNo : new FormControl('',),    
      billingParty : new FormControl('',),
      billingBranch : new FormControl('',),
      businessBranch : new FormControl('',),
      cnorName : new FormControl('',),
      cnorAdd1 : new FormControl('',),    
      cnorAdd2 : new FormControl('',),    
      cnorAdd3 : new FormControl('',),    
      cnorPin : new FormControl('',),    
      cnorGst : new FormControl('',),
      cnorMobile : new FormControl('',),    
      cnorEmail : new FormControl('',),    
      cneeName : new FormControl('',),
      cneeAdd1 : new FormControl('',),    
      cneeAdd2 : new FormControl('',),    
      cneeAdd3 : new FormControl('',),    
      cneePin : new FormControl('',),    
      cneeGst : new FormControl('', ),
      cneeMobile : new FormControl('',),
      cneeEmail : new FormControl('',),    
      shipmentNo : new FormControl('',),    
      shipmentDt : new FormControl('',),    
      deliveryNo : new FormControl('',),    
      deliveryDt : new FormControl('',),    
      poNo : new FormControl('',),    
      poDt : new FormControl('',),    
      riskBy : new FormControl('',),    
      insCoName :new FormControl('',),    
      insPolicyNo : new FormControl('',),    
      insValidDt : new FormControl('',),    
      insuredValue : new FormControl('',),    
      classId : new FormControl('', ),
      productId : new FormControl('', ),
      productDesc : new FormControl('',),    
      hsnSac : new FormControl('',),    
      noPackages : new FormControl('',),    
      looseFlag : new FormControl('',),    
      weightType : new FormControl('',),    
      actualWt : new FormControl('',),    
      senderWt : new FormControl('',),    
      chargewt : new FormControl('',),    
      wtDesc :new FormControl('',),    
      vehicleTypeId :new FormControl('',),
      privateMark : new FormControl('',),    
      bulkYN : new FormControl('',),    
      loadLength : new FormControl('',),    
      loadWidth : new FormControl('',),    
      loadHeight : new FormControl('',),    
      loadCFT : new FormControl('',),    
      rateType : new FormControl('',),    
      rateDesc : new FormControl('',),    
      gstBy : new FormControl('',),    
      rateRs : new FormControl('',),    
      freightRs : new FormControl('',),    
      statisticalRs : new FormControl('',),    
      fovRs : new FormControl('',),    
      doorCollRs : new FormControl('',),    
      handlingRs : new FormControl('',),    
      loadingDetnRs : new FormControl('',),    
      enrouteRs : new FormControl('',),    
      miscRs : new FormControl('',),    
      doorDelRs : new FormControl('',),    
      unLoadingRs : new FormControl('',),    
      unLoadingDetnRs : new FormControl('',),    
      extrasRS : new FormControl('',),    
      othersRs : new FormControl('',),    
      subTotalRs : new FormControl('',),    
      gstType : new FormControl('',),    
      sgstPct : new FormControl('',),    
      sgstAmt : new FormControl('',),    
      cgstPct : new FormControl('',),    
      cgstAmt : new FormControl('',),     
      igstPct : new FormControl('',),   
      igstAmt : new FormControl('',),  
      nonGstAmt1 : new FormControl('',),  
      nonGstAmt1Desc : new FormControl('',),  
      nonGstAmt2 : new FormControl('',),  
      nonGstAmt2Desc : new FormControl('',), 
      gtotalRs : new FormControl('',), 
      generalRemarks : new FormControl('',), 
      businessBy : new FormControl('',),    
      arrayInvList: this.formBuilder.array([this.createInvInitialArray()])  , 
      arrayChlnList: this.formBuilder.array([this.createChlnInitialArray()])  , 
      arrayLhpmList: this.formBuilder.array([this.createLhpmInitialArray()])  , 
      arrayBillList: this.formBuilder.array([this.createBillInitialArray()])  , 
    });
    
    const controls = this.formUser.controls;
    for (const name in controls) {
      controls[name].disable();      
    }   
  }

  get f() { return this.formUser.controls; }

  get formInvArray() {
    return this.formUser.get("arrayInvList") as FormArray;
  }
  get formChlnArray() {
    return this.formUser.get("arrayChlnList") as FormArray;
  }
  get formLhpmArray() {
    return this.formUser.get("arrayLhpmList") as FormArray;
  }
  get formBillArray() {
    return this.formUser.get("arrayBillList") as FormArray;
  }
  
  createInvInitialArray() {
    return this.formBuilder.group({
      ewayBillNo: ['', []],
      ewayBillDate: ['', []],
      ewayBillExpDate: ['', []],
      invNo: ['', []],
      invDate: ['', []],
      invValue: ['', []],
    });
  }  

  createChlnInitialArray() {
    return this.formBuilder.group({
      challanNo : ['', []],
      challanDate : ['', []],
      expArrivalDate : ['', []],
      mainChallanNo : ['', []],
      fromStn : ['', []],
      toStn : ['', []],
      ownTruckYN : ['', []],
      truckNo : ['', []],
      tptName : ['', []],
      totPkgs : ['', []],
      totChrgWt : ['', []],
      totalHire : ['', []],
      totalAdvance : ['', []],
    });
  }  

  createLhpmInitialArray() {
    return this.formBuilder.group({
      pmtStation :  ['', []],
      pmtNo :  ['', []],
      pmtDate :  ['', []],
      challanStn :  ['', []],
      challanNo :  ['', []],
      challanDate :  ['', []],
      abType :  ['', []],
      hireAmt :  ['', []],
      hamaliAmt :  ['', []],
      detenAmt :  ['', []],
      otherAmt :  ['', []],
      recoveryAmt :  ['', []],
      tdsAmt :  ['', []],
      lhpmAmt :  ['', []],
      othDedAmt :  ['', []],
      oth2DedAmt :  ['', []],
      deductRemarks :  ['', []],
      benId :  ['', []],
    });
  }  

  createBillInitialArray() {
    return this.formBuilder.group({
      billingStation : ['', []],
      billNo:  ['', []],
      billDate:  ['', []],
      billType:  ['', []],
      dueDate:  ['', []],
      collBranch:  ['', []],
      partyGstLocation:  ['', []],
      freight:  ['', []],
      others:  ['', []],
      subTotal:  ['', []],
      sgstAmt:  ['', []],
      cgstAmt:  ['', []],
      igstAmt:  ['', []],
      gtotal:  ['', []],
    });
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

  exit(): void {
    this.route.navigate(['/cnenquiry']);
  }

  search(): void {
    var selectedDataVal = this.formFilter.getRawValue();
    this.requestmodel.strRequest = selectedDataVal.cnno;
    this.lrentryService.getCnEnqDetails(this.requestmodel).subscribe((res) => {
      this.selectedLrDetails = res;
      this.formFilter.controls["cnno"].disable();
      this.formUser.patchValue(this.selectedLrDetails);
      this.formUser.patchValue({
        bookingDate: this.commonService.formatDate(this.selectedLrDetails.bookingDate) ,
        ewayBillDate : this.commonService.formatDate(this.selectedLrDetails.ewayBillDate),
        ewayBillExpDate : this.commonService.formatDate(this.selectedLrDetails.ewayBillExpDate),
        invoiceDt : this.commonService.formatDate(this.selectedLrDetails.invoiceDate),   
        shipmentDt : this.commonService.formatDate(this.selectedLrDetails.shipmentDt),               
      })     
      if (this.selectedLrDetails.ownTruck!="Y"){
        this.formUser.patchValue({
          ownTruck : "",               
        })     
      }  
      this.getCnEnqInnerGridList();
    });
    setTimeout(() => { 
      if(selectedDataVal.bookingDate==""){
        this.toastrService.warning("LR does not Exists");
      }
    }, 2000); 
  }

  
  getCnEnqInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedLrDetails.consignmentID;
    this.lrentryService.getCnEnqInnerGridList(this.requestmodel).subscribe((res) => {
      this.lrmodel = res;
      this.formInvArray.clear();
      this.formChlnArray.clear();
      this.formLhpmArray.clear();
      this.formBillArray.clear();

      for (var i = 0; i < res.invList.length; i++) {
        this.formInvArray.push(this.createInvInitialArray());
        this.formInvArray.controls[i].get("ewayBillNo")?.setValue(res.invList[i].ewayBillNo);
        this.formInvArray.controls[i].get("ewayBillDate")?.setValue(this.commonService.formatDate(res.invList[i].ewayBillDate));
        this.formInvArray.controls[i].get("ewayBillExpDate")?.setValue(this.commonService.formatDate(res.invList[i].ewayBillExpDate));
        this.formInvArray.controls[i].get("invNo")?.setValue(res.invList[i].invoiceNo);
        this.formInvArray.controls[i].get("invDate")?.setValue(this.commonService.formatDate(res.invList[i].invoiceDate));
        this.formInvArray.controls[i].get("invValue")?.setValue(res.invList[i].invoiceValue);
        this.formInvArray.controls[i].get("ewayBillNo")?.disable();
        this.formInvArray.controls[i].get("ewayBillDate")?.disable();
        this.formInvArray.controls[i].get("ewayBillExpDate")?.disable();
        this.formInvArray.controls[i].get("invNo")?.disable();
        this.formInvArray.controls[i].get("invDate")?.disable();
        this.formInvArray.controls[i].get("invValue")?.disable();     
      }    

      for (var i = 0; i < res.chlnList.length; i++) {
        this.formChlnArray.push(this.createChlnInitialArray());
        this.formChlnArray.controls[i].get("challanNo")?.setValue(res.chlnList[i].challanNo);
        this.formChlnArray.controls[i].get("challanDate")?.setValue(this.commonService.formatDate(res.chlnList[i].challanDate));
        this.formChlnArray.controls[i].get("expArrivalDate")?.setValue(this.commonService.formatDate(res.chlnList[i].expArrivalDate));
        this.formChlnArray.controls[i].get("mainChallanNo")?.setValue(res.chlnList[i].mainChallanNo);
        this.formChlnArray.controls[i].get("fromStn")?.setValue(res.chlnList[i].fromStn);
        this.formChlnArray.controls[i].get("toStn")?.setValue(res.chlnList[i].toStn);
        this.formChlnArray.controls[i].get("ownTruckYN")?.setValue(res.chlnList[i].ownTruckYN);
        this.formChlnArray.controls[i].get("truckNo")?.setValue(res.chlnList[i].truckNo);
        this.formChlnArray.controls[i].get("tptName")?.setValue(res.chlnList[i].tptName);
        this.formChlnArray.controls[i].get("totPkgs")?.setValue(res.chlnList[i].totPkgs);
        this.formChlnArray.controls[i].get("totChrgWt")?.setValue(res.chlnList[i].totChrgWt);
        this.formChlnArray.controls[i].get("totalHire")?.setValue(res.chlnList[i].totalHire);
        this.formChlnArray.controls[i].get("totalAdvance")?.setValue(res.chlnList[i].totalAdvance);
        this.formChlnArray.controls[i].get("challanNo")?.disable();
        this.formChlnArray.controls[i].get("challanDate")?.disable();
        this.formChlnArray.controls[i].get("expArrivalDate")?.disable();
        this.formChlnArray.controls[i].get("mainChallanNo")?.disable();
        this.formChlnArray.controls[i].get("fromStn")?.disable();
        this.formChlnArray.controls[i].get("toStn")?.disable();
        this.formChlnArray.controls[i].get("ownTruckYN")?.disable();
        this.formChlnArray.controls[i].get("truckNo")?.disable();
        this.formChlnArray.controls[i].get("tptName")?.disable();
        this.formChlnArray.controls[i].get("totPkgs")?.disable();
        this.formChlnArray.controls[i].get("totChrgWt")?.disable();
        this.formChlnArray.controls[i].get("totalHire")?.disable();
        this.formChlnArray.controls[i].get("totalAdvance")?.disable();
      }         
      
      for (var i = 0; i < res.lhpmList.length; i++) {
        this.formLhpmArray.push(this.createLhpmInitialArray());
        this.formLhpmArray.controls[i].get("pmtStation")?.setValue(res.lhpmList[i].pmtStation);
        this.formLhpmArray.controls[i].get("pmtNo")?.setValue(res.lhpmList[i].pmtNo);
        this.formLhpmArray.controls[i].get("pmtDate")?.setValue(this.commonService.formatDate(res.lhpmList[i].pmtDate));
        this.formLhpmArray.controls[i].get("challanStn")?.setValue(res.lhpmList[i].challanStn);
        this.formLhpmArray.controls[i].get("challanNo")?.setValue(res.lhpmList[i].challanNo);
        this.formLhpmArray.controls[i].get("challanDate")?.setValue(this.commonService.formatDate(res.lhpmList[i].challanDate));
        this.formLhpmArray.controls[i].get("abType")?.setValue(res.lhpmList[i].abType);
        this.formLhpmArray.controls[i].get("hireAmt")?.setValue(res.lhpmList[i].hireAmt);
        this.formLhpmArray.controls[i].get("hamaliAmt")?.setValue(res.lhpmList[i].hamaliAmt);
        this.formLhpmArray.controls[i].get("detenAmt")?.setValue(res.lhpmList[i].detenAmt);
        this.formLhpmArray.controls[i].get("otherAmt")?.setValue(res.lhpmList[i].otherAmt);
        this.formLhpmArray.controls[i].get("recoveryAmt")?.setValue(res.lhpmList[i].recoveryAmt);
        this.formLhpmArray.controls[i].get("tdsAmt")?.setValue(res.lhpmList[i].tdsAmt);
        this.formLhpmArray.controls[i].get("lhpmAmt")?.setValue(res.lhpmList[i].lhpmAmt);
        this.formLhpmArray.controls[i].get("othDedAmt")?.setValue(res.lhpmList[i].othDedAmt);
        this.formLhpmArray.controls[i].get("oth2DedAmt")?.setValue(res.lhpmList[i].oth2DedAmt);
        this.formLhpmArray.controls[i].get("deductRemarks")?.setValue(res.lhpmList[i].deductRemarks);
        this.formLhpmArray.controls[i].get("benId")?.setValue(res.lhpmList[i].benId);
        this.formLhpmArray.controls[i].get("pmtStation")?.disable();
        this.formLhpmArray.controls[i].get("pmtNo")?.disable();
        this.formLhpmArray.controls[i].get("pmtDate")?.disable();
        this.formLhpmArray.controls[i].get("challanStn")?.disable();
        this.formLhpmArray.controls[i].get("challanNo")?.disable();
        this.formLhpmArray.controls[i].get("challanDate")?.disable();
        this.formLhpmArray.controls[i].get("abType")?.disable();
        this.formLhpmArray.controls[i].get("hireAmt")?.disable();
        this.formLhpmArray.controls[i].get("hamaliAmt")?.disable();
        this.formLhpmArray.controls[i].get("detenAmt")?.disable();
        this.formLhpmArray.controls[i].get("otherAmt")?.disable();
        this.formLhpmArray.controls[i].get("recoveryAmt")?.disable();
        this.formLhpmArray.controls[i].get("tdsAmt")?.disable();
        this.formLhpmArray.controls[i].get("lhpmAmt")?.disable();
        this.formLhpmArray.controls[i].get("othDedAmt")?.disable();
        this.formLhpmArray.controls[i].get("oth2DedAmt")?.disable();
        this.formLhpmArray.controls[i].get("deductRemarks")?.disable();
        this.formLhpmArray.controls[i].get("benId")?.disable();
      }         
      
      for (var i = 0; i < res.billList.length; i++) {
        this.formBillArray.push(this.createBillInitialArray());
        this.formBillArray.controls[i].get("billingStation")?.setValue(res.billList[i].billingStation);
        this.formBillArray.controls[i].get("billNo")?.setValue(res.billList[i].billNo);
        this.formBillArray.controls[i].get("billDate")?.setValue(this.commonService.formatDate(res.billList[i].billDate));
        this.formBillArray.controls[i].get("billType")?.setValue(res.billList[i].billType);
        this.formBillArray.controls[i].get("dueDate")?.setValue(this.commonService.formatDate(res.billList[i].dueDate));
        this.formBillArray.controls[i].get("collBranch")?.setValue(res.billList[i].collBranch);
        this.formBillArray.controls[i].get("partyGstLocation")?.setValue(res.billList[i].partyGstLocation);
        this.formBillArray.controls[i].get("freight")?.setValue(res.billList[i].freight);
        this.formBillArray.controls[i].get("others")?.setValue(res.billList[i].others);
        this.formBillArray.controls[i].get("subTotal")?.setValue(res.billList[i].subTotal);
        this.formBillArray.controls[i].get("sgstAmt")?.setValue(res.billList[i].sgstAmt);
        this.formBillArray.controls[i].get("cgstAmt")?.setValue(res.billList[i].cgstAmt);
        this.formBillArray.controls[i].get("igstAmt")?.setValue(res.billList[i].igstAmt);
        this.formBillArray.controls[i].get("gtotal")?.setValue(res.billList[i].gtotal);
        this.formBillArray.controls[i].get("billingStation")?.disable();
        this.formBillArray.controls[i].get("billNo")?.disable();
        this.formBillArray.controls[i].get("billDate")?.disable();
        this.formBillArray.controls[i].get("billType")?.disable();
        this.formBillArray.controls[i].get("dueDate")?.disable();
        this.formBillArray.controls[i].get("collBranch")?.disable();
        this.formBillArray.controls[i].get("partyGstLocation")?.disable();
        this.formBillArray.controls[i].get("freight")?.disable();
        this.formBillArray.controls[i].get("others")?.disable();
        this.formBillArray.controls[i].get("subTotal")?.disable();
        this.formBillArray.controls[i].get("sgstAmt")?.disable();
        this.formBillArray.controls[i].get("cgstAmt")?.disable();
        this.formBillArray.controls[i].get("igstAmt")?.disable();
        this.formBillArray.controls[i].get("gtotal")?.disable();
      }               
    });
  }
  
}