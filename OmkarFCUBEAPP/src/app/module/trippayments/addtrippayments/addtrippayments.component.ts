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
  formUser2!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];


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
  this.getBranchList();
  this.selectedTripPaymentsDetails = this.tripPaymentsService.getTripPaymentsDetails();
  this.formUser2 = this.formBuilder.group({
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
    userBranch: new FormControl('',),

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

//Submit user form details //
submitTripPaymentsForm(): void {
  this.userSubmitted = true;
  if (this.formUser2.invalid) {
    return;
  }
  this.trippaymentsmodel.pmtId = this.selectedTripPaymentsDetails.pmtId!= '' ? this.selectedTripPaymentsDetails.pmtId : '';
  this.trippaymentsmodel.pmtBranch= this.formUser2.value.pmtBranch;
  this.trippaymentsmodel.pmtBranch = this.formUser2.value.pmtBranch;
  this.trippaymentsmodel.vehicleMasterID = this.formUser2.value.vehicleMasterID;
  this.trippaymentsmodel.tripNo = this.formUser2.value.tripNo;
  this.trippaymentsmodel.tripMasterId = this.formUser2.value.tripMasterId;
  this.trippaymentsmodel.driverMasterID = this.formUser2.value.driverMasterID;
  this.trippaymentsmodel.amountPaid = this.formUser2.value.amountPaid;
  this.trippaymentsmodel.remarks = this.formUser2.value.remarks;
  this.trippaymentsmodel.pmtType = this.formUser2.value.pmtType;
  this.trippaymentsmodel.neftPmt = this.formUser2.value.neftPmt;
  this.trippaymentsmodel.creditAc = this.formUser2.value.creditAc;
  this.trippaymentsmodel.chequeNo = this.formUser2.value.chequeNo;
  this.trippaymentsmodel.chequeDate = this.formUser2.value.chequeDate;
  this.trippaymentsmodel.findocid = this.formUser2.value.findocid;
  this.trippaymentsmodel.adjInTrip = this.formUser2.value.adjInTrip;
  this.trippaymentsmodel.yearId = this.formUser2.value.yearId;


  this.tripPaymentsService.trippaymentDetailsSubmitted(this.trippaymentsmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser2.reset();
    window.location.reload();
  });
}
}




