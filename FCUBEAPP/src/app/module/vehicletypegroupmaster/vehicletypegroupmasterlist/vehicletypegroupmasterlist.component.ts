import { Component } from '@angular/core';



import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Vehicletypegroupmasterlistmodel  } from 'src/app/models/vehicletypegroupmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Vehicletypegroupmastermodel } from 'src/app/models/vehicletypegroupmastermodel';
import { VehicleTypeGroupMasterService } from 'src/app/services/vehicletypegroupmaster.service';

@Component({
  selector: 'app-vehicletypegroupmasterlist',
  templateUrl: './vehicletypegroupmasterlist.component.html',
  styleUrls: ['./vehicletypegroupmasterlist.component.css']
})
export class VehicletypegroupmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allVehicleTypeGroupMaster: Vehicletypegroupmasterlistmodel = new Vehicletypegroupmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''

}
constructor(private vehicletypemasterService: VehicleTypeGroupMasterService, private route: Router) {
}

ngOnInit(): void {
  this.vehicletypemasterService.clearVehicleTypeGroupMasterDetails();
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,   
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
      this.vehicletypemasterService.getVehicleTypeGroupmasterList(this.filter)
        .subscribe(resp => {
         this.allVehicleTypeGroupMaster = resp;
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
        data: 'vehicleTypeGroupId',
      },

     {
      title: 'vehicleTypeGroupName ',
      data: 'vehicleTypeGroupName',
    },
   
  
  
   
  ],
};
}
//Open new destination add screen
addVehicleTypeGroupmaster(): void {
this.route.navigate(['/addvehicletypegroupmaster']);
}


//Open user details screen
getVehicleTypeGroupMasterDetails(Destination: Vehicletypegroupmastermodel): void {
this.vehicletypemasterService.setVehicleTypeGroupMasterDetails(Destination);
this.route.navigate(['/vehicletypegroupmasteredit']);
}

}


