import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Usermodel } from 'src/app/models/usermodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Finaccountmodel  } from 'src/app/models/finaccountmodel';
import { Finaccountlistmodel } from 'src/app/models/finaccountlistmodel';
import { FinsaccountmasterService } from 'src/app/services/finaccountmaster.service';


@Component({
  selector: 'app-finaccountsmasterlist',
  templateUrl: './finaccountsmasterlist.component.html',
  styleUrls:['./finaccountsmasterlist.component.css'],
})
export class FinaccountsmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allFinaccounts: Finaccountlistmodel = new Finaccountlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'accountName',
    sortOrder: 'asc',
    search: ''
}

  constructor(private finsaccountmasterService: FinsaccountmasterService, private route: Router) {
  }

  ngOnInit(): void {
    this.finsaccountmasterService.clearFinsaccountsDetails();
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
      this.finsaccountmasterService.getFinsaccountsList(this.filter)
        .subscribe(resp => {
         this.allFinaccounts = resp;
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
          title: 'Account Name',
          data: 'accountName',
        },
        {
        title: 'Ledger Name',
        data: 'ledgerName',
        },
        {
          title: 'Sub Account Name',
          data: 'subAccountName',
        },
        {
          title: 'Action',
          data: 'accountID',
        },
      ],
    };
  }
  
  //Open new driver master add screen
  addfinaccount(): void {
    this.route.navigate(['/finaccountadd']);
  }

  //Open user details screen
  getFinsaccountsDetails(finact: Finaccountmodel): void {
    this.finsaccountmasterService.setFinsaccountsDetails(finact);
    this.route.navigate(['/finaccountedit']);
  }

}

