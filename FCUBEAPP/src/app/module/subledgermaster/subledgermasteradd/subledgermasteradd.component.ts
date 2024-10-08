
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subledgerlistmodel } from 'src/app/models/subledgerlistmodel';
import { Subledgermodel } from 'src/app/models/subledgermodel';
import { SubledgerService } from 'src/app/services/subledger.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';

import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';

import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-subledgermasteradd',
  templateUrl: './subledgermasteradd.component.html',
  styleUrls: ['./subledgermasteradd.component.css']
})
export class SubledgermasteraddComponent {
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
  ledgerAcList: Dropdownmodel[] = [];
  validateList: Dropdownmodel[] = [];
  fieldList: Dropdownmodel[] = [];
  subledgermodel = new Subledgermodel();

  selectedSubLedgerMasterDetail = new Subledgermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private subledgermastermodel: Subledgermodel, 
    private subledgerService:SubledgerService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.subledgermastermodel = new Subledgermodel();

}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Sub Ledger Master");
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


  

  this.selectedSubLedgerMasterDetail = this.subledgerService.getSubLedgerMasterDetails();
  this.formUser = this.formBuilder.group({
   // transDate : new FormControl(this.loginDate,[Validators.required]),
    ledgerAc : new FormControl('',[Validators.required]),  
    createOrPredefined : new FormControl('',[Validators.required]),
    preDefinedQuery : new FormControl('',),
    validateWithDocNo : new FormControl('Y',[Validators.required]),
    validateTable : new FormControl('',[Validators.required]),
    validateTableField : new FormControl('',[Validators.required]),
   // vendorId : new FormControl('',[Validators.required]),
    arrayList: this.formBuilder.array([this.createSubArray()]),
  }); 

 // this.getBrandList();
 // this.getVendorList();
 // this.getBranchList();
 this.getBankAcList();
 this.getValidateList();
  // this.createSubArray.controls[0].get("sgstAmt")?.disable();   
  // this.createSubArray.controls[0].get("cgstAmt")?.disable();  
  // this.createSubArray.controls[0].get("igstAmt")?.disable();  
  // this.createSubArray.controls[0].get("sgstPct")?.disable();   
  // this.formTyreArray.controls[0].get("cgstPct")?.disable();  
  // this.formTyreArray.controls[0].get("igstPct")?.disable();   
  // this.formTyreArray.controls[0].get("netAmount")?.disable(); 
  // this.formTyreArray.controls[0].get("itemAmount")?.disable(); 

  // this.formUser.controls["totItemAmount"].disable();
  // this.formUser.controls["totCgstAmt"].disable();
  // this.formUser.controls["totSgstAmt"].disable();
  // this.formUser.controls["totIgstAmt"].disable();
  // this.formUser.controls["netAmount"].disable();  
  // this.formUser.controls['totItemNetAmount'].disable(); 
 
  if (this.selectedSubLedgerMasterDetail.subLedgerId!= '') {
    this.gettablefield(this.selectedSubLedgerMasterDetail.validateTable);
  }
  if (this.selectedSubLedgerMasterDetail.subLedgerId  != '') {
    setTimeout(() => {  
    
    
      this.formUser.patchValue(this.selectedSubLedgerMasterDetail);
      this.formUser.patchValue({
        // transDate: this.commonService.formatDate(this.selectedvehiclerepmaintMasterDetail.transDate),
        // chequeDate: this.commonService.formatDate(this.selectedvehiclerepmaintMasterDetail.chequeDate),
        // vendorInvDt: this.commonService.formatDate(this.selectedvehiclerepmaintMasterDetail.vendorInvDt),
        // vendorId: this.vendorList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vendorId),
        // vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vehicleMasterId),
      })  
     // this.formTyreArray.controls[0].get("sgstAmt")?.disable();   

    
   
      this.getSubledgerInnerGridList();
      this.editMode =true;
    }, 2000);  
  }
}
get f() { return this.formUser.controls; }

get formSubArray() {
return this.formUser.get("arrayList") as FormArray;    
}
onChangeSearch(search: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}
changePreType(e: any) {
  console.log(e.target.value);
  var selectedValue = e.target.value;
 if(e.target.value =='P'){
  this.formUser.controls['validateWithDocNo'].setValidators([Validators.required]);
  this.formUser.controls['validateTable'].setValidators([Validators.required]); 
  this.formUser.controls['validateTableField'].setValidators([Validators.required]);
  

 }
 else{
  this.formUser.controls['validateWithDocNo'].clearValidators(); 
  this.formUser.controls['validateTable'].clearValidators(); 
  this.formUser.controls['validateTableField'].clearValidators(); 

 }
 this.formUser.controls['validateWithDocNo'].updateValueAndValidity();
 this.formUser.controls['validateTable'].updateValueAndValidity();
 this.formUser.controls['validateTableField'].updateValueAndValidity();
  
  
}
changeTableType(e: any) {
  // console.log(e.target.value);
  // var selectedValue = e.target.value;
  // this.commonService.getTableField(selectedValue).subscribe((res) => {
  //   this.ledgerAcList = res;
  // });

  // this.requestmodel.strRequest= e.target.value;
  //   this.commonService.getTableField(this.requestmodel).subscribe((res) => {
  //     this.fieldList = res;
  //   });
    this.gettablefield(e.target.value);
  
}
gettablefield(stf:any){
  this.requestmodel.strRequest= stf;
  this.commonService.getTableField(this.requestmodel).subscribe((res) => {
    this.fieldList = res;
  });

}

