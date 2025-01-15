import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Gstregisterrptlistmodel} from 'src/app/models/gstregisterrptlistmodel';
import { FreightreportsService } from 'src/app/services/freightreports.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gstregisterrpt',
  templateUrl: './gstregisterrpt.component.html',
  styleUrls: ['./gstregisterrpt.component.css']
})
export class GstregisterrptComponent {
  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 

  locationList: Dropdownmodel[] = [];
 // partyList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  allGstregisterrptlist: Gstregisterrptlistmodel = new Gstregisterrptlistmodel();
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
  constructor(private gstregisterrptService: FreightreportsService, 
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
        .find((aa: { menuName: string; }) => aa.menuName === "GST Register");
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
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      today.setFullYear(year - 1);

      this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
      this.maxDate = new Date().toLocaleDateString('en-CA').toString();
      
      if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
        this.fromDate = this.minDate ;
      }
      else{
        this.fromDate = today.toLocaleDateString('en-CA').toString();
      }   
    
      this.getBranchList();
     // this.getLocationList(); 
     // this.getPartyList(); 
      
      this.formFilter = this.formBuilder.group({
        fromDate: new FormControl( this.fromDate,[Validators.required]),
        toDate: new FormControl(this.loginDate,[Validators.required]),
        branch: new FormControl('',),  
      //  party: new FormControl('',),  
        rptType: new FormControl('S',),  
       // destination: new FormControl('',), 
      });

      this.filter.fromDate =  this.fromDate;
      this.filter.toDate = this.loginDate;
      this.filter.filterStr   = "";
      this.filter.filterStr1  = "S";
    //  this.filter.filterStr2  = "S";
    //  this.filter.filterStr3  = "";
  
      this.sharedService.loading=true;

      this.gstregisterList();
      this.sharedService.loading=false;
    }

    getBranchList(): void {
      this.commonService.getBranchList().subscribe((res) => {
        this.branchList = res;
      });
    }
    // getLocationList(): void {
    //   this.commonService.getLocationList().subscribe((res) => {
    //     this.locationList = res;
    //   });
    // }
    // getPartyList(): void {
    //   this.commonService.getPartyList().subscribe((res) => {
    //     this.partyList = res;
    //   });
    // }
  
    
    get f() { return this.formFilter.controls; }

    rptchange(e:any){
      if(e.target.value == 'S'){
        this.rptType = true;
      }
      else{
        this.rptType = false;
      }
    } 
  
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

    gstregisterList(){
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 50,
        serverSide: true,
        processing: true,
        searching:false,
        ajax: (dataTablesParameters: any, callback) => {
          // Filter setting
          this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
          this.filter.pageSize = dataTablesParameters.length;
          this.filter.sortColumn = 'Branch';
          this.filter.sortOrder = 'asc';
          this.filter.search = '';
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });
          this.gstregisterrptService.getGstregisterrptList(this.filter).subscribe(resp => {
            this.allGstregisterrptlist = resp; 
              callback({
                recordsTotal: resp.pageMetaData.totalCount,
                recordsFiltered: resp.pageMetaData.totalCount,
                data: []
              });
            });
        }, 
        columns: [ 
          {
            title: 'Branch',
            data: 'branch',
          }, 
          {
            title: 'Inv No',
            data: 'billInvNo',
          }, 
          {
            title: 'Inv Date',
            data: 'billInvDate',
          }, 
          {
            title: 'Vendor Name',
            data: 'partyVendorName',
          }, 
          
          {
            title: 'Vendor GST',
            data: 'partyVendorGstNo',
          },  
          {
            title: 'Amount',
            data: 'amt',
          },    
          
          {
            title: 'Sgst Amt',
            data: 'sgstAmt',
          },
          {
            title: 'Cgst Amt',
            data: 'cgstAmt',
          }, 
          {
            title: 'Igst Amt ',
            data: 'igstAmt',
          }, 
          {
            title: 'Grand Total',
            data: 'grandTotal',
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
      var selectedDataVal=this.formFilter.getRawValue();
      this.filter.fromDate    = selectedDataVal.fromDate;
      this.filter.toDate      = selectedDataVal.toDate;
      this.filter.filterStr   = selectedDataVal.branch;
     // this.filter.filterStr1  = selectedDataVal.party?selectedDataVal.party.dataId:"";
      this.filter.filterStr1  = selectedDataVal.rptType; 
    //  this.filter.filterStr3  = selectedDataVal.destination?selectedDataVal.destination.dataId:"";
      this.gstregisterrptService.getGstregisterrptExcel(this.filter).subscribe(resp => {
      
        if(resp.status){      
          let link = document.createElement("a");
          link.download = "GST Register" + "_" + new Date().getTime() + '.xlsx';
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
    var selectedDataVal=this.formFilter.getRawValue();
    this.filter.fromDate    = selectedDataVal.fromDate;
    this.filter.toDate      = selectedDataVal.toDate;
    this.filter.filterStr   = selectedDataVal.branch;
   // this.filter.filterStr1  = selectedDataVal.party?selectedDataVal.party.dataId:"";
    this.filter.filterStr1  = selectedDataVal.rptType; 
  //  this.filter.filterStr3  = selectedDataVal.destination?selectedDataVal.destination.dataId:"";
    this.sharedService.loading=true;
    this.gstregisterList();
    this.sharedService.loading=false;
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
} 






