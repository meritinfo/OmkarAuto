import { Component,ViewChild } from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { BillsmasterlistmodelLLP } from 'src/app/models/billsmasterlistmodelllp';
import { BillsmastermodelllP } from 'src/app/models/billsmastermodelllp';
import { BillsMasterServiceLLP } from 'src/app/services/billsmasterllp.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-billsupplilistllp',
  templateUrl: './billsupplilistllp.component.html',
  styleUrls: ['./billsupplilistllp.component.css']
})
export class BillsupplilistllpComponent { dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allBillsMaster: BillsmasterlistmodelLLP = new BillsmasterlistmodelLLP();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: '',
    sortOrder: '',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr: "",    
    filterStr1: "",    
    filterStr2: "",
    filterStr3: ""
  }


  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  formFilter!: FormGroup;
  keywordLocation = 'dataName'; 
  year: string = '';
  branch: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  constructor(private billsMasterService: BillsMasterServiceLLP, 
    private toasterService: ToastrService, private reportmodel :Reportmodel,
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService, private route: Router) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Bill Entry (Supp)"));
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
    var branchData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof branchData !== 'undefined' && branchData !== null && branchData !== '') {
      this.branch = branchData;
    }   
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
  
    
    this.billsMasterService.clearBillsMasterDetails();
    this.formFilter = this.formBuilder.group({
      bill_StmtNo: new FormControl(''),
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),
      printSign:new FormControl('Y'),
    });     

    this.sharedService.loading=true;     
    this.filter.search = '';
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;    
    this.filter.filterStr= "Y"; 
    this.filter.filterStr1= ''; 
    this.filter.filterStr2= '';
    this.filter.filterStr3= '';
    this.filter.sortOrder = this.branch;
    this.billsmasterList();
    this.sharedService.loading=false;
  }

  billsmasterList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching:false,   
        language: {
          zeroRecords: ''
        }, 
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.billsMasterService.getBillsSuppliList(this.filter).subscribe(resp => {
            this.allBillsMaster = resp;
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
          data: 'masterId',
        },  
        {
          title: 'Billing Station ',
          data: 'stationName',
        },
        {
          title: 'Bill No',
          data: 'billNo',
        },
       
        {
          title: 'Bill Date',
          data: 'billDate'
        },
        {
          title: 'Party',
          data: 'party'
        },
        {
          title: 'Coll Branch',
          data: 'collectionBranch',
        },
        {
          title: 'Grand Total ',
          data: 'totalGtotal'
        },  
      ],
    };
  }

  billsMasterAdd(): void {
    this.route.navigate(['/billentrysuppaddllp']);
  }
  
  //Open user details screen
  getBillsMasterDetails(bill: BillsmastermodelllP): void {
    this.billsMasterService.setBillsMasterDetails(bill);
    this.route.navigate(['/billentrysuppeditllp']);
  }
  
  search(): void {
    this.filter.search = this.formFilter.value.bill_StmtNo;
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.filter.sortOrder = this.branch;      
    this.filter.filterStr= 'Y'; 
    this.filter.filterStr1= this.year; 
    this.filter.filterStr2= '';
    this.filter.filterStr3= '';
    this.sharedService.loading=true;
    this.billsmasterList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}

