import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Tripsheetlistmodel  } from 'src/app/models/tripsheetlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Tripsheetmodel } from 'src/app/models/tripsheetmodel';
import { TripSheetService } from 'src/app/services/tripsheet.service';
@Component({
  selector: 'app-tripsheetlist',
  templateUrl: './tripsheetlist.component.html',
  styleUrls: ['./tripsheetlist.component.css']
})
export class TripsheetlistComponent {
  dtOptions: DataTables.Settings = {};
  allTripSheetTypes: Tripsheetlistmodel = new Tripsheetlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''
  }
  constructor(private tripSheetService: TripSheetService, private route: Router) {

  }

  ngOnInit(): void {
    this.tripSheetService.clearTripSheetDetails();
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
        this.tripSheetService.getTripSheetList(this.filter)
          .subscribe(resp => {
           this.allTripSheetTypes = resp;
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
            title: 'Vehicle No',
            data: 'vehicleNo',
          },
         
          {
            title: 'Trip Date',
            data: 'newTripDate',
          },
         
        
         
  
          {
            title: 'Trip No',
            data: 'tripNo',
          },
          {
            title: 'From',
            data: 'frPlace',
          },
         
          {
            title: 'To',
            data: 'tPlace',
          },
          {
            title: 'Expected UL. Dt.',
            data: 'expectedReportingDt',
          },
          {
            title: 'LoadType',
            data: 'loadEmptyType',
          },
         
  
         {
          title: 'Driver',
          data: 'drName',
        },
        {
          title: 'TripCloseDate',
          data: 'lastTripCloseDate',
        },
        {
          title: 'TripLinkYN',
          data: 'tripLinkYN',
        },
       
      
      
        {
          title: 'Action',
          data: 'tripId',
        },
      ],
    };
  }
  //Open new gst purchase add screen
  tripsheetAdd(): void {
    this.route.navigate(['/tripsheetadd']);
  }
 
  //Open user details screen
gettripSheetDetails(tripsheet: Tripsheetmodel): void {
  this.tripSheetService.setTripSheetDetails(tripsheet);
  this.route.navigate(['/tripsheetedit']);
}

}
