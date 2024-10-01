

import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Cnorcneemasterlistmodel  } from 'src/app/models/cnorcneemasterlistmodel';
import { Cnorcneemastermodel } from 'src/app/models/cnorcneemastermodel';
import { CnorCneeMasterService } from 'src/app/services/cnorcneemaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-cnorcneemasterlist',
  templateUrl: './cnorcneemasterlist.component.html',
  styleUrls: ['./cnorcneemasterlist.component.css']
})

export class CnorcneemasterlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

    allCnorcneeMaster: Cnorcneemasterlistmodel = new Cnorcneemasterlistmodel();
    filter: Filtermodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'doccode',
      sortOrder: 'asc',
      search: ''
  } 
  
  formFilter!: FormGroup;

  constructor(private cnorCneeMasterService: CnorCneeMasterService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
    private route: Router) {

}
ngOnInit(): void {

  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Consignor/Consignee Search");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  this.cnorCneeMasterService.clearCnorcneeMasterModelDetails();
  this.formFilter = this.formBuilder.group({
    docDescription: new FormControl(''),
  });

  this.sharedService.loading=true;
  this.cnorcneeMasterList();
  this.sharedService.loading=false;
}
cnorcneeMasterList(){
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 50,
    serverSide: true,
    processing: true,
    searching:false,
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      // this.filter.search = dataTablesParameters.search.value;
      callback({
        recordsTotal: 0,
        recordsFiltered: 0,
        data: []
      });
      this.cnorCneeMasterService.getCnorCneeMasterList(this.filter).subscribe(resp => {
        this.allCnorcneeMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [   
      {
        title: 'Cnor Cnee Name',
        data: 'cnorCneeName',
      },
      {
        title: 'Print Name',
        data: 'printName',
      },
      {
        title: 'Address 1',
        data: 'address1',
      },
      {
        title: 'Address 2',
        data: 'address2',
      },
      {
        title: 'Phone',
        data: 'phone',
      },
      {
        title: 'Email',
        data: 'email',
      },

      {
        title: 'Action',
        data: 'cnorCneeID',
      },   
    ],
  };
}

//Open new destination add screen
addCneeMastermaster(): void {
  this.route.navigate(['/cnorcneemasteradd']);
}


//Open user details screen
getCneeMasterDetails(Docrenewal: Cnorcneemastermodel): void {
  this.cnorCneeMasterService.setCnorcneeMasterModelDetails(Docrenewal);
  this.route.navigate(['/cnorcneemasteredit']);
}


search(): void {
  this.filter.search = this.formFilter.value.docDescription;
  this.sharedService.loading=true;
  this.cnorcneeMasterList();
  this.sharedService.loading=false;
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}

}




