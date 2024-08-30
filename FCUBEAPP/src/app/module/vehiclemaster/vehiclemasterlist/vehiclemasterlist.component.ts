import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Vehiclefltmasterlistmodel  } from 'src/app/models/vehiclefltmasterlistmodel';
import { Vehiclefltmastermodel } from 'src/app/models/vehiclefltmastermodel';
import { VehicleFltMasterService } from 'src/app/services/vehiclefltmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-vehiclemasterlist',
  templateUrl: './vehiclemasterlist.component.html',
  styleUrls: ['./vehiclemasterlist.component.css']
})
export class VehiclemasterlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allVehicleFltMaster: Vehiclefltmasterlistmodel = new Vehiclefltmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;

  constructor(private vehicleFltMasterService: VehicleFltMasterService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService, private route: Router) {
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Vehicle Master");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    this.vehicleFltMasterService.clearVehiclefltmasterDetails();
    this.formFilter = this.formBuilder.group({
      vehicleNo: new FormControl(''),
    });

    this.sharedService.loading=true;
    this.vehicalfltmasterlist();
    this.sharedService.loading=false;
  }
  
  vehicalfltmasterlist(){
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
        this.vehicleFltMasterService.getVehicleFltMasterList(this.filter).subscribe(resp => {
          this.allVehicleFltMaster = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
     // Set column title and data field
      columns: [
        {
          title: 'vehicle No',
          data: 'vehicleNo',
        },     
        {
          title: 'Regn Date',
          data: 'regnDate',
        },
        {
          title: 'Mfr Model Name',
          data: 'mfrModelName',
        },
        {
          title: 'Make Year ',
          data: 'makeYear ',
        },
        {
          title: 'Action',
          data: 'vehicleMasterID',
        },
      ],
    };
  }
 //Open new vehicle master add screen
 vehiclemasterAdd(): void {
    this.route.navigate(['/vehiclemasteradd']);
  }

  //Open user details screen
  getvehicleFltDetails(Vehicletype: Vehiclefltmastermodel): void {
    this.vehicleFltMasterService.setVehiclefltMasterDetails(Vehicletype);
    this.route.navigate(['/vehiclemasteredit']);
  } 

  search(): void {
    this.filter.search = this.formFilter.value.vehicleNo;
    this.sharedService.loading=true;
    this.vehicalfltmasterlist();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
