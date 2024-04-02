import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Custwizardlistmodel  } from 'src/app/models/custwizardlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Custwizardmodel } from 'src/app/models/custwizardmodel';
import { CustwizardService } from 'src/app/services/custwizard.service';


@Component({
  selector: 'app-custwizardlist',
  templateUrl: './custwizardlist.component.html',
  styleUrls: ['./custwizardlist.component.css']
})
export class CustwizardlistComponent {
    dtOptions: DataTables.Settings = {};
    allCustWizard: Custwizardlistmodel = new Custwizardlistmodel();
    filter: Filtermodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'groupname',
      sortOrder: 'asc',
      search: ''
    }
      constructor(private custWizardService: CustwizardService, private route: Router) {
      }
  
      ngOnInit(): void {
        this.custWizardService.clearCustWizardDetails();
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          serverSide: true,
          processing: true,
          ajax: (dataTablesParameters: any, callback) => {
            // Filter setting
            this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
            this.filter.pageSize = dataTablesParameters.length;
            this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
            this.filter.sortOrder = dataTablesParameters.order[0].dir;
            this.filter.search = dataTablesParameters.search.value;
            this.custWizardService.getCustWizardList(this.filter)
              .subscribe(resp => {
               this.allCustWizard = resp;
                callback({
                  recordsTotal: resp.pageMetaData.totalCount,
                  recordsFiltered: resp.pageMetaData.totalCount,
                  data: []
                });
              });
          },
          columns: [
          
           {
            title: 'cashAc',
            data: 'cashAc',
          },
          {
            title: 'hsdAc',
            data: 'hsdAc',
          },
          {
            title: 'tripRoutExpAc',
            data: 'tripRoutExpAc',
          },
          
         
          {
            title: 'Action',
            data: 'custwizid',
          },
        ],
        };
        }
        //Open new destination add screen
  addCustWizard(): void {
    this.route.navigate(['/custwizardadd']);
    }
    
    
    //Open user details screen
    getCustWizardDetails(Destination: Custwizardmodel): void {
    this.custWizardService.setCustWizardDetails(Destination);
    this.route.navigate(['/editcustwizard']);
    }
    
    }
    
    