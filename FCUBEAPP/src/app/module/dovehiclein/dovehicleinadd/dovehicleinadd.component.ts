import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Dovehicleinmodel } from 'src/app/models/dovehicleinmodel';
import { CommonService } from 'src/app/services/common.service';
import { DovehicleinService } from 'src/app/services/dovehiclein.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-dovehicleinadd',
  templateUrl: './dovehicleinadd.component.html',
  styleUrls: ['./dovehicleinadd.component.css']
})
export class DovehicleinaddComponent {
  loggedInUserID: string = '';
  branch: string = '';
  formUser!: FormGroup;
  dashboard:string = ''; 
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  apiUsed = false;
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  vehicleTypeList: Dropdownmodel[] = [];
  empList: Dropdownmodel[] = [];
  createdBy: string = "";
  modifiedBy: string = "";
  
  entryThrough: string = "";
  doVpId: string = "";

  rcUpload: string = "";
  permitUpload: string = "";
  insUpload: string = "";
  panUpload: string = "";
  decUpload: string = "";
  otherUpload: string = "";
  
  @ViewChild('rcUploadInput', {
    static: true
  }) rcUploadInput: any;
  @ViewChild('permitUploadInput', {
    static: true
  }) permitUploadInput: any;
  @ViewChild('insUploadInput', {
    static: true
  }) insUploadInput: any;
  @ViewChild('panUploadInput', {
    static: true
  }) panUploadInput: any;
  @ViewChild('decUploadInput', {
    static: true
  }) decUploadInput: any;
  @ViewChild('otherUploadInput', {
    static: true
  }) otherUploadInput: any;
  

