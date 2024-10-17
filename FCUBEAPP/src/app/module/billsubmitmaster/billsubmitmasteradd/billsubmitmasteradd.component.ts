
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import {  Billsubmitmasterlistmodel } from 'src/app/models/billsubmitmasterlistmodel';
import { Billsubmitmastermodel } from 'src/app/models/billsubmitmastermodel';
import { Billsubmitsearchlistmodel } from 'src/app/models/billsubmitsearchlistmodel';
import { BillSubmitMstDtlListmodel } from 'src/app/models/billsubmitmstdtllistmodel';
import { BillSubmitMasterService } from 'src/app/services/billsubmitmaster.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';

import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-billsubmitmasteradd',
  templateUrl: './billsubmitmasteradd.component.html',
  styleUrls: ['./billsubmitmasteradd.component.css']
})
export class BillsubmitmasteraddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  editMode= false;
  formSubmitted = false;
  keywordLocation = 'dataName';
  billsubmitmstdtllistmodel = new BillSubmitMstDtlListmodel();   
  billsubmitmastermodels = new Billsubmitmastermodel();   

  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = [];
  partyLocationList: Dropdownmodel[] = [];
  sparesList: Dropdownmodel[] = [];
  maintList: Dropdownmodel[] = [];
  deptList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  vehicleList : Dropdownmodel[] = [];
  brandList: Dropdownmodel[] = [];
  modelList: Dropdownmodel[] = [];
  vendorList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicleTypeList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  vehicleRepmaintMaster = new Billsubmitmastermodel();
  refDocAttachedImage: string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedBillSubmitMasterDetail = new Billsubmitmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private billsubmitmastermodel: Billsubmitmastermodel, 
    private billSubmitMasterService:BillSubmitMasterService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel, private reportmodel:Reportmodel) {
    this.billsubmitmastermodel = new Billsubmitmastermodel();

    
  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Vehicle Repairs Entry");
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

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 12);
    this.fromDate = today.toLocaleDateString('en-CA').toString();
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
 


  this.selectedBillSubmitMasterDetail = this.billSubmitMasterService.getBillSubmitMasterDetails();
  this.formUser = this.formBuilder.group({
    //transDate : new FormControl(this.loginDate,[Validators.required]),
    submitStn : new FormControl(this.branch,),  
    submitNo : new FormControl('',[Validators.required]),
    submitDt : new FormControl(this.loginDate,[Validators.required]),
    submitType : new FormControl('',),
    courierCo : new FormControl('',),
    courierDocketNo : new FormControl('',),
    partyCode : new FormControl('',[Validators.required]),
    submitLocation : new FormControl('',[Validators.required]),
    deptId : new FormControl('',[Validators.required]),
    billsUptoDt : new FormControl('',[Validators.required]),
    kindAttnTo : new FormControl('',),
    remarks : new FormControl('',),
    partyAcceptDt : new FormControl('',),
    partyAccceptRemarks : new FormControl('',),
    totalSubmitAmt : new FormControl('',),
    yearID : new FormControl('',),
   
    
    refDocAttachedImage : new FormControl('',),
    branchCode : new FormControl('',),   

    arrayList: this.formBuilder.array([this.createSubmitArray()]),
  }); 
  this.getBranchList();
  this.getDeptList();
  this.getBillingPartyList();
  // this.getBrandList();
  // this.getVendorList();
  // this.getBranchList();
  // this.getStateList();
  // this.getSparesList();
  // this.getVehicleIdList();
  // this.getMaintanenceList();
  // this.getCreditAcList('');

  //this.formArray.controls[0].get("sgstAmt")?.disable();   
 // this.formTyreArray.controls[0].get("cgstAmt")?.disable();
  this.formUser.controls['submitStn'].disable(); 
  this.formUser.controls['submitNo'].disable();   

 if (this.selectedBillSubmitMasterDetail.submitMstId != '') {
  
  this.getPartyGstLocationList(this.selectedBillSubmitMasterDetail.partyCode);
}

  
  if (this.selectedBillSubmitMasterDetail.submitMstId   != '') {
    setTimeout(() => {
      
      //this.refDocAttachedImage = Constants.UploadFolderPath + 'vehicleRepairs/refDocAttachedImage/' + this.selectedvehiclerepmaintMasterDetail.refDocAttachedImage;
      this.formUser.patchValue(this.selectedBillSubmitMasterDetail);
      this.formUser.patchValue({
        submitDt: this.commonService.formatDate(this.selectedBillSubmitMasterDetail.submitDt),
         billsUptoDt: this.commonService.formatDate(this.selectedBillSubmitMasterDetail.billsUptoDt),
        // billsUptoDt: this.commonService.formatDate(this.selectedvehiclerepmaintMasterDetail.billsUptoDt),
        // vendorId: this.vendorList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vendorId),
         partyCode: this.partyList.find(e => e.dataId == this.selectedBillSubmitMasterDetail.partyCode),
      })  
     // this.formTyreArray.controls[0].get("sgstAmt")?.disable();   
           
    
       
                
     
    
      this.getBillSubmitMasterInnerGridList();
      this.editMode =true;
     
    }, 2000);  
  }
  this.billSubmitSeriesChange();
}
get f() { return this.formUser.controls; }

