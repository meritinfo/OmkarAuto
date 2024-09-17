import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Docrenewalentrylistmodel } from 'src/app/models/docrenewalentrylistmodel';
import { Docrenewalentrymodel } from 'src/app/models/docrenewalentrymodel';
import { DocRenewalEntryService } from 'src/app/services/docrenewalentry.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-docrenewalentrylist',
  templateUrl: './docrenewalentrylist.component.html',
  styleUrls: ['./docrenewalentrylist.component.css']
})
export class DocrenewalentrylistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allDocRenewalEntry: Docrenewalentrylistmodel = new Docrenewalentrylistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'transDate',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;

  constructor(private docrenewalEntryService: DocRenewalEntryService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
     private route: Router) {
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Document Service Renewal Entry");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    this.docrenewalEntryService.clearDocrenewalEntryDetails();
    this.formFilter = this.formBuilder.group({
      docDescription: new FormControl(''),
    });

    this.sharedService.loading=true;
    this.docrenewalEntryList();
    this.sharedService.loading=false;
  }
  
  docrenewalEntryList(){
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
        this.docrenewalEntryService.getDocrenewalEntryList(this.filter).subscribe(resp => {
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
          title: 'Trans Date',
          data: 'transDate',
        },
        {
          title: 'Document ',
          data: 'docDescription',
        },
        {
          title: 'Vehicle No',
          data: 'vehicleNo',
        },
        {
          title: 'Net Amount',
          data: 'netAmount',
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
    this.route.navigate(['/docrenewalentryedit']);
  }

  search(): void {
    this.filter.search = this.formFilter.value.docDescription;
    this.sharedService.loading=true;
    this.docrenewalEntryList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
