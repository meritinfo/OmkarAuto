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
import { Dropdownmodel } from 'src/app/models/dropdownmodel';

@Component({
  selector: 'app-consolidatedopenbal',
  templateUrl: './consolidatedopenbal.component.html',
  styleUrls: ['./consolidatedopenbal.component.css']
})
export class ConsolidatedopenbalComponent {
  loggedInUserID: string = '';
  formBankRecEntry!: FormGroup;
  formSubmitted = false;
  branchCode: string = '';
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  yearList:Dropdownmodel[]=[];

  balList: Consolidateopenballistmodel = new Consolidateopenballistmodel();
  responseDetails = new Responsemodel();
  request = new Requestmodel()

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
    this.getYearList();

    this.formBankRecEntry = this.formBuilder.group({
      totalDebit: new FormControl('0',),
      totalCredit: new FormControl('0',),
      arrayList: this.formBuilder.array([this.createInitialArray()]),
    });

    this.formBankRecEntry.controls['totalDebit'].disable();
    this.formBankRecEntry.controls['totalCredit'].disable();
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
    var debitamount="0.00";
    var creditamount="0.00";
    var totdebitamount=0.00;
    var totcreditamount=0.00;

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

        debitamount="0.00",creditamount="0.00";
        if(res.consolidateopenballist[i].crdr=="C" || res.consolidateopenballist[i].crdr=="Credit"){
          creditamount=res.consolidateopenballist[i].balAmt;
          totcreditamount=totcreditamount+parseFloat(creditamount);
        }
        else{          
          debitamount=res.consolidateopenballist[i].balAmt;
          totdebitamount=totdebitamount+parseFloat(debitamount);
        }
      }

      this.formBankRecEntry.patchValue({
        totalDebit: totdebitamount.toFixed(2),
        totalCredit: totcreditamount.toFixed(2),
      });  
    });

    this.sharedService.loading = false;
  }

  
  getYearList():void{
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
    });
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

  exportExcel(){    
    this.sharedService.loading = true;
    var yr = this.yearList.find(e=>e.dataId== this.year)?.dataName
    this.request.strRequest = this.year; 
    this.request.strRequest1 = yr?yr:""; 
    this.consolidatedopnbalService.getConsolidateOpeningBalExcel(this.request).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if(res.status){      
        let link = document.createElement("a");
        link.download = "OpeningBalReport" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + res.message;
        link.click();
      }
      else{        
        this.toasterService.warning(res.message);   
      }
    });
  }
}






