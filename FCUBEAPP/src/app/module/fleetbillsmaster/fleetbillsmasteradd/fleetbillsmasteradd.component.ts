import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Billsmastermodel } from 'src/app/models/billsmastermodel';
import { Billsmastersearchlistmodel } from 'src/app/models/billsmastersearchlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { FleetBillsMasterService } from 'src/app/services/fleetbillsmaster.service';
import { BillsMasterService } from 'src/app/services/billsmaster.service';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Usertriprightsmodel } from 'src/app/models/usertriprightsmodel';

@Component({
  selector: 'app-fleetbillsmasteradd',
  templateUrl: './fleetbillsmasteradd.component.html',
  styleUrls: ['./fleetbillsmasteradd.component.css']
})

  
export class FleetBillsmasteraddComponent implements OnInit {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  duedate: string = '';
  btype: string = '';
  minDate : string = '';
  maxDate : string = '';
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  partyLocationList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  lrSeries: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  gstByList: Dropdownmodel[] = [];
  BillTypesList: Dropdownmodel[] = [];
  formBillsMaster!: FormGroup;
  keywordLocation = 'dataName';
  supp = false;
  canCancelBill = false;
  billsmastersearchmodel = new Pagerequestwithdatesmodel();
  seriesDoc: string = "";
  billsmastersearchlistmodel = new Billsmastersearchlistmodel();     
  appendMode = false;  
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  createdBy : string = "";
  modifiedBy: string = "";
  dashboard: string ="";
  showButton = true;  
  formSubmitted = false;
  selectedBillsmasterDetails = new Billsmastermodel();
  responseDetails = new Responsemodel();
  usertriprightsmodel = new Usertriprightsmodel();
  
  constructor(private billsmastermodel: Billsmastermodel, private commonService: CommonService, 
    private billsMasterService:BillsMasterService,
    private fleetBillsMasterService: FleetBillsMasterService, private route: Router, 
    private formBuilder: FormBuilder,private sharedService: SharedService, 
    private toasterService: ToastrService,private requestmodel:Requestmodel) {
    this.billsmastermodel = new Billsmastermodel();    
  }

  ngOnInit(): void {
    this.sharedService.loading = true;   
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Fleet Bill"));
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
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    var duedt = new Date(this.loginDate);
    var mnth = duedt.getMonth();
    duedt.setMonth(mnth + 1);
    this.duedate = duedt.toLocaleDateString('en-CA').toString();    
    this.getBillTypesList();
    this.getBranchList();
    this.getGstByList();
    this.getBillingPartyList();
    this.getLocationList();
    this.getBillTypeSacHsn();
    
    this.selectedBillsmasterDetails = this.fleetBillsMasterService.getFleetBillsMasterDetails();

    this.formBillsMaster = this.formBuilder.group({
      billingStation: new FormControl(this.branch,[Validators.required]),
      billNo: new FormControl('',[Validators.required]),
      billDate: new FormControl(this.loginDate,[Validators.required]),
      dueDate: new FormControl(this.duedate,[Validators.required]),
      sacHsn: new FormControl('',),
      partyCode: new FormControl('',[Validators.required]),
      partyGstLocation: new FormControl('',[Validators.required]),
      collBranch: new FormControl(this.branch,[Validators.required]),
      gstType: new FormControl('NA',[Validators.required]),
      totalFreight: new FormControl('',[Validators.required]),
      billRemarks: new FormControl('',),
      enlcosedDocs: new FormControl('',),
      gstBy : new FormControl('N',[Validators.required]),
      selectedAll: new FormControl(''),
      arrayList: this.formBuilder.array([this.createInitialArray()]) 
    });
    
    if (this.selectedBillsmasterDetails.billsMasterId != '') {
      this.getPartyGstLocationList(this.selectedBillsmasterDetails.partyCode);
    }

    setTimeout(() => {
      this.createmode = true;
      this.getBillTypesList();
      this.formBillsMaster.controls['billingStation'].disable();
      //this.formBillsMaster.controls['billNo'].disable();
      this.formBillsMaster.controls['gstBy'].disable();
      this.formBillsMaster.controls['totalFreight'].disable();
      if (this.selectedBillsmasterDetails.billsMasterId != '') {
        this.formBillsMaster.patchValue(this.selectedBillsmasterDetails); 
        this.formBillsMaster.patchValue({
          billDate:this.commonService.formatDate(this.selectedBillsmasterDetails.billDate), 
          dueDate:this.commonService.formatDate(this.selectedBillsmasterDetails.dueDate), 
          partyCode :this.partyList.find(e => e.dataId == this.selectedBillsmasterDetails.partyCode),
        })   
 
        this.getFinDocDetails(this.selectedBillsmasterDetails.finFtmid);
        this.getBillsMasterInnerGridList();
        this.createdBy = this.selectedBillsmasterDetails.createdBy + " " + this.selectedBillsmasterDetails.createdDate;
        this.modifiedBy = this.selectedBillsmasterDetails.modifiedBy + " " + this.selectedBillsmasterDetails.modifiedDate;  
        this.editMode = true;
        this.appendMode = true; 
        this.showButton = false;
        this.formBillsMaster.controls['billNo'].disable();
        this.formBillsMaster.controls['partyCode'].disable();
      } 
      else{        
        this.billSeriesChange();
      }  
    }, 2000);
     
    this.sharedService.loading = false;    
  }

  
  get f() { return this.formBillsMaster.controls;}
  
