import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { DieselstmtbpclService } from 'src/app/services/dieselstmtbpcl.service';
import { Dieselstatementmodel } from 'src/app/models/dieselstatementmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-dieselstmtbpcladd',
  templateUrl: './dieselstmtbpcladd.component.html',
  styleUrls: ['./dieselstmtbpcladd.component.css']
})
export class DieselstmtbpcladdComponent {
  loggedInUserID: string = '';
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  minDate: string = '';
  maxDate: string = '';
  branch: string = '';
  vehicleList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  driverLists: Dropdownmodel[] = [];
  accountList:Dropdownmodel[] = [];
  formDieselStatement!: FormGroup;
  selectedDieselStmtDetails = new Dieselstatementmodel()
  seriesDoc: string = "";

  keywordLocation = 'dataName';
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  importTrue= false;

  formSubmitted = false;
  responseDetails = new Responsemodel();
 
  constructor(private reportmodel: Reportmodel, 
    private requestmodel:Requestmodel,private dieselStatementmodel:Dieselstatementmodel,
    private route: Router, private formBuilder: FormBuilder, private commonService: CommonService,
    private sharedService: SharedService,
    private dieselstatementService: DieselstmtbpclService, private toasterService: ToastrService) {
      this.dieselStatementmodel= new Dieselstatementmodel();
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Diesel Data Import - BPCL"));
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
    this.getDriverList();
    this.getVehicleNoList();
    this.getAcountList();

    this.selectedDieselStmtDetails = this.dieselstatementService.getDieselImportDetails();
    this.formDieselStatement = this.formBuilder.group({
      branchCode: new FormControl(this.branch, [Validators.required]),
      billStmtDate: new FormControl(this.loginDate, [Validators.required]),
      fromDate: new FormControl(this.fromDate, [Validators.required]),
      toDate: new FormControl(this.loginDate, [Validators.required]),
      dfVendor: new FormControl('', [Validators.required]),
      totalDslLtrs: new FormControl(''),
      totalDslAmt: new FormControl('',[Validators.required]),
      remarks: new FormControl(''),
      vehicleNo: new FormControl('', [Validators.required]),
      arrayList: this.formBuilder.array([this.createInitialArray()])        
    });
    
    this.sharedService.loading=false;       
    setTimeout(() => {
      this.formArray.controls[0].get("amount")?.disable();
      if (this.selectedDieselStmtDetails.masterID != '') {
        this.formDieselStatement.patchValue(this.selectedDieselStmtDetails);
        this.formDieselStatement.patchValue({
          billStmtDate:this.commonService.formatDate(this.selectedDieselStmtDetails.billStmtDate),
          fromDate:this.commonService.formatDate(this.selectedDieselStmtDetails.fromDate),
          toDate:this.commonService.formatDate(this.selectedDieselStmtDetails.toDate),
          dfVendor: this.accountList.find(e => e.dataId == this.selectedDieselStmtDetails.dfVendor),
          driverId: this.driverLists.find(e => e.dataId == this.selectedDieselStmtDetails.driverId),  
        })
        if(this.selectedDieselStmtDetails.findocid!="0"){
          this.getFinDocDetails(this.selectedDieselStmtDetails.findocid);
        }
        this.editMode=true;
        this.getDieselStmtInnerGridList();
        this.formDieselStatement.controls['billStmtDate'].disable();     
        this.formDieselStatement.controls['fromDate'].disable();  
        this.formDieselStatement.controls['toDate'].disable();  
        this.formDieselStatement.controls['dfVendor'].disable(); 
        this.formDieselStatement.controls['driverId'].disable();     
      }    
    }, 2000);
   
    this.formDieselStatement.controls['branchCode'].disable();  
    this.formDieselStatement.controls["totalDslLtrs"].disable();
    this.formDieselStatement.controls["totalDslAmt"].disable();
  }

