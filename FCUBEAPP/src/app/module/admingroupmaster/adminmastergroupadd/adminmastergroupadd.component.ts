
import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChcosttypesModel } from 'src/app/models/chcosttypesmodel';
import { Admingroupmasterlistmodel   } from 'src/app/models/admingroupmasterlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Admingroupmastermodel } from 'src/app/models/admingroupmastermodel';

import { AdminGroupMasterService } from 'src/app/services/adminmastergroup.service';
import { ChCostTypesService } from 'src/app/services/chcosttypes.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminmastergroupadd',
  templateUrl: './adminmastergroupadd.component.html',
  styleUrls: ['./adminmastergroupadd.component.css']
})
export class AdminmastergroupaddComponent {
    loggedInUserID: string = '';
      amount: string = '';
      maxDate: string = '';
      minDate: string = '';
      loginDate: string = '';
      branch: string = '';
      year: string = '';
      ptype: string = '';
      trip: string = '';
      formChCost!: FormGroup;
      formSubmitted = false;
      keywordLocation = 'dataName';
      editMode = false;
      createStatus = false;
      editStatus = false;
      deleteStatus = false;
      viewStatus = false; 
dashboard: string ="";
      createmode = false;
      seriesDoc: string = "";
    
      responseDetails = new Responsemodel();
      branchList: Dropdownmodel[] = [];
      creditacList: Dropdownmodel[] = [];
      creditAcList: Dropdownmodel[] = [];
      vehicleList: Dropdownmodel[] = [];
      newList: Dropdownmodel[] = [];
      locationList: Dropdownmodel[] = [];
    
    
      selectedChCostTypeDetails = new Admingroupmastermodel();
    
      constructor(private route: Router, private formBuilder: FormBuilder, 
        private admingroupmastermodel: Admingroupmastermodel, private adminGroupMasterService: AdminGroupMasterService, 
        private commonService: CommonService, private toasterService: ToastrService,

        private sharedService: SharedService,private requestmodel:Requestmodel) {
        this.admingroupmastermodel = new Admingroupmastermodel();

}
ngOnInit(): void {
  this.sharedService.loading = true;
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((( aa: { menuName: string; }) => aa.menuName === "Admin Exp. Group Master"));
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
  var yearIDData = sessionStorage.getItem('yearID')?.toString();
  if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
    this.year = yearIDData;
  }
  else {
    this.route.navigate(['/']);
  }
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }
  var userData3 = sessionStorage.getItem('userBranch')?.toString();
  if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
    this.branch = userData3;

  }
  var yearIDData = sessionStorage.getItem('yearID')?.toString();
  if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
    this.year = yearIDData;
  }

 // this.getBranchList();   
 // this.getVehicleNoList();
 // this.getLocationList();
  
  this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
  console.log(this.maxDate);

  this.selectedChCostTypeDetails = this.adminGroupMasterService.getAdminGroupmasterDetails();

  this.formChCost = this.formBuilder.group({
    adminGrpDesc : new FormControl('' ,[Validators.required] ),
    sortId : new FormControl('' , [Validators.required]),
    activeYN: new FormControl('Y',[Validators.required] ),
   // transType: new FormControl('', [Validators.required]),
   // amountPaid: new FormControl('', [Validators.required]),
  });
  setTimeout(() => {
    this.createmode = true;
   // this.formTripPayment.controls['pmtBranch'].disable();
     if (this.selectedChCostTypeDetails.adminGrpId  != '') {
      // this.seriesDoc = this.selectedChCostTypeDetails.seriesDoc; 
       this.formChCost.patchValue(this.selectedChCostTypeDetails);
     
       this.formChCost.patchValue({
        // pmtDate:   this.commonService.formatDate(this.selectedChCostTypeDetails.pmtDate), 
        // chequeDate:  this.commonService.formatDate(this.selectedChCostTypeDetails.chequeDate), 
        // vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedTripPaymentsDetails.vehicleMasterID),
        // neftPmt:  ""
       })  
      
       this.editMode = true;
  
     }  
     else{
      this.getAdminSlno();
     }
   }, 2000);
   this.sharedService.loading = false;
 }

 get f() { return this.formChCost.controls; }

 amingrpDelete(): void {    
     if(this.selectedChCostTypeDetails.adminGrpId  != '' ){
     this.requestmodel.strRequest =this.selectedChCostTypeDetails.adminGrpId  
       if (confirm("Are you sure, you want to delete this?")) {
             this.adminGroupMasterService.adminGroupDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
             this.responseDetails = res;
             if (this.responseDetails.status) {
               this.toasterService.success(this.responseDetails.message);
               this.formChCost.reset();
               this.route.navigate(['/adminexpgrplist']);
             }
             else {
               this.toasterService.warning(this.responseDetails.message);
             }
         });
       }
     }
   }
 
   exit(): void {
     this.route.navigate(['/adminexpgrplist']);
   }
   getAdminSlno(): void {
    this.requestmodel.strRequest = this.branch;
    this.requestmodel.strRequest1 = this.year;
    this.adminGroupMasterService.getAdminSlNo(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.formChCost.patchValue({
          sortId: this.responseDetails.message
        });
      }
     else{
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }

   
   checkDuplicateAdmin(){
     var selectedData = this.formChCost.getRawValue();  
       this.requestmodel.strRequest = selectedData.adminGrpDesc;
     //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
       this.adminGroupMasterService.checkAdminGroupDesc(this.requestmodel).subscribe((res: Responsemodel) => {
         this.responseDetails = res;
         if (this.responseDetails.status) {
           //ignore
         }
         else{
           this.toasterService.warning(this.responseDetails.message);
           this.formChCost.patchValue({
            adminGrpDesc: ''  
           });
           
         }
       });
       
   }
    
   submitAdminForm(): void {  
     if (this.formChCost.invalid) {
       this.toasterService.warning("Please Enter Mandatory Fields ");   
       const controls = this.formChCost.controls;
       for (const name in controls) {
         if (controls[name].invalid) {
           this.toasterService.warning(name + " Fields is Invalid");   
         }
       }
       return;
     }
     var selectedDataValue = this.formChCost.getRawValue();
     
     
     
     this.formSubmitted = true; 
     this.admingroupmastermodel.adminGrpId  = this.selectedChCostTypeDetails.adminGrpId  ;
     this.admingroupmastermodel.adminGrpDesc  = selectedDataValue.adminGrpDesc .toString().toUpperCase();;
     this.admingroupmastermodel.sortId  = selectedDataValue.sortId ;
     this.admingroupmastermodel.activeYN  = selectedDataValue.activeYN .toString();
    // this.chcosttypesModel.vehicleMasterID = selectedDataValue.vehicleMasterID?selectedDataValue.vehicleMasterID.dataId:"";
   //  this.trippaymentsmodel.amountPaid = selectedDataValue.amountPaid.toString();
    // this.trippaymentsmodel.remarks = selectedDataValue.remarks.toString().toUpperCase();
 
   //  this.trippaymentsmodel.yearId = this.year;
     this.admingroupmastermodel.loggedInUser = this.loggedInUserID;
 
     this.adminGroupMasterService.AdminGroupMasterSubmitted(this.admingroupmastermodel).subscribe((res: Responsemodel) => {
       this.responseDetails = res;
       if (this.responseDetails.status) {
         this.toasterService.success(this.responseDetails.message);
         this.formChCost.reset();
         this.route.navigate(['/adminexpgrplist']);
       }
       else {
         this.toasterService.warning(this.responseDetails.message);
       }
     });
   }
 }
   

