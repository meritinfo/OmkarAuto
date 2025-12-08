import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Maintanencemasterlistmodel } from 'src/app/models/maintanencemasterlistmodel';
import { Maintanencemastermodel } from 'src/app/models/maintanencemastermodel';
import {MaintanenceMasterService } from 'src/app/services/maintanencemaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-maintanencemasteradd',
  templateUrl: './maintanencemasteradd.component.html',
  styleUrls: ['./maintanencemasteradd.component.css']
})
export class MaintanencemasteraddComponent {
  loggedInUserID: string = '';
  formMaintanenceMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  responseDetails = new Responsemodel();
  classificationList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];

  List: Dropdownmodel[] = [];
  selectedMaintanenceMasterDetails = new Maintanencemastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private maintanenceMasterModel: Maintanencemastermodel, 
    private maintanenceMasterService: MaintanenceMasterService, 
    private commonService: CommonService,private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.maintanenceMasterModel = new Maintanencemastermodel();

}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Maintenance Type Master");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
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

  this.sharedService.loading = true;   

  this.selectedMaintanenceMasterDetails = this.maintanenceMasterService.getMaintanenceMasterDetails();
  this.formMaintanenceMaster = this.formBuilder.group({   

    maintenanceDesc: new FormControl('',[Validators.required]),
    maintType: new FormControl('',[Validators.required]),
    isActive: new FormControl('Y',[Validators.required]),

  });

  if (this.selectedMaintanenceMasterDetails.maintId != '') {
    this.formMaintanenceMaster.patchValue(this.selectedMaintanenceMasterDetails);    
    this.editMode = true;
  }
  
  this.sharedService.loading = false;

}
get f() { return this.formMaintanenceMaster.controls; }
chkMaintanenceDuplicate(){
  var selectedData = this.formMaintanenceMaster.getRawValue();
  

    this.requestmodel.strRequest = selectedData.maintenanceDesc;
  //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
    this.maintanenceMasterService.checkDuplicateMaintanence(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formMaintanenceMaster.patchValue({
          maintenanceDesc: ''
  
        });
        
      }
    });
    
}
exit(): void {
  this.route.navigate(['/maintmasterlist']);
}

deleteMaintanenceMasterForm(): void {
  if(this.selectedMaintanenceMasterDetails.maintId != '' ){
   this.requestmodel.strRequest =this.selectedMaintanenceMasterDetails.maintId
    if (confirm("Are you sure, you want to delete this?")) {
          this.maintanenceMasterService.maintanenceMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formMaintanenceMaster.reset();
            this.route.navigate(['/maintmasterlist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
      });
    }
  }
}


//Submit user form details //
submitMaintanenceMasterForm(): void {  
if (this.formMaintanenceMaster.invalid) {
  this.toasterService.warning("Please enter mandatory fields");

  const controls = this.formMaintanenceMaster.controls;
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
    
  this.sharedService.loading = true;

  var selectedDataVal = this.formMaintanenceMaster.getRawValue();
  this.formSubmitted = true;
  this.maintanenceMasterModel.maintId = this.selectedMaintanenceMasterDetails.maintId ;
  this.maintanenceMasterModel.maintenanceDesc  = selectedDataVal.maintenanceDesc.toString().toUpperCase();
  this.maintanenceMasterModel.isActive = selectedDataVal.isActive;
  this.maintanenceMasterModel.maintType = selectedDataVal.maintType;
  this.maintanenceMasterModel.loggedInUser  = this.loggedInUserID;

  this.maintanenceMasterService.maintanenceMasterSubmitted(this.maintanenceMasterModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formMaintanenceMaster.reset();
      this.route.navigate(['/maintmasterlist']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }      
  });
  this.sharedService.loading = false;
}
}




