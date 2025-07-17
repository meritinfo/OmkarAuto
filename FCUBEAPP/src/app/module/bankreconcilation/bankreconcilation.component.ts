import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Bankreconcilationmodel } from 'src/app/models/bankreconcilationmodel';
import { Bankreconcilationlist } from 'src/app/models/bankreconcilationlist';
import { Bankrecfiltermodel } from 'src/app/models/bankrecfiltermodel';
import { BankreconcilationService } from 'src/app/services/bankreconcilation.service';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bankreconcilation',
  templateUrl: './bankreconcilation.component.html',
  styleUrls: ['./bankreconcilation.component.css']
})
export class BankreconcilationComponent {
  loggedInUserID: string = '';
  formBankRecEntry!: FormGroup;
  formSubmitted = false;
  branchCode: string = '';
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  IncOpn: string = "";
  locationList: Dropdownmodel[] = [];
  bankreclist: Bankreconcilationlist = new Bankreconcilationlist();
  bankrecfilter = new Bankrecfiltermodel();
  responseDetails = new Responsemodel();
  requestmodel = new Requestmodel();
  bankacList: Dropdownmodel[] = [];
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  searchbyfield: string = "";
  searchValue: string = 'value';

  constructor(private route: Router, private formBuilder: FormBuilder,
    private bankreconcilationmodel: Bankreconcilationmodel, private sharedService: SharedService,
    private bankreconcilationService: BankreconcilationService,
    private toasterService: ToastrService, private commonService: CommonService) {
    this.bankreconcilationmodel = new Bankreconcilationmodel();
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Bank Reconciliation");
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
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    var userData2 = sessionStorage.getItem('yearID')?.toString();
    if (typeof userData2 !== 'undefined' && userData2 !== null && userData2 !== '') {
      this.year = userData2;
    }
    var userbranchcode = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userbranchcode !== 'undefined' && userbranchcode !== null && userbranchcode !== '') {
      this.branchCode = userbranchcode;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    else {
      this.route.navigate(['/']);
    }

    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    this.getbankacList();

    this.formBankRecEntry = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate, [Validators.required]),
      toDate: new FormControl(this.loginDate, [Validators.required]),
      accountid: new FormControl('', [Validators.required]),
      reconcile: new FormControl('N', [Validators.required]),
      inclopening: new FormControl('',),
      searchby: new FormControl('',),
      search: new FormControl('',),

