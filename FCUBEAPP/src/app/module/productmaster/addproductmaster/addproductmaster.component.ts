import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Productmastermodel } from 'src/app/models/productmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProductMasterService } from 'src/app/services/productmaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
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

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private productMasterModel: Productmastermodel,private requestmodel:Requestmodel, 
    private toasterService: ToastrService,private productmasterService: ProductMasterService, 
    private commonService: CommonService) {
    this.productMasterModel = new Productmastermodel();
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

    this.getProductList();
    this.selectedProductMasterDetails = this.productmasterService.getProductMasterDetails();
    this.formUser = this.formBuilder.group({
      productName: new FormControl('',[Validators.required]),
      isActive: new FormControl('',[Validators.required]),
    });

    if (this.selectedProductMasterDetails.productId != '') {
      this.formUser.patchValue(this.selectedProductMasterDetails);
    }
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  getProductList(): void {
    this.commonService.getProductList().subscribe((res) => {
      this.productList = res;
    });
  }

  exit(): void {
    this.route.navigate(['/productmasterlist']);
  }

  deleteProductMaster(): void {
    if(this.selectedProductMasterDetails.productId != '' ){
     this.requestmodel.strRequest =this.selectedProductMasterDetails.productId
      if (confirm("Are you sure, you want to delete this?")) {
            this.productmasterService.productMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/productmasterlist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }

 
  submitProductMasterForm(): void {
    if (this.formUser.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    
    this.productMasterModel.productId = this.selectedProductMasterDetails.productId ;
    this.productMasterModel.productName= this.formUser.value.productName;
    this.productMasterModel.isActive = this.formUser.value.isActive;

    this.productmasterService.productmasterDetailsSubmitted(this.productMasterModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/productmasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
  }
}




