import { Component } from '@angular/core';
import { Router } from '@angular/router';


import { Filtermodel } from 'src/app/models/filtermodel';
import { Distancemasterfreightlistmodel  } from 'src/app/models/distancemasterfreightlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Distancemasterfreightmodel } from 'src/app/models/distancemasterfreightmodel';
import{ DistancemasterfreightmasterService } from 'src/app/services/distancemasterfreightmaster.service';

@Component({
  selector: 'app-distancemasterfreightlist',
  templateUrl: './distancemasterfreightlist.component.html',
  styleUrls: ['./distancemasterfreightlist.component.css']
})
export class DistancemasterfreightlistComponent {
  dtOptions: DataTables.Settings = {};
  allDistanceFreightMaster: Distancemasterfreightlistmodel = new Distancemasterfreightlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'doccode',
    sortOrder: 'asc',
    search: ''
  }
constructor(private distancemasterfreightmasterService: DistancemasterfreightmasterService, private route: Router)  {
  }
  
ngOnInit(): void {
  this.distancemasterfreightmasterService.clearDistanceMasterFreightDetails();
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
      this.distancemasterfreightmasterService. getDistanceMasterFreightList(this.filter)
        .subscribe(resp => {
         this.allDistanceFreightMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [
      

      {
        title: 'ValidFrom ',
        data: 'validFrom',
      },

     {
      title: 'ValidUpto ',
      data: 'validUpto',
    },
   
   
  
  
    {
      title: 'Action',
      data: 'MasterID',
    },
   
  ],
};
}
//Open new destination add screen



//Open user details screen
getDistanceMasterFreightDetails(Docrenewal: Distancemasterfreightmodel): void {
this.distancemasterfreightmasterService.setDistancemasterfreightDetails(Docrenewal);
this.route.navigate(['/distancemasterfreightedit']);
}



  
  //Open new driver master add screen
  distanceMasterFreightAdd(): void {
    this.route.navigate(['/distancemasterfreightadd']);
  }
}
