
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Sparespurchasemasterlistmodel } from 'src/app/models/sparespurchasemasterlistmodel';
import { VehicleadvbalreceiptService } from 'src/app/services/vehicleadvbalreceipt.service';
import { VehicleadvbalreceiptlistModel } from 'src/app/models/vehicleadvbalreceiptlistmodel';
import { VehicleadvbalreceiptModel } from 'src/app/models/vehicleadvbalreceiptmodel';
import { SharedService } from 'src/app/services/shared.service';



import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';

import { CommonService } from 'src/app/services/common.service';

import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-vehicleadvbalreceiptadd',
  templateUrl: './vehicleadvbalreceiptadd.component.html',
  styleUrls: ['./vehicleadvbalreceiptadd.component.css']
})
export class VehicleadvbalreceiptaddComponent {
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
  vehicleAdvBalReceiptMaster = new VehicleadvbalreceiptModel();
  refDocAttachedImage: string = "";

  @ViewChild('attachmentInput', {
    static: true
  }) attachmentInput: any;

  selectedvehicleAdvBalReceiptDetail = new VehicleadvbalreceiptModel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private vehicleadvbalreceiptModel: VehicleadvbalreceiptModel, 
    private vehiclerepmaintMasterService:VehicleadvbalreceiptService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel) {
    this.vehicleadvbalreceiptModel = new VehicleadvbalreceiptModel();

  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Advance/Balance Receipts");
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
    
  this.selectedvehicleAdvBalReceiptDetail = this.vehiclerepmaintMasterService.getVehiclerepmaintMasterDetails();
  this.formUser = this.formBuilder.group({
    transDate : new FormControl(this.loginDate,[Validators.required]),
    transBranch : new FormControl(this.branch,[Validators.required]),  
    tripsUptoDate : new FormControl('',),
    vehicleMasterId : new FormControl('',),
    cheqCashAmt : new FormControl('',),
    tripOnAcAdj : new FormControl('',),
    onAcAdjAmt : new FormControl('',),
    amtRecd : new FormControl('',[Validators.required]),
    amtDed : new FormControl('',[Validators.required]),
    amtTDS : new FormControl('',),
    amtExtras : new FormControl('',[Validators.required]),
    totalAmtRecd : new FormControl('',),
    remarks : new FormControl('',),
    receiptType : new FormControl('',),
    neftYN : new FormControl('',),
    chequeNo : new FormControl('',),
    chequeDate : new FormControl('',),
    debitAc : new FormControl('',),
    yearId : new FormControl('',),

    arrayList: this.formBuilder.array([this.createAdvanceArray()]),
  });
  
   this.getBranchList();
   this.getVehicleIdList();
   this.getCreditAcList('');
  this.formUser.controls["amtRecd"].disable();
   this.formUser.controls["amtDed"].disable();
    this.formUser.controls["amtExtras"].disable();
    this.formUser.controls["amtTDS"].disable();
     this.formUser.controls["totalAmtRecd"].disable();

  if (this.selectedvehicleAdvBalReceiptDetail.transId  != '') {
    setTimeout(() => {
    
     // this.refDocAttachedImage = Constants.UploadFolderPath + 'vehicleRepairs/refDocAttachedImage/' + this.selectedvehicleAdvBalReceiptDetail.refDocAttachedImage;
      this.formUser.patchValue(this.selectedvehicleAdvBalReceiptDetail);
      this.formUser.patchValue({
        transDate: this.commonService.formatDate(this.selectedvehicleAdvBalReceiptDetail.transDate),
        chequeDate: this.commonService.formatDate(this.selectedvehicleAdvBalReceiptDetail.chequeDate),
        tripsUptoDate: this.commonService.formatDate(this.selectedvehicleAdvBalReceiptDetail.tripsUptoDate),
        vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedvehicleAdvBalReceiptDetail.vehicleMasterId),
     //   vendorInvDt: this.commonService.formatDate(this.selectedvehicleAdvBalReceiptDetail.vendorInvDt),
       // vendorId: this.vendorList.find(e => e.dataId == this.selectedvehicleAdvBalReceiptDetail.vendorId),
       // vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedvehicleAdvBalReceiptDetail.vehicleMasterId),
      })  
      // this.formAdvanceArray.controls[0].get("amtRecd")?.disable();   
      // this.formAdvanceArray.controls[0].get("amtDed")?.disable();  
      // this.formAdvanceArray.controls[0].get("amtTDS")?.disable();  
      // this.formAdvanceArray.controls[0].get("amtExtras")?.disable();   
      // this.formAdvanceArray.controls[0].get("totalAmtRecd")?.disable();  
    
      // if (this.selectedvehicleAdvBalReceiptDetail.nonVendor=='Y'){     
      //   this.formUser.controls['vendorId'].disable();   
      //   this.formUser.controls['vendorName'].enable(); 
      //   this.formUser.patchValue({
      //     vendorId: "",
      //     nonVendor: "Y",
      //   })
      // }
      // else {          
      //   this.formUser.controls['vendorId'].enable(); 
      //   this.formUser.controls['vendorName'].disable(); 
      //   this.formUser.patchValue({
      //     nonVendor: "",
      //   })
      // }   
    
      this.getVehicleadvbalreceiptInnerGridList();
      this.editMode =true;
    }, 2000);  
  }
}

