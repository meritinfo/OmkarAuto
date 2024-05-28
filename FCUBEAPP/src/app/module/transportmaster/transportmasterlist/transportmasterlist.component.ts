import { Component } from '@angular/core';



import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Transportmasterlistmodel  } from 'src/app/models/transportmasterlistmodel';
import { Usermodel } from 'src/app/models/usermodel';
import { Transportmastermodel } from 'src/app/models/transportmastermodel';
import { TransportMasterService } from 'src/app/services/transportmaster.service';

@Component({
  selector: 'app-transportmasterlist',
  templateUrl: './transportmasterlist.component.html',
  styleUrls: ['./transportmasterlist.component.css']
})
export class TransportmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  allTransportMaster: Transportmasterlistmodel = new Transportmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''

}
constructor(private transportmasterService: TransportMasterService, private route: Router) {
}

ngOnInit(): void {
  this.transportmasterService.clearTransportMasterDetails();
  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10,
    serverSide: true,
    processing: true,
    searching :false,
    ajax: (dataTablesParameters: any, callback) => {
      // Filter setting
      this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
      this.filter.pageSize = dataTablesParameters.length;
      this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
      this.filter.sortOrder = dataTablesParameters.order[0].dir;
      this.filter.search = dataTablesParameters.search.value;
      this.transportmasterService.getTransportMasterList(this.filter)
        .subscribe(resp => {
         this.allTransportMaster = resp;
          callback({
            recordsTotal: resp.pageMetaData.totalCount,
            recordsFiltered: resp.pageMetaData.totalCount,
            data: []
          });
        });
    },
    columns: [
      

     

    
    {
      title: 'Tpt Name ',
      data: 'tptName',
    },
    {
      title: 'Address 1 ',
      data: 'address1',
    },
    {
      title: 'Address 2 ',
      data: 'address2',
    },
    {
      title: 'Address 3 ',
      data: 'address3',
    },
    {
      title: 'Address 4 ',
      data: 'address4',
    },
    {
      title: 'State Code ',
      data: 'stateCode',
    },
    {
      title: 'Pin Code ',
      data: 'pinCode',
    },
   
   
   
  
  
    {
      title: 'Action',
      data: 'tptCode',
    },
  ],
};
}
//Open new destination add screen
addTransportMaster(): void {
this.route.navigate(['/addtransportmaster']);
}


//Open user details screen
getTransportMasterDetails(Destination: Transportmastermodel): void {
this.transportmasterService.setTransportMasterDetails(Destination);
this.route.navigate(['/transportmasteredit']);
}

}


