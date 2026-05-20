import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Fleetgroupmastermodel  } from 'src/app/models/fleetgroupmastermodel';
import { Fleetgroupmasterlist } from 'src/app/models/fleetgroupmasterlist';
import { FleetgroupmasterService } from 'src/app/services/fleetgroupmaster.service';

@Component({
  selector: 'app-fleetgroupmasterlist',
  templateUrl: './fleetgroupmasterlist.component.html',
  styleUrls: ['./fleetgroupmasterlist.component.css']
})
export class FleetgroupmasterlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allFleetGroupMaster: Fleetgroupmasterlist = new Fleetgroupmasterlist();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: '',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private fleetgroupmasterService: FleetgroupmasterService, 
    private formBuilder: FormBuilder,
    private sharedService: SharedService, private route: Router) {
  }

  ngOnInit(): void {    
    this.fleetgroupmasterService.clearFleetGroupMaster();
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Fleet Group Master");
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
    
    this.fleetgroupmasterService.getFleetGroupMasterList(this.filter);
    this.formFilter = this.formBuilder.group({
      groupDesc: new FormControl(''),
     
    });

    this.sharedService.loading=true;

    this.fleetgroupmasterlist();
    this.sharedService.loading=false;

  }
  fleetgroupmasterlist(){
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
      this.fleetgroupmasterService.getFleetGroupMasterList(this.filter).subscribe(resp => {
         
         this.allFleetGroupMaster = resp;
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
          data: 'GroupId',
        },
        {
          title: 'Group Description',
          data: 'GroupDesc',
        },
        {
        title: 'Is Active',
        data: 'IsActive',
        },
      ],
    };
  }

  //Open user details screen
  getFleetGroupMasterDetailsDetails(finact: Fleetgroupmastermodel): void {
    this.fleetgroupmasterService. fleetGroupmasterDetails(finact);
    this.route.navigate(['/fleetgroupedit']);
  }

    //Open new driver master add screen
  fleetGroupMasterAdd(): void {
    this.route.navigate(['/fleetgroupadd']);
  }

  search(): void {
    this.filter.search = this.formFilter.value.groupDesc.toString().toUpperCase();
    this.sharedService.loading=true;
    this.fleetgroupmasterlist();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
