
import { Component ,ViewChild } from '@angular/core';



import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';

import {Tyrepurchasemasterlistmodel } from 'src/app/models/tyrepurchasemastermodellist';
import {Transportmasterinnergridmodel } from 'src/app/models/transportmasterinnergridmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Tyrepurchasemastermodel } from 'src/app/models/tyrepurchasemastermodel';
import { TyrePurchaseMasterService } from 'src/app/services/tyrepurchasemaster.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-tyrepurchasemasterlist',
  templateUrl: './tyrepurchasemasterlist.component.html',
  styleUrls: ['./tyrepurchasemasterlist.component.css']
})
export class TyrepurchasemasterlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allTyreMaster: Tyrepurchasemasterlistmodel = new Tyrepurchasemasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''

}
createStatus = false;
editStatus = false;
deleteStatus = false;
viewStatus = false;
loginDate: string = '';
fromDate: string = '';
maxDate: string = '';
minDate: string = '';
constructor(private tyrePurchaseMasterService: TyrePurchaseMasterService, private route: Router) {
}
  
ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "New Tyre Purchase"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    
  this.tyrePurchaseMasterService.clearTyrePurchaseMasterDetails();
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
    searching :false,
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      this.filter.search = dataTablesParameters.search.value;
      this.tyrePurchaseMasterService.getTyrePurchaseMasterList(this.filter)
        .subscribe(resp => {
         this.allTyreMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [
      

     

    
    {
      title: 'purchaseDate  ',
      data: 'purchaseDate',
    },
    {
      title: 'purchaseType ',
      data: 'purchaseType',
    },
    {
      title: 'noVendor',
      data: 'noVendor',
    },
    {
      title: 'vendorId',
      data: 'vendorId',
    },
    {
      title: 'vendorName ',
      data: 'vendorName',
    },
    {
      title: 'vendorAddress',
      data: 'vendorAddress',
    },
    
   
   
   
  
  
    {
      title: 'Action',
      data: 'purchaseMasterID ',
    },
  ],
};
}
//Open new destination add screen
addTyrePurchaseMaster(): void {
  this.route.navigate(['/tyrepurchasemasteradd']);
  }
  
  
  //Open user details screen
  getTyrePurchaseMasterDetails(Destination: Tyrepurchasemastermodel): void {
  this.tyrePurchaseMasterService.setTransportMasterDetails(Destination);
  this.route.navigate(['/tyrepurchasemasteredit']);
  }
  
  }