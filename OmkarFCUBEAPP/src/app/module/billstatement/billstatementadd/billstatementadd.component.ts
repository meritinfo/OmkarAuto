import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators ,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Billstatementsaverequest } from 'src/app/models/billstatementsaverequest';
import { billstatementmodel } from 'src/app/models/billstatementmodel';
import { Billstatementsearchlistmodel } from 'src/app/models/billstatementsearchlistmodel';
import { Billstatementsearchlistrequestmodel } from 'src/app/models/billstatementsearchlistrequestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { BillstatementService } from 'src/app/services/billstatement.service';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-billstatementadd',
  templateUrl: './billstatementadd.component.html',
  styleUrls: ['./billstatementadd.component.css']
})
export class BillstatementaddComponent implements OnInit {
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
  formBillStatement!: FormGroup;
  keywordLocation = 'dataName';
  supp = false;
  billstatementsearchlistmodel = new Billstatementsearchlistmodel();
  
  saveData = new Billstatementsaverequest();
  billstatesearchrequest = new Billstatementsearchlistrequestmodel();
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  showButton = true;

  formSubmitted = false;
  selectedBillstatementDetails = new billstatementmodel();
  responseDetails = new Responsemodel();

  constructor(private billsstatementmodel: billstatementmodel, private commonService: CommonService, 
    private billstatementService: BillstatementService, private route: Router, 
    private formBuilder: FormBuilder,private sharedService: SharedService, 
    private toasterService: ToastrService,private requestmodel:Requestmodel) {
    this.billsstatementmodel = new billstatementmodel();
    
  }


  ngOnInit(): void {
    this.sharedService.loading = true;   
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
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
    this.fromDate = today.toLocaleDateString('en-CA').toString();
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
  

    this.getLocationList();
    this.getBranchList();
    this.getBillingPartyList();
    this.getlrSeriesForBillList();
    
    this.selectedBillstatementDetails = this.billstatementService.getBillStatementDetails();
    this.formBillStatement = this.formBuilder.group({
      statementBillStation: new FormControl(this.branch),
      billSeries: new FormControl('',[Validators.required]),
      billNo: new FormControl('',[Validators.required]),
      billDate: new FormControl(this.loginDate,[Validators.required]),
      party: new FormControl('',[Validators.required]),
      lrFrom: new FormControl(this.fromDate,[Validators.required]),
      lrTo: new FormControl(this.maxDate,[Validators.required]),
      fromPoint: new FormControl('',[Validators.required]),
      toPoint: new FormControl(''),
      suppYN: new FormControl(''),
      partyRefNo: new FormControl(''),
      plantCode: new FormControl(''),
      totFreight: new FormControl('',[Validators.required]),
      totExtraChrg: new FormControl(''),
      totSubTotal: new FormControl(''),
      gstType: new FormControl('NA'),
      sgstPct: new FormControl(''),
      sgstAmt: new FormControl(''),
      cgstPct: new FormControl(''),
      cgstAmt: new FormControl(''),
      igstPct: new FormControl(''),
      igstAmt: new FormControl(''),
      totalBillAmt: new FormControl('',[Validators.required]),
      remarks: new FormControl(''),
      arrayList: this.formBuilder.array([this.createInitialArray()]) 
    });
  
    setTimeout(() => {
      this.createmode = true;
      this.formBillStatement.controls['statementBillStation'].disable();
      this.formBillStatement.controls['billNo'].disable();
      this.formBillStatement.controls['totFreight'].disable();
      this.formBillStatement.controls['totSubTotal'].disable();
      this.formBillStatement.controls['totalBillAmt'].disable();
      this.formBillStatement.controls['cgstPct'].disable();
      this.formBillStatement.controls['igstPct'].disable();
      this.formBillStatement.controls['sgstPct'].disable();
      this.formBillStatement.controls['cgstAmt'].disable();
      this.formBillStatement.controls['igstAmt'].disable();
      this.formBillStatement.controls['sgstAmt'].disable(); 
  
      if (this.selectedBillstatementDetails.masterID != '') {
        this.formBillStatement.controls['billSeries'].disable();
        this.formBillStatement.patchValue(this.selectedBillstatementDetails); 
        this.formBillStatement.patchValue({
          billNo:  this.selectedBillstatementDetails.bill_StmtNo, 
          billSeries :this.selectedBillstatementDetails.seriesCode, 
          billDate:this.commonService.formatDate(this.selectedBillstatementDetails.billDate), 
          party :this.partyList.find(e => e.dataId == this.selectedBillstatementDetails.partyCode),       
          lrFrom:  this.commonService.formatDate(this.selectedBillstatementDetails.fromDate), 
          lrTo:  this.commonService.formatDate(this.selectedBillstatementDetails.toDate), 
          fromPoint:this.locationList.find(e => e.dataId == this.selectedBillstatementDetails.fromPoint),
          toPoint:this.locationList.find(e => e.dataId == this.selectedBillstatementDetails.toPoint),   
        })
        this.getBillStatementInnerGridList();
        this.editMode = true;
      }   
    }, 2000);
    this.sharedService.loading = false;    
  }
 
