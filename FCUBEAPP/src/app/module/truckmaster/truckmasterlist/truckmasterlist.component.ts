import { Component } from '@angular/core';



import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Truckmasterlistmodel  } from 'src/app/models/truckmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Truckmastermodel } from 'src/app/models/truckmastermodel';
import { TruckMasterService } from 'src/app/services/truckmaster.service';

@Component({
  selector: 'app-truckmasterlist',
  templateUrl: './truckmasterlist.component.html',
  styleUrls: ['./truckmasterlist.component.css']
})
export class TruckmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allTruckMaster: Truckmasterlistmodel = new Truckmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''

}
constructor(private truckmasterService: TruckMasterService, private route: Router) {
}

ngOnInit(): void {
  this.truckmasterService.clearTruckMasterDetails();
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
    searching: false,
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      this.filter.search = dataTablesParameters.search.value;
      this.truckmasterService.getTruckMasterList(this.filter)
        .subscribe(resp => {
         this.allTruckMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [
      

     

     {
      title: 'Truck No ',
      data: 'truckNo',
    },
    {
      title: 'Regn Date ',
      data: 'regnDate',
    },
    {
      title: 'Owner Name ',
      data: 'ownerName',
    },
    {
      title: 'Phone No ',
      data: 'phoneNo',
    },
   
   
  
  
    {
      title: 'Action',
      data: 'truckID',
    },
  ],
};
}
//Open new destination add screen
addTruckmaster(): void {
this.route.navigate(['/addtruckmaster']);
}


//Open user details screen
getTruckMasterDetails(Destination: Truckmastermodel): void {
this.truckmasterService.setTruckMasterDetails(Destination);
this.route.navigate(['/truckmasteredit']);
}

}


