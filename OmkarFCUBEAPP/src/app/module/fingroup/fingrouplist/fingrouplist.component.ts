import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Fingroupmodel  } from 'src/app/models/fingroupmodel';
import { Fingrouplistmodel } from 'src/app/models/fingrouplistmodel';
import { FingroupService } from 'src/app/services/fingroup.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-fingrouplist',
  templateUrl: './fingrouplist.component.html',
  styleUrls: ['./fingrouplist.component.css']
})
export class FingrouplistComponent {

  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  allFingrouplistTypes: Fingrouplistmodel = new Fingrouplistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'accountName',
    sortOrder: 'asc',
    search: ''
}
  formFilter!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private fingroupService: FingroupService, private route: Router,
    private sharedService: SharedService) {
  }

  ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Group Master");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
  
    this.fingroupService.clearFingroupDetails();
    this.formFilter = this.formBuilder.group({
      groupName: new FormControl(''),
    });
    this.sharedService.loading = true;
    this.fingrouplist();       
    this.sharedService.loading = false;
  }

  fingrouplist(){
    
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
        // this.filter.search = '';      
        this.fingroupService.getfingroupList(this.filter)
          .subscribe(resp => {
            this.allFingrouplistTypes = resp;  
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
            title: 'Group Name',
            data: 'groupName',
          },
          {
            title: 'Account Type',
            data: 'accountName',
          },
          {
          title: 'Sub Account Name',
          data: 'subAccountName',
          },
          {
            title: 'Action',
            data: 'accountId',
          },
        ],
      };
  }
  
  
  addfingroup(): void {
    this.route.navigate(['/fingroupadd']);
  }

  
  getFingroupDetails(fingroup: Fingroupmodel): void {
    this.fingroupService.setFinsgroupDetails(fingroup);
    this.route.navigate(['/fingroupedit']);
  }
  
  search(): void {
    this.filter.search = this.formFilter.value.groupName;
    this.sharedService.loading = true;
    this.fingrouplist();       
    this.sharedService.loading = false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
