import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Tyrepositionmasterlistmodel } from 'src/app/models/tyrepositionmasterlistmodel';
import { Tyrepositionmastermodel } from 'src/app/models/tyrepositionmastermodel';
import { TyrepositionMasterService } from 'src/app/services/tyrepositionmaster.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-tyrepositionmasterlist',
  templateUrl: './tyrepositionmasterlist.component.html',
  styleUrls: ['./tyrepositionmasterlist.component.css']
})

export class TyrepositionmasterlistComponent {  
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allTyrepositionMaster: Tyrepositionmasterlistmodel = new Tyrepositionmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''
  }

  constructor(private tyrepositionmasterService: TyrepositionMasterService, private route: Router) {
  }

  ngOnInit(): void {
    this.tyrepositionmasterService.clearTyrepositionMasterDetails();
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Tyre Position Master");
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

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching: false,     
        language: {
          zeroRecords: ''
        }, 
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.filter.search = dataTablesParameters.search.value;
        this.tyrepositionmasterService.getTyrepositionMasterList(this.filter)
          .subscribe(resp => {
          this.allTyrepositionMaster = resp;
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
          data: 'productGroupId',
        },
        {
          title: 'Position Desc',
          data: 'fitmentPosition',
        },
       
      ],
    };
  }
  //Open new destination add screen
  addTyrepositionmaster(): void {
    this.route.navigate(['/addtyrepositionmaster']);
  }


  //Open user details screen
  getTyrepositionMasterDetails(Tyrepositionmaster: Tyrepositionmastermodel): void {
    this.tyrepositionmasterService.setTyrepositionMasterDetails(Tyrepositionmaster);
    this.route.navigate(['/tyrepositionmasteredit']);
  }

}


