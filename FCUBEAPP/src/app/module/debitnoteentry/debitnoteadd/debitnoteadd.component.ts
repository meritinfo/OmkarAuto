
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DocRenewalMasterService } from 'src/app/services/docrenewalmaster.service';
import { Debitnotelistmodel } from 'src/app/models/debitnotelistmodel';
import { Debitnotemodel } from 'src/app/models/debitnotemodel';
import { DebitNoteService } from 'src/app/services/debitnote.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-debitnoteadd',
  templateUrl: './debitnoteadd.component.html',
  styleUrls: ['./debitnoteadd.component.css']
})
export class DebitnoteaddComponent {
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
  selectedDebitDetails = new Debitnotemodel();
  keywordLocation = 'dataName';

  constructor(private route: Router, private formBuilder: FormBuilder,
    private debitmodel: Debitnotemodel, private debitNoteService: DebitNoteService, 
    private docRenewalMasterService: DocRenewalMasterService,
    private commonService: CommonService, private sharedService: SharedService,
    private toastrService: ToastrService, private requestmodel: Requestmodel, private reportmodel: Reportmodel) {
    this.debitmodel = new Debitnotemodel();


}
ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Debit Note Entry"));
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
    this.selectedDebitDetails = this.debitNoteService.getDebitNoteDetails();

    this.formUser = this.formBuilder.group({
      dnBranch: new FormControl(this.branch, [Validators.required]),
      dnDate: new FormControl(this.loginDate, [Validators.required]),
      dnSlNo: new FormControl('', [Validators.required]),
      dnRefNo: new FormControl('', ),
      dnRefDate: new FormControl('', ),
      dnRemarks : new FormControl('',[Validators.required] ),
      gstType  : new FormControl('',[Validators.required] ),
      gstPct  : new FormControl('', [Validators.required]),
      debitAmt : new FormControl('0',[Validators.required]),
      sgstAmt : new FormControl('0',[Validators.required]),
      cgstAmt : new FormControl('0',[Validators.required]),
      igstAmt : new FormControl('0',[Validators.required]),
      totalDebitAmt: new FormControl('0',[Validators.required]),      
      debitAc: new FormControl('',[Validators.required]),
      creditAc : new FormControl('',[Validators.required]), 
    });

    this.formUser.controls["dnBranch"].disable();

    //this.formUser.controls["totalBillAmount"].disable();
    this.formUser.controls["totalDebitAmt"].disable();    
    this.getSlNo();

