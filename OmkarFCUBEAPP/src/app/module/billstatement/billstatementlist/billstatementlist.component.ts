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
  editMode = false;
  createmode = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  constructor(private billStatementService: BillstatementService, private route: Router) {
  }
  selectedBillStatement = new billstatementmodel();
  setBillStatementDetails(docrenewalmaster: billstatementmodel) {
 
    this.selectedBillStatement = docrenewalmaster;
  

}
  
  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      const privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Bill Entry (MAIN)"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
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
          title: 'Bill Station ',
          data: 'fPlace',
        },
  
        {
          title: 'Series Code ',
          data: 'seriesCode',
        },
        {
          title: 'Bill StmtNo ',
          data: 'bill_StmtNo',
        },
        {
          title: 'Bill Date ',
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