  get f() { return this.formDieselStatement.controls; }
  get formArray() {
    return this.formDieselStatement.get("arrayList") as FormArray;
  }

  
  createInitialArray() {
    return this.formBuilder.group({
      transRefNo:  ['', []],
      transDateTime:  [this.loginDate, []],
      dslQty:  ['', []],
      dslRate:  ['', []],
      amount:  ['', []],
    });
  }


  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
   getDriverList(): void {
    this.commonService.getDriverList().subscribe((res) => {
      this.driverLists = res;
    });
  }
  
  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  getAcountList(): void {    
    this.requestmodel.strRequest="D"
    this.commonService.getAccountList(this.requestmodel).subscribe((res) => {
      this.accountList = res;
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
    return List.filter(x => x.dataName.toLowerCase().endsWith(query.toLowerCase()));
  };
 
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
  getStatementDetails(): void{
    var selectedDataVal=this.formDieselStatement.getRawValue();
    
    if (selectedDataVal.vehicleNo.dataId) {
      //ignore
    }else{
      this.toasterService.warning(" Please Select a Vehicle No");  
      return; 
    }   

    if (this.formDieselStatement.controls["fromDate"].invalid) {
      this.toasterService.warning("Please Select a From Date");  
      return; 
    }
    else if (this.formDieselStatement.controls["toDate"].invalid) {
      this.toasterService.warning("Please Select a To Date");  
      return; 
    }
    else if (this.formDieselStatement.controls["vehicleNo"].invalid) {
      this.toasterService.warning(" Please Select a Vehicle No");  
      return; 
    }  
    else{
      this.reportmodel.fromDate=selectedDataVal.fromDate;
      this.reportmodel.toDate=selectedDataVal.toDate;
      this.reportmodel.filterStr=selectedDataVal.vehicleNo?selectedDataVal.vehicleNo.dataName:'';
      this.dieselstatementService.getDieselApiDetails(this.reportmodel).subscribe((res: Dieselstatementmodel) => {
        if(res.dieselStatementListData.length>0){
          this.formDieselStatement.controls["fromDate"].disable();
          this.formDieselStatement.controls["toDate"].disable();
          this.formDieselStatement.controls["vehicleNo"].disable();
          this.formArray.clear();
        }
        for (var i = 0; i < res.dieselStatementListData.length; i++) {
          this.formArray.push(this.createInitialArray());
          this.formArray.controls[i].get("branch")?.setValue(res.dieselStatementListData[i].branch);
          this.formArray.controls[i].get("pmtDate")?.setValue(this.commonService.formatDate(res.dieselStatementListData[i].pmtDate));
          this.formArray.controls[i].get("hsdAdvType")?.setValue(res.dieselStatementListData[i].hsdAdvType);
          this.formArray.controls[i].get("transDesc")?.setValue(res.dieselStatementListData[i].transDesc);
          this.formArray.controls[i].get("qtyLtrs")?.setValue(res.dieselStatementListData[i].qtyLtrs);
          this.formArray.controls[i].get("ratePerLtr")?.setValue(res.dieselStatementListData[i].ratePerLtr);
          this.formArray.controls[i].get("amountPaid")?.setValue(res.dieselStatementListData[i].amountPaid);
          
          this.formArray.controls[i].get("branch")?.disable();      
          this.formArray.controls[i].get("pmtDate")?.disable();       
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


  getDieselStmtInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedDieselStmtDetails.masterID;
    this.dieselstatementService.getDieselImportInnerGridList(this.requestmodel).subscribe((res) => {
      this.dieselStatementmodel = res;
      this.formArray.clear();
      
      for (var i = 0; i < res.dieselStmtDtlsList.length; i++) {
        this.formArray.push(this.createInitialArray());   
        this.formArray.controls[i].get("transRefNo")?.setValue(res.dieselStmtDtlsList[i].transRefNo);
        this.formArray.controls[i].get("transDateTime")?.setValue(this.commonService.formatDate(res.dieselStmtDtlsList[i].transDateTime));
        this.formArray.controls[i].get("dslQty")?.setValue(res.dieselStmtDtlsList[i].dslQty);
        this.formArray.controls[i].get("dslRate")?.setValue(res.dieselStmtDtlsList[i].dslRate);
        this.formArray.controls[i].get("amount")?.setValue(res.dieselStmtDtlsList[i].amount);
        

        this.formArray.controls[i].get("transRefNo")?.disable();
        this.formArray.controls[i].get("transDateTime")?.disable();
        this.formArray.controls[i].get("dslQty")?.disable();
        this.formArray.controls[i].get("dslRate")?.disable();
        this.formArray.controls[i].get("amount")?.disable();
      }
     
    });  
  }
     
  
  calculateTotal() {
    var totalDslLtrs= 0;
    var totalDslAmt= 0;

    var selectedData = this.formDieselStatement.getRawValue(); 

    for (var i = 0; i < selectedData.arrayList.length; i++) {
      if (selectedData.arrayList[i].dslQty != "") {
        totalDslLtrs = totalDslLtrs + parseFloat(selectedData.arrayList[i].dslQty);
      }
      if (selectedData.arrayList[i].amount != "") {
        totalDslAmt = totalDslAmt + parseFloat(selectedData.arrayList[i].amount);
      }            
    }
     
    this.formDieselStatement.patchValue({
      totalDslLtrs:totalDslLtrs.toFixed(2),
      totalDslAmt: totalDslAmt.toFixed(2),
    });
    
  }

  exit(): void {
    this.route.navigate(['/dieselbpcllist']);
  }

  deleteDieselStatementForm(): void {
    if(this.selectedDieselStmtDetails.masterID != '' ){      
    this.sharedService.loading=true;
     this.requestmodel.strRequest =this.selectedDieselStmtDetails.masterID;
      if (confirm("Are you sure, you want to delete this?")) {
            this.dieselstatementService.dieselImportDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if(this.responseDetails.status){
              this.toasterService.success(this.responseDetails.message);
              this.formDieselStatement.reset();
              this.route.navigate(['/dieselbpcllist']);
            }
            else{
              this.toasterService.warning(this.responseDetails.message);        
            }   
        });
      }
      
    this.sharedService.loading=false;
    }
  }

 
  saveStatementDetails(): void {
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

    this.sharedService.loading = true;
    this.formSubmitted = true;
    this.dieselStatementmodel.masterID        = this.selectedDieselStmtDetails.masterID ;
    this.dieselStatementmodel.branchCode      = selectedDataVal.branchCode;
    this.dieselStatementmodel.billStmtDate    = selectedDataVal.billStmtDate;
    this.dieselStatementmodel.fromDate        = selectedDataVal.fromDate;
    this.dieselStatementmodel.toDate          = selectedDataVal.toDate;
    this.dieselStatementmodel.dfVendor        = selectedDataVal.dfVendor?selectedDataVal.dfVendor.dataId:'';
    this.dieselStatementmodel.driverId        = selectedDataVal.vehicleNo?selectedDataVal.vehicleNo.dataId:"";
    this.dieselStatementmodel.remarks         = selectedDataVal.remarks.toString().toUpperCase();
    this.dieselStatementmodel.totalDslLtrs    = selectedDataVal.totalDslLtrs;
    this.dieselStatementmodel.totalDslAmt     = selectedDataVal.totalDslAmt;
    this.dieselStatementmodel.yearId          = this.year;
    this.dieselStatementmodel.loggedInUser    = this.loggedInUserID;

    this.dieselStatementmodel.dieselStmtDtlsList = [];
    this.dieselStatementmodel.dieselStatementListData = [];

    var arr=selectedDataVal.arrayList;

    for (var i = 0; i < arr.length; i++) {
      if(arr[i].vehicleNo[i].dslQty!='' && arr[i].vehicleNo[i].dslRate!=''){
        this.dieselStatementmodel.dieselStmtDtlsList.push({
          'masterID':"",
          'vehicleMasterId': "", 
          'transRefNo': arr[i].transRefNo.toString(),
          'transDateTime': arr[i].transDateTime,
          'hsdAdvTyps': "",
          'dslQty': arr[i].dslQty.toString(),   
          'dslRate': arr[i].dslRate.toString(),   
          'amount': arr[i].amount.toString(),  
          'tripPmtId': "", 
        });
      }
      else{
        this.toasterService.warning("Please enter vehicle number, diesel quantity, and diesel rate.");
         return;
       }
    }

    const foundDuplicateName = this.dieselStatementmodel.dieselStmtDtlsList.find((data, index) => {
      return this.dieselStatementmodel.dieselStmtDtlsList.find((x, ind) => x.vehicleMasterId === data.vehicleMasterId && index !== ind);
    })
    if (foundDuplicateName) {
      this.toasterService.warning("Duplicate vehicle number in the grid is not allowed");
      return;
    }
    this.dieselstatementService.dieselImportSave(this.dieselStatementmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message);
        this.formDieselStatement.reset();
        this.route.navigate(['/dieselbpcllist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      } 
    });
        
    this.sharedService.loading=false;
  }
}
