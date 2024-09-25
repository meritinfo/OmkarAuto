import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Billsmastermodel } from 'src/app/models/billsmastermodel';
import { Billsmastersearchmodel } from 'src/app/models/billsmastersearchmodel';
import { Billsmastersearchlistmodel } from 'src/app/models/billsmastersearchlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { BillsMasterService } from 'src/app/services/billsmaster.service';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { Usertriprightsmodel } from 'src/app/models/usertriprightsmodel';

@Component({
  selector: 'app-billsmasteradd',
  templateUrl: './billsmasteradd.component.html',
  styleUrls: ['./billsmasteradd.component.css']
})

  
export class BillsmasteraddComponent implements OnInit {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  duedate: string = '';
  minDate : string = '';
  maxDate : string = '';
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  partyLocationList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  lrSeries: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  formBillsMaster!: FormGroup;
  keywordLocation = 'dataName';
  supp = false;
  canCancelBill = false;
  billsmastersearchmodel = new Pagerequestwithdatesmodel();
  seriesDoc: string = "";
  billsmastersearchlistmodel = new Billsmastersearchlistmodel();    
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  showButton = true;  
  formSubmitted = false;
  selectedBillsmasterDetails = new Billsmastermodel();
  responseDetails = new Responsemodel();
  usertriprightsmodel = new Usertriprightsmodel();
  
  constructor(private billsmastermodel: Billsmastermodel, private commonService: CommonService, 
    private billsMasterService: BillsMasterService, private route: Router, 
    private formBuilder: FormBuilder,private sharedService: SharedService, 
    private cashReceiptEntryService: CashReceiptEntryService,
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
        .find(((aa: { menuName: string; }) => aa.menuName === "Bill Entry (MAIN)"));
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
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 12);

    const duedt = this.commonService.getCurrentFiscalYear(this.loginDate).sDate;    
    const mnth = duedt.getMonth();
    duedt.setMonth(mnth + 1);
    this.duedate = duedt.toLocaleDateString('en-CA').toString();
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
   
    this.getBranchList();
    this.getBillingPartyList();
    this.getLocationList();
    this.selectedBillsmasterDetails = this.billsMasterService.getBillsMasterDetails();
    this.formBillsMaster = this.formBuilder.group({
      billingStation: new FormControl(this.branch,[Validators.required]),
      billNo: new FormControl('',[Validators.required]),
      billDate: new FormControl(this.loginDate,[Validators.required]),
      dueDate: new FormControl(this.duedate,[Validators.required]),
      suppYN: new FormControl('N',[Validators.required]),
      sacHsn: new FormControl('',),
      partyCode: new FormControl('',[Validators.required]),
      partyGstLocation: new FormControl('',[Validators.required]),
      collBranch: new FormControl(this.branch,[Validators.required]),
      gstType: new FormControl('N',[Validators.required]),
      totalFreight: new FormControl('',[Validators.required]),
      totalStatistical: new FormControl(''),
      totalFov: new FormControl(''),
      totalDoorColl: new FormControl('',),
      totalHandling: new FormControl(''),
      totalLoadingDetn: new FormControl(''),
      totalEnroute: new FormControl(''),
      totalMisc: new FormControl(''),
      totalDoorDel: new FormControl(''),
      totalUnLoading: new FormControl(''),
      totalExtras: new FormControl(''),
      totalOthers: new FormControl(''),
      totalSubTotal: new FormControl(''),
      totalSgstAmt: new FormControl(''),
      totalCgstAmt: new FormControl(''),
      totalIgstAmt: new FormControl(''),
      totalNonGstAmt1: new FormControl(''),
      totalNonGstAmt2: new FormControl(''),
      totalGtotal: new FormControl('',[Validators.required]),
      billRemarks: new FormControl('',),
  
      loggedInUser :  new FormControl(''),
      arrayList: this.formBuilder.array([this.createInitialArray()]) 
    });
    
    if (this.selectedBillsmasterDetails.billsMasterId != '') {
      this.getPartyGstLocationList(this.selectedBillsmasterDetails.partyCode);
    }

