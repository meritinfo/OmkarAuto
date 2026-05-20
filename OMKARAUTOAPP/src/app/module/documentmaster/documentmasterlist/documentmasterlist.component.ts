
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Documentmasterlistmodel } from 'src/app/models/documentmasterlist';
import { Documentmastermodel } from 'src/app/models/documentmastermodel';
import { DocumentMasterService } from 'src/app/services/documentmaster.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';

@Component({
  selector: 'app-documentmasterlist',
  templateUrl: './documentmasterlist.component.html',
  styleUrls: ['./documentmasterlist.component.css']
})
export class DocumentmasterlistComponent {
  createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false; 
    dashboard: string ="";
    branchList: Dropdownmodel[] = [];
    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
  
    allDocumentMaster: Documentmasterlistmodel = new Documentmasterlistmodel();
    filter: Filtermodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'brandname',
      sortOrder: 'asc',
      search: ''
    }
    formFilter!: FormGroup;
    constructor(private documentMasterService: DocumentMasterService,
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
          .find((aa: { menuName: string; }) => aa.menuName === "Document Settings");
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
        
        this.documentMasterService.clearDocumentMasterDetails();
       // this.getBranchList();
    
        this.filter.search = "";
        this.filter.sortColumn = "";
    
        this.sharedService.loading = true;
        this.documentMasterList();
        this.sharedService.loading=false;   
      }
      documentMasterList(){
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 50,
            serverSide: true,
            processing: true,
            searching:false,   
              language: {
                zeroRecords: ''
              }, 
            ajax: (dataTablesParameters: any, callback) => {
              // Filter setting
              this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
              this.filter.pageSize = dataTablesParameters.length;
      
              this.documentMasterService.getDocumentMasterList(this.filter)
                .subscribe(resp => {
                  this.allDocumentMaster = resp;
                  callback({
                    recordsTotal: resp.pageMetaData.totalCount,
                    recordsFiltered: resp.pageMetaData.totalCount,
                    data: []
                  });
                });
            },
            columns: [  
              {
                title: 'Action',
                data: 'docType',
              },    
              {
                title: 'Doc Desc',
                data: 'docDesc',
              },
              {
                title: 'AutoGen YN ',
                data: 'autoGenYN',
              },
              {
                title: 'Series YN',
                data: 'seriesYN',
              },
             
            ],
          };
        }
        //Open new destination add screen

        getdocudocuments(destination: Documentmastermodel): void {
          this.documentMasterService.setDocumentMasterDetails(destination);
          this.route.navigate(['/docmasteredit']);
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
          this.documentMasterList();
          this.sharedService.loading=false;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
          });
        }
      }
      
    


