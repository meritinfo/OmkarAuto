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
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-dovehicleinedit',
  templateUrl: './dovehicleinedit.component.html',
  styleUrls: ['./dovehicleinedit.component.css']
})
export class DovehicleineditComponent {

  loggedInUserID: string = '';
  branch: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
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
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
        if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
          this.dashboard = dashboard;
        }
        if(!this.viewStatus){      
          this.route.navigate([this.dashboard]);
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
    
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
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
        
    this.sharedService.loading=true;
    this.getBranchList();
    this.getStateList();

    this.selectedDoDetails = this.doentryService.getDoVehicleInDetails();

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
    this.formUser.controls['entryDate'].disable(); 
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

    setTimeout(() => {
      if (this.selectedDoDetails.doViId != '') {
        this.rcUpload = Constants.UploadFolderPath + 'doVehicleIn/rcUpload/' + this.selectedDoDetails.rcUpload;
        this.permitUpload = Constants.UploadFolderPath + 'doVehicleIn/permitUpload/' + this.selectedDoDetails.permitUpload;
        this.insUpload = Constants.UploadFolderPath + 'doVehicleIn/insUpload/' + this.selectedDoDetails.insUpload;
        this.panUpload = Constants.UploadFolderPath + 'doVehicleIn/panUpload/' + this.selectedDoDetails.panUpload;
        this.decUpload = Constants.UploadFolderPath + 'doVehicleIn/decUpload/' + this.selectedDoDetails.decUpload;
        this.otherUpload = Constants.UploadFolderPath + 'doVehicleIn/otherUpload/' + this.selectedDoDetails.otherUpload;
        
        this.editMode = true;

        this.formUser.patchValue(this.selectedDoDetails);  
        this.formUser.patchValue({
          entryDate:this.loginDate,
          vehicleInDatetime:this.loginDate,
          regnDate: this.commonService.formatDate(this.selectedDoDetails.regnDate) ,
          permitDt: this.commonService.formatDate(this.selectedDoDetails.permitDt) ,
          fitnessDt: this.commonService.formatDate(this.selectedDoDetails.fitnessDt) ,
          insuranceDt: this.commonService.formatDate(this.selectedDoDetails.insuranceDt) ,
          driverLicValid: this.commonService.formatDate(this.selectedDoDetails.insuranceDt) ,
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
    }, 2000);
    this.sharedService.loading=false;
  }
  
  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
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

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }
 
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
    
  deleteDprDetailsForm(): void {
    if(this.selectedDoDetails.doViId != '' ){   
      this.requestmodel.strRequest = this.selectedDoDetails.doViId
      if (confirm("Are you sure, you want to delete this?")) {   
        this.sharedService.loading=true;
        this.doentryService.doVehicleInDelete(this.requestmodel).subscribe((res: Responsemodel) => {
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
  }

 
  exit(): void {
    this.route.navigate(['/dovehiclein']);
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

    if (selectedDataVal.brokerId.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" broker is Invalid");
      return;
    }
        
    this.dovehicleinmodel.doViId  = this.selectedDoDetails.doViId ;           
    this.dovehicleinmodel.doVpId   = this.selectedDoDetails.doVpId ;          
    this.dovehicleinmodel.doId      = this.selectedDoDetails.doId ;         
    this.dovehicleinmodel.entryDate = selectedDataVal.entryDate;         
    this.dovehicleinmodel.entryBranch    = selectedDataVal.entryBranch;           
    this.dovehicleinmodel.vehicleInDatetime  = selectedDataVal.vehicleInDatetime;   
    this.dovehicleinmodel.truckID     = selectedDataVal.truckID;          
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
    this.dovehicleinmodel.driverLicValid  = selectedDataVal.driverLicValid ;  
    this.dovehicleinmodel.remarks         = selectedDataVal.remarks?selectedDataVal.remarks.toString().toUpperCase():"";      
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




