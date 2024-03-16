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
  branchList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  lrSeries: Dropdownmodel[] = [];
  formBillStatement!: FormGroup;
  keywordLocation = 'dataName';
  billstatementsearchlistmodel = new Billstatementsearchlistmodel();
  
  saveData = new Billstatementsaverequest();
  billstatementsearchlistrequestmodel = new Billstatementsearchlistrequestmodel();
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

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

    this.getLocationList();
    this.getBranchList();
    this.getBillingPartyList();
    this.getlrSeriesForBillList();
    
    this.selectedBillstatementDetails = this.billstatementService.getBillStatementDetails();
    this.formBillStatement = this.formBuilder.group({
      statementBillStation: new FormControl(this.branch),
      billSeries: new FormControl('',[Validators.required]),
      billNo: new FormControl('',[Validators.required]),
      billDate: new FormControl('',[Validators.required]),
      party: new FormControl('',[Validators.required]),
      lrFrom: new FormControl('',[Validators.required]),
      lrTo: new FormControl('',[Validators.required]),
      fromPoint: new FormControl(''),
      toPoint: new FormControl(''),
      totFreight: new FormControl('',[Validators.required]),
      totExtraChrg: new FormControl(''),
      totSubTotal: new FormControl(''),
      gstType: new FormControl(''),
      sgstPct: new FormControl(''),
      sgstAmt: new FormControl(''),
      cgstPct: new FormControl(''),
      cgstAmt: new FormControl(''),
      igstPct: new FormControl(''),
      igstAmt: new FormControl(''),
      totalBillAmt: new FormControl('',[Validators.required]),
      plantCode: new FormControl(''),
      arrayList: this.formBuilder.array([this.createInitialArray()]) 
    });
  
    setTimeout(() => {
      this.createmode = true;
      this.formBillStatement.controls['statementBillStation'].disable();
     // this.formBillStatement.controls['billSeries'].disable();
      this.formBillStatement.controls['billNo'].disable();
      this.formBillStatement.controls['totFreight'].disable();
      this.formBillStatement.controls['totSubTotal'].disable();
      this.formBillStatement.controls['cgstAmt'].disable();
      this.formBillStatement.controls['totSubTotal'].disable();
      this.formBillStatement.controls['igstAmt'].disable();
      this.formBillStatement.controls['totalBillAmt'].disable();
      this.formBillStatement.controls['sgstAmt'].disable();
 
  
     if (this.selectedBillstatementDetails.masterID != '') {
      //this.getValidation();
      this.formBillStatement.controls['statementBillStation'].disable();
      this.formBillStatement.controls['billSeries'].disable();
      this.formBillStatement.controls['billNo'].disable();
      this.formBillStatement.controls['totFreight'].disable();
      this.formBillStatement.controls['totSubTotal'].disable();
      this.formBillStatement.controls['cgstAmt'].disable();
      this.formBillStatement.controls['totSubTotal'].disable();
      this.formBillStatement.controls['igstAmt'].disable();
      this.formBillStatement.controls['totalBillAmt'].disable();
      this.formBillStatement.controls['sgstAmt'].disable();
       this.formBillStatement.patchValue(this.selectedBillstatementDetails);
      
      // this.formTripPayment.controls['vehicleMasterID'].disable();
      
  
   //    var selectedDataValue = this.formBillStatement.getRawValue();
       
   
       this.formBillStatement.patchValue({
       
        billNo:  this.selectedBillstatementDetails.bill_StmtNo, 
        billSeries :this.selectedBillstatementDetails.seriesCode, 
        billDate:this.commonService.formatDate(this.selectedBillstatementDetails.billDate), 
      party :this.partyList.find(e => e.dataId == this.selectedBillstatementDetails.partyCode),
        // party :this.selectedBillstatementDetails.partyCode,
       
        lrFrom:  this.commonService.formatDate(this.selectedBillstatementDetails.fromDate), 
       lrTo:  this.commonService.formatDate(this.selectedBillstatementDetails.toDate), 
       fromPoint:this.locationList.find(e => e.dataId == this.selectedBillstatementDetails.fromPoint),
       toPoint:this.locationList.find(e => e.dataId == this.selectedBillstatementDetails.toPoint),
        
       ///  pmtDate:   this.commonService.formatDate(selectedDataValue.pmtDate), 
//chequeDate:  this.commonService.formatDate(selectedDataValue.chequeDate), 
       //  tripNo:  selectedDataValue.tripNo, 
     //    loadorempty:  selectedDataValue.loadorempty, 
  

       
       })
        this.getTripSheetInnerGridList();
       this.sharedService.loading = false;
       this.editMode = true;
     }
   
     this.sharedService.loading = false;
    
   }, 2000);
   this.getValidation();
  
   }
 
