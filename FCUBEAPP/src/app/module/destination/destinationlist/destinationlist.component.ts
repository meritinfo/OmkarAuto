
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Destinationlistmodel } from 'src/app/models/destinationlistmodel';
import { Destinationmodel } from 'src/app/models/destinationmodel';
import { DestinationService } from 'src/app/services/destination.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-destinationlist',
  templateUrl: './destinationlist.component.html',
  styleUrls: ['./destinationlist.component.css']
})
export class DestinationlistComponent {
  dashboard:string = ''; 
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allDestination: Destinationlistmodel = new Destinationlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'centreName',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;

  constructor(private destinationService: DestinationService,private formBuilder: FormBuilder,
    private sharedService: SharedService, private route: Router) {
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Create Destinations");
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
    
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
    }
    this.destinationService.clearDestinationDetails();
    this.formFilter = this.formBuilder.group({
      centreName: new FormControl(''),
    });
    
    this.sharedService.loading=true;
    this.destinationMasterList();    
    this.sharedService.loading=false;
  }

  destinationMasterList(){
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
        this.destinationService.getDestinationList(this.filter).subscribe(resp => {
            this.allDestination = resp;
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
          title: 'Centre Name',
          data: 'centreName',
        },       
        {
          title: 'State Name',
          data: 'stateName',
        },
        {
          title: 'Control Branch',
           data: 'controlBranch',
        },
        {
          title: 'Action',
          data: 'centreId',
        },
      ],
    };    
  }
  //Open new destination add screen
  adddestination(): void {
    this.route.navigate(['/adddestination']);
  }


  //Open user details screen
  destinationDetails(Destination: Destinationmodel): void {
    this.destinationService.setDestinationDetails(Destination);
    this.route.navigate(['/destinationedit']);
  }

  
  search(): void {
    this.filter.search = this.formFilter.value.centreName;
    this.sharedService.loading=true;
    this.destinationMasterList();    
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }


}

