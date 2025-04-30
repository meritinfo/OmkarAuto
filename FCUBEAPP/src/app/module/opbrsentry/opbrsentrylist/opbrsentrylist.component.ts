import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { BrsEntrylistmodel  } from 'src/app/models/brsentrylistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Brsentrymodel } from 'src/app/models/brsentrymodel';
import { OpbrsentryService } from 'src/app/services/opbrsentry.service';


@Component({
  selector: 'app-opbrsentrylist',
  templateUrl: './opbrsentrylist.component.html',
  styleUrls: ['./opbrsentrylist.component.css']
})
export class OpbrsentrylistComponent {
  dtOptions: DataTables.Settings = {};
  allBrsEntry: BrsEntrylistmodel = new BrsEntrylistmodel();
  loggedInUserID: string = '';
  formSubmitted = false;
  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  loginDate: string = '';
  year: string = '';
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''
  }
  constructor(private OpbrsentryService: OpbrsentryService, private route: Router) {
  }

  ngOnInit(): void {
    this.editMode = false;
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Opening Bank Reco Entry"));
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
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    else {
      this.route.navigate(['/']);
    }
    this.onaccountmrstatusList();
  }

  onaccountmrstatusList(){
      this.OpbrsentryService.clearOpBrsEntryDetails();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 50,
        serverSide: true,
        processing: true,
        searching:false,
        ajax: (dataTablesParameters: any, callback) => {
          // Filter setting
          this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
          this.filter.pageSize = dataTablesParameters.length;
          this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
          this.filter.sortOrder = dataTablesParameters.order[0].dir;
          this.filter.search = dataTablesParameters.search.value;
          this.OpbrsentryService.getBrsEntryDetailsList(this.filter)
            .subscribe(resp => {
             this.allBrsEntry = resp;
              callback({
                recordsTotal: resp.pageMetaData.totalCount,
                recordsFiltered: resp.pageMetaData.totalCount,
                data: []
              });
            });
        },
        columns: [      
        {
          title: 'Doc No',
          data: 'docNo',
        },
        {
          title: 'Trans Date',
          data: 'transDate',
        },
        {
          title: 'Bank Ac',
          data: 'bankAc',
        },
        {
          title: 'Amount Rs',
          data: 'amountRs',
        },
        {
          title: 'Action',
          data: 'transId',
        },
      ],
    };
  }
      //Open new destination add screen
  addOpBrsEntry(): void {
    this.route.navigate(['/addbrsentry']);
  }  
  
  //Open user details screen
  getBrsEntryDetails(Destination: Brsentrymodel): void {
    this.OpbrsentryService.setOpBrsEntryDetails(Destination);
    this.route.navigate(['/editbrsentry']);
  }
  
}
  
  