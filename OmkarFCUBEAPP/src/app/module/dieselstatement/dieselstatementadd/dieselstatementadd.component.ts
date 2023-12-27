import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Dieselstatementmodel } from 'src/app/models/dieselstatementmodel';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { DieselstatementService } from 'src/app/services/dieselstatement.service';
import { GstpurchaseService } from 'src/app/services/gstpurchase.service';
import { SharedService } from 'src/app/services/shared.service';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-dieselstatementadd',
  templateUrl: './dieselstatementadd.component.html',
  styleUrls: ['./dieselstatementadd.component.css']
})
export class DieselstatementaddComponent implements OnInit {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  branchList: Dropdownmodel[] = [];
  vendorList:Dropdownmodel[] = [];
  formDieselStatement!: FormGroup;
  selectedDieselStmtDetails = new Dieselstatementmodel()
  keywordLocation = 'dataName';
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  formSubmitted = false;
  responseDetails = new Responsemodel();
 
  constructor(private Pagerequestwithdatesmodel: Pagerequestwithdatesmodel, 
    private requestmodel:Requestmodel,private DieselStatementmodel:Dieselstatementmodel,
    private route: Router, private formBuilder: FormBuilder, private commonService: CommonService,
    private gstpurchaseService: GstpurchaseService, private sharedService: SharedService,
    private dieselstatementService: DieselstatementService, private toasterService: ToastrService) {
      this.DieselStatementmodel= new Dieselstatementmodel();
  }

