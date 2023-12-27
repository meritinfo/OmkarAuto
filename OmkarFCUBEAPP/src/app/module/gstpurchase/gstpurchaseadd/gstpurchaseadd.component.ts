import { Component,ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Gstpurchasemodel  } from 'src/app/models/gstpurchasemodel';
import { DocRenewalEntryService } from 'src/app/services/docrenewalentry.service';
import { CommonService } from 'src/app/services/common.service';
import { GstpurchaseService } from 'src/app/services/gstpurchase.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-gstpurchaseadd',
  templateUrl: './gstpurchaseadd.component.html',
  styleUrls: ['./gstpurchaseadd.component.css']
})
export class GstpurchaseaddComponent {
  formGSTPurchase!: FormGroup;
  noVenderSelected: boolean=false;
  neftPmtSelected: boolean=false;
  loggedInUserID: string = '';
  year: string = '';
  branchid:string = '';
  maxDate: string = '';
  keywordLocation = 'dataName';
  userSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  debitAcList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  vendorList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  selectedGstpurchaseDetails = new Gstpurchasemodel(); 
  
  @ViewChild('attach1Input', {
    static: true
  }) attach1Input: any;
  @ViewChild('attach2Input', {
    static: true
  }) attach2Input: any;


  constructor(private formBuilder: FormBuilder,private route: Router, 
    private gstpurchasemodel: Gstpurchasemodel, private requestmodel:Requestmodel,
    private gstpurchaseService: GstpurchaseService, private sharedService: SharedService,       
    private toasterService: ToastrService,private docrenewalEntryService:DocRenewalEntryService,
    private commonService: CommonService) {
  }

