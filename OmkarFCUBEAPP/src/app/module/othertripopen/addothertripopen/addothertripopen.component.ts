import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tripsheetmodel } from 'src/app/models/tripsheetmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { TripSheetService } from 'src/app/services/tripsheet.service';
import { kmsmodel } from 'src/app/models/kmsmodel';
import { SharedService } from 'src/app/services/shared.service';
import { Tripkmsmodel } from 'src/app/models/tripkmsmodel';
import { Dslmodel } from 'src/app/models/dslmodel';
import { BhattaRateModel } from 'src/app/models/bhattaratemodel';
import { Opbalmodel } from 'src/app/models/opbalmodel';
import { IncentiveRateModel } from 'src/app/models/incentiveratemodel';
import { Adbluetobemodel } from 'src/app/models/adbluetobemodel';
import { ToastrService } from 'ngx-toastr';
import { PenaltyRateModel } from 'src/app/models/penaltyratemodel';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-addothertripopen',
  templateUrl: './addothertripopen.component.html',
  styleUrls: ['./addothertripopen.component.css']
})
export class AddothertripopenComponent {
  loggedInUserID: string = '';
  year: string = '';
  loginDate: string = '';
  branch: string = '';
  tripkms: string = '';
  advancePay: string = '';
  dTripKM_1: number = 0;
  ltsdsl1:string = '';
  adblue1:string = '';
 // frmplc: number = 0;
 vehid:string = '';
   frmplc: string = '';
  toplc: string = '';
  maxDate: string = '';
  tripNumber: string = '';

  ExpReportingDays: number = 0;
  ExpReportingDt: string = '';
  dslDetails = new Dslmodel();
  incentiveDetails = new IncentiveRateModel();
  penaltyDetails = new PenaltyRateModel();
  OpbalDetails = new Opbalmodel();
  bhattaDetails = new BhattaRateModel();
  adBlueDetails = new Adbluetobemodel();

  formOtherTripOpen!: FormGroup;
  userSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  responseDetails = new Responsemodel();
  requestmodel=new Requestmodel();
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  driverList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  contentList: Dropdownmodel[] = [];
  tripkmsDetails = new Tripkmsmodel();
  kmsDetails = new kmsmodel();
  keywordLocation = 'dataName';