  ngOnInit(): void {

    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Diesel Statement"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;

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
    
    this.sharedService.loading=true;    
    this.getBranchList();
    this.getVendorList();

    this.selectedDieselStmtDetails = this.dieselstatementService.getDieselStatementDetails();
    this.formDieselStatement = this.formBuilder.group({
      BranchCode: new FormControl(this.branch, [Validators.required]),
      billStmtDate: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      vendorId: new FormControl('', [Validators.required]),
      totalDslLtrs: new FormControl(''),
      totalDslAmt: new FormControl(''),
      totalCashAdv: new FormControl(''),
      totalNetAmount: new FormControl('',[Validators.required]),
      remarks: new FormControl(''),
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
          location: this.branchList.find(e => e.dataId == this.selectedDieselStmtDetails.location),  
          vendorId: this.vendorList.find(e => e.dataId == this.selectedDieselStmtDetails.dfVendor),     
        })
        this.editMode=true;
      }    
    }, 2000);

    if (this.selectedDieselStmtDetails.masterID != '') {
      this.searchStatement(); 
      var arr=this.DieselStatementmodel.dieselStatementListData;
      for (var i = 0; i < arr.length; i++) {
      }         
    }
    this.formDieselStatement.controls['BranchCode'].disable();     
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
      remarks:  ['', []],
      selected:  ['', []],
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
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

  searchStatement(): void {   
    setTimeout(() => { 
    this.sharedService.loading=true;    
    var selectedDataVal=this.formDieselStatement.getRawValue();
    this.Pagerequestwithdatesmodel.search= selectedDataVal.location?selectedDataVal.location.dataId:'';
    this.Pagerequestwithdatesmodel.fromDate=selectedDataVal.fromDate;
    this.Pagerequestwithdatesmodel.toDate=selectedDataVal.toDate;
    this.Pagerequestwithdatesmodel.strRequest=selectedDataVal.vendorId?selectedDataVal.vendorId.dataId:'';
    this.dieselstatementService.getDieselStatementSearchList(this.Pagerequestwithdatesmodel)
    .subscribe((res: Dieselstatementmodel) => {
      this.DieselStatementmodel = res;
      for (var i = 0; i < this.formArray.length; i++) {
        this.formArray.removeAt(i);
      }     
      
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
        this.formArray.controls[i].get("remarks")?.setValue(res.dieselStatementListData[i].remarks);        
        
        this.formArray.controls[i].get("branch")?.disable();      
        this.formArray.controls[i].get("pmtDate")?.disable();      
        this.formArray.controls[i].get("vehicleNo")?.disable();      
        this.formArray.controls[i].get("hsdAdvType")?.disable();      
        this.formArray.controls[i].get("transDesc")?.disable();      
        this.formArray.controls[i].get("qtyLtrs")?.disable();   
        this.formArray.controls[i].get("ratePerLtr")?.disable();
        this.formArray.controls[i].get("amountPaid")?.disable();
        this.formArray.controls[i].get("remarks")?.disable();
      }
    });
    this.sharedService.loading=false;  
    }, 2000);  
  }

  selectedData(index: number, event: any) {
    this.DieselStatementmodel.dieselStatementListData[index].selected = event.target.checked;
    this.calculateTotal();
  }
  
  getVendorList(){
    this.gstpurchaseService.getVendorList().subscribe((res) => {
      this.vendorList = res;
    });
  }

  calculateTotal() {
    var totalDslLeters = 0;
    var totalDslAmount = 0;
    var totalDriverAdvAmount = 0;
    var totalStatementAmount = 0;
    var diesellistarray=this.DieselStatementmodel.dieselStatementListData;

    for (var i = 0; i < diesellistarray.length; i++) {
      if (diesellistarray[i].selected) {
        if (diesellistarray[i].hsdAdvType === "D") {
          totalDslAmount = totalDslAmount + parseFloat(diesellistarray[i].amountPaid);
        }
        if (diesellistarray[i].hsdAdvType === "A") {
          totalDriverAdvAmount = totalDriverAdvAmount + parseFloat(diesellistarray[i].amountPaid);
        }
        totalDslLeters=totalDslLeters + parseFloat(diesellistarray[i].qtyLtrs);
        totalStatementAmount = totalStatementAmount + parseFloat(diesellistarray[i].amountPaid);
      }
    }

    this.formDieselStatement.patchValue({
      totalDslLtrs:totalDslLeters.toFixed(2),
      totalDslAmt: totalDslAmount.toFixed(2),
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
            console.log(this.responseDetails.message);
            this.formDieselStatement.reset();
            this.route.navigate(['/dieselstatementlist']);
        });
      }
      
    this.sharedService.loading=false;
    }
  }

  saveStatementDetails(): void {
    this.formSubmitted = true;
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

    var diesellistarray = this.DieselStatementmodel.dieselStatementListData;
    var IsItemSelected = false;
    for (var i = 0; i < diesellistarray.length; i++) {
      if (diesellistarray[i].selected) {
        IsItemSelected = true;
      }
    }

    if (!IsItemSelected){
      this.toasterService.warning("Select Atleast one Trip Details");
    }
          
    this.sharedService.loading=true;
    var selectedDataVal=this.formDieselStatement.getRawValue();
    this.DieselStatementmodel.masterID        = this.selectedDieselStmtDetails.masterID ;
    this.DieselStatementmodel.branchCode      = selectedDataVal.statementBranch;
    this.DieselStatementmodel.billStmtDate    = selectedDataVal.billStmtDate;
    this.DieselStatementmodel.fromDate        = selectedDataVal.fromDate;
    this.DieselStatementmodel.toDate          = selectedDataVal.toDate;
    this.DieselStatementmodel.location        = selectedDataVal.location?selectedDataVal.location.dataId:'';
    this.DieselStatementmodel.dfVendor        = selectedDataVal.vendorId?selectedDataVal.vendorId.dataId:'';
    this.DieselStatementmodel.remarks         = selectedDataVal.remarks;
    this.DieselStatementmodel.totalDslLtrs    = selectedDataVal.totalDslLtrs;
    this.DieselStatementmodel.totalDslAmt     = selectedDataVal.totalDslAmt;
    this.DieselStatementmodel.totalCashAdv    = selectedDataVal.totalCashAdv;
    this.DieselStatementmodel.totalNetAmount  = selectedDataVal.totalNetAmount;
    this.DieselStatementmodel.branchCode      = this.branch;
    this.DieselStatementmodel.yearId          = this.year;
    this.DieselStatementmodel.loggedInUser    = this.loggedInUserID;

    this.dieselstatementService.saveDieselStatementDetails(this.DieselStatementmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.toasterService.success(this.responseDetails.message);
      this.formDieselStatement.reset();
      this.route.navigate(['/dieselstatementlist']);
    });
        
    this.sharedService.loading=false;
  }
}