    setTimeout(() => {
      this.createmode = true;
      this.formBillsMaster.controls['billingStation'].disable();
      this.formBillsMaster.controls['totalFreight'].disable();
      this.formBillsMaster.controls['totalStatistical'].disable();
      this.formBillsMaster.controls['totalFov'].disable();
      this.formBillsMaster.controls['totalDoorColl'].disable();
      this.formBillsMaster.controls['totalHandling'].disable();
      this.formBillsMaster.controls['totalLoadingDetn'].disable();
      this.formBillsMaster.controls['totalEnroute'].disable();
      this.formBillsMaster.controls['totalMisc'].disable();
      this.formBillsMaster.controls['totalDoorDel'].disable();
      this.formBillsMaster.controls['totalUnLoading'].disable();
      this.formBillsMaster.controls['totalExtras'].disable();
      this.formBillsMaster.controls['totalOthers'].disable();
      this.formBillsMaster.controls['totalSubTotal'].disable();
      this.formBillsMaster.controls['totalSgstAmt'].disable();
      this.formBillsMaster.controls['totalCgstAmt'].disable();
      this.formBillsMaster.controls['totalIgstAmt'].disable();
      this.formBillsMaster.controls['totalNonGstAmt1'].disable();
      this.formBillsMaster.controls['totalNonGstAmt2'].disable();
      this.formBillsMaster.controls['totalGtotal'].disable();

      if (this.selectedBillsmasterDetails.billsMasterId != '') {
        this.formBillsMaster.patchValue(this.selectedBillsmasterDetails); 
        this.formBillsMaster.patchValue({
          billDate:this.commonService.formatDate(this.selectedBillsmasterDetails.billDate), 
          dueDate:this.commonService.formatDate(this.selectedBillsmasterDetails.dueDate), 
          partyCode :this.partyList.find(e => e.dataId == this.selectedBillsmasterDetails.partyCode),
        })   
        this.getBillsMasterInnerGridList();
        this.editMode = true;
        this.showButton = false;
        this.formBillsMaster.controls['billNo'].disable();
        this.formBillsMaster.controls['partyCode'].disable();
        this.formBillsMaster.controls['partyGstLocation'].disable();
        this.formBillsMaster.controls['suppYN'].disable();        
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
      statistical:  ['', []],
      fov:  ['', []],
      doorColl:  ['', []],
      handling:  ['', []],
      loadingDetn:  ['', []],
      enroute:  ['', []],
      misc:  ['', []],
      doorDel:  ['', []],
      unLoading:  ['', []],
      detention:  ['', []],
      extras:  ['', []],
      others:  ['', []],
      subTotal:  ['', []],
      sgstAmt:  ['', []],
      cgstAmt:  ['', []],
      igstAmt:  ['', []],
      nonGstAmt1:  ['', []],
      nonGstAmt2:  ['', []],
      gtotal:  ['', []],
      dedAmt:  ['', []],
      yearId:  ['', []],
      suppBillDetRemarks:  ['', []],
      remarks1:  ['', []],
      remarks2:  ['', []],
      remarks3:  ['', []],
      selected:  ['', []],
    }); 
  }
  
  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
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

