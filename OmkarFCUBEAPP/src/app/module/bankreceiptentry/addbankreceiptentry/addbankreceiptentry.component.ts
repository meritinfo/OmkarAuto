import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { bankreceiptentrymodel } from 'src/app/models/bankreceiptentrymodel';
import { bankreceiptentrylistmodel } from 'src/app/models/bankreceiptentrylistmodel';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Bankdocnofiltermodel } from 'src/app/models/bankdocnofiltermodel';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';

@Component({
  selector: 'app-addbankreceiptentry',
  templateUrl: './addbankreceiptentry.component.html',
  styleUrls: ['./addbankreceiptentry.component.css']
})
export class AddbankreceiptentryComponent {
  loggedInUserID: string = '';
  formBankRecEntry!: FormGroup;
  userSubmitted = false;
  branchname: string = '';
  year: string = '';
  loginDate: string = '';
  locationList: Dropdownmodel[] = [];
  selectedBankReceiptEntryDetails = new bankreceiptentrymodel();
  docNoFilter= new Bankdocnofiltermodel();
  responseDetails = new Responsemodel();
  requestmodel = new Requestmodel();
  creditacList: Dropdownmodel[] = [];
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private bankreceiptentryModel: bankreceiptentrymodel, 
    private cashreceiptentryService: CashReceiptEntryService,
    private toasterService: ToastrService, private commonService: CommonService) {
    this.bankreceiptentryModel = new bankreceiptentrymodel();
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
      //vehicleMasterID: this.locationList.find(e => e.dataId ==  this.formUser.value.),
    }
    else {
      this.route.navigate(['/']);
    }
    this.getCreditAcList();
    this.selectedBankReceiptEntryDetails = this.cashreceiptentryService.getCashReceiptEntryDetails();

    this.formBankRecEntry = this.formBuilder.group({
      ftmDate: new FormControl(this.loginDate,[Validators.required]),
      docType: new FormControl('BP',),
      docSeries: new FormControl('BP',),
      docNo: new FormControl('',[Validators.required]),
      refType: new FormControl('',),
      refNo: new FormControl('',),
      docAmount: new FormControl('',[Validators.required]),
      utrNo: new FormControl('',), 
      linkedYN: new FormControl('',),
      modifyRemarks: new FormControl('',),
      yearID: new FormControl('',),
      amount: new FormControl('',), 
      neftPmt: new FormControl('',), 
      accountid2: new FormControl('',[Validators.required]),
      arrayList: this.formBuilder.array([this.createInitialArray()]), 
    });
    
    this.formBankRecEntry.controls['docSeries'].disable(); 
    this.formBankRecEntry.controls['docNo'].disable(); 
    this.formBankRecEntry.controls['docAmount'].disable(); 
    this.formBankRecEntry.controls['modifyRemarks'].disable();

    if (this.selectedBankReceiptEntryDetails.ftmID != '') {        
      var selectedDataValue = this.formBankRecEntry.getRawValue();
      this.formBankRecEntry.patchValue(this.selectedBankReceiptEntryDetails); 
      this.formBankRecEntry.patchValue({
        ftmDate: this.commonService.formatDate(this.selectedBankReceiptEntryDetails.ftmDate),
      }); 
      this.editMode=true;
      this.formBankRecEntry.controls['modifyRemarks'].enable();
      this.getBankReceiptPaymentInnerGridList();

    }
    else{
      this.getdocno("BP");
    }
  }

  
  getBankReceiptPaymentInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedBankReceiptEntryDetails.ftmID;
    this.cashreceiptentryService.getCashReceiptInnerGridList(this.requestmodel).subscribe((res) => {
      this.bankreceiptentryModel = res;
      if (this.formArray.controls.length>0){
        this.formArray.removeAt(0);
      }
      this.formBankRecEntry.patchValue({
        accountid2: res.detailList[0].accountID,
      }); 
      for (var i = 1; i < res.detailList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i-1].get("amount")?.setValue(res.detailList[i].amount);
        this.formArray.controls[i-1].get("accountID")?.setValue(res.detailList[i].accountID);
        this.formArray.controls[i-1].get("chequeNo")?.setValue(res.detailList[i].chequeNo);
        this.formArray.controls[i-1].get("chequeDate")?.setValue(res.detailList[i].chequeDate);
        this.formArray.controls[i-1].get("narration")?.setValue(res.detailList[i].narration);
        this.formArray.controls[i-1].get("reference")?.setValue(res.detailList[i].reference);
      }
    });
  }

  createInitialArray() {
    return this.formBuilder.group({
      amount: [''],
      reference: [''],
      accountID: [''],
      chequeNo: [''],
      chequeDate: [''],
    });
  }
  
  get formArray() {  
    return this.formBankRecEntry.get("arrayList") as FormArray;
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formBankRecEntry.controls; }

  addItem(index: number): void { 
    if (this.formArray.value[index].accountID != "" && this.formArray.value[index].amount != "" 
      && this.formArray.value[index].narration != "" ) {
      this.formArray.push(this.createInitialArray());
    } 
    else {
      this.toasterService.warning("Please select Required Fields");
    }
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
  }

  changePType(selectedValue: string) { 
    this.formBankRecEntry.patchValue({
      docSeries: selectedValue,
    }); 
    this.getdocno(selectedValue);   
  }

  getdocno(doctp: string){
    this.docNoFilter.branchCode = this.branchname;
    this.docNoFilter.yearID     = this.year;
    this.docNoFilter.docSeries  = doctp;
    this.docNoFilter.docType    = doctp;

    this.cashreceiptentryService.getDocNo(this.docNoFilter).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.formBankRecEntry.patchValue({
        docNo:this.responseDetails.message
      }); 
    });
  }

  updateAmount(index: number, event: any, comingFrom: string) {
    var selectedDataValue = this.formBankRecEntry.getRawValue();
    if (comingFrom === 'amount') {
      selectedDataValue.arrayList[index].amount = event.target.value;
    }
    var totalAmount = 0;
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
        totalAmount = totalAmount + (selectedDataValue.arrayList[i].amount == "" ? 0 : parseFloat(selectedDataValue.arrayList[i].amount));
    }
    this.formBankRecEntry.patchValue({
      docAmount: totalAmount.toFixed(2),
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

  
  deleteBankRceiptPaymentsForm(): void {
    if(this.selectedBankReceiptEntryDetails.ftmID != '' ){
     this.requestmodel.strRequest =this.selectedBankReceiptEntryDetails.ftmID
      if (confirm("Are you sure, you want to delete this?")) {
            this.cashreceiptentryService.cashReceiptPaymentsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formBankRecEntry.reset();
            window.location.reload();
        });
      }
    }
  }
  exit(): void {
    this.route.navigate(['/bankreceiptentrylist']);
  }
  
  //Submit user form details //
  submitBankReceiptPaymentsForm(): void {
    this.userSubmitted = true;
    if (this.formBankRecEntry.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      return;
    }
    if (this.formArray.value.length == 0){
      this.toasterService.warning("Grid Should Not be Empty");
      return;
    }


    var selectedDataValue = this.formBankRecEntry.getRawValue();
    this.bankreceiptentryModel.ftmID          = this.selectedBankReceiptEntryDetails.ftmID != '' ? this.selectedBankReceiptEntryDetails.ftmID : '';
    this.bankreceiptentryModel.ftmDate        = selectedDataValue.ftmDate;
    this.bankreceiptentryModel.docType        = selectedDataValue.docType;
    this.bankreceiptentryModel.docSeries      = selectedDataValue.docSeries;
    this.bankreceiptentryModel.docNo          = selectedDataValue.docNo;
    this.bankreceiptentryModel.seriesDoc      = selectedDataValue.docSeries + selectedDataValue.docNo;
    this.bankreceiptentryModel.remarks        = '';
    this.bankreceiptentryModel.refType        = selectedDataValue.refType;
    this.bankreceiptentryModel.refNo          = selectedDataValue.refNo;
    this.bankreceiptentryModel.docAmount      = selectedDataValue.docAmount;
    this.bankreceiptentryModel.linkedYN       = 'N';
    this.bankreceiptentryModel.yearID         = this.year;
    this.bankreceiptentryModel.branchCode     = this.branchname;
    this.bankreceiptentryModel.loggedInUser   = this.loggedInUserID;
    this.bankreceiptentryModel.modifyRemarks  = selectedDataValue.modifyRemarks;

    var tpsign =''
    var tpfirstsign =''
    if (selectedDataValue.docType == "BP") {
      var tpsign ='D'
      var tpfirstsign ='C'
    }
    else{
      var tpsign ='C'
      var tpfirstsign ='D'
    }

    this.bankreceiptentryModel.detailList.push({
      'slNo': '0' ,
      'typeSign': tpfirstsign,
      'amount': selectedDataValue.docAmount,
      'chequeDate': '',
      'chequeNo': '',
      'narration': '',
      'accountID': selectedDataValue.accountid2,
      'reference': selectedDataValue.refNo,
    })
    if (this.formArray.value != undefined) {
      for (var i = 0; i < this.formArray.value.length; i++) {
        this.bankreceiptentryModel.detailList.push({
        'slNo': (i+1).toString() ,
        'typeSign': tpfirstsign,
        'amount': this.formArray.value[i].amount,
        'chequeDate': this.formArray.value[i].chequeDate,
        'chequeNo': this.formArray.value[i].chequeNo,
        'narration': '',
        'accountID': this.formArray.value[i].accountID ,
        'reference': this.formArray.value[i].reference,
        })
      }
    }

    this.cashreceiptentryService.cashReceiptEntryDetailsSubmitted(this.bankreceiptentryModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formBankRecEntry.reset();
      window.location.reload();
    });
  }
}