get formTyreArray() {
return this.formUser.get("arrayList") as FormArray;    
}

selectEvent(item: any) {
  // do something with selected item
  this.getPartyGstLocationList(item.dataId);

}
billSubmitSeriesChange(): void {
  var selectedData = this.formUser.getRawValue();
  this.requestmodel.strRequest = selectedData.submitNo;
  this.commonService.getBillSubmitSeries(this.requestmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    this.formUser.patchValue({
      submitNo: res.message
    });
  });
}  

getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}
getPartyGstLocationList(party:string): void {
  this.requestmodel.strRequest = party;
  this.commonService.getPartyGstLocationList(this.requestmodel).subscribe((res) => {
    this.partyLocationList = res;
  });    
}
getDeptList(): void {
  this.commonService.getDeptList().subscribe((res) => {
    this.deptList = res;
  });
}
getBillingPartyList(): void {
  this.commonService.getBillingPartyList().subscribe((res) => {
    this.partyList = res;
  });
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
searchStatement(): void {
  var selectedDataValue = this.formUser.getRawValue();
  // if (selectedDataValue.partyCode.dataId || selectedDataValue.submitLocation || selectedDataValue.billsUptoDt) {
  //   //ignore
  // }
  // else{
  //   this.toastrService.warning(" select party , location and uptodate");
  //   return;
  // } 
  
  this.reportmodel.filterStr = selectedDataValue.partyCode.dataId;
  this.reportmodel.filterStr1 = selectedDataValue.submitLocation;
  this.reportmodel.fromDate =  selectedDataValue.billsUptoDt;

  this.billSubmitMasterService.getBillsSubmitSearchList(this.reportmodel)
    .subscribe((res: Billsubmitmastermodel) => {
    this.billsubmitmastermodel = res;      
    //this.formBillsMas.controls['partyCode'].disable();
    this.formTyreArray.clear();
    for (var i = 0; i < res.billSubmitMasterDtlList.length; i++) {
      this.formTyreArray.push(this.createSubmitArray());
      this.formTyreArray.controls[i].get("billsMasterId")?.setValue(res.billSubmitMasterDtlList[i].billsMasterId);
      this.formTyreArray.controls[i].get("billAmt")?.setValue(res.billSubmitMasterDtlList[i].billAmt);
      this.formTyreArray.controls[i].get("dtlRemarks")?.setValue(res.billSubmitMasterDtlList[i].dtlRemarks);
    //  this.formTyreArray.controls[i].get("bookingDate")?.setValue(this.commonService.formatDate(res.billStatementSearchList[i].bookingDate));

     // this.formArray.controls[i].get("gcNoteNo")?.disable();
      this.formTyreArray.controls[i].get("billAmt")?.disable();
     // this.formArray.controls[i].get("bookingDate")?.disable();

   
} 
  });   


  
} 


// getStateList(): void {
//   this.commonService.getStateList().subscribe((res) => {
//     this.stateList = res;
//   });
// }
createSubmitArray() {
  return this.formBuilder.group({
    submitDtlId: [''],
    submitMstId: [''],
    submitDt: [''],
    billsMasterId: [''],
    billAmt: [''],
    dtlRemarks: [''],
    selected: [''],
  //  itemQty: ['' ,[Validators.required]],
    //itemRate: ['',[Validators.required]],


  });
}
addItem(i: number): void {    
  var selectedDate = this.formUser.getRawValue();
  if (this.formTyreArray.value[i].spareLubId != "" && this.formTyreArray.value[i].brandId!="" ) {
    this.formTyreArray.push(this.createSubmitArray());
 
  } 
  else {
    this.toastrService.warning("Please Enter  Spares Details");
  }
}

removeItem(index: number) {
  this.formTyreArray.removeAt(index);  
}  

// searchStatement(): void {
//   var selectedDataValue = this.formUser.getRawValue();
//   if (selectedDataValue.partyCode.dataId) {
//     //ignore
//   }
//   else{
//     this.toastrService.warning(" Party is Invalid");
//     return;
//   } 
//   this.requestmodel.strRequest = selectedDataValue.partyCode.dataId;

//   this.billsMasterService.getBillsMasterSearchList(this.requestmodel)
//     .subscribe((res: Billsmastersearchlistmodel) => {
//     this.billsmastersearchlistmodel = res;      
//     this.formBillsMaster.controls['partyCode'].disable();
//   });   
// } 


billSubmitMasterDelete(): void {
  if(this.selectedBillSubmitMasterDetail.submitMstId   != '' ){
  this.requestmodel.strRequest =this.selectedBillSubmitMasterDetail.submitMstId 
    if (confirm("Are you sure, you want to delete this?")) {
          this.billSubmitMasterService.billSubmitMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/billsubmitist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
      });
    }
  }
}
  
