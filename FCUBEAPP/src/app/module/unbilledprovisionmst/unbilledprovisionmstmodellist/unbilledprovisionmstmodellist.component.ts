
import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Ratesmasternewlistmodel } from 'src/app/models/ratesmasternewlistmodel';
import {UnbillprovisionmstList } from 'src/app/models/unbillprovisionmstlist';
import {Unbilledprovisionmstmodel } from 'src/app/models/unbillprovisionmst';
import { UnbilledProvisionMstService } from 'src/app/services/unbilledprovisionmst.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { Reportmodel } from 'src/app/models/reportmodel';

@Component({
  selector: 'app-unbilledprovisionmstmodellist',
  templateUrl: './unbilledprovisionmstmodellist.component.html',
  styleUrls: ['./unbilledprovisionmstmodellist.component.css']
})


export class UnbilledprovisionmstmodellistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allProMaster: UnbillprovisionmstList = new UnbillprovisionmstList();
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
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  loginDate: string = '';
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  year: string = '';

  constructor(private unbilledProvisionMstService: UnbilledProvisionMstService,
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService,  private route: Router) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Unbilled Provision"));
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
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
  
    this.fromDate = this.minDate ;

    this.unbilledProvisionMstService.clearUnBillProvisionDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),
    });     

    this.sharedService.loading=true;   
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.getUnbillProvisionMstList();
    this.sharedService.loading=false;
  }
    
  getUnbillProvisionMstList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching :false,   
        language: {
          zeroRecords: ''
        }, 
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.filter.search = dataTablesParameters.search.value;
        this.filter.filterStr = this.branch;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.unbilledProvisionMstService.getUnbillProvisionMstList(this.filter).subscribe(resp => {
          this.allProMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
      },
      columns: [ 
        {
          title: 'Action',
          data: 'id',
        },  
        {
          title: 'Year',
          data: 'yeardesc ',
        },
        {
          title: 'Provision Date',
          data: 'provisionDate ',
        },      
      ],
    };
  }

  addUnBillprovisionmst(): void {
    this.route.navigate(['/unbilledprovisionadd']);
  } 

  //Open user details screen
  getunBillProvisionDetails(tyre: Unbilledprovisionmstmodel): void {
    this.unbilledProvisionMstService.unBillProvisionDetails(tyre);
    this.route.navigate(['/unbilledprovisionedit']);
  }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.sharedService.loading=true;
    this.getUnbillProvisionMstList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}



