import { Component } from '@angular/core';



import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Productmastermodel } from 'src/app/models/productmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { ProductMasterService } from 'src/app/services/productmaster.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-addproductmaster',
  templateUrl: './addproductmaster.component.html',
  styleUrls: ['./addproductmaster.component.css']
})
export class AddproductmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  productList: Dropdownmodel[] = [];


  selectedProductMasterDetails = new Productmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private productMasterModel: Productmastermodel, private productmasterService: ProductMasterService, private commonService: CommonService) {
    this.productMasterModel = new Productmastermodel();


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

  this.getProductList();
  this.selectedProductMasterDetails = this.productmasterService.getProductMasterDetails();
  this.formUser = this.formBuilder.group({
    productName: new FormControl('',),
    productHSN: new FormControl('',),
    productGroupId: new FormControl('',),
  

  });
  if (this.selectedProductMasterDetails.productId != '') {
    this.formUser.patchValue(this.selectedProductMasterDetails);
    this.formUser.patchValue({
     
      
    })
  }
 

}

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  getProductList(): void {
    this.commonService.getProductList().subscribe((res) => {
      this.productList = res;
    });
  }

  //Submit user form details //
  submitProductMasterForm(): void {
    this.userSubmitted = true;
    if (this.formUser.invalid) {
      return;
    }
    this.productMasterModel.productId = this.selectedProductMasterDetails.productId != '' ? this.selectedProductMasterDetails.productId : '';
    this.productMasterModel.productName= this.formUser.value.productName;
    this.productMasterModel.productHSN = this.formUser.value.productHSN;
    this.productMasterModel.productGroupId = this.formUser.value.productGroupId;


    this.productmasterService.productmasterDetailsSubmitted(this.productMasterModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formUser.reset();
      window.location.reload();
    });
  }
}




