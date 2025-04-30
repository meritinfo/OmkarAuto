import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Openingbalancemodel  } from 'src/app/models/openingbalancemodel';
import { Openingbalancelistmodel } from 'src/app/models/openingbalancelistmodel';
import { FinopenbalanceService } from 'src/app/services/finopenbalance.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-finopenbalancelist',
  templateUrl: './finopenbalancelist.component.html',
  styleUrls: ['./finopenbalancelist.component.css']
})
export class FinopenbalancelistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
dashboard: string ="";
  year: string = '';

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  allOpeningbalancelist: Openingbalancelistmodel = new Openingbalancelistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'branchName',
    sortOrder: 'asc',
    search: ''
}
  
  constructor(private formBuilder: FormBuilder,
    private finopenbalanceService: FinopenbalanceService, private route: Router,
    private sharedService: SharedService) {
  }

  ngOnInit(): void {    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Opening Balance Register");
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
  
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }

    this.finopenbalanceService.clearOpeningbalanceDetails();
    
    this.sharedService.loading = true;
    this.finOpeningbalanceList();       
    this.sharedService.loading = false;
  
  }

  finOpeningbalanceList(){    
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
         this.filter.search = this.year;      
        this.finopenbalanceService.getOpeningbalanceList(this.filter)
          .subscribe(resp => {
            this.allOpeningbalancelist = resp;  
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
            title: 'Branch Name',
            data: 'branchName',
          },
          {
            title: 'Action',
            data: 'accountId',
          },
        ],
      };
  }  
  
  addfinOpeningbalance(): void {
    this.route.navigate(['/opbalanceadd']);
  }

  
  getfinOpeningbalanceDetails(openingbalancemodel: Openingbalancemodel): void {
    this.finopenbalanceService.setOpeningbalanceDetails(openingbalancemodel);
    this.route.navigate(['/opbalanceedit']);
  }
  
  search(): void {
    this.sharedService.loading = true;
    this.finOpeningbalanceList();       
    this.sharedService.loading = false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }


}
