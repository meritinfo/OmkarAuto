
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { Benificiarymastermodel  } from 'src/app/models/benificiarymastermodel';
import { Benificiarymasterlistmodel } from 'src/app/models/benificiarymasterlistmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { BenificiaryMasterService } from 'src/app/services/benificiarymaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';


@Component({
  selector: 'app-benificiarymasteradd',
  templateUrl: './benificiarymasteradd.component.html',
  styleUrls: ['./benificiarymasteradd.component.css']
})
export class BenificiarymasteraddComponent {
  loggedInUserID: string = '';
  formBenMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  stateList: Dropdownmodel[] = [];
  minDate:string = '';
  maxDate: string = '';
  loginDate:string = '';
  fromDate: string = '';
  responseDetails = new Responsemodel();
  @ViewChild('cancelCheqAttach', {
    static: true
  }) cancelCheqAttach: any;
  @ViewChild('vendorAttachedfile', {
    static: true
  }) vendorAttachedfile: any;
  selectedBenificiaryMasterDetails = new Benificiarymastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder,
    private benificiarymastermodel: Benificiarymastermodel, private benificiaryMasterService: BenificiaryMasterService,
    private commonService: CommonService,
    private toasterService: ToastrService, private requestmodel: Requestmodel) {
    this.benificiarymastermodel = new Benificiarymastermodel();

}
ngOnInit(): void {

  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Beneficiary Master"));
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }
  const today = new Date();
  const today2 = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  today.setMonth(month - 12);
  today2.setMonth(month - 2);
  this.fromDate = today.toLocaleDateString('en-CA').toString();

  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
 // this.maxDate = new Date().toLocaleDateString('en-CA').toString();
 
 this.maxDate = today2.toLocaleDateString('en-CA').toString();

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
this.getStateList();
  this.selectedBenificiaryMasterDetails = this.benificiaryMasterService.getBenificiaryMasterDetails();
  this.formBenMaster = this.formBuilder.group({
    //masterID: new FormControl('',),
   // driverName: new FormControl('', [Validators.required]),
   benType : new FormControl('',),
   benCode : new FormControl('',),
   benName : new FormControl('',),
   benCoAcName : new FormControl('',),
   benAdd1 : new FormControl('',),
   benAdd2 : new FormControl('',),
   benAdd3 : new FormControl('',),
   pinCode : new FormControl('',),
   stateCode : new FormControl('',),
   benPhone : new FormControl('',),
   benMobile : new FormControl('',),
   benEmail : new FormControl('',),
   benBankName : new FormControl('',),
   benBankBranch : new FormControl('',),
   benBankAcNo : new FormControl('',),
   benBankIfsc : new FormControl('',),
   amountLimit : new FormControl('',),
   remarks : new FormControl('',),
   cancelCheqAttach : new FormControl('',),
   vendorAttachedfile : new FormControl('',),
   benRefByEmployeeId : new FormControl('',),
   approvedBy : new FormControl('',),
   approvedDate : new FormControl('',),
   approvedRemarks : new FormControl('',),
   apiUsedForApp : new FormControl('',),
   blockYN : new FormControl('',),
   blockDate : new FormControl('',),
   blockBy : new FormControl('',),
   blockReason : new FormControl('',),
   panNo : new FormControl('',),
   globalYN : new FormControl('',),
   branchCode : new FormControl('',),
    loggedInUser: new FormControl('',),
    deleteFlag: new FormControl('',)
  });

  //this.formDriverMaster.controls['age'].disable(); 
  if (this.selectedBenificiaryMasterDetails.masterId  != '') {
   
    //const objectURL = URL.createObjectURL(this.convertDataUrlToBlob('upload/driver/driverphoto/' + this.selectedDriverMasterDetails.drPhoto));
  
    //this.driverPhotoPreview = this.selectedDriverMasterDetails.drPhoto;
    this.formBenMaster.patchValue(this.selectedBenificiaryMasterDetails);
    this.formBenMaster.patchValue({
      // dateOfBirth: this.commonService.formatDate(this.selectedDriverMasterDetails.dateOfBirth),
      // dateOfAppoint: this.commonService.formatDate(this.selectedDriverMasterDetails.dateOfAppoint),
      // licValidUpto: this.commonService.formatDate(this.selectedDriverMasterDetails.licValidUpto),
      // hazLicValidUpto: this.commonService.formatDate(this.selectedDriverMasterDetails.hazLicValidUpto),
      // inActiveDate: this.commonService.formatDate(this.selectedDriverMasterDetails.inActiveDate),
      // removedDate: this.commonService.formatDate(this.selectedDriverMasterDetails.removedDate),
    })
   // this.formDriverMaster.controls['driverName'].disable();
    this.editMode = true;
  }
}
get f() { return this.formBenMaster.controls; }
deleteBenificiaryMasterForm(): void {
  if (this.selectedBenificiaryMasterDetails.masterId != '') {
    this.requestmodel.strRequest = this.selectedBenificiaryMasterDetails.masterId
    if (confirm("Are you sure, you want to delete this?")) {
      this.benificiaryMasterService.BenificiaryMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if(this.responseDetails.status){
          this.toasterService.success(this.responseDetails.message);
          this.formBenMaster.reset();
          this.route.navigate(['/benmasterlist']);
        }
        else{
          this.toasterService.warning(this.responseDetails.message);        
        }   
      });
    }
  }
}
getStateList(): void {
  this.commonService.getStateList().subscribe((res) => {
    this.stateList = res;
  });
}
exit(): void {
  this.route.navigate(['/benmasterlist']);
}

