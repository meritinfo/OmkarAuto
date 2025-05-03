import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BillsmasterlistmodelLLP } from 'src/app/models/billsmasterlistmodelllp';
import { Reportmodel } from 'src/app/models/reportmodel';
import { BillsmastersearchlistmodelLLP} from 'src/app/models/billsmastersearchlistmodelllp';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { SharedService } from 'src/app/services/shared.service';
import { BillsmastermodelllP } from 'src/app/models/billsmastermodelllp';
import { Responsemodel } from 'src/app/models/responsemodel';
import { BillsMasterServiceLLP } from 'src/app/services/billsmasterllp.service';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { Usertriprightsmodel } from 'src/app/models/usertriprightsmodel';


@Component({
  selector: 'app-billsmasteraddllp',
  templateUrl: './billsmasteraddllp.component.html',
  styleUrls: ['./billsmasteraddllp.component.css']
})
export class BillsmasteraddllpComponent { loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  duedate: string = '';
  minDate : string = '';
  maxDate : string = '';
  seriesLength : string = '';
  branchList: Dropdownmodel[] = [];
  seriesList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  partyLocationList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  lrSeries: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  gstByList: Dropdownmodel[] = [];
  formBillsMaster!: FormGroup;
  keywordLocation = 'dataName';
  supp = false;
  canCancelBill = false;
  billsmastersearchmodel = new Pagerequestwithdatesmodel();
  seriesDoc: string = "";
  billsmastersearchlistmodel = new BillsmastersearchlistmodelLLP();     
  appendMode = false;  
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  showButton = true;  
  formSubmitted = false;
  selectedBillsmasterDetails = new BillsmastermodelllP();
  responseDetails = new Responsemodel();
  usertriprightsmodel = new Usertriprightsmodel();
  
