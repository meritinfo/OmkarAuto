
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
  createdBy : string = "";
  modifiedBy: string = "";
dashboard: string ="";
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
  
      this.sharedService.loggedInStatus = true;
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

  this.selectedDeliveryadispute = this.deliveryDisputeEntryService.getSelectedDeliverydisputeentryDetails();

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

   
    gcDate:   new FormControl('', ),
   
    gcFrom : new FormControl('', ),  
    gcTo : new FormControl('', ),
    consignor: new FormControl('', ),
    consignee: new FormControl('', ),
    party: new FormControl('', ),
    cnPkgs: new FormControl('', ),
    cnActWt: new FormControl('', ),
    deliveryStatus: new FormControl('',  ),    
    delPkgs: new FormControl('', ),    
    delActWt: new FormControl('', ),    
    shExPkgs: new FormControl('', ),
    shExpActWt: new FormControl('', ),
    expectedRptdate: new FormControl('',  ),   
    expectedRptTime: new FormControl('',  ),   
    reportingDate: new FormControl('',  ),   
    reportingTime : new FormControl('',  ),
    delayDays: new FormControl('', ),
    deliveryDate: new FormControl('',  ),  
    deliveryTime : new FormControl('',  ),   
    detnDays: new FormControl('', ),
    podRecdYN: new FormControl('', ),
    podRecdDate: new FormControl('', ),
    podDelayDays: new FormControl('', ),
    balancePayable: new FormControl('', ),
    handlingPayable: new FormControl('', ),
    detiontionPayable: new FormControl('', ),
    others1Payable: new FormControl('', ),
    others2Payable: new FormControl('', ),      
    totExtPayable: new FormControl('', ),      
    shortageDesc: new FormControl('', ),
    damageDesc: new FormControl('', ),
    shortageClaim: new FormControl('', ),
    damageClaim : new FormControl('', ),
    lateRptDed : new FormControl('', ),
    latePodDed : new FormControl('', ),
    othDed :  new FormControl('0', ),
    netPayable : new FormControl('', ),
    remarks: new FormControl('', ),
 
  });
  this.formUser.controls['dispBranch'].disable();
    this.formUser.controls['dispSlNo'].disable();  
    
    this.formUser.controls['gcBook'].disable();
    this.formUser.controls['gcDate'].disable();
    this.formUser.controls['gcFrom'].disable();
    this.formUser.controls['gcTo'].disable();
    this.formUser.controls['cnPkgs'].disable();
    this.formUser.controls['cnActWt'].disable();
    this.formUser.controls['consignor'].disable();
    this.formUser.controls['consignee'].disable();
    this.formUser.controls['party'].disable();
  //   this.formUser.controls['damageDesc'].clearValidators();

  //   this.formUser.controls['shortageClaim'].clearValidators();    
  
    setTimeout(() => {
      if (this.selectedDeliveryadispute.disputeId!='') {
       // this.consignmentId = this.selectedDeliveryackpod.consignmentId;
      //  this.gcYear = this.selectedDeliveryackpod.gcYear;
      //  this.podAttach1Input.nativeElement.disabled = true;

        this.podAttach1 = Constants.UploadFolderPath + 'deliverydispute/dispattach/' + this.selectedDeliveryadispute.dispAttach ;
        //this.podAttach2 = Constants.UploadFolderPath + 'deliveryackpod/podattach2/' + this.selectedDeliveryackpod.podAttach2;
        this.formUser.patchValue(this.selectedDeliveryadispute);  
        this.formUser.patchValue({
           gcNoteNo: this.selectedDeliveryadispute.gcNoteNo,
          dispDate:this.commonService.formatDate(this.selectedDeliveryadispute.dispDate),
          // dispDate:this.commonService.formatDate(this.selectedDeliveryackpod.dispDate),
       
        })   
        this.cnDetail(this.selectedDeliveryadispute.gcNoteNo);
        this.editMode = true;
        this.createdBy = this.selectedDeliveryadispute.createdBy + " " + this.selectedDeliveryadispute.createdDate;
        this.modifiedBy = this.selectedDeliveryadispute.modifiedBy + " " + this.selectedDeliveryadispute.modifiedDate; 
        this.formUser.controls['gcNoteNo'].disable();   
        this.formUser.controls['dispDate'].disable();      
      }  
      else{
       // this.getAckSlno();
       this.getdispSlNo();
      }
     
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

 
  
  getConsignmentDetails(e: any) { 
    this.requestmodel.strRequest = e.target.value; 
    this.requestmodel.strRequest1 = this.branch;
   this.requestmodel.strRequest2 = this.year;
    this.deliveryDisputeEntryService.checkDuplicateLrForDispute(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {

        //ignore
        this.cnDetail(e.target.value);

      }
      else{
        this.toasterService.warning(this.responseDetails.message);
        this.formUser.patchValue({
          gcNoteNo:""
        });
        return;
      }
    });

  }
  cnDetail(e: any){
    if(this.selectedDeliveryadispute.disputeId!=''){
      this.requestmodel.strRequest = this.selectedDeliveryadispute.gcNoteNo; 
      this.requestmodel.strRequest1 = this.selectedDeliveryadispute.dispBranch;
     this.requestmodel.strRequest2 = this.year;

    }
    else{
      this.requestmodel.strRequest = e; 
      this.requestmodel.strRequest1 = this.branch;
     this.requestmodel.strRequest2 = this.year;
    }
 
    
    this.deliveryDisputeEntryService.getConsignmentDetails(this.requestmodel).subscribe((res) => {
      this.deliverydisputeentrymodel = res;
      this.consignmentId = this.deliverydisputeentrymodel.consignmentId;
     // this.gcYear = this.deliveryackpodmodel.gcYear;
     if( this.consignmentId==null){
      this.toasterService.warning("Data not found");   

     }
     
      this.formUser.patchValue({
        gcNoteNo:this.deliverydisputeentrymodel.gcNoteNo,
        gcBook: this.deliverydisputeentrymodel.gcBook,
        gcDate:this.commonService.formatDate(this.deliverydisputeentrymodel.gcDate),
        gcFrom: this.deliverydisputeentrymodel.gcFrom,
        gcTo: this.deliverydisputeentrymodel.gcTo,
        cnPkgs: this.deliverydisputeentrymodel.cnPkgs,
        cnActWt: this.deliverydisputeentrymodel.cnActWt,           
        delPkgs: this.deliverydisputeentrymodel.cnPkgs,     
        delActWt: this.deliverydisputeentrymodel.cnActWt,     
        shExPkgs: "0",
        shExpActWt: "0",         
        consignor: this.deliverydisputeentrymodel.consignor,
        consignee: this.deliverydisputeentrymodel.consignee,
        party: this.deliverydisputeentrymodel.party,
        expectedRptdate:this.commonService.formatDate(this.deliverydisputeentrymodel.expectedRptdate),
        expectedRptTime:this.deliverydisputeentrymodel.expectedRptTime,
        reportingDate:this.commonService.formatDate(this.deliverydisputeentrymodel.reportingDate),
        reportingTime:this.deliverydisputeentrymodel.reportingTime,
        deliveryDate:this.commonService.formatDate(this.deliverydisputeentrymodel.deliveryDate),
        deliveryTime:this.deliverydisputeentrymodel.deliveryTime,
        delayDays:"0",
        detnDays:this.deliverydisputeentrymodel.detnDays,
        balancePayable:this.deliverydisputeentrymodel.balancePayable,
        handlingPayable:this.deliverydisputeentrymodel.handlingPayable,
        detiontionPayable:this.deliverydisputeentrymodel.detiontionPayable,
        others1Payable:this.deliverydisputeentrymodel.others1Payable,
        others2Payable:this.deliverydisputeentrymodel.others2Payable,
        totExtPayable:this.deliverydisputeentrymodel.totExtPayable,
        netPayable:this.deliverydisputeentrymodel.balancePayable,
      });
      
      this.bookingFrt = this.deliverydisputeentrymodel.bookingFrt;
      this.challanNo = this.deliverydisputeentrymodel.challanNo;
      this.gcYear = this.deliverydisputeentrymodel.gcYear;
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
    this.deliverydisputeentrymodel.dispBranch           = selectedDataValue.dispBranch.toString();
    this.deliverydisputeentrymodel.dispDate             = selectedDataValue.dispDate.toString();
    this.deliverydisputeentrymodel.dispSlNo             = selectedDataValue.dispSlNo.toString();
    this.deliverydisputeentrymodel.gcYear             = this.gcYear;
    this.deliverydisputeentrymodel.gcBook             = selectedDataValue.dispBranch.toString();
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