get f() { return this.formUser.controls; }
get formAdvanceArray() {
  return this.formUser.get("arrayList") as FormArray;    
  }
 
  createAdvanceArray() {
  return this.formBuilder.group({
    transDtlId: [''],
    transId: [''],
    transBranch: [''],
    transDate: [''],
    vehicleMasterId: [''],
    tripNo: [''],
    //tripYear: [''],
   // tripRouteDtlId: [''],
    received: [''],
    deduction: [''],
    tds: [''],
    extras: [''],
    dtlRemarks: [''],
    yearId: [''],
   
  });

return this.formUser.get("arrayList") as FormArray;    
}
selectEvent(item: any) {
  // do something with selected item
}

onChangeSearch(search: string) {
  // fetch remote data from here
  // And reassign the 'data' which is binded to 'data' property.
}
addItem(i: number): void {    
  var selectedDate = this.formUser.getRawValue();
  if (this.formAdvanceArray.value[i].vehicleMasterId != "" && this.formAdvanceArray.value[i].received!="" ) {
    this.formAdvanceArray.push(this.createAdvanceArray());
    
  // this.formTyreArray.controls[i+1].get("sgstAmt")?.disable();   
  // this.formTyreArray.controls[i+1].get("cgstAmt")?.disable();  
  // this.formTyreArray.controls[i+1].get("igstAmt")?.disable();  
    
  //   if (selectedDate.gstType == "I") {   
  //     this.formTyreArray.controls[i+1].get("sgstPct")?.disable();   
  //     this.formTyreArray.controls[i+1].get("cgstPct")?.disable();  
  //     this.formTyreArray.controls[i+1].get("igstPct")?.enable();  
  //   }    
  //   else if (selectedDate.gstType == "S" || selectedDate.gstType == "C")  {      
  //     this.formTyreArray.controls[i+1].get("sgstPct")?.enable();   
  //     this.formTyreArray.controls[i+1].get("cgstPct")?.enable();  
  //     this.formTyreArray.controls[i+1].get("igstPct")?.disable();  
  //   }
  //   else{              
  //     this.formTyreArray.controls[i+1].get("sgstPct")?.disable();   
  //     this.formTyreArray.controls[i+1].get("cgstPct")?.disable();  
  //     this.formTyreArray.controls[i+1].get("igstPct")?.disable();  
  //   } 
  // } 
  // else {
  //   this.toastrService.warning("Please Enter  Spares Details");
   }
}


onFocused(e: any) {
  // do something
}
getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}

startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
  return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
};


removeItem(index: number) {
  this.formAdvanceArray.removeAt(index);  
}  
advancereceiptMasterDelete(): void {
  if(this.selectedvehicleAdvBalReceiptDetail.transId != '' ){
  this.requestmodel.strRequest =this.selectedvehicleAdvBalReceiptDetail.transId 
    if (confirm("Are you sure, you want to delete this?")) {
          this.vehiclerepmaintMasterService.VehicleadvbalreceiptModelDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formUser.reset();
            this.route.navigate(['/vehicleadvballist']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
      });
    }
  }
}
  
