

import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Sparespurchasemasterlistmodel } from 'src/app/models/sparespurchasemasterlistmodel';
import { Sparespurchasemastermodel } from 'src/app/models/sparespurchasemastermodel';
import { SparesPurchaseMasterService } from 'src/app/services/sparespurchasemaster.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-sparespurchasemasterlist',
  templateUrl: './sparespurchasemasterlist.component.html',
  styleUrls: ['./sparespurchasemasterlist.component.css']
})
export class SparespurchasemasterlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allSparesMaster: Sparespurchasemasterlistmodel = new Sparespurchasemasterlistmodel();
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

  constructor(private sparesPurchaseMasterService: SparesPurchaseMasterService,
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService,  private route: Router) {
  }


  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Spares/Lubes Purchase Entry"));
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
    today.setMonth(month - 12);
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   

    this.sparesPurchaseMasterService.clearSparesPurchaseMasterDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),
    });     

    this.sharedService.loading=true;   
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.sparesPurchaseList();
    this.sharedService.loading=false;
  }

  sparesPurchaseList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
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
        this.sparesPurchaseMasterService.getSparesPurchaseMasterList(this.filter)
          .subscribe(resp => {
          this.allSparesMaster = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [   
        {
          title: 'Trans Date',
          data: 'transDate',
        },
        {
          title: 'Non Vendor ',
          data: 'nonVendor',
        },
       
        {
          title: 'Vendor Invoice Date',
          data: 'vendorInvDt',
        }, 
        {
          title: 'Vendor InvNo',
          data: 'vendorInvNo',
        }, 
        {
          title: 'Vendor Name',
          data: 'vendorName',
        }, 
        {
          title: 'Vendor Address',
          data: 'vendorAddress',
        }, 
        {
          title: 'Vendor GstNo',
          data: 'vendorGstNo',
        }, 
        {
          title: 'Net Amount',
          data: 'netAmount',
        }, 
        {
          title: 'Action',
          data: 'spTransId',
        },
      ],
    };
  }

  addSparesPurchaseMaster(): void {
    this.route.navigate(['/sparespurchasemasteradd']);
  } 

  //Open user details screen
  getSparesPurchaseMasterDetails(tyre: Sparespurchasemastermodel): void {
    this.sparesPurchaseMasterService.setSparesPurchaseDetails(tyre);
    this.route.navigate(['/sparespurchasemasteredit']);
  }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.sharedService.loading=true;
    this.sparesPurchaseList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
