
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Spareslubesmasterlistmodel } from 'src/app/models/spareslubesmasterlistmodel';
import {Tyremodelmastermodel } from 'src/app/models/tyremodelmastermodel';
import {Tyremodelmasterlistmodel } from 'src/app/models/tyremodelmasterlist';
import { TyreModelMasterService } from 'src/app/services/tyremodelmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-tyremodellist',
  templateUrl: './tyremodellist.component.html',
  styleUrls: ['./tyremodellist.component.css']
})
export class TyremodellistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allTyreMaster: Tyremodelmasterlistmodel = new Tyremodelmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Code',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private tyremasterService: TyreModelMasterService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
     private route: Router) {


}
ngOnInit(): void {
    
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Tyre Model Master");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  this.tyremasterService.clearTyreModelMasterDetails();
  this.formFilter = this.formBuilder.group({
    classDesc: new FormControl(''),
  }); 

  this.sharedService.loading = true;
  this.tyreModelMasterList();
  this.sharedService.loading=false;   
}
tyreModelMasterList(){
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,
    searching: false,     
        language: {
          zeroRecords: ''
        }, 
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      // this.filter.search = '';
      callback({
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      });
      this.tyremasterService.getTyreModelMasterList(this.filter).subscribe(resp => {
          this.allTyreMaster = resp;
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
        title: 'Model Desc',
        data: 'modelDesc',
      },
      {
        title: 'ActiveYN',
        data: 'activeYN',
      },
     
     
      {
        title: 'Action',
        data: 'tyreModID',
      },
    ],
  };
}
 //Open new user add screen
 AddTyreModelMaster(): void {
  this.route.navigate(['/tyremodelmasteradd']);
}

//Open user details screen
tyreModelMasterDetails(Classification: Tyremodelmastermodel): void {
  this.tyremasterService.setTyreModelMasterDetails(Classification);
  this.route.navigate(['/tyremodelmasteredit']);
}


}
