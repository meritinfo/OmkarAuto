
import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import {  Subledgerlistmodel } from 'src/app/models/subledgerlistmodel';
import { Subledgermodel } from 'src/app/models/subledgermodel';
import { SubledgerService } from 'src/app/services/subledger.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-subledgermasterlist',
  templateUrl: './subledgermasterlist.component.html',
  styleUrls: ['./subledgermasterlist.component.css']
})
export class SubledgermasterlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allLedgerMaster: Subledgerlistmodel = new Subledgerlistmodel();
  filter: Pagerequestwithdatesmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: '',
    fromDate:'',
    toDate:'',
    strRequest:''
  }
  
  formFilter!: FormGroup;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  year: string = '';

  constructor(private subledgerService: SubledgerService,
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService,  private route: Router) {

}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Sub Ledger Master"));
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
      
  this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
  this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
  
  this.fromDate = this.minDate ;



  this.subledgerService.clearSubledgerMasterDetails();
  this.formFilter = this.formBuilder.group({
    fromDate: new FormControl(this.fromDate),
    toDate: new FormControl(this.loginDate),
  });     

  this.sharedService.loading=true;   
  this.filter.fromDate = this.fromDate;
  this.filter.toDate = this.loginDate;
 this.subLedgerList();
  this.sharedService.loading=false;
}
subLedgerList() {
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,
    searching :false,
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      this.filter.search = dataTablesParameters.search.value;
      callback({
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      });
      this.subledgerService.getSubledgerMasterList(this.filter).subscribe(resp => {
        this.allLedgerMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [   
      {
        title: 'Ledger Ac',
        data: 'acname',
      },
      {
        title: 'Create/Predefined ',
        data: 'createOrPredefined',
      },
     
      // {
      //   title: 'Maint Type',
      //   data: 'maintType',
      // }, 
      // {
      //   title: 'Pre Defined Query',
      //   data: 'preDefinedQuery',
      // }, 
      {
        title: 'Validate With DocNo',
        data: 'validateWithDocNo',
      },
      // {
      //   title: 'vehicleMasterId',
      //   data: 'vehicleMasterId',
      // }, 
      
      
      {
        title: 'ValidateTable',
        data: 'tName',
      }, 
      {
        title: 'Validate Table Field',
        data: 'fName',
      }, 
      
     
      {
        title: 'Action',
        data: 'subLedgerId',
      },
    ],
  };
}

addSubledgerMasterMaster(): void {
  this.route.navigate(['/subledgermasteradd']);
} 

//Open user details screen
getSubledgerMasterDetails(tyre: Subledgermodel): void {
  this.subledgerService.setSubledgerDetails(tyre);
  this.route.navigate(['/subledgermasteredit']);
}

search(): void {
  var selecteddata = this.formFilter.getRawValue();
  this.filter.fromDate = selecteddata.fromDate;
  this.filter.toDate = selecteddata.toDate;
  this.sharedService.loading=true;
  this.subLedgerList();
  this.sharedService.loading=false;
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}
}



