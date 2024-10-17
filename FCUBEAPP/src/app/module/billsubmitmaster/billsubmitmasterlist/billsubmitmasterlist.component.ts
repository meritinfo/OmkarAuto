
import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import {  Billsubmitmasterlistmodel } from 'src/app/models/billsubmitmasterlistmodel';
import { Billsubmitmastermodel } from 'src/app/models/billsubmitmastermodel';
import { BillSubmitMasterService } from 'src/app/services/billsubmitmaster.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';


@Component({
  selector: 'app-billsubmitmasterlist',
  templateUrl: './billsubmitmasterlist.component.html',
  styleUrls: ['./billsubmitmasterlist.component.css']
})
export class BillsubmitmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allSubmitMaster: Billsubmitmasterlistmodel = new Billsubmitmasterlistmodel();
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

  constructor(private billSubmitMasterService: BillSubmitMasterService,
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService,  private route: Router) {

}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Vehicle Repairs Entry"));
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

  this.billSubmitMasterService.clearBillSubmitMasterDetails();
  this.formFilter = this.formBuilder.group({
    fromDate: new FormControl(this.fromDate),
    toDate: new FormControl(this.loginDate),
  });     

  this.sharedService.loading=true;   
  this.filter.fromDate = this.fromDate;
  this.filter.toDate = this.loginDate;
 this.billSubmitList();
  this.sharedService.loading=false;
}

billSubmitList() {
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
      this.billSubmitMasterService.getBillSubmitMasterList(this.filter).subscribe(resp => {
        this.allSubmitMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [   
      {
        title: 'Submit Stn',
        data: 'Sname',
      },
      {
        title: 'Submit No',
        data: 'submitNo',
      },
     
      // {
      //   title: 'Maint Type',
      //   data: 'maintType',
      // }, 
      {
        title: 'Submit Date',
        data: 'submitDt',
      }, 
      {
        title: 'Submit Type',
        data: 'submitType',
      },
      // {
      //   title: 'vehicleMasterId',
      //   data: 'vehicleMasterId',
      // }, 
      
      
      {
        title: 'Courier Co',
        data: 'courierCo',
      }, 
      {
        title: 'Courier Docket No',
        data: 'courierDocketNo',
      }, 
      {
        title: 'Party Code',
        data: 'partyCode',
      }, 
      {
        title: 'Submit Location',
        data: 'lname',
      }, 
      {
        title: 'Dept Id',
        data: 'dname',
      }, 
      
      {
        title: 'Action',
        data: 'submitMstId',
      },
    ],
  };
}

addBillSubmitMaster(): void {
  this.route.navigate(['/billsubmitmasteradd']);
} 

//Open user details screen
getBillSubmitMasterDetails(tyre: Billsubmitmastermodel): void {
  this.billSubmitMasterService.setBillSubmitMasterDetails(tyre);
  this.route.navigate(['/billsubmitmasteredit']);
}

search(): void {
  var selecteddata = this.formFilter.getRawValue();
  this.filter.fromDate = selecteddata.fromDate;
  this.filter.toDate = selecteddata.toDate;
  this.sharedService.loading=true;
  this.billSubmitList();
  this.sharedService.loading=false;
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}
}