    this.billsMasterService.getBillsMasterSearchList(this.requestmodel)
      .subscribe((res: Billsmastersearchlistmodel) => {
      this.billsmastersearchlistmodel = res;      
      this.formBillsMaster.controls['partyCode'].disable();
    });   
  } 

  onBillNoChange(e:any): void {
    this.requestmodel.strRequest = e.target.value;
    this.billsMasterService.checkDuplicateBillsNo(this.requestmodel).subscribe((res: Responsemodel) => {
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
  
  billSeriesChange(): void {
    var selectedData = this.formBillsMaster.getRawValue();
    this.requestmodel.strRequest = selectedData.billNo;
    this.commonService.getBillSeries(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.formBillsMaster.patchValue({
        billNo: res.message
      });
    });
  }  
  
  getFinDocDetails(finId: string){
    this.requestmodel.strRequest=finId;
    this.cashReceiptEntryService.getFinDocDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.seriesDoc = res.message;
      } 
      else{
        this.seriesDoc = '';
      }
    });
  }


  onSuppYNChange(e:any){
    if(e.target.checked){
      this.supp = true;
      this.showButton = false;
      this.formBillsMaster.controls['totFreight'].enable();
    }
    else{
      this.supp = false;
      this.showButton = true;
      this.formBillsMaster.controls['totFreight'].disable();
    }
  }

   
  getBillsMasterInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedBillsmasterDetails.billsMasterId;
    this.billsMasterService.getBillsMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.billsmastersearchlistmodel = res; 
    });
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
    var totalStatistical = 0;
    var totalFov = 0;
    var totalDoorColl = 0;
    var totalHandling = 0;
    var totalLoadingDetn = 0;
    var totalEnroute = 0;
    var totalMisc = 0;
    var totalDoorDel = 0;
    var totalUnLoading = 0;
    var totalExtras = 0;
    var totalOthers = 0;
    var totalSubTotal = 0;
    var totalSgstAmt = 0;
    var totalCgstAmt = 0;
    var totalIgstAmt = 0;
    var totalNonGstAmt1 = 0;
    var totalNonGstAmt2 = 0;
    var totalGtotal = 0;

    var billlist = this.billsmastersearchlistmodel.billsMasterSearchList

    for (var i = 0; i < billlist.length; i++) {
      if (billlist[i].selected) {
          totalFreight      = totalFreight     + (billlist[i].freightRs == ""? 0 : parseFloat(billlist[i].freightRs) );
          totalStatistical  = totalStatistical + (billlist[i].statisticalRs == ""? 0 : parseFloat(billlist[i].statisticalRs) );
          totalFov          = totalFov         + (billlist[i].fovRs == ""? 0 : parseFloat(billlist[i].fovRs) );
          totalDoorColl     = totalDoorColl    + (billlist[i].doorCollRs == ""? 0 : parseFloat(billlist[i].doorCollRs) );
          totalHandling     = totalHandling    + (billlist[i].handlingRs == ""? 0 : parseFloat(billlist[i].handlingRs) );
          totalLoadingDetn  = totalLoadingDetn + (billlist[i].loadingDetnRs == ""? 0 : parseFloat(billlist[i].loadingDetnRs) );
          totalEnroute      = totalEnroute     + (billlist[i].enrouteRs == ""? 0 : parseFloat(billlist[i].enrouteRs) );
          totalMisc         = totalMisc        + (billlist[i].miscRs == ""? 0 : parseFloat(billlist[i].miscRs) );
          totalDoorDel      = totalDoorDel     + (billlist[i].doorDelRs == ""? 0 : parseFloat(billlist[i].doorDelRs) );
          totalUnLoading    = totalUnLoading   + (billlist[i].unLoadingRs == ""? 0 : parseFloat(billlist[i].unLoadingRs) );
          totalExtras       = totalExtras      + (billlist[i].extrasRS == ""? 0 : parseFloat(billlist[i].extrasRS) );
          totalOthers       = totalOthers      + (billlist[i].othersRs == ""? 0 : parseFloat(billlist[i].othersRs) );
          totalSubTotal     = totalSubTotal    + (billlist[i].subTotalRs == ""? 0 : parseFloat(billlist[i].subTotalRs) );
          totalSgstAmt      = totalSgstAmt     + (billlist[i].sgstAmt == ""? 0 : parseFloat(billlist[i].sgstAmt) );
          totalCgstAmt      = totalCgstAmt     + (billlist[i].cgstAmt == ""? 0 : parseFloat(billlist[i].cgstAmt) );
          totalIgstAmt      = totalIgstAmt     + (billlist[i].igstAmt == ""? 0 : parseFloat(billlist[i].igstAmt) );
          totalNonGstAmt1   = totalNonGstAmt1  + (billlist[i].nonGstAmt1 == ""? 0 : parseFloat(billlist[i].nonGstAmt1) );
          totalNonGstAmt2   = totalNonGstAmt2  + (billlist[i].nonGstAmt2 == ""? 0 : parseFloat(billlist[i].nonGstAmt2)) ;
          totalGtotal       = totalGtotal      + (billlist[i].gtotalRs == ""? 0 : parseFloat(billlist[i].gtotalRs) );
      }
    }

    this.formBillsMaster.patchValue({
      totalFreight      : totalFreight.toFixed(2),
      totalStatistical  : totalStatistical.toFixed(2),
      totalFov          : totalFov.toFixed(2),
      totalDoorColl     : totalDoorColl.toFixed(2),
      totalHandling     : totalHandling.toFixed(2),
      totalLoadingDetn  : totalLoadingDetn.toFixed(2),
      totalEnroute      : totalEnroute.toFixed(2),
      totalMisc         : totalMisc.toFixed(2),
      totalDoorDel      : totalDoorDel.toFixed(2),
      totalUnLoading    : totalUnLoading.toFixed(2),
      totalExtras       : totalExtras.toFixed(2),
      totalOthers       : totalOthers.toFixed(2),
      totalSubTotal     : totalSubTotal.toFixed(2),
      totalSgstAmt      : totalSgstAmt.toFixed(2),
      totalCgstAmt      : totalCgstAmt.toFixed(2),
      totalIgstAmt      : totalIgstAmt.toFixed(2),
      totalNonGstAmt1   : totalNonGstAmt1.toFixed(2),
      totalNonGstAmt2   : totalNonGstAmt2.toFixed(2),
      totalGtotal       : totalGtotal.toFixed(2),
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
    this.route.navigate(['/billstatementlist']);
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
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formBillsMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }

    var selectedDataValue = this.formBillsMaster.getRawValue();

    if (selectedDataValue.partyCode.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" Party is Invalid");
      return;
    } 
    if (selectedDataValue.partyGstLocation.dataId) {
      //ignore
    }
    else{
      this.toasterService.warning(" Party Location is Invalid");
      return;
    }
    
    if(parseFloat(selectedDataValue.totalGtotal) > 0 ){
      //ignore
    }
    else{
      this.toasterService.warning(" Bill Amount is Invalid");   
      return;
    }

    this.formSubmitted = true;
    this.billsmastermodel.billsMasterId = this.selectedBillsmasterDetails.billsMasterId;
    this.billsmastermodel.billingStation = selectedDataValue.billingStation;
    this.billsmastermodel.billNo = selectedDataValue.billNo;
    this.billsmastermodel.billDate = selectedDataValue.billDate;
    this.billsmastermodel.partyCode = selectedDataValue.partyCode.dataId;
    this.billsmastermodel.billStatus = 'N';
    this.billsmastermodel.billType = '1';
    this.billsmastermodel.partyGstLocation = selectedDataValue.partyGstLocation.dataId;
    this.billsmastermodel.collBranch = selectedDataValue.collBranch;
    this.billsmastermodel.suppYN = selectedDataValue.suppYN;
    this.billsmastermodel.sacHsn = selectedDataValue.sacHsn.toString();
    this.billsmastermodel.totalFreight =selectedDataValue.totalFreight.toString();
    this.billsmastermodel.totalStatistical = selectedDataValue.totalStatistical.toString();
    this.billsmastermodel.totalFov = selectedDataValue.totalFov.toString();
    this.billsmastermodel.totalHandling = selectedDataValue.totalHandling.toString();
    this.billsmastermodel.totalDoorColl = selectedDataValue.totalDoorColl.toString();
    this.billsmastermodel.totalLoadingDetn = selectedDataValue.totalLoadingDetn.toString();
    this.billsmastermodel.totalEnroute = selectedDataValue.totalEnroute.toString();
    this.billsmastermodel.totalMisc = selectedDataValue.totalMisc.toString();
    this.billsmastermodel.totalExtras = selectedDataValue.totalExtras.toString();
    this.billsmastermodel.totalOthers = selectedDataValue.totalOthers.toString();
    this.billsmastermodel.totalUnLoading= selectedDataValue.totalUnLoading.toString();
    this.billsmastermodel.totalSubTotal = selectedDataValue.totalSubTotal.toString();
    this.billsmastermodel.gstType = selectedDataValue.gstType;
    this.billsmastermodel.totalSgstAmt = selectedDataValue.totalSgstAmt.toString();
    this.billsmastermodel.totalCgstAmt = selectedDataValue.totalCgstAmt.toString();
    this.billsmastermodel.totalIgstAmt = selectedDataValue.totalIgstAmt.toString();
    this.billsmastermodel.totalNonGstAmt1 = selectedDataValue.totalNonGstAmt1.toString();
    this.billsmastermodel.totalNonGstAmt2 = selectedDataValue.totalNonGstAmt2.toString();
    this.billsmastermodel.totalGtotal = selectedDataValue.totalGtotal.toString();
    this.billsmastermodel.billRemarks = selectedDataValue.billRemarks.toString().toUpperCase();
    this.billsmastermodel.dueDate= selectedDataValue.dueDate;
    this.billsmastermodel.yearId = this.year;
    this.billsmastermodel.loggedInUser = this.loggedInUserID;
    this.billsmastermodel.billsMasterListData = [];
    var gstType = '' ;
    for (var i = 0; i < this.billsmastersearchlistmodel.billsMasterSearchList.length; i++) {
      if(this.billsmastersearchlistmodel.billsMasterSearchList[i].selected){
        if(this.billsmastersearchlistmodel.billsMasterSearchList[i].gstType == 'NA' ||
          this.billsmastersearchlistmodel.billsMasterSearchList[i].gstType == 'N'){
            gstType = 'NA'
          }        
        
        this.billsmastermodel.billsMasterListData.push({
          'billDetailId': '',
          'billsMasterId': '',
          'billingStation': selectedDataValue.billingStation,
          'billNo': selectedDataValue.billNo, 
          'billDate':  selectedDataValue.billDate,
          'billType': selectedDataValue.billType,
          'partyCode': selectedDataValue.partyCode.dataId,
          'gcBranch': "",
          'gcYear': "",
          'gcNoteNo':"",
          'consignmentid': this.billsmastersearchlistmodel.billsMasterSearchList[i].consignmentID,
          'freight': this.billsmastersearchlistmodel.billsMasterSearchList[i].freightRs,
          'statistical': this.billsmastersearchlistmodel.billsMasterSearchList[i].statisticalRs,
          'fov': this.billsmastersearchlistmodel.billsMasterSearchList[i].fovRs,
          'doorColl': this.billsmastersearchlistmodel.billsMasterSearchList[i].doorCollRs,
          'handling': this.billsmastersearchlistmodel.billsMasterSearchList[i].handlingRs,
          'loadingDetn': this.billsmastersearchlistmodel.billsMasterSearchList[i].loadingDetnRs,
          'enroute': this.billsmastersearchlistmodel.billsMasterSearchList[i].enrouteRs,
          'misc': this.billsmastersearchlistmodel.billsMasterSearchList[i].miscRs,
          'doorDel': this.billsmastersearchlistmodel.billsMasterSearchList[i].doorDelRs,
          'unLoading':  this.billsmastersearchlistmodel.billsMasterSearchList[i].unLoadingRs,
          'detention': "",
          'extras': this.billsmastersearchlistmodel.billsMasterSearchList[i].extrasRS,
          'others': this.billsmastersearchlistmodel.billsMasterSearchList[i].othersRs,
          'subTotal': this.billsmastersearchlistmodel.billsMasterSearchList[i].subTotalRs,
          'sgstAmt':  this.billsmastersearchlistmodel.billsMasterSearchList[i].sgstAmt,
          'cgstAmt': this.billsmastersearchlistmodel.billsMasterSearchList[i].cgstAmt,
          'igstAmt': this.billsmastersearchlistmodel.billsMasterSearchList[i].igstAmt,
          'nonGstAmt1': this.billsmastersearchlistmodel.billsMasterSearchList[i].nonGstAmt1,
          'nonGstAmt2':  this.billsmastersearchlistmodel.billsMasterSearchList[i].nonGstAmt2,
          'gtotal':  this.billsmastersearchlistmodel.billsMasterSearchList[i].gtotalRs,
          'dedAmt':"" ,
          'yearId':  this.year,
          'suppBillDetRemarks': "",
          'remarks1': "",
          'remarks2': "",
          'remarks3': "",          
        });
      }
    } 
    
    if(gstType == 'NA' && this.billsmastermodel.gstType != 'NA' ){
      this.toasterService.warning("Bill GST should not be applicable");   
      return;
    }
    
    this.billsMasterService.saveBillsMasterDetails(this.billsmastermodel).subscribe((res: Responsemodel) => {
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

  