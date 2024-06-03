import { Component,ViewChild } from '@angular/core';
import { Router, convertToParamMap } from '@angular/router';
import { EmppaysheetrptService } from 'src/app/services/emppaysheetrpt.service';
import { Emppaygenlist } from 'src/app/models/emppaygenlist';
import { Reportmodel } from 'src/app/models/reportmodel';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';


@Component({
  selector: 'app-emppaysheetrpt',
  templateUrl: './emppaysheetrpt.component.html',
  styleUrls: ['./emppaysheetrpt.component.css']
})
export class EmppaysheetrptComponent {
  year: string = '';
  branch: string = '';
  loggedInUserID: string = '';
  loginDate: string = '';
  createStatus = false;
  editStatus = false;
  deleteStatus = false;
  viewStatus = false;
  dt: Date = new Date();
  branchList: Dropdownmodel[] = [];
  yearList: Dropdownmodel[] = [];
  responseDetails = new Responsemodel();
  formSubmitted = false;
  editMode = false;

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  allEmpsalaryMaster: Emppaygenlist = new Emppaygenlist();
  filter: Reportmodel = {
    pageNumber: 1,
    pageSize: 10,
    sortColumn: 'empname',
    sortOrder: 'asc',
    search: '',
    fromDate: '',
    toDate: '',
    filterStr:'',
    filterStr1:'',
    filterStr2:'',
    filterStr3:'',
  }


  formFilter!: FormGroup;

  constructor(private emppaysheetrptService: EmppaysheetrptService,
    private toasterService: ToastrService,private requestmodel: Requestmodel,
    private formBuilder: FormBuilder,private commonService:CommonService,
    private sharedService: SharedService, private route: Router) {
  }

  ngOnInit(): void {
    var menuData = sessionStorage.getItem('menulist')?.toString();
    if (typeof menuData !== 'undefined' && menuData !== null && menuData !== '') {
      var privilegeData = JSON.parse(menuData);
      var menuTypeList = privilegeData.flatMap((item: { menuTypeList: any; }) => item.menuTypeList);
      var privilegeStatus = menuTypeList.flatMap((item: { menuList: any; }) => item.menuList)
      .find((aa: { menuName: string; }) => aa.menuName === "Paysheet Report");
      if (privilegeStatus) {
        this.createStatus = privilegeStatus.createYN.toLowerCase() === "y" ? true : false;
        this.editStatus = privilegeStatus.editYN.toLowerCase() === "y" ? true : false;
        this.deleteStatus = privilegeStatus.deleteYN.toLowerCase() === "y" ? true : false;
        this.viewStatus = privilegeStatus.viewYN.toLowerCase() === "y" ? true : false;
      }
    }
    var userData = sessionStorage.getItem('uid')?.toString();
    if (typeof userData !== 'undefined' && userData !== null && userData !== '') {
      this.loggedInUserID = userData;
    }
    if (this.loggedInUserID) {
      console.log(this.loggedInUserID);
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
    else {
      this.route.navigate(['/']);
    }
          
   // setTimeout(() => {
      this.formFilter = this.formBuilder.group({
        monthYear: new FormControl(this.loginDate,[Validators.required]), 
      });
    //}, 2000);

    this.sharedService.loading=true;
    this.filter.fromDate= this.loginDate;

    this.empSalaryList();
    this.sharedService.loading=false;
  }

  
  
  get f() { return this.formFilter.controls; }

  empSalaryList(){
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
        this.emppaysheetrptService.getPaySheetRptList(this.filter).subscribe(resp => {
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
          title: 'Sl No',
          data: 'slNo',
        },
        {
          title: 'Employee Name',
          data: 'empName',
        },
        {
          title: 'Total Days',
          data: 'daysOfMonth',
        },
        {
          title: 'Working Days',
          data: 'workedDays',
        },
        {
          title: 'Tot Paid Days',
          data: 'payDays',
        },
        {
          title: 'Basic Earn',
          data: 'basicEarn',
        },
        {
          title: 'HRA Earn',
          data: 'hraEarn',
        },
        {
          title: 'FDA Earn',
          data: 'fdaEarn',
        },
        {
          title: 'Other Earn',
          data: 'oth1Earn',
        },
        {
          title: 'PF Ded',
          data: 'pfDed',
        },
        {
          title: 'ESI Ded',
          data: 'esiDed',
        },
        {
          title: 'PT Ded',
          data: 'ptDed',
        },
        {
          title: 'TDS Ded',
          data: 'tdsDed',
        },
        {
          title: 'Sal Adv Ded',
          data: 'salAdvDed',
        },
        {
          title: 'Loan Ded',
          data: 'loanDed',
        },
        {
          title: 'Net Pay',
          data: 'netPay',
        },
      ],
    };
  }   

  search(): void {
    this.formSubmitted = true;
    if (this.formFilter.invalid) {
      this.toasterService.warning("Please Enter Mandatory Fields "); 
      const controls = this.formFilter.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          this.toasterService.warning(name + " Fields is Invalid");   
        }
      } 
      return;
    }  

    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate= selecteddata.monthYear;
    
    this.sharedService.loading=true;
    this.empSalaryList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  exportExcel(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.requestmodel.strRequest = selecteddata.monthYear;

    this.emppaysheetrptService.getPaySheetRptExcel(this.requestmodel).subscribe(resp => {
      if(resp.status){     
        let link = document.createElement("a");
        link.download = "SalaryStatement" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toasterService.warning(resp.message);   
      }
    });
  }

  pfECRExcel(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.requestmodel.strRequest = selecteddata.monthYear;

    this.emppaysheetrptService.getPfECRExcel(this.requestmodel).subscribe(resp => {
      if(resp.status){     
        let link = document.createElement("a");
        link.download = "PFECREXCEL" + "_" + new Date().getTime() + '.xlsx';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toasterService.warning(resp.message);   
      }
    });
  }

  pfECRText(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.requestmodel.strRequest = selecteddata.monthYear;

    this.emppaysheetrptService.getPfECRText(this.requestmodel).subscribe(resp => {
      if(resp.status){     
        let link = document.createElement("a");
        link.download = "PFECR" + "_" + new Date().getTime() + '.txt';
        link.href = "assets\\reports\\Download\\" + resp.message;
        link.click();
      }
      else{        
        this.toasterService.warning(resp.message);   
      }
    });
  }


}