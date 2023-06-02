import { Component } from '@angular/core';


import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Vehicletypemasterlistmodel  } from 'src/app/models/vehicletypemasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Vehicletypemastermodel } from 'src/app/models/vehicletypemastermodel';
import { VehicleTypeMasterService } from 'src/app/services/vehicletypemaster.service';

@Component({
  selector: 'app-vehicletypemasterlist',
  templateUrl: './vehicletypemasterlist.component.html',
  styleUrls: ['./vehicletypemasterlist.component.css']
})
export class VehicletypemasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allVehicleTypeMasterTypes: Vehicletypemasterlistmodel = new Vehicletypemasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''

}
constructor(private vehicleTypeMasterService: VehicleTypeMasterService, private route: Router) {
}

ngOnInit(): void {
  this.vehicleTypeMasterService.clearVehicleTypemasterDetails();
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
      this.vehicleTypeMasterService.getVehicleTypeMasterList(this.filter)
        .subscribe(resp => {
         this.allVehicleTypeMasterTypes = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
     // Set column title and data field
    columns: [
      

        {
          title: 'vehicleTypeDesc',
          data: 'vehicleTypeDesc',
        },

       {
        title: 'VehicleTypeGroupId',
        data: 'vehicleTypeGroupId',
      },
     
    
    
      {
        title: 'Action',
        data: 'vehicleTypeId',
      },
    ],
  };
}
//Open new destination add screen
addVehicleTypeMaster(): void {
  this.route.navigate(['/addvehicletypemaster']);
}


//Open user details screen
getvehicleTypesDetails(Vehicletype: Vehicletypemastermodel): void {
  this.vehicleTypeMasterService.setVehicleTypeMasterDetails(Vehicletype);
  this.route.navigate(['/vehicletypemasteredit']);
}

}


