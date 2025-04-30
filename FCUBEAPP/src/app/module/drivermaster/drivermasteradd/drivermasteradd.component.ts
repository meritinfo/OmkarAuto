import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { Drivermodel } from 'src/app/models/drivermodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { DrivermasterService } from 'src/app/services/drivermaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-drivermasteradd',
  templateUrl: './drivermasteradd.component.html',
  styleUrls: ['./drivermasteradd.component.css']
})
export class DrivermasteraddComponent {
  loggedInUserID: string = '';
  formDriverMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  minDate:string = '';
  maxDate: string = '';
  loginDate:string = '';
  fromDate: string = '';
  responseDetails = new Responsemodel();
  selectedDriverMasterDetails = new Drivermodel();
  driverPhotoData: [] = [];
  driverPhotoPreview: any;
  driverPhotoName: string = '';
  
  uploadedDrLic: string = "";
  uploadedDrHazLic: string = "";
  uploadedDrAadhar: string = "";
  uploadedDrTempAddProof: string = "";
  uploadedDrPermAddProof: string = "";
  uploadedDrBankPassBook: string = "";

  @ViewChild('driverPhotoInput', {
    static: true
  }) driverPhotoInput: any;
  @ViewChild('drivingLicenseInput', {
    static: true
  }) drivingLicenseInput: any;
  @ViewChild('hazdrivingLicenseInput', {
    static: true
  }) hazdrivingLicenseInput: any;
  @ViewChild('tempAddressProveInput', {
    static: true
  }) tempAddressProveInput: any;
  @ViewChild('perAddressProveInput', {
    static: true
  }) perAddressProveInput: any;
  @ViewChild('aadharCardInput', {
    static: true
  }) aadharCardInput: any;
  @ViewChild('bankPassbookInput', {
    static: true
  }) bankPassbookInput: any;

