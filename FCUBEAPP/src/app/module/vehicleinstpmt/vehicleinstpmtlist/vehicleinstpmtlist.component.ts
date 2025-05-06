
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Vehicleinstpmtlistmodel } from 'src/app/models/vehicleinstpmtlistmodel';
import { Vehicleinstpmtmodel } from 'src/app/models/vehicleinstpmtmodel';
import { VehicleInstPmtService } from 'src/app/services/vehicleinstpmt.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';



@Component({
  selector: 'app-vehicleinstpmtlist',
  templateUrl: './vehicleinstpmtlist.component.html',
  styleUrls: ['./vehicleinstpmtlist.component.css']
})
export class VehicleinstpmtlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allInstPmtMaster: Vehicleinstpmtlistmodel = new Vehicleinstpmtlistmodel();

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
dashboard: string ="";
constructor(private vehicleInstaService: VehicleInstPmtService, private route: Router) {
}


ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Vehicle EMI Payment"));
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
        if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
          this.dashboard = dashboard;
        }
        if(!this.viewStatus){      
          this.route.navigate([this.dashboard]);
        }
    
  this.vehicleInstaService.clearVehicleInstPmtDetails();
  this.vehicleInstList();
}
vehicleInstList(){
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
     // this.vehicleInstPmtService.getTruckMasterList(this.filter)
      this.vehicleInstaService.getVehicleInstPmtList(this.filter)
        .subscribe(resp => {
         this.allInstPmtMaster = resp;
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
        data: 'pmtId',
      },
     
      {
        title: 'Pmt Date',
        data: 'pmtDate',
      },
     
      {
        title: 'Branch',
        data: 'branch',
      },
      {
        title: 'Vehicle No',
        data: 'vehicleNo',
      },
      {
        title: 'Inst No',
        data: 'instNo',
      },
      // {
      //   title: 'InstId',
      //   data: 'instId',
      // },
      {
        title: 'Advance Payable',
        data: 'managerMobileNo',
      },   
      {
        title: 'Pri Amt',
        data: 'priAmt',
      },  
      {
        title: 'Int Amt',
        data: 'intAmt',
      }, 
      {
        title: 'Total Amt',
        data: 'totAmt',
      }, 
       {
         title: 'Remarks',
         data: 'remarks',
       }, 
      // {
      //   title: 'pmtType',
      //   data: 'pmtType',
      // }, 
      // {
      //   title: 'neftYN',
      //   data: 'neftYN',
      // }, 
      // {
      //   title: 'cheqNo',
      //   data: 'cheqNo',
      // }, 
      // {
      //   title: 'cheqDate',
      //   data: 'cheqDate',
      // }, 
      // {
      //   title: 'creditAc',
      //   data: 'creditAc',
      // }, 
      // {
      //   title: 'findocid',
      //   data: 'findocid',
      // }, 
     

  ],
};
}
//Open new user add screen
AddVehicleInstmaster(): void {
  this.route.navigate(['/vehicleinstpmtadd']);
}

//Open user details screen
vehicleInstDetails(Branch: Vehicleinstpmtmodel): void {
  this.vehicleInstaService.setVehicleInstPmtDetails(Branch);
  this.route.navigate(['/vehicleinstpmtedit']);
}

   }