  get formArray() {
    return this.formBillsMaster.get("arrayList") as FormArray;
  }  

  
  createInitialArray() {
    return this.formBuilder.group({
      billDetailId:  ['', []],
      billsMasterId:  ['', []],
      billingStation:  ['', []],
      index:  ['', []],
      billNo:  ['', []],
      billDate:  ['', []],
      billType:  ['', []],
      partyCode:  ['', []],
      gcBranch:  ['', []],
      gcNoteNo:  ['', []],
      fromPlace:  ['', []],
      toPlace:  ['', []],
      consignmentid:  ['', []],
      yearId:  ['', []],
      remarks3:  ['', []],
      selected:  ['', []],
    }); 
  }

  getBillTypeSacHsn():void{
    this.requestmodel.strRequest = "1";
    this.billsMasterService.getBillTypeSacHsn(this.requestmodel).subscribe((res) => {
      this.formBillsMaster.patchValue({
        sacHsn: res.message,
      });
    });
  }


  getBillTypesList(): void {
    this.commonService.getBillTypesList().subscribe((res) => {
      this.BillTypesList = res;
      this.btype = this.BillTypesList.find(e => e.dataName === "FLEET BILL")?.dataId?.toString() || '';
    }); 
  }
  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getGstByList(): void {
    this.commonService.getGstByList().subscribe((res) => {
      this.gstByList = res;
    });
  }
  
  getBillingPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }

  getPartyGstLocationList(party:string): void {
    this.requestmodel.strRequest = party;
    this.billsMasterService.getPartyGstLocationList(this.requestmodel).subscribe((res) => {
      this.partyLocationList = res;
    });    
  }

  selectEvent(item: any) {
    this.getPartyGstLocationList(item.dataId);
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (branchList: Dropdownmodel[], query: string): any[] {
    return branchList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  append():void {
    var selectedDataValue = this.formBillsMaster.getRawValue();
    if (selectedDataValue.partyCode.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" Party is Invalid");
      return;
    } 
    this.requestmodel.strRequest = selectedDataValue.partyCode.dataId;

    this.fleetBillsMasterService.getFleetBillsMasterSearchList(this.requestmodel).subscribe((res: Billsmastersearchlistmodel) => {
        this.appendMode = false;
        for(var i=0;i<res.billsMasterSearchList.length;i++){
        this.billsmastersearchlistmodel.billsMasterSearchList.push({
          'consignmentID': res.billsMasterSearchList[i].consignmentID,
          'bookingPlace':  res.billsMasterSearchList[i].bookingPlace,
          'bookingDate':  res.billsMasterSearchList[i].bookingDate,
          'gcNoteNo':  res.billsMasterSearchList[i].gcNoteNo,
          'fromPlace': res.billsMasterSearchList[i].fromPlace,
          'toPlace':res.billsMasterSearchList[i].toPlace, 
          'rateRs': res.billsMasterSearchList[i].rateRs, 
          'freightRs':  res.billsMasterSearchList[i].freightRs, 
          'statisticalRs': "0",
          'fovRs': "0", 
          'doorCollRs':  "0",
          'handlingRs': "0",
          'loadingDetnRs': "0",
          'enrouteRs': "0",
          'miscRs': "0",
          'doorDelRs': "0",
          'unLoadingRs':  "0",
          'unLoadingDetnRs': "0",
          'extrasRS': "0",
          'othersRs':"0",
          'subTotalRs': res.billsMasterSearchList[i].freightRs, 
          'gstType':  "0",
          'cgstAmt':"0",
          'sgstAmt': "0",
          'igstAmt':  "0",
          'nonGstAmt1':"0",
          'nonGstAmt2': "0",
          'gtotalRs':  res.billsMasterSearchList[i].freightRs, 
          'remarks1': "0",
          'remarks2': "0",
          'remarks3':  "0",
          'suppBillDetRemarks':  "0",
          'otherAmt': "0",
          'selected': false
         });
      }
        
//      this.billsmastersearchlistmodel = res;      
      this.formBillsMaster.controls['partyCode'].disable();
    });   
  } 

  searchStatement(): void {
    var selectedDataValue = this.formBillsMaster.getRawValue();
    if (selectedDataValue.partyCode.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" Party is Invalid");
      return;
    } 
    this.requestmodel.strRequest = selectedDataValue.partyCode.dataId;

    this.fleetBillsMasterService.getFleetBillsMasterSearchList(this.requestmodel)
      .subscribe((res: Billsmastersearchlistmodel) => {
      this.billsmastersearchlistmodel = res;      
      this.formBillsMaster.controls['partyCode'].disable();
    });   
  } 

  onBillNoChange(): void {    
    var selectedDataValue = this.formBillsMaster.getRawValue();
    
    this.requestmodel.strRequest  = "BL";
    this.requestmodel.strRequest1 = selectedDataValue.billingStation;
    this.requestmodel.strRequest2 = this.year;
    this.requestmodel.strRequest3 = "";
    this.requestmodel.strRequest4 = selectedDataValue.billNo;
    this.commonService.checkDuplicateDocNo(this.requestmodel).subscribe((res: Responsemodel) => {
    // this.billsmastermodel.billingStation = selectedDataValue.billingStation;
    // this.billsmastermodel.billNo = selectedDataValue.billNo;
    // this.billsmastermodel.yearId = this.year;

    // this.billsMasterService.checkDuplicateBillsNo(this.billsmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formBillsMaster.patchValue({
          billNo: "",
        });
      }    
    });
  }  

  
  onDueDtChange(e:any): void {
    var dueDate = new Date(e.target.value);
    var selectedData = this.formBillsMaster.getRawValue();
    if(selectedData.billDate==""){
      this.toasterService.warning("Please Enter the Bill Date");
      this.formBillsMaster.patchValue({
        dueDate: ""
      });
      return;
    }
    var billDate = new Date(selectedData.billDate);
    if(billDate>dueDate){
      this.toasterService.warning("Due date should not be earlier than the bill date");
      this.formBillsMaster.patchValue({
        dueDate: ""
      });
    }
  }  
  
  billSeriesChange(): void {
     var selectedData = this.formBillsMaster.getRawValue();
     
    this.requestmodel.strRequest = "BL"
    this.requestmodel.strRequest1 = selectedData.billingStation;
    this.requestmodel.strRequest2 = this.year;
    this.requestmodel.strRequest3 = "";

    this.commonService.getDocAutoGenNo(this.requestmodel).subscribe((res: Responsemodel) => {
    // this.requestmodel.strRequest = selectedData.billingStation;
    // this.requestmodel.strRequest1 = this.year;
    // this.commonService.getBillSeries(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.formBillsMaster.patchValue({
        billNo: res.message
      });
    });
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

  
  getBillsMasterInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedBillsmasterDetails.billsMasterId;
    this.fleetBillsMasterService.getFleetBillsMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.billsmastersearchlistmodel = res; 
    });
  }

  
  selectAll(e: any) {    
    if(e.target.checked){
      for (let i = 0; i < this.billsmastersearchlistmodel.billsMasterSearchList.length; i++) {
        this.billsmastersearchlistmodel.billsMasterSearchList[i].selected = true;
      }
    }
    else{
      for (let i = 0; i < this.billsmastersearchlistmodel.billsMasterSearchList.length; i++) {
        this.billsmastersearchlistmodel.billsMasterSearchList[i].selected = false;
      }
    }
    this.calculateTotal();
  }

  
  selectedData(i: number, event: any) {
    this.billsmastersearchlistmodel.billsMasterSearchList[i].selected = event.target.checked;      
    var gst = this.billsmastersearchlistmodel.billsMasterSearchList[i].gstType;
    if(event.target.checked && (gst == 'NA' ||gst == 'N')){
      this.formBillsMaster.patchValue({
        gstType: 'NA',
      });
    }
    this.calculateTotal();
  }  

  
  calculateTotal() {
    var totalFreight = 0;
    var billlist = this.billsmastersearchlistmodel.billsMasterSearchList;

    for (let i = 0; i < billlist.length; i++) {
      if (billlist[i].selected) {
        totalFreight = totalFreight + (billlist[i].freightRs == ""? 0 : parseFloat(billlist[i].freightRs) );
      }
    }

    this.formBillsMaster.patchValue({
      totalFreight      : totalFreight.toFixed(2),
    });
  
  }


  getUserTripRights(): void {
    this.requestmodel.strRequest = this.loggedInUserID;
    this.commonService.getUserDetails(this.requestmodel).subscribe((res: Usertriprightsmodel) => {
      this.usertriprightsmodel = res;
      this.canCancelBill = this.usertriprightsmodel.canCancelBill;  
      if(this.canCancelBill)  {
        this.formBillsMaster.controls['cancelBill'].enable();        
      }  
    });   
  }
  
  exit(): void {
    this.route.navigate(['/fleetbill']);
  }  

  billsMasterDelete(): void {
    if(this.selectedBillsmasterDetails.billsMasterId != '' ){
      this.requestmodel.strRequest =this.selectedBillsmasterDetails.billsMasterId
      if (confirm("Are you sure, you want to delete this?")) {
        this.billsMasterService.billsMasterDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formBillsMaster.reset();
            this.route.navigate(['/billstatementlist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
        });
      }
    }
  } 
  

  saveBillsDetails(): void {
    if (this.formBillsMaster.invalid) {
      this.toasterService.warning("Please enter mandatory fields");
      const controls = this.formBillsMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          // Convert camelCase key to readable format
          const readableName = name.replace(/([A-Z])/g, ' $1');
          const titleCaseName = readableName.charAt(0).toUpperCase() + readableName.slice(1);

          this.toasterService.warning(titleCaseName + " field is invalid");
        }
      }
      return;
    }

    var selectedDataValue = this.formBillsMaster.getRawValue();
    // const d3 = this.minDate?Date.parse(this.minDate):0;
    // const d2 = this.maxDate?Date.parse(this.maxDate):0;
    // const d4 = selectedDataValue.billDate?Date.parse(selectedDataValue.billDate):0;
    // if (d3>d4 || d2<d4 ) {
    //   this.formBillsMaster.patchValue({
    //     billDate: ''
    //   });
    //   this.toasterService.warning("Please select a valid  bill date");
    //   return
    // }
     let billDate = new Date(selectedDataValue.billDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<billDate || billDate<mindt) {
      this.toasterService.warning("Please select a valid  bill date");
      return;
    }

    if (selectedDataValue.partyCode.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning("Please select a valid party");
      return;
    } 
    
    this.formSubmitted = true;
    this.billsmastermodel.billsMasterId = this.selectedBillsmasterDetails.billsMasterId;
    this.billsmastermodel.billingStation = selectedDataValue.billingStation;
    this.billsmastermodel.billNo = selectedDataValue.billNo;
    this.billsmastermodel.billDate = selectedDataValue.billDate;
    this.billsmastermodel.partyCode = selectedDataValue.partyCode.dataId;
    this.billsmastermodel.billStatus = 'N';
    this.billsmastermodel.billType =  this.btype;
    this.billsmastermodel.partyGstLocation = selectedDataValue.partyGstLocation;
    this.billsmastermodel.collBranch = selectedDataValue.collBranch;
    this.billsmastermodel.suppYN = "N";
    this.billsmastermodel.sacHsn = selectedDataValue.sacHsn.toString();
    this.billsmastermodel.totalFreight =selectedDataValue.totalFreight.toString();
    this.billsmastermodel.totalStatistical = '0';
    this.billsmastermodel.totalFov =  '0';
    this.billsmastermodel.totalHandling =  '0';
    this.billsmastermodel.totalDoorColl =  '0';
    this.billsmastermodel.totalLoadingDetn = '0';
    this.billsmastermodel.totalDetention =  '0';
    this.billsmastermodel.totalEnroute =  '0';
    this.billsmastermodel.totalMisc =  '0';
    this.billsmastermodel.totalExtras =  '0';
    this.billsmastermodel.totalOthers =  '0';
    this.billsmastermodel.totalUnLoading=  '0';
    this.billsmastermodel.totalSubTotal = selectedDataValue.totalFreight.toString();
    this.billsmastermodel.gstType = "NA";
    this.billsmastermodel.gstBy = selectedDataValue.gstBy;    
    this.billsmastermodel.totalSgstAmt =  '0';
    this.billsmastermodel.totalCgstAmt =  '0';
    this.billsmastermodel.totalIgstAmt =  '0';
    this.billsmastermodel.totalNonGstAmt1 =  '0';
    this.billsmastermodel.totalNonGstAmt2 =  '0';
    this.billsmastermodel.totalGtotal = selectedDataValue.totalFreight.toString();
    this.billsmastermodel.billRemarks = selectedDataValue.billRemarks.toString().toUpperCase();
    this.billsmastermodel.enlcosedDocs = selectedDataValue.enlcosedDocs.toString().toUpperCase();
    this.billsmastermodel.suppParticulars = "";
    this.billsmastermodel.dueDate= selectedDataValue.dueDate;
    this.billsmastermodel.yearId = this.year;
    this.billsmastermodel.loggedInUser = this.loggedInUserID;
    this.billsmastermodel.billsMasterListData = [];

    for (let i = 0; i < this.billsmastersearchlistmodel.billsMasterSearchList.length; i++) {
      if(this.billsmastersearchlistmodel.billsMasterSearchList[i].selected){
        this.billsmastermodel.billsMasterListData.push({
          'billDetailId': '',
          'billsMasterId': '',
          'billingStation': selectedDataValue.billingStation,
          'billNo': selectedDataValue.billNo, 
          'billDate':  selectedDataValue.billDate,
          'billType':this.btype,
          'partyCode': selectedDataValue.partyCode.dataId,
          'gcBranch': "",
          'gcYear': "",
          'gcNoteNo':this.billsmastersearchlistmodel.billsMasterSearchList[i].gcNoteNo,
          'consignmentid': this.billsmastersearchlistmodel.billsMasterSearchList[i].consignmentID,
          'freight': this.billsmastersearchlistmodel.billsMasterSearchList[i].freightRs,
          'statistical': '0',
          'fov':  '0',
          'doorColl':  '0',
          'handling': '0',
          'loadingDetn':  '0',
          'enroute':  '0',
          'misc':  '0',
          'doorDel':  '0',
          'unLoading':   '0',
          'detention':  '0',
          'extras':  '0',
          'others': '0',
          'subTotal': this.billsmastersearchlistmodel.billsMasterSearchList[i].freightRs,
          'sgstAmt': "0",
          'cgstAmt': "0",
          'igstAmt': "0",
          'nonGstAmt1': "0",
          'nonGstAmt2':  "0",
          'gtotal':  this.billsmastersearchlistmodel.billsMasterSearchList[i].freightRs,
          'dedAmt':"0" ,
          'yearId':  this.year,
          'suppBillDetRemarks': "",
          'remarks1': "",
          'remarks2': "",
          'remarks3': "",          
        });
      }
    }   
    
    this.billsMasterService.saveBillsMasterDetails(this.billsmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formBillsMaster.reset();
        this.route.navigate(['/fleetbill']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }

}

  