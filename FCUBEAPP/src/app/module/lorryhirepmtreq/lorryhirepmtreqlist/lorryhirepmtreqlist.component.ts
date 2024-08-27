import { Component , ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Reportmodel } from 'src/app/models/reportmodel';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Lorryhirereqlistmodel  } from 'src/app/models/lorryhirereqlistmodel';
import { Lorryhirereqmodel } from 'src/app/models/lorryhirereqmodel';
import { LorryhirereqService } from 'src/app/services/lorryhirereq.service';
import { DataTableDirective } from 'angular-datatables';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-lorryhirepmtreqlist',
  templateUrl: './lorryhirepmtreqlist.component.html',
  styleUrls: ['./lorryhirepmtreqlist.component.css']
})

export class LorryhirepmtreqlistComponent {
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allLorryhirereq: Lorryhirereqlistmodel = new Lorryhirereqlistmodel();
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

  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  formFilter!: FormGroup;
  keywordLocation = 'dataName'; 
  year: string = '';
  loginDate: string = '';
  fromDate: string = '';
  maxDate: string = '';
  minDate: string = '';

  constructor(private lorryhirereqService: LorryhirereqService, 
    private commonService: CommonService, private formBuilder: FormBuilder, 
    private sharedService: SharedService,private route: Router) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
        .find(((aa: { menuName: string; }) => aa.menuName === "Lorry Hire Extra Payment Request"));
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
    today.setMonth(month - 12);
    this.minDate = this.commonService.getCurrentFiscalYear(this.loginDate).sDate.toLocaleDateString('en-CA').toString();
    this.maxDate = new Date().toLocaleDateString('en-CA').toString();
    
    if(today<this.commonService.getCurrentFiscalYear(this.loginDate).sDate){
      this.fromDate = this.minDate ;
    }
    else{
      this.fromDate = today.toLocaleDateString('en-CA').toString();
    }   
    this.lorryhirereqService.clearLorryhireReqDetails();
    this.formFilter = this.formBuilder.group({
      fromDate: new FormControl(this.fromDate,),
      toDate: new FormControl(this.loginDate,),
    });     
     this.sharedService.loading=true; 
     
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    
    this.lorryhireReqlist();
    this.sharedService.loading=false;
  }

  lorryhireReqlist(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 50,
      serverSide: true,
      processing: true,
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.filter.search = dataTablesParameters.search.value;
        this.lorryhirereqService.getLorryhireReqList(this.filter).subscribe(resp => {
          this.allLorryhirereq = resp;
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
          title: 'Req Branch',
          data: 'reqBr',
        },
        {
          title: 'Req Date',
          data: 'reqDate',
        },
        {
          title: 'Challan Branch',
          data: 'challanBr',
        },
        {
          title: 'Challan No',
          data: 'challanNo',
        },
        {
          title: 'Extra Hamali',
          data: 'extraHamali',
        },
        {
          title: 'Extra Deten',
          data: 'extraDeten',
        },
        {
          title: 'Extra Others',
          data: 'extraOthers',
        },
        {
          title: 'Remarks',
          data: 'remarks',
        },
        {
          title: 'Action',
          data: 'id',
        },
      ],
    };
  }

  //Open new destination add screen
  addLorryhireReq(): void {
    this.route.navigate(['/lhextrapmtreqadd']);
  }

  //Open user details screen
  getLorryhireReqDetails(lorryhirereq: Lorryhirereqmodel): void {
    this.lorryhirereqService.setLorryhireReqDetails(lorryhirereq);
    this.route.navigate(['/lhextrapmtreqedit']);
  }

  search(): void {
    this.filter.fromDate = this.formFilter.value.fromDate;
    this.filter.toDate = this.formFilter.value.toDate;
    this.sharedService.loading=true;
    this.lorryhireReqlist();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}

