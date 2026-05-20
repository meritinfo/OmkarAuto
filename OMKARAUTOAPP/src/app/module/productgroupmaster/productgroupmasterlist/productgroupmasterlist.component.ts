import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Productgroupmasterlistmodel  } from 'src/app/models/productgroupmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Productgroupmastermodel } from 'src/app/models/productgroupmastermodel';
import { ProductGroupMasterService } from 'src/app/services/productgroupmaster.service';

@Component({
  selector: 'app-productgroupmasterlist',
  templateUrl: './productgroupmasterlist.component.html',
  styleUrls: ['./productgroupmasterlist.component.css']
})
export class ProductgroupmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allProductGroupMaster: Productgroupmasterlistmodel = new Productgroupmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''

}
constructor(private productgroupmasterService: ProductGroupMasterService, private route: Router) {
}

ngOnInit(): void {
  this.productgroupmasterService.clearProductGroupMasterDetails();
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
      this.productgroupmasterService.getProductGroupMasterList(this.filter)
        .subscribe(resp => {
         this.allProductGroupMaster = resp;
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
        title: 'Action',
        data: 'productGroupId',
      },
      

        {
          title: 'GroupName',
          data: 'groupName',
        },

       {
        title: 'GstHSN',
        data: 'gstHSN',
      },
     
    
    
      
    ],
  };
}
//Open new destination add screen
addProductgroupmaster(): void {
  this.route.navigate(['/addproductgroupmaster']);
}


//Open user details screen
getproductGroupMasterDetails(Destination: Productgroupmastermodel): void {
  this.productgroupmasterService.setproductGroupMasterDetails(Destination);
  this.route.navigate(['/productgroupmasteredit']);
}

}

