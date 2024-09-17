import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehicletypegroupmastermodel } from 'src/app/models/vehicletypegroupmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { VehicleTypeGroupMasterService } from 'src/app/services/vehicletypegroupmaster.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-addvehicletypegroupmaster',
  templateUrl: './addvehicletypegroupmaster.component.html',
  styleUrls: ['./addvehicletypegroupmaster.component.css']
})
export class AddvehicletypegroupmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();



selectedVehicleTypeGroupMasterDetail = new Vehicletypegroupmastermodel();

constructor(private route: Router, private formBuilder: FormBuilder, private vehicleTypeGroupMasterModel: Vehicletypegroupmastermodel, private vehicleTypeGroupMasterService: VehicleTypeGroupMasterService, private commonService: CommonService) {
  this.vehicleTypeGroupMasterModel = new Vehicletypegroupmastermodel();


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

this.selectedVehicleTypeGroupMasterDetail = this.vehicleTypeGroupMasterService.getVehicleTypeGroupMasterDetails();
this.formUser = this.formBuilder.group({
  vehicleTypeGroupName: new FormControl('',),
  isActive: new FormControl('',),

});
if (this.selectedVehicleTypeGroupMasterDetail.vehicleTypeGroupId != '') {
  this.formUser.patchValue(this.selectedVehicleTypeGroupMasterDetail);

this.formUser.patchValue({
  isActive: this.selectedVehicleTypeGroupMasterDetail.isActive,

 
  
})

}
}


// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }



//Submit user form details //
submitVehicleTypeGroupMasterForm(): void {
  this.formSubmitted = true;
  if (this.formUser.invalid) {
    return;
  }
  this.vehicleTypeGroupMasterModel.vehicleTypeGroupId = this.selectedVehicleTypeGroupMasterDetail.vehicleTypeGroupId != '' ? this.selectedVehicleTypeGroupMasterDetail.vehicleTypeGroupId : '';
  this.vehicleTypeGroupMasterModel.vehicleTypeGroupName= this.formUser.value.vehicleTypeGroupName;
  this.vehicleTypeGroupMasterModel.isActive = this.formUser.value.isActive;


  this.vehicleTypeGroupMasterService.vehicletypegroupmasterSubmitted(this.vehicleTypeGroupMasterModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}

}


