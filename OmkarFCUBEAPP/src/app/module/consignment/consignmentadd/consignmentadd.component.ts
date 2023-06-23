import { Component } from '@angular/core';





import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Consignmentlistmodel } from 'src/app/models/consignmentlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { ConsignmentService } from 'src/app/services/consignment.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-consignmentadd',
  templateUrl: './consignmentadd.component.html',
  styleUrls: ['./consignmentadd.component.css']
})
export class ConsignmentaddComponent {
  loggedInUserID: string = '';
  formUser!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];


  selectedConsignmentDetails = new Consignmentmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private consignmentmodel: Consignmentmodel, private consignmentService: ConsignmentService, private commonService: CommonService) {
    this.consignmentmodel = new Consignmentmodel();




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
  this.selectedConsignmentDetails = this.consignmentService.getConsignmentDetails();
  this.formUser = this.formBuilder.group({
    bookingPlace: new FormControl('',),
    gccSeries: new FormControl('',),
    gcAlpha: new FormControl('',),
    gcNoteNo: new FormControl('',),
    gcSlNo: new FormControl('',),
    bookingDate: new FormControl('',),
    bookingStatus: new FormControl('',),
    ewayBillEntryType: new FormControl('',),
    ewayBillNo: new FormControl('',),
    ewayBillDate: new FormControl('',),
    ewayBillExpDate: new FormControl('',),
    ewayBillExpExtDate: new FormControl('',),
    fromPlace: new FormControl('',),
    toPlace: new FormControl('',),
    kms: new FormControl('',),
    billingBranch: new FormControl('',),
    cnorCode: new FormControl('',),
    cneeCode: new FormControl('',),
    cnorInvNo: new FormControl('',),
    cnorInvDate: new FormControl('',),
    poNo: new FormControl('',),
    poDate: new FormControl('',),
    woNo: new FormControl('',),
    woDate: new FormControl('',),
    riskBy: new FormControl('',),
    ownTruck: new FormControl('',),
    truckId: new FormControl('',),
    truckNo: new FormControl('',),
    productId: new FormControl('',),
    gstHSN: new FormControl('',),
    noPackages: new FormControl('',),
    weightType: new FormControl('',),
    actualWt: new FormControl('',),
    chargewt: new FormControl('',),
    bulkYN: new FormControl('',),
    loadLength: new FormControl('',),
    loadWidth: new FormControl('',),
    loadHeight: new FormControl('',),
    loadCFT: new FormControl('',),
    delType: new FormControl('',),
    loadType: new FormControl('',),
    rateType: new FormControl('',),
    privateMark: new FormControl('',),
    staxGstBy: new FormControl('',),
    rateRs: new FormControl('',),
    freightRs: new FormControl('',),
    statisticalRs: new FormControl('',),
    aocRs: new FormControl('',),
    fovRs: new FormControl('',),
    handlingRs: new FormControl('',),
    doorCollRs: new FormControl('',),
    doorDeliRs: new FormControl('',),
    withPassRs: new FormControl('',),
    insuranceRs: new FormControl('',),
    packingRs: new FormControl('',),
    dccRs: new FormControl('',),
    loadingDetnRs: new FormControl('',),
    enrouteRs: new FormControl('',),
    miscRs: new FormControl('',),
    extrasRS: new FormControl('',),
    unLoadingRs: new FormControl('',),
    detentionRs: new FormControl('',),
    storageRs: new FormControl('',),
    warehousingRs: new FormControl('',),
    othersRs: new FormControl('',),
    othersRs1: new FormControl('',),
    othersRs2: new FormControl('',),
    othersRs3: new FormControl('',),
    othersRs4: new FormControl('',),
    subTotalRs: new FormControl('',),
    gstType: new FormControl('',),
    gstPct: new FormControl('',),
    sgstAmt: new FormControl('',),
    cgstAmt: new FormControl('',),
    igstAmt: new FormControl('',),
    nonGstAmt1: new FormControl('',),
    nonGstAmt1Desc: new FormControl('',),
    nonGstAmt2: new FormControl('',),
    nonGstAmt2Desc: new FormControl('',),
    gtotalRs: new FormControl('',),
    advanceRs: new FormControl('',),

    generalRemarks: new FormControl('',),

    includeCnYn: new FormControl('',),
    includeCnNo: new FormControl('',),
    attachedfile: new FormControl('',),
    yearId: new FormControl('',),


    userBranch: new FormControl('',),
  

  });
  if (this.selectedConsignmentDetails.consignmentID != '') {
    this.formUser.patchValue(this.selectedConsignmentDetails);
 
    this.formUser.patchValue({
      userBranch: this.selectedConsignmentDetails.bookingPlace,
    
     
      
    })
  }
 

}
// convenience getter for easy access to contact form fields
get f() { return this.formUser.controls; }
getBranchList(): void {
  this.commonService.getBranchList().subscribe((res) => {
    this.branchList = res;
  });
}
 

//Submit user form details //
submitConsignmentForm(): void {
  this.userSubmitted = true;
  if (this.formUser.invalid) {
    return;
  }
  this.consignmentmodel.consignmentID = this.selectedConsignmentDetails.consignmentID != '' ? this.selectedConsignmentDetails.consignmentID : '';
  this.consignmentmodel.bookingPlace= this.formUser.value.userBranch;
  this.consignmentmodel.gcSlNo = this.formUser.value.gcSlNo;
  this.consignmentmodel.gcSeries= this.formUser.value.gcSeries;
  this.consignmentmodel.gcNoteNo = this.formUser.value.gcNoteNo;

  this.consignmentService.consignmentDetailsSubmitted(this.consignmentmodel).subscribe((res: Responsemodel) => {
    this.responseDetails = res;
    console.log(this.responseDetails.message);
    this.formUser.reset();
    window.location.reload();
  });
}
}




