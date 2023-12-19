import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Docrenewalentrymodel } from 'src/app/models/docrenewalentrymodel';
import { CommonService } from 'src/app/services/common.service';
import { DocRenewalEntryService } from 'src/app/services/docrenewalentry.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adddocrenewalentry',
  templateUrl: './adddocrenewalentry.component.html',
  styleUrls: ['./adddocrenewalentry.component.css']
})
export class AdddocrenewalentryComponent {
    loggedInUserID: string = '';
    branchname:string = '';
    branchid:string = '';
    year:string = '';
    formDocEntry!: FormGroup;
    maxDate: string = '';
    userSubmitted = false;
    editMode = false;
    createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false;

    responseDetails = new Responsemodel();
    branchList: Dropdownmodel[] = [];
    vehicleList: Dropdownmodel[] = [];
    docRenewalList: Dropdownmodel[] = [];
    creditacList: Dropdownmodel[] = [];
    keywordLocation = 'dataName';

    selectedDocRenewalEntryDetails = new Docrenewalentrymodel();

    constructor(private route: Router, private formBuilder: FormBuilder, 
      private docRenewalentryModel: Docrenewalentrymodel, private requestmodel:Requestmodel,
      private docrenewalEntryService: DocRenewalEntryService,      
      private toasterService: ToastrService,
      private commonService: CommonService) {
      this.docRenewalentryModel = new Docrenewalentrymodel();

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
    else {
      this.route.navigate(['/']);
    }
    
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    var userbranchcode = sessionStorage.getItem('userBranch')?.toString();
    
    if (typeof userbranchcode !== 'undefined' && userbranchcode !== null && userbranchcode !== '') {
      this.branchid = userbranchcode;
    }
    else {
      this.route.navigate(['/']);
    }   
    var useryear = sessionStorage.getItem('yearID')?.toString();
    if (typeof useryear !== 'undefined' && useryear!== null && useryear !== '') {
      this.year = useryear;
    }

    this.getBranchList();
    this.getVehicleNoList();
    this.getDocRenewalList(); 

    this.selectedDocRenewalEntryDetails = this.docrenewalEntryService.getDocrenewalEntryDetails();
    this.formDocEntry = this.formBuilder.group({
      transDate: new FormControl('',[Validators.required]),
      docRenewalID: new FormControl('',[Validators.required]),
      documentRefNo: new FormControl('',[Validators.required]),
      pmtType: new FormControl('',[Validators.required]),
      renewalCompany: new FormControl('',),
      vehicleMasterID: new FormControl('',[Validators.required]),
      validFromDt: new FormControl('',),
      validToDt: new FormControl('',),
      basicAmt: new FormControl('',[Validators.required]),
      sgstPct: new FormControl('',),
      sgstAmt: new FormControl('',),
      cgstPct: new FormControl('',),
      cgstAmt: new FormControl('',),
      igstPct: new FormControl('',),
      igstAmt: new FormControl('',),
      hsnCode1: new FormControl('',),
      basicAmt2: new FormControl('',),
      sgstPct2: new FormControl('',),
      sgstAmt2: new FormControl('',),
      cgstPct2: new FormControl('',),
      cgstAmt2: new FormControl('',),
      igstPct2: new FormControl('',),
      igstAmt2: new FormControl('',),
      hsnCode2: new FormControl('',),
      nonGstAmount: new FormControl('',),
      nonGstAmtDesc: new FormControl('',),
      subTotal: new FormControl('',),
      roundOff: new FormControl('',),
      netAmount: new FormControl('',),
      creditAc: new FormControl('',[Validators.required]),
      neftPmt: new FormControl('',),
      chequeNo: new FormControl('',),
      chequeDt: new FormControl('',),
      finDocID: new FormControl('',),
      attach1: new FormControl('',),
      attach2: new FormControl('',),
      remarks: new FormControl('',),
      branchCode: new FormControl(this.branchid,[Validators.required]),
    });
    
      
    setTimeout(() => {
      if (this.selectedDocRenewalEntryDetails.docRenewalEntryId != '') {
        this.getPaymentCreditAcList(this.selectedDocRenewalEntryDetails.pmtType);
        this.formDocEntry.patchValue(this.selectedDocRenewalEntryDetails);    
        this.formDocEntry.patchValue({
          transDate:this.commonService.formatDate(this.selectedDocRenewalEntryDetails.transDate),
          validFromDt:this.commonService.formatDate(this.selectedDocRenewalEntryDetails.validFromDt),
          validToDt:this.commonService.formatDate(this.selectedDocRenewalEntryDetails.validToDt),
          chequeDt:this.commonService.formatDate(this.selectedDocRenewalEntryDetails.chequeDt),
          vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedDocRenewalEntryDetails.vehicleMasterID),
        });    
        this.editMode = true;    
      } 
    }, 2000);
    
