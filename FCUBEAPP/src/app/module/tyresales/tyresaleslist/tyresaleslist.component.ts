import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Tyresalesmastermodel } from 'src/app/models/tyresalesmastermodel';
import { Tyresalesmasterlistmodel } from 'src/app/models/tyresalesmasterlistmodel';
import { TyresalesService } from 'src/app/services/tyresales.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-tyresaleslist',
  templateUrl: './tyresaleslist.component.html',
  styleUrls: ['./tyresaleslist.component.css']
})
export class TyresaleslistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allTyreMaster: Tyresalesmasterlistmodel = new Tyresalesmasterlistmodel();
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
  constructor(private tyresalesService: TyresalesService,
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService,  private route: Router) {
  }
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Sales/Disposal of Tyres"));
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
    
    this.fromDate = today.toLocaleDateString('en-CA').toString();
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   

    this.tyresalesService.clearTyresalesMasterDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate),
      toDate: new FormControl(this.loginDate),
    });     

    this.sharedService.loading=true;   
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.tyresaleList();
    this.sharedService.loading=false;
  }
  
  tyresaleList() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
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
        this.tyresalesService.getTyresalesMasterList(this.filter)
          .subscribe(resp => {
          this.allTyreMaster = resp;
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
          title: 'Sale Incharge',
          data: 'saleIncharge',
        },
        {
          title: 'Customer Name',
          data: 'customerName',
        },
        {
          title: 'Net Amount',
          data: 'netAmount',
        },
        {
          title: 'Remarks',
          data: 'remarks',
        }, 
        {
          title: 'Action',
          data: 'masterID',
        },
      ],
    };
  }

  addTyresale(): void {
    this.route.navigate(['/tyresaleadd']);
  } 
  
  //Open user details screen
  getTyresaleDetails(tyre: Tyresalesmastermodel): void {
    this.tyresalesService.setTyresalesMasterDetails(tyre);
    this.route.navigate(['/tyresaleedit']);
  }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.sharedService.loading=true;
    this.tyresaleList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}