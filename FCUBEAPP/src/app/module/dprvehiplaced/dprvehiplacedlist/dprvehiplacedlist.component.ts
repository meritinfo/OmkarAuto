import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dprvehiplacedlistmodel  } from 'src/app/models/dprvehiplacedlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Dprvehiplacedmodel } from 'src/app/models/dprvehiplacedmodel';
import { DprvehiplacedService } from 'src/app/services/dprvehiplaced.service';
import { Repreqmodel } from 'src/app/models/repreqmodel';
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
  filter: Repreqmodel = {
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
    filterStr3:'',
    filterStr4:'',
    filterStr5:'',
    filterStr6:''
  }

  formFilter!: FormGroup;
  partyList: Dropdownmodel[] = [];
  locationList: Dropdownmodel[] = [];
  keywordLocation = 'dataName';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  branch: string = '';
  editMode = false;
  createStatus = false;
  editStatus = false;
  createmode= true;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  formSubmitted = false;

  vehfromDate: string = '';
  vehtoDate: string = '';
  vehvehicleNo: string = '';
  vehpayParty: string = '';
  vehorigin: string = '';
  engaged : string = '';
  assign : string = '';
  brokerId : string = '';
  empList: Dropdownmodel[] = [];
  brokerList: Dropdownmodel[] = [];
  
  vehdestination: string = '';
  

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
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    var vehfromDate = sessionStorage.getItem('vehfromDate')?.toString();
    if (typeof vehfromDate !== 'undefined' && vehfromDate !== null && vehfromDate !== '') {
      this.vehfromDate = vehfromDate;
    }
    else{
      this.vehfromDate = this.fromDate;
    }
    var vehtoDate = sessionStorage.getItem('vehtoDate')?.toString();
    if (typeof vehtoDate !== 'undefined' && vehtoDate !== null && vehtoDate !== '') {
      this.vehtoDate = vehtoDate;
    }
    else{
      this.vehtoDate = this.loginDate;
    }
    var vehpayParty = sessionStorage.getItem('vehpayParty')?.toString();
    if (typeof vehpayParty !== 'undefined' && vehpayParty !== null && vehpayParty !== '') {
      this.vehpayParty = vehpayParty;
    }
    var vehvehicleNo = sessionStorage.getItem('vehvehicleNo')?.toString();
    if (typeof vehvehicleNo !== 'undefined' && vehvehicleNo !== null && vehvehicleNo !== '') {
      this.vehvehicleNo = vehvehicleNo;
    }
    var vehorigin = sessionStorage.getItem('vehorigin')?.toString();
    if (typeof vehorigin !== 'undefined' && vehorigin !== null && vehorigin !== '') {
      this.vehorigin = vehorigin;
    }
    var vehdestination = sessionStorage.getItem('vehdestination')?.toString();
    if (typeof vehdestination !== 'undefined' && vehdestination !== null && vehdestination !== '') {
      this.vehdestination = vehdestination;
    }
    var engaged = sessionStorage.getItem('engaged')?.toString();
    if (typeof engaged !== 'undefined' && engaged !== null && engaged !== '') {
      this.engaged = engaged;
    }
    var assign = sessionStorage.getItem('assign')?.toString();
    if (typeof assign !== 'undefined' && assign !== null && assign !== '') {
      this.assign = assign;
    }
    var brokerId = sessionStorage.getItem('brokerId')?.toString();
    if (typeof brokerId !== 'undefined' && brokerId !== null && brokerId !== '') {
      this.brokerId = brokerId;
    }

    this.dprvehiService.clearDprVehiDetails();
    
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      payParty: new FormControl('',),
      vehicleNo :new FormControl('',),
      origin: new FormControl('',),
      destination: new FormControl('',),
      assignToStaff: new FormControl('',),
      brokerId: new FormControl('',),
      vehicleEngagedBy: new FormControl('',),
    });

    this.getBrokerList();
    this.getPartyList();
    this.getLocationList();
    this.sharedService.loading=true;

    setTimeout(() => {      
      this.formFilter.patchValue({
        fromDate: this.vehfromDate,
        toDate: this.vehtoDate,
        payParty: this.partyList.find(e => e.dataId == this.vehpayParty),   
        vehicleNo: this.vehvehicleNo,
        origin: this.locationList.find(e => e.dataId == this.vehorigin),   
        destination: this.locationList.find(e => e.dataId == this.vehdestination), 
        assignToStaff: this.assign,
        vehicleEngagedBy: this.engaged,
        brokerId:this.brokerList.find(e => e.dataId ==this.brokerId),
      })
    }, 2000);

    this.filter.fromDate = this.vehfromDate,
    this.filter.toDate = this.vehtoDate,
    this.filter.search = this.vehvehicleNo,
    this.filter.filterStr = this.vehpayParty;
    this.filter.filterStr1 = this.vehorigin;
    this.filter.filterStr2 = this.vehdestination;    
    this.filter.filterStr3= this.branch; 
    this.filter.sortColumn = this.engaged;
    this.filter.sortOrder = this.assign;
    this.filter.filterStr4 = this.brokerId;
    this.getEmpList();
    this.dprVehiList(); 
       
    this.sharedService.loading=false;
  }
 
  dprVehiList(){
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
          title: 'Action',
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
          title: 'Vehicle No',
          data: 'vehicleNo',
        },  
        {
          title: 'Broker Name',
          data: 'brokerName',
        },     
        {
          title: 'Lorry Hire',
          data: 'lorryHire',
        },       
        {
          title: 'Advance1 Paid',
          data: 'adv1PaidYN',
        },       
        {
          title: 'Advance2 Paid',
          data: 'adv2PaidYN',
        },   
      ],
    };
  }

  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  getdprVehiDetails(dpr: Dprvehiplacedmodel): void {    
    var selecteddata = this.formFilter.getRawValue();
    sessionStorage.setItem("vehfromDate", selecteddata.fromDate);
    sessionStorage.setItem("vehtoDate", selecteddata.toDate);
    sessionStorage.setItem("vehvehicleNo", selecteddata.vehicleNo);
    sessionStorage.setItem("vehpayParty", selecteddata.payParty?selecteddata.payParty.dataId:"");
    sessionStorage.setItem("vehorigin", selecteddata.origin?selecteddata.origin.dataId:"");
    sessionStorage.setItem("vehdestination", selecteddata.destination?selecteddata.destination.dataId:"");
    sessionStorage.setItem("engaged", selecteddata.vehicleEngagedBy?selecteddata.vehicleEngagedBy:"");
    sessionStorage.setItem("assign", selecteddata.assignToStaff?selecteddata.assignToStaff:"");
    sessionStorage.setItem("brokerId", selecteddata.brokerId?selecteddata.brokerId.dataId:"");

    this.dprvehiService.setDprVehiDetails(dpr);
    this.route.navigate(['/dprvehplacededit']);
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

  getEmpList(): void {
    this.commonService.getEmpList().subscribe((res) => {
      this.empList = res;
    });
  }
  getBrokerList(): void {
    this.commonService.getBrokerList().subscribe((res) => {
      this.brokerList = res;
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
    this.filter.search = selecteddata.vehicleNo;
    this.filter.filterStr = selecteddata.payParty?selecteddata.payParty.dataId:"";
    this.filter.filterStr1 = selecteddata.origin?selecteddata.origin.dataId:"";
    this.filter.filterStr2 = selecteddata.destination?selecteddata.destination.dataId:"";
    this.filter.filterStr3= this.branch;  
    this.filter.sortColumn = selecteddata.vehicleEngagedBy;
    this.filter.sortOrder = selecteddata.assignToStaff;
    this.filter.filterStr4= selecteddata.brokerId?selecteddata.brokerId.dataId:"";
    
    this.sharedService.loading=true;
    this.dprVehiList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
 
}
  