  constructor(private route: Router, private formBuilder: FormBuilder,
    private driverModel: Drivermodel, private drivermasterService: DrivermasterService,
    private commonService: CommonService,
    private toasterService: ToastrService, private requestmodel: Requestmodel) {
    this.driverModel = new Drivermodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Driver Master"));
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
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
  
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

    this.selectedDriverMasterDetails = this.drivermasterService.getDriverMasterDetails();
    this.formDriverMaster = this.formBuilder.group({
      driverMasterID: new FormControl('',),
      driverName: new FormControl('', [Validators.required]),
      fatherName: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      introBy: new FormControl('', [Validators.required]),
      introByMobileNo: new FormControl('', [Validators.required]),
      dateOfAppoint: new FormControl('', [Validators.required]),
      licenseNo: new FormControl('', [Validators.required]),
      licValidUpto: new FormControl('', [Validators.required]),
      licenseIssuAuth: new FormControl('', [Validators.required]),
      isHazardousLicYN: new FormControl('',),
      hazLicenseIssuAuth: new FormControl('',),
      hazardousLicNo: new FormControl('',),
      hazLicValidUpto: new FormControl('',),
      bloodGroup: new FormControl('', [Validators.required]),
      typeOfLicence: new FormControl('',),
      driverMobile1: new FormControl('', [Validators.required]),
      driverMobile2: new FormControl('',),
      temporaryAddr: new FormControl('',),
      temporaryAddrCity: new FormControl('',),
      temporaryAddrPin: new FormControl('',),
      tempAddPhone: new FormControl('',),
      permanentAddr: new FormControl('',),
      permanentAddrCity: new FormControl('',),
      permanentAddrPin: new FormControl('',),
      permAddPhone: new FormControl('',),
      driverAadharNo: new FormControl('', [Validators.required]),
      previousExpDetails: new FormControl('',),
      previousExpYears: new FormControl('',),
      isActive: new FormControl('Y',),
      inActiveDate: new FormControl('',),
      removedYN: new FormControl('N',),
      removedDate: new FormControl('',),
      remarks: new FormControl('',),
      groupName: new FormControl('', [Validators.required]),
      driverAcct: new FormControl('',),
      drPhoto: new FormControl('',),
      attachDrLic: new FormControl('',),
      attachDrHazLic: new FormControl('',),
      attachDrAadhar: new FormControl('',),
      attachDrTempAddProof: new FormControl('',),
      attachDrPermAddProof: new FormControl('',),
      attachDrBankPassBook: new FormControl('',),
      bankName: new FormControl('', ),
      drBankAccountName: new FormControl('', ),
      bankAcNo: new FormControl('', ),
      bankBranch: new FormControl('', ),
      bankIfsCode: new FormControl('', ),
      bankAccountStatus: new FormControl('S', ),
    });

    this.formDriverMaster.controls['age'].disable(); 

    if (this.selectedDriverMasterDetails.driverMasterID != '') {
   
      //const objectURL = URL.createObjectURL(this.convertDataUrlToBlob('upload/driver/driverphoto/' + this.selectedDriverMasterDetails.drPhoto));
      this.driverPhotoPreview = Constants.UploadFolderPath + 'driver/driverphoto/' + this.selectedDriverMasterDetails.drPhoto;
      this.uploadedDrLic = Constants.UploadFolderPath + 'driver/drivinglicense/' + this.selectedDriverMasterDetails.attachDrLic;
      this.uploadedDrHazLic = Constants.UploadFolderPath + 'driver/hazdrivinglicense/' + this.selectedDriverMasterDetails.attachDrHazLic;
      this.uploadedDrAadhar = Constants.UploadFolderPath + 'driver/aadharcard/' + this.selectedDriverMasterDetails.attachDrAadhar;
      this.uploadedDrTempAddProof = Constants.UploadFolderPath + 'driver/tempaddressprove/' + this.selectedDriverMasterDetails.attachDrTempAddProof;
      this.uploadedDrPermAddProof = Constants.UploadFolderPath + 'driver/peraddressprove/' + this.selectedDriverMasterDetails.attachDrPermAddProof;
      this.uploadedDrBankPassBook = Constants.UploadFolderPath + 'driver/bankpassbook/' + this.selectedDriverMasterDetails.attachDrBankPassBook;
      //this.driverPhotoPreview = this.selectedDriverMasterDetails.drPhoto;
      this.formDriverMaster.patchValue(this.selectedDriverMasterDetails);
      this.formDriverMaster.patchValue({
        dateOfBirth: this.commonService.formatDate(this.selectedDriverMasterDetails.dateOfBirth),
        dateOfAppoint: this.commonService.formatDate(this.selectedDriverMasterDetails.dateOfAppoint),
        licValidUpto: this.commonService.formatDate(this.selectedDriverMasterDetails.licValidUpto),
        hazLicValidUpto: this.commonService.formatDate(this.selectedDriverMasterDetails.hazLicValidUpto),
        inActiveDate: this.commonService.formatDate(this.selectedDriverMasterDetails.inActiveDate),
        removedDate: this.commonService.formatDate(this.selectedDriverMasterDetails.removedDate),
      })
     // this.formDriverMaster.controls['driverName'].disable();
      this.editMode = true;
    }
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formDriverMaster.controls; }

