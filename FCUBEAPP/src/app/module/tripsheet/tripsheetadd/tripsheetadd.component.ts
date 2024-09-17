import { Component } from '@angular/core';
import { Constants } from 'src/app/common/constants';
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

  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  editMode = false;

  formTripsheet!: FormGroup;
  formSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  driverLists: Dropdownmodel[] = [];
  expList: Dropdownmodel[] = [];
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
      deptDate:  new FormControl('', [Validators.required]),
      endDate:  new FormControl('', [Validators.required]),
      stmtDate:  new FormControl(this.loginDate, [Validators.required]),
     // tripStatus:  new FormControl('', [Validators.required]),
     tripStatus:  new FormControl('', []),
      driverMasterID:  new FormControl('', [Validators.required]),
      definedMileage: new FormControl('',),
      closingKMR:new FormControl('',),
      openingKMR: new FormControl('',),
      distanceTripKM: new FormControl('',),
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
      totalDriverAc: new FormControl('',),
      tripBalance: new FormControl('',),
      recdFromDriver: new FormControl('',),
      netTripBalance: new FormControl('',),
      fastagAmount: new FormControl('',),
      tripTotalFreight: new FormControl('',),
      tripTotalAdvance: new FormControl('',),
      tripCloseDt: new FormControl('',),
      tripLinkYN: new FormControl('',),

      driverList: this.formBuilder.array([this.createDriverArray()]),
      routeList: this.formBuilder.array([this.createRouteArray()]),
      dieselList: this.formBuilder.array([this.createDieselArray()]),
      expList: this.formBuilder.array([this.createTripExpArray()])

    });

    this.selectedTripSheetDetails = this.tripSheetService.getTripSheetDetails();

    this.formTripsheet.controls['tripCloseDt'].disable();
    this.formTripsheet.controls['tripNo'].disable();
    this.formTripsheet.controls['definedMileage'].disable();
    this.formTripsheet.controls['ltsDslToBe'].disable();
    this.formTripsheet.controls['distanceTripKM'].disable();
    

    setTimeout(() => {
      this.sharedService.loading = true;
      if (this.selectedTripSheetDetails.tripId != '') {
        this.formTripsheet.patchValue(this.selectedTripSheetDetails);
        this.formTripsheet.patchValue({
          stmtDate: this.commonService.formatDate(this.selectedTripSheetDetails.stmtDate),
          deptDate: this.commonService.formatDate(this.selectedTripSheetDetails.deptDate),
          endDate: this.commonService.formatDate(this.selectedTripSheetDetails.endDate),
          tripCloseDt: this.commonService.formatDate(this.selectedTripSheetDetails.tripCloseDt),
          vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedTripSheetDetails.vehicleMasterID),
          driverMasterID: this.driverLists.find(e => e.dataId == this.selectedTripSheetDetails.driverMasterID),
        });  
        this.editMode = true;
        this.getTripSheetInnerGridList()
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
      this.expList = res;
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

  get formExpTypeArray() {
    return this.formTripsheet.get("expList") as FormArray;
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
      hireAmt: [''],
      advAmt: [''],
      remarks: [''],
    });
  }
  
  createDieselArray() {
    return this.formBuilder.group({
      detailID:  [''],
      accountName:  [''],
      transDate:  [''],
      dslQty:  [''],
      dslRate:  [''],
      amount:  [''],
      remarks: [''],
    });
  }
  createTripExpArray() {
    return this.formBuilder.group({
      tripDtlId:  [''],
      tripId:  [''],
      expId:  [''],
      expParticulars:  [''],
      expAmt:  [''],
    });
  }
  

  getDetails(){
    var selectedDataValue = this.formTripsheet.getRawValue();
    var validvehi = this.vehicleList.find(e => e.dataId == selectedDataValue.vehicleMasterID.dataId) 
    if (typeof validvehi !== 'undefined' && validvehi !== null && validvehi.dataId!="" && validvehi.dataId!="0") {
        //ignore
    }
    else{
      this.toastrService.warning("Please Enter Valid  Vehicle No");          
      return;
    }

    this.filter.fromDate = selectedDataValue.deptDate;
    this.filter.toDate = selectedDataValue.endDate;
    this.filter.filterStr = selectedDataValue.vehicleMasterID.dataId;
    this.tripSheetService.getTripSheetInnerSearchList(this.filter).subscribe((res: Tripsheetmodel) => {
      this.tripsheetmodel = res;
      this.formDriverArray.clear();
      this.formRouteArray.clear();
      this.formDieselArray.clear();
      this.formDieselArray.clear();

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
        this.formRouteArray.controls[i].get("hireAmt")?.setValue(res.routeList[i].hireAmt);
        this.formRouteArray.controls[i].get("advAmt")?.setValue(res.routeList[i].advAmt);
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
        this.formRouteArray.controls[i].get("hireAmt")?.disable();
        this.formRouteArray.controls[i].get("advAmt")?.disable();
        this.formRouteArray.controls[i].get("remarks")?.disable();
      }
      for (var i = 0; i < res.dieselList.length; i++) {
        this.formDieselArray.push(this.createDieselArray());
        this.formDieselArray.controls[i].get("detailID")?.setValue(res.dieselList[i].detailID);
        this.formDieselArray.controls[i].get("accountName")?.setValue(res.dieselList[i].accountName);
        this.formDieselArray.controls[i].get("transDate")?.setValue(this.commonService.formatDate(res.dieselList[i].transDate));
        this.formDieselArray.controls[i].get("dslQty")?.setValue(res.dieselList[i].dslQty);
        this.formDieselArray.controls[i].get("dslRate")?.setValue(res.dieselList[i].dslRate);
        this.formDieselArray.controls[i].get("amount")?.setValue(res.dieselList[i].amount);
        this.formDieselArray.controls[i].get("remarks")?.setValue(res.dieselList[i].remarks);

        this.formDieselArray.controls[i].get("accountName")?.disable();
        this.formDieselArray.controls[i].get("transDate")?.disable();
        this.formDieselArray.controls[i].get("dslQty")?.disable();
        this.formDieselArray.controls[i].get("dslRate")?.disable();
        this.formDieselArray.controls[i].get("amount")?.disable();
        this.formDieselArray.controls[i].get("remarks")?.disable();
      }
      // for (var i = 0; i < res.expList.length; i++) {
      //   this.formDieselArray.push(this.createTripExpArray());
      //   this.formDieselArray.controls[i].get("tripDtlId")?.setValue(res.expList[i].tripDtlId);
      //   this.formDieselArray.controls[i].get("tripId")?.setValue(res.expList[i].tripId);
      //   this.formDieselArray.controls[i].get("expId")?.setValue(res.expList[i].expId);
      //   this.formDieselArray.controls[i].get("expParticulars")?.setValue(res.expList[i].expParticulars);
      //   this.formDieselArray.controls[i].get("expAmt")?.setValue(res.expList[i].expAmt);

        // this.formDieselArray.controls[i].get("accountName")?.disable();
        // this.formDieselArray.controls[i].get("transDate")?.disable();
        // this.formDieselArray.controls[i].get("dslQty")?.disable();
        // this.formDieselArray.controls[i].get("dslRate")?.disable();
        // this.formDieselArray.controls[i].get("amount")?.disable();
        // this.formDieselArray.controls[i].get("remarks")?.disable();
     // }
    });
    this.onDslChange();

  }

  getTripSheetInnerGridList(): void {
    this.requestmodel.strRequest= this.selectedTripSheetDetails.tripId;

    this.tripSheetService.getTripSheetInnerGridList(this.requestmodel).subscribe((res: Tripsheetmodel) => {
      this.tripsheetmodel = res;
      this.formDriverArray.clear();
      this.formRouteArray.clear();
      this.formDieselArray.clear();
      this.formExpTypeArray.clear();
      
      for (var i = 0; i < res.driverList.length; i++) {
        this.formDriverArray.push(this.createDriverArray());
        this.formDriverArray.controls[i].get("pmtId")?.setValue(res.driverList[i].pmtId);
        this.formDriverArray.controls[i].get("pmtBranch")?.setValue(res.driverList[i].pmtBranch);
        this.formDriverArray.controls[i].get("pmtDate")?.setValue(this.commonService.formatDate(res.driverList[i].pmtDate));
        this.formDriverArray.controls[i].get("pmtType")?.setValue(res.driverList[i].pmtType);
        this.formDriverArray.controls[i].get("amountPaid")?.setValue(res.driverList[i].amountPaid);
        this.formDriverArray.controls[i].get("remarks")?.setValue(res.driverList[i].remarks);
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
        this.formRouteArray.controls[i].get("hireAmt")?.setValue(res.routeList[i].hireAmt);
        this.formRouteArray.controls[i].get("advAmt")?.setValue(res.routeList[i].advAmt);
        this.formRouteArray.controls[i].get("remarks")?.setValue(res.routeList[i].remarks);
      }
      for (var i = 0; i < res.dieselList.length; i++) {
        this.formDieselArray.push(this.createDieselArray());
        this.formDieselArray.controls[i].get("detailID")?.setValue(res.dieselList[i].detailID);
        this.formDieselArray.controls[i].get("accountName")?.setValue(res.dieselList[i].accountName);
        this.formDieselArray.controls[i].get("transDate")?.setValue(this.commonService.formatDate(res.dieselList[i].transDate));
        this.formDieselArray.controls[i].get("dslQty")?.setValue(res.dieselList[i].dslQty);
        this.formDieselArray.controls[i].get("dslRate")?.setValue(res.dieselList[i].dslRate);
        this.formDieselArray.controls[i].get("amount")?.setValue(res.dieselList[i].amount);
        this.formDieselArray.controls[i].get("remarks")?.setValue(res.dieselList[i].remarks);
      }
      for (var i = 0; i < res.expList.length; i++) {
        this.formExpTypeArray.push(this.createTripExpArray());
        this.formExpTypeArray.controls[i].get("tripDtlId")?.setValue(res.expList[i].tripDtlId);
        this.formExpTypeArray.controls[i].get("tripId")?.setValue(res.expList[i].tripId);
        this.formExpTypeArray.controls[i].get("expId")?.setValue(res.expList[i].expId);
        this.formExpTypeArray.controls[i].get("expParticulars")?.setValue(res.expList[i].expParticulars);
        this.formExpTypeArray.controls[i].get("expAmt")?.setValue(res.expList[i].expAmt);

      }
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
    if (confirm("Are you sure, you want to delete this?")) {

    }
  }  

  exit(): void {    
    this.route.navigate(['/tripsheetlist']);
  }

  onKmrChange(){
    var totaldistanceTripKM = 0;
   // var openingKMR = 0;
    //var totalSgstAmt = 0;
    //var totalIgstAmt = 0;
  
    var selectedval = this.formTripsheet.getRawValue();
    totaldistanceTripKM = selectedval.closingKMR- selectedval.openingKMR;
   
    this.formTripsheet.patchValue({
      distanceTripKM : totaldistanceTripKM.toFixed(2),
     // totCgstAmt: totalCgstAmt.toFixed(2),
     // totSgstAmt: totalSgstAmt.toFixed(2),
   
    });
  }  
  onDslCal(){
    var calltsDslToBe = 0;
   // var openingKMR = 0;
    //var totalSgstAmt = 0;
    //var totalIgstAmt = 0;
  
    var selectedval = this.formTripsheet.getRawValue();

    calltsDslToBe=     parseFloat(selectedval.definedMileage) / parseFloat(selectedval.distanceTripKM);
    this.formTripsheet.patchValue({
      ltsDslToBe : calltsDslToBe.toFixed(2),
     // totCgstAmt: totalCgstAmt.toFixed(2),
     // totSgstAmt: totalSgstAmt.toFixed(2),
   
    });
  }  
  onDslChange(){
    var totalItemQty = 0;
    var totalItemAmt = 0;
    var ItemQty = 0;
    var ItemAmt = 0;
   
    var selectedDate = this.formTripsheet.getRawValue();

    for (var i = 0; i < this.formDieselArray.controls.length; i++) {
     // this.formTyreArray.controls[i].get("sgstAmt")?.setValue("");
     // this.formTyreArray.controls[i].get("cgstAmt")?.setValue("");
      //this.formTyreArray.controls[i].get("igstAmt")?.setValue("");

      if (selectedDate.dieselList[i].dslQty!="") {
        ItemQty= parseFloat(selectedDate.dieselList[i].dslQty) 
        totalItemQty = totalItemQty+ItemQty;

        if(selectedDate.dieselList[i].dslRate!="") {
          ItemAmt = selectedDate.arrayList[i].dslRate
          totalItemAmt = totalItemAmt + ItemAmt;
        
        }
       
      }
    }  
    
    this.formTripsheet.patchValue({
      issuedDslLtrs : totalItemQty.toFixed(2),
      issuedDslAmt: totalItemAmt.toFixed(2),
   
     
     
    });
  }
  removeItem(index: number) {
    this.formExpTypeArray.removeAt(index);
  }

  addItem(index: number): void { 
    if (this.formExpTypeArray.value[index].expId != "" && this.formExpTypeArray.value[index].expParticulars != "" && this.formExpTypeArray.value[index].expAmt != "" 
     ) {

       //Start date end date validation
  
        this.formExpTypeArray.push(this.createTripExpArray());
      
     } 
     else {
       this.toastrService.warning("Please select Required Fields ");
     }
 }

  //Submit user form details //
  submitTripSheetForm(): void {
    this.formSubmitted = true;
    if (this.formTripsheet.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields "); 
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
    this.tripsheetmodel.tripStatus = selectedDataValue.tripStatus;
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
    this.tripsheetmodel.totalBhattaDays= selectedDataValue.totalBhattaDays.toString();
    this.tripsheetmodel.bhattaRate= selectedDataValue.bhattaRate.toString();
    this.tripsheetmodel.bhattaAmt= selectedDataValue.bhattaAmt.toString();
    this.tripsheetmodel.onTimeIncentiveAmt= selectedDataValue.onTimeIncentiveAmt.toString();
    this.tripsheetmodel.multiDelIncentiveAmt= selectedDataValue.multiDelIncentiveAmt.toString();
    this.tripsheetmodel.penaltyChargedToDr= selectedDataValue.penaltyChargedToDr.toString();
    this.tripsheetmodel.penaltyRemarks= selectedDataValue.penaltyRemarks.toString().toUpperCase();
    this.tripsheetmodel.totalDriverAc= selectedDataValue.totalDriverAc.toString();
    this.tripsheetmodel.tripBalance= selectedDataValue.tripBalance.toString();
    this.tripsheetmodel.recdFromDriver= selectedDataValue.recdFromDriver.toString();
    this.tripsheetmodel.netTripBalance= selectedDataValue.netTripBalance.toString();
    this.tripsheetmodel.fastagAmount= selectedDataValue.fastagAmount.toString();
    this.tripsheetmodel.tripTotalFreight= selectedDataValue.tripTotalFreight.toString();
    this.tripsheetmodel.tripTotalAdvance= selectedDataValue.tripTotalAdvance.toString();
    this.tripsheetmodel.tripCloseDt= selectedDataValue.tripCloseDt;
    this.tripsheetmodel.tripLinkYN = selectedDataValue.tripLinkYN?"Y":"N";
    this.tripsheetmodel.yearId = this.year;
    this.tripsheetmodel.loggedInUser = this.loggedInUserID;

    this.tripsheetmodel.driverList = [];
    this.tripsheetmodel.routeList = [];
    this.tripsheetmodel.dieselList = [];
    this.tripsheetmodel.expList = [];

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
    //var loadingfrom= this.locationList.find(e => e.dataName == selectedDataValue.routeList[i].loadingFrom) 
   // var loadingto= this.locationList.find(e => e.dataName == selectedDataValue.routeList[i].loadingTo) 

    for (var i = 0; i < selectedDataValue.routeList.length; i++) {

      if(selectedDataValue.routeList[i].pmtId!=''){
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
          'hireAmt':  selectedDataValue.routeList[i].hireAmt,
          'advAmt':  selectedDataValue.routeList[i].advAmt,
          'remarks':  selectedDataValue.routeList[i].remarks,
        })
      }
    }

    for (var i = 0; i < selectedDataValue.dieselList.length; i++) {
      if(selectedDataValue.dieselList[i].pmtId!=''){
        this.tripsheetmodel.dieselList.push({
          'detailID': selectedDataValue.dieselList[i].detailID,
          'accountName': selectedDataValue.dieselList[i].accountName,
          'transDate': selectedDataValue.dieselList[i].transDate,
          'dslQty':  selectedDataValue.dieselList[i].dslQty,
          'dslRate':  selectedDataValue.dieselList[i].dslRate,
          'amount':  selectedDataValue.dieselList[i].amount,
          'remarks': selectedDataValue.dieselList[i].remarks,
        })
      }
    }
    for (var i = 0; i < selectedDataValue.expList.length; i++) {
      if(selectedDataValue.expList[i].pmtId!=''){
        this.tripsheetmodel.expList.push({
          'tripDtlId': selectedDataValue.expList[i].tripDtlId,
          'tripId': selectedDataValue.expList[i].tripId,
          'expId': selectedDataValue.expList[i].expId,
          'expParticulars':  selectedDataValue.expList[i].expParticulars,
          'expAmt':  selectedDataValue.expList[i].expAmt,
         })
      }
    }

    this.tripSheetService.tripSheetDetailsSubmitted(this.tripsheetmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toastrService.success("Saved succsessfully");
        this.formTripsheet.reset();
        this.route.navigate(['/tripsheetlist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }   
    });
  }

}

