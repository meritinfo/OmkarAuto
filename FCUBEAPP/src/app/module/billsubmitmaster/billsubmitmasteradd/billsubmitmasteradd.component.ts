
import { Component, ViewChild } from '@angular/core';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Billsubmitmastermodel } from 'src/app/models/billsubmitmastermodel';
import { BillSubmitMstDtlListmodel } from 'src/app/models/billsubmitmstdtllistmodel';
import { BillSubmitMasterService } from 'src/app/services/billsubmitmaster.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from 'src/app/services/shared.service';

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
  createdBy : string = "";
  modifiedBy: string = "";
  dashboard: string ="";
  appendMode = false;  
  editMode= false;
  formSubmitted = false;
  keywordLocation = 'dataName';
  billsubmitmstdtllistmodel = new BillSubmitMstDtlListmodel();   
  billsubmitmastermodels = new Billsubmitmastermodel();   

  responseDetails = new Responsemodel();
  stateList: Dropdownmodel[] = [];
  partyLocationList: Dropdownmodel[] = [];
  deptList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  vehicleRepmaintMaster = new Billsubmitmastermodel();

  selectedBillSubmitMasterDetail = new Billsubmitmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private billsubmitmastermodel: Billsubmitmastermodel, 
                                        private sharedService : SharedService,
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
      .find((aa: { menuName: string; }) => aa.menuName === "Bill Submit Entry");
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
    

    this.selectedBillSubmitMasterDetail = this.billSubmitMasterService.getBillSubmitMasterDetails();
    this.formUser = this.formBuilder.group({
      submitStn : new FormControl(this.branch,),  
      submitNo : new FormControl('',[Validators.required]),
      submitDt : new FormControl(this.loginDate,[Validators.required]),
      submitType : new FormControl('',[Validators.required]),
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
      totalSubmitAmt : new FormControl('',[Validators.required]),
      submitPoNo: new FormControl('',),
      arrayList: this.formBuilder.array([this.createSubmitArray()]),
    }); 

    this.getBranchList();
    this.getDeptList();
    this.getBillingPartyList();

    this.formUser.controls['submitStn'].disable(); 
    this.formUser.controls['totalSubmitAmt'].disable();   

    if (this.selectedBillSubmitMasterDetail.submitMstId != '') {
      this.getPartyGstLocationList(this.selectedBillSubmitMasterDetail.partyCode);
    }

    
    if (this.selectedBillSubmitMasterDetail.submitMstId   != '') {
      setTimeout(() => {
        this.formUser.controls['submitNo'].disable();  
        this.formUser.patchValue(this.selectedBillSubmitMasterDetail);
        this.formUser.patchValue({
          submitDt: this.commonService.formatDate(this.selectedBillSubmitMasterDetail.submitDt),
          billsUptoDt: this.commonService.formatDate(this.selectedBillSubmitMasterDetail.billsUptoDt),
          partyCode: this.partyList.find(e => e.dataId == this.selectedBillSubmitMasterDetail.partyCode),
        })  
      
       this.getBillSubmitMasterInnerGridList();
        this.createdBy = this.selectedBillSubmitMasterDetail.createdBy + " " + this.selectedBillSubmitMasterDetail.createdDate;
        this.modifiedBy = this.selectedBillSubmitMasterDetail.modifiedBy + " " + this.selectedBillSubmitMasterDetail.modifiedDate;   
        this.editMode =true;     
        this.appendMode = true; 
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
    this.requestmodel.strRequest = selectedData.submitStn;
    this.requestmodel.strRequest1 = this.year;
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
    if (selectedDataValue.partyCode.dataId ) {
      //ignore
    }
    else{
      this.toastrService.warning(" please  select party ");
      return;
    } 
    if ( selectedDataValue.submitLocation) {
      //ignore
    }
    else{
      this.toastrService.warning("please  select location");
      return;
    } 
    if (selectedDataValue.billsUptoDt) {
      //ignore
    }
    else{
      this.toastrService.warning(" please select uptodate");
      return;
    } 
    
    this.reportmodel.filterStr = selectedDataValue.partyCode.dataId;
    this.reportmodel.filterStr1 = selectedDataValue.submitLocation;
    this.reportmodel.fromDate =  selectedDataValue.billsUptoDt;

    this.billSubmitMasterService.getBillsSubmitSearchList(this.reportmodel)
      .subscribe((res: Billsubmitmastermodel) => {
      this.billsubmitmastermodel = res;      
      this.formTyreArray.clear();
      for (var i = 0; i < res.billSubmitMasterDtlList.length; i++) {
        this.formTyreArray.push(this.createSubmitArray());
        this.formTyreArray.controls[i].get("billsMasterId")?.setValue(res.billSubmitMasterDtlList[i].billsMasterId);
        this.formTyreArray.controls[i].get("billAmt")?.setValue(res.billSubmitMasterDtlList[i].billAmt);
        this.formTyreArray.controls[i].get("billNo")?.setValue(res.billSubmitMasterDtlList[i].billNo);
        this.formTyreArray.controls[i].get("billDate")?.setValue(this.commonService.formatDate(res.billSubmitMasterDtlList[i].billDate));
        this.formTyreArray.controls[i].get("billAmt")?.disable();
        this.formTyreArray.controls[i].get("billDate")?.disable();
        this.formTyreArray.controls[i].get("billNo")?.disable();
      } 
    }); 
  } 

  
  append():void {
    var selectedDataValue = this.formUser.getRawValue();
    if (selectedDataValue.partyCode.dataId ) {
      //ignore
    }
    else{
      this.toastrService.warning(" please  select party ");
      return;
    } 
    if ( selectedDataValue.submitLocation) {
      //ignore
    }
    else{
      this.toastrService.warning("please  select location");
      return;
    } 
    if (selectedDataValue.billsUptoDt) {
      //ignore
    }
    else{
      this.toastrService.warning(" please select uptodate");
      return;
    } 
    
    this.reportmodel.filterStr = selectedDataValue.partyCode.dataId;
    this.reportmodel.filterStr1 = selectedDataValue.submitLocation;
    this.reportmodel.fromDate =  selectedDataValue.billsUptoDt;
    var l = selectedDataValue.arrayList.length;
    this.billSubmitMasterService.getBillsSubmitSearchList(this.reportmodel).subscribe((res: Billsubmitmastermodel) => {
      this.appendMode = false;
       for (var i = 0; i < res.billSubmitMasterDtlList.length; i++) {
        this.formTyreArray.push(this.createSubmitArray());
        this.formTyreArray.controls[l+i].get("billsMasterId")?.setValue(res.billSubmitMasterDtlList[i].billsMasterId);
        this.formTyreArray.controls[l+i].get("billAmt")?.setValue(res.billSubmitMasterDtlList[i].billAmt);
        this.formTyreArray.controls[l+i].get("billNo")?.setValue(res.billSubmitMasterDtlList[i].billNo);
        this.formTyreArray.controls[l+i].get("billDate")?.setValue(this.commonService.formatDate(res.billSubmitMasterDtlList[i].billDate));
        this.formTyreArray.controls[l+i].get("billAmt")?.disable();
        this.formTyreArray.controls[l+i].get("billDate")?.disable();
        this.formTyreArray.controls[l+i].get("billNo")?.disable();
      } 
    }); 
  } 
  

  getBillSubmitMasterInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedBillSubmitMasterDetail.submitMstId; 
    this.billSubmitMasterService.getBillSubmitMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.formTyreArray.clear();
      this.vehicleRepmaintMaster = res;
      for (var i = 0; i < res.billSubmitMasterDtlList.length; i++) {
        this.formTyreArray.push(this.createSubmitArray());
        this.formTyreArray.controls[i].get("billsMasterId")?.setValue(res.billSubmitMasterDtlList[i].billsMasterId);  
        this.formTyreArray.controls[i].get("billAmt")?.setValue(res.billSubmitMasterDtlList[i].billAmt);   
        this.formTyreArray.controls[i].get("dtlRemarks")?.setValue(res.billSubmitMasterDtlList[i].dtlRemarks);  
        this.formTyreArray.controls[i].get("billNo")?.setValue(res.billSubmitMasterDtlList[i].billNo);
        this.formTyreArray.controls[i].get("billDate")?.setValue(this.commonService.formatDate(res.billSubmitMasterDtlList[i].billDate));
        this.formTyreArray.controls[i].get("selected")?.setValue("Y"); 
      
        this.formTyreArray.controls[i].get("billDate")?.disable();
        this.formTyreArray.controls[i].get("billNo")?.disable();
        this.formTyreArray.controls[i].get("billAmt")?.disable();
      }     
    });
  }

  createSubmitArray() {
    return this.formBuilder.group({
      billsMasterId: [''],
      billAmt: [''],
      dtlRemarks: [''],
      billNo: [''],
      billDate: [''],
      selected: [''],
    });
  }
  
  calculateTotal() {
    var totalSubmitAmt = 0; 
    var selectedData = this.formUser.getRawValue();
    var billlist = selectedData.arrayList;
    for (var i = 0; i < billlist.length; i++) {
      if (billlist[i].selected) {
        totalSubmitAmt = totalSubmitAmt + (billlist[i].billAmt == ""? 0 : parseFloat(billlist[i].billAmt) );
      }
    }
  
    this.formUser.patchValue({
      totalSubmitAmt : totalSubmitAmt.toFixed(2),
    });
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


    const d3 = this.minDate?Date.parse(this.minDate):0;
    const d2 = this.maxDate?Date.parse(this.maxDate):0;
    const d4 = selectedDataValue.submitDt?Date.parse(selectedDataValue.submitDt):0;
    if (d3>d4 || d2<d4 ) {
      this.formUser.patchValue({
        mrDate: ''
      });
      this.toastrService.warning("Invalid submit date");
      return
    }
    
    this.billsubmitmastermodel.submitMstId = this.selectedBillSubmitMasterDetail.submitMstId ;
    this.billsubmitmastermodel.submitStn= selectedDataValue.submitStn;
    this.billsubmitmastermodel.submitNo = selectedDataValue.submitNo
    this.billsubmitmastermodel.submitDt = selectedDataValue.submitDt;
    this.billsubmitmastermodel.submitType = selectedDataValue.submitType;
    this.billsubmitmastermodel.courierCo = selectedDataValue.courierCo;
    this.billsubmitmastermodel.courierDocketNo = selectedDataValue.courierDocketNo;
    this.billsubmitmastermodel.partyCode = selectedDataValue.partyCode.dataId;
    this.billsubmitmastermodel.submitLocation = selectedDataValue.submitLocation;
    this.billsubmitmastermodel.deptId = selectedDataValue.deptId;
    this.billsubmitmastermodel.billsUptoDt = selectedDataValue.billsUptoDt;
    this.billsubmitmastermodel.kindAttnTo = selectedDataValue.kindAttnTo.toString().toUpperCase();
    this.billsubmitmastermodel.remarks = selectedDataValue.remarks.toString().toUpperCase();
    this.billsubmitmastermodel.totalSubmitAmt= selectedDataValue.totalSubmitAmt;
    this.billsubmitmastermodel.submitPoNo = selectedDataValue.submitPoNo.toString().toUpperCase();
    this.billsubmitmastermodel.yearID = this.year;
    
    this.billsubmitmastermodel.loggedInUser=  this.loggedInUserID;

    this.billsubmitmastermodel.billSubmitMasterDtlList = [];
    
    if(selectedDataValue.totalSubmitAmt=="" || parseFloat(selectedDataValue.totalSubmitAmt)==0 ){    
      this.toastrService.warning("Total Amount should not be zero");    
      return;    
    }
        
    for (var i = 0; i < selectedDataValue.arrayList.length; i++) {
      if(selectedDataValue.arrayList[i].selected)
      {
        this.billsubmitmastermodel.billSubmitMasterDtlList.push({  
          'submitMstId':"",
          'submitDt': selectedDataValue.submitDt,
          'billsMasterId': selectedDataValue.arrayList[i].billsMasterId,        
          'billAmt': selectedDataValue.arrayList[i].billAmt,  
          'dtlRemarks': selectedDataValue.arrayList[i].dtlRemarks,
          'billNo': '',
          'billDate': ''
        }) 
      }
    } 
    
    if(this.billsubmitmastermodel.billSubmitMasterDtlList.length==0){
      this.toastrService.warning("Please enter atleast one Record in Details");
      return;
    }
   
    this.formSubmitted = true;  
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