      arrayList: this.formBuilder.array([this.createInitialArray()]),
    });

  }


  createInitialArray() {
    return this.formBuilder.group({
      ftdID: [''],
      ftmDate: [''],
      docNo: [''],
      debit: [''],
      credit: [''],
      chequeNo: [''],
      chequeDate: [''],
      narration: [''],
      subAccountName: [''],
      clearDate: [''],
    });
  }

  getBankrecData(): void {
    this.formSubmitted = true;
    if (this.formBankRecEntry.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formBankRecEntry.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }
    var selectedfilterVal = this.formBankRecEntry.getRawValue();
    
    let frmdt = new Date(selectedfilterVal.fromDate);
    let todt = new Date(selectedfilterVal.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toasterService.warning("From Date and To Date should be with in Fin Year");
      return;
    }

    this.bankrecfilter.branchCode = this.branchCode;
    this.bankrecfilter.fromDate = selectedfilterVal.fromDate;
    this.bankrecfilter.toDate = selectedfilterVal.toDate;
    this.bankrecfilter.accountid = selectedfilterVal.accountid;
    this.bankrecfilter.reconcile = selectedfilterVal.reconcile ? selectedfilterVal.reconcile : 'N';
    this.bankrecfilter.inclopening = this.IncOpn == "" ? "N" : this.IncOpn;
    this.formArray.clear();
    this.sharedService.loading = true;
    this.bankreconcilationService.getBankReconcileGridList(this.bankrecfilter).subscribe((res) => {
      if (this.formArray.controls.length > 0) {
        this.formArray.removeAt(0);
      }
      this.bankreclist = res;
      for (var i = 0; i < res.bankreconcilationList.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("ftdID")?.setValue(res.bankreconcilationList[i].ftdID);
        this.formArray.controls[i].get("ftmDate")?.setValue(this.commonService.formatDate(res.bankreconcilationList[i].ftmDate));
        this.formArray.controls[i].get("docNo")?.setValue(res.bankreconcilationList[i].docNo);
        this.formArray.controls[i].get("debit")?.setValue(res.bankreconcilationList[i].debit);
        this.formArray.controls[i].get("credit")?.setValue(res.bankreconcilationList[i].credit);
        this.formArray.controls[i].get("chequeNo")?.setValue(res.bankreconcilationList[i].chequeNo);
        this.formArray.controls[i].get("chequeDate")?.setValue(this.commonService.formatDate(res.bankreconcilationList[i].chequeDate));
        this.formArray.controls[i].get("narration")?.setValue(res.bankreconcilationList[i].narration);
        this.formArray.controls[i].get("subAccountName")?.setValue(res.bankreconcilationList[i].subAccountName);
        this.formArray.controls[i].get("clearDate")?.setValue(this.commonService.formatDate(res.bankreconcilationList[i].clearDate));

        this.formArray.controls[i].get("chequeNo")?.disable();
        this.formArray.controls[i].get("ftmDate")?.disable();
        this.formArray.controls[i].get("docNo")?.disable();
        this.formArray.controls[i].get("debit")?.disable();
        this.formArray.controls[i].get("credit")?.disable();
        this.formArray.controls[i].get("chequeNo")?.disable();
        this.formArray.controls[i].get("chequeDate")?.disable();
        this.formArray.controls[i].get("narration")?.disable();
        this.formArray.controls[i].get("subAccountName")?.disable();
      }
    });

    this.sharedService.loading = false;
  }

  search() {
    var selectedfilterVal = this.formBankRecEntry.getRawValue();
    this.searchValue = selectedfilterVal.search;
    var searchby = selectedfilterVal.searchby;
    if (searchby == "Q") {
      this.searchbyfield = 'ChequeNo'
    }
    else if (searchby == "N") {
      this.searchbyfield = 'Narration'
    }
    else if (searchby == "D") {
      this.searchbyfield = 'Debit'
    }
    else if (searchby == "C") {
      this.searchbyfield = 'Credit'
    }
  }

  get formArray() {
    return this.formBankRecEntry.get("arrayList") as FormArray;
  }

  // convenience getter for easy access to contact form fields
  get f() { return this.formBankRecEntry.controls; }


  onIncOpenChange(e: any) {
    var sel = e.target.checked;
    this.IncOpn = "";
    if (sel) {
      this.IncOpn = "Y"
    }
    else {
      this.IncOpn = "N"
    }
  }


  getbankacList(): void {
    this.bankreconcilationService.getbankacList().subscribe((res) => {
      this.bankacList = res;
    });
  }

  exit(): void {
    this.formBankRecEntry.reset();
    window.location.reload();
  }

  //Submit user form details //
  submitBankreconcilationForm(): void {
    if (this.formBankRecEntry.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");
      const controls = this.formBankRecEntry.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");
        }
      }
      return;
    }


    this.sharedService.loading = true;
    var selectedDataValue = this.formBankRecEntry.getRawValue();

    this.bankreclist.bankreconcilationList = [];

    if (this.formArray.value != undefined) {
      for (var i = 0; i < this.formArray.value.length; i++) {
        if (this.formArray.value[i].clearDate != "" && this.formArray.value[i].ftdID != "") {
          this.bankreclist.bankreconcilationList.push({
            'ftdID': this.formArray.value[i].ftdID,
            'ftmDate': '',
            'docNo': '',
            'debit': '',
            'credit': '',
            'chequeNo': '',
            'chequeDate': '',
            'narration': '',
            'subAccountName': '',
            'clearDate': this.formArray.value[i].clearDate,
          })
        }
      }
    }

    if (this.bankreclist.bankreconcilationList.length == 0) {
      this.toasterService.warning("No Records To save");
      return;
    }

    this.formSubmitted = true;
    this.bankreconcilationService.bankreconcilationSubmitted(this.bankreclist).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message); 
        this.formBankRecEntry.reset();
        window.location.reload();
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      } 
    });

    this.sharedService.loading = false;
  }
}






