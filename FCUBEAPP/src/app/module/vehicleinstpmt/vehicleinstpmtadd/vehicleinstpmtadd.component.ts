
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Vehicleinstpmtmodel } from 'src/app/models/vehicleinstpmtmodel';
import { CommonService } from 'src/app/services/common.service';
import { VehicleInstPmtService } from 'src/app/services/vehicleinstpmt.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';


@Component({
  selector: 'app-vehicleinstpmtadd',
  templateUrl: './vehicleinstpmtadd.component.html',
  styleUrls: ['./vehicleinstpmtadd.component.css']
})
export class VehicleinstpmtaddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  keywordLocation = 'dataName';
  stateList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  mainAcList: Dropdownmodel[] = [];
  
  branch: string = '';


  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;

  viewStatus = false;
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
 

  createmode = false;


  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;
  @ViewChild('attachmentInput1', {
    static: true
  }) attachmentInput1: any;
selectedVehicleInstPmtDetail = new Vehicleinstpmtmodel();

constructor(private route: Router, private formBuilder: FormBuilder, private vehicleinstpmtmodel: Vehicleinstpmtmodel, private vehicleInstPmtService: VehicleInstPmtService, private commonService: CommonService,private toastrService: ToastrService,private requestmodel:Requestmodel) {
  this.vehicleinstpmtmodel = new Vehicleinstpmtmodel();


}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Vehicle EMI Payment");
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
  var userData = sessionStorage.getItem('userBranch')?.toString();
  if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
    this.branch = userData;
  }
  else {
    this.route.navigate(['/']);
  }
  
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  today.setMonth(month - 10);
  
  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = new Date().toLocaleDateString('en-CA').toString();
  
  if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
    this.fromDate = this.minDate ;
  }
  else{
    this.fromDate = today.toLocaleDateString('en-CA').toString();
  }   
  

this.getBranchList();
this.getVehicleIdList();
this.getMainAcList();
this.selectedVehicleInstPmtDetail = this.vehicleInstPmtService.getVehicleInstPmtDetails();
this.formUser = this.formBuilder.group({
  //pmtId: new FormControl('',[Validators.required]),
  pmtDate: new FormControl(this.loginDate,[Validators.required]),
  branchCode: new FormControl(this.branch,[Validators.required]),
  vehicleMasterid: new FormControl('',[Validators.required]),
  instNo: new FormControl('',),
  instId: new FormControl('',),
 
  advPayable_1: new FormControl('',),
  priAmt: new FormControl('',),
  intAmt: new FormControl('',),
  totAmt: new FormControl('',),
  remarks: new FormControl('',),
  pmtType: new FormControl('',),
  neftYN: new FormControl('',),
  cheqNo: new FormControl('',),
  creditAc: new FormControl('',),
  cheqDate: new FormControl('',),
  findocid: new FormControl('',),
 

});
this.createmode = true;
setTimeout(() => {
if (this.selectedVehicleInstPmtDetail.pmtId != '') {
  this.editMode = true;
  this.formUser.patchValue(this.selectedVehicleInstPmtDetail);
  
  //this.formUser.controls['tripNo'].disable();
 // this.formUser.controls['truckNo'].disable();
this.formUser.patchValue({
  //isActive: this.selectedTruckMasterDetail.isActive,
  pmtDate: this.commonService.formatDate(this.selectedVehicleInstPmtDetail.pmtDate),
  vehicleMasterid: this.vehicleList.find(e => e.dataId == this.selectedVehicleInstPmtDetail.vehicleMasterid),
  //insuranceDt: this.commonService.formatDate(this.selectedTruckMasterDetail.insuranceDt),
 // nationalPermitDt: this.commonService.formatDate(this.selectedTruckMasterDetail.nationalPermitDt),
 // fitnessDt: this.commonService.formatDate(this.selectedTruckMasterDetail.fitnessDt),
 // inActiveDate: this.commonService.formatDate(this.selectedTruckMasterDetail.inActiveDate),
//  ownerType:this.selectedTruckMasterDetail.ownerType
 
  
})

}
}, 2000);
}

get f() { return this.formUser.controls; }
exit(): void {
  this.route.navigate(['/emipmtlist']);
}
getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}
getVehicleIdList(): void {
  this.commonService.getVehicleIdList().subscribe((res) => {
    this.vehicleList = res;
  });
}

getMainAcList(): void {    
  this.requestmodel.strRequest="C"
  this.commonService.getAccountList(this.requestmodel).subscribe((res) => {
    this.mainAcList = res;
  });
}
selectEvent(item: any) {
  // do something with selected item
  // this.GetOpeningBal();
}

onChangeSearch(search: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}

onFocused(e: any) {
  // do something
}

startWithFilter = function (vehicleList: Dropdownmodel[], query: string): any[] {
  return vehicleList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
};

vehicleInstPmtDelete(): void {
  if(this.selectedVehicleInstPmtDetail.pmtId != '' ){
   this.requestmodel.strRequest =this.selectedVehicleInstPmtDetail.pmtId
    if (confirm("Are you sure, you want to delete this?")) {
          this.vehicleInstPmtService.vehicleInstPmtDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/emipmtlist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
      });
    }
  }
}



//Submit user form details //
submitVehicleInstPmtForm(): void {
  if (this.formUser.invalid) {
    this.toastrService.warning("Please Enter Mandatory Fields ");   
    const controls = this.formUser.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toastrService.warning(name + " Fields is Invalid");   
      }
    }
    return;
  }
  var selectedDataValue = this.formUser.getRawValue();
  this.formSubmitted = true;

  this.vehicleinstpmtmodel.pmtId = this.selectedVehicleInstPmtDetail.pmtId != '' ? this.selectedVehicleInstPmtDetail.pmtId : '';
  this.vehicleinstpmtmodel.pmtDate = selectedDataValue.pmtDate;
  this.vehicleinstpmtmodel.branchCode = selectedDataValue.branchCode;
  this.vehicleinstpmtmodel.vehicleMasterid = selectedDataValue.vehicleMasterid.dataId;
  
  //this.vehicleinstpmtmodel.instNo = selectedDataValue.instNo;
  this.vehicleinstpmtmodel.instId = selectedDataValue.instId;
  //this.vehicleinstpmtmodel.advPayable_1 = selectedDataValue.advPayable_1;
  this.vehicleinstpmtmodel.priAmt = selectedDataValue.priAmt;
  this.vehicleinstpmtmodel.intAmt = selectedDataValue.intAmt;
  this.vehicleinstpmtmodel.totAmt = selectedDataValue.totAmt;
  this.vehicleinstpmtmodel.remarks = selectedDataValue.remarks;
  this.vehicleinstpmtmodel.pmtType = selectedDataValue.pmtType;
  this.vehicleinstpmtmodel.neftYN = selectedDataValue.neftYN;
  this.vehicleinstpmtmodel.cheqNo = selectedDataValue.cheqNo;
  this.vehicleinstpmtmodel.cheqDate = selectedDataValue.cheqDate;
  this.vehicleinstpmtmodel.creditAc = selectedDataValue.creditAc;
  this.vehicleinstpmtmodel.findocid = selectedDataValue.findocid;


 

  this.vehicleInstPmtService.vehicleInstPmtSubmitted(this.vehicleinstpmtmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toastrService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/emipmtlist']);
    }
    else {
      this.toastrService.warning(this.responseDetails.message);
    }      
  });
}

}


