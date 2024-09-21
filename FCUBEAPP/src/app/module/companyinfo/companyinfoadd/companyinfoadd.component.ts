
import { Component, ViewChild } from '@angular/core';
import { FormBuilder,FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Companyinfomodel } from 'src/app/models/companyinfomodel';
import { CommonService } from 'src/app/services/common.service';
import { CompanyInfoService } from 'src/app/services/companyinfo.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { Constants } from 'src/app/common/constants';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';

@Component({
  selector: 'app-companyinfoadd',
  templateUrl: './companyinfoadd.component.html',
  styleUrls: ['./companyinfoadd.component.css']
})
export class CompanyinfoaddComponent {
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
  createMode = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  checkselected: boolean = false;
  responseDetails = new Responsemodel();
  VehicalExistDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  docRenewalList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  
  selectedcompanyinfoDetails = new Companyinfomodel();
 

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private companyinfoModel: Companyinfomodel,  private requestmodel:Requestmodel,
    private companyInfoService: CompanyInfoService, private sharedService: SharedService,
    private cashReceiptEntryService: CashReceiptEntryService,       
    private toasterService: ToastrService,
    private commonService: CommonService) {
    this.companyinfoModel = new Companyinfomodel();

}
ngOnInit(): void {
    
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Company Master");
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

 // this.sharedService.loading=true;
 // this.getDocRenewalList();
  //this.getVehicleNoList();

  //this.selectedVehicledocuploadsDetails = this.docrenewalEntryService.getDocrenewalEntryDetails();
  this.formDocEntry = this.formBuilder.group({
    //transDate: new FormControl(this.loginDate,[Validators.required]),
  //  docRenewalID: new FormControl('',[Validators.required]),

  //vehicleMasterId: new FormControl('',[Validators.required]),
  companyName : new FormControl('',[Validators.required]),
  companyShortCode: new FormControl('',),
  address1 : new FormControl('',),
  address2 : new FormControl('',),
  address3 : new FormControl('',),
  city : new FormControl('',),
  state : new FormControl('',),
  pinCode : new FormControl('',),
  offPhone1 : new FormControl('',),
  offPhone2 : new FormControl('',),
  offPhone3 : new FormControl('',),
  offMbl : new FormControl('',),
  email : new FormControl('',),
  email2 : new FormControl('',),
  webUrl : new FormControl('',),
  panNo : new FormControl('',),
  gstNo : new FormControl('',),
  cinNo : new FormControl('',),
  jurisdiction : new FormControl('',),
  msmeNo : new FormControl('',),
  bank1Name: new FormControl('',),
  bank1Add : new FormControl('',),
  bank1AcNo : new FormControl('',),
  bank1Ifsc : new FormControl('',),
  bank2Name : new FormControl('',),
  bank2Add : new FormControl('',),
  bank2AcNo : new FormControl('',),
  bank2Ifsc: new FormControl('',),
   
  });
  setTimeout(() => {
    this.createMode = true;
    
      // this.getTripDslDetails(this.selectedTripPaymentsDetails.vehicleMasterID,this.selectedTripPaymentsDetails.tripNo);
      // this.GetDslOpeningBalforPmt();
       this.getStateList();
     this.getCompanyDetail();
       this.formDocEntry.patchValue({
        // companyName:   this.commonService.formatDate(this.selectedTripPaymentsDetails.pmtDate), 
        // chequeDate:  this.commonService.formatDate(this.selectedTripPaymentsDetails.chequeDate), 
      //  vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedTripPaymentsDetails.vehicleMasterID),
       })  
       
   
 
    
    
   }, 2000);
   this.sharedService.loading = false;
 }

  

