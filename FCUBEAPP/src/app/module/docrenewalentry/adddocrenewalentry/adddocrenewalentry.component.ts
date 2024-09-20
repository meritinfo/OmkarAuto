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
import { SharedService } from 'src/app/services/shared.service';
import { Constants } from 'src/app/common/constants';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';


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
    fromDate: string = '';
    minDate: string = '';
    maxDate: string = '';
    loginDate: string = '';
    formSubmitted = false;
    editMode = false;
    createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false;
    checkselected: boolean = false;
    attach1: string = "";
    attach2: string = "";
    seriesDoc: string = "";

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
      private docrenewalEntryService: DocRenewalEntryService, private sharedService: SharedService,
      private cashReceiptEntryService: CashReceiptEntryService,       
      private toasterService: ToastrService,
      private commonService: CommonService) {
      this.docRenewalentryModel = new Docrenewalentrymodel();

  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Document Service Renewal Entry");
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
    
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 10);
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
    

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

    this.sharedService.loading=true;
    this.getBranchList();
    this.getVehicleNoList();
    this.getDocRenewalList(); 

    this.selectedDocRenewalEntryDetails = this.docrenewalEntryService.getDocrenewalEntryDetails();
    this.formDocEntry = this.formBuilder.group({
      transDate: new FormControl(this.loginDate,[Validators.required]),
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
        this.attach1 = Constants.UploadFolderPath + 'docrenewal/attach1/' + this.selectedDocRenewalEntryDetails.attach1;
        this.attach2 = Constants.UploadFolderPath + 'docrenewal/attach2/' + this.selectedDocRenewalEntryDetails.attach2;
        this.getPaymentCreditAcList(this.selectedDocRenewalEntryDetails.pmtType);
        this.formDocEntry.patchValue(this.selectedDocRenewalEntryDetails);    
        this.formDocEntry.patchValue({
          transDate:this.commonService.formatDate(this.selectedDocRenewalEntryDetails.transDate),
          validFromDt:this.commonService.formatDate(this.selectedDocRenewalEntryDetails.validFromDt),
          validToDt:this.commonService.formatDate(this.selectedDocRenewalEntryDetails.validToDt),
          chequeDt:this.commonService.formatDate(this.selectedDocRenewalEntryDetails.chequeDt),
          vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedDocRenewalEntryDetails.vehicleMasterID),
        });  
        
        if(this.selectedDocRenewalEntryDetails.findocid1!="0"){
          this.getFinDocDetails(this.selectedDocRenewalEntryDetails.findocid1);
        }  
        this.editMode = true; 
        this.formDocEntry.controls['docRenewalID'].disable();
        this.formDocEntry.controls['vehicleMasterID'].disable();
        this.formDocEntry.controls['pmtType'].disable();        

        if (this.selectedDocRenewalEntryDetails.pmtType == 'B'){
          this.formDocEntry.controls['neftPmt'].enable();
          this.formDocEntry.controls['chequeNo'].enable();
          this.formDocEntry.controls['chequeDt'].enable();
          if (this.selectedDocRenewalEntryDetails.neftPmt=='Y'){
            this.formDocEntry.controls['chequeNo'].clearValidators();      
            this.formDocEntry.controls['chequeDt'].clearValidators(); 
            this.formDocEntry.controls['chequeNo'].disable();      
            this.formDocEntry.controls['chequeDt'].disable(); 
          }
          else {
            this.formDocEntry.controls['chequeNo'].setValidators([Validators.required]);
            this.formDocEntry.controls['chequeDt'].setValidators([Validators.required]);  
          }
        }
        else {
          this.formDocEntry.controls['neftPmt'].disable();
          this.formDocEntry.controls['chequeNo'].disable();
          this.formDocEntry.controls['chequeDt'].disable();
          this.formDocEntry.controls['chequeNo'].clearValidators();      
          this.formDocEntry.controls['chequeDt'].clearValidators(); 
        }
        
        this.formDocEntry.controls['chequeNo'].updateValueAndValidity();
        this.formDocEntry.controls['chequeDt'].updateValueAndValidity();    
         
      } 
    }, 2000);
    
    this.formDocEntry.controls['branchCode'].disable();
    this.sharedService.loading=false;
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formDocEntry.controls; }
  
  
  getFinDocDetails(finId: string){
    this.requestmodel.strRequest=finId;
    this.cashReceiptEntryService.getFinDocDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.seriesDoc = res.message;
      } 
      else{
        this.seriesDoc = '';
      }
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
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
    this.checkselected=!this.checkselected;
    if (this.checkselected){
      this.formDocEntry.controls['chequeNo'].clearValidators();      
      this.formDocEntry.controls['chequeDt'].clearValidators();   
      this.formDocEntry.controls['chequeNo'].disable();
      this.formDocEntry.controls['chequeDt'].disable();
      this.formDocEntry.patchValue({
        chequeNo:'',
        chequeDt:'',
      });   
    }
    else {
      this.formDocEntry.controls['chequeNo'].setValidators([Validators.required]);
      this.formDocEntry.controls['chequeDt'].setValidators([Validators.required]);
      this.formDocEntry.controls['chequeNo'].enable();
      this.formDocEntry.controls['chequeDt'].enable();
    }
    this.formDocEntry.controls['chequeNo'].updateValueAndValidity();
    this.formDocEntry.controls['chequeDt'].updateValueAndValidity();
  }
  
  changePmtType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    if (selectedValue == 'B'){
      this.formDocEntry.controls['neftPmt'].enable();
      this.formDocEntry.controls['chequeNo'].enable();
      this.formDocEntry.controls['chequeDt'].enable();
    }
    else {
      this.checkselected = false;  
      this.formDocEntry.controls['neftPmt'].disable();
      this.formDocEntry.controls['chequeNo'].disable();
      this.formDocEntry.controls['chequeDt'].disable();
    }
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
      // this.formDocEntry.patchValue({
      //   creditAc: this.creditacList[0].dataId ,
      // });
    });
  }
 
  deleteDocRenewalEntryForm(): void {
    if(this.selectedDocRenewalEntryDetails.docRenewalEntryId != '' ){
      this.sharedService.loading=true;
      this.requestmodel.strRequest =this.selectedDocRenewalEntryDetails.docRenewalEntryId 
      if (confirm("Are you sure, you want to delete this?")) {
            this.docrenewalEntryService.DocrenewalEntryDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formDocEntry.reset();
              this.route.navigate(['/docrenewalentrylist']);
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
    this.route.navigate(['/docrenewalentrylist']);
  }

  //Submit user form details //
  submitDocRenewalEntryForm(): void {
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
    
    this.sharedService.loading=true;
    var selectedDataVal=this.formDocEntry.getRawValue();
    if (selectedDataVal.vehicleMasterID.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning("Invalid Vehicle");
      return;
    }
    var chqDt = this.loginDate;
    if (selectedDataVal.pmtType=="B"){
      chqDt = selectedDataVal.chequeDt == '' ? this.loginDate:selectedDataVal.chequeDt;
    }
    this.docRenewalentryModel.docRenewalEntryId = this.selectedDocRenewalEntryDetails.docRenewalEntryId  != '' ? this.selectedDocRenewalEntryDetails.docRenewalEntryId  : '';
    this.docRenewalentryModel.transDate         = selectedDataVal.transDate;
    this.docRenewalentryModel.docRenewalID      = selectedDataVal.docRenewalID;
    this.docRenewalentryModel.vehicleMasterID   = selectedDataVal.vehicleMasterID.dataId;
    this.docRenewalentryModel.documentRefNo     = selectedDataVal.documentRefNo.toString().toUpperCase();
    this.docRenewalentryModel.renewalCompany    = selectedDataVal.renewalCompany.toString().toUpperCase();
    this.docRenewalentryModel.validFromDt       = selectedDataVal.validFromDt;
    this.docRenewalentryModel.validToDt         = selectedDataVal.validToDt;
    this.docRenewalentryModel.basicAmt          = selectedDataVal.basicAmt;
    this.docRenewalentryModel.sgstPct           = selectedDataVal.sgstPct;
    this.docRenewalentryModel.sgstAmt           = selectedDataVal.sgstAmt;
    this.docRenewalentryModel.cgstPct           = selectedDataVal.cgstPct;
    this.docRenewalentryModel.cgstAmt           = selectedDataVal.cgstAmt;
    this.docRenewalentryModel.igstPct           = selectedDataVal.igstPct;
    this.docRenewalentryModel.igstAmt           = selectedDataVal.igstAmt;
    this.docRenewalentryModel.hsnCode1          = selectedDataVal.hsnCode1.toString().toUpperCase();
    this.docRenewalentryModel.basicAmt2         = selectedDataVal.basicAmt2;
    this.docRenewalentryModel.sgstPct2          = selectedDataVal.sgstPct2;
    this.docRenewalentryModel.sgstAmt2          = selectedDataVal.sgstAmt2;
    this.docRenewalentryModel.cgstPct2          = selectedDataVal.cgstPct2;
    this.docRenewalentryModel.cgstAmt2          = selectedDataVal.cgstAmt2;
    this.docRenewalentryModel.igstPct2          = selectedDataVal.igstPct2;
    this.docRenewalentryModel.igstAmt2          = selectedDataVal.igstAmt2;
    this.docRenewalentryModel.hsnCode2          = selectedDataVal.hsnCode2.toString().toUpperCase();
    this.docRenewalentryModel.nonGstAmount      = selectedDataVal.nonGstAmount;
    this.docRenewalentryModel.nonGstAmtDesc     = selectedDataVal.nonGstAmtDesc.toString().toUpperCase();
    this.docRenewalentryModel.subTotal          = selectedDataVal.subTotal;
    this.docRenewalentryModel.roundOff          = selectedDataVal.roundOff;
    this.docRenewalentryModel.netAmount         = selectedDataVal.netAmount;
    this.docRenewalentryModel.pmtType           = selectedDataVal.pmtType;
    this.docRenewalentryModel.creditAc          = selectedDataVal.creditAc;
    this.docRenewalentryModel.neftPmt           = selectedDataVal.neftPmt;
    this.docRenewalentryModel.chequeNo          = selectedDataVal.chequeNo;
    this.docRenewalentryModel.chequeDt          = chqDt;
    this.docRenewalentryModel.finDocID          = selectedDataVal.finDocID;
    this.docRenewalentryModel.remarks           = selectedDataVal.remarks.toString().toUpperCase();
    this.docRenewalentryModel.branchCode        = selectedDataVal.branchCode;    
    this.docRenewalentryModel.attach1           = selectedDataVal.attach1;
    this.docRenewalentryModel.attach2           = selectedDataVal.attach2;
    this.docRenewalentryModel.yearID            = this.year;
    this.docRenewalentryModel.loggedInUser      = this.loggedInUserID;

       
    //Start date end date validation
    if (parseFloat(this.docRenewalentryModel.netAmount) == 0) {
      this.toasterService.warning("Net Amount should not be Zero");
      this.sharedService.loading=false;
      return;
    }
    //Start date end date validation
    if (Date.parse(this.docRenewalentryModel.validFromDt) > Date.parse(this.docRenewalentryModel.validToDt)) {
      this.toasterService.warning("End date should be greater than start date");
      this.sharedService.loading=false;
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
          this.formDocEntry.patchValue({
            validFromDt: '',
            validToDt:''
          });
          return;
        }
      });
    }
   
    let formData = new FormData();
    this.formSubmitted = true;
    formData.append('attach1', this.attach1Input.nativeElement.files[0]);
    formData.append('attach2', this.attach2Input.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.docRenewalentryModel));

    this.docrenewalEntryService.docrenewalEntryDetailsSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formDocEntry.reset();
        this.route.navigate(['/docrenewalentrylist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    this.sharedService.loading=false;
  }
}




