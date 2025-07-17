import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Vendorpmtlistmodel } from 'src/app/models/vendorpmtlistmodel';
import { VendorpmtService } from 'src/app/services/vendorpmt.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { Requestmodel } from 'src/app/models/requestmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendorduerptlist',
  templateUrl: './vendorduerptlist.component.html',
  styleUrls: ['./vendorduerptlist.component.css']
})

export class VendorduerptlistComponent {
  formSubmitted = false;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  vendorList: Dropdownmodel[] = [];
  formFilter!: FormGroup;
  keywordLocation = 'dataName'; 
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  rptType= true;
  PaymentFrom=true;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allVendorpmt: Vendorpmtlistmodel = new Vendorpmtlistmodel();
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
    private vendorpmtService: VendorpmtService, 
    private commonService: CommonService, private requestmodel:Requestmodel,
    private sharedService: SharedService,  private route: Router,private toastrService:ToastrService) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Vendor Outstanding"));
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
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;  

    this.vendorpmtService.clearVendorPmtDetails();
    this.formFilter = this.formBuilder.group({
      vendorId: new FormControl(''),
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      rptType: new FormControl('S',), 
      PaymentFrom: new FormControl('',), 
    });     

    this.sharedService.loading=true;    
    this.getVendorList();

    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;

    this.getVendorDueList();
    this.sharedService.loading=false;
  }

  getVendorDueList() {
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
        
        this.vendorpmtService.getVendorPmtRptList(this.filter)
          .subscribe(resp => {
            this.allVendorpmt = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Branch',
          data: 'transBranch',
        },
        {
          title: 'Trans Date',
          data: 'transDate',
        },
        {
          title: 'Vendor ',
          data: 'vendor',
        },
        {
          title: 'Total Amt Paid',
          data: 'TotalAmtPaid',
        },
        {
          title: 'Total Amt Ded',
          data: 'TotalAmtDed',
        },
        {
          title: 'Total Amt TDS',
          data: 'TotalAmtTDS',
        },
        {
          title: 'Total Amt Extras',
          data: 'TotalAmtExtras',
        },

        {
          title: 'Net Amt Paid',
          data: 'netAmtPaid'
        },
        {
          title: 'Remarks',
          data: 'Remarks'
        },
        {
          title: 'CreditAc',
          data: 'CreditAc'
        },
      ],
    };
  }   

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
  
  getVendorList(){
    this.requestmodel.strRequest= 'D';
    this.commonService.getPaymentCreditAcList(this.requestmodel).subscribe((res) => {
      this.vendorList = res;
    });
  }

  //Open user details screen
  // getVendorPmtDetails(Docrenewal: Vendorpmtmodel): void {
  //   this.vendorpmtService.setVendorPmtDetails(Docrenewal);
  //   this.route.navigate(['/vendorpmtedit']);
  // }
    exportExcel(): void { 
      this.formSubmitted = true;
      if (this.formFilter.invalid) {
        this.toastrService.warning("Please Enter Mandatory Fields");   
        const controls = this.formFilter.controls;
        for (const name in controls) {
          if (controls[name].invalid) {
            this.toastrService.warning(name + " Fields is Invalid");   
          }
        }     
        return;
      }
      var selectedDataVal=this.formFilter.getRawValue();
      this.filter.fromDate    = selectedDataVal.fromDate;
      this.filter.toDate      = selectedDataVal.toDate;  
      this.filter.filterStr  = selectedDataVal.vendorId.dataId?selectedDataVal.vendorId.dataId:"";       
      this.filter.filterStr1  = selectedDataVal.PaymentFrom;
      this.filter.filterStr2  = selectedDataVal.rptType; 

      this.vendorpmtService.getVendorPmtRptExcel(this.filter).subscribe(resp => {
      
        if(resp.status){      
          let link = document.createElement("a");
          link.download = "VendorOutstandingReport" + "_" + new Date().getTime() + '.xlsx';
          link.href = "assets\\reports\\Download\\" + resp.message;
          link.click();
        }
        else{        
          this.toastrService.warning(resp.message);   
        }
      });
    }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();

    this.filter.filterStr = selecteddata.vendorId.dataId?selecteddata.vendorId.dataId:"";
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.filterStr1 = selecteddata.PaymentFrom;
    this.filter.filterStr2 = selecteddata.rptType;
    
    this.sharedService.loading=true;
    this.getVendorDueList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
