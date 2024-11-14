import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { Gstpurchasemodel  } from 'src/app/models/gstpurchasemodel';
import { Gstpurchaselistmodel } from 'src/app/models/gstpurchaselistmodel';
import { GstpurchaseService } from 'src/app/services/gstpurchase.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-gstpurchaselist',
  templateUrl: './gstpurchaselist.component.html',
  styleUrls: ['./gstpurchaselist.component.css']
})
export class GstpurchaselistComponent {
    createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false;

    dtOptions: DataTables.Settings = {};
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
  
    allGstpurchaselist: Gstpurchaselistmodel = new Gstpurchaselistmodel();
    filter: Reportmodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'vendorGstNo',
      sortOrder: 'asc',
      search: '',
      fromDate:'',
      toDate:'',
      filterStr: '',
      filterStr1: '',
      filterStr2:'',
      filterStr3:''
    }
    
    keywordLocation = 'dataName';
    year: string = '';
    loginDate: string = '';
    fromDate: string = '';
    maxDate: string = '';
    minDate: string = '';
    branch: string = '';

    formFilter!: FormGroup;
    constructor(private formBuilder: FormBuilder,
      private gstpurchaseservice: GstpurchaseService, private route: Router,
      private sharedService: SharedService,
      private commonService: CommonService) {
    }
  
    ngOnInit(): void {    
      var menuData = sessionStorage.getItem('menulist')?.toString();
      if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
        var privilegeData = JSON.parse(menuData);
        
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "GST Purchase Entry");
        if (privilegeStatus) {
          this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
          this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
          this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
          this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
        }
      }
    
      var userbranchcode = sessionStorage.getItem('userBranch')?.toString();  
      if (typeof userbranchcode !== 'undefined' && userbranchcode !== null && userbranchcode !== '') {
        this.branch = userbranchcode;
      }
      else {
        this.route.navigate(['/']);
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
      today.setMonth(month - 12);

      this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
      this.maxDate = new Date().toLocaleDateString('en-CA').toString();
      
      if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
        this.fromDate = this.minDate ;
      }
      else{
        this.fromDate = today.toLocaleDateString('en-CA').toString();
      }   
  
  
      this.gstpurchaseservice.clearGstPurchageDetails();
      
      this.sharedService.loading=true;
  
      this.formFilter = this.formBuilder.group({
        fromDate: new FormControl(this.fromDate,),
        toDate: new FormControl(this.loginDate,),
      });

      this.filter.fromDate = this.fromDate;
      this.filter.toDate = this.loginDate;
      this.filter.filterStr = this.branch;
  
      this.gstPurchaselist();
      this.sharedService.loading=false;
      
    }

  
    gstPurchaselist(){      
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 50,
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
          callback({
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
          });
          this.gstpurchaseservice.getGstPurchageList(this.filter).subscribe(resp => {
              this.allGstpurchaselist = resp;  
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
              title: 'Branch',
              data: 'branchName',
            },
            {
              title: 'Trans Date',
              data: 'transDate',
            },
            {
              title: 'Vendor Name',
              data: 'vendorName',
            },
            {
              title: 'Net Amount',
              data: 'netAmount',
            },
            {
              title: 'Action',
              data: 'masterid',
            },
          ],
        };
    }
    
     
    gstpurchaseAdd(): void {
      this.route.navigate(['/gstpurchaseadd']);
    }
    
    getGstPurchageDetails(gstpurchase: Gstpurchasemodel): void {
      this.gstpurchaseservice.setGstPurchageDetails(gstpurchase);
      this.route.navigate(['/gstpurchaseedit']);
    }
    
    search(): void {
      var selectedData = this.formFilter.getRawValue();
      this.filter.fromDate = selectedData.fromDate;
      this.filter.toDate = selectedData.toDate;
      this.filter.filterStr = this.branch;

      this.sharedService.loading = true;
      this.gstPurchaselist();       
      this.sharedService.loading = false;
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.ajax.reload();
      });
    }
  
  }
  
