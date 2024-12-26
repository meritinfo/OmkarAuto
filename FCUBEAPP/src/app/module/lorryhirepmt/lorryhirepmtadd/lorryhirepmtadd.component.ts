import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from '../../../models/dropdownmodel';
import { CommonService } from '../../../services/common.service';
import { LorryhirepmtService } from 'src/app/services/lorryhirepmt.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Lorryhiremastermodel } from 'src/app/models/lorryhiremastermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { DocRenewalEntryService } from 'src/app/services/docrenewalentry.service';


@Component({
  selector: 'app-lorryhirepmtadd',
  templateUrl: './lorryhirepmtadd.component.html',
  styleUrls: ['./lorryhirepmtadd.component.css']
})
export class LorryhirepmtaddComponent {

  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  yearList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  formUser!: FormGroup;
  selectedLorryhiremaster = new Lorryhiremastermodel();
  lorryhiremaster = new Lorryhiremastermodel();
  keywordLocation = 'dataName';
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  challanInputDtls= new Reportmodel();
  constructor(private lorryhiremastermodel: Lorryhiremastermodel, private sharedService: SharedService,
    private requestmodel: Requestmodel, private route: Router, private formBuilder: FormBuilder,
    private commonService: CommonService, private lorryhirepmtService: LorryhirepmtService,
    private docrenewalEntryService: DocRenewalEntryService,private toasterService: ToastrService) {
    this.lorryhiremaster = new Lorryhiremastermodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Lorry Hire Payment");      
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
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
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
    
    this.formUser = this.formBuilder.group({
      pmtStation: new FormControl(this.branch, [Validators.required]),
      pmtNo: new FormControl('', [Validators.required]),
      pmtDate : new FormControl(this.loginDate, [Validators.required]),
      pmtType: new FormControl('', [Validators.required]),
      onAcBranchYN: new FormControl('', ),
      onAcBranch: new FormControl('', ),
      cardId: new FormControl('',),
      chequePayeeName: new FormControl('', ),
      benId: new FormControl('', ),
      totalHireAmt : new FormControl('', ),
      totalHamaliAmt: new FormControl('', ),
      totalDetenAmt: new FormControl('', ),
      totalOtherAmt: new FormControl('', ),
      totalOther2Amt: new FormControl('', ),
      totalOther3Amt: new FormControl('', ),
      totalNetAmt: new FormControl('', ),
      totalRecoveryAmt: new FormControl('', ),
      totalLhpmAmt : new FormControl('', ),
      totalOthDedAmt : new FormControl('', ),
      totalOth2DedAmt : new FormControl('', ),
      totalTdsAmt : new FormControl('', ),
      creditAc : new FormControl('', ),
      chequeNo : new FormControl('', ),
      chequeDt : new FormControl('', ),
      neftPmt : new FormControl('', ),
      remarks : new FormControl('', ),
      modifyRemarks : new FormControl('', ),
      arrayList: this.formBuilder.array([this.createInitialArray()]) 
    });
    

    this.sharedService.loading=true;
    this.getBranchList();
    this.getYearList();
    this.getPaymentCreditAcList("M");
    this.selectedLorryhiremaster = this.lorryhirepmtService.getLorryhiremasterDetails(); 

    this.formUser.controls['pmtStation'].disable();
    this.formUser.controls['onAcBranch'].disable();
    this.formUser.controls['neftPmt'].disable();
    this.formUser.controls['totalHireAmt'].disable();
    this.formUser.controls['totalHamaliAmt'].disable();
    this.formUser.controls['totalDetenAmt'].disable();
    this.formUser.controls['totalOtherAmt'].disable();
    this.formUser.controls['totalOther2Amt'].disable();
    this.formUser.controls['totalOther3Amt'].disable();
    this.formUser.controls['totalNetAmt'].disable();
    this.formUser.controls['totalRecoveryAmt'].disable();
    this.formUser.controls['totalLhpmAmt'].disable();
    this.formUser.controls['totalOthDedAmt'].disable();
    this.formUser.controls['totalOth2DedAmt'].disable(); 
    this.formUser.controls['totalTdsAmt'].disable();
    this.formUser.controls['modifyRemarks'].disable();

    this.formArray.controls[0].get("challanId")?.disable();
    this.formArray.controls[0].get("challanBranch")?.disable();
    this.formArray.controls[0].get("dueAmt")?.disable();
    this.formArray.controls[0].get("netAmt")?.disable();
    
    this.formArray.controls[0].get("challanBranch")?.setValue(this.branch);

    if (this.selectedLorryhiremaster.masterId != '') {  
      this.getPaymentCreditAcList(this.selectedLorryhiremaster.pmtType);
      if(this.selectedLorryhiremaster.onAcBranch!=''){        
        this.formArray.controls[0].get("challanBranch")?.setValue(this.selectedLorryhiremaster.onAcBranch);
      }
    }

    setTimeout(() => {
      if (this.selectedLorryhiremaster.masterId != '') {  
        this.formUser.controls['pmtNo'].disable();
        this.formUser.patchValue(this.selectedLorryhiremaster);
        var onAcBranchYN = this.selectedLorryhiremaster.onAcBranchYN=="Y"?"Y":"";
        var neftPmt = this.selectedLorryhiremaster.neftPmt=="Y"?"Y":"";
        this.formUser.patchValue({
          pmtDate: this.commonService.formatDate(this.selectedLorryhiremaster.pmtDate),
          chequeDt: this.commonService.formatDate(this.selectedLorryhiremaster.chequeDt), 
          onAcBranchYN:onAcBranchYN,
          neftPmt:neftPmt,
        });
        if(this.selectedLorryhiremaster.pmtType=="B" && this.selectedLorryhiremaster.neftPmt=="N"){
          this.formUser.controls['chequeNo'].enable();
          this.formUser.controls['chequeDt'].enable();
        }
        else{
          this.formUser.controls['chequeNo'].disable();
          this.formUser.controls['chequeDt'].disable();
        }
        this.editMode = true;
        this.formUser.controls['pmtDate'].disable();
        this.formUser.controls['pmtType'].disable(); 
        this.formUser.controls['onAcBranchYN'].disable();
        this.formUser.controls['onAcBranch'].disable();
        this.formUser.controls['modifyRemarks'].enable();
        this.getLorryHirePmtInnerGridList();        
      }
      else{
        this.getPmtNo();
      }
    }, 2000);
    this.sharedService.loading=false;
  }
  
