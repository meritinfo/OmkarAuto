import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Driversalarystatementmodel } from 'src/app/models/driversalarystatementmodel';
import { CommonService } from 'src/app/services/common.service';
import { Driversalarydetailmodel } from 'src/app/models/driversalarydetailmodel';
import { Driversalarysearchmodel } from 'src/app/models/driversalarysearchmodel';
import { Driversalaryinnergridrequest } from 'src/app/models/driversalaryinnergridrequest';
import { Driversalarysearchlistmodel } from 'src/app/models/driversalarysearchlistmodel';
import { Driversalarysearchlistrequestmodel } from 'src/app/models/driversalarysearchlistrequestmodel';
import { DriversalarystatementService } from 'src/app/services/driversalarystatement.service';


import { Billstatementsearchlistrequestmodel } from 'src/app/models/billstatementsearchlistrequestmodel';

@Component({
  selector: 'app-driversalarystatementadd',
  templateUrl: './driversalarystatementadd.component.html',
  styleUrls: ['./driversalarystatementadd.component.css']
})
export class DriversalarystatementaddComponent implements OnInit {
  loggedInUserID: string = '';
  year: string = '';
  branch: string = '';
  ptype: string = '';
  formDriverSalaryStatement!: FormGroup;
  keywordLocation = 'dataName';

  formSubmitted = false;
  responseDetails = new Responsemodel();
  driversalarysearchlistmodel = new Driversalarysearchlistmodel();
  Driversalarydetailmodel = new Driversalarydetailmodel();
  selectedDriverSalaryStatementDetails = new Driversalarystatementmodel();
  Driversalarysearchlistrequestmodel = new Driversalarysearchlistrequestmodel();
  driversalaryinnergridrequest = new Driversalaryinnergridrequest();
  creditacList: Dropdownmodel[] = [];
  creditacListNew: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  newList: Dropdownmodel[] = [];

  constructor(private driversalarystatementmodel: Driversalarystatementmodel, private commonService: CommonService,  private route: Router,private driverSalaryStatementService: DriversalarystatementService, private formBuilder: FormBuilder, private toasterService: ToastrService) {
    this.driversalarystatementmodel = new Driversalarystatementmodel();
  }

  ngOnInit(): void {
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
      
    this.selectedDriverSalaryStatementDetails = this.driverSalaryStatementService.getDriverSalaryStatementDetails();
    this.formDriverSalaryStatement = this.formBuilder.group({
      transDt: new FormControl(''),
      fromDt: new FormControl(''),
      toDt: new FormControl(''),
    //  pmtType: new FormControl(''),
      remarks: new FormControl(''),
      totalSalaryAmt: new FormControl(''),
      totalPoolAmt: new FormControl(''),
     // netPayable: new FormControl(''),
      totalNetPayAmt: new FormControl(''),
      creditAc: new FormControl(''),
     pmtType: new FormControl('')
    });
    this.getCreditAcList2("B");
    setTimeout(() => {
      //this.createmode = true;
     if (this.selectedDriverSalaryStatementDetails.masterId != '') {
       this.formDriverSalaryStatement.patchValue(this.selectedDriverSalaryStatementDetails);

      // this.formTripPayment.controls['vehicleMasterID'].disable();
      
  
       var selectedDataValue = this.formDriverSalaryStatement.getRawValue();
    
    
      // billDate:this.commonService.formatDate(this.selectedBillstatementDetails.billDate), 
    // party :this.partyList.find(e => e.dataId == this.selectedBillstatementDetails.partyCode),
       // party :this.selectedBillstatementDetails.partyCode,
      
     //  lrFrom:  this.commonService.formatDate(this.selectedBillstatementDetails.fromDate), 
    //  lrTo:  this.commonService.formatDate(this.selectedBillstatementDetails.toDate), 

       this.getCreditAcList2("B");
       //this.getCreditAcList();
     
       this.formDriverSalaryStatement.patchValue({
        transDt:    this.commonService.formatDate(this.selectedDriverSalaryStatementDetails.transDt), 
        fromDt:    this.commonService.formatDate(this.selectedDriverSalaryStatementDetails.fromDt), 
        toDt:    this.commonService.formatDate(this.selectedDriverSalaryStatementDetails.toDt), 
    
    
        pmtType :this.selectedDriverSalaryStatementDetails.pmtType, 
     // toDt :this.selectedDriverSalaryStatementDetails.toDt, 

       
       });
      
      }
    
  }, 2000);
 // this.driversalaryinnergridrequest.masterID = parseInt(this.selectedDriverSalaryStatementDetails.masterId);
 this.driversalaryinnergridrequest.masterID = parseInt(this.selectedDriverSalaryStatementDetails.masterId);
       this.getTripSheetInnerGridList();

}
  

   
  

