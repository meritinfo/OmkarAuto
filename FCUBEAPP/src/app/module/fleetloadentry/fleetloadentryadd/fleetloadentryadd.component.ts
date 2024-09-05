import { Component ,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Spareslubesmasterlistmodel } from 'src/app/models/spareslubesmasterlistmodel';
import { Spareslubesmastermodel } from 'src/app/models/sparelubesmastermodel';
import { SparesLubesMasterService } from 'src/app/services/spareslubesmaster.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Constants } from 'src/app/common/constants';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';
import { FleetLoadEntryService } from 'src/app/services/fleetloadentry.service';
import { Fleetloadentrymodel } from 'src/app/models/fleetloadentrymodel';


@Component({
  selector: 'app-fleetloadentryadd',
  templateUrl: './fleetloadentryadd.component.html',
  styleUrls: ['./fleetloadentryadd.component.css']
})
export class FleetloadentryaddComponent {
  loggedInUserID: string = '';
  formFleetLoad!: FormGroup;
  userSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch: string = '';
  uploadedAttach: string = "";
  responseDetails = new Responsemodel();
  classificationList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicleList : Dropdownmodel[] = [];
  branchList  : Dropdownmodel[] = [];
  productList : Dropdownmodel[] = [];
  creditAcList : Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  List: Dropdownmodel[] = [];
  selectedFleetLoadEntryDetails = new Fleetloadentrymodel();
  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private fleetLoadEntryModel: Fleetloadentrymodel, 
    private fleetLoadEntryService: FleetLoadEntryService, 
    private commonService: CommonService,private requestmodel:Requestmodel,
    private sharedService: SharedService,
    private toasterService: ToastrService) {
    this.fleetLoadEntryModel = new Fleetloadentrymodel();
    


}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Load Memo Entry");
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
  
  this.sharedService.loading = true;   
  this.getLocationList();
  this.getBranchList();
  this.getVehicleNoList();
  this.getProductList();
  this.getCreditAcList();
  this.selectedFleetLoadEntryDetails = this.fleetLoadEntryService.getFleetLoadEntryDetails();
  this.formFleetLoad = this.formBuilder.group({   
    loadBranch: new FormControl(this.branch,[Validators.required]),
    loadDate: new FormControl(this.loginDate,[Validators.required]),
    loadType: new FormControl('',),
    vehicleMasterId: new FormControl('',[Validators.required]),
    loadFor: new FormControl('',),
    loadMemoNo: new FormControl('',),
    loadingFrom: new FormControl('',),
    consignorName: new FormControl('',),
    consignorAdd: new FormControl('',),
    loadingTo: new FormControl('',),
    consigneeName: new FormControl('',),
    consigneeAdd: new FormControl('',),
    productId: new FormControl('',),
    qtyWt: new FormControl('',),
    qtyPkgs: new FormControl('',),
    ratePerTon: new FormControl('',),
    hireAmt: new FormControl('',),
    advAmt: new FormControl('',),
    remarks: new FormControl('',),
    attachMemocopy: new FormControl('',),
   // tripAdjYN: new FormControl('',),
  //  tripId: new FormControl('',),
  });
  setTimeout(() => {
  if (this.selectedFleetLoadEntryDetails.loadId != '') {
    this.formFleetLoad.patchValue(this.selectedFleetLoadEntryDetails);    
    this.uploadedAttach = Constants.UploadFolderPath + 'upload/loadmemo/' + this.selectedFleetLoadEntryDetails.attachMemocopy;
    this.formFleetLoad.patchValue({
    
    loadDate: this.commonService.formatDate(this.selectedFleetLoadEntryDetails.loadDate),
    loadingFrom: this.locationList.find(e => e.dataId == this.selectedFleetLoadEntryDetails.loadingFrom),
    loadingTo: this.locationList.find(e => e.dataId == this.selectedFleetLoadEntryDetails.loadingTo),
    vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedFleetLoadEntryDetails.vehicleMasterId),
    //loadFor: this.creditAcList.find(e => e.dataId == this.selectedFleetLoadEntryDetails.loadFor),
  });
  this.editMode = true;
}    
}, 2000);

  this.sharedService.loading = false;

}
get f() { return this.formFleetLoad.controls; }

// chkSpareDuplicate(){
//   var selectedData = this.formSparesMaster.getRawValue();
  

//     this.requestmodel.strRequest = selectedData.spareLubName;
//   //  this.requestmodel.strRequest1 = selectedData.gcNoteNo;
//     this.sparesLubesMasterService.checkDuplicateSpare(this.requestmodel).subscribe((res: Responsemodel) => {
//       this.responseDetails = res;
//       if (this.responseDetails.status) {
//         //ignore
//       }
//       else{
//         this.toasterService.warning(this.responseDetails.message);
//         this.formSparesMaster.patchValue({
//           spareLubName: ''
  
