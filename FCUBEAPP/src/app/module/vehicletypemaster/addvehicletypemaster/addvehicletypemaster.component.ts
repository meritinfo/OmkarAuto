import { Component } from '@angular/core';





import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Vehicletypemastermodel } from 'src/app/models/vehicletypemastermodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehicletypemasterlistmodel } from 'src/app/models/vehicletypemasterlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { VehicleTypeMasterService } from 'src/app/services/vehicletypemaster.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-addvehicletypemaster',
  templateUrl: './addvehicletypemaster.component.html',
  styleUrls: ['./addvehicletypemaster.component.css']
})
export class AddvehicletypemasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();


  selectedVehicleTypeMasterDetails = new Vehicletypemastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private vehicletypemastermodel: Vehicletypemastermodel, private vehicleTypesService: VehicleTypeMasterService, private commonService: CommonService) {
    this.vehicletypemastermodel = new Vehicletypemastermodel();


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
  
  this.selectedVehicleTypeMasterDetails = this.vehicleTypesService.getvehicletypemasterDetails();
  this.formUser = this.formBuilder.group({
    vehicleTypeDesc: new FormControl('',),
    vehicleTypeGroupId: new FormControl('',),
    tonCap: new FormControl('',),
    runPerDayKM: new FormControl('',)
  

  });

  if (this.selectedVehicleTypeMasterDetails.vehicleTypeID != '') {
    this.formUser.patchValue(this.selectedVehicleTypeMasterDetails);
   
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }

 
exit(): void {
  this.route.navigate(['/vehicletypemasterlist']);
}
//Submit user form details //
submitVehicleTypeMasterForm(): void {
  this.userSubmitted = true;
  if (this.formUser.invalid) {
    return;
  }
  this.vehicletypemastermodel.vehicleTypeID = this.selectedVehicleTypeMasterDetails.vehicleTypeID != '' ? this.selectedVehicleTypeMasterDetails.vehicleTypeID : '';
  this.vehicletypemastermodel.vehicleTypeDesc= this.formUser.value.vehicleTypeDesc;
  this.vehicletypemastermodel.vehicleTypeGroupId = this.formUser.value.vehicleTypeGroupId;
  this.vehicletypemastermodel.tonCap = this.formUser.value.tonCap;
  this.vehicletypemastermodel.runPerDayKM = this.formUser.value.runPerDayKM;


  this.vehicleTypesService.vehicletypemasterDetailsSubmitted(this.vehicletypemastermodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}
}




