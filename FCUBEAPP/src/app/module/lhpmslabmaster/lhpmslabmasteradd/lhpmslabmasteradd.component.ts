
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Lhpmslabmastermodel } from 'src/app/models/lhpmslabmastermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { LhpmSlabMasterService } from 'src/app/services/lhpmslabmaster.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-lhpmslabmasteradd',
  templateUrl: './lhpmslabmasteradd.component.html',
  styleUrls: ['./lhpmslabmasteradd.component.css']
})
export class LhpmslabmasteraddComponent {
  loggedInUserID: string = '';
  formLhpmMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  classificationList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  vehicalType: Dropdownmodel[] = [];

  List: Dropdownmodel[] = [];
  selectedLhpmSlabMasterDetails = new Lhpmslabmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private lhpmslabModel: Lhpmslabmastermodel, 
    private lhpmslabmasterService: LhpmSlabMasterService, 
    private commonService: CommonService,private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.lhpmslabModel = new Lhpmslabmastermodel();
  }


  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "LHPM Slab Master");
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

   // this.sharedService.loading = true;   

    this.selectedLhpmSlabMasterDetails = this.lhpmslabmasterService.getLhpmSlabMasterDetails();
    this.formLhpmMaster = this.formBuilder.group({   
      vehCode: new FormControl('', [Validators.required]),
      fromDt: new FormControl('',[Validators.required]),
      toDt: new FormControl('', [Validators.required]),
      hireFrom: new FormControl('',[Validators.required]),
      hireTo: new FormControl('',[Validators.required]),
      lhpmAmt: new FormControl('',[Validators.required]),
    });
    setTimeout(() => {
      this.getVehTypes();
    if (this.selectedLhpmSlabMasterDetails.lhpmSlabID != '') {
      this.formLhpmMaster.patchValue(this.selectedLhpmSlabMasterDetails); 
      this.formLhpmMaster.patchValue({ 
      fromDt: this.commonService.formatDate(this.selectedLhpmSlabMasterDetails.fromDt),
      toDt: this.commonService.formatDate(this.selectedLhpmSlabMasterDetails.toDt)  
      });
            
    this.editMode = true;


  } 

}, 2000);
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formLhpmMaster.controls; }
  exit(): void {
    this.route.navigate(['/lhpmslablist']);
  }
  getVehTypes(): void {
    this.commonService.getVehicleTypeGroupList().subscribe((res) => {
      this.vehicalType = res;
    });
  }

  deleteLhpmSlabMasterForm(): void {
    if(this.selectedLhpmSlabMasterDetails.lhpmSlabID != '' ){
     this.requestmodel.strRequest =this.selectedLhpmSlabMasterDetails.lhpmSlabID
      if (confirm("Are you sure, you want to delete this?")) {
            this.lhpmslabmasterService.LhpmSlabMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formLhpmMaster.reset();
              this.route.navigate(['/lhpmslablist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }


  //Submit user form details //
  submitLhpmSlabMasterForm(): void {  
    if (this.formLhpmMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formLhpmMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
      
    this.sharedService.loading = true;

    var selectedDataVal = this.formLhpmMaster.getRawValue();
    this.formSubmitted = true;
    this.lhpmslabModel.lhpmSlabID = this.selectedLhpmSlabMasterDetails.lhpmSlabID ;
    this.lhpmslabModel.vehCode  = selectedDataVal.vehCode;
    this.lhpmslabModel.fromDt = selectedDataVal.fromDt;
    this.lhpmslabModel.toDt = selectedDataVal.toDt;
    this.lhpmslabModel.hireFrom = selectedDataVal.hireFrom;
    this.lhpmslabModel.hireTo = selectedDataVal.hireTo;
    this.lhpmslabModel.lhpmAmt = selectedDataVal.lhpmAmt;
    this.lhpmslabModel.loggedInUser = selectedDataVal.loggedInUserID;
    //this.classificationModel.loggedInUserID   = this.loggedInUserID;
  
    this.lhpmslabmasterService.lhpmSlabMasterDetailsSubmitted(this.lhpmslabModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formLhpmMaster.reset();
        this.route.navigate(['/lhpmslablist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
    this.sharedService.loading = false;
  }
}


