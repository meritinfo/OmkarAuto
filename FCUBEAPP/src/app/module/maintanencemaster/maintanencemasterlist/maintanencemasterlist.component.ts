
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import {Maintanencemasterlistmodel } from 'src/app/models/maintanencemasterlistmodel';
import { Maintanencemastermodel } from 'src/app/models/maintanencemastermodel';
import {MaintanenceMasterService } from 'src/app/services/maintanencemaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-maintanencemasterlist',
  templateUrl: './maintanencemasterlist.component.html',
  styleUrls: ['./maintanencemasterlist.component.css']
})
export class MaintanencemasterlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allMaintanenceMaster: Maintanencemasterlistmodel = new Maintanencemasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Code',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private maintanenceMasterService: MaintanenceMasterService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
     private route: Router) {


}
ngOnInit(): void {
    
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Maintenance Type Master");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  this.maintanenceMasterService.clearMaintanenceMasterDetails();
  this.formFilter = this.formBuilder.group({
    classDesc: new FormControl(''),
  }); 

  this.sharedService.loading = true;
  this.maintanenceMasterList();
  this.sharedService.loading=false;   
}
maintanenceMasterList(){
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
    searching: false,
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      // this.filter.search = '';
      this.maintanenceMasterService.getmaintanenceMasterList(this.filter)
        .subscribe(resp => {
          this.allMaintanenceMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
        this.sharedService.loading = false;
    },
    // Set column title and data field
    columns: [
     
     
      {
        title: 'Maintenance Desc',
        data: 'maintenanceDesc',
      },
      {
        title: 'Maint Type',
        data: 'maintType',
      },
      
      
     
      {
        title: 'Is Active',
        data: 'isActive',
      },
     
      {
        title: 'Action',
        data: 'maintId',
      },
    ],
  };
}
//Open new user add screen
AddMaintanenceMaster(): void {
  this.route.navigate(['/maintanencemasteradd']);
}

//Open user details screen
maintanenceMasterDetails(Classification: Maintanencemastermodel): void {
  this.maintanenceMasterService.setMaintanenceMasterDetails(Classification);
  this.route.navigate(['/maintanencemasteredit']);
}


}
