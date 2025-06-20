import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LorryhirepmtllpService } from 'src/app/services/lorryhirepmtllp.service';
import { Lorryhiremastermodel } from 'src/app/models/lorryhiremastermodel';
import { Lorryhirelistmodel } from 'src/app/models/lorryhirelistmodel';
import { Requestmodel } from 'src/app/models/requestmodel';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Reportmodel } from 'src/app/models/reportmodel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lorryhirepmtllplist',
  templateUrl: './lorryhirepmtllplist.component.html',
  styleUrls: ['./lorryhirepmtllplist.component.css']
})
export class LorryhirepmtllplistComponent {createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allLorryhirelist: Lorryhirelistmodel = new Lorryhirelistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'reqDate',
    sortOrder: 'asc',
    search: '',
    fromDate:"",
    toDate:"",
    filterStr:"",
    filterStr1:"",
    filterStr2:"",
    filterStr3:"",
  }

    
  formFilter!: FormGroup;
  keywordLocation = 'dataName'; 
  year: string = '';
  loginDate: string = '';
  branch: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';
  request: Requestmodel = new Requestmodel();
  
  constructor(private lorryhirepmtService: LorryhirepmtllpService,private toastrService : ToastrService,
    private commonService: CommonService, private formBuilder: FormBuilder, 
    private sharedService: SharedService,private route: Router) {
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);      
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Lorry Hire Payment");
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
 
    var yearIDData = sessionStorage.getItem('yearID')?.toString();
    if (typeof yearIDData !== 'undefined' && yearIDData !== null && yearIDData !== '') {
      this.year = yearIDData;
    }
    var loginDate = sessionStorage.getItem('loginDate')?.toString();
    if (typeof loginDate !== 'undefined' && loginDate !== null && loginDate !== '') {
      this.loginDate = loginDate;
    }
    var userData = sessionStorage.getItem('userBranch')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.branch = userData;
    }
      
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date(this.loginDate).toLocaleDateString('en-CA').toString();
    
    this.fromDate = this.minDate ;


    this.lorryhirepmtService.clearLorryhiremasterDetails();

    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
      pmtNo: new FormControl('',),
    });     
     this.sharedService.loading=true; 
     
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.filter.filterStr = this.branch;
    this.filter.filterStr1 = this.year;
    this.filter.filterStr2 = "";
    
    this.sharedService.loading=true;
    this.lorryhireList();
    this.sharedService.loading=false;
  }
  
  lorryhireList(){
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
        this.lorryhirepmtService.getLorryhiremasterList(this.filter).subscribe(resp => {
          this.allLorryhirelist = resp;
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
          data: 'masterID',
        },
        {
          title: 'Print',
          data: 'masterID',
        },
        {
          title: 'Payment Stn',
          data: 'pmtStn',
        },
        {
          title: 'Payment No',
          data: 'pmtNo',
        },
        {
          title: 'Payment Date',
          data: 'pmtDate',
        },
        {
          title: 'Payment Type',
          data: 'pmtTp',
        },
        {
          title: 'Total Hire Amt',
          data: 'totalHireAmt',
        },
        {
          title: 'Total Hamali Amt',
          data: 'totalHamaliAmt',
        },
        {
          title: 'Total Deten Amt',
          data: 'totalDetenAmt',
        },
        {
          title: 'Total Other Amt',
          data: 'totalOtherAmt',
        },
        {
          title: 'Total Recovery Amt',
          data: 'totalRecoveryAmt',
        },
       
     
      ],
    };
  }
  
  lorryHirePmtAdd(): void {
    this.route.navigate(['/lhpmtaddllp']);
  }

  getLorryHirePmtDetails(lrhrpmt: Lorryhiremastermodel): void {
    this.lorryhirepmtService.setLorryhiremasteretails(lrhrpmt);
    this.route.navigate(['/lhpmteditllp']);
  }

  search(): void {
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.filter.filterStr = this.branch;
    this.filter.filterStr1 = this.year;
    this.filter.filterStr2 = this.formFilter.value.pmtNo;
    this.sharedService.loading=true;
    this.lorryhireList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
  
  download(ch: Lorryhiremastermodel): void {
    this.request.strRequest = ch.masterId;
        
    this.lorryhirepmtService.getLorryHirePrintPdf(this.request).subscribe(resp => {
      if(resp.status){     
        let link = document.createElement("a");
        link.download = "LH_" + new Date().getTime() + '.pdf';
        link.href = "assets/reports/lhprint/" + resp.message;
        link.click();
        window.open(link.href, "_blank");
      }
      else{        
        this.toastrService.warning(resp.message);   
      }
    });
  }

}
