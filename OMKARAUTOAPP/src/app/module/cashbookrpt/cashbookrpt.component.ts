import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from 'src/app/common/constants';
import { FinreportsService } from 'src/app/services/finreports.service';
import { PdfService } from 'src/app/services/pdf.service';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-cashbookrpt',
  templateUrl: './cashbookrpt.component.html',
  styleUrls: ['./cashbookrpt.component.css']
})
export class CashbookrptComponent {
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string =""; 
  branchList: Dropdownmodel[] = [];
  creditacList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  formFilter!: FormGroup;
  formSubmitted = false;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';
  responseDetails = new Responsemodel();
  requestmodel = new Requestmodel();

  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'ExpectedReportingDt',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:'',
  }


  constructor(private cashbookreportService: FinreportsService,private toastrService:ToastrService,
    private formBuilder: FormBuilder,  private sharedService: SharedService,
    private commonService: CommonService, 
    private pdfService : PdfService, private route: Router) {
  }

  ngOnInit(): void {   

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Cash Book Report");
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
    this.getPaymentCreditAcList();
      
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.minDate,[Validators.required]),
      toDate: new FormControl(this.loginDate,[Validators.required]),
      branch: new FormControl('',),  
      accountId: new FormControl('34',[Validators.required]),
      rptType: new FormControl('D',[Validators.required]),
      branchorCon: new FormControl('C',[Validators.required]),
    });
    
    this.formFilter.controls['branch'].disable();  
  }
  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  getPaymentCreditAcList(){
    this.requestmodel.strRequest = "M";
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.creditacList = res;
    });
  }

  get f() { return this.formFilter.controls; } 
  
  change(selectedValue: string) {
    if (selectedValue === "C") {
      this.formFilter.controls['branch'].disable();  
      this.formFilter.patchValue({      
        branch:""
      });
    }
    else{
      this.formFilter.controls['branch'].enable(); 
    }   
  }

  search(format: string): void {
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
    var selectedDataVal=this.formFilter.getRawValue();

    let frmdt = new Date(selectedDataVal.fromDate);
    let todt = new Date(selectedDataVal.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toastrService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    
    if(selectedDataVal.branchorCon == "B" && (selectedDataVal.branch?selectedDataVal.branch:"")==""){
      this.toastrService.warning("Please select Branch");
      return;
    }

    this.filter.fromDate      = selectedDataVal.fromDate;
    this.filter.toDate        = selectedDataVal.toDate;
    this.filter.filterStr     = selectedDataVal.branch==""?"0":selectedDataVal.branch;
    this.filter.filterStr1    = this.year;
    this.filter.filterStr2    = selectedDataVal.accountId;
    if(selectedDataVal.branchorCon == "C" && selectedDataVal.rptType =="S"){
      this.filter.filterStr3    = "CS";
    }
    if(selectedDataVal.branchorCon == "C" && selectedDataVal.rptType =="D"){
      this.filter.filterStr3    = "CD";
    }
    if(selectedDataVal.branchorCon == "B" && selectedDataVal.rptType =="S"){
      this.filter.filterStr3    = "BS";
    }
    if(selectedDataVal.branchorCon == "B" && selectedDataVal.rptType =="D"){
      this.filter.filterStr3    = "BD";
    }
    this.filter.search = format;

    this.cashbookreportService.getCashBookReport(this.filter).subscribe((resp: any) => {
        let link = document.createElement("a");
        if(format=="XL"){
          link.download = "CashbookReport_" + new Date().getTime() + '.xls';
          link.href = "assets/reports/CashBook/" + resp.message;
          link.click();
        }
        else{
          link.download = "CashbookReport_" + new Date().getTime() + '.pdf';
          link.href = "assets/reports/CashBook/" + resp.message;
          link.click();
          window.open(link.href, "_blank");
        }
      });
  }
}