  selectedDoDetails = new Dovehicleinmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private dovehicleinmodel: Dovehicleinmodel, 
    private toasterService: ToastrService,private requestmodel:Requestmodel,
    private doentryService: DovehicleinService, private sharedService: SharedService,
    private commonService: CommonService) {
    this.selectedDoDetails = new Dovehicleinmodel();
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "DO Vehicle IN");
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
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;

    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    
    var doVpId = sessionStorage.getItem('doVpId')?.toString();
    if (typeof doVpId !== 'undefined' && doVpId !== null && doVpId !== '') {
      this.doVpId = doVpId;
      sessionStorage.setItem("doVpId", "");
    }
    else {
      this.route.navigate([this.dashboard]);
    }
    
    this.sharedService.loading=true;
    this.getBranchList();
    this.getStateList();

    this.formUser = this.formBuilder.group({    
      entryBranch: new FormControl(this.branch,[Validators.required]),
      entryDate: new FormControl(this.loginDate,[Validators.required]),
      vehicleInDatetime: new FormControl(this.loginDate,[Validators.required]),
      truckNo : new FormControl('',[Validators.required]),
      ownMarket : new FormControl('M',),  
      regnDate : new FormControl('',),
      ownerName   :new FormControl('',),
      contactName         :new FormControl('',),
      mobileNo            :new FormControl('',),
      chasisNo            :new FormControl('',),
      engineNo            :new FormControl('',),
      address1            :new FormControl('',),
      address2            :new FormControl('',),
      stateCode            :new FormControl('',),
      pinCode             :new FormControl('',),
      insuranceDt         :new FormControl('',),
      permitDt            :new FormControl('',),
      fitnessDt           :new FormControl('',),
      panNo               :new FormControl('',),
      aadharNo            :new FormControl('',),
      aadharLinkedYN      :new FormControl('',),
      panValidYN          :new FormControl('',),
      itFiledYN           :new FormControl('',),
      driverName          :new FormControl('',),
      driverAddress       :new FormControl('',),
      driverMobile1       :new FormControl('',),
      driverMobile2       :new FormControl('',),
      driverLicense       :new FormControl('',),
      driverLicValid      :new FormControl('',),
      remarks             :new FormControl('',),
    });
    
    this.formUser.controls['entryBranch'].disable(); 
    this.formUser.controls['truckNo'].disable(); 
    this.formUser.controls['ownMarket'].disable(); 
    this.formUser.controls['ownerName'].disable(); 
    this.formUser.controls['chasisNo'].disable(); 
    this.formUser.controls['engineNo'].disable(); 
    this.formUser.controls['regnDate'].disable(); 
    this.formUser.controls['permitDt'].disable(); 
    this.formUser.controls['fitnessDt'].disable(); 
    this.formUser.controls['insuranceDt'].disable(); 
    this.formUser.controls['address1'].disable(); 
    this.formUser.controls['address2'].disable();  
    this.formUser.controls['stateCode'].disable();  
    this.formUser.controls['pinCode'].disable();   

    this.requestmodel.strRequest = this.doVpId;
    this.doentryService.getDoVehiPlacedDetails(this.requestmodel).subscribe((res) => {
      this.selectedDoDetails = res
      if (this.selectedDoDetails.doVpId != '') {
        this.formUser.patchValue(this.selectedDoDetails);  
        this.formUser.patchValue({
          entryDate:this.loginDate,
          vehicleInDatetime:this.loginDate,
          regnDate: this.commonService.formatDate(this.selectedDoDetails.regnDate) ,
          permitDt: this.commonService.formatDate(this.selectedDoDetails.permitDt) ,
          fitnessDt: this.commonService.formatDate(this.selectedDoDetails.fitnessDt) ,
          insuranceDt: this.commonService.formatDate(this.selectedDoDetails.insuranceDt) ,
        });  
        if(this.selectedDoDetails.aadharLinkedYN=="N"){
          this.formUser.patchValue({
            aadharLinkedYN:"",
          });  
        }     
        if(this.selectedDoDetails.panValidYN=="N"){
          this.formUser.patchValue({
            panValidYN:"",
          });  
        }     
        if(this.selectedDoDetails.itFiledYN=="N"){
          this.formUser.patchValue({
            itFiledYN:"",
          });  
        }       
      }    
    });

    this.sharedService.loading=false;
  }
  
  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }

  selectEvent(item: any) {
    // do something with selected item
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

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }
 
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getDetails(){
    var selectedData = this.formUser.getRawValue();    
    this.requestmodel.strRequest = selectedData.truckNo;
    this.doentryService.getDoVehiDetailsApi(this.requestmodel).subscribe((res) => {
      this.apiUsed = true;
      this.selectedDoDetails = res
      this.formUser.patchValue({
        regnDate: this.commonService.formatDate(this.selectedDoDetails.regnDate) ,
        permitDt: this.commonService.formatDate(this.selectedDoDetails.permitDt) ,
        fitnessDt: this.commonService.formatDate(this.selectedDoDetails.fitnessDt) ,
        insuranceDt: this.commonService.formatDate(this.selectedDoDetails.insuranceDt) ,
        ownerName: this.selectedDoDetails.ownerName,
        address1: this.selectedDoDetails.address1,
        address2: this.selectedDoDetails.address2,
        stateCode: this.selectedDoDetails.stateCode,
        pinCode: this.selectedDoDetails.pinCode,
        mobileNo: this.selectedDoDetails.mobileNo,
        chasisNo: this.selectedDoDetails.chasisNo,
        engineNo: this.selectedDoDetails.engineNo,
      });  
      if(this.selectedDoDetails.aadharLinkedYN=="N"){
        this.formUser.patchValue({
          aadharLinkedYN:"",
        });  
      }     
      if(this.selectedDoDetails.panValidYN=="N"){
        this.formUser.patchValue({
          panValidYN:"",
        });  
      }     
      if(this.selectedDoDetails.itFiledYN=="N"){
        this.formUser.patchValue({
          itFiledYN:"",
        });  
      }   
    });
  }
 
  exit(): void {
    this.route.navigate(['/doentrylist']);
  }

  submitDoVehiInDetails(): void {
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
        
    this.dovehicleinmodel.doViId  = this.selectedDoDetails.doViId ;           
    this.dovehicleinmodel.doVpId   = this.selectedDoDetails.doVpId ;          
    this.dovehicleinmodel.doId      = this.selectedDoDetails.doId ;         
    this.dovehicleinmodel.entryDate = selectedDataVal.entryDate;         
    this.dovehicleinmodel.entryBranch    = selectedDataVal.entryBranch;           
    this.dovehicleinmodel.vehicleInDatetime  = selectedDataVal.vehicleInDatetime;   
    this.dovehicleinmodel.truckID         = this.selectedDoDetails.truckID;          
    this.dovehicleinmodel.truckNo         = selectedDataVal.truckNo;         
    this.dovehicleinmodel.ownMarket       = selectedDataVal.ownMarket;
    this.dovehicleinmodel.regnDate        = selectedDataVal.regnDate;      
    this.dovehicleinmodel.ownerName       = selectedDataVal.ownerName.toString().toUpperCase();
    this.dovehicleinmodel.ownerType       = selectedDataVal.ownerType;      
    this.dovehicleinmodel.contactName     = selectedDataVal.contactName.toString().toUpperCase();      
    this.dovehicleinmodel.mobileNo        = selectedDataVal.mobileNo;      
    this.dovehicleinmodel.chasisNo        = selectedDataVal.entrychasis;      
    this.dovehicleinmodel.engineNo        = selectedDataVal.engineNo;      
    this.dovehicleinmodel.address1        = selectedDataVal.address1.toString().toUpperCase();   
    this.dovehicleinmodel.address2        = selectedDataVal.address2.toString().toUpperCase();  
    this.dovehicleinmodel.stateCode       = selectedDataVal.stateCode;      
    this.dovehicleinmodel.pinCode         = selectedDataVal.pinCode;      
    this.dovehicleinmodel.phoneNo         = selectedDataVal.mobileNo;      
    this.dovehicleinmodel.insuranceDt     = selectedDataVal.insuranceDt;      
    this.dovehicleinmodel.permitDt        = selectedDataVal.permitDt;      
    this.dovehicleinmodel.fitnessDt       = selectedDataVal.fitnessDt;      
    this.dovehicleinmodel.panNo           = selectedDataVal.panNo          ;   
    this.dovehicleinmodel.aadharNo        = selectedDataVal.aadharNo       ;   
    this.dovehicleinmodel.aadharLinkedYN  = selectedDataVal.aadharLinkedYN?"Y":"N" ;   
    this.dovehicleinmodel.panValidYN      = selectedDataVal.panValidYN?"Y":"N"     ;   
    this.dovehicleinmodel.itFiledYN       = selectedDataVal.itFiledYN?"Y":"N"      ;   
    this.dovehicleinmodel.driverName      = selectedDataVal.driverName.toString().toUpperCase();   
    this.dovehicleinmodel.driverAddress   = selectedDataVal.driverAddress.toString().toUpperCase();
    this.dovehicleinmodel.driverMobile1   = selectedDataVal.driverMobile1  ;   
    this.dovehicleinmodel.driverMobile2   = selectedDataVal.driverMobile2  ;   
    this.dovehicleinmodel.driverLicense   = selectedDataVal.driverLicense  ;   
    this.dovehicleinmodel.driverLicValid  = selectedDataVal.driverLicValid;  
    this.dovehicleinmodel.remarks         = selectedDataVal.remarks?selectedDataVal.remarks.toString().toUpperCase():"";      
    this.dovehicleinmodel.entryThrough    = this.apiUsed?"A":"M";      
    this.dovehicleinmodel.loggedInUser    = this.loggedInUserID;    

    this.formSubmitted = true;
    this.sharedService.loading=true;

    let formData = new FormData();    
    
    formData.append('rcUpload', this.rcUploadInput.nativeElement.files[0]);
    formData.append('permitUpload', this.permitUploadInput.nativeElement.files[0]);
    formData.append('insUpload', this.insUploadInput.nativeElement.files[0]);
    formData.append('panUpload', this.panUploadInput.nativeElement.files[0]);
    formData.append('decUpload', this.decUploadInput.nativeElement.files[0]);
    formData.append('otherUpload', this.otherUploadInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.dovehicleinmodel));

    this.doentryService.doVehicleInSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/dovehiclein']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      }   
    });
    this.sharedService.loading=false;
  }
}




