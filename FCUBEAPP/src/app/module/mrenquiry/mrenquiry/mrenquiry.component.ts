
import { Component, OnInit ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { Challanmastermodel } from 'src/app/models/challanmastermodel';
import { MrService } from 'src/app/services/mr.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';
import { Panvalidapiresultmodel } from 'src/app/models/panvalidapiresultmodel';
import { Mrmodel } from 'src/app/models/mrmodel';

@Component({
  selector: 'app-mrenquiry',
  templateUrl: './mrenquiry.component.html',
  styleUrls: ['./mrenquiry.component.css']
})
export class MrenquiryComponent {
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
  yearList: Dropdownmodel[] = [];
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
  eWayBillDetails = new Mrmodel();
 
  selectedMrDetails = new Mrmodel();
  keywordLocation = 'dataName';
  attach1: string = "";
  formFilter!: FormGroup;

  step1Active = true;
  step2Active = false;
  step3Active = false;
  
  constructor(private route: Router, private formBuilder: FormBuilder,
    private mrmodel: Mrmodel, private mrService: MrService,
    private commonService: CommonService,
    private sharedService: SharedService,
    private toastrService: ToastrService,
    private requestmodel: Requestmodel) {
    this.mrmodel = new Mrmodel();


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


  
  this.selectedMrDetails = this.mrService.getMrDetails();

  this.formFilter = this.formBuilder.group({
    mrNo: new FormControl('',),
    yearId: new FormControl(this.year,),
    branch: new FormControl(this.branch,),

  });
      this.getBranchList();
      this.getYearList()
     this.getLocationList();
     this.getBillingPartyList();
  
   // this.getBrokerList();
  this.formUser = this.formBuilder.group({
    mrStation: new FormControl(this.branch,[Validators.required]),
    mrNo: new FormControl('', [Validators.required]),
    mrDate: new FormControl(this.loginDate, [Validators.required]),
    mrStatus: new FormControl('', ),
    mrType: new FormControl('B', [Validators.required]),
    mrReceiptType: new FormControl('',[Validators.required]),
    billLrOthType: new FormControl('B',),
    partyCode: new FormControl('',[Validators.required]),
    groupMrYN: new FormControl('',),
    partyGroupId: new FormControl('',[Validators.required]),
    cheqCashAmt: new FormControl('',[Validators.required]),
    onAcAdjAmt: new FormControl('',),
    onAcStatus: new FormControl('',),
    onAcAdjusted: new FormControl('',),
    onAcAdjMrYn: new FormControl('',),
    selectedAll: new FormControl('',),
    onAcNewAmt: new FormControl('0',),
    totalRecdAmt: new FormControl('0',),
    totalFreightDed: new FormControl('0',),
    totalClaimsDed: new FormControl('0',),
    totalBankChrgDed: new FormControl('0',),
    totalOthersDed: new FormControl('0',),
    totalOthersDed1: new FormControl('0',),
    totalOthersDed2: new FormControl('0',),
    totalOthersDed3: new FormControl('0',),
    totalRecoverable : new FormControl('0',),
    totalDed: new FormControl('0',),
    totalTDSDed: new FormControl('0',),
    totalSdEmdDed: new FormControl('0',),
    totalExcess: new FormControl('0',),
    mrRemarks:new FormControl('',),
    neftYN:new FormControl('',),
    mrDebitAc:new FormControl('',[Validators.required]),
    mrSdEmdAc:new FormControl('',),
    chequeNo:new FormControl('',),
    chequeDt:new FormControl(this.loginDate,[Validators.required]),
    partyBankDet:new FormControl('',),
    sdEmdRefNo:new FormControl('',),
    modifyRemarks:new FormControl('',),

    arrayMrList: this.formBuilder.array([this.createInitialMrArray()]), 
    mrOnAcList: this.formBuilder.array([this.createInitialOnAcArray()]), 
    mrAdjList: this.formBuilder.array([this.createInitialAdjArray()]), 
    
  });
  
  const controls = this.formUser.controls;
  for (const name in controls) {
    controls[name].disable();      
  }   
}

get f() { return this.formUser.controls; }


get formMrArray() {
  return this.formUser.get("arrayMrList") as FormArray;
}
get formOnAcArray() {
  return this.formUser.get("mrOnAcList") as FormArray;
}
get formAdjArray() {
  return this.formUser.get("mrAdjList") as FormArray;
}

createInitialMrArray() {
  return this.formBuilder.group({
    billLrMasterId:  ['', []],
      billLrNo:  ['', []],
      billLrYear:  ['', []],
      billLrStn:  ['', []],
      billLrDate:  ['', []],
      partyCode:  ['', []],
      dueAmt:  ['0', []],
      oldDueAmt:  ['0', []],
      recdAmt: ['0', []],
      freightDed: ['0', []],
      claimsDed: ['0', []],
      bankChrgDed:['0', []],
      othersDed: ['0', []],
      othersDed1: ['0', []],
      othersDed2: ['0', []],
      othersDed3: ['0', []],
      // recoverable: ['0', []],
      totDed: ['0', []],
      tdsDed: ['0', []],
      sdEmdDed: ['0', []],
      excessRecd: ['0', []],
      remarks: ['', []],
  });
}  

createInitialOnAcArray() {
  return this.formBuilder.group({
    adjMrStn:  ['', []],
    adjMrNo:  ['', []],
    adjAmt:  ['', []],
  });
}  
createInitialAdjArray() {
  return this.formBuilder.group({
    mrStation:  ['', []],
    mrNo:  ['', []],
    mrDate:  ['', []],
    adjAmt:  ['', []],
  });
}  

getBrokerList(): void {
  this.commonService.getBrokerList().subscribe((res) => {
    this.brokerList = res;
  });
}
getYearList():void{
  this.commonService.getYearList().subscribe((res) => {
    this.yearList = res;
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

exit(): void {
  this.route.navigate(['/mrenquiry']);
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
  this.requestmodel.strRequest = selectedDataVal.mrNo;
  this.requestmodel.strRequest1 = selectedDataVal.branch;
  this.requestmodel.strRequest2 = selectedDataVal.yearId;
  this.mrService.getMrEnqDetails(this.requestmodel).subscribe((res) => {
    this.selectedMrDetails = res;
    this.formUser.patchValue(this.selectedMrDetails);
    this.formUser.patchValue({
      //challanDateTime: this.commonService.formatDate(this.selectedMrDetails.challanDateTime) ,
      mrDate : this.commonService.formatDate(this.selectedMrDetails.mrDate),
     // ewayBillExpDate : this.commonService.formatDate(this.selectedLrDetails.ewayBillExpDate),
     // invoiceDt : this.commonService.formatDate(this.selectedLrDetails.invoiceDate),   
      //shipmentDt : this.commonService.formatDate(this.selectedLrDetails.shipmentDt),   
      // challanFromStn: this.locationList.find(e => e.dataId == this.selectedChnDetails.challanFromStn),
      // challanToStn: this.locationList.find(e => e.dataId == this.selectedChnDetails.challanToStn), 
      // brokerId : this.brokerList.find(e => e.dataId == this.selectedChnDetails.brokerId),  
      partyCode : this.partyList.find(e => e.dataId == this.selectedMrDetails.partyCode),              
    })      
        
    this.getMrEnqInnerGridList();
  });
}

getMrEnqInnerGridList(): void {
  this.requestmodel.strRequest = this.selectedMrDetails.mrMasterId;
  this.mrService.getMrEnqInnerGridList(this.requestmodel).subscribe((res) => {
    this.mrmodel = res;
   
    this.formMrArray.clear();
  //  this.formLhpmArray.clear();
   
    

    for (var i = 0; i < res.mrDtlsList.length; i++) {
      this.formMrArray.push(this.createInitialMrArray());
      this.formMrArray.controls[i].get("billLrMasterId")?.setValue(res.mrDtlsList[i].billLrMasterId);
      this.formMrArray.controls[i].get("billLrYear")?.setValue(res.mrDtlsList[i].billLrYear);
      this.formMrArray.controls[i].get("billLrStn")?.setValue(res.mrDtlsList[i].billLrStn);
      this.formMrArray.controls[i].get("billLrNo")?.setValue(res.mrDtlsList[i].billLrNo);        
    //  this.formMrArray.controls[i].get("billLrDate")?.setValue(this.commonService.formatDate(res.mrDtlsList[i].billLrDate));
      this.formMrArray.controls[i].get("partyCode")?.setValue(res.mrDtlsList[i].partyCode);
      this.formMrArray.controls[i].get("dueAmt")?.setValue(res.mrDtlsList[i].dueAmt);
      this.formMrArray.controls[i].get("oldDueAmt")?.setValue(res.mrDtlsList[i].oldDueAmt);
      this.formMrArray.controls[i].get("recdAmt")?.setValue(res.mrDtlsList[i].recdAmt);
      this.formMrArray.controls[i].get("freightDed")?.setValue(res.mrDtlsList[i].freightDed);
      this.formMrArray.controls[i].get("claimsDed")?.setValue(res.mrDtlsList[i].claimsDed);
      this.formMrArray.controls[i].get("bankChrgDed")?.setValue(res.mrDtlsList[i].bankChrgDed);
      this.formMrArray.controls[i].get("othersDed")?.setValue(res.mrDtlsList[i].othersDed);
      this.formMrArray.controls[i].get("othersDed1")?.setValue(res.mrDtlsList[i].othersDed1);
      this.formMrArray.controls[i].get("othersDed2")?.setValue(res.mrDtlsList[i].othersDed2);
      this.formMrArray.controls[i].get("othersDed3")?.setValue(res.mrDtlsList[i].othersDed3);
      // this.formMrArray.controls[i].get("recoverable")?.setValue(res.mrDtlsList[i].recoverable);
      this.formMrArray.controls[i].get("totDed")?.setValue(res.mrDtlsList[i].totDed);
      this.formMrArray.controls[i].get("tdsDed")?.setValue(res.mrDtlsList[i].tdsDed);
      this.formMrArray.controls[i].get("sdEmdDed")?.setValue(res.mrDtlsList[i].sdEmdDed);
      this.formMrArray.controls[i].get("excessRecd")?.setValue(res.mrDtlsList[i].excessRecd);
      this.formMrArray.controls[i].get("remarks")?.setValue(res.mrDtlsList[i].remarks);

      this.formMrArray.controls[i].get("billLrYear")?.disable();
      this.formMrArray.controls[i].get("billLrStn")?.disable();
      this.formMrArray.controls[i].get("billLrNo")?.disable();
      this.formMrArray.controls[i].get("billLrDate")?.disable();  
      this.formMrArray.controls[i].get("partyCode")?.disable();  
      this.formMrArray.controls[i].get("dueAmt")?.disable();
      this.formMrArray.controls[i].get("totDed")?.disable();
      
    }       
    for (var i = 0; i < res.mrOnAcList.length; i++) {
      this.formOnAcArray.push(this.createInitialOnAcArray());
      this.formOnAcArray.controls[i].get("adjMrStn")?.setValue(res.mrOnAcList[i].adjMrStn);
      this.formOnAcArray.controls[i].get("adjMrNo")?.setValue(res.mrOnAcList[i].adjMrNo);
      this.formOnAcArray.controls[i].get("adjAmt")?.setValue(res.mrOnAcList[i].adjAmt);
      
     // this.formMrArray.controls[i].get("billLrYear")?.disable();
    //  this.formMrArray.controls[i].get("billLrStn")?.disable();
    //  this.formMrArray.controls[i].get("billLrNo")?.disable();
     // this.formMrArray.controls[i].get("billLrDate")?.disable();  
    
      
    }         
    for (var i = 0; i < res.mrAdjList.length; i++) {
      this.formAdjArray.push(this.createInitialAdjArray());
      this.formAdjArray.controls[i].get("mrStation")?.setValue(res.mrAdjList[i].mrStation);
      this.formAdjArray.controls[i].get("mrNo")?.setValue(res.mrAdjList[i].mrNo);
      this.formAdjArray.controls[i].get("mrDate")?.setValue(res.mrAdjList[i].mrDate);
      this.formAdjArray.controls[i].get("adjAmt")?.setValue(res.mrAdjList[i].adjAmt);
      
     // this.formMrArray.controls[i].get("billLrYear")?.disable();
    //  this.formMrArray.controls[i].get("billLrStn")?.disable();
    //  this.formMrArray.controls[i].get("billLrNo")?.disable();
     // this.formMrArray.controls[i].get("billLrDate")?.disable();  
    
      
    }         
      
    
   
   
  });
}

}

