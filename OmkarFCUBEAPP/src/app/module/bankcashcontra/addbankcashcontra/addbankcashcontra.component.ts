import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { bankreceiptentrymodel } from 'src/app/models/bankreceiptentrymodel';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Bankdocnofiltermodel } from 'src/app/models/bankdocnofiltermodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-addbankcashcontra',
  templateUrl: './addbankcashcontra.component.html',
  styleUrls: ['./addbankcashcontra.component.css']
})
export class AddbankcashcontraComponent {
  loggedInUserID: string = '';
  formBankContra!: FormGroup;
  userSubmitted = false;
  branchname: string = '';
  year: string = '';
  loginDate: string = '';
  keywordLocation = 'dataName';
  locationList: Dropdownmodel[] = [];
  ledgerList: Dropdownmodel[] = [];
  mainAcList: Dropdownmodel[] = [];
  gridAccountList: Dropdownmodel[] = [];
  requestmodel = new Requestmodel();
  docNoFilter= new Bankdocnofiltermodel();
  selectedBankCashContraDetails = new bankreceiptentrymodel();
  responseDetails = new Responsemodel();
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 

  
  constructor(private route: Router, private formBuilder: FormBuilder, 
    private bankreceiptentryModel: bankreceiptentrymodel,  private sharedService: SharedService,
    private cashreceiptentryService: CashReceiptEntryService,
    private toasterService: ToastrService, private commonService: CommonService) {
      this.bankreceiptentryModel = new bankreceiptentrymodel();
  }

  ngOnInit(): void {  
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Bank-Cash Contra Entry");
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
    
    this.sharedService.loading=true;

    this.getMainAcList();
    this.getGridAcList();
    this.selectedBankCashContraDetails = this.cashreceiptentryService.getCashReceiptEntryDetails();

    this.formBankContra = this.formBuilder.group({
      ftmDate: new FormControl(this.loginDate,[Validators.required]),
      docType: new FormControl('BC',),
      docSeries: new FormControl('BC',),
      docNo: new FormControl('',[Validators.required]),
      refType: new FormControl('',),
      refNo: new FormControl('',),
      chequeNo: new FormControl('',[Validators.required]),
      chequeDate: new FormControl('',[Validators.required]),
      narration: new FormControl('',[Validators.required]),
      remarks:new FormControl('',),
      utrNo: new FormControl('',), 
      linkedYN: new FormControl('',),
      modifyRemarks: new FormControl('',[Validators.required]),
      yearID: new FormControl('',),
      amount: new FormControl('',[Validators.required]),
      neftPmt: new FormControl('',), 
      accountID: new FormControl('',[Validators.required]),
      accountid2: new FormControl('',[Validators.required]),
    });

    this.formBankContra.controls['docSeries'].disable(); 
    this.formBankContra.controls['docNo'].disable(); 
    this.formBankContra.controls['modifyRemarks'].disable();    
    this.formBankContra.controls['modifyRemarks'].clearValidators();
    this.formBankContra.controls['chequeNo'].clearValidators();
    this.formBankContra.controls['chequeDate'].clearValidators();
    this.formBankContra.controls['modifyRemarks'].updateValueAndValidity();
    this.formBankContra.controls['chequeNo'].updateValueAndValidity();
    this.formBankContra.controls['chequeDate'].updateValueAndValidity();

    setTimeout(() => {
      if (this.selectedBankCashContraDetails.ftmID != '') {        
        var selectedDataValue = this.formBankContra.getRawValue();
        this.formBankContra.patchValue(this.selectedBankCashContraDetails); 
        this.formBankContra.patchValue({
          ftmDate: this.commonService.formatDate(this.selectedBankCashContraDetails.ftmDate),
        }); 
        this.editMode=true;
        this.formBankContra.controls['modifyRemarks'].enable();
        this.formBankContra.controls['modifyRemarks'].setValidators([Validators.required]);
        this.formBankContra.controls['modifyRemarks'].updateValueAndValidity();    
        this.getBankReceiptPaymentInnerGridList();
      }
      else{
        this.getdocno("BC");
      }
    }, 2000);
    
    this.sharedService.loading=false;
  }

  getBankReceiptPaymentInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedBankCashContraDetails.ftmID;
    this.cashreceiptentryService.getCashReceiptInnerGridList(this.requestmodel).subscribe((res) => {
      this.bankreceiptentryModel = res;
      
      this.formBankContra.patchValue({
        accountid2: res.detailList[0].accountID,
        chequeNo: res.detailList[0].chequeNo,
        chequeDate: res.detailList[0].chequeDate,
        amount: res.detailList[0].amount,
        reference: res.detailList[0].reference,
        narration: res.detailList[0].narration,
        accountID: this.gridAccountList.find(e => e.dataId ==res.detailList[1].accountID),
      });       
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


  // convenience getter for easy access to contact form fields
  get f() { return this.formBankContra.controls; }

  getdocno(doctp: string){
    this.docNoFilter.branchCode = this.branchname;
    this.docNoFilter.yearID     = this.year;
    this.docNoFilter.docSeries  = doctp;
    this.docNoFilter.docType    = doctp;

    this.cashreceiptentryService.getDocNo(this.docNoFilter).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.formBankContra.patchValue({
        docNo:this.responseDetails.message
      }); 
    });
  }

