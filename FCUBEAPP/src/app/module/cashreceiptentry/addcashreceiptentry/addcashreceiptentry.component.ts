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
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-addcashreceiptentry',
  templateUrl: './addcashreceiptentry.component.html',
  styleUrls: ['./addcashreceiptentry.component.css']
})
export class AddcashreceiptentryComponent {
  loggedInUserID: string = '';
  formCashRRecEntry!: FormGroup;
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
  mainAcList: Dropdownmodel[] = [];
  finRefTypes: Dropdownmodel[] = [];
  gridAccountList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  selectedCashReceiptEntryDetails = new bankreceiptentrymodel();
  docNoFilter= new Bankdocnofiltermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private bankrecEntrymodel: bankreceiptentrymodel,  private sharedService: SharedService,
    private cashreceiptentryService: CashReceiptEntryService, private toasterService: ToastrService, 
    private commonService: CommonService) {
    this.bankrecEntrymodel = new bankreceiptentrymodel();  
    }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Cash Receipts & Payments Voucher Entry");
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
    
    this.sharedService.loading=true;
    this.getMainAcList();
    this.getGridAcList();
    this.getFinRefTypes();
    this.selectedCashReceiptEntryDetails = this.cashreceiptentryService.getCashReceiptEntryDetails();

    this.formCashRRecEntry = this.formBuilder.group({
      ftmDate: new FormControl(this.loginDate,[Validators.required]),
      docType: new FormControl('CP',),
      docSeries: new FormControl('CP',),
      docNo: new FormControl('',[Validators.required]),
      remarks: new FormControl('',),
      refType: new FormControl('OTHERS',),
      refNo: new FormControl('',),
      docAmount: new FormControl('',[Validators.required]),
      utrNo: new FormControl('',), 
      linkedYN: new FormControl('',),
      modifyRemarks: new FormControl('',[Validators.required]),
      yearID: new FormControl('',),
      accountid2: new FormControl('',[Validators.required]),
      arrayList: this.formBuilder.array([this.createInitialArray()]),   
    });

    
    this.formCashRRecEntry.controls['docSeries'].disable(); 
    this.formCashRRecEntry.controls['docNo'].disable(); 
    this.formCashRRecEntry.controls['docAmount'].disable(); 
    this.formCashRRecEntry.controls['modifyRemarks'].disable();    
    this.formCashRRecEntry.controls['refType'].disable();

    this.formCashRRecEntry.controls['modifyRemarks'].clearValidators();
    this.formCashRRecEntry.controls['modifyRemarks'].updateValueAndValidity();
    
    setTimeout(() => {
      if (this.selectedCashReceiptEntryDetails.ftmID != '') {   
        this.formCashRRecEntry.patchValue(this.selectedCashReceiptEntryDetails); 
        this.formCashRRecEntry.patchValue({
          ftmDate: this.commonService.formatDate(this.selectedCashReceiptEntryDetails.ftmDate),
        }); 
        if(this.selectedCashReceiptEntryDetails.linkedYN=="Y"){
          this.formCashRRecEntry.controls['refType'].disable();
          this.formCashRRecEntry.controls['refNo'].disable();
        }
        this.editMode=true;
        this.formCashRRecEntry.controls['modifyRemarks'].enable();
        this.getCashReceiptPaymentInnerGridList();
        this.formCashRRecEntry.controls['modifyRemarks'].setValidators([Validators.required]);  
        this.formCashRRecEntry.controls['modifyRemarks'].updateValueAndValidity();
      }
      else{
        this.getdocno("CP");
      }
    }, 2000);
    this.sharedService.loading=false;
  }


  getCashReceiptPaymentInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedCashReceiptEntryDetails.ftmID;
    this.cashreceiptentryService.getCashReceiptInnerGridList(this.requestmodel).subscribe((res) => {
      this.bankrecEntrymodel = res;
      if (this.formArray.controls.length>0){
        this.formArray.removeAt(0);
      }
      this.formCashRRecEntry.patchValue({
        accountid2: res.detailList[0].accountID,
      }); 
      for (var i = 1; i < res.detailList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i-1].get("amount")?.setValue(res.detailList[i].amount);
        this.formArray.controls[i-1].get("accountID")?.setValue(this.gridAccountList.find(e => e.dataId == res.detailList[i].accountID));
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
      narration: [''],
    });
  }

  getFinRefTypes(): void {    
    this.cashreceiptentryService.getFinRefTypes().subscribe((res) => {
      this.finRefTypes = res;
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


  get formArray() {
    return this.formCashRRecEntry.get("arrayList") as FormArray;
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formCashRRecEntry.controls; }


  addItem(index: number): void { 
    if (this.formArray.value[index].accountID.dataId != "" && this.formArray.value[index].amount != "" 
      && this.formArray.value[index].narration != "" ) {
      this.formArray.push(this.createInitialArray());
    } 
    else {
      this.toasterService.warning("Please select Required Fields");
    }
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);
    this.updateAmount(0, '', ''); 
    // if(this.formArray.value.length==0){
    //   this.formArray.push(this.createInitialArray());
    // }
  }

  changePType(selectedValue: string) { 
    this.formCashRRecEntry.patchValue({
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
      this.formCashRRecEntry.patchValue({
        docNo:this.responseDetails.message
      }); 
    });
  }

  updateAmount(index: number, event: any, comingFrom: string) {
    var selectedDataValue = this.formCashRRecEntry.getRawValue();
    if (comingFrom === 'amount') {
      selectedDataValue.arrayList[index].amount = event.target.value;
    }
    var totalAmount = 0;
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
        totalAmount = totalAmount + (selectedDataValue.arrayList[i].amount == "" ? 0 : parseFloat(selectedDataValue.arrayList[i].amount));
    }
    this.formCashRRecEntry.patchValue({
      docAmount: totalAmount.toFixed(2),
    });
  }

  getMainAcList(): void {    
    this.requestmodel.strRequest="C"
    this.cashreceiptentryService.getAccountList(this.requestmodel).subscribe((res) => {
      this.mainAcList = res;
    });
  }

  
  getGridAcList(): void {
    this.requestmodel.strRequest="G"
    this.cashreceiptentryService.getAccountList(this.requestmodel).subscribe((res) => {
      this.gridAccountList = res;
    });
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }

  
  deleteCashReceiptPaymentsForm(): void {
    if(this.selectedCashReceiptEntryDetails.ftmID != '' ){      
      this.sharedService.loading=true;
     this.requestmodel.strRequest =this.selectedCashReceiptEntryDetails.ftmID
      if (confirm("Are you sure, you want to delete this?")) {
            this.cashreceiptentryService.cashReceiptPaymentsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if(this.responseDetails.status){
              this.toasterService.success(this.responseDetails.message); 
              this.formCashRRecEntry.reset();
              this.route.navigate(['/cashreceiptentrylist']);
            }
            else{
              this.toasterService.warning(this.responseDetails.message);        
            } 
        });
      }      
    this.sharedService.loading=false;
    }
  }
  exit(): void {
    this.route.navigate(['/cashreceiptentrylist']);
  }

  //Submit user form details //
  submitCashReceiptPaymentsForm(): void {
      this.userSubmitted = true;
      if (this.formCashRRecEntry.invalid) {
        this.toasterService.warning("Please Enter Mandatory Fields ");  
        const controls = this.formCashRRecEntry.controls;
        for (const name in controls) {
          if (controls[name].invalid) {
            this.toasterService.warning(name + " Fields is Invalid");   
          }
        }     
        return;
      }
      if (this.formArray.value.length == 0){
        this.toasterService.warning("Grid Should Not be Empty");
        return;
      }

    var selectedDataValue=  this.formCashRRecEntry.getRawValue();
    
    if(this.selectedCashReceiptEntryDetails.ftmID!=""){
      if(selectedDataValue.modifyRemarks.toString().length < 10){
        this.toasterService.warning("Modify Remarks should be atleast 10 characters");
        return;
      }
    }    

    this.bankrecEntrymodel.ftmID          = this.selectedCashReceiptEntryDetails.ftmID ;
    this.bankrecEntrymodel.ftmDate        = selectedDataValue.ftmDate;
    this.bankrecEntrymodel.docType        = selectedDataValue.docType.toString().toUpperCase();
    this.bankrecEntrymodel.docSeries      = selectedDataValue.docSeries.toString().toUpperCase();
    this.bankrecEntrymodel.docNo          = selectedDataValue.docNo;
    this.bankrecEntrymodel.seriesDoc      = selectedDataValue.docSeries + selectedDataValue.docNo;
    this.bankrecEntrymodel.remarks        = selectedDataValue.remarks.toString().toUpperCase();
    this.bankrecEntrymodel.refType        = selectedDataValue.refType.toString().toUpperCase();
    this.bankrecEntrymodel.refNo          = selectedDataValue.refNo;
    this.bankrecEntrymodel.docAmount      = selectedDataValue.docAmount;
    this.bankrecEntrymodel.linkedYN       = 'N';
    this.bankrecEntrymodel.neftPmt        = "";
    this.bankrecEntrymodel.uTRNo          = "";
    this.bankrecEntrymodel.yearID         = this.year;
    this.bankrecEntrymodel.branchCode     = this.branchname;
    this.bankrecEntrymodel.loggedInUser   = this.loggedInUserID;
    this.bankrecEntrymodel.modifyRemarks  = selectedDataValue.modifyRemarks.toString().toUpperCase();
    
    this.bankrecEntrymodel.detailList = [];

    var tpsign =''
    var tpfirstsign =''
    if (selectedDataValue.docType == "CP") {
      var tpsign ='C'
      var tpfirstsign ='D'
    }
    else{
      var tpsign ='D'
      var tpfirstsign ='C'
    }

    this.bankrecEntrymodel.detailList.push({
      'slNo': '0' ,
      'typeSign': tpfirstsign,
      'amount': selectedDataValue.docAmount,
      'narration': selectedDataValue.remarks.toString().toUpperCase(),
      'chequeNo': '',
      'chequeDate': '',
      'accountID': selectedDataValue.accountid2,
      'reference': selectedDataValue.refNo,
    })

    if (this.formArray.value != undefined) {
      for (var i = 0; i < this.formArray.value.length; i++) {
        if (this.formArray.value[i].accountID.dataId!="" ){
          if ((this.formArray.value[i].amount=="") ){
            this.toasterService.warning("Amount cannot be Empty in details grid");
            this.sharedService.loading=false;
            return;
          }
          if (parseFloat(this.formArray.value[i].amount)==0) {
            this.toasterService.warning("Amount cannot be Zero in details grid");
            this.sharedService.loading=false;
            return;
          }
        }
        if (parseFloat(this.formArray.value[i].amount)>0) {
          if (this.formArray.value[i].accountID.dataId=="") {
            this.toasterService.warning("Account cannot be Empty in details grid");
            this.sharedService.loading=false;
            return;
          }
        }
         
        if (this.formArray.value[i].accountID.dataId!="" && parseFloat(this.formArray.value[i].amount)>0 ){
            this.bankrecEntrymodel.detailList.push({
            'slNo': (i+1).toString() ,
            'typeSign': tpsign,
            'amount': this.formArray.value[i].amount,
            'narration': this.formArray.value[i].narration.toString().toUpperCase(),
            'chequeNo': '',
            'chequeDate': '',
            'accountID': this.formArray.value[i].accountID.dataId ,
            'reference': this.formArray.value[i].reference.toString().toUpperCase(),
          })
        }
      }
    }
    if(this.bankrecEntrymodel.detailList.length<2) {
      this.toasterService.warning("Grid Should Not be Empty");
      this.sharedService.loading=false;
      return;
    }
    
    this.sharedService.loading=true;
    this.cashreceiptentryService.cashReceiptEntryDetailsSubmitted(this.bankrecEntrymodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success("Saved Successfully"); 
        this.formCashRRecEntry.reset();
        this.route.navigate(['/cashreceiptentrylist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      } 
    });    
    this.sharedService.loading=false;
  }
}



