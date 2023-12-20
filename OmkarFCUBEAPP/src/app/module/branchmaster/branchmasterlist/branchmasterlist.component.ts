import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Branchmasterlistmodel } from 'src/app/models/branchmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Branchmodel } from 'src/app/models/branchmodel';
import { BranchMasterService } from 'src/app/services/branchmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-branchmasterlist',
  templateUrl: './branchmasterlist.component.html',
  styleUrls: ['./branchmasterlist.component.css']
})
export class BranchmasterlistComponent  {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  allBranchMaster: Branchmasterlistmodel = new Branchmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Code',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private branchmasterService: BranchMasterService,private sharedService: SharedService,
     private route: Router) {
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.find((item: { menuList: any; }) => item.menuList).menuList.find((aa: { menuName: string; }) => aa.menuName === "Distance Master - TRIP");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    this.branchmasterService.clearBranchMasterDetails();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.filter.search = dataTablesParameters.search.value;
        this.sharedService.loading = true;
        this.branchmasterService.getBranchMasterList(this.filter)
          .subscribe(resp => {
            this.allBranchMaster = resp;
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
          title: 'Code',
          data: 'code',
        },
       
        {
          title: 'Centre Name',
          data: 'centreName',
        },
        {
          title: 'Zone Code',
          data: 'zoneCode',
        },
        {
          title: 'State Name',
          data: 'stateName',
        },
        {
          title: 'Manager Name',
          data: 'managerName',
        },
        {
          title: 'Manager Mobile No',
          data: 'managerMobileNo',
        },    
        {
          title: 'Action',
          data: 'centreId',
        },
      ],
    };
  }
  
  //Open new user add screen
  Addbranchmaster(): void {
    this.route.navigate(['/addbranchmaster']);
  }
  
  //Open user details screen
  branchmasterDetails(Branch: Branchmodel): void {
    this.branchmasterService.setBranchMasterDetails(Branch);
    this.route.navigate(['/branchmasteredit']);
  }
  search(): void {
    debugger;
    this.filter.search = this.formFilter.value.centreName;     
    this.sharedService.loading = true;
    this.branchmasterService.getBranchMasterList(this.filter)
      .subscribe(resp => {
        this.allBranchMaster = resp;
      });           
    this.sharedService.loading = false;
  }

}

