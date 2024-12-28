
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


@Component({
  selector: 'app-panwisetdsrateadd',
  templateUrl: './panwisetdsrateadd.component.html',
  styleUrls: ['./panwisetdsrateadd.component.css']
})
export class PanwisetdsrateaddComponent {
  loggedInUserID: string = '';
  formPanMaster!: FormGroup;
  formSubmitted = false;
  editMode = false;
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  minDate:string = '';
  mDate:string = '';
  maxDate: string = '';

  fromDate: string = '';
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
  const today = new Date();
  const today2 = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  today.setMonth(month - 12);
  today2.setMonth(month - 2);
  this.fromDate = today.toLocaleDateString('en-CA').toString();

  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = this.commonService.getCurrentFiscalYear(this.loginDate).eDate.toLocaleDateString('en-CA').toString();
 
 //this.maxDate = today2.toLocaleDateString('en-CA').toString();

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
    panNo : new FormControl('',[Validators.required]),
    ownerName : new FormControl('', [Validators.required]),
   // validFrom : new FormControl(this.minDate, [Validators.required]),
   validFrom : new FormControl(this.loginDate, [Validators.required]),
    validUpto : new FormControl(this.maxDate , [Validators.required]),
    tdsRate  : new FormControl('', [Validators.required]),
    tdsCertUpload   : new FormControl('', ),
    isActive : new FormControl('Y', [Validators.required]),
  });
 // this.formPanMaster.controls['age'].disable(); 

  if (this.selectedPanRateDetails.rateid != '') {
 
    //const objectURL = URL.createObjectURL(this.convertDataUrlToBlob('upload/driver/driverphoto/' + this.selectedDriverMasterDetails.drPhoto));

    this.uploadedDrLic = Constants.UploadFolderPath + 'panwise/' + this.selectedPanRateDetails.tdsCertUpload;
   
  
    //this.driverPhotoPreview = this.selectedDriverMasterDetails.drPhoto;
    this.formPanMaster.patchValue(this.selectedPanRateDetails);
    this.formPanMaster.patchValue({
      validFrom: this.commonService.formatDate(this.selectedPanRateDetails.validFrom),
      validUpto: this.commonService.formatDate(this.selectedPanRateDetails.validUpto),
   
    })
    this.formPanMaster.controls['panNo'].disable();
    this.editMode = true;
  }
}
// convenience getter for easy access to contact form fields
get f() { return this.formPanMaster.controls; }

// Convert file to base64 string



// chkDriverDupli(e: any) { 
//   if (this.selectedDriverMasterDetails.driverMasterID == "")
//   {      
//     this.requestmodel.strRequest = e.target.value; 
//     this.drivermasterService.chkDriverDupli(this.requestmodel).subscribe((res: Responsemodel) => {
//       this.responseDetails = res;
//       if (!this.responseDetails.status) {
//         this.toasterService.warning(this.responseDetails.message);
//         this.formDriverMaster.patchValue({
//           driverName: ''
//         });
//       }
//     });
//   }
// }
checkDate(){
  var selectedDataVal = this.formPanMaster.getRawValue();
 this.mDate = selectedDataVal.validUpto;
  
  
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
    this.toasterService.warning("Please Enter Mandatory Fields ");
    const controls = this.formPanMaster.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");
      }
    }
    return;
  }
  var selectedDataVal = this.formPanMaster.getRawValue();
  if(selectedDataVal.validFrom ==selectedDataVal.validUpto){
    this.toasterService.warning( "validFrom and validdate can't be the same");
    return;
  }
  // if(selectedDataVal.panNo.length! = 10){
  //   this.toasterService.warning( "Pan No Is invalid !Please Enter Minimum 10 Char. Pan no");
  //   return;
  // }

  this.formSubmitted = true;
  var selectedDataVal = this.formPanMaster.getRawValue()
  this.panrateModel.rateid = this.selectedPanRateDetails.rateid;
  this.panrateModel.panNo = selectedDataVal.panNo.toString().toUpperCase();
  this.panrateModel.ownerName = selectedDataVal.ownerName.toString().toUpperCase();;
  this.panrateModel.validFrom = selectedDataVal.validFrom;
  this.panrateModel.validUpto = selectedDataVal.validUpto;
  this.panrateModel.tdsRate = selectedDataVal.tdsRate.toString();
  this.panrateModel.yearId=this.year;
  
  this.panrateModel.isActive = selectedDataVal.isActive;

  //this.driverModel.removedYN = selectedDataVal.removedYN ? selectedDataVal.removedYN : 'N';

  this.panrateModel.loggedInUser = this.loggedInUserID;

  

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

