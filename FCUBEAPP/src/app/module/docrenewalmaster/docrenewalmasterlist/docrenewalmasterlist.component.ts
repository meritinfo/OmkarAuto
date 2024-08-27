import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Docrenewalmasterlistmodel  } from 'src/app/models/docrenewalmasterlistmodel';
import { Docrenewalmastermodel } from 'src/app/models/docrenewalmastermodel';
import { DocRenewalMasterService } from 'src/app/services/docrenewalmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';


@Component({
  selector: 'app-docrenewalmasterlist',
  templateUrl: './docrenewalmasterlist.component.html',
  styleUrls: ['./docrenewalmasterlist.component.css']
})

export class DocrenewalmasterlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

    allDocRenewalMaster: Docrenewalmasterlistmodel = new Docrenewalmasterlistmodel();
    filter: Filtermodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'doccode',
      sortOrder: 'asc',
      search: ''
  } 
  
  formFilter!: FormGroup;

  constructor(private docrenewalmasterService: DocRenewalMasterService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
    private route: Router) {
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Document Renewals Master");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    this.docrenewalmasterService.clearDocrenewalMasterDetails();
    this.formFilter = this.formBuilder.group({
      docDescription: new FormControl(''),
    });

    this.sharedService.loading=true;
    this.docrenewalMasterList();
    this.sharedService.loading=false;
  }
  
  docrenewalMasterList(){
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
          title: 'Doc Code',
          data: 'docCode',
        },
        {
          title: 'Doc Description',
          data: 'docDescription',
        },
        {
          title: 'Reminder Days',
          data: 'reminderDays',
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

  
  search(): void {
    this.filter.search = this.formFilter.value.docDescription;
    this.sharedService.loading=true;
    this.docrenewalMasterList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}





