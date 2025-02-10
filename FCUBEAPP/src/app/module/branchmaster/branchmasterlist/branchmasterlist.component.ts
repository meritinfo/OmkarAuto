import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Branchmasterlistmodel } from 'src/app/models/branchmasterlistmodel';
import { Branchmodel } from 'src/app/models/branchmodel';
import { BranchMasterService } from 'src/app/services/branchmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

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
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allBranchMaster: Branchmasterlistmodel = new Branchmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'Code',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private branchmasterService: BranchMasterService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
     private route: Router) {
  }

  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Create Branches");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    this.branchmasterService.clearBranchMasterDetails();
    this.formFilter = this.formBuilder.group({
      centreName: new FormControl(''),
    }); 

    this.sharedService.loading = true;
    this.branchMasterList();
    this.sharedService.loading=false;   
  }
  branchMasterList(){
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
        // this.filter.search = '';
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
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
    this.filter.search = this.formFilter.value.centreName;
    this.sharedService.loading = true;
    this.branchMasterList();
    this.sharedService.loading=false;   
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}

