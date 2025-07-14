import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Mrlistmodel} from 'src/app/models/mrlistmodel';
import { FreightreportsService } from 'src/app/services/freightreports.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-deductionrpt',
  templateUrl: './deductionrpt.component.html',
  styleUrls: ['./deductionrpt.component.css']
})
export class DeductionrptComponent {
  interval:any;

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
  
  allmrlist: Mrlistmodel = new Mrlistmodel();
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

  constructor(private unbilledrptService: FreightreportsService, 
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
        .find((aa: { menuName: string; }) => aa.menuName === "Deduction Statement");
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
      
      this.getBranchList();
      this.getPartyList(); 

      this.formFilter = this.formBuilder.group({
        fromDate: new FormControl(this.fromDate,),
        toDate: new FormControl(this.loginDate,),
        branch: new FormControl('',),  
        party: new FormControl('',),
      });
      

      this.filter.fromDate =  this.fromDate;
      this.filter.toDate = this.loginDate;
      this.filter.search = "";
      this.filter.sortColumn = '';
      this.filter.sortOrder = '';
      this.filter.filterStr   = "";
      this.filter.filterStr1  = "";
      this.filter.filterStr2  = "";
      this.filter.filterStr3  = "";
  
      this.sharedService.loading=true;
      this.dprrptlist();     
      this.sharedService.loading=false;
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

    dprrptlist(){
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 50,
        serverSide: true,
        processing: true,
        searching:false,   
        language: {
          zeroRecords: ''
        }, 
        ajax: (dataTablesParameters: any, callback) => {
          // Filter setting
          this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
          this.filter.pageSize = dataTablesParameters.length;
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });
          this.unbilledrptService.getDeductionRptList(this.filter).subscribe(resp => {
            this.allmrlist = resp; 
              callback({
                recordsTotal: resp.pageMetaData.totalCount,
                recordsFiltered: resp.pageMetaData.totalCount,
                data: []
              });
            });
        }, 
        columns: [ 
          {
            title: 'Party ',
            data: 'partyName',
          },   
          {
            title: 'MR No',
            data: 'mrNo',
          },  
          {
            title: 'MR Date',
            data: 'mrDate',
          }, 
          {
            title: 'Bill No',
            data: 'billLrOthType',
          }, 
          {
            title: 'Deduction',
            data: 'totalDed',
          },
          {
            title: 'Remarks',
            data: 'mrRemarks',
          },  
        ],
      };
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
      var selecteddata = this.formFilter.getRawValue();
    let frmdt = new Date(selecteddata.fromDate);
    let todt = new Date(selecteddata.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);
    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toastrService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
      this.filter.fromDate = selecteddata.fromDate;
      this.filter.toDate = selecteddata.toDate;
      this.filter.search = this.loggedInUserID;
      this.filter.filterStr =  selecteddata.branch;
      this.filter.filterStr1 = selecteddata.party?selecteddata.party.dataId:"";

      this.unbilledrptService.getDeductionRptExcel(this.filter).subscribe(resp => {
      
        if(resp.status){      
          let link = document.createElement("a");
          link.download = "DeductionReport" + "_" + new Date().getTime() + '.xlsx';
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
  
  search(): void {
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
    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.search = this.loggedInUserID;
    this.filter.filterStr =  selecteddata.branch;
    this.filter.filterStr1 = selecteddata.party?selecteddata.party.dataId:"";

    this.sharedService.loading=true;
    this.dprrptlist();
    this.sharedService.loading=false;
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
} 



