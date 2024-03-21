import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmpsalaryService } from 'src/app/services/empsalary.service';
import { Empsalarymstlistmodel } from 'src/app/models/empsalarymstlistmodel';
import { Empsalarymstmodel } from 'src/app/models/empsalarymstmodel';
import { Filtermodel } from 'src/app/models/filtermodel';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-empsalarylist',
  templateUrl: './empsalarylist.component.html',
  styleUrls: ['./empsalarylist.component.css']
})
export class EmpsalarylistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allEmpsalaryMaster: Empsalarymstlistmodel = new Empsalarymstlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'empName',
    sortOrder: 'asc',
    search: ''
  }

  formFilter!: FormGroup;

  constructor(private empsalaryService: EmpsalaryService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService, private route: Router) {


  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var privilegeStatus = privilegeData.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Employee Salary Master");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }

    this.empsalaryService.clearEmpSalaryDetails();
    this.formFilter = this.formBuilder.group({
      empName: new FormControl(''),
    });

    this.sharedService.loading=true;
    this.empSalaryList();
    this.sharedService.loading=false;
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
        this.empsalaryService.getEmpSalaryMstList(this.filter)
          .subscribe(resp => {
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
          title: 'Sal From Date',
          data: 'fromDate',
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
          title: 'Gross Salary',
          data: 'grossSalary',
        },
        {
          title: 'Action',
          data: 'masterId',
        },
      ],
    };
  }
  
  empSalarymstAdd(): void {
    this.route.navigate(['/empsalmstadd']);
  }

  getEmpsalarymstDetails(empsal: Empsalarymstmodel): void {
    this.empsalaryService.setEmpSalaryDetails(empsal);
    this.route.navigate(['/empsalmstedit']);
  }

  search(): void {
    this.filter.search = this.formFilter.value.empName;
    this.sharedService.loading=true;
    this.empSalaryList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}