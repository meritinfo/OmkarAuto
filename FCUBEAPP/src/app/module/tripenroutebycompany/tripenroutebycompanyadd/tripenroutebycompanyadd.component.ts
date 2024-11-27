import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { TripenrouteexpbycompanyModel } from 'src/app/models/tripenroutebycompanymodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { TripenroutebycompanyService } from 'src/app/services/tripenroutebycompany.service';
import { SharedService } from 'src/app/services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tripenroutebycompanyadd',
  templateUrl: './tripenroutebycompanyadd.component.html',
  styleUrls: ['./tripenroutebycompanyadd.component.css']
})
export class TripenroutebycompanyaddComponent {

  loggedInUserID: string = '';
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
  keywordLocation = 'dataName';
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  createmode = false;
  seriesDoc: string = "";

  responseDetails = new Responsemodel();
  branchList: Dropdownmodel[] = [];
  expList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  creditAcList: Dropdownmodel[] = [];
  vehicleList: Dropdownmodel[] = [];
  newList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];


  selectedTripenrouteexpbycompanyDetails = new TripenrouteexpbycompanyModel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private tripenrouteexpbycompanyModel: TripenrouteexpbycompanyModel, private tripenroutebycompanyService: TripenroutebycompanyService, 
    private commonService: CommonService, private toasterService: ToastrService,
    private cashReceiptEntryService: CashReceiptEntryService,
    private sharedService: SharedService,private requestmodel:Requestmodel) {
    this.tripenrouteexpbycompanyModel = new TripenrouteexpbycompanyModel();
  }
  ngOnInit(): void {
    this.sharedService.loading = true;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Trip Enroute Exp"));
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
    
    this.getBranchList();   
    this.getVehicleNoList();
   // this.getLocationList();
   this.getExpList();

   if (this.selectedTripenrouteexpbycompanyDetails.enrouteExpId != '') {      
    this.getCreditAcList(this.selectedTripenrouteexpbycompanyDetails.pmtType);  
  }
    
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    console.log(this.maxDate);

    this.selectedTripenrouteexpbycompanyDetails = this.tripenroutebycompanyService.getTripenrouteexpbycompanyDetails();

    this.formTripPayment = this.formBuilder.group({
    //  pmtBranch: new FormControl(this.branch , [Validators.required]),
    enrouteExpId : new FormControl('',),
    vehicleID  : new FormControl('',[Validators.required]),
    expBranch  : new FormControl(this.branch ,[Validators.required]),
    expDate  : new FormControl(this.loginDate,[Validators.required]),
    expId  : new FormControl('',[Validators.required]),
    remarks  : new FormControl('',),
    expAmount  : new FormControl('',),
    pmtType  : new FormControl('',[Validators.required]),
    creditAc  : new FormControl('',[Validators.required]),
    neftYN  : new FormControl('',),
    chequeNo  : new FormControl('',),
    chequeDate  : new FormControl('',),
   // tripAdjYN  : new FormControl('',),
  //  ftmId  : new FormControl('',),
    });
    this.formTripPayment.controls['expBranch'].disable();
    setTimeout(() => {
      this.createmode = true;
    
       if (this.selectedTripenrouteexpbycompanyDetails.enrouteExpId != '') {
        this.formTripPayment.controls['vehicleID'].disable();

        // this.seriesDoc = this.selectedTripenrouteexpbycompanyDetails.seriesDoc; 
         this.formTripPayment.patchValue(this.selectedTripenrouteexpbycompanyDetails);
       
         this.formTripPayment.patchValue({
         expDate:   this.commonService.formatDate(this.selectedTripenrouteexpbycompanyDetails.expDate), 
           chequeDate:  this.commonService.formatDate(this.selectedTripenrouteexpbycompanyDetails.chequeDate), 
           vehicleID: this.vehicleList.find(e => e.dataId == this.selectedTripenrouteexpbycompanyDetails.vehicleID),
        //   neftPmt:  ""
         }) 
         this.editMode=true;
        } 
         if (this.selectedTripenrouteexpbycompanyDetails.enrouteExpId != '') {      
          this.getCreditAcList(this.selectedTripenrouteexpbycompanyDetails.pmtType);  
        }
        
     }, 2000);
     this.sharedService.loading = false;
   }
   getFinDocDetails(finId: string){
    this.requestmodel.strRequest=finId;
    this.cashReceiptEntryService.getFinDocDetails(this.requestmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.seriesDoc = res.message;
      } 
      else{
        this.seriesDoc = '';
      }
    });
  }
 
 

  get f() { return this.formTripPayment.controls; }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  getExpList(): void {
    this.commonService.getExpTypeList().subscribe((res) => {
      this.expList = res;
    });
  }
  onNeftChk(e: any) {
    if(e.target.checked){
      this.formTripPayment.controls['chequeNo'].clearValidators();      
      this.formTripPayment.controls['chequeDate'].clearValidators();   
      this.formTripPayment.controls['chequeNo'].disable();
      this.formTripPayment.controls['chequeDate'].disable();
      this.formTripPayment.patchValue({
        chequeNo:'',
        chequeDate:'',
      });   
    }
    else {
      this.formTripPayment.controls['chequeNo'].setValidators([Validators.required]);
      this.formTripPayment.controls['chequeDate'].setValidators([Validators.required]);
      this.formTripPayment.controls['chequeNo'].enable();
      this.formTripPayment.controls['chequeDate'].enable();
    }
    this.formTripPayment.controls['chequeNo'].updateValueAndValidity();
    this.formTripPayment.controls['chequeDate'].updateValueAndValidity();
  }


  changePmtType(e: any) {
   
    console.log(e.target.value);
    var selectedValue = e.target.value;
    this.formTripPayment.patchValue({
      neftPmt : "",
      chequeNo: "",
      chequeDate: this.loginDate,
    });
    
    this.getCreditAcList(selectedValue);
  }
  
  
  getCreditAcList2(e: any){
    this.requestmodel.strRequest = e;

    this.commonService.getCreditAcList2(this.requestmodel).subscribe((res) => {
      this.creditacList = res;   
      this.formTripPayment.patchValue({
        //creditAc:this.creditacList[0].dataId
      });  
    });
  }

  tripenroutebycompanyDelete(): void {    
    if(this.selectedTripenrouteexpbycompanyDetails.enrouteExpId != '' ){
    this.requestmodel.strRequest =this.selectedTripenrouteexpbycompanyDetails.enrouteExpId
      if (confirm("Are you sure, you want to delete this?")) {
            this.tripenroutebycompanyService.TripenrouteexpbycompanyDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status) {
              this.toasterService.success(this.responseDetails.message);
              this.formTripPayment.reset();
              this.route.navigate(['/tripexpbycomp']);
            }
            else {
              this.toasterService.warning(this.responseDetails.message);
            }
        });
      }
    }
  }

  exit(): void {
    this.route.navigate(['/tripexpbycomp']);
  }
  
  getCreditAcList(pmttp:string): void {
    this.requestmodel.strRequest= pmttp;
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditAcList = res;
    });
    // if (pmttp == 'B'){
    //   this.formUser.controls['neftPmt'].enable();
    //   this.formUser.controls['chequeNo'].enable();
    //   this.formUser.controls['chequeDate'].enable();
    // }
    // else {
    //   this.formUser.controls['neftPmt'].disable();
    //   this.formUser.controls['chequeNo'].disable();
    //   this.formUser.controls['chequeDate'].disable();
    // }
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


  getVehicleNoList(): void {
    this.commonService.getVehicleIdList().subscribe((res) => {
      this.vehicleList = res;
    });
  }
  
  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }

   
  submitTripenroutebyCompanyForm(): void {  
    if (this.formTripPayment.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formTripPayment.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }
      return;
    }
    var selectedDataValue = this.formTripPayment.getRawValue();
    
   
   
    
    this.formSubmitted = true; 
    this.tripenrouteexpbycompanyModel.enrouteExpId = this.selectedTripenrouteexpbycompanyDetails.enrouteExpId ;
    // this.trippaymentsmodel.pmtBranch = selectedDataValue.pmtBranch;
    // this.trippaymentsmodel.pmtDate = selectedDataValue.pmtDate;
    // this.trippaymentsmodel.vehicleMasterID = selectedDataValue.vehicleMasterID?selectedDataValue.vehicleMasterID.dataId:"";
    // this.trippaymentsmodel.amountPaid = selectedDataValue.amountPaid.toString();
   // this.tripenrouteexpbycompanyModel.enrouteExpId = selectedDataValue.
    this.tripenrouteexpbycompanyModel.vehicleID  = selectedDataValue.vehicleID.dataId;
    this.tripenrouteexpbycompanyModel.expBranch  = selectedDataValue.expBranch;
    this.tripenrouteexpbycompanyModel.expDate  = selectedDataValue.expDate;
    this.tripenrouteexpbycompanyModel.expId  = selectedDataValue.expId;
    this.tripenrouteexpbycompanyModel.remarks  = selectedDataValue.remarks;
    this.tripenrouteexpbycompanyModel.expAmount  = selectedDataValue.expAmount;
   this.tripenrouteexpbycompanyModel.pmtType  = selectedDataValue.pmtType;
    this.tripenrouteexpbycompanyModel.creditAc  = selectedDataValue.creditAc;

   this.tripenrouteexpbycompanyModel.neftYN = selectedDataValue.neftYN?"Y":"N";
   this.tripenrouteexpbycompanyModel.chequeNo  = selectedDataValue.chequeNo;
    this.tripenrouteexpbycompanyModel.chequeDate  = selectedDataValue.chequeDate;
  // this.tripenrouteexpbycompanyModel.tripAdjYN  = selectedDataValue.tripAdjYN;
   //this.tripenrouteexpbycompanyModel.ftmId  = selectedDataValue.ftmId;
    this.tripenrouteexpbycompanyModel.yearId = this.year;
    this.tripenrouteexpbycompanyModel.loggedInUser = this.loggedInUserID;

    this.tripenroutebycompanyService.tripenrouteexpbycompanySubmitted(this.tripenrouteexpbycompanyModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formTripPayment.reset();
        this.route.navigate(['/tripexpbycomp']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
  }
}

 


