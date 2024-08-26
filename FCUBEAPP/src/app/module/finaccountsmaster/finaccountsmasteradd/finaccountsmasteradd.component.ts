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
import { SharedService } from 'src/app/services/shared.service';

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
    editMode = false;
    createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false;

    responseDetails = new Responsemodel();
    accountTypeList: Dropdownmodel[] = [];
    subAccountTypeList: Dropdownmodel[] = []; 
    // scheduleList: Dropdownmodel[] = [];
    ledgerList: Dropdownmodel[] = [];
    statelist: Dropdownmodel[] = [];

    selectedFinaccountMasterDetails = new Finaccountmodel();
  
    constructor(private route: Router, private formBuilder: FormBuilder, 
       private finaccountmodel: Finaccountmodel, private sharedService: SharedService,
       private finsaccountmasterService: FinsaccountmasterService,
       private commonService: CommonService, private requestmodel:Requestmodel,
       private fingroupService :FingroupService, private toasterService: ToastrService) {
      this.finaccountmodel = new Finaccountmodel();
   
  }
  
  ngOnInit(): void {    

  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Accounts/Ledger Master");
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
    else {
      this.route.navigate(['/']);
    }
    
     this.formAccountMaster = this.formBuilder.group({    
      accountName: new FormControl('',[Validators.required]),
      accountType: new FormControl('',[Validators.required]),
      subAccountType: new FormControl('',[Validators.required]),
      accountGroupFlag: new FormControl('',),
      accountLedgerType: new FormControl('O',),
      groupSortId: new FormControl('',),
      // schID: new FormControl('',[Validators.required]),
      schDesc: new FormControl('',),
      printName: new FormControl('',),
      accountAddress1: new FormControl('',),
      accountAddress2: new FormControl('',),
      accountAddress3: new FormControl('',),
      accountAddress4: new FormControl('',),
      stateCode: new FormControl('',),
      pinCode: new FormControl('',),
      accountPhone: new FormControl('',),
      accountContact1: new FormControl('',),
      accountMobile1: new FormControl('',),
      accountEmail1: new FormControl('',),
      accountFax: new FormControl('',),
      accountUrl: new FormControl('',),
      accountTAN: new FormControl('',),
      accountPAN: new FormControl('',),
      accountGstNo: new FormControl('',),
      tDSRate: new FormControl('',),
      accountCreditDays: new FormControl('',),
      accountCreditLimit: new FormControl('',),
      accountInterestRate: new FormControl('',),
      accountSecurityDep: new FormControl('',),
      accountBG: new FormControl('',),
      accountRemRef: new FormControl('',),
      accountStatus:new FormControl('Y',),
      isExpForLiabilityYN: new FormControl('N',),
      subLedgerYN: new FormControl('N',),
      subLedgerQry: new FormControl('',),
      isAdminExpYN: new FormControl('N',),
      hideBranch: new FormControl('N',),
      hideNonAdmin: new FormControl('N',),
      tdsLedgerYN: new FormControl('N',),
      onlineActiveYn: new FormControl('N',),
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
      sendEmail: new FormControl('N',),
      partyType: new FormControl('N',),
      contractValidity: new FormControl('',),
      vendorCode: new FormControl('',),
      bankName: new FormControl('',),
      bankBranch: new FormControl('',),
      bankAcType: new FormControl('',),
      bankAcNo: new FormControl('',),
      bankIfsc: new FormControl('',),
      statusColor: new FormControl('',),      
    });    

    this.formAccountMaster.controls['username'].clearValidators();      
    this.formAccountMaster.controls['password'].clearValidators();  
    this.formAccountMaster.controls['username'].updateValueAndValidity();
    this.formAccountMaster.controls['password'].updateValueAndValidity();

    this.sharedService.loading = true;

    this.selectedFinaccountMasterDetails = this.finsaccountmasterService.getFinsaccountsDetails(); 
   
    if (this.selectedFinaccountMasterDetails.accountId != ''){
      this.requestmodel.strRequest=this.selectedFinaccountMasterDetails.accountType;
    }
    this.getaccounttypes();
    this.getsubaccounttypes(this.requestmodel);
    // this.getschedulelist(); 
    this.getledgerList();  
    this.getstatelist(); 
    

    setTimeout(() => {
      if (this.selectedFinaccountMasterDetails.accountId != '') {
          this.formAccountMaster.patchValue(this.selectedFinaccountMasterDetails);   
          this.editMode=true;           
      }
    }, 2000);
    
    this.sharedService.loading = false;
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
  
  // getschedulelist(): void {
  //     this.fingroupService.getschedulelist().subscribe((res) => {
  //     this.scheduleList = res;
  //   });
  // }
  
  getstatelist(): void {
      this.commonService.getStateList().subscribe((res) => {
      this.statelist = res;
    });
  }

  onOnlineActiveChk(e: any) {
    if (e.target.value=='Y'){
      this.formAccountMaster.controls['username'].setValidators([Validators.required]);
      this.formAccountMaster.controls['password'].setValidators([Validators.required]);
    }
    else {
      this.formAccountMaster.controls['username'].clearValidators();      
      this.formAccountMaster.controls['password'].clearValidators();   
    }
    this.formAccountMaster.controls['username'].updateValueAndValidity();
    this.formAccountMaster.controls['password'].updateValueAndValidity();
  }

  chkAccountNameExits(e: any) { 
    if (this.selectedFinaccountMasterDetails.accountId == "")
    {
      this.requestmodel.strRequest = e.target.value; 
      this.fingroupService.chkActName(this.requestmodel).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (!this.responseDetails.status) {
          this.toasterService.warning(this.responseDetails.message);
          this.formAccountMaster.patchValue({
            accountName: ''
          });
        }
      });
    }
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

  
  deleteFinAccountMasterForm(): void {
    if(this.selectedFinaccountMasterDetails.accountId != '' ){
      this.sharedService.loading = true;
     this.requestmodel.strRequest =this.selectedFinaccountMasterDetails.accountId
      if (confirm("Are you sure, you want to delete this?")) {
            this.fingroupService.FinGroupDetailsDelete(this.requestmodel).subscribe((res: Responsemodel) => {
            this.responseDetails = res;
            if (this.responseDetails.status){              
              console.log(this.responseDetails.message);
              this.formAccountMaster.reset();
              this.route.navigate(['/finaccountsmasterlist']);
            } 
            else{
              console.log(this.responseDetails.message);  
              this.toasterService.warning(this.responseDetails.message);  
              return; 
            }   
        });
      }
      this.sharedService.loading = false;
    }
  }
  exit(): void {
    this.route.navigate(['/finaccountsmasterlist']);
  }
  
  
  //Submit user form details //
  submitFinAccountMasterForm(): void {
    this.formSubmitted = true;
    if (this.formAccountMaster.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formAccountMaster.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }          
      return;
    }
    var selectedDataValue = this.formAccountMaster.getRawValue();
   
    this.sharedService.loading = true;
    
    this.finaccountmodel.accountId          = this.selectedFinaccountMasterDetails.accountId != '' ? this.selectedFinaccountMasterDetails.accountId : '';
    this.finaccountmodel.accountName        = selectedDataValue.accountName.toString().toUpperCase();
    this.finaccountmodel.accountType        = selectedDataValue.accountType.toString().toUpperCase();
    this.finaccountmodel.subAccountType     = selectedDataValue.subAccountType? selectedDataValue.subAccountType :"1";
    this.finaccountmodel.accountGroupFlag   = "A";
    this.finaccountmodel.groupSortId        = "0";
    this.finaccountmodel.accountLedgerType  = selectedDataValue.accountLedgerType.toString().toUpperCase();
    this.finaccountmodel.printName          = selectedDataValue.printName.toString().toUpperCase();
    this.finaccountmodel.accountAddress1    = selectedDataValue.accountAddress1;
    this.finaccountmodel.accountAddress2    = selectedDataValue.accountAddress2;
    this.finaccountmodel.accountAddress3    = selectedDataValue.accountAddress3;
    this.finaccountmodel.accountAddress4    = selectedDataValue.accountAddress4;
    this.finaccountmodel.stateCode          = selectedDataValue.stateCode.toString().toUpperCase();
    this.finaccountmodel.pinCode            = selectedDataValue.pinCode;
    this.finaccountmodel.accountPhone       = selectedDataValue.accountPhone;
    this.finaccountmodel.accountMobile1     = selectedDataValue.accountMobile1;
    this.finaccountmodel.accountContact1    = selectedDataValue.accountContact1;
    this.finaccountmodel.accountEmail1      = selectedDataValue.accountEmail1;
    this.finaccountmodel.accountFax         = selectedDataValue.accountFax;
    this.finaccountmodel.accountUrl         = selectedDataValue.accountUrl;
    this.finaccountmodel.accountTAN         = selectedDataValue.accountTAN.toString().toUpperCase();
    this.finaccountmodel.accountPAN         = selectedDataValue.accountPAN.toString().toUpperCase();
    this.finaccountmodel.accountGstNo       = selectedDataValue.accountGstNo.toString().toUpperCase();
    this.finaccountmodel.tDSRate            = selectedDataValue.tDSRate;
    this.finaccountmodel.accountCreditDays  = selectedDataValue.accountCreditDays;
    this.finaccountmodel.accountCreditLimit = selectedDataValue.accountCreditLimit;
    this.finaccountmodel.accountSecurityDep = selectedDataValue.accountSecurityDep;
    this.finaccountmodel.accountInterestRate= selectedDataValue.accountInterestRate;
    this.finaccountmodel.accountBG          = selectedDataValue.accountBG;
    this.finaccountmodel.accountRemRef      = selectedDataValue.accountRemRef.toString().toUpperCase();
    this.finaccountmodel.accountStatus      = selectedDataValue.accountStatus? selectedDataValue.accountStatus:"N";
    this.finaccountmodel.globalAc           = "Y";
    this.finaccountmodel.hO_Account         = "N";
    this.finaccountmodel.isExpForLiabilityYN= selectedDataValue.isExpForLiabilityYN;
    this.finaccountmodel.subLedgerYN        = selectedDataValue.subLedgerYN? selectedDataValue.subLedgerYN :"N";
    this.finaccountmodel.subLedgerQry       = selectedDataValue.subLedgerQry?selectedDataValue.subLedgerQry:'';
    this.finaccountmodel.costCodeYN         = "N";
    this.finaccountmodel.manualJv           = "N";
    this.finaccountmodel.isAdminExpYN       = selectedDataValue.isAdminExpYN? selectedDataValue.isAdminExpYN :"N";
    this.finaccountmodel.hideBranch         = selectedDataValue.hideBranch? selectedDataValue.hideBranch :"N";
    this.finaccountmodel.hideNonAdmin       = selectedDataValue.hideNonAdmin? selectedDataValue.hideNonAdmin :"N";
    this.finaccountmodel.tdsLedgerYN        = selectedDataValue.tdsLedgerYN? selectedDataValue.tdsLedgerYN :"N";
    this.finaccountmodel.onlineActiveYn     = selectedDataValue.onlineActiveYn? selectedDataValue.onlineActiveYn :"N";
    this.finaccountmodel.username           = selectedDataValue.username?selectedDataValue.username:'';
    this.finaccountmodel.password           = selectedDataValue.password?selectedDataValue.password:'';
    this.finaccountmodel.sendEmail          = selectedDataValue.sendEmail? selectedDataValue.sendEmail :"N";
    this.finaccountmodel.partyType          = selectedDataValue.partyType;
    this.finaccountmodel.contractValidity   = selectedDataValue.contractValidity;
    this.finaccountmodel.staxEX             = "N";
    this.finaccountmodel.vendorCode         = selectedDataValue.vendorCode.toString().toUpperCase();
    this.finaccountmodel.bankName           = selectedDataValue.bankName.toString().toUpperCase();
    this.finaccountmodel.bankBranch         = selectedDataValue.bankBranch.toString().toUpperCase();
    this.finaccountmodel.bankAcNo           = selectedDataValue.bankAcNo;
    this.finaccountmodel.bankAcType         = selectedDataValue.bankAcType;
    this.finaccountmodel.bankIfsc           = selectedDataValue.bankIfsc.toString().toUpperCase();
    this.finaccountmodel.blockAct           = 'N';
    this.finaccountmodel.statusColor        = selectedDataValue.statusColor;
    // this.finaccountmodel.schID              = selectedDataValue.schID;
    this.finaccountmodel.schID              = '';
    this.finaccountmodel.loggedInUserID     = this.loggedInUserID;

    this.finsaccountmasterService.finsaccountsDetailsSubmitted(this.finaccountmodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formAccountMaster.reset();
        this.route.navigate(['/finaccountsmasterlist']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });
    this.sharedService.loading = false;
  }
    
}
  
  
  
  
  