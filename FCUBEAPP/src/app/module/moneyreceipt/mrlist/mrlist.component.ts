import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { Mrmodel  } from 'src/app/models/mrmodel';
import { Mrlistmodel } from 'src/app/models/mrlistmodel';
import { MrService } from 'src/app/services/mr.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-mrlist',
  templateUrl: './mrlist.component.html',
  styleUrls: ['./mrlist.component.css']
})
export class MrlistComponent {
    createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false;

    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
  
    allMrlist: Mrlistmodel = new Mrlistmodel();
    filter: Pagerequestwithdatesmodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'MrMasterId',
      sortOrder: 'asc',
      search: '',
      fromDate:'',
      toDate:'',
      strRequest:'',
    }
    
    keywordLocation = 'dataName';
    year: string = '';
    loginDate: string = '';
    fromDate: string = '';
    maxDate: string = '';
    minDate: string = '';

    formFilter!: FormGroup;
    constructor(private formBuilder: FormBuilder,
      private mrService: MrService, private route: Router,
      private sharedService: SharedService,
      private commonService: CommonService) {
    }
  
    ngOnInit(): void {    
      var menuData = sessionStorage.getItem('menulist')?.toString();
      if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
        var privilegeData = JSON.parse(menuData);
        var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Money Receipt (MR)");
        if (privilegeStatus) {
          this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
          this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
          this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
          this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
        }
      }
    
      var yearIDData = sessionStorage.getItem('yearID')?.toString();
      if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
        this.year = yearIDData;
      }
      var loginDate = sessionStorage.getItem('loginDate')?.toString();
      if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
        this.loginDate = loginDate;
      }
      const today = new Date();
      const month = today.getMonth();
      const year = today.getFullYear();
      today.setMonth(month - 1);

      this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
      this.maxDate = new Date().toLocaleDateString('en-CA').toString();
      
      if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
        this.fromDate = this.minDate ;
      }
      else{
        this.fromDate = today.toLocaleDateString('en-CA').toString();
      }   
    
      this.mrService.clearMrDetails();    

      this.formFilter = this.formBuilder.group({
        fromDate: new FormControl(this.fromDate,),
        toDate: new FormControl(this.loginDate,),
        strRequest: new FormControl('',),
      });
    
      this.sharedService.loading=true; 
      this.filter.fromDate = this.fromDate;
      this.filter.toDate = this.loginDate;
      this.mrlist();
      this.sharedService.loading=false;      
    }

  
    mrlist(){      
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        searching: false,
        ajax: (dataTablesParameters: any, callback) => {
          // Filter setting
          this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
          this.filter.pageSize = dataTablesParameters.length;
          this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
          this.filter.sortOrder = dataTablesParameters.order[0].dir;
          // this.filter.search = '';      
          this.mrService.getMrMstList(this.filter)
            .subscribe(resp => {
              this.allMrlist = resp;  
              callback({
                recordsTotal: resp.pageMetaData.totalCount,
                recordsFiltered: resp.pageMetaData.totalCount,
                data: []
              });
            });
          },
           // Set column title and data field
           columns: [    
            {
              title: 'MR Station',
              data: 'mrStn',
            },
            {
              title: 'MR No',
              data: 'mrNo',
            },
            {
              title: 'MR Date',
              data: 'mrDate',
            },
            {
              title: 'Party Name',
              data: 'partyName',
            },
            {
              title: 'Total Amt',
              data: 'totalAmt',
            },
            {
              title: 'Action',
              data: 'masterid',
            },
          ],
        };
    }    
     
    mrAdd(): void {
      this.route.navigate(['/mrentryadd']);
    }
    
    getMrDetails(mr: Mrmodel): void {
      this.mrService.setMrDetails(mr);
      this.route.navigate(['/mrentryedit']);
    }
    
    search(): void {
      this.filter.fromDate = this.formFilter.value.fromDate;
      this.filter.toDate = this.formFilter.value.toDate;
      this.sharedService.loading = true;
      this.mrlist();       
      this.sharedService.loading = false;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    }
  
  }
  
