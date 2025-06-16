import { Component } from '@angular/core';




import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { ToastrService } from 'ngx-toastr';
import { Tyrepositionmasterlistmodel } from 'src/app/models/tyrepositionmasterlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Tyrepositionmastermodel } from 'src/app/models/tyrepositionmastermodel';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { TyrepositionMasterService } from 'src/app/services/tyrepositionmaster.service';
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-addtyrepositionmaster',
  templateUrl: './addtyrepositionmaster.component.html',
  styleUrls: ['./addtyrepositionmaster.component.css']
})
export class AddtyrepositionmasterComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";


  selectedTyrePositionMasterDetails = new Tyrepositionmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private sharedService : SharedService,private requestmodel:Requestmodel, private toasterService: ToastrService ,private TyrePositionMasterModel: Tyrepositionmastermodel, private tyrepositionmasterService: TyrepositionMasterService, private commonService: CommonService) {
    this.TyrePositionMasterModel = new Tyrepositionmastermodel();

 
}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Tyre Position Master");
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

  this.selectedTyrePositionMasterDetails = this.tyrepositionmasterService.getTyrepositionMasterDetails();
  this.formUser = this.formBuilder.group({
    fitmentPosition: new FormControl('',[Validators.required]),
    activeYN: new FormControl('Y',[Validators.required])
 
  

  });
  if (this.selectedTyrePositionMasterDetails.tyrePosID != '') {
    this.formUser.patchValue(this.selectedTyrePositionMasterDetails);
    this.editMode = true;
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }
exit(): void {
  this.route.navigate(['/tyreposmasterlist']);
}
chkDuplicatePos(){
  var selectedData = this.formUser.getRawValue();
  

    this.requestmodel.strRequest = selectedData.fitmentPosition;
  //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
    this.tyrepositionmasterService.checkDuplicatePos(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          fitmentPosition: ''
  
        });
        
      }
    });
    
}
deleteTyrePositionMasterForm(): void {
  if(this.selectedTyrePositionMasterDetails.tyrePosID != '' ){
   this.requestmodel.strRequest =this.selectedTyrePositionMasterDetails.tyrePosID
    if (confirm("Are you sure, you want to delete this?")) {
          this.tyrepositionmasterService.tyrePositionMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/tyreposmasterlist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
      });
    }
  }
}

//Submit user form details //
submitTyrePositionMasterForm(): void {
  
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
  
  this.TyrePositionMasterModel.tyrePosID = this.selectedTyrePositionMasterDetails.tyrePosID != '' ? this.selectedTyrePositionMasterDetails.tyrePosID : '';
  this.TyrePositionMasterModel.fitmentPosition= this.formUser.value.fitmentPosition.toString().toUpperCase();
  this.TyrePositionMasterModel.activeYN= this.formUser.value.activeYN;

  this.tyrepositionmasterService.tyrepositionMasterDetailsSubmitted(this.TyrePositionMasterModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/tyreposmasterlist']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }      
  });
  //this.sharedService.loading = false;
}
}




