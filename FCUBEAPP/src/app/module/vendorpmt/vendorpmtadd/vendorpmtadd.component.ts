import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Vendorpmtmodel } from 'src/app/models/vendorpmtmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { VendorpmtService } from 'src/app/services/vendorpmt.service';
import { SharedService } from 'src/app/services/shared.service';
import { Requestmodel } from 'src/app/models/requestmodel';


@Component({
  selector: 'app-vendorpmtadd',
  templateUrl: './vendorpmtadd.component.html',
  styleUrls: ['./vendorpmtadd.component.css']
})
export class VendorpmtaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  minDate: string = '';
  maxDate: string = '';
  branch: string = '';
  createdBy : string = "";
  modifiedBy: string = "";
  branchList: Dropdownmodel[] = [];
  vendorList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  formUser!: FormGroup;
  selectedVendorPmtDetails = new Vendorpmtmodel();

  seriesDoc: string = "";
  seriesDocJV: string = "";

  keywordLocation = 'dataName';
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";

  formSubmitted = false;
  responseDetails = new Responsemodel();
 
  constructor(private reportmodel: Reportmodel, 
    private requestmodel:Requestmodel,private vendorpmtmodel:Vendorpmtmodel,
    private route: Router, private formBuilder: FormBuilder, private commonService: CommonService,
    private sharedService: SharedService,
    private vendorpmtService: VendorpmtService, private toasterService: ToastrService) {
      this.vendorpmtmodel= new Vendorpmtmodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Vendor Payments"));
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

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;

    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
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
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    
    this.sharedService.loading=true;   
 
    this.getBranchList();
    this.getVendorList();

    this.selectedVendorPmtDetails = this.vendorpmtService.getVendorPmtDetails();

    this.formUser = this.formBuilder.group({
      transBranch: new FormControl(this.branch, [Validators.required]),
      transDate: new FormControl(this.loginDate, [Validators.required]),
      billsUptoDate: new FormControl(this.loginDate, [Validators.required]), 
      vendorId: new FormControl('', [Validators.required]),
      totalAmtPaid: new FormControl('0',),
      totalAmtDed: new FormControl('0',),
      totalAmtTDS: new FormControl('0',),
      totalAmtExtras:new FormControl('0',),
      netAmtPaid: new FormControl('0', [Validators.required]),
      remarks: new FormControl('',),
      pmtType: new FormControl('', [Validators.required]),   
      neftYN: new FormControl('', ),
      chequeNo: new FormControl('',),
      chequeDate: new FormControl('',),
      creditAc: new FormControl('', [Validators.required]),
      selectedAll: new FormControl(''),
      arrayList: this.formBuilder.array([this.createInitialArray()])        
    });
    this.formUser.controls['neftYN'].disable();
    this.formUser.controls['chequeNo'].disable();
    this.formUser.controls['chequeDate'].disable();
    
    this.sharedService.loading=false; 
    if (this.selectedVendorPmtDetails.transId != '') {      
      this.getCreditAcList(this.selectedVendorPmtDetails.pmtType);      
    }
    setTimeout(() => {
      if (this.selectedVendorPmtDetails.transId != '') {
        this.formUser.patchValue(this.selectedVendorPmtDetails);
        this.formUser.patchValue({
          transDate:this.commonService.formatDate(this.selectedVendorPmtDetails.transDate),
          billsUptoDate:this.commonService.formatDate(this.selectedVendorPmtDetails.billsUptoDate),
          chequeDate:this.commonService.formatDate(this.selectedVendorPmtDetails.chequeDate),
          vendorId: this.vendorList.find(e => e.dataId == this.selectedVendorPmtDetails.vendorId),   
          selectedAll:'Y'   
        })
        if(this.selectedVendorPmtDetails.finDocid!="0"){
          this.getFinDocDetails("id",this.selectedVendorPmtDetails.finDocid);
        }        
        if(this.selectedVendorPmtDetails.finDocidJV!="0"){
          this.getFinDocDetails("JV",this.selectedVendorPmtDetails.finDocidJV);
        }
        if(this.selectedVendorPmtDetails.pmtType == "B" && this.selectedVendorPmtDetails.neftYN == "N"){
          this.formUser.controls['chequeNo'].setValidators([Validators.required]);
          this.formUser.controls['chequeDate'].setValidators([Validators.required]);
          this.formUser.controls['chequeNo'].updateValueAndValidity();
          this.formUser.controls['chequeDate'].updateValueAndValidity();
          this.formUser.controls['chequeNo'].enable();
          this.formUser.controls['chequeDate'].enable();
        }
        else{
          this.formUser.controls['chequeNo'].disable();
          this.formUser.controls['chequeDate'].disable();
        }

        this.createdBy = this.selectedVendorPmtDetails.createdBy + " " + this.selectedVendorPmtDetails.createdDate;
        this.modifiedBy = this.selectedVendorPmtDetails.modifiedBy + " " + this.selectedVendorPmtDetails.modifiedDate;  
        this.editMode=true;
        this.getVendorPmtInnerGridList();
        this.formUser.controls['transDate'].disable();  
        this.formUser.controls['billsUptoDate'].disable();   
        this.formUser.controls['vendorId'].disable();     
        this.formUser.controls['selectedAll'].disable();  
      }    
    }, 2000);

    this.formUser.controls['transBranch'].disable();  
    this.formUser.controls["totalAmtPaid"].disable();
    this.formUser.controls["totalAmtDed"].disable();
    this.formUser.controls["totalAmtTDS"].disable();
    this.formUser.controls["totalAmtExtras"].disable();
    this.formUser.controls["netAmtPaid"].disable();
  }

  get f() { return this.formUser.controls; }
  get formArray() {
    return this.formUser.get("arrayList") as FormArray;
  }

  
  createInitialArray() {
    return this.formBuilder.group({       
      pmtForm: ['', []],
      vendorBillMasterId: ['', []], 
      vehicleNo: ['', []], 
      vendorInvNo: ['', []], 
      vendorInvDt: ['', []], 
      netAmount: ['', []], 
      amtPaid: ['', []],
      amtDed: ['', []],
      amtTDS: ['', []],
      amtExtras: ['', []],
      dtlRemarks: ['', []],
      selected: ['', []],
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getVendorList(){
    this.commonService.getVendorList().subscribe((res) => {
      this.vendorList = res;
    });
  }   

  onChangeSearch(search: string) {
    // fetch remote data from here
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
  
  getFinDocDetails(tp:string,finId: string){
    this.requestmodel.strRequest=finId;
    this.commonService.getFinDocDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {        
        if(tp=="JV"){          
          this.seriesDocJV = res.message;
        }
        else{
          this.seriesDoc = res.message;
        }
      } 
    });
  }

  searchStatement(): void { 
    var selectedDataVal=this.formUser.getRawValue();
    if (this.formUser.controls["billsUptoDate"].invalid) {
      this.toasterService.warning(" Please Select Bills Up to Date");  
      return; 
    } 
    if (this.formUser.controls["vendorId"].invalid) {
      this.toasterService.warning(" Please Select a Vendor");  
      return; 
    }   
    if(selectedDataVal.vendorId.dataId)
    {
      this.reportmodel.toDate=selectedDataVal.billsUptoDate;
      this.reportmodel.filterStr=selectedDataVal.vendorId?selectedDataVal.vendorId.dataId:'';
      this.vendorpmtService.getVendorPmtSearchList(this.reportmodel).subscribe((res: Vendorpmtmodel) => {
        if(res.vendorPmtDetailList.length>0){
          this.formUser.controls["billsUptoDate"].disable();
          this.formUser.controls["vendorId"].disable();
        }
        this.formArray.clear();
        for (var i = 0; i < res.vendorPmtDetailList.length; i++) {
          this.formArray.push(this.createInitialArray());
          this.formArray.controls[i].get("pmtForm")?.setValue(res.vendorPmtDetailList[i].pmtForm);
          this.formArray.controls[i].get("vendorBillMasterId")?.setValue(res.vendorPmtDetailList[i].vendorBillMasterId);
          this.formArray.controls[i].get("vehicleNo")?.setValue(res.vendorPmtDetailList[i].vehicleNo);
          this.formArray.controls[i].get("vendorInvNo")?.setValue(res.vendorPmtDetailList[i].vendorInvNo);
          this.formArray.controls[i].get("vendorInvDt")?.setValue(this.commonService.formatDate(res.vendorPmtDetailList[i].vendorInvDt));
          this.formArray.controls[i].get("netAmount")?.setValue(res.vendorPmtDetailList[i].netAmount);
          this.formArray.controls[i].get("amtPaid")?.setValue("0");
          this.formArray.controls[i].get("amtDed")?.setValue("0");
          this.formArray.controls[i].get("amtTDS")?.setValue("0");
          this.formArray.controls[i].get("amtExtras")?.setValue("0");
          this.formArray.controls[i].get("dtlRemarks")?.setValue("");
          
          this.formArray.controls[i].get("pmtForm")?.disable();
          this.formArray.controls[i].get("vehicleNo")?.disable();
          this.formArray.controls[i].get("vendorInvNo")?.disable();
          this.formArray.controls[i].get("vendorInvDt")?.disable();
          this.formArray.controls[i].get("netAmount")?.disable();
          this.formArray.controls[i].get("amtPaid")?.disable();
          this.formArray.controls[i].get("amtDed")?.disable();
          this.formArray.controls[i].get("amtTDS")?.disable();
          this.formArray.controls[i].get("amtExtras")?.disable();
          this.formArray.controls[i].get("dtlRemarks")?.disable();
        }
      });  
    } 
    else{
      this.toasterService.warning(" Please Select Vendor");  
      return; 
    }
  }
  
  getVendorPmtInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedVendorPmtDetails.transId;
    this.vendorpmtService.getVendorPmtInnerGridList(this.requestmodel).subscribe((res) => {
      this.formArray.clear();
      
      for (var i = 0; i < res.vendorPmtDetailList.length; i++) {
        this.formArray.push(this.createInitialArray());
          this.formArray.controls[i].get("selected")?.setValue('Y');
          this.formArray.controls[i].get("pmtForm")?.setValue(res.vendorPmtDetailList[i].pmtForm);
          this.formArray.controls[i].get("vendorBillMasterId")?.setValue(res.vendorPmtDetailList[i].vendorBillMasterId);
          this.formArray.controls[i].get("vehicleNo")?.setValue(res.vendorPmtDetailList[i].vehicleNo);
          this.formArray.controls[i].get("vendorInvNo")?.setValue(res.vendorPmtDetailList[i].vendorInvNo);
          this.formArray.controls[i].get("vendorInvDt")?.setValue(this.commonService.formatDate(res.vendorPmtDetailList[i].vendorInvDt));
          this.formArray.controls[i].get("netAmount")?.setValue(res.vendorPmtDetailList[i].netAmount);
          this.formArray.controls[i].get("amtPaid")?.setValue(res.vendorPmtDetailList[i].amtPaid);
          this.formArray.controls[i].get("amtDed")?.setValue(res.vendorPmtDetailList[i].amtDed);
          this.formArray.controls[i].get("amtTDS")?.setValue(res.vendorPmtDetailList[i].amtTDS);
          this.formArray.controls[i].get("amtExtras")?.setValue(res.vendorPmtDetailList[i].amtExtras);
          this.formArray.controls[i].get("dtlRemarks")?.setValue(res.vendorPmtDetailList[i].dtlRemarks);
          
          this.formArray.controls[i].get("pmtForm")?.disable();
          this.formArray.controls[i].get("vehicleNo")?.disable();
          this.formArray.controls[i].get("vendorInvNo")?.disable();
          this.formArray.controls[i].get("vendorInvDt")?.disable();
          this.formArray.controls[i].get("netAmount")?.disable();
          this.formArray.controls[i].get("amtPaid")?.disable();
          this.formArray.controls[i].get("amtDed")?.disable();
          this.formArray.controls[i].get("amtTDS")?.disable();
          this.formArray.controls[i].get("amtExtras")?.disable();
          this.formArray.controls[i].get("dtlRemarks")?.disable();
      }
    });  
  }

  selectAll(e: any) {
    if(e.target.checked){
      for (var i = 0; i < this.vendorpmtmodel.vendorPmtDetailList.length; i++) {
        this.formArray.controls[i].get("selected")?.setValue('Y');
        this.formArray.controls[i].get("amtPaid")?.enable();
        this.formArray.controls[i].get("amtDed")?.enable();
        this.formArray.controls[i].get("amtTDS")?.enable();
        this.formArray.controls[i].get("amtExtras")?.enable();
        this.formArray.controls[i].get("dtlRemarks")?.enable();
      }
    }
    else{
      for (var i = 0; i < this.vendorpmtmodel.vendorPmtDetailList.length; i++) {
        this.formArray.controls[i].get("selected")?.setValue('');
        this.formArray.controls[i].get("amtPaid")?.disable();
        this.formArray.controls[i].get("amtDed")?.disable();
        this.formArray.controls[i].get("amtTDS")?.disable();
        this.formArray.controls[i].get("amtExtras")?.disable();
        this.formArray.controls[i].get("dtlRemarks")?.disable();
      }
    }
  }

  selectedData(i: number, e: any) {
    if(e.target.checked){
      this.formArray.controls[i].get("selected")?.setValue('Y');
      this.formArray.controls[i].get("amtPaid")?.enable();
      this.formArray.controls[i].get("amtDed")?.enable();
      this.formArray.controls[i].get("amtTDS")?.enable();
      this.formArray.controls[i].get("amtExtras")?.enable();
      this.formArray.controls[i].get("dtlRemarks")?.enable();
    }
    else{
      this.formArray.controls[i].get("selected")?.setValue('');
      this.formArray.controls[i].get("amtPaid")?.disable();
      this.formArray.controls[i].get("amtDed")?.disable();
      this.formArray.controls[i].get("amtTDS")?.disable();
      this.formArray.controls[i].get("amtExtras")?.disable();
      this.formArray.controls[i].get("dtlRemarks")?.disable();
    }
  }
  

  calculateTotal(index:number, clm:string) {
    var totalAmtPaid = 0;
    var totalAmtDed = 0;
    var totalAmtTDS = 0;
    var totalAmtExtras = 0;
    var netAmtPaid = 0;

    var selectedData = this. formUser.getRawValue(); 

    var netAmount = selectedData.arrayList[index].netAmount? parseFloat(selectedData.arrayList[index].netAmount): 0;
    var amtPaid = selectedData.arrayList[index].amtPaid? parseFloat(selectedData.arrayList[index].amtPaid): 0;
    var amtDed = selectedData.arrayList[index].amtDed? parseFloat(selectedData.arrayList[index].amtDed): 0;
    var amtTDS = selectedData.arrayList[index].amtTDS? parseFloat(selectedData.arrayList[index].amtTDS): 0;
    
    if(netAmount < (amtPaid + amtDed + amtTDS)){
      this.toasterService.warning("Paid Amount Should not be more than Net Amount");
      this.formArray.controls[index].get(clm)?.setValue("0");
      return;
    }

    for (var i = 0; i < selectedData.arrayList.length; i++) {
      if (selectedData.arrayList[i].selected) {        
        totalAmtPaid = totalAmtPaid + parseFloat(selectedData.arrayList[i].amtPaid);
        totalAmtDed = totalAmtDed + parseFloat(selectedData.arrayList[i].amtDed);
        totalAmtTDS = totalAmtTDS + parseFloat(selectedData.arrayList[i].amtTDS);
        totalAmtExtras = totalAmtExtras + parseFloat(selectedData.arrayList[i].amtExtras);
      }
    }
    netAmtPaid = totalAmtPaid + totalAmtExtras;

    this.formUser.patchValue({
      totalAmtPaid: totalAmtPaid.toFixed(2),
      totalAmtDed: totalAmtDed.toFixed(2),
      totalAmtTDS: totalAmtTDS.toFixed(2),
      totalAmtExtras: totalAmtExtras.toFixed(2),
      netAmtPaid: netAmtPaid.toFixed(2),
    });
  }
  
  changePmtType(e: any) {
    var selectedValue = e.target.value;   
    this.getCreditAcList(selectedValue);
  }

  getCreditAcList(pmttp:string): void {
    this.requestmodel.strRequest= pmttp;
    
    if (pmttp == 'B'){
      this.formUser.controls['neftYN'].enable();
      this.formUser.controls['chequeNo'].enable();
      this.formUser.controls['chequeDate'].enable();
    }
    else {
      this.formUser.controls['neftYN'].disable();
      this.formUser.controls['chequeNo'].disable();
      this.formUser.controls['chequeDate'].disable(); 
    }
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditAcList = res;
    });
  }

  onneftChange(e:any){
    var selectedValue = e.target.value;
    if(selectedValue == "Y"){
      this.formUser.controls['chequeNo'].clearValidators();      
      this.formUser.controls['chequeDate'].clearValidators();  
      this.formUser.controls['chequeNo'].disable();
      this.formUser.controls['chequeDate'].disable();
    }
    else { 
      this.formUser.controls['chequeNo'].setValidators([Validators.required]);
      this.formUser.controls['chequeDate'].setValidators([Validators.required]);   
      this.formUser.controls['chequeNo'].enable();
      this.formUser.controls['chequeDate'].enable();
    }
    this.formUser.controls['chequeNo'].updateValueAndValidity();
    this.formUser.controls['chequeDate'].updateValueAndValidity();
  }

  exit(): void {
    this.route.navigate(['/vendorpmtlist']);
  }

  deleteVendorPmtForm(): void {
    if(this.selectedVendorPmtDetails.transId != '' ){      
    this.sharedService.loading=true;
     this.requestmodel.strRequest =this.selectedVendorPmtDetails.transId
      if (confirm("Are you sure, you want to delete this?")) {
            this.vendorpmtService.vendorPmtDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if(this.responseDetails.status){
              this.toasterService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/vendorpmtlist']);
            }
            else{
              this.toasterService.warning(this.responseDetails.message);        
            }   
        });
      }
      
    this.sharedService.loading=false;
    }
  }

  saveVendorPmtDetails(): void {
    if (this.formUser.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }

    var selectedDataVal=this.formUser.getRawValue();
    
    if(selectedDataVal.vendorId.dataId)
    { 
      //ignore
    }
    else{
      this.toasterService.warning(" Invalid Vendor");  
      return; 
    }  
          
    this.formSubmitted = true;
    this.vendorpmtmodel.transId = this.selectedVendorPmtDetails.transId ;
    this.vendorpmtmodel.transBranch = selectedDataVal.transBranch;
    this.vendorpmtmodel.transDate = selectedDataVal.transDate;
    this.vendorpmtmodel.billsUptoDate = selectedDataVal.billsUptoDate;
    this.vendorpmtmodel.vendorId        = selectedDataVal.vendorId?selectedDataVal.vendorId.dataId:'';
    this.vendorpmtmodel.totalAmtPaid = selectedDataVal.totalAmtPaid.toString();
    this.vendorpmtmodel.totalAmtDed = selectedDataVal.totalAmtDed.toString();
    this.vendorpmtmodel.totalAmtTDS = selectedDataVal.totalAmtTDS.toString();
    this.vendorpmtmodel.totalAmtExtras = selectedDataVal.totalAmtExtras.toString();
    this.vendorpmtmodel.netAmtPaid = selectedDataVal.netAmtPaid.toString();
    this.vendorpmtmodel.remarks = selectedDataVal.remarks.toString().toUpperCase();
    this.vendorpmtmodel.pmtType = selectedDataVal.pmtType;
    this.vendorpmtmodel.neftYN = selectedDataVal.neftYN;
    this.vendorpmtmodel.chequeNo = selectedDataVal.chequeNo;
    this.vendorpmtmodel.chequeDate = selectedDataVal.chequeDate;
    this.vendorpmtmodel.creditAc = selectedDataVal.creditAc;
    this.vendorpmtmodel.yearId          = this.year;
    this.vendorpmtmodel.loggedInUser    = this.loggedInUserID;

    this.vendorpmtmodel.vendorPmtDetailList = [];

    var arr = selectedDataVal.arrayList;

    for (var i = 0; i < arr.length; i++) {
      if(arr[i].selected){
        if((parseFloat(arr[i].amtPaid) + parseFloat(arr[i].amtDed) + parseFloat(arr[i].amtTDS)) > 0){
          this.vendorpmtmodel.vendorPmtDetailList.push({
            'pmtForm': arr[i].pmtForm.toString(),
            'vendorBillMasterId': arr[i].vendorBillMasterId.toString(),
            'vehicleNo': arr[i].vehicleNo.toString(),
            'vendorInvNo': arr[i].vendorInvNo.toString(),
            'vendorInvDt': arr[i].vendorInvDt.toString(),
            'netAmount': arr[i].netAmount.toString(),
            'amtPaid': arr[i].amtPaid.toString(),
            'amtDed': arr[i].amtDed.toString(),
            'amtTDS': arr[i].amtTDS.toString(),
            'amtExtras': arr[i].amtExtras.toString(),
            'dtlRemarks': arr[i].dtlRemarks.toString(),
          });
        }
        else{
          this.toasterService.warning("Please enter the amount in the detail section");
          return;
        }
      }
    }

    this.sharedService.loading=true;

    this.vendorpmtService.vendorPmtDetailsSave(this.vendorpmtmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/vendorpmtlist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      } 
    });
        
    this.sharedService.loading=false;
  }
}
