import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { bankreceiptentrymodel } from 'src/app/models/bankreceiptentrymodel';
import { Bankdocnofiltermodel } from 'src/app/models/bankdocnofiltermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { CommonService } from 'src/app/services/common.service';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addjournalentry',
  templateUrl: './addjournalentry.component.html',
  styleUrls: ['./addjournalentry.component.css']
})
export class AddjournalentryComponent{
  loggedInUserID: string = '';
  formJournalEntry!: FormGroup;
  userSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  branchname: string = '';
  loginDate: string = '';
  year: string = '';
  locationList: Dropdownmodel[] = [];
  responseDetails = new Responsemodel();
  requestmodel = new Requestmodel();
  creditacList: Dropdownmodel[] = [];


  selectedJournalEntryDetails = new bankreceiptentrymodel();
  docNoFilter= new Bankdocnofiltermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private bankrecEntrymodel: bankreceiptentrymodel, 
    private cashreceiptentryService: CashReceiptEntryService, private toasterService: ToastrService, 
    private commonService: CommonService) {
    this.bankrecEntrymodel = new bankreceiptentrymodel();  
  }

  ngOnInit(): void {
      
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.find((item: { menuList: any; }) => item.menuList).menuList.find((aa: { menuName: string; }) => aa.menuName === "Distance Master - TRIP");
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
    var userData2 = sessionStorage.getItem('yearID')?.toString();
    if (typeof userData2 !== 'undefined' && userData2!== null && userData2 !== '') {
      this.year = userData2;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var userData5 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData5 !== 'undefined' && userData5 !== null && userData5 !== '') {
      this.branchname = userData5;
    }
    else {
      this.route.navigate(['/']);
    }
      
    this.getCreditAcList();
    this.selectedJournalEntryDetails = this.cashreceiptentryService.getCashReceiptEntryDetails();
  
    this.formJournalEntry = this.formBuilder.group({
      ftmDate: new FormControl(this.loginDate,[Validators.required]),
      docType: new FormControl('JV',),
      docSeries: new FormControl('JV',),
      docNo: new FormControl('',[Validators.required]),
      remarks: new FormControl('',[Validators.required]),
      refType: new FormControl('',),
      refNo: new FormControl('',),
      credit: new FormControl('',[Validators.required]),
      debit: new FormControl('',[Validators.required]),
      utrNo: new FormControl('',), 
      linkedYN: new FormControl('',),
      modifyRemarks: new FormControl('',),
      yearID: new FormControl('',),
      arrayList: this.formBuilder.array([this.createInitialArray()]),   
    });  
      
    this.formJournalEntry.controls['docSeries'].disable(); 
    this.formJournalEntry.controls['docNo'].disable(); 
    this.formJournalEntry.controls['credit'].disable(); 
    this.formJournalEntry.controls['debit'].disable(); 
    this.formJournalEntry.controls['modifyRemarks'].disable();
       
    if (this.selectedJournalEntryDetails.ftmID != '') {        
      var selectedDataValue = this.formJournalEntry.getRawValue();
      this.formJournalEntry.patchValue(this.selectedJournalEntryDetails); 
      this.formJournalEntry.patchValue({
        ftmDate: this.commonService.formatDate(this.selectedJournalEntryDetails.ftmDate),
        credit: this.selectedJournalEntryDetails.docAmount,
        debit: this.selectedJournalEntryDetails.docAmount,
      }); 
      this.editMode=true;
      this.formJournalEntry.controls['modifyRemarks'].enable();
      this.getCashReceiptPaymentInnerGridList();
     }
    else{
      this.getdocno("JV");
    }
  }
  
  
  getCashReceiptPaymentInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedJournalEntryDetails.ftmID;
    this.cashreceiptentryService.getCashReceiptInnerGridList(this.requestmodel).subscribe((res) => {
     this.bankrecEntrymodel = res;
      if (this.formArray.controls.length>0){
        this.formArray.removeAt(0);
      }      
        
      for (var i = 1; i < res.detailList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i-1].get("typeSign")?.setValue(res.detailList[i].typeSign);
        this.formArray.controls[i-1].get("amount")?.setValue(res.detailList[i].amount);
        this.formArray.controls[i-1].get("accountID")?.setValue(res.detailList[i].accountID);
        this.formArray.controls[i-1].get("narration")?.setValue(res.detailList[i].narration);
        this.formArray.controls[i-1].get("reference")?.setValue(res.detailList[i].reference);
      }
    });
  }
  
  createInitialArray() {
    return this.formBuilder.group({
      typeSign:[''],
      amount: [''],
      reference: [''],
      accountID: [''],
      narration: [''],
    });
  }
  
  
  get formArray() {
    return this.formJournalEntry.get("arrayList") as FormArray;
  }
  
  // convenience getter for easy access to contact form fields
  get f() { return this.formJournalEntry.controls; }

  addItem(i: number): void { 
    if (this.formArray.value[i].accountID != "" && this.formArray.value[i].typeSign != "" && 
    this.formArray.value[i].amount != "" && this.formArray.value[i].narration != "" ) {
      this.formArray.push(this.createInitialArray());
    } 
    else {
      this.toasterService.warning("Please select Required Fields");
    }
  }
  
  removeItem(i: number) {
    this.formArray.removeAt(i);
  }

  getdocno(doctp: string){
    this.docNoFilter.branchCode = this.branchname;
    this.docNoFilter.yearID     = this.year;
    this.docNoFilter.docSeries  = doctp;
    this.docNoFilter.docType    = doctp;
     this.cashreceiptentryService.getDocNo(this.docNoFilter).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.formJournalEntry.patchValue({
        docNo:this.responseDetails.message
      }); 
    });
  }
  
  updateAmount(index: number, event: any, comingFrom: string) {
    var selectedDataValue = this.formJournalEntry.getRawValue();
    if (comingFrom === 'amount') {
      selectedDataValue.arrayList[index].amount = event.target.value;
    }
    var totalCreditAmount = 0;
    var totalDebitAmount = 0;
    var i=0;
    for (i=0;i<selectedDataValue.arrayList.length;i++){
      if (selectedDataValue.arrayList[i].typeSign == 'C') {
        totalCreditAmount = totalCreditAmount + (selectedDataValue.arrayList[i].amount == "" ? 0 : parseFloat(selectedDataValue.arrayList[i].amount));
      }
      if (selectedDataValue.arrayList[i].typeSign == 'D') {
        totalDebitAmount = totalDebitAmount + (selectedDataValue.arrayList[i].amount == "" ? 0 : parseFloat(selectedDataValue.arrayList[i].amount));
      }
    }

    this.formJournalEntry.patchValue({
      credit: totalCreditAmount.toFixed(2),
      debit: totalDebitAmount.toFixed(2),
    });    
  }
  
  getCreditAcList(): void {
    this.commonService.getCreditAcList().subscribe((res) => {
      this.creditacList = res;
    });
  }
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  
    
  deleteJournalEntryForm(): void {
    if(this.selectedJournalEntryDetails.ftmID != '' ){
     this.requestmodel.strRequest =this.selectedJournalEntryDetails.ftmID
      if (confirm("Are you sure, you want to delete this?")) {
            this.cashreceiptentryService.cashReceiptPaymentsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formJournalEntry.reset();
            window.location.reload();
        });
      }
    }
  }

  exit(): void {
    this.route.navigate(['/journalentrylist']);
  }
    
    //Submit user form details //
  submitJournalEntryForm(): void {
    this.userSubmitted = true;
    if (this.formJournalEntry.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      return;
    }
    if (this.formArray.value.length == 0){
      this.toasterService.warning("Grid Should Not be Empty");
      return;
    }
    var selectedDataValue = this.formJournalEntry.getRawValue();
    
    if (selectedDataValue.credit != selectedDataValue.debit){
      this.toasterService.warning("Credit Amount and Debit Amount should match");
      return;
    }


    this.bankrecEntrymodel.ftmID          = this.selectedJournalEntryDetails.ftmID != '' ? this.selectedJournalEntryDetails.ftmID : '';
    this.bankrecEntrymodel.ftmDate        = selectedDataValue.ftmDate;
    this.bankrecEntrymodel.docType        = selectedDataValue.docType;
    this.bankrecEntrymodel.docSeries      = selectedDataValue.docSeries;
    this.bankrecEntrymodel.docNo          = selectedDataValue.docNo;
    this.bankrecEntrymodel.seriesDoc      = selectedDataValue.docSeries + selectedDataValue.docNo;
    this.bankrecEntrymodel.remarks        = selectedDataValue.remarks;
    this.bankrecEntrymodel.refType        = selectedDataValue.refType;
    this.bankrecEntrymodel.refNo          = selectedDataValue.refNo;
    this.bankrecEntrymodel.docAmount      = selectedDataValue.credit;
    this.bankrecEntrymodel.linkedYN       = 'N';
    this.bankrecEntrymodel.yearID         = this.year;
    this.bankrecEntrymodel.branchCode     = this.branchname;
    this.bankrecEntrymodel.loggedInUser   = this.loggedInUserID;
    this.bankrecEntrymodel.modifyRemarks  = selectedDataValue.modifyRemarks;
    
    if (this.formArray.value != undefined) {
      for (var i = 0; i < this.formArray.value.length; i++) {
        this.bankrecEntrymodel.detailList.push({
        'slNo': (i+1).toString() ,
        'typeSign': this.formArray.value[i].typeSign,
        'amount': this.formArray.value[i].amount,
        'chequeDate': this.formArray.value[i].chequeDate,
        'chequeNo': this.formArray.value[i].chequeNo,
        'narration': this.formArray.value[i].narration,
        'accountID': this.formArray.value[i].accountID ,
        'reference': this.formArray.value[i].reference,
        })
      }
    }
    this.cashreceiptentryService.cashReceiptEntryDetailsSubmitted(this.bankrecEntrymodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formJournalEntry.reset();
      window.location.reload();
    });
  }
}