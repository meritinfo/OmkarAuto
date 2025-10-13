import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tripmastermodel } from 'src/app/models/tripmastermodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { TripSheetService } from 'src/app/services/tripsheet.service';
import { SharedService } from 'src/app/services/shared.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';
import { Reportmodel } from 'src/app/models/reportmodel';

@Component({
  selector: 'app-tripsheetgsafeadd',
  templateUrl: './tripsheetgsafeadd.component.html',
  styleUrls: ['./tripsheetgsafeadd.component.css']
})
export class TripsheetgsafeaddComponent {
  loggedInUserID: string = '';
  year: string = '';
  loginDate: string = '';
  branch:string = '';
  minDate: string = '';  
  createdBy : string = "";
  modifiedBy: string = "";

  maxDate: string = '';
  fromDate: string = '';

  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
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

  selectedTripSheetDetails = new Tripmastermodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tripsheetmodel: Tripmastermodel, private tripSheetService: TripSheetService, 
    private commonService: CommonService, private sharedService: SharedService, 
    private requestmodel:Requestmodel,
    private toastrService: ToastrService) {
    this.tripsheetmodel = new Tripmastermodel();

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
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
    }
        
    this.sharedService.loggedInStatus = true;
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

      
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;

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
      definedMileage: new FormControl('',[Validators.required]),
      closingKMR:new FormControl('',[Validators.required]),
      openingKMR: new FormControl('',),
      distanceTripKM: new FormControl('',[Validators.required]),
      ltsDslToBe: new FormControl('',),
      avgDslRate: new FormControl('',[Validators.required]),
      dieselPassedAmt: new FormControl('',),
      issuedDslAmt: new FormControl('',),
      opBalDriver: new FormControl('',),
      paidDriverAdvance: new FormControl('',),
      expensesByDriver: new FormControl('',),
      bhattaAmt: new FormControl('',),
      onTimeIncentiveAmt: new FormControl('',),
      multiDelIncentiveAmt: new FormControl('',),
      penaltyChargedToDr: new FormControl('',),
      penaltyRemarks: new FormControl('',),
      totalDriverAc: new FormControl('',),
      tripBalance: new FormControl('',),
      recdFromDriver: new FormControl('',),
      netTripBalance: new FormControl('',[Validators.required]),
      fastagAmount: new FormControl('',),
      tripTotalFreight: new FormControl('',),
      tripTotalExpenses: new FormControl('',[Validators.required]),
      detentionDays: new FormControl('',),
      tripCloseDt: new FormControl('',),
      tripLinkYN: new FormControl('',),
      remarks: new FormControl('',),

      driverList: this.formBuilder.array([this.createDriverArray()]),
      routeList: this.formBuilder.array([this.createRouteArray()]),
      dieselList: this.formBuilder.array([this.createDieselArray()]),
      fasttagList: this.formBuilder.array([this.createFasttagArray()]),
      drExpList: this.formBuilder.array([this.createTripDrExpArray()])

    });

    this.selectedTripSheetDetails = this.tripSheetService.getTripMasterDetails();

    this.formTripsheet.controls['tripBranch'].disable(); 
    this.formTripsheet.controls['tripNo'].disable();
    this.formTripsheet.controls['ltsDslToBe'].disable();
    //this.formTripsheet.controls['avgDslRate'].disable();   
    this.formTripsheet.controls['detentionDays'].disable();     
    this.formTripsheet.controls['distanceTripKM'].disable();     
    this.formTripsheet.controls['issuedDslAmt'].disable();       
    this.formTripsheet.controls['fastagAmount'].disable();          
    this.formTripsheet.controls['dieselPassedAmt'].disable();   
    this.formTripsheet.controls['paidDriverAdvance'].disable();    
    this.formTripsheet.controls['expensesByDriver'].disable();  
    //this.formTripsheet.controls['bhattaAmt'].disable();       
    this.formTripsheet.controls['tripBalance'].disable();      
    this.formTripsheet.controls['netTripBalance'].disable();     
    this.formTripsheet.controls['tripTotalFreight'].disable();     
    this.formTripsheet.controls['tripTotalExpenses'].disable();   
    this.formTripsheet.controls['totalDriverAc'].disable();     
    this.formTripsheet.controls['tripCloseDt'].disable();

    setTimeout(() => {
      this.sharedService.loading = true;

      if (this.selectedTripSheetDetails.tripId != '') {        
        this.formTripsheet.controls['openingKMR'].disable();  
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
          
        this.editMode = true;
        this.createdBy = this.selectedTripSheetDetails.createdBy + " " + this.selectedTripSheetDetails.createdDate;
        this.modifiedBy = this.selectedTripSheetDetails.modifiedBy + " " + this.selectedTripSheetDetails.modifiedDate; 
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

  get formDieselArray() {
    return this.formTripsheet.get("dieselList") as FormArray;
  }

  get formFasttagArray() {
    return this.formTripsheet.get("fasttagList") as FormArray;
  }

  get formDrExpTypeArray() {
    return this.formTripsheet.get("drExpList") as FormArray;
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
      loadingTo: [''],
      hireAmt: [''],
      reportDate : [''],
      unloadDate: [''],
      detenDays: [''],
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
          this.formTripsheet.controls['opBalDriver'].enable();  
        }     
        else{            
          this.formTripsheet.controls['openingKMR'].disable();  
          this.formTripsheet.controls['opBalDriver'].disable();     
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
  
  endWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().includes(query.toLowerCase()));
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

  getOpeningBal(e:any) {
    var selectedDataValue = this.formTripsheet.getRawValue();
    this.filter.filterStr = e;
    this.filter.filterStr1 = selectedDataValue.tripNo ;
    this.filter.filterStr2 = this.year;
           
    this.commonService.getOpeningBal(this.filter).subscribe((res: Reportmodel) => {
      this.formTripsheet.patchValue({
        openingKMR : res.filterStr,
        opBalDriver: res.filterStr2,
        //avgDslRate: res.filterStr3,
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

    var issuedDslAmt = 0;
    var fastagAmount = 0;
    var paidDriverAdvance = 0;
    var tripTotalFreight = 0;  

    var deptDate = new Date(selectedDataValue.deptDate);
    var endDate = new Date(selectedDataValue.endDate);    
    var diff = Math.abs(deptDate.getTime() - endDate.getTime());
    var totalBhattaDays  = Math.ceil(diff / (1000 * 3600 * 24)); 

    this.filter.fromDate = selectedDataValue.deptDate;
    this.filter.toDate = selectedDataValue.endDate;
    this.filter.filterStr = selectedDataValue.vehicleMasterID.dataId;
    
    this.tripSheetService.getTripMasterInnerSearchList(this.filter).subscribe((res: Tripmastermodel) => {
      //this.tripsheetmodel = res;
      this.formDriverArray.clear();
      this.formRouteArray.clear();
      this.formDieselArray.clear();
      this.formFasttagArray.clear();

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
        this.formRouteArray.controls[i].get("loadingTo")?.setValue(res.routeList[i].loadingTo);
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
        this.formRouteArray.controls[i].get("detenDays")?.disable();        
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

        issuedDslAmt = issuedDslAmt + parseFloat(res.dieselList[i].amount);

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

        fastagAmount = fastagAmount + parseFloat(res.fasttagList[i].ftAmount);

        this.formFasttagArray.controls[i].get("transDate")?.disable();
        this.formFasttagArray.controls[i].get("ftAmount")?.disable();
        this.formFasttagArray.controls[i].get("remarks")?.disable();
      }

      var bhattaRate =selectedDataValue.bhattaRate == ""? 0: parseFloat(selectedDataValue.bhattaRate);
     
      this.formTripsheet.patchValue({
        issuedDslAmt: issuedDslAmt.toFixed(2), 
        fastagAmount: fastagAmount.toFixed(2), 
        // totalBhattaDays: totalBhattaDays,
        // bhattaAmt: (bhattaRate * totalBhattaDays).toFixed(2), 
        tripTotalFreight: tripTotalFreight.toFixed(2),
        paidDriverAdvance: paidDriverAdvance.toFixed(2),
      });
    }); 
  }

  getTripSheetInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedTripSheetDetails.tripId;

    this.tripSheetService.getTripMasterInnerGridList(this.requestmodel).subscribe((res: Tripmastermodel) => {
      //this.tripsheetmodel = res;
      this.formDriverArray.clear();
      this.formRouteArray.clear();
      this.formDieselArray.clear();
      this.formFasttagArray.clear();
      
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
        this.formRouteArray.controls[i].get("loadingTo")?.setValue(res.routeList[i].loadingTo);
        this.formRouteArray.controls[i].get("hireAmt")?.setValue(res.routeList[i].hireAmt);
        this.formRouteArray.controls[i].get("reportDate")?.setValue(res.routeList[i].reportDate);
        this.formRouteArray.controls[i].get("unloadDate")?.setValue(res.routeList[i].unloadDate);
        this.formRouteArray.controls[i].get("detenDays")?.setValue(res.routeList[i].detenDays);
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
      for (var i = 0; i < res.dieselList.length; i++) {
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
      
    });
  }

  calTotal(){
    var selectedDataValue = this.formTripsheet.getRawValue();  
    var recdFromDriver = selectedDataValue.recdFromDriver==''?0:parseFloat(selectedDataValue.recdFromDriver);
    var paidToDriver = selectedDataValue.paidToDriver==''?0:parseFloat(selectedDataValue.paidToDriver);
    if(recdFromDriver>0 && paidToDriver>0){
      this.toastrService.warning("Both Recd And Paid can not entered");
      return;
    }
    
    // var bhattaRate = selectedDataValue.bhattaRate==''?0:parseFloat(selectedDataValue.bhattaRate);   
    // var totalBhattaDays = selectedDataValue.totalBhattaDays==''?0:parseFloat(selectedDataValue.totalBhattaDays);    
    // var bhattaAmt = (bhattaRate * totalBhattaDays);    
    var issuedDslAmt = selectedDataValue.issuedDslAmt==''?0:parseFloat(selectedDataValue.issuedDslAmt);
    var bhattaAmt = selectedDataValue.bhattaAmt==''?0:parseFloat(selectedDataValue.bhattaAmt);
    var opBalDriver = selectedDataValue.opBalDriver==''?0:parseFloat(selectedDataValue.opBalDriver);
    var paidDriverAdvance = selectedDataValue.paidDriverAdvance==''?0:parseFloat(selectedDataValue.paidDriverAdvance);
    var expensesByDriver = selectedDataValue.expensesByDriver==''?0:parseFloat(selectedDataValue.expensesByDriver);
    var onTimeIncentiveAmt = selectedDataValue.onTimeIncentiveAmt==''?0:parseFloat(selectedDataValue.onTimeIncentiveAmt);
    var multiDelIncentiveAmt = selectedDataValue.multiDelIncentiveAmt==''?0:parseFloat(selectedDataValue.multiDelIncentiveAmt);
    var penaltyChargedToDr = selectedDataValue.penaltyChargedToDr==''?0:parseFloat(selectedDataValue.penaltyChargedToDr);
    var dieselPassedAmt = selectedDataValue.dieselPassedAmt==''?0:parseFloat(selectedDataValue.dieselPassedAmt);
    var fastagAmount = selectedDataValue.fastagAmount==''?0:parseFloat(selectedDataValue.fastagAmount);
   
    var totalDriverAc =  dieselPassedAmt + expensesByDriver + bhattaAmt 
                      + onTimeIncentiveAmt + multiDelIncentiveAmt - penaltyChargedToDr;
    var tripBalance = totalDriverAc - opBalDriver - paidDriverAdvance - issuedDslAmt;
    var netTripBalance = tripBalance + recdFromDriver - paidToDriver;
    var tripTotalExpenses = totalDriverAc + fastagAmount; 

    this.formTripsheet.patchValue({
      bhattaAmt: bhattaAmt.toFixed(2),
      totalDriverAc: totalDriverAc.toFixed(2),
      tripBalance: tripBalance.toFixed(2),
      netTripBalance: netTripBalance.toFixed(2),
      tripTotalExpenses: tripTotalExpenses.toFixed(2),
    });  
  }

  calDetentionDays(){    
    var selectedDataValue = this.formTripsheet.getRawValue();
    var detentionDays = 0;
    
    for (var i = 0; i < selectedDataValue.routeList.length; i++) {
      if(selectedDataValue.routeList[i].reportDate!="" && selectedDataValue.routeList[i].unloadDate!=""){
        var date1 = new Date(selectedDataValue.routeList[i].reportDate);
        var date2 = new Date(selectedDataValue.routeList[i].unloadDate);
        var Difference_In_Time = date2.getTime() - date1.getTime();       
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        if (!Number.isNaN(Difference_In_Days)) {
          detentionDays = detentionDays + Difference_In_Days;          
          this.formRouteArray.controls[i].get("detenDays")?.setValue(Difference_In_Days);
        }         
      }
    }
    this.formTripsheet.patchValue({
        detentionDays: detentionDays.toString(),
    });
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

  deleteTripsheetForm(): void {
    this.requestmodel.strRequest =this.selectedTripSheetDetails.tripId;
    if (confirm("Are you sure, you want to delete this?")) {
      this.tripSheetService.tripMasterDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.toastrService.success(this.responseDetails.message);
          this.formTripsheet.reset();
          this.route.navigate(['/tripsheetlist']);
        }
        else {
          this.toastrService.warning(this.responseDetails.message);
        }
      });
    }
  }  

  exit(): void {    
    this.route.navigate(['/tripsheetlist']);
  }

  calcDieselAmt(){     
    var selectedval = this.formTripsheet.getRawValue();
    var avgDslRate = selectedval.avgDslRate ? parseFloat(selectedval.avgDslRate) : 0
    var ltsDslToBe = selectedval.ltsDslToBe ? parseFloat(selectedval.ltsDslToBe) : 0
    this.formTripsheet.patchValue({
      dieselPassedAmt:(ltsDslToBe*avgDslRate).toFixed(2),
    });
  }

  onKmrChange(){
    var totaldistanceTripKM = 0;
    var ltsDslToBe = 0;
  
    var selectedval = this.formTripsheet.getRawValue();
    var cKMR = selectedval.closingKMR ? parseFloat(selectedval.closingKMR) : 0
    var oKMR = selectedval.openingKMR ? parseFloat(selectedval.openingKMR) : 0
    
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
    
  removeItem(index: number){ 
    if (confirm("Are you sure, you want to delete this row?")) {
      this.formDrExpTypeArray.removeAt(index);
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
    const d3 = this.minDate?Date.parse(this.minDate):0;
    const d2 = this.maxDate?Date.parse(this.maxDate):0;
    const d4 = selectedDataValue.stmtDate?Date.parse(selectedDataValue.stmtDate):0;
    if (d3>d4 || d2<d4 ) {
      this.formTripsheet.patchValue({
        stmtDate: ''
      });
      this.toastrService.warning("Invalid Stmt Date");
      return
    }

    // if (selectedDataValue.netTripBalance=="") {
    //   this.toastrService.warning(" Net Trip balance is Invalid");   
    //   return;
    // }
    // if (selectedDataValue.tripTotalExpenses=="") {
    //   this.toastrService.warning(" Total Trip Expenses is Invalid");   
    //   return;
    // }
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
    this.tripsheetmodel.avgDslRate= selectedDataValue.avgDslRate.toString();
    this.tripsheetmodel.issuedDslAmt= selectedDataValue.issuedDslAmt.toString();
    this.tripsheetmodel.dieselPassedAmt= selectedDataValue.dieselPassedAmt.toString();
    this.tripsheetmodel.opBalDriver= selectedDataValue.opBalDriver.toString();
    this.tripsheetmodel.paidDriverAdvance= selectedDataValue.paidDriverAdvance.toString();
    this.tripsheetmodel.expensesByDriver= selectedDataValue.expensesByDriver.toString();
    this.tripsheetmodel.bhattaAmt= selectedDataValue.bhattaAmt.toString();
    this.tripsheetmodel.onTimeIncentiveAmt = selectedDataValue.onTimeIncentiveAmt.toString();
    this.tripsheetmodel.multiDelIncentiveAmt = selectedDataValue.multiDelIncentiveAmt.toString();
    this.tripsheetmodel.penaltyChargedToDr = selectedDataValue.penaltyChargedToDr.toString();
    this.tripsheetmodel.penaltyRemarks = selectedDataValue.penaltyRemarks.toString().toUpperCase();
    this.tripsheetmodel.totalDriverAc =  selectedDataValue.totalDriverAc.toString();
    this.tripsheetmodel.tripBalance= selectedDataValue.tripBalance.toString();
    this.tripsheetmodel.recdFromDriver= selectedDataValue.recdFromDriver.toString();
    this.tripsheetmodel.netTripBalance= selectedDataValue.netTripBalance.toString();
    this.tripsheetmodel.fastagAmount= selectedDataValue.fastagAmount.toString();
    this.tripsheetmodel.tripTotalFreight= selectedDataValue.tripTotalFreight.toString();
    this.tripsheetmodel.tripTotalExpenses= selectedDataValue.tripTotalExpenses.toString();
    this.tripsheetmodel.tripCloseDt= selectedDataValue.tripCloseDt;
    this.tripsheetmodel.tripLinkYN = selectedDataValue.tripLinkYN?"Y":"N";
    this.tripsheetmodel.detentionDays= selectedDataValue.detentionDays.toString();
    this.tripsheetmodel.remarks= selectedDataValue.remarks.toString().toUpperCase();
    this.tripsheetmodel.yearId = this.year;
    this.tripsheetmodel.loggedInUser = this.loggedInUserID;

    this.tripsheetmodel.driverList = [];
    this.tripsheetmodel.routeList = [];
    this.tripsheetmodel.dieselList = [];
    this.tripsheetmodel.fasttagList = [];
    this.tripsheetmodel.drExpList = [];
    this.tripsheetmodel.cmpExpList = [];

    for (var i = 0; i < selectedDataValue.driverList.length; i++) {
      if(selectedDataValue.driverList[i].pmtId!=''){
        this.tripsheetmodel.driverList.push({
          'pmtId': selectedDataValue.driverList[i].pmtId,
          'pmtBranch':  selectedDataValue.driverList[i].pmtBranch,
          'pmtDate':  selectedDataValue.driverList[i].pmtDate,
          'transType':  selectedDataValue.driverList[i].transType,
          'amountPaid':  selectedDataValue.driverList[i].amountPaid.toString(),
          'remarks':  selectedDataValue.driverList[i].remarks.toString().toUpperCase(),
          'pmtType': selectedDataValue.driverList[i].pmtType.toString(),
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
          'loadMemoNo':  selectedDataValue.routeList[i].loadMemoNo.toString(),
          'loadingFrom': loadingfrom?loadingfrom.dataId:"" ,
          'consignorName':  '',
          'loadingTo':  loadingto?loadingto.dataId:"" ,
          'consigneeName':  '',
          'loadWt':  '',
          'unloadWt':  '',
          'extDetention':'',
          'hireAmt':  selectedDataValue.routeList[i].hireAmt.toString(),
          'reportDate':  selectedDataValue.routeList[i].reportDate,
          'unloadDate':  selectedDataValue.routeList[i].unloadDate,
          'detenDays':  selectedDataValue.routeList[i].detenDays.toString(),
          'remarks':  selectedDataValue.routeList[i].remarks.toString().toUpperCase(),
        })
      }
    }

    for (var i = 0; i < selectedDataValue.dieselList.length; i++) {
      if(selectedDataValue.dieselList[i].detailID!=''){
        this.tripsheetmodel.dieselList.push({
          'detailID': selectedDataValue.dieselList[i].detailID,
          'transDate': selectedDataValue.dieselList[i].transDate,
          'dslQty':  selectedDataValue.dieselList[i].dslQty.toString(),
          'dslRate':  selectedDataValue.dieselList[i].dslRate.toString(),
          'amount':  selectedDataValue.dieselList[i].amount.toString(),
          'remarks': selectedDataValue.dieselList[i].remarks.toString().toUpperCase(),
        })
      }
    }
    
    for (var i = 0; i < selectedDataValue.fasttagList.length; i++) {
      if(selectedDataValue.fasttagList[i].detailID!=''){
        this.tripsheetmodel.fasttagList.push({
          'detailID': selectedDataValue.fasttagList[i].detailID,
          'transDate': selectedDataValue.fasttagList[i].transDate,
          'ftAmount':  selectedDataValue.fasttagList[i].ftAmount.toString(),
          'remarks': selectedDataValue.fasttagList[i].remarks.toString().toUpperCase(),
        })
      }
    }
    
    for (var i = 0; i < selectedDataValue.drExpList.length; i++) {
      if(selectedDataValue.drExpList[i].expId!=''){
        this.tripsheetmodel.drExpList.push({
          'expId': selectedDataValue.drExpList[i].expId,
          'expParticulars':  selectedDataValue.drExpList[i].expParticulars.toString().toUpperCase(),
          'expAmt':  selectedDataValue.drExpList[i].expAmt.toString(),
         })
      }
    }

    this.tripSheetService.tripMasterGsafeSubmitted(this.tripsheetmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success("Saved succsessfully");
        this.formTripsheet.reset();
        this.route.navigate(['/tripsheetgsafe']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }   
    });
  }

}

