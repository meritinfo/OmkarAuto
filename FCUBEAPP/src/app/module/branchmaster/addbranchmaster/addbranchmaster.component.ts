import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { BranchMasterService } from 'src/app/services/branchmaster.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-addbranchmaster',
  templateUrl: './addbranchmaster.component.html',
  styleUrls: ['./addbranchmaster.component.css']
})
export class AddbranchmasterComponent {
  loggedInUserID: string = '';
  formBranchMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  accountList: Dropdownmodel[] = [];

  List: Dropdownmodel[] = [];
  selectedBranchMasterDetails = new Branchmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private branchModel: Branchmodel, private branchmasterService: BranchMasterService, 
    private commonService: CommonService,private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.branchModel = new Branchmodel();
    
  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Create Branches");
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

    this.sharedService.loading = true;

    this.getBranchList();
    this.getStateList();
    this.getAccountList();

    this.selectedBranchMasterDetails = this.branchmasterService.getBranchMasterDetails();

    this.formBranchMaster = this.formBuilder.group({
      code: new FormControl('',[Validators.required,Validators.minLength(2)]),
      userBranch: new FormControl('',[Validators.required,Validators.minLength(2)]),
      zoneCode: new FormControl('',[Validators.required]),
      address1: new FormControl('',[Validators.required,Validators.minLength(2)]),
      address2: new FormControl('',[Validators.required,Validators.minLength(2)]),
      address3: new FormControl('',),
      city: new FormControl('',[Validators.required,Validators.minLength(2)]),
      stateCode: new FormControl('',[Validators.required]),
      pinCode: new FormControl('',[Validators.required]),
      offPhone1: new FormControl('',[Validators.required]),
      offPhone2: new FormControl('',),
      mobileNo: new FormControl('',[Validators.required,]),
      branchEmail: new FormControl('',),
      managerName: new FormControl('',[Validators.required,Validators.minLength(2)]),
      managerMobileNo: new FormControl('',[Validators.required]),
      managerPhone: new FormControl('',),
      managerEmail: new FormControl('',),
      gstNo: new FormControl('',),
      entryLockDays: new FormControl('',),   
      rcM_GstNo : new FormControl('',),     
      znNumCode:new FormControl('',),
      brNumCode:new FormControl('',),
      docNumCode:new FormControl('',),
      branchAcLedger: new FormControl('',),     
    });
    this.formBranchMaster.controls['docNumCode'].disable();   

    if (this.selectedBranchMasterDetails.centreid != '') {
      this.formBranchMaster.patchValue(this.selectedBranchMasterDetails);
      this.formBranchMaster.patchValue({
        userBranch: this.selectedBranchMasterDetails.centreName,
        stateCode: this.selectedBranchMasterDetails.stateCode,
      })      
      this.formBranchMaster.controls['code'].disable();     
      this.editMode = true;
    }
    