    setTimeout(() => {
      if (this.selectedDebitDetails.dnId != '') {
        this.sharedService.loading = true;
        this.formUser.patchValue(this.selectedDebitDetails);
        this.formUser.patchValue({
           dnDate: this.commonService.formatDate(this.selectedDebitDetails.dnDate) ,
          dnRefDate: this.commonService.formatDate(this.selectedDebitDetails.dnRefDate) ,
                  // partyId : this.partyList.find(e => e.dataId == this.selectedDebitDetails.partyId),          
           debitAc: this.debitAcList.find(e => e.dataId == this.selectedDebitDetails.debitAc),
            creditAc: this.debitAcList.find(e => e.dataId == this.selectedDebitDetails.creditAc),
        })
       
   
        this.formUser.controls["dnBranch"].disable();  
        this.formUser.controls["dnDate"].disable();  
        this.formUser.controls["dnSlNo"].disable();      

       // this.formUser.controls["partyId"].disable();

        this.editMode = true;
        this.sharedService.loading = false;
      }

    }, 2000);
  }
   onGstChange(){
    var selectedDataVal = this.formUser.getRawValue();

    if (selectedDataVal.gstType == "IG") {   
      this.formUser.controls['sgstAmt'].disable();
      this.formUser.controls['cgstAmt'].disable();  
      this.formUser.controls['igstAmt'].enable(); 
      this.formUser.controls['SgstAmt'].clearValidators; 
      this.formUser.controls['cgstAmt'].clearValidators; 
      this.formUser.controls['igstAmt'].setValidators([Validators.required]);
          this.formUser.controls['cgstAmt'].updateValueAndValidity();    
      this.formUser.controls['SgstAmt'].updateValueAndValidity();  
      this.formUser.controls['igstAmt'].updateValueAndValidity();   
     
      this.formUser.patchValue({
        sgstAmt:"",
        cgstAmt:"",
        igstAmt:"0",
       
      });   
    }    
    else if (selectedDataVal.gstType == "SC")  {      
      this.formUser.controls['sgstAmt'].enable();
      this.formUser.controls['cgstAmt'].enable();  
      this.formUser.controls['igstAmt'].disable();  
        this.formUser.controls['igstAmt'].clearValidators; 
   this.formUser.controls['sgstAmt'].setValidators([Validators.required]);
      this.formUser.controls['cgstAmt'].setValidators([Validators.required]);
          this.formUser.controls['cgstAmt'].updateValueAndValidity();    
      this.formUser.controls['SgstAmt'].updateValueAndValidity();  
      this.formUser.controls['igstAmt'].updateValueAndValidity();   
   
      // this.formUser.patchValue({
      //   sgstAmt:"0",
      //   cgstAmt:"0",
      //   igstAmt:"",
     
      // });     
    }
    else{
      this.formUser.controls['sgstAmt'].disable();
      this.formUser.controls['cgstAmt'].disable();  
      this.formUser.controls['igstAmt'].disable(); 
      this.formUser.controls['SgstAmt'].clearValidators; 
      this.formUser.controls['cgstAmt'].clearValidators; 
       this.formUser.controls['igstAmt'].clearValidators;  
           this.formUser.controls['cgstAmt'].updateValueAndValidity();    
      this.formUser.controls['SgstAmt'].updateValueAndValidity();  
      this.formUser.controls['igstAmt'].updateValueAndValidity();    
      // this.formUser.patchValue({
      //   sgstAmt:"",
      //   cgstAmt:"",
      //   igstAmt:"",
       
      // });   
    } 
        this.formUser.controls['cgstAmt'].updateValueAndValidity();    
      this.formUser.controls['SgstAmt'].updateValueAndValidity();  
      this.formUser.controls['igstAmt'].updateValueAndValidity();    
  }
  getSlNo(): void {    
      this.requestmodel.strRequest = this.branch;
      this.requestmodel.strRequest1 = this.year; 
      this.debitNoteService.getDebitNoteSlNo(this.requestmodel).subscribe((res:Responsemodel) => {
        this.responseDetails = res;
        if(this.responseDetails.status){
          this.formUser.patchValue({
            dnSlNo: this.responseDetails.message
          });
        }
      });
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
  
    calTotal(){    
    var selectedData = this.formUser.getRawValue();
    var debitAmt = selectedData.debitAmt? parseFloat(selectedData.debitAmt):0;
    var sgstAmt = selectedData.sgstAmt? parseFloat(selectedData.sgstAmt):0;
    var cgstAmt = selectedData.cgstAmt? parseFloat(selectedData.cgstAmt):0;
    var igstAmt = selectedData.igstAmt? parseFloat(selectedData.igstAmt):0;
    var totalDebitAmt = debitAmt + sgstAmt + cgstAmt + igstAmt;
    this.formUser.patchValue({
      totalDebitAmt  : totalDebitAmt.toString()
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
   deleteDebitForm(): void {
      if (this.selectedDebitDetails.dnId != '') {
        this.sharedService.loading = true;
        this.requestmodel.strRequest = this.selectedDebitDetails.dnId;
        if (confirm("Are you sure, you want to delete this?")) {
          this.debitNoteService.debitNoteDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toastrService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/debitnotelist']);
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
      this.route.navigate(['/debitnotelist']);
    }

    
  
    submitDebitNoteForm(): void {
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
      // var cramt = selectedDataValue.totalCreditAmt?selectedDataValue.totalCreditAmt.toString():"0";
      // if(cramt == "" || cramt == "0"){
      //   this.toastrService.warning("Total Credit Amount Should not be zero");
      //   return;
      // }
      // if(selectedDataValue.partyId.dataId){
      //   //ignore
      // }
      // else{
      //   this.toastrService.warning("Please Select Party ");
      //   return;
      // }
      if(selectedDataValue.debitAc.dataId){
        //ignore
      }
      else{
        this.toastrService.warning("Please Select Debit Ac ");
        return;
      }
       if(selectedDataValue.creditAc.dataId){
        //ignore
      }
      else{
        this.toastrService.warning("Please Select credit Ac ");
        return;
      }
      this.formSubmitted = true;
      this.sharedService.loading = true;
      this.debitmodel.dnId = this.selectedDebitDetails.dnId ? this.selectedDebitDetails.dnId : "";
      this.debitmodel.dnBranch  = selectedDataValue.dnBranch ;
      this.debitmodel.dnDate  = selectedDataValue.dnDate ;
      this.debitmodel.dnSlNo  = selectedDataValue.dnSlNo ;
      this.debitmodel.dnRefNo  = selectedDataValue.dnRefNo ;
      this.debitmodel.dnRefDate  = selectedDataValue.dnRefDate ;
      this.debitmodel.dnRemarks  = selectedDataValue.dnRemarks.toString().toUpperCase();
      this.debitmodel.debitAmt  = selectedDataValue.debitAmt ;
      this.debitmodel.gstType  = selectedDataValue.gstType ;
      this.debitmodel.gstPct  = selectedDataValue.gstPct ;
      this.debitmodel.totalDebitAmt  = selectedDataValue.totalDebitAmt ;
      this.debitmodel.debitAc  = selectedDataValue.debitAc.dataId;
      this.debitmodel.creditAc  = selectedDataValue.creditAc.dataId;
      this.debitmodel.sgstAmt = selectedDataValue.sgstAmt ? selectedDataValue.sgstAmt.toString() : "0";
      this.debitmodel.sgstAmt = selectedDataValue.sgstAmt ? selectedDataValue.sgstAmt.toString() : "0";
      this.debitmodel.cgstAmt = selectedDataValue.cgstAmt ? selectedDataValue.cgstAmt.toString() : "0";
      this.debitmodel.igstAmt = selectedDataValue.igstAmt ? selectedDataValue.igstAmt.toString() : "0";
      this.debitmodel.totalDebitAmt = selectedDataValue.totalDebitAmt ? selectedDataValue.totalDebitAmt.toString() : "0";      this.debitmodel.yearid = this.year;
      this.debitmodel.loggedInUser = this.loggedInUserID;
      this.debitNoteService.creditnoteDetailsSubmitted(this.debitmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (res.status) {
          this.toastrService.success(this.responseDetails.message);
          this.formUser.reset();
          this.route.navigate(['/debitnotelist']);
        }
        else {
          this.toastrService.warning(this.responseDetails.message);
        }
      });
  
      this.sharedService.loading = false;
    }
  }
  
  
