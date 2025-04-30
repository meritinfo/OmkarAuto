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
import { Reportmodel } from 'src/app/models/reportmodel';

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
dashboard: string ="";
    partyList: Dropdownmodel[] = [];
    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
  
    allMrlist: Mrlistmodel = new Mrlistmodel();
    filter: Reportmodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'MrMasterId',
      sortOrder: 'asc',
      search: '',
      fromDate:'',
      toDate:'',
     // strRequest:'',
     filterStr:'',
     filterStr1:'',
     filterStr2:'',
     filterStr3:'',
    }
    
    keywordLocation = 'dataName';
    year: string = '';
    loginDate: string = '';
    fromDate: string = '';
    branchid: string = '';
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
      
      this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
      this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
      
      this.fromDate = this.minDate ;


      var userbranchcode = sessionStorage.getItem('userBranch')?.toString();  
      if (typeof userbranchcode !== 'undefined' && userbranchcode !== null && userbranchcode !== '') {
        this.branchid = userbranchcode;
      } 
    
      this.mrService.clearMrDetails();    

      this.formFilter = this.formBuilder.group({
        fromDate: new FormControl(this.fromDate,),
        toDate: new FormControl(this.loginDate,),
        partyCode: new FormControl('',),
        mrNo: new FormControl('',),
        strRequest: new FormControl('',),
      });
    this.getBillingPartyList();
      this.sharedService.loading=true; 
      this.filter.fromDate = this.fromDate;
      this.filter.toDate = this.loginDate;
      this.filter.filterStr = this.branchid;
      this.mrlist();
      this.sharedService.loading=false;      
    }

  
    mrlist(){      
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 50,
        serverSide: true,
        processing: true,
        searching: false,     
        language: {
          zeroRecords: ''
        }, 
        ajax: (dataTablesParameters: any, callback) => {
          // Filter setting
          this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
          this.filter.pageSize = dataTablesParameters.length;
          this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
          this.filter.sortOrder = dataTablesParameters.order[0].dir;
          // this.filter.search = ''; 
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });     
          this.mrService.getMrMstList(this.filter).subscribe(resp => {
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
            title: 'Cheq Cash Amt',
            data: 'cheqCashAmt',
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
    onFocused(e: any) {
      // do something
    }
  
    startWithFilter (e:any) {
    
    };
    getBillingPartyList(): void {
      this.commonService.getBillingPartyList().subscribe((res) => {
        this.partyList = res;
      });
    }
  
    
    getMrDetails(mr: Mrmodel): void {
      this.mrService.setMrDetails(mr);
      this.route.navigate(['/mrentryedit']);
    }
    
    search(): void {
      this.filter.fromDate = this.formFilter.value.fromDate;
      this.filter.toDate = this.formFilter.value.toDate;
      this.filter.filterStr = this.branchid;
      this.filter.filterStr1 = this.formFilter.value.mrNo;
      this.filter.filterStr2 = this.formFilter.value.partyCode.dataId;
      this.filter.filterStr3 = this.year;
      this.sharedService.loading = true;
      this.mrlist();       
      this.sharedService.loading = false;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    }
  
  }
  
