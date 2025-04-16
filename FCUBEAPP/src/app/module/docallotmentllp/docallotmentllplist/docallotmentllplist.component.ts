import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Documentallotmentlistmodel  } from 'src/app/models/documentallotmentlistmodel';
import { Documentallotmentmodel } from 'src/app/models/documentallotmentmodel';
import { DocumentallotmentService } from 'src/app/services/documentallotment.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { Requestmodel } from 'src/app/models/requestmodel';

@Component({
  selector: 'app-docallotmentllplist',
  templateUrl: './docallotmentllplist.component.html',
  styleUrls: ['./docallotmentllplist.component.css']
})
export class DocallotmentllplistComponent {
  dashboard:string = ''; 
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  dtOptions: DataTables.Settings = {};
  dtElement!: DataTableDirective;
  allDocumentAllotment: Documentallotmentlistmodel = new Documentallotmentlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'brandname',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;
  constructor(private documentallotmentService: DocumentallotmentService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
     private route: Router) {
  }


  ngOnInit(): void {
    
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Document Allotment");
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

    
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
    }
    this.documentallotmentService.clearDocumentallotmentDetails();
   
    this.sharedService.loading = true;
    this.documentallotmentList();
    this.sharedService.loading=false;   
  }

  documentallotmentList(){
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

        this.documentallotmentService.getDocumentallotmentList(this.filter)
          .subscribe(resp => {
            this.allDocumentAllotment = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [   
        {
          title: 'Branch',
          data: 'branch',
        },
        {
          title: 'Series Code',
          data: 'seriesCode',
        },
        {
          title: 'Doc Type',
          data: 'docType',
        },
        {
          title: 'Allot Date',
          data: 'allotDate',
        },
        {
          title: 'Range From',
          data: 'rangeFrom',
        },
        {
          title: 'Range To',
          data: 'rangeTo',
        },
        {
          title: 'Doc Status',
          data: 'docStatus',
        },
        {
          title: 'Remarks',
          data: 'remarks',
        },
        {
          title: 'Action',
          data: 'docAllotId',
        },   
      ],
    };
  }

  //Open new destination add screen
  adddocumentallotment(): void {
    this.route.navigate(['/docallotllpadd']);
  }

  getdocumentallotmentdocuments(destination: Documentallotmentmodel): void {
    this.documentallotmentService.setDocumentallotmentDetails(destination);
    this.route.navigate(['/docallotllpedit']);
  }
  search(): void {
    this.sharedService.loading = true;
    this.documentallotmentList();
    this.sharedService.loading=false;   
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
}
}
