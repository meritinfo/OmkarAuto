import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Branchmasterlistmodel } from 'src/app/models/branchmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Branchmodel } from 'src/app/models/branchmodel';
import { BranchMasterService } from 'src/app/services/branchmaster.service';

@Component({
  selector: 'app-branchmasterlist',
  templateUrl: './branchmasterlist.component.html',
  styleUrls: ['./branchmasterlist.component.css']
})
export class BranchmasterlistComponent  {
  dtOptions: DataTables.Settings = {};
  allBranchMaster: Branchmasterlistmodel = new Branchmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'username',
    sortOrder: 'asc',
    search: ''
  }

  constructor(private branchmasterService: BranchMasterService, private route: Router) {
  }

  ngOnInit(): void {
    this.branchmasterService.clearBranchMasterDetails();
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
        this.branchmasterService.getBranchMasterList(this.filter)
          .subscribe(resp => {
            this.allBranchMaster = resp;
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
          title: 'Code',
          data: 'code',
        },
       
        {
          title: 'CentreName',
          data: 'centreName',
        },
        {
          title: 'ZoneCode',
          data: 'zoneCode',
        },
        {
          title: 'StateCode',
          data: 'stateCode',
        },
        {
          title: 'ManagerName',
          data: 'managerName',
        },
        {
          title: 'ManagerMobileNo',
          data: 'managerMobileNo',
        },
          
        {
          title: 'RegionId',
          data: 'regionId',
        },
      
      
        {
          title: 'Action',
          data: 'centreId',
        },
      ],
    };
  }
  
  //Open new user add screen
  Addbranchmaster(): void {
    this.route.navigate(['/addbranchmaster']);
  }
  
//Open user details screen
branchmasterDetails(Branch: Branchmodel): void {
  this.branchmasterService.setBranchMasterDetails(Branch);
  this.route.navigate(['/branchmasteredit']);
}

}

