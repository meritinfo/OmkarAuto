import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { MonthstatementrptService } from 'src/app/services/monthstatementrpt.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-monthlystatementrpt',
  templateUrl: './monthlystatementrpt.component.html',
  styleUrls: ['./monthlystatementrpt.component.css']
})
export class MonthlystatementrptComponent {
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 

  locationList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
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

  formFilter!: FormGroup;
  formSubmitted = false;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';
  responseDetails = new Responsemodel();
  rptType= true;

  constructor(private datepipe: DatePipe,
    private monthstatementrptService: MonthstatementrptService, 
    private excelService: ExcelService,private toastrService:ToastrService,
    private formBuilder: FormBuilder,  
    private commonService: CommonService, 
    private route: Router) {
  }

  ngOnInit(): void {     
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Monthly Statement");
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


    
    this.getBranchList();
    
    this.formFilter = this.formBuilder.group({
      freight: new FormControl('Y',),  
      branchWise: new FormControl('Y',),  
      branch: new FormControl('',),  
      budget: new FormControl('Y',),  
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  get f() { return this.formFilter.controls; }
  
  exportBookingExcel(): void {    
    var selectedDataVal = this.formFilter.getRawValue();
    this.filter.fromDate    = this.minDate;
    this.filter.toDate      = this.maxDate;
    this.filter.filterStr   = selectedDataVal.freight;
    this.filter.filterStr1  = selectedDataVal.branchWise;
    this.monthstatementrptService.getMonthlyBookingRptExcel(this.filter).subscribe(resp => {    
      if(resp.status){      
        let link = document.createElement("a");
        link.download = "MonthlyBookingRpt" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }

  exportLhExcel(): void {    
    var selectedDataVal = this.formFilter.getRawValue();
    this.filter.fromDate    = this.minDate;
    this.filter.toDate      = this.maxDate;
    this.filter.filterStr   = selectedDataVal.freight;
    this.filter.filterStr1  = selectedDataVal.branchWise;
    this.monthstatementrptService.getMonthlyLorryHireRptExcel(this.filter).subscribe(resp => {    
      if(resp.status){      
        let link = document.createElement("a");
        link.download = "MonthlyLorryHireRpt" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }
  
  exportAdminExcel(): void {    
    var selectedDataVal = this.formFilter.getRawValue();
    this.filter.fromDate    = this.minDate;
    this.filter.toDate      = this.maxDate;
    this.filter.filterStr   = selectedDataVal.branch; 
    this.filter.filterStr1   = selectedDataVal.budget; 
    this.monthstatementrptService.getMonthlyAdminExpRptExcel(this.filter).subscribe(resp => {    
      if(resp.status){      
        let link = document.createElement("a");
        link.download = "AdminExpRpt" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }
  
} 





