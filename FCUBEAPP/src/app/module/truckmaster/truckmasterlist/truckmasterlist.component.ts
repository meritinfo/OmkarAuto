import { Component ,ViewChild } from '@angular/core';



import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Truckmasterlistmodel  } from 'src/app/models/truckmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Truckmastermodel } from 'src/app/models/truckmastermodel';
import { TruckMasterService } from 'src/app/services/truckmaster.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-truckmasterlist',
  templateUrl: './truckmasterlist.component.html',
  styleUrls: ['./truckmasterlist.component.css']
})
export class TruckmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allTruckMaster: Truckmasterlistmodel = new Truckmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''

}
editMode = false;
  createStatus = false;
  editStatus = false;
  createmode= true;
  deleteStatus = false;
  viewStatus = false;
constructor(private truckmasterService: TruckMasterService, private route: Router) {
}

ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Market Truck Master"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    if(!this.viewStatus){      
      this.route.navigate(['/dashboard']);
    }
    
  this.truckmasterService.clearTruckMasterDetails();
  this.truckmstlist();
}
truckmstlist(){
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
      this.truckmasterService.getTruckMasterList(this.filter)
        .subscribe(resp => {
         this.allTruckMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [
      

     

     {
      title: 'Truck No ',
      data: 'truckNo',
    },
    {
      title: 'Regn Date ',
      data: 'regnDate',
    },
    {
      title: 'Owner Name ',
      data: 'ownerName',
    },
    {
      title: 'Phone No ',
      data: 'phoneNo',
    },
   
   
  
  
    {
      title: 'Action',
      data: 'truckID',
    },
  ],
};
}
//Open new destination add screen
addTruckmaster(): void {
this.route.navigate(['/addtruckmaster']);
}


//Open user details screen
getTruckMasterDetails(Destination: Truckmastermodel): void {
this.truckmasterService.setTruckMasterDetails(Destination);
this.route.navigate(['/truckmasteredit']);
}

}


