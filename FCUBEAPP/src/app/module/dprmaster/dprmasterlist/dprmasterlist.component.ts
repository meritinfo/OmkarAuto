import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dprlistmodel  } from 'src/app/models/dprlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Dprmodel } from 'src/app/models/dprmodel';
import { DprService } from 'src/app/services/dpr.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { RatesMasterService } from 'src/app/services/ratesmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { DprvehiplacedService } from 'src/app/services/dprvehiplaced.service';
  
 
@Component({
  selector: 'app-dprmasterlist',
  templateUrl: './dprmasterlist.component.html',
  styleUrls: ['./dprmasterlist.component.css']
})

export class DrpmasterlistComponent {
  allDprlist: Dprlistmodel = new Dprlistmodel();
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
  locationList: Dropdownmodel[] = [];
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
    private toasterService: ToastrService, private dprvehiService: DprvehiplacedService, 
    private dprService: DprService, private ratesMasterService: RatesMasterService,
    private commonService: CommonService,private route: Router)  {
  }
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "DPR Indent Entry"));
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
    this.dprService.clearDprDetails();
    this.dprvehiService.clearDprVehiDetails();

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
    
    this.dprService.clearDprDetails();
    
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      payParty: new FormControl('',),
      type: new FormControl('',),
      origin: new FormControl('',),
      destination: new FormControl('',),
    });
    
    this.sharedService.loading=true;
    this.getPartyList();
    this.getLocationList();
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.search = '';
    this.filter.filterStr = '';
    this.filter.filterStr1 = '';
    this.filter.filterStr2 = '';

    this.dprList();    
    this.sharedService.loading=false;
  }
  
  dprList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching:false,
      ajax: (dataTablesParameters: any, callback) => {
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        
        this.dprService.getDprList(this.filter).subscribe(resp => {
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
          title: 'Actual Wt',
          data: 'actualWt',
        },   
        {
          title: 'Charge Wt',
          data: 'chargeWt',
        },   
        {
          title: 'Vehicle No',
          data: 'vehicleNo',
        },   
        {
          title: 'Broker Name',
          data: 'brokerName',
        },   
        {
          title: 'Driver Mob',
          data: 'driverMob',
        },     
        {
          title: 'Action',
          data: 'dprId',
        },    
        {
          title: 'Vehical Place',
          data: 'dprId',
        },     
      ],
    };
  }

  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  getdprDetails(dpr: Dprmodel): void {
    this.dprService.setDprDetails(dpr);
    this.route.navigate(['/dprindentedit']);
  }  

  getdprVehiplaced(dpr: Dprmodel): void {
    sessionStorage.setItem("dprid", dpr.dprId);
    this.route.navigate(['/dprvehplacedadd']);
  }  

  dprAdd(): void {
    this.route.navigate(['/dprindentadd']);
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res) => {
      this.locationList = res;
    });
  }
  getPartyList(): void {
    this.commonService.getPartyList().subscribe((res) => {
      this.partyList = res;
    });
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
    this.filter.search = selecteddata.payParty?selecteddata.payParty.dataId:"";
    this.filter.filterStr = selecteddata.type;
    this.filter.filterStr1 = selecteddata.origin?selecteddata.origin.dataId:"";
    this.filter.filterStr2 = selecteddata.destination?selecteddata.destination.dataId:"";
    this.sharedService.loading = true;
    this.dprList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
 
}
  