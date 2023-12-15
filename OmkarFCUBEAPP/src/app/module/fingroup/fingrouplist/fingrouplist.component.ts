import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usermodel } from 'src/app/models/usermodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Fingroupmodel  } from 'src/app/models/fingroupmodel';
import { Fingrouplistmodel } from 'src/app/models/fingrouplistmodel';
import { FingroupService } from 'src/app/services/fingroup.service';

@Component({
  selector: 'app-fingrouplist',
  templateUrl: './fingrouplist.component.html',
  styleUrls: ['./fingrouplist.component.css']
})
export class FingrouplistComponent {

  dtOptions: DataTables.Settings = {};
  allFingrouplistTypes: Fingrouplistmodel = new Fingrouplistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'accountName',
    sortOrder: 'asc',
    search: ''
}

  constructor(private fingroupService: FingroupService, private route: Router) {
  }

  ngOnInit(): void {
    this.fingroupService.clearFingroupDetails();
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
      this.fingroupService.getfingroupList(this.filter)
        .subscribe(resp => {
         this.allFingrouplistTypes = resp;
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
          title: 'Group Name',
          data: 'groupName',
        },
        {
          title: 'Account Type',
          data: 'accountName',
        },
        {
        title: 'Sub Account Name',
        data: 'subAccountName',
        },
        {
          title: 'Action',
          data: 'accountId',
        },
      ],
    };
  }
  
  //Open new driver master add screen
  addfingroup(): void {
    this.route.navigate(['/fingroupadd']);
  }

  //Open user details screen
  getFingroupDetails(fingroup: Fingroupmodel): void {
    this.fingroupService.setFinsgroupDetails(fingroup);
    this.route.navigate(['/fingroupedit']);
  }

}
