import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Documentallotmentlistmodel  } from 'src/app/models/documentallotmentlistmodel';
import { Documentallotmentmodel } from 'src/app/models/documentallotmentmodel';
import { DocumentallotmentService } from 'src/app/services/documentallotment.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';

@Component({
  selector: 'app-documentallottmentlist',
  templateUrl: './documentallottmentlist.component.html',
  styleUrls: ['./documentallottmentlist.component.css']
})
export class Documentallottmentlistcomponent {
    
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";
  branchList: Dropdownmodel[] = [];
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
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
    private commonService : CommonService,
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
    var dashboard = sessionStorage.getItem('dashboard')?.toString();
    if (typeof dashboard !== 'undefined' && dashboard !== null && dashboard !== '') {
      this.dashboard = dashboard;
    }
    if(!this.viewStatus){      
      this.route.navigate([this.dashboard]);
    }
    this.formFilter = this.formBuilder.group({
      branchCode: new FormControl('',),
      docType: new FormControl('',),
    });
    
    this.documentallotmentService.clearDocumentallotmentDetails();
    this.getBranchList();

    this.filter.search = "";
    this.filter.sortColumn = "";

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
    //   columns: [  
    //     {
    //       title: 'Branch',
    //       data: 'branch',
    //     },
    //     {
    //       title: 'Doc Type',
    //       data: 'docType',
    //     },
    //     {
    //       title: 'Allot Date',
    //       data: 'allotDate',
    //     },
    //     // {
    //     //   title: 'Range From',
    //     //   data: 'rangeFrom',
    //     // },
    //     // {
    //     //   title: 'Range To',
    //     //   data: 'rangeTo',
    //     // },
    //     // {
    //     //   title: 'Doc Status',
    //     //   data: 'docStatus',
    //     // },
    //     {
    //       title: 'Action',
    //       data: 'docAllotId',
    //     }, 
    //   ],
    // };
  }
  //Open new destination add screen
  adddocumentallotment(): void {
    this.route.navigate(['/docallotadd']);
  }

  getdocumentallotmentdocuments(destination: Documentallotmentmodel): void {
    this.documentallotmentService.setDocumentallotmentDetails(destination);
    this.route.navigate(['/docallotedit']);
  }
  
  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.filter.search = selecteddata.branchCode;
    this.filter.sortColumn = selecteddata.docType;

    this.sharedService.loading=true;
    this.documentallotmentList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
}
