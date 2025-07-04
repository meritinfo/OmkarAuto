import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Classificationmastermodel } from 'src/app/models/classificationmastermodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { ClassificationMasterService } from 'src/app/services/classificationmaster.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-classificationmasteradd',
  templateUrl: './classificationmasteradd.component.html',
  styleUrls: ['./classificationmasteradd.component.css']
})
export class ClassificationmasteraddComponent {
  loggedInUserID: string = '';
  formClassificationMaster!: FormGroup;
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
  selectedClassificationMasterDetails = new Classificationmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private classificationModel: Classificationmastermodel, 
    private classificationmasterService: ClassificationMasterService, 
    private commonService: CommonService,private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.classificationModel = new Classificationmastermodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Classification Master");
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

    this.selectedClassificationMasterDetails = this.classificationmasterService.getClassificationMasterDetails();
    this.formClassificationMaster = this.formBuilder.group({   
      classDesc: new FormControl('',[Validators.required, Validators.minLength(2)]),
      isActive: new FormControl('Y',[Validators.required]),
    });

    if (this.selectedClassificationMasterDetails.classId != '') {
      this.formClassificationMaster.patchValue(this.selectedClassificationMasterDetails); 
      this.formClassificationMaster.controls["classDesc"].disable();
      this.editMode = true;
    }
    
    this.sharedService.loading = false;

  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formClassificationMaster.controls; }

    
  chkClassDuplicate(){
    var selectedData = this.formClassificationMaster.getRawValue();   
    this.requestmodel.strRequest = selectedData.classDesc;
    this.classificationmasterService.checkDuplicateClass(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formClassificationMaster.patchValue({
          classDesc: ''
           });
        
      }
    });      
  }
  exit(): void {
    this.route.navigate(['/classmasterlist']);
  }

  deleteClassificationMasterForm(): void {
    if(this.selectedClassificationMasterDetails.classId != '' ){
     this.requestmodel.strRequest =this.selectedClassificationMasterDetails.classId
      if (confirm("Are you sure, you want to delete this?")) {
            this.classificationmasterService.classificationMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formClassificationMaster.reset();
              this.route.navigate(['/classmasterlist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }


  //Submit user form details //
  submitClassificationMasterForm(): void {  
    if (this.formClassificationMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formClassificationMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
      
    this.sharedService.loading = true;
    this.formSubmitted = true;
    var selectedDataVal = this.formClassificationMaster.getRawValue();
    this.formSubmitted = true;
    this.classificationModel.classId = this.selectedClassificationMasterDetails.classId ;
    this.classificationModel.classDesc  = selectedDataVal.classDesc.toString().toUpperCase();
    this.classificationModel.isActive = selectedDataVal.isActive.toString().toUpperCase();
      
    this.classificationmasterService.classificationmasterSubmitted(this.classificationModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formClassificationMaster.reset();
        this.route.navigate(['/classmasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });
    this.sharedService.loading = false;
  }
}


