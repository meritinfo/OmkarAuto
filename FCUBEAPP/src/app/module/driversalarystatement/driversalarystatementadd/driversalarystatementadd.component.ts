import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Driversalarystatementmodel } from 'src/app/models/driversalarystatementmodel';
import { CommonService } from 'src/app/services/common.service';
import { Driversalarydetailmodel } from 'src/app/models/driversalarydetailmodel';
import { Driversalarysearchmodel } from 'src/app/models/driversalarysearchmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Driversalarysearchlistmodel } from 'src/app/models/driversalarysearchlistmodel';
import { Driversalarysearchlistrequestmodel } from 'src/app/models/driversalarysearchlistrequestmodel';
import { DriversalarystatementService } from 'src/app/services/driversalarystatement.service';
import { Requestmodel } from 'src/app/models/requestmodel';


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
  loginDate: string = '';
  fromDate: string = '';
  minDate: string = '';
  maxDate: string = '';
  ptype: string = '';
  formDriverSalaryStatement!: FormGroup;
  keywordLocation = 'dataName';

  formSubmitted = false;
  responseDetails = new Responsemodel();
  driversalarysearchlistmodel = new Driversalarysearchlistmodel();
  Driversalarydetailmodel = new Driversalarydetailmodel();
  selectedDriverSalaryStatementDetails = new Driversalarystatementmodel();
  Driversalarysearchlistrequestmodel = new Driversalarysearchlistrequestmodel();
  creditacList: Dropdownmodel[] = [];
  creditacListNew: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  newList: Dropdownmodel[] = [];
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  constructor(private driversalarystatementmodel: Driversalarystatementmodel, private commonService: CommonService,  
    private route: Router,private driverSalaryStatementService: DriversalarystatementService, 
    private formBuilder: FormBuilder, private toasterService: ToastrService,
    private sharedService: SharedService,private requestmodel:Requestmodel) {
    this.driversalarystatementmodel = new Driversalarystatementmodel();
  }

  ngOnInit(): void {
    this.sharedService.loading = true;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Driver Salary Statement"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
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
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    else {
      this.route.navigate(['/']);
    }
      
    this.selectedDriverSalaryStatementDetails = this.driverSalaryStatementService.getDriverSalaryStatementDetails();
    this.formDriverSalaryStatement = this.formBuilder.group({
      transDt: new FormControl(this.loginDate),
      fromDt: new FormControl(this.fromDate),
      toDt: new FormControl(this.loginDate),
    //  pmtType: new FormControl(''),
      remarks: new FormControl(''),
      totalSalaryAmt: new FormControl(''),
      totalPoolAmt: new FormControl(''),
     // netPayable: new FormControl(''),
      totalNetPayAmt: new FormControl(''),
      creditAc: new FormControl(''),
     pmtType: new FormControl(''),
    // selected: new FormControl(''),
     arrayList: this.formBuilder.array([this.createInitialArray()]) 
    });
  
    this.getCreditAcList2("B");
    setTimeout(() => {
      this.createmode = true;
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
       this.sharedService.loading = false;
       this.editMode = true;
      }
      this.sharedService.loading = false;
    
  }, 2000);

 // this.driversalaryinnergridrequest.masterID = parseInt(this.selectedDriverSalaryStatementDetails.masterId);
       this.getTripSheetInnerGridList();
     

}
  