exit(): void {
  this.route.navigate(['/billsubmitist']);
} 
selectedData(index: number, event: any) {
  this.billsubmitmastermodel.billSubmitMasterDtlList[index].selected = event.target.checked;
  this.calculateTotal();
}
 
selectAll(e: any) {
  if(e.target.checked){
    // for (var i = 0; i < this.DieselStatementmodel.dieselStatementListData.length; i++) {
    //   this.DieselStatementmodel.dieselStatementListData[i].selected = true;
    //   this.formArray.controls[i].get("selected")?.setValue('Y');
    // }
  }
  else{
    // for (var i = 0; i < this.DieselStatementmodel.dieselStatementListData.length; i++) {
    //   this.DieselStatementmodel.dieselStatementListData[i].selected = false;
    //   this.formArray.controls[i].get("selected")?.setValue('');
    // }
  }
  //this.calculateTotal();
}
getBillSubmitMasterInnerGridList(): void {
  this.requestmodel.strRequest = this.selectedBillSubmitMasterDetail.submitMstId; 
  this.billSubmitMasterService.getBillSubmitMasterInnerGridList(this.requestmodel).subscribe((res) => {
    this.formTyreArray.clear();
    this.vehicleRepmaintMaster = res;
    for (var i = 0; i < res.billSubmitMasterDtlList.length; i++) {
      this.formTyreArray.push(this.createSubmitArray());
      this.formTyreArray.controls[i].get("submitDtlId")?.setValue(res.billSubmitMasterDtlList[i].submitDtlId);
      this.formTyreArray.controls[i].get("submitMstId")?.setValue(res.billSubmitMasterDtlList[i].submitMstId);  
      this.formTyreArray.controls[i].get("submitDt")?.setValue(res.billSubmitMasterDtlList[i].submitDt); 
      this.formTyreArray.controls[i].get("billsMasterId")?.setValue(res.billSubmitMasterDtlList[i].billsMasterId);  
      this.formTyreArray.controls[i].get("billAmt")?.setValue(res.billSubmitMasterDtlList[i].billAmt);   
      this.formTyreArray.controls[i].get("dtlRemarks")?.setValue(res.billSubmitMasterDtlList[i].dtlRemarks);  
    this.formTyreArray.controls[i].get("selected")?.setValue(res.billSubmitMasterDtlList[i].selected); 
     
    
    //  this.formTyreArray.controls[i].get("sgstAmt")?.disable();   
     // this.formTyreArray.controls[i].get("cgstAmt")?.disable();  
     // this.formTyreArray.controls[i].get("igstAmt")?.disable(); 
     // this.formTyreArray.controls[0].get("netAmount")?.disable(); 
     // this.formTyreArray.controls[0].get("itemAmount")?.disable();   

      
    }     
  });
}

