
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dieselstatementlistmodel } from 'src/app/models/dieselstatementlistmodel';
import { Dieselstatementmodel } from 'src/app/models/dieselstatementmodel';
import { DieselstatementService } from 'src/app/services/dieselstatement.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { GstpurchaseService } from 'src/app/services/gstpurchase.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-happaystatementlist',
  templateUrl: './happaystatementlist.component.html',
  styleUrls: ['./happaystatementlist.component.css']
})
export class HappaystatementlistComponent {
  userSubmitted = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
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
  filter: Pagerequestwithdatesmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'vendor',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    strRequest: ''
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
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Happay Statement"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
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
    today.setMonth(month - 1);
    this.fromDate = today.toLocaleDateString('en-CA').toString();

    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();

    this.dieselStatementService.clearDieselStatementDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
    });     

    this.sharedService.loading=true; 
    this.dieselstateList();
    this.sharedService.loading=false;
  }

  dieselstateList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.filter.search = "";
        this.dieselStatementService.getHappayDieselList(this.filter)
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
          title: 'Location ',
          data: 'location',
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

  
  dieselStatementAdd(): void {
    this.route.navigate(['/happaystatementadd']);
  }

  //Open user details screen
  getDieselStatementDetails(Docrenewal: Dieselstatementmodel): void {
    this.dieselStatementService.setDieselStatementDetails(Docrenewal);
    this.route.navigate(['/happaystatementedit']);
  }

  search(): void {
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.sharedService.loading=true;
    this.dieselstateList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}