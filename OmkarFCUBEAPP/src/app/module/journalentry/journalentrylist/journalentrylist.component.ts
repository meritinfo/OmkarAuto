import { Component } from '@angular/core';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Journalentrylistmodel  } from 'src/app/models/journalentrylistmodel';
import { Journalentrymodel } from 'src/app/models/journalentrymodel';

import {BankCashContraService } from 'src/app/services/bankcashcontra.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-journalentrylist',
  templateUrl: './journalentrylist.component.html',
  styleUrls: ['./journalentrylist.component.css']
})


export class JournalentrylistComponent {
  dtOptions: DataTables.Settings = {};
  allBankCashcontra: Journalentrylistmodel = new Journalentrylistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'doccode',
    sortOrder: 'asc',
    search: ''

}
constructor(private bankcashcontraService: BankCashContraService, private route: Router) {
}
  ngOnInit(): void {
   
      this.bankcashcontraService.clearBankCashContraDetails();
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
          this.bankcashcontraService.bankCashContraEntryList(this.filter)
            .subscribe(resp => {
           //  this.allBankCashcontra = resp;
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
  JournalEntryAdd(): void {
    this.route.navigate(['/addjournalentry']);
  }
  
  
//Open user details screen
//getBankReceiptEntryDetails(Docrenewal: bankreceiptentrymodel): void {
 // this.bankReceiptEntryService.setBankReceiptEntryDetails(Docrenewal);
  //this.route.navigate(['/cashreceiptentryedit']);
 // }
}




