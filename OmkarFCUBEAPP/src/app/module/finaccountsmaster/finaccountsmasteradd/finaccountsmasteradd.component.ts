import { Component, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Finaccountmodel  } from 'src/app/models/finaccountmodel';
import { FinsaccountmasterService } from 'src/app/services/finaccountmaster.service';
import { FingroupService } from 'src/app/services/fingroup.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-finaccountsmasteradd',
  templateUrl: './finaccountsmasteradd.component.html',
  styleUrls:['./finaccountsmasteradd.component.css']
})
export class FinaccountsmasteraddComponent { 
    loggedInUserID: string = '';
    userlogindate:string="";
    formAccountMaster!: FormGroup;
    formSubmitted = false;
    responseDetails = new Responsemodel();
  
      accountId: string = "";
      accountName: string = "";
      subAccountId: string = "";
      subAccountName: string = "";
      accountType: string = "";
      accountGroupFlag: string = "";
      accountLedgerType: string = "";
      groupSortId: string = "";
      schID: string = "";
      schDesc: string = "";
      printName: string = "";
      accountAddress1: string = "";
      accountAddress2: string = "";
      accountAddress3: string = "";
      accountAddress4: string = "";
      stateCode: string = "";
      pinCode: string = "";
      accountPhone: string = "";
      accountContact: string = "";
      accountMobile: string = "";
      accountEmail: string = "";
      accountFax: string = "";
      accountUrl: string = "";
      accountTAN: string = "";
      accountPAN: string = "";
      gstNo: string = "";
      tDSRate: string = "";
      accountCredit_Days: string = "";
      accountCredit_Limit: string = "";
      accountInterest_Rate: string = "";
      accountSecurity_Dep: string = "";
      accountBG: string = "";
      accountRem_Ref: string = "";
      accountStatus: string = "";
      globalAc: string = "";
      hO_Account: string = "";
      isLiabilityYNType: string = "";
      subLedgerYN: string = ""; 
      subLedgerQry: string = "";
      costCodeYN: string = "";
      manualJv: string = "";
      isAdminExpYN: string = "";
      hideBranch: string = "";
      hideNonAdmin: string = "";
      tdsLedgerYN: string = ""; 
      onlineActiveYn: string = "";
      username: string = "";
      password: string = "";
      sendEmail: string = "";
      partyType: string = "";
      contractValidity: string = "";
      staxEX: string = "";
      vendorCode: string = "";
      bankName: string = "";
      bankBranch: string = "";
      bankAcType: string = "";
      bankAcNo: string = "";
      bankIfsc: string = "";
      deleteFlag: string = "";
      blockAct: string = "";
      statusColor: string = "";
      ledgerName: string = "";
      createdBy: string = "";
      loggedInUser: string = "";    
  
  
    accountTypeList: Dropdownmodel[] = [];
    subAccountTypeList: Dropdownmodel[] = []; 
    scheduleList: Dropdownmodel[] = [];
    ledgerList: Dropdownmodel[] = [];
    statelist: Dropdownmodel[] = [];

    selectedFinaccountMasterDetails = new Finaccountmodel();
  
    constructor(private route: Router, private formBuilder: FormBuilder, 
       private finaccountmodel: Finaccountmodel,
       private finsaccountmasterService: FinsaccountmasterService,
       private commonService: CommonService, private requestmodel:Requestmodel,
       private fingroupService :FingroupService, private toasterService: ToastrService) {
      this.finaccountmodel = new Finaccountmodel();
   
  }
  
