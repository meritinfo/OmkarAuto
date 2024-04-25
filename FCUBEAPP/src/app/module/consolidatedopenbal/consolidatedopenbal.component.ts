import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Consolidateopenballistmodel } from 'src/app/models/consolidateopenballistmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ConsolidatedopnbalService } from 'src/app/services/consolidatedopnbal.service';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consolidatedopenbal',
  templateUrl: './consolidatedopenbal.component.html',
  styleUrls: ['./consolidatedopenbal.component.css']
})
export class ConsolidatedopenbalComponent {
  loggedInUserID: string = '';
  formBankRecEntry!: FormGroup;
  userSubmitted = false;
  branchCode: string = '';
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  balList: Consolidateopenballistmodel = new Consolidateopenballistmodel();
  responseDetails = new Responsemodel();
  request = new Requestmodel()

  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  searchbyfield: string = "";
  searchValue: string = 'value';

  constructor(private route: Router, private formBuilder: FormBuilder,
     private sharedService: SharedService,
    private consolidatedopnbalService: ConsolidatedopnbalService,
    private toasterService: ToastrService, private commonService: CommonService) {
      
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Consolidated Opening Balances");
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
    
    this.formBankRecEntry = this.formBuilder.group({
      arrayList: this.formBuilder.array([this.createInitialArray()]),
    });

  }


  createInitialArray() {
    return this.formBuilder.group({
      accountName: [''],
      balAmt: [''],
      crdr: [''],
    });
  }

  getBankrecData(): void {
    this.formArray.clear();
    this.sharedService.loading = true;
    this.request.strRequest = this.year; 
    this.consolidatedopnbalService.getConsolidateOpeningBalGridList(this.request).subscribe((res) => {
      this.balList = res;
      for (var i = 0; i < res.consolidateopenballist.length; i++) {
        this.formArray.push(this.createInitialArray());
        this.formArray.controls[i].get("accountName")?.setValue(res.consolidateopenballist[i].accountName);
        this.formArray.controls[i].get("balAmt")?.setValue(res.consolidateopenballist[i].balAmt);
        this.formArray.controls[i].get("crdr")?.setValue(res.consolidateopenballist[i].crdr);

        this.formArray.controls[i].get("accountName")?.disable();
        this.formArray.controls[i].get("balAmt")?.disable();
        this.formArray.controls[i].get("crdr")?.disable();
      }
    });

    this.sharedService.loading = false;
  }

  get formArray() {
    return this.formBankRecEntry.get("arrayList") as FormArray;
  }

  get f() { return this.formBankRecEntry.controls; }

  exit(): void {
    this.formBankRecEntry.reset();
    window.location.reload();
  }

  refreshForm(): void {    
    this.sharedService.loading = true;
    this.request.strRequest = this.year; 
    this.consolidatedopnbalService.updateConsolidateOpeningBal(this.request).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(this.responseDetails.status){
        this.toasterService.success(this.responseDetails.message); 
        this.getBankrecData();
      }
      else{
        this.toasterService.warning(this.responseDetails.message);        
      } 
    });
    this.sharedService.loading = false;
  }
}






