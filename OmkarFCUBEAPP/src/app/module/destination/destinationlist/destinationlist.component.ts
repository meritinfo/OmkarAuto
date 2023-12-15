
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Destinationlistmodel } from 'src/app/models/destinationlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { DestinationService } from 'src/app/services/destination.service';

@Component({
  selector: 'app-destinationlist',
  templateUrl: './destinationlist.component.html',
  styleUrls: ['./destinationlist.component.css']
})
export class DestinationlistComponent {
  dtOptions: DataTables.Settings = {};
  allDestination: Destinationlistmodel = new Destinationlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'centreName',
    sortOrder: 'asc',
    search: ''
  }

  constructor(private destinationService: DestinationService, private route: Router) {
  }

  ngOnInit(): void {
    this.destinationService.clearDestinationDetails();
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
        this.destinationService.getDestinationList(this.filter)
          .subscribe(resp => {
            this.allDestination = resp;
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
          title: 'Centre Name',
          data: 'centreName',
        },
       
        // {
        //   title: 'State Code',
        //   data: 'stateCode',
        // },
        // {
        //   title: 'Code',
        //   data: 'code',
        // },
       
        {
          title: 'StateName',
          data: 'stateName',
        },
        {
          title: 'Control Branch',
           data: 'controlBranch',
        },
        {
          title: 'Action',
          data: 'centreId',
        },
      ],
    };
  }
  //Open new destination add screen
  adddestination(): void {
    this.route.navigate(['/adddestination']);
  }


  //Open user details screen
  destinationDetails(Destination: Destinationmodel): void {
    this.destinationService.setDestinationDetails(Destination);
    this.route.navigate(['/destinationedit']);
  }

}

