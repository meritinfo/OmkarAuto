
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Sparespurchasemasterlistmodel } from 'src/app/models/sparespurchasemasterlistmodel';
import { VehiclerepmaintMaster } from 'src/app/models/vehiclerepmaintmastermodel';
import { VehiclerepmaintMasterService } from 'src/app/services/vehiclerepmaint.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';



import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';

import { CommonService } from 'src/app/services/common.service';

import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-vehiclerepmaintadd',
  templateUrl: './vehiclerepmaintadd.component.html',
  styleUrls: ['./vehiclerepmaintadd.component.css']
})
export class VehiclerepmaintaddComponent {
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
  vehicleRepmaintMaster = new VehiclerepmaintMaster();
  refDocAttachedImage: string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedvehiclerepmaintMasterDetail = new VehiclerepmaintMaster();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private vehiclerepmaintMaster: VehiclerepmaintMaster, 
    private vehiclerepmaintMasterService:VehiclerepmaintMasterService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.vehiclerepmaintMaster = new VehiclerepmaintMaster();
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
 


  this.selectedvehiclerepmaintMasterDetail = this.vehiclerepmaintMasterService.getVehiclerepmaintMasterDetails();
  this.formUser = this.formBuilder.group({
    transDate : new FormControl(this.loginDate,[Validators.required]),
    stockType : new FormControl('',),  
    maintID : new FormControl('',[Validators.required]),
    vehicleMasterId : new FormControl('',[Validators.required]),
    maintType : new FormControl('',),
    kmReading : new FormControl('',),
    nonVendor : new FormControl('',),
    vendorId : new FormControl('',[Validators.required]),
    vendorInvDt : new FormControl(this.loginDate,[Validators.required]),
    vendorInvNo : new FormControl('',),
    vendorName : new FormControl('',[Validators.required]),
    vendorAddress : new FormControl('',),
    vendorState : new FormControl('',),
    vendorGstNo : new FormControl('',),
    gstType : new FormControl('NA',[Validators.required]),
    totItemAmount : new FormControl('',),
    totSgstAmt : new FormControl('',),
    totCgstAmt : new FormControl('',),
    totIgstAmt : new FormControl('',),
    totItemNetAmount : new FormControl('',[Validators.required]),
    otherAmount : new FormControl('',),     
    roundOff : new FormControl('',),     
    remarks : new FormControl('',),  
    pmtType : new FormControl('',),  
    neftPmt : new FormControl('',),  
    creditAc : new FormControl('',),  
    chequeDate : new FormControl('',),
    chequeNo : new FormControl('',),
    netAmount  : new FormControl('',),
    
    refDocAttachedImage : new FormControl('',),
    branchCode : new FormControl('',),   

    arrayList: this.formBuilder.array([this.createVehicleArray()]),
  }); 

  this.getBrandList();
  this.getVendorList();
  this.getBranchList();
  this.getStateList();
  this.getSparesList();
  this.getVehicleIdList();
  this.getMaintanenceList();
  this.getCreditAcList('');

  this.formTyreArray.controls[0].get("sgstAmt")?.disable();   
  this.formTyreArray.controls[0].get("cgstAmt")?.disable();  
  this.formTyreArray.controls[0].get("igstAmt")?.disable();  
  this.formTyreArray.controls[0].get("sgstPct")?.disable();   
  this.formTyreArray.controls[0].get("cgstPct")?.disable();  
  this.formTyreArray.controls[0].get("igstPct")?.disable();   
  this.formTyreArray.controls[0].get("netAmount")?.disable(); 
  this.formTyreArray.controls[0].get("itemAmount")?.disable(); 

  this.formUser.controls["totItemAmount"].disable();
  this.formUser.controls["totCgstAmt"].disable();
  this.formUser.controls["totSgstAmt"].disable();
  this.formUser.controls["totIgstAmt"].disable();
  this.formUser.controls["netAmount"].disable();  
  this.formUser.controls['totItemNetAmount'].disable(); 