  ngOnInit() {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.find((item: { menuList: any; }) => item.menuList)
      .menuList.find((aa: { menuName: string; }) => aa.menuName === "Define Booking Rates");
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
    
    var userbranchcode = sessionStorage.getItem('userBranch')?.toString();  
    if (typeof userbranchcode !== 'undefined' && userbranchcode !== null && userbranchcode !== '') {
      this.branchid = userbranchcode;
    }
    else {
      this.route.navigate(['/']);
    }   

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    this.formGSTPurchase = this.formBuilder.group({
      branchCode: new FormControl(this.branchid,[Validators.required]),
      transDate: new FormControl('', [Validators.required]),
      pmtType: new FormControl('', [Validators.required]),
      noVender: new FormControl('',),
      vendorId: new FormControl('',[Validators.required]),
      vendorInvNo: new FormControl('',[Validators.required]),
      vendorInvDt: new FormControl('',[Validators.required]),
      totalItemAmt: new FormControl('0',[Validators.required]),
      totalSgstAmt: new FormControl('0',),
      totalCgstAmt: new FormControl('0',),
      totalIgstAmt: new FormControl('0',),
      totalAmount: new FormControl('0',[Validators.required]),
      tDSAmt: new FormControl('0',),
      roundOff: new FormControl('0',),
      netAmount: new FormControl('0',[Validators.required]),
      creditAc: new FormControl('',),
      neftPmt:new FormControl('',),
      chequeNo:new FormControl('',[Validators.required]),
      chequeDate:new FormControl('',[Validators.required]),
      inputEligible:new FormControl('',),
      modifyRemarks:new FormControl('',),

      arrayList: this.formBuilder.array([this.createInitialArray()])      
    });

    this.formArray.controls[0].get("sgstAmt")?.disable();      
    this.formArray.controls[0].get("cgstAmt")?.disable();   
    this.formArray.controls[0].get("igstAmt")?.disable();
    this.formArray.controls[0].get("totAmount")?.disable();

    this.formGSTPurchase.controls['totalItemAmt'].disable();
    this.formGSTPurchase.controls['totalSgstAmt'].disable();
    this.formGSTPurchase.controls['totalCgstAmt'].disable();
    this.formGSTPurchase.controls['totalIgstAmt'].disable();
    this.formGSTPurchase.controls['totalAmount'].disable();
    this.formGSTPurchase.controls['netAmount'].disable();

    this.formGSTPurchase.controls['chequeNo'].clearValidators();      
    this.formGSTPurchase.controls['chequeDate'].clearValidators(); 
    this.formGSTPurchase.controls['chequeNo'].updateValueAndValidity();
    this.formGSTPurchase.controls['chequeDate'].updateValueAndValidity();

    this.sharedService.loading=true;
    this.getDebitAcList();
    this.getBranchList();
    this.getVendorList();
    this.selectedGstpurchaseDetails = this.gstpurchaseService.getGstPurchageDetails();

    if (this.selectedGstpurchaseDetails.masterid != '') {   
      this.formGSTPurchase.controls['transDate'].disable();
    }
    
    this.formGSTPurchase.controls['vendorId'].enable(); 
    this.formGSTPurchase.controls['modifyRemarks'].disable();   

    setTimeout(() => {
      if (this.selectedGstpurchaseDetails.masterid != '') {    
        this.formGSTPurchase.controls['modifyRemarks'].enable();  
        this.formGSTPurchase.patchValue(this.selectedGstpurchaseDetails);
        this.formGSTPurchase.patchValue({
          transDate: this.commonService.formatDate(this.selectedGstpurchaseDetails.transDate),
          vendorInvDt: this.commonService.formatDate(this.selectedGstpurchaseDetails.vendorInvDt),
        });
        if (this.selectedGstpurchaseDetails.vendorId == '')
        {
          this.formGSTPurchase.patchValue({
            noVender: 'A',
            vendorId: ''
          });
          this.formGSTPurchase.controls['vendorId'].disable();  
        }
        if (this.selectedGstpurchaseDetails.neftPmt=='Y'){
          this.formGSTPurchase.controls['chequeNo'].setValidators([Validators.required]);
          this.formGSTPurchase.controls['chequeDate'].setValidators([Validators.required]);
        }
        else {
          this.formGSTPurchase.controls['chequeNo'].clearValidators();      
          this.formGSTPurchase.controls['chequeDate'].clearValidators();   
        }
        this.formGSTPurchase.controls['chequeNo'].updateValueAndValidity();
        this.formGSTPurchase.controls['chequeDate'].updateValueAndValidity();
        this.editMode = true;
        this.getGstPurchageInnerGridList();
      }
    }, 2000);
    this.formGSTPurchase.controls['branchCode'].disable();
    this.sharedService.loading=false;
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

  getVendorList(){
    this.requestmodel.strRequest= 'D';
    this.docrenewalEntryService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.vendorList = res;
    });
  }

  selectEvent(item: any) {
    // do something with selected item
  // this.GetOpeningBal();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  
  changePmtType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    this.getPaymentCreditAcList(selectedValue);
  }

  onNeftChk(e: any) {
    this.neftPmtSelected=!this.neftPmtSelected;
    if (this.neftPmtSelected){
      this.formGSTPurchase.controls['chequeNo'].setValidators([Validators.required]);
      this.formGSTPurchase.controls['chequeDate'].setValidators([Validators.required]);
    }
    else {
      this.formGSTPurchase.controls['chequeNo'].clearValidators();      
      this.formGSTPurchase.controls['chequeDate'].clearValidators();   
    }
    this.formGSTPurchase.controls['chequeNo'].updateValueAndValidity();
    this.formGSTPurchase.controls['chequeDate'].updateValueAndValidity();
  }
  
  getPaymentCreditAcList(e: any){
    this.requestmodel.strRequest= e.toString();
    this.docrenewalEntryService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditacList = res;
    });
  }


  onChkNoVender(e: any) {
    this.noVenderSelected=!this.noVenderSelected;
    if (this.noVenderSelected){
      this.formGSTPurchase.patchValue({
        vendorId:'',
      });
      this.formGSTPurchase.controls['vendorId'].disable();  
      this.formGSTPurchase.controls['vendorId'].clearValidators();       
    }
    else {      
      this.formGSTPurchase.controls['vendorId'].enable();  
      this.formGSTPurchase.controls['vendorId'].setValidators([Validators.required]);
    }
    this.formGSTPurchase.controls['vendorId'].updateValueAndValidity();    
  }

  getGstPurchageInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedGstpurchaseDetails.masterid;
    this.gstpurchaseService.getGstPurchageInnerGridList(this.requestmodel).subscribe((res) => {
      this.gstpurchasemodel = res;
      for (var i = 0; i < res.gstPurchaseDetailsList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("sgstAmt")?.disable();
        this.formArray.controls[i].get("cgstAmt")?.disable();
        this.formArray.controls[i].get("igstAmt")?.disable();
        this.formArray.controls[i].get("totAmount")?.disable();

        this.formArray.controls[i].get("debitAc")?.setValue(this.debitAcList.find(e => e.dataId == res.gstPurchaseDetailsList[i].debitAc));
        this.formArray.controls[i].get("narration")?.setValue(res.gstPurchaseDetailsList[i].narration);
        this.formArray.controls[i].get("itemAmt")?.setValue(res.gstPurchaseDetailsList[i].itemAmt);
        this.formArray.controls[i].get("sgstPct")?.setValue(res.gstPurchaseDetailsList[i].sgstPct);
        this.formArray.controls[i].get("sgstAmt")?.setValue(res.gstPurchaseDetailsList[i].sgstAmt);
        this.formArray.controls[i].get("cgstPct")?.setValue(res.gstPurchaseDetailsList[i].cgstPct);
        this.formArray.controls[i].get("cgstAmt")?.setValue(res.gstPurchaseDetailsList[i].cgstAmt);
        this.formArray.controls[i].get("igstPct")?.setValue(res.gstPurchaseDetailsList[i].igstPct);
        this.formArray.controls[i].get("igstAmt")?.setValue(res.gstPurchaseDetailsList[i].igstAmt);
        this.formArray.controls[i].get("totAmount")?.setValue(res.gstPurchaseDetailsList[i].totAmount);
      }
    });
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formGSTPurchase.controls; }
  get formArray() {
    return this.formGSTPurchase.get("arrayList") as FormArray;
  }

 

  createInitialArray() {
    return this.formBuilder.group({
      debitAc:  ['', []],
      narration:  ['', []],
      sacHsnCode:  ['', []],
      subLedger:  ['', []],
      itemAmt: ['0', []],
      sgstPct: ['0', []],
      sgstAmt: ['0', []],
      cgstPct:['0', []],
      cgstAmt: ['0', []],
      igstPct: ['0', []],
      igstAmt: ['0', []],
      totAmount: ['0', []],
      refDocNo: ['', []],
    });
  }
  
  onAmtChange(event: any, i: number){
    var selectedDataVal= this.formGSTPurchase.getRawValue();
    var selArray=selectedDataVal.arrayList[i];
    var varitemAmt =parseFloat(event.target.value);
    if (varitemAmt>0){
      if(parseFloat(selArray.sgstPct)>0){
        this.formArray.controls[i].get("sgstAmt")?.setValue((varitemAmt*parseFloat(selArray.sgstPct==''?0:selArray.sgstPct)/100).toFixed(2));
      }
      if(parseFloat(selArray.cgstPct)>0){
        this.formArray.controls[i].get("cgstAmt")?.setValue((varitemAmt*parseFloat(selArray.cgstPct==''?0:selArray.cgstPct)/100).toFixed(2));
      }
      if(parseFloat(selArray.igstPct)>0){
        this.formArray.controls[i].get("igstAmt")?.setValue((varitemAmt*parseFloat(selArray.igstPct==''?0:selArray.igstPct)/100).toFixed(2));
      }
      this.getRowTotal(i);  
      this.getGrandItemTotal();
      this.getGrandSGSTTotal();
      this.getGrandCGSTTotal();
      this.getGrandIGSTTotal();
      this.getGrandTotal();
    }
  }

  onSgstChange(event: any, i: number){
    var selectedDataVal= this.formGSTPurchase.getRawValue();
    var selArray=selectedDataVal.arrayList[i];
    var varsgstPct = parseFloat(event.target.value);
    if(varsgstPct > 0){
      this.formArray.controls[i].get("sgstAmt")?.setValue((parseFloat(selArray.itemAmt)*varsgstPct/100).toFixed(2));
      this.getRowTotal(i); 
      this.getGrandSGSTTotal();
      this.getGrandTotal();   
    }    
  }

  onCgstChange(event: any, i: number){
    var selectedDataVal= this.formGSTPurchase.getRawValue();
    var selArray=selectedDataVal.arrayList[i];
    var varcgstPct = parseFloat(event.target.value);
    if(varcgstPct > 0){
      this.formArray.controls[i].get("cgstAmt")?.setValue((parseFloat(selArray.itemAmt)*varcgstPct/100).toFixed(2));
      this.getRowTotal(i);  
      this.getGrandCGSTTotal();
      this.getGrandTotal();  
    }    
  }
  
  onIgstChange(event: any, i: number){
    var selectedDataVal= this.formGSTPurchase.getRawValue();
    var selArray=selectedDataVal.arrayList[i];
    var varigstPct = parseFloat(event.target.value);
    if(varigstPct > 0){
      this.formArray.controls[i].get("igstAmt")?.setValue((parseFloat(selArray.itemAmt)*varigstPct/100).toFixed(2));
      this.getRowTotal(i); 
      this.getGrandIGSTTotal();
      this.getGrandTotal();   
    }    
  }

  getRowTotal(i: number){    
    var selectedDataVal=this.formGSTPurchase.getRawValue();
    var selArray=selectedDataVal.arrayList[i];
    var subtot = parseFloat(selArray.itemAmt) +
                parseFloat(selArray.sgstAmt)+
                parseFloat(selArray.cgstAmt)+
                parseFloat(selArray.igstAmt)
    this.formArray.controls[i].get("totAmount")?.setValue(subtot.toFixed(2));
  }

  getGrandItemTotal(){    
    var selectedDataVal=this.formGSTPurchase.getRawValue();    
    var totalItemAmount = 0;
    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
        totalItemAmount = totalItemAmount + parseFloat(selectedDataVal.arrayList[i].itemAmt==''?0:selectedDataVal.arrayList[i].itemAmt)
    }
    this.formGSTPurchase.patchValue({
      totalItemAmt: totalItemAmount.toFixed(2),
    });
  }

  getGrandSGSTTotal(){    
    var selectedDataVal=this.formGSTPurchase.getRawValue();    
    var totalSgstAmount = 0;
    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      totalSgstAmount = totalSgstAmount + parseFloat(selectedDataVal.arrayList[i].sgstAmt==''?0:selectedDataVal.arrayList[i].sgstAmt)
    }
    this.formGSTPurchase.patchValue({
      totalSgstAmt: totalSgstAmount.toFixed(2),
    });
  }

  getGrandCGSTTotal(){    
    var selectedDataVal=this.formGSTPurchase.getRawValue();    
    var totalCgstAmount = 0;
    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      totalCgstAmount = totalCgstAmount + parseFloat(selectedDataVal.arrayList[i].cgstAmt==''?0:selectedDataVal.arrayList[i].cgstAmt)
    }
    this.formGSTPurchase.patchValue({
      totalCgstAmt: totalCgstAmount.toFixed(2),
    });
  }

  getGrandIGSTTotal(){    
    var selectedDataVal=this.formGSTPurchase.getRawValue();    
    var totalIgstAmount = 0;
    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      totalIgstAmount = totalIgstAmount + parseFloat(selectedDataVal.arrayList[i].igstAmt==''?0:selectedDataVal.arrayList[i].igstAmt)
    }
    this.formGSTPurchase.patchValue({
      totalIgstAmt: totalIgstAmount.toFixed(2),
    });
  }

  getGrandTotal(){    
    var selectedDataVal=this.formGSTPurchase.getRawValue();    
    var totalAmount = 0;
    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
        totalAmount = totalAmount + parseFloat(selectedDataVal.arrayList[i].totAmount)
    }
    var nettot = totalAmount + parseFloat(selectedDataVal.roundOff==''?0:selectedDataVal.roundOff)
    this.formGSTPurchase.patchValue({
      totalAmount: totalAmount.toFixed(2),
      netAmount:nettot.toFixed(2),
    });
  }

  onTdsChange(e: any) {
    var selectedValue = e.target.value;
    var selectedDataVal=this.formGSTPurchase.getRawValue();
    var nettot = parseFloat(selectedDataVal.totalAmount) - parseFloat(selectedValue) + parseFloat(selectedDataVal.roundOff)
    this.formGSTPurchase.patchValue({
      netAmount:nettot.toFixed(2),
    });
  }
  
  onRounding(e: any) {
    var selectedValue = e.target.value;
    var selectedDataVal=this.formGSTPurchase.getRawValue();
    var nettot = parseFloat(selectedDataVal.totalAmount) + parseFloat(selectedValue) - parseFloat(selectedDataVal.tDSAmt)
    this.formGSTPurchase.patchValue({
      netAmount:nettot.toFixed(2),
    });
  }

  addItem(i: number): void {
    var selectedDataVal=this.formGSTPurchase.getRawValue();
    if (selectedDataVal.arrayList[i].debitAc?selectedDataVal.arrayList[i].debitAc.dataId:"" != "" && parseFloat(selectedDataVal.arrayList[i].totAmount) > 0) {
      this.formArray.push(this.createInitialArray());  
    }
    else {
      this.toasterService.warning("Please select Required Fields ");
      return;
    }
      
    for (var i=0; i<this.formArray.controls.length;i++){
        this.formArray.controls[i].get("sgstAmt")?.disable();      
        this.formArray.controls[i].get("cgstAmt")?.disable();   
        this.formArray.controls[i].get("igstAmt")?.disable();
        this.formArray.controls[i].get("totAmount")?.disable();
    }
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
  }


  deleteGstPurchageForm(): void {
    if (this.selectedGstpurchaseDetails.masterid != '') {
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedGstpurchaseDetails.masterid;
      if (confirm("Are you sure, you want to delete this?")) {
        this.gstpurchaseService.gstPurchageDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          console.log(this.responseDetails.message);
          this.formGSTPurchase.reset();
          this.route.navigate(['/gstpurchaselist']);
        });
      }
      this.sharedService.loading=false;
    }
  }
  exit(): void {
    this.route.navigate(['/gstpurchaselist']);
  }

  //Submit form details //
  submitGstPurchageForm(): void {
    this.userSubmitted = true;
    if (this.formGSTPurchase.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formGSTPurchase.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
              
    if (this.formGSTPurchase.controls['arrayList'].invalid) {
      this.toasterService.warning("Details fields are mandatory");
      return;
    }
    
    this.sharedService.loading=true;
    var selectedDataVal=this.formGSTPurchase.getRawValue();
    this.gstpurchasemodel.masterid      = this.selectedGstpurchaseDetails.masterid ;
    this.gstpurchasemodel.transDate     = selectedDataVal.transDate ; 
    this.gstpurchasemodel.branchCode    = selectedDataVal.branchCode ; 
    this.gstpurchasemodel.pmtType       = selectedDataVal.pmtType ;      
    this.gstpurchasemodel.vendorId      = this.noVenderSelected? '':selectedDataVal.vendorId.dataId ;  
    this.gstpurchasemodel.vendorInvNo   = selectedDataVal.vendorInvNo ; 
    this.gstpurchasemodel.vendorInvDt   = selectedDataVal.vendorInvDt ; 
    this.gstpurchasemodel.totalItemAmt  = selectedDataVal.totalItemAmt ; 
    this.gstpurchasemodel.totalSgstAmt  = selectedDataVal.totalSgstAmt ; 
    this.gstpurchasemodel.totalCgstAmt  = selectedDataVal.totalCgstAmt ; 
    this.gstpurchasemodel.totalIgstAmt  = selectedDataVal.totalIgstAmt ; 
    this.gstpurchasemodel.totalAmount   = selectedDataVal.totalAmount ; 
    this.gstpurchasemodel.tDSAmt        = selectedDataVal.tDSAmt ;    
    this.gstpurchasemodel.roundOff      = selectedDataVal.roundOff ;    
    this.gstpurchasemodel.netAmount     = selectedDataVal.netAmount.toString() ;     
    this.gstpurchasemodel.creditAc      = selectedDataVal.creditAc ;     
    this.gstpurchasemodel.neftPmt       = this.neftPmtSelected? 'Y':'N' ;    
    this.gstpurchasemodel.chequeNo      = selectedDataVal.chequeNo ;    
    this.gstpurchasemodel.chequeDate    = selectedDataVal.chequeDate ; 
    this.gstpurchasemodel.inputEligible = selectedDataVal.inputEligible;
    this.gstpurchasemodel.attatchFile1  = selectedDataVal.attatchFile1; 
    this.gstpurchasemodel.attatchFile2  = selectedDataVal.attatchFile2; 
    this.gstpurchasemodel.yearId        = this.year ;  
    this.gstpurchasemodel.modifyRemarks = selectedDataVal.modifyRemarks ; 
    this.gstpurchasemodel.loggedInUser  = this.loggedInUserID; 

    this.gstpurchasemodel.gstPurchaseDetailsList = [];

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {      
      if (selectedDataVal.arrayList[i].debitAc.dataId != "" && parseFloat(selectedDataVal.arrayList[i].totAmount) > 0) {
        this.gstpurchasemodel.gstPurchaseDetailsList.push({
          'masterid': '',
          'debitAc':    selectedDataVal.arrayList[i].debitAc?selectedDataVal.arrayList[i].debitAc.dataId:'',
          'narration':  selectedDataVal.arrayList[i].narration,
          'sacHsnCode': selectedDataVal.arrayList[i].sacHsnCode,
          'subLedger':  selectedDataVal.arrayList[i].subLedger,
          'itemAmt':    selectedDataVal.arrayList[i].itemAmt,
          'sgstPct':    selectedDataVal.arrayList[i].sgstPct,
          'sgstAmt':    selectedDataVal.arrayList[i].sgstAmt,
          'cgstPct':    selectedDataVal.arrayList[i].cgstPct,
          'cgstAmt':    selectedDataVal.arrayList[i].cgstAmt,
          'igstPct':    selectedDataVal.arrayList[i].igstPct,
          'igstAmt':    selectedDataVal.arrayList[i].igstAmt,
          'totAmount':  selectedDataVal.arrayList[i].totAmount,
          'refDocNo':   selectedDataVal.arrayList[i].refDocNo,
        });
      }
    }

    let formData = new FormData();
    formData.append('attatchFile1', this.attach1Input.nativeElement.files[0]);
    formData.append('attatchFile2', this.attach2Input.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.gstpurchasemodel));

   
    this.gstpurchaseService.gstPurchageDetailsSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formGSTPurchase.reset();
      this.route.navigate(['/gstpurchaselist']);
    });
    
    this.sharedService.loading=false;
  }
  

}