  get f() { return this.formDriverSalaryStatement.controls; }
  getCreditAcList2(e:any){
    this.ptype = e;
    var data = {
      'pType' : this.ptype
    }
  

    this.commonService.getCreditAcList2(data).subscribe((res) => {
      this.creditacList = res;
      this.newList = this.creditacList;
    });


  }
  searchStatement(): void {
    this.driverSalaryStatementService.getDriverSalarySearchList(this.Driversalarysearchlistrequestmodel).subscribe((res: Driversalarysearchlistmodel) => {
      this.driversalarysearchlistmodel = res;
    });
  }
  getCreditAcList(){
    //this.tripVehicleDetails.vehicleMasterId =  e;
     // this.ptype = e;
    this.commonService.getCreditAcList().subscribe((res) => {
      this.creditacList = res;
    
    });
  

  }
  changePmtType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    this.ptype = e.target.value;
    this.getCreditAcList2(this.ptype);
  
  }
  getTripSheetInnerGridList(): void {
    this.driverSalaryStatementService.getDriverSalaryInnerGridList(this.driversalaryinnergridrequest).subscribe((res) => {
      this.driversalarysearchlistmodel = res;
     
      this.formDriverSalaryStatement.patchValue({
       // miscDetailsList: this.tripsheetinnergridmodel.miscList,
      //  adblueDetailsList: this.tripsheetinnergridmodel.adblueList
      });

     // this.calculateTotal();
    //  this.totalCalculation();
    });
  }
  


saveStatementDetails(): void {
  var selectedDataValue = this.formDriverSalaryStatement.getRawValue();
  this.driversalarystatementmodel.masterId = this.selectedDriverSalaryStatementDetails.masterId != '' ? this.selectedDriverSalaryStatementDetails.masterId : '';
  this.driversalarystatementmodel.transDt = selectedDataValue.transDt;
 this.driversalarystatementmodel.fromDt = selectedDataValue.fromDt;
  this.driversalarystatementmodel.toDt = selectedDataValue.toDt;
  this.driversalarystatementmodel.remarks = selectedDataValue.remarks;
  this.driversalarystatementmodel.totalSalaryAmt = selectedDataValue.totalSalaryAmt;
  this.driversalarystatementmodel.totalPoolAmt = selectedDataValue.totalPoolAmt;
  this.driversalarystatementmodel.pmtType = selectedDataValue.pmtType;
  this.driversalarystatementmodel.creditAc = selectedDataValue.creditAc;
  this.driversalarystatementmodel.totalNetPayAmt = selectedDataValue.totalNetPayAmt;
  
  
  this.driversalarystatementmodel.yearId = this.year;
  this.driversalarystatementmodel.loggedInUser = this.loggedInUserID;
  this.driversalarystatementmodel.driverSalaryListData = [];
  for (var i = 0; i < this.driversalarysearchlistmodel.driverSalarySearchList.length; i++) {
    //if (this.formDistanceMasterTrip.value.arrayList[i].toLocation != '') {
      this.driversalarystatementmodel.driverSalaryListData.push({
        'detailId':'', //this.driversalarysearchlistmodel.driverSalarySearchList.length > i ? this.driversalarystatementmodel.driverSalaryListData[i].detailId : '',
        'index': '',
        'masterId': '',
        'vehicleMasterId': this.driversalarysearchlistmodel.driverSalarySearchList[i].vehicleMasterId,
        //'toLocation': this.formDistanceMasterTrip.value.arrayList[i].toLocation.dataId,
        'driverMasterId': this.driversalarysearchlistmodel.driverSalarySearchList[i].driverMasterId,
        'fromDt': selectedDataValue.fromDt,
        'toDt': selectedDataValue.toDt,
        'driverName': this.driversalarysearchlistmodel.driverSalarySearchList[i].driverName,
        'salaryDays':this.driversalarysearchlistmodel.driverSalarySearchList[i].salaryDays,
        'salaryAmt':this.driversalarysearchlistmodel.driverSalarySearchList[i].salaryAmt,
        'poolAmt':this.driversalarysearchlistmodel.driverSalarySearchList[i].poolAmt,
        'netPayable':this.driversalarysearchlistmodel.driverSalarySearchList[i].netPayable,
        'lastTripBal':this.driversalarysearchlistmodel.driverSalarySearchList[i].lastTripBal,
        'lastTripDt':this.driversalarysearchlistmodel.driverSalarySearchList[i].lastTripDt,
       
        //'vehicleLedgerAc':this.driversalarysearchlistmodel.driverSalarySearchList[i].vehicleLedgerAc,
        'vehicleNo':this.driversalarysearchlistmodel.driverSalarySearchList[i].vehicleNo,
        'selected':this.driversalarysearchlistmodel.driverSalarySearchList[i].selected,
        //'enrouteExpTruck': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpTruck.toString(),
        //'enrouteExpTrailer': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpTrailer.toString(),
        //'enrouteExpCarCarrier': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpCarCarrier.toString(),
       // 'enrouteExpEmpty': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpEmpty.toString(),
        //'enrouteExpRemarks': this.formDistanceMasterTrip.value.arrayList[i].enrouteExpRemarks,
       // 'definedTollExp': this.formDistanceMasterTrip.value.arrayList[i].defineTollExp.toString(),

      })
    
  }

 // this.driversalarystatementmodel.driverSalaryListData = this.driversalarysearchlistmodel.driverSalarySearchList;
  this.driverSalaryStatementService.saveDriverSalaryDetails(this.driversalarystatementmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    this.toasterService.success(this.responseDetails.message);
    this.formDriverSalaryStatement.reset();
    window.location.reload();
  });

}

valueUpdate(event: any, i: number){
  this.driversalarysearchlistmodel.driverSalarySearchList[i].selected = event.target.checked;
}

}
