import { Component,ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Deliveryackpodmodel } from 'src/app/models/deliveryackpodmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { DeliveryackpodService } from 'src/app/services/deliveryackpod.service';
import { BranchMasterService } from 'src/app/services/branchmaster.service';
import { Constants } from 'src/app/common/constants';

@Component({
  selector: 'app-deliveryackpodadd',
  templateUrl: './deliveryackpodadd.component.html',
  styleUrls: ['./deliveryackpodadd.component.css']
})
export class DeliveryackpodaddComponent {
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

  List: Dropdownmodel[] = [];
  selectedDeliveryackpod = new Deliveryackpodmodel();

  podAttach1: string = "";
  podAttach2: string = "";
  
  @ViewChild('podAttach1Input', {
    static: true
  }) podAttach1Input: any;

  @ViewChild('podAttach2Input', {
    static: true
  }) podAttach2Input: any;


  constructor(private route: Router, private formBuilder: FormBuilder,
    private sharedService: SharedService, private branchmasterService: BranchMasterService, 
    private deliveryackpodmodel: Deliveryackpodmodel, private deliveryackpodService: DeliveryackpodService, 
    private commonService: CommonService, private requestmodel:Requestmodel,
     private toasterService: ToastrService ) {
    this.deliveryackpodmodel = new Deliveryackpodmodel();
  }
  
  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Delivery Ack/POD");
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
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 12);
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   

    this.sharedService.loading=true;

    this.getBranchList();

    this.selectedDeliveryackpod = this.deliveryackpodService.getDeliveryackpodDetails();

    this.formUser = this.formBuilder.group({
      ackBranch:   new FormControl(this.branch, [Validators.required]),
      ackDate:   new FormControl('', [Validators.required]),
      ackSlNo:     new FormControl('', [Validators.required]),
      gcYear:   new FormControl('', ),
      gcBook:   new FormControl('', ),
      gcDate:   new FormControl('', ),
      gcNoteNo:     new FormControl('', [Validators.required]),    
      gcFrom : new FormControl('', ),  
      gcTo : new FormControl('', ),
      consignor: new FormControl('', ),
      consignee: new FormControl('', ),
      party: new FormControl('', ),
      cnPkgs: new FormControl('', ),
      cnActWt: new FormControl('', ),
      delPkgs: new FormControl('',  [Validators.required]),    
      delActWt: new FormControl('', [Validators.required]),    
      shExPkgs: new FormControl('', ),
      shExpActWt: new FormControl('', ),
      expectedRptdate: new FormControl('',  [Validators.required]),    
      reportingDate: new FormControl('',  [Validators.required]),    
      delayDays: new FormControl('', ),
      deliveryDate: new FormControl('',  [Validators.required]),    
      detnDays: new FormControl('', ),
      podRecdYN: new FormControl('', ),
      podRecdDate: new FormControl('', ),
      podDelayDays: new FormControl('', ),
      podAttach1 : new FormControl('', ),
      podAttach2: new FormControl('', ),
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
      othDed :  new FormControl('', ),
      netPayable : new FormControl('', ),
    });

    this.formUser.controls['gcBook'].disable();
    this.formUser.controls['gcDate'].disable();
    this.formUser.controls['gcFrom'].disable();
    this.formUser.controls['gcTo'].disable();
    this.formUser.controls['cnPkgs'].disable();
    this.formUser.controls['cnActWt'].disable();
    this.formUser.controls['consignor'].disable();
    this.formUser.controls['consignee'].disable();
    this.formUser.controls['party'].disable();
    this.formUser.controls['shExPkgs'].disable();
    this.formUser.controls['shExpActWt'].disable();
    this.formUser.controls['expectedRptdate'].disable();
    this.formUser.controls['delayDays'].disable();
    this.formUser.controls['detnDays'].disable();
    this.formUser.controls['balancePayable'].disable();
    this.formUser.controls['handlingPayable'].disable();
    this.formUser.controls['detiontionPayable'].disable();
    this.formUser.controls['others1Payable'].disable();
    this.formUser.controls['others2Payable'].disable();
    this.formUser.controls['totExtPayable'].disable();
    this.formUser.controls['netPayable'].disable();
    this.formUser.controls['podRecdDate'].disable();

    if (this.selectedDeliveryackpod.ackId != '') {
      this.consignmentId = this.selectedDeliveryackpod.consignmentId;
      this.gcYear = this.selectedDeliveryackpod.gcYear;
      
      this.podAttach1 = Constants.UploadFolderPath + 'deliveryackpod/podattach1/' + this.selectedDeliveryackpod.podAttach1;
      this.podAttach2 = Constants.UploadFolderPath + 'deliveryackpod/podattach2/' + this.selectedDeliveryackpod.podAttach2;
      this.formUser.patchValue(this.selectedDeliveryackpod);  
      this.formUser.patchValue({
        ackDate:this.commonService.formatDate(this.selectedDeliveryackpod.ackDate),
        gcDate:this.commonService.formatDate(this.selectedDeliveryackpod.gcDate),
        reportingDate:this.commonService.formatDate(this.selectedDeliveryackpod.reportingDate),
        deliveryDate:this.commonService.formatDate(this.selectedDeliveryackpod.deliveryDate),
        podRecdDate:this.commonService.formatDate(this.selectedDeliveryackpod.podRecdDate), 
      })   
      if (this.selectedDeliveryackpod.podRecdYN=="N"){
        this.formUser.patchValue({      
          podRecdYN:""
        });
      }        
      this.editMode = true;
    }  
    
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

  onpodRecdChange(e:any){
    if(e.target.checked){
      this.formUser.controls['podRecdDate'].enable();
      this.formUser.controls['podRecdDate'].setValidators([Validators.required]);
    }
    else{
      this.formUser.controls['podRecdDate'].disable();
      this.formUser.controls['podRecdDate'].clearValidators();
    }
    this.formUser.controls['podRecdDate'].updateValueAndValidity();    
  }

  onDelPkgsChange(e:any){
    var delpkgs = e.target.value;
    var selectedDataValue = this.formUser.getRawValue();
    var diff = 0
    if(selectedDataValue.cnPkgs!=''){
      diff = parseFloat(selectedDataValue.cnPkgs)
    }
    if(delpkgs!=''){
      diff = diff - parseFloat(delpkgs)
    }
    this.formUser.patchValue({      
      shExPkgs:diff,
    });
  }

  onDelWtChange(e:any){
    var delActWt = e.target.value;
    var selectedDataValue = this.formUser.getRawValue();
    var diff = 0
    if(selectedDataValue.cnActWt!=''){
      diff = parseFloat(selectedDataValue.cnActWt)
    }
    if(delActWt!=''){
      diff = diff - parseFloat(delActWt)
    }
    this.formUser.patchValue({      
      shExpActWt:diff,
    });
  }

  onRptDateChange(e:any){
    var rptdate = e.target.value;
    var selectedDataValue = this.formUser.getRawValue();
    var expdt = new Date();
    var rptdt = new Date();
    if(selectedDataValue.expectedRptdate!=''){
      expdt = new Date(selectedDataValue.expectedRptdate);
      rptdt = expdt;
    }
    if(rptdate!=''){
      rptdt = new Date(rptdate)
    }
    const differenceInMilliseconds = rptdt.getTime() - expdt.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    this.formUser.patchValue({      
      delayDays: differenceInDays,
    });
  }

  onDlyDateChange(e:any){
    var dlydate = e.target.value;
    var selectedDataValue = this.formUser.getRawValue();
    var rptdt = new Date();
    var dlydt = new Date();
    if(selectedDataValue.reportingDate!=''){
      rptdt = new Date(selectedDataValue.reportingDate);
      dlydt = rptdt;
    }
    if(dlydate!=''){
      dlydt = new Date(dlydate)
    }
    const differenceInMilliseconds = dlydt.getTime() - rptdt.getTime();
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    
    this.formUser.patchValue({      
      detnDays: differenceInDays,
    });
  }

  calcTot(){    
    var selectedDataValue = this.formUser.getRawValue();
    var tot = 0

    if(selectedDataValue.balancePayable!=''){
      tot = tot + parseFloat(selectedDataValue.balancePayable)
    }
    if(selectedDataValue.totExtPayable!=''){
      tot = tot + parseFloat(selectedDataValue.totExtPayable)
    }
    if(selectedDataValue.lateRptDed!=''){
      tot = tot - parseFloat(selectedDataValue.lateRptDed)
    }
    if(selectedDataValue.latePodDed!=''){
      tot = tot - parseFloat(selectedDataValue.latePodDed)
    }
    if(selectedDataValue.othDed!=''){
      tot = tot - parseFloat(selectedDataValue.othDed)
    }
    this.formUser.patchValue({      
      netPayable:tot,
    });
  }

  
  getConsignmentDetails(e: any) { 
    if (this.selectedDeliveryackpod.ackId == "")
    {     
      this.consignmentId = "";
      this.gcYear = "";
      this.formUser.patchValue({
        gcBook: "",
        gcDate:"",
        gcFrom: "",
        gcTo: "",
        cnPkgs: "",
        cnActWt: "",
        delPkgs: "",
        delActWt: "",
        shExPkgs: "",
        shExpActWt: "",
        consignor: "",
        consignee: "",
        party: "",
        expectedRptdate:"",
        reportingDate:"",
        deliveryDate:"",
        delayDays:"",
        detnDays:"",
        balancePayable:"",
        handlingPayable:"",
        detiontionPayable:"",
        others1Payable:"",
        others2Payable:"",
        totExtPayable:"",
        netPayable:"",
      });

      this.sharedService.loading = true;
      this.requestmodel.strRequest = e.target.value; 
      this.deliveryackpodService.getConsignmentDetails(this.requestmodel).subscribe((res) => {
        this.deliveryackpodmodel = res;
        this.consignmentId = this.deliveryackpodmodel.consignmentId;
        this.gcYear = this.deliveryackpodmodel.gcYear;
        this.formUser.patchValue({
          gcBook: this.deliveryackpodmodel.gcBook,
          gcDate:this.commonService.formatDate(this.deliveryackpodmodel.gcDate),
          gcFrom: this.deliveryackpodmodel.gcFrom,
          gcTo: this.deliveryackpodmodel.gcTo,
          cnPkgs: this.deliveryackpodmodel.cnPkgs,
          cnActWt: this.deliveryackpodmodel.cnActWt,           
          delPkgs: this.deliveryackpodmodel.cnPkgs,     
          delActWt: this.deliveryackpodmodel.cnActWt,     
          shExPkgs: "0",
          shExpActWt: "0",         
          consignor: this.deliveryackpodmodel.consignor,
          consignee: this.deliveryackpodmodel.consignee,
          party: this.deliveryackpodmodel.party,
          expectedRptdate:this.commonService.formatDate(this.deliveryackpodmodel.expectedRptdate),
          reportingDate:this.commonService.formatDate(this.deliveryackpodmodel.expectedRptdate),
          deliveryDate:this.commonService.formatDate(this.deliveryackpodmodel.expectedRptdate),
          delayDays:0,
          detnDays:0,
          balancePayable:this.deliveryackpodmodel.balancePayable,
          handlingPayable:this.deliveryackpodmodel.handlingPayable,
          detiontionPayable:this.deliveryackpodmodel.detiontionPayable,
          others1Payable:this.deliveryackpodmodel.others1Payable,
          others2Payable:this.deliveryackpodmodel.others2Payable,
          totExtPayable:this.deliveryackpodmodel.totExtPayable,
          netPayable:this.deliveryackpodmodel.netPayable,
        });
      });
      this.sharedService.loading = false;
    }
  }

  deleteDeliveryForm(): void {
    if(this.selectedDeliveryackpod.ackId != '' ){      
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedDeliveryackpod.ackId;
      if (confirm("Are you sure, you want to delete this?")) {
            this.deliveryackpodService.deliveryackpodDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formUser.reset();
              this.route.navigate(['/delacklist']);
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
    this.route.navigate(['/delacklist']);
  }
  
  submitDeliveryackpodSave(): void {
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

    this.sharedService.loading = true;
    this.formSubmitted = true;
    var selectedDataValue = this.formUser.getRawValue();
    this.deliveryackpodmodel.ackId              = this.selectedDeliveryackpod.ackId ;
    this.deliveryackpodmodel.ackBranch          = selectedDataValue.ackBranch.toString().toUpperCase();
    this.deliveryackpodmodel.ackDate            = selectedDataValue.ackDate.toString();
    this.deliveryackpodmodel.ackSlNo            = selectedDataValue.ackSlNo.toString();
    this.deliveryackpodmodel.gcYear             = this.gcYear;
    this.deliveryackpodmodel.gcBook             = selectedDataValue.gcBook.toString();
    this.deliveryackpodmodel.gcNoteNo           = selectedDataValue.gcNoteNo.toString();
    this.deliveryackpodmodel.consignmentId      = this.consignmentId 
    this.deliveryackpodmodel.cnPkgs             = selectedDataValue.cnPkgs.toString();
    this.deliveryackpodmodel.cnActWt            = selectedDataValue.cnActWt.toString();
    this.deliveryackpodmodel.delPkgs            = selectedDataValue.delPkgs.toString();
    this.deliveryackpodmodel.delActWt           = selectedDataValue.delActWt.toString();
    this.deliveryackpodmodel.shExPkgs           = selectedDataValue.shExPkgs.toString();
    this.deliveryackpodmodel.shExpActWt         = selectedDataValue.shExpActWt.toString();
    this.deliveryackpodmodel.expectedRptdate    = selectedDataValue.expectedRptdate;
    this.deliveryackpodmodel.reportingDate      = selectedDataValue.reportingDate;
    this.deliveryackpodmodel.delayDays          = selectedDataValue.delayDays.toString();
    this.deliveryackpodmodel.deliveryDate       = selectedDataValue.deliveryDate;
    this.deliveryackpodmodel.detnDays           = selectedDataValue.detnDays.toString();
    this.deliveryackpodmodel.podRecdYN          = selectedDataValue.podRecdYN?"Y":"N";
    this.deliveryackpodmodel.podRecdDate        = selectedDataValue.podRecdDate.toString();
    this.deliveryackpodmodel.balancePayable     = selectedDataValue.balancePayable.toString();
    this.deliveryackpodmodel.handlingPayable    = selectedDataValue.handlingPayable.toString();
    this.deliveryackpodmodel.detiontionPayable  = selectedDataValue.detiontionPayable.toString();
    this.deliveryackpodmodel.others1Payable     = selectedDataValue.others1Payable.toString();
    this.deliveryackpodmodel.others2Payable     = selectedDataValue.others2Payable.toString();
    this.deliveryackpodmodel.totExtPayable      = selectedDataValue.totExtPayable.toString();
    this.deliveryackpodmodel.shortageDesc       = selectedDataValue.shortageDesc.toString().toUpperCase();
    this.deliveryackpodmodel.damageDesc         = selectedDataValue.damageDesc.toString().toUpperCase();
    this.deliveryackpodmodel.shortageClaim      = selectedDataValue.shortageClaim.toString();
    this.deliveryackpodmodel.damageClaim        = selectedDataValue.damageClaim.toString();
    this.deliveryackpodmodel.lateRptDed         = selectedDataValue.lateRptDed.toString();
    this.deliveryackpodmodel.latePodDed         = selectedDataValue.latePodDed.toString();
    this.deliveryackpodmodel.othDed             = selectedDataValue.othDed.toString();
    this.deliveryackpodmodel.netPayable         = selectedDataValue.netPayable.toString();
    this.deliveryackpodmodel.yearId             = this.year;
    this.deliveryackpodmodel.loggedInUser       = this.loggedInUserID;

    let formData = new FormData();
    formData.append('podAttach1', this.podAttach1Input.nativeElement.files[0]);
    formData.append('podAttach2', this.podAttach2Input.nativeElement.files[0]);
    formData.append('datadetails', JSON.stringify(this.deliveryackpodmodel));

    this.deliveryackpodService.deliveryackpodDetailsSave(formData).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formUser.reset();
        this.route.navigate(['/delacklist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }      
    });    
    this.sharedService.loading=false;
  }
}