exit(): void {
  this.route.navigate(['/driversalarystatementlist']);
}
   
  

  get f() { return this.formDriverSalaryStatement.controls; }

    get formArray() {
      return this.formDriverSalaryStatement.get("arrayList") as FormArray;
    }
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
    var selectedDataValue = this.formDriverSalaryStatement.getRawValue();
   // this.Driversalarysearchlistrequestmodel.fromDate =  selectedDataValue.fromDt;
   // this.Driversalarysearchlistrequestmodel.toDate = selectedDataValue.toDt;


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
  createInitialArray() {
    return this.formBuilder.group({
      vehicleNo:  ['', []],
      driverMasterId:  ['', []],
      driverName:  ['', []],
      salaryDays:  ['', []],
      salaryAmt:  ['', []],
     
    
      vehicleMasterId:  ['', []],
      poolAmt: ['', []],
      netPayable:['', []],
      lastTripDt:['', []],
      lastTripBal: ['', []],
      selected: ['', []],
      
     // netPayable: string = "";
    //  vehicleLedgerAc : string = "";

    }); }

  getTripSheetInnerGridList(): void {
    this.requestmodel.strRequest = this.selectedDriverSalaryStatementDetails.masterId;
    this.driverSalaryStatementService.getDriverSalaryInnerGridList(this.requestmodel).subscribe((res) => {
      this.driversalarysearchlistmodel = res;
     
      for (var i = 0; i < this.formArray.length; i++) {
        this.formArray.removeAt(i);
     }     
      
      for (var i = 0; i < res.driverSalarySearchList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("vehicleNo")?.setValue(res.driverSalarySearchList[i].vehicleNo);
        this.formArray.controls[i].get("driverName")?.setValue(this.commonService.formatDate(res.driverSalarySearchList[i].driverName));
        this.formArray.controls[i].get("salaryDays")?.setValue(res.driverSalarySearchList[i].salaryDays);
        this.formArray.controls[i].get("salaryAmt")?.setValue(res.driverSalarySearchList[i].salaryAmt);
        this.formArray.controls[i].get("poolAmt")?.setValue(res.driverSalarySearchList[i].poolAmt);
        this.formArray.controls[i].get("lastTripBal")?.setValue(res.driverSalarySearchList[i].lastTripBal);
        this.formArray.controls[i].get("lastTripDt")?.setValue(res.driverSalarySearchList[i].lastTripDt);
        this.formArray.controls[i].get("netPayable")?.setValue(res.driverSalarySearchList[i].netPayable);

        this.formArray.controls[i].get("selected")?.setValue(res.driverSalarySearchList[i].selected);  
      }
     });
    
  }
  
  driverSalaryDelete(): void {
    if(this.selectedDriverSalaryStatementDetails.masterId != '' ){
     this.requestmodel.strRequest =this.selectedDriverSalaryStatementDetails.masterId
      if (confirm("Are you sure, you want to delete this?")) {
            this.driverSalaryStatementService.driverSalaryDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formDriverSalaryStatement.reset();
            window.location.reload();
        });
      }
    }
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
calculateTotal() {
  //var totalDslLeters = 0;
  var totalSalAmount = 0;
  var totalPoolAmount = 0;
  var netpay = 0;
  var diesellistarray=this.driversalarystatementmodel.driverSalaryListData;

  for (var i = 0; i <  this.driversalarysearchlistmodel.driverSalarySearchList.length; i++) {
    if (this.driversalarysearchlistmodel.driverSalarySearchList[i].selected) {
      if ( this.driversalarysearchlistmodel.driverSalarySearchList[i].salaryAmt !== "") {
        totalSalAmount = totalSalAmount + parseFloat( this.driversalarysearchlistmodel.driverSalarySearchList[i].salaryAmt);
     }
     if ( this.driversalarysearchlistmodel.driverSalarySearchList[i].poolAmt !== "") {
      totalPoolAmount = totalPoolAmount + parseFloat( this.driversalarysearchlistmodel.driverSalarySearchList[i].poolAmt);
   }
   if ( this.driversalarysearchlistmodel.driverSalarySearchList[i].netPayable !== "") {
    netpay = netpay + parseFloat( this.driversalarysearchlistmodel.driverSalarySearchList[i].netPayable);
 }
    //  if (diesellistarray[i].hsdAdvType === "A") {
       // totalDriverAdvAmount = totalDriverAdvAmount + parseFloat(diesellistarray[i].amountPaid);
    //  }
     // totalDslLeters=totalDslLeters + parseFloat(diesellistarray[i].qtyLtrs);
      //totalStatementAmount = totalStatementAmount + parseFloat(diesellistarray[i].amountPaid);
    }
  }

  this.formDriverSalaryStatement.patchValue({
    totalPoolAmt:totalPoolAmount.toFixed(2),
    totalSalaryAmt: totalSalAmount.toFixed(2),
    totalNetPayAmt: netpay.toFixed(2),
  });
}


valueUpdate(event: any, i: number){
  this.driversalarysearchlistmodel.driverSalarySearchList[i].selected = event.target.checked;
  this.calculateTotal();
}

}
