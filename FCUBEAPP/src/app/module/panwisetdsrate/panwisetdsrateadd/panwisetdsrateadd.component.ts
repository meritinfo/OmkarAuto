
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { Drivermodel } from 'src/app/models/drivermodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { DrivermasterService } from 'src/app/services/drivermaster.service';
import { Panwisetdsratelistmodel } from 'src/app/models/panwisetdsratelistmodel';
import { Panwisetdsratemodel } from 'src/app/models/panwisetdsratemodel';
import { PanwisetdsrateService } from 'src/app/services/panwisetdsrate.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-panwisetdsrateadd',
  templateUrl: './panwisetdsrateadd.component.html',
  styleUrls: ['./panwisetdsrateadd.component.css']
})
export class PanwisetdsrateaddComponent {
  loggedInUserID: string = '';
  formPanMaster!: FormGroup;
  formSubmitted = false;
  editMode      = false;
  year          : string = '';
  branch        : string = '';
  loginDate     : string = '';
  createStatus  = false;
  editStatus    = false;
  deleteStatus  = false;
  viewStatus    = false; 
  dashboard     : string ="";
  minDate       :string = '';
  minDt         :string = '';
  mDate         :string = '';
  maxDate       : string = '';
  fromDate      : string = '';
  responseDetails = new Responsemodel();
  selectedPanRateDetails = new Panwisetdsratemodel();
  driverPhotoData: [] = [];
  driverPhotoPreview: any;
  uploadedDrLic: string = "";

  @ViewChild('drivingLicenseInput', {
    static: true
  }) drivingLicenseInput: any;
  

  constructor(private route: Router, private formBuilder: FormBuilder,
    private panrateModel: Panwisetdsratemodel, private panwisetdsrateService: PanwisetdsrateService,
    private commonService: CommonService,
    private sharedService : SharedService,
    private toasterService: ToastrService, private requestmodel: Requestmodel) {
    this.panrateModel = new Panwisetdsratemodel();
  }

 ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "PAN wise TDS Rates"));
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }
  var userData = sessionStorage.getItem('userBranch')?.toString();
  if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
    this.branch = userData;
  }
  else {
    this.route.navigate(['/']);
  }
  var yearIDData = sessionStorage.getItem('yearID')?.toString();
  if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
    this.year = yearIDData;
  }
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }
      
  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
  
  this.fromDate = this.minDate ;
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

  this.selectedPanRateDetails = this.panwisetdsrateService.getPanwisetdsrateDetails();
  this.formPanMaster = this.formBuilder.group({
    panNo         : new FormControl('',[Validators.required]),
    ownerName     : new FormControl('', [Validators.required]),
    validFrom     : new FormControl(this.loginDate, [Validators.required]),
    validUpto     : new FormControl(this.maxDate , [Validators.required]),
    tdsRate       : new FormControl('', [Validators.required]),
    tdsCertUpload : new FormControl('', ),
    isActive      : new FormControl('Y', [Validators.required]),
  });
  this.formPanMaster.controls['isActive'].disable(); 

  if (this.selectedPanRateDetails.rateid != '') {
    this.uploadedDrLic = Constants.UploadFolderPath + 'panwise/' + this.selectedPanRateDetails.tdsCertUpload;
    this.formPanMaster.patchValue(this.selectedPanRateDetails);
    this.formPanMaster.patchValue({
    validFrom: this.commonService.formatDate(this.selectedPanRateDetails.validFrom),
    validUpto: this.commonService.formatDate(this.selectedPanRateDetails.validUpto),
    })
    this.formPanMaster.controls['panNo'].disable();
    this.formPanMaster.controls['isActive'].enable(); 
    this.editMode = true;
  }
 }
// convenience getter for easy access to contact form fields
get f() { return this.formPanMaster.controls; }


checkDate(){
  var selectedDataVal = this.formPanMaster.getRawValue();
 this.mDate = selectedDataVal.validUpto;

}

dateChange(){
   var selectedDataVal = this.formPanMaster.getRawValue();
   this.minDt = selectedDataVal.validFrom;

}
checkPan(){

}

deletePanWiseForm(): void {
  if (this.selectedPanRateDetails.rateid != '') {
    this.requestmodel.strRequest = this.selectedPanRateDetails.rateid
    if (confirm("Are you sure, you want to delete this?")) {
      this.panwisetdsrateService.PanwisetdsrateDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if(this.responseDetails.status){
          this.toasterService.success(this.responseDetails.message);
          this.formPanMaster.reset();
          this.route.navigate(['/panwisetdsrate']);
        }
        else{
          this.toasterService.warning(this.responseDetails.message);        
        }   
      });
    }
  }
}

chkDriverDupli() { 
  if (this.selectedPanRateDetails.rateid == "")
  {  
    var selectedData = this.formPanMaster.getRawValue();   
    var pan = selectedData.panNo ;
    var regexp = new RegExp('^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$')
    var test = regexp.test(pan);
    var tdsPct = 0;
 if(pan.length!=10){
      this.toasterService.warning("PAN No should be 10 characters...!");
      this.formPanMaster.patchValue({
        panNo: ''
      });
      return;
    }
    else if(!test){
      this.toasterService.warning("Invalid PAN No...!");
       this.formPanMaster.patchValue({
        panNo: ''
      });
      return;
    }
    this.requestmodel.strRequest = selectedData.panNo; 
    this.requestmodel.strRequest1= this.year;
    this.panwisetdsrateService.chkPanDupli(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (!this.responseDetails.status) {
        this.toasterService.warning(this.responseDetails.message);
        this.formPanMaster.patchValue({
          panNo: ''
        });
      }
    });
  }
}


exit(): void {
  this.route.navigate(['/panwisetdsrate']);
}

 submitPanWiseForm() {
 if (this.formPanMaster.invalid) {
  this.toasterService.warning("Please enter mandatory fields");

  const controls = this.formPanMaster.controls;
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
  this.formSubmitted = true;
  var selectedDataVal = this.formPanMaster.getRawValue()
  this.panrateModel.rateid = this.selectedPanRateDetails.rateid;
  this.panrateModel.panNo = selectedDataVal.panNo.toString().toUpperCase();
  this.panrateModel.ownerName = selectedDataVal.ownerName.toString().toUpperCase();
  this.panrateModel.validFrom = selectedDataVal.validFrom;
  this.panrateModel.validUpto = selectedDataVal.validUpto;
  this.panrateModel.tdsRate = selectedDataVal.tdsRate.toString();
  this.panrateModel.yearId=this.year;
  this.panrateModel.isActive = selectedDataVal.isActive;
  this.panrateModel.loggedInUser = this.loggedInUserID;
  let d1 = new Date(this.panrateModel.validUpto);
  let d2 = new Date(this.panrateModel.validFrom);
    if (d1 < d2) {
    this.toasterService.warning("End date should be greater than Start date");
    this.sharedService.loading=false;
    return;
    } 
  let formData = new FormData();
  formData.append('tdsCertUpload', this.drivingLicenseInput.nativeElement.files[0]);
  formData.append('datadetails', JSON.stringify(this.panrateModel));
  this.panwisetdsrateService.PanwisetdsrateSubmitted(formData).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formPanMaster.reset();
      this.route.navigate(['/panwisetdsrate']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }
  });
 }
}

