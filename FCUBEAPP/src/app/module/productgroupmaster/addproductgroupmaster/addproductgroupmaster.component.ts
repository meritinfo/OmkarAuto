import { Component } from '@angular/core';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Productgroupmastermodel } from 'src/app/models/productgroupmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { ProductGroupMasterService } from 'src/app/services/productgroupmaster.service';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-addproductgroupmaster',
  templateUrl: './addproductgroupmaster.component.html',
  styleUrls: ['./addproductgroupmaster.component.css']
})
export class AddproductgroupmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();


  selectedProductGroupMasterDetails = new Productgroupmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder,
      private sharedService : SharedService, private productGroupMasterModel: Productgroupmastermodel, private productgroupmasterService: ProductGroupMasterService, private commonService: CommonService) {
    this.productGroupMasterModel = new Productgroupmastermodel();


}
ngOnInit(): void {
  
      this.sharedService.loggedInStatus = true;
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

  this.selectedProductGroupMasterDetails = this.productgroupmasterService.getproductGroupMasterDetails();
  this.formUser = this.formBuilder.group({
    groupName: new FormControl('',),
    gstHSN: new FormControl('',),
  
  });
  if (this.selectedProductGroupMasterDetails.productGroupId != '') {
    this.formUser.patchValue(this.selectedProductGroupMasterDetails);
  }
 
}

  
  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

 

  //Submit user form details //
  submitProductGroupMasterForm(): void {
    this.formSubmitted = true;
    if (this.formUser.invalid) {
      return;
    }
    this.productGroupMasterModel.productGroupId = this.selectedProductGroupMasterDetails.productGroupId != '' ? this.selectedProductGroupMasterDetails.productGroupId : '';
    this.productGroupMasterModel.groupName= this.formUser.value.groupName.toString().toUpperCase();
    this.productGroupMasterModel.gstHSN = this.formUser.value.gstHSN.toString().toUpperCase();


    this.productgroupmasterService.productGroupMasterDetailsSubmitted(this.productGroupMasterModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formUser.reset();
      window.location.reload();
    });
  }
}


