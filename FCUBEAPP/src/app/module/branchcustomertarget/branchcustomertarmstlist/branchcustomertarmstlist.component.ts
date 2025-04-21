
import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {BranchCustomerTargetService } from 'src/app/services/branchcustomertargetmst.service';
import {Branchcustomertargetmodel } from 'src/app//models/branchcustomertargetmstmodel';
import {Branchcustomertargetmstlistmodel } from 'src/app//models/branchcustomermstlist';
import { Filtermodel } from 'src/app/models/filtermodel';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-branchcustomertarmstlist',
  templateUrl: './branchcustomertarmstlist.component.html',
  styleUrls: ['./branchcustomertarmstlist.component.css']
})
export class BranchcustomertarmstlistComponent {
  createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false;
  
    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
    allBranchCustomer: Branchcustomertargetmstlistmodel = new Branchcustomertargetmstlistmodel();
    filter: Filtermodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'FromPoint',
      sortOrder: 'asc',
      search: ''
    }
  
    formFilter!: FormGroup;
  
    constructor(private branchCustomerTargetService: BranchCustomerTargetService,private formBuilder: FormBuilder,
      private sharedService: SharedService, private route: Router) {
  

}
ngOnInit(): void {

  var menuData = sessionStorage.getItem('menulist')?.toString();
  if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
    var privilegeData = JSON.parse(menuData);
    
    var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
    var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
    .find((aa: { menuName: string; }) => aa.menuName === "Branch/Customer Targets");
    if (privilegeStatus) {
      this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
      this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
      this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
      this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
    }
  }

  this.branchCustomerTargetService.clearBranchCustomerTargetDetails();
  this.formFilter = this.formBuilder.group({
    fromPoint: new FormControl(''),
  });

  this.sharedService.loading=true;
  this.branchCustomerList();
  this.sharedService.loading=false;
}

branchCustomerList(){
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
        this.branchCustomerTargetService.getBranchCustomerTargetList(this.filter).subscribe(resp => {
            this.allBranchCustomer = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [
        {
          title: 'Year Id',
          data: 'yeardesc',
        },
        {
          title: 'Branch Code',
          data: 'branch',
        },
        
        {
          title: 'Action',
          data: 'id',
        },

      ],
    };
  }
  //Open new driver master add screen
  branchCustomerTargetAdd(): void {
    this.route.navigate(['/branchcustomertargeteadd']);
  }
  getBranchCustomerTargetDetails(Docrenewal: Branchcustomertargetmodel): void {
    this.branchCustomerTargetService.setbranchMasterTargetDetails(Docrenewal);
    this.route.navigate(['/branchcustomertargetedit']);
  }

  search(): void {
    this.filter.search = this.formFilter.value.fromPoint;
    this.sharedService.loading=true;
    this.branchCustomerList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}

