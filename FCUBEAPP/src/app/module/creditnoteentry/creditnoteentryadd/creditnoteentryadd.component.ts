
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DocRenewalMasterService } from 'src/app/services/docrenewalmaster.service';
import { Creditnoteentrymodel } from 'src/app/models/creditnoteentrymodel';
import { CreditNoteService } from 'src/app/services/creditnoteentry.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-creditnoteentryadd',
  templateUrl: './creditnoteentryadd.component.html',
  styleUrls: ['./creditnoteentryadd.component.css']
})
export class CreditnoteentryaddComponent {
  formUser!: FormGroup;
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  showDetail =false;
  dashboard: string = "";
  createdBy: string = "";
  modifiedBy: string = "";
  branchList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  seriesList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  debitAcList: Dropdownmodel[] = [];

  responseDetails = new Responsemodel();
  selectedCreditDetails = new Creditnoteentrymodel();
  keywordLocation = 'dataName';

  constructor(private route: Router, private formBuilder: FormBuilder,
    private creditmodel: Creditnoteentrymodel, private creditNoteService: CreditNoteService, 
    private docRenewalMasterService: DocRenewalMasterService,
    private commonService: CommonService, private sharedService: SharedService,
    private toastrService: ToastrService, private requestmodel: Requestmodel, private reportmodel: Reportmodel) {
    this.creditmodel = new Creditnoteentrymodel();

  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Credit Note Entry"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if (!this.viewStatus) {
      this.route.navigate([this.dashboard]);
    }

