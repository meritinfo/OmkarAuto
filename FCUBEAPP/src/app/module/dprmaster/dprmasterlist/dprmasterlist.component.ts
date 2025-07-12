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
    sortColumn: '',
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
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  editMode = false;
  createStatus = false;
  editStatus = false;
  createmode= true;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  formSubmitted = false;

  dprfromDate: string  = "";
  dprtoDate: string  = "";
  dprpayParty: string  = "";
  dprtype: string  = "";
  dprorigin: string  = "";
  broker: string  = "";
  dprdestination: string  = "";
  brokerList: Dropdownmodel[] = [];
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
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
    }
    
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }

    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
    else {
      this.route.navigate(['/']);
    }
    
    this.dprService.clearDprDetails();
    this.dprvehiService.clearDprVehiDetails();

    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    var frdt = new Date(this.loginDate);
    var mindt = new Date(this.minDate);    
    var mnth = frdt.getMonth();
    frdt.setMonth(mnth - 1);
    if(frdt<mindt){
      this.fromDate =  this.minDate ;
    }
    else{
      this.fromDate = frdt.toLocaleDateString('en-CA').toString();   
    }   
    
    var dprfromDate = sessionStorage.getItem('dprfromDate')?.toString();
    if (typeof dprfromDate !== 'undefined' && dprfromDate !== null && dprfromDate !== '') {
      this.dprfromDate = dprfromDate;
    }
    else{
      this.dprfromDate = this.fromDate;
    }
    var dprtoDate = sessionStorage.getItem('dprtoDate')?.toString();
    if (typeof dprtoDate !== 'undefined' && dprtoDate !== null && dprtoDate !== '') {
      this.dprtoDate = dprtoDate;
    }
    else{
      this.dprtoDate = this.loginDate;
    }
    var dprpayParty = sessionStorage.getItem('dprpayParty')?.toString();
    if (typeof dprpayParty !== 'undefined' && dprpayParty !== null && dprpayParty !== '') {
      this.dprpayParty = dprpayParty;
    }
    var dprtype = sessionStorage.getItem('dprtype')?.toString();
    if (typeof dprtype !== 'undefined' && dprtype !== null && dprtype !== '') {
      this.dprtype = dprtype;
    }
    var dprorigin = sessionStorage.getItem('dprorigin')?.toString();
    if (typeof dprorigin !== 'undefined' && dprorigin !== null && dprorigin !== '') {
      this.dprorigin = dprorigin;
    }
    var dprdestination = sessionStorage.getItem('dprdestination')?.toString();
    if (typeof dprdestination !== 'undefined' && dprdestination !== null && dprdestination !== '') {
      this.dprdestination = dprdestination;
    }
    var broker = sessionStorage.getItem('broker')?.toString();
    if (typeof broker !== 'undefined' && broker !== null && broker !== '') {
      this.broker = broker;
    }

    
    this.dprService.clearDprDetails();
    this.getPartyList();
    this.getBrokerList();
    this.getLocationList();
    
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      payParty: new FormControl('',),
      type: new FormControl('',),
      origin: new FormControl('',),
      destination: new FormControl('',),
      brokerId: new FormControl('',),
    });
    
    this.sharedService.loading=true;

    setTimeout(() => {      
      this.formFilter.patchValue({
        fromDate: this.dprfromDate,
        toDate: this.dprtoDate,
        payParty: this.partyList.find(e => e.dataId == this.dprpayParty),   
        type: this.dprtype,
        origin: this.locationList.find(e => e.dataId == this.dprorigin),   
        destination: this.locationList.find(e => e.dataId == this.dprdestination),     
        brokerId:this.brokerList.find(e => e.dataId == this.broker),
      })
    }, 2000);

    this.filter.fromDate = this.dprfromDate;
    this.filter.toDate = this.dprtoDate;
    this.filter.search = this.dprpayParty;
    this.filter.filterStr = this.dprtype;
    this.filter.filterStr1 = this.dprorigin;
    this.filter.filterStr2 = this.dprdestination;
    this.filter.filterStr3 = this.branch;
    this.filter.sortColumn= this.broker;

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
        language: {
          zeroRecords: ''
        }, 
      ajax: (dataTablesParameters: any, callback) => {
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        
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
          title: 'Action',
          data: 'dprId',
        },    
        {
          title: 'Vehicle Place',
          data: 'dprId',
        },     
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
          title: 'No of LRs',
          data: 'noofLr',
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
          title: 'Vehicle Type',
          data: 'vehTypeDesc',
        },      
        {
          title: 'Booking Freight',
          data: 'freightRs',
        }, 
      ],
    };
  }

  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  getBrokerList(): void {
    this.commonService.getBrokerList().subscribe((res) => {
      this.brokerList = res;
    });
  }

  getdprDetails(dpr: Dprmodel): void {
    var selecteddata = this.formFilter.getRawValue();
    sessionStorage.setItem("dprfromDate", selecteddata.fromDate);
    sessionStorage.setItem("dprtoDate", selecteddata.toDate);
    sessionStorage.setItem("dprpayParty", selecteddata.payParty?selecteddata.payParty.dataId:"");
    sessionStorage.setItem("dprtype", selecteddata.type);
    sessionStorage.setItem("dprorigin", selecteddata.origin?selecteddata.origin.dataId:"");
    sessionStorage.setItem("dprdestination", selecteddata.destination?selecteddata.destination.dataId:"");
    sessionStorage.setItem("broker", selecteddata.brokerId?selecteddata.brokerId.dataId:"");

    this.dprService.setDprDetails(dpr);
    this.route.navigate(['/dprindentedit']);
  }  

  getdprVehiplaced(dpr: Dprmodel): void {
    var selecteddata = this.formFilter.getRawValue();
    sessionStorage.setItem("dprfromDate", selecteddata.fromDate);
    sessionStorage.setItem("dprtoDate", selecteddata.toDate);
    sessionStorage.setItem("dprpayParty", selecteddata.payParty?selecteddata.payParty.dataId:"");
    sessionStorage.setItem("dprtype", selecteddata.type);
    sessionStorage.setItem("dprorigin", selecteddata.origin?selecteddata.origin.dataId:"");
    sessionStorage.setItem("dprdestination", selecteddata.destination?selecteddata.destination.dataId:"");
    sessionStorage.setItem("broker", selecteddata.brokerId?selecteddata.brokerId.dataId:"");

    sessionStorage.setItem("dprid", dpr.dprId);
    this.route.navigate(['/dprvehplacedadd']);
  }  

  dprAdd(): void {
    var selecteddata = this.formFilter.getRawValue();
    sessionStorage.setItem("dprfromDate", selecteddata.fromDate);
    sessionStorage.setItem("dprtoDate", selecteddata.toDate);
    sessionStorage.setItem("dprpayParty", selecteddata.payParty?selecteddata.payParty.dataId:"");
    sessionStorage.setItem("dprtype", selecteddata.type);
    sessionStorage.setItem("dprorigin", selecteddata.origin?selecteddata.origin.dataId:"");
    sessionStorage.setItem("dprdestination", selecteddata.destination?selecteddata.destination.dataId:"");
    sessionStorage.setItem("broker", selecteddata.brokerId?selecteddata.brokerId.dataId:"");

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
    this.formSubmitted = true;
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
    let frmdt = new Date(selecteddata.fromDate);
    let todt = new Date(selecteddata.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);

    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toasterService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.search = selecteddata.payParty?selecteddata.payParty.dataId:"";
    this.filter.filterStr = selecteddata.type;
    this.filter.filterStr1 = selecteddata.origin?selecteddata.origin.dataId:"";
    this.filter.filterStr2 = selecteddata.destination?selecteddata.destination.dataId:"";
    this.filter.filterStr3 = this.branch;
    this.filter.sortColumn = selecteddata.brokerId?selecteddata.brokerId.dataId:"";
    
    this.sharedService.loading = true;
    this.dprList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
 
}
  