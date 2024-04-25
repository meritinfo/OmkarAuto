import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmppaycalculateService } from 'src/app/services/emppaycalculate.service';
import { Emppaycallistmodel } from 'src/app/models/emppaycallistmodel';
import { Emppaycalcmodel } from 'src/app/models/emppaycalcmodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Reportmodel } from 'src/app/models/reportmodel';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-empsalcalculationlist',
  templateUrl: './empsalcalculationlist.component.html',
  styleUrls: ['./empsalcalculationlist.component.css']
})
export class EmpsalcalculationlistComponent {
  year: string = '';
  loginDate: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  dt: Date = new Date();
  branchList: Dropdownmodel[] = [];

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allEmpsalaryMaster: Emppaycallistmodel = new Emppaycallistmodel();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'empName',
    sortOrder: 'asc',
    search: '',
    fromDate:'',
    toDate:'',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:'',
  }

  formFilter!: FormGroup;

  constructor(private emppaycalculateService: EmppaycalculateService,
    private formBuilder: FormBuilder,private commonService:CommonService,
    private sharedService: SharedService, private route: Router) {


  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Salary Calculation");
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

    this.getBranchList();    
          
    this.emppaycalculateService.clearEmpPayCalDetails();
    this.formFilter = this.formBuilder.group({
      monthYear: new FormControl(this.loginDate,),
      branch: new FormControl(''),
    });

    this.sharedService.loading=true;
    this.filter.fromDate= this.loginDate;
    this.filter.filterStr='',
    this.empSalaryList();
    this.sharedService.loading=false;
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  } 
  
  
  empSalaryList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
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
        this.emppaycalculateService.getEmpPayCalMstList(this.filter).subscribe(resp => {
            this.allEmpsalaryMaster = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },

      columns: [
        {
          title: 'Month',
          data: 'monthYear',
        },
        {
          title: 'Emp Code',
          data: 'empCode',
        },

        {
          title: 'Employee Name',
          data: 'empName',
        },
        {
          title: 'Net Pay',
          data: 'netPay',
        },
        {
          title: 'Action',
          data: 'transId',
        },
      ],
    };
  }
  
  empSalarymstAdd(): void {
    this.route.navigate(['/salcalcadd']);
  }

  getEmpsalarymstDetails(empsal: Emppaycalcmodel): void {
    this.emppaycalculateService.setEmpPayCalDetails(empsal);
    this.route.navigate(['/salcalcedd']);
  }

  search(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate= selecteddata.monthYear;
    this.filter.filterStr= selecteddata.branch;
    this.sharedService.loading=true;
    this.empSalaryList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}