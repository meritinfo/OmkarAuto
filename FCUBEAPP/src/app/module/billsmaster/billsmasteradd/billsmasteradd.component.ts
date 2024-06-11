import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Billstatementsaverequest } from 'src/app/models/billstatementsaverequest';
import { Billsmastermodel } from 'src/app/models/billsmastermodel';
import { Billsmastersearchmodel } from 'src/app/models/billsmastersearchmodel';
import { Billsmastersearchlistmodel } from 'src/app/models/billsmastersearchlistmodel';
import { Billmastersearchlistrequestmodel } from 'src/app/models/billsmastersearchlistrequestmodel';
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
    minDate : string = '';
    maxDate : string = '';
    branchList: Dropdownmodel[] = [];
    locationList: Dropdownmodel[] = [];
    partyList: Dropdownmodel[] = [];
    lrSeries: Dropdownmodel[] = [];
    creditAcList: Dropdownmodel[] = [];
    formBillsMaster!: FormGroup;
    keywordLocation = 'dataName';
    supp = false;
    canCancelBill = false;
    //Driversalarysearch = new Pagerequestwithdatesmodel();
    billsmastersearchmodel = new Pagerequestwithdatesmodel();
    seriesDoc: string = "";
    billsmastersearchlistmodel = new Billsmastersearchlistmodel();
    
    saveData = new Billstatementsaverequest();
    billsmastersearchrequest = new Billmastersearchlistrequestmodel();
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
      today.setMonth(month - 1);
      
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
      statementBillStation: new FormControl(this.branch),
      billingStation: new FormControl(this.branch),
     // billNo: new FormControl('',[Validators.required]),
     billNo: new FormControl('0',),
      billStatus:   new FormControl(''),//FormControl(this.loginDate,[Validators.required]),
      billType: new FormControl(''),
      sacHsn: new FormControl('',),
      billDate: new FormControl(this.fromDate),
      suppYN: new FormControl(''),
      sacCode: new FormControl(''),
      partyCode: new FormControl(''),
      partyGstLocation: new FormControl(''),
      collBranch: new FormControl(''),
      gstType: new FormControl(''),
      totalFreight: new FormControl('',),
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
      totalGtotal: new FormControl(''),
      billRemarks: new FormControl(''),
      enlcosedDocs: new FormControl(''),
      suppParticulars: new FormControl(''),
      attachedfile :  new FormControl(''),
      billAmtCleared :  new FormControl(''),
      billDed :  new FormControl(''),
      billTDS :  new FormControl(''),
      recoverable :  new FormControl(''),
      billExcess :  new FormControl(''),
      sdEmdAmt :  new FormControl(''),
      recoveredAmt :  new FormControl(''),
      printedYN :  new FormControl(''),
      printedDate :  new FormControl(''),
      mrDone :  new FormControl(''),
      mrDate :  new FormControl(''),
      submitYN :  new FormControl(''),
      submitDate :  new FormControl(''),
      yearId :  new FormControl(''),
      finFtmid :  new FormControl(''),
      checkedBy :  new FormControl(''),
      approvedBy :  new FormControl(''),
      disputeType :  new FormControl(''),
      disputeDate :  new FormControl(''),
      disputeCaseNo :  new FormControl(''),
      disputeCaseStory :  new FormControl(''),
      disputeReleaseDate :  new FormControl(''),
      totalDetention:  new FormControl(''),
  
      loggedInUser :  new FormControl(''),
      arrayList: this.formBuilder.array([this.createInitialArray()]) 
    });
    setTimeout(() => {
      this.createmode = true;
      this.formBillsMaster.controls['billingStation'].disable();
      this.formBillsMaster.controls['billNo'].disable();
      this.billSeriesChange();
  
      if (this.selectedBillsmasterDetails.billsMasterId != '') {
       // this.formBillStatement.controls['billSeries'].disable();
       
        // if(this.selectedBillsmasterDetails.suppYN=="Y"){
        // //  this.supp = true;
        //  // this.showButton = false;
        // //  this.formBillStatement.controls['totFreight'].enable();
         
        // }
        // else{
        //   this.supp = false;
        //   this.showButton = true;
        //   this.formBillsMaster.controls['totFreight'].disable();
        // }

        this.formBillsMaster.patchValue(this.selectedBillsmasterDetails); 
        this.formBillsMaster.patchValue({
       //   billNo:  this.selectedBillstatementDetails.bill_StmtNo, 
        //  billSeries :this.selectedBillstatementDetails.seriesCode, 
          billDate:this.commonService.formatDate(this.selectedBillsmasterDetails.billDate), 
          partyCode :this.partyList.find(e => e.dataId == this.selectedBillsmasterDetails.partyCode),
          partyGstLocation: this.locationList.find(e => e.dataId == this.selectedBillsmasterDetails.partyGstLocation) ,     
          collBranch: this.locationList.find(e => e.dataId == this.selectedBillsmasterDetails.collBranch)     
       
        })
      
        

        
        this.getBillsMasterInnerGridList();
        this.editMode = true;
      }   
    }, 2000);
    this.sharedService.loading = false;    
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

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getCreditAcList(): void {
    //this.billstatementService.getBillStmtCreditAcList().subscribe((res) => {
    //  this.creditAcList = res;
   // });
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
  
  getlrSeriesForBillList(): void {
    this.commonService.getlrSeriesForBillList().subscribe((res) => {
      this.lrSeries = res;
    });
  }

  get f() { return this.formBillsMaster.controls;}
  get formArray() {
    return this.formBillsMaster.get("arrayList") as FormArray;
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

  startWithFilter = function (branchList: Dropdownmodel[], query: string): any[] {
    return branchList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  selectedData(index: number, event: any) {
   // this.billstatementsearchlistmodel.billStatementSearchList[index].selected = event.target.checked;   
    //this.calculateTotal();
  }  
  searchStatement(): void {
    var selectedDataValue = this.formBillsMaster.getRawValue();
    this.billsmastersearchrequest.fromDate = selectedDataValue.billDate;
   // this.billsmastersearchmodel.toDate = selectedDataValue.toDt;
   this.billsmastersearchrequest.billNo = selectedDataValue.billNo;
    //this.billsmastersearchrequest.billingParty = selectedDataValue.partyCode.dataId;


    this.billsMasterService.getBillsMasterSearchList(this.billsmastersearchrequest).subscribe((res: Billsmastersearchlistmodel) => {
      this.billsmastersearchlistmodel = res;
    //   this.formArray.clear();      
    //   for (var i = 0; i < res.billsMasterListData.length; i++) {
    //     this.formArray.push(this.createInitialArray());
    //     this.formArray.controls[i].get("billDetailId")?.setValue(res.billsMasterListData[i].billDetailId);
    //     this.formArray.controls[i].get("billsMasterId")?.setValue(res.billsMasterListData[i].billsMasterId);
    //     this.formArray.controls[i].get("billingStation")?.setValue(res.billsMasterListData[i].billingStation);
    //     this.formArray.controls[i].get("billNo")?.setValue(res.billsMasterListData[i].billNo);
    //     this.formArray.controls[i].get("billDate")?.setValue(this.commonService.formatDate(res.billsMasterListData[i].billDate));
    //     this.formArray.controls[i].get("billType")?.setValue(res.billsMasterListData[i].billType);
    //     this.formArray.controls[i].get("partyCode")?.setValue(res.billsMasterListData[i].partyCode);
    //     this.formArray.controls[i].get("gcBranch")?.setValue(res.billsMasterListData[i].gcBranch);
    //     this.formArray.controls[i].get("gcYear")?.setValue(res.billsMasterListData[i].gcYear);
      
    //     this.formArray.controls[i].get("gcNoteNo")?.setValue(res.billsMasterListData[i].gcNoteNo);
    //     this.formArray.controls[i].get("consignmentid")?.setValue(res.billsMasterListData[i].consignmentid);

       

    //   }
     });
   
  } 
   
  getBillsMasterInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedBillsmasterDetails.billsMasterId;
    this.billsMasterService.getBillsMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.billsmastersearchlistmodel = res;     
      this.formArray.clear();
        
      for (var i = 0; i < res.billsMasterSearchList.length; i++) {
        this.formArray.push(this.createInitialArray());
       
        this.formArray.controls[i].get("consignmentID")?.setValue(res.billsMasterSearchList[i].consignmentID);
        this.formArray.controls[i].get("bookingDate")?.setValue(res.billsMasterSearchList[i].bookingDate);
        this.formArray.controls[i].get("bookingPlace")?.setValue(res.billsMasterSearchList[i].bookingPlace);
        this.formArray.controls[i].get("rateRs")?.setValue(res.billsMasterSearchList[i].rateRs);
        this.formArray.controls[i].get("freightRs")?.setValue(this.commonService.formatDate(res.billsMasterSearchList[i].freightRs));
        this.formArray.controls[i].get("statisticalRs")?.setValue(res.billsMasterSearchList[i].statisticalRs);
        this.formArray.controls[i].get("fovRs")?.setValue(res.billsMasterSearchList[i].fovRs);
        this.formArray.controls[i].get("doorCollRs")?.setValue(res.billsMasterSearchList[i].doorCollRs);
        this.formArray.controls[i].get("handlingRs")?.setValue(res.billsMasterSearchList[i].handlingRs);
      
        this.formArray.controls[i].get("loadingDetnRs")?.setValue(res.billsMasterSearchList[i].loadingDetnRs);
        this.formArray.controls[i].get("enrouteRs")?.setValue(res.billsMasterSearchList[i].enrouteRs);
        this.formArray.controls[i].get("miscRs")?.setValue(res.billsMasterSearchList[i].miscRs);
        this.formArray.controls[i].get("doorDelRs")?.setValue(res.billsMasterSearchList[i].doorDelRs); 
        this.formArray.controls[i].get("unLoadingRs")?.setValue(res.billsMasterSearchList[i].unLoadingRs); 
        this.formArray.controls[i].get("unLoadingDetnRs")?.setValue(res.billsMasterSearchList[i].unLoadingDetnRs); 
        this.formArray.controls[i].get("extrasRS")?.setValue(res.billsMasterSearchList[i].extrasRS); 
        this.formArray.controls[i].get("othersRs")?.setValue(res.billsMasterSearchList[i].othersRs); 
        this.formArray.controls[i].get("subTotalRs")?.setValue(res.billsMasterSearchList[i].subTotalRs); 
        this.formArray.controls[i].get("gstType")?.setValue(res.billsMasterSearchList[i].gstType); 
        this.formArray.controls[i].get("cgstAmt")?.setValue(res.billsMasterSearchList[i].cgstAmt); 
        this.formArray.controls[i].get("sgstAmt")?.setValue(res.billsMasterSearchList[i].sgstAmt); 
        this.formArray.controls[i].get("igstAmt")?.setValue(res.billsMasterSearchList[i].igstAmt); 
        this.formArray.controls[i].get("nonGstAmt1")?.setValue(res.billsMasterSearchList[i].nonGstAmt1); 
        this.formArray.controls[i].get("nonGstAmt2")?.setValue(res.billsMasterSearchList[i].nonGstAmt2); 
        this.formArray.controls[i].get("gtotalRs")?.setValue(res.billsMasterSearchList[i].gtotalRs); 
        this.formArray.controls[i].get("selected")?.setValue(res.billsMasterSearchList[i].selected); 

      }
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
              this.route.navigate(['/billsmasterlist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  } 
  

  saveBillsDetails(): void {
    this.formSubmitted = true;
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

    this.billsmastermodel.billsMasterId = this.selectedBillsmasterDetails.billsMasterId != '' ? this.selectedBillsmasterDetails.billsMasterId : '';
  //  this.billsmastermodel.masterID = this.selectedBillsmasterDetails.masterID ;
    this.billsmastermodel.billingStation = selectedDataValue.billingStation;
    this.billsmastermodel.billNo = selectedDataValue.billNo;
  // this.billsmastermodel.billNo = '1'
    this.billsmastermodel.billDate = selectedDataValue.billDate;
    this.billsmastermodel.partyCode = selectedDataValue.partyCode.dataId;
    this.billsmastermodel.billStatus = selectedDataValue.billStatus;
    this.billsmastermodel.billType = selectedDataValue.billType;
    this.billsmastermodel.partyGstLocation = selectedDataValue.partyGstLocation.dataId;
    this.billsmastermodel.collBranch = selectedDataValue.collBranch.dataId;
    this.billsmastermodel.suppYN = selectedDataValue.suppYN;
    this.billsmastermodel.sacHsn = selectedDataValue.sacHsn.toString();
    this.billsmastermodel.sacCode = selectedDataValue.sacCode.toString();
    this.billsmastermodel.totalFreight =selectedDataValue.totalFreight.toString();
    this.billsmastermodel.totalStatistical = selectedDataValue.totalStatistical.toString();
    this.billsmastermodel.totalFov = selectedDataValue.totalFov.toString();
    this.billsmastermodel.totalHandling = selectedDataValue.totalHandling.toString();
    this.billsmastermodel.totalDoorColl = selectedDataValue.totalDoorColl.toString();
    this.billsmastermodel.totalLoadingDetn = selectedDataValue.totalLoadingDetn.toString();
    this.billsmastermodel.totalEnroute = selectedDataValue.totalEnroute.toString();
    this.billsmastermodel.totalMisc = selectedDataValue.totalMisc.toString();
    this.billsmastermodel.totalDetention = selectedDataValue.totalDetention.toString();
    this.billsmastermodel.totalExtras = selectedDataValue.totalExtras.toString();;
    this.billsmastermodel.totalOthers = selectedDataValue.totalOthers.toString();;
    this.billsmastermodel.gstType = selectedDataValue.gstType;
    this.billsmastermodel.totalSgstAmt = selectedDataValue.totalSgstAmt.toString();
    this.billsmastermodel.totalCgstAmt = selectedDataValue.totalCgstAmt.toString();
    this.billsmastermodel.totalIgstAmt = selectedDataValue.totalIgstAmt.toString();
    this.billsmastermodel.totalNonGstAmt1 = selectedDataValue.totalNonGstAmt1.toString();
    this.billsmastermodel.totalNonGstAmt2 = selectedDataValue.totalNonGstAmt2.toString();
    this.billsmastermodel.totalGtotal = selectedDataValue.totalGtotal.toString();
    this.billsmastermodel.billRemarks = selectedDataValue.billRemarks;
    this.billsmastermodel.totalSubTotal = selectedDataValue.totalSubTotal.toString();
    this.billsmastermodel.totalDetention= selectedDataValue.totalDetention.toString();
    this.billsmastermodel.totalUnLoading= selectedDataValue.totalUnLoading.toString();
    this.billsmastermodel.billAmtCleared= selectedDataValue.billAmtCleared.toString();
    this.billsmastermodel.billDed= selectedDataValue.billDed.toString();
    this.billsmastermodel.billExcess= selectedDataValue.billExcess.toString();
    this.billsmastermodel.billTDS= selectedDataValue.billTDS.toString();
    this.billsmastermodel.recoveredAmt= selectedDataValue.recoveredAmt.toString();
    this.billsmastermodel.totalDoorDel= selectedDataValue.totalDoorDel.toString();
    this.billsmastermodel.recoverable= selectedDataValue.recoverable.toString();
    this.billsmastermodel.totalExtras= selectedDataValue.totalExtras.toString();
    this.billsmastermodel.totalFov= selectedDataValue.totalFov.toString();
    this.billsmastermodel.sdEmdAmt= selectedDataValue.sdEmdAmt.toString();
    this.billsmastermodel.finFtmid= selectedDataValue.finFtmid;
   
    
    /////date fields
   // this.billsmastermodel.printedDate= '2024-01-12'
   // this.billsmastermodel.mrDate= '2024-01-12'
   // this.billsmastermodel.submitDate= '2024-01-12'
   // this.billsmastermodel.disputeDate= '2024-01-12'
   // this.billsmastermodel.disputeReleaseDate= '2024-01-12'
   // this.billsmastermodel.dueDate= '2024-01-12'

    ///////
 
    
    
  
   // this.billsmastermodel.toPoint = selectedDataValue.toPoint?selectedDataValue.toPoint.dataId:"";
   // this.billsmastermodel.suppYN = this.supp?"Y":"N";
   

   // this.billsstatementmodel.totalBillAmt = selectedDataValue.totalBillAmt.toString();
   // this.billsstatementmodel.remarks = selectedDataValue.remarks;
    this.billsmastermodel.yearId = this.year;
   this.billsmastermodel.loggedInUser = this.loggedInUserID;
   this.billsmastermodel.billsMasterListData = [];
   for (var i = 0; i < this.formBillsMaster.value.arrayList.length; i++) {
   
   // if(selectedDataValue.arrayList[i].billingStation!='' || selectedDataValue.arrayList[i].partyCode !=''){
    if(selectedDataValue.arrayList[i].billingStation='' || selectedDataValue.arrayList[i].partyCode==''){
      this.billsmastermodel.billsMasterListData.push({
        'billDetailId': '',
        'billsMasterId': '',
        'billingStation': selectedDataValue.billingStation,//selectedDataValue.arrayList[i].billingStation?selectedDataValue.arrayList[i].billingStation.dataId:'',
        'billNo': selectedDataValue.billNo, 
        'billDate':  selectedDataValue.billDate,
        'billType': selectedDataValue.billType,
        'partyCode': selectedDataValue.partyCode.dataId,//selectedDataValue.arrayList[i].partyCode?selectedDataValue.arrayList[i].partyCode.dataId:'',
        'gcBranch': "",
        'gcYear': "",//selectedDataValue.arrayList[i].gcYear,
        'gcNoteNo':"",//this.billsmastersearchlistmodel.billsMasterSearchList[i].gc, 
        'consignmentid': this.billsmastersearchlistmodel.billsMasterSearchList[i].consignmentID,//selectedDataValue.arrayList[i].consignmentid?selectedDataValue.arrayList[i].consignmentid.dataId:'',
        'freight': this.billsmastersearchlistmodel.billsMasterSearchList[i].freightRs,//selectedDataValue.arrayList[i].freight,
        'statistical': this.billsmastersearchlistmodel.billsMasterSearchList[i].statisticalRs,//selectedDataValue.arrayList[i].statistical,
        'fov': this.billsmastersearchlistmodel.billsMasterSearchList[i].fovRs,
        'doorColl': this.billsmastersearchlistmodel.billsMasterSearchList[i].doorCollRs,
        'handling': this.billsmastersearchlistmodel.billsMasterSearchList[i].handlingRs,
        'loadingDetn': this.billsmastersearchlistmodel.billsMasterSearchList[i].loadingDetnRs,
        'enroute': this.billsmastersearchlistmodel.billsMasterSearchList[i].enrouteRs,
        'misc': this.billsmastersearchlistmodel.billsMasterSearchList[i].miscRs,
        'doorDel': this.billsmastersearchlistmodel.billsMasterSearchList[i].doorDelRs,
        'unLoading':  this.billsmastersearchlistmodel.billsMasterSearchList[i].unLoadingRs,
        'detention': "",//this.billsmastersearchlistmodel.billsMasterSearchList[i].detention,
        'extras': this.billsmastersearchlistmodel.billsMasterSearchList[i].extrasRS,
        'others': this.billsmastersearchlistmodel.billsMasterSearchList[i].othersRs,
        'subTotal': this.billsmastersearchlistmodel.billsMasterSearchList[i].subTotalRs,
        'sgstAmt':  this.billsmastersearchlistmodel.billsMasterSearchList[i].sgstAmt,
        'cgstAmt': this.billsmastersearchlistmodel.billsMasterSearchList[i].cgstAmt,
        'igstAmt': this.billsmastersearchlistmodel.billsMasterSearchList[i].igstAmt,
        'nonGstAmt1': this.billsmastersearchlistmodel.billsMasterSearchList[i].nonGstAmt1,
        'nonGstAmt2':  this.billsmastersearchlistmodel.billsMasterSearchList[i].nonGstAmt2,
        'gtotal':  this.billsmastersearchlistmodel.billsMasterSearchList[i].gtotalRs,
        'dedAmt':"" ,//this.billsmastersearchlistmodel.billsMasterSearchList[i].,
        'yearId':  this.year,
        'suppBillDetRemarks': "",//selectedDataValue.arrayList[i].suppBillDetRemarks,
        'remarks1': "",//selectedDataValue.arrayList[i].remarks1,
        'remarks2': "",//selectedDataValue.arrayList[i].remarks2,
        'remarks3': "",//selectedDataValue.arrayList[i].remarks3
        
      });
    }
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

  