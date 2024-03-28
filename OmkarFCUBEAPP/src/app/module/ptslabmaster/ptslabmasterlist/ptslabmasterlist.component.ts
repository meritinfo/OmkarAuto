import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Ptslabmastermodel } from 'src/app/models/ptslabmastermodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Ptslabmasterlistmodel } from 'src/app/models/ptslabmasterlistmodel';
import { CommonService } from 'src/app/services/common.service';
import { PtSlabMasterService } from 'src/app/services/ptslabmaster.service';
import { UserService } from 'src/app/services/user.service';
import { Filtermodel } from 'src/app/models/filtermodel';


@Component({
  selector: 'app-ptslabmasterlist',
  templateUrl: './ptslabmasterlist.component.html',
  styleUrls: ['./ptslabmasterlist.component.css']
})
export class PtslabmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allPtSlab: Ptslabmasterlistmodel = new Ptslabmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''


}
editMode = false;
createmode  = true;
createStatus = false;
editStatus = false;
deleteStatus = false;
viewStatus = false;
constructor(private ptSlabMasterService: PtSlabMasterService, private route: Router) {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName ===  "Prof. Tax Slab Master");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }
  this.ptSlabMasterService.clearPtSlabMasterDetails();
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
      this.ptSlabMasterService.getPtSlabMasterList(this.filter)
        .subscribe(resp => {
         this.allPtSlab = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },

    columns: [   
      {
        title: 'State',
        data: 'stateCode',
      },
      {
        title: 'Range From',
        data: 'rangeFrom',
      },
      {
        title: 'Action',
        data: 'ptId',
      },
    ],
  };
}

addPtSlabMaster(): void {
  this.route.navigate(['/addptslabmaster']);
}


//Open user details screen
getPtSlabMasterDetails(Ratetype: Ptslabmastermodel): void {
  this.ptSlabMasterService.setPtSlabMasterDetails(Ratetype);
  this.route.navigate(['/ptslabmasteredit']);
}

}



