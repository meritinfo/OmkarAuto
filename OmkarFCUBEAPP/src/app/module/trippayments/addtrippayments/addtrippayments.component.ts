import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Trippaymentsmodel } from 'src/app/models/trippaymentsmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Tripvehiclemodel } from 'src/app/models/tripvehiclemodel';
import { Tripmodel } from 'src/app/models/tripmodel';
import { Tripdsldetail } from 'src/app/models/tripdsldetail';
import { Trippaymentslistmodel } from 'src/app/models/trippaymentslistmodel';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { TripPaymentsService } from 'src/app/services/trippayments.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtrippayments',
  templateUrl: './addtrippayments.component.html',
  styleUrls: ['./addtrippayments.component.css']
})
export class AddtrippaymentsComponent {
  loggedInUserID: string = '';
  amount: string = '';
  maxDate: string = '';
  minDate: string = '';
  loginDate: string = '';
  branch: string = '';
  year: string = '';
  ptype: string = '';
  trip: string = '';
  formTripPayment!: FormGroup;
  formSubmitted = false;
  userSubmitted = false;
  keywordLocation = 'dataName';
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  createmode = false;
  dslIssued: any;
  advIssued: any;
  tripStatus: string = "";
  neftvalue= "";
  checkselected = false;
  seriesDoc: string = "";

