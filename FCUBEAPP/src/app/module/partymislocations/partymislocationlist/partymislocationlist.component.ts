
import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Partymislocationlistmodel } from 'src/app/models/partymislocationslist';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Partymislocationmodel } from 'src/app//models/partymislocationsmodel';
import { PartyMisLocationsService } from 'src/app/services/partymislocations.service';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-partymislocationlist',
  templateUrl: './partymislocationlist.component.html',
  styleUrls: ['./partymislocationlist.component.css']
})
export class PartymislocationlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allMisMaster: Partymislocationlistmodel = new Partymislocationlistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: '',
    fromDate:'',
    toDate:'',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
     filterStr3:''
  }
  
  formFilter!: FormGroup;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  year: string = '';

  constructor(private partyMisLocationsService: PartyMisLocationsService,
    private commonService: CommonService, private formBuilder: FormBuilder,
    private sharedService: SharedService,  private route: Router) {
  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Party MIS Locations"));
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
    
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;

    this.partyMisLocationsService.clearPartyMisLocationDetails();

    this.sharedService.loading=true;   
    this.partyMislocationList();
    this.sharedService.loading=false;
  }

  partyMislocationList() {
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
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.partyMisLocationsService.getPartyMisLocationList(this.filter).subscribe(resp => {
          this.allMisMaster = resp;
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
          data: 'partyId',
        },  
        {
          title: 'Party',
          data: 'party',
        },            
      ],
    };
  }

  addPartyMisLocation(): void {
    this.route.navigate(['/partymislocadd']);
  } 

  //Open user details screen
  getPartyMisLocation(tyre: Partymislocationmodel): void {
    this.partyMisLocationsService.partyMisLocationDetails(tyre);
    this.route.navigate(['/partymislocedit']);
  }

  search(): void {
    this.sharedService.loading=true;
    this.partyMislocationList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }  

}
