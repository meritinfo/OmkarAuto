import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RatesMasterService } from 'src/app/services/ratesmaster.service';
import { Ratesmasterlistmodel } from 'src/app/models/ratesmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Ratesmastermodel } from 'src/app/models/ratesmastermodel';
import { Filtermodel } from 'src/app/models/filtermodel';

@Component({
  selector: 'app-ratesmasterlist',
  templateUrl: './ratesmasterlist.component.html',
  styleUrls: ['./ratesmasterlist.component.css']
})
export class RatesmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allRatesMaster: Ratesmasterlistmodel = new Ratesmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'FromPoint',
    sortOrder: 'asc',
    search: ''
  }
  constructor(private ratesMasterService: RatesMasterService, private route: Router) {


  }
  ngOnInit(): void {
    this.ratesMasterService.clearRatesMasterDetails();
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
        this.ratesMasterService.getRatesMasterList(this.filter)
          .subscribe(resp => {
            this.allRatesMaster = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Account Name',
          data: 'accountName',
        },
        {
          title: 'From Point',
          data: 'fromPoint',
        },
        {
          title: 'Valid From',
          data: 'validFrom',
        },

        {
          title: 'Valid Upto',
          data: 'validUpto',
        },
        {
          title: 'Rate Method',
          data: 'rateMethod',
        },
        {
          title: 'Action',
          data: 'masterID',
        },

      ],
    };
  }
  //Open new driver master add screen
  ratesMasterAdd(): void {
    this.route.navigate(['/addratesmaster']);
  }
  getRatesMasterDetails(Docrenewal: Ratesmastermodel): void {
    this.ratesMasterService.setRatesMasterDetails(Docrenewal);
    this.route.navigate(['/ratesmasteredit']);
  }
}