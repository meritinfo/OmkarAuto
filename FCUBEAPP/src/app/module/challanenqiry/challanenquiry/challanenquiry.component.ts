
import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Challanmastermodel } from 'src/app/models/challanmastermodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { ChallanmasterService } from 'src/app/services/challanmaster.service';
import { Ewaybillmodel } from 'src/app/models/ewaybillmodel';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-challanenquiry',
  templateUrl: './challanenquiry.component.html',
  styleUrls: ['./challanenquiry.component.css']
})
export class ChallanenquiryComponent {
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
  brokerList: Dropdownmodel[] = [];
  vehicalType: Dropdownmodel[] = [];
  contentList: Dropdownmodel[] = [];
  classList: Dropdownmodel[] = [];
  businessByList: Dropdownmodel[] = [];

  responseDetails = new Responsemodel();
  eWayBillDetails = new Ewaybillmodel();
 
  selectedChnDetails = new Challanmastermodel();
  keywordLocation = 'dataName';
  attach1: string = "";
  formFilter!: FormGroup;

  step1Active = true;
  step2Active = false;
  step3Active = false;
  
  constructor(private route: Router, private formBuilder: FormBuilder,
    private challan: Challanmastermodel, private challanService: ChallanmasterService,
    private commonService: CommonService,
    private sharedService: SharedService,
    private toastrService: ToastrService,
    private requestmodel: Requestmodel) {
    this.challan = new Challanmastermodel();



}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Challan Enquiry");
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
  
  this.selectedChnDetails = this.challanService.getChallanDetails();

  this.formFilter = this.formBuilder.group({
    challanNo: new FormControl('',),
  });
      this.getBranchList();
      this.getLocationList();
  
    this.getBrokerList();
  this.formUser = this.formBuilder.group({
    challanBranch: new FormControl(this.branch, [Validators.required]),
    challanNo: new FormControl('', [Validators.required]),
      challanDateTime: new FormControl(this.loginDate, [Validators.required]),
      chStatus: new FormControl('N', [Validators.required]),
      lrNo: new FormControl('',),
      challanFromStn: new FormControl('', [Validators.required]),
      challanToStn: new FormControl('', [Validators.required]),
      distanceKms: new FormControl('',),
      expArrivalDate: new FormControl('',[Validators.required]),
      mainChallanBranch: new FormControl('', [Validators.required]),
      mainChallanNo: new FormControl('', [Validators.required]),
      truckNo: new FormControl('', [Validators.required]),
      ownTruckYN: new FormControl('',),
      brokerId: new FormControl('', [Validators.required]),
      brokerMblNo: new FormControl('',),    
      vehicleType: new FormControl('', [Validators.required]),    
      vehicleMake: new FormControl('',),    
      vehicleModel: new FormControl('',),
      engineNo: new FormControl('',),    
      chassisNo: new FormControl('', ),    
      vehicleOwnerName: new FormControl('',),
      vehicleOwnerAdd1: new FormControl('',),
      vehicleOwnerAdd2: new FormControl('',),
      vehicleOwnerPanNo: new FormControl('',),
      vehicleOwnerMblNo: new FormControl('',),    
      vehicleInsDetails: new FormControl('',),    
      panValid: new FormControl('',),    
      aadharLinked: new FormControl('',),    
      itFiled: new FormControl('',),
      permitValid: new FormControl('',),   
      driverName : new FormControl('',),   
      driverAddress: new FormControl('',),    
      driverLicNo: new FormControl('',),
      driverLicIssuedAt: new FormControl('',),    
      driverLicValid: new FormControl('',),    
      driverMblNo: new FormControl('',),    
      engagedBy: new FormControl('',),    
      loadedBy: new FormControl('',),
      declarationYN: new FormControl('',),    
      odcLength: new FormControl('',),    
      odcWidth: new FormControl('',),   
      odcHeight: new FormControl('',),
      odcCFT: new FormControl('',),
      totPkgs: new FormControl('',),    
      totActWt: new FormControl('',),    
      totChrgWt: new FormControl('',),    
      ratePerTon: new FormControl('',),    
      lorryHire: new FormControl('',[Validators.required]),    
      extraHire1: new FormControl('',),    
      extraHire2: new FormControl('',),    
      extraHire3: new FormControl('',),    
      deduction1: new FormControl('',),    
      deduction2: new FormControl('',),
      subTotal: new FormControl('',[Validators.required]),    
      tdsPct: new FormControl('',),    
      tdsAmt: new FormControl('',),    
      totalHire: new FormControl('',[Validators.required]),     
      cashAdvance: new FormControl('',),    
      cardAdvance: new FormControl('',),    
      totalAdvance: new FormControl('',),    
      balance: new FormControl('',),    
      balancePayAt: new FormControl(this.branch,[Validators.required]),    
      generalRemarks: new FormControl('',),   
      modifyRemarks: new FormControl('',),    
     
   
    arrayChlnList: this.formBuilder.array([this.createCnInitialArray()])  , 
    arrayLhpmList: this.formBuilder.array([this.createLhpmInitialArray()])  , 
    
  });
  
