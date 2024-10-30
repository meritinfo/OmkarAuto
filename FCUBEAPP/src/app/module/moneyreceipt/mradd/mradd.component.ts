import { Component,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Mrmodel  } from 'src/app/models/mrmodel';
import { Mrlistmodel  } from 'src/app/models/mrlistmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { DocRenewalEntryService } from 'src/app/services/docrenewalentry.service';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { Constants } from 'src/app/common/constants';
import { MrService } from 'src/app/services/mr.service';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';

@Component({
  selector: 'app-mradd',
  templateUrl: './mradd.component.html',
  styleUrls: ['./mradd.component.css']
})
export class MraddComponent {
  formUser!: FormGroup;
  neftPmtSelected: boolean=false;
  loggedInUserID: string = '';
  year: string = '';
  loginDate: string = '';
  branchid:string = '';
  fromDate: string = '';
  minDate: string = '';
  maxDate: string = '';
  keywordLocation = 'dataName';
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  debitAcList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  partyGroupList: Dropdownmodel[] = [];
  accountList: Dropdownmodel[] = [];
  sdaccountList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  seriesDoc: string = "";

  selectedParty = new Dropdownmodel(); 
  selectedBillLR = new Reportmodel();
  selectedMrDetails = new Mrmodel(); 
  attach1: string = "";
  attach2: string = "";
  
  @ViewChild('attach1Input', {
    static: true
  }) attach1Input: any;
  @ViewChild('attach2Input', {
    static: true
  }) attach2Input: any;


  constructor(private formBuilder: FormBuilder,private route: Router, 
    private mrmodel: Mrmodel, private requestmodel:Requestmodel,
    private mrService: MrService, private sharedService: SharedService,       
    private toasterService: ToastrService,
    private docrenewalEntryService:DocRenewalEntryService,
    private cashReceiptEntryService: CashReceiptEntryService,
    private commonService: CommonService) {
  }