  getMainAcList(): void {    
    this.requestmodel.strRequest="BC"
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

  onneftChange(e:any){
    if(e.target.checked){
      this.formBankContra.controls['chequeNo'].setValidators([Validators.required]);
      this.formBankContra.controls['chequeDate'].setValidators([Validators.required]);
    }
    else {
      this.formBankContra.controls['chequeNo'].clearValidators();      
      this.formBankContra.controls['chequeDate'].clearValidators();   
    }
    this.formBankContra.controls['chequeNo'].updateValueAndValidity();
    this.formBankContra.controls['chequeDate'].updateValueAndValidity();
  }

  
  deleteBankCashContraForm(): void {
    if(this.selectedBankCashContraDetails.ftmID != '' ){
      this.sharedService.loading=true;
      this.requestmodel.strRequest =this.selectedBankCashContraDetails.ftmID
      if (confirm("Are you sure, you want to delete this?")) {
            this.cashreceiptentryService.cashReceiptPaymentsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formBankContra.reset();
            this.route.navigate(['/bankcashcontralist']);
        });
      }
      
      this.sharedService.loading=false;
    }
  }

  exit(): void {
    this.route.navigate(['/bankcashcontralist']);
  }
  
  //Submit user form details //
  submitBankCashContraForm(): void {
    if (this.formBankContra.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formBankContra.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }  
      return;
    }

    var selectedDataValue=  this.formBankContra.getRawValue();
    if (selectedDataValue.narration.toString().trim().length < 5) {
      this.toasterService.warning("Narration should be atleast 5 characters");   
    }
    if (this.selectedBankCashContraDetails.ftmID!="" && selectedDataValue.modifyRemarks.toString().trim().length < 10) {
      this.toasterService.warning("Modification Remarks should be atleast 10 characters");   
    }
    this.bankreceiptentryModel.ftmID          = this.selectedBankCashContraDetails.ftmID;
    this.bankreceiptentryModel.ftmDate        = selectedDataValue.ftmDate;
    this.bankreceiptentryModel.docType        = selectedDataValue.docType.toString().toUpperCase();
    this.bankreceiptentryModel.docSeries      = selectedDataValue.docSeries.toString().toUpperCase();
    this.bankreceiptentryModel.docNo          = selectedDataValue.docNo.toString().toUpperCase();
    this.bankreceiptentryModel.seriesDoc      = selectedDataValue.docSeries + selectedDataValue.docNo;
    this.bankreceiptentryModel.remarks        = '';
    this.bankreceiptentryModel.refType        = selectedDataValue.refType;
    this.bankreceiptentryModel.refNo          = selectedDataValue.refNo.toString().toUpperCase();
    this.bankreceiptentryModel.docAmount      = selectedDataValue.amount;
    this.bankreceiptentryModel.linkedYN       = 'N';
    this.bankreceiptentryModel.yearID         = this.year;
    this.bankreceiptentryModel.branchCode     = this.branchname;
    this.bankreceiptentryModel.loggedInUser   = this.loggedInUserID;
    this.bankreceiptentryModel.modifyRemarks  = selectedDataValue.modifyRemarks.toString().toUpperCase();

    this.bankreceiptentryModel.detailList = [];
    
    this.bankreceiptentryModel.detailList.push({
      'slNo': '0' ,
      'typeSign': 'D',
      'amount': selectedDataValue.amount,
      'chequeDate': selectedDataValue.chequeDate?selectedDataValue.chequeDate:selectedDataValue.ftmDate,
      'chequeNo': selectedDataValue.chequeNo,
      'narration': selectedDataValue.narration.toString().toUpperCase(),
      'accountID': selectedDataValue.accountid2,
      'reference': selectedDataValue.refNo,
    })

    this.bankreceiptentryModel.detailList.push({
      'slNo': '1' ,
      'typeSign': 'C',
      'amount': selectedDataValue.amount,
      'chequeDate': selectedDataValue.chequeDate?selectedDataValue.chequeDate:selectedDataValue.ftmDate,
      'chequeNo': selectedDataValue.chequeNo,
      'narration': selectedDataValue.narration.toString().toUpperCase(),
      'accountID': selectedDataValue.accountID.dataId,
      'reference': selectedDataValue.refNo,
    })
    
    this.sharedService.loading=true;
    this.cashreceiptentryService.cashReceiptEntryDetailsSubmitted(this.bankreceiptentryModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formBankContra.reset();
      this.route.navigate(['/bankcashcontralist']);
    });    
    this.sharedService.loading=false;
  }
}











