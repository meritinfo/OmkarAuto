import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Partygroupmastermodellist  } from 'src/app/models/partygroupmastermodellist';
import { Usermodel } from 'src/app/models/usermodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { DataTableDirective } from 'angular-datatables';
import { Partygroupmastermodel } from 'src/app/models/partygroupmastermodel';
import { PartygroupmasterService } from 'src/app/services/partygroupmaster.service';


@Component({
  selector: 'app-partygroupmasterlist',
  templateUrl: './partygroupmasterlist.component.html',
  styleUrls: ['./partygroupmasterlist.component.css']
})
export class PartygroupmasterlistComponent {
  
  allPartygroupmaster: Partygroupmastermodellist = new Partygroupmastermodellist();
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
  formuser!: FormGroup;
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
  

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  constructor(private formBuilder: FormBuilder,private sharedService: SharedService,
    private partygroupmasterService: PartygroupmasterService, 
    private commonService: CommonService,private route: Router)  {
  }
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Party Group Master"));
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
    this.partygroupmasterService.clearpartygroupmastersDetails();
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
    
    this.formuser = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      branch: new FormControl('',),
    });
    
    this.sharedService.loading=true;
    this.getLocationList();
    this.filter.fromDate = this.fromDate;
    this.filter.toDate = this.loginDate;
    this.filter.search = '';
    this.partygroupmasterList();    
    this.sharedService.loading=false;
  }
  
  partygroupmasterList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching:false,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
       // this.filter.fromDate = this.formuser.value.fromDate;
      //  this.filter.toDate = this.formuser.value.toDate;
       // this.filter.search = this.formuser.value.branch.dataId;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.partygroupmasterService.getpartygroupmasterList(this.filter).subscribe(resp => {
        this.allPartygroupmaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
      },
      columns: [
        
        {
          title: 'PartyGroup Desc',
          data: 'partyGroupDesc',
        },

        {
          title: 'Action',
          data: 'partyGroupId',
        },
        
      ],
    };
  }
  startWithFilter = function (dataList: Dropdownmodel[], query: string): any[] {
    return dataList.filter(x => x.dataName.toLowerCase().startsWith(query.toLowerCase()));
  };

  getLocationList(): void {
    this.commonService.getLocationList().subscribe((res: Dropdownmodel[]) => {
      this.locationList = res;
    });
  }

  search(): void {
   // this.filter.fromDate = this.formuser.value.fromDate;
  //  this.filter.toDate = this.formuser.value.toDate;
  //  this.filter.search = this.formuser.value.branch;
    this.sharedService.loading=true;
    this.partygroupmasterList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
  //Open user details screen
  addpartygroup(): void {
    this.route.navigate(['/partygroupadd']);
  }
  //Open user details screen
  getpartygroupDetails(partygroupmastertype: Partygroupmastermodel): void {
    this.partygroupmasterService.setpartygroupmastersDetails(partygroupmastertype);
    this.route.navigate(['/partygroupedit']);
  }
  
}
