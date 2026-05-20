import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Fleetgodownmastermodel  } from 'src/app/models/fleetgodownmastermodel';
import { FleetgodownmasterService } from 'src/app/services/fleetgodownmaster.service';
import { FleetgroupmasterService } from 'src/app/services/fleetgroupmaster.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';


@Component({
  selector: 'app-fleetgodownmasteradd',
  templateUrl: './fleetgodownmasteradd.component.html',
  styleUrls: ['./fleetgodownmasteradd.component.css']
})
export class FleetgodownmasteraddComponent {
  loggedInUserID : string = '';
  userlogindate  :string="";
  formFleetGoDownMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  branchList       : Dropdownmodel[]   = [];
  
  responseDetails = new Responsemodel();

  selectedFleetgodownmastermodel= new Fleetgodownmastermodel();

    constructor(private route: Router, 
      private formBuilder: FormBuilder, 
      private fleetgodownmastermodel: Fleetgodownmastermodel,
      private sharedService: SharedService,
      private fleetgroupmasterService: FleetgroupmasterService,
      private fleetgodownmasterService: FleetgodownmasterService,
      private commonService: CommonService, 
      private requestmodel:Requestmodel,
      private toasterService: ToastrService) {
      this.fleetgodownmastermodel = new Fleetgodownmastermodel();
    }
  ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Fleet Godown Master");
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
    
    this.formFleetGoDownMaster = this.formBuilder.group({    
      godownId         : new FormControl('',),
      godownShortCode  : new FormControl('',[Validators.required]),
      godownDesc       : new FormControl('',[Validators.required]),
      controllingBranch: new FormControl('',[Validators.required]),
      godownAddress    : new FormControl('',),
      godownIncharge   : new FormControl('',),
      inchargeMobile   : new FormControl('',),
      isActive         : new FormControl('Y'),
    });    
    this.sharedService.loading = true;
    this.selectedFleetgodownmastermodel = this.fleetgodownmasterService.getGoDownMasterDetails(); 
    this.getBranchList();
    setTimeout(() => {
      if (this.selectedFleetgodownmastermodel.godownId != '') {
          this.formFleetGoDownMaster.patchValue(this.selectedFleetgodownmastermodel);   
          this.editMode=true;           
      }
    }, 2000);
    
    this.sharedService.loading = false;
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formFleetGoDownMaster.controls; }

  exit(): void {
    this.route.navigate(['/fltgodownlist']);
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  checkDuplicateGodownShortCode() {
    var selectedData = this.formFleetGoDownMaster.getRawValue();
    this.requestmodel.strRequest = selectedData.godownShortCode;
    this.fleetgodownmasterService.checkDuplicateGodownShortCode(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (!this.responseDetails.status) {
        this.toasterService.warning(this.responseDetails.message);
        this.formFleetGoDownMaster.patchValue({
          godownShortCode: ''
        });
      }
    });
  }

    checkDuplicateGodownDesc() {
    var selectedData = this.formFleetGoDownMaster.getRawValue();
    this.requestmodel.strRequest = selectedData.godownDesc;
    this.fleetgodownmasterService.checkDuplicateGodownDesc(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (!this.responseDetails.status) {
        this.toasterService.warning(this.responseDetails.message);
        this.formFleetGoDownMaster.patchValue({
          godownDesc: ''
        });
      }
    });
  }



    deleteFinAccountMasterForm(): void {
      if(this.selectedFleetgodownmastermodel.godownId != '' ){
        this.sharedService.loading = true;
       this.requestmodel.strRequest =this.selectedFleetgodownmastermodel.godownId
        if (confirm("Are you sure, you want to delete this?")) {
              this.fleetgodownmasterService.fleetGodownMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
              this.responseDetails = res;
              if (this.responseDetails.status){              
                console.log(this.responseDetails.message);
                this.formFleetGoDownMaster.reset();
                this.route.navigate(['/fltgodownlist']);
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
    if (this.formFleetGoDownMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formFleetGoDownMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }          
      return;
    }
    var selectedDataValue                         = this.formFleetGoDownMaster.getRawValue();
    this.sharedService.loading                    = true;
    this.formSubmitted                            = true;
    this.fleetgodownmastermodel.godownId          = this.selectedFleetgodownmastermodel.godownId;
    this.fleetgodownmastermodel.godownShortCode   = selectedDataValue.godownShortCode.toString().toUpperCase();
    this.fleetgodownmastermodel.godownDesc        = selectedDataValue.godownDesc.toString().toUpperCase();
    this.fleetgodownmastermodel.godownAddress     = selectedDataValue.godownAddress.toString().toUpperCase();
    this.fleetgodownmastermodel.controllingBranch = selectedDataValue.controllingBranch.toString();
    this.fleetgodownmastermodel.godownIncharge    = selectedDataValue.godownIncharge.toString().toUpperCase();
    this.fleetgodownmastermodel.inchargeMobile    = selectedDataValue.inchargeMobile.toString();
    this.fleetgodownmastermodel.isActive          = selectedDataValue.isActive.toString().toUpperCase();
    this.fleetgodownmastermodel.loggedInUser      = this.loggedInUserID;
    this.fleetgodownmasterService.fleetGodownMaserSave(this.fleetgodownmastermodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formFleetGoDownMaster.reset();
        this.route.navigate(['/fltgodownlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    this.sharedService.loading = false;
  }
}