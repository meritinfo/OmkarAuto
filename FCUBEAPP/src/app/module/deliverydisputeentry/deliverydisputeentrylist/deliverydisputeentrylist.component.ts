
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Deliverydisputeentrymodel } from 'src/app/models/deliverydisputeentrymodel';
import { Deliverydisputeentrylistmodel } from 'src/app/models/deliverydisputeentrylistmodel';
import { DeliveryDisputeEntryService } from 'src/app/services/deliverydisputeentry.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-deliverydisputeentrylist',
  templateUrl: './deliverydisputeentrylist.component.html',
  styleUrls: ['./deliverydisputeentrylist.component.css']
})
export class DeliverydisputeentrylistComponent {
    
    formSubmitted = false;
    createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false; 
    dashboard: string ="";
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
    allDelivery: Deliverydisputeentrylistmodel = new Deliverydisputeentrylistmodel();
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
      private deliveryDisputeEntryService: DeliveryDisputeEntryService, 
      private commonService: CommonService, private toastrService: ToastrService,      
      private sharedService: SharedService, private route: Router) {
    }
    ngOnInit(): void {
    
      var menuData = sessionStorage.getItem('menulist')?.toString();
      if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
        var privilegeData = JSON.parse(menuData);
        var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
        var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((( aa: { menuName: string; }) => aa.menuName === "Delivery Disputes"));
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
      
      this.deliveryDisputeEntryService.clearSelectedDeliverydisputeentryDetails();
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
      this.deliveryDisputeList();
      this.sharedService.loading=false;
    }
  
    deliveryDisputeList() {
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
          this.deliveryDisputeEntryService.getSelectedDeliverydisputeentryList(this.filter).subscribe(resp => {
            this.allDelivery = resp;
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
            data: 'disputeId',
          },
          {
            title: 'Branch  ',
            data: 'brname ',
          },
          {
            title: 'Disp Date ',
            data: 'dispDate ',
          },
          {
            title: 'Disp SlNo',
            data: 'dispSlNo',
          },
          {
            title: 'LR No',
            data: 'gcNoteNo',
          },
          {
            title: 'Dispute Status',
            data: 'disputeStatus'
          },
          {
            title: 'Dispute Remarks',
            data: 'disputeRemarks'
          },
        ],
      };
    }
     deliverydisputeAdd(): void {
        this.route.navigate(['/deliverydisputeentryadd']);
      }
    
      //Open user details screen
      getDeliveryDisputeDetails(dlvy: Deliverydisputeentrymodel): void {
        this.deliveryDisputeEntryService.setDeliverydisputeentryDetails(dlvy);
        this.route.navigate(['/deliverydisputeentryedit']);
      }
    
      
      // download(pod: Deliverydisputeentrymodel): void {
      //   this.request.strRequest = pod.ackId;
            
      //   this.deliveryackpodService.getDelvAckPodPrint(this.request).subscribe(resp => {
      //     if(resp.status){    
      //       let link = document.createElement("a");
      //       link.download = "DelvAckPod_" + new Date().getTime() + '.pdf';
      //       link.href = "assets/reports/ackprint/" + resp.message;
      //       link.click();
      //       window.open(link.href, "_blank");
      //     }
      //     else{        
      //       this.toastrService.warning(resp.message);   
      //     }
      //   });
      // }
    
      search(): void {
        var selecteddata = this.formFilter.getRawValue();
        this.filter.fromDate = selecteddata.fromDate;
        this.filter.toDate = selecteddata.toDate;
        this.filter.filterStr = this.branch;
        this.filter.filterStr1 = selecteddata.gcNoteNo;
        this.filter.filterStr2 = this.year;
        
        this.sharedService.loading=true;
        this.deliveryDisputeList();
        this.sharedService.loading=false;
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload();
        });
      }
    }
  
    
  


