import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { LedgerrptService } from 'src/app/services/ledgerrpt.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ledgerreport',
  templateUrl: './ledgerreport.component.html',
  styleUrls: ['./ledgerreport.component.css']
})
export class LedgerreportComponent {
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string =""; 

  accountList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
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

  constructor(private ledgerrptService: LedgerrptService, 
    private excelService: ExcelService,private toastrService:ToastrService,
    private formBuilder: FormBuilder,  private sharedService: SharedService,
    private commonService: CommonService, 
    private route: Router) {
  }

  ngOnInit(): void {     
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Daily Loading Report");
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
  
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.minDate,[Validators.required]),
      toDate: new FormControl(this.loginDate,[Validators.required]),
      accountID: new FormControl('',[Validators.required]),
    });
    this.sharedService.loading=true;
    this.getBranchList();
    this.getAccountList();  
    this.sharedService.loading=false;
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  getAccountList(): void {
    this.ledgerrptService.getLedgerList().subscribe((res) => {
      this.accountList = res;
    });
  }
  
  get f() { return this.formFilter.controls; }

  change(selectedValue: string) {
    this.formFilter.patchValue({      
      branch:"",
      groupYN:""
    });
    if (selectedValue === "C") {
      this.formFilter.controls['branch'].disable();  
      this.formFilter.controls['groupYN'].enable();  
    }
    else{
      this.formFilter.controls['branch'].enable(); 
      this.formFilter.controls['groupYN'].disable();  

    }   
  }
  
  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e: any) {
    // do something
  }

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  
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

    this.ledgerrptService.getLedgerrptPdf(this.filter).subscribe((resp: any) => {
        let link = document.createElement("a");
        if(format=="XL"){
          link.download = "CashbookReport_" + new Date().getTime() + '.xls';
        }
        else{
          link.download = "CashbookReport_" + new Date().getTime() + '.pdf';
        }
        link.href = "assets/reports/CashBook/" + resp.message;
        link.click();
        window.open(link.href, "_blank");
      });
  }

    
  exportPdf(): void {      
    this.formSubmitted = true;
    if (this.formFilter.invalid) {
      this.toastrService.warning("Please Enter Mandatory Fields");   
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toastrService.warning(name + " Fields is Invalid");   
        }
      }     
      return;
    }
    var selectedDataVal=this.formFilter.getRawValue();
    
    var fromLoc = this.accountList.find(e => e.dataName == selectedDataVal.accountID.dataName) 
    if (typeof fromLoc !== 'undefined' && fromLoc !== null && 
            fromLoc.dataId!="" && fromLoc.dataId!="0") {
        //ignore
    }
    else{
      this.toastrService.warning("Please Enter Valid Account ");          
      return;
    }
  
      this.filter.fromDate    = selectedDataVal.fromDate;
      this.filter.toDate      = selectedDataVal.toDate;
      this.filter.filterStr   = selectedDataVal.accountID.dataId;
      this.filter.filterStr1  = this.year;
      this.filter.filterStr2  = "";
      
      this.ledgerrptService.getLedgerrptPdf(this.filter).subscribe(resp => {
        if(resp.status){    
          let link = document.createElement("a");
          link.download = "LedgerReport" + "_" + new Date().getTime() + '.pdf';
          link.href = "assets/reports/Ledger/" + resp.message;
          link.click();
          window.open(link.href, "_blank");
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
      
    exportExcel(): void {      
      this.formSubmitted = true;
      if (this.formFilter.invalid) {
        this.toastrService.warning("Please Enter Mandatory Fields");   
        const controls = this.formFilter.controls;
        for (const name in controls) {
          if (controls[name].invalid) {
            this.toastrService.warning(name + " Fields is Invalid");   
          }
        }     
        return;
      }
      var selectedDataVal=this.formFilter.getRawValue();
      
      var fromLoc = this.accountList.find(e => e.dataName == selectedDataVal.accountID.dataName) 
      if (typeof fromLoc !== 'undefined' && fromLoc !== null && 
              fromLoc.dataId!="" && fromLoc.dataId!="0") {
          //ignore
      }
      else{
        this.toastrService.warning("Please Enter Valid Account ");          
        return;
      }
  
      this.filter.fromDate    = selectedDataVal.fromDate;
      this.filter.toDate      = selectedDataVal.toDate;
      this.filter.filterStr   = selectedDataVal.accountID.dataId;
      this.filter.filterStr1  = this.year;
      this.filter.filterStr2  = "";
      
      this.ledgerrptService.getLedgerrptExcel(this.filter).subscribe(resp => {
        if(resp.status){      
          let link = document.createElement("a");
          link.download = "LedgerReport_" + new Date().getTime() + '.xlsx';
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
  
  
} 




