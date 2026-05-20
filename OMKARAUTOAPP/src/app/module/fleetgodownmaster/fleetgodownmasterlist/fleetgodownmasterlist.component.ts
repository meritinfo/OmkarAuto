import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { fleetgodownmasterlistmodel } from 'src/app/models/fleetgodownmasterlistmodel';
import { Fleetgodownmastermodel } from 'src/app/models/fleetgodownmastermodel';
import { FleetgodownmasterService } from 'src/app/services/fleetgodownmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-fleetgodownmasterlist',
  templateUrl: './fleetgodownmasterlist.component.html',
  styleUrls: ['./fleetgodownmasterlist.component.css']
})

export class FleetgodownmasterlistComponent {
  createStatus  = false;
  editStatus    = false;
  deleteStatus  = false;
  viewStatus    = false; 
  dashboard     : string ="";
  
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allfleetgodownmasterlistmodel: fleetgodownmasterlistmodel = new fleetgodownmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize  : 10,
    sortColumn: 'Code',
    sortOrder : 'asc',
    search    : ''
  }
  
  formFilter!: FormGroup;
    constructor( 
      private FleetgodownmasterService: FleetgodownmasterService,
      private formBuilder: FormBuilder,
      private sharedService: SharedService,
      private route: Router 
    ) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
      if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
        var privilegeData = JSON.parse(menuData);
        var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
        var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Fleet Godown Master");
      if (privilegeStatus) 
        {
          this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
          this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
          this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
          this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
        }
      }
      var dashboard = sessionStorage.getItem('dashboard')?.toString();
      if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') 
      {
        this.dashboard = dashboard;
      }
      if(!this.viewStatus){      
        this.route.navigate([this.dashboard]);
      }
      this.FleetgodownmasterService.clearFleetgodownmasterDetails();
      this.formFilter = this.formBuilder.group({
      godownDesc: new FormControl(''),
    }); 
    this.sharedService.loading = true;
    this.getFleetGodownMaserList();
    this.sharedService.loading=false;   
  }

  getFleetGodownMaserList(){
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
            this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
            this.filter.pageSize = dataTablesParameters.length;
            this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
            this.filter.sortOrder = dataTablesParameters.order[0].dir;
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
            this.FleetgodownmasterService.getFleetGodownMaserList(this.filter)
              .subscribe(resp => {
                this.allfleetgodownmasterlistmodel = resp;
                callback({
                  recordsTotal: resp.pageMetaData.totalCount,
                  recordsFiltered: resp.pageMetaData.totalCount,
                  data: []
                });
              });
            this.sharedService.loading = false;
          },
          columns: [
          {
            title: 'Action',
            data: 'godownId',
          },
        {
          title: 'Short Code',
          data: 'godownShortCode',
        },
           
        {
          title: 'Description',
          data: 'godownDesc',
        },
        {
          title: 'Is Active',
          data: 'isActive',
        },
      ],
    };
  }
      
  addGoDownMaster(): void {
    this.route.navigate(['/fltgodownlistadd']);
  }
      
  goDownMasterEditDetails(godown: Fleetgodownmastermodel): void {
    this.FleetgodownmasterService.setGoDownMasterDetails(godown);
    this.route.navigate(['/fltgodownlistedit']);
  }
    
  search(): void {
    this.filter.search = this.formFilter.value.godownDesc;
    this.sharedService.loading = true;
    this.getFleetGodownMaserList();
    this.sharedService.loading=false;   
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
    });
  }

}