//         });
        
//       }
//     });
    
// }
getCreditAcList(): void {
  //this.requestmodel.strRequest= 'B';
  this.commonService.getCreditAcList().subscribe((res) => {
    this.creditAcList = res;
    // this.formUser.patchValue({
    //   creditAc: this.creditAcList[0].dataId ,
    // });
  });
 
}

getVehicleNoList(): void {
  this.commonService.getVehicleIdList().subscribe((res) => {
    this.vehicleList = res;
  });
}
getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}
getProductList(): void {
  this.commonService.getProductList().subscribe((res) => {
    this.productList = res;
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

startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
  return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
};

exit(): void {
  this.route.navigate(['/loadmemolist']);
}


deleteFleetLoadEntryForm(): void {
  if(this.selectedFleetLoadEntryDetails.loadId != '' ){
   this.requestmodel.strRequest =this.selectedFleetLoadEntryDetails.loadId
    if (confirm("Are you sure, you want to delete this?")) {
          this.fleetLoadEntryService.fleetLoadEntryDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formFleetLoad.reset();
            this.route.navigate(['/loadmemolist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
      });
    }
  }
}
getLocationList(): void {
  this.commonService.getLocationList().subscribe((res) => {
    this.locationList = res;
  });
}

//Submit user form details //
submitFleetLoadEntryForm(): void {  
  if (this.formFleetLoad.invalid) {
    this.toasterService.warning("Please Enter Mandatory Fields ");
    const controls = this.formFleetLoad.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        this.toasterService.warning(name + " Fields is Invalid");   
      }
    } 
    return;
  }
    
  this.sharedService.loading = true;

  var selectedDataVal = this.formFleetLoad.getRawValue();
  this.userSubmitted = true;
  this.fleetLoadEntryModel.loadId = this.selectedFleetLoadEntryDetails.loadId ;
  //this.fleetLoadEntryModel.spareLubName  = selectedDataVal.spareLubName.toString().toUpperCase();
  this.fleetLoadEntryModel.loadBranch = selectedDataVal.loadBranch;
  this.fleetLoadEntryModel.loadDate = selectedDataVal.loadDate;
  this.fleetLoadEntryModel.loadType = selectedDataVal.loadType;
  this.fleetLoadEntryModel.vehicleMasterId = selectedDataVal.vehicleMasterId.dataId;
  this.fleetLoadEntryModel.loadFor = selectedDataVal.loadFor;
  this.fleetLoadEntryModel.loadMemoNo = selectedDataVal.loadMemoNo;
  this.fleetLoadEntryModel.loadingFrom = selectedDataVal.loadingFrom.dataId;;
  this.fleetLoadEntryModel.consignorName = selectedDataVal.consignorName;
  this.fleetLoadEntryModel.consignorAdd = selectedDataVal.consignorAdd;
  this.fleetLoadEntryModel.loadingTo = selectedDataVal.loadingTo.dataId;;
  this.fleetLoadEntryModel.consigneeName = selectedDataVal.consigneeName;
  this.fleetLoadEntryModel.consigneeAdd = selectedDataVal.consigneeAdd;
  this.fleetLoadEntryModel.productId = selectedDataVal.productId;
  this.fleetLoadEntryModel.qtyWt = selectedDataVal.qtyWt;
  this.fleetLoadEntryModel.qtyPkgs = selectedDataVal.qtyPkgs;
  this.fleetLoadEntryModel.ratePerTon = selectedDataVal.ratePerTon;
  this.fleetLoadEntryModel.hireAmt = selectedDataVal.hireAmt;
  this.fleetLoadEntryModel.advAmt = selectedDataVal.advAmt;
  this.fleetLoadEntryModel.remarks = selectedDataVal.remarks;
  this.fleetLoadEntryModel.attachMemocopy = selectedDataVal.attachMemocopy;
 // this.fleetLoadEntryModel.tripAdjYN = selectedDataVal.tripAdjYN;
 // this.fleetLoadEntryModel.tripId = selectedDataVal.tripId;
  this.fleetLoadEntryModel.loggedInUser   = this.loggedInUserID;
  let formData = new FormData();
    formData.append('attach', this.attachmentInput.nativeElement.files[0]);

    formData.append('datadetails', JSON.stringify(this.fleetLoadEntryModel));

  this.fleetLoadEntryService.fleetLoadEntrySubmitted(formData).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toasterService.success(this.responseDetails.message);
      this.formFleetLoad.reset();
      this.route.navigate(['/loadmemolist']);
    }
    else {
      this.toasterService.warning(this.responseDetails.message);
    }      
  });
  this.sharedService.loading = false;
}
}
