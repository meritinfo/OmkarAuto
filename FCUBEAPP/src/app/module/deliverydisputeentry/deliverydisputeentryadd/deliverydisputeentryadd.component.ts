
import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Deliverydisputeentrymodel } from 'src/app/models/deliverydisputeentrymodel';
import { Deliverydisputeentrylistmodel } from 'src/app/models/deliverydisputeentrylistmodel';
import { DeliveryDisputeEntryService } from 'src/app/services/deliverydisputeentry.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';

import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-deliverydisputeentryadd',
  templateUrl: './deliverydisputeentryadd.component.html',
  styleUrls: ['./deliverydisputeentryadd.component.css']
})
export class DeliverydisputeentryaddComponent {
  year: string = '';
  branch: string = '';
  loggedInUserID: string = '';
  formUser!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  stateList: Dropdownmodel[] = [];
  consignmentId: string = "";
  gcYear: string = "";
  bookingFrt: string = "";
  challanNo: string = "";

  List: Dropdownmodel[] = [];
  selectedDeliveryadispute = new Deliverydisputeentrymodel();

  podAttach1: string = "";
  podAttach2: string = "";
  
  @ViewChild('podAttach1Input', {
    static: true
  }) podAttach1Input: any;

 

  constructor(private route: Router, private formBuilder: FormBuilder,
    private sharedService: SharedService, private deliveryDisputeEntryService: DeliveryDisputeEntryService, 
    private deliverydisputeentrymodel: Deliverydisputeentrymodel, 
    private commonService: CommonService, private requestmodel:Requestmodel,
     private toasterService: ToastrService ) {
    this.deliverydisputeentrymodel = new Deliverydisputeentrymodel();

}
ngOnInit(): void {

  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Delivery Disputes");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  var yearIDData = sessionStorage.getItem('yearID')?.toString();
  if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
    this.year = yearIDData;
  }
  var branchData = sessionStorage.getItem('userBranch')?.toString();
  if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
    this.branch = branchData;

  }
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
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

  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
  
  this.fromDate = this.minDate ;

  this.sharedService.loading=true;

  this.getBranchList();

  this.deliverydisputeentrymodel = this.deliveryDisputeEntryService.getSelectedDeliverydisputeentryDetails();

  this.formUser = this.formBuilder.group({
    dispBranch :   new FormControl(this.branch, [Validators.required]),
    dispDate :   new FormControl(this.loginDate, [Validators.required]),
    dispSlNo:     new FormControl('', [Validators.required]),
    gcYear:   new FormControl('', ),
    gcBook:   new FormControl('', ),
   
    gcNoteNo:     new FormControl('', [Validators.required]),    
  
    consignmentId: new FormControl('', ),
    disputeStatus  : new FormControl('',[Validators.required] ),
    disputeRemarks : new FormControl('', ),
    dispAttach : new FormControl('', ),
 
  });
  // this.formUser.controls['ackBranch'].disable();
    this.formUser.controls['dispSlNo'].disable();    
  //   this.formUser.controls['gcBook'].disable();
  //   this.formUser.controls['gcDate'].disable();
  //   this.formUser.controls['gcFrom'].disable();
  //   this.formUser.controls['gcTo'].disable();
  //   this.formUser.controls['cnPkgs'].disable();
  //   this.formUser.controls['cnActWt'].disable();
  //   this.formUser.controls['consignor'].disable();
  //   this.formUser.controls['consignee'].disable();
  //   this.formUser.controls['party'].disable();
  //   this.formUser.controls['shExPkgs'].disable();
  //   this.formUser.controls['shExpActWt'].disable();
  //   this.formUser.controls['expectedRptdate'].disable();
  //   this.formUser.controls['delayDays'].disable();
  //   this.formUser.controls['detnDays'].disable();
  //   this.formUser.controls['balancePayable'].disable();
  //   this.formUser.controls['netPayable'].disable();
  //   this.formUser.controls['podRecdDate'].disable();
  //   this.formUser.controls['latePodDed'].disable();    
    
  //   this.formUser.controls['damageDesc'].disable();
  //   this.formUser.controls['damageClaim'].disable();
  //   this.formUser.controls['shortageDesc'].disable();
  //   this.formUser.controls['shortageClaim'].disable(); 
  //   this.formUser.controls['damageDesc'].clearValidators();
  //   this.formUser.controls['damageClaim'].clearValidators();
  //   this.formUser.controls['shortageDesc'].clearValidators();
  //   this.formUser.controls['shortageClaim'].clearValidators();    
  //   this.formUser.controls['damageDesc'].updateValueAndValidity(); 
  //   this.formUser.controls['damageClaim'].updateValueAndValidity();  
  //   this.formUser.controls['shortageDesc'].updateValueAndValidity();  
  //   this.formUser.controls['shortageClaim'].updateValueAndValidity(); 

    setTimeout(() => {
      if (this.selectedDeliveryadispute.disputeId!='') {
       // this.consignmentId = this.selectedDeliveryackpod.consignmentId;
      //  this.gcYear = this.selectedDeliveryackpod.gcYear;
        this.podAttach1Input.nativeElement.disabled = true;

        this.podAttach1 = Constants.UploadFolderPath + 'deliveryackpod/podattach1/' + this.selectedDeliveryadispute.dispAttach ;
        //this.podAttach2 = Constants.UploadFolderPath + 'deliveryackpod/podattach2/' + this.selectedDeliveryackpod.podAttach2;
        this.formUser.patchValue(this.selectedDeliveryadispute);  
        this.formUser.patchValue({
          // gcNoteNo: this.selectedDeliveryackpod.gcNoteNo,
          dispDate:this.commonService.formatDate(this.selectedDeliveryadispute.dispDate),
          // gcDate:this.commonService.formatDate(this.selectedDeliveryackpod.gcDate),
          // expectedRptdate:this.commonService.formatDate(this.selectedDeliveryackpod.expectedRptdate),
          // reportingDate:this.commonService.formatDate(this.selectedDeliveryackpod.reportingDate),
          // deliveryDate:this.commonService.formatDate(this.selectedDeliveryackpod.deliveryDate),
          // podRecdDate:this.commonService.formatDate(this.selectedDeliveryackpod.podRecdDate), 
        })   
      
        this.editMode = true;
        this.formUser.controls['gcNoteNo'].disable();   
        this.formUser.controls['ackDate'].disable();      
      }  
      else{
       // this.getAckSlno();
      }
      this.getdispSlNo();
    }, 2000); 
    this.sharedService.loading=false; 
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formUser.controls; }

  //Get Branch List details //
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  // getAckSlno(): void {
  //   this.requestmodel.strRequest = this.branch;
  //   this.requestmodel.strRequest1 = this.year;
  //   this.deliveryackpodService.getAckSlNo(this.requestmodel).subscribe((res: Responsemodel) => {
  //     this.responseDetails = res;
  //     if (this.responseDetails.status) {
  //       this.formUser.patchValue({
  //         ackSlNo: this.responseDetails.message
  //       });
  //     }
  //    else{
  //       this.toasterService.warning(this.responseDetails.message);
  //     }
  //   });
  // }
  
  getConsignmentDetails(e: any) { 
    this.requestmodel.strRequest = e.target.value; 
    this.requestmodel.strRequest1 = this.branch;
   // this.requestmodel.strRequest2 = this.year;
    this.deliveryDisputeEntryService.checkDuplicateLrForDispute(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        //ignore
      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          gcNoteNo:""
        });
        return;
      }
    });
    this.deliveryDisputeEntryService.getConsignmentDetails(this.requestmodel).subscribe((res) => {
      this.deliverydisputeentrymodel = res;
      this.consignmentId = this.deliverydisputeentrymodel.consignmentId;
     // this.gcYear = this.deliveryackpodmodel.gcYear;
      this.formUser.patchValue({
        // gcNoteNo:this.deliveryackpodmodel.gcNoteNo,
        // gcBook: this.deliveryackpodmodel.gcBook,
        // gcDate:this.commonService.formatDate(this.deliveryackpodmodel.gcDate),
        // gcFrom: this.deliveryackpodmodel.gcFrom,
        // gcTo: this.deliveryackpodmodel.gcTo,
        // cnPkgs: this.deliveryackpodmodel.cnPkgs,
        // cnActWt: this.deliveryackpodmodel.cnActWt,           
        // delPkgs: this.deliveryackpodmodel.cnPkgs,     
        // delActWt: this.deliveryackpodmodel.cnActWt,     
        // shExPkgs: "0",
        // shExpActWt: "0",         
        // consignor: this.deliveryackpodmodel.consignor,
        // consignee: this.deliveryackpodmodel.consignee,
        // party: this.deliveryackpodmodel.party,
        // expectedRptdate:this.commonService.formatDate(this.deliveryackpodmodel.expectedRptdate),
        // expectedRptTime:this.deliveryackpodmodel.expectedRptTime,
        // reportingDate:this.commonService.formatDate(this.deliveryackpodmodel.reportingDate),
        // reportingTime:this.deliveryackpodmodel.reportingTime,
        // deliveryDate:this.commonService.formatDate(this.deliveryackpodmodel.deliveryDate),
        // deliveryTime:this.deliveryackpodmodel.deliveryTime,
        // // delayDays:"0",
        // detnDays:this.deliveryackpodmodel.detnDays,
        // balancePayable:this.deliveryackpodmodel.balancePayable,
        // handlingPayable:this.deliveryackpodmodel.handlingPayable,
        // detiontionPayable:this.deliveryackpodmodel.detiontionPayable,
        // others1Payable:this.deliveryackpodmodel.others1Payable,
        // others2Payable:this.deliveryackpodmodel.others2Payable,
        // totExtPayable:this.deliveryackpodmodel.totExtPayable,
        // netPayable:this.deliveryackpodmodel.balancePayable,
      });
      
      // this.bookingFrt = this.deliveryackpodmodel.bookingFrt;
      // this.challanNo = this.deliveryackpodmodel.challanNo;
      // this.formUser.controls["gcNoteNo"].disable();
    });
  }

  deleteDeliveryDisputeForm(): void {
    if(this.selectedDeliveryadispute.disputeId  != '' ){      
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedDeliveryadispute.disputeId ;
      if (confirm("Are you sure, you want to delete this?")) {
            this.deliveryDisputeEntryService.DeliverydisputeentryDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/disputelist']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }      
        });
      }
      
      this.sharedService.loading=false;
    }
  }

  exit(): void {
    this.route.navigate(['/disputelist']);
  }

  getdispSlNo(): void {
    this.requestmodel.strRequest = this.branch;
    this.requestmodel.strRequest1 = this.year;
    this.deliveryDisputeEntryService.getDispSlNo(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.formUser.patchValue({
          dispSlNo: this.responseDetails.message
        });
      }
     else{
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }

  
  submitDeliveryDisputeSave(): void {
    if (this.formUser.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formUser.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }
    var file1 = this.podAttach1Input.nativeElement.files[0];

    // if(this.selectedDeliveryadispute.disputeId ==""){
    //   if (typeof file1 !== 'undefined') {
    //     //ignore
    //   }
    //   else{
    //     this.toasterService.warning("POD Attach1 is mandatory")
    //     return;
    //   }
    // }

    this.sharedService.loading = true;
    this.formSubmitted = true;
    var selectedDataValue = this.formUser.getRawValue();
    this.deliverydisputeentrymodel.disputeId               = this.selectedDeliveryadispute.disputeId  ;
    this.deliverydisputeentrymodel.dispBranch           = selectedDataValue.dispBranch.toString().toUpperCase();
    this.deliverydisputeentrymodel.dispDate             = selectedDataValue.dispDate.toString();
    this.deliverydisputeentrymodel.dispSlNo             = selectedDataValue.dispSlNo.toString();
    this.deliverydisputeentrymodel.gcYear             = this.gcYear;
    this.deliverydisputeentrymodel.gcBook             = selectedDataValue.gcBook.toString();
    this.deliverydisputeentrymodel.gcNoteNo           = selectedDataValue.gcNoteNo.toString();
    this.deliverydisputeentrymodel.consignmentId      = this.consignmentId ;
    this.deliverydisputeentrymodel.yearId              = this.year;
    this.deliverydisputeentrymodel.disputeStatus             = selectedDataValue.disputeStatus.toString();
    this.deliverydisputeentrymodel.disputeRemarks             = selectedDataValue.disputeRemarks.toString().toUpperCase();
   
    this.deliverydisputeentrymodel.loggedInUser       = this.loggedInUserID;

    let formData = new FormData();
    formData.append('podAttach1', this.podAttach1Input.nativeElement.files[0]);
  
    formData.append('datadetails', JSON.stringify(this.deliverydisputeentrymodel));

    this.deliveryDisputeEntryService.SelectedDeliverydisputeentrySubmitted(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/disputelist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });    
    this.sharedService.loading=false;
  }
}


