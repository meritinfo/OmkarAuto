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
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';


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
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  year: string = '';
  branch: string = '';



  selectedBrandMasterDetails = new Brandmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private brandMasterModel: Brandmastermodel,  private toasterService: ToastrService,private brandmasterService: BrandMasterService,private requestmodel:Requestmodel, private commonService: CommonService) {
    this.brandMasterModel = new Brandmastermodel();


}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Brand Master");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  var yearIDData = sessionStorage.getItem('yearID')?.toString();
  if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
    this.year = yearIDData;
  }
  var branchData = sessionStorage.getItem('userBranch')?.toString();
  if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
    this.branch = branchData;

  }
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }
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
    isActive: new FormControl('',),
  

  });
  if (this.selectedBrandMasterDetails.brandID != '') {
    this.formUser.patchValue(this.selectedBrandMasterDetails);
    this.formUser.patchValue({
     
      
    })
    this.editMode = true;
  }
 

}
exit(): void {
  this.route.navigate(['/brandmasterlist']);
}
chkBrandDuplicate(){
  var selectedData = this.formUser.getRawValue();
  

    this.requestmodel.strRequest = selectedData.brandName;
  //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
    this.brandmasterService.checkDuplicateBrand(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          brandName: ''
  
        });
        
      }
    });
    
}
deleteBrandMasterForm(): void {
  if(this.selectedBrandMasterDetails.brandID != '' ){
   this.requestmodel.strRequest =this.selectedBrandMasterDetails.brandID
    if (confirm("Are you sure, you want to delete this?")) {
          this.brandmasterService.brandMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/brandmasterlist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
      });
    }
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
  this.brandMasterModel.brandID = this.selectedBrandMasterDetails.brandID != '' ? this.selectedBrandMasterDetails.brandID : '';
  this.brandMasterModel.brandName= this.formUser.value.brandName.toString().toUpperCase();
  this.brandMasterModel.brandType = this.formUser.value.brandType;
  this.brandMasterModel.isActive = this.formUser.value.isActive;
  this.brandMasterModel.loggedInUser = this.loggedInUserID;


  this.brandmasterService.brandMasterDetailsSubmitted(this.brandMasterModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;

    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/brandmasterlist']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }      
  });
}
}


