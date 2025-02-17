import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Deliveryackpodmodel } from 'src/app/models/deliveryackpodmodel';
import { Deliveryackpodlistmodel } from 'src/app/models/deliveryackpodlistmodel';
import { DeliveryackpodService } from 'src/app/services/deliveryackpod.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';


@Component({
  selector: 'app-deliveryackpodlist',
  templateUrl: './deliveryackpodlist.component.html',
  styleUrls: ['./deliveryackpodlist.component.css']
})
export class DeliveryackpodlistComponent {
  dashboard:string = ''; 
  formSubmitted = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  vendorList: Dropdownmodel[] = [];
  formFilter!: FormGroup;
  keywordLocation = 'dataName'; 
  year: string = '';
  loginDate: string = '';
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  request = new Requestmodel();

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allDeliveryackpod: Deliveryackpodlistmodel = new Deliveryackpodlistmodel();
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
    private deliveryackpodService: DeliveryackpodService, 
    private commonService: CommonService, private toastrService: ToastrService,      
    private sharedService: SharedService, private route: Router) {
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Delivery Ack/POD"));
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
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;
    }
    
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    this.deliveryackpodService.clearDeliveryackpodDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      gcNoteNo : new FormControl(''),
    });     

    this.sharedService.loading=true;    
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.filterStr = this.branch;
    this.filter.filterStr1 = "";
    this.filter.filterStr2 = "";
    this.deliveryackpodList();
    this.sharedService.loading=false;
  }

  deliveryackpodList() {
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
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.deliveryackpodService.getDeliveryackpodList(this.filter).subscribe(resp => {
          this.allDeliveryackpod = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
      },
      columns: [
        {
          title: 'Branch ',
          data: 'ackBr',
        },
        {
          title: 'Ack Date',
          data: 'ackDate',
        },
        {
          title: 'Sl No',
          data: 'ackSlNo',
        },
        {
          title: 'LR No',
          data: 'gcNoteNo',
        },
        {
          title: 'Delivery Date ',
          data: 'deliveryDate'
        },
        {
          title: 'Net Payable ',
          data: 'netPayable'
        },
        {
          title: 'Action',
          data: 'ackId',
        },
      ],
    };
  }

  
  deliveryackpodAdd(): void {
    this.route.navigate(['/delackadd']);
  }

  //Open user details screen
  getDeliveryackpodDetails(dlvy: Deliveryackpodmodel): void {
    this.deliveryackpodService.setDeliveryackpodDetails(dlvy);
    this.route.navigate(['/delackedit']);
  }

  
  download(pod: Deliveryackpodmodel): void {
    this.request.strRequest = pod.ackId;
        
    this.deliveryackpodService.getDelvAckPodPrint(this.request).subscribe(resp => {
      if(resp.status){    
        let link = document.createElement("a");
        link.download = "DelvAckPod_" + new Date().getTime() + '.pdf';
        link.href = "assets/reports/ackprint/" + resp.message;
        link.click();
        window.open(link.href, "_blank");
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.filterStr = this.branch;
    this.filter.filterStr1 = selecteddata.gcNoteNo;
    this.filter.filterStr2 = this.year;
    
    this.sharedService.loading=true;
    this.deliveryackpodList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}