  createInitialArray() {
    return this.formBuilder.group({     
      chYear :  ['', []],
      challanBranch:  ['', []],
      challanNo :  ['', []],
      challanId :  ['', []],
      abType:  ['', []],
      dueAmt:  ['', []],
      hireAmt:  ['', []],
      hamaliAmt :  ['', []],
      detenAmt :  ['', []],
      otherAmt :  ['', []],
      other2Amt :  ['', []],
      other3Amt :  ['', []],
      netAmt :  ['', []],
      recoveryAmt:  ['', []],
      lhpmAmt :  ['', []],
      othDedAmt : ['', []],
      oth2DedAmt :  ['', []],
      tdsAmt :  ['', []],
      totPaid:  ['0', []],
      extraRemarks :  ['', []],
      deductRemarks:  ['', []],
    });
  }

  getLorryHirePmtInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedLorryhiremaster.masterId;
    this.lorryhirepmtService.getLorryhireInnerGridList(this.requestmodel).subscribe((res) => {
      this.lorryhiremaster = res;
      this.formArray.clear();
      for (var i = 0; i < res.lhpmDetails.length; i++) {        
        this.formArray.push(this.createInitialArray()); 

        this.formArray.controls[i].get("chYear")?.setValue(res.lhpmDetails[i].chYear);
        this.formArray.controls[i].get("challanBranch")?.setValue(res.lhpmDetails[i].challanBranch);
        this.formArray.controls[i].get("challanNo")?.setValue(res.lhpmDetails[i].challanNo);
        this.formArray.controls[i].get("challanId")?.setValue(res.lhpmDetails[i].challanId);
        this.formArray.controls[i].get("abType")?.setValue(res.lhpmDetails[i].abType);  
        this.formArray.controls[i].get("dueAmt")?.setValue(res.lhpmDetails[i].dueAmt); 
        this.formArray.controls[i].get("hireAmt")?.setValue(res.lhpmDetails[i].hireAmt);
        this.formArray.controls[i].get("hamaliAmt")?.setValue(res.lhpmDetails[i].hamaliAmt);
        this.formArray.controls[i].get("detenAmt")?.setValue(res.lhpmDetails[i].detenAmt);
        this.formArray.controls[i].get("otherAmt")?.setValue(res.lhpmDetails[i].otherAmt);
        this.formArray.controls[i].get("other2Amt")?.setValue(res.lhpmDetails[i].other2Amt);
        this.formArray.controls[i].get("other3Amt")?.setValue(res.lhpmDetails[i].other3Amt);
        this.formArray.controls[i].get("netAmt")?.setValue(res.lhpmDetails[i].netAmt);
        this.formArray.controls[i].get("recoveryAmt")?.setValue(res.lhpmDetails[i].recoveryAmt);
        this.formArray.controls[i].get("lhpmAmt")?.setValue(res.lhpmDetails[i].lhpmAmt);
        this.formArray.controls[i].get("othDedAmt")?.setValue(res.lhpmDetails[i].othDedAmt);
        this.formArray.controls[i].get("oth2DedAmt")?.setValue(res.lhpmDetails[i].oth2DedAmt);
        this.formArray.controls[i].get("tdsAmt")?.setValue(res.lhpmDetails[i].tdsAmt);
        this.formArray.controls[i].get("totPaid")?.setValue(res.lhpmDetails[i].totPaid);
        this.formArray.controls[i].get("extraRemarks")?.setValue(res.lhpmDetails[i].extraRemarks); 
        this.formArray.controls[i].get("deductRemarks")?.setValue(res.lhpmDetails[i].deductRemarks);

        this.formArray.controls[i].get("chYear")?.disable();
        this.formArray.controls[i].get("challanBranch")?.disable();
        this.formArray.controls[i].get("abType")?.disable();
        this.formArray.controls[i].get("challanNo")?.disable();
        this.formArray.controls[i].get("challanId")?.disable();
        this.formArray.controls[i].get("dueAmt")?.disable();
        this.formArray.controls[i].get("netAmt")?.disable();

        if(res.lhpmDetails[i].abType=='O'){
          this.formArray.controls[i].get("totPaid")?.disable();
          this.formArray.controls[i].get("dueAmt")?.disable();
          this.formArray.controls[i].get("hireAmt")?.disable();
          this.formArray.controls[i].get("recoveryAmt")?.disable();
          this.formArray.controls[i].get("lhpmAmt")?.disable();
          this.formArray.controls[i].get("othDedAmt")?.disable();
          this.formArray.controls[i].get("oth2DedAmt")?.disable();
          this.formArray.controls[i].get("tdsAmt")?.disable();
        }
      }
    });
  }
  
  getYearList():void{
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
      this.formUser.patchValue({
        affectYear:this.yearList[0].dataId,
      }) 
    });
  }    

  getPaymentCreditAcList(e: any){
    this.requestmodel.strRequest= e.toString();
    this.docrenewalEntryService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditacList = res;
    });
  }
 
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }  


  getPmtNo(): void {    
    this.requestmodel.strRequest = this.branch;
    this.requestmodel.strRequest1 = this.year; 
    this.lorryhirepmtService.getLhpmPmtNo(this.requestmodel).subscribe((res:Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.formUser.patchValue({
          pmtNo: this.responseDetails.message
        });
      }
    });
  }  

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }
  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }

  selectEvent(item: any) {
     
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (locationList: Dropdownmodel[], query: string): any[] {
    return locationList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  addItem(i: number): void {
    var selectedDataVal= this.formUser.getRawValue()
    if(selectedDataVal.arrayList[i].challanId!='' && selectedDataVal.arrayList[i].hireAmt !=''){
      this.formArray.push(this.createInitialArray());   
      this.formArray.controls[i+1].get("challanId")?.disable();
      this.formArray.controls[i+1].get("dueAmt")?.disable();
      this.formArray.controls[i+1].get("netAmt")?.disable();
      this.formArray.controls[i+1].get("challanBranch")?.disable();

      this.formUser.controls['onAcBranch'].disable();
      
      if(selectedDataVal.onAcBranch!='' && selectedDataVal.onAcBranch!='0'){        
        this.formArray.controls[i+1].get("challanBranch")?.setValue(selectedDataVal.onAcBranch);
      }
      else{
        this.formArray.controls[i+1].get("challanBranch")?.setValue(this.branch);
      }
    }      
    else {
      this.toasterService.warning("Please select Required Fields ");
      return;
    }

    for (var i=0; i<this.formArray.controls.length;i++){
      this.formArray.controls[i].get("netAmt")?.disable();
    }

  }

  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formArray.removeAt(index);
      this.caltot();
    }
  }

  changePmtType(e: any) {
    console.log(e.target.value);
    var ptype = e.target.value;
    this.getPaymentCreditAcList(ptype);

    this.formUser.patchValue({
      neftPmt: "",
      onAcBranchYN: "",
      onAcBranch: "",
    });

    if(ptype=='M'|| ptype=='B'){
      this.formUser.controls['onAcBranchYN'].enable();
    }
    else{
      this.formUser.controls['onAcBranchYN'].enable();      
    }


    if (ptype == 'B'){
      this.formUser.controls['neftPmt'].enable();
      this.formUser.controls['chequeNo'].enable();
      this.formUser.controls['chequeDt'].enable();
      this.formUser.controls['chequeNo'].setValidators([Validators.required]);
      this.formUser.controls['chequeDt'].setValidators([Validators.required]);
    }
    else {
      this.formUser.controls['neftPmt'].disable();
      this.formUser.controls['chequeNo'].disable();
      this.formUser.controls['chequeDt'].disable();
      this.formUser.controls['chequeNo'].clearValidators();      
      this.formUser.controls['chequeDt'].clearValidators();   
    }

    this.formUser.controls['chequeNo'].updateValueAndValidity();
    this.formUser.controls['chequeDt'].updateValueAndValidity();   
  }

  onAcChk(e: any) {    
    if (e.target.checked){
      this.formUser.controls['onAcBranch'].setValidators([Validators.required]);
      this.formUser.controls['onAcBranch'].enable();
    }
    else{
      this.formUser.controls['onAcBranch'].clearValidators();   
      this.formUser.controls['onAcBranch'].disable();
      this.formUser.patchValue({
        onAcBranch:'',
      });   
    }
     
    this.formUser.controls['onAcBranch'].updateValueAndValidity();
  }

  onAcBrSelected(e: any) {    
    if(e.target.value==this.branch){
      this.toasterService.warning("On Ac Branch should not be Login Branch");
      this.formUser.patchValue({
        onAcBranch:'',
      });   
      return;
    }
    else{
      this.formArray.controls[0].get('challanBranch')?.setValue(e.target.value);
    }   
  }
  
  onNeftChk(e: any) {    
    if (e.target.checked){
      this.formUser.controls['chequeNo'].clearValidators();      
      this.formUser.controls['chequeDt'].clearValidators();   
      this.formUser.controls['chequeNo'].disable();
      this.formUser.controls['chequeDt'].disable();
      this.formUser.patchValue({
        chequeNo:'',
        chequeDate:'',
      });   
    }
    else {
      this.formUser.controls['chequeNo'].setValidators([Validators.required]);
      this.formUser.controls['chequeDt'].setValidators([Validators.required]);
      this.formUser.controls['chequeNo'].enable();
      this.formUser.controls['chequeDt'].enable();
    }
    this.formUser.controls['chequeNo'].updateValueAndValidity();
    this.formUser.controls['chequeDt'].updateValueAndValidity();
  }


  getChallanDtls(i:number){
    var selectedData = this.formUser.getRawValue();  
    if(selectedData.onAcBranchYN){
      if(selectedData.onAcBranch==""){
        this.toasterService.warning("Please Select On Ac Branch, Before Entering Challan Details");
        this.formArray.controls[i].get("challanNo")?.setValue("");
        return;
      }
    }

    this.challanInputDtls.search = selectedData.pmtType;
    this.challanInputDtls.filterStr = selectedData.arrayList[i].abType ;
    this.challanInputDtls.filterStr1 = selectedData.arrayList[i].chYear ;
    this.challanInputDtls.filterStr2 = selectedData.arrayList[i].challanBranch ;
    this.challanInputDtls.filterStr3 = selectedData.arrayList[i].challanNo ;

    this.requestmodel.strRequest = selectedData.arrayList[i].challanNo

    this.lorryhirepmtService.checkChallanNoExists(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formArray.controls[i].get("challanNo")?.setValue("");
        return;
      }
    });

    if(selectedData.arrayList[i].abType=="F"){
      this.lorryhirepmtService.chkLHPMBrokerDisputeDetails(this.challanInputDtls).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toasterService.warning(this.responseDetails.message);
          this.formArray.controls[i].get("challanNo")?.setValue("");
          return;
        }
      });
    }   

    this.lorryhirepmtService.getChallanLorryhireDetails(this.challanInputDtls).subscribe((res) => {
      this.lorryhiremaster = res;
      var chln = res.lhpmDetails.length>0?res.lhpmDetails[0].challanId:'';
      if (typeof chln === 'undefined' || chln === null || chln === '') {
        this.toasterService.warning("No Due Amount For this challan");
        this.formArray.controls[i].get("challanNo")?.setValue("");
        return;
      }
      else{
        this.formArray.controls[i].get("challanNo")?.setValue(res.lhpmDetails[0].challanNo);
        this.formArray.controls[i].get("challanId")?.setValue(res.lhpmDetails[0].challanId);
        this.formArray.controls[i].get("dueAmt")?.setValue(res.lhpmDetails[0].dueAmt);
        this.formArray.controls[i].get("hireAmt")?.setValue(res.lhpmDetails[0].hireAmt);
        this.formArray.controls[i].get("hamaliAmt")?.setValue(res.lhpmDetails[0].hamaliAmt);
        this.formArray.controls[i].get("detenAmt")?.setValue(res.lhpmDetails[0].detenAmt);
        this.formArray.controls[i].get("otherAmt")?.setValue(res.lhpmDetails[0].otherAmt);
        this.formArray.controls[i].get("other2Amt")?.setValue(res.lhpmDetails[0].other2Amt);
        this.formArray.controls[i].get("other3Amt")?.setValue(res.lhpmDetails[0].other3Amt);
        this.formArray.controls[i].get("netAmt")?.setValue(res.lhpmDetails[0].netAmt);
        this.formArray.controls[i].get("recoveryAmt")?.setValue(res.lhpmDetails[0].recoveryAmt);
        this.formArray.controls[i].get("lhpmAmt")?.setValue(res.lhpmDetails[0].lhpmAmt);
        this.formArray.controls[i].get("othDedAmt")?.setValue(res.lhpmDetails[0].othDedAmt);
        this.formArray.controls[i].get("oth2DedAmt")?.setValue(res.lhpmDetails[0].oth2DedAmt);
        this.formArray.controls[i].get("tdsAmt")?.setValue(res.lhpmDetails[0].tdsAmt);
        this.formArray.controls[i].get("extraRemarks")?.setValue(res.lhpmDetails[0].extraRemarks); 
        this.formArray.controls[i].get("deductRemarks")?.setValue(res.lhpmDetails[0].deductRemarks);

        this.formArray.controls[i].get("chYear")?.disable();
        this.formArray.controls[i].get("challanBranch")?.disable();
        this.formArray.controls[i].get("abType")?.disable();
        this.formArray.controls[i].get("challanNo")?.disable();
        this.formArray.controls[i].get("challanId")?.disable();
        this.formArray.controls[i].get("dueAmt")?.disable();
        this.formArray.controls[i].get("netAmt")?.disable();

        if(selectedData.arrayList[i].abType=='O'){
          this.formArray.controls[i].get("totPaid")?.disable();
          this.formArray.controls[i].get("dueAmt")?.disable();
          this.formArray.controls[i].get("hireAmt")?.disable();
          this.formArray.controls[i].get("recoveryAmt")?.disable();
          this.formArray.controls[i].get("lhpmAmt")?.disable();
          this.formArray.controls[i].get("othDedAmt")?.disable();
          this.formArray.controls[i].get("oth2DedAmt")?.disable();
          this.formArray.controls[i].get("tdsAmt")?.disable();
        }
      }
    });

  }

  calTotal(j:number,clmn: string){
    var selectedDataVal = this.formUser.getRawValue();
    var due = 0,totPaid = 0,
        tot = 0, totHire = 0, tothamali = 0, totdeten = 0, 
        totother = 0, totother2 = 0, totother3 = 0, 
        totlhpm = 0, totrec = 0, totothded = 0, totothded2 = 0, tottds = 0
   
    
    if(selectedDataVal.arrayList[j].dueAmt!=''){
      due = due + parseFloat(selectedDataVal.arrayList[j].dueAmt);
    }    
    if(selectedDataVal.arrayList[j].totPaid!=''){
      due = due + parseFloat(selectedDataVal.arrayList[j].totPaid);
    }   
    if(selectedDataVal.arrayList[j].hireAmt!=''){
      totPaid = totPaid + parseFloat(selectedDataVal.arrayList[j].hireAmt);
    }    
    if(selectedDataVal.arrayList[j].tdsAmt!=''){
      totPaid = totPaid + parseFloat(selectedDataVal.arrayList[j].tdsAmt);
    } 
    if(selectedDataVal.arrayList[j].recoveryAmt!=''){
      totPaid = totPaid + parseFloat(selectedDataVal.arrayList[j].recoveryAmt);
    }
    if(selectedDataVal.arrayList[j].lhpmAmt!=''){
      totPaid = totPaid + parseFloat(selectedDataVal.arrayList[j].lhpmAmt);
    }
    if(selectedDataVal.arrayList[j].othDedAmt!=''){
      totPaid = totPaid + parseFloat(selectedDataVal.arrayList[j].othDedAmt);
    }
    if(selectedDataVal.arrayList[j].oth2DedAmt!=''){
      totPaid = totPaid + parseFloat(selectedDataVal.arrayList[j].oth2DedAmt);
    }
    
    if(totPaid>due){
      this.toasterService.warning("Total Paid Amount should not be greater than Due Amount");
      this.formArray.controls[j].get(clmn)?.setValue('0');   
      return;
    }
    
    this.caltot();

  }

  caltot(){
    var selectedDataVal = this.formUser.getRawValue();
    var tot = 0, totHire = 0, tothamali = 0, totdeten = 0, 
    totother = 0, totother2 = 0, totother3 = 0, 
    totlhpm = 0, totrec = 0, totothded = 0, totothded2 = 0, tottds = 0

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      var netTot = 0;
      if(selectedDataVal.arrayList[i].hireAmt!=''){
        netTot = netTot + parseFloat(selectedDataVal.arrayList[i].hireAmt);
        totHire = totHire + parseFloat(selectedDataVal.arrayList[i].hireAmt);
      }
      if(selectedDataVal.arrayList[i].hamaliAmt!=''){
        netTot = netTot + parseFloat(selectedDataVal.arrayList[i].hamaliAmt);
        tothamali = tothamali + parseFloat(selectedDataVal.arrayList[i].hamaliAmt);
      }
      if(selectedDataVal.arrayList[i].detenAmt!=''){
        netTot = netTot + parseFloat(selectedDataVal.arrayList[i].detenAmt);
        totdeten = totdeten + parseFloat(selectedDataVal.arrayList[i].detenAmt);
      }
      if(selectedDataVal.arrayList[i].otherAmt!=''){
        netTot = netTot + parseFloat(selectedDataVal.arrayList[i].otherAmt);
        totother = totother + parseFloat(selectedDataVal.arrayList[i].otherAmt);
      }
      if(selectedDataVal.arrayList[i].other2Amt!=''){
        netTot = netTot + parseFloat(selectedDataVal.arrayList[i].other2Amt);
        totother2 = totother2 + parseFloat(selectedDataVal.arrayList[i].other2Amt);
      }
      if(selectedDataVal.arrayList[i].other3Amt!=''){
        netTot = netTot + parseFloat(selectedDataVal.arrayList[i].other3Amt);
        totother3 = totother3 + parseFloat(selectedDataVal.arrayList[i].other3Amt);
      }
      if(selectedDataVal.arrayList[i].recoveryAmt!=''){
        totrec = totrec + parseFloat(selectedDataVal.arrayList[i].recoveryAmt);
      }
      if(selectedDataVal.arrayList[i].lhpmAmt!=''){
        totlhpm = totlhpm + parseFloat(selectedDataVal.arrayList[i].lhpmAmt);
      }
      if(selectedDataVal.arrayList[i].othDedAmt!=''){
        totothded = totothded + parseFloat(selectedDataVal.arrayList[i].othDedAmt);
      }
      if(selectedDataVal.arrayList[i].oth2DedAmt!=''){
        totothded2 = totothded2 + parseFloat(selectedDataVal.arrayList[i].oth2DedAmt);
      }
      if(selectedDataVal.arrayList[i].tdsAmt!=''){
        tottds = tottds + parseFloat(selectedDataVal.arrayList[i].tdsAmt);
      }
      this.formArray.controls[i].get("netAmt")?.setValue(netTot);    
      tot = tot + netTot;
    }
    
    this.formUser.patchValue({
      totalHireAmt: totHire ,   
      totalHamaliAmt: tothamali ,   
      totalDetenAmt: totdeten ,   
      totalOtherAmt: totother ,   
      totalOther2Amt: totother2 ,   
      totalOther3Amt: totother3 ,      
      totalNetAmt: tot ,      
      totalRecoveryAmt: totrec ,     
      totalLhpmAmt: totlhpm ,     
      totalOthDedAmt: totothded ,     
      totalOth2DedAmt: totothded2 ,     
      totalTdsAmt: tottds ,   
    });
  }

  deleteLorryHirePaymentForm(): void {
    if (this.selectedLorryhiremaster.masterId != '') {
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedLorryhiremaster.masterId;
      if (confirm("Are you sure, you want to delete this?")) {
        this.lorryhirepmtService.lorryhiremasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/lhpmtlist']);
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
    this.route.navigate(['/lhpmtlist']);
  }

  //Submit form details //
  submitLorryHirePaymentForm(): void {
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
              
    if (this.formUser.controls['arrayList'].invalid) {
      this.toasterService.warning("Details fields are mandatory");
      return;
    }
    
    this.sharedService.loading=true;
    var selectedDataVal=this.formUser.getRawValue();
    this.lorryhiremastermodel.masterId = this.selectedLorryhiremaster.masterId ;
    this.lorryhiremastermodel.pmtStation= selectedDataVal.pmtStation;
    this.lorryhiremastermodel.pmtNo= selectedDataVal.pmtNo;
    this.lorryhiremastermodel.pmtDate= selectedDataVal.pmtDate;
    this.lorryhiremastermodel.pmtType= selectedDataVal.pmtType;
    this.lorryhiremastermodel.onAcBranchYN= selectedDataVal.onAcBranchYN?'Y':'N';
    this.lorryhiremastermodel.onAcBranch= selectedDataVal.onAcBranch;
    this.lorryhiremastermodel.chequePayeeName= selectedDataVal.chequePayeeName.toString().toUpperCase();
    this.lorryhiremastermodel.totalHireAmt = selectedDataVal.totalHireAmt.toString();
    this.lorryhiremastermodel.totalHamaliAmt= selectedDataVal.totalHamaliAmt.toString();
    this.lorryhiremastermodel.totalDetenAmt= selectedDataVal.totalDetenAmt.toString();
    this.lorryhiremastermodel.totalOtherAmt = selectedDataVal.totalOtherAmt.toString();
    this.lorryhiremastermodel.totalOther2Amt = selectedDataVal.totalOther2Amt.toString();
    this.lorryhiremastermodel.totalOther3Amt = selectedDataVal.totalOther3Amt.toString();
    this.lorryhiremastermodel.totalNetAmt = selectedDataVal.totalNetAmt.toString();
    this.lorryhiremastermodel.totalRecoveryAmt = selectedDataVal.totalRecoveryAmt.toString();
    this.lorryhiremastermodel.totalLhpmAmt = selectedDataVal.totalLhpmAmt.toString();
    this.lorryhiremastermodel.totalOthDedAmt= selectedDataVal.totalOthDedAmt.toString();
    this.lorryhiremastermodel.totalOth2DedAmt = selectedDataVal.totalOth2DedAmt.toString();
    this.lorryhiremastermodel.totalTdsAmt = selectedDataVal.totalTdsAmt.toString();
    this.lorryhiremastermodel.creditAc = selectedDataVal.creditAc;
    this.lorryhiremastermodel.chequeNo = selectedDataVal.chequeNo;
    this.lorryhiremastermodel.chequeDt = selectedDataVal.chequeDt;
    this.lorryhiremastermodel.neftPmt = selectedDataVal.neftPmt?'Y':'N';
    this.lorryhiremastermodel.remarks = selectedDataVal.remarks.toString().toUpperCase();
    this.lorryhiremastermodel.yearId = this.year.toString();
    this.lorryhiremastermodel.modifyRemarks= selectedDataVal.modifyRemarks.toString().toUpperCase();
    this.lorryhiremastermodel.loggedInUserID = this.loggedInUserID; 

    this.lorryhiremastermodel.lhpmDetails = [];
   
    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      if(selectedDataVal.arrayList[i].challanId!=''){
        if(selectedDataVal.arrayList[i].abType == "O"){
          var totExtra = 0;
          if(selectedDataVal.arrayList[i].hamaliAmt!=''){
            totExtra = totExtra + parseFloat(selectedDataVal.arrayList[i].hamaliAmt);
          }    
          if(selectedDataVal.arrayList[i].detenAmt!=''){
            totExtra = totExtra + parseFloat(selectedDataVal.arrayList[i].detenAmt);
          } 
          if(selectedDataVal.arrayList[i].otherAmt!=''){
            totExtra = totExtra + parseFloat(selectedDataVal.arrayList[i].otherAmt);
          }
          if(selectedDataVal.arrayList[i].other2Amt!=''){
            totPaid = totExtra + parseFloat(selectedDataVal.arrayList[i].other2Amt);
          }
          if(selectedDataVal.arrayList[i].other3Amt!=''){
            totPaid = totExtra + parseFloat(selectedDataVal.arrayList[i].other3Amt);
          }
          if(totExtra>0){
            //ignore
          }
          else{
            this.toasterService.warning("Extra Amt Should not be Zero");
            this.sharedService.loading=false;
            return;
          }
        }
        else{
          var totPaid = 0;
          if(selectedDataVal.arrayList[i].hireAmt!=''){
            totPaid = totPaid + parseFloat(selectedDataVal.arrayList[i].hireAmt);
          }    
          if(selectedDataVal.arrayList[i].tdsAmt!=''){
            totPaid = totPaid + parseFloat(selectedDataVal.arrayList[i].tdsAmt);
          } 
          if(selectedDataVal.arrayList[i].recoveryAmt!=''){
            totPaid = totPaid + parseFloat(selectedDataVal.arrayList[i].recoveryAmt);
          }
          if(selectedDataVal.arrayList[i].lhpmAmt!=''){
            totPaid = totPaid + parseFloat(selectedDataVal.arrayList[i].lhpmAmt);
          }
          if(selectedDataVal.arrayList[i].othDedAmt!=''){
            totPaid = totPaid + parseFloat(selectedDataVal.arrayList[i].othDedAmt);
          }
          if(selectedDataVal.arrayList[i].oth2DedAmt!=''){
            totPaid = totPaid + parseFloat(selectedDataVal.arrayList[i].oth2DedAmt);
          }
          if(totPaid>0){
            //ignore
          }
          else{
            this.toasterService.warning("Paid Amt Should not be Zero");
            this.sharedService.loading=false;
            return;
          }
        }
        
        this.lorryhiremastermodel.lhpmDetails.push({
          'masterId': '',
          'pmtDate': '',
          'abType': selectedDataVal.arrayList[i].abType,
          'chYear': selectedDataVal.arrayList[i].chYear,
          'challanBranch': selectedDataVal.arrayList[i].challanBranch,
          'challanNo': selectedDataVal.arrayList[i].challanNo,
          'challanId': selectedDataVal.arrayList[i].challanId,
          'dueAmt': selectedDataVal.arrayList[i].dueAmt.toString(),
          'hireAmt': selectedDataVal.arrayList[i].hireAmt.toString(),
          'hamaliAmt': selectedDataVal.arrayList[i].hamaliAmt.toString(),
          'detenAmt': selectedDataVal.arrayList[i].detenAmt.toString(),
          'otherAmt': selectedDataVal.arrayList[i].otherAmt.toString(),
          'other2Amt': selectedDataVal.arrayList[i].other2Amt.toString(),
          'other3Amt': selectedDataVal.arrayList[i].other3Amt.toString(),
          'netAmt': selectedDataVal.arrayList[i].netAmt.toString(),
          'recoveryAmt': selectedDataVal.arrayList[i].recoveryAmt.toString(),
          'lhpmAmt': selectedDataVal.arrayList[i].lhpmAmt.toString(),
          'othDedAmt': selectedDataVal.arrayList[i].othDedAmt.toString(),
          'oth2DedAmt': selectedDataVal.arrayList[i].oth2DedAmt.toString(),
          'tdsAmt': selectedDataVal.arrayList[i].tdsAmt.toString(),
          'totPaid':'0',
          'extraRemarks': selectedDataVal.arrayList[i].extraRemarks.toString().toUpperCase(),
          'deductRemarks': selectedDataVal.arrayList[i].deductRemarks.toString().toUpperCase(),
        });
      }
    }

    if(this.lorryhiremastermodel.lhpmDetails.length==0){
      this.toasterService.warning("Provide atleast one detail record");
      this.sharedService.loading=false;
      return;
    }

    if(this.lorryhiremastermodel.lhpmDetails.length==0){
      this.toasterService.warning("Provide atleast one detail record");
      this.sharedService.loading=false;
      return;
    }

    this.formSubmitted = true;
    this.lorryhirepmtService.lorryhiremasterSubmitted(this.lorryhiremastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/lhpmtlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }    
    });
        
    this.sharedService.loading=false;
  }
  

}
