
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import {  Billsubmitmasterlistmodel } from 'src/app/models/billsubmitmasterlistmodel';
import { Billsubmitmastermodel } from 'src/app/models/billsubmitmastermodel';
import { BillSubmitMasterService } from 'src/app/services/billsubmitmaster.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
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
  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = [];
  sparesList: Dropdownmodel[] = [];
  maintList: Dropdownmodel[] = [];
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
    private requestmodel:Requestmodel) {
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
    submitStn : new FormControl('',),  
    submitNo : new FormControl('',[Validators.required]),
    submitDt : new FormControl('',[Validators.required]),
    submitType : new FormControl('',),
    courierCo : new FormControl('',),
    courierDocketNo : new FormControl('',),
    partyCode : new FormControl('',[Validators.required]),
    submitLocation : new FormControl(this.loginDate,[Validators.required]),
    deptId : new FormControl('',[Validators.required]),
    billsUptoDt : new FormControl('',[Validators.required]),
    kindAttnTo : new FormControl('',),
    remarks : new FormControl('',),
    partyAcceptDt : new FormControl('',),
    partyAccceptRemarks : new FormControl('NA',[Validators.required]),
    totalSubmitAmt : new FormControl('',),
    yearID : new FormControl('',),
   
    
    refDocAttachedImage : new FormControl('',),
    branchCode : new FormControl('',),   

    arrayList: this.formBuilder.array([this.createSubmitArray()]),
  }); 

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



  if (this.selectedBillSubmitMasterDetail.submitMstId   != '') {
    setTimeout(() => {
    
      //this.refDocAttachedImage = Constants.UploadFolderPath + 'vehicleRepairs/refDocAttachedImage/' + this.selectedvehiclerepmaintMasterDetail.refDocAttachedImage;
      this.formUser.patchValue(this.selectedBillSubmitMasterDetail);
      this.formUser.patchValue({
        // transDate: this.commonService.formatDate(this.selectedvehiclerepmaintMasterDetail.transDate),
        // chequeDate: this.commonService.formatDate(this.selectedvehiclerepmaintMasterDetail.chequeDate),
        // vendorInvDt: this.commonService.formatDate(this.selectedvehiclerepmaintMasterDetail.vendorInvDt),
        // vendorId: this.vendorList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vendorId),
        // vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vehicleMasterId),
      })  
     // this.formTyreArray.controls[0].get("sgstAmt")?.disable();   
         
                
     
    
      this.getBillSubmitMasterInnerGridList();
      this.editMode =true;
    }, 2000);  
  }
}
get f() { return this.formUser.controls; }

get formTyreArray() {
return this.formUser.get("arrayList") as FormArray;    
}

selectEvent(item: any) {
  // do something with selected item
 

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

billSubmitMasterDelete(): void {
  if(this.selectedBillSubmitMasterDetail.submitMstId   != '' ){
  this.requestmodel.strRequest =this.selectedBillSubmitMasterDetail.submitMstId 
    if (confirm("Are you sure, you want to delete this?")) {
          this.billSubmitMasterService.billSubmitMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/vehiclerepairslist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
      });
    }
  }
}
  
exit(): void {
  this.route.navigate(['/vehiclerepairslist']);
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
  
     
    
    //  this.formTyreArray.controls[i].get("sgstAmt")?.disable();   
     // this.formTyreArray.controls[i].get("cgstAmt")?.disable();  
     // this.formTyreArray.controls[i].get("igstAmt")?.disable(); 
     // this.formTyreArray.controls[0].get("netAmount")?.disable(); 
     // this.formTyreArray.controls[0].get("itemAmount")?.disable();   

      
    }     
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

  if(selectedDataValue.nonVendor){
    if (selectedDataValue.vendorName=="") {
      this.toastrService.warning(" Please enter Vendor Name");   
      return;
    }
  }
  else{
    if (selectedDataValue.vendorId.dataId || selectedDataValue.stockType=='S') {
      //ignore
    }
    else{
      this.toastrService.warning(" Invalid Vendor");
      return;
    }
  }
  if (selectedDataValue.vehicleMasterId.dataId) {
    //ignore
  }
  else{
    this.toastrService.warning("Invalid Vehicle");
    return;
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
this.billsubmitmastermodel.partyCode= selectedDataValue.partyCode;
this.billsubmitmastermodel.submitLocation= selectedDataValue.submitLocation;
this.billsubmitmastermodel.deptId= selectedDataValue.deptId;
this.billsubmitmastermodel.billsUptoDt= selectedDataValue.billsUptoDt;
this.billsubmitmastermodel.kindAttnTo= selectedDataValue.kindAttnTo;
this.billsubmitmastermodel.remarks= selectedDataValue.remarks;
this.billsubmitmastermodel.partyAcceptDt= selectedDataValue.partyAcceptDt;
this.billsubmitmastermodel.partyAccceptRemarks= selectedDataValue.partyAccceptRemarks;
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
    if (selectedDataValue.arrayList[i].brandID == "" || selectedDataValue.arrayList[i].tyreAmount=="" ) {
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
 
        'dtlRemarks': selectedDataValue.arrayList[i].dtlRemarks.toString().toLowerCase(),        
      }) 
    }   
  } 
  
  if(this.billsubmitmastermodel.billSubmitMasterDtlList.length==0){
    this.toastrService.warning("Please enter atleast one Record in Details");
    return;
  }

  let formData = new FormData();
  this.formSubmitted = true;
  formData.append('refDocAttachedImage', this.attachmentInput.nativeElement.files[0]);
  formData.append('datadetails', JSON.stringify(this.billsubmitmastermodel));  

  this.billSubmitMasterService.billsubmitMasterSubmitted(formData).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toastrService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/vehiclerepairslist']);
    }
    else {
      this.toastrService.warning(this.responseDetails.message);
    }      
  });
}  
} 





