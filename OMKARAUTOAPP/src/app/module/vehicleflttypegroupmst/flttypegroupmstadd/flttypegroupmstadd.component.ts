
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Filtermodel } from 'src/app/models/filtermodel';

import { Requestmodel } from 'src/app/models/requestmodel';

import { Usermodel } from 'src/app/models/usermodel';

import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehicleflttypemstlist  } from 'src/app/models/vehicleflttypemstlist';
import { Vehicleflttypemstmodel } from "src/app/models/vehicleflttypemstmodel";
import { VehicleFltTypeMasterService } from 'src/app/services/vehicleflttypemst.service';
import { SharedService } from 'src/app/services/shared.service';


@Component({
  selector: 'app-flttypegroupmstadd',
  templateUrl: './flttypegroupmstadd.component.html',
  styleUrls: ['./flttypegroupmstadd.component.css']
})
export class FlttypegroupmstaddComponent {
   loggedInUserID: string = '';
  formRoleType!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";


  selectedfltTypesDetails = new Vehicleflttypemstmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private vehicleflttypemstmodel: Vehicleflttypemstmodel,private requestmodel:Requestmodel, private vehicleFltTypeMasterService: VehicleFltTypeMasterService, 
    private commonService: CommonService,private toasterService: ToastrService ,private sharedService: SharedService,) {
    this.vehicleflttypemstmodel = new Vehicleflttypemstmodel();


}
ngOnInit(): void {
   var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Fleet Vehicle Types");
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
  this.selectedfltTypesDetails = this.vehicleFltTypeMasterService.getVehicleFltTypeMasterDetails();
  this.formRoleType = this.formBuilder.group({
    vehicleTypeGroupCode: new FormControl('',[Validators.required]),
    vehicleTypeGroupName: new FormControl('',[Validators.required]),
    isActive: new FormControl('Y',[Validators.required]),

  

  });
 

   if (this.selectedfltTypesDetails.vehicleTypeGroupId  != '') {
      setTimeout(() => {
    
        this.formRoleType.patchValue(this.selectedfltTypesDetails);
        this.formRoleType.patchValue({
      //     gdmDate: this.commonService.formatDate(this.selectedRoleTypesDetails.gdmDate),
        })  
// this.formGdm.controls['gdmSlNo'].disable(); 
        this.editMode =true;

      }, 2000);  
    }
  }

 




  ChkDuplicateFltCode(){
    var selectedData = this.formRoleType.getRawValue();  
      this.requestmodel.strRequest = selectedData.vehicleTypeGroupCode;
    //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
      this.vehicleFltTypeMasterService.checkDuplicateCode(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toasterService.warning(this.responseDetails.message);
          this.formRoleType.patchValue({
            vehicleTypeGroupCode: ''  
          });
          
        }
      });
  }
  ChkDuplicateName(){
    var selectedData = this.formRoleType.getRawValue();  
      this.requestmodel.strRequest = selectedData.vehicleTypeGroupName;
    //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
      this.vehicleFltTypeMasterService.checkDuplicateName(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toasterService.warning(this.responseDetails.message);
          this.formRoleType.patchValue({
            vehicleTypeGroupName: ''  
          });
          
        }
      });
  }

  

    
    fltTypesDelete(): void {
      if(this.selectedfltTypesDetails.vehicleTypeGroupId != '' ){
        this.sharedService.loading = true;
       this.requestmodel.strRequest =this.selectedfltTypesDetails.vehicleTypeGroupId
        if (confirm("Are you sure, you want to delete this?")) {
              this.vehicleFltTypeMasterService.vehicleFltMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
              this.responseDetails = res;
              if (this.responseDetails.status){              
                console.log(this.responseDetails.message);
                this.formRoleType.reset();
                this.route.navigate(['/fltvehicletype']);
              } 
              else{
                console.log(this.responseDetails.message);  
                this.toasterService.warning(this.responseDetails.message);  
                return; 
              }   
          });
        }
        this.sharedService.loading = false;
      }
    }
exit(): void {
  this.route.navigate(['/fltvehicletype']);
}
// convenience getter for easy access to contact form fields
get f() { return this.formRoleType.controls; }

 

//Submit user form details //
submitFltTypeGroupTypesForm(): void {
if (this.formRoleType.invalid) {
  this.toasterService.warning("Please enter mandatory fields");
  const controls = this.formRoleType.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      // Convert camelCase key to readable format
      const readableName = name.replace(/([A-Z])/g, ' $1');
      const titleCaseName = readableName.charAt(0).toUpperCase() + readableName.slice(1);

      this.toasterService.warning(titleCaseName + " field is invalid");
    }
  }

  return;
}
  this.formSubmitted = true;
    var selectedDataValue = this.formRoleType.getRawValue();
  this.vehicleflttypemstmodel.vehicleTypeGroupId = this.selectedfltTypesDetails.vehicleTypeGroupId;
  this.vehicleflttypemstmodel.vehicleTypeGroupCode= selectedDataValue.vehicleTypeGroupCode.toString().toUpperCase();
  this.vehicleflttypemstmodel.vehicleTypeGroupName = selectedDataValue.vehicleTypeGroupName.toString().toUpperCase();
  this.vehicleflttypemstmodel.isActive = selectedDataValue.isActive;
  this.vehicleflttypemstmodel.loggedInUser = this.loggedInUserID;


  this.vehicleFltTypeMasterService.fltTypeMasterDetailsSubmitted(this.vehicleflttypemstmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;

  if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formRoleType.reset();
        this.route.navigate(['/fltvehicletype']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
  }  




  

  
}




