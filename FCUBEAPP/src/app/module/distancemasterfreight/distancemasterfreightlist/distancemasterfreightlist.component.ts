import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Distancemasterfreightlistmodel  } from 'src/app/models/distancemasterfreightlistmodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Distancemasterfreightmodel } from 'src/app/models/distancemasterfreightmodel';
import { DistancemasterfreightmasterService } from 'src/app/services/distancemasterfreightmaster.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-distancemasterfreightlist',
  templateUrl: './distancemasterfreightlist.component.html',
  styleUrls: ['./distancemasterfreightlist.component.css']
})

export class DistancemasterfreightlistComponent {  
  allDistanceFreightMaster: Distancemasterfreightlistmodel = new Distancemasterfreightlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'fromLocation',
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
dashboard: string ="";
  

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(private formBuilder: FormBuilder,private sharedService: SharedService,
    private distancemasterfreightmasterService: DistancemasterfreightmasterService,
    private toasterService: ToastrService, 
    private commonService: CommonService,private route: Router)  {
  }
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Distance Master - FREIGHT"));
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
    this.distancemasterfreightmasterService.clearDistanceMasterFreightDetails();
    
   
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;
    


    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      branch: new FormControl('',),
    });
    
    this.sharedService.loading=true;
    this.getLocationList();
    this.filter.search = '';
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.search = '';

    this.distanceFrtMasterList();    
    this.sharedService.loading=false;
  }
  
  distanceFrtMasterList(){
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
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.distancemasterfreightmasterService.getDistanceMasterFreightList(this.filter)
          .subscribe(resp => {
          this.allDistanceFreightMaster = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'From Point ',
          data: 'fromPoint',
        }, 
        {
          title: 'Valid From ',
          data: 'validFrom',
        },
        {
          title: 'Valid Upto ',
          data: 'validUpto',
        },
        {
          title: 'Action',
          data: 'MasterID',
        },      
      ],
    };
  }

  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  getDistanceMasterFreightDetails(Docrenewal: Distancemasterfreightmodel): void {
    this.distancemasterfreightmasterService.setDistancemasterfreightDetails(Docrenewal);
    this.route.navigate(['/distancemasterfreightedit']);
  }  

  distanceMasterFreightAdd(): void {
    this.route.navigate(['/distancemasterfreightadd']);
  }

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
      this.locationList = res;
    });
  }

  search(): void {
    if (this.formFilter.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields");   
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      }     
      return;
    }
    var selectedData = this.formFilter.getRawValue();
    let frmdt = new Date(selectedData.fromDate);
    let todt = new Date(selectedData.toDate);
    let maxdt = new Date(this.loginDate);
    let mindt = new Date(this.minDate);
    if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
      this.toasterService.warning("From Date and To Date should be with in Fin Year");
      return;
    }
    this.filter.search = selectedData.branch;
    this.filter.fromDate = selectedData.fromDate;
    this.filter.toDate = selectedData.toDate;
    this.sharedService.loading=true;
    this.distanceFrtMasterList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

 
}
