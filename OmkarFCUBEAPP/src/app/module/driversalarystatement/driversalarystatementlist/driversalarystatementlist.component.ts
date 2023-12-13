import { Component } from '@angular/core';

import { Router } from '@angular/router';



import { Filtermodel } from 'src/app/models/filtermodel';
import { Driversalarystatementlistmodel  } from 'src/app/models/driversalarystatementlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Trippaymentsmodel } from 'src/app/models/trippaymentsmodel';
import { TripPaymentsService } from 'src/app/services/trippayments.service';
import { DriversalarystatementService } from 'src/app/services/driversalarystatement.service';


@Component({
  selector: 'app-driversalarystatementlist',
  templateUrl: './driversalarystatementlist.component.html',
  styleUrls: ['./driversalarystatementlist.component.css']
})
export class DriversalarystatementlistComponent {
  dtOptions: DataTables.Settings = {};
  allDriverSalaryStatement: Driversalarystatementlistmodel = new Driversalarystatementlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''


}
constructor(private driversalarystatementService: DriversalarystatementService, private route: Router) {
}
ngOnInit(): void {
  this.driversalarystatementService.clearDriverSalaryStatementDetails();
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
    this.driversalarystatementService.getDriverSalaryStatementList(this.filter)
      .subscribe(resp => {
       this.allDriverSalaryStatement = resp;
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
        title: 'Trans Date',
        data: 'transDt',
      },
      {
        title: 'From Date',
        data: 'fromDt',
      },


     {
      title: 'To Date',
      data: 'toDt',
    },
    {
      title: 'Total Salary',
      data: 'totalSalaryAmt',
    },
    



   
  
  
    {
      title: 'Action',
      data: 'masterId',
    },
  ],
};
}

//Open new driver master add screen
driversalaryStatementAdd(): void {
  this.route.navigate(['/driversalarystatementadd']);
}
//Open user details screen
//gettrippaymentsDetails(trippayments: Driversalarystatementmodel): void {
//this.driversalarystatementService.getDriverSalaryStatementList(trippayments);
//this.route.navigate(['/trippaymentsedit']);
//}

}