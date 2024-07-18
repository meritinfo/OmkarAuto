import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Dprmodel } from 'src/app/models/dprmodel';
import { CommonService } from 'src/app/services/common.service';
import { DprService } from 'src/app/services/dpr.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';
import { RatesMasterService } from 'src/app/services/ratesmaster.service';
import { VehicleFltMasterService } from 'src/app/services/vehiclefltmaster.service';

@Component({
  selector: 'app-dprmasteradd',
  templateUrl: './dprmasteradd.component.html',
  styleUrls: ['./dprmasteradd.component.css']
})
export class DrpmasteraddComponent {
  loggedInUserID: string = '';
  branch: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  debitAcList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicalTypeList: Dropdownmodel[] = [];
  rateTypeList: Dropdownmodel[] = [];

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedDprDetails = new Dprmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private dprmodel: Dprmodel, 
    private ratesMasterService: RatesMasterService,
    private vehicleFltMasterService:VehicleFltMasterService,
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private dprService: DprService, private sharedService: SharedService,
    private commonService: CommonService) {
    this.selectedDprDetails = new Dprmodel();
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "DPR Indent Entry");
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
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
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
    
    this.sharedService.loading=true;
    this.getBranchList();
    this.getPartyList();
    this.getLocationList();
    this.getVehicalTypeList();
    this.getRateTypeList();

    this.selectedDprDetails = this.dprService.getDprDetails();

    this.formUser = this.formBuilder.group({
      dprBranch : new FormControl(this.branch,[Validators.required]),
      dprDate  : new FormControl(this.loginDate,[Validators.required]),
      payParty : new FormControl('',[Validators.required]),
      bookStatus : new FormControl('TBB',[Validators.required]),
      origin  : new FormControl('',[Validators.required]),
      destination : new FormControl('',[Validators.required]),
      vehcileTypeId : new FormControl('',[Validators.required]),
      actualWt  : new FormControl('',),
      chargeWt : new FormControl('',),
      odcDimensions  : new FormControl('',), 
      rateType : new FormControl('',[Validators.required]),
      rateRs  : new FormControl('',),
      freightRs : new FormControl('',),
      hamaliAmt : new FormControl('',),
      hamaliDesc  : new FormControl('',[Validators.required]),
      ldDetenAmt  : new FormControl('',),
      ldDetenDesc : new FormControl('',[Validators.required]),
      extraAmt: new FormControl('',),
      extraDesc : new FormControl('',[Validators.required]),
      otherAmt  : new FormControl('',),
      otherDesc  : new FormControl('',[Validators.required]),
      totFreightAmt : new FormControl('',[Validators.required]),
      attachConfirmDoc: new FormControl('',),
      arrayList: this.formBuilder.array([this.createInitialArray()])        
    });
    
    this.formUser.controls['dprBranch'].disable(); 
    this.formUser.controls['totFreightAmt'].disable(); 

    this.formUser.controls['hamaliDesc'].clearValidators();
    this.formUser.controls['ldDetenDesc'].clearValidators();
    this.formUser.controls['extraDesc'].clearValidators();
    this.formUser.controls['otherDesc'].clearValidators();
    this.formUser.controls['hamaliDesc'].updateValueAndValidity();
    this.formUser.controls['ldDetenDesc'].updateValueAndValidity();
    this.formUser.controls['extraDesc'].updateValueAndValidity();
    this.formUser.controls['otherDesc'].updateValueAndValidity();
    
    setTimeout(() => {
      if (this.selectedDprDetails.dprId != '') {
        this.formUser.patchValue(this.selectedDprDetails);  
        this.formUser.patchValue({
          dprDate: this.commonService.formatDate(this.selectedDprDetails.dprDate),
          payParty: this.partyList.find(e => e.dataId == this.selectedDprDetails.payParty),
          origin: this.locationList.find(e => e.dataId == this.selectedDprDetails.origin),
          destination: this.locationList.find(e => e.dataId == this.selectedDprDetails.destination),
        });            
        this.getDprInnerGridList();
        this.editMode = true;
      }    
    }, 2000);

    this.sharedService.loading=false;
  }

  getDprInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedDprDetails.dprId;
    this.dprService.getDprInnerGridList(this.requestmodel).subscribe((res) => {
      this.dprmodel = res;
      this.formArray.clear();
      for (var i = 0; i < res.dprDtls.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("fromPlace")?.setValue(this.locationList.find(e => e.dataId == res.dprDtls[i].fromPlace));
        this.formArray.controls[i].get("toPlace")?.setValue(this.locationList.find(e => e.dataId == res.dprDtls[i].toPlace));
        this.formArray.controls[i].get("specialRemarks")?.setValue(res.dprDtls[i].specialRemarks);
      }
    });
  }

  createInitialArray() {
    return this.formBuilder.group({
      fromPlace: ['', []],
      toPlace: ['', []],
      specialRemarks: ['', []],
    });
  }
  
  
  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }

  calcTotal(){    
    var selectedDataVal= this.formUser.getRawValue();
    var freightRs = 0;
    var hamaliAmt = 0;
    var ldDetenAmt   = 0;
    var extraAmt = 0;
    var otherAmt   = 0;
    var totFreightAmt   = 0;
    
    this.formUser.controls['hamaliDesc'].clearValidators();
    this.formUser.controls['ldDetenDesc'].clearValidators();
    this.formUser.controls['extraDesc'].clearValidators();
    this.formUser.controls['otherDesc'].clearValidators();
    this.formUser.controls['hamaliDesc'].updateValueAndValidity();
    this.formUser.controls['ldDetenDesc'].updateValueAndValidity();
    this.formUser.controls['extraDesc'].updateValueAndValidity();
    this.formUser.controls['otherDesc'].updateValueAndValidity();

    if(selectedDataVal.freightRs!=""){
      freightRs = parseFloat(selectedDataVal.freightRs);
    }
    if(selectedDataVal.hamaliAmt!=""){
      hamaliAmt = parseFloat(selectedDataVal.hamaliAmt);
      if(hamaliAmt>0){
        this.formUser.controls['hamaliDesc'].setValidators([Validators.required]);
        this.formUser.controls['hamaliDesc'].updateValueAndValidity();   
      } 
    }
    if(selectedDataVal.ldDetenAmt!=""){
      ldDetenAmt = parseFloat(selectedDataVal.ldDetenAmt);
      if(ldDetenAmt>0){
        this.formUser.controls['ldDetenDesc'].setValidators([Validators.required]);
        this.formUser.controls['ldDetenDesc'].updateValueAndValidity();  
      }    
    }
    if(selectedDataVal.extraAmt!=""){
      extraAmt = parseFloat(selectedDataVal.extraAmt);
      if(extraAmt>0){
        this.formUser.controls['extraDesc'].setValidators([Validators.required]);
        this.formUser.controls['extraDesc'].updateValueAndValidity();    
      }  
    }
    if(selectedDataVal.otherAmt!=""){
      otherAmt = parseFloat(selectedDataVal.otherAmt);
      if(otherAmt>0){
        this.formUser.controls['otherDesc'].setValidators([Validators.required]);
        this.formUser.controls['otherDesc'].updateValueAndValidity();    
      }  
    }

    totFreightAmt = freightRs + hamaliAmt + ldDetenAmt + extraAmt + otherAmt;

    this.formUser.patchValue({
      totFreightAmt: totFreightAmt,
    });      
  }

  addItem(i: number): void {
    var selectedDataVal= this.formUser.getRawValue();
    var fmplc = "";
    var toplc = "";  
           
    if(selectedDataVal.arrayList[i].fromPlace.dataId){
     //ignore
    }  
    else{
      this.toasterService.warning("Select Proper From Place in Details");
      return;
    }
    if(selectedDataVal.arrayList[i].toPlace.dataId){
      //ignore
    }  
    else{
      this.toasterService.warning("Select Proper To Place in Details");
      return;
    }  

    this.formArray.push(this.createInitialArray()); 
  }

  removeItem(index: number) {
    this.formArray.removeAt(index);    
  }

 
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  getPartyList(): void {
    this.ratesMasterService.getPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }

  getVehicalTypeList(): void {
    this.vehicleFltMasterService.getVehicleList().subscribe((res) => {
      this.vehicalTypeList = res;
    });
  }

  getRateTypeList(): void {
    this.commonService.getRateList().subscribe((res) => {
      this.rateTypeList = res;
    });
  }

 
  deleteDprDetailsForm(): void {
    if(this.selectedDprDetails.dprId != '' ){   
      this.requestmodel.strRequest = this.selectedDprDetails.dprId 
      if (confirm("Are you sure, you want to delete this?")) {   
        this.sharedService.loading=true;
        this.dprService.dprDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if(this.responseDetails.status){
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/dprindentlist']);
          }
          else{
            this.toasterService.warning(this.responseDetails.message);        
          }   
        });
        this.sharedService.loading=false;
      }
      
    }
  }

  exit(): void {
    this.route.navigate(['/dprindentlist']);
  }

  submitDprDetails(): void {
    this.userSubmitted = true;
    if (this.formUser.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }     
      return;
    }

    var selectedDataVal =this.formUser.getRawValue();

    if (selectedDataVal.origin.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" From Place is Invalid");
      return;
    }

    if (selectedDataVal.destination.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" To Place is Invalid");
      return;
    }

    if (selectedDataVal.payParty.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" Party is Invalid");
      return;
    }
    this.dprmodel.dprId = this.selectedDprDetails.dprId ;
    this.dprmodel.dprBranch = selectedDataVal.dprBranch;
    this.dprmodel.dprDate = selectedDataVal.dprDate;
    this.dprmodel.payParty = selectedDataVal.payParty?selectedDataVal.payParty.dataId:"";
    this.dprmodel.bookStatus  = selectedDataVal.bookStatus;
    this.dprmodel.origin   = selectedDataVal.origin?selectedDataVal.origin.dataId:"";
    this.dprmodel.destination  = selectedDataVal.destination?selectedDataVal.destination.dataId:"";
    this.dprmodel.vehcileTypeId  = selectedDataVal.vehcileTypeId;
    this.dprmodel.actualWt   = selectedDataVal.actualWt;
    this.dprmodel.chargeWt  = selectedDataVal.chargeWt;
    this.dprmodel.odcDimensions  = selectedDataVal.odcDimensions.toString().toUpperCase();
    this.dprmodel.rateType  = selectedDataVal.rateType;
    this.dprmodel.rateRs   = selectedDataVal.rateRs;
    this.dprmodel.freightRs  = selectedDataVal.freightRs;
    this.dprmodel.hamaliAmt  = selectedDataVal.hamaliAmt;
    this.dprmodel.hamaliDesc  = selectedDataVal.hamaliDesc.toString().toUpperCase();
    this.dprmodel.ldDetenAmt   = selectedDataVal.ldDetenAmt;
    this.dprmodel.ldDetenDesc  = selectedDataVal.ldDetenDesc.toString().toUpperCase();
    this.dprmodel.extraAmt = selectedDataVal.extraAmt;
    this.dprmodel.extraDesc  = selectedDataVal.extraDesc.toString().toUpperCase();
    this.dprmodel.otherAmt   = selectedDataVal.otherAmt;
    this.dprmodel.otherDesc   = selectedDataVal.otherDesc.toString().toUpperCase();
    this.dprmodel.totFreightAmt  = selectedDataVal.totFreightAmt;
    this.dprmodel.loggedInUserID = this.loggedInUserID;  

    
    this.dprmodel.dprDtls = [];
    if(selectedDataVal.arrayList.length==0){
      this.toasterService.warning("Provide atleast one detail record");
      return;
    }
    if(selectedDataVal.totFreightAmt!=""?parseFloat(selectedDataVal.totFreightAmt):0 >0) {
      //ignore
    }
    else{
      this.toasterService.warning("Total Frt Amt Should not be Zero");
      return;
    }

    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      if(selectedDataVal.arrayList[i].fromPlace || selectedDataVal.arrayList[i].toPlace)
      {
        var fmplc = "";
        var toplc = "";   
        if(selectedDataVal.arrayList[i].fromPlace.dataId){
          fmplc = selectedDataVal.arrayList[i].fromPlace.dataId;

        }  
        else{
          this.toasterService.warning("Select Proper From Place in Details");
          return;
        }
        if(selectedDataVal.arrayList[i].toPlace.dataId){
          toplc = selectedDataVal.arrayList[i].toPlace.dataId;
        }  
        else{
          this.toasterService.warning("Select Proper To Place in Details");
          return;
        }  
      
        this.dprmodel.dprDtls.push({
          'dprDtlId': '',
          'dprId': '',
          'fromPlace': fmplc,
          'toPlace': toplc,
          'fromStn': '',
          'toStn': '',
          'gcNoteNo':"",
          'mainGcYN':"",
          'specialRemarks': selectedDataVal.arrayList[i].specialRemarks.toString().toUpperCase(),
        });
      }
    }

    if(this.dprmodel.dprDtls.length==0){
      this.toasterService.warning("Provide atleast one detail record");
      return;
    }

   

    this.sharedService.loading=true;
    let formData = new FormData();
    formData.append('attach', this.attachmentInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.dprmodel));

    this.dprService.dprSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/dprindentlist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      }   
    });
    this.sharedService.loading=false;
  }
}



