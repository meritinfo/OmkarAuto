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
      .find((aa: { menuName: string; }) => aa.menuName === "Create Destinations");
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
    today.setMonth(month - 1);
    
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
      akBranch:   new FormControl(this.branch, [Validators.required]),
      akDate:   new FormControl('', [Validators.required]),
      akSlNo:     new FormControl('', [Validators.required]),
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
      delPkgs: new FormControl('', ),
      delActWt: new FormControl('', ),
      shExPkgs: new FormControl('', ),
      shExpActWt: new FormControl('', ),
      expectedRptdate: new FormControl('', ),
      reportingDate: new FormControl('', ),
      delayDays: new FormControl('', ),
      deliveryDate: new FormControl('', ),
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

    if (this.selectedDeliveryackpod.akId != '') {
      this.formUser.patchValue(this.selectedDeliveryackpod);  
      this.formUser.patchValue({
        akDate:this.commonService.formatDate(this.selectedDeliveryackpod.akDate),
        gcDate:this.commonService.formatDate(this.selectedDeliveryackpod.gcDate),
        reportingDate:this.commonService.formatDate(this.selectedDeliveryackpod.reportingDate),
        deliveryDate:this.commonService.formatDate(this.selectedDeliveryackpod.deliveryDate),
        podRecdDate:this.commonService.formatDate(this.selectedDeliveryackpod.podRecdDate), 
      })        
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

  }

  
  getConsignmentDetails(e: any) { 
    if (this.selectedDeliveryackpod.akId == "")
    {      
      this.sharedService.loading = true;
      this.requestmodel.strRequest = e.target.value; 
      this.deliveryackpodService.getConsignmentDetails(this.requestmodel).subscribe((res) => {
        this.deliveryackpodmodel = res;
        this.formUser.patchValue({
          centreName: ''
        });
      });
      this.sharedService.loading = false;
    }
  }

  deleteDeliveryForm(): void {
    if(this.selectedDeliveryackpod.akId != '' ){      
      this.sharedService.loading=true;
      this.requestmodel.strRequest = this.selectedDeliveryackpod.akId;
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
    this.formSubmitted = true;
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

    this.sharedService.loading=true;
    var selectedDataValue = this.formUser.getRawValue();
    this.deliveryackpodmodel.akId = this.selectedDeliveryackpod.akId ;
    this.deliveryackpodmodel.akBranch      = selectedDataValue.centreName.toString().toUpperCase();
    this.deliveryackpodmodel.akDate         = selectedDataValue.pinCode.toString();
    this.deliveryackpodmodel.akSlNo      = selectedDataValue.acctBranch.toString();
    this.deliveryackpodmodel.yearId  = this.year;
    this.deliveryackpodmodel.loggedInUser  = this.loggedInUserID;

    this.deliveryackpodService.deliveryackpodDetailsSave(this.deliveryackpodmodel).subscribe((res: Responsemodel) => {
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