  ngOnInit(): void {
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
    
    this.selectedFinaccountMasterDetails = this.finsaccountmasterService.getFinsaccountsDetails(); 
    this.formAccountMaster = this.formBuilder.group({      
      accountName: new FormControl('',[Validators.required]),
      mainGroup: new FormControl('',[Validators.required]),
      subGroup: new FormControl('',[Validators.required]),
      ledgertype: new FormControl('',[Validators.required]),
      schedule: new FormControl('',[Validators.required]),
      status: new FormControl('',[Validators.required]),
      address: new FormControl('',),
      address1: new FormControl('',),
      address2: new FormControl('',),
      address3: new FormControl('',),
      state:new FormControl('',),
      pincode: new FormControl('',),
      phoneNo: new FormControl('',),
      mobileNo: new FormControl('',),
      acContact: new FormControl('',),
      fax: new FormControl('',),
      email:new FormControl('',),
      url: new FormControl('',),
      printName: new FormControl('',),
      creditLimit: new FormControl('',),
      securityDeposit: new FormControl('',),
      creditDays: new FormControl('',),
      accountBG:new FormControl('',),
      interestRate: new FormControl('',),
      tDSRate: new FormControl('',),
      accountRemRef: new FormControl('',),
      vendorCode: new FormControl('',),
      bankName:new FormControl('',),
      bankBranch: new FormControl('',),
      ifscCode: new FormControl('',),
      accountType:new FormControl('',),
      accountNo: new FormControl('',),
      pANNo: new FormControl('',),
      gSTNo: new FormControl('',),
      liabilityType: new FormControl('',),
      partyType:new FormControl('',),
      contractValidity:new FormControl('',),
      accountTAN: new FormControl('',),
      userName: new FormControl('',),
      password: new FormControl('',),
      activeyn: new FormControl('',),
      hideBranchLogin:new FormControl('',),
      hideForNonAdminUsers: new FormControl('',),
      generalMRApplicable: new FormControl('',),
      hOAccountOnly: new FormControl('',),
      sendEmail: new FormControl('',),
      globalAccount:new FormControl('',),
      costRef: new FormControl('',),
      isExpApprovalReq: new FormControl('',),
      manualJV: new FormControl('',),
      subLedgerApplicable: new FormControl('',),
      subledgerQry: new FormControl('',),
      tdsLedgerYN: new FormControl('',),
      onlineActiveYn: new FormControl('',),
    });    
    this.requestmodel.strRequest="";
    this.getaccounttypes();
    this.getsubaccounttypes(this.requestmodel);
    this.getschedulelist();  
    this.getledgerList();  
    this.getstatelist(); 
    
    setTimeout(() => {
      if (this.selectedFinaccountMasterDetails.accountId != '') {
          this.formAccountMaster.patchValue(this.selectedFinaccountMasterDetails);
          this.formAccountMaster.patchValue({
            // mainGroup: this.accountTypeList.find(e => e.dataId == this.selectedFinaccountMasterDetails.accountType),
            // subGroup:this.subAccountTypeList.find(e => e.dataId == this.selectedFinaccountMasterDetails.subAccountId),
            // ledgertype:this.ledgerList.find(e => e.dataId == this.selectedFinaccountMasterDetails.ledgerName),
          });         
      }
    }, 2000);
    
  }
  // convenience getter for easy access to contact form fields
  get f() { return this.formAccountMaster.controls; }
  
    
  getaccounttypes(): void {
    this.fingroupService.getaccounttypes().subscribe((res) => {
      this.accountTypeList = res;
    });
  }
  
  getsubaccounttypes(request:Requestmodel): void {
    this.fingroupService.getsubaccounttypes(request).subscribe((res) => {
      this.subAccountTypeList = res;
    });
  }
  
  getschedulelist(): void {
      this.fingroupService.getschedulelist().subscribe((res) => {
      this.scheduleList = res;
    });
  }
  
  getstatelist(): void {
      this.commonService.getStateList().subscribe((res) => {
      this.statelist = res;
    });
  }

  chkChange(e: any) { 
    if(e.target.checked){
      e.target.value='Y';
    }
    else{
      e.target.value='N';
    }
  }
   
  getledgerList(): void {
      this.finsaccountmasterService.getledgerList().subscribe((res) => {
      this.ledgerList = res;
    });
  }  