  selectedTripSheetDetails = new Tripsheetmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tripsheetmodel: Tripsheetmodel, private tripSheetService: TripSheetService, 
    private commonService: CommonService, private sharedService: SharedService,     
    private toasterService: ToastrService) {
    this.tripsheetmodel = new Tripsheetmodel();

  }
  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Other Trip Open");
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
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();

    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
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
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;

    }

    this.formOtherTripOpen = this.formBuilder.group({
      tripBranch: new FormControl(this.branch,[Validators.required]),
      vehicleMasterID: new FormControl('',[Validators.required]),
      tripNo: new FormControl('',[Validators.required]),
      newTripDate: new FormControl('',[Validators.required]),
      driverMasterID: new FormControl('', [Validators.required]),
      compNonCompStatus: new FormControl('C',[Validators.required]),
      challanNo: new FormControl('',[Validators.required]),
      loadingFrom: new FormControl('',[Validators.required]),
      destination: new FormControl('',[Validators.required]),
      distanceTripKM_1: new FormControl('',),
      contents: new FormControl('',[Validators.required]),
      loadEmptyType: new FormControl('',[Validators.required]),
      expectedReportingDt : new FormControl('',),
      expectedReportingDays: new FormControl('0',),
      ltsDslToBe_1: new FormControl('0',),
      ltsAdblueToBe_1: new FormControl('0',),
      advPayable_1: new FormControl('0',),
      opBalDriver: new FormControl('0',),
      opBalDsl: new FormControl('0',),
      opBalAdblue: new FormControl('0',),
    });
    
    this.sharedService.loading=true;

    this.getDriverList();
    this.getBranchList();
    this.getVehicleNoList();
    this.getLocationList();
    this.getContentList();
   
    
    this.formOtherTripOpen.controls['challanNo'].clearValidators(); 
    this.formOtherTripOpen.controls['challanNo'].updateValueAndValidity();

    this.selectedTripSheetDetails = this.tripSheetService.getTripSheetDetails();
    this.frmplc = this.selectedTripSheetDetails.loadingFrom;
    this.toplc = this.selectedTripSheetDetails.destination;
    setTimeout(() => {
      if (this.selectedTripSheetDetails.tripId != '') {
        this.formOtherTripOpen.patchValue(this.selectedTripSheetDetails);
        this.formOtherTripOpen.patchValue({
          newTripDate: this.commonService.formatDate(this.selectedTripSheetDetails.newTripDate),
          expectedReportingDt:this.commonService.formatDate(this.selectedTripSheetDetails.expectedReportingDt),
          loadingFrom: this.locationList.find(e => e.dataId == this.selectedTripSheetDetails.loadingFrom),
          destination: this.locationList.find(e => e.dataId == this.selectedTripSheetDetails.destination),
          vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedTripSheetDetails.vehicleMasterID),
          driverMasterID: this.driverList.find(e => e.dataId == this.selectedTripSheetDetails.driverMasterID),
          contents: this.contentList.find(e => e.dataId == this.selectedTripSheetDetails.contents),
          yearid: this.year
        });        
        this.editMode = true;
       this.vehid= this.selectedTripSheetDetails.vehicleMasterID;
       this.tripNumber = this.selectedTripSheetDetails.tripNo;
        this.formOtherTripOpen.controls['tripBranch'].disable();
        this.formOtherTripOpen.controls['vehicleMasterID'].disable();
        this.formOtherTripOpen.controls['compNonCompStatus'].disable();       
        this.formOtherTripOpen.controls['challanNo'].disable();    

      } 
      this.GetDslOpeningBalEdit();
    }, 2000);
  
    this.formOtherTripOpen.controls['tripNo'].disable();
    this.formOtherTripOpen.controls['distanceTripKM_1'].disable();    
    this.formOtherTripOpen.controls['expectedReportingDt'].disable();
    this.formOtherTripOpen.controls['expectedReportingDays'].disable();
    this.formOtherTripOpen.controls['ltsDslToBe_1'].disable();
    this.formOtherTripOpen.controls['ltsAdblueToBe_1'].disable();
    this.formOtherTripOpen.controls['advPayable_1'].disable();
    this.formOtherTripOpen.controls['opBalDriver'].disable();
    this.formOtherTripOpen.controls['opBalDsl'].disable();
    this.formOtherTripOpen.controls['opBalAdblue'].disable();
    
    this.sharedService.loading=false;
  }
  
  get f() { return this.formOtherTripOpen.controls; }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleNoList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  changeFromPlace(e: any) {
    this.frmplc = e.dataId 
    this.checkTripkMs();    
    this.GetOpeningBal();
    this.GetDslOpeningBal();
    this.GetAdblueOpeningBal();
  }
  
  
  changeToPlace(e: any) {
    this.toplc= e.dataId 
    this.checkTripkMs();
    this.GetOpeningBal();
    this.GetDslOpeningBal();
    this.GetAdblueOpeningBal();
  }

  GetDslOpeningBal() {
    var selectedDataValue = this.formOtherTripOpen.getRawValue();
if(selectedDataValue.tripNo!=1){
    var selectedDataValue = this.formOtherTripOpen.getRawValue();
    this.OpbalDetails.tripdate = selectedDataValue.newTripDate;
    this.OpbalDetails.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
    //  this.OpbalDetails.driverMasterID = selectedDataValue.driverMasterID.dataId;
  //  this.OpbalDetails.driverMasterID = this.driverid ? this.driverid : '0';
    // this.OpbalDetails.driverMasterID = this.formTripsheet.value.driverMasterID.dataId;
    // this.OpbalDetails.driverMasterID='1';
    this.OpbalDetails.yearid = this.year;
    this.OpbalDetails.tripNo = selectedDataValue.tripNo;
    this.commonService.getDslOpeningBalforPmt(this.OpbalDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
       if (this.responseDetails.status) {
     // if (this.responseDetails.message != undefined || this.responseDetails.message != '' || this.responseDetails.message != 'Unable to process') {
        this.formOtherTripOpen.patchValue({
          opBalDsl: this.responseDetails.message ? this.responseDetails.message : '0'
        });
        //  }
        //else
      } else {
        this.formOtherTripOpen.patchValue({
          opBalDriver: '0'
        });
      }
    });
 
   // this.getDriverDetails();
  }

  }
  GetDslOpeningBalEdit() {
    var selectedDataValue = this.formOtherTripOpen.getRawValue();
if(selectedDataValue.tripNo!=1){
    var selectedDataValue = this.formOtherTripOpen.getRawValue();
    this.OpbalDetails.tripdate = selectedDataValue.newTripDate;
   // this.OpbalDetails.vehicleMasterID = selectedDataValue.vehicleMasterID;
    
     this.OpbalDetails.vehicleMasterID =  this.vehid;
  
    this.OpbalDetails.yearid = this.year;
    //this.OpbalDetails.tripNo = selectedDataValue.tripNo;
    this.OpbalDetails.tripNo =  this.tripNumber ;
    this.commonService.getDslOpeningBalforPmt(this.OpbalDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
       if (this.responseDetails.status) {
     // if (this.responseDetails.message != undefined || this.responseDetails.message != '' || this.responseDetails.message != 'Unable to process') {
        this.formOtherTripOpen.patchValue({
          opBalDsl: this.responseDetails.message ? this.responseDetails.message : '0'
        });
        //  }
        //else
      } else {
        this.formOtherTripOpen.patchValue({
          opBalDriver: '0'
        });
      }
    });
 
   // this.getDriverDetails();
  }

  }
  GetAdblueOpeningBal() {
    var selectedDataValue = this.formOtherTripOpen.getRawValue();
    if(selectedDataValue.tripNo!=1){
  
    this.OpbalDetails.tripdate = selectedDataValue.newTripDate;
    this.OpbalDetails.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
    //  this.OpbalDetails.driverMasterID = selectedDataValue.driverMasterID.dataId;
  //  this.OpbalDetails.driverMasterID = this.driverid ? this.driverid : '0';
    // this.OpbalDetails.driverMasterID = this.formTripsheet.value.driverMasterID.dataId;
    // this.OpbalDetails.driverMasterID='1';
    this.OpbalDetails.yearid = this.year;
    this.OpbalDetails.tripNo = selectedDataValue.tripNo;
    this.commonService.getAdblueOpeningBal(this.OpbalDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
       if (this.responseDetails.status) {
     // if (this.responseDetails.message != undefined || this.responseDetails.message != '' || this.responseDetails.message != 'Unable to process') {
        this.formOtherTripOpen.patchValue({
          opBalAdblue: this.responseDetails.message ? this.responseDetails.message : '0'
        });
        //  }
        //else
      } else {
        this.formOtherTripOpen.patchValue({
          opBalAdblue: '0'
        });
      }
    });
 
   // this.getDriverDetails();
 // }
  }
  }

  onChange(e: any) {
    var selectedValue = e.target.value;
    if(selectedValue=="R"){ 
      this.formOtherTripOpen.controls['challanNo'].setValidators([Validators.required]);
      this.formOtherTripOpen.controls['challanNo'].enable();
    }
    else {
      this.formOtherTripOpen.controls['challanNo'].clearValidators();    
      this.formOtherTripOpen.controls['challanNo'].disable();  
    }
    this.formOtherTripOpen.controls['challanNo'].updateValueAndValidity();
  }

  checkTripkMs() {
    var selectedDataValue = this.formOtherTripOpen.getRawValue();
    if (this.frmplc != '0 '&& this.toplc != '0' && selectedDataValue.newTripDate!='' ) {
      this.kmsDetails.fromLocation = this.frmplc.toString() ;
      this.kmsDetails.toLocation = this.toplc.toString();
      this.kmsDetails.transDate = selectedDataValue.newTripDate;
      this.kmsDetails.vehicleTypeGroupId = '1';
     this.kmsDetails.loadOrEmpty = selectedDataValue.loadEmptyType
     // this.kmsDetails.loadOrEmpty = this.selectedTripSheetDetails.loadEmptyType?this.selectedTripSheetDetails.loadEmptyType: selectedDataValue.loadEmptyType;
      this.commonService.getTripKms2(this.kmsDetails).subscribe((res: Tripkmsmodel) => {
        this.tripkmsDetails = res;
        this.tripkms = this.tripkmsDetails.kms ? this.tripkmsDetails.kms : '';
        this.advancePay = this.tripkmsDetails.enrouteExpTruck ? this.tripkmsDetails.enrouteExpTruck : '';
        this.dTripKM_1 = this.tripkmsDetails.kms ? parseInt(this.tripkmsDetails.kms) : 0;
        if( this.dTripKM_1 >0){
          this.ExpReportingDays = this.dTripKM_1 / 400;
          this.ExpReportingDays = Math.round(this.ExpReportingDays) 
          let date: Date = new Date(selectedDataValue.newTripDate);

          date.setDate(date.getDate() + this.ExpReportingDays)
          let date2 = (date).toISOString()

          this.formOtherTripOpen.patchValue({
            expectedReportingDt: date2.split("T")[0],
            expectedReportingDays: (this.ExpReportingDays).toString(),
            distanceTripKM_1: (this.dTripKM_1).toString(),
            advPayable_1: (this.advancePay).toString(),
          });
          
        }
        else{
        this.formOtherTripOpen.patchValue({
          distanceTripKM_1: (this.dTripKM_1).toString(),
          advPayable_1: (this.advancePay).toString(),
        });
        }
        this.getDslToBe1();
        this.getAdBlueToBe1();
      });
    }
  }

  
  getDslToBe1() {
    var selectedDataValue = this.formOtherTripOpen.getRawValue();
    if (selectedDataValue.distanceTripKM_1 != "" 
     && selectedDataValue.newTripDate!='' && selectedDataValue.vehicleMasterID.dataId !='' ) {
      this.dslDetails.transDate = selectedDataValue.newTripDate;
      this.dslDetails.tripKms = (selectedDataValue.distanceTripKM_1).toString();
    //  this.dslDetails.loadType = "L";
    this.dslDetails.loadType= selectedDataValue.loadEmptyType;
      this.dslDetails.vehicleMasterId = selectedDataValue.vehicleMasterID.dataId;
      this.commonService.getDslToBe(this.dslDetails).subscribe((res: Responsemodel) => {
        this.ltsdsl1 = res.message;
        if (this.ltsdsl1 != undefined) {
          this.formOtherTripOpen.patchValue({
            ltsDslToBe_1: parseFloat(this.ltsdsl1).toFixed(2).toString()
          });
        }
      });
    }
  }

  getAdBlueToBe1() {
    var selectedDataValue = this.formOtherTripOpen.getRawValue();
    if (selectedDataValue.distanceTripKM_1 != "" 
    && selectedDataValue.newTripDate!='' && selectedDataValue.vehicleMasterID.dataId !='' ) {
      this.adBlueDetails.transDate = selectedDataValue.newTripDate;
      this.adBlueDetails.tripKms = (selectedDataValue.distanceTripKM_1).toString();
      this.adBlueDetails.vehicleMasterId = selectedDataValue.vehicleMasterID.dataId;
      this.commonService.getAdBlueToBe(this.adBlueDetails).subscribe((res: Responsemodel) => {
        this.adblue1 = res.message;
        if (this.adblue1 != undefined) {
          this.formOtherTripOpen.patchValue({
            ltsAdblueToBe_1: parseFloat(this.adblue1).toFixed(2).toString()
          });
        } 
      });
    }
  }

  GetOpeningBal() {
    var selectedDataValue = this.formOtherTripOpen.getRawValue();    
    if (selectedDataValue.newTripDate != '' && selectedDataValue.vehicleMasterID.dataId != '' && 
      selectedDataValue.driverMasterID.dataId !='' && selectedDataValue.tripNo!=''  ) {
      this.OpbalDetails.tripdate = selectedDataValue.newTripDate;
      this.OpbalDetails.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
      this.OpbalDetails.driverMasterID = selectedDataValue.driverMasterID.dataId;
      this.OpbalDetails.yearid = this.year;
      this.OpbalDetails.tripNo = selectedDataValue.tripNo;
      this.commonService.getOpeningBal(this.OpbalDetails).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.message != undefined || this.responseDetails.message != '') {
          this.formOtherTripOpen.patchValue({
            opBalDriver: this.responseDetails.message? this.responseDetails.message:'0'
          });
        } 
      });
    }
  }  
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  onClearedFromPlace(e: any){
    this.frmplc='0';
   
  }
  onClearedToPlace(e: any){
    this.toplc='0';
   
  }
  getDriverList(): void {
    this.commonService.getDriverList().subscribe((res) => {
      this.driverList = res;
    });
  }
  getContentList(): void {
    this.commonService.getContentList().subscribe((res) => {
      this.contentList = res;
    });
  }
  selectEvent(item: any) {
    // do something with selected item
   // this.GetOpeningBal();
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  selectVehicalEvent(e: any) {
    var selectedValue = e.dataId
    this.OpbalDetails.vehicleMasterID = selectedValue;
    this.OpbalDetails.yearid = this.year;
    
    this.tripSheetService.getNextTripNo(this.OpbalDetails).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status){
        this.formOtherTripOpen.patchValue({
          tripNo: this.responseDetails.message
        });
      } 
      else{
        console.log(this.responseDetails.message);  
        this.toasterService.warning(this.responseDetails.message);     
        this.getVehicleNoList();    
      }      
    });
  }
  
  deleteOtherTripOpenForm(): void {
    if(this.selectedTripSheetDetails.tripId != '' ){      
      this.sharedService.loading=true;
      this.requestmodel.strRequest =this.selectedTripSheetDetails.tripId
      if (confirm("Are you sure, you want to delete this?")) {
            this.tripSheetService.otherTripOpenDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formOtherTripOpen.reset();
            this.route.navigate(['/othertripopenlist']);
        });
      }      
      this.sharedService.loading=false;
    }
  }
  exit(): void {
    this.route.navigate(['/othertripopenlist']);
  }

  submitOtherTripOpenForm(): void {
    this.userSubmitted = true;
    if (this.formOtherTripOpen.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formOtherTripOpen.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }           
      return;
    }
    this.sharedService.loading=true;
    var selectedDataValue = this.formOtherTripOpen.getRawValue();
    this.tripsheetmodel.tripId = this.selectedTripSheetDetails.tripId != '' ? this.selectedTripSheetDetails.tripId : '';
    this.tripsheetmodel.tripBranch = selectedDataValue.tripBranch;
    this.tripsheetmodel.yearId = this.year;
    this.tripsheetmodel.tripNo = selectedDataValue.tripNo;
    this.tripsheetmodel.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
    this.tripsheetmodel.newTripDate = selectedDataValue.newTripDate;
    this.tripsheetmodel.openThrough = '';
    this.tripsheetmodel.compNonCompStatus = selectedDataValue.compNonCompStatus;
    this.tripsheetmodel.driverMasterID = selectedDataValue.driverMasterID.dataId;
    this.tripsheetmodel.challanNo = selectedDataValue.challanNo?selectedDataValue.challanNo:'';
    this.tripsheetmodel.loadingFrom = selectedDataValue.loadingFrom.dataId;
    this.tripsheetmodel.destination = selectedDataValue.destination.dataId;
    this.tripsheetmodel.distanceTripKM_1 = selectedDataValue.distanceTripKM_1.toString();
    this.tripsheetmodel.contents = selectedDataValue.contents.dataId;
    this.tripsheetmodel.loadEmptyType = selectedDataValue.loadEmptyType;
    this.tripsheetmodel.expectedReportingDt = selectedDataValue.expectedReportingDt;
    this.tripsheetmodel.expectedReportingDays = selectedDataValue.expectedReportingDays;
    this.tripsheetmodel.ltsDslToBe_1 = selectedDataValue.ltsDslToBe_1.toString();
    this.tripsheetmodel.ltsAdblueToBe_1 = selectedDataValue.ltsAdblueToBe_1.toString();
    this.tripsheetmodel.advPayable_1 = selectedDataValue.advPayable_1; 
    this.tripsheetmodel.opBalDriver = selectedDataValue.opBalDriver;
    this.tripsheetmodel.opBalDsl = selectedDataValue.opBalDsl;
    this.tripsheetmodel.opBalAdblue = selectedDataValue.opBalAdblue;    
    this.tripsheetmodel.loggedInUser = this.loggedInUserID;

    this.tripSheetService.otherTripOpenDetailsSubmitted(this.tripsheetmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      this.formOtherTripOpen.reset();
      this.route.navigate(['/othertripopenlist']);
    });
    this.sharedService.loading=false;
  }
}