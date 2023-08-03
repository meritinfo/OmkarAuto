import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Docrenewalentrylistmodel  } from 'src/app/models/docrenewalentrylistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Docrenewalentrymodel } from 'src/app/models/docrenewalentrymodel';
import { DocRenewalEntryService } from 'src/app/services/docrenewalentry.service';

@Component({
  selector: 'app-docrenewalentrylist',
  templateUrl: './docrenewalentrylist.component.html',
  styleUrls: ['./docrenewalentrylist.component.css']
})
export class DocrenewalentrylistComponent {
  dtOptions: DataTables.Settings = {};
  allDocRenewalEntry: Docrenewalentrylistmodel = new Docrenewalentrylistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'doccode',
    sortOrder: 'asc',
    search: ''


}
constructor(private docrenewalEntryService: DocRenewalEntryService, private route: Router) {
}
  ngOnInit(): void {
    this.docrenewalEntryService.clearDocrenewalEntryDetails();
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
      this.docrenewalEntryService.getDocrenewalEntryList(this.filter)
        .subscribe(resp => {
         this.allDocRenewalEntry = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
  },
  columns: [
      

    {
      title: 'vehicleMasterID ',
      data: 'vehicleMasterID',
    },

   {
    title: 'docRenewalID ',
    data: 'docRenewalID',
  },
 
 


  {
    title: 'Action',
    data: 'docRenewalEntryId',
  },
 
],
};
}
  //Open new driver master add screen
  docrenewalEntryAdd(): void {
    this.route.navigate(['/adddocrenewalentry']);
  }

 //Open user details screen
getRenewalEntryDetails(Docrenewal: Docrenewalentrymodel): void {
  this.docrenewalEntryService.setDocRenewalEntryDetails(Docrenewal);
  this.route.navigate(['/docrenewalmasteredit']);
  }
  
  }
  