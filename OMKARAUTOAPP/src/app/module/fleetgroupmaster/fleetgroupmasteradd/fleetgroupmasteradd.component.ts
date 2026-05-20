import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';

import { Fleetgroupmastermodel  } from 'src/app/models/fleetgroupmastermodel';
import { FleetgroupmasterService } from 'src/app/services/fleetgroupmaster.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-fleetgroupmasteradd',
  templateUrl: './fleetgroupmasteradd.component.html',
  styleUrls: ['./fleetgroupmasteradd.component.css']
})
export class FleetgroupmasteraddComponent {
  loggedInUserID: string = '';
  userlogindate:string="";
  formFleetGroupMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  
  responseDetails = new Responsemodel();

  selectedFleetGroupMasterModel= new Fleetgroupmastermodel();

    constructor(private route: Router, private formBuilder: FormBuilder, 
      private fleetgroupmastermodel: Fleetgroupmastermodel, private sharedService: SharedService,
      private fleetgroupmasterService: FleetgroupmasterService,
      private commonService: CommonService, private requestmodel:Requestmodel,
      private toasterService: ToastrService) {
      this.fleetgroupmastermodel = new Fleetgroupmastermodel();
    }
      ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Fleet Group Master");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
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
    
    this.formFleetGroupMaster = this.formBuilder.group({    
      groupId: new FormControl('',),
      groupDesc: new FormControl('',[Validators.required]),
      isActive: new FormControl('Y',[Validators.required]),
    });    

    this.sharedService.loading = true;

    this.selectedFleetGroupMasterModel = this.fleetgroupmasterService.getFinsaccountsDetails(); 
   
    if (this.selectedFleetGroupMasterModel.groupId != ''){
      this.requestmodel.strRequest=this.selectedFleetGroupMasterModel.groupId;
    }
 

    setTimeout(() => {
      if (this.selectedFleetGroupMasterModel.groupId != '') {
          this.formFleetGroupMaster.patchValue(this.selectedFleetGroupMasterModel);   
          this.editMode=true;           
      }
    }, 2000);
    
    this.sharedService.loading = false;
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formFleetGroupMaster.controls; }

    exit(): void {
    this.route.navigate(['/fleetgrouplist']);
  }

    // chkDesGroup(e: any) {
    //   if (this.selectedFleetGroupMasterModel.groupId == "")
    //   {
    //     this.sharedService.loading = true;
    //     this.requestmodel.strRequest = e.target.value; 
    //     this.fleetgroupmasterService.chkDesGroup(this.requestmodel).subscribe((res: Responsemodel) => {
    //       this.responseDetails = res;
    //       if (!this.responseDetails.status) {
    //         this.toasterService.warning(this.responseDetails.message);
    //         this.formFleetGroupMaster.patchValue({
    //           groupDesc: ''
    //         });
    //       }
    //     });
    //     this.sharedService.loading = false;
    //   }
    // }





  chkDesGroup(){
    var selectedData = this.formFleetGroupMaster.getRawValue();  
      this.requestmodel.strRequest = selectedData.groupDesc;
    //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
      this.fleetgroupmasterService.chkDesGroup(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toasterService.warning(this.responseDetails.message);
          this.formFleetGroupMaster.patchValue({
            groupDesc: ''  
          });
          
        }
      });
  }

  

    
    deleteFinAccountMasterForm(): void {
      if(this.selectedFleetGroupMasterModel.groupId != '' ){
        this.sharedService.loading = true;
       this.requestmodel.strRequest =this.selectedFleetGroupMasterModel.groupId
        if (confirm("Are you sure, you want to delete this?")) {
              this.fleetgroupmasterService.fleetGroupMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
              this.responseDetails = res;
              if (this.responseDetails.status){              
                console.log(this.responseDetails.message);
                this.formFleetGroupMaster.reset();
                this.route.navigate(['/fleetgrouplist']);
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

    submitFleetGroupMasterForm(): void {
       
if (this.formFleetGroupMaster.invalid) {
  this.toasterService.warning("Please enter mandatory fields");

  const controls = this.formFleetGroupMaster.controls;
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
    var selectedDataValue = this.formFleetGroupMaster.getRawValue();
    this.sharedService.loading = true;
    this.formSubmitted = true;
    this.fleetgroupmastermodel.groupId            = this.selectedFleetGroupMasterModel.groupId;
    this.fleetgroupmastermodel.groupDesc          = selectedDataValue.groupDesc.toString().toUpperCase();
    this.fleetgroupmastermodel.isActive           = selectedDataValue.isActive.toString().toUpperCase();
    this.fleetgroupmastermodel.loggedInUser       = this.loggedInUserID;

    this.fleetgroupmasterService.fleetGroupMasterSave(this.fleetgroupmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formFleetGroupMaster.reset();
        this.route.navigate(['/fleetgrouplist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    this.sharedService.loading = false;
  }
}