    this.sharedService.loggedInStatus = true;
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    else {
      this.route.navigate(['/']);
    }
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;
    }
    this.getBranchList();
    this.getdebitAc();
    this.getBillingPartyList();
    this.getYearList();

    this.sharedService.loading = false;
    this.selectedCreditDetails = this.creditNoteService.getCreditNoteDetails();

    this.formUser = this.formBuilder.group({
      cnBranch: new FormControl(this.branch, [Validators.required]),
      cnDate: new FormControl(this.loginDate, [Validators.required]),
      cnSlNo: new FormControl('', [Validators.required]),
      cnAgainst: new FormControl('',[Validators.required]),
      partyId: new FormControl('',[Validators.required]),
      billYear: new FormControl('',[Validators.required]),
      billingStation: new FormControl('',[Validators.required]),
      billSeries: new FormControl(''),
      billSlNo: new FormControl('',[Validators.required]),
      billDate: new FormControl(''),
      billType: new FormControl(''),
      billsMasterId: new FormControl(''),
      billGstBy: new FormControl(''),
      billGstType: new FormControl(''),
      billGstPct: new FormControl(''),
      billTaxableAmt: new FormControl(''),
      billSgstAmt: new FormControl(''),
      billCgstAmt: new FormControl(''),
      billIgstAmt: new FormControl(''),
      totalBillAmount: new FormControl(''),
      sacCode: new FormControl(''),
      fullPartReBill: new FormControl('',[Validators.required]),
      cnCreditAmt: new FormControl('0'),
      cnSgstAmt: new FormControl('0'),
      cnCgstAmt: new FormControl('0'),
      cnIgstAmt: new FormControl('0'),
      totalCreditAmt: new FormControl('0',[Validators.required]),
      creditNoteRemarks: new FormControl(''),
      debitAc: new FormControl('',[Validators.required]),
    });

    this.formUser.controls["cnBranch"].disable();
    this.formUser.controls["billDate"].disable();
    this.formUser.controls["billType"].disable();
    this.formUser.controls["billGstBy"].disable();
    this.formUser.controls["billGstType"].disable();
    this.formUser.controls["billGstPct"].disable();
    this.formUser.controls["billTaxableAmt"].disable();
    this.formUser.controls["billSgstAmt"].disable();
    this.formUser.controls["billCgstAmt"].disable();
    this.formUser.controls["billIgstAmt"].disable();
    this.formUser.controls["totalBillAmount"].disable();
    this.formUser.controls["totalCreditAmt"].disable();    
    this.getSlNo();

    setTimeout(() => {
      if (this.selectedCreditDetails.cnId != '') {
        this.sharedService.loading = true;
        this.formUser.patchValue(this.selectedCreditDetails);
        this.formUser.patchValue({
           billDate: this.commonService.formatDate(this.selectedCreditDetails.billDate) ,
           cnDate:this.commonService.formatDate(this.selectedCreditDetails.cnDate) ,
           partyId : this.partyList.find(e => e.dataId == this.selectedCreditDetails.partyId),          
           debitAc: this.debitAcList.find(e => e.dataId == this.selectedCreditDetails.debitAc),
        })
 
        if (this.selectedCreditDetails.cnAgainst=="BL"){
            this.showDetail =true;
        }     

        this.formUser.controls["billSlNo"].disable();
        this.formUser.controls["billingStation"].disable();
        this.formUser.controls["billYear"].disable();
        this.formUser.controls["billSeries"].disable();  
        this.formUser.controls["cnBranch"].disable();  
        this.formUser.controls["cnDate"].disable();  
        this.formUser.controls["cnSlNo"].disable();      
        this.formUser.controls["cnAgainst"].disable(); 
        this.formUser.controls["partyId"].disable();

        this.editMode = true;
        this.sharedService.loading = false;
      }

    }, 2000);
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }


  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;     
      this.formUser.patchValue({
        billingStation: this.branch
      });
     this.getSeriesList(this.branch);
    });
  }
  
  getdebitAc(): void {
    this.requestmodel.strRequest = "";
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.debitAcList = res;
    });
  }

  getBillingPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

  getSeriesList(br: string): void {
    this.requestmodel.strRequest = "B";
    this.requestmodel.strRequest1 = br;
    this.commonService.getSeriesllpList(this.requestmodel).subscribe((res) => {
      this.seriesList = res;
    });
  }

  onChangeSearch(search: string) {
    // do something with selected item
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (partyList: Dropdownmodel[], query: string): any[] {
    return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  getYearList(): void {
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
    });
  }


  getDetails() {
    var selectedData = this.formUser.getRawValue();
    if(selectedData.billSlNo==""){
      this.toastrService.warning("Please Enter Bill No ");
      return;
    }
    if(selectedData.partyId.dataId){
      //ignore
    }
    else{
      this.toastrService.warning("Please Select Party ");
      return;
    }
    this.reportmodel.filterStr  = selectedData.billSlNo;
    this.reportmodel.filterStr1 = selectedData.billingStation;
    this.reportmodel.filterStr2 = selectedData.billYear;
    this.reportmodel.filterStr3 = selectedData.billSeries;
    this.reportmodel.search     = selectedData.partyId.dataId;
    
    this.creditNoteService.getCreditNoteBillDetails(this.reportmodel).subscribe((res: Creditnoteentrymodel) => {
      this.creditmodel = res;
      if (this.creditmodel.billsMasterId) {
        this.formUser.controls["billSlNo"].disable();
        this.formUser.controls["billingStation"].disable();
        this.formUser.controls["billYear"].disable();
        this.formUser.controls["billSeries"].disable();      
      
        this.formUser.patchValue({
          billDate: this.commonService.formatDate(this.creditmodel.billDate) ,
          billType: this.creditmodel.billType,
          billsMasterId: this.creditmodel.billsMasterId,
          billGstType: this.creditmodel.billGstType,
          billGstBy: this.creditmodel.billGstBy,
          billGstPct: this.creditmodel.billGstPct,
          billTaxableAmt: this.creditmodel.billTaxableAmt,
          billSgstAmt: this.creditmodel.billSgstAmt,
          billCgstAmt: this.creditmodel.billCgstAmt,
          billIgstAmt: this.creditmodel.billIgstAmt,
          totalBillAmount: this.creditmodel.totalBillAmount,
          cnCreditAmt: this.creditmodel.billTaxableAmt,
          cnSgstAmt: this.creditmodel.billSgstAmt,
          cnCgstAmt: this.creditmodel.billCgstAmt,
          cnIgstAmt: this.creditmodel.billIgstAmt,
          totalCreditAmt: this.creditmodel.totalBillAmount,
          sacCode: this.creditmodel.sacCode,
        });
      }
      else{
        this.toastrService.warning("Entered Bill does not exists/ No Outstanding");
      }
    });    
  }

  calTotal(){    
    var selectedData = this.formUser.getRawValue();
    var cnCreditAmt = selectedData.cnCreditAmt? parseFloat(selectedData.cnCreditAmt):0;
    var cnSgstAmt = selectedData.cnSgstAmt? parseFloat(selectedData.cnSgstAmt):0;
    var cnCgstAmt = selectedData.cnCgstAmt? parseFloat(selectedData.cnCgstAmt):0;
    var cnIgstAmt = selectedData.cnIgstAmt? parseFloat(selectedData.cnIgstAmt):0;
    var totalCreditAmt = cnCreditAmt + cnSgstAmt + cnCgstAmt + cnIgstAmt;

    this.formUser.patchValue({
      totalCreditAmt  : totalCreditAmt.toString()
    });
  }
  
  showBillDetail(){
    var selectedData = this.formUser.getRawValue();
    if (selectedData.cnAgainst === "GN") {
      this.showDetail = false;  
      this.formUser.controls['fullPartReBill'].disable();
      this.formUser.controls['billYear'].clearValidators();      
      this.formUser.controls['billingStation'].clearValidators();      
      this.formUser.controls['billSlNo'].clearValidators();
      this.formUser.patchValue({
        fullPartReBill: "G"
      });           
    }
    else{
      this.showDetail = true;  
      this.formUser.controls['fullPartReBill'].enable();
      this.formUser.controls['billYear'].setValidators([Validators.required]);
      this.formUser.controls['billingStation'].setValidators([Validators.required]);
      this.formUser.controls['billSlNo'].setValidators([Validators.required]);
       this.formUser.patchValue({
        fullPartReBill: ""
      }); 
    }  
    this.formUser.controls['billYear'].updateValueAndValidity();      
    this.formUser.controls['billingStation'].updateValueAndValidity();      
    this.formUser.controls['billSlNo'].updateValueAndValidity();      
  }

  getSlNo(): void {   
    this.requestmodel.strRequest = "CRN"
    this.requestmodel.strRequest1 = this.branch;
    this.requestmodel.strRequest2 = this.year;
    this.requestmodel.strRequest3 = "";

    this.commonService.getDocAutoGenNo(this.requestmodel).subscribe((res: Responsemodel) => {
    // this.requestmodel.strRequest = this.branch;
    // this.requestmodel.strRequest1 = this.year; 
    // this.creditNoteService.getCreditNoteSlNo(this.requestmodel).subscribe((res:Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.formUser.patchValue({
          cnSlNo: this.responseDetails.message
        });
      }
    });
  }  
   
  chkDocDuplicate(){
    var selectedData = this.formUser.getRawValue();
    if (selectedData.cnSlNo==""){
      this.toastrService.warning("Sl No should not be Blank");
      return;
    }
    else{
      this.requestmodel.strRequest = "CRN"
      this.requestmodel.strRequest1 = this.branch;
      this.requestmodel.strRequest2 = this.year;
      this.requestmodel.strRequest3 = "";
      this.requestmodel.strRequest4 = selectedData.cnSlNo;
      this.commonService.checkDuplicateDocNo(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toastrService.warning(this.responseDetails.message);
          this.formUser.patchValue({
            cnSlNo: "",
          });
        }
      });
    }  
  }

  deleteCreditForm(): void {
    if (this.selectedCreditDetails.cnId != '') {
      this.sharedService.loading = true;
      this.requestmodel.strRequest = this.selectedCreditDetails.cnId;
      if (confirm("Are you sure, you want to delete this?")) {
        this.creditNoteService.creditNoteDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/creditnotelist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
        });
      }
      this.sharedService.loading = false;
    }
  }
  exit(): void {
    this.route.navigate(['/creditnotelist']);
  }

  submitCreditNoteForm(): void {
    if (this.formUser.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields ");
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }
    var selectedDataValue = this.formUser.getRawValue();
    var cramt = selectedDataValue.totalCreditAmt?selectedDataValue.totalCreditAmt.toString():"0";
    if(cramt == "" || cramt == "0"){
      this.toastrService.warning("Total Credit Amount Should not be zero");
      return;
    }
    if(selectedDataValue.partyId.dataId){
      //ignore
    }
    else{
      this.toastrService.warning("Please Select Party ");
      return;
    }
    if(selectedDataValue.debitAc.dataId){
      //ignore
    }
    else{
      this.toastrService.warning("Please Select Debit Ac ");
      return;
    }
    this.formSubmitted = true;
    this.sharedService.loading = true;
    this.creditmodel.cnId = this.selectedCreditDetails.cnId ? this.selectedCreditDetails.cnId : "";
    this.creditmodel.cnBranch = selectedDataValue.cnBranch;
    this.creditmodel.cnDate = selectedDataValue.cnDate;
    this.creditmodel.cnSlNo = selectedDataValue.cnSlNo;
    this.creditmodel.cnAgainst = selectedDataValue.cnAgainst;
    this.creditmodel.partyId = selectedDataValue.partyId.dataId;
    this.creditmodel.billYear = selectedDataValue.billYear;
    this.creditmodel.billingStation = selectedDataValue.billingStation;
    this.creditmodel.billSeries = selectedDataValue.billSeries;
    this.creditmodel.billSlNo = selectedDataValue.billSlNo;
    this.creditmodel.billDate = selectedDataValue.billDate;
    this.creditmodel.billType = selectedDataValue.billType;
    this.creditmodel.billsMasterId = selectedDataValue.billsMasterId;
    this.creditmodel.billGstBy = selectedDataValue.billGstBy;
    this.creditmodel.billGstType = selectedDataValue.billGstType;
    this.creditmodel.billGstPct = selectedDataValue.billGstPct;
    this.creditmodel.billTaxableAmt = selectedDataValue.billTaxableAmt ? selectedDataValue.billTaxableAmt.toString() : "0";
    this.creditmodel.billSgstAmt = selectedDataValue.billSgstAmt ? selectedDataValue.billSgstAmt.toString() : "0";
    this.creditmodel.billCgstAmt = selectedDataValue.billCgstAmt ? selectedDataValue.billCgstAmt.toString() : "0";
    this.creditmodel.billIgstAmt = selectedDataValue.billIgstAmt ? selectedDataValue.billIgstAmt.toString() : "0";
    this.creditmodel.totalBillAmount = selectedDataValue.totalBillAmount ? selectedDataValue.totalBillAmount.toString() : "0";
    this.creditmodel.sacCode = selectedDataValue.sacCode;
    this.creditmodel.fullPartReBill = selectedDataValue.fullPartReBill;
    this.creditmodel.cnCreditAmt = selectedDataValue.cnCreditAmt ? selectedDataValue.cnCreditAmt.toString() : "0";
    this.creditmodel.cnSgstAmt = selectedDataValue.cnSgstAmt ? selectedDataValue.cnSgstAmt.toString() : "0";
    this.creditmodel.cnCgstAmt = selectedDataValue.cnCgstAmt ? selectedDataValue.cnCgstAmt.toString() : "0";
    this.creditmodel.cnIgstAmt = selectedDataValue.cnIgstAmt ? selectedDataValue.cnIgstAmt.toString() : "0";
    this.creditmodel.totalCreditAmt = selectedDataValue.totalCreditAmt ? selectedDataValue.totalCreditAmt.toString() : "0";
    this.creditmodel.creditNoteRemarks = selectedDataValue.creditNoteRemarks.toString().toUpperCase();
    this.creditmodel.debitAc = selectedDataValue.debitAc.dataId;
    this.creditmodel.yearId = this.year;
    this.creditmodel.loggedInUser = this.loggedInUserID;
    this.creditNoteService.creditnoteDetailsSubmitted(this.creditmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (res.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/creditnotelist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }
    });

    this.sharedService.loading = false;
  }
}

