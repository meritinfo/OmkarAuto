import { Component, ViewChild } from '@angular/core';




import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Truckmastermodel } from 'src/app/models/truckmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { TruckMasterService } from 'src/app/services/truckmaster.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addtruckmaster',
  templateUrl: './addtruckmaster.component.html',
  styleUrls: ['./addtruckmaster.component.css']
})
export class AddtruckmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = [];


  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;
selectedTruckMasterDetail = new Truckmastermodel();

constructor(private route: Router, private formBuilder: FormBuilder, private vehicleTypeGroupMasterModel: Truckmastermodel, private vehicleTypeGroupMasterService: TruckMasterService, private commonService: CommonService,private toastrService: ToastrService) {
  this.vehicleTypeGroupMasterModel = new Truckmastermodel();


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
this.getStateList();
this.selectedTruckMasterDetail = this.vehicleTypeGroupMasterService.getTruckMasterDetails();
this.formUser = this.formBuilder.group({
  truckNo: new FormControl('',),
  regnDate: new FormControl('',),
  ownerName: new FormControl('',),
  ownerType: new FormControl('',),
  ownMarket: new FormControl('M',),
  panNo: new FormControl('',),
  aadharNo: new FormControl('',),
  aadharLinkedYN: new FormControl('',),
  panValidYN: new FormControl('',),
  itFiledYN: new FormControl('',),
  address1: new FormControl('',),
  address2: new FormControl('',),
  address3: new FormControl('',),
  address4: new FormControl('',),
  stateCode: new FormControl('',),
  pinCode: new FormControl('',),
  phoneNo: new FormControl('',),
  contactName: new FormControl('',),
  mobileNo: new FormControl('',),
  chasisNo: new FormControl('',),
  engineNo: new FormControl('',),
  vehCode: new FormControl('',),
  model: new FormControl('',),
  mfrName: new FormControl('',),
  ladenWt: new FormControl('',),
  unLadenWt: new FormControl('',),
  insuranceDt: new FormControl('',),
  nationalPermitDt: new FormControl('',),
  fitnessDt: new FormControl('',),
  rcUpload: new FormControl('',),
  otherUpload: new FormControl('',),
  isActive: new FormControl('',),
  inActiveDate: new FormControl('',),
  remarks: new FormControl('',),

});

if (this.selectedTruckMasterDetail.truckID != '') {

  this.formUser.patchValue(this.selectedTruckMasterDetail);
  
  //this.formUser.controls['tripNo'].disable();
  this.formUser.controls['truckNo'].disable();
this.formUser.patchValue({
  isActive: this.selectedTruckMasterDetail.isActive,
  regnDate: this.commonService.formatDate(this.selectedTruckMasterDetail.regnDate),
  insuranceDt: this.commonService.formatDate(this.selectedTruckMasterDetail.insuranceDt),
  nationalPermitDt: this.commonService.formatDate(this.selectedTruckMasterDetail.nationalPermitDt),
  fitnessDt: this.commonService.formatDate(this.selectedTruckMasterDetail.fitnessDt),
  inActiveDate: this.commonService.formatDate(this.selectedTruckMasterDetail.inActiveDate),
  ownerType:this.selectedTruckMasterDetail.ownerType
 
  
})

}
}

getStateList(): void {
  this.commonService.getStateList().subscribe((res) => {
    this.stateList = res;
  });
}

// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }
exit(): void {
  this.route.navigate(['/mkttrucklist']);
}



//Submit user form details //
submitTruckMasterForm(): void {
  this.userSubmitted = true;
  if (this.formUser.invalid) {
    this.toastrService.warning("Please Enter Mandatory Fields ");   
    const controls = this.formUser.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastrService.warning(name + " Fields is Invalid");   
      }
    }
    return;
  }

  this.vehicleTypeGroupMasterModel.truckID = this.selectedTruckMasterDetail.truckID != '' ? this.selectedTruckMasterDetail.truckID : '';
  this.vehicleTypeGroupMasterModel.truckNo= this.formUser.value.truckNo;
  this.vehicleTypeGroupMasterModel.regnDate = this.formUser.value.regnDate;
  this.vehicleTypeGroupMasterModel.ownerName = this.formUser.value.ownerName;
  this.vehicleTypeGroupMasterModel.ownerType = this.formUser.value.ownerType;
  this.vehicleTypeGroupMasterModel.ownMarket = this.formUser.value.ownMarket;
  this.vehicleTypeGroupMasterModel.panNo = this.formUser.value.panNo;
  this.vehicleTypeGroupMasterModel.aadharNo = this.formUser.value.aadharNo;
  this.vehicleTypeGroupMasterModel.aadharLinkedYN = this.formUser.value.aadharLinkedYN;
  this.vehicleTypeGroupMasterModel.panValidYN = this.formUser.value.panValidYN;
  this.vehicleTypeGroupMasterModel.itFiledYN = this.formUser.value.itFiledYN;
  this.vehicleTypeGroupMasterModel.address1 = this.formUser.value.address1;
  this.vehicleTypeGroupMasterModel.address2 = this.formUser.value.address2;
  this.vehicleTypeGroupMasterModel.address3 = this.formUser.value.address3;
  this.vehicleTypeGroupMasterModel.address4 = this.formUser.value.address4;
  this.vehicleTypeGroupMasterModel.stateCode = this.formUser.value.stateCode;
  this.vehicleTypeGroupMasterModel.pinCode = this.formUser.value.pinCode;
  this.vehicleTypeGroupMasterModel.phoneNo = this.formUser.value.phoneNo;
  this.vehicleTypeGroupMasterModel.contactName = this.formUser.value.contactName;
  this.vehicleTypeGroupMasterModel.mobileNo = this.formUser.value.mobileNo;
  this.vehicleTypeGroupMasterModel.chasisNo = this.formUser.value.chasisNo;
  this.vehicleTypeGroupMasterModel.engineNo = this.formUser.value.engineNo;
  this.vehicleTypeGroupMasterModel.vehCode = this.formUser.value.vehCode;
  this.vehicleTypeGroupMasterModel.model = this.formUser.value.model;
  this.vehicleTypeGroupMasterModel.mfrName = this.formUser.value.mfrName;
  this.vehicleTypeGroupMasterModel.ladenWt = this.formUser.value.ladenWt;
  this.vehicleTypeGroupMasterModel.unLadenWt = this.formUser.value.unLadenWt;
  this.vehicleTypeGroupMasterModel.insuranceDt = this.formUser.value.insuranceDt;
  this.vehicleTypeGroupMasterModel.nationalPermitDt = this.formUser.value.nationalPermitDt;
  this.vehicleTypeGroupMasterModel.fitnessDt = this.formUser.value.fitnessDt;
  this.vehicleTypeGroupMasterModel.rcUpload = this.formUser.value.rcUpload?this.formUser.value.rcUpload:'';
  this.vehicleTypeGroupMasterModel.otherUpload = this.formUser.value.otherUpload?this.formUser.value.otherUpload:'';
  this.vehicleTypeGroupMasterModel.isActive = this.formUser.value.isActive;
  this.vehicleTypeGroupMasterModel.inActiveDate = this.formUser.value.inActiveDate;
  this.vehicleTypeGroupMasterModel.remarks = this.formUser.value.remarks;
  
 let formData = new FormData();
    formData.append('attach', this.attachmentInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.vehicleTypeGroupMasterModel));


  this.vehicleTypeGroupMasterService.truckmasterSubmitted(formData).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}

}


