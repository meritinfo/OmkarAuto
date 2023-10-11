import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Drivermodel } from 'src/app/models/drivermodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { DrivermasterService } from 'src/app/services/drivermaster.service';

@Component({
  selector: 'app-drivermasteradd',
  templateUrl: './drivermasteradd.component.html',
  styleUrls: ['./drivermasteradd.component.css']
})
export class DrivermasteraddComponent {
  loggedInUserID: string = '';
  formDriverMaster!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  selectedDriverMasterDetails = new Drivermodel();
  driverPhotoData: [] = [];
  driverPhotoPreview: [] = [];
  driverPhotoName: string = '';

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
  
  constructor(private route: Router, private formBuilder: FormBuilder, private driverModel: Drivermodel, private drivermasterService: DrivermasterService, private toastrService: ToastrService) {
    this.driverModel = new Drivermodel();
  }

  ngOnInit(): void {
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
      driverName: new FormControl('',),
      fatherName: new FormControl('',),
      dateOfBirth: new FormControl('',),
      age: new FormControl('',),
      introBy: new FormControl('',),
      introByMobileNo: new FormControl('',),
      dateOfAppoint: new FormControl('',),
      licenseNo: new FormControl('',),
      licValidUpto: new FormControl('',),
      licenseIssuAuth: new FormControl('',),
      isHazardousLicYN: new FormControl('',),
      hazLicenseIssuAuth: new FormControl('',),
      hazardousLicNo: new FormControl('',),
      hazLicValidUpto: new FormControl('',),
      bloodGroup: new FormControl('',),
      typeOfLicence: new FormControl('',),
      driverMobile1: new FormControl('',),
      driverMobile2: new FormControl('',),
      temporaryAddr: new FormControl('',),
      temporaryAddrCity: new FormControl('',),
      temporaryAddrPin: new FormControl('',),
      tempAddPhone: new FormControl('',),
      permanentAddr: new FormControl('',),
      permanentAddrCity: new FormControl('',),
      permanentAddrPin: new FormControl('',),
      permAddPhone: new FormControl('',),
      driverAadharNo: new FormControl('',),
      previousExpDetails: new FormControl('',),
      previousExpYears: new FormControl('',),
      isActive: new FormControl('',),
      inActiveDate: new FormControl('',),
      removedYN: new FormControl('',),
      removedDate: new FormControl('',),
      remarks: new FormControl('',),
      groupName: new FormControl('',),
      driverAcct: new FormControl('',),
      drPhoto: new FormControl('',),
      attachDrLic: new FormControl('',),
      attachDrHazLic: new FormControl('',),
      attachDrAadhar: new FormControl('',),
      attachDrTempAddProof: new FormControl('',),
      attachDrPermAddProof: new FormControl('',),
      attachDrBankPassBook: new FormControl('',),
      bankName: new FormControl('',),
      drBankAccountName: new FormControl('',),
      bankAcNo: new FormControl('',),
      bankBranch: new FormControl('',),
      bankIfsCode: new FormControl('',),
      bankAccountStatus: new FormControl('',),
      createdBy: new FormControl('',),
      createdDate: new FormControl('',),
      modifiedBy: new FormControl('',),
      modifiedDate: new FormControl('',),
      loggedInUser: new FormControl('',),
      deleteFlag: new FormControl('',)
    });
    if (this.selectedDriverMasterDetails.driverMasterID != '') {
      // this.formDriverMaster.patchValue(this.selectedBranchMasterDetails);
      // this.formDriverMaster.patchValue({
      //   userBranch: this.selectedBranchMasterDetails.acctBranch,
      //   userBranch2: this.selectedBranchMasterDetails.centreName,
      //   userState: this.selectedBranchMasterDetails.stateCode,
      // })
    }
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formDriverMaster.controls; }


  //On driver photo file select
  onSelectDrivePhoto(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
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

  submitDriverMasterForm() {
    this.userSubmitted = true;
    if (this.formDriverMaster.invalid) {
      return;
    }
    this.driverModel.driverMasterID = this.selectedDriverMasterDetails.driverMasterID != '' ? this.selectedDriverMasterDetails.driverMasterID : '';
    this.driverModel.driverName = this.formDriverMaster.value.driverName;
    this.driverModel.fatherName = this.formDriverMaster.value.fatherName;
    this.driverModel.dateOfBirth = this.formDriverMaster.value.dateOfBirth;
    this.driverModel.age = this.formDriverMaster.value.age;
    this.driverModel.introBy = this.formDriverMaster.value.introBy;
    this.driverModel.introByMobileNo = this.formDriverMaster.value.introByMobileNo;
    this.driverModel.dateOfAppoint = this.formDriverMaster.value.dateOfAppoint;
    this.driverModel.licenseNo = this.formDriverMaster.value.licenseNo;
    this.driverModel.licValidUpto = this.formDriverMaster.value.licValidUpto;
    this.driverModel.licenseIssuAuth = this.formDriverMaster.value.licenseIssuAuth;
    this.driverModel.isHazardousLicYN = this.formDriverMaster.value.isHazardousLicYN;
    this.driverModel.hazLicenseIssuAuth = this.formDriverMaster.value.hazLicenseIssuAuth;
    this.driverModel.hazardousLicNo = this.formDriverMaster.value.hazardousLicNo;
    this.driverModel.hazLicValidUpto = this.formDriverMaster.value.hazLicValidUpto;
    this.driverModel.bloodGroup = this.formDriverMaster.value.bloodGroup;
    this.driverModel.typeOfLicence = this.formDriverMaster.value.typeOfLicence;
    this.driverModel.driverMobile1 = this.formDriverMaster.value.driverMobile1;
    this.driverModel.driverMobile2 = this.formDriverMaster.value.driverMobile2;
    this.driverModel.temporaryAddr = this.formDriverMaster.value.temporaryAddr;
    this.driverModel.temporaryAddrCity = this.formDriverMaster.value.temporaryAddrCity;
    this.driverModel.temporaryAddrPin = this.formDriverMaster.value.temporaryAddrPin;
    this.driverModel.tempAddPhone = this.formDriverMaster.value.tempAddPhone;
    this.driverModel.permanentAddr = this.formDriverMaster.value.permanentAddr;
    this.driverModel.permanentAddrCity = this.formDriverMaster.value.permanentAddrCity;
    this.driverModel.permanentAddrPin = this.formDriverMaster.value.permanentAddrPin;
    this.driverModel.permAddPhone = this.formDriverMaster.value.permAddPhone;
    this.driverModel.driverAadharNo = this.formDriverMaster.value.driverAadharNo;
    this.driverModel.previousExpDetails = this.formDriverMaster.value.previousExpDetails;
    this.driverModel.previousExpYears = this.formDriverMaster.value.previousExpYears;
    this.driverModel.isActive = this.formDriverMaster.value.isActive;
    this.driverModel.inActiveDate = this.formDriverMaster.value.inActiveDate;
    this.driverModel.removedYN = this.formDriverMaster.value.removedYN;
    this.driverModel.removedDate = this.formDriverMaster.value.removedDate;
    this.driverModel.remarks = this.formDriverMaster.value.remarks;
    this.driverModel.groupName = this.formDriverMaster.value.groupName;
    this.driverModel.driverAcct = this.formDriverMaster.value.driverAcct;
    this.driverModel.drPhoto = this.formDriverMaster.value.drPhoto;
    this.driverModel.attachDrLic = this.formDriverMaster.value.attachDrLic;
    this.driverModel.attachDrHazLic = this.formDriverMaster.value.attachDrHazLic;
    this.driverModel.attachDrAadhar = this.formDriverMaster.value.attachDrAadhar;
    this.driverModel.attachDrTempAddProof = this.formDriverMaster.value.attachDrTempAddProof;
    this.driverModel.attachDrPermAddProof = this.formDriverMaster.value.attachDrPermAddProof;
    this.driverModel.attachDrBankPassBook = this.formDriverMaster.value.attachDrBankPassBook;
    this.driverModel.bankName = this.formDriverMaster.value.bankName;
    this.driverModel.drBankAccountName = this.formDriverMaster.value.drBankAccountName;
    this.driverModel.bankAcNo = this.formDriverMaster.value.bankAcNo;
    this.driverModel.bankBranch = this.formDriverMaster.value.bankBranch;
    this.driverModel.bankIfsCode = this.formDriverMaster.value.bankIfsCode;
    this.driverModel.bankAccountStatus = this.formDriverMaster.value.bankAccountStatus;
    this.driverModel.createdBy = this.driverModel.driverMasterID === "" ? this.loggedInUserID : this.driverModel.createdBy;
    this.driverModel.modifiedBy = this.driverModel.driverMasterID === "" ? "" : this.loggedInUserID;
    this.driverModel.loggedInUser = this.loggedInUserID;
    this.driverModel.deleteFlag = this.formDriverMaster.value.deleteFlag;

    let formData = new FormData();
    formData.append('driverPhoto', this.driverPhotoInput.nativeElement.files[0]);
    formData.append('drivingLicense', this.drivingLicenseInput.nativeElement.files[0]);
    formData.append('hazdrivingLicense', this.hazdrivingLicenseInput.nativeElement.files[0]);
    formData.append('tempAddressProve', this.tempAddressProveInput.nativeElement.files[0]);
    formData.append('perAddressProve', this.perAddressProveInput.nativeElement.files[0]);
    formData.append('aadharCard', this.aadharCardInput.nativeElement.files[0]);
    formData.append('bankPassbook', this.bankPassbookInput.nativeElement.files[0]);

    formData.append('datadetails', JSON.stringify(this.driverModel));

    if (this.driverModel.driverMasterID === "") {
      this.drivermasterService.driverMasterDetailsSubmitted(formData).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.toastrService.success(this.responseDetails.message);
          this.formDriverMaster.reset();
          this.route.navigate(['/drivermasterlist']);
        } else {
          this.toastrService.warning(this.responseDetails.message);
        }
      });
    }
  }
}
