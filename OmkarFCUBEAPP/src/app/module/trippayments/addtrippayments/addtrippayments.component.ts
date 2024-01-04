import { Component } from '@angular/core';





import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
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
import { UserService } from 'src/app/services/user.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtrippayments',
  templateUrl: './addtrippayments.component.html',
  styleUrls: ['./addtrippayments.component.css']
})
export class AddtrippaymentsComponent {
  loggedInUserID: string = '';
  ttype: string = '';
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
  neftvalue= "";

  responseDetails = new Responsemodel();
  tripDetails = new Tripmodel();
  tripDslDetails = new Tripdsldetail();
  tripVehicleDetails = new Tripvehiclemodel();
  branchList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  creditacListNew: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  newList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];


  selectedTripPaymentsDetails = new Trippaymentsmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private trippaymentsmodel: Trippaymentsmodel, private tripPaymentsService: TripPaymentsService, private commonService: CommonService, private toasterService: ToastrService,private sharedService: SharedService,private requestmodel:Requestmodel) {
    this.trippaymentsmodel = new Trippaymentsmodel();


  }
  ngOnInit(): void {
    this.sharedService.loading = true;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList).find((( aa: { menuName: string; }) => aa.menuName === "Trip Payments"));
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
      chequeNo: new FormControl('', [Validators.required]),
      chequeDate: new FormControl(this.loginDate , [Validators.required]),
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
    setTimeout(() => {
     this.createmode = true;
    if (this.selectedTripPaymentsDetails.pmtId != '') {
      this.formTripPayment.patchValue(this.selectedTripPaymentsDetails);
      this.formTripPayment.controls['pmtBranch'].disable();
      this.formTripPayment.controls['pmtDate'].disable();
      this.formTripPayment.controls['tripNo'].disable();
      this.formTripPayment.controls['loadorempty'].disable();
      this.formTripPayment.controls['loadorempty'].disable();
      this.formTripPayment.controls['loadorempty'].disable();
      this.formTripPayment.controls['pmtBranch'].disable();
      this.formTripPayment.controls['dsltobe'].disable();
      this.formTripPayment.controls['travel'].disable();
     // this.formTripPayment.controls['vehicleMasterID'].disable();
     
 
      var selectedDataValue = this.formTripPayment.getRawValue();
      this. getTripDetailseditmode(selectedDataValue.vehicleMasterID) 
      this.getCreditAcList2(selectedDataValue.pmtType);
      //this.getCreditAcList();
      this.formTripPayment.controls['vehicleMasterID'].disable();
      this.formTripPayment.controls['vehicleMasterID'].setValidators([Validators.required]);
    
      this.formTripPayment.patchValue({
      
        pmtBranch:  selectedDataValue.pmtBranch, 
        pmtDate:   this.commonService.formatDate(selectedDataValue.pmtDate), 
        chequeDate:  this.commonService.formatDate(selectedDataValue.chequeDate), 
        tripNo:  selectedDataValue.tripNo, 
        loadorempty:  selectedDataValue.loadorempty, 
       vehicleMasterID: this.vehicleList.find(e => e.dataId == selectedDataValue.vehicleMasterID),
      //creditAc: this.newList.find(e => e.dataId == selectedDataValue.creditAc),
      
    
       //neftPmt:  "1", 
      
   
      // from: this.locationList.find(e => e.dataId == selectedDataValue.from),
      // to: this.locationList.find(e => e.dataId == selectedDataValue.to),
      //  vehicleMasterID: this.vehicleList.find(e => e.dataId == this.selectedTripPaymentsDetails.vehicleMasterID),
        
       
    // vehicleMasterID: this.selectedTripPaymentsDetails.vehicleMasterID,
      
      })
    }
  
    this.getValidation();
    
       this.formTripPayment.controls['pmtBranch'].disable();

    this.formTripPayment.controls['pmtDate'].disable();
  }, 2000);
  this.editMode = true;
  this.sharedService.loading = false;

  }
  tripPaymentsDelete(): void {
    if(this.selectedTripPaymentsDetails.pmtId != '' ){
     this.requestmodel.strRequest =this.selectedTripPaymentsDetails.pmtId
      if (confirm("Are you sure, you want to delete this?")) {
            this.tripPaymentsService.tripPaymentsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            console.log(this.responseDetails.message);
            this.formTripPayment.reset();
            window.location.reload();
        });
      }
    }
  }
  onCleared(e: any) {
    this.formTripPayment.patchValue({
    // destination: undefined,
            tripNo:  "",
            from:   "",
            to:    "",
            loadorempty:   "",
            travel:    "",
            dsltobe:   "",
            tripMasterId:  "",
    });
   // this.checkDestinationControlStatus();
  }
 
  getValidation(): void {
    this.formTripPayment.controls['pmtBranch'].disable();
 //   this.formTripPayment.controls['pmtDate'].disable();
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
      this.newList = this.creditacList;
    });


  }
  deleteTripPaymentsForm(): void {
    if (confirm("Are you sure, you want to delete this?")) {

    }
  }
  exit(): void {
    this.route.navigate(['/trippaymentlist']);
  }
  
  getCreditAcList(){
    //this.tripVehicleDetails.vehicleMasterId =  e;
     // this.ptype = e;
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
//date2 =this.commonService.formatDate(date2)
//const myFormattedDate = this.commonService.formatDate(date2);

       //   this.getValidation();
        
        else{
          
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
           this.getTripDslDetails( this.tripVehicleDetails.vehicleMasterId,this.tripDetails.tripNo);
         
        }
      });
    //  this.getTripDetails()
   

  }
  getTripDslDetails(e: any,m: any) {
    
    this.tripVehicleDetails.vehicleMasterId =  e;
    this.tripVehicleDetails.tripNo =  m;
    this.tripVehicleDetails.yearId=  this.year;
    
    this.commonService.getTripDslDetails(this.tripVehicleDetails).subscribe((res: Tripdsldetail) => {
      this.tripDslDetails = res;

  this.dslIssued = res.dslIssued;
  this.advIssued = res.advIssued;

   
        
       // this.formTripPayment.patchValue({
          // cneeGst:  (this.ExpectedReportingDays).toString() 
       //   tripNo:   this.tripDetails.tripNo,
       //   from:   this.tripDetails.fp,
     
          
         
            
      //   });
       
      
    });

}
  getTripDetailseditmode(e: any) {
    
    this.tripVehicleDetails.vehicleMasterId =  e;
    
    this.commonService.getTripDetails(this.tripVehicleDetails).subscribe((res: Tripmodel) => {
      this.tripDetails = res;
     // if (this.tripkmsDetails.status) {
     
//date2 =this.commonService.formatDate(date2)
//const myFormattedDate = this.commonService.formatDate(date2);

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
     //   this.getValidation();
     this.getTripDslDetails( this.tripVehicleDetails.vehicleMasterId,this.tripDetails.tripNo);
     
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
  deleteTripPaymentForm(): void {
    if (confirm("Are you sure, you want to delete this?")) {

    }
  }
  changeTransType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
 

    if (selectedValue == "DL") {
      this.formTripPayment.controls['qtyLtrs'].setValidators([Validators.required]);
     // this.formTripPayment.controls['ratePerLtr'].setValidators([Validators.required]);
    }
    else {
      this.formTripPayment.controls['qtyLtrs'].clearValidators();
     // this.formTripPayment.controls['ratePerLtr'].clearValidators();
    }
    this.formTripPayment.controls['qtyLtrs'].updateValueAndValidity();
   // this.formTripPayment.controls['ratePerLtr'].updateValueAndValidity();
  }
  calculateTotalAmount() {
    let total = 0;
    if (this.formTripPayment.value.qtyLtrs!= "" && this.formTripPayment.value.ratePerLtr!= "") {
    var qtyLtrs = this.formTripPayment.value.qtyLtrs ? parseFloat(this.formTripPayment.value.qtyLtrs) : 0;
    var ratePerLtr = this.formTripPayment.value.ratePerLtr ? parseFloat(this.formTripPayment.value.ratePerLtr) : 0;
    var amountPaid = this.formTripPayment.value.paidAmount ? parseFloat(this.formTripPayment.value.paidAmount) : 0;

    total = qtyLtrs * ratePerLtr ;

    this.formTripPayment.patchValue({
      amountPaid: total,
      
      
    });
  }
  else{
    
    this.formTripPayment.patchValue({
      amountPaid: '',
      
      
    });
   
  }
  }

 
    
  

  changeNEFTValue(e: any){
    console.log(e.target.checked);
    var selectedValue = e.target.checked;
    if(selectedValue){
      this.formTripPayment.controls['chequeNo'].clearValidators();
     // this.formTripPayment.controls['chequeDate'].clearValidators();
     this.formTripPayment.patchValue({
      chequeDate:  this.loginDate ,
      
      
    });

    }
    else{
      this.formTripPayment.controls['chequeNo'].setValidators([Validators.required]);
     // this.formTripPayment.controls['chequeDate'].setValidators([Validators.required]);
    }
    this.formTripPayment.controls['chequeNo'].updateValueAndValidity();
    this.formTripPayment.controls['chequeDate'].updateValueAndValidity();
  }
  changePmtType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    this.ptype = e.target.value;
    this.getCreditAcList2(this.ptype);
    if (selectedValue == "2") {
      
      this.formTripPayment.controls['chequeNo'].setValidators([Validators.required]);
      this.formTripPayment.controls['chequeDate'].setValidators([Validators.required]);
    }
    else {
      this.formTripPayment.controls['chequeNo'].clearValidators();
      this.formTripPayment.controls['chequeDate'].clearValidators();
      
    }
    this.formTripPayment.controls['chequeNo'].updateValueAndValidity();
    this.formTripPayment.controls['chequeDate'].updateValueAndValidity();
  }
  

  //Submit user form details //
  submitTripPaymentsForm(): void {
    this.userSubmitted = true;
    if (this.formTripPayment.invalid) {
      this.toasterService.warning("Mandatory fields is required");
      return;
    }
    var selectedDataValue = this.formTripPayment.getRawValue();
    this.trippaymentsmodel.pmtId = this.selectedTripPaymentsDetails.pmtId != '' ? this.selectedTripPaymentsDetails.pmtId : '';
    this.trippaymentsmodel.pmtBranch = selectedDataValue.pmtBranch;
    this.trippaymentsmodel.pmtDate = selectedDataValue.pmtDate;

    this.trippaymentsmodel.tripNo = selectedDataValue.tripNo;
    this.trippaymentsmodel.vehicleMasterID = selectedDataValue.vehicleMasterID.dataId;
   // this.trippaymentsmodel.tripMasterId = selectedDataValue.tripId;tripMasterId
   this.trippaymentsmodel.tripMasterId = selectedDataValue.tripMasterId;

    this.trippaymentsmodel.amountPaid = selectedDataValue.amountPaid.toString();
    this.trippaymentsmodel.remarks = selectedDataValue.remarks;
    this.trippaymentsmodel.pmtType = selectedDataValue.pmtType;
    this.trippaymentsmodel.transType = selectedDataValue.transType;
    this.trippaymentsmodel.neftPmt = selectedDataValue.neftPmt  ? "1" : "";
  //this.trippaymentsmodel.neftPmt = selectedDataValue.neftPmt ;
    this.trippaymentsmodel.creditAc = selectedDataValue.creditAc;
    this.trippaymentsmodel.chequeNo =selectedDataValue.chequeNo;
    this.trippaymentsmodel.chequeDate = selectedDataValue.chequeDate;
    this.trippaymentsmodel.findocid = selectedDataValue.findocid;
    this.trippaymentsmodel.adjInTrip = selectedDataValue.adjInTrip;
    this.trippaymentsmodel.qtyLtrs = selectedDataValue.qtyLtrs;
    this.trippaymentsmodel.ratePerLtr = selectedDataValue.ratePerLtr;
    
    this.trippaymentsmodel.yearId = this.year;
    this.ttype = this.formTripPayment.value.transType;
    this.trippaymentsmodel.loggedInUser = this.loggedInUserID;
    
    this.tripPaymentsService.trippaymentDetailsSubmitted(this.trippaymentsmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;

      console.log(this.responseDetails.message);
    
      this.formTripPayment.reset();
   
      window.location.reload();
    });
  }
}