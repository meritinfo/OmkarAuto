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
constructor(private fleetcardmasterService: FleetCardMasterService, private route: Router) {
}
ngOnInit(): void {
this.fleetcardmasterService.clearFleetCardMasterDetails();
this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 10,
  serverSide: true,
  processing: true,
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
      title: 'Card Type',
      data: 'cardType',
    },

   {
    title: 'Card Code',
    data: 'cardCode',
  },
 


  {
    title: 'Action',
    data: 'cardId',
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
  
  