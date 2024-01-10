import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Hrmastermodel } from 'src/app/models/hrmastermodel';
import { Roletypemodel } from 'src/app/models/roletypemodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Hrmasterlistmodel } from 'src/app/models/hrmasterlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { HrMasterService } from 'src/app/services/hrmaster.service';
import { UserService } from 'src/app/services/user.service';
import { Filtermodel } from 'src/app/models/filtermodel';

@Component({
  selector: 'app-hrmasterlist',
  templateUrl: './hrmasterlist.component.html',
  styleUrls: ['./hrmasterlist.component.css']
})
export class HrmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allHrmaster: Hrmasterlistmodel = new Hrmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''
  }
  createmode  = true;
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
constructor(private hrmasterService: HrMasterService, private route: Router) {
}
ngOnInit(): void {
this.hrmasterService.clearHrmasterDetails();
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
    this.hrmasterService.getHrMasterList(this.filter)
      .subscribe(resp => {
       this.allHrmaster = resp;
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
        title: 'HRCode',
        data: 'hrCode',
      },

     {
      title: 'Description',
      data: 'description',
    },
   
  
  
    {
      title: 'Action',
      data: 'hrId',
    },
  ],
};
}
//Open new destination add screen
addHrMaster(): void {
  this.route.navigate(['/addhrmaster']);
}


//Open user details screen
getHrMasterDetails(Ratetype: Hrmastermodel): void {
  this.hrmasterService.setHrmasterDetails(Ratetype);
  this.route.navigate(['/hrmasteredit']);
}

}

