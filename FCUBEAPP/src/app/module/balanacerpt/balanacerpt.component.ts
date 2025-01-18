import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ReportService } from 'src/app/services/report.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { Reportmodel } from 'src/app/models/reportmodel';


@Component({
  selector: 'app-balanacerpt',
  templateUrl: './balanacerpt.component.html',
  styleUrls: ['./balanacerpt.component.css']
})
export class BalanacerptComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 

  branchList: Dropdownmodel[]=[];
  
  formSubmitted = false;
  loggedInUserID: string = '';
  loggedBranch: string = '';
  branch: string = '';
  userlogindate:string="";
  formFilter!: FormGroup;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  request = new Requestmodel();
  report = new Reportmodel();
  keywordLocation = 'dataName';
  balanceSheetEnable = false;
  profitLossEnable= false;

 
  constructor(private formBuilder: FormBuilder,
    private reportService: ReportService, private route: Router,
    private toastrService: ToastrService,private commonService: CommonService,
    private sharedService: SharedService) {
  }

  ngOnInit(): void {      
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Trial Balacne / P&L / BS");
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
       
    setTimeout(() => {     
      this.getBranchList();
    }, 2000);

    this.formFilter = this.formBuilder.group({
      fromDate:  new FormControl(this.minDate,[Validators.required]),
      toDate:  new FormControl(this.maxDate,[Validators.required]),
      rptType :   new FormControl('OP'),
      branch :   new FormControl(''),
      balanceSheet :   new FormControl(''),
      profitLoss :   new FormControl(''),
    }); 

    this.formFilter.controls["fromDate"].disable();
    this.formFilter.controls["toDate"].disable();
  }

  get f() { return this.formFilter.controls; } 
  
  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  onOptionChange(){       
    this.balanceSheetEnable = false;
    this.profitLossEnable= false;
    this.formFilter.patchValue({
      balanceSheet: "",
      profitLoss: "",
    });

    var selectedData  = this.formFilter.getRawValue(); 
    if(selectedData.rptType=='GP'){
      this.formFilter.controls["fromDate"].enable();
      this.formFilter.controls["toDate"].enable();
      this.profitLossEnable = true;
    }
    else{      
      this.formFilter.controls["fromDate"].disable();
      this.formFilter.controls["toDate"].disable();
      if(selectedData.rptType=='OD'){        
        this.balanceSheetEnable = true;
      }
    }
  }
  
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
    var selectedData  = this.formFilter.getRawValue();
    var br = ""
    var brlist = this.branchList.find(e=> e.dataId== selectedData.branch)
    if(brlist){
      br = brlist.dataName;
    }

    this.report.fromDate = selectedData.fromDate;
    this.report.toDate = selectedData.toDate;
    this.report.filterStr = this.year;
    this.report.filterStr1 = selectedData.branch ;
    this.report.filterStr2 = br;

    if(selectedData.rptType=="OP"){      
      this.reportService.getOpeningBalanceRptExcel(this.report).subscribe(resp => {
        if(resp.status){       
          let link = document.createElement("a");
          link.download = "OpeningBalanceReport_" + new Date().getTime() + '.xlsx';        
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
        
    if(selectedData.rptType=="OD"){      
      this.report.search = selectedData.balanceSheet?"Y":"";
      this.reportService.getAsOnDateExcel(this.report).subscribe(resp => {
        if(resp.status){       
          let link = document.createElement("a");
          link.download = "AsOnDate_" + new Date().getTime() + '.xlsx';        
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }

    if(selectedData.rptType=="DD"){      
      this.reportService.getAsOnDateDetailsExcel(this.report).subscribe(resp => {
        if(resp.status){       
          let link = document.createElement("a");
          link.download = "AsOnDateDetails_" + new Date().getTime() + '.xlsx';        
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }

    if(selectedData.rptType=="DG"){      
      this.reportService.getAsOnDateDetailsGroupExcel(this.report).subscribe(resp => {
        if(resp.status){       
          let link = document.createElement("a");
          link.download = "AsOnDateDetailsGroup_" + new Date().getTime() + '.xlsx';        
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
    if(selectedData.rptType=='GP'){
      this.report.search = selectedData.profitLoss?"Y":"";
      this.reportService.getGivenPeriodExcel(this.report).subscribe(resp => {
        if(resp.status){       
          let link = document.createElement("a");
          link.download = "GivenPeriod_" + new Date().getTime() + '.xlsx';        
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
  }
}
              