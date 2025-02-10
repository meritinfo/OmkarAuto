import { Component ,ViewChild} from '@angular/core';

import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Brandmasterlistmodel  } from 'src/app/models/brandmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Brandmastermodel } from 'src/app/models/brandmastermodel';
import { BrandMasterService } from 'src/app/services/brandmaster.service';


@Component({
  selector: 'app-brandmasterlist',
  templateUrl: './brandmasterlist.component.html',
  styleUrls: ['./brandmasterlist.component.css']
})
export class BrandmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allBrandMaster: Brandmasterlistmodel = new Brandmasterlistmodel();
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''

}
constructor(private brandmasterService: BrandMasterService, private route: Router) {
}

ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((( aa: { menuName: string; }) => aa.menuName === "Brand Master"));
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }
  
  var yearIDData = sessionStorage.getItem('yearID')?.toString();
  if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
    this.year = yearIDData;
  }
  var loginDate = sessionStorage.getItem('loginDate')?.toString();
  if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
    this.loginDate = loginDate;
  }
  this.brandmasterService.clearBrandMasterDetails();
  this.brandMasterList();
}
brandMasterList(){
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
      this.filter.search = dataTablesParameters.search.value;
      this.brandmasterService.getBrandMasterList(this.filter)
        .subscribe(resp => {
         this.allBrandMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [
      

      {
        title: 'Brand Name',
        data: 'brandName',
      },

     {
      title: 'Brand Type',
      data: 'brandType',
    },
   
  
  
    {
      title: 'Action',
      data: 'brandID',
    },
  ],
};
}
//Open new destination add screen
addBrandmaster(): void {
this.route.navigate(['/addbrandmaster']);
}


//Open user details screen
getBrandMasterDetails(Destination: Brandmastermodel): void {
this.brandmasterService.setBrandMasterDetails(Destination);
this.route.navigate(['/brandmasteredit']);
}

}

