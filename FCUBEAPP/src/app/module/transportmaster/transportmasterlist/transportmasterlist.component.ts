import { Component ,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Transportmasterlistmodel  } from 'src/app/models/transportmasterlistmodel';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Transportmastermodel } from 'src/app/models/transportmastermodel';
import { TransportMasterService } from 'src/app/services/transportmaster.service';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-transportmasterlist',
  templateUrl: './transportmasterlist.component.html',
  styleUrls: ['./transportmasterlist.component.css']
})
export class TransportmasterlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allTransportMaster: Transportmasterlistmodel = new Transportmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'groupname',
    sortOrder: 'asc',
    search: ''
}
createStatus = false;
editStatus = false;
deleteStatus = false;
viewStatus = false;
loginDate: string = '';
fromDate: string = '';
maxDate: string = '';
minDate: string = '';
formFilter!: FormGroup;

constructor(private transportmasterService: TransportMasterService,private formBuilder: FormBuilder,
   private route: Router) {
}

ngOnInit(): void {
  var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Transport/Broker Master"));
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
    
  this.transportmasterService.clearTransportMasterDetails();
    this.formFilter = this.formBuilder.group({
      tptName: new FormControl(''),
    });

    this.transportList();
  }
    
  transportList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching :false,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
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



search(): void {
  this.filter.search = this.formFilter.value.tptName;
  this.transportList();
  this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
    dtInstance.ajax.reload();
  });
}

}


