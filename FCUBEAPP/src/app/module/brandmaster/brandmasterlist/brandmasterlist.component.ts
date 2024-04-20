import { Component } from '@angular/core';


import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Brandmasterlistmodel  } from 'src/app/models/brandmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Brandmastermodel } from 'src/app/models/brandmastermodel';
import { BrandMasterService } from 'src/app/services/brandmaster.service';


@Component({
  selector: 'app-brandmasterlist',
  templateUrl: './brandmasterlist.component.html',
  styleUrls: ['./brandmasterlist.component.css']
})
export class BrandmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allBrandMaster: Brandmasterlistmodel = new Brandmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''

}
constructor(private brandmasterService: BrandMasterService, private route: Router) {
}

ngOnInit(): void {
  this.brandmasterService.clearBrandMasterDetails();
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
      this.brandmasterService.getBrandMasterList(this.filter)
        .subscribe(resp => {
         this.allBrandMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [
      

      {
        title: 'Brand Name',
        data: 'brandName',
      },

     {
      title: 'Brand Type',
      data: 'brandType',
    },
   
  
  
    {
      title: 'Action',
      data: 'productGroupId',
    },
  ],
};
}
//Open new destination add screen
addBrandmaster(): void {
this.route.navigate(['/addbrandmaster']);
}


//Open user details screen
getBrandMasterDetails(Destination: Brandmastermodel): void {
this.brandmasterService.setBrandMasterDetails(Destination);
this.route.navigate(['/brandmasteredit']);
}

}

