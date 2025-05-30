import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { Billsmastermodel } from 'src/app/models/billsmastermodel';
import { MrService } from 'src/app/services/mr.service';
import { BillsMasterService } from 'src/app/services/billsmaster.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';
import { Panvalidapiresultmodel } from 'src/app/models/panvalidapiresultmodel';
import { Mrmodel } from 'src/app/models/mrmodel';


@Component({
  selector: 'app-billenquiry',
  templateUrl: './billenquiry.component.html',
  styleUrls: ['./billenquiry.component.css']
})
export class BillenquiryComponent {
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
dashboard: string ="";
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  brokerList: Dropdownmodel[] = [];

  responseDetails = new Responsemodel();
  eWayBillDetails = new Mrmodel();
  partyLocationList :Dropdownmodel[] = [];
 
  selectedBillDetails = new Billsmastermodel();
  keywordLocation = 'dataName';
  attach1: string = "";
  formFilter!: FormGroup;

  step1Active = true;
  step2Active = false;
  step3Active = false;
  
  constructor(private route: Router, private formBuilder: FormBuilder,
    private billmodel:Billsmastermodel, private billService: BillsMasterService,
    private commonService: CommonService,
    private sharedService: SharedService,
    private toastrService: ToastrService,
    private requestmodel: Requestmodel) {
    this.billmodel = new Billsmastermodel();


}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Bill Enquiry");
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
  var userbranchcode = sessionStorage.getItem('userBranch')?.toString();  
  if (typeof userbranchcode !== 'undefined' && userbranchcode !== null && userbranchcode !== '') {
    this.branch = userbranchcode;
  }
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }
    
  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
  
  this.fromDate = this.minDate ;
  
  
  this.selectedBillDetails = this.billService.getBillsMasterDetails();

  this.formFilter = this.formBuilder.group({
    billNo: new FormControl('',),
    yearId: new FormControl(this.year,),
    branch: new FormControl(this.branch,),
  });
  this.getBranchList();
 this.getLocationList();
 this.getYearList();
 this.getBillingPartyList();
 setTimeout(() => { 
  this.getPartyGstLocationList(this.selectedBillDetails.partyCode);
  this.formUser.patchValue({
    partyGstLocation : this.partyLocationList.find(e => e.dataId == this.selectedBillDetails.partyGstLocation),  
  }) 
}, 2000);  


 this.getBrokerList();

  this.formUser = this.formBuilder.group({
  billingStation: new FormControl(this.branch,[Validators.required]),
  billNo: new FormControl('',[Validators.required]),
  billDate: new FormControl(this.loginDate,[Validators.required]),
  dueDate: new FormControl('',[Validators.required]),
  sacHsn: new FormControl('',),
  partyCode: new FormControl('',[Validators.required]),
  partyGstLocation: new FormControl('',[Validators.required]),
  collBranch: new FormControl(this.branch,[Validators.required]),
  gstType: new FormControl('N',[Validators.required]),
  totalFreight: new FormControl('',[Validators.required]),
  totalStatistical: new FormControl(''),
  totalFov: new FormControl(''),
  totalDoorColl: new FormControl('',),
  totalHandling: new FormControl(''),
  totalLoadingDetn: new FormControl(''),
  totalEnroute: new FormControl(''),
  totalMisc: new FormControl(''),
  totalDoorDel: new FormControl(''),
  totalUnLoading: new FormControl(''),
  totalExtras: new FormControl(''),
  totalOthers: new FormControl(''),
  totalSubTotal: new FormControl(''),
  totalSgstAmt: new FormControl(''),
  totalCgstAmt: new FormControl(''),
  totalIgstAmt: new FormControl(''),
  totalNonGstAmt1: new FormControl(''),
  totalNonGstAmt2: new FormControl(''),
  totalGtotal: new FormControl('',[Validators.required]),
  billRemarks: new FormControl('',),
  enlcosedDocs: new FormControl('',),

  loggedInUser :  new FormControl(''),

  billsEnqListData: this.formBuilder.array([this.createInitialBillArray()]), 
  billSubmitList: this.formBuilder.array([this.createInitialSubmitArray()]), 
  mrList: this.formBuilder.array([this.createInitialMrArray()]), 
});

