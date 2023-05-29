import { Component } from '@angular/core';


import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Docrenewalmasterlistmodel  } from 'src/app/models/docrenewalmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Docrenewalmastermodel } from 'src/app/models/docrenewalmastermodel';
import { DocRenewalMasterService } from 'src/app/services/docrenewalmaster.service';


@Component({
  selector: 'app-docrenewalmasterlist',
  templateUrl: './docrenewalmasterlist.component.html',
  styleUrls: ['./docrenewalmasterlist.component.css']
})
export class DocrenewalmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allDocRenewalMaster: Docrenewalmasterlistmodel = new Docrenewalmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'doccode',
    sortOrder: 'asc',
    search: ''


}
constructor(private docrenewalmasterService: DocRenewalMasterService, private route: Router) {
}

ngOnInit(): void {
  this.docrenewalmasterService.clearDocrenewalMasterDetails();
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
      this.docrenewalmasterService.getDocrenewalmasterList(this.filter)
        .subscribe(resp => {
         this.allDocRenewalMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [
      

      {
        title: 'DocCode ',
        data: 'docCode',
      },

     {
      title: 'DocDescription ',
      data: 'docDescription',
    },
   
   
  
  
    {
      title: 'Action',
      data: 'docRenewalID',
    },
   
  ],
};
}
//Open new destination add screen
addDocrenewalmaster(): void {
this.route.navigate(['/adddocrenewalmaster']);
}


//Open user details screen
getRenewalMasterDetails(Docrenewal: Docrenewalmastermodel): void {
this.docrenewalmasterService.setDocRenewalMasterDetails(Docrenewal);
this.route.navigate(['/docrenewalmasteredit']);
}

}





