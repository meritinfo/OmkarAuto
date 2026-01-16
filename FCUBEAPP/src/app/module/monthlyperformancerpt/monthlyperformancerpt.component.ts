import { Component,ViewChild } from '@angular/core';//createdby aashishware
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Ledgerrptlistmodel  } from 'src/app/models/ledgerrptlistmodel';
import { FinreportsService } from 'src/app/services/finreports.service';
import { CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-monthlyperformancerpt',
  templateUrl: './monthlyperformancerpt.component.html',
  styleUrls: ['./monthlyperformancerpt.component.css']
})
export class MonthlyperformancerptComponent {
  formSubmitted = false;
  loggedInUserID: string = '';
  loggedBranch: string = '';
  userscope: string = '';
  userlogindate:string="";
  formFilter!: FormGroup;
  year: string = '';
  branch: string = '';
  
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  dashboard: string ="";
  loginDate: string = '';
  request = new Requestmodel();
  keywordLocation = 'dataName';

filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'fromPlace',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:'',
  }

  constructor(private bankbookrptService: FinreportsService, 
    private excelService: ExcelService,private toastrService:ToastrService,
    private formBuilder: FormBuilder,  private sharedService: SharedService,
    private cashReceiptEntryService:CashReceiptEntryService,
    private commonService: CommonService, 
    private route: Router) {
  }

  ngOnInit(): void {  
    
    
    this.sharedService.loggedInStatus = true;
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    

    this.formFilter = this.formBuilder.group({
      fromDate:  new FormControl(this.minDate,[Validators.required]),
      toDate:  new FormControl(this.maxDate,[Validators.required]),
      rptType:new FormControl('S'),
    }); 
  }

  get f() { return this.formFilter.controls; } 
  
  exportExcel(): void {  
    this.formSubmitted = true;
    if (this.formFilter.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields ");  
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      }           
      return;
    }
    var selectedData        = this.formFilter.getRawValue();
    let frmdt = new Date(selectedData.fromDate);
    let todt = new Date(selectedData.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toastrService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.fromDate    = selectedData.fromDate;
    this.filter.toDate      = selectedData.toDate;
    this.filter.filterStr  = selectedData.rptType;    
    this.bankbookrptService.getMonthlyPerformanceExcel(this.filter).subscribe(resp => {
      if(resp.status){
        //here code for Downloading Excel file          
        let link = document.createElement("a");
        link.download = "MonthlyPerformance" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }
}
 
