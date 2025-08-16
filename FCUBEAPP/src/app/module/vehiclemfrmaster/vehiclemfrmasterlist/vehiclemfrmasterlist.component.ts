import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Vehiclemfrmastermodel  } from 'src/app/models/vehiclemfrmastermodel';
import { Vehiclemfrmasterlist } from 'src/app/models/vehiclemfrmasterlist';
import { VehiclemfrmasterService } from 'src/app/services/vehiclemfrmaster.service';

@Component({
  selector: 'app-vehiclemfrmasterlist',
  templateUrl: './vehiclemfrmasterlist.component.html',
  styleUrls: ['./vehiclemfrmasterlist.component.css']
})
export class VehiclemfrmasterlistComponent {


  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  allVehicleMfrMasterList: Vehiclemfrmasterlist = new Vehiclemfrmasterlist();

  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: '',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private vehiclemfrmasterService: VehiclemfrmasterService, 
    private formBuilder: FormBuilder,
    private sharedService: SharedService, private route: Router) {
  }

  ngOnInit(): void {    
    this.vehiclemfrmasterService.clearVehicleMfrMaster();
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Vehicle Mfr Master");
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
    
    this.vehiclemfrmasterService.getVehicleMfrMasterList(this.filter);
    this.formFilter = this.formBuilder.group({
      vehMrfName: new FormControl(''),
     
    });

    this.sharedService.loading=true;

    this.getVehicleFinCompMasterList();
    this.sharedService.loading=false;

  }
  getVehicleFinCompMasterList(){
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
      this.vehiclemfrmasterService.getVehicleMfrMasterList(this.filter).subscribe(resp => {
         
         this.allVehicleMfrMasterList = resp;
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
          data: 'vehMfrId',
        },
        {
          title: 'Name',
          data: 'vehMrfName',
        },
        
      ],
    };
  }

  //Open user details screen
  getVehicleMfrMasterDetails(finact: Vehiclemfrmastermodel): void {
    this.vehiclemfrmasterService.vehicleMfrMasterDetails(finact);
    this.route.navigate(['/vehmfrmasteredit']);
  }

    //Open new driver master add screen
  vehicleFinCompMasterAdd(): void {
    this.route.navigate(['/vehmfrmasteradd']);
  }

  search(): void {
    this.filter.search = this.formFilter.value.vehMrfName.toString().toUpperCase();
    this.sharedService.loading=true;
    this.getVehicleFinCompMasterList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}