submitBenificiaryMasterForm() {
  if (this.formBenMaster.invalid) {
    this.toasterService.warning("Please Enter Mandatory Fields ");
    const controls = this.formBenMaster.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");
      }
    }
    return;
  }
  this.formSubmitted = true;
  var selectedDataVal = this.formBenMaster.getRawValue()
 // this.driverModel.driverMasterID = this.benificiaryMasterService.masterId;
 this.benificiarymastermodel.benAdd2 = selectedDataVal.benAdd2;
 this.benificiarymastermodel.benAdd3 = selectedDataVal.benAdd3;
 this.benificiarymastermodel.pinCode = selectedDataVal.pinCode;
 this.benificiarymastermodel.stateCode = selectedDataVal.stateCode;
 this.benificiarymastermodel.benPhone = selectedDataVal.benPhone;
 this.benificiarymastermodel.benMobile = selectedDataVal.benMobile;
 this.benificiarymastermodel.benEmail = selectedDataVal.benEmail;
 this.benificiarymastermodel.benBankName = selectedDataVal.benBankName;
 this.benificiarymastermodel.benBankBranch = selectedDataVal.benBankBranch;
 this.benificiarymastermodel.benBankAcNo = selectedDataVal.benBankAcNo;
 this.benificiarymastermodel.benBankIfsc = selectedDataVal.benBankIfsc;
 this.benificiarymastermodel.amountLimit = selectedDataVal.amountLimit;
 this.benificiarymastermodel.remarks = selectedDataVal.remarks;
 this.benificiarymastermodel.cancelCheqAttach = selectedDataVal.cancelCheqAttach;
 this.benificiarymastermodel.vendorAttachedfile = selectedDataVal.vendorAttachedfile;
 this.benificiarymastermodel.benRefByEmployeeId = selectedDataVal.benRefByEmployeeId;
 this.benificiarymastermodel.approvedBy = selectedDataVal.approvedBy;
 this.benificiarymastermodel.approvedDate = selectedDataVal.approvedDate;
 this.benificiarymastermodel.approvedRemarks = selectedDataVal.approvedRemarks;
 this.benificiarymastermodel.apiUsedForApp = selectedDataVal.apiUsedForApp;
 this.benificiarymastermodel.blockYN = selectedDataVal.blockYN;
 this.benificiarymastermodel.blockDate = selectedDataVal.blockDate;
 this.benificiarymastermodel.blockBy = selectedDataVal.blockBy;
 this.benificiarymastermodel.blockReason = selectedDataVal.blockReason;
 this.benificiarymastermodel.panNo = selectedDataVal.panNo;
 this.benificiarymastermodel.globalYN = selectedDataVal.globalYN;
 this.benificiarymastermodel.branchCode = selectedDataVal.branchCode;
 this.benificiarymastermodel.loggedInUserID= this.loggedInUserID;
//  this.driverModel.drPhoto = selectedDataVal.drPhoto;
//   this.driverModel.attachDrLic = selectedDataVal.attachDrLic;
//  this.driverModel.attachDrHazLic = selectedDataVal.attachDrHazLic;
//   this.driverModel.attachDrAadhar = selectedDataVal.attachDrAadhar;
//  this.driverModel.attachDrTempAddProof = selectedDataVal.attachDrTempAddProof;
//   this.driverModel.attachDrPermAddProof = selectedDataVal.attachDrPermAddProof;
//   this.driverModel.attachDrBankPassBook = selectedDataVal.attachDrBankPassBook;


  // this.driverModel.drPhoto = this.driverPhotoInput.nativeElement.files[0];
  // this.driverModel.attachDrLic =this.drivingLicenseInput.nativeElement.files[0]?this.drivingLicenseInput.nativeElement.files[0]:"0";
  // this.driverModel.attachDrHazLic =this.hazdrivingLicenseInput.nativeElement.files[0]?this.drivingLicenseInput.nativeElement.files[0]:"0";
  // this.driverModel.attachDrTempAddProof = this.tempAddressProveInput.nativeElement.files[0]?this.tempAddressProveInput.nativeElement.files[0]:"0";
  // this.driverModel.attachDrPermAddProof = this.perAddressProveInput.nativeElement.files[0]?this.perAddressProveInput.nativeElement.files[0]:"0";
  // this.driverModel.attachDrAadhar = this.aadharCardInput.nativeElement.files[0]?this.aadharCardInput.nativeElement.files[0]:"0";
  // this.driverModel.attachDrBankPassBook = this.bankPassbookInput.nativeElement.files[0]?this.bankPassbookInput.nativeElement.files[0]:"0";

 

  this.benificiaryMasterService.benificiarymasterDetailsSubmitted(this.benificiarymastermodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formBenMaster.reset();
      this.route.navigate(['/benmasterlist']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }
  });
}


}

