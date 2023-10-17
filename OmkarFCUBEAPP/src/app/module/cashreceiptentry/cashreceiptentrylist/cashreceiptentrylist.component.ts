import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Filtermodel } from 'src/app/models/filtermodel';
import { Cashreceiptentrylistmodel  } from 'src/app/models/cashreceiptentrylistmodel';
import { Cashreceiptentrymodel } from 'src/app/models/cashreceiptentrymodel';

import {CashReceiptEntryService } from 'src/app/services/cashreceiptentry.service';



@Component({
  selector: 'app-cashreceiptentrylist',
  templateUrl: './cashreceiptentrylist.component.html',
  styleUrls: ['./cashreceiptentrylist.component.css']
})
export class CashreceiptentrylistComponent {
  dtOptions: DataTables.Settings = {};
  allCashReceiptEntry: Cashreceiptentrylistmodel = new Cashreceiptentrylistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'doccode',
    sortOrder: 'asc',
    search: ''


}
constructor(private cashReceiptEntryService: CashReceiptEntryService, private route: Router) {
}
  ngOnInit(): void {
   
      this.cashReceiptEntryService.clearCashReceiptEntryDetails();
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
          this.cashReceiptEntryService.getCashReceiptEntryList(this.filter)
            .subscribe(resp => {
             this.allCashReceiptEntry = resp;
              callback({
                recordsTotal: resp.pageMetaData.totalCount,
                recordsFiltered: resp.pageMetaData.totalCount,
                data: []
              });
            });
        },
        columns: [
          
    
          {
            title: 'DocType',
            data: 'docType',
          },
    
         {
          title: 'DocSeries ',
          data: 'docSeries',
        },
       
       
      
      
        {
          title: 'Action',
          data: 'ftmId',
        },
       
      ],
    };
    }
  
  //Open new driver master add screen
  cashreceiptentryAdd(): void {
    this.route.navigate(['/addcashreceiptentry']);
  }
  
//Open user details screen
getCashReceiptEntryDetails(Docrenewal: Cashreceiptentrymodel): void {
  this.cashReceiptEntryService.setCashReceiptEntryDetails(Docrenewal);
  this.route.navigate(['/cashreceiptentryedit']);
  }
}
