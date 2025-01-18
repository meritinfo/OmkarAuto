import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FreightreportsService } from 'src/app/services/freightreports.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-billoutstandingrpt',
  templateUrl: './billoutstandingrpt.component.html',
  styleUrls: ['./billoutstandingrpt.component.css']
})
export class BilloutstandingrptComponent {
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  vehicleList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
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


  constructor(private billoutstandingrptService: FreightreportsService,private toastrService:ToastrService,
    private formBuilder: FormBuilder,  private sharedService: SharedService,
    private commonService: CommonService, private route: Router) {
  }

  ngOnInit(): void {   

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Bills Outstanding Report");
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
      fromDate: new FormControl('2022-04-01',[Validators.required]),
      toDate: new FormControl(this.loginDate,[Validators.required]),
      asOnDate: new FormControl(this.loginDate,[Validators.required]),
      branch: new FormControl('',),  
      incUnBilled: new FormControl('',),  
      submitYN: new FormControl('',),  
      rptType: new FormControl('AS',),
    });

    this.sharedService.loading=true;
    this.getBranchList();
    this.sharedService.loading=false;
  }
  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  get f() { return this.formFilter.controls; }

  selectEvent(item: any) {
    // do something with selected item
   // this.GetOpeningBal();
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

  getRptExcel(): void {
    var selectedDataVal=this.formFilter.getRawValue();
    this.filter.fromDate      = selectedDataVal.fromDate;
    this.filter.toDate        = selectedDataVal.toDate;
    this.filter.search        = selectedDataVal.asOnDate;
    this.filter.filterStr     = selectedDataVal.branch;
    this.filter.filterStr1    = selectedDataVal.incUnBilled?"Y":"N";
    this.filter.filterStr2    = selectedDataVal.submitYN;

    if(selectedDataVal.rptType=="AS"){
      this.billoutstandingrptService.getAgeingSummRptExcel(this.filter).subscribe((resp: any) => {
        let link = document.createElement("a");
        link.download = "AgeingSummReport" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      });
    }
    if(selectedDataVal.rptType=="ASB"){
      this.billoutstandingrptService.getAgeingSummBranchRptExcel(this.filter).subscribe((resp: any) => {
        let link = document.createElement("a");
        link.download = "AgeingSummBranchReport" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      });
    }
    if(selectedDataVal.rptType=="ASP"){
      this.billoutstandingrptService.getAgeingSummPartyRptExcel(this.filter).subscribe((resp: any) => {
        let link = document.createElement("a");
        link.download = "AgeingSummPartyReport" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      });
    }
    if(selectedDataVal.rptType=="AD"){
      this.billoutstandingrptService.getAgeingDetailRptExcel(this.filter).subscribe((resp: any) => {
        let link = document.createElement("a");
        link.download = "AgeingDetailReport" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      });
    }
    if(selectedDataVal.rptType=="OS"){
      this.billoutstandingrptService.getOutStandingSummRptExcel(this.filter).subscribe((resp: any) => {
        let link = document.createElement("a");
        link.download = "OutstandingSummReport" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      });
    }
    if(selectedDataVal.rptType=="OD"){
      this.billoutstandingrptService.getOutStandingDetailRptExcel(this.filter).subscribe((resp: any) => {
        let link = document.createElement("a");
        link.download = "OutstandingDetailReport" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      });
    }
  }
}

