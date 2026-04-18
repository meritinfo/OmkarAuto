import { Component,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Billsmasterlistmodel } from 'src/app/models/billsmasterlistmodel';
import { Billsmastermodel } from 'src/app/models/billsmastermodel';
import { FleetBillsMasterService } from 'src/app/services/fleetbillsmaster.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';

@Component({
  selector: 'app-fleetbillsmasterlist',
  templateUrl: './fleetbillsmasterlist.component.html',
  styleUrls: ['./fleetbillsmasterlist.component.css']
})

export class FleetBillsmasterlistComponent {
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
  dashboard: string ="";
  company: string ="";
  formFilter!: FormGroup;
  keywordLocation = 'dataName'; 
  year: string = '';
  loginDate: string = '';
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
    partyList: Dropdownmodel[] = [];

  constructor(private billsMasterService: FleetBillsMasterService, 
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
        .find((aa: { menuName: string; }) => aa.menuName === "Fleet Bill");
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
    
    const shortCode = sessionStorage.getItem('shortCode');
    if (shortCode) {
      this.company = shortCode;
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
      partyCode:new FormControl(''),
    });     

    this.sharedService.loading=true;          
    this.getBillingPartyList(); 
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

  getBillingPartyList(): void {
    this.commonService.getBillingPartyList().subscribe((res) => {
      this.partyList = res;
    });
  }

  startWithFilter = function (branchList: Dropdownmodel[], query: string): any[] {
    return branchList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
  
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
    this.route.navigate(['/fleetbillsmasteradd']);
  }
  
  //Open user details screen
  getBillsMasterDetails(bill: Billsmastermodel): void {
    this.billsMasterService.setBillsMasterDetails(bill);
    this.route.navigate(['/fleetbillsmasteredit']);
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
    if(this.company=="NCC")
    this.billsMasterService.getBillPdf(this.reportmodel).subscribe(resp => {
      if(resp.status){    
        let link = document.createElement("a");
        link.download = "Bill_" + new Date().getTime() + '.pdf';
        link.href = "assets/reports/billprint/" + resp.message;
        link.click();
        window.open(link.href, "_blank");
      }
      else{        
        this.toasterService.warning(resp.message);   
      }
    });
    else{
      this.billsMasterService.getBillGsrPdf(this.reportmodel).subscribe(resp => {
        if(resp.status){    
          let link = document.createElement("a");
          link.download = "Bill_" + new Date().getTime() + '.pdf';
          link.href = "assets/reports/billprint/" + resp.message;
          link.click();
          window.open(link.href, "_blank");
        }
        else{        
          this.toasterService.warning(resp.message);   
        }
      });      
    }
  }
  
  search(): void {
    var selectedDataVal = this.formFilter.getRawValue();
    let frmdt = new Date(selectedDataVal.fromDate);
    let todt = new Date(selectedDataVal.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toasterService.warning("From Date and To Date should be with in Fin Year");
      return;
    }

    this.filter.search = selectedDataVal.bill_StmtNo;
    this.filter.fromDate = selectedDataVal.fromDate;
    this.filter.toDate = selectedDataVal.toDate;
    this.filter.sortOrder = this.branch;      
    this.filter.filterStr= "N"; 
    this.filter.filterStr1= this.year; 
    this.filter.filterStr2= '';
    this.filter.filterStr3= '';
    this.filter.filterStr3 = selectedDataVal.partyCode?selectedDataVal.partyCode.dataId:"";
    this.sharedService.loading=true;
    this.billsmasterList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
