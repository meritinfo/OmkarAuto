import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tyremodelmastermodel } from 'src/app/models/tyremodelmastermodel';
import { TyreModelMasterService } from 'src/app/services/tyremodelmaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-tyremodeladd',
  templateUrl: './tyremodeladd.component.html',
  styleUrls: ['./tyremodeladd.component.css']
})

export class TyremodeladdComponent {
  loggedInUserID: string = '';
  formSparesMaster!: FormGroup;
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
  selectedTyreModelMasterDetails = new Tyremodelmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tyremodelMasterModel: Tyremodelmastermodel, 
    private tyreModelMasterService: TyreModelMasterService, 
    private commonService: CommonService,private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.tyremodelMasterModel = new Tyremodelmastermodel();
  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Tyre Model Master");
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

    this.selectedTyreModelMasterDetails = this.tyreModelMasterService.getTyreModelMasterDetails();
    this.formSparesMaster = this.formBuilder.group({   
      modelDesc: new FormControl('',[Validators.required]),  
      activeYN: new FormControl('Y',[Validators.required]),  
    });

    if (this.selectedTyreModelMasterDetails.tyreModID != '') {
      this.formSparesMaster.patchValue(this.selectedTyreModelMasterDetails);    
      this.editMode = true;
    }    
    this.sharedService.loading = false;
  }

  get f() { return this.formSparesMaster.controls; }

  chkTyreDuplicate(){
    var selectedData = this.formSparesMaster.getRawValue(); 
    this.requestmodel.strRequest = selectedData.modelDesc;
    //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
    this.tyreModelMasterService.checkDuplicateTyre(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formSparesMaster.patchValue({
          modelDesc: ''
  
        });        
      }
    });    
  }

  exit(): void {
    this.route.navigate(['/tyremodmasterlist']);
  }

  deleteTyreModelMasterForm(): void {
    if(this.selectedTyreModelMasterDetails.tyreModID != '' ){
    this.requestmodel.strRequest =this.selectedTyreModelMasterDetails.tyreModID
      if (confirm("Are you sure, you want to delete this?")) {
        this.tyreModelMasterService.tyreModelMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formSparesMaster.reset();
            this.route.navigate(['/tyremodmasterlist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }


  //Submit user form details //
  submitTyreModelMasterForm(): void {  
    if (this.formSparesMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formSparesMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
      
    this.sharedService.loading = true;
    this.formSubmitted = true;

    var selectedDataVal = this.formSparesMaster.getRawValue();
    this.tyremodelMasterModel.tyreModID = this.selectedTyreModelMasterDetails.tyreModID ;
    this.tyremodelMasterModel.modelDesc  = selectedDataVal.modelDesc.toString().toUpperCase();
    this.tyremodelMasterModel.activeYN = selectedDataVal.activeYN;
    this.tyremodelMasterModel.loggedInUser   = this.loggedInUserID;

    this.tyreModelMasterService.tyreModelMasterSubmitted(this.tyremodelMasterModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formSparesMaster.reset();
        this.route.navigate(['/tyremodmasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
    this.sharedService.loading = false;
  }
}
