import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Roleprivilegeslistmodel } from 'src/app/models/roleprivilegeslistmodel';
import { Roleprivilegesmodel } from 'src/app/models/roleprivilegesmodel';
import { RoleprivilegesService } from 'src/app/services/roleprivileges.service';

@Component({
  selector: 'app-roleprivileges',
  templateUrl: './roleprivileges.component.html',
  styleUrls: ['./roleprivileges.component.css']
})
export class RoleprivilegesComponent {
  loggedInUserID: string = '';
  year: string = '';
  roleList: Dropdownmodel[] = [];
  formUser!: FormGroup;
  roleprivileges= new Roleprivilegeslistmodel();
  keywordLocation = 'dataName';
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();

  constructor(private roleprivilegeslistmodel: Roleprivilegeslistmodel, private sharedService: SharedService,
    private requestmodel: Requestmodel, private route: Router, private formBuilder: FormBuilder,
    private commonService: CommonService, private roleprivilegesService: RoleprivilegesService,
    private toasterService: ToastrService) {
    this.roleprivileges = new Roleprivilegeslistmodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Role Privileges");
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
    
    this.formUser = this.formBuilder.group({
      roleId: new FormControl('', [Validators.required]),
      masterList: this.formBuilder.array([this.createMasterArray()]),
      reportList: this.formBuilder.array([this.createReportArray()])
    });
    this.getRoleList();
  }

  createMasterArray() {
    return this.formBuilder.group({
      moduleId:  [''],
      menuId :  [''],
      createYN:  [''],
      editYN:  [''],
      viewYN:  [''],
      deleteYN:  [''],
      printYN:  [''],      
      moduleName: [''],      
      menuName: [''],      
    });
  }

  
  createReportArray() {
    return this.formBuilder.group({
      moduleId:  [''],
      menuId :  [''],
      viewYN:  [''],  
      moduleName: [''],      
      menuName: [''],     
    });
  }

  getRoleList(): void {
    this.roleprivilegesService.getRoleTypesList().subscribe((res: Dropdownmodel[]) => {
      this.roleList = res;
    });
  }

  

  onRoleChange(e: any) {
    this.formMasterArray.clear();
    this.formReportArray.clear();
    var selectedValue = e.target.value;
    this.getRolePrivileges(selectedValue);
  }


  getRolePrivileges(roleid: string)
  {
    this.requestmodel.strRequest = roleid;
    this.roleprivilegesService.getRolePrivilegesList(this.requestmodel).subscribe((res) => {
      this.roleprivileges = res;
      for (var i = 0; i < res.rolePrivilegesMasterList.length; i++) {
        this.formMasterArray.push(this.createMasterArray());
        this.formMasterArray.controls[i].get("moduleName")?.setValue(res.rolePrivilegesMasterList[i].moduleName);
        this.formMasterArray.controls[i].get("moduleId")?.setValue(res.rolePrivilegesMasterList[i].moduleId);
        this.formMasterArray.controls[i].get("menuName")?.setValue(res.rolePrivilegesMasterList[i].menuName);
        this.formMasterArray.controls[i].get("menuId")?.setValue(res.rolePrivilegesMasterList[i].menuId);
        this.formMasterArray.controls[i].get("createYN")?.setValue(res.rolePrivilegesMasterList[i].createYN);
        this.formMasterArray.controls[i].get("editYN")?.setValue(res.rolePrivilegesMasterList[i].editYN);
        this.formMasterArray.controls[i].get("viewYN")?.setValue(res.rolePrivilegesMasterList[i].viewYN);
        this.formMasterArray.controls[i].get("deleteYN")?.setValue(res.rolePrivilegesMasterList[i].deleteYN);
        this.formMasterArray.controls[i].get("printYN")?.setValue(res.rolePrivilegesMasterList[i].printYN);
        this.formMasterArray.controls[i].get("moduleName")?.disable();
        this.formMasterArray.controls[i].get("menuName")?.disable();
      }
      for (var i = 0; i < res.rolePrivilegesReportList.length; i++) {
        this.formReportArray.push(this.createMasterArray());
        this.formReportArray.controls[i].get("moduleName")?.setValue(res.rolePrivilegesReportList[i].moduleName);
        this.formReportArray.controls[i].get("moduleId")?.setValue(res.rolePrivilegesReportList[i].moduleId);
        this.formReportArray.controls[i].get("menuName")?.setValue(res.rolePrivilegesReportList[i].menuName);
        this.formReportArray.controls[i].get("menuId")?.setValue(res.rolePrivilegesReportList[i].menuId);
        this.formReportArray.controls[i].get("viewYN")?.setValue(res.rolePrivilegesReportList[i].viewYN);
        this.formReportArray.controls[i].get("moduleName")?.disable();
        this.formReportArray.controls[i].get("menuName")?.disable();
      }
    });
  }
  
  get f() { return this.formUser.controls; }

  get formMasterArray() {
    return this.formUser.get("masterList") as FormArray;
  }

  get formReportArray() {
    return this.formUser.get("reportList") as FormArray;
  }

  exit(): void {
    this.route.navigate(['/roleprivileges']);
  }

 
  submitRolePrivilegesForm(): void {
    this.formSubmitted = true;
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
           
    this.sharedService.loading=true;
    var selectedDataVal=this.formUser.getRawValue();
    this.roleprivilegeslistmodel.roleId = selectedDataVal.roleId ;
    
    this.roleprivilegeslistmodel.rolePrivilegesMasterList = [];
    this.roleprivilegeslistmodel.rolePrivilegesReportList = [];

    for (var i = 0; i < selectedDataVal.masterList.length; i++) {
      this.roleprivilegeslistmodel.rolePrivilegesMasterList.push({
        'roleId': selectedDataVal.roleId,
        'moduleId': selectedDataVal.masterList[i].moduleId,
        'menuId' : selectedDataVal.masterList[i].menuId,
        'createYN': selectedDataVal.masterList[i].createYN,
        'editYN': selectedDataVal.masterList[i].editYN,
        'viewYN': selectedDataVal.masterList[i].viewYN,
        'deleteYN': selectedDataVal.masterList[i].deleteYN,
        'printYN': selectedDataVal.masterList[i].printYN,
        'moduleName': '',
        'menuName': '',
        'menuType': '',            
      });
    }
    for (var i = 0; i < selectedDataVal.reportList.length; i++) {
      this.roleprivilegeslistmodel.rolePrivilegesReportList.push({
        'roleId': selectedDataVal.roleId,
        'moduleId': selectedDataVal.reportList[i].moduleId,
        'menuId' : selectedDataVal.reportList[i].menuId,
        'createYN': 'N',
        'editYN': 'N',
        'viewYN': selectedDataVal.reportList[i].viewYN,
        'deleteYN': 'N',
        'printYN': 'N',
        'moduleName': '',
        'menuName': '',
        'menuType': '',            
      });
    }

    this.roleprivilegesService.rolePrivilegesSubmitted(this.roleprivilegeslistmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formUser.reset();
      window.location.reload();
    });
    
    this.sharedService.loading=false;
  }
  

}
