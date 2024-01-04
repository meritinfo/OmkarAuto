import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Billstatementsaverequest } from 'src/app/models/billstatementsaverequest';
import { Billstatementinnergridrequest } from 'src/app/models/billstatementinnergridrequest';
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
  billsstatementinnergridrequest = new Billstatementinnergridrequest();
  responseDetails = new Responsemodel();

  constructor(private billsstatementmodel: billstatementmodel, private commonService: CommonService, private billstatementService: BillstatementService, private route: Router, private formBuilder: FormBuilder,private sharedService: SharedService, private toasterService: ToastrService,private requestmodel:Requestmodel) {
    this.billsstatementmodel = new billstatementmodel();
    
  }


  ngOnInit(): void {
    this.sharedService.loading = true;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.find((item: { menuList: any; }) => item.menuList).menuList.find((aa: { menuName: string; }) => aa.menuName === "Bill Statement");
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
      billSeries: new FormControl(''),
      billNo: new FormControl(''),
      billDate: new FormControl(''),
      party: new FormControl(''),
      lrFrom: new FormControl(''),
      lrTo: new FormControl(''),
      fromPoint: new FormControl(''),
      toPoint: new FormControl(''),
      totFreight: new FormControl(''),
      totExtraChrg: new FormControl(''),
      totSubTotal: new FormControl(''),
      gstType: new FormControl(''),
      sgstPct: new FormControl(''),
      sgstAmt: new FormControl(''),
      cgstPct: new FormControl(''),
      cgstAmt: new FormControl(''),
      igstPct: new FormControl(''),
      igstAmt: new FormControl(''),
      totalBillAmt: new FormControl('')
    });
  
    setTimeout(() => {
      this.createmode = true;
   ;
 
  
     if (this.selectedBillstatementDetails.masterID != '') {
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
       this.billsstatementinnergridrequest.masterID = parseInt(this.selectedBillstatementDetails.masterID);
       this.getTripSheetInnerGridList();
       this.sharedService.loading = false;
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
  

  get f() { return this.formBillStatement.controls; }

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
     // totalStatementAmount: totalStatementAmount.toFixed(2)
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
  getTripSheetInnerGridList(): void {
    this.billstatementService.getBillStatementInnerGridList(this.billsstatementinnergridrequest).subscribe((res) => {
      this.billstatementsearchlistmodel = res;
     
      this.formBillStatement.patchValue({
       // miscDetailsList: this.tripsheetinnergridmodel.miscList,
      //  adblueDetailsList: this.tripsheetinnergridmodel.adblueList
      });

     // this.calculateTotal();
    //  this.totalCalculation();
    });
  }
  
  

  saveStatementDetails(): void {
    var selectedDataValue = this.formBillStatement.getRawValue();
    this.billsstatementmodel.masterID = this.selectedBillstatementDetails.masterID != '' ? this.selectedBillstatementDetails.masterID : '';
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
    this.billsstatementmodel.totFreight =this.formBillStatement.value.totFreight.toString();;
    this.billsstatementmodel.totExtraChrg = this.formBillStatement.value.totExtraChrg.toString();;
    this.billsstatementmodel.totSubTotal =  this.formBillStatement.value.totSubTotal.toString();;
    this.billsstatementmodel.gstType =  this.formBillStatement.value.gstType.toString();
    this.billsstatementmodel.sgstPct =  this.formBillStatement.value.sgstPct.toString();;
    this.billsstatementmodel.sgstAmt = this.formBillStatement.value.sgstAmt.toString();;
    this.billsstatementmodel.cgstPct =  this.formBillStatement.value.cgstPct.toString();;
    this.billsstatementmodel.cgstAmt =  this.formBillStatement.value.cgstAmt.toString();;
    this.billsstatementmodel.igstPct = this.formBillStatement.value.igstPct.toString();;
    this.billsstatementmodel.igstAmt =  this.formBillStatement.value.igstAmt.toString();;
    this.billsstatementmodel.totalBillAmt =  this.formBillStatement.value.totalBillAmt.toString();;
    this.billsstatementmodel.yearId = this.year;
    this.billsstatementmodel.loggedInUser = this.loggedInUserID;
    this.billsstatementmodel.billStatementListData = this.billstatementsearchlistmodel.billStatementSearchList;
    this.billstatementService.saveBillStatementDetails(this.billsstatementmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.toasterService.success(this.responseDetails.message);
      this.formBillStatement.reset();
      window.location.reload();
    });
  }

}
