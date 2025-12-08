import { Component } from '@angular/core';



import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Lrbillseriesmodel } from 'src/app/models/lrbillseriesmodel';
import { Lrbillserieslistmodel  } from 'src/app/models/lrbillserieslistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';

import { LRBillSeriesService } from 'src/app/services/lrbillseries.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addlrbillseries',
  templateUrl: './addlrbillseries.component.html',
  styleUrls: ['./addlrbillseries.component.css']
})
export class AddlrbillseriesComponent {
  loggedInUserID: string = '';
    amount: string = '';
    maxDate: string = '';
    minDate: string = '';
    loginDate: string = '';
    branch: string = '';
    year: string = '';
    ptype: string = '';
    trip: string = '';
    formUser!: FormGroup;
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
    billTypesList: Dropdownmodel[] = [];
    creditacList: Dropdownmodel[] = [];
    creditAcList: Dropdownmodel[] = [];
    vehicleList: Dropdownmodel[] = [];
    newList: Dropdownmodel[] = [];
    locationList: Dropdownmodel[] = [];

  selectedlrbillSeriesDetails = new Lrbillseriesmodel();


     constructor(private route: Router, private formBuilder: FormBuilder, 
      private lrbillSeriesModel: Lrbillseriesmodel, private lrbillseriesService: LRBillSeriesService,
          private commonService: CommonService, private toasterService: ToastrService,

          private sharedService: SharedService,private requestmodel:Requestmodel) {
            this.lrbillSeriesModel = new Lrbillseriesmodel();


}
ngOnInit(): void {
  this.sharedService.loading = true;
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((( aa: { menuName: string; }) => aa.menuName === "LR Bill Series Master"));
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
  
  this.getBranchList();  
  this.getBillTypesList();
 // this.getVehicleNoList();
 // this.getLocationList();
  
  this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
  console.log(this.maxDate);


  this.selectedlrbillSeriesDetails = this.lrbillseriesService.getLrbillSeriesDetails();
  this.formUser = this.formBuilder.group({
    seriesCode: new FormControl('',[Validators.required]),
    lR_Bill_type: new FormControl('',[Validators.required]),
    branchCode: new FormControl('',[Validators.required]),
    isActive: new FormControl('Y',[Validators.required]),
  

  });

  setTimeout(() => {
    this.createmode = true;
   // this.formTripPayment.controls['pmtBranch'].disable();
   if (this.selectedlrbillSeriesDetails.seriesId != '') {
    this.formUser.patchValue(this.selectedlrbillSeriesDetails);
    this.formUser.patchValue({
     // lr_Bill_type: this.selectedlrbillSeriesDetails.lr_Bill_type,
     
      
    })
  
      
       this.editMode = true;
  
     }  
   }, 2000);
   this.sharedService.loading = false;
  if (this.selectedlrbillSeriesDetails.seriesId != '') {
    this.formUser.patchValue(this.selectedlrbillSeriesDetails);
    this.formUser.patchValue({
     // lR_Bill_type: this.selectedlrbillSeriesDetails.lR_Bill_type,
     
      
    })
  }


  
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }

getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}

getBillTypesList(): void {
  this.commonService.getBillTypesList().subscribe((res) => {
    this.billTypesList = res;
  }); 
}

billseriesDelete(): void {    
  if(this.selectedlrbillSeriesDetails.seriesId != '' ){
  this.requestmodel.strRequest =this.selectedlrbillSeriesDetails.seriesId
    if (confirm("Are you sure, you want to delete this?")) {
          this.lrbillseriesService.billSeriesDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/lrbillseriesmaster']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
      });
    }
  }
}
exit(): void {
  this.route.navigate(['/lrbillseriesmaster']);
}

checkDuplicateDesc(){
  var selectedData = this.formUser.getRawValue();  
    this.requestmodel.strRequest = selectedData.seriesCode;
    this.requestmodel.strRequest1 = selectedData.lR_Bill_type;
    this.lrbillseriesService.checkDuplicateDesc(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          seriesCode: ''  
        });
        
      }
    });
    
}

//Submit user form details //
submitLRBIllSeriesForm(): void {
  this.formSubmitted = true;
if (this.formUser.invalid) {
  this.toasterService.warning("Please enter mandatory fields");

  const controls = this.formUser.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      // Convert camelCase key to readable format
      const readableName = name.replace(/([A-Z])/g, ' $1');
      const titleCaseName = readableName.charAt(0).toUpperCase() + readableName.slice(1);

      this.toasterService.warning(titleCaseName + " field is invalid");
    }
  }

  return;
}
  var selectedDataVal = this.formUser.getRawValue()
  this.lrbillSeriesModel.seriesId = this.selectedlrbillSeriesDetails.seriesId ;
  this.lrbillSeriesModel.seriesCode= selectedDataVal.seriesCode.toUpperCase().toString();
  this.lrbillSeriesModel.lR_Bill_type = selectedDataVal.lR_Bill_type;
  this.lrbillSeriesModel.branchCode= selectedDataVal.branchCode;
  this.lrbillSeriesModel.isActive= selectedDataVal.isActive;

  


  this.lrbillseriesService.LrbillseriesDetailsSubmitted(this.lrbillSeriesModel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/lrbillseriesmaster']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
}
}
