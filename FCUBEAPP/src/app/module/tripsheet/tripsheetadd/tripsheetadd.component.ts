import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tripsheetmodel } from 'src/app/models/tripsheetmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { TripSheetService } from 'src/app/services/tripsheet.service';
import { SharedService } from 'src/app/services/shared.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Reportmodel } from 'src/app/models/reportmodel';

@Component({
  selector: 'app-tripsheetadd',
  templateUrl: './tripsheetadd.component.html',
  styleUrls: ['./tripsheetadd.component.css']
})

export class TripsheetaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  loginDate: string = '';
  branch:string = '';
  minDate: string = '';
  maxDate: string = '';
  fromDate: string = '';

  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  editMode = false;
  detailMode = false;

  formTripsheet!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  driverLists: Dropdownmodel[] = [];
  expmstList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  filter= new Reportmodel();

  selectedTripSheetDetails = new Tripsheetmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tripsheetmodel: Tripsheetmodel, private tripSheetService: TripSheetService, 
    private commonService: CommonService, private sharedService: SharedService, 
    private requestmodel:Requestmodel,
    private toastrService: ToastrService) {
    this.tripsheetmodel = new Tripsheetmodel();

  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Trip Sheet"));      
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    else {
      this.route.navigate(['/']);
    }

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 12);

    const nowdate = new Date();
    nowdate.setFullYear(year + 1);
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = nowdate.toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
    
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
    }
    this.getExpList();
    this.getDriverList();
    this.getBranchList();
    this.getVehicleNoList();
    this.getLocationList();
   

    this.formTripsheet = this.formBuilder.group({
      tripBranch: new FormControl(this.branch, [Validators.required]),
      vehicleMasterID: new FormControl('', [Validators.required]),
      tripNo: new FormControl('', [Validators.required]),
      deptDate:  new FormControl(this.loginDate, [Validators.required]),
      endDate:  new FormControl(this.loginDate, [Validators.required]),
      stmtDate:  new FormControl(this.loginDate, [Validators.required]),
      tripStatus:  new FormControl('',),
      driverMasterID:  new FormControl('', [Validators.required]),
      definedMileage: new FormControl('',),
      closingKMR:new FormControl('',[Validators.required]),
      openingKMR: new FormControl('',),
      distanceTripKM: new FormControl('',[Validators.required]),
      ltsDslToBe: new FormControl('',),
      opBalDsl: new FormControl('',),
      issuedDslLtrs: new FormControl('',),
      issuedDslAmt: new FormControl('',),
      dieselPassedLtrs: new FormControl('',),
      dieselPassedAmt: new FormControl('',),
      dieselVarianceAmt: new FormControl('',),
      clBalDsl: new FormControl('',),      
      opBalDriver: new FormControl('',),
      paidDriverAdvance: new FormControl('',),
      freightCollByDriver: new FormControl('',),
      expensesByDriver: new FormControl('',),
      totalBhattaDays: new FormControl('',),
      bhattaRate: new FormControl('',),
      bhattaAmt: new FormControl('',),
      onTimeIncentiveAmt: new FormControl('',),
      multiDelIncentiveAmt: new FormControl('',),
      penaltyChargedToDr: new FormControl('',),
      penaltyRemarks: new FormControl('',),
      //totalDriverAc: new FormControl('',),
      totalAdblueExp: new FormControl('',),
      tripBalance: new FormControl('',),
      recdFromDriver: new FormControl('',),
      netTripBalance: new FormControl('',[Validators.required]),
      fastagAmount: new FormControl('',),
      tripTotalFreight: new FormControl('',),
      tripTotalExpenses: new FormControl('',[Validators.required]),
      expensesByComp: new FormControl('',),
      reportDateTime: new FormControl('',),
      unloadDateTime: new FormControl('',),
      detentionDays: new FormControl('',),
      tripCloseDt: new FormControl('',),
      tripLinkYN: new FormControl('',),
      food_Sal_PerDay : new FormControl('',),
      food_Sal_FromDt  : new FormControl('',),
      food_Sal_ToDt   : new FormControl('',),
      food_Sal_Days    : new FormControl('',),
      food_Sal_Amt     : new FormControl('',),
      rtaChallanDesc     : new FormControl('',),
      rtaChallanAmt      : new FormControl('',),
      driverList: this.formBuilder.array([this.createDriverArray()]),
      routeList: this.formBuilder.array([this.createRouteArray()]),
      dieselList: this.formBuilder.array([this.createDieselArray()]),
      adblueList: this.formBuilder.array([this.createAdblueArray()]),
      fasttagList: this.formBuilder.array([this.createFasttagArray()]),
      drExpList: this.formBuilder.array([this.createTripDrExpArray()]),
      cmpExpList: this.formBuilder.array([this.createTripCmpExpArray()])

    });

    this.selectedTripSheetDetails = this.tripSheetService.getTripSheetDetails();

    this.formTripsheet.controls['tripBranch'].disable(); 
    this.formTripsheet.controls['tripNo'].disable();
    this.formTripsheet.controls['ltsDslToBe'].disable();
    this.formTripsheet.controls['distanceTripKM'].disable();  
    this.formTripsheet.controls['issuedDslLtrs'].disable();      
    this.formTripsheet.controls['issuedDslAmt'].disable();       
    this.formTripsheet.controls['fastagAmount'].disable();          
    this.formTripsheet.controls['dieselPassedAmt'].disable();   
    this.formTripsheet.controls['dieselVarianceAmt'].disable();     
    this.formTripsheet.controls['clBalDsl'].disable();       
    this.formTripsheet.controls['paidDriverAdvance'].disable();    
    this.formTripsheet.controls['expensesByDriver'].disable();  
    this.formTripsheet.controls['totalBhattaDays'].disable();    
    this.formTripsheet.controls['bhattaRate'].disable();       
    this.formTripsheet.controls['bhattaAmt'].disable();       
    this.formTripsheet.controls['tripBalance'].disable();      
    this.formTripsheet.controls['netTripBalance'].disable();     
    this.formTripsheet.controls['tripTotalFreight'].disable();       
    this.formTripsheet.controls['totalAdblueExp'].disable();    
    this.formTripsheet.controls['tripTotalExpenses'].disable();   
    this.formTripsheet.controls['expensesByComp'].disable();     
    this.formTripsheet.controls['tripCloseDt'].disable();
    this.formTripsheet.controls['detentionDays'].disable();    
    this.formTripsheet.controls['food_Sal_Amt'].disable(); 
    this.formTripsheet.controls['food_Sal_Days'].disable(); 
    

    setTimeout(() => {
      this.sharedService.loading = true;

      if (this.selectedTripSheetDetails.tripId != '') {        
        this.formTripsheet.controls['openingKMR'].disable();     
        this.formTripsheet.controls['opBalDsl'].disable();    
        this.formTripsheet.controls['opBalDriver'].disable();        
        this.formTripsheet.controls['deptDate'].disable();     
        this.formTripsheet.controls['endDate'].disable();    
        this.formTripsheet.controls['vehicleMasterID'].disable();  

        this.formTripsheet.patchValue(this.selectedTripSheetDetails);
        this.formTripsheet.patchValue({
          stmtDate: this.commonService.formatDate(this.selectedTripSheetDetails.stmtDate),
          deptDate: this.commonService.formatDate(this.selectedTripSheetDetails.deptDate),
          endDate: this.commonService.formatDate(this.selectedTripSheetDetails.endDate),
          tripCloseDt: this.commonService.formatDate(this.selectedTripSheetDetails.tripCloseDt),
          reportDateTime: this.commonService.formatDate(this.selectedTripSheetDetails.reportDateTime),
          unloadDateTime: this.commonService.formatDate(this.selectedTripSheetDetails.unloadDateTime),
          food_Sal_FromDt: this.commonService.formatDate(this.selectedTripSheetDetails.food_Sal_FromDt),
          food_Sal_ToDt: this.commonService.formatDate(this.selectedTripSheetDetails.food_Sal_ToDt),
          vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedTripSheetDetails.vehicleMasterID),
          driverMasterID: this.driverLists.find(e => e.dataId == this.selectedTripSheetDetails.driverMasterID),
        }); 
        if(this.selectedTripSheetDetails.tripStatus!="Y"){
          this.formTripsheet.patchValue({
            tripStatus:""
          }); 
        }
        if(this.selectedTripSheetDetails.tripLinkYN!="Y"){
          this.formTripsheet.patchValue({
            tripLinkYN:""
          }); 
        }        
             
        if( this.selectedTripSheetDetails.nextTrip != '0'){        
          this.formTripsheet.controls['closingKMR'].disable();     
          this.formTripsheet.controls['clBalDsl'].disable();           
        }
        this.editMode = true;
        this.getTripSheetInnerGridList();
      }  
      else{        
        this.getBhattaRate(this.loginDate);
      }     
      this.sharedService.loading = false;
    }, 2000);  
  }
  
  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  
  
  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  
  getDriverList(): void {
    this.commonService.getDriverList().subscribe((res) => {
      this.driverLists = res;
    });
  }

  getExpList(): void {
    this.commonService.getExpList().subscribe((res) => {
      this.expmstList = res;
    });
  }


  get f() { return this.formTripsheet.controls; }
  
  get formDriverArray() {
    return this.formTripsheet.get("driverList") as FormArray;
  }

  get formRouteArray() {
    return this.formTripsheet.get("routeList") as FormArray;
  }

  get formAdblueArray() {
    return this.formTripsheet.get("adblueList") as FormArray;
  }


  get formDieselArray() {
    return this.formTripsheet.get("dieselList") as FormArray;
  }

  get formFasttagArray() {
    return this.formTripsheet.get("fasttagList") as FormArray;
  }

  get formDrExpTypeArray() {
    return this.formTripsheet.get("drExpList") as FormArray;
  }

  get formCmpExpTypeArray() {
    return this.formTripsheet.get("cmpExpList") as FormArray;
  }

  
  createDriverArray() {
    return this.formBuilder.group({
      pmtId: [''],
      pmtBranch: [''],
      pmtDate: [''],
      transType: [''],
      amountPaid: [''],
      remarks: [''],
      pmtType: [''],
    });
  }
  
  createRouteArray() {
    return this.formBuilder.group({
      loadId: [''],
      loadBranch:[''],
      loadDate: [''],
      loadType: [''],
      loadFor: [''],
      loadMemoNo: [''],
      loadingFrom: [''],
      consignorName: [''],
      loadingTo: [''],
      consigneeName: [''],
      loadWt: [''],
      unloadWt: [''],
      hireAmt: [''],
      remarks: [''],
    });
  }
  
  createDieselArray() {
    return this.formBuilder.group({
      detailID:  [''],
      transDate:  [''],
      dslQty:  [''],
      dslRate:  [''],
      amount:  [''],
      remarks: [''],
    });
  }
  createAdblueArray() {
    return this.formBuilder.group({
      pmtId:  [''],
      issueBranch:  [''],
      issueDate:  [''],
      issueParticulars:  [''],
      adblueLtrs: [''],
      adblueAmt: [''],
    });
  }
  
  
  createFasttagArray() {
    return this.formBuilder.group({
      detailID:  [''],
      transDate:  [''],
      ftAmount:  [''],
      remarks: [''],
    });
  }

  createTripDrExpArray() {
    return this.formBuilder.group({
      expId:  [''],
      expParticulars:  [''],
      expAmt:  [''],
    });
  }

  createTripCmpExpArray() {
    return this.formBuilder.group({
      enrouteExpId:  [''],
      expId:  [''],
      expParticulars:  [''],
      expAmt:  [''],
    });
  }

 
  selectNewEvent(item: any) {  
    this.requestmodel.strRequest = item.dataId;
    this.requestmodel.strRequest1 = this.year;
    this.tripSheetService.getNextTripNo(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.formTripsheet.patchValue({
          tripNo: this.responseDetails.message
        });
           

        if(this.responseDetails.message == "1")   {
          this.formTripsheet.controls['openingKMR'].enable();     
          this.formTripsheet.controls['opBalDsl'].enable();    
          this.formTripsheet.controls['opBalDriver'].enable();  
        }     
        else{            
          this.formTripsheet.controls['openingKMR'].disable();     
          this.formTripsheet.controls['opBalDsl'].disable();    
          this.formTripsheet.controls['opBalDriver'].disable(); 
          this.getNextTripSalDate(item);    
        }     
        this.getDslMileage(item.dataId);
        this.getOpeningBal(item.dataId);        
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
        this.formTripsheet.patchValue({
          tripNo: ""
        });  
      }   
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

  startWithFilter = function (vehicleList: Dropdownmodel[], query: string): any[] {
    return vehicleList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };  
  
  getDslMileage(e:any) {
    this.requestmodel.strRequest= e;
    this.commonService.getDslMileage(this.requestmodel).subscribe((res: Responsemodel) => {
      if(res.status){
        this.formTripsheet.patchValue({
          definedMileage : res.message
        });
      }
    });
  }
  
  getBhattaRate(e:any) {
    this.requestmodel.strRequest= e;
    this.commonService.getBhattaRate(this.requestmodel).subscribe((res: Responsemodel) => {
      if(res.status){
        this.formTripsheet.patchValue({
          bhattaRate : res.message
        });
      }
    });
  }
  getFoodCal() {
    var totalamt = 0;
   // var ltsDslToBe = 0;
  
    var selectedval = this.formTripsheet.getRawValue();
    var fsp= selectedval.food_Sal_PerDay  ? parseFloat(selectedval.food_Sal_PerDay ) : 0
    var fsd = selectedval.food_Sal_Days  ? parseFloat(selectedval.food_Sal_Days ) : 0

    totalamt = fsp*fsd;
    this.formTripsheet.patchValue({
  
      food_Sal_Amt: totalamt
     
    });   
    this.calTotal(); 
  }


  getOpeningBal(e:any) {
    var selectedDataValue = this.formTripsheet.getRawValue();
    this.filter.filterStr = e;
    this.filter.filterStr1 = selectedDataValue.tripNo ;
    this.filter.filterStr2 = this.year;
           
    this.commonService.getOpeningBal(this.filter).subscribe((res: Reportmodel) => {
      this.formTripsheet.patchValue({
        openingKMR : res.filterStr,
        opBalDsl: res.filterStr1,
        opBalDriver: res.filterStr2,
      });       
    });
  }
  

  getDetails(){
    var selectedDataValue = this.formTripsheet.getRawValue();
    if(selectedDataValue.deptDate =='' || selectedDataValue.endDate =='')
    {
      this.toastrService.warning("Please Select Dept  Date & End Date ");          
      return;

    }
    var validvehi = this.vehicleList.find(e => e.dataId == selectedDataValue.vehicleMasterID.dataId) 
    if (typeof validvehi !== 'undefined' && validvehi !== null && validvehi.dataId!="" && validvehi.dataId!="0") {
        //ignore
       this.detailMode= true;
    }
    else{
     // this.detailMode= true;
      this.toastrService.warning("Please Enter Valid  Vehicle No");          
      return;
    }

    var issuedDslLtrs = 0;
    var issuedDslAmt = 0;
    var fastagAmount = 0;
    var paidDriverAdvance = 0;
    var tripTotalFreight = 0;    
    var expensesByComp = 0;   
    var totalAdblueExp = 0; 

    var deptDate = new Date(selectedDataValue.deptDate);
    var endDate = new Date(selectedDataValue.endDate);    
    var diff = Math.abs(deptDate.getTime() - endDate.getTime());
    var totalBhattaDays  = Math.ceil(diff / (1000 * 3600 * 24)); 

    this.filter.fromDate = selectedDataValue.deptDate;
    this.filter.toDate = selectedDataValue.endDate;
    this.filter.filterStr = selectedDataValue.vehicleMasterID.dataId;
    
    this.tripSheetService.getTripSheetInnerSearchList(this.filter).subscribe((res: Tripsheetmodel) => {
      this.tripsheetmodel = res;
      this.formDriverArray.clear();
      this.formRouteArray.clear();
      this.formDieselArray.clear();
      this.formAdblueArray.clear();
    
     // this.formFasttagArray.clear();
      this.formCmpExpTypeArray.clear();

      for (var i = 0; i < res.driverList.length; i++) {
        this.formDriverArray.push(this.createDriverArray());
        this.formDriverArray.controls[i].get("pmtId")?.setValue(res.driverList[i].pmtId);
        this.formDriverArray.controls[i].get("pmtBranch")?.setValue(res.driverList[i].pmtBranch);
        this.formDriverArray.controls[i].get("pmtDate")?.setValue(this.commonService.formatDate(res.driverList[i].pmtDate));
        this.formDriverArray.controls[i].get("pmtType")?.setValue(res.driverList[i].pmtType);
        this.formDriverArray.controls[i].get("amountPaid")?.setValue(res.driverList[i].amountPaid);
        this.formDriverArray.controls[i].get("remarks")?.setValue(res.driverList[i].remarks);
        
        paidDriverAdvance = paidDriverAdvance + parseFloat(res.driverList[i].amountPaid);

        this.formDriverArray.controls[i].get("pmtBranch")?.disable();
        this.formDriverArray.controls[i].get("pmtDate")?.disable();
        this.formDriverArray.controls[i].get("pmtType")?.disable();
        this.formDriverArray.controls[i].get("amountPaid")?.disable();
        this.formDriverArray.controls[i].get("remarks")?.disable();
      }
      for (var i = 0; i < res.routeList.length; i++) {
        this.formRouteArray.push(this.createRouteArray());
        this.formRouteArray.controls[i].get("loadId")?.setValue(res.routeList[i].loadId);
        this.formRouteArray.controls[i].get("loadBranch")?.setValue(res.routeList[i].loadBranch);
        this.formRouteArray.controls[i].get("loadDate")?.setValue(this.commonService.formatDate(res.routeList[i].loadDate));
        this.formRouteArray.controls[i].get("loadType")?.setValue(res.routeList[i].loadType);
        this.formRouteArray.controls[i].get("loadFor")?.setValue(res.routeList[i].loadFor);
        this.formRouteArray.controls[i].get("loadMemoNo")?.setValue(res.routeList[i].loadMemoNo);
        this.formRouteArray.controls[i].get("loadingFrom")?.setValue(res.routeList[i].loadingFrom);
        this.formRouteArray.controls[i].get("consignorName")?.setValue(res.routeList[i].consignorName);
        this.formRouteArray.controls[i].get("loadingTo")?.setValue(res.routeList[i].loadingTo);
        this.formRouteArray.controls[i].get("consigneeName")?.setValue(res.routeList[i].consigneeName);
        this.formRouteArray.controls[i].get("loadWt")?.setValue(res.routeList[i].loadWt);
        this.formRouteArray.controls[i].get("unloadWt")?.setValue(res.routeList[i].unloadWt);
        this.formRouteArray.controls[i].get("hireAmt")?.setValue(res.routeList[i].hireAmt);
        this.formRouteArray.controls[i].get("remarks")?.setValue(res.routeList[i].remarks);

        tripTotalFreight = tripTotalFreight + parseFloat(res.routeList[i].hireAmt);

        this.formRouteArray.controls[i].get("loadBranch")?.disable();
        this.formRouteArray.controls[i].get("loadDate")?.disable();
        this.formRouteArray.controls[i].get("loadType")?.disable();
        this.formRouteArray.controls[i].get("loadFor")?.disable();
        this.formRouteArray.controls[i].get("loadMemoNo")?.disable();
        this.formRouteArray.controls[i].get("loadingFrom")?.disable();
        this.formRouteArray.controls[i].get("consignorName")?.disable();
        this.formRouteArray.controls[i].get("loadingTo")?.disable();
        this.formRouteArray.controls[i].get("consigneeName")?.disable();
        this.formRouteArray.controls[i].get("loadWt")?.disable();
        this.formRouteArray.controls[i].get("hireAmt")?.disable();
        this.formRouteArray.controls[i].get("remarks")?.disable();
      }
    
      for (var i = 0; i < res.dieselList.length; i++) {
        this.formDieselArray.push(this.createDieselArray());
        this.formDieselArray.controls[i].get("detailID")?.setValue(res.dieselList[i].detailID);
        this.formDieselArray.controls[i].get("transDate")?.setValue(this.commonService.formatDate(res.dieselList[i].transDate));
        this.formDieselArray.controls[i].get("dslQty")?.setValue(res.dieselList[i].dslQty);
        this.formDieselArray.controls[i].get("dslRate")?.setValue(res.dieselList[i].dslRate);
        this.formDieselArray.controls[i].get("amount")?.setValue(res.dieselList[i].amount);
        this.formDieselArray.controls[i].get("remarks")?.setValue(res.dieselList[i].remarks);

        issuedDslLtrs = issuedDslLtrs + parseFloat(res.dieselList[i].dslQty);
        issuedDslAmt = issuedDslAmt + parseFloat(res.dieselList[i].amount);

        this.formDieselArray.controls[i].get("transDate")?.disable();
        this.formDieselArray.controls[i].get("dslQty")?.disable();
        this.formDieselArray.controls[i].get("dslRate")?.disable();
        this.formDieselArray.controls[i].get("amount")?.disable();
        this.formDieselArray.controls[i].get("remarks")?.disable();
      }
      for (var i = 0; i < res.adblueList.length; i++) {
        this.formAdblueArray.push(this.createAdblueArray());
        this.formAdblueArray.controls[i].get("pmtId")?.setValue(res.adblueList[i].pmtId);
        this.formAdblueArray.controls[i].get("issueBranch")?.setValue(res.adblueList[i].issueBranch);
        this.formAdblueArray.controls[i].get("issueDate")?.setValue(this.commonService.formatDate(res.adblueList[i].issueDate));
        this.formAdblueArray.controls[i].get("issueParticulars")?.setValue(res.adblueList[i].issueParticulars);
        this.formAdblueArray.controls[i].get("adblueLtrs")?.setValue(res.adblueList[i].adblueLtrs);
        this.formAdblueArray.controls[i].get("adblueAmt")?.setValue(res.adblueList[i].adblueAmt);
       

        totalAdblueExp = totalAdblueExp + parseFloat(res.adblueList[i].adblueAmt);

        this.formAdblueArray.controls[i].get("issueDate")?.disable();
        this.formAdblueArray.controls[i].get("issueParticulars")?.disable();
        this.formAdblueArray.controls[i].get("adblueLtrs")?.disable();
        this.formAdblueArray.controls[i].get("adblueAmt")?.disable();
      }

      // for (var i = 0; i < res.fasttagList.length; i++) {
      //   this.formFasttagArray.push(this.createFasttagArray());
      //   this.formFasttagArray.controls[i].get("detailID")?.setValue(res.fasttagList[i].detailID);
      //   this.formFasttagArray.controls[i].get("transDate")?.setValue(this.commonService.formatDate(res.fasttagList[i].transDate));
      //   this.formFasttagArray.controls[i].get("ftAmount")?.setValue(res.fasttagList[i].ftAmount);
      //   this.formFasttagArray.controls[i].get("remarks")?.setValue(res.fasttagList[i].remarks);

      //   fastagAmount = fastagAmount + parseFloat(res.fasttagList[i].ftAmount);

      // //   this.formFasttagArray.controls[i].get("transDate")?.disable();
      // //   this.formFasttagArray.controls[i].get("ftAmount")?.disable();
      // //   this.formFasttagArray.controls[i].get("remarks")?.disable();
      //  }

      
      for (var i = 0; i < res.cmpExpList.length; i++) {
        this.formCmpExpTypeArray.push(this.createTripCmpExpArray());
        this.formCmpExpTypeArray.controls[i].get("enrouteExpId")?.setValue(res.cmpExpList[i].enrouteExpId);
        this.formCmpExpTypeArray.controls[i].get("expId")?.setValue(res.cmpExpList[i].expId);
        this.formCmpExpTypeArray.controls[i].get("expParticulars")?.setValue(res.cmpExpList[i].expParticulars);
        this.formCmpExpTypeArray.controls[i].get("expAmt")?.setValue(res.cmpExpList[i].expAmt);

        expensesByComp = expensesByComp + parseFloat(res.cmpExpList[i].expAmt);

        this.formCmpExpTypeArray.controls[i].get("expId")?.disable();
        this.formCmpExpTypeArray.controls[i].get("expParticulars")?.disable();
        this.formCmpExpTypeArray.controls[i].get("expAmt")?.disable();
      }

      var bhattaRate =selectedDataValue.bhattaRate == ""? 0: parseFloat(selectedDataValue.bhattaRate);
      var clBalDsl =(selectedDataValue.opBalDsl == ""? 0:parseFloat(selectedDataValue.opBalDsl)) + issuedDslLtrs
                    - (selectedDataValue.dieselPassedLtrs == ""? 0:parseFloat(selectedDataValue.dieselPassedLtrs));

      this.formTripsheet.patchValue({
        issuedDslLtrs : issuedDslLtrs.toFixed(2),
        issuedDslAmt: issuedDslAmt.toFixed(2), 
        dieselPassedLtrs: issuedDslLtrs.toFixed(2),
        dieselPassedAmt: issuedDslAmt.toFixed(2), 
        totalAdblueExp : totalAdblueExp.toFixed(2), 
        fastagAmount: fastagAmount.toFixed(2), 
        clBalDsl: clBalDsl.toFixed(2), 
        totalBhattaDays: totalBhattaDays,
        bhattaAmt: (bhattaRate * totalBhattaDays).toFixed(2), 
        tripTotalFreight: tripTotalFreight.toFixed(2),
        paidDriverAdvance: paidDriverAdvance.toFixed(2),
        expensesByComp: expensesByComp.toFixed(2),
      });
    }); 
  }

  getTripSheetInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedTripSheetDetails.tripId;

    this.tripSheetService.getTripSheetInnerGridList(this.requestmodel).subscribe((res: Tripsheetmodel) => {
      this.tripsheetmodel = res;
      this.formDriverArray.clear();
      this.formRouteArray.clear();
      this.formDieselArray.clear();
      this.formFasttagArray.clear();
      this.formAdblueArray.clear();
      this.formCmpExpTypeArray.clear();
      
      for (var i = 0; i < res.driverList.length; i++) {
        this.formDriverArray.push(this.createDriverArray());
        this.formDriverArray.controls[i].get("pmtId")?.setValue(res.driverList[i].pmtId);
        this.formDriverArray.controls[i].get("pmtBranch")?.setValue(res.driverList[i].pmtBranch);
        this.formDriverArray.controls[i].get("pmtDate")?.setValue(this.commonService.formatDate(res.driverList[i].pmtDate));
        this.formDriverArray.controls[i].get("pmtType")?.setValue(res.driverList[i].pmtType);
        this.formDriverArray.controls[i].get("amountPaid")?.setValue(res.driverList[i].amountPaid);
        this.formDriverArray.controls[i].get("remarks")?.setValue(res.driverList[i].remarks);
        
        
        this.formDriverArray.controls[i].get("pmtBranch")?.disable();
        this.formDriverArray.controls[i].get("pmtDate")?.disable();
        this.formDriverArray.controls[i].get("pmtType")?.disable();
        this.formDriverArray.controls[i].get("amountPaid")?.disable();
        this.formDriverArray.controls[i].get("remarks")?.disable();
      }
      for (var i = 0; i < res.routeList.length; i++) {
        this.formRouteArray.push(this.createRouteArray());
        this.formRouteArray.controls[i].get("loadId")?.setValue(res.routeList[i].loadId);
        this.formRouteArray.controls[i].get("loadBranch")?.setValue(res.routeList[i].loadBranch);
        this.formRouteArray.controls[i].get("loadDate")?.setValue(this.commonService.formatDate(res.routeList[i].loadDate));
        this.formRouteArray.controls[i].get("loadType")?.setValue(res.routeList[i].loadType);
        this.formRouteArray.controls[i].get("loadFor")?.setValue(res.routeList[i].loadFor);
        this.formRouteArray.controls[i].get("loadMemoNo")?.setValue(res.routeList[i].loadMemoNo);
        this.formRouteArray.controls[i].get("loadingFrom")?.setValue(res.routeList[i].loadingFrom);
        this.formRouteArray.controls[i].get("consignorName")?.setValue(res.routeList[i].consignorName);
        this.formRouteArray.controls[i].get("loadingTo")?.setValue(res.routeList[i].loadingTo);
        this.formRouteArray.controls[i].get("consigneeName")?.setValue(res.routeList[i].consigneeName);
        this.formRouteArray.controls[i].get("loadWt")?.setValue(res.routeList[i].loadWt);
        this.formRouteArray.controls[i].get("unloadWt")?.setValue(res.routeList[i].unloadWt);
        this.formRouteArray.controls[i].get("hireAmt")?.setValue(res.routeList[i].hireAmt);
        this.formRouteArray.controls[i].get("remarks")?.setValue(res.routeList[i].remarks);

        this.formRouteArray.controls[i].get("loadBranch")?.disable();
        this.formRouteArray.controls[i].get("loadDate")?.disable();
        this.formRouteArray.controls[i].get("loadType")?.disable();
        this.formRouteArray.controls[i].get("loadFor")?.disable();
        this.formRouteArray.controls[i].get("loadMemoNo")?.disable();
        this.formRouteArray.controls[i].get("loadingFrom")?.disable();
        this.formRouteArray.controls[i].get("consignorName")?.disable();
        this.formRouteArray.controls[i].get("loadingTo")?.disable();
        this.formRouteArray.controls[i].get("consigneeName")?.disable();
        this.formRouteArray.controls[i].get("loadWt")?.disable();
        this.formRouteArray.controls[i].get("hireAmt")?.disable();
        this.formRouteArray.controls[i].get("remarks")?.disable();
      }
      for (var i = 0; i < res.adblueList.length; i++) {
        this.formAdblueArray.push(this.createAdblueArray());

        this.formAdblueArray.controls[i].get("pmtId")?.setValue(res.adblueList[i].pmtId);
        this.formAdblueArray.controls[i].get("issueBranch")?.setValue(res.adblueList[i].issueBranch);
        this.formAdblueArray.controls[i].get("issueDate")?.setValue(this.commonService.formatDate(res.adblueList[i].issueDate));
        this.formAdblueArray.controls[i].get("issueParticulars")?.setValue(res.adblueList[i].issueParticulars);
        this.formAdblueArray.controls[i].get("adblueAmt")?.setValue(res.adblueList[i].adblueAmt);
        this.formAdblueArray.controls[i].get("adblueLtrs")?.setValue(res.adblueList[i].adblueLtrs);
        
        this.formAdblueArray.controls[i].get("pmtId")?.disable();
        this.formAdblueArray.controls[i].get("issueBranch")?.disable();
        this.formAdblueArray.controls[i].get("issueDate")?.disable();
        this.formAdblueArray.controls[i].get("issueParticulars")?.disable();
        this.formAdblueArray.controls[i].get("adblueAmt")?.disable();
        this.formAdblueArray.controls[i].get("adblueLtrs")?.disable();

      }
      
      for (var i = 0; i < res.adblueList.length; i++) {
        this.formDieselArray.push(this.createDieselArray());
        this.formDieselArray.controls[i].get("detailID")?.setValue(res.dieselList[i].detailID);
        this.formDieselArray.controls[i].get("transDate")?.setValue(this.commonService.formatDate(res.dieselList[i].transDate));
        this.formDieselArray.controls[i].get("dslQty")?.setValue(res.dieselList[i].dslQty);
        this.formDieselArray.controls[i].get("dslRate")?.setValue(res.dieselList[i].dslRate);
        this.formDieselArray.controls[i].get("amount")?.setValue(res.dieselList[i].amount);
        this.formDieselArray.controls[i].get("remarks")?.setValue(res.dieselList[i].remarks);
        
        this.formDieselArray.controls[i].get("transDate")?.disable();
        this.formDieselArray.controls[i].get("dslQty")?.disable();
        this.formDieselArray.controls[i].get("dslRate")?.disable();
        this.formDieselArray.controls[i].get("amount")?.disable();
        this.formDieselArray.controls[i].get("remarks")?.disable();
      }


      for (var i = 0; i < res.fasttagList.length; i++) {
        this.formFasttagArray.push(this.createFasttagArray());
        this.formFasttagArray.controls[i].get("detailID")?.setValue(res.fasttagList[i].detailID);
        this.formFasttagArray.controls[i].get("transDate")?.setValue(this.commonService.formatDate(res.fasttagList[i].transDate));
        this.formFasttagArray.controls[i].get("ftAmount")?.setValue(res.fasttagList[i].ftAmount);
        this.formFasttagArray.controls[i].get("remarks")?.setValue(res.fasttagList[i].remarks);

        this.formFasttagArray.controls[i].get("transDate")?.disable();
        this.formFasttagArray.controls[i].get("ftAmount")?.disable();
        this.formFasttagArray.controls[i].get("remarks")?.disable();
      }
      
      for (var i = 0; i < res.drExpList.length; i++) {
        this.formDrExpTypeArray.push(this.createTripDrExpArray());
        this.formDrExpTypeArray.controls[i].get("expId")?.setValue(res.drExpList[i].expId);
        this.formDrExpTypeArray.controls[i].get("expParticulars")?.setValue(res.drExpList[i].expParticulars);
        this.formDrExpTypeArray.controls[i].get("expAmt")?.setValue(res.drExpList[i].expAmt);

        this.formDrExpTypeArray.controls[i].get("expId")?.disable();
        this.formDrExpTypeArray.controls[i].get("expParticulars")?.disable();
        this.formDrExpTypeArray.controls[i].get("expAmt")?.disable();
      }
      
      for (var i = 0; i < res.cmpExpList.length; i++) {
        this.formCmpExpTypeArray.push(this.createTripCmpExpArray());
        this.formCmpExpTypeArray.controls[i].get("expId")?.setValue(res.cmpExpList[i].expId);
        this.formCmpExpTypeArray.controls[i].get("expParticulars")?.setValue(res.cmpExpList[i].expParticulars);
        this.formCmpExpTypeArray.controls[i].get("expAmt")?.setValue(res.cmpExpList[i].expAmt);

        this.formCmpExpTypeArray.controls[i].get("expId")?.disable();
        this.formCmpExpTypeArray.controls[i].get("expParticulars")?.disable();
        this.formCmpExpTypeArray.controls[i].get("expAmt")?.disable();
      }
    });
  }
  getSalDays(){
    var selectedDataValue = this.formTripsheet.getRawValue();
    var date1 = new Date(selectedDataValue.food_Sal_FromDt);
    var date2 = new Date(selectedDataValue.food_Sal_ToDt);
   
  
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
  
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  
    Difference_In_Days = Math.abs(Difference_In_Days)

    if (!Number.isNaN(Difference_In_Days)) {
      Difference_In_Days= Difference_In_Days+1;
      this.formTripsheet.patchValue({
        food_Sal_Days: (Difference_In_Days).toString()
  
      });
    }
    else {
      this.formTripsheet.patchValue({
        food_Sal_Days: '0'
  
      });
  
    }
    this.getFoodCal();
  }
  getNextTripSalDate(item: any){
  
    //var selectedDataValue = this.formTripsheet.getRawValue();

    this.requestmodel.strRequest = item.dataId;
    this.requestmodel.strRequest1 = this.year;
    this.tripSheetService.getNextTripSalDate(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
     
        var selectedDataValue = this.formTripsheet.getRawValue();
 // if(selectedDataValue.tripNo<1){
 
 let date1= this.commonService.formatDate(this.responseDetails.message)
    let date: Date = new Date(date1);


    date.setDate(date.getDate() + 1)
    let date2 = (date).toISOString()
    this.formTripsheet.patchValue({
      food_Sal_FromDt: date2.split("T")[0],
    });
 // }
  });
  
  
}

  calTotal(){
    var selectedDataValue = this.formTripsheet.getRawValue();
    var opBalDriver = selectedDataValue.opBalDriver==''?0:parseFloat(selectedDataValue.opBalDriver);
    var paidDriverAdvance = selectedDataValue.paidDriverAdvance==''?0:parseFloat(selectedDataValue.paidDriverAdvance);
    var freightCollByDriver = selectedDataValue.freightCollByDriver==''?0:parseFloat(selectedDataValue.freightCollByDriver);
    var expensesByDriver = selectedDataValue.expensesByDriver==''?0:parseFloat(selectedDataValue.expensesByDriver);
    var bhattaAmt = selectedDataValue.bhattaAmt==''?0:parseFloat(selectedDataValue.bhattaAmt);
    var onTimeIncentiveAmt = selectedDataValue.onTimeIncentiveAmt==''?0:parseFloat(selectedDataValue.onTimeIncentiveAmt);
    var multiDelIncentiveAmt = selectedDataValue.multiDelIncentiveAmt==''?0:parseFloat(selectedDataValue.multiDelIncentiveAmt);
    var penaltyChargedToDr = selectedDataValue.penaltyChargedToDr==''?0:parseFloat(selectedDataValue.penaltyChargedToDr);
    var dieselVarianceAmt = selectedDataValue.dieselVarianceAmt==''?0:parseFloat(selectedDataValue.dieselVarianceAmt);
    var recdFromDriver = selectedDataValue.recdFromDriver==''?0:parseFloat(selectedDataValue.recdFromDriver);
    var dieselPassedAmt = selectedDataValue.dieselPassedAmt==''?0:parseFloat(selectedDataValue.dieselPassedAmt);
    var fastagAmount = selectedDataValue.fastagAmount==''?0:parseFloat(selectedDataValue.fastagAmount);
    var expensesByComp = selectedDataValue.expensesByComp==''?0:parseFloat(selectedDataValue.expensesByComp);
    var foodsal = selectedDataValue.food_Sal_Amt==''?0:parseFloat(selectedDataValue.food_Sal_Amt);
    var rtaAmt =  selectedDataValue.rtaChallanAmt==''?0:parseFloat(selectedDataValue.rtaChallanAmt);
    var adblueExp  =selectedDataValue.totalAdblueExp==''?0:parseFloat(selectedDataValue.totalAdblueExp);
    
    var tripBalance = opBalDriver + paidDriverAdvance + freightCollByDriver
                      - expensesByDriver - bhattaAmt + penaltyChargedToDr - foodsal
                      - onTimeIncentiveAmt - multiDelIncentiveAmt - rtaAmt;

    var netTripBalance = tripBalance - recdFromDriver;
    // var tripTotalExpenses = expensesByDriver + dieselPassedAmt + fastagAmount + bhattaAmt 
    //                   + onTimeIncentiveAmt + multiDelIncentiveAmt + expensesByComp + foodsal + rtaAmt
   
    var tripTotalExpenses = expensesByDriver  + bhattaAmt  + 
                      onTimeIncentiveAmt + multiDelIncentiveAmt 
                      - penaltyChargedToDr + fastagAmount 
                      + expensesByComp + adblueExp + dieselPassedAmt + foodsal + rtaAmt

    this.formTripsheet.patchValue({
      tripBalance: tripBalance.toFixed(2),
      netTripBalance: netTripBalance.toFixed(2),
      tripTotalExpenses: tripTotalExpenses.toFixed(2),
    });  
  }
 





  calDetentionDays(){    
    var selectedDataValue = this.formTripsheet.getRawValue();
 
    //calculation
    var date1 = new Date(selectedDataValue.reportDateTime);
    var date2 = new Date(selectedDataValue.unloadDateTime);
   
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
 
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    if (!Number.isNaN(Difference_In_Days)) {
      this.formTripsheet.patchValue({
        detentionDays: (Difference_In_Days).toString()
      });
    }
    else {
      this.formTripsheet.patchValue({
        detentionDays: '0'
      });  
    }
  }
  

  changeTripClose(e:any){
    if(e.target.checked){
      this.formTripsheet.controls['tripCloseDt'].enable();
      this.formTripsheet.patchValue({
        tripCloseDt: this.loginDate,
      });  
    }
    else {
      this.formTripsheet.controls['tripCloseDt'].disable();
      this.formTripsheet.patchValue({
        tripCloseDt: "",
      });  
    }
  }

  onKmrChange(){
    var totaldistanceTripKM = 0;
    var ltsDslToBe = 0;
  
    var selectedval = this.formTripsheet.getRawValue();
    var cKMR= selectedval.closingKMR ? parseFloat(selectedval.closingKMR) : 0
    var oKMR= selectedval.openingKMR ? parseFloat(selectedval.openingKMR) : 0

    totaldistanceTripKM = cKMR-oKMR;

    if(totaldistanceTripKM > 0){
      if(selectedval.definedMileage!=0){
        ltsDslToBe = totaldistanceTripKM/parseFloat(selectedval.definedMileage);
      }
  
      this.formTripsheet.patchValue({
        distanceTripKM : totaldistanceTripKM,
        ltsDslToBe:ltsDslToBe.toFixed(2),
      });
    }
    else{
      this.formTripsheet.patchValue({
        closingKMR: "",
        distanceTripKM : "",
        ltsDslToBe:"",
      });
      
      this.toastrService.warning("Invalid Distance Trip KM");
      return;
    }    
  }  

  onExpAmt(){    
    var expensesByDriver = 0;
    var selectedDataValue = this.formTripsheet.getRawValue();
    for (var i = 0; i < selectedDataValue.drExpList.length; i++) {
      if(selectedDataValue.drExpList[i].expId!=''){
        expensesByDriver = expensesByDriver + parseFloat(selectedDataValue.drExpList[i].expAmt);
      }
    }
    this.formTripsheet.patchValue({
      expensesByDriver: expensesByDriver.toFixed(2),
    });
    this.calTotal();
  }

  onDieselPassed(){
    var dieselPassedAmt = 0;
    var rate = 0;

    var selectedval = this.formTripsheet.getRawValue();
    var clBalDsl =(selectedval.opBalDsl == ""? 0:parseFloat(selectedval.opBalDsl)) 
          + (selectedval.issuedDslLtrs == ""? 0:parseFloat(selectedval.issuedDslLtrs))
          - (selectedval.dieselPassedLtrs == ""? 0:parseFloat(selectedval.dieselPassedLtrs));

    if(parseFloat(selectedval.issuedDslLtrs)>0){
      rate = parseFloat(selectedval.issuedDslAmt)/ parseFloat(selectedval.issuedDslLtrs);
    }
    dieselPassedAmt = parseFloat(selectedval.dieselPassedLtrs) * rate;
    this.formTripsheet.patchValue({
      dieselPassedAmt: dieselPassedAmt.toFixed(2),
      clBalDsl: clBalDsl.toFixed(2),
      dieselVarianceAmt : Math.round(parseFloat(selectedval.issuedDslAmt) - dieselPassedAmt).toFixed(2),
    });
    this.calTotal();
  }

    
  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formDrExpTypeArray.removeAt(index);
      this.onExpAmt();
    }
  }
  removeItem2(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formFasttagArray.removeAt(index);
      this.onExpAmt();
    }
  }

  addItem(index: number): void { 
    if (this.formDrExpTypeArray.value[index].expId != "" && 
      this.formDrExpTypeArray.value[index].expParticulars != "" && 
      this.formDrExpTypeArray.value[index].expAmt != "" ) {
      this.formDrExpTypeArray.push(this.createTripDrExpArray());      
    } 
    else {
      this.toastrService.warning("Please select Required Fields ");
    }
  }
  addItem2(index: number): void { 
    if (this.formFasttagArray.value[index].transDate != "" && 
      this.formFasttagArray.value[index].ftAmount != "" && 
      this.formFasttagArray.value[index].remarks != "" ) {
      this.formFasttagArray.push(this.createFasttagArray());      
    } 
    else {
      this.toastrService.warning("Please select Required Fields ");
    }
  }

  
  deleteTripsheetForm(): void {
    this.requestmodel.strRequest =this.selectedTripSheetDetails.tripId;
    if (confirm("Are you sure, you want to delete this?")) {
      this.tripSheetService.tripMasterDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.toastrService.success(this.responseDetails.message);
          this.formTripsheet.reset();
          this.route.navigate(['/tripsheetjetlist']);
        }
        else {
          this.toastrService.warning(this.responseDetails.message);
        }
      });
    }
  }  

  exit(): void {    
    this.route.navigate(['/tripsheetjetlist']);
  }


  //Submit user form details //
  submitTripSheetForm(): void {
    this.formSubmitted = true;
    if (this.formTripsheet.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields"); 
      const controls = this.formTripsheet.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    
    var selectedDataValue = this.formTripsheet.getRawValue();

    var validdriver = this.driverLists.find(e => e.dataId == selectedDataValue.driverMasterID.dataId) 
    if (typeof validdriver !== 'undefined' && validdriver !== null && validdriver.dataId!="" && validdriver.dataId!="0") {
        //ignore
    }
    else{
      this.toastrService.warning("Please Enter Valid  Driver Name");          
      return;
    }
    var validvehi = this.vehicleList.find(e => e.dataId == selectedDataValue.vehicleMasterID.dataId) 
    if (typeof validvehi !== 'undefined' && validvehi !== null && validvehi.dataId!="" && validvehi.dataId!="0") {
        //ignore
    }
    else{
      this.toastrService.warning("Please Enter Valid  Vehicle No");          
      return;
    }

    this.tripsheetmodel.tripId = this.selectedTripSheetDetails.tripId ;
    this.tripsheetmodel.tripBranch = selectedDataValue.tripBranch;
    this.tripsheetmodel.tripNo = selectedDataValue.tripNo;
    this.tripsheetmodel.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
    this.tripsheetmodel.deptDate = selectedDataValue.deptDate;
    this.tripsheetmodel.endDate = selectedDataValue.endDate;
    this.tripsheetmodel.stmtDate = selectedDataValue.stmtDate;
    this.tripsheetmodel.tripStatus = selectedDataValue.tripStatus?"Y":"N";
    this.tripsheetmodel.driverMasterID = selectedDataValue.driverMasterID.dataId;
    this.tripsheetmodel.definedMileage = selectedDataValue.definedMileage.toString();
    this.tripsheetmodel.closingKMR = selectedDataValue.closingKMR.toString();
    this.tripsheetmodel.openingKMR= selectedDataValue.openingKMR.toString();
    this.tripsheetmodel.distanceTripKM= selectedDataValue.distanceTripKM.toString();
    this.tripsheetmodel.ltsDslToBe= selectedDataValue.ltsDslToBe.toString();
    this.tripsheetmodel.opBalDsl= selectedDataValue.opBalDsl.toString();
    this.tripsheetmodel.issuedDslLtrs= selectedDataValue.issuedDslLtrs.toString();
    this.tripsheetmodel.issuedDslAmt= selectedDataValue.issuedDslAmt.toString();
    this.tripsheetmodel.dieselPassedLtrs= selectedDataValue.dieselPassedLtrs.toString();
    this.tripsheetmodel.dieselPassedAmt= selectedDataValue.dieselPassedAmt.toString();
    this.tripsheetmodel.dieselVarianceAmt= selectedDataValue.dieselVarianceAmt.toString();
    this.tripsheetmodel.clBalDsl= selectedDataValue.clBalDsl.toString();
    this.tripsheetmodel.opBalDriver= selectedDataValue.opBalDriver.toString();
    this.tripsheetmodel.paidDriverAdvance= selectedDataValue.paidDriverAdvance.toString();
    this.tripsheetmodel.freightCollByDriver= selectedDataValue.freightCollByDriver.toString();
    this.tripsheetmodel.expensesByDriver= selectedDataValue.expensesByDriver.toString();
    this.tripsheetmodel.totalAdblueExp= selectedDataValue.totalAdblueExp.toString();    
    this.tripsheetmodel.totalBhattaDays= selectedDataValue.totalBhattaDays.toString();
    this.tripsheetmodel.bhattaRate= selectedDataValue.bhattaRate.toString();
    this.tripsheetmodel.bhattaAmt= selectedDataValue.bhattaAmt.toString();
    this.tripsheetmodel.onTimeIncentiveAmt= selectedDataValue.onTimeIncentiveAmt.toString();
    this.tripsheetmodel.multiDelIncentiveAmt= selectedDataValue.multiDelIncentiveAmt.toString();
    this.tripsheetmodel.penaltyChargedToDr= selectedDataValue.penaltyChargedToDr.toString();
    this.tripsheetmodel.penaltyRemarks= selectedDataValue.penaltyRemarks.toString().toUpperCase();
    this.tripsheetmodel.tripBalance= selectedDataValue.tripBalance.toString();
    this.tripsheetmodel.recdFromDriver= selectedDataValue.recdFromDriver.toString();
    this.tripsheetmodel.netTripBalance= selectedDataValue.netTripBalance.toString();
    this.tripsheetmodel.fastagAmount= selectedDataValue.fastagAmount.toString();
    this.tripsheetmodel.tripTotalFreight= selectedDataValue.tripTotalFreight.toString();
    this.tripsheetmodel.tripTotalExpenses= selectedDataValue.tripTotalExpenses.toString();
    this.tripsheetmodel.expensesByComp= selectedDataValue.expensesByComp.toString();
    this.tripsheetmodel.tripCloseDt= selectedDataValue.tripCloseDt;
    this.tripsheetmodel.tripLinkYN = selectedDataValue.tripLinkYN?"Y":"N";
    this.tripsheetmodel.reportDateTime= selectedDataValue.reportDateTime;
    this.tripsheetmodel.unloadDateTime= selectedDataValue.unloadDateTime;
    this.tripsheetmodel.detentionDays= selectedDataValue.detentionDays;
    this.tripsheetmodel.food_Sal_PerDay = selectedDataValue.food_Sal_PerDay;
    this.tripsheetmodel.food_Sal_FromDt = selectedDataValue.food_Sal_FromDt;
    this.tripsheetmodel.food_Sal_ToDt  = selectedDataValue.food_Sal_ToDt;
    this.tripsheetmodel.food_Sal_Days  = selectedDataValue.food_Sal_Days;
    this.tripsheetmodel.food_Sal_Amt  = selectedDataValue.food_Sal_Amt.toString(); 
    this.tripsheetmodel.rtaChallanDesc   = selectedDataValue.rtaChallanDesc;
    this.tripsheetmodel.rtaChallanAmt   = selectedDataValue.rtaChallanAmt ;
    this.tripsheetmodel.yearId = this.year;
    this.tripsheetmodel.loggedInUser = this.loggedInUserID;

    this.tripsheetmodel.driverList = [];
    this.tripsheetmodel.routeList = [];
    this.tripsheetmodel.dieselList = [];
    this.tripsheetmodel.fasttagList = [];
    this.tripsheetmodel.drExpList = [];
    this.tripsheetmodel.adblueList = [];

    for (var i = 0; i < selectedDataValue.driverList.length; i++) {
      if(selectedDataValue.driverList[i].pmtId!=''){
        this.tripsheetmodel.driverList.push({
          'pmtId': selectedDataValue.driverList[i].pmtId,
          'pmtBranch':  selectedDataValue.driverList[i].pmtBranch,
          'pmtDate':  selectedDataValue.driverList[i].pmtDate,
          'transType':  selectedDataValue.driverList[i].transType,
          'amountPaid':  selectedDataValue.driverList[i].amountPaid,
          'remarks':  selectedDataValue.driverList[i].remarks,
          'pmtType': selectedDataValue.driverList[i].pmtType,
        })
      }
    }
    
    for (var i = 0; i < selectedDataValue.routeList.length; i++) {
      if(selectedDataValue.routeList[i].loadId!=''){
        var loadingfrom= this.locationList.find(e => e.dataName == selectedDataValue.routeList[i].loadingFrom) 
        var loadingto= this.locationList.find(e => e.dataName == selectedDataValue.routeList[i].loadingTo) 
        this.tripsheetmodel.routeList.push({
          'loadId': selectedDataValue.routeList[i].loadId,
          'loadBranch': selectedDataValue.routeList[i].loadBranch,
          'loadDate':  selectedDataValue.routeList[i].loadDate,
          'loadType':  selectedDataValue.routeList[i].loadType,
          'loadFor': selectedDataValue.routeList[i].loadFor,
          'loadMemoNo':  selectedDataValue.routeList[i].loadMemoNo,
          'loadingFrom': loadingfrom?loadingfrom.dataId:"" ,
          'consignorName':  selectedDataValue.routeList[i].consignorName,
          'loadingTo':  loadingto?loadingto.dataId:"" ,
          'consigneeName':  selectedDataValue.routeList[i].consigneeName,
          'loadWt':  selectedDataValue.routeList[i].loadWt,
          'unloadWt':  selectedDataValue.routeList[i].unloadWt,
          'hireAmt':  selectedDataValue.routeList[i].hireAmt,
          'remarks':  selectedDataValue.routeList[i].remarks,
        })
      }
    }

    for (var i = 0; i < selectedDataValue.dieselList.length; i++) {
      if(selectedDataValue.dieselList[i].detailID!=''){
        this.tripsheetmodel.dieselList.push({
          'detailID': selectedDataValue.dieselList[i].detailID,
          'transDate': selectedDataValue.dieselList[i].transDate,
          'dslQty':  selectedDataValue.dieselList[i].dslQty,
          'dslRate':  selectedDataValue.dieselList[i].dslRate,
          'amount':  selectedDataValue.dieselList[i].amount,
          'remarks': selectedDataValue.dieselList[i].remarks,
        })
      }
    }
    for (var i = 0; i < selectedDataValue.adblueList.length; i++) {
      if(selectedDataValue.adblueList[i].detailID!=''){
        this.tripsheetmodel.adblueList.push({
          'tripId': "",
          'pmtId': selectedDataValue.adblueList[i].pmtId,
          'issueBranch':  selectedDataValue.adblueList[i].issueBranch,
          'issueDate':  selectedDataValue.adblueList[i].issueDate,
          'issueParticulars':  selectedDataValue.adblueList[i].issueParticulars,
          'adblueLtrs': selectedDataValue.adblueList[i].adblueLtrs,
          'adblueAmt': selectedDataValue.adblueList[i].adblueAmt,
        })
      }
    }
    
    for (var i = 0; i < selectedDataValue.fasttagList.length; i++) {
      if(selectedDataValue.fasttagList[i].transDate!=''){
        this.tripsheetmodel.fasttagList.push({
          'detailID': selectedDataValue.fasttagList[i].detailID,
          'transDate': selectedDataValue.fasttagList[i].transDate,
          'ftAmount':  selectedDataValue.fasttagList[i].ftAmount,
          'remarks': selectedDataValue.fasttagList[i].remarks,
        })
      }
    }
    
    for (var i = 0; i < selectedDataValue.drExpList.length; i++) {
      if(selectedDataValue.drExpList[i].expId!=''){
        this.tripsheetmodel.drExpList.push({
          'expId': selectedDataValue.drExpList[i].expId,
          'expParticulars':  selectedDataValue.drExpList[i].expParticulars,
          'expAmt':  selectedDataValue.drExpList[i].expAmt,
         })
      }
    }

    this.tripSheetService.tripSheetDetailsSubmitted(this.tripsheetmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success("Saved succsessfully");
        this.formTripsheet.reset();
        this.route.navigate(['/tripsheetjetlist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }   
    });
  }

}