  billSeriesChange(): void {
    var selectedData = this.formBillStatement.getRawValue();
    this.requestmodel.strRequest = selectedData.billSeries;
    this.commonService.getBillSeries(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.formBillStatement.patchValue({
        billNo: res.message
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
  
  getlrSeriesForBillList(): void {
    this.commonService.getlrSeriesForBillList().subscribe((res) => {
      this.lrSeries = res;
    });
  }

  get f() { return this.formBillStatement.controls;}
  get formArray() {
    return this.formBillStatement.get("arrayList") as FormArray;
  }  

  onSuppYNChange(e:any){
    if(e.target.checked){
      this.supp = true;
      this.showButton = false;
      this.formBillStatement.controls['totFreight'].enable();
    }
    else{
      this.supp = false;
      this.showButton = true;
      this.formBillStatement.controls['totFreight'].disable();
    }
  }

  createInitialArray() {
    return this.formBuilder.group({
      gcNoteNo:  ['', []],
      consignmentID:  ['', []],
      dtlId:  ['', []],
      index:  ['', []],
      bookingDate:  ['', []],
      vehicleNo:  ['', []],
      productName:  ['', []],
      noPackages:  ['', []],
      gtotalRs:  ['', []],
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
    this.billstatementsearchlistmodel.billStatementSearchList[index].selected = event.target.checked;   
    this.calculateTotal();
  }  

  searchStatement(): void {
    var selectedDataVal=this.formBillStatement.getRawValue();
    this.billstatesearchrequest.billingParty =  selectedDataVal.party?selectedDataVal.party.dataId:"";
    this.billstatesearchrequest.fromDate =  selectedDataVal.lrFrom?selectedDataVal.lrFrom:"";
    this.billstatesearchrequest.toDate =  selectedDataVal.lrTo?selectedDataVal.lrTo:"";
    this.billstatesearchrequest.fromPlace = selectedDataVal.fromPoint? selectedDataVal.fromPoint.dataId:"";
    this.billstatesearchrequest.toPlace =  selectedDataVal.toPoint?selectedDataVal.toPoint.dataId:"";
    this.billstatesearchrequest.cnorPlantCode=  selectedDataVal.cnorPlantCode?selectedDataVal.cnorPlantCode:"";
    if(this.billstatesearchrequest.billingParty==""){
      this.toasterService.warning("Please Select Party");   
      return;
    }
    if(this.billstatesearchrequest.fromDate==""){
      this.toasterService.warning("Please Enter From Date");   
      return;
    }
    if(this.billstatesearchrequest.toDate==""){
      this.toasterService.warning("Please Enter To Date");    
      return;
    }
    if(this.billstatesearchrequest.fromPlace==""){
      this.toasterService.warning("Please Select From Place");   
      return;
    }
    this.billstatementService.getBillStatementSearchList(this.billstatesearchrequest).subscribe((res: Billstatementsearchlistmodel) => {
      this.billstatementsearchlistmodel = res;
    });
  } 
   
  calculateTotal() {
    var totalFrtAmount = 0;
    var totalExtraAmount = 0;
    var totalSubAmount = 0;
    var totalBillAmount = 0;
    var selectedDate = this.formBillStatement.getRawValue();

    for (var i = 0; i < this.billstatementsearchlistmodel.billStatementSearchList.length; i++) {
      if (this.billstatementsearchlistmodel.billStatementSearchList[i].selected) {
          totalFrtAmount = totalFrtAmount + parseFloat(this.billstatementsearchlistmodel.billStatementSearchList[i].gtotalRs);
      }
    }
    if(selectedDate.totExtraChrg!=""){
      totalExtraAmount = parseFloat(selectedDate.totExtraChrg)
    }
    totalSubAmount = totalFrtAmount + totalExtraAmount
   
    var igst = 0;
    var sgst = 0;
    var cgst = 0;
    if(selectedDate.igstPct!=0){
      igst = parseFloat(selectedDate.igstPct)
    }
    if(selectedDate.sgstPct!=0){
      sgst = parseFloat(selectedDate.sgstPct)
    }
    if(selectedDate.cgstPct!=0){
      cgst = parseFloat(selectedDate.cgstPct)
    }

    if (selectedDate.gstType == "IG") {   
      selectedDate.igstPct 
      this.formBillStatement.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct: igst,
        sgstAmt:"",
        cgstAmt:"",
        igstAmt: ((totalSubAmount * igst)/100).toFixed(2)
      });   
    }    
    else if (selectedDate.gstType == "SC")  {    
      this.formBillStatement.patchValue({
        sgstPct: sgst,
        cgstPct: cgst,
        igstPct: "",
        sgstAmt: ((totalSubAmount * sgst)/100).toFixed(2),
        cgstAmt: ((totalSubAmount * cgst)/100).toFixed(2),
        igstAmt: "",
      });     
    }
    else{
      this.formBillStatement.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct:"",
        sgstAmt:"",
        cgstAmt:"",
        igstAmt:"",
      });   
    }    
    totalBillAmount = totalSubAmount + 
                ((totalSubAmount * igst)/100) + ((totalSubAmount * sgst)/100) + ((totalSubAmount * cgst)/100)

    this.formBillStatement.patchValue({
      totFreight: totalFrtAmount.toFixed(2),
      totExtraChrg: totalExtraAmount.toFixed(2),
      totSubTotal: totalSubAmount.toFixed(2),
      totalBillAmt: totalBillAmount.toFixed(2),
    });
  }

  changeGstType(e: any) {
    console.log(e.target.value);
    var gsttype = e.target.value; 
   
    if (gsttype == "IG") {   
      this.formBillStatement.controls['sgstPct'].disable();
      this.formBillStatement.controls['cgstPct'].disable();  
      this.formBillStatement.controls['igstPct'].enable();    
      this.formBillStatement.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct:"0",
        sgstAmt:"",
        cgstAmt:"",
        igstAmt:"0",
      });   
    }    
    else if (gsttype == "SC")  {      
      this.formBillStatement.controls['sgstPct'].enable();
      this.formBillStatement.controls['cgstPct'].enable();  
      this.formBillStatement.controls['igstPct'].disable();   
      this.formBillStatement.patchValue({
        sgstPct:"0",
        cgstPct:"0",
        igstPct:"",
        sgstAmt:"0",
        cgstAmt:"0",
        igstAmt:"",
      });     
    }
    else{
      this.formBillStatement.controls['sgstPct'].disable();
      this.formBillStatement.controls['cgstPct'].disable();  
      this.formBillStatement.controls['igstPct'].disable();   
      this.formBillStatement.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct:"",
        sgstAmt:"",
        cgstAmt:"",
        igstAmt:"",
      });   
    }    
    this.onPctChange()
  }

  onPctChange(){
    var totalFrtAmount = 0;
    var totalExtraAmount = 0;
    var totalSubAmount = 0;
    var totalBillAmount = 0;
    var selectedDate = this.formBillStatement.getRawValue();

    if (selectedDate.totFreight!="") {
      totalFrtAmount = parseFloat(selectedDate.totFreight);
    }
    if(selectedDate.totExtraChrg!=""){
      totalExtraAmount = parseFloat(selectedDate.totExtraChrg)
    }
    totalSubAmount = totalFrtAmount + totalExtraAmount
   
    var igst = 0;
    var sgst = 0;
    var cgst = 0;
    if(selectedDate.igstPct!=0){
      igst = parseFloat(selectedDate.igstPct)
    }
    if(selectedDate.sgstPct!=0){
      sgst = parseFloat(selectedDate.sgstPct)
    }
    if(selectedDate.cgstPct!=0){
      cgst = parseFloat(selectedDate.cgstPct)
    }

    if (selectedDate.gstType == "IG") {   
      selectedDate.igstPct 
      this.formBillStatement.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct: igst,
        sgstAmt:"",
        cgstAmt:"",
        igstAmt: ((totalSubAmount * igst)/100).toFixed(2),
      });   
    }    
    else if (selectedDate.gstType == "SC")  {    
      this.formBillStatement.patchValue({
        sgstPct: sgst,
        cgstPct: cgst,
        igstPct: "",
        sgstAmt: ((totalSubAmount * sgst)/100).toFixed(2),
        cgstAmt: ((totalSubAmount * cgst)/100).toFixed(2),
        igstAmt: "",
      });     
    }
    else{
      this.formBillStatement.patchValue({
        sgstPct:"",
        cgstPct:"",
        igstPct:"",
        sgstAmt:"",
        cgstAmt:"",
        igstAmt:"",
      });   
    }    
    totalBillAmount = totalSubAmount + 
                ((totalSubAmount * igst)/100) + ((totalSubAmount * sgst)/100) + ((totalSubAmount * cgst)/100)

    this.formBillStatement.patchValue({
      totFreight: totalFrtAmount.toFixed(2),
      totExtraChrg: totalExtraAmount.toFixed(2),
      totSubTotal: totalSubAmount.toFixed(2),
      totalBillAmt: totalBillAmount.toFixed(2),
    });
  }  

  getBillStatementInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedBillstatementDetails.masterID;
    this.billstatementService.getBillStatementInnerGridList(this.requestmodel).subscribe((res) => {
      this.billstatementsearchlistmodel = res;     
      this.formArray.clear();

      for (var i = 0; i < res.billStatementSearchList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("gcNoteNo")?.setValue(res.billStatementSearchList[i].gcNoteNo);
        this.formArray.controls[i].get("bookingDate")?.setValue(this.commonService.formatDate(res.billStatementSearchList[i].bookingDate));
        this.formArray.controls[i].get("vehicleNo")?.setValue(res.billStatementSearchList[i].vehicleNo);
        this.formArray.controls[i].get("productName")?.setValue(res.billStatementSearchList[i].productName);
        this.formArray.controls[i].get("noPackages")?.setValue(res.billStatementSearchList[i].noPackages);
        this.formArray.controls[i].get("kms")?.setValue(res.billStatementSearchList[i].kms);
        this.formArray.controls[i].get("rate")?.setValue(res.billStatementSearchList[i].rate);
        this.formArray.controls[i].get("gtotalRs")?.setValue(res.billStatementSearchList[i].gtotalRs);
        this.formArray.controls[i].get("selected")?.setValue(res.billStatementSearchList[i].selected);  
      }
    });
  }
  
  
  exit(): void {
    this.route.navigate(['/billstatementlist']);
  }
  
  billsStatementDelete(): void {
    if(this.selectedBillstatementDetails.masterID != '' ){
     this.requestmodel.strRequest =this.selectedBillstatementDetails.masterID
      if (confirm("Are you sure, you want to delete this?")) {
            this.billstatementService.billsStatementDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formBillStatement.reset();
              this.route.navigate(['/billstatementlist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }  

  saveStatementDetails(): void {
    this.formSubmitted = true;
    if (this.formBillStatement.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formBillStatement.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    var selectedDataValue = this.formBillStatement.getRawValue();
    this.billsstatementmodel.masterID = this.selectedBillstatementDetails.masterID ;
    this.billsstatementmodel.billStation = selectedDataValue.statementBillStation;
    this.billsstatementmodel.seriesCode = selectedDataValue.billSeries;
    this.billsstatementmodel.bill_StmtNo = selectedDataValue.billNo;
    this.billsstatementmodel.billDate = selectedDataValue.billDate;
    this.billsstatementmodel.partyCode = selectedDataValue.party.dataId;
    this.billsstatementmodel.fromDate = selectedDataValue.lrFrom;
    this.billsstatementmodel.toDate = selectedDataValue.lrTo;
    this.billsstatementmodel.fromPoint = selectedDataValue.fromPoint.dataId;
    this.billsstatementmodel.toPoint = selectedDataValue.toPoint.dataId;
    this.billsstatementmodel.suppYN = this.supp?"Y":"N";
    this.billsstatementmodel.partyRefNo = selectedDataValue.partyRefNo;
    this.billsstatementmodel.totFreight = selectedDataValue.totFreight.toString();
    this.billsstatementmodel.totExtraChrg = selectedDataValue.totExtraChrg.toString();
    this.billsstatementmodel.totSubTotal =  selectedDataValue.totSubTotal.toString();
    this.billsstatementmodel.gstType = selectedDataValue.gstType.toString();
    this.billsstatementmodel.sgstPct = selectedDataValue.sgstPct.toString();
    this.billsstatementmodel.sgstAmt = selectedDataValue.sgstAmt.toString();
    this.billsstatementmodel.cgstPct = selectedDataValue.cgstPct.toString();
    this.billsstatementmodel.cgstAmt = selectedDataValue.cgstAmt.toString();
    this.billsstatementmodel.igstPct = selectedDataValue.igstPct.toString();
    this.billsstatementmodel.igstAmt = selectedDataValue.igstAmt.toString();
    this.billsstatementmodel.totalBillAmt =  selectedDataValue.totalBillAmt.toString();
    this.billsstatementmodel.remarks = selectedDataValue.remarks;
    this.billsstatementmodel.yearId = this.year;
    this.billsstatementmodel.loggedInUser = this.loggedInUserID;
   
    this.billsstatementmodel.billStatementListData = this.billstatementsearchlistmodel.billStatementSearchList;  
    
    this.billstatementService.saveBillStatementDetails(this.billsstatementmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formBillStatement.reset();
        this.route.navigate(['/billstatementlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }

}
