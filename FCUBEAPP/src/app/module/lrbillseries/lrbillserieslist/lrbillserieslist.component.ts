import { Component } from '@angular/core';



import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Lrbillserieslistmodel  } from 'src/app/models/lrbillserieslistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Lrbillseriesmodel } from 'src/app/models/lrbillseriesmodel';
import { LRBillSeriesService } from 'src/app/services/lrbillseries.service';


@Component({
  selector: 'app-lrbillserieslist',
  templateUrl: './lrbillserieslist.component.html',
  styleUrls: ['./lrbillserieslist.component.css']
})
export class LrbillserieslistComponent {
  dtOptions: DataTables.Settings = {};
  allLRBillSeries: Lrbillserieslistmodel = new Lrbillserieslistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''

}
constructor(private lrbillseriesService: LRBillSeriesService, private route: Router) {
}

ngOnInit(): void {
  this.lrbillseriesService.clearLrbillSeriesDetails();
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      this.filter.search = dataTablesParameters.search.value;
      this.lrbillseriesService.getLrbillseriesList(this.filter)
        .subscribe(resp => {
         this.allLRBillSeries = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [
      

      {
        title: 'SeriesCode ',
        data: 'seriesCode',
      },

     {
      title: 'Lr_Bill_Type',
      data: 'lr_Bill_type',
    },
   
  
  
    {
      title: 'Action',
      data: 'seriesId',
    },
  ],
};
}
//Open new destination add screen
addLrBillSeries(): void {
this.route.navigate(['/addlrbillseries']);
}


//Open user details screen
getLrBillSeriesDetails(Destination: Lrbillseriesmodel): void {
this.lrbillseriesService.setLrBillSeriesDetails(Destination);
this.route.navigate(['/lrbillseriesedit']);
}

}


