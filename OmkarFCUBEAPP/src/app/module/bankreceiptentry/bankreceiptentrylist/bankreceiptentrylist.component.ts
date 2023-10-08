import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Filtermodel } from 'src/app/models/filtermodel';
import { bankreceiptentrylistmodel  } from 'src/app/models/bankreceiptentrylistmodel';
import { bankreceiptentrymodel } from 'src/app/models/bankreceiptentrymodel';

import {BankReceiptEntryService } from 'src/app/services/bankreceiptentry.service';


@Component({
  selector: 'app-bankreceiptentrylist',
  templateUrl: './bankreceiptentrylist.component.html',
  styleUrls: ['./bankreceiptentrylist.component.css']
})
export class BankreceiptentrylistComponent {
  dtOptions: DataTables.Settings = {};
  allBankReceiptEntry: bankreceiptentrylistmodel = new bankreceiptentrylistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'doccode',
    sortOrder: 'asc',
    search: ''

}
constructor(private bankReceiptEntryService: BankReceiptEntryService, private route: Router) {
}
  ngOnInit(): void {
   
      this.bankReceiptEntryService.clearBankReceiptEntryDetails();
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
          this.bankReceiptEntryService.getBankReceiptEntryList(this.filter)
            .subscribe(resp => {
             this.allBankReceiptEntry = resp;
              callback({
                recordsTotal: resp.pageMetaData.totalCount,
                recordsFiltered: resp.pageMetaData.totalCount,
                data: []
              });
            });
        },
        columns: [
          
    
          {
            title: 'DocType ',
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
  bankreceiptentryAdd(): void {
    this.route.navigate(['/addbankreceiptentry']);
  }
  
//Open user details screen
getBankReceiptEntryDetails(Docrenewal: bankreceiptentrymodel): void {
 // this.bankReceiptEntryService.setBankReceiptEntryDetails(Docrenewal);
  this.route.navigate(['/bankreceiptentryedit']);
  }
}


