import { Component } from '@angular/core';





import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Trippaymentsmodel } from 'src/app/models/trippaymentsmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Trippaymentslistmodel } from 'src/app/models/trippaymentslistmodel';
import { CommonService } from 'src/app/services/common.service';
import { TripPaymentsService } from 'src/app/services/trippayments.service';
import { UserService } from 'src/app/services/user.service';
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
  formTripPayment!: FormGroup;
  formSubmitted = false;
  userSubmitted = false;
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];


  selectedTripPaymentsDetails = new Trippaymentsmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private trippaymentsmodel: Trippaymentsmodel, private tripPaymentsService: TripPaymentsService, private commonService: CommonService, private toasterService: ToastrService) {
    this.trippaymentsmodel = new Trippaymentsmodel();


  }
  ngOnInit(): void {
    var userData = localStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }

    //this.changeEWay();
    this.getBranchList();
    this.getVehicleList();
    this.getLocationList();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    console.log(this.maxDate);

    this.selectedTripPaymentsDetails = this.tripPaymentsService.getTripPaymentsDetails();

    this.formTripPayment = this.formBuilder.group({
      pmtBranch: new FormControl('', [Validators.required]),
      pmtDate: new FormControl('', [Validators.required]),
      vehicleMasterID: new FormControl('', [Validators.required]),
      tripNo: new FormControl('',),
      tripMasterId: new FormControl('',),

      transType: new FormControl('', [Validators.required]),
      amountPaid: new FormControl('0', [Validators.required]),
      remarks: new FormControl('',),
      pmtType: new FormControl('', [Validators.required]),
      neftPmt: new FormControl('',),
      creditAc: new FormControl('', [Validators.required]),
      chequeNo: new FormControl('', [Validators.required]),
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
    if (this.selectedTripPaymentsDetails.pmtId != '') {
      this.formTripPayment.patchValue(this.selectedTripPaymentsDetails);
      this.formTripPayment.controls['pmtBranch'].disable();
      this.formTripPayment.controls['pmtDate'].disable();
      this.formTripPayment.controls['tripNo'].disable();
      this.formTripPayment.controls['loadorempty'].disable();
      this.formTripPayment.controls['loadorempty'].disable();
      this.formTripPayment.controls['vehicleMasterID'].disable();
      this.formTripPayment.patchValue({
        



      })
    }


  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formTripPayment.controls; }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
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
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  changeTransType(e: any) {
    console.log(e.target.value);
    var selectedValue = e.target.value;
    if (selectedValue == "DL") {
      this.formTripPayment.controls['qtyLtrs'].setValidators([Validators.required]);
      this.formTripPayment.controls['ratePerLtr'].setValidators([Validators.required]);
    }
    else {
      this.formTripPayment.controls['qtyLtrs'].clearValidators();
      this.formTripPayment.controls['ratePerLtr'].clearValidators();
    }
    this.formTripPayment.controls['qtyLtrs'].updateValueAndValidity();
    this.formTripPayment.controls['ratePerLtr'].updateValueAndValidity();
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
      this.formTripPayment.controls['chequeDate'].clearValidators();
    }
    else{
      this.formTripPayment.controls['chequeNo'].setValidators([Validators.required]);
      this.formTripPayment.controls['chequeDate'].setValidators([Validators.required]);
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

    this.trippaymentsmodel.pmtId = this.selectedTripPaymentsDetails.pmtId != '' ? this.selectedTripPaymentsDetails.pmtId : '';
    this.trippaymentsmodel.pmtBranch = this.formTripPayment.value.pmtBranch;
    this.trippaymentsmodel.pmtDate = this.formTripPayment.value.pmtDate;

    this.trippaymentsmodel.tripNo = this.formTripPayment.value.tripNo;
    this.trippaymentsmodel.vehicleMasterID = this.formTripPayment.value.vehicleMasterID;
    this.trippaymentsmodel.tripMasterId = this.formTripPayment.value.tripMasterId;

    this.trippaymentsmodel.amountPaid = this.formTripPayment.value.amountPaid;
    this.trippaymentsmodel.remarks = this.formTripPayment.value.remarks;
    this.trippaymentsmodel.pmtType = this.formTripPayment.value.pmtType;
    this.trippaymentsmodel.transType = this.formTripPayment.value.transType;
    this.trippaymentsmodel.neftPmt = this.formTripPayment.value.neftPmt;
    this.trippaymentsmodel.creditAc = this.formTripPayment.value.creditAc;
    this.trippaymentsmodel.chequeNo = this.formTripPayment.value.chequeNo;
    this.trippaymentsmodel.chequeDate = this.formTripPayment.value.chequeDate;
    this.trippaymentsmodel.findocid = this.formTripPayment.value.findocid;
    this.trippaymentsmodel.adjInTrip = this.formTripPayment.value.adjInTrip;
    this.trippaymentsmodel.qtyLtrs = this.formTripPayment.value.qtyLtrs;
    this.trippaymentsmodel.ratePerLtr = this.formTripPayment.value.ratePerLtr;
    this.trippaymentsmodel.yearId = this.formTripPayment.value.yearId;
    this.ttype = this.formTripPayment.value.transType;
    
    this.tripPaymentsService.trippaymentDetailsSubmitted(this.trippaymentsmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;

      console.log(this.responseDetails.message);
    
      this.formTripPayment.reset();
   
      window.location.reload();
    });
  }
}