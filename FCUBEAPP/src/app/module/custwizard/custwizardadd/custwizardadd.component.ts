import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Custwizardmodel } from 'src/app/models/custwizardmodel';
import { CommonService } from 'src/app/services/common.service';
import { CustwizardService } from 'src/app/services/custwizard.service';
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
  formSubmitted = false;
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
  dashboard: string ="";
  loginDate: string = '';
  year: string = '';
  
  step1Active = true;
  step2Active = false;
  step3Active = false;
  step4Active = false;

  selectedCustWizardDetails = new Custwizardmodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private custWizardModel: Custwizardmodel, private CustWizardService: CustwizardService, 
    private commonService: CommonService,private toastrService: ToastrService,
    private requestmodel:Requestmodel,private sharedService: SharedService) {
    this.custWizardModel = new Custwizardmodel();
  }

  ngOnInit(): void {
    this.editMode = false;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Custom Wizard"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
    }
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
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
      cashAc: new FormControl('',[Validators.required]),
      frtIncomeAc: new FormControl('',[Validators.required]),
      sgstOutputAc: new FormControl('',[Validators.required]),
      cgstOutputAc: new FormControl('',[Validators.required]),
      igstOutputAc: new FormControl('',[Validators.required]),
      sgstInputAc: new FormControl('',[Validators.required]),
      cgstInputAc: new FormControl('',[Validators.required]),
      igstInputAc: new FormControl('',[Validators.required]),
      
      lH_LorryHireAc: new FormControl('',[Validators.required]),
      lH_LorryHirePayableAc: new FormControl('',[Validators.required]),
      lH_TdsOnLorryHireAc: new FormControl('',[Validators.required]),
      lhP_HamaliAc: new FormControl('',[Validators.required]),
      lhP_DetentionAc: new FormControl('',[Validators.required]),
      lhP_OtherChargesAc: new FormControl('',[Validators.required]),
      lhP_LhpmAc: new FormControl('',[Validators.required]),
      lhP_RecoveryAc: new FormControl('',[Validators.required]),
      lhP_OthDedAc: new FormControl('',[Validators.required]),

      mR_FrtDeductionAc: new FormControl('',[Validators.required]),
      mR_ClaimsByPartyAc: new FormControl('',[Validators.required]),
      mR_BadDebtsAc: new FormControl('',[Validators.required]),
      mR_MiscDedAc: new FormControl('',[Validators.required]),
      mR_BankChargesAc: new FormControl('',[Validators.required]),
      mR_CashDiscAc: new FormControl('',[Validators.required]),
      mR_ExcessRecdAc: new FormControl('',[Validators.required]),
      mR_TdsDedAc: new FormControl('',[Validators.required]),
      mR_OthDedAc: new FormControl('',[Validators.required]),    

      flt_TyreStockAc: new FormControl('',[Validators.required]),   
      flt_TyreExpAc: new FormControl('',[Validators.required]),   
      //Flt_TyreExpAc : new FormControl('',[Validators.required]),   
      flt_TyreSalesAc: new FormControl('',[Validators.required]),   
      flt_SparesStockAc: new FormControl('',[Validators.required]),  
      flt_LubesStockAc: new FormControl('',[Validators.required]),  
      flt_VehMaintExpAc: new FormControl('',[Validators.required]),  
     // Flt_VehMaintExpAc: new FormControl('',[Validators.required]),  
      flt_TripDrAdvanceAc: new FormControl('',[Validators.required]),  
      flt_TripFrtIncomeAc: new FormControl('',[Validators.required]),  
      flt_FltFrtReceivableAc: new FormControl('',[Validators.required]), 
      flt_TripExpensesAc: new FormControl('',[Validators.required]), 
      flt_DslPetroCardAc: new FormControl('',[Validators.required]), 
      flt_HappayCardAc: new FormControl('',[Validators.required]), 
      flt_TripDslExpAc: new FormControl('',[Validators.required]), 
      flt_TripAdblueExpAc: new FormControl('',[Validators.required]), 
      flt_DriverSalaryAc: new FormControl('',[Validators.required]), 
      flt_TripSuspenseAc: new FormControl('',[Validators.required]), 
      flt_ExtraChargesAc: new FormControl('',[Validators.required]), 
      flt_FrtDedAc: new FormControl('',[Validators.required]), 
      flt_TdsDedAc: new FormControl('',[Validators.required]), 
      flt_OthDedAc: new FormControl('',[Validators.required]), 
      hsdAc: new FormControl('',[Validators.required]), 
      dslDiscAc: new FormControl('',[Validators.required]), 
      dslTdsAc: new FormControl('',[Validators.required]), 

    });
    this.getCrAcListForCustWizard();
    this.getCustWizardDetails();

    setTimeout(() => {
    if (this.selectedCustWizardDetails.custwizId != '') {      
      this.sharedService.loading = true;
      this.formCustWizard.patchValue(this.selectedCustWizardDetails);  
      this.editMode = true;
      this.sharedService.loading = false;
    }
   }, 2000);
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
  getCustWizardDetails() {
    //this.tripVehicleDetails.vehicleMasterId =  e;
    this.commonService.getCustWizardDetails(this.selectedCustWizardDetails).subscribe((res: Custwizardmodel) => {
      this.selectedCustWizardDetails = res;
      this.formCustWizard.patchValue({
        custwizId:  this.selectedCustWizardDetails.custwizId,
        cashAc:  this.selectedCustWizardDetails.cashAc,
        frtIncomeAc:  this.selectedCustWizardDetails.frtIncomeAc,
        sgstOutputAc:  this.selectedCustWizardDetails.sgstOutputAc,
        cgstOutputAc:  this.selectedCustWizardDetails.cgstOutputAc,
        igstOutputAc:  this.selectedCustWizardDetails.igstOutputAc,
        sgstInputAc:  this.selectedCustWizardDetails.sgstInputAc,
        cgstInputAc:  this.selectedCustWizardDetails.cgstInputAc,
        igstInputAc:  this.selectedCustWizardDetails.igstInputAc,
        lH_LorryHireAc:  this.selectedCustWizardDetails.lH_LorryHireAc,
        lH_LorryHirePayableAc:  this.selectedCustWizardDetails.lH_LorryHirePayableAc,
        lH_TdsOnLorryHireAc:  this.selectedCustWizardDetails.lH_TdsOnLorryHireAc,
        lhP_HamaliAc:  this.selectedCustWizardDetails.lhP_HamaliAc,
        lhP_DetentionAc:  this.selectedCustWizardDetails.lhP_DetentionAc,
        lhP_OtherChargesAc:  this.selectedCustWizardDetails.lhP_OtherChargesAc,
        lhP_LhpmAc:  this.selectedCustWizardDetails.lhP_LhpmAc,
        lhP_RecoveryAc:  this.selectedCustWizardDetails.lhP_RecoveryAc,
        lhP_OthDedAc:  this.selectedCustWizardDetails.lhP_OthDedAc,
        mR_FrtDeductionAc:  this.selectedCustWizardDetails.mR_FrtDeductionAc,
        mR_ClaimsByPartyAc:  this.selectedCustWizardDetails.mR_ClaimsByPartyAc,
        mR_BadDebtsAc:  this.selectedCustWizardDetails.mR_BadDebtsAc,
        mR_MiscDedAc:  this.selectedCustWizardDetails.mR_MiscDedAc,
        mR_BankChargesAc:  this.selectedCustWizardDetails.mR_BankChargesAc,
        mR_CashDiscAc:  this.selectedCustWizardDetails.mR_CashDiscAc,
        mR_ExcessRecdAc:  this.selectedCustWizardDetails.mR_ExcessRecdAc,
        mR_TdsDedAc:  this.selectedCustWizardDetails.mR_TdsDedAc,
        mR_OthDedAc:  this.selectedCustWizardDetails.mR_OthDedAc,
        flt_TyreStockAc:  this.selectedCustWizardDetails.flt_TyreStockAc,
        flt_TyreExpAc:  this.selectedCustWizardDetails.flt_TyreExpAc,
        flt_TyreSalesAc:  this.selectedCustWizardDetails.flt_TyreSalesAc,
        flt_SparesStockAc:  this.selectedCustWizardDetails.flt_SparesStockAc,
        flt_LubesStockAc:  this.selectedCustWizardDetails.flt_LubesStockAc,
        flt_VehMaintExpAc:  this.selectedCustWizardDetails.flt_VehMaintExpAc,
        flt_TripDrAdvanceAc:  this.selectedCustWizardDetails.flt_TripDrAdvanceAc,
        flt_TripFrtIncomeAc:  this.selectedCustWizardDetails.flt_TripFrtIncomeAc,
        flt_FltFrtReceivableAc:  this.selectedCustWizardDetails.flt_FltFrtReceivableAc,
        flt_TripExpensesAc:  this.selectedCustWizardDetails.flt_TripExpensesAc,
        flt_DslPetroCardAc:  this.selectedCustWizardDetails.flt_DslPetroCardAc,
        flt_HappayCardAc:  this.selectedCustWizardDetails.flt_HappayCardAc,
        flt_TripDslExpAc:  this.selectedCustWizardDetails.flt_TripDslExpAc,
        flt_TripAdblueExpAc:  this.selectedCustWizardDetails.flt_TripAdblueExpAc,
        flt_DriverSalaryAc:  this.selectedCustWizardDetails.flt_DriverSalaryAc,
        flt_TripSuspenseAc:  this.selectedCustWizardDetails.flt_TripSuspenseAc,
        flt_ExtraChargesAc:  this.selectedCustWizardDetails.flt_ExtraChargesAc,
        flt_FrtDedAc:  this.selectedCustWizardDetails.flt_FrtDedAc,
        flt_TdsDedAc:  this.selectedCustWizardDetails.flt_TdsDedAc,
        flt_OthDedAc: this.selectedCustWizardDetails.flt_OthDedAc,
        hsdAc: this.selectedCustWizardDetails.hsdAc,
        dslDiscAc: this.selectedCustWizardDetails.dslDiscAc,
        dslTdsAc: this.selectedCustWizardDetails.dslTdsAc,               
      });
    });    
  }
  getCrAcListForCustWizard(){
    this.commonService.GetCrAcListForCustWizard().subscribe((res) => {
      this.creditacList = res;    
    }); 
  }
  get f() { return this.formCustWizard.controls; }

  
  nextStep(index: number): void {
    if (index === 1) {
      this.step1Active = true;
      this.step2Active = false;
      this.step3Active = false;
      this.step4Active = false;
    }
    if (index === 2) {
      this.step1Active = false;
      this.step2Active = true;
      this.step3Active = false;
      this.step4Active = false;
    }
    if (index === 3) {
      this.step1Active = false;
      this.step2Active = false;
      this.step3Active = true;
      this.step4Active = false;
    }
    if (index === 4) {
      this.step1Active = false;
      this.step2Active = false;
      this.step3Active = false;
      this.step4Active = true;
    }
  }
  
  custWizardDelete(): void {
    if(this.selectedCustWizardDetails.custwizId!= '' ){
     this.requestmodel.strRequest =this.selectedCustWizardDetails.custwizId
      if (confirm("Are you sure, you want to delete this?")) {
        this.CustWizardService.custWizardDelete(this.requestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if (res.status) {
            this.toastrService.success(this.responseDetails.message);
            this.formCustWizard.reset();
            this.route.navigate(['/customwizard']);
          }
          else {
            this.toastrService.warning(this.responseDetails.message);
          }
       });
      }
    }
  }

  exit(): void {
    this.route.navigate([this.dashboard]);
  }
  
  //Submit user form details //
  submitCustWizardForm(): void {
    if (this.formCustWizard.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields ");
      const controls = this.formCustWizard.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + "Fields is Invalid");
        }
      }
      return;
    }

    var selectedDataValue = this.formCustWizard.getRawValue();

    this.custWizardModel.custwizId = this.selectedCustWizardDetails.custwizId ;     
  
    this.custWizardModel.cashAc = selectedDataValue.cashAc ;    
    this.custWizardModel.frtIncomeAc = selectedDataValue.frtIncomeAc ;    
    this.custWizardModel.sgstOutputAc = selectedDataValue.sgstOutputAc ;    
    this.custWizardModel.cgstOutputAc = selectedDataValue.cgstOutputAc ;    
    this.custWizardModel.igstOutputAc = selectedDataValue.igstOutputAc ;    
    this.custWizardModel.sgstInputAc = selectedDataValue.sgstInputAc ;    
    this.custWizardModel.cgstInputAc = selectedDataValue.cgstInputAc ;    
    this.custWizardModel.igstInputAc = selectedDataValue.igstInputAc ;    
    this.custWizardModel.lH_LorryHireAc = selectedDataValue.lH_LorryHireAc ;    
    this.custWizardModel.lH_LorryHirePayableAc = selectedDataValue.lH_LorryHirePayableAc ;    
    this.custWizardModel.lH_TdsOnLorryHireAc = selectedDataValue.lH_TdsOnLorryHireAc ;    
    this.custWizardModel.lhP_HamaliAc = selectedDataValue.lhP_HamaliAc ;    
    this.custWizardModel.lhP_DetentionAc = selectedDataValue.lhP_DetentionAc ;    
    this.custWizardModel.lhP_OtherChargesAc = selectedDataValue.lhP_OtherChargesAc ;    
    this.custWizardModel.lhP_LhpmAc = selectedDataValue.lhP_LhpmAc ;    
    this.custWizardModel.lhP_RecoveryAc = selectedDataValue.lhP_RecoveryAc ;    
    this.custWizardModel.lhP_OthDedAc = selectedDataValue.lhP_OthDedAc ;    
    this.custWizardModel.mR_FrtDeductionAc = selectedDataValue.mR_FrtDeductionAc ;    
    this.custWizardModel.mR_ClaimsByPartyAc = selectedDataValue.mR_ClaimsByPartyAc ;    
    this.custWizardModel.mR_BadDebtsAc = selectedDataValue.mR_BadDebtsAc ;    
    this.custWizardModel.mR_MiscDedAc = selectedDataValue.mR_MiscDedAc ;    
    this.custWizardModel.mR_BankChargesAc = selectedDataValue.mR_BankChargesAc ;    
    this.custWizardModel.mR_CashDiscAc = selectedDataValue.mR_CashDiscAc ;    
    this.custWizardModel.mR_ExcessRecdAc = selectedDataValue.mR_ExcessRecdAc ;    
    this.custWizardModel.mR_TdsDedAc = selectedDataValue.mR_TdsDedAc ;    
    this.custWizardModel.mR_OthDedAc = selectedDataValue.mR_OthDedAc ;    
    this.custWizardModel.flt_TyreStockAc = selectedDataValue.flt_TyreStockAc ;    
    this.custWizardModel.flt_TyreExpAc = selectedDataValue.flt_TyreExpAc ;    
    this.custWizardModel.flt_TyreSalesAc = selectedDataValue.flt_TyreSalesAc ;    
    this.custWizardModel.flt_SparesStockAc = selectedDataValue.flt_SparesStockAc ;    
    this.custWizardModel.flt_LubesStockAc = selectedDataValue.flt_LubesStockAc ;    
    this.custWizardModel.flt_VehMaintExpAc = selectedDataValue.flt_VehMaintExpAc ;    
    this.custWizardModel.flt_TripDrAdvanceAc = selectedDataValue.flt_TripDrAdvanceAc ;    
    this.custWizardModel.flt_TripFrtIncomeAc = selectedDataValue.flt_TripFrtIncomeAc ;    
    this.custWizardModel.flt_FltFrtReceivableAc = selectedDataValue.flt_FltFrtReceivableAc ;    
    this.custWizardModel.flt_TripExpensesAc = selectedDataValue.flt_TripExpensesAc ;    
    this.custWizardModel.flt_DslPetroCardAc = selectedDataValue.flt_DslPetroCardAc ;    
    this.custWizardModel.flt_HappayCardAc = selectedDataValue.flt_HappayCardAc ;    
    this.custWizardModel.flt_TripDslExpAc = selectedDataValue.flt_TripDslExpAc ;    
    this.custWizardModel.flt_TripAdblueExpAc = selectedDataValue.flt_TripAdblueExpAc ;    
    this.custWizardModel.flt_DriverSalaryAc = selectedDataValue.flt_DriverSalaryAc ;    
    this.custWizardModel.flt_TripSuspenseAc = selectedDataValue.flt_TripSuspenseAc ;    
    this.custWizardModel.flt_ExtraChargesAc = selectedDataValue.flt_ExtraChargesAc ;    
    this.custWizardModel.flt_FrtDedAc = selectedDataValue.flt_FrtDedAc ;    
    this.custWizardModel.flt_TdsDedAc = selectedDataValue.flt_TdsDedAc ;    
    this.custWizardModel.flt_OthDedAc= selectedDataValue.flt_OthDedAc;
    this.custWizardModel.hsdAc = selectedDataValue.hsdAc ;    
    this.custWizardModel.dslDiscAc = selectedDataValue.dslDiscAc ;    
    this.custWizardModel.dslTdsAc= selectedDataValue.dslTdsAc;
  
    this.CustWizardService.custWizardDetailsSubmitted(this.custWizardModel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (res.status) {
        this.toastrService.success(this.responseDetails.message);
        this.formCustWizard.reset();
        this.route.navigate(['/custwizardlist']);
      }
      else {
        this.toastrService.warning(this.responseDetails.message);
      }
    });
  }
}
