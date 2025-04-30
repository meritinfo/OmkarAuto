import { Component } from '@angular/core';


import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChcosttypesModel } from 'src/app/models/chcosttypesmodel';
import { Chcosttypeslistmodel   } from 'src/app/models/chcosttypeslistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Freightgstmastermodel } from 'src/app/models/freightgstmastermodel';
import { Freightgstmasterlistmodel   } from 'src/app/models/freightgstmasterlistmodel';

import { FreightGstMasterService } from 'src/app/services/freightgstmaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-freightgstmasteradd',
  templateUrl: './freightgstmasteradd.component.html',
  styleUrls: ['./freightgstmasteradd.component.css']
})
export class FreightgstmasteraddComponent {
   loggedInUserID: string = '';
      amount: string = '';
      maxDate: string = '';
      minDate: string = '';
      loginDate: string = '';
      branch: string = '';
      year: string = '';
      ptype: string = '';
      trip: string = '';
      formChCost!: FormGroup;
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
      creditacList: Dropdownmodel[] = [];
      creditAcList: Dropdownmodel[] = [];
      vehicleList: Dropdownmodel[] = [];
      newList: Dropdownmodel[] = [];
      locationList: Dropdownmodel[] = [];
    
    
      selectedFreightGstMasterDetails = new Freightgstmastermodel();
    
      constructor(private route: Router, private formBuilder: FormBuilder, 
        private freightgstmastermodel: Freightgstmastermodel, private freightGstMasterService: FreightGstMasterService, 
        private commonService: CommonService, private toasterService: ToastrService,
 
        private sharedService: SharedService,private requestmodel:Requestmodel) {
        this.freightgstmastermodel = new Freightgstmastermodel();
  

}
ngOnInit(): void {
  this.sharedService.loading = true;
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((( aa: { menuName: string; }) => aa.menuName === "Freight GST Master"));
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
  
 // this.getBranchList();   
 // this.getVehicleNoList();
 // this.getLocationList();
  
  this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
  console.log(this.maxDate);

  this.selectedFreightGstMasterDetails = this.freightGstMasterService.getFreightGstMasterDetails();

  this.formChCost = this.formBuilder.group({
    freightDesc: new FormControl('' ,[Validators.required] ),
    sacCode: new FormControl('' , [Validators.required]),
    sgstPct: new FormControl('',[Validators.required] ),
    cgstPct: new FormControl('',[Validators.required] ),
    igstPct: new FormControl('',[Validators.required] ),
    linkColumn: new FormControl('',[Validators.required] ),
   // transType: new FormControl('', [Validators.required]),
   // amountPaid: new FormControl('', [Validators.required]),
  });
  setTimeout(() => {
    this.createmode = true;
   // this.formTripPayment.controls['pmtBranch'].disable();
     if (this.selectedFreightGstMasterDetails.freightId != '') {
      // this.seriesDoc = this.selectedChCostTypeDetails.seriesDoc; 
       this.formChCost.patchValue(this.selectedFreightGstMasterDetails);
     
       this.formChCost.patchValue({
        // pmtDate:   this.commonService.formatDate(this.selectedChCostTypeDetails.pmtDate), 
        // chequeDate:  this.commonService.formatDate(this.selectedChCostTypeDetails.chequeDate), 
        // vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedTripPaymentsDetails.vehicleMasterID),
        // neftPmt:  ""
       })  
      
       this.editMode = true;
  
     }  
   }, 2000);
   this.sharedService.loading = false;
 }

 get f() { return this.formChCost.controls; }

 
 freightGstMasterDelete(): void {    
  if(this.selectedFreightGstMasterDetails.freightId != '' ){
  this.requestmodel.strRequest =this.selectedFreightGstMasterDetails.freightId
    if (confirm("Are you sure, you want to delete this?")) {
          this.freightGstMasterService.freightgstmasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formChCost.reset();
            this.route.navigate(['/freightgstmaster']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
      });
    }
  }
}

exit(): void {
  this.route.navigate(['/freightgstmaster']);
}

checkDuplicateDesc(){
  var selectedData = this.formChCost.getRawValue();  
    this.requestmodel.strRequest = selectedData.freightDesc;
  //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
    this.freightGstMasterService.checkDuplicateDesc(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formChCost.patchValue({
          freightDesc: ''  
        });
        
      }
    });
    
}
 
submitfreightGstForm(): void {  
  if (this.formChCost.invalid) {
    this.toasterService.warning("Please Enter Mandatory Fields ");   
    const controls = this.formChCost.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");   
      }
    }
    return;
  }
  var selectedDataValue = this.formChCost.getRawValue();
  
  
  
  this.formSubmitted = true; 
  this.freightgstmastermodel.freightId = this.selectedFreightGstMasterDetails.freightId ;
  this.freightgstmastermodel.freightDesc = selectedDataValue.freightDesc.toString().toUpperCase();;
  this.freightgstmastermodel.sacCode = selectedDataValue.sacCode;
  this.freightgstmastermodel.sgstPct = selectedDataValue.sgstPct.toString();
  this.freightgstmastermodel.cgstPct = selectedDataValue.cgstPct.toString();
  this.freightgstmastermodel.igstPct = selectedDataValue.igstPct.toString();
  this.freightgstmastermodel.linkColumn = selectedDataValue.linkColumn;
 // this.chcosttypesModel.vehicleMasterID = selectedDataValue.vehicleMasterID?selectedDataValue.vehicleMasterID.dataId:"";
//  this.trippaymentsmodel.amountPaid = selectedDataValue.amountPaid.toString();
 // this.trippaymentsmodel.remarks = selectedDataValue.remarks.toString().toUpperCase();

//  this.trippaymentsmodel.yearId = this.year;
  this.freightgstmastermodel.loggedInUser = this.loggedInUserID;

  this.freightGstMasterService.FreightGstMasterSubmitted(this.freightgstmastermodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formChCost.reset();
      this.route.navigate(['/freightgstmaster']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }
  });
}
}

