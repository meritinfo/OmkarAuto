import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Billsmastersearchlistmodel } from 'src/app/models/billsmastersearchlistmodel';
import { Billsmastermodel } from 'src/app/models/billsmastermodel';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { BillsMasterService } from 'src/app/services/billsmaster.service';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { Usertriprightsmodel } from 'src/app/models/usertriprightsmodel';

@Component({
  selector: 'app-billsuppliadd',
  templateUrl: './billsuppliadd.component.html',
  styleUrls: ['./billsuppliadd.component.css']
})
export class BillsuppliaddComponent {
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
  yearList: Dropdownmodel[] = [];
  BillTypesList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  lrSeries: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  formBillsMaster!: FormGroup;
  keywordLocation = 'dataName';
  supp = false;
  canCancelBill = false;
  seriesDoc: string = "";
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  showButton = true;  
  formSubmitted = false;
  selectedBillsmasterDetails = new Billsmastermodel();
  billsmastersearchlistmodel = new Billsmastersearchlistmodel(); 
  responseDetails = new Responsemodel();
  usertriprightsmodel = new Usertriprightsmodel();
  
  constructor(private billsmastermodel: Billsmastermodel, private commonService: CommonService, 
    private billsMasterService: BillsMasterService, private route: Router, 
    private formBuilder: FormBuilder,private sharedService: SharedService, 
    private cashReceiptEntryService: CashReceiptEntryService,
    private consignmentService:ConsignmentService,
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
        .find(((aa: { menuName: string; }) => aa.menuName === "Bill Entry (Supp)"));
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
    this.getBillingPartyList();
    this.getLocationList();
    this.getYearList();
    this.getBillTypesList();

    this.selectedBillsmasterDetails = this.billsMasterService.getBillsMasterDetails();
    this.formBillsMaster = this.formBuilder.group({
      billingStation: new FormControl(this.branch,[Validators.required]),
      billNo: new FormControl('',[Validators.required]),
      billDate: new FormControl(this.loginDate,[Validators.required]),
      dueDate: new FormControl(this.duedate,[Validators.required]),
      
      suppYN: new FormControl('',),
      suppParticulars: new FormControl('',[Validators.required]),
      sacHsn: new FormControl('',),
      partyCode: new FormControl('',[Validators.required]),
      partyGstLocation: new FormControl('',[Validators.required]),
      billType: new FormControl('',[Validators.required]),
      collBranch: new FormControl(this.branch,[Validators.required]),
      gstType: new FormControl('N',[Validators.required]),
      totalFreight: new FormControl('',),
      totalExtras: new FormControl(''),
      totalOthers: new FormControl(''),
      sgstPct: new FormControl(''),
      cgstPct: new FormControl(''),
      igstPct: new FormControl('',),
      totalSgstAmt: new FormControl(''),
      totalCgstAmt: new FormControl(''),
      totalIgstAmt: new FormControl(''),
      totalNonGstAmt1: new FormControl(''),
      totalGtotal: new FormControl('',[Validators.required]),
      billRemarks: new FormControl('',),
      enlcosedDocs: new FormControl('',),
  
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
      this.formBillsMaster.controls['totalOthers'].disable();
      this.formBillsMaster.controls['totalExtras'].disable();
      this.formBillsMaster.controls['totalNonGstAmt1'].disable();
      this.formBillsMaster.controls['totalSgstAmt'].disable();
      this.formBillsMaster.controls['totalCgstAmt'].disable();
      this.formBillsMaster.controls['totalIgstAmt'].disable();
      this.formBillsMaster.controls['totalGtotal'].disable();
      this.formBillsMaster.controls['sgstPct'].disable();
      this.formBillsMaster.controls['cgstPct'].disable();  
      this.formBillsMaster.controls['igstPct'].disable();  

      if (this.selectedBillsmasterDetails.billsMasterId != '') {
        var suppYN = "";
        if(this.selectedBillsmasterDetails.suppYN=="Y"){
          this.showButton = false;
          suppYN = "Y";
          this.formBillsMaster.controls['totalFreight'].enable();
          this.formBillsMaster.controls['totalOthers'].enable();
          this.formBillsMaster.controls['totalExtras'].enable();
          this.formBillsMaster.controls['totalNonGstAmt1'].enable();
        }
        else{
          suppYN = "";
          this.showButton = true;
          this.formBillsMaster.controls['totalFreight'].disable();
          this.formBillsMaster.controls['totalOthers'].disable();
          this.formBillsMaster.controls['totalExtras'].disable();
          this.formBillsMaster.controls['totalNonGstAmt1'].disable();
        }
        this.formBillsMaster.patchValue(this.selectedBillsmasterDetails); 
        this.formBillsMaster.patchValue({
          billDate:this.commonService.formatDate(this.selectedBillsmasterDetails.billDate), 
          dueDate:this.commonService.formatDate(this.selectedBillsmasterDetails.dueDate), 
          partyCode :this.partyList.find(e => e.dataId == this.selectedBillsmasterDetails.partyCode),
          suppYN: suppYN,
        })  
      
        if (this.selectedBillsmasterDetails.gstType == "IG") {   
          this.formBillsMaster.controls['sgstPct'].disable();
          this.formBillsMaster.controls['cgstPct'].disable();  
          this.formBillsMaster.controls['igstPct'].enable(); 
        }    
        else if (this.selectedBillsmasterDetails.gstType == "SC")  {      
          this.formBillsMaster.controls['sgstPct'].enable();
          this.formBillsMaster.controls['cgstPct'].enable();  
          this.formBillsMaster.controls['igstPct'].disable(); 
        }
        else{
          this.formBillsMaster.controls['sgstPct'].disable();
          this.formBillsMaster.controls['cgstPct'].disable();  
          this.formBillsMaster.controls['igstPct'].disable(); 
        }  
        this.getFinDocDetails(this.selectedBillsmasterDetails.finFtmid);
        this.getBillsMasterInnerGridList();
        this.editMode = true;
       // this.showButton = false;
        this.formBillsMaster.controls['billNo'].disable();
        this.formBillsMaster.controls['partyCode'].disable();
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
      gcYear:  ['', []],
      gcBranch:  ['', []],
      gcNoteNo:  ['', []],
      bookingDate:  ['', []],
      fromPlace:  ['', []],
      toPlace:  ['', []],
      consignmentid:  ['', []],
      freightRs:  ['', []],
      extras:  ['', []],
      others:  ['', []],
      nonGstAmt1:  ['', []],
      gtotal:  ['', []],
      suppBillDetRemarks:  ['', []],
      remarks1:  ['', []],
      remarks2:  ['', []],
      remarks3:  ['', []],
    }); 
  }
  
  getBillTypeSacHsn(e:any):void{
    this.requestmodel.strRequest = e.target.value;
    this.billsMasterService.getBillTypeSacHsn(this.requestmodel).subscribe((res) => {
      this.formBillsMaster.patchValue({
        sacHsn: res.message,
      });
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
  
  getYearList(): void {
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
    }); 
  }

  getBillTypesList(): void {
    this.commonService.getBillTypesList().subscribe((res) => {
      this.BillTypesList = res;
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


  onSuppYNChange(e:any){
    if(e.target.checked){
      this.showButton = false;
      this.formBillsMaster.controls['totalFreight'].enable();
      this.formBillsMaster.controls['totalOthers'].enable();
      this.formBillsMaster.controls['totalExtras'].enable();
      this.formBillsMaster.controls['totalNonGstAmt1'].enable();
    }
    else{
      this.showButton = true;
      this.formBillsMaster.controls['totalFreight'].disable();
      this.formBillsMaster.controls['totalOthers'].disable();
      this.formBillsMaster.controls['totalExtras'].disable();
      this.formBillsMaster.controls['totalNonGstAmt1'].disable();
    }
  }

   
  getBillsMasterInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedBillsmasterDetails.billsMasterId;
    this.formArray.clear();
    this.billsMasterService.getBillsMasterInnerGridList(this.requestmodel).subscribe((res) => {
      this.billsmastersearchlistmodel= res;
      this.formArray.clear();
      for(var i = 0; i < res.billsMasterSearchList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("gcNoteNo")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].gcNoteNo);
        this.formArray.controls[i].get("consignmentid")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].consignmentID);
        this.formArray.controls[i].get("bookingDate")?.setValue(this.commonService.formatDate( this.billsmastersearchlistmodel.billsMasterSearchList[i].bookingDate));
        this.formArray.controls[i].get("fromPlace")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].fromPlace);
        this.formArray.controls[i].get("toPlace")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].toPlace);
        this.formArray.controls[i].get("freightRs")?.setValue (this.billsmastersearchlistmodel.billsMasterSearchList[i].freightRs);
        this.formArray.controls[i].get("others")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].othersRs);
        this.formArray.controls[i].get("extras")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].extrasRS);
        this.formArray.controls[i].get("nonGstAmt1")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].nonGstAmt1);
        this.formArray.controls[i].get("remarks1")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].remarks1);
        this.formArray.controls[i].get("remarks2")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].remarks2);
        this.formArray.controls[i].get("remarks3")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].remarks3);
        this.formArray.controls[i].get("suppBillDetRemarks")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].suppBillDetRemarks);
        this.formArray.controls[i].get("gcBranch")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].bookingPlace);
        this.formArray.controls[i].get("gtotal")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].gtotalRs);
        this.formArray.controls[i].get("gcYear")?.setValue( this.billsmastersearchlistmodel.billsMasterSearchList[i].otherAmt);
        this.formArray.controls[i].get("gcNoteNo")?.disable();
        this.formArray.controls[i].get("bookingDate")?.disable();
        this.formArray.controls[i].get("fromPlace")?.disable();
        this.formArray.controls[i].get("toPlace")?.disable();
        this.formArray.controls[i].get("gtotal")?.disable();
      }
    });
  }

  getConsignmentDtls(i:number){    
    var selectedDataVal = this.formBillsMaster.getRawValue();
    this.requestmodel.strRequest = selectedDataVal.arrayList[i].gcBranch;
    this.requestmodel.strRequest1 = selectedDataVal.arrayList[i].gcNoteNo;
     this.consignmentService.getConsignmentDetailsForUpdate(this.requestmodel).subscribe((res:Consignmentmodel) => {
      var cn = res.fromPlace;
      if (typeof cn === 'undefined' || cn === null || cn === '') {
        this.toasterService.warning("LR No Doesn't Exists ");
        this.formArray.controls[i].get("gcNoteNo")?.setValue("");
        this.formArray.controls[i].get("consignmentid")?.setValue("");
        return;
      }
      else{       
        this.formArray.controls[i].get("gcNoteNo")?.setValue(res.gcNoteNo);
        this.formArray.controls[i].get("consignmentid")?.setValue(res.consignmentID);
        this.formArray.controls[i].get("bookingDate")?.setValue(this.commonService.formatDate(res.bookingDate));
        this.formArray.controls[i].get("fromPlace")?.setValue(res.fromPlace);
        this.formArray.controls[i].get("toPlace")?.setValue(res.toPlace);
        this.formArray.controls[i].get("gcYear")?.setValue(res.yearId);
        this.formArray.controls[i].get("gcBranch")?.setValue(res.bookingPlace);
        this.formArray.controls[i].get("gcNoteNo")?.disable();
        this.formArray.controls[i].get("bookingDate")?.disable();
        this.formArray.controls[i].get("fromPlace")?.disable();
        this.formArray.controls[i].get("toPlace")?.disable();
        this.formArray.controls[i].get("gtotal")?.disable();
      }
    });
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

    gstAmt = (selectedDataVal.totalFreight == ""? 0 : parseFloat(selectedDataVal.totalFreight))
            + (selectedDataVal.totalExtras == ""? 0 : parseFloat(selectedDataVal.totalExtras))
            + (selectedDataVal.totalOthers == ""? 0 : parseFloat(selectedDataVal.totalOthers));

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

    totalGtotal = totalGtotal + (selectedDataVal.totalNonGstAmt1 == ""? 0 : parseFloat(selectedDataVal.totalNonGstAmt1)); 

    this.formBillsMaster.patchValue({
      totalSgstAmt      : totalSgstAmt.toFixed(2),
      totalCgstAmt      : totalCgstAmt.toFixed(2),
      totalIgstAmt      : totalIgstAmt.toFixed(2),
      totalGtotal       : totalGtotal.toFixed(2),
    });
  }

  calculateTotal() {
    var totalFreight = 0;
    var totalExtras = 0;
    var totalOthers = 0;
    var totalNonGstAmt1 = 0;
    var totalGtotal = 0;
    var gtotal = 0;
    var gstAmt = 0;
    var totalSgstAmt = 0;
    var totalCgstAmt = 0;
    var totalIgstAmt = 0;

    var selectedDataVal = this.formBillsMaster.getRawValue();

    var billlist = selectedDataVal.arrayList;

    for (var i = 0; i < billlist.length; i++) {
    //  if (billlist[i].selected) {
      gtotal  = (billlist[i].freightRs == ""? 0 : parseFloat(billlist[i].freightRs) ) 
      + (billlist[i].extras == ""? 0 : parseFloat(billlist[i].extras)) 
      + (billlist[i].others == ""? 0 : parseFloat(billlist[i].others)) 
      + (billlist[i].nonGstAmt1 == ""? 0 : parseFloat(billlist[i].nonGstAmt1));
      totalFreight      = totalFreight     + (billlist[i].freightRs == ""? 0 : parseFloat(billlist[i].freightRs) );
      totalExtras       = totalExtras      + (billlist[i].extras == ""? 0 : parseFloat(billlist[i].extras) );
      totalOthers       = totalOthers      + (billlist[i].others == ""? 0 : parseFloat(billlist[i].others) );
      totalNonGstAmt1   = totalNonGstAmt1  + (billlist[i].nonGstAmt1 == ""? 0 : parseFloat(billlist[i].nonGstAmt1) );

      this.formArray.controls[i].get("gtotal")?.setValue(gtotal);
     // }
    }

    gstAmt = totalFreight + totalExtras + totalOthers;

    totalGtotal = gstAmt;  
    
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

    totalGtotal = totalGtotal + totalNonGstAmt1;

    this.formBillsMaster.patchValue({
      totalFreight      : totalFreight.toFixed(2),
      totalExtras       : totalExtras.toFixed(2),
      totalOthers       : totalOthers.toFixed(2),
      totalSgstAmt      : totalSgstAmt.toFixed(2),
      totalCgstAmt      : totalCgstAmt.toFixed(2),
      totalIgstAmt      : totalIgstAmt.toFixed(2),
      totalNonGstAmt1   : totalNonGstAmt1.toFixed(2),
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
    this.route.navigate(['/billentrysupplist']);
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
              this.route.navigate(['/billentrysupplist']);
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
    this.billsmastermodel.billType = selectedDataValue.billType ;
    this.billsmastermodel.partyGstLocation = selectedDataValue.partyGstLocation;
    this.billsmastermodel.collBranch = selectedDataValue.collBranch;
    this.billsmastermodel.suppYN = selectedDataValue.suppYN?"Y":"N";
    this.billsmastermodel.sacHsn = selectedDataValue.sacHsn.toString();
    this.billsmastermodel.totalFreight =selectedDataValue.totalFreight.toString();
    this.billsmastermodel.totalStatistical = "";
    this.billsmastermodel.totalFov = "";
    this.billsmastermodel.totalHandling = "";
    this.billsmastermodel.totalDoorColl = "";
    this.billsmastermodel.totalLoadingDetn = "";
    this.billsmastermodel.totalEnroute = "";
    this.billsmastermodel.totalMisc = "";
    this.billsmastermodel.totalExtras = selectedDataValue.totalExtras.toString();
    this.billsmastermodel.totalOthers = selectedDataValue.totalOthers.toString();
    this.billsmastermodel.totalUnLoading= "";
    this.billsmastermodel.totalSubTotal = "";
    this.billsmastermodel.gstType = selectedDataValue.gstType;
    this.billsmastermodel.totalSgstAmt = selectedDataValue.totalSgstAmt.toString();
    this.billsmastermodel.totalCgstAmt = selectedDataValue.totalCgstAmt.toString();
    this.billsmastermodel.totalIgstAmt = selectedDataValue.totalIgstAmt.toString();
    this.billsmastermodel.totalNonGstAmt1 = selectedDataValue.totalNonGstAmt1.toString();
    this.billsmastermodel.totalNonGstAmt2 = "";
    this.billsmastermodel.totalGtotal = selectedDataValue.totalGtotal.toString();
    this.billsmastermodel.billRemarks = selectedDataValue.billRemarks.toString().toUpperCase();
    this.billsmastermodel.enlcosedDocs = selectedDataValue.enlcosedDocs.toString().toUpperCase();
    this.billsmastermodel.suppParticulars = selectedDataValue.suppParticulars.toString().toUpperCase();
    this.billsmastermodel.dueDate= selectedDataValue.dueDate;
    this.billsmastermodel.yearId = this.year;
    this.billsmastermodel.loggedInUser = this.loggedInUserID;
    this.billsmastermodel.billsMasterListData = [];

    var billlist = selectedDataValue.arrayList;


    for (var i = 0; i < billlist.length; i++) {  
      if(billlist[i].consignmentid!="") {
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
          'gcNoteNo':billlist[i].gcNoteNo,
          'consignmentid': billlist[i].consignmentid,
          'freight': billlist[i].freightRs,
          'statistical': "0",
          'fov': "0",
          'doorColl': "0",
          'handling': "0",
          'loadingDetn': "0",
          'enroute': "0",
          'misc': "0",
          'doorDel': "0",
          'unLoading':  "0",
          'detention': "0",
          'extras': billlist[i].extrasRS,
          'others': billlist[i].othersRs,
          'subTotal':  "0",
          'sgstAmt':  "0",
          'cgstAmt':  "0",
          'igstAmt':  "0",
          'nonGstAmt1': billlist[i].nonGstAmt1,
          'nonGstAmt2':   "0",
          'gtotal':   billlist[i].gtotal.toString(),
          'dedAmt': "0" ,
          'yearId':  this.year,
          'suppBillDetRemarks':  billlist[i].suppBillDetRemarks,
          'remarks1':  billlist[i].remarks1,
          'remarks2':  billlist[i].remarks2,
          'remarks3':  billlist[i].remarks3, 
        });
      }   
    }
    
    
    this.billsMasterService.saveBillsMasterDetails(this.billsmastermodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success("Bill saved Successfully");
        this.formBillsMaster.reset();
        this.route.navigate(['/billentrysupplist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }

}

  