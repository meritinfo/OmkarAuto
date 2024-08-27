import { Component ,ViewChild} from '@angular/core';

import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Ratetypeslistmodel  } from 'src/app/models/ratetypeslistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Ratetypesmodel } from 'src/app/models/ratetypesmodel';
import { RateTypesService } from 'src/app/services/ratetypes.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-ratetypeslist',
  templateUrl: './ratetypeslist.component.html',
  styleUrls: ['./ratetypeslist.component.css']
})
export class RatetypeslistComponent {
  dtOptions: DataTables.Settings = {};
  allRateTypes: Ratetypeslistmodel = new Ratetypeslistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''

}
constructor(private rateTypesService: RateTypesService, private route: Router) {
}

ngOnInit(): void {
  this.rateTypesService.clearRatetypesDetails();
  
  this.ratelist();
}
  ratelist(){
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
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
      this.rateTypesService.getRatetypeList(this.filter)
        .subscribe(resp => {
         this.allRateTypes = resp;
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
          title: 'Rate Desc',
          data: 'rateDesc',
        },

       {
        title: 'Rate Method',
        data: 'rateMethod',
      },
     
    
    
      {
        title: 'Action',
        data: 'rateTypeId',
      },
    ],
  };
}


//Open new destination add screen
addRateTypes(): void {
  this.route.navigate(['/addratetypes']);
}


//Open user details screen
getRateTypesDetails(Ratetype: Ratetypesmodel): void {
  this.rateTypesService.setRateTypesDetails(Ratetype);
  this.route.navigate(['/ratetypesedit']);
}

}

