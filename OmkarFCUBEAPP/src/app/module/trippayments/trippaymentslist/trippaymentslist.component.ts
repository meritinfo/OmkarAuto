import { Component } from '@angular/core';
import { Router } from '@angular/router';



import { Filtermodel } from 'src/app/models/filtermodel';
import { Trippaymentslistmodel  } from 'src/app/models/trippaymentslistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Trippaymentsmodel } from 'src/app/models/trippaymentsmodel';
import { TripPaymentsService } from 'src/app/services/trippayments.service';
debugger
@Component({
  selector: 'app-trippaymentslist',
  templateUrl: './trippaymentslist.component.html',
  styleUrls: ['./trippaymentslist.component.css']
})
export class TrippaymentslistComponent {
  dtOptions: DataTables.Settings = {};
  allTripPaymentsTypes: Trippaymentslistmodel = new Trippaymentslistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''

  }
  constructor(private trippaymentService: TripPaymentsService, private route: Router) {
  }

  ngOnInit(): void {
    this.trippaymentService.clearTripPaymentsDetails();
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
      this.trippaymentService.getTripPaymentsList(this.filter)
        .subscribe(resp => {
         this.allTripPaymentsTypes = resp;
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
          title: 'PmtBranch',
          data: 'pmtBranch',
        },

       {
        title: 'TripNo',
        data: 'tripNo',
      },
     
    
    
      {
        title: 'Action',
        data: 'pmtId',
      },
    ],
  };
}
  
  //Open new driver master add screen
  trippaymentsAdd(): void {
    this.route.navigate(['/addtrippayments']);
  }
  //Open user details screen
gettrippaymentsDetails(trippayments: Trippaymentsmodel): void {
  this.trippaymentService.setTripPaymentsDetails(trippayments);
  this.route.navigate(['/trippaymentsedit']);
}

}