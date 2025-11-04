
import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Reportmodel } from 'src/app/models/reportmodel';
import { CciInvmstlistmodel } from 'src/app/models/cciInvmstlistmodel';
import { Ccinvmstmodel } from 'src/app/models/cciInvmstmodel';
import { CciInvoiceMstService } from 'src/app/services/cciInvmst.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cciinvoicemstlist',
  templateUrl: './cciinvoicemstlist.component.html',
  styleUrls: ['./cciinvoicemstlist.component.css']
})
export class CciinvoicemstlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allInvoiceMaster: CciInvmstlistmodel = new CciInvmstlistmodel();

  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: '',
    fromDate:'',
    toDate:'',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:''
  }
  
  formFilter!: FormGroup;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  year: string = '';
  branch: string = '';

  constructor(private cciInvoiceMstService: CciInvoiceMstService, private toastrService: ToastrService, 
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService,  private route: Router) {

  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "CCI Invoice Entry"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
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

    this.cciInvoiceMstService.clearCCiInvMasterDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),
    });     

    this.sharedService.loading=true;   
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.filterStr = this.branch;
    this.filter.filterStr1 = this.year;

    this.cciInvMstList();
    this.sharedService.loading=false;
  }

  cciInvMstList() {
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
        this.cciInvoiceMstService.getCciInvoiceMasterList(this.filter).subscribe(resp => {
          this.allInvoiceMaster = resp;
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
          data: 'cciInvMstId ',
        },
        {
          title: 'Cci Inv No',
          data: 'cciInvNo',
        },
        {
          title: 'Cci Inv Date',
          data: 'cciInvDate',
        },
        {
          title: 'Remarks',
          data: 'remarks',
        }, 
        {
          title: 'Total Taxable Amt ',
          data: 'totalTaxableAmt',
        }, 
        {
          title: 'Total Inv Amt',
          data: 'totalInvAmt',
        },
      ],
    };
  }

  addCciInvMaster(): void {
    this.route.navigate(['/cciinvmstadd']);
  } 

  //Open user details screen
  getCciInvMstDetails(tyre: Ccinvmstmodel): void {
    this.cciInvoiceMstService.setVehiclerepmaintDetails(tyre);
    this.route.navigate(['/cciinvmstedit']);
  }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    let frmdt = new Date(selecteddata.fromDate);
    let todt = new Date(selecteddata.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);
    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toastrService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.filterStr = this.branch;
    this.filter.filterStr1 = this.year;
    this.sharedService.loading = true;
    this.cciInvMstList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
  
  excelDownload(): void {
    var selecteddata = this.formFilter.getRawValue();
    let frmdt = new Date(selecteddata.fromDate);
    let todt = new Date(selecteddata.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);
    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toastrService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.filterStr = this.branch;
    this.filter.filterStr1 = this.year;
    
    this.cciInvoiceMstService.getCciinvoiceExcel(this.filter).subscribe(resp => {
      if(resp.status){      
        let link = document.createElement("a");
        link.download = "CciInvoiceReport" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }
}



