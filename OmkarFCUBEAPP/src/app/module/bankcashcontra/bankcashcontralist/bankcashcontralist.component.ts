import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Filtermodel } from 'src/app/models/filtermodel';
import { Bankcashcontralistmodel  } from 'src/app/models/bankcashcontralistmodel';
import { bankreceiptentrymodel } from 'src/app/models/bankreceiptentrymodel';

import {BankCashContraService } from 'src/app/services/bankcashcontra.service';

@Component({
  selector: 'app-bankcashcontralist',
  templateUrl: './bankcashcontralist.component.html',
  styleUrls: ['./bankcashcontralist.component.css']
})

export class BankcashcontralistComponent {
  dtOptions: DataTables.Settings = {};
  allBankCashcontra: Bankcashcontralistmodel = new Bankcashcontralistmodel();
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
  bankCashContraAdd(): void {
    this.route.navigate(['/addbankcashcontra']);
  }
  
//Open user details screen
//getBankReceiptEntryDetails(Docrenewal: bankreceiptentrymodel): void {
 // this.bankReceiptEntryService.setBankReceiptEntryDetails(Docrenewal);
  //this.route.navigate(['/cashreceiptentryedit']);
 // }
}



