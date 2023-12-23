import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Billstatementlistmodel } from 'src/app/models/billstatementlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { billstatementmodel } from 'src/app/models/billstatementmodel';
import { BillstatementService } from 'src/app/services/billstatement.service';

@Component({
  selector: 'app-billstatementlist',
  templateUrl: './billstatementlist.component.html',
  styleUrls: ['./billstatementlist.component.css']
})
export class BillstatementlistComponent {
  dtOptions: DataTables.Settings = {};
  allBillStatement: Billstatementlistmodel = new Billstatementlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'doccode',
    sortOrder: 'asc',
    search: ''

  }
  constructor(private billStatementService: BillstatementService, private route: Router) {
  }
  selectedBillStatement = new billstatementmodel();
  setBillStatementDetails(docrenewalmaster: billstatementmodel) {
 
    this.selectedBillStatement = docrenewalmaster;
  

}
  
  ngOnInit(): void {
    this.billStatementService.clearBillStatementDetails();
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
        this.billStatementService.getBillStatementList(this.filter)
          .subscribe(resp => {
            this.allBillStatement = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
  
  
        {
          title: 'BillStation ',
          data: 'fPlace',
        },
  
        {
          title: 'SeriesCode ',
          data: 'seriesCode',
        },
        {
          title: 'Bill_StmtNo ',
          data: 'bill_StmtNo',
        },
        {
          title: 'BillDate ',
          data: 'billDate'
        },
       
  
  
  
        {
          title: 'Action',
          data: 'masterId',
        },
  
      ],
    };
  }
  billStatementAdd(): void {
    this.route.navigate(['/billstatementadd']);
  }
  
  //Open user details screen
  getBillStatementDetails(Docrenewal: billstatementmodel): void {
    this.billStatementService.setBillStatementDetails(Docrenewal);
    this.route.navigate(['/billstatementedit']);
  }
  }