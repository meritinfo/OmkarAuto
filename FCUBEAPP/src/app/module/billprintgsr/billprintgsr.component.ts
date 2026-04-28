import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Repreqmodel } from 'src/app/models/repreqmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { BillsMasterServiceLLP } from 'src/app/services/billsmasterllp.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';
import { BillsMasterService } from 'src/app/services/billsmaster.service';


@Component({
  selector: 'app-billprintgsr',
  templateUrl: './billprintgsr.component.html',
  styleUrls: ['./billprintgsr.component.css']
})


export class BillprintgsrComponent {
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string =""; 

  locationList: Dropdownmodel[] = [];
  partyList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  reportmodel: Repreqmodel = new Repreqmodel();
  filter: Repreqmodel = {
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
    filterStr4:'',
    filterStr5:'',
    filterStr6:'',
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
  constructor(private billregisterrptService: BillsMasterServiceLLP, 
    private billsMasterService: BillsMasterService, 
    private excelService: ExcelService,private toastrService:ToastrService,
    private formBuilder: FormBuilder,  private sharedService: SharedService,
    private commonService: CommonService, 
    private route: Router) {
  }
  ngOnInit(): void {
    
    debugger
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Print	Documents");
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
    
    
    this.getBranchList();
    //this.getPartyList(); 
   
    this.formFilter = this.formBuilder.group({
      copy: new FormControl('',[Validators.required,Validators.minLength(2)]),  
      cnorCnee: new FormControl('R',[Validators.required]),  
      format: new FormControl('',[Validators.required]),  
      billingStn: new FormControl('',[Validators.required]), 
      billNo: new FormControl('',[Validators.required]),
    });
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }
  
  getPartyList(): void {
    this.commonService.getPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

  
  get f() { return this.formFilter.controls; }
 
  
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

  download(): void {
    debugger
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
    var selecteddata = this.formFilter.getRawValue();
    this.reportmodel.filterStr = selecteddata.copy;
    this.reportmodel.filterStr1 = selecteddata.cnorCnee;
    this.reportmodel.filterStr2 = selecteddata.format;
    this.reportmodel.filterStr3 = selecteddata.billingStn;
    this.reportmodel.filterStr4 = selecteddata.billNo;
    this.reportmodel.filterStr5 = this.year;
    this.reportmodel.filterStr6 = "Y";
    if(this.reportmodel.filterStr2=="GB")
    {
          this.billsMasterService.getBillGsrPdf(this.reportmodel).subscribe(resp => {
      if(resp.status){    
        let link = document.createElement("a");
        link.download = resp.message;
        link.href = "assets/reports/BillPrintGsr/" + resp.message;
        link.click();
        window.open(link.href, "_blank");
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
       });
      }else if(this.reportmodel.filterStr2=="LT")
      this.billsMasterService.getBillLnTPdf(this.reportmodel).subscribe(resp => {
      if(resp.status){    
        let link = document.createElement("a");
        link.download = resp.message;
        link.href = "assets/reports/BillPrintGsr/" + resp.message;
        link.click();
        window.open(link.href, "_blank");
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });

  }
   
} 
