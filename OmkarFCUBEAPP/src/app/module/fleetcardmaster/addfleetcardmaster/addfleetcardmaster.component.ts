import { Component } from '@angular/core';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Fleetcardmastermodel } from 'src/app/models/fleetcardmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { FleetCardMasterService } from 'src/app/services/fleetcardmaster.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-addfleetcardmaster',
  templateUrl: './addfleetcardmaster.component.html',
  styleUrls: ['./addfleetcardmaster.component.css']
})
export class AddfleetcardmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();


  selectedFleetCardMasterDetails = new Fleetcardmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private fleetcardMasterModel: Fleetcardmastermodel, private fleetcardmasterService: FleetCardMasterService, private commonService: CommonService) {
    this.fleetcardMasterModel = new Fleetcardmastermodel();

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

  this.selectedFleetCardMasterDetails = this.fleetcardmasterService.getFleetCardMasterDetails();
  this.formUser = this.formBuilder.group({
    cardType: new FormControl('',),
    cardCode: new FormControl('',),
    cardNo: new FormControl('',),
    cardPin: new FormControl('',),
    cardLedgerAc: new FormControl('',),
    vehicleNo: new FormControl('',),
    driverName: new FormControl('',),
    driverLicNo: new FormControl('',),
    mobileNo: new FormControl('',),
    isActive: new FormControl('',),

  });
  if (this.selectedFleetCardMasterDetails.cardId != '') {
    this.formUser.patchValue(this.selectedFleetCardMasterDetails);
    this.formUser.patchValue({
     
      
    })
  }
 

}
get f() { return this.formUser.controls; }

 

//Submit user form details //
submitFleetCardMasterForm(): void {
  this.userSubmitted = true;
  if (this.formUser.invalid) {
    return;
  }
  this.fleetcardMasterModel.cardId = this.selectedFleetCardMasterDetails.cardId != '' ? this.selectedFleetCardMasterDetails.cardId : '';
  var selectedDataValue = this.formUser.getRawValue();

  this.fleetcardMasterModel.cardType= selectedDataValue.cardType;
  this.fleetcardMasterModel.cardCode = selectedDataValue.cardCode;
  this.fleetcardMasterModel.cardNo = selectedDataValue.cardNo;
  this.fleetcardMasterModel.cardPin = selectedDataValue.cardPin;
  this.fleetcardMasterModel.cardLedgerAc = selectedDataValue.cardLedgerAc;
  this.fleetcardMasterModel.vehicleNo = selectedDataValue.vehicleNo;
  this.fleetcardMasterModel.driverName = selectedDataValue.driverName;
  this.fleetcardMasterModel.driverLicNo = selectedDataValue.driverLicNo;
  this.fleetcardMasterModel.mobileNo = selectedDataValue.mobileNo;
  this.fleetcardMasterModel.isActive = selectedDataValue.isActive;



  this.fleetcardmasterService.fleetCardMasterDetailsSubmitted(this.fleetcardMasterModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}
}