  if (this.selectedvehiclerepmaintMasterDetail.vrmTransId  != '') {
    setTimeout(() => {
    
      this.refDocAttachedImage = Constants.UploadFolderPath + 'vehicleRepairs/refDocAttachedImage/' + this.selectedvehiclerepmaintMasterDetail.refDocAttachedImage;
      this.formUser.patchValue(this.selectedvehiclerepmaintMasterDetail);
      this.formUser.patchValue({
        transDate: this.commonService.formatDate(this.selectedvehiclerepmaintMasterDetail.transDate),
        chequeDate: this.commonService.formatDate(this.selectedvehiclerepmaintMasterDetail.chequeDate),
        vendorInvDt: this.commonService.formatDate(this.selectedvehiclerepmaintMasterDetail.vendorInvDt),
        vendorId: this.vendorList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vendorId),
        vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedvehiclerepmaintMasterDetail.vehicleMasterId),
      })  
      this.formTyreArray.controls[0].get("sgstAmt")?.disable();   
      this.formTyreArray.controls[0].get("cgstAmt")?.disable();  
      this.formTyreArray.controls[0].get("igstAmt")?.disable();  
      this.formTyreArray.controls[0].get("sgstPct")?.disable();   
      this.formTyreArray.controls[0].get("cgstPct")?.disable();  
      this.formTyreArray.controls[0].get("igstPct")?.disable();   
      this.formTyreArray.controls[0].get("netAmount")?.disable(); 
      this.formTyreArray.controls[0].get("itemAmount")?.disable();       
                
      if (this.selectedvehiclerepmaintMasterDetail.nonVendor=='Y'){     
        this.formUser.controls['vendorId'].disable();   
        this.formUser.controls['vendorName'].enable(); 
        this.formUser.patchValue({
          vendorId: "",
          nonVendor: "Y",
        })
      }
      else {          
        this.formUser.controls['vendorId'].enable(); 
        this.formUser.controls['vendorName'].disable(); 
        this.formUser.patchValue({
          nonVendor: "",
        })
      }   
    
      this.getVehicleMaintMasterInnerGridList();
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
  this.formUser.patchValue({
    vendorName: item.dataName
  })
  this.requestmodel.strRequest = item.dataId;
  this.commonService.getVendorDetails(this.requestmodel).subscribe((res) => {
    this.formUser.patchValue({
      vendorAddress: res.strRequest,
      vendorGstNo: res.strRequest1,
    })
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

getStateList(): void {
  this.commonService.getStateList().subscribe((res) => {
    this.stateList = res;
  });
}
getBrandList(): void {
  this.commonService.getSparesBrandList().subscribe((res) => {
    this.brandList = res;
  });
}
getSparesList(): void {
  this.commonService.getSparesList().subscribe((res) => {
    this.sparesList = res;
  });
}
getMaintanenceList(): void {
  this.commonService.getMaintanenceList().subscribe((res) => {
    this.maintList = res;
  });
}
getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}
changePmtType(e: any) {
  console.log(e.target.value);
  var selectedValue = e.target.value;
  this.formUser.patchValue({
    neftPmt : "",
    chequeNo: "",
    chequeDate: this.loginDate,
  });
  
  this.getCreditAcList(selectedValue);
}
changeStockType(e: any) {
  console.log(e.target.value);
  var stocktyp = e.target.value;   
 

    if (stocktyp == "S") {   
      this.formUser.controls['nonVendor'].disable();
      this.formUser.controls['vendorId'].disable();
      this.formUser.controls['vendorInvDt'].disable();
      this.formUser.controls['vendorInvNo'].disable();
      this.formUser.controls['vendorAddress'].disable();
      this.formUser.controls['vendorState'].disable();
      this.formUser.controls['vendorGstNo'].disable();
      this.formUser.controls['vendorName'].disable();

    }    
    else   {
      this.formUser.controls['nonVendor'].enable();
      this.formUser.controls['vendorId'].enable();
      this.formUser.controls['vendorInvDt'].enable();
      this.formUser.controls['vendorInvNo'].enable();
      this.formUser.controls['vendorAddress'].enable();
      this.formUser.controls['vendorState'].enable();
      this.formUser.controls['vendorGstNo'].enable();
      this.formUser.controls['vendorName'].enable();
      this.formUser.controls['vendorId'].clearValidators(); 
      this.formUser.controls['vendorName'].clearValidators(); 
      this.formUser.controls['vendorAddress'].clearValidators(); 
      this.formUser.controls['vendorState'].clearValidators(); 
      this.formUser.controls['vendorGstNo'].clearValidators(); 
     
    }
    this.formUser.controls['vendorGstNo'].updateValueAndValidity();     
    this.formUser.controls['vendorId'].updateValueAndValidity();   
    this.formUser.controls['vendorName'].updateValueAndValidity();  
     
 
}

onNoVendor(e: any) {
  if (e.target.checked){     
    this.formUser.controls['vendorId'].disable(); 
    this.formUser.controls['vendorName'].enable(); 
    this.formUser.patchValue({
      vendorId: "",
      nonVendor: "Y",
      vendorName:"",
    })
  }
  else {          
    this.formUser.controls['vendorId'].enable(); 
    this.formUser.controls['vendorName'].disable(); 
    this.formUser.patchValue({
      vendorId: "",
      nonVendor: "",
      vendorName:"",
    })
  }
}
getVendorList(): void {
  this.commonService.getVendorList().subscribe((res) => {
    this.vendorList = res;
  });
}  
getCreditAcList(pmttp:string): void {
  this.requestmodel.strRequest= pmttp;
  this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
    this.creditAcList = res;
    // this.formUser.patchValue({
    //   creditAc: this.creditAcList[0].dataId ,
    // });
  });
  if (pmttp == 'B'){
    this.formUser.controls['chequeDate'].enable();
  }
  else {
    this.formUser.controls['chequeDate'].disable();
  }
}
createVehicleArray() {
  return this.formBuilder.group({
    vrmTransDtlId: [''],
    vrmTransId: [''],
    transDate: [''],
    spareLubId: [''],
    brandId: [''],
    itemQty: [''],
    itemRate: [''],
    itemAmount: [''],
    sgstPct: [''],
    sgstAmt: [''],
    cgstPct: [''],
    cgstAmt: [''],
    igstPct: [''],
    igstAmt: [''],
    netAmount: [''],
    remarks: [''],
  });
}
addItem(i: number): void {    
  var selectedDate = this.formUser.getRawValue();
  if (this.formTyreArray.value[i].spareLubId != "" && this.formTyreArray.value[i].brandId!="" ) {
    this.formTyreArray.push(this.createVehicleArray());
    
  this.formTyreArray.controls[i+1].get("sgstAmt")?.disable();   
  this.formTyreArray.controls[i+1].get("cgstAmt")?.disable();  
  this.formTyreArray.controls[i+1].get("igstAmt")?.disable();  
    
    if (selectedDate.gstType == "I") {   
      this.formTyreArray.controls[i+1].get("sgstPct")?.disable();   
      this.formTyreArray.controls[i+1].get("cgstPct")?.disable();  
      this.formTyreArray.controls[i+1].get("igstPct")?.enable();  
    }    
    else if (selectedDate.gstType == "S" || selectedDate.gstType == "C")  {      
      this.formTyreArray.controls[i+1].get("sgstPct")?.enable();   
      this.formTyreArray.controls[i+1].get("cgstPct")?.enable();  
      this.formTyreArray.controls[i+1].get("igstPct")?.disable();  
    }
    else{              
      this.formTyreArray.controls[i+1].get("sgstPct")?.disable();   
      this.formTyreArray.controls[i+1].get("cgstPct")?.disable();  
      this.formTyreArray.controls[i+1].get("igstPct")?.disable();  
    } 
  } 
  else {
    this.toastrService.warning("Please Enter  Spares Details");
  }
}

removeItem(index: number) {
  this.formTyreArray.removeAt(index);  
}  

maintMasterDelete(): void {
  if(this.selectedvehiclerepmaintMasterDetail.vrmTransId  != '' ){
  this.requestmodel.strRequest =this.selectedvehiclerepmaintMasterDetail.vrmTransId 
    if (confirm("Are you sure, you want to delete this?")) {
          this.vehiclerepmaintMasterService.vehiclerepmaintMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
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

getVehicleMaintMasterInnerGridList(): void {
  this.requestmodel.strRequest = this.selectedvehiclerepmaintMasterDetail.vrmTransId; 
  this.vehiclerepmaintMasterService.getVehiclerepmaintMasterInnerGridList(this.requestmodel).subscribe((res) => {
    this.formTyreArray.clear();
    this.vehicleRepmaintMaster = res;
    for (var i = 0; i < res.vehicleRepMaintDtlList.length; i++) {
      this.formTyreArray.push(this.createVehicleArray());
      this.formTyreArray.controls[i].get("vrmTransDtlId")?.setValue(res.vehicleRepMaintDtlList[i].vrmTransDtlId);
      this.formTyreArray.controls[i].get("vrmTransId")?.setValue(res.vehicleRepMaintDtlList[i].vrmTransId);  
      this.formTyreArray.controls[i].get("transDate")?.setValue(res.vehicleRepMaintDtlList[i].transDate); 
      this.formTyreArray.controls[i].get("spareLubId")?.setValue(res.vehicleRepMaintDtlList[i].spareLubId);  
      this.formTyreArray.controls[i].get("brandId")?.setValue(res.vehicleRepMaintDtlList[i].brandId);   
      this.formTyreArray.controls[i].get("itemQty")?.setValue(res.vehicleRepMaintDtlList[i].itemQty);  
      this.formTyreArray.controls[i].get("itemRate")?.setValue(res.vehicleRepMaintDtlList[i].itemRate);    
      this.formTyreArray.controls[i].get("itemAmount")?.setValue(res.vehicleRepMaintDtlList[i].itemAmount);  
      this.formTyreArray.controls[i].get("sgstPct")?.setValue(res.vehicleRepMaintDtlList[i].sgstPct);   
      this.formTyreArray.controls[i].get("sgstAmt")?.setValue(res.vehicleRepMaintDtlList[i].sgstAmt);  
      this.formTyreArray.controls[i].get("cgstPct")?.setValue(res.vehicleRepMaintDtlList[i].cgstPct);  
      this.formTyreArray.controls[i].get("cgstAmt")?.setValue(res.vehicleRepMaintDtlList[i].cgstAmt);  
      this.formTyreArray.controls[i].get("igstPct")?.setValue(res.vehicleRepMaintDtlList[i].igstPct);  
      this.formTyreArray.controls[i].get("igstAmt")?.setValue(res.vehicleRepMaintDtlList[i].igstAmt);  
      this.formTyreArray.controls[i].get("netAmount")?.setValue(res.vehicleRepMaintDtlList[i].netAmount); 
      this.formTyreArray.controls[i].get("remarks")?.setValue(res.vehicleRepMaintDtlList[i].remarks); 
    
      this.formTyreArray.controls[i].get("sgstAmt")?.disable();   
      this.formTyreArray.controls[i].get("cgstAmt")?.disable();  
      this.formTyreArray.controls[i].get("igstAmt")?.disable(); 
      this.formTyreArray.controls[0].get("netAmount")?.disable(); 
      this.formTyreArray.controls[0].get("itemAmount")?.disable();   

      if (this.selectedvehiclerepmaintMasterDetail.gstType == "I") {   
        this.formTyreArray.controls[i].get("sgstPct")?.disable();   
        this.formTyreArray.controls[i].get("cgstPct")?.disable();  
        this.formTyreArray.controls[i].get("igstPct")?.enable();  
      }    
      else if (this.selectedvehiclerepmaintMasterDetail.gstType == "S" || this.selectedvehiclerepmaintMasterDetail.gstType == "C")  {      
        this.formTyreArray.controls[i].get("sgstPct")?.enable();   
        this.formTyreArray.controls[i].get("cgstPct")?.enable();  
        this.formTyreArray.controls[i].get("igstPct")?.disable();  
      }
      else{              
        this.formTyreArray.controls[i].get("sgstPct")?.disable();   
        this.formTyreArray.controls[i].get("cgstPct")?.disable();  
        this.formTyreArray.controls[i].get("igstPct")?.disable();  
      } 
    }     
  });
}
changeGstType(e: any) {
  console.log(e.target.value);
  var gsttype = e.target.value;   
  for (var i = 0; i < this.formTyreArray.controls.length; i++) { 
    this.formTyreArray.controls[i].get("sgstPct")?.setValue("0");
    this.formTyreArray.controls[i].get("cgstPct")?.setValue("0");
    this.formTyreArray.controls[i].get("igstPct")?.setValue("0");
    this.formTyreArray.controls[i].get("sgstAmt")?.setValue("0");
    this.formTyreArray.controls[i].get("cgstAmt")?.setValue("0");
    this.formTyreArray.controls[i].get("igstAmt")?.setValue("0"); 
    this.formTyreArray.controls[i].get("itemAmt")?.setValue("0"); 

    if (gsttype == "IG") {   
      this.formTyreArray.controls[i].get("sgstPct")?.disable();   
      this.formTyreArray.controls[i].get("cgstPct")?.disable();  
      this.formTyreArray.controls[i].get("igstPct")?.enable();  
    }    
   // else if (gsttype == "S" || gsttype == "C")  {      
    else if (gsttype == "SC" )  {   
      this.formTyreArray.controls[i].get("sgstPct")?.enable();   
      this.formTyreArray.controls[i].get("cgstPct")?.enable();  
      this.formTyreArray.controls[i].get("igstPct")?.disable();  
    }
    else{              
      this.formTyreArray.controls[i].get("sgstPct")?.disable();   
      this.formTyreArray.controls[i].get("cgstPct")?.disable();  
      this.formTyreArray.controls[i].get("igstPct")?.disable();  
    } 
  }    
  this.onPctChange()
}
onNeftChk(e:any){
  if(e.target.checked){
    this.formUser.controls['chequeNo'].clearValidators();      
    this.formUser.controls['chequeDate'].clearValidators(); 
    this.formUser.controls['chequeNo'].disable();      
    this.formUser.controls['chequeDate'].disable(); 
  }
  else{      
    this.formUser.controls['chequeNo'].setValidators([Validators.required]);
    this.formUser.controls['chequeDate'].setValidators([Validators.required]);  
    this.formUser.controls['chequeNo'].enable();      
    this.formUser.controls['chequeDate'].enable(); 
  }
  this.formUser.controls['chequeNo'].updateValueAndValidity();
  this.formUser.controls['chequeDt'].updateValueAndValidity();    
}
  
getVehicleIdList(): void {
  this.commonService.getVehicleIdList().subscribe((res) => {
    this.vehicleList = res;
  });
}
onPctChange(){
  var totalItemAmt = 0;
  var totalCgstAmt = 0;
  var totalSgstAmt = 0;
  var totalIgstAmt = 0;
  var totalAmt = 0;
  var totItemNetAmount = 0;
  var itemAmount = 0;
  var itemRate = 0;
  var itemQty = 0;
  var totalItemAmt = 0;
  var sgstAmt = 0;
  var cgstAmt = 0;
  var igstAmt = 0;
  var netAmount = 0;
  
  var selectedDate = this.formUser.getRawValue();

  for (var i = 0; i < this.formTyreArray.controls.length; i++) {
    this.formTyreArray.controls[i].get("sgstAmt")?.setValue("");
    this.formTyreArray.controls[i].get("cgstAmt")?.setValue("");
    this.formTyreArray.controls[i].get("igstAmt")?.setValue("");


    if (selectedDate.arrayList[i].itemRate!="") {
      itemAmount= parseFloat(selectedDate.arrayList[i].itemQty) * parseFloat(selectedDate.arrayList[i].itemRate);
      this.formTyreArray.controls[i].get("itemAmount")?.setValue(itemAmount.toFixed(2));
    
      totalItemAmt = totalItemAmt+itemAmount;
      if(selectedDate.arrayList[i].sgstPct!="") {
        sgstAmt = itemAmount * parseFloat(selectedDate.arrayList[i].sgstPct)/100;
        totalSgstAmt = totalSgstAmt + sgstAmt;
        netAmount = netAmount + sgstAmt;
        this.formTyreArray.controls[i].get("sgstAmt")?.setValue(sgstAmt.toFixed(2));
      }
      if(selectedDate.arrayList[i].cgstPct!="") {
        cgstAmt = itemAmount * parseFloat(selectedDate.arrayList[i].cgstPct)/100;
        totalCgstAmt = totalCgstAmt + cgstAmt;
        netAmount = netAmount + cgstAmt;
        this.formTyreArray.controls[i].get("cgstAmt")?.setValue(cgstAmt.toFixed(2));
      }
      if(selectedDate.arrayList[i].igstPct!="") {
        igstAmt = itemAmount * parseFloat(selectedDate.arrayList[i].igstPct)/100;
        totalIgstAmt = totalIgstAmt + igstAmt;
        netAmount = netAmount + igstAmt;
        this.formTyreArray.controls[i].get("igstAmt")?.setValue(igstAmt.toFixed(2));
      }      
      netAmount = sgstAmt + cgstAmt+igstAmt+ itemAmount;  
      this.formTyreArray.controls[i].get("netAmount")?.setValue(netAmount.toFixed(2));
    
      totItemNetAmount = totItemNetAmount+ netAmount;
    }
  }  
  netAmount = totItemNetAmount ;
  if(selectedDate.roundOff!="") {
    netAmount = netAmount + parseFloat(selectedDate.roundOff);
  }
  if(selectedDate.otherAmount!="") {
    netAmount = netAmount + parseFloat(selectedDate.otherAmount);
  }
  this.formUser.patchValue({
    totItemAmount : totalItemAmt.toFixed(2),
    totCgstAmt: totalCgstAmt.toFixed(2),
    totSgstAmt: totalSgstAmt.toFixed(2),
    totIgstAmt: totalIgstAmt.toFixed(2),
    totalAmt: totalAmt.toFixed(2),
    netAmount: netAmount.toFixed(2),
    totItemNetAmount: totItemNetAmount.toFixed(2),
  });
}
submitVehicleRepMaintMasterForm(): void {
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
  
  
this.vehiclerepmaintMaster.vrmTransId = this.selectedvehiclerepmaintMasterDetail.vrmTransId ;
this.vehiclerepmaintMaster.transDate= selectedDataValue.transDate;
this.vehiclerepmaintMaster.stockType = selectedDataValue.stockType
//this.vehiclerepmaintMaster.maintType= selectedDataValue.maintType;
this.vehiclerepmaintMaster.maintID= selectedDataValue.maintID;
//this.vehiclerepmaintMaster.vehicleMasterId= selectedDataValue.vehicleMasterId;
this.vehiclerepmaintMaster.vehicleMasterId= selectedDataValue.vehicleMasterId.dataId?selectedDataValue.vehicleMasterId.dataId:'';
this.vehiclerepmaintMaster.kmReading= selectedDataValue.kmReading;
this.vehiclerepmaintMaster.nonVendor= selectedDataValue.nonVendor?"Y":"N";
this.vehiclerepmaintMaster.vendorId= selectedDataValue.vendorId.dataId?selectedDataValue.vendorId.dataId:'';
this.vehiclerepmaintMaster.vendorInvDt= selectedDataValue.vendorInvDt;
this.vehiclerepmaintMaster.vendorInvNo= selectedDataValue.vendorInvNo;
this.vehiclerepmaintMaster.vendorName= selectedDataValue.vendorName.toString()==""?selectedDataValue.vendorId.dataName:selectedDataValue.vendorName.toString().toUpperCase();
this.vehiclerepmaintMaster.vendorAddress= selectedDataValue.vendorAddress.toString().toUpperCase();
this.vehiclerepmaintMaster.vendorState= selectedDataValue.vendorState;
this.vehiclerepmaintMaster.vendorGstNo= selectedDataValue.vendorGstNo.toString().toUpperCase();
this.vehiclerepmaintMaster.gstType= selectedDataValue.gstType;
this.vehiclerepmaintMaster.totItemAmount= selectedDataValue.totItemAmount.toString();;
this.vehiclerepmaintMaster.totSgstAmt= selectedDataValue.totSgstAmt.toString();;
this.vehiclerepmaintMaster.totCgstAmt= selectedDataValue.totCgstAmt.toString();;
this.vehiclerepmaintMaster.totIgstAmt= selectedDataValue.totIgstAmt.toString();;
this.vehiclerepmaintMaster.totItemNetAmount= selectedDataValue.totItemNetAmount;
this.vehiclerepmaintMaster.otherAmount= selectedDataValue.otherAmount.toString();;
this.vehiclerepmaintMaster.roundOff= selectedDataValue.roundOff.toString();
this.vehiclerepmaintMaster.netAmount= selectedDataValue.netAmount.toString();;
this.vehiclerepmaintMaster.remarks= selectedDataValue.remarks;
this.vehiclerepmaintMaster.pmtType= selectedDataValue.pmtType;
this.vehiclerepmaintMaster.neftPmt = selectedDataValue.neftPmt?"Y":"N";
this.vehiclerepmaintMaster.chequeNo = selectedDataValue.chequeNo.toString();
this.vehiclerepmaintMaster.creditAc= selectedDataValue.creditAc;
this.vehiclerepmaintMaster.chequeDate= selectedDataValue.chequeDate;
this.vehiclerepmaintMaster.refDocAttachedImage = selectedDataValue.refDocAttachedImage;
//this.vehiclerepmaintMaster.branchCode = selectedDataValue.branchCode;
this.vehiclerepmaintMaster.branchCode = this.branch;
this.vehiclerepmaintMaster.yearID= this.year;
this.vehiclerepmaintMaster.loggedInUser=  this.loggedInUserID;

this.vehiclerepmaintMaster.vehicleRepMaintDtlList = [];
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
      this.vehiclerepmaintMaster.vehicleRepMaintDtlList.push({
        'vrmTransDtlId': "",
        'vrmTransId': "",
        'transDate': selectedDataValue.transDate,
        'spareLubId': selectedDataValue.arrayList[i].spareLubId,
        'brandId': selectedDataValue.arrayList[i].brandId,
        'itemQty': selectedDataValue.arrayList[i].itemQty,
        'itemRate': selectedDataValue.arrayList[i].itemRate,
        'itemAmount': selectedDataValue.arrayList[i].itemAmount,
        'sgstPct': selectedDataValue.arrayList[i].sgstPct,
        'sgstAmt': selectedDataValue.arrayList[i].sgstAmt,
        'cgstPct': selectedDataValue.arrayList[i].sgstPct,
        'cgstAmt': selectedDataValue.arrayList[i].cgstAmt,
        'igstPct': selectedDataValue.arrayList[i].igstPct,
        'igstAmt': selectedDataValue.arrayList[i].igstAmt,
        'netAmount': selectedDataValue.arrayList[i].netAmount,
        'remarks': selectedDataValue.arrayList[i].remarks,        
      }) 
    }   
  } 
  
  if(this.vehiclerepmaintMaster.vehicleRepMaintDtlList.length==0){
    this.toastrService.warning("Please enter atleast one Record in Details");
    return;
  }

  let formData = new FormData();
  this.formSubmitted = true;
  formData.append('refDocAttachedImage', this.attachmentInput.nativeElement.files[0]);
  formData.append('datadetails', JSON.stringify(this.vehiclerepmaintMaster));  

  this.vehiclerepmaintMasterService.vehiclerepmaintMasterSubmitted(formData).subscribe((res: Responsemodel) => {
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



