
import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Debitnotelistmodel } from 'src/app/models/debitnotelistmodel';
import { Debitnotemodel } from 'src/app/models/debitnotemodel';
import { DebitNoteService } from 'src/app/services/debitnote.service';
import { CommonService } from 'src/app/services/common.service';
import { Reportmodel } from 'src/app/models/reportmodel';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import { Requestmodel } from 'src/app/models/requestmodel';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-debitnotelist',
  templateUrl: './debitnotelist.component.html',
  styleUrls: ['./debitnotelist.component.css']
})
export class DebitnotelistComponent {
   loggedInUserID: string = '';
    dtOptions: DataTables.Settings = {};
    allCredit: Debitnotelistmodel = new Debitnotelistmodel();
    request: Requestmodel = new Requestmodel();
    filter: Reportmodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'brandname',
      sortOrder: 'asc',
      search: '',
      fromDate: '',
      toDate: '',
      filterStr: '',
      filterStr1: '',
      filterStr2:'',
      filterStr3:''
    }
  
    formFilter!: FormGroup;
    keywordLocation = 'dataName';
    loginDate: string = '';
    branch: string = '';
    fromDate: string = '';
    maxDate: string = '';
    minDate: string = '';
    editMode = false;
    createmode  = true;
    createStatus = false;
    editStatus = false;
    deleteStatus = false;
    viewStatus = false; 
    dashboard: string ="";
      
    year:string = ''; 
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective;
  
    constructor(private formBuilder: FormBuilder,private toastrService : ToastrService,
      private debitNoteService: DebitNoteService, private route: Router,
                                        private sharedService : SharedService,
      private commonService: CommonService,) {

}
 ngOnInit(): void {   
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find((aa: { menuName: string; }) => aa.menuName === "Debit Note Entry");
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
    
    this.sharedService.loggedInStatus = true;
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
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

    var userData3 = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData3 !== 'undefined' && userData3 !== null && userData3 !== '') {
      this.branch = userData3;
    }   

    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;   
  

    this.debitNoteService.clearDebitDetails();

    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
    });
    

    var selectedDataVal = this.formFilter.getRawValue();
    this.filter.fromDate = selectedDataVal.fromDate;
    this.filter.toDate = selectedDataVal.toDate; 
    this.filter.filterStr = "";
    this.filter.filterStr1 = "";
    this.filter.filterStr2 = this.branch;    
    this.filter.filterStr3 = this.year;    
    this.getDebitList();
  }
   getDebitList(){
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
            this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
            this.filter.pageSize = dataTablesParameters.length;
            this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
            this.filter.sortOrder = dataTablesParameters.order[0].dir;
            callback({
              recordsTotal: 0,
              recordsFiltered: 0,
              data: []
            });
            this.debitNoteService.getDebitNoteList(this.filter).subscribe(resp => {
             this.allCredit = resp;
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
              title: 'Action',
              data: 'dnId',
            },
            {
              title: 'Dn Branch',
              data: 'brname',
            },
            {
              title: 'Dn Date',
              data: 'dnDate',
            },  
            {
              title: 'Dn Sl No',
              data: 'dnSlNo',
            },  
            {
              title: 'Total Debit Amt',
              data: 'totalDebitAmt',
            },       
            
          ],
        };
      }
    
      debitNoteAdd(): void {
        this.route.navigate(['/debitnoteadd']);
      }
    
      getDebitDetails(Challan: Debitnotemodel): void {
        this.debitNoteService.setDebitNoteDetails(Challan);
        this.route.navigate(['/debititnoteedit']);
      }  
    
      search(): void {
        var selectedDataVal = this.formFilter.getRawValue();
        let frmdt = new Date(selectedDataVal.fromDate);
        let todt = new Date(selectedDataVal.toDate);
        let maxdt = new Date(this.loginDate);
        let mindt = new Date(this.minDate);
        if (maxdt<frmdt || frmdt<mindt || maxdt<todt || todt<mindt) {
          this.toastrService.warning("From Date and To Date should be with in Fin Year");
          return;
        }
        this.filter.fromDate = selectedDataVal.fromDate;
        this.filter.toDate = selectedDataVal.toDate;
        this.filter.filterStr = "";
        this.filter.filterStr1 = "";
        this.filter.filterStr2 = this.branch;     
        this.filter.filterStr3 = this.year;    
        
         this.getDebitList();
         this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.ajax.reload(); 
         });
      }
      
    
    }
    
    
    
  