    this.formDocEntry.controls['branchCode'].disable();
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formDocEntry.controls; }
  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleNoList().subscribe((res) => {
      this.vehicleList = res;
    });
  }


  getDocRenewalList(): void {
    this.docrenewalEntryService.getDocRenewalList().subscribe((res) => {
      this.docRenewalList = res;
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
  
  getPaymentCreditAcList(e: any){
    this.requestmodel.strRequest= e.toString();
    this.docrenewalEntryService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditacList = res;
    });
  }
 
  deleteDocRenewalEntryForm(): void {
    if(this.selectedDocRenewalEntryDetails.docRenewalEntryId != '' ){
     this.requestmodel.strRequest =this.selectedDocRenewalEntryDetails.docRenewalEntryId 
      if (confirm("Are you sure, you want to delete this?")) {
            this.docrenewalEntryService.DocrenewalEntryDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formDocEntry.reset();
            window.location.reload();
        });
      }
    }
  }
  exit(): void {
    this.route.navigate(['/docrenewalentrylist']);
  }

  //Submit user form details //
  submitDocRenewalEntryForm(): void {
    this.userSubmitted = true;
    if (this.formDocEntry.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formDocEntry.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }
      return;
    }
    var selectedDataVal=this.formDocEntry.getRawValue();
    this.docRenewalentryModel.docRenewalEntryId = this.selectedDocRenewalEntryDetails.docRenewalEntryId  != '' ? this.selectedDocRenewalEntryDetails.docRenewalEntryId  : '';
    this.docRenewalentryModel.transDate         = selectedDataVal.transDate;
    this.docRenewalentryModel.docRenewalID      = this.formDocEntry.value.docRenewalID;
    this.docRenewalentryModel.vehicleMasterID   = this.formDocEntry.value.vehicleMasterID.dataId;
    this.docRenewalentryModel.documentRefNo     = this.formDocEntry.value.documentRefNo;
    this.docRenewalentryModel.renewalCompany    = this.formDocEntry.value.renewalCompany;
    this.docRenewalentryModel.validFromDt       = this.formDocEntry.value.validFromDt;
    this.docRenewalentryModel.validToDt         = this.formDocEntry.value.validToDt;
    this.docRenewalentryModel.basicAmt          = this.formDocEntry.value.basicAmt;
    this.docRenewalentryModel.sgstPct           = this.formDocEntry.value.sgstPct;
    this.docRenewalentryModel.sgstAmt           = this.formDocEntry.value.sgstAmt;
    this.docRenewalentryModel.cgstPct           = this.formDocEntry.value.cgstPct;
    this.docRenewalentryModel.cgstAmt           = this.formDocEntry.value.cgstAmt;
    this.docRenewalentryModel.igstPct           = this.formDocEntry.value.igstPct;
    this.docRenewalentryModel.igstAmt           = this.formDocEntry.value.igstAmt;
    this.docRenewalentryModel.hsnCode1          = this.formDocEntry.value.hsnCode1;
    this.docRenewalentryModel.basicAmt2         = this.formDocEntry.value.basicAmt2;
    this.docRenewalentryModel.sgstPct2          = this.formDocEntry.value.sgstPct2;
    this.docRenewalentryModel.sgstAmt2          = this.formDocEntry.value.sgstAmt2;
    this.docRenewalentryModel.cgstPct2          = this.formDocEntry.value.cgstPct2;
    this.docRenewalentryModel.cgstAmt2          = this.formDocEntry.value.cgstAmt2;
    this.docRenewalentryModel.igstPct2          = this.formDocEntry.value.igstPct2;
    this.docRenewalentryModel.igstAmt2          = this.formDocEntry.value.igstAmt2;
    this.docRenewalentryModel.hsnCode2          = this.formDocEntry.value.hsnCode2;
    this.docRenewalentryModel.nonGstAmount      = this.formDocEntry.value.nonGstAmount;
    this.docRenewalentryModel.nonGstAmtDesc     = this.formDocEntry.value.nonGstAmtDesc;
    this.docRenewalentryModel.subTotal          = this.formDocEntry.value.subTotal;
    this.docRenewalentryModel.roundOff          = this.formDocEntry.value.roundOff;
    this.docRenewalentryModel.netAmount         = this.formDocEntry.value.netAmount;
    this.docRenewalentryModel.pmtType           = this.formDocEntry.value.pmtType;
    this.docRenewalentryModel.creditAc          = this.formDocEntry.value.creditAc;
    this.docRenewalentryModel.neftPmt           = this.formDocEntry.value.neftPmt;
    this.docRenewalentryModel.chequeNo          = this.formDocEntry.value.chequeNo;
    this.docRenewalentryModel.chequeDt          = this.formDocEntry.value.chequeDt;
    this.docRenewalentryModel.finDocID          = this.formDocEntry.value.finDocID;
    this.docRenewalentryModel.attach1           = this.formDocEntry.value.attach1;
    this.docRenewalentryModel.attach2           = this.formDocEntry.value.attach2;
    this.docRenewalentryModel.remarks           = this.formDocEntry.value.remarks;
    this.docRenewalentryModel.branchCode        = this.formDocEntry.value.branchCode;
    this.docRenewalentryModel.yearID            = this.year;
    this.docRenewalentryModel.loggedInUser      = this.loggedInUserID;


    this.docrenewalEntryService.docrenewalEntryDetailsSubmitted(this.docRenewalentryModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formDocEntry.reset();
      window.location.reload();
    });
  }
}




