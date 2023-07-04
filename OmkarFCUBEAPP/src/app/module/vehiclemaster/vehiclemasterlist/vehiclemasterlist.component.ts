import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Vehiclefltmasterlistmodel  } from 'src/app/models/vehiclefltmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Vehiclefltmastermodel } from 'src/app/models/vehiclefltmastermodel';
import { VehicleFltMasterService } from 'src/app/services/vehiclefltmaster.service';

@Component({
  selector: 'app-vehiclemasterlist',
  templateUrl: './vehiclemasterlist.component.html',
  styleUrls: ['./vehiclemasterlist.component.css']
})
export class VehiclemasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allVehicleFltMaster: Vehiclefltmasterlistmodel = new Vehiclefltmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''


}
constructor(private vehicleFltMasterService: VehicleFltMasterService, private route: Router) {
}

ngOnInit(): void {
  this.vehicleFltMasterService.clearVehiclefltmasterDetails();
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
      this.vehicleFltMasterService.getVehicleFltMasterList(this.filter)
        .subscribe(resp => {
         this.allVehicleFltMaster = resp;
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
          title: 'vehicleNo',
          data: 'vehicleNo',
        },

       {
        title: 'fleetStation',
        data: 'fleetStation',
      },
     
    
    
      {
        title: 'Action',
        data: 'vehicleMasterID',
      },
    ],
  };
}
 //Open new vehicle master add screen
 vehiclemasterAdd(): void {
  this.route.navigate(['/vehiclemasteradd']);
}

//Open user details screen
getvehicleFltDetails(Vehicletype: Vehiclefltmastermodel): void {
  this.vehicleFltMasterService.setVehiclefltMasterDetails(Vehicletype);
  this.route.navigate(['/vehiclefltmasteredit']);
}

}
