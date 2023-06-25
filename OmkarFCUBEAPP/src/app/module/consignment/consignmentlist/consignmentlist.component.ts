import { Component, } from '@angular/core';
import { Router } from '@angular/router';



import { Filtermodel } from 'src/app/models/filtermodel';
import { Consignmentlistmodel  } from 'src/app/models/consignmentlistmodel';
import { Consignmentmodel } from 'src/app/models/consignmentmodel';

import { ConsignmentService } from 'src/app/services/consignment.service';

@Component({
  selector: 'app-consignmentlist',
  templateUrl: './consignmentlist.component.html',
  styleUrls: ['./consignmentlist.component.css']
})
export class ConsignmentlistComponent  {

  loggedInUserID: string = '';
  dtOptions: DataTables.Settings = {};
  allConsignment: Consignmentlistmodel = new Consignmentlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''
  }

  constructor(private consignmentService: ConsignmentService, private route: Router) {
  }

  ngOnInit(): void {
    var userData = localStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
    }
    else {
      this.route.navigate(['/']);
    }
    this.consignmentService.clearConsignmentDetails();
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
        this.consignmentService.getConsignmentList(this.filter)
          .subscribe(resp => {
           this.allConsignment = resp;
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
            title: 'BookingPlace',
            data: 'bookingPlace',
          },
  
         {
          title: 'GcSeries',
          data: 'gcSeries',
        },
       
        {
          title: 'GcSlNo',
          data: 'gcSlNo',
        },
        {
          title: 'gcNoteNo',
          data: 'gcNoteNo',
        },
      
      
      
        {
          title: 'Action',
          data: 'consignmentID',
        },
      ],
    };
  }

  //Open new user add screen
  consignmentAdd(): void {
    this.route.navigate(['/consignmentadd']);
  }
  getConsignmentDetails(Consignment: Consignmentmodel): void {
    this.consignmentService.setConsignmentDetails(Consignment);
    this.route.navigate(['/consignmentedit']);
}
}