onChangeSearch(search: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e: any) {
  // do something
}
getStateList(): void {
  this.commonService.getStateList().subscribe((res) => {
    this.stateList = res;
  });
}
getCompanyDetail() {
  //this.tripVehicleDetails.vehicleMasterId =  e;
  this.commonService.getCompanyDetails(this.selectedcompanyinfoDetails).subscribe((res: Companyinfomodel) => {
    this.selectedcompanyinfoDetails = res;
    this.formDocEntry.patchValue({
      companyName:   this.selectedcompanyinfoDetails.companyName,
      companyShortCode: this.selectedcompanyinfoDetails.companyShortCode,
      address1:   this.selectedcompanyinfoDetails.address1, 
      address2:   this.selectedcompanyinfoDetails.address2, 
      address3:   this.selectedcompanyinfoDetails.address3, 
      city:   this.selectedcompanyinfoDetails.city, 
      state:   this.selectedcompanyinfoDetails.state, 
      pinCode : this.selectedcompanyinfoDetails.pinCode, 
      offPhone1:   this.selectedcompanyinfoDetails.offPhone1, 
      offPhone2:  this.selectedcompanyinfoDetails.offPhone2, 
      offPhone3:  this.selectedcompanyinfoDetails.offPhone3,  
      offMbl:  this.selectedcompanyinfoDetails.offMbl,   
      email:  this.selectedcompanyinfoDetails.email,    
      email2:  this.selectedcompanyinfoDetails.email2,  
      webUrl:  this.selectedcompanyinfoDetails.webUrl,      
      panNo:  this.selectedcompanyinfoDetails.panNo,    
      gstNo:  this.selectedcompanyinfoDetails.gstNo,   
      cinNo:  this.selectedcompanyinfoDetails.cinNo, 
      jurisdiction:  this.selectedcompanyinfoDetails.jurisdiction, 
      msmeNo:  this.selectedcompanyinfoDetails.msmeNo, 
      bank1Name:  this.selectedcompanyinfoDetails.bank1Name, 
      bank1Add:  this.selectedcompanyinfoDetails.bank1Add, 
      bank1AcNo:  this.selectedcompanyinfoDetails.bank1AcNo, 
      bank1Ifsc:  this.selectedcompanyinfoDetails.bank1Ifsc,
      bank2Name:  this.selectedcompanyinfoDetails.bank2Name,
      bank2Add:  this.selectedcompanyinfoDetails.bank2Add,      
      bank2AcNo:  this.selectedcompanyinfoDetails.bank2AcNo,
      bank2Ifsc:  this.selectedcompanyinfoDetails.bank2Ifsc,
             
    });
  });    
}
startWithFilter = function (vehicleList: Dropdownmodel[], query: string): any[] {
  return vehicleList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
};
createInitialArray() {
  return this.formBuilder.group({      
    dtlId: ['', []],
    masterId: ['', []],
    docRenewalID: ['0', []],
    docDesc: ['', []],
    docUploadFile: ['', []],
    
  });
}
upload(): void {
  this.route.navigate(['/vehicledocupload']);
}

//Submit user form details //
submitConpanyInfoForm(): void {
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
  this.formSubmitted = true;
  var selectedDataVal=this.formDocEntry.getRawValue();  
  
  //this.companyinfoModel.companyID   = selectedDataVal.companyID;
  this.companyinfoModel.companyName = selectedDataVal.companyName.toString().toUpperCase();
  this.companyinfoModel.companyShortCode = selectedDataVal.companyShortCode;
  this.companyinfoModel.address1  = selectedDataVal.address1.toString().toUpperCase();
  this.companyinfoModel.address2 = selectedDataVal.address2.toString().toUpperCase();
  this.companyinfoModel.address3  = selectedDataVal.address3.toString().toUpperCase();
  this.companyinfoModel.city = selectedDataVal.city.toString().toUpperCase();
  this.companyinfoModel.state = selectedDataVal.state;
  this.companyinfoModel.pinCode = selectedDataVal.pinCode;
  this.companyinfoModel.offPhone1 = selectedDataVal.offPhone1;
  this.companyinfoModel.offPhone2 = selectedDataVal.offPhone2;
  this.companyinfoModel.offPhone3 = selectedDataVal.offPhone3;
  this.companyinfoModel.offMbl = selectedDataVal.offMbl;
  this.companyinfoModel.email = selectedDataVal.email.toString().toUpperCase();
  this.companyinfoModel.email2 = selectedDataVal.email2.toString().toUpperCase();
  this.companyinfoModel.webUrl  = selectedDataVal.webUrl;
  this.companyinfoModel.panNo = selectedDataVal.panNo;
  this.companyinfoModel.gstNo = selectedDataVal.gstNo;
  this.companyinfoModel.cinNo = selectedDataVal.cinNo;
  this.companyinfoModel.jurisdiction = selectedDataVal.jurisdiction;
  this.companyinfoModel.msmeNo = selectedDataVal.msmeNo;
  this.companyinfoModel.bank1Name = selectedDataVal.bank1Name.toString().toUpperCase();
  this.companyinfoModel.bank1Add = selectedDataVal.bank1Add.toString().toUpperCase();;
  this.companyinfoModel.bank1AcNo = selectedDataVal.bank1AcNo.toString().toUpperCase();
  this.companyinfoModel.bank1Ifsc = selectedDataVal.bank1Ifsc.toString().toUpperCase();
  this.companyinfoModel.bank2Name = selectedDataVal.bank2Name.toString().toUpperCase();
  this.companyinfoModel.bank2Add  = selectedDataVal.bank2Add.toString().toUpperCase();
  this.companyinfoModel.bank2AcNo = selectedDataVal.bank2AcNo.toString().toUpperCase();
  this.companyinfoModel.bank2Ifsc = selectedDataVal.bank2Ifsc.toString().toUpperCase();
 
  this.companyInfoService.companyInfoDetailsSubmitted(this.companyinfoModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res; 
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formDocEntry.reset();
      this.route.navigate(['/dashboard']);
     
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    } 
  }); 
 
         
      }        
           
  

}

