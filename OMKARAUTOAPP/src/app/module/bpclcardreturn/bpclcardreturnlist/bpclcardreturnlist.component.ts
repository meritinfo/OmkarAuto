import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Fleetcardreturntransfermodel  } from 'src/app/models/fleetcardreturntransfermodel';
import { Fleetcardreturntransferlist } from 'src/app/models/fleetcardreturntransferlist';
import { RechargerequestService } from 'src/app/services/rechargerequest.service';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bpclcardreturnlist',
  templateUrl: './bpclcardreturnlist.component.html',
  styleUrls: ['./bpclcardreturnlist.component.css']
})
export class BpclcardreturnlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  allFleetcardreturntransferlist: Fleetcardreturntransferlist = new Fleetcardreturntransferlist();
  filter: Pagerequestwithdatesmodel = {
   pageNumber: 1,
   pageSize: 10,
   sortColumn: '',
   sortOrder: 'asc',
   search: '',
   fromDate:'',
   toDate:'',
   strRequest:''
  }

  formFilter!: FormGroup;
  year       : string = '';
  loginDate  : string = '';
  fromDate   : string = '';
  maxDate    : string = '';
  minDate    : string = '';
  branch     : string ='';

  constructor(private rechargerequestService: RechargerequestService, 
    private formBuilder: FormBuilder,private sharedService: SharedService,
    private commonService: CommonService,private toasterService: ToastrService, 
    private route: Router) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "BPCL Card Amount Return"));
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
    this.rechargerequestService.clearRechargeRequestDetails();

    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),
    });     
    this.sharedService.loading=true;   
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.getFleetCardReturnTransferList();
    this.sharedService.loading=false;
  }

  getFleetCardReturnTransferList() {
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
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.rechargerequestService.getFleetCardReturnTransferList(this.filter).subscribe(resp => {
          this.allFleetcardreturntransferlist = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
      },
      columns: [ 
        // {
        //   title: 'Action',
        //   data: 'reqId',
        // },  
        {
          title: 'Return Date',
          data: 'returnDate',
        },
         {
          title: 'Vehicle No',
          data: 'vehicleNo',
        }, 
        {
          title: 'Return Card',
          data: 'cardNo',
        },
        {
          title: 'Return Amount',
          data: 'returnAmt',
        }, 

      ],
    };
  }

  fleetCardAmtRtrAdd(): void {
      this.route.navigate(['/bpclcardamtreturnadd']);
  } 

  getFleetcardreturntransferDetails(obj: Fleetcardreturntransfermodel): void {
    this.rechargerequestService.getFleetcardreturntransferDetails(obj);
    this.route.navigate(['/bpclcardamtreturnedit']);
  }
        
  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    var selectedDataVal=this.formFilter.getRawValue();
     
    let frmdt = new Date(selectedDataVal.fromDate);
    let todt = new Date(selectedDataVal.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);
     if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toasterService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.sharedService.loading=true;
    this.getFleetCardReturnTransferList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
