import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dieselstatementlistmodel } from 'src/app/models/dieselstatementlistmodel';
import { Dieselstatementmodel } from 'src/app/models/dieselstatementmodel';
import { DieselstatementService } from 'src/app/services/dieselstatement.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { GstpurchaseService } from 'src/app/services/gstpurchase.service';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-dieselstatementlist',
  templateUrl: './dieselstatementlist.component.html',
  styleUrls: ['./dieselstatementlist.component.css']
})
export class DieselstatementlistComponent {

  formSubmitted = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  vendorList: Dropdownmodel[] = [];
  formFilter!: FormGroup;
  keywordLocation = 'dataName'; 
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allDieselStatement: Dieselstatementlistmodel = new Dieselstatementlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'vendor',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr: '',
    filterStr1: '',
    filterStr2:'',
    filterStr3:''
  }

  constructor(private formBuilder: FormBuilder, 
    private dieselStatementService: DieselstatementService, 
    private commonService: CommonService, 
    private sharedService: SharedService, private gstpurchaseService: GstpurchaseService,      
    private route: Router) {
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Diesel Statement"));
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
    
    

    this.dieselStatementService.clearDieselStatementDetails();
    this.formFilter = this.formBuilder.group({
      dfVendor: new FormControl(''),
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
    });     

    this.sharedService.loading=true;    
    this.getVendorList();

    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;

    this.dieselstateList();
    this.sharedService.loading=false;
  }

  dieselstateList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching: false,     
        language: {
          zeroRecords: ''
        }, 
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        
        this.dieselStatementService.getDieselStatementList(this.filter)
          .subscribe(resp => {
            this.allDieselStatement = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Vendor ',
          data: 'vendor',
        },
        {
          title: 'Bill Stmt No ',
          data: 'billStmtNo',
        },
        {
          title: 'Bill Stmt Date ',
          data: 'billStmtDate',
        },
        {
          title: 'From Date ',
          data: 'fromDate'
        },
        {
          title: 'Action',
          data: 'masterId',
        },
      ],
    };
  }


  
  selectEvent(item: any) {
    // do something with selected item
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

  
  getVendorList(){
    this.gstpurchaseService.getVendorList().subscribe((res) => {
      this.vendorList = res;
    });
  }

  dieselStatementAdd(): void {
    this.route.navigate(['/dieselstatementadd']);
  }

  //Open user details screen
  getDieselStatementDetails(Docrenewal: Dieselstatementmodel): void {
    this.dieselStatementService.setDieselStatementDetails(Docrenewal);
    this.route.navigate(['/dieselstatementedit']);
  }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.filter.search = selecteddata.dfVendor?selecteddata.dfVendor.dataId:"";
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    
    this.sharedService.loading=true;
    this.dieselstateList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}