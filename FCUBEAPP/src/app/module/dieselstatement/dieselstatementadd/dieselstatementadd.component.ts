import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dieselstatementmodel } from 'src/app/models/dieselstatementmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { DieselstatementService } from 'src/app/services/dieselstatement.service';
import { SharedService } from 'src/app/services/shared.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Dieselstatementsearchlistmodel } from 'src/app/models/dieselstatementsearchlistmodel';


@Component({
  selector: 'app-dieselstatementadd',
  templateUrl: './dieselstatementadd.component.html',
  styleUrls: ['./dieselstatementadd.component.css']
})
export class DieselstatementaddComponent implements OnInit {
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
  vendorList:Dropdownmodel[] = [];
  formDieselStatement!: FormGroup;
  selectedDieselStmtDetails = new Dieselstatementmodel()
  dieselstatementsearchlistmodel = new Dieselstatementsearchlistmodel();
  seriesDoc: string = "";

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
    private requestmodel:Requestmodel,private DieselStatementmodel:Dieselstatementmodel,
    private route: Router, private formBuilder: FormBuilder, private commonService: CommonService,
     private sharedService: SharedService,
    private dieselstatementService: DieselstatementService, private toasterService: ToastrService) {
      this.DieselStatementmodel= new Dieselstatementmodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Diesel Statement"));
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
    else if(this.loggedInUserID==""){
      this.route.navigate(['/']);
    }
    else if(this.loggedInUserID=="0"){
      this.route.navigate(['/']);
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

    this.selectedDieselStmtDetails = this.dieselstatementService.getDieselStatementDetails();
    this.formDieselStatement = this.formBuilder.group({
      BranchCode: new FormControl(this.branch, [Validators.required]),
      billStmtDate: new FormControl(this.loginDate, [Validators.required]),
      fromDate: new FormControl(this.fromDate, [Validators.required]),
      toDate: new FormControl(this.loginDate, [Validators.required]),
      //location: new FormControl('', [Validators.required]),
      vendorId: new FormControl('', [Validators.required]),
      //rate:new FormControl('0', [Validators.required]),
      totalDslLtrs: new FormControl(''),
      grossDslAmt: new FormControl(''),
      discRateLtr:new FormControl('0'),
      discAmt: new FormControl(''),
      totalDslAmt: new FormControl(''),
      tdsRate: new FormControl(''),
      tdsAmt: new FormControl(''),
      totalCashAdv: new FormControl(''),
      totalNetAmount: new FormControl('',[Validators.required]),
      remarks: new FormControl(''),
      selectedAll: new FormControl(''),
      arrayList: this.formBuilder.array([this.createInitialArray()])        
    });
    
    this.sharedService.loading=false;       
    setTimeout(() => {
      if (this.selectedDieselStmtDetails.masterID != '') {
        this.formDieselStatement.patchValue(this.selectedDieselStmtDetails);
        this.formDieselStatement.patchValue({
          billStmtDate:this.commonService.formatDate(this.selectedDieselStmtDetails.billStmtDate),
          fromDate:this.commonService.formatDate(this.selectedDieselStmtDetails.fromDate),
          toDate:this.commonService.formatDate(this.selectedDieselStmtDetails.toDate),
          vendorId: this.vendorList.find(e => e.dataId == this.selectedDieselStmtDetails.dfVendor),   
          selectedAll:'Y'   
        })
        if(this.selectedDieselStmtDetails.findocid!="0"){
          this.getFinDocDetails(this.selectedDieselStmtDetails.findocid);
        }
        
        this.createdBy = this.selectedDieselStmtDetails.createdBy + " " + this.selectedDieselStmtDetails.createdDate;
        this.modifiedBy = this.selectedDieselStmtDetails.modifiedBy + " " + this.selectedDieselStmtDetails.modifiedDate;  
        this.editMode=true;
        this.getDieselStatementInnerGridList();
        this.formDieselStatement.controls['fromDate'].disable();  
        this.formDieselStatement.controls['toDate'].disable();  
        this.formDieselStatement.controls['selectedAll'].disable();   
        this.formDieselStatement.controls['vendorId'].disable();     
      }    
    }, 2000);

    this.formDieselStatement.controls['BranchCode'].disable();  
    this.formDieselStatement.controls["totalDslLtrs"].disable();
    this.formDieselStatement.controls["grossDslAmt"].disable();
    this.formDieselStatement.controls["discAmt"].disable();
    this.formDieselStatement.controls["tdsAmt"].disable();
    this.formDieselStatement.controls["totalDslAmt"].disable();
    this.formDieselStatement.controls["totalCashAdv"].disable();
    this.formDieselStatement.controls['totalNetAmount'].disable(); 
  }

  get f() { return this.formDieselStatement.controls; }
  get formArray() {
    return this.formDieselStatement.get("arrayList") as FormArray;
  }

  
  createInitialArray() {
    return this.formBuilder.group({
      branch:  ['', []],
      pmtDate:  ['', []],
      vehicleNo:  ['', []],
      hsdAdvType:  ['', []],
      transDesc:  ['', []],
      qtyLtrs:  ['', []],
      ratePerLtr:  ['', []],
      amountPaid:  ['', []],
      selected:  ['', []],
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
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

  ratechange(e: any){
    var rate= e.target.value;
    if (rate=='')
    {
      this.toasterService.warning(" Rate can not be empty");  
      return; 
    }
    if (parseFloat(rate)>0){
      //ignore
    }
    else{
      this.toasterService.warning(" Rate can not be zero");  
      return; 
    }

    for (var i = 0; i < this.DieselStatementmodel.dieselStatementListData.length; i++) {
      if(this.DieselStatementmodel.dieselStatementListData[i].hsdAdvType == "D"){
        var qtyLtrs = this.DieselStatementmodel.dieselStatementListData[i].qtyLtrs;      
        var amount = (parseFloat(rate) * parseFloat(qtyLtrs));
        this.DieselStatementmodel.dieselStatementListData[i].ratePerLtr = parseFloat(rate).toFixed(2);
        this.DieselStatementmodel.dieselStatementListData[i].amountPaid = amount.toFixed(2) ;
        this.formArray.controls[i].get("ratePerLtr")?.setValue(parseFloat(rate).toFixed(2));
        this.formArray.controls[i].get("amountPaid")?.setValue(amount.toFixed(2));
      }
    }  
    
    this.calculateTotal();
  }

  
  getFinDocDetails(finId: string){
    this.requestmodel.strRequest=finId;
    this.commonService.getFinDocDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.seriesDoc = res.message;
      } 
      else{
        this.seriesDoc = '';
      }
    });
  }

  searchStatement(): void { 
    var selectedDataVal=this.formDieselStatement.getRawValue();
    if (this.formDieselStatement.controls["fromDate"].invalid) {
      this.toasterService.warning(" Please Select From Date");  
      return; 
    }
    else if (this.formDieselStatement.controls["toDate"].invalid) {
      this.toasterService.warning(" Please Select To Date");  
      return; 
    }
    // else if (this.formDieselStatement.controls["location"].invalid) {
    //   this.toasterService.warning(" Please Select Location");  
    //   return; 
    // }
    else if (this.formDieselStatement.controls["vendorId"].invalid) {
      this.toasterService.warning(" Please Select Vendor");  
      return; 
    }   
    else{
      //this.Pagerequestwithdatesmodel.search= selectedDataVal.location?selectedDataVal.location.dataId:'';
      this.reportmodel.fromDate=selectedDataVal.fromDate;
      this.reportmodel.toDate=selectedDataVal.toDate;
      this.reportmodel.filterStr=selectedDataVal.vendorId?selectedDataVal.vendorId.dataId:'';
      this.dieselstatementService.getDieselStatementSearchList(this.reportmodel)
      .subscribe((res: Dieselstatementmodel) => {
        this.DieselStatementmodel = res;
        if(res.dieselStatementListData.length>0){
        this.formDieselStatement.controls["fromDate"].disable();
        this.formDieselStatement.controls["toDate"].disable();
        //this.formDieselStatement.controls["location"].disable();
        this.formDieselStatement.controls["vendorId"].disable();
        }
        this.formArray.clear();
        for (var i = 0; i < res.dieselStatementListData.length; i++) {
          this.formArray.push(this.createInitialArray());
          this.formArray.controls[i].get("branch")?.setValue(res.dieselStatementListData[i].branch);
          this.formArray.controls[i].get("pmtDate")?.setValue(this.commonService.formatDate(res.dieselStatementListData[i].pmtDate));
          this.formArray.controls[i].get("vehicleNo")?.setValue(res.dieselStatementListData[i].vehicleNo);
          this.formArray.controls[i].get("hsdAdvType")?.setValue(res.dieselStatementListData[i].hsdAdvType);
          this.formArray.controls[i].get("transDesc")?.setValue(res.dieselStatementListData[i].transDesc);
          this.formArray.controls[i].get("qtyLtrs")?.setValue(res.dieselStatementListData[i].qtyLtrs);
          this.formArray.controls[i].get("ratePerLtr")?.setValue(res.dieselStatementListData[i].ratePerLtr);
          this.formArray.controls[i].get("amountPaid")?.setValue(res.dieselStatementListData[i].amountPaid);
          
          this.formArray.controls[i].get("branch")?.disable();      
          this.formArray.controls[i].get("pmtDate")?.disable();      
          this.formArray.controls[i].get("vehicleNo")?.disable();      
          this.formArray.controls[i].get("hsdAdvType")?.disable();      
          this.formArray.controls[i].get("transDesc")?.disable();      
          this.formArray.controls[i].get("qtyLtrs")?.disable();   
          this.formArray.controls[i].get("ratePerLtr")?.disable();
          this.formArray.controls[i].get("amountPaid")?.disable();
        }
        this.calculateTotal();
      });  
    } 
  }

  selectAll(e: any) {
    if(e.target.checked){
      for (var i = 0; i < this.DieselStatementmodel.dieselStatementListData.length; i++) {
        this.DieselStatementmodel.dieselStatementListData[i].selected = true;
        this.formArray.controls[i].get("selected")?.setValue('Y');
      }
    }
    else{
      for (var i = 0; i < this.DieselStatementmodel.dieselStatementListData.length; i++) {
        this.DieselStatementmodel.dieselStatementListData[i].selected = false;
        this.formArray.controls[i].get("selected")?.setValue('');
      }
    }
    this.calculateTotal();
  }

  selectedData(index: number, event: any) {
    this.DieselStatementmodel.dieselStatementListData[index].selected = event.target.checked;
    this.calculateTotal();
  }
  
  getVendorList(){
    this.requestmodel.strRequest= 'D';
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.vendorList = res;
    });
  }

  calculateTotal() {
    var discRate = 0;
    var totalDslLeters = 0;
    var totalDslAmount = 0;
    var totalDiscAmount = 0;
    var grossDslAmount=0;
    var totalDriverAdvAmount = 0;
    var tdsPercent=0;
    var tdsAmount=0;
    var totalStatementAmount = 0;

    var selectedData = this. formDieselStatement.getRawValue(); 

    var diesellistarray=this.DieselStatementmodel.dieselStatementListData;
    for (var i = 0; i < diesellistarray.length; i++) {
      if (diesellistarray[i].selected) {
        if (diesellistarray[i].hsdAdvType === "D") {
          grossDslAmount = grossDslAmount + parseFloat(diesellistarray[i].amountPaid);
        }
        if (diesellistarray[i].hsdAdvType === "A") {
          totalDriverAdvAmount = totalDriverAdvAmount + parseFloat(diesellistarray[i].amountPaid);
        }
        totalDslLeters=totalDslLeters + parseFloat(diesellistarray[i].qtyLtrs);
        totalStatementAmount = totalStatementAmount + parseFloat(diesellistarray[i].amountPaid);
      }
    }

    if(selectedData.discRateLtr!=''){
      discRate= parseFloat(selectedData.discRateLtr);
      totalDiscAmount = totalDslLeters * discRate;
      totalDslAmount = grossDslAmount - totalDiscAmount;
    }   

    totalStatementAmount= totalDslAmount + totalDriverAdvAmount;

    if(selectedData.tdsRate!=''){
      tdsPercent= parseFloat(selectedData.tdsRate);
      tdsAmount = Math.round((totalDslAmount * tdsPercent)/100);
      totalStatementAmount = totalStatementAmount - tdsAmount
    }   

    this.formDieselStatement.patchValue({
      totalDslLtrs:totalDslLeters.toFixed(2),
      grossDslAmt:grossDslAmount.toFixed(2),
      discRateLtr:discRate.toFixed(2),
      discAmt:totalDiscAmount.toFixed(2),
      totalDslAmt: totalDslAmount.toFixed(2),
      tdsRate: tdsPercent.toFixed(2),
      tdsAmt: tdsAmount.toFixed(2),
      totalCashAdv: totalDriverAdvAmount.toFixed(2),
      totalNetAmount: totalStatementAmount.toFixed(2)
    });
  }

  exit(): void {
    this.route.navigate(['/dieselstatementlist']);
  }

  deleteDieselStatementForm(): void {
    if(this.selectedDieselStmtDetails.masterID != '' ){      
    this.sharedService.loading=true;
     this.requestmodel.strRequest =this.selectedDieselStmtDetails.masterID
      if (confirm("Are you sure, you want to delete this?")) {
            this.dieselstatementService.dieselStatementDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if(this.responseDetails.status){
              this.toasterService.success(this.responseDetails.message);
              this.formDieselStatement.reset();
              this.route.navigate(['/dieselstatementlist']);
            }
            else{
              this.toasterService.warning(this.responseDetails.message);        
            }   
        });
      }
      
    this.sharedService.loading=false;
    }
  }

  getDieselStatementInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedDieselStmtDetails.masterID;
    this.dieselstatementService.getDieselStatementInnerGridList(this.requestmodel).subscribe((res) => {
      this.DieselStatementmodel = res;
      this.formArray.clear();
      
      for (var i = 0; i < res.dieselStatementListData.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("branch")?.setValue(res.dieselStatementListData[i].branch);
        this.formArray.controls[i].get("pmtDate")?.setValue(this.commonService.formatDate(res.dieselStatementListData[i].pmtDate));
        this.formArray.controls[i].get("vehicleNo")?.setValue(res.dieselStatementListData[i].vehicleNo);
        this.formArray.controls[i].get("hsdAdvType")?.setValue(res.dieselStatementListData[i].hsdAdvType);
        this.formArray.controls[i].get("transDesc")?.setValue(res.dieselStatementListData[i].transDesc);
        this.formArray.controls[i].get("qtyLtrs")?.setValue(res.dieselStatementListData[i].qtyLtrs);
        this.formArray.controls[i].get("ratePerLtr")?.setValue(res.dieselStatementListData[i].ratePerLtr);
        this.formArray.controls[i].get("amountPaid")?.setValue(res.dieselStatementListData[i].amountPaid);
        this.formArray.controls[i].get("selected")?.setValue(res.dieselStatementListData[i].selected);            
        
        this.formArray.controls[i].get("branch")?.disable();      
        this.formArray.controls[i].get("pmtDate")?.disable();      
        this.formArray.controls[i].get("vehicleNo")?.disable();      
        this.formArray.controls[i].get("hsdAdvType")?.disable();      
        this.formArray.controls[i].get("transDesc")?.disable();      
        this.formArray.controls[i].get("qtyLtrs")?.disable();   
        this.formArray.controls[i].get("ratePerLtr")?.disable();
        this.formArray.controls[i].get("amountPaid")?.disable();
        this.formArray.controls[i].get("selected")?.disable();
      }
    });  
  }

  saveStatementDetails(): void {
    debugger
    if (this.formDieselStatement.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formDieselStatement.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    
    var selectedDataVal=this.formDieselStatement.getRawValue();
    let frmdt = new Date(selectedDataVal.fromDate);
    let todt = new Date(selectedDataVal.toDate);
    let StmtDate = new Date(selectedDataVal.billStmtDate);
   
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<StmtDate || StmtDate<mindt) {
      this.toasterService.warning("Statement Date  should be with in Fin Year");
       return;
    }
  if (maxdt<frmdt || frmdt<mindt ) {
      this.toasterService.warning("Valid From  should be with in Fin Year");
    return;
  }
  if (maxdt<todt || todt<mindt) {
      this.toasterService.warning("Valid To should be with in Fin Year");
     return;
   }

    var diesellistarray = this.DieselStatementmodel.dieselStatementListData;
    var IsItemSelected = false;
    for (var i = 0; i < diesellistarray.length; i++) {
      if (diesellistarray[i].selected) {
        IsItemSelected = true;
      }
    }
    
    if (!IsItemSelected){
      this.toasterService.warning("Select Atleast one Trip Details");
      return;
    }

    // if (selectedDataVal.rate=='')
    // {
    //   this.toasterService.warning(" Rate can not be empty");  
    //   return; 
    // }
    // if (parseFloat(selectedDataVal.rate)>0){
    //   //ignore
    // }
    // else{
    //   this.toasterService.warning(" Rate can not be zero");  
    //   return; 
    // }  
          
    this.sharedService.loading=true;
    this.formSubmitted = true;
    this.DieselStatementmodel.masterID        = this.selectedDieselStmtDetails.masterID ;
    this.DieselStatementmodel.branchCode      = selectedDataVal.statementBranch;
    this.DieselStatementmodel.billStmtNo      = '';
    this.DieselStatementmodel.billStmtDate    = selectedDataVal.billStmtDate;
    this.DieselStatementmodel.fromDate        = selectedDataVal.fromDate;
    this.DieselStatementmodel.toDate          = selectedDataVal.toDate;
    this.DieselStatementmodel.location        = selectedDataVal.location?selectedDataVal.location.dataId:'';
    this.DieselStatementmodel.dfVendor        = selectedDataVal.vendorId?selectedDataVal.vendorId.dataId:'';
    //this.DieselStatementmodel.rate            = selectedDataVal.rate;
    this.DieselStatementmodel.statementFlag   = 'D'  ;       
    this.DieselStatementmodel.remarks         = selectedDataVal.remarks;  
    this.DieselStatementmodel.totalDslLtrs    = selectedDataVal.totalDslLtrs;
    this.DieselStatementmodel.grossDslAmt     = selectedDataVal.grossDslAmt;
    this.DieselStatementmodel.discRateLtr     = selectedDataVal.discRateLtr;
    this.DieselStatementmodel.discAmt         = selectedDataVal.discAmt;
    this.DieselStatementmodel.totalDslAmt     = selectedDataVal.totalDslAmt;
    this.DieselStatementmodel.tdsRate         = selectedDataVal.tdsRate;
    this.DieselStatementmodel.tdsAmt          = selectedDataVal.tdsAmt;
    this.DieselStatementmodel.totalCashAdv    = selectedDataVal.totalCashAdv;
    this.DieselStatementmodel.totalNetAmount  = selectedDataVal.totalNetAmount;
    this.DieselStatementmodel.branchCode      = this.branch;
    this.DieselStatementmodel.yearId          = this.year;
    this.DieselStatementmodel.loggedInUser    = this.loggedInUserID;

    this.DieselStatementmodel.dieselStmtDtlsList = [];

    var arr= selectedDataVal.arrayList;

    for (var i = 0; i < arr.length; i++) {
      this.DieselStatementmodel.dieselStatementListData[i].pmtDate = arr[i].pmtDate;
    } 
    
    this.dieselstatementService.saveDieselStatementDetails(this.DieselStatementmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formDieselStatement.reset();
        this.route.navigate(['/dieselstatementlist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      } 
    });
        
    this.sharedService.loading=false;
  }
}