getValidation():void {
  this.formBillStatement.controls['tatementBillStation'].disable();
  this.formBillStatement.controls['totalBillAmt'].disable();
  this.formBillStatement.controls['totFreight'].disable();
  this.formBillStatement.controls['totSubTotal'].disable();
  this.formBillStatement.controls['statementBillStation'].disable();
  this.formBillStatement.controls['billSeries'].disable();
  this.formBillStatement.controls['billNo'].disable();
  
}
lrSeriesChange(): void {
  var selectedData = this.formBillStatement.value.billSeries;
  this.getGcSeries(selectedData);
}

getGcSeries(gcSeries: any): void {
  //this.commonService.getGcSeries().subscribe((res) => {
  // this.gcno = res.dataName;
  // });
  this.requestmodel.strRequest = gcSeries;
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
  exit(): void {
    this.route.navigate(['/billstatementlist']);
  }
  deleteBillStatementForm(): void {
    if (confirm("Are you sure, you want to delete this?")) {
  
    }
  }
  
  getBillingPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }
  

  get f() { return this.formBillStatement.controls;}
    get formArray() {
      return this.formBillStatement.get("arrayList") as FormArray;
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
      }); }


  selectEvent(item: any) {
    // do something with selected item
  }
  getlrSeriesForBillList(): void {
    this.commonService.getlrSeriesForBillList().subscribe((res) => {
      this.lrSeries = res;
    });
  }
  billsStatementDelete(): void {
    if(this.selectedBillstatementDetails.masterID != '' ){
     this.requestmodel.strRequest =this.selectedBillstatementDetails.masterID
      if (confirm("Are you sure, you want to delete this?")) {
            this.billstatementService.billsStatementDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formBillStatement.reset();
            window.location.reload();
        });
      }
    }
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
    var selectedDataVal=this.formBillStatement.getRawValue();
   // this.billstatementsearchlistrequestmodel.billingParty =  selectedDataVal.billingParty.dataId;
  //  this.billstatementsearchlistrequestmodel.fromPlace =  selectedDataVal.fromPoint.dataId;
  // this.billstatementsearchlistrequestmodel.toPlace =  selectedDataVal.toPoint.dataId;
   // this.billstatementsearchlistrequestmodel.productId =  selectedDataVal.productId;
   // this.billstatementsearchlistrequestmodel.cnorPlantCode=  selectedDataVal.cnorPlantCode;

    this.billstatementService.getBillStatementSearchList(this.billstatementsearchlistrequestmodel).subscribe((res: Billstatementsearchlistmodel) => {
      this.billstatementsearchlistmodel = res;
    });
  }

  selectedData(index: number, event: any) {
    this.billstatementsearchlistmodel.billStatementSearchList[index].selected = event.target.checked;
   
    this.calculateTotal();
  }
  
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  calculateTotal() {
    var totalFrtAmount = 0;
    var totalDriverAdvAmount = 0;
    var totalStatementAmount = 0;
    for (var i = 0; i < this.billstatementsearchlistmodel.billStatementSearchList.length; i++) {
      if (this.billstatementsearchlistmodel.billStatementSearchList[i].selected) {
       // if (this.billstatementsearchlistmodel.dieselStatementSearchList[i].hsdAdvType === "D") {
          totalFrtAmount = totalFrtAmount + parseFloat(this.billstatementsearchlistmodel.billStatementSearchList[i].gtotalRs);
     //   }
       
      }
    }


    this.formBillStatement.patchValue({
      totFreight: totalFrtAmount.toFixed(2),
     // totalDriverAdvAmount: totalDriverAdvAmount.toFixed(2),
     // totalBillAmt: totalStatementAmount.toFixed(2)
    });
    var selectedDataValue = this.formBillStatement.getRawValue();
    if(selectedDataValue.totSubTotal == '')
    this.formBillStatement.patchValue({
      totalBillAmt: totalFrtAmount.toFixed(2),
     // totalDriverAdvAmount: totalDriverAdvAmount.toFixed(2),
     // totalBillAmt: totalStatementAmount.toFixed(2)
    });
  }
  changeGstType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
 

    if (selectedValue == "I") {
   
     // this.formTripPayment.controls['ratePerLtr'].setValidators([Validators.required]);
    }
    else if (selectedValue == "B")  {
      this.formBillStatement.patchValue({
       // totFreight: totalFrtAmount.toFixed(2),
       // totalDriverAdvAmount: totalDriverAdvAmount.toFixed(2),
       // totalStatementAmount: totalStatementAmount.toFixed(2)
      });
    }
      else{

      }
     
     // this.formTripPayment.controls['ratePerLtr'].clearValidators();
    
  
   // this.formTripPayment.controls['ratePerLtr'].updateValueAndValidity();
  }
  calTotalBill(){
    var selectedDataValue = this.formBillStatement.getRawValue();
  // var sgstPct = parseFloat(this.billstatementsearchlistmodel.sgstPct
    var sgstPct = selectedDataValue.sgstPct ? parseFloat(selectedDataValue.sgstPct) : 0;
    var sgstAmt = selectedDataValue.sgstAmt ? parseFloat(selectedDataValue.sgstAmt) : 0;
    var cgstPct = selectedDataValue.cgstPct ? parseFloat(selectedDataValue.cgstPct) : 0;
    var cgstAmt = selectedDataValue.cgstAmt ? parseFloat(selectedDataValue.cgstAmt) : 0;
    var igstPct = selectedDataValue.igstPct ? parseFloat(selectedDataValue.igstPct) : 0;
    var igstAmt = selectedDataValue.igstAmt ? parseFloat(selectedDataValue.igstAmt) : 0;
    var totExtraChrg = selectedDataValue.totExtraChrg ? parseFloat(selectedDataValue.totExtraChrg) : 0;
    var totSubTotal = selectedDataValue.totSubTotal ? parseFloat(selectedDataValue.totSubTotal) : 0;
    var totFreight = selectedDataValue.totFreight ? parseFloat(selectedDataValue.totFreight) : 0;
    var allgst = 0;
    var totSub = 0;
   // var totalSubtotal = 0;
    var totalBillAmt = 0;
    totSub = totFreight+ totExtraChrg;
   // allgst = sgstPct+ sgstAmt + cgstPct + cgstAmt + igstPct + igstAmt;
    allgst =  sgstAmt + cgstAmt  + igstAmt;
    totalBillAmt = allgst +  totSubTotal;


    this.formBillStatement.patchValue({
  //  var  totFreight: totalFrtAmount.toFixed(2),
     // totalDriverAdvAmount: totalDriverAdvAmount.toFixed(2),
     // totalStatementAmount: totalStatementAmount.toFixed(2)
   //  totSubTotal:totSub.toFixed(2),
     totalBillAmt:totalBillAmt.toFixed(2)
   
    });
     
       
      

  }
  calSubTotalBill(){
    var selectedDataValue = this.formBillStatement.getRawValue();
  // var sgstPct = parseFloat(this.billstatementsearchlistmodel.sgstPct
  
    var totExtraChrg = selectedDataValue.totExtraChrg ? parseFloat(selectedDataValue.totExtraChrg) : 0;
    var totSubTotal = selectedDataValue.totSubTotal ? parseFloat(selectedDataValue.totSubTotal) : 0;
    var totFreight = selectedDataValue.totFreight ? parseFloat(selectedDataValue.totFreight) : 0;
    var allgst = 0;
    var totSub = 0;
   // var totalSubtotal = 0;
    var totalBillAmt = 0;
    totSub = totFreight+ totExtraChrg;



    this.formBillStatement.patchValue({
  //  var  totFreight: totalFrtAmount.toFixed(2),
     // totalDriverAdvAmount: totalDriverAdvAmount.toFixed(2),
     // totalStatementAmount: totalStatementAmount.toFixed(2)
     totSubTotal:totSub.toFixed(2),
    // totalBillAmt:totalBillAmt.toFixed(2)
   
    });
    this.calTotalBill();
       
      

  
  
  }
  valueUpdate(event: any, i: number){
   this.billstatementsearchlistmodel.billStatementSearchList[i].selected = event.target.checked;
  }
  getTripSheetInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedBillstatementDetails.masterID;
    this.billstatementService.getBillStatementInnerGridList(this.requestmodel).subscribe((res) => {
      this.billstatementsearchlistmodel = res;
     
      for (var i = 0; i < this.formArray.length; i++) {
        this.formArray.removeAt(i);
     }     
      
      for (var i = 0; i < res.billStatementSearchList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("gcNoteNo")?.setValue(res.billStatementSearchList[i].gcNoteNo);
        this.formArray.controls[i].get("bookingDate")?.setValue(this.commonService.formatDate(res.billStatementSearchList[i].bookingDate));
        this.formArray.controls[i].get("vehicleNo")?.setValue(res.billStatementSearchList[i].vehicleNo);
        this.formArray.controls[i].get("productName")?.setValue(res.billStatementSearchList[i].productName);
        this.formArray.controls[i].get("noPackages")?.setValue(res.billStatementSearchList[i].noPackages);
        this.formArray.controls[i].get("gtotalRs")?.setValue(res.billStatementSearchList[i].gtotalRs);

        this.formArray.controls[i].get("selected")?.setValue(res.billStatementSearchList[i].selected);  
      }
     });
  }
  
  

  saveStatementDetails(): void {
    this.formSubmitted = true;
    if (this.formBillStatement.invalid) {
      this.toasterService.warning("Mandatory fields is required");
      return;
    }
    var selectedDataValue = this.formBillStatement.getRawValue();
   // this.billsstatementmodel.masterID = this.selectedBillstatementDetails.masterID != '' ? this.selectedBillstatementDetails.masterID : '';
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
  //  this.saveData.fromPlace = this.formBillStatement.value.fromPlace ? this.formBillStatement.value.fromPlace.dataId : '';
  //  this.saveData.toPlace = this.formBillStatement.value.toPlace ? this.formBillStatement.value.toPlace.dataId : '';
  //  this.saveData.cnorPlantCode = this.formBillStatement.value.cnorPlantCode ? this.formBillStatement.value.cnorPlantCode : '';
   // this.saveData.productId = this.formBillStatement.value.productId ? this.formBillStatement.value.productId : '';
   // this.billsstatementmodel.totFreight = this.formBillStatement.value.totFreight;
    this.billsstatementmodel.totFreight =selectedDataValue.totFreight.toString();;
    this.billsstatementmodel.totExtraChrg = selectedDataValue.totExtraChrg.toString();;
    this.billsstatementmodel.totSubTotal =  selectedDataValue.totSubTotal.toString();;
    this.billsstatementmodel.gstType =  selectedDataValue.gstType.toString();
    this.billsstatementmodel.sgstPct =  selectedDataValue.sgstPct.toString();;
    this.billsstatementmodel.sgstAmt = selectedDataValue.sgstAmt.toString();;
    this.billsstatementmodel.cgstPct =  selectedDataValue.cgstPct.toString();;
    this.billsstatementmodel.cgstAmt =  selectedDataValue.cgstAmt.toString();;
    this.billsstatementmodel.igstPct = selectedDataValue.igstPct.toString();;
    this.billsstatementmodel.igstAmt =  selectedDataValue.igstAmt.toString();;
    this.billsstatementmodel.totalBillAmt =  selectedDataValue.totalBillAmt.toString();;
    this.billsstatementmodel.yearId = this.year;
    this.billsstatementmodel.loggedInUser = this.loggedInUserID;
   
    this.billsstatementmodel.billStatementListData = this.billstatementsearchlistmodel.billStatementSearchList;
   // this.billsstatementmodel.billStatementListData = [];
   
  
    
    this.billstatementService.saveBillStatementDetails(this.billsstatementmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.toasterService.success(this.responseDetails.message);
      this.formBillStatement.reset();
      window.location.reload();
    });
  }

}
