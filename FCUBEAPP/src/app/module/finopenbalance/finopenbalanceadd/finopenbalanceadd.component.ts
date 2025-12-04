import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Openingbalancerequestmodel } from 'src/app/models/openingbalancerequestmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { CommonService } from 'src/app/services/common.service';
import { Openingbalancemodel  } from 'src/app/models/openingbalancemodel';
import { Openingbalancelistmodel } from 'src/app/models/openingbalancelistmodel';
import { FinopenbalanceService } from 'src/app/services/finopenbalance.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-finopenbalanceadd',
  templateUrl: './finopenbalanceadd.component.html',
  styleUrls: ['./finopenbalanceadd.component.css']
})
export class FinopenbalanceaddComponent {

  loggedInUserID: string = '';
  userlogindate:string="";
  year: string = '';

  formFinOpenBal!: FormGroup;
  formSubmitted = false;
  editMode = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  keywordLocation = 'dataName';
  responseDetails = new Responsemodel();

  branchList: Dropdownmodel[] = [];
  accountList: Dropdownmodel[] = [];

  selectedOpeningbalanceDetails = new Openingbalancemodel();

  constructor(private route: Router, private formBuilder: FormBuilder, 
    private openbalancemodel: Openingbalancemodel,private sharedService:SharedService,
    private finopenbalanceservice: FinopenbalanceService, private commonService: CommonService,
    private toasterService: ToastrService, private openingbalancerequestmodel :Openingbalancerequestmodel) {
    this.openbalancemodel = new Openingbalancemodel(); 
  }
  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Opening Balance Register");
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

    
      this.sharedService.loggedInStatus = true;
        var userData = sessionStorage.getItem('uid')?.toString();
    var userlogindate =sessionStorage.getItem('loginDate')?.toString();
    
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }
    
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }

    this.formFinOpenBal = this.formBuilder.group({
      branchCode: new FormControl('',[Validators.required]),
      totalDebit: new FormControl('',),
      totalCredit: new FormControl('',),

      arrayList: this.formBuilder.array([this.createInitialArray()])   
    });  
      
    this.selectedOpeningbalanceDetails = this.finopenbalanceservice.getOpeningbalanceDetails(); 
    
    this.getBranchList();  
    this.getAccountList();   
  
    this.formFinOpenBal.controls['totalDebit'].disable();
    this.formFinOpenBal.controls['totalCredit'].disable();

    this.sharedService.loading = true;
    setTimeout(() => {
      if (this.selectedOpeningbalanceDetails.branchCode != '') {   
        this.formFinOpenBal.patchValue(this.selectedOpeningbalanceDetails); 
        this.getOpeningBalDetailList(this.selectedOpeningbalanceDetails.branchCode);  
        this.editMode=true;        
      }
    }, 2000);    
    this.sharedService.loading = false;
  }

  get f() { return this.formFinOpenBal.controls; }
  get formArray() {
    return this.formFinOpenBal.get("arrayList") as FormArray;
  }

  onBranchChange(e: any) {
    var branchCode=e.target.value;
    this.getOpeningBalDetailList(branchCode);
  }

  onCreditAmtChange(e: any,i: number) {
    var creditamt=e.target.value;
    this.formArray.controls[i].get("creditAmt")?.setValue(creditamt);
    this.formArray.controls[i].get("debitAmt")?.setValue("0.00");
    this.calTotals();
  }

  onDebitAmtChange(e: any,i: number) {
    var debitsmt=e.target.value;
    this.formArray.controls[i].get("creditAmt")?.setValue("0.00");
    this.formArray.controls[i].get("debitAmt")?.setValue(debitsmt);
    this.calTotals();
  }

  calTotals(){ 
    var totdebitamount=0.00;
    var totcreditamount=0.00;
    var selectedDataVal = this.formFinOpenBal.getRawValue();
    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
        totcreditamount=totcreditamount+parseFloat(selectedDataVal.arrayList[i].creditAmt);
        totdebitamount=totdebitamount+parseFloat(selectedDataVal.arrayList[i].debitAmt);
    }
    this.formFinOpenBal.patchValue({
      totalDebit: totdebitamount.toFixed(2),
      totalCredit: totcreditamount.toFixed(2),
    });
  }

  selectEvent(e: any,index:number) {    
    var account = e.dataId;
    var selectedDataVal = this.formFinOpenBal.getRawValue();    
     for (var i = 0; i < selectedDataVal.arrayList.length-1; i++) {
       if(selectedDataVal.arrayList[i].accountID.dataId==account) {    
        this.toasterService.warning("Selected Account Already Exists in grid");        
        this.removeItem(index);
        this.formArray.push(this.createInitialArray());  
        return;
       }
    }
  }

  onChangeSearch(search: string) {    
    //do something with selected item
  }

  

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  addItem(i: number): void {
    var selectedDataVal= this.formFinOpenBal.getRawValue()
    if (selectedDataVal.arrayList[i].accountID != "" &&
    (parseFloat(selectedDataVal.arrayList[i].creditAmt) > 0 || parseFloat(selectedDataVal.arrayList[i].debitAmt) > 0) ) 
    {
       this.formArray.push(this.createInitialArray());  
    }
    else {
      this.toasterService.warning("Please select Required Fields ");
      return;
    }   
  }

  removeItem(index: number){
    this.formArray.removeAt(index);
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getAccountList(): void {
    this.finopenbalanceservice.getAccountList().subscribe((res) => {
      this.accountList = res;
    });
  }

  getOpeningBalDetailList(brcode:string){

    this.openingbalancerequestmodel.branchCode = brcode;
    this.openingbalancerequestmodel.yearId = this.year;

    this.finopenbalanceservice.getOpeningBalDetailList(this.openingbalancerequestmodel).subscribe((res) => {
      this.openbalancemodel = res;
      var debitamount="0.00";
      var creditamount="0.00";
      var totdebitamount=0.00;
      var totcreditamount=0.00;

      if(res.openingBalDetailList.length>0){        
        this.formArray.clear();
        for (var i = 0; i < res.openingBalDetailList.length; i++) {
          debitamount="0.00",creditamount="0.00";
          if(res.openingBalDetailList[i].openingBalanceCrDr=="C"){
            creditamount=res.openingBalDetailList[i].openingBalanceAmt;
            totcreditamount=totcreditamount+parseFloat(creditamount);
          }
          else{
            debitamount=res.openingBalDetailList[i].openingBalanceAmt;
            totdebitamount=totdebitamount+parseFloat(debitamount);
          }
          this.formArray.push(this.createInitialArray());
          this.formArray.controls[i].get("accountID")?.setValue(this.accountList.find(e => e.dataId == res.openingBalDetailList[i].accountID));
          this.formArray.controls[i].get("creditAmt")?.setValue(creditamount);
          this.formArray.controls[i].get("debitAmt")?.setValue(debitamount);
        }
        this.formFinOpenBal.patchValue({
          totalDebit: totdebitamount.toFixed(2),
          totalCredit: totcreditamount.toFixed(2),
        });             
      }
      
      this.formFinOpenBal.controls['branchCode'].disable();
    });
  }

  createInitialArray() {
    return this.formBuilder.group({
      accountID: ['', []],
      creditAmt: ['0.00', []],
      debitAmt: ['0.00', []],
    });
  }

  deleteOpeningBalanceForm(): void {
    if (this.selectedOpeningbalanceDetails.branchCode != '') {
      this.sharedService.loading=true;
      this.openingbalancerequestmodel.branchCode = this.selectedOpeningbalanceDetails.branchCode;
      this.openingbalancerequestmodel.yearId = this.year;
      if (confirm("Are you sure, you want to delete this?")) {
        this.finopenbalanceservice.deleteOpeningBalanceForm(this.openingbalancerequestmodel).subscribe((res: Responsemodel) => {
          this.responseDetails = res;
          if(this.responseDetails.status){
            this.toasterService.success(this.responseDetails.message); 
            this.formFinOpenBal.reset();
            this.route.navigate(['/opbalancelist']);
          }
          else{
            this.toasterService.warning(this.responseDetails.message);        
          }   
        });
      }
      this.sharedService.loading=false;
    }
  }
  exit(): void {
    this.route.navigate(['/opbalancelist']);
  }

  //Submit form details //
  submitOpeningBalanceForm(): void {
    if (this.formFinOpenBal.invalid) {
  this.toasterService.warning("Please enter mandatory fields");

  const controls = this.formFinOpenBal.controls;
  for (const name in controls) {
    if (controls[name].invalid) {
      // Convert camelCase key to readable format
      const readableName = name.replace(/([A-Z])/g, ' $1');
      const titleCaseName = readableName.charAt(0).toUpperCase() + readableName.slice(1);

      this.toasterService.warning(titleCaseName + " field is invalid");
    }
  }

  return;
}
              
    if (this.formFinOpenBal.controls['arrayList'].invalid) {
      this.toasterService.warning("Details fields are mandatory");
      return;
    }

    var selectedDataVal=this.formFinOpenBal.getRawValue();
    // if (parseFloat(selectedDataVal.totalDebit)!=parseFloat(selectedDataVal.totalCredit)) {
    //   this.toasterService.warning("Total Credit Amount and Total Debit Amount");
    //   return;
    // }

    this.openbalancemodel.branchCode  = selectedDataVal.branchCode;
    this.openbalancemodel.yearID      = this.year;

    this.openbalancemodel.openingBalDetailList = [];
    var crdr = "";
    var amt = "";
    for (var i = 0; i < selectedDataVal.arrayList.length; i++) {
      if (selectedDataVal.arrayList[i].accountID != "" &&
      (parseFloat(selectedDataVal.arrayList[i].creditAmt) > 0 || parseFloat(selectedDataVal.arrayList[i].debitAmt) > 0) ) 
      {
        if(parseFloat(selectedDataVal.arrayList[i].creditAmt) > 0){
          crdr = "C";
          amt = selectedDataVal.arrayList[i].creditAmt;
        }
        else{
          crdr = "D";
          amt = selectedDataVal.arrayList[i].debitAmt;
        }
        this.openbalancemodel.openingBalDetailList.push({
          'accountID':selectedDataVal.arrayList[i].accountID?selectedDataVal.arrayList[i].accountID.dataId:'',
          'openingBalanceAmt':  amt,
          'openingBalanceCrDr': crdr,
        });
      }
    }
      
    const found = this.openbalancemodel.openingBalDetailList.some(el => el.openingBalanceAmt === '0.00');
      if (found) {
        this.toasterService.warning("Amount cannot be Empty in details grid");
        this.sharedService.loading=false;
        return;
      }

    this.sharedService.loading=true;
    
    this.formSubmitted = true;
    this.finopenbalanceservice.OpeningbalanceSubmitted(this.openbalancemodel).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message); 
        this.formFinOpenBal.reset();
        this.route.navigate(['/opbalancelist']);
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      }   
    });
    
    this.sharedService.loading=false;
  }
  

}
