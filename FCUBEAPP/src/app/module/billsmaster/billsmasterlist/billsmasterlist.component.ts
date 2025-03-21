import { Component,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Billsmasterlistmodel } from 'src/app/models/billsmasterlistmodel';
import { Billsmastermodel } from 'src/app/models/billsmastermodel';
import { BillsMasterService } from 'src/app/services/billsmaster.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-billsmasterlist',
  templateUrl: './billsmasterlist.component.html',
  styleUrls: ['./billsmasterlist.component.css']
})

export class BillsmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allBillsMaster: Billsmasterlistmodel = new Billsmasterlistmodel();
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
  formFilter!: FormGroup;
  keywordLocation = 'dataName'; 
  year: string = '';
  loginDate: string = '';
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  constructor(private billsMasterService: BillsMasterService, 
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
        .find(((aa: { menuName: string; }) => aa.menuName === "Bill Entry (MAIN)"));
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
    
    
    this.billsMasterService.clearBillsMasterDetails();
    this.formFilter = this.formBuilder.group({
      bill_StmtNo: new FormControl(''),
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),
      printSign:new FormControl('N'),
    });     

    this.sharedService.loading=true;     
    this.filter.search = '';
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;    
    this.filter.filterStr= "N"; 
    this.filter.filterStr1= this.year; 
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
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.billsMasterService.getBillsMasterList(this.filter).subscribe(resp => {
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
          title: 'Print',
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
    this.route.navigate(['/billsmasteradd']);
  }
  
  //Open user details screen
  getBillsMasterDetails(bill: Billsmastermodel): void {
    this.billsMasterService.setBillsMasterDetails(bill);
    this.route.navigate(['/billsmasteredit']);
  }

  download(bill: Billsmastermodel): void {
    this.reportmodel.pageNumber = 1;
    this.reportmodel.pageSize = 10;
    this.reportmodel.sortColumn = '';
    this.reportmodel.sortOrder = '';
    this.reportmodel.search = '';
    this.reportmodel.fromDate = '';
    this.reportmodel.toDate = '';
    this.reportmodel.filterStr = bill.billingStation;
    this.reportmodel.filterStr1 = bill.billNo;
    this.reportmodel.filterStr2 = bill.yearId;
    this.reportmodel.filterStr3 = this.formFilter.value.printSign;
    
    this.billsMasterService.getBillPdf(this.reportmodel).subscribe(resp => {
      if(resp.status){    
        let link = document.createElement("a");
        link.download = "Bill_" + new Date().getTime() + '.pdf';
        link.href = "assets/reports/BillPrint/" + resp.message;
        link.click();
        window.open(link.href, "_blank");
      }
      else{        
        this.toasterService.warning(resp.message);   
      }
    });
  }
  
  search(): void {
    this.filter.search = this.formFilter.value.bill_StmtNo;
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.filter.sortOrder = this.branch;      
    this.filter.filterStr= "N"; 
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