  accountTypeChange(e: any) { 
      console.log(e.target.value);
      this.requestmodel.strRequest = e.target.value;  
      this.getsubaccounttypes(this.requestmodel);
  } 
  
  
  //Submit user form details //
  submitFinAccountMasterForm(): void {
    this.formSubmitted = true;
    if (this.formAccountMaster.invalid) {
      this.toasterService.warning("All fields are mandatory");      
      return;
    }
    var selectedDataValue = this.formAccountMaster.getRawValue();
   
    
  this.finaccountmodel.accountId = this.selectedFinaccountMasterDetails.accountId != '' ? this.selectedFinaccountMasterDetails.accountId : '';
  this.finaccountmodel.accountName= selectedDataValue.accountName;
  this.finaccountmodel.accountType= selectedDataValue.mainGroup;
  this.finaccountmodel.subAccountId=selectedDataValue.subGroup? selectedDataValue.subGroup :"1";
  this.finaccountmodel.accountGroupFlag="G";
  this.finaccountmodel.groupSortId="0";
  this.finaccountmodel.accountLedgerType =selectedDataValue.ledgertype;
  this.finaccountmodel.printName=selectedDataValue.printName;
  this.finaccountmodel.accountAddress1=selectedDataValue.address;
  this.finaccountmodel.accountAddress2=selectedDataValue.address1;
  this.finaccountmodel.accountAddress3=selectedDataValue.address2;
  this.finaccountmodel.accountAddress4=selectedDataValue.address3;
  this.finaccountmodel.stateCode=selectedDataValue.state;
  this.finaccountmodel.pinCode=selectedDataValue.pincode;
  this.finaccountmodel.accountPhone=selectedDataValue.phoneNo;
  this.finaccountmodel.accountMobile=selectedDataValue.mobileNo;
  this.finaccountmodel.accountContact=selectedDataValue.acContact;
  this.finaccountmodel.accountEmail=selectedDataValue.email;
  this.finaccountmodel.accountFax=selectedDataValue.fax;
  this.finaccountmodel.accountUrl=selectedDataValue.url;
  this.finaccountmodel.accountTAN=selectedDataValue.accountTAN;
  this.finaccountmodel.accountPAN=selectedDataValue.pANNo;
  this.finaccountmodel.gstNo=selectedDataValue.gSTNo;
  this.finaccountmodel.tDSRate =selectedDataValue.tDSRate;
  this.finaccountmodel.accountCredit_Days=selectedDataValue.creditDays;
  this.finaccountmodel.accountCredit_Limit=selectedDataValue.creditLimit;
  this.finaccountmodel.accountSecurity_Dep=selectedDataValue.securityDeposit;
  this.finaccountmodel.accountInterest_Rate=selectedDataValue.interestRate;
  this.finaccountmodel.accountBG=selectedDataValue.accountBG;
  this.finaccountmodel.accountRem_Ref=selectedDataValue.accountRemRef;
  this.finaccountmodel.accountStatus=selectedDataValue.activeyn? "Y" :"N";
  this.finaccountmodel.globalAc=selectedDataValue.globalAccount? "Y" :"N";
  this.finaccountmodel.hO_Account=selectedDataValue.hOAccountOnly? "Y" :"N";
  this.finaccountmodel.isLiabilityYNType=selectedDataValue.liabilityType;
  this.finaccountmodel.subLedgerYN =selectedDataValue.subLedgerApplicable? "Y" :"N";
  this.finaccountmodel.subLedgerQry =selectedDataValue.subledgerQry;
  this.finaccountmodel.costCodeYN  =selectedDataValue.costRef? "Y" :"N";
  this.finaccountmodel.manualJv  =selectedDataValue.manualJV? "Y" :"N";
  this.finaccountmodel.isAdminExpYN =selectedDataValue.isExpApprovalReq? "Y" :"N";
  this.finaccountmodel.hideBranch =selectedDataValue.hideBranchLogin? "Y" :"N";
  this.finaccountmodel.hideNonAdmin =selectedDataValue.hideForNonAdminUsers? "Y" :"N";
  this.finaccountmodel.tdsLedgerYN =selectedDataValue.tdsLedgerYN? "Y" :"N";
  this.finaccountmodel.onlineActiveYn =selectedDataValue.onlineActiveYn? "Y" :"N";
  this.finaccountmodel.tdsLedgerYN =selectedDataValue.tdsLedgerYN? "Y" :"N";
  this.finaccountmodel.username =selectedDataValue.userName;
  this.finaccountmodel.password =selectedDataValue.password;
  this.finaccountmodel.sendEmail =selectedDataValue.sendEmail? "Y" :"N";
  this.finaccountmodel.partyType =selectedDataValue.partyType;
  this.finaccountmodel.contractValidity =selectedDataValue.contractValidity;
  this.finaccountmodel.staxEX =selectedDataValue.generalMRApplicable? "Y" :"N";
  this.finaccountmodel.vendorCode =selectedDataValue.vendorCode;
  this.finaccountmodel.bankName =selectedDataValue.bankName;
  this.finaccountmodel.bankBranch =selectedDataValue.bankBranch;
  this.finaccountmodel.bankAcNo =selectedDataValue.accountNo;
  this.finaccountmodel.bankAcType =selectedDataValue.accountType;
  this.finaccountmodel.bankIfsc =selectedDataValue.ifscCode;
  this.finaccountmodel.blockAct ='N';
  this.finaccountmodel.statusColor =selectedDataValue.status;
  this.finaccountmodel.schID= selectedDataValue.schedule;
  this.finaccountmodel.createdBy= this.loggedInUserID;

   this.finsaccountmasterService.finsaccountsDetailsSubmitted(this.finaccountmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      console.log(this.responseDetails.message);
      this.formAccountMaster.reset();
      window.location.reload();
    });
  }
  }
  
  
  
  
  