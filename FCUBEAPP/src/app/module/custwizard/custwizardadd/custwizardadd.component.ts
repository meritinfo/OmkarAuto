import { Component } from '@angular/core';




import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Custwizardlistmodel  } from 'src/app/models/custwizardlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Custwizardmodel } from 'src/app/models/custwizardmodel';
import { CommonService } from 'src/app/services/common.service';
import { CustwizardService } from 'src/app/services/custwizard.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Cardmodel } from 'src/app/models/cardmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-custwizardadd',
  templateUrl: './custwizardadd.component.html',
  styleUrls: ['./custwizardadd.component.css']
})
export class CustwizardaddComponent {
  loggedInUserID: string = '';
  formCustWizard!: FormGroup;
  userSubmitted = false;
  responseDetails = new Responsemodel();
  cardDetails = new Cardmodel();
  ledgerAcList: Dropdownmodel[] = [];
  debitAcList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  year: string = '';


  selectedCustWizardDetails = new Custwizardmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, private custWizardModel: Custwizardmodel, private CustWizardService: CustwizardService, private commonService: CommonService,private toastrService: ToastrService,private requestmodel:Requestmodel,private sharedService: SharedService) {
    this.custWizardModel = new Custwizardmodel();



}

ngOnInit(): void {
  this.sharedService.loading = false;
  this.editMode = false;
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Fleet Card Master"));
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
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
  else {
    this.route.navigate(['/']);
  }


  this.selectedCustWizardDetails = this.CustWizardService.getCustWizardDetails();
  this.formCustWizard = this.formBuilder.group({
    cashAc: new FormControl('',[]),
   // cardNo: new FormControl('',[Validators.required]),
   hsdAc: new FormControl('',[]),
   tripRoutExpAc: new FormControl('',),
   tripRepairsAc: new FormControl('',),
   tripParkingAc: new FormControl('',),
   tripMChallanAc: new FormControl('',[]),
   tripWeighmentAc: new FormControl('',[]),
   tripAccidentAc: new FormControl('',[]),
   tripTollAc: new FormControl('',),
   tripOthersMiscAc: new FormControl('',[]),
   tripDrAlAc: new FormControl('',[]),
   delayDamageAc: new FormControl('',[]),
   sgstInputAc: new FormControl('',[]),
   cgstInputAc: new FormControl('',[]),
   igstInputAc: new FormControl('',[]),
   fastagTollAc: new FormControl('',[]),
   happayAc: new FormControl('',[]),
   driverPoolAc: new FormControl('',[]),
   driverSalAc: new FormControl('',[]),
   frtIncAc: new FormControl('',[]),
   tripTravelAlAc: new FormControl('',[]),
   tripIncentiveAc: new FormControl('',[]),
   tripRecdDrAc: new FormControl('',[]),
   dslDiscAc: new FormControl('',[]),
   dslTdsAc: new FormControl('',[]),
   roundOffAc: new FormControl('',[]),
   
  });
  this.getCrAcListForCustWizard();
  setTimeout(() => {
    if (this.selectedCustWizardDetails.custwizid != '') {
      this.formCustWizard.patchValue(this.selectedCustWizardDetails);
      this.formCustWizard.patchValue({
       
      
      })
      
    
        this.editMode = true;
        this.sharedService.loading = false;
    }
    this.sharedService.loading = false;
   }, 2000);
  
  
  }
  get f() { return this.formCustWizard.controls; }
  
  custWizardDelete(): void {
    if(this.selectedCustWizardDetails.custwizid!= '' ){
     this.requestmodel.strRequest =this.selectedCustWizardDetails.custwizid
      if (confirm("Are you sure, you want to delete this?")) {
           this.CustWizardService.custWizardDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
           console.log(this.responseDetails.message);
           this.formCustWizard.reset();
           window.location.reload();
       });
      }
    }
  }
  exit(): void {
    this.route.navigate(['/custwizardlist']);
  }
  getBankAcList(): void {
    this.commonService.getBankAcList().subscribe((res) => {
      this.ledgerAcList = res;
    });
  }
  getBankDebitAcList(): void {
    this.commonService.getBankDebitAcList().subscribe((res) => {
      this.debitAcList = res;
    });
  }
  getCrAcListForCustWizard(){
    this.commonService.GetCrAcListForCustWizard().subscribe((res) => {
      this.creditacList = res;    
    }); 
  }
  
  //Submit user form details //
  submitCustWizardForm(): void {
    this.userSubmitted = true;
    if (this.formCustWizard.invalid) {
      this.toastrService.warning("Mandatory fields is required");
      return;
    }
    this.custWizardModel.custwizid = this.selectedCustWizardDetails.custwizid != '' ? this.selectedCustWizardDetails.custwizid : '';
    var selectedDataValue = this.formCustWizard.getRawValue();
  
    this.custWizardModel.cashAc= selectedDataValue.cashAc;
   // this.brsEntryModel.cardNo = selectedDataValue.cardCode;
    this.custWizardModel.hsdAc = selectedDataValue.hsdAc;
   // this.brsEntryModel.docNo = selectedDataValue.docNo;
   this.custWizardModel.tripRoutExpAc =selectedDataValue.tripRoutExpAc;
    this.custWizardModel.tripRepairsAc = selectedDataValue.tripRepairsAc;
    this.custWizardModel.tripParkingAc = selectedDataValue.tripParkingAc;
    this.custWizardModel.tripMChallanAc = selectedDataValue.tripMChallanAc;
    this.custWizardModel.tripWeighmentAc =selectedDataValue.tripWeighmentAc;
    this.custWizardModel.tripAccidentAc = selectedDataValue.tripAccidentAc;
    this.custWizardModel.tripTollAc = selectedDataValue.tripTollAc;
    this.custWizardModel.tripOthersMiscAc = selectedDataValue.tripOthersMiscAc;
    this.custWizardModel.tripDrAlAc = selectedDataValue.tripDrAlAc;
    this.custWizardModel.delayDamageAc = selectedDataValue.delayDamageAc;
    this.custWizardModel.sgstInputAc = selectedDataValue.sgstInputAc;
    this.custWizardModel.cgstInputAc = selectedDataValue.cgstInputAc;
    this.custWizardModel.igstInputAc = selectedDataValue.igstInputAc;
    this.custWizardModel.fastagTollAc = selectedDataValue.fastagTollAc;
    this.custWizardModel.happayAc = selectedDataValue.happayAc;
    this.custWizardModel.driverPoolAc = selectedDataValue.driverPoolAc;
    this.custWizardModel.driverSalAc = selectedDataValue.driverSalAc;
    this.custWizardModel.frtIncAc = selectedDataValue.frtIncAc;
    this.custWizardModel.tripTravelAlAc = selectedDataValue.tripTravelAlAc;
    this.custWizardModel.tripTravelAlAc = selectedDataValue.tripTravelAlAc;
    this.custWizardModel.tripIncentiveAc = selectedDataValue.tripIncentiveAc;
    this.custWizardModel.tripRecdDrAc = selectedDataValue.tripRecdDrAc;
    this.custWizardModel.dslDiscAc = selectedDataValue.dslDiscAc;
    this.custWizardModel.dslTdsAc = selectedDataValue.dslTdsAc;
    this.custWizardModel.roundOffAc = selectedDataValue.roundOffAc;
  
  
  
    this.CustWizardService.custWizardDetailsSubmitted(this.custWizardModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formCustWizard.reset();
      window.location.reload();
    });
  }
  }
