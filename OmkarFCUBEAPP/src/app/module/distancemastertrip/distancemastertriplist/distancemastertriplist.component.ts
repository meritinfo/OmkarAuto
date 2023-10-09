import { Component } from '@angular/core';
import { Router } from '@angular/router';



import { Filtermodel } from 'src/app/models/filtermodel';
import { Distancemastertriplistmodel } from 'src/app/models/distancemastertriplistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Distancemastertripmodel } from 'src/app/models/distancemastertripmodel';
import{ DistancemastertripService } from 'src/app/services/distancemastertrip.service';

@Component({
  selector: 'app-distancemastertriplist',
  templateUrl: './distancemastertriplist.component.html',
  styleUrls: ['./distancemastertriplist.component.css']
})
export class DistancemastertriplistComponent {
  dtOptions: DataTables.Settings = {};
  allDistanceTripMaster: Distancemastertriplistmodel = new Distancemastertriplistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'doccode',
    sortOrder: 'asc',
    search: ''
  }

constructor(private distanceMastertripService: DistancemastertripService, private route: Router)  {


  }

  ngOnInit(): void {
    this.distanceMastertripService.clearDistanceMasterTripDetails();
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
        this.distanceMastertripService.getDistanceMasterTripList(this.filter)
          .subscribe(resp => {
           this.allDistanceTripMaster = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        
  
        {
          title: 'ValidFrom ',
          data: 'validFrom',
        },
  
       {
        title: 'ValidUpto ',
        data: 'validUpto',
      },
     
     
    
    
      {
        title: 'Action',
        data: 'MasterID',
      },
     
    ],
  };
  }
  //Open new destination add screen
  
  
  
  //Open user details screen
  
  //Open user details screen
getDistanceMasterTripDetails(Docrenewal: Distancemastertripmodel): void {
  this.distanceMastertripService.setDistancemastertripDetails(Docrenewal);
  this.route.navigate(['/docrenewalmasteredit']);
  }
  
  
  
    
    //Open new driver master add screen
    distanceMasterTripAdd(): void {
      this.route.navigate(['/distancemastertripadd']);
    }
  }
  
  

