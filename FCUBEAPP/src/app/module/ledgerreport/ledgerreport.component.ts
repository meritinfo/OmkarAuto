import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { FinreportsService } from 'src/app/services/finreports.service';
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

  constructor(private ledgerrptService: FinreportsService, 
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
      .find((aa: { menuName: string; }) => aa.menuName === "Accounts Ledger Report");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
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
  
    this.sharedService.loading=true;
    this.getBranchList();
    this.getAccountList();  
    this.sharedService.loading=false;
    
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.minDate,[Validators.required]),
      toDate: new FormControl(this.loginDate,[Validators.required]),
      accountID: new FormControl('',[Validators.required]),
      branchorCon: new FormControl('C',),
      branch: new FormControl('',),
      groupYN: new FormControl('',),
      subType:new FormControl('',),
      subLedger:new FormControl('',),
    });
    
    this.formFilter.controls['branch'].disable();  
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

    let frmdt = new Date(selectedDataVal.fromDate);
    let todt = new Date(selectedDataVal.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toastrService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    var fromLoc = this.accountList.find(e => e.dataName == selectedDataVal.accountID.dataName) 
    if (typeof fromLoc !== 'undefined' && fromLoc !== null && 
            fromLoc.dataId!="" && fromLoc.dataId!="0") {
        //ignore
    }
    else{
      this.toastrService.warning("Please Enter Valid Account ");          
      return;
    }
    if(selectedDataVal.branchorCon == "B" && (selectedDataVal.branch?selectedDataVal.branch:"")==""){
      this.toastrService.warning("Please select Branch");
      return;
    }
    if((selectedDataVal.subType?selectedDataVal.subType:"") != "" && 
            (selectedDataVal.subLedger?selectedDataVal.subLedger:"")==""){
      this.toastrService.warning("Please Enter Sub Ledger");
      return;
    }
    this.filter.fromDate      = selectedDataVal.fromDate;
    this.filter.toDate        = selectedDataVal.toDate;
    this.filter.filterStr     = selectedDataVal.branch==""?"0":selectedDataVal.branch;
    this.filter.filterStr1    = this.year;
    this.filter.filterStr2    = selectedDataVal.accountID.dataId;
    this.filter.sortColumn = selectedDataVal.subType;
    this.filter.sortOrder = selectedDataVal.subLedger;

    if(selectedDataVal.branchorCon == "C"){
      this.filter.filterStr3    = "C";
    }
    if(selectedDataVal.branchorCon == "B"){
      this.filter.filterStr3    = "B";
    }
    
    this.filter.search = selectedDataVal.groupYN?"Y":"N" ;

    if(format=="XL"){
      this.ledgerrptService.getLedgerrptExcel(this.filter).subscribe(resp => {
        if(resp.status){      
          let link = document.createElement("a");
          link.download = "LedgerReport_" + new Date().getTime() + '.xls';
          link.href = "assets/reports/Ledger/" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
    else{
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
  }
 
} 




