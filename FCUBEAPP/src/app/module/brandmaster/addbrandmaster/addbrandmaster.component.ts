import { Component } from '@angular/core';



import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Brandmastermodel } from 'src/app/models/brandmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { BrandMasterService } from 'src/app/services/brandmaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addbrandmaster',
  templateUrl: './addbrandmaster.component.html',
  styleUrls: ['./addbrandmaster.component.css']
})
export class AddbrandmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();


  selectedBrandMasterDetails = new Brandmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private brandMasterModel: Brandmastermodel, private brandmasterService: BrandMasterService, private commonService: CommonService) {
    this.brandMasterModel = new Brandmastermodel();


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

  this.selectedBrandMasterDetails = this.brandmasterService.getBrandMasterDetails();
  this.formUser = this.formBuilder.group({
    brandName: new FormControl('',),
    brandType: new FormControl('',),
  

  });
  if (this.selectedBrandMasterDetails.brandId != '') {
    this.formUser.patchValue(this.selectedBrandMasterDetails);
    this.formUser.patchValue({
     
      
    })
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }

 

//Submit user form details //
submitBrandMasterForm(): void {
  this.userSubmitted = true;
  if (this.formUser.invalid) {
    return;
  }
  this.selectedBrandMasterDetails.brandId = this.selectedBrandMasterDetails.brandId != '' ? this.selectedBrandMasterDetails.brandId : '';
  this.brandMasterModel.brandName= this.formUser.value.brandName;
  this.brandMasterModel.brandType = this.formUser.value.brandType;


  this.brandmasterService.brandMasterDetailsSubmitted(this.brandMasterModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}
}


