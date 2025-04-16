import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Emploanmodel  } from 'src/app/models/emploanmodel';
import { Emploanlistmodel } from 'src/app/models/emploanlistmodel';
import { EmploanService } from 'src/app/services/emploan.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-emploanlist',
  templateUrl: './emploanlist.component.html',
  styleUrls: ['./emploanlist.component.css']
})
export class EmploanlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

    allEmpLoanlist: Emploanlistmodel = new Emploanlistmodel();
    filter: Filtermodel = {
      pageNumber: 1,
      pageSize: 10,
      sortColumn: 'empName',
      sortOrder: 'asc',
      search: ''
  } 
  
  formFilter!: FormGroup;

  constructor(private emploanService: EmploanService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
    private route: Router) {
  }

  ngOnInit(): void {

    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Loans & Advances Entry");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
         this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    if(!this.viewStatus){      
      this.route.navigate(['/dashboard']);
    }

    this.emploanService.clearEmpLoanDetails();
    this.formFilter = this.formBuilder.group({
      empName: new FormControl(''),
    });

    this.sharedService.loading=true;
    this.empLoanList();
    this.sharedService.loading=false;
  }
  
  empLoanList(){
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
        this.emploanService.getEmpLoanList(this.filter).subscribe(resp => {
          this.allEmpLoanlist = resp;
            callback({
              recordsTotal: resp.pageMetaData.totalCount,
              recordsFiltered: resp.pageMetaData.totalCount,
              data: []
            });
          });
      },
      columns: [   
        {
          title: 'Emp Code',
          data: 'empCode',
        },
        {
          title: 'Emp Name',
          data: 'empName',
        },
        {
          title: 'Loan Date',
          data: 'loanDate',
        },
        {
          title: 'Loan Type',
          data: 'loanTp',
        },
        {
          title: 'Loan Amt',
          data: 'loanAmt',
        },
        {
          title: 'Amt Cleared',
          data: 'amountCleared',
        },
        {
          title: 'Remarks',
          data: 'remarks',
        },
        {
          title: 'Action',
          data: 'loanId',
        },   
      ],
    };
  }

  addempLoan(): void {
    this.route.navigate(['/loansrepayadd']);
  }

  getempLoanDetails(emp: Emploanmodel): void {
    this.emploanService.setEmpLoanDetails(emp);
    this.route.navigate(['/loansrepayedit']);
  }
  
  search(): void {
    this.filter.search = this.formFilter.value.empName;
    this.sharedService.loading=true;
    this.empLoanList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
  
  
  
  
  
  