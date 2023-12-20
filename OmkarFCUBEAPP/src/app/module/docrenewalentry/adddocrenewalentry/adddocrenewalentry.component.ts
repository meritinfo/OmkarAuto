import { Component, ViewChild } from '@angular/core';
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
    VehicalExistDetails = new Responsemodel();
    branchList: Dropdownmodel[] = [];
    vehicleList: Dropdownmodel[] = [];
    docRenewalList: Dropdownmodel[] = [];
    creditacList: Dropdownmodel[] = [];
    keywordLocation = 'dataName';

    @ViewChild('attach1Input', {
      static: true
    }) attach1Input: any;
    @ViewChild('attach2Input', {
      static: true
    }) attach2Input: any;

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
      validFromDt: new FormControl('',[Validators.required]),
      validToDt: new FormControl('',[Validators.required]),
      basicAmt: new FormControl('0',[Validators.required]),
      sgstPct: new FormControl('0',),
      sgstAmt: new FormControl('0',),
      cgstPct: new FormControl('0',),
      cgstAmt: new FormControl('0',),
      igstPct: new FormControl('0',),
      igstAmt: new FormControl('0',),
      hsnCode1: new FormControl('',),
      basicAmt2: new FormControl('0',),
      sgstPct2: new FormControl('0',),
      sgstAmt2: new FormControl('0',),
      cgstPct2: new FormControl('0',),
      cgstAmt2: new FormControl('0',),
      igstPct2: new FormControl('0',),
      igstAmt2: new FormControl('0',),
      hsnCode2: new FormControl('',),
      nonGstAmount: new FormControl('0',),
      nonGstAmtDesc: new FormControl('',),
      subTotal: new FormControl('0',),
      roundOff: new FormControl('0',),
      netAmount: new FormControl('0',[Validators.required]),
      creditAc: new FormControl('',[Validators.required]),
      neftPmt: new FormControl('',),
      chequeNo: new FormControl('',[Validators.required]),
      chequeDt: new FormControl('',[Validators.required]),
      finDocID: new FormControl('',),
      attach1: new FormControl('',),
      attach2: new FormControl('',),
      remarks: new FormControl('',),
      branchCode: new FormControl(this.branchid,[Validators.required]),
    });
    
    this.formDocEntry.controls['sgstAmt'].disable();
    this.formDocEntry.controls['cgstAmt'].disable();
    this.formDocEntry.controls['igstAmt'].disable();
    this.formDocEntry.controls['sgstAmt2'].disable();
    this.formDocEntry.controls['cgstAmt2'].disable();
    this.formDocEntry.controls['igstAmt2'].disable();
    this.formDocEntry.controls['subTotal'].disable();
    this.formDocEntry.controls['netAmount'].disable();
    
    this.formDocEntry.controls['chequeNo'].clearValidators();      
    this.formDocEntry.controls['chequeDt'].clearValidators();  
    this.formDocEntry.controls['chequeNo'].updateValueAndValidity();
    this.formDocEntry.controls['chequeDt'].updateValueAndValidity();
      
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
        if (this.selectedDocRenewalEntryDetails.neftPmt=='Y'){
          this.formDocEntry.controls['chequeNo'].setValidators([Validators.required]);
          this.formDocEntry.controls['chequeDt'].setValidators([Validators.required]);
        }
        else {
          this.formDocEntry.controls['chequeNo'].clearValidators();      
          this.formDocEntry.controls['chequeDt'].clearValidators();   
        }
        this.formDocEntry.controls['chequeNo'].updateValueAndValidity();
        this.formDocEntry.controls['chequeDt'].updateValueAndValidity();    
         
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

  onNeftChk(e: any) {
    if (e.target.value=='Y'){
      this.formDocEntry.controls['chequeNo'].setValidators([Validators.required]);
      this.formDocEntry.controls['chequeDt'].setValidators([Validators.required]);
    }
    else {
      this.formDocEntry.controls['chequeNo'].clearValidators();      
      this.formDocEntry.controls['chequeDt'].clearValidators();   
    }
    this.formDocEntry.controls['chequeNo'].updateValueAndValidity();
    this.formDocEntry.controls['chequeDt'].updateValueAndValidity();
  }
  
  changePmtType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    this.getPaymentCreditAcList(selectedValue);
  }

  onBasic1Change(e: any) {
    var selectedValue = e.target.value;
    var selectedDataVal=this.formDocEntry.getRawValue();
    if(parseFloat(selectedValue) > 0){
      if(parseFloat(selectedDataVal.sgstPct)>0){
        this.formDocEntry.patchValue({
          sgstAmt:(selectedValue*parseFloat(selectedDataVal.sgstPct)/100),
        });
      }
      if(parseFloat(selectedDataVal.cgstPct)>0){
        this.formDocEntry.patchValue({
          cgstAmt:(selectedValue*parseFloat(selectedDataVal.cgstPct)/100),
        });
      }
      if(parseFloat(selectedDataVal.igstPct)>0){
        this.formDocEntry.patchValue({
          igstAmt:(selectedValue*parseFloat(selectedDataVal.igstPct)/100),
        });
      }
      this.getTotal();    
    }
  }
  onRounding(e: any) {
    var selectedValue = e.target.value;
    var selectedDataVal=this.formDocEntry.getRawValue();
    var nettot = parseFloat(selectedDataVal.subTotal) + parseFloat(selectedValue) + 
                  parseFloat(selectedDataVal.nonGstAmount)
    this.formDocEntry.patchValue({
      netAmount:nettot,
    });
  }

  onNonGstChange(e: any) {
    var selectedValue = e.target.value;
    var selectedDataVal=this.formDocEntry.getRawValue();
    var nettot = parseFloat(selectedDataVal.subTotal) + parseFloat(selectedValue) + 
                  parseFloat(selectedDataVal.roundOff)
    this.formDocEntry.patchValue({
      netAmount:nettot,
    });
  }

  getTotal(){    
    var selectedDataVal=this.formDocEntry.getRawValue();
    var subtot = parseFloat(selectedDataVal.basicAmt) +
                parseFloat(selectedDataVal.sgstAmt)+
                parseFloat(selectedDataVal.cgstAmt)+
                parseFloat(selectedDataVal.igstAmt)+
                parseFloat(selectedDataVal.basicAmt2)+
                parseFloat(selectedDataVal.sgstAmt2)+
                parseFloat(selectedDataVal.cgstAmt2)+
                parseFloat(selectedDataVal.igstAmt2)
    var nettot = subtot + parseFloat(selectedDataVal.roundOff)+ 
                parseFloat(selectedDataVal.nonGstAmount)
    this.formDocEntry.patchValue({
      subTotal:subtot,
      netAmount:nettot,
    });
  }

  onSgst1Change(e: any) {
    var selectedValue = e.target.value;   
    if(parseFloat(selectedValue) > 0){
      this.formDocEntry.patchValue({
        sgstAmt:(selectedValue*parseFloat(this.formDocEntry.value.basicAmt)/100),
      });
      this.getTotal();    
    }    
  }

  onCgst1Change(e: any) {
    var selectedValue = e.target.value;
    if(parseFloat(selectedValue) > 0){
      this.formDocEntry.patchValue({
        cgstAmt:(selectedValue*parseFloat(this.formDocEntry.value.basicAmt)/100),
      });
      this.getTotal();    
    }    
  }
  
  onIgst1Change(e: any) {
    var selectedValue = e.target.value;
    if(parseFloat(selectedValue) > 0){
      this.formDocEntry.patchValue({
        igstAmt:(selectedValue*parseFloat(this.formDocEntry.value.basicAmt)/100),
      });
      this.getTotal();    
    }    
  }

  onBasic2Change(e: any) {
    var selectedValue = e.target.value;
    var selectedDataVal=this.formDocEntry.getRawValue();
    if(parseFloat(selectedValue) > 0){
      if(parseFloat(selectedDataVal.sgstPct2)>0){
        this.formDocEntry.patchValue({
          sgstAmt2:(selectedValue*parseFloat(selectedDataVal.sgstPct2)/100),
        });
      }
      if(parseFloat(selectedDataVal.cgstPct2)>0){
        this.formDocEntry.patchValue({
          cgstAmt2:(selectedValue*parseFloat(selectedDataVal.cgstPct2)/100),
        });
      }
      if(parseFloat(selectedDataVal.igstPct2)>0){
        this.formDocEntry.patchValue({
          igstAmt2:(selectedValue*parseFloat(selectedDataVal.igstPct2)/100),
        });
      }
      this.getTotal();    
    }
  }

  onSgst2Change(e: any) {
    var selectedValue = e.target.value;   
    if(parseFloat(selectedValue) > 0){
      this.formDocEntry.patchValue({
        sgstAmt2:(selectedValue*parseFloat(this.formDocEntry.value.basicAmt2)/100),
      });
      this.getTotal();    
    }    
  }

  onCgst2Change(e: any) {
    var selectedValue = e.target.value;   
    if(parseFloat(selectedValue) > 0){
      this.formDocEntry.patchValue({
        cgstAmt2:(selectedValue*parseFloat(this.formDocEntry.value.basicAmt2)/100),
      });
      this.getTotal();    
    } 
  }
  
  onIgst2Change(e: any) {
    var selectedValue = e.target.value;   
    if(parseFloat(selectedValue) > 0){
      this.formDocEntry.patchValue({
        igstAmt2:(selectedValue*parseFloat(this.formDocEntry.value.basicAmt2)/100),
      });
      this.getTotal();    
    } 
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
    this.docRenewalentryModel.docRenewalID      = selectedDataVal.docRenewalID;
    this.docRenewalentryModel.vehicleMasterID   = selectedDataVal.vehicleMasterID.dataId;
    this.docRenewalentryModel.documentRefNo     = selectedDataVal.documentRefNo;
    this.docRenewalentryModel.renewalCompany    = selectedDataVal.renewalCompany;
    this.docRenewalentryModel.validFromDt       = selectedDataVal.validFromDt;
    this.docRenewalentryModel.validToDt         = selectedDataVal.validToDt;
    this.docRenewalentryModel.basicAmt          = selectedDataVal.basicAmt;
    this.docRenewalentryModel.sgstPct           = selectedDataVal.sgstPct;
    this.docRenewalentryModel.sgstAmt           = selectedDataVal.sgstAmt;
    this.docRenewalentryModel.cgstPct           = selectedDataVal.cgstPct;
    this.docRenewalentryModel.cgstAmt           = selectedDataVal.cgstAmt;
    this.docRenewalentryModel.igstPct           = selectedDataVal.igstPct;
    this.docRenewalentryModel.igstAmt           = selectedDataVal.igstAmt;
    this.docRenewalentryModel.hsnCode1          = selectedDataVal.hsnCode1;
    this.docRenewalentryModel.basicAmt2         = selectedDataVal.basicAmt2;
    this.docRenewalentryModel.sgstPct2          = selectedDataVal.sgstPct2;
    this.docRenewalentryModel.sgstAmt2          = selectedDataVal.sgstAmt2;
    this.docRenewalentryModel.cgstPct2          = selectedDataVal.cgstPct2;
    this.docRenewalentryModel.cgstAmt2          = selectedDataVal.cgstAmt2;
    this.docRenewalentryModel.igstPct2          = selectedDataVal.igstPct2;
    this.docRenewalentryModel.igstAmt2          = selectedDataVal.igstAmt2;
    this.docRenewalentryModel.hsnCode2          = selectedDataVal.hsnCode2;
    this.docRenewalentryModel.nonGstAmount      = selectedDataVal.nonGstAmount;
    this.docRenewalentryModel.nonGstAmtDesc     = selectedDataVal.nonGstAmtDesc;
    this.docRenewalentryModel.subTotal          = selectedDataVal.subTotal;
    this.docRenewalentryModel.roundOff          = selectedDataVal.roundOff;
    this.docRenewalentryModel.netAmount         = selectedDataVal.netAmount;
    this.docRenewalentryModel.pmtType           = selectedDataVal.pmtType;
    this.docRenewalentryModel.creditAc          = selectedDataVal.creditAc;
    this.docRenewalentryModel.neftPmt           = selectedDataVal.neftPmt;
    this.docRenewalentryModel.chequeNo          = selectedDataVal.chequeNo;
    this.docRenewalentryModel.chequeDt          = selectedDataVal.chequeDt == '' ? selectedDataVal.transDate:selectedDataVal.chequeDt;
    this.docRenewalentryModel.finDocID          = selectedDataVal.finDocID;
    this.docRenewalentryModel.remarks           = selectedDataVal.remarks;
    this.docRenewalentryModel.branchCode        = selectedDataVal.branchCode;
    this.docRenewalentryModel.yearID            = this.year;
    this.docRenewalentryModel.loggedInUser      = this.loggedInUserID;

    this.docRenewalentryModel.attach1           = this.attach1Input.nativeElement.files[0]?this.attach1Input.nativeElement.files[0]:'';
    this.docRenewalentryModel.attach2           = this.attach2Input.nativeElement.files[0]?this.attach2Input.nativeElement.files[0]:'';

    //Start date end date validation
    if (parseFloat(this.docRenewalentryModel.netAmount) == 0) {
      this.toasterService.warning("Net Amount should not be Zero");
      return;
    }
    //Start date end date validation
    if (Date.parse(this.docRenewalentryModel.validFromDt) > Date.parse(this.docRenewalentryModel.validToDt)) {
      this.toasterService.warning("End date should be greater than start date");
      return;
    }
    if(this.docRenewalentryModel.docRenewalEntryId==''){
      this.docrenewalEntryService.chkDocrenewalValidity(this.docRenewalentryModel).subscribe((res: Responsemodel) => {
        this.VehicalExistDetails = res;
        if (this.VehicalExistDetails.status){        
          console.log(this.VehicalExistDetails.message);
        }
        else{
          this.toasterService.warning(this.VehicalExistDetails.message);
          return;
        }
      });
    }

    this.docrenewalEntryService.docrenewalEntryDetailsSubmitted(this.docRenewalentryModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formDocEntry.reset();
      window.location.reload();
    });
  }
}