    this.sharedService.loading = false;

  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formBranchMaster.controls; }

  //Get Branch List details //
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getStateList(): void {
    this.commonService.getStateList().subscribe((res) => {
      this.stateList = res;
    });
  }
  
  getAccountList(): void {    
    this.requestmodel.strRequest= "T";
    this.commonService.getAccountList(this.requestmodel).subscribe((res) => {
      this.accountList = res;
    });
  }

  onChange(){
    var selectedData = this.formBranchMaster.getRawValue();
    if (selectedData.znNumCode != "" && selectedData.brNumCode != "")
    {  
      this.formBranchMaster.patchValue({
        docNumCode: selectedData.znNumCode.toString() + selectedData.brNumCode.toString()
      });
    }
  }

  
  chkCodeExits(e: any) { 
    if (this.selectedBranchMasterDetails.centreid == "")
    {      
      this.sharedService.loading = true;
      this.requestmodel.strRequest = e.target.value; 
      this.branchmasterService.chkCodeExits(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (!this.responseDetails.status) {
          this.toasterService.warning(this.responseDetails.message);
          this.formBranchMaster.patchValue({
            code: ''
          });
        }
      });
      this.sharedService.loading = false;
    }
  }

  chkBranchNameExits(e: any) { 
    if (this.selectedBranchMasterDetails.centreid == "")
    {      
      this.sharedService.loading = true;
      this.requestmodel.strRequest = e.target.value; 
      this.branchmasterService.chkBranchNameExits(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (!this.responseDetails.status) {
          this.toasterService.warning(this.responseDetails.message);
          this.formBranchMaster.patchValue({
            userBranch: ''
          });
        }
      });
      this.sharedService.loading = false;
    }
  }

  deleteBranchMasterForm(): void {
    if(this.selectedBranchMasterDetails.centreid != '' ){      
      this.sharedService.loading = true;
      this.requestmodel.strRequest =this.selectedBranchMasterDetails.centreid
      if (confirm("Are you sure, you want to delete this?")) {
            this.branchmasterService.branchMasterDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formBranchMaster.reset();
              this.route.navigate(['/branchmasterlist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }    
        });
      }      
      this.sharedService.loading = false;
    }
  }
  exit(): void {
    this.route.navigate(['/branchmasterlist']);
  }


  //Submit user form details //
  submitBranchMasterForm(): void {  
    if (this.formBranchMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formBranchMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
      
    this.sharedService.loading = true;

    var selectedDataVal = this.formBranchMaster.getRawValue();
    this.formSubmitted = true;
    this.branchModel.centreid = this.selectedBranchMasterDetails.centreid ;
    this.branchModel.code             = selectedDataVal.code.toString().toUpperCase();
    this.branchModel.centreName       = selectedDataVal.userBranch.toString().toUpperCase();
    this.branchModel.zoneCode         = selectedDataVal.zoneCode.toString().toUpperCase();
    this.branchModel.address1         = selectedDataVal.address1.toString().toUpperCase();
    this.branchModel.address2         = selectedDataVal.address2.toString().toUpperCase();
    this.branchModel.address3         = selectedDataVal.address3.toString().toUpperCase();
    this.branchModel.city             = selectedDataVal.city.toString().toUpperCase();
    this.branchModel.stateCode        = selectedDataVal.stateCode.toString().toUpperCase();
    this.branchModel.pinCode          = selectedDataVal.pinCode;
    this.branchModel.offPhone1        = selectedDataVal.offPhone1;
    this.branchModel.offPhone2        = selectedDataVal.offPhone2;
    this.branchModel.mobileNo         = selectedDataVal.mobileNo;
    this.branchModel.branchEmail      = selectedDataVal.branchEmail;
    this.branchModel.managerName      = selectedDataVal.managerName.toString().toUpperCase();
    this.branchModel.managerMobileNo  = selectedDataVal.managerMobileNo;
    this.branchModel.managerPhone     = selectedDataVal.managerPhone;
    this.branchModel.managerEmail     = selectedDataVal.managerEmail;
    this.branchModel.gstNo            = selectedDataVal.gstNo.toString().toUpperCase();
    this.branchModel.entryLockDays    = selectedDataVal.entryLockDays.toString();
    this.branchModel.znNumCode        = selectedDataVal.znNumCode.toString();
    this.branchModel.brNumCode        = selectedDataVal.brNumCode.toString();
    this.branchModel.docNumCode       = selectedDataVal.docNumCode.toString();
    this.branchModel.rcM_GstNo        = selectedDataVal.rcM_GstNo.toString();
    this.branchModel.branchAcLedger   = selectedDataVal.branchAcLedger.toString();
    this.branchModel.loggedInUserID   = this.loggedInUserID;

  
    this.branchmasterService.branchMasterDetailsSubmitted(this.branchModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formBranchMaster.reset();
        this.route.navigate(['/branchmasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
    this.sharedService.loading = false;
  }
}


