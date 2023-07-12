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

@Component({
  selector: 'app-addtrippayments',
  templateUrl: './addtrippayments.component.html',
  styleUrls: ['./addtrippayments.component.css']
})
export class AddtrippaymentsComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();


  selectedTripPaymentsDetails = new Trippaymentsmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private trippaymentsmodel: Trippaymentsmodel, private tripPaymentsService: TripPaymentsService, private commonService: CommonService) {
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

  this.selectedTripPaymentsDetails = this.tripPaymentsService.getTripPaymentsDetails();
  this.formUser = this.formBuilder.group({
    pmtBranch: new FormControl('',),
    pmtDate: new FormControl('',),
    vehicleMasterID: new FormControl('',),
    tripNo: new FormControl('',),
    tripMasterId: new FormControl('',),
    driverMasterID: new FormControl('',),
    transType: new FormControl('',),
    amountPaid: new FormControl('',),
    remarks: new FormControl('',),
    pmtType: new FormControl('',),
    neftPmt: new FormControl('',),
    creditAc: new FormControl('',),
    chequeNo: new FormControl('',),
    chequeDate: new FormControl('',),
    findocid: new FormControl('',),
    adjInTrip: new FormControl('',),
    yearId: new FormControl('',),

  });
  if (this.selectedTripPaymentsDetails.pmtId != '') {
    this.formUser.patchValue(this.selectedTripPaymentsDetails);
    this.formUser.patchValue({
    

     
      
    })
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }

 

//Submit user form details //
submitTripPaymentsForm(): void {
  this.userSubmitted = true;
  if (this.formUser.invalid) {
    return;
  }
  this.trippaymentsmodel.pmtId = this.selectedTripPaymentsDetails.pmtId!= '' ? this.selectedTripPaymentsDetails.pmtId : '';
  this.trippaymentsmodel.pmtBranch= this.formUser.value.pmtBranch;
  this.trippaymentsmodel.pmtBranch = this.formUser.value.pmtBranch;
  this.trippaymentsmodel.vehicleMasterID = this.formUser.value.vehicleMasterID;
  this.trippaymentsmodel.tripNo = this.formUser.value.tripNo;
  this.trippaymentsmodel.tripMasterId = this.formUser.value.tripMasterId;
  this.trippaymentsmodel.driverMasterID = this.formUser.value.driverMasterID;
  this.trippaymentsmodel.amountPaid = this.formUser.value.amountPaid;
  this.trippaymentsmodel.remarks = this.formUser.value.remarks;
  this.trippaymentsmodel.pmtType = this.formUser.value.pmtType;
  this.trippaymentsmodel.neftPmt = this.formUser.value.neftPmt;
  this.trippaymentsmodel.creditAc = this.formUser.value.creditAc;
  this.trippaymentsmodel.chequeNo = this.formUser.value.chequeNo;
  this.trippaymentsmodel.chequeDate = this.formUser.value.chequeDate;
  this.trippaymentsmodel.findocid = this.formUser.value.findocid;
  this.trippaymentsmodel.adjInTrip = this.formUser.value.adjInTrip;
  this.trippaymentsmodel.yearId = this.formUser.value.yearId;


  this.tripPaymentsService.trippaymentDetailsSubmitted(this.trippaymentsmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}
}