  responseDetails = new Responsemodel();
  tripDetails = new Tripmodel();
  tripDslDetails = new Tripdsldetail();
  tripVehicleDetails = new Tripvehiclemodel();
  branchList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  newList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];


  selectedTripPaymentsDetails = new Trippaymentsmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private trippaymentsmodel: Trippaymentsmodel, private tripPaymentsService: TripPaymentsService, 
    private commonService: CommonService, private toasterService: ToastrService,
    private sharedService: SharedService,private requestmodel:Requestmodel) {
    this.trippaymentsmodel = new Trippaymentsmodel();
  }

  ngOnInit(): void {
    this.sharedService.loading = true;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Trip Payments"));
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
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    else {
      this.route.navigate(['/']);
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;

    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    
   
    //this.changeEWay();
    this.getBranchList();   
    // this.getVehicleList();
    this.getVehicleNoList();
    this.getLocationList();
    //this.getCreditAcList2('');
    //this.getCreditAcList();
    
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    console.log(this.maxDate);

    this.selectedTripPaymentsDetails = this.tripPaymentsService.getTripPaymentsDetails();

    this.formTripPayment = this.formBuilder.group({
      pmtBranch: new FormControl(this.branch , [Validators.required]),
      pmtDate: new FormControl(this.loginDate , [Validators.required]),
      vehicleMasterID: new FormControl('', [Validators.required]),
      tripNo: new FormControl('',),
      tripMasterId: new FormControl('',),   
      transType: new FormControl('', [Validators.required]),
      amountPaid: new FormControl('', [Validators.required]),
      remarks: new FormControl('',),
      pmtType: new FormControl('', [Validators.required]),
      neftPmt: new FormControl('',),
      creditAc: new FormControl('', [Validators.required]),
      chequeNo: new FormControl(''),
      chequeDate: new FormControl('', [Validators.required]),
      findocid: new FormControl('',),
      adjInTrip: new FormControl('',),
      yearId: new FormControl('',),
      userBranch: new FormControl('',),
      from: new FormControl('',),
      to: new FormControl('',),
      loadorempty: new FormControl('',),
      dsltobe: new FormControl('',),
      travelallowance: new FormControl('',),
      qtyLtrs: new FormControl('',),
      ratePerLtr: new FormControl('',),
      travel: new FormControl('',),
    });
    
    this.getCreditAcList2('C');   

    setTimeout(() => {
     this.createmode = true;
      if (this.selectedTripPaymentsDetails.pmtId != '') {
        this.editMode = true;
        this.formTripPayment.controls['pmtBranch'].disable();
        this.formTripPayment.controls['transType'].disable();
        this.formTripPayment.controls['pmtDate'].disable();
        this.formTripPayment.controls['tripNo'].disable();
        this.formTripPayment.controls['loadorempty'].disable();
        this.formTripPayment.controls['loadorempty'].disable();
        this.formTripPayment.controls['loadorempty'].disable();
        this.formTripPayment.controls['pmtBranch'].disable();
        this.formTripPayment.controls['dsltobe'].disable();
        this.formTripPayment.controls['travel'].disable();
        this.formTripPayment.controls['vehicleMasterID'].disable();
        this.seriesDoc = this.selectedTripPaymentsDetails.seriesDoc;
        this.getCreditAcList2(this.selectedTripPaymentsDetails.pmtType);   
        this.formTripPayment.patchValue(this.selectedTripPaymentsDetails);
        this.getTripDetailseditmode(this.selectedTripPaymentsDetails.vehicleMasterID)         
        this.getTripDslDetails(this.selectedTripPaymentsDetails.vehicleMasterID,this.selectedTripPaymentsDetails.tripNo);
        this.getCreditAcList2(this.selectedTripPaymentsDetails.pmtType);
        this.formTripPayment.patchValue({
          pmtDate:   this.commonService.formatDate(this.selectedTripPaymentsDetails.pmtDate), 
          chequeDate:  this.commonService.formatDate(this.selectedTripPaymentsDetails.chequeDate), 
          vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedTripPaymentsDetails.vehicleMasterID),
        })  
        if (this.selectedTripPaymentsDetails.neftPmt=='Y'){
          this.checkselected = true;
          this.formTripPayment.controls['chequeNo'].clearValidators();      
          this.formTripPayment.controls['chequeDt'].clearValidators(); 
          this.formTripPayment.controls['chequeNo'].disable();      
          this.formTripPayment.controls['chequeDt'].disable(); 
        }
        else {
          this.checkselected = false;
          this.formTripPayment.controls['chequeNo'].setValidators([Validators.required]);
          this.formTripPayment.controls['chequeDt'].setValidators([Validators.required]);  
        }
        this.formTripPayment.controls['chequeNo'].updateValueAndValidity();
        this.formTripPayment.controls['chequeDt'].updateValueAndValidity();  
      }
  
      this.getValidation();    
      this.formTripPayment.controls['pmtBranch'].disable();
      this.formTripPayment.controls['pmtDate'].disable();
    }, 2000);
    this.sharedService.loading = false;
  }

  
  onCleared(e: any) {
    this.formTripPayment.patchValue({
      tripNo:  "",
      from:   "",
      to:    "",
      loadorempty:   "",
      travel:    "",
      dsltobe:   "",
      tripMasterId:  "",
    });
  }
 
  getValidation(): void {
    this.formTripPayment.controls['pmtBranch'].disable();
    // this.formTripPayment.controls['pmtDate'].disable();
    this.formTripPayment.controls['tripNo'].disable();
    this.formTripPayment.controls['loadorempty'].disable();
    this.formTripPayment.controls['from'].disable();
    this.formTripPayment.controls['to'].disable();
    this.formTripPayment.controls['dsltobe'].disable();
    this.formTripPayment.controls['travel'].disable();
    // this.formTripPayment.controls['vehicleMasterID'].disable();
    this.formTripPayment.controls['vehicleMasterID'].updateValueAndValidity();
    this.formTripPayment.controls['pmtBranch'].updateValueAndValidity();
    this.formTripPayment.controls['pmtDate'].updateValueAndValidity();
    this.formTripPayment.controls['tripNo'].updateValueAndValidity();
    this.formTripPayment.controls['loadorempty'].updateValueAndValidity();
    this.formTripPayment.controls['pmtfromDate'].updateValueAndValidity();
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formTripPayment.controls; }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  getCreditAcList2(e: any){
    //this.tripVehicleDetails.vehicleMasterId =  e;
    this.ptype = e;
    var data = {
      'pType' : this.ptype
    }
    this.commonService.getCreditAcList2(data).subscribe((res) => {
      this.creditacList = res;
      this.formTripPayment.patchValue({
        creditAc:this.creditacList[0].dataId
      });  
      this.newList = this.creditacList;
    });
  }

  tripPaymentsDelete(): void {
    if(this.tripStatus=="Closed"){
      this.toasterService.warning("Trip already  Closed, Can not Delete ");
      return;
    }
    else{
      if(this.selectedTripPaymentsDetails.pmtId != '' ){
      this.requestmodel.strRequest =this.selectedTripPaymentsDetails.pmtId
        if (confirm("Are you sure, you want to delete this?")) {
              this.tripPaymentsService.tripPaymentsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
              this.responseDetails = res;
              if (this.responseDetails.status) {
                this.toasterService.success(this.responseDetails.message);
                this.formTripPayment.reset();
                this.route.navigate(['/trippaymentlist']);
              }
              else {
                this.toasterService.warning(this.responseDetails.message);
              }
          });
        }
      }
    }
  }

  exit(): void {
    this.route.navigate(['/trippaymentlist']);
  }
  
  getCreditAcList(){
    this.commonService.getCreditAcList().subscribe((res) => {
      this.creditacList = res;    
    }); 
  }
 
  getTripDetails(e: any) {    
    this.tripVehicleDetails.vehicleMasterId =  e.dataId;      
    this.commonService.getTripDetails(this.tripVehicleDetails).subscribe((res: Tripmodel) => {
      this.tripDetails = res;
      this.trip = res.tripNo;
      if (res.fp ==''|| res.fp == null ) {
        this.formTripPayment.patchValue({
          vehicleMasterID:''
        });
        this.toasterService.warning("there is no Open trip for this vehicle");
        return;          
      }        
      else{
        this.formTripPayment.patchValue({
          tripNo: this.tripDetails.tripNo,
          from: this.tripDetails.fp,
          to: this.tripDetails.tp,
          loadorempty: this.tripDetails.loadEmptyType,
          travel: this.tripDetails.travelAllowance,
          dsltobe: this.tripDetails.ltsDslToBe_1,
          tripMasterId: this.tripDetails.tripId,  
        });
        this.getTripDslDetails(this.tripVehicleDetails.vehicleMasterId,this.tripDetails.tripNo);
      }
    });
  }

  getTripDslDetails(e: any,m: any) {    
    this.tripVehicleDetails.vehicleMasterId =  e;
    this.tripVehicleDetails.tripNo =  m;
    this.tripVehicleDetails.yearId=  this.year;    
    this.commonService.getTripDslDetails(this.tripVehicleDetails).subscribe((res: Tripdsldetail) => {
      this.tripDslDetails = res;
      this.dslIssued = res.dslIssued;
      this.advIssued = res.advIssued;      
      this.tripStatus = res.tripStatus;  
    });

  }

  getTripDetailseditmode(e: any) {
    this.tripVehicleDetails.vehicleMasterId =  e;
    this.commonService.getTripDetails(this.tripVehicleDetails).subscribe((res: Tripmodel) => {
      this.tripDetails = res;
      this.formTripPayment.patchValue({
        // cneeGst:  (this.ExpectedReportingDays).toString() 
        tripNo:   this.tripDetails.tripNo,
        from:   this.tripDetails.fp,
        to:   this.tripDetails.tp,
        loadorempty:   this.tripDetails.loadEmptyType,
        travel:   this.tripDetails.travelAllowance,
        dsltobe:   this.tripDetails.ltsDslToBe_1,
        tripMasterId:  this.tripDetails.tripId,           
      });
      // this.getValidation();
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

  startWithFilter = function (partyList: Dropdownmodel[], query: string): any[] {
    return partyList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  getVehicleList(): void {
    this.commonService.getVehicleList().subscribe((res) => {
      this.vehicleList = res;
    });
  }

  getVehicleNoList(): void {
    this.commonService.getVehicleNoList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }

  changeTransType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    if (selectedValue == "DL") {
      this.formTripPayment.controls['qtyLtrs'].enable();
      this.formTripPayment.controls['ratePerLtr'].enable();
      this.formTripPayment.controls['qtyLtrs'].setValidators([Validators.required]);
      this.formTripPayment.controls['amountPaid'].clearValidators();
    }
    else {
      this.formTripPayment.controls['qtyLtrs'].disable();
      this.formTripPayment.controls['ratePerLtr'].disable();
      this.formTripPayment.controls['qtyLtrs'].clearValidators();
      this.formTripPayment.controls['amountPaid'].setValidators([Validators.required]);
    }
    this.formTripPayment.controls['qtyLtrs'].updateValueAndValidity();
    this.formTripPayment.controls['amountPaid'].updateValueAndValidity();
  }

  calculateTotalAmount() {
    let total = '';
    if (this.formTripPayment.value.qtyLtrs!= "" && this.formTripPayment.value.ratePerLtr!= "") {
      var qtyLtrs = this.formTripPayment.value.qtyLtrs ? parseFloat(this.formTripPayment.value.qtyLtrs) : 0;
      var ratePerLtr = this.formTripPayment.value.ratePerLtr ? parseFloat(this.formTripPayment.value.ratePerLtr) : 0;
      var amountPaid = this.formTripPayment.value.paidAmount ? parseFloat(this.formTripPayment.value.paidAmount) : 0;
      total = (qtyLtrs * ratePerLtr).toString() ;      
    }
    this.formTripPayment.patchValue({
      amountPaid: total,    
    });
  }
 
  onNeftChk(e: any) {
    this.checkselected=!this.checkselected;
    if (this.checkselected){
      this.formTripPayment.controls['chequeNo'].clearValidators();      
      this.formTripPayment.controls['chequeDate'].clearValidators();   
      this.formTripPayment.controls['chequeNo'].disable();
      this.formTripPayment.controls['chequeDate'].disable();
      this.formTripPayment.patchValue({
        chequeNo:'',
        chequeDt:'',
      });   
    }
    else {
      this.formTripPayment.controls['chequeNo'].setValidators([Validators.required]);
      this.formTripPayment.controls['chequeDate'].setValidators([Validators.required]);
      this.formTripPayment.controls['chequeNo'].enable();
      this.formTripPayment.controls['chequeDate'].enable();
    }
    this.formTripPayment.controls['chequeNo'].updateValueAndValidity();
    this.formTripPayment.controls['chequeDate'].updateValueAndValidity();
  }

  changePmtType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
     
    if (selectedValue == 'B'){
      this.formTripPayment.controls['neftPmt'].enable();
      this.formTripPayment.controls['chequeNo'].enable();
      this.formTripPayment.controls['chequeDate'].enable();
      this.formTripPayment.controls['chequeNo'].setValidators([Validators.required]);
      this.formTripPayment.controls['chequeDate'].setValidators([Validators.required]);
     // this.getCreditAcList2(selectedValue); 
    }
    else {
      this.checkselected = false;  
      this.formTripPayment.controls['neftPmt'].disable();
      this.formTripPayment.controls['chequeNo'].disable();
      this.formTripPayment.controls['chequeDate'].disable();
      this.formTripPayment.controls['chequeNo'].clearValidators();      
      this.formTripPayment.controls['chequeDate'].clearValidators();   
    //  this.getCreditAcList2(selectedValue); 
    }

    this.formTripPayment.controls['chequeNo'].updateValueAndValidity();
    this.formTripPayment.controls['chequeDate'].updateValueAndValidity();

    this.ptype = e.target.value;
    if (selectedValue == 'B' ||selectedValue == 'C' ||selectedValue == 'A'){
      this.formTripPayment.controls['amountPaid'].setValidators([Validators.required]);
      this.formTripPayment.controls['amountPaid'].updateValueAndValidity();
    }
    else{
      this.formTripPayment.controls['amountPaid'].clearValidators();  
      this.formTripPayment.controls['amountPaid'].updateValueAndValidity();
    }
    //this.getCreditAcList2(this.ptype);   
    this.getCreditAcList2(selectedValue);   
  }
   
  submitTripPaymentsForm(): void {
    if(this.tripStatus=="Closed"){
      this.toasterService.warning("Trip already Closed, Can not Save ");
      return;
    }
    else{
      this.userSubmitted = true;
      if (this.formTripPayment.invalid) {
        this.toasterService.warning("Please Enter Mandatory Fields ");   
        const controls = this.formTripPayment.controls;
        for (const name in controls) {
          if (controls[name].invalid) {
            this.toasterService.warning(name + " Fields is Invalid");   
          }
        }
        return;
      }

      var selectedDataValue = this.formTripPayment.getRawValue();
      if (selectedDataValue.transType == "DA") {
        if(parseFloat(selectedDataValue.amountPaid)>0){
          //ignore
        }
        else{
          this.toasterService.warning("Please Enter Advcance Amount ");           
          return;
        }
      }
      else{
        if(parseFloat(selectedDataValue.qtyLtrs)>0){
          //ignore
        }
        else{
          this.toasterService.warning("Please Enter Qty Liters ");          
          return;
        }
      }   

      var chqDt = this.loginDate;
      if (selectedDataValue.pmtType=="B"){
        chqDt = selectedDataValue.chequeDt == '' ? this.loginDate:selectedDataValue.chequeDt;
      }
      this.trippaymentsmodel.pmtId = this.selectedTripPaymentsDetails.pmtId ;
      this.trippaymentsmodel.pmtBranch = selectedDataValue.pmtBranch;
      this.trippaymentsmodel.pmtDate = selectedDataValue.pmtDate;
      this.trippaymentsmodel.tripNo = selectedDataValue.tripNo;
      this.trippaymentsmodel.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
      this.trippaymentsmodel.tripMasterId = selectedDataValue.tripMasterId;
      this.trippaymentsmodel.amountPaid = selectedDataValue.amountPaid.toString();
      this.trippaymentsmodel.remarks = selectedDataValue.remarks;
      this.trippaymentsmodel.pmtType = selectedDataValue.pmtType;
      this.trippaymentsmodel.transType = selectedDataValue.transType;
      this.trippaymentsmodel.neftPmt = selectedDataValue.neftPmt;
      this.trippaymentsmodel.creditAc = selectedDataValue.creditAc;
      this.trippaymentsmodel.chequeNo =selectedDataValue.chequeNo;
      this.trippaymentsmodel.chequeDate = selectedDataValue.chequeDate;
      this.trippaymentsmodel.findocid = selectedDataValue.findocid;
      this.trippaymentsmodel.adjInTrip = selectedDataValue.adjInTrip;
      this.trippaymentsmodel.qtyLtrs = selectedDataValue.qtyLtrs;
      this.trippaymentsmodel.ratePerLtr = selectedDataValue.ratePerLtr;    
      this.trippaymentsmodel.yearId = this.year;
      this.trippaymentsmodel.loggedInUser = this.loggedInUserID;

      if( this.trippaymentsmodel.pmtId!=''){
        this.tripPaymentsService.trippaymentEditSubmitted(this.trippaymentsmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formTripPayment.reset();
            this.route.navigate(['/trippaymentlist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          } 
        });
      }
      else{
        this.tripPaymentsService.trippaymentSaveSubmitted(this.trippaymentsmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (this.responseDetails.status) {
            this.toasterService.success(this.responseDetails.message);
            this.formTripPayment.reset();
            this.route.navigate(['/trippaymentlist']);
          }
          else {
            this.toasterService.warning(this.responseDetails.message);
          }
        });
      }
    }
  }
}