import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Filtermodel } from 'src/app/models/filtermodel';
import { Employeemodel  } from 'src/app/models/employeemodel';
import { Empmasterlistmodel } from 'src/app/models/empmasterlistmodel';
import { EmpmasterService } from 'src/app/services/empmaster.service';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-empmasterlist',
  templateUrl: './empmasterlist.component.html',
  styleUrls: ['./empmasterlist.component.css']
})
export class EmpmasterlistComponent {
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false; 
  dashboard: string ="";

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  allEmpmasterlist: Empmasterlistmodel = new Empmasterlistmodel();
  filter: Filtermodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'empName',
    sortOrder: 'asc',
    search: ''
  } 
  
  formFilter!: FormGroup;

  constructor(private empmasterService: EmpmasterService,
    private formBuilder: FormBuilder,private sharedService: SharedService,
    private route: Router) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Employee Master");
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

    this.empmasterService.clearEmployeeDetails();
    this.formFilter = this.formBuilder.group({
      empName: new FormControl(''),
    });

    this.sharedService.loading=true;
    this.empMasterList();
    this.sharedService.loading=false;
  }
  
  empMasterList(){
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
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        // this.filter.search = dataTablesParameters.search.value;
        callback({
          recordsTotal: 0,
          recordsFiltered: 0,
          data: []
        });
        this.empmasterService.getEmployeeList(this.filter).subscribe(resp => {
          this.allEmpmasterlist = resp;
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
          data: 'empId',
        },    
        {
          title: 'Emp Code',
          data: 'empCode',
        },
        {
          title: 'Emp Name',
          data: 'empName',
        },
        {
          title: 'Father Name',
          data: 'fsName',
        },
        {
          title: 'Date Of Appointment',
          data: 'dateOfAppoint',
        },
        {
          title: 'Designation',
          data: 'designName',
        },
        {
          title: 'Department',
          data: 'deptName',
        },
        {
          title: 'Mobile',
          data: 'mobile',
        },
      ],
    };
  }

  addempmaster(): void {
    this.route.navigate(['/employeemstadd']);
  }

  getempMasterDetails(emp: Employeemodel): void {
    this.empmasterService.setEmployeeDetails(emp);
    this.route.navigate(['/employeemstedit']);
  }
  
  search(): void {
    this.filter.search = this.formFilter.value.empName;
    this.sharedService.loading=true;
    this.empMasterList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
  
  
  
  
  
  