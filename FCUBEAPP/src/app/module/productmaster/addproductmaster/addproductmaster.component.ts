import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Productmastermodel } from 'src/app/models/productmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { ProductMasterService } from 'src/app/services/productmaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-addproductmaster',
  templateUrl: './addproductmaster.component.html',
  styleUrls: ['./addproductmaster.component.css']
})
export class AddproductmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  editMode = false;
  createmode  = true;
  viewStatus = false; 
dashboard: string ="";
  responseDetails = new Responsemodel();
  productList: Dropdownmodel[] = [];


  selectedProductMasterDetails = new Productmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private productMasterModel: Productmastermodel,private requestmodel:Requestmodel,
        private sharedService : SharedService, 
    private toasterService: ToastrService,private productmasterService: ProductMasterService, 
    private commonService: CommonService) {
    this.productMasterModel = new Productmastermodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Product/Item Master");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
        if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
          this.dashboard = dashboard;
        }
        if(!this.viewStatus){      
          this.route.navigate([this.dashboard]);
        }
    
    
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
    this.getProductList();
    this.selectedProductMasterDetails = this.productmasterService.getProductMasterDetails();
    this.formUser = this.formBuilder.group({
      productName: new FormControl('',[Validators.required]),
      isActive: new FormControl('Y',[Validators.required]),
    });

    if (this.selectedProductMasterDetails.productId != '') {
      this.formUser.patchValue(this.selectedProductMasterDetails);
      this.formUser.controls["productName"].disable();
      this.editMode = true;  
    }    
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  getProductList(): void {
    this.commonService.getProductList().subscribe((res) => {
      this.productList = res;
    });
  }

  chkProductDuplicate(){
    var selectedData = this.formUser.getRawValue();  
    this.requestmodel.strRequest = selectedData.productName;
    this.productmasterService.checkDuplicateProduct(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          productName: ''  
        });
        
      }
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
    this.formSubmitted = true;
    var selectedDataVal = this.formUser.getRawValue();
    this.productMasterModel.productId = this.selectedProductMasterDetails.productId ;
    this.productMasterModel.productName=selectedDataVal.productName.toString().toUpperCase();
    this.productMasterModel.isActive = selectedDataVal.isActive.toString().toUpperCase();

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