  const controls = this.formUser.controls;
  for (const name in controls) {
    controls[name].disable();      
  }   
}

get f() { return this.formUser.controls; }


get formChlnArray() {
  return this.formUser.get("arrayChlnList") as FormArray;
}
get formLhpmArray() {
  return this.formUser.get("arrayLhpmList") as FormArray;
}

createCnInitialArray() {
  return this.formBuilder.group({
    bookingPlace :  ['', []],
    bookedAt :  ['', []],
    gcNoteNo :  ['', []],
    bookingDate :  ['', []],
    bookingStatus :  ['', []],
    ewayBillNo :  ['', []],
    ewayBillDate :  ['', []],
    ewayBillExpDate :  ['', []],
    fromPlace :  ['', []],
    toPlace :  ['', []],
    kms :  ['', []],
    truckNo :  ['', []],
    billingParty :  ['', []],
    cnorId :  ['', []],
    cneeId :  ['', []],
    oth2DedAmt :  ['', []],
    deductRemarks :  ['', []],
    productId :  ['', []],
  });
}  

getBrokerList(): void {
  this.commonService.getBrokerList().subscribe((res) => {
    this.brokerList = res;
  });
}
getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}
getLocationList(): void {
  this.commonService.getLocationList().subscribe((res) => {
    this.locationList = res;
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


exit(): void {
  this.route.navigate(['/chlnenquiry']);
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






search(): void {
  var selectedDataVal = this.formFilter.getRawValue();
  this.requestmodel.strRequest = selectedDataVal.challanNo;
  this.challanService.getChallanEnqDetails(this.requestmodel).subscribe((res) => {
    this.selectedChnDetails = res;
    this.formUser.patchValue(this.selectedChnDetails);
    this.formUser.patchValue({
      challanDateTime: this.commonService.formatDate(this.selectedChnDetails.challanDateTime) ,
      expArrivalDate : this.commonService.formatDate(this.selectedChnDetails.expArrivalDate),
     // ewayBillExpDate : this.commonService.formatDate(this.selectedLrDetails.ewayBillExpDate),
     // invoiceDt : this.commonService.formatDate(this.selectedLrDetails.invoiceDate),   
      //shipmentDt : this.commonService.formatDate(this.selectedLrDetails.shipmentDt),   
      challanFromStn: this.locationList.find(e => e.dataId == this.selectedChnDetails.challanFromStn),
      challanToStn: this.locationList.find(e => e.dataId == this.selectedChnDetails.challanToStn), 
      brokerId : this.brokerList.find(e => e.dataId == this.selectedChnDetails.brokerId),              
    })      
        
    this.getChallanEnqInnerGridList();
  });
}

getChallanEnqInnerGridList(): void {
  this.requestmodel.strRequest = this.selectedChnDetails.challanId;
  this.challanService.getChallanEnqInnerGridList(this.requestmodel).subscribe((res) => {
    this.challan = res;
   
    this.formChlnArray.clear();
    this.formLhpmArray.clear();
   
    

    for (var i = 0; i < res.cnList.length; i++) {
      this.formChlnArray.push(this.createCnInitialArray());
      this.formChlnArray.controls[i].get("bookingPlace")?.setValue(res.cnList[i].bookingPlace);
     // this.formChlnArray.controls[i].get("bookedAt")?.setValue(this.commonService.formatDate(res.chlnList[i].bookedAt));

      this.formChlnArray.controls[i].get("bookedAt")?.setValue(res.cnList[i].bookedAt);
      this.formChlnArray.controls[i].get("gcNoteNo")?.setValue(res.cnList[i].gcNoteNo);
      this.formChlnArray.controls[i].get("bookingDate")?.setValue(this.commonService.formatDate(res.cnList[i].bookingDate));
      this.formChlnArray.controls[i].get("bookingStatus")?.setValue(res.cnList[i].bookingStatus);
      this.formChlnArray.controls[i].get("ewayBillEntryType")?.setValue(res.cnList[i].ewayBillEntryType);
      this.formChlnArray.controls[i].get("ewayBillNo")?.setValue(res.cnList[i].ewayBillNo);
      this.formChlnArray.controls[i].get("ewayBillDate")?.setValue(res.cnList[i].ewayBillDate);
      this.formChlnArray.controls[i].get("ewayBillExpDate")?.setValue(res.cnList[i].ewayBillExpDate);
      this.formChlnArray.controls[i].get("fromPlace")?.setValue(res.cnList[i].fromPlace);
      this.formChlnArray.controls[i].get("toPlace")?.setValue(res.cnList[i].toPlace);
      this.formChlnArray.controls[i].get("kms")?.disable();
      this.formChlnArray.controls[i].get("truckNo")?.disable();
      this.formChlnArray.controls[i].get("billingParty")?.disable();
      this.formChlnArray.controls[i].get("cnorId")?.disable();
      this.formChlnArray.controls[i].get("cneeId")?.disable();
      this.formChlnArray.controls[i].get("productId")?.disable();
      
      
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
    
   
  });
}

}



