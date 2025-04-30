
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Lhpmslabmasterlistmodel } from 'src/app/models/lhpmslabmastermodellist';
import { Lhpmslabmastermodel } from 'src/app/models/lhpmslabmastermodel';
import { LhpmSlabMasterService } from 'src/app/services/lhpmslabmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-lhpmslabmasterlist',
  templateUrl: './lhpmslabmasterlist.component.html',
  styleUrls: ['./lhpmslabmasterlist.component.css']
})
export class LhpmslabmasterlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allLhpmSlabMaster: Lhpmslabmasterlistmodel = new Lhpmslabmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Code',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private lhpmSlabMasterService: LhpmSlabMasterService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
     private route: Router) {

}
ngOnInit(): void {
    
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Lhpm Slab Master");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  this.lhpmSlabMasterService.clearLhpmSlabMasterDetails();
  this.formFilter = this.formBuilder.group({
    classDesc: new FormControl(''),
  }); 

  this.sharedService.loading = true;
  this.lhpmSlabMasterMasterList();
  this.sharedService.loading=false;   
}
lhpmSlabMasterMasterList(){
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
      this.lhpmSlabMasterService.getLhpmSlabMasterList(this.filter).subscribe(resp => {
          this.allLhpmSlabMaster = resp;
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
        title: 'Veh Code',
        data: 'vcode',
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
        title: 'Hire From',
        data: 'hireFrom',
      },
      {
        title: 'Hire To',
        data: 'hireTo',
      },
      {
        title: 'Lhpm Amt',
        data: 'lhpmAmt',
      },
      
     
     
      {
        title: 'Action',
        data: 'lhpmSlabID',
      },
    ],
  };
}

//Open new user add screen
AddLhpmslabmaster(): void {
  this.route.navigate(['/lhpmslabmasteradd']);
}

//Open user details screen
lhpmslabmasterDetails(Classification: Lhpmslabmastermodel): void {
  this.lhpmSlabMasterService.setLhpmSlabMasterDetails(Classification);
  this.route.navigate(['/lhpmslabmasteredit']);
}

search(): void {
  this.filter.search = this.formFilter.value.centreName;
  this.sharedService.loading = true;
  this.lhpmSlabMasterMasterList();
  this.sharedService.loading=false;   
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}
}

