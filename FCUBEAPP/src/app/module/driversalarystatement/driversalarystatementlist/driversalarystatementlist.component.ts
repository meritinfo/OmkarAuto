import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Driversalarystatementlistmodel  } from 'src/app/models/driversalarystatementlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Trippaymentsmodel } from 'src/app/models/trippaymentsmodel';
import { Driversalarystatementmodel } from 'src/app/models/driversalarystatementmodel';
import { Driversalarydetailmodel } from 'src/app/models/driversalarydetailmodel';
import { TripPaymentsService } from 'src/app/services/trippayments.service';
import { DriversalarystatementService } from 'src/app/services/driversalarystatement.service';


@Component({
  selector: 'app-driversalarystatementlist',
  templateUrl: './driversalarystatementlist.component.html',
  styleUrls: ['./driversalarystatementlist.component.css']
})
export class DriversalarystatementlistComponent {
  dtOptions: DataTables.Settings = {};
  allDriverSalaryStatement: Driversalarystatementlistmodel = new Driversalarystatementlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'masterid',
    sortOrder: 'asc',
    search: ''


}
editMode = false;
createmode  = true;
createStatus = false;
editStatus = false;
deleteStatus = false;
viewStatus = false; 
dashboard: string ="";
constructor(private driversalarystatementService: DriversalarystatementService, private route: Router) {
}
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Driver Salary Statement"));
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }
  this.driversalarystatementService.clearDriverSalaryStatementDetails();
this.dtOptions = {
  pagingType: 'full_numbers',
  pageLength: 50,
  serverSide: true,
  processing: true,
  ajax: (dataTablesParameters: any, callback) => {
    // Filter setting
    this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
    this.filter.pageSize = dataTablesParameters.length;
    this.filter.sortColumn = 'masterid';// dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
    this.filter.sortOrder = 'desc';// dataTablesParameters.order[0].dir;
    this.filter.search = dataTablesParameters.search.value;
    this.driversalarystatementService.getDriverSalaryStatementList(this.filter)
      .subscribe(resp => {
       this.allDriverSalaryStatement = resp;
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
        title: 'Trans Date',
        data: 'transDt',
      },
      {
        title: 'From Date',
        data: 'fromDt',
      },


     {
      title: 'To Date',
      data: 'toDt',
    },
    {
      title: 'Total Salary',
      data: 'totalSalaryAmt',
    },
    



   
  
  
    {
      title: 'Action',
      data: 'masterId',
    },
  ],
};
}

//Open new driver master add screen
driversalaryStatementAdd(): void {
  this.route.navigate(['/driversalarystatementadd']);
}
//Open user details screen
getDriverSalaryDetails(trippayments: Driversalarystatementmodel): void {
this.driversalarystatementService.setDriverSalaryDetails(trippayments);
this.route.navigate(['/driversalarystatementedit']);
}

}