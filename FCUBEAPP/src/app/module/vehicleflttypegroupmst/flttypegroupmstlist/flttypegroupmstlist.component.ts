
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

import { Vehicleflttypemstlist  } from 'src/app/models/vehicleflttypemstlist';
import { Vehicleflttypemstmodel } from "src/app/models/vehicleflttypemstmodel";
import { VehicleFltTypeMasterService } from 'src/app/services/vehicleflttypemst.service';

@Component({
  selector: 'app-flttypegroupmstlist',
  templateUrl: './flttypegroupmstlist.component.html',
  styleUrls: ['./flttypegroupmstlist.component.css']
})
export class FlttypegroupmstlistComponent {
  createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false; 
    dashboard: string ="";
    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
    allFltTypes: Vehicleflttypemstlist = new Vehicleflttypemstlist ();
    filter: Filtermodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: '',
      sortOrder: 'asc',
      search: ''
    }
  
    formFilter!: FormGroup;
    constructor(private vehicleFltTypeMasterService: VehicleFltTypeMasterService, 
      private formBuilder: FormBuilder,
      private sharedService: SharedService, private route: Router) {
    }
    ngOnInit(): void {    
      this.vehicleFltTypeMasterService.clearFltTypeMasterDetails();
      var menuData = sessionStorage.getItem('menulist')?.toString();
      if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
        var privilegeData = JSON.parse(menuData);
        
        var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
        var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Fleet Vehicle Types");
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
          
      var dashboard = sessionStorage.getItem('dashboard')?.toString();
      if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
        this.dashboard = dashboard;
      }
      if(!this.viewStatus){      
        this.route.navigate([this.dashboard]);
      }
      
      this.vehicleFltTypeMasterService.getVehicleTypeFltMasterList(this.filter);
      this.formFilter = this.formBuilder.group({
        groupDesc: new FormControl(''),
       
      });
  
      this.sharedService.loading=true;
  
      this.flttypelist();
      this.sharedService.loading=false;
  
    }
    flttypelist(){
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
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.sharedService.loading = true;
        this.vehicleFltTypeMasterService.getVehicleTypeFltMasterList(this.filter).subscribe(resp => {
           
           this.allFltTypes = resp;
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
                title: 'Action',
                data: 'vehicleTypeGroupId',
              },
                  

              {
                title: 'Group Code',
                data: 'VehicleTypeGroupCode',
              },

            {
              title: 'Vehicle Type Group Name',
              data: 'vehicleTypeGroupName',
            },
             {
              title: 'Active',
              data: 'isActive',
            },


        ],
      };
    }
  
 addFltGroupType(): void {
  this.route.navigate(['/flttypemasteradd']);
}


//Open user details screen
getFltTypesDetails(Ratetype: Vehicleflttypemstmodel): void {
  this.vehicleFltTypeMasterService.setVehicleFltTypeMasterDetails(Ratetype);
  this.route.navigate(['/flttypemasteredit']);
}
    search(): void {
      this.filter.search = this.formFilter.value.groupDesc.toString().toUpperCase();
      this.sharedService.loading=true;
      this.flttypelist();
      this.sharedService.loading=false;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    }
  }
  
  


