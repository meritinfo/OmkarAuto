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
  formUser2!: FormGroup;
  formSubmitted = false;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];


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

  this.selectedTripPaymentsDetails = this.tripPaymentsService.getTripPaymentsDetails();
  this.formUser2 = this.formBuilder.group({
    pmtBranch: new FormControl('',[Validators.required]),
    pmtDate: new FormControl('',[Validators.required]),
    vehicleMasterID: new FormControl('', [Validators.required]),
    tripNo: new FormControl('',),
    tripMasterId: new FormControl('',),

    transType: new FormControl('', [Validators.required]),
    amountPaid: new FormControl('',  [Validators.required]),
    remarks: new FormControl('',),
    pmtType: new FormControl('', [Validators.required]),
    neftPmt: new FormControl('',),
    creditAc: new FormControl('',  [Validators.required]),
    chequeNo: new FormControl('',[Validators.required]),
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
    this.formUser2.patchValue(this.selectedTripPaymentsDetails);
    this.formUser2.patchValue({
    

     
      
    })
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser2.controls; }

getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  }); 
}
getVehicleList(): void {
  this.commonService.getVehicleList().subscribe((res) => {
    this.vehicleList = res;
  }); 
}
changeEWay(e: any) {
  console.log(e.target.value);
  var selectedValue = e.target.value;
 // if (selectedValue === "E") {
  if (selectedValue  === "E") {
    this.formUser2.controls['chequeNo'].clearValidators();
    this.formUser2.controls['chequeDate'].clearValidators();
    this.formUser2.controls['chequeNo'].updateValueAndValidity();
    this.formUser2.controls['chequeDate'].updateValueAndValidity();
   
  
   }
  if( this.ttype=="DL"){
    this.formUser2.controls['qtyLtrs'].setValidators([Validators.required]);
    this.formUser2.controls['ratePerLtr'].setValidators([Validators.required]);

  }
    //Remove field validation
    this.formUser2.controls['pmtBranch'].clearValidators();
    this.formUser2.controls['pmtDate'].clearValidators();
    this.formUser2.controls['vehicleMasterID'].clearValidators();
    this.formUser2.controls['transType'].clearValidators();
    this.formUser2.controls['amountPaid'].clearValidators();
    this.formUser2.controls['pmtType'].clearValidators();
    this.formUser2.controls['creditAc'].clearValidators();
    this.formUser2.controls['qtyLtrs'].clearValidators();
    this.formUser2.controls['ratePerLtr'].clearValidators();
    this.formUser2.controls['chequeNo'].clearValidators();
    this.formUser2.controls['chequeDate'].clearValidators();

 
    //Disable field

 
   // this.formUser2.controls['cnorCode'].disable();
  
  
  
    //Add field validation
    this.formUser2.controls['pmtBranch'].setValidators([Validators.required]);
    this.formUser2.controls['pmtDate'].setValidators([Validators.required]);
    this.formUser2.controls['vehicleMasterID'].setValidators([Validators.required]);
    this.formUser2.controls['transType'].setValidators([Validators.required]);
    this.formUser2.controls['amountPaid'].setValidators([Validators.required]);
    this.formUser2.controls['pmtType'].setValidators([Validators.required]);
    this.formUser2.controls['creditAc'].setValidators([Validators.required]);
    
    
    //Enable field
    
   // this.formUser2.controls['pmtBranch'].enable();
 

 
   
  

  //}
  

  this.formUser2.controls['pmtBranch'].updateValueAndValidity();
  this.formUser2.controls['pmtDate'].updateValueAndValidity();
  this.formUser2.controls['vehicleMasterID'].updateValueAndValidity();
  this.formUser2.controls['transType'].updateValueAndValidity();
  this.formUser2.controls['amountPaid'].updateValueAndValidity();
  this.formUser2.controls['pmtType'].updateValueAndValidity();
  this.formUser2.controls['creditAc'].updateValueAndValidity();
  this.formUser2.controls['qtyLtrs'].updateValueAndValidity();
  this.formUser2.controls['ratePerLtr'].updateValueAndValidity();
  this.formUser2.controls['chequeNo'].updateValueAndValidity();
  this.formUser2.controls['chequeDate'].updateValueAndValidity();
 

}

//Submit user form details //
submitTripPaymentsForm(): void {
  this.userSubmitted = true;
  if (this.formUser2.invalid) {
    this.toasterService.warning("Mandatory fields is required");
    return;
  }
  
  this.trippaymentsmodel.pmtId = this.selectedTripPaymentsDetails.pmtId!= '' ? this.selectedTripPaymentsDetails.pmtId : '';
  this.trippaymentsmodel.pmtBranch= this.formUser2.value.pmtBranch;
  this.trippaymentsmodel.pmtDate = this.formUser2.value.pmtDate;
 
  this.trippaymentsmodel.tripNo = this.formUser2.value.tripNo;
  this.trippaymentsmodel.vehicleMasterID = this.formUser2.value.vehicleMasterID;
  this.trippaymentsmodel.tripMasterId = this.formUser2.value.tripMasterId;

  this.trippaymentsmodel.amountPaid = this.formUser2.value.amountPaid;
  this.trippaymentsmodel.remarks = this.formUser2.value.remarks;
  this.trippaymentsmodel.pmtType = this.formUser2.value.pmtType;
  this.trippaymentsmodel.transType = this.formUser2.value.transType;
  this.trippaymentsmodel.neftPmt = this.formUser2.value.neftPmt;
  this.trippaymentsmodel.creditAc = this.formUser2.value.creditAc;
  this.trippaymentsmodel.chequeNo = this.formUser2.value.chequeNo;
  this.trippaymentsmodel.chequeDate = this.formUser2.value.chequeDate;
  this.trippaymentsmodel.findocid = this.formUser2.value.findocid;
  this.trippaymentsmodel.adjInTrip = this.formUser2.value.adjInTrip;
  this.trippaymentsmodel.qtyLtrs = this.formUser2.value.qtyLtrs;
  this.trippaymentsmodel.ratePerLtr = this.formUser2.value.ratePerLtr;
  this.trippaymentsmodel.yearId = this.formUser2.value.yearId;
this.ttype=  this.formUser2.value.transType;

  this.tripPaymentsService.trippaymentDetailsSubmitted(this.trippaymentsmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser2.reset();
    window.location.reload();
  });
}
}




