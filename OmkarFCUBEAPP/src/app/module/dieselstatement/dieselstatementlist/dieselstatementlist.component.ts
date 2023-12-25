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


@Component({
  selector: 'app-dieselstatementlist',
  templateUrl: './dieselstatementlist.component.html',
  styleUrls: ['./dieselstatementlist.component.css']
})
export class DieselstatementlistComponent {

  userSubmitted = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  vendorList: Dropdownmodel[] = [];
  formFilter!: FormGroup;
  keywordLocation = 'dataName';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allDieselStatement: Dieselstatementlistmodel = new Dieselstatementlistmodel();
  filter: Pagerequestwithdatesmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'dfVendor',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    strRequest: ''
  }

  constructor(private formBuilder: FormBuilder, 
    private dieselStatementService: DieselstatementService, 
    private sharedService: SharedService, private gstpurchaseService: GstpurchaseService,      
    private route: Router) {
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Driver Master"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    this.dieselStatementService.clearDieselStatementDetails();
    this.formFilter = this.formBuilder.group({
      dfVendor: new FormControl(''),
      BillStmtDate: new FormControl(''),
    });

    this.sharedService.loading=true;    
    this.getVendorList();
    this.dieselstateList();
    this.sharedService.loading=false;
  }

  dieselstateList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: true,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        // this.filter.search = dataTablesParameters.search.value;
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
          data: 'dfVendor',
        },

        {
          title: 'bill Stmt No ',
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
    this.filter.search = this.formFilter.value.vendorId.dataId;
    this.filter.fromDate = this.formFilter.value.billStmtDate;
    this.sharedService.loading=true;
    this.dieselstateList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}