import { Component } from '@angular/core';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Journalentrylistmodel  } from 'src/app/models/journalentrylistmodel';
import { Journalentrymodel } from 'src/app/models/journalentrymodel';

import {JournalEntryService } from 'src/app/services/journalentry.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-journalentrylist',
  templateUrl: './journalentrylist.component.html',
  styleUrls: ['./journalentrylist.component.css']
})


export class JournalentrylistComponent {
  dtOptions: DataTables.Settings = {};
  allJournalEntry: Journalentrylistmodel = new Journalentrylistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'doccode',
    sortOrder: 'asc',
    search: ''

}
constructor(private journalEntryService: JournalEntryService, private route: Router) {
}
  ngOnInit(): void {
   
      this.journalEntryService.clearjournalEntryDetails();
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
          this.journalEntryService.journalEntryList(this.filter)
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
getJournalEntryDetails(Docrenewal: Journalentrymodel): void {
 // this.journalEntryService.setJournalEntryDetails(Docrenewal);
  this.route.navigate(['/cashreceiptentryedit']);
  }
}