exit(): void {
  this.route.navigate(['/vehicleadvballist']);
}  
getVehicleIdList(): void {
  this.commonService.getVehicleIdList().subscribe((res) => {
    this.vehicleList = res;
  });
}
getCreditAcList(pmttp:string): void {
  this.requestmodel.strRequest= pmttp;
  this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
    this.creditAcList = res;      
  });
}
onAmtChange(){
  var totalItemAmt = 0;
  var totalreceived = 0;
  var totaldeduction = 0;
  var totaltds = 0;
  var totalextras = 0;
  var totItemNetAmount = 0;
  var itemAmount = 0;
  var itemRate = 0;
  var itemQty = 0;
  var totalItemAmt = 0;
  var received = 0;
  var deduction = 0;
  var tds = 0;
  var extras = 0;
  
  var selectedDate = this.formUser.getRawValue();

  for (var i = 0; i < this.formAdvanceArray.controls.length; i++) {
    // this.formAdvanceArray.controls[i].get("received")?.setValue("");
    // this.formAdvanceArray.controls[i].get("deduction")?.setValue("");
    // this.formAdvanceArray.controls[i].get("tds")?.setValue("");
    // this.formAdvanceArray.controls[i].get("extras")?.setValue("");


    if (selectedDate.arrayList[i].received!="") {
      received= parseFloat(selectedDate.arrayList[i].received) ;
     // this.formAdvanceArray.controls[i].get("itemAmount")?.setValue(itemAmount.toFixed(2));
    
      totalreceived = totalreceived+received;
      if(selectedDate.arrayList[i].deduction!="") {
        deduction= parseFloat(selectedDate.arrayList[i].deduction) ;
        // this.formAdvanceArray.controls[i].get("itemAmount")?.setValue(itemAmount.toFixed(2));
       
         totaldeduction= totaldeduction+deduction;
      }
      if(selectedDate.arrayList[i].extras!="") {
        extras= parseFloat(selectedDate.arrayList[i].extras) ;
        // this.formAdvanceArray.controls[i].get("itemAmount")?.setValue(itemAmount.toFixed(2));
       
        totalextras = totalextras+extras;
      }
      if(selectedDate.arrayList[i].tds!="") {
        tds= parseFloat(selectedDate.arrayList[i].tds) ;
        // this.formAdvanceArray.controls[i].get("itemAmount")?.setValue(itemAmount.toFixed(2));
       
         totaltds = totaltds+tds;
      }      
      // netAmount = sgstAmt + cgstAmt+igstAmt+ itemAmount;  
      // this.formTyreArray.controls[i].get("netAmount")?.setValue(netAmount.toFixed(2));
    
      totItemNetAmount = totalextras+ totaltds+deduction+received;
    }
  }  
 // netAmount = totItemNetAmount ;
  // if(selectedDate.roundOff!="") {
  //   netAmount = netAmount + parseFloat(selectedDate.roundOff);
  // }
  // if(selectedDate.otherAmount!="") {
  //   netAmount = netAmount + parseFloat(selectedDate.otherAmount);
  // }
  this.formUser.patchValue({
   // totItemAmount : totalItemAmt.toFixed(2),
   amtRecd: totalreceived.toFixed(2),
   amtDed: totaldeduction.toFixed(2),
   amtTDS: totaltds.toFixed(2),
   amtExtras: totalextras.toFixed(2),
  
   totalAmtRecd: totItemNetAmount.toFixed(2),
  });
}


getVehicleadvbalreceiptInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedvehicleAdvBalReceiptDetail.transId; 
    this.vehiclerepmaintMasterService.getVehicleadvbalreceiptInnerGridList(this.requestmodel).subscribe((res) => {
      this.formAdvanceArray.clear();
      this.vehicleadvbalreceiptModel = res;
      for (var i = 0; i < res.vehicleAdvBalReceiptDtlList.length; i++) {
        this.formAdvanceArray.push(this.createAdvanceArray());
        this.formAdvanceArray.controls[i].get("transDtlId")?.setValue(res.vehicleAdvBalReceiptDtlList[i].transDtlId);
        this.formAdvanceArray.controls[i].get("transId")?.setValue(res.vehicleAdvBalReceiptDtlList[i].transId);  
        this.formAdvanceArray.controls[i].get("transDate")?.setValue(res.vehicleAdvBalReceiptDtlList[i].transDate); 
        this.formAdvanceArray.controls[i].get("transBranch")?.setValue(res.vehicleAdvBalReceiptDtlList[i].transBranch);  
        this.formAdvanceArray.controls[i].get("vehicleMasterId")?.setValue(this.vehicleList.find(e => e.dataId ==res.vehicleAdvBalReceiptDtlList[i].vehicleMasterId));  
        this.formAdvanceArray.controls[i].get("received")?.setValue(res.vehicleAdvBalReceiptDtlList[i].received);   
        this.formAdvanceArray.controls[i].get("deduction")?.setValue(res.vehicleAdvBalReceiptDtlList[i].deduction);  
        this.formAdvanceArray.controls[i].get("tds")?.setValue(res.vehicleAdvBalReceiptDtlList[i].tds);    
        this.formAdvanceArray.controls[i].get("extras")?.setValue(res.vehicleAdvBalReceiptDtlList[i].extras);  
        this.formAdvanceArray.controls[i].get("dtlRemarks")?.setValue(res.vehicleAdvBalReceiptDtlList[i].dtlRemarks);   
        this.formAdvanceArray.controls[i].get("yearId")?.setValue(res.vehicleAdvBalReceiptDtlList[i].yearId);  

      
        // this.formAdvanceArray.controls[i].get("sgstAmt")?.disable();   
        // this.formAdvanceArray.controls[i].get("cgstAmt")?.disable();  
        // this.formAdvanceArray.controls[i].get("igstAmt")?.disable(); 
        // this.formAdvanceArray.controls[0].get("netAmount")?.disable(); 
        // this.formAdvanceArray.controls[0].get("itemAmount")?.disable();   
  
        // if (this.selectedvehiclerepmaintMasterDetail.gstType == "I") {   
        //   this.formAdvanceArray.controls[i].get("sgstPct")?.disable();   
        //   this.formAdvanceArray.controls[i].get("cgstPct")?.disable();  
        //   this.formAdvanceArray.controls[i].get("igstPct")?.enable();  
        // }    
        // else if (this.selectedvehiclerepmaintMasterDetail.gstType == "S" || this.selectedvehiclerepmaintMasterDetail.gstType == "C")  {      
        //   this.formAdvanceArray.controls[i].get("sgstPct")?.enable();   
        //   this.formAdvanceArray.controls[i].get("cgstPct")?.enable();  
        //   this.formAdvanceArray.controls[i].get("igstPct")?.disable();  
        // }
        // else{              
        //   this.formAdvanceArray.controls[i].get("sgstPct")?.disable();   
        //   this.formAdvanceArray.controls[i].get("cgstPct")?.disable();  
        //   this.formAdvanceArray.controls[i].get("igstPct")?.disable();  
        // } 
      }     
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
  
    
  this.vehicleadvbalreceiptModel.transId = this.selectedvehicleAdvBalReceiptDetail.transId ;
  this.vehicleadvbalreceiptModel.transBranch= selectedDataValue.transBranch;
  this.vehicleadvbalreceiptModel.transDate = selectedDataValue.transDate
  this.vehicleadvbalreceiptModel.tripsUptoDate= selectedDataValue.tripsUptoDate;
  //this.vehiclerepmaintMaster.vehicleMasterId= selectedDataValue.vehicleMasterId;
  this.vehicleadvbalreceiptModel.vehicleMasterId= selectedDataValue.vehicleMasterId.dataId?selectedDataValue.vehicleMasterId.dataId:'';
  this.vehicleadvbalreceiptModel.cheqCashAmt= selectedDataValue.cheqCashAmt.toString();;
 // this.vehiclerepmaintMaster.nonVendor= selectedDataValue.nonVendor?"Y":"N";
  //this.vehiclerepmaintMaster.vendorId= selectedDataValue.vendorId.dataId?selectedDataValue.vendorId.dataId:'';
  //this.vehicleadvbalreceiptModel.tripOnAcAdj= selectedDataValue.tripOnAcAdj;
 // this.vehicleadvbalreceiptModel.onAcAdjAmt= selectedDataValue.onAcAdjAmt;
 // this.vehicleadvbalreceiptModel.amtRecd= selectedDataValue.amtRecd.toString()==""?selectedDataValue.vendorId.dataName:selectedDataValue.vendorName.toString().toUpperCase();
  this.vehicleadvbalreceiptModel.amtDed= selectedDataValue.amtDed.toString();;
  this.vehicleadvbalreceiptModel.amtRecd= selectedDataValue.amtRecd.toString();;
  this.vehicleadvbalreceiptModel.amtTDS= selectedDataValue.amtTDS.toString();;
  this.vehicleadvbalreceiptModel.amtExtras= selectedDataValue.amtExtras.toString();;
  this.vehicleadvbalreceiptModel.totalAmtRecd= selectedDataValue.totalAmtRecd.toString();
  this.vehicleadvbalreceiptModel.remarks= selectedDataValue.remarks;
  this.vehicleadvbalreceiptModel.receiptType= selectedDataValue.receiptType;
  this.vehicleadvbalreceiptModel.neftYN= selectedDataValue.neftYN;
  this.vehicleadvbalreceiptModel.chequeNo= selectedDataValue.chequeNo;
  this.vehicleadvbalreceiptModel.chequeDate= selectedDataValue.chequeDate;
  this.vehicleadvbalreceiptModel.debitAc= selectedDataValue.debitAc;

  
  this.vehicleadvbalreceiptModel.yearId= this.year;
  this.vehicleadvbalreceiptModel.loggedInUser=  this.loggedInUserID;
  
  this.vehicleadvbalreceiptModel.vehicleAdvBalReceiptDtlList = [];
    // if(selectedDataValue.netAmount=="" || parseFloat(selectedDataValue.netAmount)==0 ){
    //   this.toastrService.warning("Total Net Amount should not be zero");
    //   return;
    // }
      
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if (selectedDataValue.arrayList[i].vehicleMasterId == "" || selectedDataValue.arrayList[i].received=="" ) {
        this.toastrService.warning("Please Enter Details Properly");
        return;
      } 
      else{
        this.vehicleadvbalreceiptModel.vehicleAdvBalReceiptDtlList.push({
          'transDtlId': "",
          'transId': "",
         // 'transBranch': selectedDataValue.transBranch,
         'transBranch': selectedDataValue.arrayList[i].transBranch,
          'transDate': selectedDataValue.transDate,
          'vehicleMasterId': selectedDataValue.arrayList[i].vehicleMasterId.dataId,
          'tripNo': selectedDataValue.arrayList[i].tripNo,
        //  'tripYear': selectedDataValue.arrayList[i].tripYear,
      //    'tripRouteDtlId': selectedDataValue.arrayList[i].tripRouteDtlId,
          'received': selectedDataValue.arrayList[i].received.toString(),
        //  'sgstAmt': selectedDataValue.arrayList[i].sgstAmt,
          'deduction': selectedDataValue.arrayList[i].deduction.toString(),
          'tds': selectedDataValue.arrayList[i].tds.toString(),
          'extras': selectedDataValue.arrayList[i].extras.toString(),
          'dtlRemarks': selectedDataValue.arrayList[i].dtlRemarks,
          'yearId': selectedDataValue.arrayList[i].yearId,
                 
        }) 
      }   
    } 
    
    if(this.vehicleadvbalreceiptModel.vehicleAdvBalReceiptDtlList.length==0){
      this.toastrService.warning("Please enter atleast one Record in Details");
      return;
    }
  
    let formData = new FormData();
   // formData.append('refDocAttachedImage', this.attachmentInput.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.vehicleadvbalreceiptModel));
    this.formSubmitted = true;  
  
   // this.vehiclerepmaintMasterService.VehicleadvbalreceiptSubmitted(formData).subscribe((res: Responsemodel) => {
      this.vehiclerepmaintMasterService.VehicleadvbalreceiptSubmitted(this.vehicleadvbalreceiptModel).subscribe((res: Responsemodel) => {
   
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/vehicleadvballist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }      
    });
  }  
   
  
}

