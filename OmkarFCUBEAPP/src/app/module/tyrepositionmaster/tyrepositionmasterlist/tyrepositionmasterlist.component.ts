import { Component } from '@angular/core';



import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import {Tyrepositionmasterlistmodel  } from 'src/app/models/tyrepositionmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Tyrepositionmastermodel } from 'src/app/models/tyrepositionmastermodel';
import { TyrepositionMasterService } from 'src/app/services/tyrepositionmaster.service';


@Component({
  selector: 'app-tyrepositionmasterlist',
  templateUrl: './tyrepositionmasterlist.component.html',
  styleUrls: ['./tyrepositionmasterlist.component.css']
})
export class TyrepositionmasterlistComponent {
  dtOptions: DataTables.Settings = {};
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
        title: ' TyrePosID',
        data: 'tyrePosID',
      },

     {
      title: 'TyrePosID',
      data: 'tyrePosID',
    },
   
  
  
    {
      title: 'Action',
      data: 'productGroupId',
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


