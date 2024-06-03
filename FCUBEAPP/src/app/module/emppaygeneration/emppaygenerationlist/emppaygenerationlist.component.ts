import { Component,ViewChild } from '@angular/core';
import { Router, convertToParamMap } from '@angular/router';
import { Constants } from 'src/app/common/constants';
import { EmppaygenerationService } from 'src/app/services/emppaygeneration.service';
import { Emppaygenlist } from 'src/app/models/emppaygenlist';
import { Filtermodel } from 'src/app/models/filtermodel';
import { SharedService } from 'src/app/services/shared.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Dropdownmodel } from 'src/app/models/dropdownmodel';
import { Pagerequestwithdatesmodel } from 'src/app/models/pagerequestwithdatesmodel';
import { CommonService } from 'src/app/services/common.service';
import { ToastrService } from 'ngx-toastr';
import { Responsemodel } from 'src/app/models/responsemodel';
import { Requestmodel } from 'src/app/models/requestmodel';


@Component({
  selector: 'app-emppaygenerationlist',
  templateUrl: './emppaygenerationlist.component.html',
  styleUrls: ['./emppaygenerationlist.component.css']
})
export class EmppaygenerationlistComponent {
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
  filter: Pagerequestwithdatesmodel = {
    pageNumber: 1,
    pageSize: 200,
    sortColumn: 'empName',
    sortOrder: 'asc',
    search: '',
    fromDate:'',
    toDate:'',
    strRequest:'',
  }

  formFilter!: FormGroup;

  constructor(private emppaygenerationService: EmppaygenerationService,
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
      .find((aa: { menuName: string; }) => aa.menuName === "Paysheet Generation");
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

    this.getBranchList();   
    this.getYearList(); 
          
   // setTimeout(() => {
      this.formFilter = this.formBuilder.group({
        monthYear: new FormControl(this.loginDate,[Validators.required]),    
        branch: new FormControl(this.branch,[Validators.required]),    
        affectYear: new FormControl(this.year,[Validators.required]),    
      });
    //}, 2000);

    this.sharedService.loading=true;
    this.filter.fromDate= this.loginDate;
    this.filter.strRequest= this.branch;
    this.empSalaryList();
    this.sharedService.loading=false;
  }

  getBranchList(): void {
    this.commonService.getBranchList().subscribe((res) => {
      this.branchList = res;
    });
  } 
  
  getYearList():void{
    this.commonService.getYearList().subscribe((res) => {
      this.yearList = res;
      this.formFilter.patchValue({
        affectYear:this.yearList[0].dataId,
      }) 
   });
  }    
  
  get f() { return this.formFilter.controls; }

  empSalaryList(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 200,
      serverSide: true,
      processing: true,
      searching:false,
      paging:false,
      ajax: (dataTablesParameters: any, callback) => {
        // Filter setting
        this.filter.pageNumber = (dataTablesParameters.start / dataTablesParameters.length) + 1;
        this.filter.pageSize = dataTablesParameters.length;
        this.filter.sortColumn = dataTablesParameters.columns[dataTablesParameters.order[0].column === undefined ? 0 : dataTablesParameters.order[0].column].data;
        this.filter.sortOrder = dataTablesParameters.order[0].dir;
        this.emppaygenerationService.getEmpPayGenerationList(this.filter).subscribe(resp => {
          this.allEmpsalaryMaster = resp;
          if(this.allEmpsalaryMaster.payGenMstList[0].psId!=""){
            this.editMode = true;
          }
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
          title: 'Emp Code',
          data: 'empCode',
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
          title: 'Hol + Sun',
          data: 'holSun',
        },
        {
          title: 'EL Paid',
          data: 'eL_Days',
        },
        {
          title: 'CL Paid',
          data: 'cL_Days',
        },
        {
          title: 'SL Paid',
          data: 'sL_Days',
        },
        {
          title: 'UnPaid L',
          data: 'lossOfPayDays',
        },
        {
          title: 'Tot Paid Days',
          data: 'payDays',
        },
        {
          title: 'Basic Rate',
          data: 'basicRate',
        },
        {
          title: 'HRA Rate',
          data: 'hraRate',
        },
        {
          title: 'FDA Rate',
          data: 'fdaRate',
        },
        {
          title: 'Other Rate',
          data: 'othRate1',
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
    this.filter.strRequest= selecteddata.branch;
    this.sharedService.loading=true;
    this.empSalaryList();
    this.sharedService.loading=false;
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  
  deleteempPayGen(): void {
    var selecteddata = this.formFilter.getRawValue();
    this.filter.fromDate= selecteddata.monthYear;
    this.filter.strRequest= selecteddata.branch;
    if (confirm("Are you sure, you want to delete this?")) {
      this.emppaygenerationService.empPayGenerationDelete(this.filter).subscribe((res: Responsemodel) => {
        this.responseDetails = res;
        if (this.responseDetails.status) {
          this.toasterService.success(this.responseDetails.message);
          this.formFilter.reset();
          this.route.navigate(['/']);
        }
        else {
          this.toasterService.warning(this.responseDetails.message);
        }
      });
    }
  }
  

  empPayGenSave() {
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
    for (var i = 0; i < this.allEmpsalaryMaster.payGenMstList.length; i++) {
      this.allEmpsalaryMaster.payGenMstList[i].loggedInUser = this.loggedInUserID;
      this.allEmpsalaryMaster.payGenMstList[i].monthYear =this.commonService.formatDate(this.allEmpsalaryMaster.payGenMstList[i].monthYear);
    }

    this.emppaygenerationService.empPayGenerationSubmitted(this.allEmpsalaryMaster).subscribe((res: Responsemodel) => {
      this.responseDetails = res;
      if (this.responseDetails.status) {
        this.toasterService.success(this.responseDetails.message);
        this.formFilter.reset();
        this.route.navigate(['/']);
      }
      else {
        this.toasterService.warning(this.responseDetails.message);
      }
    });

  }




}