  ngOnInit() {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Money Receipt (MR)");     
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
      this.branchid = userbranchcode;
    }
    else {
      this.route.navigate(['/']);
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
    
    this.formUser = this.formBuilder.group({
      mrStation: new FormControl(this.branchid,[Validators.required]),
      mrNo: new FormControl('', [Validators.required]),
      mrDate: new FormControl(this.loginDate, [Validators.required]),
      mrStatus: new FormControl('', ),
      mrType: new FormControl('B', [Validators.required]),
      mrReceiptType: new FormControl('',),
      billLrOthType: new FormControl('B',),
      partyCode: new FormControl('',[Validators.required]),
      groupMrYN: new FormControl('',),
      partyGroupId: new FormControl('',[Validators.required]),
      cheqCashAmt: new FormControl('',),
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
      chequeNo:new FormControl('',[Validators.required]),
      chequeDt:new FormControl(this.loginDate,[Validators.required]),
      partyBankDet:new FormControl('',),
      sdEmdRefNo:new FormControl('',),
      modifyRemarks:new FormControl('',),

      mrarrayList: this.formBuilder.array([this.createInitialMrArray()])  ,    
      arrayList: this.formBuilder.array([this.createInitialArray()])      
    });
    
    this.sharedService.loading=true;
    this.getDebitAcList();
    this.getBranchList();
    this.getBillingPartyList();
    this.getPartyGroupList();
    this.getAccountList("BC");
    this.getSdAccountList();
    this.getYearList();

    this.selectedMrDetails = this.mrService.getMrDetails();

   
    this.formUser.controls['mrStation'].disable();  
    this.formUser.controls['neftYN'].disable();
    this.formUser.controls['chequeNo'].disable();      
    this.formUser.controls['chequeDt'].disable();   

    this.formUser.controls['chequeNo'].clearValidators();      
    this.formUser.controls['chequeDt'].clearValidators(); 
    this.formUser.controls['chequeNo'].updateValueAndValidity();
    this.formUser.controls['chequeDt'].updateValueAndValidity();
    
    this.formUser.controls['partyGroupId'].disable();    
    this.formUser.controls['partyGroupId'].clearValidators(); 
    this.formUser.controls['partyGroupId'].updateValueAndValidity();
         
    this.formUser.controls['onAcNewAmt'].disable();  
    
    this.formUser.controls['totalRecdAmt'].disable();
    this.formUser.controls['totalFreightDed'].disable();
    this.formUser.controls['totalClaimsDed'].disable();
    this.formUser.controls['totalBankChrgDed'].disable();
    this.formUser.controls['totalOthersDed'].disable();
    this.formUser.controls['totalOthersDed1'].disable();
    this.formUser.controls['totalOthersDed2'].disable();
    this.formUser.controls['totalOthersDed3'].disable();
    this.formUser.controls['totalRecoverable'].disable(); 
    this.formUser.controls['totalDed'].disable(); 
    this.formUser.controls['totalTDSDed'].disable();
    this.formUser.controls['totalSdEmdDed'].disable();
    this.formUser.controls['totalExcess'].disable();
    this.formUser.controls['onAcAdjAmt'].disable();
    this.formUser.controls['modifyRemarks'].disable();
    this.formUser.controls['mrSdEmdAc'].disable();   
    this.formUser.controls['sdEmdRefNo'].disable(); 
    
    this.formUser.controls['mrSdEmdAc'].clearValidators(); 
    this.formUser.controls['mrSdEmdAc'].updateValueAndValidity();
    
    if (this.selectedMrDetails.mrMasterId != '') { 
      var selectedValue = this.selectedMrDetails.mrReceiptType;
      if(selectedValue=='J') {selectedValue = 'BC'}
      if(selectedValue=='M') {selectedValue = 'C'}
      
      this.getAccountList(selectedValue);
    }
    
    setTimeout(() => {
        
      this.formMrArray.controls[0].get("selected")?.disable();  
      this.formMrArray.controls[0].get("adjMrNo")?.disable();  
      this.formMrArray.controls[0].get("onAcAmt")?.disable();  
      this.formMrArray.controls[0].get("adjAmt")?.disable();  

      if (this.selectedMrDetails.mrMasterId != '') {  
        this.formUser.controls['mrNo'].disable();  
        this.formUser.controls['mrDate'].disable();  
        this.formUser.controls['mrStatus'].disable();  
        this.formUser.controls['mrType'].disable();  
        this.formUser.controls['mrReceiptType'].disable();  
        this.formUser.controls['billLrOthType'].disable();  
        this.formUser.controls['partyCode'].disable();  
        this.formUser.controls['groupMrYN'].disable();  
        this.formUser.controls['partyGroupId'].disable();  
        this.formUser.controls['modifyRemarks'].enable(); 
    
        this.formUser.patchValue(this.selectedMrDetails);        
        if(this.selectedMrDetails.ftmid!="0"){
          this.getFinDocDetails(this.selectedMrDetails.ftmid);
        }
        this.formUser.patchValue({
          mrDate: this.commonService.formatDate(this.selectedMrDetails.mrDate),
          chequeDt: this.commonService.formatDate(this.selectedMrDetails.chequeDt),
          partyCode: this.partyList.find(e => e.dataId == this.selectedMrDetails.partyCode),
          mrDebitAc: this.accountList.find(e => e.dataId == this.selectedMrDetails.mrDebitAc),
        });

        if (this.selectedMrDetails.mrStatus!="C"){
          this.formUser.patchValue({
            mrStatus: ""
          });
        }
        if (this.selectedMrDetails.groupMrYN=="N"){
          this.formUser.patchValue({
            groupMrYN: ""
          });
        }
        if (this.selectedMrDetails.onAcStatus=="P"){
          this.formUser.patchValue({
            onAcStatus: ""
          });
        }
        if (this.selectedMrDetails.onAcAdjMrYn=="N"){
          this.formUser.patchValue({
            onAcAdjMrYn: ""
          });
        }
        if (this.selectedMrDetails.neftYN=="N"){
          this.formUser.patchValue({
            neftYN: ""
          });
        }

        if(this.selectedMrDetails.mrType=="S"){      
          this.formUser.controls['mrSdEmdAc'].enable();    
          this.formUser.controls['sdEmdRefNo'].enable();       
          this.formUser.controls['mrSdEmdAc'].setValidators([Validators.required]); 
        }
        else{      
          this.formUser.controls['mrSdEmdAc'].disable();   
          this.formUser.controls['sdEmdRefNo'].disable(); 
          this.formUser.controls['mrSdEmdAc'].clearValidators();    
        }
        this.formUser.controls['mrSdEmdAc'].updateValueAndValidity();
        
        this.editMode = true;
        this.getMrInnerGridList(); 
      }
    }, 2000);
    this.sharedService.loading = false;
  }

  
  getFinDocDetails(finId: string){
    this.requestmodel.strRequest=finId;
    this.cashReceiptEntryService.getFinDocDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.seriesDoc = res.message;
      } 
      else{
        this.seriesDoc = '';
      }
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getDebitAcList(){
    this.requestmodel.strRequest= '';
    this.docrenewalEntryService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.debitAcList = res;
    });
  }

  getBillingPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }
  
  getPartyGroupList(){
    this.commonService.getPartyGroupList().subscribe((res) => {
      this.partyGroupList = res;
    });
  }
  
  getAccountList(tp:string): void {    
    this.requestmodel.strRequest= tp;
    this.cashReceiptEntryService.getAccountList(this.requestmodel).subscribe((res) => {
      this.accountList = res;
    });
  }

  getSdAccountList(): void {    
    this.requestmodel.strRequest="BC"
    this.cashReceiptEntryService.getAccountList(this.requestmodel).subscribe((res) => {
      this.sdaccountList = res;
    });
  }

  getYearList(): void {
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
    }); 
  }
  

  
  createInitialArray() {
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
  
  createInitialMrArray() {
    return this.formBuilder.group({
      selected: ['', []],
      adjMrMasterID: ['', []],
      adjMrYear: ['', []],
      adjMrStn: ['', []],
      adjMrNo: ['', []],
      mrDate: ['', []],
      onAcAmt: ['0', []],
      adjAmt: ['0', []],
    });
  }

  getMrInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedMrDetails.mrMasterId;
    this.mrService.getMrInnerGridList(this.requestmodel).subscribe((res) => {
      this.mrmodel = res;
      this.formArray.clear();
      for (var i = 0; i < res.mrDtlsList.length; i++) {
        this.formArray.push(this.createInitialArray()); 

        this.formArray.controls[i].get("billLrMasterId")?.setValue(res.mrDtlsList[i].billLrMasterId);
        this.formArray.controls[i].get("billLrYear")?.setValue(res.mrDtlsList[i].billLrYear);
        this.formArray.controls[i].get("billLrStn")?.setValue(res.mrDtlsList[i].billLrStn);
        this.formArray.controls[i].get("billLrNo")?.setValue(res.mrDtlsList[i].billLrNo);        
        this.formArray.controls[i].get("billLrDate")?.setValue(this.commonService.formatDate(res.mrDtlsList[i].billLrDate));
        this.formArray.controls[i].get("partyCode")?.setValue(res.mrDtlsList[i].partyCode);
        this.formArray.controls[i].get("dueAmt")?.setValue(res.mrDtlsList[i].dueAmt);
        this.formArray.controls[i].get("oldDueAmt")?.setValue(res.mrDtlsList[i].oldDueAmt);
        this.formArray.controls[i].get("recdAmt")?.setValue(res.mrDtlsList[i].recdAmt);
        this.formArray.controls[i].get("freightDed")?.setValue(res.mrDtlsList[i].freightDed);
        this.formArray.controls[i].get("claimsDed")?.setValue(res.mrDtlsList[i].claimsDed);
        this.formArray.controls[i].get("bankChrgDed")?.setValue(res.mrDtlsList[i].bankChrgDed);
        this.formArray.controls[i].get("othersDed")?.setValue(res.mrDtlsList[i].othersDed);
        this.formArray.controls[i].get("othersDed1")?.setValue(res.mrDtlsList[i].othersDed1);
        this.formArray.controls[i].get("othersDed2")?.setValue(res.mrDtlsList[i].othersDed2);
        this.formArray.controls[i].get("othersDed3")?.setValue(res.mrDtlsList[i].othersDed3);
        // this.formArray.controls[i].get("recoverable")?.setValue(res.mrDtlsList[i].recoverable);
        this.formArray.controls[i].get("totDed")?.setValue(res.mrDtlsList[i].totDed);
        this.formArray.controls[i].get("tdsDed")?.setValue(res.mrDtlsList[i].tdsDed);
        this.formArray.controls[i].get("sdEmdDed")?.setValue(res.mrDtlsList[i].sdEmdDed);
        this.formArray.controls[i].get("excessRecd")?.setValue(res.mrDtlsList[i].excessRecd);
        this.formArray.controls[i].get("remarks")?.setValue(res.mrDtlsList[i].remarks);

        this.formArray.controls[i].get("billLrYear")?.disable();
        this.formArray.controls[i].get("billLrStn")?.disable();
        this.formArray.controls[i].get("billLrNo")?.disable();
        this.formArray.controls[i].get("billLrDate")?.disable();  
        this.formArray.controls[i].get("partyCode")?.disable();  
        this.formArray.controls[i].get("dueAmt")?.disable();
        this.formArray.controls[i].get("totDed")?.disable();
      }

      this.formMrArray.clear();
      for (var i = 0; i < res.mrOnAcList.length; i++) {
        this.formMrArray.push(this.createInitialArray()); 

        this.formMrArray.controls[i].get("adjMrMasterID")?.setValue(res.mrOnAcList[i].adjMrMasterID);
        this.formMrArray.controls[i].get("adjMrYear")?.setValue(res.mrOnAcList[i].adjMrYear);  
        this.formMrArray.controls[i].get("adjMrStn")?.setValue(res.mrOnAcList[i].adjMrStn);  
        this.formMrArray.controls[i].get("adjMrNo")?.setValue(res.mrOnAcList[i].adjMrNo);    
        this.formMrArray.controls[i].get("mrDate")?.setValue(this.commonService.formatDate(res.mrOnAcList[i].mrDate));
        this.formMrArray.controls[i].get("onAcAmt")?.setValue(res.mrOnAcList[i].onAcAmt);
        this.formMrArray.controls[i].get("adjAmt")?.setValue(res.mrOnAcList[i].adjAmt);
      }
    });
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }
  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }
  get formMrArray() {
    return this.formUser.get("mrarrayList") as FormArray;
  }

  selectEvent(item: any) {
    // do something with selected item
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  onMrTypeChange(e: any) {   
    if(e.target.value=="S"){      
      this.formUser.controls['mrSdEmdAc'].enable();    
      this.formUser.controls['sdEmdRefNo'].enable();       
      this.formUser.controls['mrSdEmdAc'].setValidators([Validators.required]); 
    }
    else{      
      this.formUser.controls['mrSdEmdAc'].disable();   
      this.formUser.controls['sdEmdRefNo'].disable(); 
      this.formUser.controls['mrSdEmdAc'].clearValidators();    
    }
    this.formUser.controls['mrSdEmdAc'].updateValueAndValidity();
  }

  onNeftChk(e: any) {   
    this.neftPmtSelected=!this.neftPmtSelected;
    if (this.neftPmtSelected){
      this.formUser.controls['chequeNo'].disable();      
      this.formUser.controls['chequeDt'].disable();   
      this.formUser.controls['chequeNo'].clearValidators();      
      this.formUser.controls['chequeDt'].clearValidators();   
    }
    else {
      this.formUser.controls['chequeNo'].enable();      
      this.formUser.controls['chequeDt'].enable();   
      this.formUser.controls['chequeNo'].setValidators([Validators.required]);
      this.formUser.controls['chequeDt'].setValidators([Validators.required]);
    }
    this.formUser.controls['chequeNo'].updateValueAndValidity();
    this.formUser.controls['chequeDt'].updateValueAndValidity();
  }
  
  selectedData(index: number, event: any) {
    if(event.target.checked){
      this.formMrArray.controls[index].get("adjAmt")?.enable();  
    }  
    else{
      this.formMrArray.controls[index].get("adjAmt")?.disable();  
      this.formMrArray.controls[index].get("adjAmt")?.setValue("");      
    }    
  }  
  
  changeRecptType(){
    var selectedValueData= this.formUser.getRawValue();
    var selectedValue = selectedValueData.mrReceiptType;
    
    if(selectedValueData.mrType!="B" && selectedValue!="J"){
      this.toasterService.warning("Receipt Type should be only JV for selected MR Type");
      this.formUser.patchValue({
        mrReceiptType: ''
      });
      return;
    }

    if(selectedValue=="B"){      
      this.formUser.controls['neftYN'].enable();
      this.formUser.controls['chequeNo'].enable();      
      this.formUser.controls['chequeDt'].enable();   
      
      this.formUser.controls['chequeNo'].setValidators([Validators.required]);
      this.formUser.controls['chequeDt'].setValidators([Validators.required]);
    }
    else{
      this.formUser.patchValue({
        neftYN: ''
      });
      this.formUser.controls['neftYN'].disable();
      this.formUser.controls['chequeNo'].disable();      
      this.formUser.controls['chequeDt'].disable();   

      this.formUser.controls['chequeNo'].clearValidators();      
      this.formUser.controls['chequeDt'].clearValidators();  
    }
    this.formUser.controls['chequeNo'].updateValueAndValidity();
    this.formUser.controls['chequeDt'].updateValueAndValidity();
    
    if(selectedValue=='J') {selectedValue = 'BC'}
    if(selectedValue=='M') {selectedValue = 'C'}

    this.getAccountList(selectedValue);
  }

  onneftChange(e:any){
    if(e.target.checked){
      this.formUser.controls['chequeNo'].setValidators([Validators.required]);
      this.formUser.controls['chequeDt'].setValidators([Validators.required]);
    }
    else {
      this.formUser.controls['chequeNo'].clearValidators();      
      this.formUser.controls['chequeDt'].clearValidators();   
    }
    this.formUser.controls['chequeNo'].updateValueAndValidity();
    this.formUser.controls['chequeDt'].updateValueAndValidity();
  }

  addItem(i: number): void {    
    this.formUser.controls['groupMrYN'].disable();      
    this.formUser.controls['partyGroupId'].disable();    
    this.formUser.controls['partyCode'].disable();    
    this.formUser.controls['mrType'].disable();    

    var selectedDataVal = this.formUser.getRawValue();
    var recdAmt = parseFloat(selectedDataVal.arrayList[i].recdAmt);
    var remarks = selectedDataVal.arrayList[i].remarks;
    var billLrMasterId = selectedDataVal.arrayList[i].billLrMasterId;
    if (billLrMasterId!="") {
        //ignore
    }
    else{
      this.toasterService.warning("Please Enter Valid Bill/LR ");          
      return;
    }
    if (remarks != "" && recdAmt > 0) 
    {
      this.formArray.push(this.createInitialArray()); 
    }
    else {
      this.toasterService.warning("Please select Required Fields in Grid");
      return;
    }   
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
    this.calTot();
  }

  amtcheck(i:number, clm:string){
    var amtDue = 0;
    var dedTot = 0;
    var amtrecv = 0;

    var selectedDataVal=this.formUser.getRawValue();
    if(selectedDataVal.arrayList[i].dueAmt!=""){
      amtDue = amtDue + parseFloat(selectedDataVal.arrayList[i].dueAmt) ;
    }
    if(selectedDataVal.arrayList[i].oldDueAmt!=""){
      amtDue = amtDue + parseFloat(selectedDataVal.arrayList[i].oldDueAmt) ;
    }
    if(selectedDataVal.arrayList[i].recdAmt!=""){
      amtrecv = parseFloat(selectedDataVal.arrayList[i].recdAmt) ;
    }
    if(selectedDataVal.arrayList[i].freightDed!=""){
      dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].freightDed) ;
    }
    if(selectedDataVal.arrayList[i].claimsDed!=""){
      dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].claimsDed) ;
    }
    if(selectedDataVal.arrayList[i].othersDed!=""){
      dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].othersDed) ;
    }
    if(selectedDataVal.arrayList[i].bankChrgDed!=""){
      dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].bankChrgDed) ;
    }
    if(selectedDataVal.arrayList[i].othersDed1!=""){
      dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].othersDed1) ;
    }
    if(selectedDataVal.arrayList[i].othersDed2!=""){
      dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].othersDed2) ;
    }
    if(selectedDataVal.arrayList[i].othersDed3!=""){
      dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].othersDed3) ;
    }
    // if(selectedDataVal.arrayList[i].recoverable!=""){
    //   dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].recoverable) ;
    // }
    if(selectedDataVal.arrayList[i].tdsDed!=""){
      dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].tdsDed) ;
    }      
    if(selectedDataVal.arrayList[i].sdEmdDed!=""){
      dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].sdEmdDed) ;
    }
    
    if(dedTot + amtrecv > amtDue){
      this.toasterService.warning("Due Amount Should not be less than Recvd & Deduction");
      this.formArray.controls[i].get(clm)?.setValue("");
      return;
    }
    else{        
      this.formArray.controls[i].get("totDed")?.setValue(dedTot);
      this.calTot();
    }
  }

  calTot(){    
    var selectedDataVal=this.formUser.getRawValue();
    var dedTot = 0;
    var recdAmt = 0;
    var freightDed = 0;
    var claimsDed = 0;
    var othersDed = 0;
    var bankChrgDed = 0;
    var othersDed1 = 0;
    var othersDed2 = 0;
    var othersDed3 = 0;
    // var recoverable = 0;
    var totalDed = 0;
    var tdsDed = 0;
    var sdEmdDed = 0;
    var excessRecd = 0;
    

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) { 
      dedTot = 0 ; 
     
      if(selectedDataVal.arrayList[i].recdAmt!=""){
        recdAmt = recdAmt + parseFloat(selectedDataVal.arrayList[i].recdAmt) ;
      }
      if(selectedDataVal.arrayList[i].freightDed!=""){
        freightDed = freightDed + parseFloat(selectedDataVal.arrayList[i].freightDed);
        dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].freightDed) ;
      }
      if(selectedDataVal.arrayList[i].claimsDed!=""){
        claimsDed = claimsDed + parseFloat(selectedDataVal.arrayList[i].claimsDed);
        dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].claimsDed) ;
      }
      if(selectedDataVal.arrayList[i].othersDed!=""){
        othersDed = othersDed + parseFloat(selectedDataVal.arrayList[i].othersDed);
        dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].othersDed) ;
      }
      if(selectedDataVal.arrayList[i].bankChrgDed!=""){
        bankChrgDed = bankChrgDed + parseFloat(selectedDataVal.arrayList[i].bankChrgDed);
        dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].bankChrgDed) ;
      }
      if(selectedDataVal.arrayList[i].othersDed1!=""){
        othersDed1 = othersDed1 + parseFloat( selectedDataVal.arrayList[i].othersDed1);
        dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].othersDed1) ;
      }
      if(selectedDataVal.arrayList[i].othersDed2!=""){
        othersDed2 = othersDed2 + parseFloat(selectedDataVal.arrayList[i].othersDed2);
        dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].othersDed2) ;
      }
      if(selectedDataVal.arrayList[i].othersDed3!=""){
        othersDed3 = othersDed3 + parseFloat( selectedDataVal.arrayList[i].othersDed3);
        dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].othersDed3) ;
      }
      // if(selectedDataVal.arrayList[i].recoverable!=""){
      //   recoverable = recoverable + parseFloat( selectedDataVal.arrayList[i].recoverable);
      //   dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].recoverable) ;
      // }
      if(selectedDataVal.arrayList[i].tdsDed!=""){
        tdsDed = tdsDed + parseFloat( selectedDataVal.arrayList[i].tdsDed);
        dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].tdsDed) ;
      }      
      if(selectedDataVal.arrayList[i].sdEmdDed!=""){
        sdEmdDed = sdEmdDed + parseFloat( selectedDataVal.arrayList[i].sdEmdDed);
        dedTot = dedTot + parseFloat(selectedDataVal.arrayList[i].sdEmdDed) ;
      }
      if(selectedDataVal.arrayList[i].excessRecd!=""){
        excessRecd = excessRecd + parseFloat( selectedDataVal.arrayList[i].excessRecd);
      }
        
      this.formArray.controls[i].get("totDed")?.setValue(dedTot);
      totalDed = totalDed + dedTot;
    }
    
    if(recdAmt + excessRecd != parseFloat( selectedDataVal.cheqCashAmt)){
      if (selectedDataVal.groupMrYN){      
        this.toasterService.warning("Received Amount Should Match with Cash & Cheq Amount");      
        return;
      }
    }


    this.formUser.patchValue({
      totalRecdAmt: recdAmt,
      totalFreightDed:freightDed,
      totalClaimsDed:claimsDed,
      totalBankChrgDed:bankChrgDed,
      totalOthersDed:othersDed,
      totalOthersDed1:othersDed1,
      totalOthersDed2:othersDed2,
      totalOthersDed3:othersDed3,
      // totalRecoverable:recoverable,
      totalTDSDed:tdsDed,
      totalSdEmdDed:sdEmdDed,
      totalDed:totalDed,
      totalExcess:excessRecd,  
      onAcNewAmt:parseFloat( selectedDataVal.cheqCashAmt) - recdAmt - excessRecd 
    });
  }

  change(type:string){

  }
  
  onChkCancel(e: any) {  
    if(e.target.checked){

      this.formArray.clear();

      this.formUser.controls['mrType'].disable();
      this.formUser.controls['cheqCashAmt'].disable();
      this.formUser.controls['onAcStatus'].disable();
      this.formUser.controls['onAcAdjMrYn'].disable();      
      this.formUser.controls['partyCode'].disable();
      this.formUser.controls['billLrOthType'].disable();
      this.formUser.controls['groupMrYN'].disable();
      this.formUser.controls['partyGroupId'].disable();
      this.formUser.controls['mrRemarks'].disable();
      this.formUser.controls['mrReceiptType'].disable();
      this.formUser.controls['mrDebitAc'].disable();
      this.formUser.controls['mrSdEmdAc'].disable();
      this.formUser.controls['chequeNo'].disable();
      this.formUser.controls['chequeDt'].disable();
      this.formUser.controls['partyBankDet'].disable();
      this.formUser.controls['sdEmdRefNo'].disable();
      this.formUser.controls['modifyRemarks'].disable();

      this.formUser.controls['mrType'].clearValidators();     
      this.formUser.controls['partyCode'].clearValidators();
      this.formUser.controls['mrDebitAc'].clearValidators();
      this.formUser.controls['mrSdEmdAc'].clearValidators();  
      this.formUser.controls['mrSdEmdAc'].updateValueAndValidity(); 

      this.formUser.patchValue({
        groupMrYN: '',
      });
    }
    else{
      
      this.formArray.push(this.createInitialArray()); 

      this.formUser.controls['mrType'].enable();
      this.formUser.controls['cheqCashAmt'].enable();
      this.formUser.controls['onAcStatus'].enable();
      this.formUser.controls['onAcAdjMrYn'].enable();   
      this.formUser.controls['partyCode'].enable();
      this.formUser.controls['billLrOthType'].enable();
      this.formUser.controls['groupMrYN'].enable();
      this.formUser.controls['mrRemarks'].enable();
      this.formUser.controls['mrRemarks'].enable();
      this.formUser.controls['mrReceiptType'].enable();
      this.formUser.controls['mrDebitAc'].enable();
      this.formUser.controls['chequeNo'].enable();
      this.formUser.controls['chequeDt'].enable();
      this.formUser.controls['partyBankDet'].enable();
      this.formUser.controls['sdEmdRefNo'].enable();
      this.formUser.controls['modifyRemarks'].enable();
      
      this.formUser.controls['mrType'].setValidators([Validators.required]);
      this.formUser.controls['partyCode'].setValidators([Validators.required]);
      this.formUser.controls['mrDebitAc'].setValidators([Validators.required]);

      this.formUser.patchValue({
        groupMrYN: '',
      });
    }
    this.formUser.controls['mrType'].updateValueAndValidity();
    this.formUser.controls['partyCode'].updateValueAndValidity();
    this.formUser.controls['mrDebitAc'].updateValueAndValidity();
  }

  onChkGroup(e: any) {  
    if(e.target.checked){
      this.formUser.patchValue({
        partyCode: "",
      });
      this.formUser.controls['partyCode'].disable();
      this.formUser.controls['partyGroupId'].enable();
      this.formUser.controls['partyCode'].clearValidators(); 
      this.formUser.controls['partyGroupId'].setValidators([Validators.required]);
    }
    else{      
      this.formUser.patchValue({
        partyGroupId: "",
      });
      this.formUser.controls['partyCode'].enable();
      this.formUser.controls['partyGroupId'].disable();

      this.formUser.controls['partyCode'].setValidators([Validators.required]);
      this.formUser.controls['partyGroupId'].clearValidators(); 
    }
    this.formUser.controls['partyCode'].updateValueAndValidity();
    this.formUser.controls['partyGroupId'].updateValueAndValidity();
  }

  onTotAc(e: any) {  
    if(e.target.checked){
      var selectedData = this.formUser.getRawValue();
      this.formUser.patchValue({
        onAcNewAmt: selectedData.cheqCashAmt,
      });
      this.formArray.clear();

      this.formUser.controls['mrRemarks'].disable();
      this.formUser.controls['mrReceiptType'].disable();
      //this.formUser.controls['mrDebitAc'].disable();
      this.formUser.controls['mrSdEmdAc'].disable();
      this.formUser.controls['chequeNo'].disable();
      this.formUser.controls['chequeDt'].disable();
      this.formUser.controls['partyBankDet'].disable();
      this.formUser.controls['sdEmdRefNo'].disable();
      this.formUser.controls['modifyRemarks'].disable();

      
      //this.formUser.controls['mrDebitAc'].clearValidators();
      this.formUser.controls['mrSdEmdAc'].clearValidators();   
      this.formUser.controls['mrSdEmdAc'].updateValueAndValidity();
    }
    else{
      this.formUser.patchValue({
        onAcNewAmt: "",
      });      
      this.formArray.push(this.createInitialArray()); 

      this.formUser.controls['mrRemarks'].enable();
      this.formUser.controls['mrReceiptType'].enable();
      //this.formUser.controls['mrDebitAc'].enable();
      this.formUser.controls['chequeNo'].enable();
      this.formUser.controls['chequeDt'].enable();
      this.formUser.controls['partyBankDet'].enable();
      this.formUser.controls['sdEmdRefNo'].enable();
      this.formUser.controls['modifyRemarks'].enable();
      
      //this.formUser.controls['mrDebitAc'].setValidators([Validators.required]);
    }
    //this.formUser.controls['mrDebitAc'].updateValueAndValidity();

  }

  onAcAdjusted(e: any) {  
    if(e.target.checked){
      var selectedData = this.formUser.getRawValue();
      if(selectedData.groupMrYN){
        this.selectedParty.dataId = selectedData.partyGroupId;
        this.selectedParty.dataName = "G"
      }
      else{
        this.selectedParty.dataId = selectedData.partyCode?selectedData.partyCode.dataId:"";
        this.selectedParty.dataName = ""
      }
      if(this.selectedParty.dataId==""){
        this.formUser.patchValue({
          onAcAdjMrYn: "",
        });  
        this.toasterService.warning("Please Select Party / Party Group ");      
        return;
      }
      else{
        this.mrService.getOnAcMrSearchList(this.selectedParty).subscribe((res) => {
          this.mrmodel = res;

          this.formMrArray.clear();
          for (var i = 0; i < res.mrOnAcList.length; i++) {
            this.formMrArray.push(this.createInitialArray()); 
    
            this.formMrArray.controls[i].get("adjMrMasterID")?.setValue(res.mrOnAcList[i].adjMrMasterID);
            this.formMrArray.controls[i].get("adjMrYear")?.setValue(res.mrOnAcList[i].adjMrYear);  
            this.formMrArray.controls[i].get("adjMrStn")?.setValue(res.mrOnAcList[i].adjMrStn);  
            this.formMrArray.controls[i].get("adjMrNo")?.setValue(res.mrOnAcList[i].adjMrNo);    
            this.formMrArray.controls[i].get("mrDate")?.setValue(this.commonService.formatDate(res.mrOnAcList[i].mrDate));
            this.formMrArray.controls[i].get("onAcAmt")?.setValue(res.mrOnAcList[i].onAcAmt);
            this.formMrArray.controls[i].get("adjAmt")?.disable();
          }
        });
      }
    }    
  }


  adjAmtChange() {  
    var totadjAmt = 0;
    var selectedDataVal = this.formUser.getRawValue();

    for (var i = 0; i < selectedDataVal.mrarrayList.length; i++) { 
      if(selectedDataVal.mrarrayList[i].adjAmt!=""){
        totadjAmt = totadjAmt + parseFloat(selectedDataVal.mrarrayList[i].adjAmt) ;
      }
    }
    this.formUser.patchValue({
      onAcAdjAmt: totadjAmt,
    });
  }

  getBillLrDtls(index: number){
    var selectedDataVal = this.formUser.getRawValue();
    var billLrId = selectedDataVal.arrayList[index].billLrMasterId;
    for (var i = 0; i < selectedDataVal.arrayList.length - 1; i++) { 
      if(selectedDataVal.arrayList[i].billLrMasterId==billLrId){
        this.toasterService.warning("Bill / Lr Already Exists in Grid ");      
        return;
      }
    }
    if(selectedDataVal.groupMrYN){
      this.selectedBillLR.search = "G"
      this.selectedBillLR.filterStr1 = selectedDataVal.partyGroupId;
    }
    else{
      this.selectedBillLR.search = ""
      this.selectedBillLR.filterStr1 = selectedDataVal.partyCode?selectedDataVal.partyCode.dataId:"";
    }
    this.selectedBillLR.filterStr = selectedDataVal.arrayList[index].billLrNo;
    this.selectedBillLR.filterStr2 = selectedDataVal.arrayList[index].billLrStn;
    this.selectedBillLR.filterStr3 = selectedDataVal.arrayList[index].billLrYear;
    this.selectedBillLR.sortColumn = selectedDataVal.billLrOthType;

    this.mrService.getBillLRSearchDtls(this.selectedBillLR).subscribe((res) => {
      this.mrmodel = res;
      if(this.mrmodel.mrDtlsList.length > 0){
        this.formArray.controls[index].get("billLrMasterId")?.setValue(res.mrDtlsList[0].billLrMasterId);
        this.formArray.controls[index].get("billLrYear")?.setValue(res.mrDtlsList[0].billLrYear);
        this.formArray.controls[index].get("billLrStn")?.setValue(res.mrDtlsList[0].billLrStn);
        this.formArray.controls[index].get("billLrNo")?.setValue(res.mrDtlsList[0].billLrNo);        
        this.formArray.controls[index].get("billLrDate")?.setValue(this.commonService.formatDate(res.mrDtlsList[0].billLrDate));
        this.formArray.controls[index].get("partyCode")?.setValue(res.mrDtlsList[0].partyCode);
        this.formArray.controls[index].get("dueAmt")?.setValue(res.mrDtlsList[0].dueAmt);
        this.formArray.controls[index].get("oldDueAmt")?.setValue(res.mrDtlsList[0].oldDueAmt);
        this.formArray.controls[index].get("recdAmt")?.setValue(res.mrDtlsList[0].recdAmt);
        this.formArray.controls[index].get("freightDed")?.setValue("0");
        this.formArray.controls[index].get("claimsDed")?.setValue("0");
        this.formArray.controls[index].get("bankChrgDed")?.setValue("0");
        this.formArray.controls[index].get("othersDed")?.setValue("0");
        this.formArray.controls[index].get("othersDed1")?.setValue("0");
        this.formArray.controls[index].get("othersDed2")?.setValue("0");
        this.formArray.controls[index].get("othersDed3")?.setValue("0");
        // this.formArray.controls[index].get("recoverable")?.setValue("0");
        this.formArray.controls[index].get("totDed")?.setValue("0");
        this.formArray.controls[index].get("tdsDed")?.setValue("0");
        this.formArray.controls[index].get("sdEmdDed")?.setValue("0");
        this.formArray.controls[index].get("excessRecd")?.setValue("0");
        this.formArray.controls[index].get("remarks")?.setValue("");
        
        this.formArray.controls[i].get("billLrYear")?.disable();
        this.formArray.controls[i].get("billLrStn")?.disable();
        this.formArray.controls[i].get("billLrNo")?.disable();
        this.formArray.controls[i].get("billLrDate")?.disable();  
        this.formArray.controls[i].get("partyCode")?.disable();  
        this.formArray.controls[i].get("dueAmt")?.disable();
        this.formArray.controls[i].get("totDed")?.disable();
      }
      else{
        this.formArray.controls[index].get("billLrNo")?.setValue("");     
        this.toasterService.warning("Bill / Lr does not match with Party");      
        return;
      }      
    });
  }
 


  deleteMr(): void {
    if (this.selectedMrDetails.mrMasterId != '') {
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedMrDetails.mrMasterId;
      if (confirm("Are you sure, you want to delete this?")) {
        this.mrService.mrDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/mrentrylist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
        });
      }
      this.sharedService.loading=false;
    }
  }
  exit(): void {
    this.route.navigate(['/mrentrylist']);
  }

  //Submit form details //
  submitMrForm(): void {
    if (this.formUser.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }          
    
    var selectedDataVal=this.formUser.getRawValue();
    if (selectedDataVal.partyCode.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning("Invalid Party Code");
      return;
    }
    
    if (selectedDataVal.mrDebitAc.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning("Invalid Account");
      return;
    }

    this.mrmodel.mrMasterId       = this.selectedMrDetails.mrMasterId ;
    this.mrmodel.mrStation        = selectedDataVal.mrStation ; 
    this.mrmodel.mrNo             = selectedDataVal.mrNo ; 
    this.mrmodel.mrDate           = selectedDataVal.mrDate ; 
    this.mrmodel.mrStatus         = selectedDataVal.mrStatus?"Y":"N";
    this.mrmodel.billLrOthType    = selectedDataVal.billLrOthType;
    this.mrmodel.mrReceiptType    = selectedDataVal.mrReceiptType ; 
    this.mrmodel.mrType           = selectedDataVal.mrType ; 
    this.mrmodel.groupMrYN        = selectedDataVal.groupMrYN ?"Y":"N";
    this.mrmodel.partyGroupId     = selectedDataVal.partyGroupId ; 
    this.mrmodel.partyCode        = selectedDataVal.partyCode?selectedDataVal.partyCode.dataId:"" ; 
    this.mrmodel.cheqCashAmt      = selectedDataVal.cheqCashAmt.toString() ; 
    this.mrmodel.onAcAdjAmt       = selectedDataVal.onAcAdjAmt.toString() ; 
    this.mrmodel.totalAmt         = "0" ; 
    this.mrmodel.onAcNewAmt       = selectedDataVal.onAcNewAmt.toString() ; 
    this.mrmodel.onAcAdjusted     = "0";
    this.mrmodel.onAcStatus       = selectedDataVal.onAcStatus?"T":"P" ; 
    this.mrmodel.onAcAdjMrYn      = selectedDataVal.onAcAdjMrYn?"Y":"N";
    this.mrmodel.totalRecdAmt     = selectedDataVal.totalRecdAmt.toString() ; 
    this.mrmodel.totalFreightDed  = selectedDataVal.totalFreightDed .toString(); 
    this.mrmodel.totalClaimsDed   = selectedDataVal.totalClaimsDed.toString() ; 
    this.mrmodel.totalOldFrtDed   = "0" ; 
    this.mrmodel.totalOldClaims   = "0" ; 
    this.mrmodel.totalOthersDed   = selectedDataVal.totalOthersDed.toString() ; 
    this.mrmodel.totalBankChrgDed = selectedDataVal.totalBankChrgDed.toString() ; 
    this.mrmodel.totalOthersDed1  = selectedDataVal.totalOthersDed1.toString() ; 
    this.mrmodel.totalOthersDed2  = selectedDataVal.totalOthersDed2.toString() ; 
    this.mrmodel.totalOthersDed3  = selectedDataVal.totalOthersDed3.toString() ; 
    this.mrmodel.totalRecoverable = selectedDataVal.totalRecoverable.toString() ; 
    this.mrmodel.totalDed         = selectedDataVal.totalDed.toString() ; 
    this.mrmodel.totalTDSDed      = selectedDataVal.totalTDSDed.toString() ; 
    this.mrmodel.totalSdEmdDed    = selectedDataVal.totalSdEmdDed.toString() ; 
    this.mrmodel.totalExcess      = selectedDataVal.totalExcess.toString() ; 
    this.mrmodel.totalOthers1     = "" ; 
    this.mrmodel.totalOthers2     = "" ; 
    this.mrmodel.mrRemarks        = selectedDataVal.mrRemarks.toString().toUpperCase() ;  
    this.mrmodel.crAdviceNo       = "" ; 
    this.mrmodel.neftYN           = selectedDataVal.neftYN?"Y":"N" ; 
    this.mrmodel.mrDebitAc        = selectedDataVal.mrDebitAc? selectedDataVal.mrDebitAc.dataId:""; 
    this.mrmodel.mrSdEmdAc        = selectedDataVal.mrSdEmdAc ; 
    this.mrmodel.sdEmdRefNo       = selectedDataVal.sdEmdRefNo ; 
    this.mrmodel.partyBankDet     = selectedDataVal.partyBankDet.toString().toUpperCase() ;  
    this.mrmodel.chequeNo         = selectedDataVal.chequeNo ; 
    this.mrmodel.chequeDt         = selectedDataVal.chequeDt ; 
    this.mrmodel.modifyRemarks    = selectedDataVal.modifyRemarks.toString().toUpperCase() ;  
    this.mrmodel.yearId           = this.year ; 
    this.mrmodel.loggedInUser     = this.loggedInUserID; 

    if(this.mrmodel.mrType!="B" && this.mrmodel.mrReceiptType !="J"){
      this.toasterService.warning("Receipt Type should be only JV for selected MR Type");
      this.formUser.patchValue({
        mrReceiptType: ''
      });
      return;
    }

    this.mrmodel.mrDtlsList = [];
    this.mrmodel.mrOnAcList = [];

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) { 
      if (selectedDataVal.arrayList[i].recdAmt != "" && parseFloat(selectedDataVal.arrayList[i].recdAmt) > 0) {
        if (selectedDataVal.arrayList[i].billLrMasterId != "") {
            //ignore
        }
        else{
          this.toasterService.warning("Please Enter Valid Bill/LR in grid ");          
          return;
        }
        this.mrmodel.mrDtlsList.push({
          "mrMasterId": "" ,
          "mrStation": selectedDataVal.mrStation,
          "mrNo": selectedDataVal.mrNo,
          "mrDate": selectedDataVal.mrDate,
          "partyCode": selectedDataVal.arrayList[i].partyCode,
          'billLrYear':    selectedDataVal.arrayList[i].billLrYear,
          "billLrStn": selectedDataVal.arrayList[i].billLrStn,
          'billLrNo':  selectedDataVal.arrayList[i].billLrNo,
          "billLrDate":  selectedDataVal.arrayList[i].billLrDate,
          'billLrMasterId':  selectedDataVal.arrayList[i].billLrMasterId,
          "dueAmt":  selectedDataVal.arrayList[i].dueAmt,
          "oldDueAmt":  "",
          "recdAmt":  selectedDataVal.arrayList[i].recdAmt.toString(),
          "freightDed":  selectedDataVal.arrayList[i].freightDed.toString(),
          "claimsDed":  selectedDataVal.arrayList[i].claimsDed.toString(),
          "othersDed":  selectedDataVal.arrayList[i].othersDed.toString(),
          "bankChrgDed":  selectedDataVal.arrayList[i].bankChrgDed.toString(),
          "othersDed1":  selectedDataVal.arrayList[i].othersDed1.toString(),
          "othersDed2":  selectedDataVal.arrayList[i].othersDed2.toString(),
          "othersDed3":  selectedDataVal.arrayList[i].othersDed3.toString(),
          "recoverable":  "0",
          "totDed":  selectedDataVal.arrayList[i].totDed.toString(),
          "tdsDed":  selectedDataVal.arrayList[i].tdsDed.toString(),
          "sdEmdDed":  selectedDataVal.arrayList[i].sdEmdDed.toString(),
          "excessRecd":  selectedDataVal.arrayList[i].excessRecd.toString(),
          "others1Recd":  '',
          "others2Recd":  '',
          "remarks":  selectedDataVal.arrayList[i].remarks.toString().toUpperCase(),
          "yearId":  this.year,
        });
      }
    }

    for (var i = 0; i < selectedDataVal.mrarrayList.length; i++) { 
      if (selectedDataVal.mrarrayList[i].selected) {
        if (selectedDataVal.mrarrayList[i].adjAmt != "" && parseFloat(selectedDataVal.mrarrayList[i].adjAmt) > 0) {
            //ignore
        }
        else{
          this.toasterService.warning("Please Enter Adjusted Amt in grid ");          
          return;
        }
        this.mrmodel.mrOnAcList.push({
          "mrMasterId": "" ,
          "mrStation": selectedDataVal.mrStation,
          "mrNo": selectedDataVal.mrNo,
          "mrDate": selectedDataVal.mrDate,
          "partyCode": '',
          'adjMrMasterID':    selectedDataVal.mrarrayList[i].adjMrMasterID,
          "adjMrYear": selectedDataVal.mrarrayList[i].adjMrYear,
          'adjMrStn':  selectedDataVal.mrarrayList[i].adjMrStn,
          "adjMrNo":  selectedDataVal.mrarrayList[i].adjMrNo.toString().toUpperCase(),
          'onAcAmt':  selectedDataVal.mrarrayList[i].onAcAmt.toString(),
          "adjAmt":  selectedDataVal.mrarrayList[i].adjAmt.toString(),
          "yearId":  this.year,
        });
      }
    }

    this.sharedService.loading=true;
    this.formSubmitted = true;

    this.mrService.mrSubmitted(this.mrmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/mrentrylist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    
    this.sharedService.loading=false;
  }
  
} 