onFocused(e: any) {
  // do something
}

startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
  return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
};

getStateList(): void {
  this.commonService.getStateList().subscribe((res) => {
    this.stateList = res;
  });
}
createSubArray() {
  return this.formBuilder.group({
    subLedgerDtlId: [''],
    subLedgerId: [''],
    ledgerAc: [''],
    subLedgerDesc: [''],
     });
}
addItem(i: number): void {    
  var selectedDate = this.formUser.getRawValue();
  if (this.formSubArray.value[i].subLedgerDesc != ""  ) {
    this.formSubArray.push(this.createSubArray());
   
  } 
  else {
    this.toastrService.warning("Please Enter  Details");
  }
}

removeItem(index: number) {
  this.formSubArray.removeAt(index);  
}  
ledgerMasterDelete(): void {
  if(this.selectedSubLedgerMasterDetail.subLedgerId  != '' ){
  this.requestmodel.strRequest =this.selectedSubLedgerMasterDetail.subLedgerId 
    if (confirm("Are you sure, you want to delete this?")) {
          this.subledgerService.subLedgerMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/subledgerlist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
      });
    }
  }
}
  
exit(): void {
  this.route.navigate(['/subledgerlist']);
}  
getBankAcList(): void {
  this.commonService.getSubledgerAcList().subscribe((res) => {
    this.ledgerAcList = res;
  });
}
getValidateList(): void {
  this.commonService.getValidateList().subscribe((res) => {
    this.validateList = res;
  });
}

getSubledgerInnerGridList(): void {
  this.requestmodel.strRequest = this.selectedSubLedgerMasterDetail.subLedgerId; 
  this.subledgerService.getSubledgerMasterInnerGridList(this.requestmodel).subscribe((res) => {
    this.formSubArray.clear();
    this.subledgermodel = res;
    for (var i = 0; i < res.subLedgerMasterDtlList.length; i++) {
      this.formSubArray.push(this.createSubArray());
      this.formSubArray.controls[i].get("subLedgerId")?.setValue(res.subLedgerMasterDtlList[i].subLedgerId);
      this.formSubArray.controls[i].get("ledgerAc")?.setValue(res.subLedgerMasterDtlList[i].ledgerAc);  
      this.formSubArray.controls[i].get("subLedgerDesc")?.setValue(res.subLedgerMasterDtlList[i].subLedgerDesc); 
     
    
      // this.formTyreArray.controls[i].get("sgstAmt")?.disable();   
      // this.formTyreArray.controls[i].get("cgstAmt")?.disable();  
      // this.formTyreArray.controls[i].get("igstAmt")?.disable(); 
      // this.formTyreArray.controls[0].get("netAmount")?.disable(); 
      // this.formTyreArray.controls[0].get("itemAmount")?.disable();   

    
    }     
  });
}
submitSubLedgerMasterForm(): void {
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


  
this.subledgermodel.subLedgerId = this.selectedSubLedgerMasterDetail.subLedgerId ;
this.subledgermodel.ledgerAc= selectedDataValue.ledgerAc;
this.subledgermodel.createOrPredefined = selectedDataValue.createOrPredefined
//this.vehiclerepmaintMaster.maintType= selectedDataValue.maintType;
this.subledgermodel.preDefinedQuery= selectedDataValue.preDefinedQuery;
//this.vehiclerepmaintMaster.vehicleMasterId= selectedDataValue.vehicleMasterId;
this.subledgermodel.validateWithDocNo= selectedDataValue.validateWithDocNo;
this.subledgermodel.validateTable= selectedDataValue.validateTable;
this.subledgermodel.validateTableField= selectedDataValue.validateTableField;

this.subledgermodel.loggedInUser=  this.loggedInUserID;

this.subledgermodel.subLedgerMasterDtlList = [];
 
  for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
    if (selectedDataValue.arrayList[i].subLedgerDesc == "" && selectedDataValue.createOrPredefined=="C") {
      this.toastrService.warning("Please Enter Details Properly");
      return;
    } 
    else{
      this.subledgermodel.subLedgerMasterDtlList.push({
        'subLedgerId': "",
        'subLedgerDtlId': "",
        'ledgerAc': selectedDataValue.ledgerAc,
        'subLedgerDesc': selectedDataValue.arrayList[i].subLedgerDesc.toString().toUpperCase(),
             
      }) 
    }   
  } 
  
  if(this.subledgermodel.subLedgerMasterDtlList.length==0){
    this.toastrService.warning("Please enter atleast one Record in Details");
    return;
  }

  let formData = new FormData();
  this.formSubmitted = true;

 //formData.append('datadetails', JSON.stringify(this.subledgermodel));  

  this.subledgerService.subledgerMasterSubmitted(this.subledgermodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    if (this.responseDetails.status) {
      this.toastrService.success(this.responseDetails.message);
      this.formUser.reset();
      this.route.navigate(['/subledgerlist']);
    }
    else {
      this.toastrService.warning(this.responseDetails.message);
    }      
  });
}  







}

  