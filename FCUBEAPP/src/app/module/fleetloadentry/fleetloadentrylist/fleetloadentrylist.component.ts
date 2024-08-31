

import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Fleetloadentrylistmodel } from 'src/app/models/fleetloadentrylistmodel';
import { Fleetloadentrymodel } from 'src/app/models/fleetloadentrymodel';
import { FleetLoadEntryService } from 'src/app/services/fleetloadentry.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-fleetloadentrylist',
  templateUrl: './fleetloadentrylist.component.html',
  styleUrls: ['./fleetloadentrylist.component.css']
})
export class FleetloadentrylistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allFleetLoadMaster: Fleetloadentrylistmodel = new Fleetloadentrylistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Code',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private fleetLoadEntryService: FleetLoadEntryService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
     private route: Router) {
     }
      ngOnInit(): void {
    
        var menuData = sessionStorage.getItem('menulist')?.toString();
        if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
          var privilegeData = JSON.parse(menuData);
          var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
          var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
          .find((aa: { menuName: string; }) => aa.menuName === "Fleet Load Entry");
          if (privilegeStatus) {
            this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
            this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
            this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
            this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
          }
        }
      
        this.fleetLoadEntryService.clearFleetLoadEntryDetails();
        this.formFilter = this.formBuilder.group({
          classDesc: new FormControl(''),
        }); 
      
        this.sharedService.loading = true;
        this.fleetLoadEntryList();
        this.sharedService.loading=false;   
      }
      fleetLoadEntryList(){
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 50,
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
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
            this.fleetLoadEntryService.getFleetLoadEntryList(this.filter).subscribe(resp => {
                this.allFleetLoadMaster = resp;
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
              title: 'Load Branch',
              data: 'tripBrName',
            },
            {
              title: 'LoadDate',
              data: 'loadDate',
            },
            {
              title: 'Load Type',
              data: 'loadType',
            },
            {
              title: 'Vehicle No',
              data: 'vehicleNo',
            },
            {
              title: 'LoadFor',
              data: 'loadFor',
            },
           
            {
              title: 'LoadMemoNo',
              data: 'loadMemoNo',
            },
            {
              title: 'LoadingFrom',
              data: 'loadingFrom',
            },
            {
              title: 'ConsignorName',
              data: 'consignorName',
            },
            {
              title: 'ConsignorAdd',
              data: 'consignorAdd',
            },
            {
              title: 'LoadingTo',
              data: 'loadingTo',
            },
            {
              title: 'ConsigneeName',
              data: 'consigneeName',
            },
            {
              title: 'ConsigneeAdd',
              data: 'consigneeAdd',
            },
            {
              title: 'Product',
              data: 'productId',
            },
            {
              title: 'QtyWt',
              data: 'qtyWt',
            },
            {
              title: 'qtyPkgs',
              data: 'qtyPkgs',
            },
            {
              title: 'RatePerTon',
              data: 'ratePerTon',
            },
            {
              title: 'HireAmt',
              data: 'hireAmt',
            },
            {
              title: 'AdvAmt',
              data: 'advAmt',
            },
            {
              title: 'Remarks',
              data: 'remarks',
            },
            {
              title: 'TripAdjYN',
              data: 'tripAdjYN',
            },
          
           
           
           
            {
              title: 'Action',
              data: 'loadId',
            },
          ],
        };
      }
       //Open new user add screen
       AddFleetLoadEntry(): void {
        this.route.navigate(['/fleetloadentryadd']);
      }
      
      //Open user details screen
      fleetLoadEntryDetails(Classification: Fleetloadentrymodel): void {
        this.fleetLoadEntryService.setFleetLoadEntryDetails(Classification);
        this.route.navigate(['/fleetloadentryedit']);
      }
      
      
      }