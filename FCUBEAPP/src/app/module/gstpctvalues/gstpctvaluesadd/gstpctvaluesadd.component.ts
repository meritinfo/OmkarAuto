

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';
import { Drivermodel } from 'src/app/models/drivermodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Gstpctvaluesmodel  } from 'src/app/models/gstpctvaluesmodel';
import { Gstpctvalueslistmodel } from 'src/app/models/gstpctvalueslistmodel';
import { GstPctValuesService } from 'src/app/services/gstpctvalues.service';
import { PanwisetdsrateService } from 'src/app/services/panwisetdsrate.service';
import { Requestmodel } from 'src/app/models/requestmodel';


@Component({
  selector: 'app-gstpctvaluesadd',
  templateUrl: './gstpctvaluesadd.component.html',
  styleUrls: ['./gstpctvaluesadd.component.css']
})
export class GstpctvaluesaddComponent {
   loggedInUserID: string = '';
    formPctMaster!: FormGroup;
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
    selectedGstPctValuesDetails = new Gstpctvaluesmodel();
   

      constructor(private route: Router, private formBuilder: FormBuilder,
        private gstpctvaluesmodel: Gstpctvaluesmodel, private gstPctValuesService: GstPctValuesService,
        private commonService: CommonService,
        private toasterService: ToastrService, private requestmodel: Requestmodel) {
        this.gstpctvaluesmodel = new Gstpctvaluesmodel();

}

ngOnInit(): void {

  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Define GST Pct"));
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
  this.selectedGstPctValuesDetails = this.gstPctValuesService.getGstPctValuesDetails();
  this.formPctMaster = this.formBuilder.group({
    validFrom : new FormControl(this.loginDate,[Validators.required]),
    roadFrtGst : new FormControl('', []),
   // validFrom : new FormControl(this.minDate, [Validators.required]),
   railFrtGst : new FormControl('', ),
   coastalFrtGst : new FormControl('' ,[]),
   hamaliGst  : new FormControl('', []),
   detentionGst   : new FormControl('', ),
   otherChargesGst : new FormControl('', []),
  });
  //this.formPctMaster.controls['isActive'].disable(); 
  setTimeout(() => {
  if (this.selectedGstPctValuesDetails.id != '') {
 
  
  
    //this.driverPhotoPreview = this.selectedDriverMasterDetails.drPhoto;
    this.formPctMaster.patchValue(this.selectedGstPctValuesDetails);
    this.formPctMaster.patchValue({
      validFrom: this.commonService.formatDate(this.selectedGstPctValuesDetails.validFrom),
     // validUpto: this.commonService.formatDate(this.selectedPanRateDetails.validUpto),
   
    })
 //   this.formPanMaster.controls['panNo'].disable();
  //  this.formPanMaster.controls['isActive'].enable(); 
    this.editMode = true;
  }
}, 2000);

}
// convenience getter for easy access to contact form fields
get f() { return this.formPctMaster.controls; }

deleteGstPctDetailsForm(): void {
  if (this.selectedGstPctValuesDetails.id != '') {
    this.requestmodel.strRequest = this.selectedGstPctValuesDetails.id
    if (confirm("Are you sure, you want to delete this?")) {
      this.gstPctValuesService.gstGstPctValuesDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if(this.responseDetails.status){
          this.toasterService.success(this.responseDetails.message);
          this.formPctMaster.reset();
          this.route.navigate(['/definegstpct']);
        }
        else{
          this.toasterService.warning(this.responseDetails.message);        
        }   
      });
    }
  }
}
exit(): void {
  this.route.navigate(['/definegstpct']);
}

submitGstPctValuesForm() {
  if (this.formPctMaster.invalid) {
    this.toasterService.warning("Please Enter Mandatory Fields ");
    const controls = this.formPctMaster.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");
      }
    }
    return;
  }
  var selectedDataVal = this.formPctMaster.getRawValue();
  if(selectedDataVal.validFrom ==selectedDataVal.validUpto){
    this.toasterService.warning( "validFrom and validdate can't be the same");
    return;
  }
  // if(selectedDataVal.panNo.length! = 10){
  //   this.toasterService.warning( "Pan No Is invalid !Please Enter Minimum 10 Char. Pan no");
  //   return;
  // }

  this.formSubmitted = true;
  var selectedDataVal = this.formPctMaster.getRawValue()
  this.gstpctvaluesmodel.id = this.selectedGstPctValuesDetails.id;
  this.gstpctvaluesmodel.validFrom = selectedDataVal.validFrom;
  this.gstpctvaluesmodel.roadFrtGst = selectedDataVal.roadFrtGst.toString();
  this.gstpctvaluesmodel.railFrtGst = selectedDataVal.railFrtGst.toString();
  this.gstpctvaluesmodel.coastalFrtGst = selectedDataVal.coastalFrtGst.toString();
  this.gstpctvaluesmodel.hamaliGst = selectedDataVal.hamaliGst.toString();
  this.gstpctvaluesmodel.detentionGst= selectedDataVal.detentionGst.toString();
  this.gstpctvaluesmodel.otherChargesGst= selectedDataVal.otherChargesGst.toString();
  //this.driverModel.removedYN = selectedDataVal.removedYN ? selectedDataVal.removedYN : 'N';

  this.gstpctvaluesmodel.loggedInUser = this.loggedInUserID;

  

 
  this.gstPctValuesService.gstPurchageDetailsSubmitted(this.gstpctvaluesmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formPctMaster.reset();
      this.route.navigate(['/definegstpct']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }
  });
}
}
