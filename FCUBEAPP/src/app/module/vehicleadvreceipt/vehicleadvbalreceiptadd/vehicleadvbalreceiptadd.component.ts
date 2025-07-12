
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
dashboard: string ="";
  editMode= false;
  formSubmitted = false;
  
  createdBy : string = "";
    modifiedBy: string = "";
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  vehicleList : Dropdownmodel[] = [];
  vendorList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  vehicleAdvBalReceiptMaster = new VehicleadvbalreceiptModel();
  refDocAttachedImage: string = "";
  showButton = true;

  selectedvehicleAdvBalReceiptDetail = new VehicleadvbalreceiptModel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private vehicleadvbalreceiptModel: VehicleadvbalreceiptModel, 
    private vehiclerepmaintMasterService:VehicleadvbalreceiptService, 
    private sharedService : SharedService,
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
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
        if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
          this.dashboard = dashboard;
        }
        if(!this.viewStatus){      
          this.route.navigate([this.dashboard]);
        }
    
      this.sharedService.loggedInStatus = true;
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
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;


    this.selectedvehicleAdvBalReceiptDetail = this.vehiclerepmaintMasterService.getVehiclerepmaintMasterDetails();
    this.formUser = this.formBuilder.group({
      transBranch : new FormControl(this.branch,[Validators.required]),  
      transDate : new FormControl(this.loginDate,[Validators.required]),
      tripsUptoDate : new FormControl(this.loginDate,[Validators.required]),
      vehicleMasterId : new FormControl('',[Validators.required]),
      //cheqCashAmt : new FormControl('',),
      tripOnAcAdj : new FormControl('',),
      onAcAdjAmt : new FormControl('',),
      amtRecd : new FormControl('',),
      amtDed : new FormControl('',),
      amtTDS : new FormControl('',),
      amtExtras : new FormControl('',),
      totalAmtRecd : new FormControl('',[Validators.required]),
      remarks : new FormControl('',),
      receiptType : new FormControl('',[Validators.required]),
      debitAc : new FormControl('',[Validators.required]),
      neftYN : new FormControl('',),
      chequeNo : new FormControl('',),
      chequeDate : new FormControl('',),

      arrayList: this.formBuilder.array([this.createAdvanceArray()]),
    });
  
    this.getBranchList();
    this.getVehicleIdList();

    this.formUser.controls["transBranch"].disable();
    this.formUser.controls["amtRecd"].disable();
    this.formUser.controls["amtDed"].disable();
    this.formUser.controls["amtExtras"].disable();
    this.formUser.controls["amtTDS"].disable();
    this.formUser.controls["totalAmtRecd"].disable();

    if (this.selectedvehicleAdvBalReceiptDetail.transId  != '') {
      this.getCreditAcList(this.selectedvehicleAdvBalReceiptDetail.receiptType);
      setTimeout(() => {      
        this.formUser.patchValue(this.selectedvehicleAdvBalReceiptDetail);
        this.formUser.patchValue({
          transDate: this.commonService.formatDate(this.selectedvehicleAdvBalReceiptDetail.transDate),
          chequeDate: this.commonService.formatDate(this.selectedvehicleAdvBalReceiptDetail.chequeDate),
          tripsUptoDate: this.commonService.formatDate(this.selectedvehicleAdvBalReceiptDetail.tripsUptoDate),
          vehicleMasterId: this.vehicleList.find(e => e.dataId == this.selectedvehicleAdvBalReceiptDetail.vehicleMasterId),
        })
        if(this.selectedvehicleAdvBalReceiptDetail.neftYN=="N"){
          this.formUser.patchValue({
            neftYN: "",
          })
        }
        if (this.selectedvehicleAdvBalReceiptDetail.receiptType == 'B'){
          this.formUser.controls['neftYN'].enable();
          this.formUser.controls['chequeNo'].enable();
          this.formUser.controls['chequeDate'].enable();
        }
        else {
          this.formUser.controls['neftYN'].disable();
          this.formUser.controls['chequeNo'].disable();
          this.formUser.controls['chequeDate'].disable();
        }    
          
        this.formUser.controls["transDate"].disable();
        this.formUser.controls["tripsUptoDate"].disable(); 
        this.formUser.controls["vehicleMasterId"].disable();   
          
        this.getVehicleadvbalreceiptInnerGridList();
        this.showButton = false;
        this.editMode = true;
        


  this.createdBy = this.selectedvehicleAdvBalReceiptDetail.createdBy + " " + this.selectedvehicleAdvBalReceiptDetail.createdDate;
  this.modifiedBy = this.selectedvehicleAdvBalReceiptDetail.modifiedBy + " " + this.selectedvehicleAdvBalReceiptDetail.modifiedDate;   

      }, 2000);  
    }
  }

  get f() { return this.formUser.controls; }
  get formAdvanceArray() {
    return this.formUser.get("arrayList") as FormArray;    
  }
 
  createAdvanceArray() {
    return this.formBuilder.group({
      tripRouteDtlId: [''],
      loadBranch: [''],
      loadMemoNo: [''],
      loadDate: [''],
      tripNo: [''],
      dueAmt: [''],
      paidAmt: [''],
      received: [''],
      deduction: [''],
      tds: [''],
      extras: [''],
      dtlRemarks: [''],
    });   
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

  changePmtType(e: any) {
    var selectedValue = e.target.value;  
    if (selectedValue == 'B'){
      this.formUser.controls['neftYN'].enable();
      this.formUser.controls['chequeNo'].enable();
      this.formUser.controls['chequeDate'].enable();
    }
    else {
      this.formUser.controls['neftYN'].disable();
      this.formUser.controls['chequeNo'].disable();
      this.formUser.controls['chequeDate'].disable();
    }    

    this.getCreditAcList(selectedValue);
  }

  getCreditAcList(pmttp:string): void {
    this.requestmodel.strRequest= pmttp;
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditAcList = res;  
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

  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().includes(query.toLowerCase()));
  };

  searchStatement(){
    var selectedDataValue = this.formUser.getRawValue();
    if(selectedDataValue.tripsUptoDate==""){
      this.toastrService.warning("Please Select Trips Upto Date");
      return;
    }
    if (selectedDataValue.vehicleMasterId.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning("Please Select Valid Vehicle");
      return;
    }  

    this.requestmodel.strRequest = selectedDataValue.tripsUptoDate ; 
    this.requestmodel.strRequest1 = selectedDataValue.vehicleMasterId.dataId; 
    this.vehiclerepmaintMasterService.getVehicleAdvBalTripDetails(this.requestmodel).subscribe((res) => {
      this.formAdvanceArray.clear();
      this.vehicleadvbalreceiptModel = res;
      for (var i = 0; i < res.vehicleAdvBalReceiptDtlList.length; i++) {
        this.formAdvanceArray.push(this.createAdvanceArray());
     
        this.formAdvanceArray.controls[i].get("tripRouteDtlId")?.setValue(res.vehicleAdvBalReceiptDtlList[i].tripRouteDtlId); 
        this.formAdvanceArray.controls[i].get("loadBranch")?.setValue(res.vehicleAdvBalReceiptDtlList[i].loadBranch); 
        this.formAdvanceArray.controls[i].get("loadMemoNo")?.setValue(res.vehicleAdvBalReceiptDtlList[i].loadMemoNo); 
        this.formAdvanceArray.controls[i].get("loadDate")?.setValue(this.commonService.formatDate(res.vehicleAdvBalReceiptDtlList[i].loadDate)); 
        this.formAdvanceArray.controls[i].get("tripNo")?.setValue(res.vehicleAdvBalReceiptDtlList[i].tripNo); 
        this.formAdvanceArray.controls[i].get("dueAmt")?.setValue(res.vehicleAdvBalReceiptDtlList[i].dueAmt); 
        this.formAdvanceArray.controls[i].get("paidAmt")?.setValue(res.vehicleAdvBalReceiptDtlList[i].paidAmt);  
        this.formAdvanceArray.controls[i].get("received")?.setValue(res.vehicleAdvBalReceiptDtlList[i].received);   
        this.formAdvanceArray.controls[i].get("deduction")?.setValue(res.vehicleAdvBalReceiptDtlList[i].deduction);  
        this.formAdvanceArray.controls[i].get("tds")?.setValue(res.vehicleAdvBalReceiptDtlList[i].tds);    
        this.formAdvanceArray.controls[i].get("extras")?.setValue(res.vehicleAdvBalReceiptDtlList[i].extras);  
        this.formAdvanceArray.controls[i].get("dtlRemarks")?.setValue(res.vehicleAdvBalReceiptDtlList[i].dtlRemarks); 

        this.formAdvanceArray.controls[i].get("loadBranch")?.disable(); 
        this.formAdvanceArray.controls[i].get("loadMemoNo")?.disable(); 
        this.formAdvanceArray.controls[i].get("loadDate")?.disable(); 
        this.formAdvanceArray.controls[i].get("tripNo")?.disable(); 
        this.formAdvanceArray.controls[i].get("dueAmt")?.disable();        
      }     
    });
  }

  getVehicleadvbalreceiptInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedvehicleAdvBalReceiptDetail.transId; 
    this.vehiclerepmaintMasterService.getVehicleadvbalreceiptInnerGridList(this.requestmodel).subscribe((res) => {
      this.formAdvanceArray.clear();
      this.vehicleadvbalreceiptModel = res;
      for (var i = 0; i < res.vehicleAdvBalReceiptDtlList.length; i++) {
        this.formAdvanceArray.push(this.createAdvanceArray());
        this.formAdvanceArray.controls[i].get("tripRouteDtlId")?.setValue(res.vehicleAdvBalReceiptDtlList[i].tripRouteDtlId); 
        this.formAdvanceArray.controls[i].get("loadBranch")?.setValue(res.vehicleAdvBalReceiptDtlList[i].loadBranch); 
        this.formAdvanceArray.controls[i].get("loadMemoNo")?.setValue(res.vehicleAdvBalReceiptDtlList[i].loadMemoNo); 
        this.formAdvanceArray.controls[i].get("loadDate")?.setValue(this.commonService.formatDate(res.vehicleAdvBalReceiptDtlList[i].loadDate)); 
        this.formAdvanceArray.controls[i].get("tripNo")?.setValue(res.vehicleAdvBalReceiptDtlList[i].tripNo); 
        this.formAdvanceArray.controls[i].get("dueAmt")?.setValue(res.vehicleAdvBalReceiptDtlList[i].dueAmt); 
        this.formAdvanceArray.controls[i].get("paidAmt")?.setValue(res.vehicleAdvBalReceiptDtlList[i].paidAmt); 
        this.formAdvanceArray.controls[i].get("received")?.setValue(res.vehicleAdvBalReceiptDtlList[i].received);   
        this.formAdvanceArray.controls[i].get("deduction")?.setValue(res.vehicleAdvBalReceiptDtlList[i].deduction);  
        this.formAdvanceArray.controls[i].get("tds")?.setValue(res.vehicleAdvBalReceiptDtlList[i].tds);    
        this.formAdvanceArray.controls[i].get("extras")?.setValue(res.vehicleAdvBalReceiptDtlList[i].extras);  
        this.formAdvanceArray.controls[i].get("dtlRemarks")?.setValue(res.vehicleAdvBalReceiptDtlList[i].dtlRemarks); 
        
        this.formAdvanceArray.controls[i].get("loadBranch")?.disable(); 
        this.formAdvanceArray.controls[i].get("loadMemoNo")?.disable(); 
        this.formAdvanceArray.controls[i].get("loadDate")?.disable(); 
        this.formAdvanceArray.controls[i].get("tripNo")?.disable(); 
        this.formAdvanceArray.controls[i].get("dueAmt")?.disable();        
      }     
    });
  }

  onAmtChange(r: number,clmn: string){
    var totalreceived = 0;
    var totaldeduction = 0;
    var totaltds = 0;
    var totalextras = 0;
    var totItemNetAmount = 0;
    
    var dueAmt = 0;
    var paidAmt = 0;
    var received = 0;
    var deduction = 0;
    var tds = 0;
    var extras = 0;
    
    var selectedDate = this.formUser.getRawValue();

    dueAmt = parseFloat(selectedDate.arrayList[r].dueAmt) ;
    paidAmt = parseFloat(selectedDate.arrayList[r].paidAmt) ;

    received = parseFloat(selectedDate.arrayList[r].received) ;
    deduction = parseFloat(selectedDate.arrayList[r].deduction) ;
    tds = parseFloat(selectedDate.arrayList[r].tds) ;

    if(received + deduction + tds > dueAmt + paidAmt){
      this.toastrService.warning("Total Recv Amount should not be greater than Due Amount");
      this.formAdvanceArray.controls[r].get(clmn)?.setValue('0');   
      return;
    }
    else{
      for (var i = 0; i < this.formAdvanceArray.controls.length; i++) { 
        if (selectedDate.arrayList[i].received!="") {
          received = parseFloat(selectedDate.arrayList[i].received) ;
          totalreceived = totalreceived + received;
        }
        if(selectedDate.arrayList[i].deduction!="") {
          deduction = parseFloat(selectedDate.arrayList[i].deduction) ;
          totaldeduction= totaldeduction + deduction;
        }
        if(selectedDate.arrayList[i].tds!="") {
          tds = parseFloat(selectedDate.arrayList[i].tds) ;
          totaltds = totaltds + tds;
        }   
        if(selectedDate.arrayList[i].extras!="") {
          extras = parseFloat(selectedDate.arrayList[i].extras) ;
          totalextras = totalextras + extras;
        }
      }
  
      totItemNetAmount = totalreceived + totaldeduction + totaltds + totalextras;
  
      this.formUser.patchValue({
       amtRecd: totalreceived.toFixed(2),
       amtDed: totaldeduction.toFixed(2),
       amtTDS: totaltds.toFixed(2),
       amtExtras: totalextras.toFixed(2),    
       totalAmtRecd: totItemNetAmount.toFixed(2),
      });
    }    
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
    const d3 = this.minDate?Date.parse(this.minDate):0;
    const d2 = this.maxDate?Date.parse(this.maxDate):0;
    const d4 = selectedDataValue.transDate?Date.parse(selectedDataValue.transDate):0;
    if (d3>d4 || d2<d4 ) {
      this.formUser.patchValue({
        transDate: ''
      });
      this.toastrService.warning("Invalid Trans date");
      return
    }
    if (selectedDataValue.vehicleMasterId.dataId) {
      //ignore
    }
    else{
      this.toastrService.warning("Invalid Vehicle");
      return;
    }  
    
    this.vehicleadvbalreceiptModel.transId = this.selectedvehicleAdvBalReceiptDetail.transId ;
    this.vehicleadvbalreceiptModel.transBranch= selectedDataValue.transBranch;
    this.vehicleadvbalreceiptModel.transDate = selectedDataValue.transDate
    this.vehicleadvbalreceiptModel.tripsUptoDate = selectedDataValue.tripsUptoDate;
    this.vehicleadvbalreceiptModel.vehicleMasterId = selectedDataValue.vehicleMasterId.dataId?selectedDataValue.vehicleMasterId.dataId:'';
    this.vehicleadvbalreceiptModel.cheqCashAmt = "";
    this.vehicleadvbalreceiptModel.tripOnAcAdj = "";
    this.vehicleadvbalreceiptModel.onAcAdjAmt = "";
    this.vehicleadvbalreceiptModel.amtDed = selectedDataValue.amtDed.toString();
    this.vehicleadvbalreceiptModel.amtRecd = selectedDataValue.amtRecd.toString();
    this.vehicleadvbalreceiptModel.amtTDS = selectedDataValue.amtTDS.toString();
    this.vehicleadvbalreceiptModel.amtExtras = selectedDataValue.amtExtras.toString();
    this.vehicleadvbalreceiptModel.totalAmtRecd = selectedDataValue.totalAmtRecd.toString();
    this.vehicleadvbalreceiptModel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.vehicleadvbalreceiptModel.receiptType = selectedDataValue.receiptType;
    this.vehicleadvbalreceiptModel.neftYN = selectedDataValue.neftYN?"Y":"N";
    this.vehicleadvbalreceiptModel.chequeNo = selectedDataValue.chequeNo;
    this.vehicleadvbalreceiptModel.chequeDate = selectedDataValue.chequeDate;
    this.vehicleadvbalreceiptModel.debitAc = selectedDataValue.debitAc;  
    this.vehicleadvbalreceiptModel.yearId = this.year;
    this.vehicleadvbalreceiptModel.loggedInUser =  this.loggedInUserID;
    
    this.vehicleadvbalreceiptModel.vehicleAdvBalReceiptDtlList = [];
        
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      
      if ((parseFloat(selectedDataValue.arrayList[i].received) 
            + parseFloat(selectedDataValue.arrayList[i].deduction)
            + parseFloat(selectedDataValue.arrayList[i].tds)
            + parseFloat(selectedDataValue.arrayList[i].extras)) >0 ) 
      {
        this.vehicleadvbalreceiptModel.vehicleAdvBalReceiptDtlList.push({
          'tripRouteDtlId': selectedDataValue.arrayList[i].tripRouteDtlId.toString(),
          'loadBranch': "",
          'loadMemoNo': "",
          'loadDate': "",
          'tripNo': selectedDataValue.arrayList[i].tripNo.toString(),
          'dueAmt': "",
          'paidAmt': "",
          'received': selectedDataValue.arrayList[i].received.toString(),
          'deduction': selectedDataValue.arrayList[i].deduction.toString(),
          'tds': selectedDataValue.arrayList[i].tds.toString(),
          'extras': selectedDataValue.arrayList[i].extras.toString(),
          'dtlRemarks': selectedDataValue.arrayList[i].dtlRemarks.toString().toUpperCase(),
        }) 
      }   
    } 
    
    if(this.vehicleadvbalreceiptModel.vehicleAdvBalReceiptDtlList.length == 0){
      this.toastrService.warning("Please enter atleast one Record in Details");
      return;
    }
  
    this.formSubmitted = true;  
  
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

