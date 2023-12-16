import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Drivermasterlistmodel  } from 'src/app/models/drivermasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Drivermodel } from 'src/app/models/drivermodel';
import {  DrivermasterService } from 'src/app/services/drivermaster.service';


@Component({
  selector: 'app-drivermasterlist',
  templateUrl: './drivermasterlist.component.html',
  styleUrls: ['./drivermasterlist.component.css']
})
export class DrivermasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allDriverMaster: Drivermasterlistmodel = new Drivermasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'driverName',
    sortOrder: 'asc',
    search: ''
  }

    constructor(private drivermasterService: DrivermasterService, private route: Router) {  
    }

  ngOnInit(): void {
    this.drivermasterService.clearDriverMasterDetails();
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
        this.drivermasterService.getDriverMasterList(this.filter)
          .subscribe(resp => {
          this.allDriverMaster = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []  
            });
          });
      },
      columns: [
        {
          title: 'Driver Name ',
          data: 'driverName',
        },
        {
          title: 'Father Name ',
          data: 'fatherName',
        },
        {
          title: 'DOA',
          data: 'dateOfAppoint',
        },        
        {
          title: 'License No ',
          data: 'licenseNo',
        },
        {
          title: 'Lic Valid Upto ',
          data: 'licValidUpto',
        },        
        {
          title: 'Driver Mobile ',
          data: 'driverMobile1',
        },
        {
          title: 'Intro By ',
          data: 'introBy',
        }, 
        {
        title: 'Action',
        data: 'driverMasterID',
        },

      ],
    };
  }
  
  //Open new driver master add screen
  drivermasterAdd(): void {
    this.route.navigate(['/drivermasteradd']);
  }



//Open user details screen
getDriverMasterDetails(Docrenewal: Drivermodel): void {
this.drivermasterService.setDriverMasterDetails(Docrenewal);
this.route.navigate(['/drivermasteredit']);
}

}

