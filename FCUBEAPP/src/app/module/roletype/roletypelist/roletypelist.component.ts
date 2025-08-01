import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Branchmodel } from 'src/app/models/branchmodel';
import { Roletypemodel } from 'src/app/models/roletypemodel';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Roletypelistmodel } from 'src/app/models/roletypelistmodel';
import { CommonService } from 'src/app/services/common.service';
import { RoleTypeService } from 'src/app/services/roletype.service';
import { UserService } from 'src/app/services/user.service';
import { Filtermodel } from 'src/app/models/filtermodel';

@Component({
  selector: 'app-roletypelist',
  templateUrl: './roletypelist.component.html',
  styleUrls: ['./roletypelist.component.css']
})
export class RoletypelistComponent {
  dtOptions: DataTables.Settings = {};
  allRoleTypes: Roletypelistmodel = new Roletypelistmodel();
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
dashboard: string ="";
constructor(private roleTypeService: RoleTypeService, private route: Router) {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find(((aa: { menuName: string; }) => aa.menuName === "Create Role Types"));
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }
  this.roleTypeService.clearRoletypesDetails();
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,  
    searching :false,    
        language: {
          zeroRecords: ''
        }, 
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      this.filter.search = dataTablesParameters.search.value;
      this.roleTypeService.getRoleTypeList(this.filter)
        .subscribe(resp => {
         this.allRoleTypes = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
  columns: [
  {
    title: 'Action',
    data: 'roleId',
  },
  {
    title: 'rateDesc',
    data: 'roleName',
  },

 {
  title: 'RateMethod',
  data: 'roleDesc',
},




],
};
}
addRoleType(): void {
  this.route.navigate(['/addroletype']);
}


//Open user details screen
getRoleTypesDetails(Ratetype: Roletypemodel): void {
  this.roleTypeService.setRoleTypesDetails(Ratetype);
  this.route.navigate(['/roletypeedit']);
}

}


