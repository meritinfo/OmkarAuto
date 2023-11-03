import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Dieselstatementlistmodel } from 'src/app/models/dieselstatementlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Dieselstatementmodel } from 'src/app/models/dieselstatementmodel';
import { DieselstatementService } from 'src/app/services/dieselstatement.service';


@Component({
  selector: 'app-dieselstatementlist',
  templateUrl: './dieselstatementlist.component.html',
  styleUrls: ['./dieselstatementlist.component.css']
})
export class DieselstatementlistComponent {
  dtOptions: DataTables.Settings = {};
  allDieselStatement: Dieselstatementlistmodel = new Dieselstatementlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'doccode',
    sortOrder: 'asc',
    search: ''


}
constructor(private dieselStatementService: DieselstatementService, private route: Router) {
}
ngOnInit(): void {
  this.dieselStatementService.clearDieselStatementDetails();
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
      this.dieselStatementService.getDieselStatementList(this.filter)
        .subscribe(resp => {
          this.allDieselStatement = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [


      {
        title: 'dfVendor ',
        data: 'dfVendor',
      },

      {
        title: 'bill StmtNo ',
        data: 'billStmtNo',
      },
      {
        title: 'billStmtDate ',
        data: 'billStmtDate',
      },
      {
        title: 'fromDate ',
        data: 'fromDate'
      },
      {
        title: 'location ',
        data: 'location',
      },



      {
        title: 'Action',
        data: 'masterId',
      },

    ],
  };
}
dieselStatementAdd(): void {
  this.route.navigate(['/dieselstatementadd']);
}

//Open user details screen
getDieselStatementDetails(Docrenewal: Dieselstatementmodel): void {
  this.dieselStatementService.setDieselStatementDetails(Docrenewal);
  this.route.navigate(['/dieselstatementedit']);
}
}