const controls = this.formUser.controls;
for (const name in controls) {
 controls[name].disable();      
}   
}

get f() { return this.formUser.controls; }

get formBillArray() {
  return this.formUser.get("billsEnqListData") as FormArray;
}
get formSubmitArray() {
  return this.formUser.get("billSubmitList") as FormArray;
}
get formMrArray() {
  return this.formUser.get("mrList") as FormArray;
}


createInitialBillArray() {
  return this.formBuilder.group({
    billDetailId:  ['', []],
      billsMasterId:  ['', []],
      billingStation:  ['', []],

      bookingPlace:  ['', []],
      bookingDate:  ['', []],
      rateRs:  ['', []],
      freightRs:  ['', []],
      subTotalRs:  ['', []],
      gstType:  ['', []],
      gtotalRs:  ['', []],
      index:  ['', []],
      billNo:  ['', []],
      billDate:  ['', []],
      billType:  ['', []],
      partyCode:  ['', []],
      gcBranch:  ['', []],
      gcNoteNo:  ['', []],
      fromPlace:  ['', []],
      toPlace:  ['', []],
      consignmentid:  ['', []],
      statistical:  ['', []],
      fov:  ['', []],
      doorColl:  ['', []],
      handling:  ['', []],
      loadingDetn:  ['', []],
      enroute:  ['', []],
      misc:  ['', []],
      doorDel:  ['', []],
      unLoading:  ['', []],
      detention:  ['', []],
      extras:  ['', []],
      others:  ['', []],
      subTotal:  ['', []],
      sgstAmt:  ['', []],
      cgstAmt:  ['', []],
      igstAmt:  ['', []],
      nonGstAmt1:  ['', []],
      nonGstAmt2:  ['', []],
      gtotal:  ['', []],
      dedAmt:  ['', []],
      yearId:  ['', []],
      suppBillDetRemarks:  ['', []],
      remarks1:  ['', []],
      remarks2:  ['', []],
      remarks3:  ['', []],
      otherAmt:  ['', []],
    
    
  });
}  
getYearList():void{
  this.commonService.getYearList().subscribe((res) => {
    this.yearList = res;
  });
}   


getPartyGstLocationList(party:string): void {
  this.requestmodel.strRequest = party;
  this.billService.getPartyGstLocationList(this.requestmodel).subscribe((res) => {
    this.partyLocationList = res;
  });    
}

