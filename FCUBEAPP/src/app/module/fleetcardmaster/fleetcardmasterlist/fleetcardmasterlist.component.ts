import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Fleetcardmasterlistmodel  } from 'src/app/models/fleetcardmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Fleetcardmastermodel } from 'src/app/models/fleetcardmastermodel';
import { FleetCardMasterService } from 'src/app/services/fleetcardmaster.service';


@Component({
  selector: 'app-fleetcardmasterlist',
  templateUrl: './fleetcardmasterlist.component.html',
  styleUrls: ['./fleetcardmasterlist.component.css']
})

export class FleetcardmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allCardMaster: Fleetcardmasterlistmodel = new Fleetcardmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''
  }

  editMode = false;
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  constructor(private fleetcardmasterService: FleetCardMasterService, private route: Router) {
  }
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Fleet Card Master"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    this.fleetcardmasterService.clearFleetCardMasterDetails();
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
        this.fleetcardmasterService.getFleetCardMasterList(this.filter)
          .subscribe(resp => {
          this.allCardMaster = resp;
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
          data: 'cardId',
        },
        {
          title: 'Card Type',
          data: 'cardType',
        },
        {
          title: 'Card Code',
          data: 'cardCode',
        },  
       
      ],
    };
  }
//Open new destination add screen
  addFleetCardMaster(): void {
    this.route.navigate(['/addfleetcardmaster']);
  }
    
  //Open user details screen
  getFleetCardMasterDetails(Destination: Fleetcardmastermodel): void {
    this.fleetcardmasterService.setFleetCardMasterDetails(Destination);
    this.route.navigate(['/editfleetcardmaster']);
  }
  
}
  
  