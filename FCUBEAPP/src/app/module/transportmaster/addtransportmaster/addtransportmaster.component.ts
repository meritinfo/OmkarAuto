
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Transportmastermodel } from 'src/app/models/transportmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { TransportMasterService } from 'src/app/services/transportmaster.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-addtransportmaster',
  templateUrl: './addtransportmaster.component.html',
  styleUrls: ['./addtransportmaster.component.css']
})
export class AddtransportmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];


  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;
selectedTransportMasterDetail = new Transportmastermodel();

constructor(private route: Router, private formBuilder: FormBuilder, private transportMasterModel: Transportmastermodel, private transportMasterService: TransportMasterService, private commonService: CommonService,private toastrService: ToastrService) {
  this.transportMasterModel = new Transportmastermodel();

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
  this.getBranchList();
  this.selectedTransportMasterDetail = this.transportMasterService.getTransportMasterDetails();
  this.formUser = this.formBuilder.group({
    tptCode: new FormControl('',),
    tptName: new FormControl('',[Validators.required]),
    address1: new FormControl('',[Validators.required]),
    address2: new FormControl('',),
    address3: new FormControl('',),
    address4: new FormControl('',),
    stateCode: new FormControl('',[Validators.required]),
    pinCode: new FormControl('',),
    phone: new FormControl('',),
    email: new FormControl('',),
    contactPerson1: new FormControl('',[Validators.required]),
    mobile1: new FormControl('',[Validators.required]),
    contactPerson2: new FormControl('',),
    mobile2: new FormControl('',),
    panNo: new FormControl('',),
    gstNo: new FormControl('',),
    aadharNo: new FormControl('',),
    ContactPerson2: new FormControl('',),
    Mobile2: new FormControl('',),
    cancelChq: new FormControl('',),
    addrProof: new FormControl('',[Validators.required]),
    eligibleForBid: new FormControl('',),
    PanNo: new FormControl('',),
    whatsappMblNo: new FormControl('',),
    branchCode: new FormControl('',),
    remarks: new FormControl('',),
    isActive: new FormControl('',),
    inActiveDate: new FormControl('',),
 
  
  });
  
if (this.selectedTransportMasterDetail.tptCode != '') {

  this.formUser.patchValue(this.selectedTransportMasterDetail);
  
  //this.formUser.controls['tripNo'].disable();
 // this.formUser.controls['truckNo'].disable();
this.formUser.patchValue({
//  isActive: this.selectedTransportMasterDetail.isActive,
 // regnDate: this.commonService.formatDate(this.selectedTransportMasterDetail.regnDate),
 // insuranceDt: this.commonService.formatDate(this.selectedTransportMasterDetail.insuranceDt),
 // nationalPermitDt: this.commonService.formatDate(this.selectedTransportMasterDetail.nationalPermitDt),
 // fitnessDt: this.commonService.formatDate(this.selectedTransportMasterDetail.fitnessDt),
  inActiveDate: this.commonService.formatDate(this.selectedTransportMasterDetail.inActiveDate),
 // ownerType:this.selectedTransportMasterDetail.ownerType
 
  
})

}
}
getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}

getStateList(): void {
  this.commonService.getStateList().subscribe((res) => {
    this.stateList = res;
  });
}
//convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }
exit(): void {
  this.route.navigate(['/transportmstlist']);
}



//Submit user form details //
submitTransportMasterForm(): void {
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

  this.transportMasterModel.tptCode = this.selectedTransportMasterDetail.tptCode != '' ? this.selectedTransportMasterDetail.tptCode : '';
  this.transportMasterModel.tptName= this.formUser.value.tptName;
  this.transportMasterModel.address1 = this.formUser.value.address1;
  this.transportMasterModel.address2 = this.formUser.value.address2;
  this.transportMasterModel.address3 = this.formUser.value.address3;
  this.transportMasterModel.address4 = this.formUser.value.address4;
  this.transportMasterModel.panNo = this.formUser.value.panNo;
  this.transportMasterModel.aadharNo = this.formUser.value.aadharNo;
  this.transportMasterModel.stateCode = this.formUser.value.stateCode;
  this.transportMasterModel.pinCode = this.formUser.value.pinCode;
  this.transportMasterModel.phone = this.formUser.value.phone;
  this.transportMasterModel.email = this.formUser.value.email;
  this.transportMasterModel.contactPerson1 = this.formUser.value.contactPerson1;
  this.transportMasterModel.mobile1 = this.formUser.value.mobile1;
  this.transportMasterModel.contactPerson2 = this.formUser.value.contactPerson2;
  this.transportMasterModel.mobile2 = this.formUser.value.mobile2;
  this.transportMasterModel.pinCode = this.formUser.value.pinCode;
  this.transportMasterModel.panNo = this.formUser.value.panNo;
  this.transportMasterModel.gstNo = this.formUser.value.gstNo;
  this.transportMasterModel.aadharNo = this.formUser.value.aadharNo;
  this.transportMasterModel.cancelChq = this.formUser.value.cancelChq;
  this.transportMasterModel.addrProof = this.formUser.value.addrProof;
  this.transportMasterModel.eligibleForBid = this.formUser.value.eligibleForBid;
  this.transportMasterModel.whatsappMblNo = this.formUser.value.whatsappMblNo;
  this.transportMasterModel.branchCode = this.formUser.value.branchCode;
  this.transportMasterModel.remarks = this.formUser.value.remarks;
  this.transportMasterModel.isActive = this.formUser.value.isActive;
  this.transportMasterModel.inActiveDate = this.formUser.value.inActiveDate;




  this.transportMasterService.transportmasterSubmitted(this.transportMasterModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}

}




  
