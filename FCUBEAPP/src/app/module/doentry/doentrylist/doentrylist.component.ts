import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Dolistmodel  } from 'src/app/models/dolistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Domodel } from 'src/app/models/domodel';
import { DoentryService } from 'src/app/services/doentry.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
  
 
@Component({
  selector: 'app-doentrylist',
  templateUrl: './doentrylist.component.html',
  styleUrls: ['./doentrylist.component.css']
})
export class DoentrylistComponent {
  allDolist: Dolistmodel = new Dolistmodel();
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

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(private formBuilder: FormBuilder,private sharedService: SharedService,
    private toasterService: ToastrService,    private doentryService: DoentryService, 
    private commonService: CommonService,private route: Router)  {
  }
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "DO Entry"));
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
    
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    
    
    this.doentryService.clearDoDetails();

    this.getPartyList();
    this.getLocationList();
    
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      payParty: new FormControl('',),
      origin: new FormControl('',),
      destination: new FormControl('',),
    });
    
    this.sharedService.loading=true;

    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.search = "";
    this.filter.filterStr = "";
    this.filter.filterStr1 = "";
    this.filter.filterStr2 = "";
    this.filter.filterStr3 = "";

    this.doList();    
    this.sharedService.loading=false;
  }
  
  doList(){
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
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        
        this.doentryService.getDoList(this.filter).subscribe(resp => {
          this.allDolist = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'DO Branch',
          data: 'doBr',
        }, 
        {
          title: 'DO No ',
          data: 'doNo',
        },
        {
          title: 'DO Date ',
          data: 'doDate',
        },
        {
          title: 'Loading From',
          data: 'loadingFr',
        },
        {
          title: 'Destination',
          data: 'dest',
        },
        {
          title: 'Party Name',
          data: 'partyName',
        },  
        {
          title: 'Cnor Name',
          data: 'cnorName',
        },   
        {
          title: 'Cnee Name',
          data: 'cneeName',
        },   
        {
          title: 'DO Qty',
          data: 'doQty',
        },    
        {
          title: 'Bal Qty',
          data: 'balQty',
        },   
        {
          title: 'DO Status',
          data: 'doStatus',
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

  getdoDetails(dos: Domodel): void {
    this.doentryService.setDoDetails(dos);
    this.route.navigate(['/doentryedit']);
  }  

  getdoVehiplaced(dos: Domodel): void {
    sessionStorage.setItem("doid", dos.doId);
    this.route.navigate(['/dovehplacedadd']);
  }  

  doAdd(): void {
    this.route.navigate(['/doentryadd']);
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
    this.filter.fromDate = selecteddata.fromDate;
    this.filter.toDate = selecteddata.toDate;
    this.filter.search = selecteddata.payParty?selecteddata.payParty.dataId:"";
    this.filter.filterStr1 = selecteddata.origin?selecteddata.origin.dataId:"";
    this.filter.filterStr2 = selecteddata.destination?selecteddata.destination.dataId:"";
    this.filter.filterStr3 = this.branch;
    
    this.sharedService.loading = true;
    this.doList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
 
}
  