import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dprvehiplacedlistmodel  } from 'src/app/models/dprvehiplacedlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Dprvehiplacedmodel } from 'src/app/models/dprvehiplacedmodel';
import { DprvehiplacedService } from 'src/app/services/dprvehiplaced.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { RatesMasterService } from 'src/app/services/ratesmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
  

@Component({
  selector: 'app-dprvehiplacedlist',
  templateUrl: './dprvehiplacedlist.component.html',
  styleUrls: ['./dprvehiplacedlist.component.css']
})
export class DprvehiplacedlistComponent {
  allDprlist: Dprvehiplacedlistmodel = new Dprvehiplacedlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'dprBranch',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr: '',
    filterStr1: '',
    filterStr2:'',
    filterStr3:''
  }

  formFilter!: FormGroup;
  partyList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  editMode = false;
  createStatus = false;
  editStatus = false;
  createmode= true;
  deleteStatus = false;
  viewStatus = false;
  userSubmitted = false;
  

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(private formBuilder: FormBuilder,private sharedService: SharedService,
    private toasterService: ToastrService,
    private dprvehiService: DprvehiplacedService, 
    private commonService: CommonService,private route: Router)  {
  }
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "DPR Vehicle Placement"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }

    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    today.setMonth(month - 10);
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
    
    this.dprvehiService.clearDprVehiDetails();
    
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      payParty: new FormControl('',),
      type: new FormControl('',),
    });
    
    this.sharedService.loading=true;
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.search = '';
    this.filter.filterStr = '';

    this.dprVehiList();    
    this.sharedService.loading=false;
  }
  
  dprVehiList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching:false,
      ajax: (dataTablesParameters: any, callback) => {
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        
        this.dprvehiService.getDprVehiPlacedList(this.filter).subscribe(resp => {
          this.allDprlist = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'DPR Date',
          data: 'dprDate',
        }, 
        {
          title: 'From Place ',
          data: 'fromPlace',
        },
        {
          title: 'To Place',
          data: 'toPlace',
        },
        {
          title: 'Party Name',
          data: 'partyName',
        },   
        {
          title: 'Vehicle No',
          data: 'vehicleNo',
        },   
        {
          title: 'Driver Name',
          data: 'driverName',
        },    
        {
          title: 'Action',
          data: 'dprId',
        },  
      ],
    };
  }

  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  getdprVehiDetails(dpr: Dprvehiplacedmodel): void {
    this.dprvehiService.setDprVehiDetails(dpr);
    this.route.navigate(['/dprvehplacededit']);
  }  

  get f() { return this.formFilter.controls; }

  search(): void {
    this.userSubmitted = true;
    if (this.formFilter.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields ");   
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }     
      return;
    }

    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;

    this.sharedService.loading=true;
    this.dprVehiList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
 
}
  