  constructor(private billsmastermodel: BillsmastermodelllP, private commonService: CommonService, 
    private billsMasterService: BillsMasterServiceLLP, private route: Router, 
    private formBuilder: FormBuilder,private sharedService: SharedService, 
    private cashReceiptEntryService: CashReceiptEntryService,   private reportmodel: Reportmodel,
    private toasterService: ToastrService,private requestmodel:Requestmodel) {
    this.billsmastermodel = new BillsmastermodelllP();    
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
    
    this.getBranchList();
    this.getGstByList();
    this.getBillingPartyList();
    this.getLocationList();
    this.getBillTypeSacHsn();
    this.getCnNoLength();
    
    this.selectedBillsmasterDetails = this.billsMasterService.getBillsMasterDetails();

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
      sgstPct: new FormControl(''),
      cgstPct: new FormControl(''),
      igstPct: new FormControl('',),
      totalSgstAmt: new FormControl(''),
      totalCgstAmt: new FormControl(''),
      totalIgstAmt: new FormControl(''),
      totalNonGstAmt1: new FormControl(''),
      totalNonGstAmt2: new FormControl(''),
      totalGtotal: new FormControl('',[Validators.required]),
      billRemarks: new FormControl('',),
      enlcosedDocs: new FormControl('',),
      billSeries: new FormControl('',),
      billSlNo: new FormControl('',),
      gstBy : new FormControl('N',[Validators.required]),
  
      selectedAll :  new FormControl(''),
      arrayList: this.formBuilder.array([this.createInitialArray()]) 
    });
    this.formBillsMaster.controls['billNo'].disable();
    if (this.selectedBillsmasterDetails.billsMasterId != '') {
      this.getPartyGstLocationList(this.selectedBillsmasterDetails.partyCode);
    }

    setTimeout(() => {
      this.createmode = true;
      this.formBillsMaster.controls['billingStation'].disable();
      //this.formBillsMaster.controls['billNo'].disable();
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
      this.formBillsMaster.controls['sgstPct'].disable();
      this.formBillsMaster.controls['cgstPct'].disable();  
      this.formBillsMaster.controls['igstPct'].disable();  


      if (this.selectedBillsmasterDetails.billsMasterId != '') {
        this.formBillsMaster.patchValue(this.selectedBillsmasterDetails); 
        
        var str = this.selectedBillsmasterDetails.billSlNo;
          
        var x = "";
        if(str.length<parseInt(this.seriesLength)){
          if (this.seriesLength == "1") x = ("0" + str).slice(-1);
          if (this.seriesLength == "2") x = ("00" + str).slice(-2);
          if (this.seriesLength == "3") x = ("000" + str).slice(-3);
          if (this.seriesLength == "4") x = ("0000" + str).slice(-4);
          if (this.seriesLength == "5") x = ("00000" + str).slice(-5);
          if (this.seriesLength == "6") x = ("000000" + str).slice(-6); 
        }  
        else{
          x = str;
        }             

        this.formBillsMaster.patchValue({
          billSlNo:x,
          billDate:this.commonService.formatDate(this.selectedBillsmasterDetails.billDate), 
          dueDate:this.commonService.formatDate(this.selectedBillsmasterDetails.dueDate), 
          partyCode :this.partyList.find(e => e.dataId == this.selectedBillsmasterDetails.partyCode),
        })   
        this.formBillsMaster.controls['billSeries'].disable();  
        this.formBillsMaster.controls['billSlNo'].disable();  
        // if (this.selectedBillsmasterDetails.gstType == "IG") {   
        //   this.formBillsMaster.controls['sgstPct'].disable();
        //   this.formBillsMaster.controls['cgstPct'].disable();  
        //   this.formBillsMaster.controls['igstPct'].enable(); 
        // }    
        // else if (this.selectedBillsmasterDetails.gstType == "SC")  {      
        //   this.formBillsMaster.controls['sgstPct'].enable();
        //   this.formBillsMaster.controls['cgstPct'].enable();  
        //   this.formBillsMaster.controls['igstPct'].disable(); 
        // }
        // else{
        //   this.formBillsMaster.controls['sgstPct'].disable();
        //   this.formBillsMaster.controls['cgstPct'].disable();  
        //   this.formBillsMaster.controls['igstPct'].disable(); 
        // }  
        this.getFinDocDetails(this.selectedBillsmasterDetails.finFtmid);
        this.getBillsMasterInnerGridList();
        this.editMode = true;
        this.appendMode = true; 
        this.showButton = false;
        this.formBillsMaster.controls['billNo'].disable();
        this.formBillsMaster.controls['partyCode'].disable();
      } 
      else{        
       // this.billSeriesChange();
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
      dedAmt:  ['', []],
      yearId:  ['', []],
      suppBillDetRemarks:  ['', []],
      remarks1:  ['', []],
      remarks2:  ['', []],
      remarks3:  ['', []],
      selected:  ['', []],
    }); 
  }

  getSeriesList(br: string): void {
    this.requestmodel.strRequest = "B";
    this.requestmodel.strRequest1 = br;
    this.commonService.getSeriesllpList(this.requestmodel).subscribe((res) => {
      this.seriesList = res;
    });
  }

  getCnNoLength(){
    this.commonService.getCnNoLength().subscribe((res: Responsemodel) => {
      if(res.status){
        this.seriesLength= res.message;
      }
    });
  }

  chkBillDuplicateLLP(){
    var selectedData = this.formBillsMaster.getRawValue();
    if (selectedData.billSlNo==""){
      this.toasterService.warning(" bill no should not be Blank");
      return;
    }
    else{
      this.reportmodel.filterStr = selectedData.billingStation;
      this.reportmodel.filterStr1 = selectedData.billSlNo;
      this.reportmodel.filterStr2 = selectedData.billSeries;
      this.reportmodel.filterStr3 = this.year;
      this.billsMasterService.checkDuplicateBillLLP(this.reportmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) { 
          var str = selectedData.billSlNo;
          
          var x = "";
          if(str.length<parseInt(this.seriesLength)){
            if (this.seriesLength == "1") x = ("0" + str).slice(-1);
            if (this.seriesLength == "2") x = ("00" + str).slice(-2);
            if (this.seriesLength == "3") x = ("000" + str).slice(-3);
            if (this.seriesLength == "4") x = ("0000" + str).slice(-4);
            if (this.seriesLength == "5") x = ("00000" + str).slice(-5);
            if (this.seriesLength == "6") x = ("000000" + str).slice(-6); 
          } 
          else{
            x = str;
          }             
         
         
          this.formBillsMaster.patchValue({
            billSlNo:x,
            billNo: selectedData.billSeries + x,
          });
        }
       else{
          this.toasterService.warning(this.responseDetails.message);
          this.formBillsMaster.patchValue({
            billNo:"",
            billSlNo:"",
          }); 
        }
      });
    }   
  }
  
  
  onSeriesChangeLLP() {
    var selectedData = this.formBillsMaster.getRawValue();
    this.requestmodel.strRequest = selectedData.billingStation;
    this.requestmodel.strRequest1 = this.year;
    this.requestmodel.strRequest2 = selectedData.billSeries;

    if(selectedData.seriesCode==""){
      this.toasterService.warning("Please select Series Code");
      this.formBillsMaster.patchValue({
        billSlNo: "",
        billNo: ""
      });
      return;
    }
    else{
      this.billsMasterService.getBillNoLLP(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.formBillsMaster.patchValue({
            billSlNo: this.responseDetails.message,
            billNo: selectedData.billSeries+this.responseDetails.message
          });
  
        }
       else{
          this.toasterService.warning(this.responseDetails.message);
          this.formBillsMaster.patchValue({
            billSlNo: "",
            billNo: ""
          });
        }
      });
    }      
  }


  getBillTypeSacHsn():void{
    this.requestmodel.strRequest = "1";
    this.billsMasterService.getBillTypeSacHsn(this.requestmodel).subscribe((res) => {
      this.formBillsMaster.patchValue({
        sacHsn: res.message,
      });
    });
  }
  
  
  getBranchList(): void {
   

    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;     
      this.formBillsMaster.patchValue({
        billingStation: this.branch
      });
     this.getSeriesList(this.branch);
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

    this.billsMasterService.getBillsMasterSearchList(this.requestmodel)
      .subscribe((res: BillsmastersearchlistmodelLLP) => {
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
            'statisticalRs':  res.billsMasterSearchList[i].statisticalRs,
            'fovRs':  res.billsMasterSearchList[i].fovRs, 
            'doorCollRs':  res.billsMasterSearchList[i].doorCollRs, 
            'handlingRs':  res.billsMasterSearchList[i].handlingRs, 
            'loadingDetnRs': res.billsMasterSearchList[i].loadingDetnRs, 
            'enrouteRs':  res.billsMasterSearchList[i].enrouteRs, 
            'miscRs': res.billsMasterSearchList[i].miscRs, 
            'doorDelRs': res.billsMasterSearchList[i].doorDelRs,  
            'unLoadingRs':  res.billsMasterSearchList[i].unLoadingRs, 
            'unLoadingDetnRs':  res.billsMasterSearchList[i].unLoadingDetnRs, 
            'extrasRS':  res.billsMasterSearchList[i].extrasRS,
            'othersRs':res.billsMasterSearchList[i].othersRs,
            'subTotalRs':  res.billsMasterSearchList[i].subTotalRs,
            'gstType':  res.billsMasterSearchList[i].gstType, 
            'gstBy':res.billsMasterSearchList[i].gstBy,
            'cgstAmt': res.billsMasterSearchList[i].cgstAmt, 
            'sgstAmt':  res.billsMasterSearchList[i].sgstAmt,  
            'igstAmt':  res.billsMasterSearchList[i].igstAmt, 
            'nonGstAmt1': res.billsMasterSearchList[i].nonGstAmt1,
            'nonGstAmt2':  res.billsMasterSearchList[i].nonGstAmt2, 
            'gtotalRs':  res.billsMasterSearchList[i].gtotalRs, 
            'remarks1':  res.billsMasterSearchList[i].remarks1,
            'remarks2':  res.billsMasterSearchList[i].remarks2,
            'remarks3':  res.billsMasterSearchList[i].remarks3,
            'suppBillDetRemarks':  res.billsMasterSearchList[i].suppBillDetRemarks,
            'otherAmt': res.billsMasterSearchList[i].otherAmt,
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

    this.billsMasterService.getBillsMasterSearchList(this.requestmodel)
      .subscribe((res: BillsmastersearchlistmodelLLP) => {
      this.billsmastersearchlistmodel = res;      
      this.formBillsMaster.controls['partyCode'].disable();
    });   
  } 

  onBillNoChange(): void {    
    var selectedDataValue = this.formBillsMaster.getRawValue();
    this.billsmastermodel.billingStation = selectedDataValue.billingStation;
    this.billsmastermodel.billNo = selectedDataValue.billNo;
    this.billsmastermodel.yearId = this.year;

    this.billsMasterService.checkDuplicateBillsNo(this.billsmastermodel).subscribe((res: Responsemodel) => {
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
      this.toasterService.warning("Please Enter Bill Date");
      this.formBillsMaster.patchValue({
        dueDate: ""
      });
      return;
    }
    var billDate = new Date(selectedData.billDate);
    if(billDate>dueDate){
      this.toasterService.warning("Due Date should not be lessthan Bill Date");
      this.formBillsMaster.patchValue({
        dueDate: ""
      });
    }
  }  
  
  billSeriesChange(): void {
    var selectedData = this.formBillsMaster.getRawValue();
    this.requestmodel.strRequest = selectedData.billingStation;
    this.requestmodel.strRequest1 = this.year;
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

  
  getBillsMasterInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedBillsmasterDetails.billsMasterId;
    this.billsMasterService.getBillsMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.billsmastersearchlistmodel = res; 
    });
  }

  selectAll(e: any) {
    if(e.target.checked){
      for (var i = 0; i < this.billsmastersearchlistmodel.billsMasterSearchList.length; i++) {
        this.billsmastersearchlistmodel.billsMasterSearchList[i].selected = true;
      }
    }
    else{
      for (var i = 0; i < this.billsmastersearchlistmodel.billsMasterSearchList.length; i++) {
        this.billsmastersearchlistmodel.billsMasterSearchList[i].selected = false;
      }
    }
    this.calculateTotal();
  }
  
  selectedData(i: number, event: any) {
    this.billsmastersearchlistmodel.billsMasterSearchList[i].selected = event.target.checked;      
    // var gst = this.billsmastersearchlistmodel.billsMasterSearchList[i].gstType;
    // if(event.target.checked && (gst == 'NA' ||gst == 'N')){
    //   this.formBillsMaster.patchValue({
    //     gstType: 'NA',
    //   });
    // }
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
      }
    }

    totalGtotal = totalSubTotal + totalSgstAmt + totalCgstAmt + totalIgstAmt;

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
      totalGtotal       : totalGtotal.toFixed(2),
    });
    //this.pctChange();
  }

  onGstChange(){
    var selectedDataVal = this.formBillsMaster.getRawValue();

    if (selectedDataVal.gstType == "IG") {   
      this.formBillsMaster.controls['sgstPct'].disable();
      this.formBillsMaster.controls['cgstPct'].disable();  
      this.formBillsMaster.controls['igstPct'].enable();    
      this.formBillsMaster.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct:"0",
        totalSgstAmt:"",
        totalCgstAmt:"",
        totalIgstAmt:"0",
      });   
    }    
    else if (selectedDataVal.gstType == "SC")  {      
      this.formBillsMaster.controls['sgstPct'].enable();
      this.formBillsMaster.controls['cgstPct'].enable();  
      this.formBillsMaster.controls['igstPct'].disable();   
      this.formBillsMaster.patchValue({
        sgstPct:"0",
        cgstPct:"0",
        igstPct:"",
        totalSgstAmt:"0",
        totalCgstAmt:"0",
        totalIgstAmt:"",
      });     
    }
    else{
      this.formBillsMaster.controls['sgstPct'].disable();
      this.formBillsMaster.controls['cgstPct'].disable();  
      this.formBillsMaster.controls['igstPct'].disable();   
      this.formBillsMaster.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct:"",
        totalSgstAmt:"",
        totalCgstAmt:"",
        totalIgstAmt:"",
      });   
    }    
  }

  pctChange(){
    var gstAmt = 0;
    var totalSgstAmt = 0;
    var totalCgstAmt = 0;
    var totalIgstAmt = 0;
    var totalGtotal = 0;
    var selectedDataVal = this.formBillsMaster.getRawValue();

    gstAmt = selectedDataVal.totalSubTotal == ""? 0 : parseFloat(selectedDataVal.totalSubTotal)

    totalGtotal = gstAmt ;
    
    if(selectedDataVal.sgstPct!="") {
      totalSgstAmt = gstAmt * parseFloat(selectedDataVal.sgstPct)/100;
      totalGtotal = totalGtotal + totalSgstAmt;
    }
    if(selectedDataVal.cgstPct!="") {
      totalCgstAmt = gstAmt * parseFloat(selectedDataVal.cgstPct)/100;
      totalGtotal = totalGtotal + totalCgstAmt;
    }
    if(selectedDataVal.igstPct!="") {
      totalIgstAmt = gstAmt * parseFloat(selectedDataVal.igstPct)/100;
      totalGtotal = totalGtotal + totalIgstAmt;
    }      

    totalGtotal = totalGtotal 
        + (selectedDataVal.totalNonGstAmt1 == ""? 0 : parseFloat(selectedDataVal.totalNonGstAmt1))
        + (selectedDataVal.totalNonGstAmt2 == ""? 0 : parseFloat(selectedDataVal.totalNonGstAmt2)) ; 

    this.formBillsMaster.patchValue({
      totalSgstAmt      : totalSgstAmt.toFixed(2),
      totalCgstAmt      : totalCgstAmt.toFixed(2),
      totalIgstAmt      : totalIgstAmt.toFixed(2),
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
    this.route.navigate(['/billmainlistLLP']);
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
              this.route.navigate(['/billmainlistLLP']);
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
    
    const d3 = this.minDate?Date.parse(this.minDate):0;
    const d2 = this.maxDate?Date.parse(this.maxDate):0;
    const d4 = selectedDataValue.billDate?Date.parse(selectedDataValue.billDate):0;
    if (d3>d4 || d2<d4 ) {
      this.formBillsMaster.patchValue({
        billDate: ''
      });
      this.toasterService.warning("Invalid bill date");
      return
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
    this.billsmastermodel.partyGstLocation = selectedDataValue.partyGstLocation;
    this.billsmastermodel.collBranch = selectedDataValue.collBranch;
    this.billsmastermodel.suppYN = "N";
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
    this.billsmastermodel.totalSgstAmt = selectedDataValue.totalSgstAmt.toString();
    this.billsmastermodel.totalCgstAmt = selectedDataValue.totalCgstAmt.toString();
    this.billsmastermodel.totalIgstAmt = selectedDataValue.totalIgstAmt.toString();
    this.billsmastermodel.totalNonGstAmt1 = selectedDataValue.totalNonGstAmt1.toString();
    this.billsmastermodel.totalNonGstAmt2 = selectedDataValue.totalNonGstAmt2.toString();
    this.billsmastermodel.totalGtotal = selectedDataValue.totalGtotal.toString();
    this.billsmastermodel.billRemarks = selectedDataValue.billRemarks.toString().toUpperCase();
    this.billsmastermodel.enlcosedDocs = selectedDataValue.enlcosedDocs.toString().toUpperCase();
    this.billsmastermodel.suppParticulars = "";
    this.billsmastermodel.dueDate= selectedDataValue.dueDate;
    this.billsmastermodel.yearId = this.year;
    this.billsmastermodel.billSeries = selectedDataValue.billSeries;
    this.billsmastermodel.cgstPct =selectedDataValue.cgstPct ? selectedDataValue.cgstPct.toString() : "0"; 
    this.billsmastermodel.sgstPct = selectedDataValue.sgstPct ? selectedDataValue.sgstPct.toString() : "0"; 
    this.billsmastermodel.igstPct = selectedDataValue.igstPct ? selectedDataValue.igstPct.toString() : "0"; 
    this.billsmastermodel.billSlNo = selectedDataValue.billSlNo;   
    this.billsmastermodel.loggedInUser = this.loggedInUserID;
    this.billsmastermodel.billsMasterListData = [];

    var billList = this.billsmastersearchlistmodel.billsMasterSearchList;
    var gstType = "NA"
    var gstBy = "N";    
    for (var i = 0; i < billList.length; i++) {
      if(billList[i].selected){
        gstType = billList[i].gstType!="NA"?billList[i].gstType:gstType;
        gstBy = billList[i].gstBy!="N"?billList[i].gstBy:gstBy;

        var gtotal =  (billList[i].subTotalRs?parseFloat(billList[i].subTotalRs):0) 
                    +  (billList[i].sgstAmt?parseFloat(billList[i].sgstAmt):0)
                    +  (billList[i].cgstAmt?parseFloat(billList[i].cgstAmt):0)
                    +  (billList[i].igstAmt?parseFloat(billList[i].igstAmt):0)
        this.billsmastermodel.billsMasterListData.push({
          'billDetailId': '',
          'billsMasterId': '',
          'billingStation': selectedDataValue.billingStation,
          'billNo': selectedDataValue.billNo, 
          'billDate':  selectedDataValue.billDate,
          'billType': '1',
          'partyCode': selectedDataValue.partyCode.dataId,
          'gcBranch': "",
          'gcYear': "",
          'gcNoteNo':this.billsmastersearchlistmodel.billsMasterSearchList[i].gcNoteNo,
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
          'sgstAmt': this.billsmastersearchlistmodel.billsMasterSearchList[i].sgstAmt,
          'cgstAmt': this.billsmastersearchlistmodel.billsMasterSearchList[i].cgstAmt,
          'igstAmt': this.billsmastersearchlistmodel.billsMasterSearchList[i].igstAmt,
          'nonGstAmt1': "",
          'nonGstAmt2':  "",
          'gtotal':  gtotal.toFixed(2),
          'dedAmt':"" ,
          'yearId':  this.year,
          'suppBillDetRemarks': "",
          'remarks1': "",
          'remarks2': "",
          'remarks3': "",          
        });
      }
    }   
    
    this.billsmastermodel.gstType = gstType;
    this.billsmastermodel.gstBy = gstBy;    

    this.billsMasterService.saveBillsMasterDetails(this.billsmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formBillsMaster.reset();
        this.route.navigate(['/billmainlistLLP']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }

}

  