  // Convert file to base64 string
  convertDataUrlToBlob(dataUrl: any): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].split(/[#?]/)[0].split('.').pop().trim();
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  
  chkDriverDupli(e: any) { 
    if (this.selectedDriverMasterDetails.driverMasterID == "")
    {      
      this.requestmodel.strRequest = e.target.value; 
      this.drivermasterService.chkDriverDupli(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (!this.responseDetails.status) {
          this.toasterService.warning(this.responseDetails.message);
          this.formDriverMaster.patchValue({
            driverName: ''
          });
        }
      });
    }
  }

  onDOBChange(e: any) {
    this.formDriverMaster.controls['age'].disable();
    var dob = e.target.value;
    if (dob) {
      let todayDate = new Date();
      let sentOnDate = new Date(dob);
      sentOnDate.setDate(sentOnDate.getDate());
      let differenceInTime = todayDate.getTime() - sentOnDate.getTime();
      var calage = Math.floor((differenceInTime / (1000 * 3600 * 24)) / 365);
      this.formDriverMaster.patchValue({
        age: calage
      })
    }
  }

  //On driver photo file select
  onSelectDrivePhoto(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      var maxFileSize = 1024 * 1024;
      var fileSize = fileInput.target.files[0].size;
      if (fileSize > maxFileSize) {
        this.toasterService.warning("Maximum 1MB file size is allowed");
        this.driverPhotoInput.nativeElement.value = "";
        this.driverPhotoPreview = [];
        this.driverPhotoData = [];
        this.driverPhotoName = "";
      } else {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = rs => {
            this.driverPhotoPreview = e.target.result;
            this.driverPhotoData = e.target.result.split('base64,')[1];
            this.driverPhotoName = fileInput.target.files[0].name;
          };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
      }
    }
  }


  onHazardousChange(e: any) {
    var selectedValue = e.target.value;
    if (selectedValue == "Y") {
      this.formDriverMaster.controls['hazardousLicNo'].setValidators([Validators.required]);
      this.formDriverMaster.controls['hazLicValidUpto'].setValidators([Validators.required]);
      this.formDriverMaster.controls['hazLicenseIssuAuth'].setValidators([Validators.required]);
    }
    else {
      this.formDriverMaster.controls['hazardousLicNo'].clearValidators();
      this.formDriverMaster.controls['hazLicValidUpto'].clearValidators();
      this.formDriverMaster.controls['hazLicenseIssuAuth'].clearValidators();

    }
    this.formDriverMaster.controls['hazardousLicNo'].updateValueAndValidity();
    this.formDriverMaster.controls['hazLicValidUpto'].updateValueAndValidity();
    this.formDriverMaster.controls['hazLicenseIssuAuth'].updateValueAndValidity();

  }

  onActiveChange(e: any) {
    var selectedValue = e.target.value;
    if (selectedValue == "N") {
      this.formDriverMaster.controls['inActiveDate'].setValidators([Validators.required]);
    }
    else {
      this.formDriverMaster.controls['inActiveDate'].clearValidators();

    }
    this.formDriverMaster.controls['inActiveDate'].updateValueAndValidity();
  }


  onRemovedChange(e: any) {
    var selectedValue = e.target.value;
    if (selectedValue == "Y") {
      this.formDriverMaster.controls['removedDate'].setValidators([Validators.required]);
    }
    else {
      this.formDriverMaster.controls['removedDate'].clearValidators();

    }
    this.formDriverMaster.controls['removedDate'].updateValueAndValidity();
  }

  deleteDriverMasterForm(): void {
    if (this.selectedDriverMasterDetails.driverMasterID != '') {
      this.requestmodel.strRequest = this.selectedDriverMasterDetails.driverMasterID
      if (confirm("Are you sure, you want to delete this?")) {
        this.drivermasterService.driverMasterDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if(this.responseDetails.status){
            this.toasterService.success(this.responseDetails.message);
            this.formDriverMaster.reset();
            this.route.navigate(['/drivermasterlist']);
          }
          else{
            this.toasterService.warning(this.responseDetails.message);        
          }   
        });
      }
    }
  }
  exit(): void {
    this.route.navigate(['/drivermasterlist']);
  }

  submitDriverMasterForm() {
    if (this.formDriverMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formDriverMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }
    this.formSubmitted = true;
    var selectedDataVal = this.formDriverMaster.getRawValue()
    this.driverModel.driverMasterID = this.selectedDriverMasterDetails.driverMasterID;
    this.driverModel.driverName = selectedDataVal.driverName.toString().toUpperCase();;
    this.driverModel.fatherName = selectedDataVal.fatherName.toString().toUpperCase();;
    this.driverModel.dateOfBirth = selectedDataVal.dateOfBirth;
    this.driverModel.age = selectedDataVal.age.toString();
    this.driverModel.introBy = selectedDataVal.introBy.toString().toUpperCase();
    this.driverModel.introByMobileNo = selectedDataVal.introByMobileNo;
    this.driverModel.dateOfAppoint = selectedDataVal.dateOfAppoint;
    this.driverModel.licenseNo = selectedDataVal.licenseNo;
    this.driverModel.licValidUpto = selectedDataVal.licValidUpto;
    this.driverModel.licenseIssuAuth = selectedDataVal.licenseIssuAuth;
    this.driverModel.isHazardousLicYN = selectedDataVal.isHazardousLicYN;
    this.driverModel.hazLicenseIssuAuth = selectedDataVal.hazLicenseIssuAuth;
    this.driverModel.hazardousLicNo = selectedDataVal.hazardousLicNo;
    this.driverModel.hazLicValidUpto = selectedDataVal.hazLicValidUpto;
    this.driverModel.bloodGroup = selectedDataVal.bloodGroup;
    this.driverModel.typeOfLicence = selectedDataVal.typeOfLicence;
    this.driverModel.driverMobile1 = selectedDataVal.driverMobile1;
    this.driverModel.driverMobile2 = selectedDataVal.driverMobile2;
    this.driverModel.temporaryAddr = selectedDataVal.temporaryAddr;
    this.driverModel.temporaryAddrCity = selectedDataVal.temporaryAddrCity;
    this.driverModel.temporaryAddrPin = selectedDataVal.temporaryAddrPin;
    this.driverModel.tempAddPhone = selectedDataVal.tempAddPhone;
    this.driverModel.permanentAddr = selectedDataVal.permanentAddr;
    this.driverModel.permanentAddrCity = selectedDataVal.permanentAddrCity;
    this.driverModel.permanentAddrPin = selectedDataVal.permanentAddrPin;
    this.driverModel.permAddPhone = selectedDataVal.permAddPhone;
    this.driverModel.driverAadharNo = selectedDataVal.driverAadharNo;
    this.driverModel.previousExpDetails = selectedDataVal.previousExpDetails;
    this.driverModel.previousExpYears = selectedDataVal.previousExpYears;
    this.driverModel.isActive = selectedDataVal.isActive;
    this.driverModel.inActiveDate = selectedDataVal.inActiveDate;
    this.driverModel.removedYN = selectedDataVal.removedYN ? selectedDataVal.removedYN : 'N';
    this.driverModel.removedDate = selectedDataVal.removedDate;
    this.driverModel.remarks = selectedDataVal.remarks;
    this.driverModel.groupName = selectedDataVal.groupName;
    this.driverModel.driverAcct = selectedDataVal.driverAcct;
  //  this.driverModel.drPhoto = selectedDataVal.drPhoto;
 //   this.driverModel.attachDrLic = selectedDataVal.attachDrLic;
  //  this.driverModel.attachDrHazLic = selectedDataVal.attachDrHazLic;
 //   this.driverModel.attachDrAadhar = selectedDataVal.attachDrAadhar;
  //  this.driverModel.attachDrTempAddProof = selectedDataVal.attachDrTempAddProof;
 //   this.driverModel.attachDrPermAddProof = selectedDataVal.attachDrPermAddProof;
 //   this.driverModel.attachDrBankPassBook = selectedDataVal.attachDrBankPassBook;
    this.driverModel.bankName = selectedDataVal.bankName;
    this.driverModel.drBankAccountName = selectedDataVal.drBankAccountName;
    this.driverModel.bankAcNo = selectedDataVal.bankAcNo;
    this.driverModel.bankBranch = selectedDataVal.bankBranch;
    this.driverModel.bankIfsCode = selectedDataVal.bankIfsCode;
    this.driverModel.bankAccountStatus = selectedDataVal.bankAccountStatus;
    this.driverModel.loggedInUser = this.loggedInUserID;
    this.driverModel.deleteFlag = "N";

    let formData = new FormData();
    formData.append('driverPhoto', this.driverPhotoInput.nativeElement.files[0]);
    formData.append('drivingLicense', this.drivingLicenseInput.nativeElement.files[0]);
    formData.append('hazdrivingLicense', this.hazdrivingLicenseInput.nativeElement.files[0]);
    formData.append('tempAddressProve', this.tempAddressProveInput.nativeElement.files[0]);
    formData.append('perAddressProve', this.perAddressProveInput.nativeElement.files[0]);
    formData.append('aadharCard', this.aadharCardInput.nativeElement.files[0]);
    formData.append('bankPassbook', this.bankPassbookInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.driverModel));

    this.drivermasterService.driverMasterDetailsSubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formDriverMaster.reset();
        this.route.navigate(['/drivermasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }


}
