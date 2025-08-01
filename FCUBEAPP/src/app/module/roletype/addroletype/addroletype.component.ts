import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Roletypelistmodel  } from 'src/app/models/roletypelistmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Roletypemodel } from 'src/app/models/roletypemodel';
import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { RoleTypeService } from 'src/app/services/roletype.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-addroletype',
  templateUrl: './addroletype.component.html',
  styleUrls: ['./addroletype.component.css']
})
export class AddroletypeComponent {
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


  selectedRoleTypesDetails = new Roletypemodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private roletypemodel: Roletypemodel,private requestmodel:Requestmodel, private roleTypeService: RoleTypeService, 
    private commonService: CommonService,private toasterService: ToastrService ,
    private sharedService: SharedService,) {
    this.roletypemodel = new Roletypemodel();
  }

ngOnInit(): void {
   var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Create Role Types");
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
  this.selectedRoleTypesDetails = this.roleTypeService.getroletypeDetails();
  this.formRoleType = this.formBuilder.group({
    roleName: new FormControl('',),
    roleDesc: new FormControl('',),
    activeYN: new FormControl('Y',),

  

  });
 

   if (this.selectedRoleTypesDetails.roleId  != '') {
      setTimeout(() => {
    
        this.formRoleType.patchValue(this.selectedRoleTypesDetails);
        this.formRoleType.patchValue({
      //     gdmDate: this.commonService.formatDate(this.selectedRoleTypesDetails.gdmDate),
        })  
// this.formGdm.controls['gdmSlNo'].disable(); 
        this.editMode =true;

      }, 2000);  
    }
  }

 




  ChkDuplicateRoleDesc(){
    var selectedData = this.formRoleType.getRawValue();  
      this.requestmodel.strRequest = selectedData.roleDesc;
    //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
      this.roleTypeService.chkDesc(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toasterService.warning(this.responseDetails.message);
          this.formRoleType.patchValue({
            roleDesc: ''  
          });
          
        }
      });
  }
  ChkDuplicateRoleName(){
    var selectedData = this.formRoleType.getRawValue();  
      this.requestmodel.strRequest = selectedData.roleName;
    //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
      this.roleTypeService.chkName(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          //ignore
        }
        else{
          this.toasterService.warning(this.responseDetails.message);
          this.formRoleType.patchValue({
            roleName: ''  
          });
          
        }
      });
  }

  

    
    roleTypesDelete(): void {
      if(this.selectedRoleTypesDetails.roleId != '' ){
        this.sharedService.loading = true;
       this.requestmodel.strRequest =this.selectedRoleTypesDetails.roleId
        if (confirm("Are you sure, you want to delete this?")) {
              this.roleTypeService.roleTypesDelete(this.requestmodel).subscribe((res: Responsemodel) => {
              this.responseDetails = res;
              if (this.responseDetails.status){              
                console.log(this.responseDetails.message);
                this.formRoleType.reset();
                this.route.navigate(['/roletypelist']);
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
  this.route.navigate(['/roletypelist']);
}
// convenience getter for easy access to contact form fields
get f() { return this.formRoleType.controls; }

 

//Submit user form details //
submitRoleTypesForm(): void {
  if (this.formRoleType.invalid) {
    this.toasterService.warning("Please Enter Mandatory Fields "); 
    const controls = this.formRoleType.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");   
      }
    } 
    return;
  }
  this.formSubmitted = true;
  this.roletypemodel.roleId = this.selectedRoleTypesDetails.roleId;
  this.roletypemodel.roleName= this.formRoleType.value.roleName.toString().toUpperCase();
  this.roletypemodel.roleDesc = this.formRoleType.value.roleDesc.toString().toUpperCase();
  this.roletypemodel.activeYN = this.formRoleType.value.activeYN.toString().toUpperCase();
  this.roletypemodel.loggedInUser = this.formRoleType.value.loggedInUser;


  this.roleTypeService.roletypeDetailsSubmitted(this.roletypemodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;

  if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formRoleType.reset();
        this.route.navigate(['/roletypelist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
  }  




  

  
}