createInitialSubmitArray() {
  return this.formBuilder.group({
    submitStn : ['', []], 
    submitNo : ['', []],
    submitDt : ['', []],
    submitType : ['', []],
    courierCo : ['', []],
    courierDocketNo : ['', []],
    partyCode :['', []],
    submitLocation : ['', []],
    deptId : ['', []],
    billsUptoDt :['', []],
    kindAttnTo : ['', []],
    remarks : ['', []],
    partyAccceptRemarks : ['', []],
    totalSubmitAmt : ['', []],
    refDocAttachedImage : ['', []],
    branchCode : ['', []], 
  });
}  
createInitialMrArray() {
  return this.formBuilder.group({
    mrStation:  ['', []],
    mrNo:  ['', []],
    mrDate:  ['', []],
    mrStatus: ['', []],
    mrType:  ['', []],
    mrReceiptType:  ['', []],
    billLrOthType: ['', []],
    partyCode:  ['', []],
    groupMrYN:  ['', []],
    partyGroupId:  ['', []],
    cheqCashAmt:  ['', []],
    onAcAdjAmt:  ['', []],
    onAcStatus:  ['', []],
    onAcAdjusted:  ['', []],
    onAcAdjMrYn:  ['', []],
    selectedAll:  ['', []],
    onAcNewAmt:  ['', []],
    totalRecdAmt:  ['', []],
    totalFreightDed:  ['', []],
    totalClaimsDed:  ['', []],
    totalBankChrgDed:  ['', []],
    totalOthersDed1: ['', []],
    totalOthersDed2:  ['', []],
    totalOthersDed3:  ['', []],
    totalDed:  ['', []],
    totalTDSDed: ['', []],
    totalSdEmdDed:  ['', []],
    totalExcess:  ['', []],
    mrRemarks: ['', []],
    neftYN: ['', []],
    mrDebitAc: ['', []],
    mrSdEmdAc: ['', []],
    chequeNo: ['', []],
    chequeDt: ['', []],
    partyBankDet: ['', []],
    sdEmdRefNo: ['', []],
    modifyRemarks: ['', []],
    totDed: ['', []],
    excessRecd: ['', []],
    othersDed1: ['', []],
    othersDed2: ['', []],
    totalOthersDed: ['', []],
    othersDed3: ['', []],
    totalRecoverable: ['', []],
    totalOthers1: ['', []],
    totalOthers2: ['', []],
   
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
getBillingPartyList(): void {
  this.commonService.getBillingPartyList().subscribe((res) => {
    this.partyList = res;
  });
}
getLocationList(): void {
  this.commonService.getLocationList().subscribe((res) => {
    this.locationList = res;
  });
}
// getPartyGstLocationList(party:string): void {
//   this.requestmodel.strRequest = party;
//   this.billsMasterService.getPartyGstLocationList(this.requestmodel).subscribe((res) => {
//     this.partyLocationList = res;
//   });    
// }

exit(): void {
  this.route.navigate(['/billenquiry']);
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
  this.requestmodel.strRequest = selectedDataVal.billNo;
  this.requestmodel.strRequest1 = selectedDataVal.branch;
  this.requestmodel.strRequest2 = selectedDataVal.yearId;
  this.billService.getBillEnqDetails(this.requestmodel).subscribe((res) => {
    this.selectedBillDetails = res;
    this.formUser.patchValue(this.selectedBillDetails);
    this.formUser.patchValue({
      billDate:this.commonService.formatDate(this.selectedBillDetails.billDate), 
      dueDate:this.commonService.formatDate(this.selectedBillDetails.dueDate), 
      partyCode :this.partyList.find(e => e.dataId == this.selectedBillDetails.partyCode),
    })     
    this.getBillEnqInnerGridList();
    

  });

}

getBillEnqInnerGridList(): void {
  this.requestmodel.strRequest = this.selectedBillDetails.billsMasterId;
  this.billService.getBillEnqInnerGridList(this.requestmodel).subscribe((res) => {
    this.billmodel = res;
   
   this.formBillArray.clear();
    this.formSubmitArray.clear();
    this.formMrArray.clear();
   
    

    for (var i = 0; i < res.billsEnqListData.length; i++) {
      this.formBillArray.push(this.createInitialBillArray());
      this.formBillArray.controls[i].get("bookingPlace")?.setValue(res.billsEnqListData[i].bookingPlace);
      this.formBillArray.controls[i].get("bookingDate")?.setValue(this.commonService.formatDate(res.billsEnqListData[i].bookingDate));
    // this.formBillArray.controls[i].get("bookingDate")?.setValue(res.billsEnqListData[i].bookingDate);
      this.formBillArray.controls[i].get("gcNoteNo")?.setValue(res.billsEnqListData[i].gcNoteNo);
      this.formBillArray.controls[i].get("fromPlace")?.setValue(res.billsEnqListData[i].fromPlace);        

      this.formBillArray.controls[i].get("toPlace")?.setValue(res.billsEnqListData[i].toPlace);
      this.formBillArray.controls[i].get("rateRs")?.setValue(res.billsEnqListData[i].rateRs);
      this.formBillArray.controls[i].get("freightRs")?.setValue(res.billsEnqListData[i].freightRs);
      this.formBillArray.controls[i].get("subTotalRs")?.setValue(res.billsEnqListData[i].subTotalRs);
     // this.formBillArray.controls[i].get("fromPlace")?.setValue(res.billsEnqListData[i].fromPlace);
      this.formBillArray.controls[i].get("gstType")?.setValue(res.billsEnqListData[i].gstType);
      this.formBillArray.controls[i].get("cgstAmt")?.setValue(res.billsEnqListData[i].cgstAmt);
      this.formBillArray.controls[i].get("sgstAmt")?.setValue(res.billsEnqListData[i].sgstAmt);
      this.formBillArray.controls[i].get("igstAmt")?.setValue(res.billsEnqListData[i].igstAmt);
      this.formBillArray.controls[i].get("nonGstAmt1")?.setValue(res.billsEnqListData[i].nonGstAmt1);
      this.formBillArray.controls[i].get("nonGstAmt2")?.setValue(res.billsEnqListData[i].nonGstAmt2);
       this.formBillArray.controls[i].get("otherAmt")?.setValue(res.billsEnqListData[i].otherAmt);
      this.formBillArray.controls[i].get("gtotalRs")?.setValue(res.billsEnqListData[i].gtotalRs);

      // this.formMrArray.controls[i].get("billLrYear")?.disable();
      // this.formMrArray.controls[i].get("billLrStn")?.disable();
      // this.formMrArray.controls[i].get("billLrNo")?.disable();
      // this.formMrArray.controls[i].get("billLrDate")?.disable();  
      // this.formMrArray.controls[i].get("partyCode")?.disable();  
      // this.formMrArray.controls[i].get("dueAmt")?.disable();
      // this.formMrArray.controls[i].get("totDed")?.disable();
      
    }       
    for (var i = 0; i < res.billSubmitList.length; i++) {
      this.formSubmitArray.push(this.createInitialSubmitArray());
      this.formSubmitArray.controls[i].get("submitStn")?.setValue(res.billSubmitList[i].submitStn);
      this.formSubmitArray.controls[i].get("submitNo")?.setValue(res.billSubmitList[i].submitNo);
      this.formSubmitArray.controls[i].get("submitDt")?.setValue(res.billSubmitList[i].submitDt);
      this.formSubmitArray.controls[i].get("submitType")?.setValue(res.billSubmitList[i].submitType);
      this.formSubmitArray.controls[i].get("courierCo")?.setValue(res.billSubmitList[i].courierCo);
      this.formSubmitArray.controls[i].get("courierDocketNo")?.setValue(res.billSubmitList[i].courierDocketNo);
      this.formSubmitArray.controls[i].get("partyCode")?.setValue(res.billSubmitList[i].partyCode);
      this.formSubmitArray.controls[i].get("submitLocation")?.setValue(res.billSubmitList[i].submitLocation);
      this.formSubmitArray.controls[i].get("deptId")?.setValue(res.billSubmitList[i].deptId);
      this.formSubmitArray.controls[i].get("billsUptoDt")?.setValue(res.billSubmitList[i].billsUptoDt);
      this.formSubmitArray.controls[i].get("kindAttnTo")?.setValue(res.billSubmitList[i].kindAttnTo);
      this.formSubmitArray.controls[i].get("remarks")?.setValue(res.billSubmitList[i].remarks);
      this.formSubmitArray.controls[i].get("partyAccceptRemarks")?.setValue(res.billSubmitList[i].partyAccceptRemarks);
      this.formSubmitArray.controls[i].get("totalSubmitAmt")?.setValue(res.billSubmitList[i].totalSubmitAmt);
      
     // this.formMrArray.controls[i].get("billLrYear")?.disable();
    //  this.formMrArray.controls[i].get("billLrStn")?.disable();
    //  this.formMrArray.controls[i].get("billLrNo")?.disable();
     // this.formMrArray.controls[i].get("billLrDate")?.disable();  
    
      
    }         
    for (var i = 0; i < res.mrList.length; i++) {
      this.formMrArray.push(this.createInitialMrArray());
      this.formMrArray.controls[i].get("mrStation")?.setValue(res.mrList[i].mrStation);
      this.formMrArray.controls[i].get("mrNo")?.setValue(res.mrList[i].mrNo);
      this.formMrArray.controls[i].get("mrDate")?.setValue(res.mrList[i].mrDate);
      this.formMrArray.controls[i].get("mrStatus")?.setValue(res.mrList[i].mrStatus);
      this.formMrArray.controls[i].get("mrType")?.setValue(res.mrList[i].mrType);
      this.formMrArray.controls[i].get("mrReceiptType")?.setValue(res.mrList[i].mrReceiptType);
      this.formMrArray.controls[i].get("billLrOthType")?.setValue(res.mrList[i].billLrOthType);
      this.formMrArray.controls[i].get("partyCode")?.setValue(res.mrList[i].partyCode);
      this.formMrArray.controls[i].get("groupMrYN")?.setValue(res.mrList[i].groupMrYN);
      this.formMrArray.controls[i].get("partyGroupId")?.setValue(res.mrList[i].partyGroupId);
      this.formMrArray.controls[i].get("cheqCashAmt")?.setValue(res.mrList[i].cheqCashAmt);
      this.formMrArray.controls[i].get("onAcAdjAmt")?.setValue(res.mrList[i].onAcAdjAmt);
      this.formMrArray.controls[i].get("onAcStatus")?.setValue(res.mrList[i].onAcStatus);
      this.formMrArray.controls[i].get("onAcAdjusted")?.setValue(res.mrList[i].onAcAdjusted);
      this.formMrArray.controls[i].get("onAcAdjMrYn")?.setValue(res.mrList[i].onAcAdjMrYn);
      this.formMrArray.controls[i].get("onAcNewAmt")?.setValue(res.mrList[i].onAcNewAmt);
      this.formMrArray.controls[i].get("totalDed")?.setValue(res.mrList[i].totalDed);
      this.formMrArray.controls[i].get("totalDed")?.setValue(res.mrList[i].totalDed);
      this.formMrArray.controls[i].get("totDed")?.setValue(res.mrList[i].totDed);
      this.formMrArray.controls[i].get("excessRecd")?.setValue(res.mrList[i].excessRecd);
      this.formMrArray.controls[i].get("othersDed1")?.setValue(res.mrList[i].othersDed1);
      this.formMrArray.controls[i].get("othersDed2")?.setValue(res.mrList[i].othersDed2);
      this.formMrArray.controls[i].get("totalRecdAmt")?.setValue(res.mrList[i].totalRecdAmt);
      this.formMrArray.controls[i].get("totalFreightDed")?.setValue(res.mrList[i].totalFreightDed);
      this.formMrArray.controls[i].get("totalClaimsDed")?.setValue(res.mrList[i].totalClaimsDed);
      this.formMrArray.controls[i].get("othersDed3")?.setValue(res.mrList[i].othersDed3);
      this.formMrArray.controls[i].get("othersDed3")?.setValue(res.mrList[i].othersDed3);
      this.formMrArray.controls[i].get("totalRecoverable")?.setValue(res.mrList[i].totalRecoverable);
      this.formMrArray.controls[i].get("totalOthers1")?.setValue(res.mrList[i].totalOthers1);
      this.formMrArray.controls[i].get("totalOthers2")?.setValue(res.mrList[i].totalOthers2);
      this.formMrArray.controls[i].get("totalTDSDed")?.setValue(res.mrList[i].totalTDSDed);
      this.formMrArray.controls[i].get("totalSdEmdDed")?.setValue(res.mrList[i].totalSdEmdDed);
      this.formMrArray.controls[i].get("totalOthersDed")?.setValue(res.mrList[i].totalOthersDed);
      this.formMrArray.controls[i].get("totalBankChrgDed")?.setValue(res.mrList[i].totalBankChrgDed);

 
      
     // this.formMrArray.controls[i].get("billLrYear")?.disable();
    //  this.formMrArray.controls[i].get("billLrStn")?.disable();
    //  this.formMrArray.controls[i].get("billLrNo")?.disable();
     // this.formMrArray.controls[i].get("billLrDate")?.disable();  
    
      
    }         
      
    
   
   
  });
}

}


