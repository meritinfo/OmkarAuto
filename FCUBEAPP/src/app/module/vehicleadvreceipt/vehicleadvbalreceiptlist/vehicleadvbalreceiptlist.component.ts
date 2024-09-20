

import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { VehicleadvbalreceiptService } from 'src/app/services/vehicleadvbalreceipt.service';
import { VehicleadvbalreceiptlistModel } from 'src/app/models/vehicleadvbalreceiptlistmodel';
import { VehicleadvbalreceiptModel } from 'src/app/models/vehicleadvbalreceiptmodel';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-vehicleadvbalreceiptlist',
  templateUrl: './vehicleadvbalreceiptlist.component.html',
  styleUrls: ['./vehicleadvbalreceiptlist.component.css']
})
export class VehicleadvbalreceiptlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allAdvanceMaster: VehicleadvbalreceiptlistModel = new VehicleadvbalreceiptlistModel();
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

  constructor(private vehicleadvbalreceiptService: VehicleadvbalreceiptService,
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

  this.vehicleadvbalreceiptService.clearVehicleadvbalreceiptModelDetails();
  this.formFilter = this.formBuilder.group({
    fromDate: new FormControl(this.fromDate),
    toDate: new FormControl(this.loginDate),
  });     

  this.sharedService.loading=true;   
  this.filter.fromDate = this.fromDate;
  this.filter.toDate = this.loginDate;
 this.vehicleAdvanceBalList();
  this.sharedService.loading=false;
}
vehicleAdvanceBalList() {
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
      callback({
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      });
      this.vehicleadvbalreceiptService.getVehicleadvbalreceiptMasterList(this.filter).subscribe(resp => {
        this.allAdvanceMaster = resp;
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
        title: 'Branch ',
        data: 'branchName',
      },
     
      {
        title: 'Trips Upto Date',
        data: 'tripsUptoDate',
      }, 
      {
        title: 'Vehicle No',
        data: 'vehicleNo',
      }, 
      {
        title: 'Cheq Cash Amt',
        data: 'cheqCashAmt',
      },
     
      {
        title: 'Amt Recd',
        data: 'amtRecd',
      },
      {
        title: 'Amt Ded',
        data: 'amtDed',
      },
    
      {
        title: 'Amt Extras',
        data: 'amtExtras',
      },
      {
        title: 'Total Amt Recd',
        data: 'totalAmtRecd',
      },
     
      // {
      //   title: 'receiptType',
      //   data: 'receiptType',
      // },
      // {
      //   title: 'neftYN',
      //   data: 'neftYN',
      // },
      // {
      //   title: 'chequeNo',
      //   data: 'chequeNo',
      // },
      // {
      //   title: 'chequeDate',
      //   data: 'chequeDate',
      // },
      // {
      //   title: 'debitAc',
      //   data: 'debitAc',
      // },
     
      // {
      //   title: 'vehicleMasterId',
      //   data: 'vehicleMasterId',
      // }, 
      
      
      
      {
        title: 'Action',
        data: 'transId',
      },
    ],
  };
}

addVehicleadvbalreceiptMaster(): void {
  this.route.navigate(['/vehicleadvbalreceiptadd']);
} 

//Open user details screen
getVehicleAdvBalreceiptasterDetails(tyre: VehicleadvbalreceiptModel): void {
  this.vehicleadvbalreceiptService.setVehicleAdvBalreceiptDetails(tyre);
  this.route.navigate(['/Vehicleadvbalreceiptedit']);
}

search(): void {
  var selecteddata = this.formFilter.getRawValue();
  this.filter.fromDate = selecteddata.fromDate;
  this.filter.toDate = selecteddata.toDate;
  this.sharedService.loading=true;
  this.vehicleAdvanceBalList();
  this.sharedService.loading=false;
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}
}





