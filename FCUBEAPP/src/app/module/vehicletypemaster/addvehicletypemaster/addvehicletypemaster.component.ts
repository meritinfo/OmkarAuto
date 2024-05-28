import { Component } from '@angular/core';





import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Vehicletypemastermodel } from 'src/app/models/vehicletypemastermodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehicletypemasterlistmodel } from 'src/app/models/vehicletypemasterlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
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
  vehicleTypeList: Dropdownmodel[] = [];
  userSubmitted = false;
  responseDetails = new Responsemodel();


  selectedVehicleTypeMasterDetails = new Vehicletypemastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private vehicletypemastermodel: Vehicletypemastermodel, private vehicleTypesService: VehicleTypeMasterService, private commonService: CommonService, private toasterService: ToastrService,private requestmodel:Requestmodel) {
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
  this.getVehicleTypeList();
  
  this.selectedVehicleTypeMasterDetails = this.vehicleTypesService.getvehicletypemasterDetails();
  this.formUser = this.formBuilder.group({
    vehicleTypeDesc: new FormControl('',[Validators.required]),
    vehicleTypeGroupId: new FormControl('',[Validators.required]),
    tonCap: new FormControl('',[Validators.required]),
    runPerDayKM: new FormControl('',[Validators.required])
  

  });

  if (this.selectedVehicleTypeMasterDetails.vehicleTypeID != '') {
    this.formUser.patchValue(this.selectedVehicleTypeMasterDetails);
   
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }

 
exit(): void {
  this.route.navigate(['/vehtypeslist']);
}
getVehicleTypeList(): void {
  this.commonService.getVehicleTypeList().subscribe((res) => {
    this.vehicleTypeList = res;
  });
}
vehicleTypeMasterDelete(): void {
  if(this.selectedVehicleTypeMasterDetails.vehicleTypeID != '' ){
   this.requestmodel.strRequest =this.selectedVehicleTypeMasterDetails.vehicleTypeID
    if (confirm("Are you sure, you want to delete this?")) {
          this.vehicleTypesService.vehicleTypeMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/vehtypeslist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
      });
    }
  }
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
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/vehtypeslist']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }      
  });
}
}