calculateTotal() {
  var totalSubmitAmt = 0;
 
  var billlist = this.billsubmitmastermodel.billSubmitMasterDtlList

  for (var i = 0; i < billlist.length; i++) {
    if (billlist[i].selected) {
      totalSubmitAmt      = totalSubmitAmt     + (billlist[i].billAmt == ""? 0 : parseFloat(billlist[i].billAmt) );
       
    
    
    }
  }

  this.formUser.patchValue({
    totalSubmitAmt      : totalSubmitAmt.toFixed(2),

  });
}



submitBillSubmitMasterForm(): void {
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

  
  var diesellistarray = this.billsubmitmastermodel.billSubmitMasterDtlList;
    var IsItemSelected = false;
    for (var i = 0; i < diesellistarray.length; i++) {
      if (diesellistarray[i].selected) {
        IsItemSelected = true;
      }
    }

  
  
this.billsubmitmastermodel.submitMstId = this.selectedBillSubmitMasterDetail.submitMstId ;
this.billsubmitmastermodel.submitStn= selectedDataValue.submitStn;
this.billsubmitmastermodel.submitNo = selectedDataValue.submitNo
//this.vehiclerepmaintMaster.maintType= selectedDataValue.maintType;
this.billsubmitmastermodel.submitDt= selectedDataValue.submitDt;
this.billsubmitmastermodel.submitType= selectedDataValue.submitType;
//this.vehiclerepmaintMaster.submitType= selectedDataValue.vehicleMasterId.dataId?selectedDataValue.vehicleMasterId.dataId:'';
this.billsubmitmastermodel.courierCo= selectedDataValue.courierCo;


this.billsubmitmastermodel.courierDocketNo= selectedDataValue.courierDocketNo;
this.billsubmitmastermodel.partyCode= selectedDataValue.partyCode.dataId;
this.billsubmitmastermodel.submitLocation= selectedDataValue.submitLocation;
this.billsubmitmastermodel.deptId= selectedDataValue.deptId;
this.billsubmitmastermodel.billsUptoDt= selectedDataValue.billsUptoDt;
this.billsubmitmastermodel.kindAttnTo= selectedDataValue.kindAttnTo.toString().toUpperCase();
this.billsubmitmastermodel.remarks= selectedDataValue.remarks.toString().toUpperCase();
//this.billsubmitmastermodel.partyAcceptDt= selectedDataValue.partyAcceptDt;
//this.billsubmitmastermodel.partyAccceptRemarks= selectedDataValue.partyAccceptRemarks;
this.billsubmitmastermodel.totalSubmitAmt= selectedDataValue.totalSubmitAmt;


//this.vehiclerepmaintMaster.branchCode = selectedDataValue.branchCode;
//this.vehiclerepmaintMaster.branchCode = this.branch;
this.billsubmitmastermodel.yearID= this.year;
this.billsubmitmastermodel.loggedInUser=  this.loggedInUserID;

this.billsubmitmastermodel.billSubmitMasterDtlList = [];
  if(selectedDataValue.netAmount=="" || parseFloat(selectedDataValue.netAmount)==0 ){
    this.toastrService.warning("Total Net Amount should not be zero");
    return;
  }
    
  for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
    if (selectedDataValue.arrayList[i].billAmt == "" ) {
      this.toastrService.warning("Please Enter Details Properly");
      return;
    } 
    else{
      this.billsubmitmastermodel.billSubmitMasterDtlList.push({
      
        'submitDtlId': "",
        'submitMstId': "",
        'submitDt': selectedDataValue.submitDt,
        'billsMasterId': selectedDataValue.arrayList[i].billsMasterId,
       
        'billAmt': selectedDataValue.arrayList[i].billAmt,
 
        'dtlRemarks': selectedDataValue.arrayList[i].dtlRemarks,
       'selected': selectedDataValue.arrayList[i].selected?true:false,
    //  'selected': false
      }) 
    }   
  } 
  
  if(this.billsubmitmastermodel.billSubmitMasterDtlList.length==0){
    this.toastrService.warning("Please enter atleast one Record in Details");
    return;
  }

  let formData = new FormData();
  this.formSubmitted = true;
 // formData.append('refDocAttachedImage', this.attachmentInput.nativeElement.files[0]);
  formData.append('datadetails', JSON.stringify(this.billsubmitmastermodel));  

  this.billSubmitMasterService.billsubmitMasterSubmitted(this.billsubmitmastermodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toastrService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/billsubmitist']);
    }
    else {
      this.toastrService.warning(this.responseDetails.message);
    }      
  });
}  
} 





