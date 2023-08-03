import { Component } from '@angular/core';




import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Ratetypesmodel } from 'src/app/models/ratetypesmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Ratetypeslistmodel } from 'src/app/models/ratetypeslistmodel';
import { CommonService } from 'src/app/services/common.service';
import { RateTypesService } from 'src/app/services/ratetypes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addratetypes',
  templateUrl: './addratetypes.component.html',
  styleUrls: ['./addratetypes.component.css']
})
export class AddratetypesComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();


  selectedRateTypesDetails = new Ratetypesmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private ratetypesmodel: Ratetypesmodel, private rateTypesService: RateTypesService, private commonService: CommonService) {
    this.ratetypesmodel = new Ratetypesmodel();



}
ngOnInit(): void {
 
  var userData = localStorage.getItem('uid')?.toString();
  if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
    this.loggedInUserID = userData;
  }
  if (this.loggedInUserID) {
    console.log(this.loggedInUserID);
  }
  else {
    this.route.navigate(['/']);
  }

  this.selectedRateTypesDetails = this.rateTypesService.getratetypesDetails();
  this.formUser = this.formBuilder.group({
    rateDesc: new FormControl('',),
    rateMethod: new FormControl('',),
  

  });
  if (this.selectedRateTypesDetails.rateTypeId != '') {
    this.formUser.patchValue(this.selectedRateTypesDetails);
    this.formUser.patchValue({
      rateMethod: this.selectedRateTypesDetails.rateMethod,

     
      
    })
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }

 

//Submit user form details //
submitRateTypesForm(): void {
  this.userSubmitted = true;
  if (this.formUser.invalid) {
    return;
  }
  this.ratetypesmodel.rateTypeId = this.selectedRateTypesDetails.rateTypeId != '' ? this.selectedRateTypesDetails.rateTypeId : '';
  this.ratetypesmodel.rateDesc= this.formUser.value.rateDesc;
  this.ratetypesmodel.rateMethod = this.formUser.value.rateMethod;


  this.rateTypesService.ratetypeDetailsSubmitted(this.ratetypesmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}
}



