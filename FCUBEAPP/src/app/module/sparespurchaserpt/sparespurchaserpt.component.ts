import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Sparespurchaserptlistmodel} from 'src/app/models/sparespurchaserptlistmodel';
import { FleetreportsService } from 'src/app/services/fleetreports.service';
import { ExcelService } from 'src/app/services/excel.service';
import { Responsemodel } from 'src/app/models/responsemodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sparespurchaserpt',
  templateUrl: './sparespurchaserpt.component.html',
  styleUrls: ['./sparespurchaserpt.component.css']
})
export class SparespurchaserptComponent {

  loggedInUserID: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string =""; 

  locationList: Dropdownmodel[] = [];
  branchList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  
  allSparespurchaserptlist: Sparespurchaserptlistmodel = new Sparespurchaserptlistmodel();
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
    filterStr3: "",
  }

  formFilter!: FormGroup;
  userSubmitted = false;
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch:string ='';
  responseDetails = new Responsemodel();

  constructor(private sparespurchaserptService: FleetreportsService, 
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
        .find((aa: { menuName: string; }) => aa.menuName === "Spares Purchase Report");
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
      this.getLocationList(); 
      // this.getPartyList(); 
      
      this.formFilter = this.formBuilder.group({
        fromDate: new FormControl( this.fromDate,[Validators.required]),
        toDate: new FormControl(this.loginDate,[Validators.required]),
        rptType: new FormControl('S',),
        // branch: new FormControl('',),  
        // party: new FormControl('',),  
       // origin: new FormControl('',),  
       // destination: new FormControl('',), 
      });

      this.filter.fromDate =  this.fromDate;
      this.filter.toDate = this.loginDate;
      this.filter.filterStr   = "S";
      this.filter.filterStr1  = "";
       
  
      this.sharedService.loading=true;

      this.sparespurchaserptlist();
      this.sharedService.loading=false;
    }

    getBranchList(): void {
      this.commonService.getBranchList().subscribe((res) => {
        this.branchList = res;
      });
    }
    getLocationList(): void {
      this.commonService.getLocationList().subscribe((res) => {
        this.locationList = res;
      });
    }
    // getPartyList(): void {
    //   this.commonService.getPartyList().subscribe((res) => {
    //     this.partyList = res;
    //   });
    // }
  
    
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

    sparespurchaserptlist(){
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
          this.sparespurchaserptService.getSparespurchaserptList(this.filter).subscribe(resp => {
            this.allSparespurchaserptlist = resp; 
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
            data: 'branchName',
          }, 
                     
          {
            title: 'Date',
            data: 'transDate',
          }, 
            
          {
            title: 'Vendor ',
            data: 'vendorName',
          },    
          {
            title: 'InvNo',
            data: 'vendorInvNo',
          },
          {
            title: 'GstNo',
            data: 'vendorGstNo',
          },
          {
            title: 'Gst Type',
            data: 'gstType',
          }, 
                    
          {
            title: 'Item Amount',
            data: 'itemAmount',
          }, 
          {
            title: 'Bill Amt',
            data: 'totBillAmt',
          },          
           
        ],
      };
    }
      
    exportExcel(): void {      
      this.userSubmitted = true;
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
      this.filter.filterStr  = selectedDataVal.rptType;     
    //  this.filter.filterStr  = selectedDataVal.origin?selectedDataVal.origin.dataId:"";
      
      this.sparespurchaserptService.getSparespurchaserptExcel(this.filter).subscribe(resp => {
      
        if(resp.status){      
          let link = document.createElement("a");
          link.download = "Spares Purchase Report" + "_" + new Date().getTime() + '.xlsx';
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }
  
  search(): void {
    this.userSubmitted = true;
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
    this.filter.filterStr  = selectedDataVal.rptType;
    //this.filter.filterStr  = selectedDataVal.origin?selectedDataVal.origin.dataId:"";
    
    this.sharedService.loading=true;
    this.sparespurchaserptlist();
    this.sharedService.loading=false;
    
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
} 




