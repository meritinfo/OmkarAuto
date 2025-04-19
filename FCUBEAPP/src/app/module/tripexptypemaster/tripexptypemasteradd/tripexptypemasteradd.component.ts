import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {Tripexptypemasterlistmodel } from 'src/app/models/tripexptypemasterlistmodel';
import { TripexptypemasterModel } from 'src/app/models/tripexptypemastermodel';
import {TripExpTypeMasterService } from 'src/app/services/tripexptypemaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-tripexptypemasteradd',
  templateUrl: './tripexptypemasteradd.component.html',
  styleUrls: ['./tripexptypemasteradd.component.css']
})
export class TripexptypemasteraddComponent {
  loggedInUserID: string = '';
  formTripExpMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  classificationList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];

  List: Dropdownmodel[] = [];
  selectedTripExpMasterDetails = new TripexptypemasterModel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tripExpTypeMasterModel: TripexptypemasterModel, 
    private tripExpTypeMasterService:TripExpTypeMasterService, 
    private commonService: CommonService,private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.tripExpTypeMasterModel = new TripexptypemasterModel();

  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Trip Expense Type Master");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    if(!this.viewStatus){      
      this.route.navigate(['/dashboard']);
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
  
    this.sharedService.loading = true;   
  
    this.selectedTripExpMasterDetails = this.tripExpTypeMasterService.getTripExpTypeMasterDetails();
    this.formTripExpMaster = this.formBuilder.group({  
      expDesc: new FormControl('',[Validators.required]),  
    });
  
    if (this.selectedTripExpMasterDetails.expId != '') {
      this.formTripExpMaster.patchValue(this.selectedTripExpMasterDetails);    
      this.editMode = true;
    }    
    this.sharedService.loading = false;  
  }

  get f() { return this.formTripExpMaster.controls; }

  chkTripExpMasterDuplicate(){
    var selectedData = this.formTripExpMaster.getRawValue(); 
    this.requestmodel.strRequest = selectedData.expDesc;
    this.tripExpTypeMasterService.checkExpTypeMaster(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formTripExpMaster.patchValue({
          expDesc: ''    
        });          
      }
    });      
  }

  exit(): void {
    this.route.navigate(['/tripexpmasterlist']);
  }
  
  deleteExpTypeMasterForm(): void {
    if(this.selectedTripExpMasterDetails.expId != '' ){
     this.requestmodel.strRequest =this.selectedTripExpMasterDetails.expId
      if (confirm("Are you sure, you want to delete this?")) {
            this.tripExpTypeMasterService.tripExpTypeMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formTripExpMaster.reset();
              this.route.navigate(['/tripexpmasterlist']);
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
    if (this.formTripExpMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formTripExpMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
      
    this.sharedService.loading = true;
  
    var selectedDataVal = this.formTripExpMaster.getRawValue();
    this.formSubmitted = true;
    this.tripExpTypeMasterModel.expId = this.selectedTripExpMasterDetails.expId ;
    this.tripExpTypeMasterModel.expDesc  = selectedDataVal.expDesc.toString().toUpperCase();
    this.tripExpTypeMasterModel.loggedInUser  = this.loggedInUserID;
  
    this.tripExpTypeMasterService.checkTripExpTypeMasterSubmitted(this.tripExpTypeMasterModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formTripExpMaster.reset();
        this.route.navigate(['/tripexpmasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
    this.sharedService.loading = false;
  }
  }
  
  
  
  
  