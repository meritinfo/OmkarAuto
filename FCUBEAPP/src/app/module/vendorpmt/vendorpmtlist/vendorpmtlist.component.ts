import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Vendorpmtlistmodel } from 'src/app/models/vendorpmtlistmodel';
import { Vendorpmtmodel } from 'src/app/models/vendorpmtmodel';
import { VendorpmtService } from 'src/app/services/vendorpmt.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';



@Component({
  selector: 'app-vendorpmtlist',
  templateUrl: './vendorpmtlist.component.html',
  styleUrls: ['./vendorpmtlist.component.css']
})
export class VendorpmtlistComponent {

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
    private vendorpmtService: VendorpmtService, private toastrService: ToastrService,
    private commonService: CommonService, private requestmodel:Requestmodel,
    private sharedService: SharedService,  private route: Router) {
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((( aa: { menuName: string; }) => aa.menuName === "Vendor Payments"));
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
    });     

    this.sharedService.loading=true;    
    this.getVendorList();

    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;

    this.pmtList();
    this.sharedService.loading=false;
  }

  pmtList() {
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
        
        this.vendorpmtService.getVendorPmtList(this.filter)
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
          title: 'Action',
          data: 'transId',
        },
        {
          title: 'Vendor ',
          data: 'vendor',
        },
        {
          title: 'Trans Date ',
          data: 'transDate',
        },
        {
          title: 'Bills Upto Date ',
          data: 'billsUptoDate',
        },
        {
          title: 'Net Amt Paid',
          data: 'netAmtPaid'
        },
      ],
    };
  }   

  startWithFilter = function (List: Dropdownmodel[], query: string): any[] {
    return List.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };
  
  getVendorList(){
    this.commonService.getVendorList().subscribe((res) => {
      this.vendorList = res;
    });
  }

  vendorPmtAdd(): void {
    this.route.navigate(['/vendorpmtadd']);
  }

  //Open user details screen
  getVendorPmtDetails(Docrenewal: Vendorpmtmodel): void {
    this.vendorpmtService.setVendorPmtDetails(Docrenewal);
    this.route.navigate(['/vendorpmtedit']);
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

    this.filter.search = selecteddata.vendorId?selecteddata.vendorId.dataId:"";
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    
    this.sharedService.loading=true;
    this.pmtList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}